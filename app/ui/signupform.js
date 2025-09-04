"use client"

import { CircleUser, Earth, Key, MessageCircleWarning, X } from "lucide-react"
import Link from "next/link"
// import Image from "next/image"
import { useState } from "react"
import _ from "lodash"
import { redirect } from "next/navigation"
import ToastAlert from "./toast"
import { signIn } from "next-auth/react"

export default function SignupForm({ Stations }) {
    const [creating, setcreating] = useState(false);
    const [passwordmismatch, setpasswordmismatch] = useState("invisible");
    const [usercreated, setusercreated] = useState(false);

    const handleSignup = async (event) => {
        event.preventDefault();
        setcreating(true)

        let firstname = _.upperFirst(event.target.fname.value);
        let lastname = _.upperFirst(event.target.lname.value);
        let email = event.target.email.value;
        const stations = event.target.stations;
        const access = event.target.access.value;
        const password = event.target.password.value;
        const confirmpassword = event.target.confpassword.value;

        const fnFirstLetter = firstname.slice(0, 1).toUpperCase();
        const fnLowercaseLetters = firstname.slice(1).toLowerCase();
        firstname = fnFirstLetter + fnLowercaseLetters;

        const lnFirstLetter = lastname.slice(0, 1).toUpperCase();
        const lnLowercaseLetters = lastname.slice(1).toLowerCase();
        lastname = lnFirstLetter + lnLowercaseLetters;
        email = email.toLowerCase();

        const selectedstations = Array.from(stations.selectedOptions).map(option => option.value);

        if (password === confirmpassword) {
            const data = {
                firstname,
                lastname,
                email,
                selectedstations,
                access,
                password,
            }

            // console.log(data);

            // Send the data to the server in JSON format.
            const JSONdata = JSON.stringify(data);

            // API endpoint where we send form data.
            const endpoint = "/api/createuser";

            // Form the request for sending data to the server.
            const options = {
                // The method is POST because we are sending data.
                method: "POST",
                // Tell the server we're sending JSON.
                headers: {
                    "Content-Type": "application/json",
                },
                // Body of the request is the JSON data we created above.
                body: JSONdata,
            };

            // Send the form data to our forms API and get a response.
            const response = await fetch(endpoint, options);

            // Get the response data from server as JSON.
            const result = await response.json();

            if (result.okay) {
                setcreating(false)
                console.log(result);
                setusercreated(true)
                setTimeout(() => {
                    redirect("/signin")
                }, 3000);
            } else if (result.error) {
                setcreating(false)
                console.log(result);
            }

        } else {
            setcreating(false)
            setpasswordmismatch("visible")
        }

    }

    return (
        <>
            <form onSubmit={handleSignup}>
                <label className="input input-sm rounded-full flex items-center gap-2 bg-zinc-200 mb-3">
                    <CircleUser size={15} className="text-red-700" />
                    <input name="fname" type="text" className="grow font-semibold text-black" placeholder="First Name" required />
                </label>

                <label className="input input-sm rounded-full flex items-center gap-2 bg-zinc-200 mb-3">
                    <CircleUser size={15} className="text-red-700" />
                    <input name="lname" type="text" className="grow font-semibold text-black" placeholder="Last Name" required />
                </label>

                <label className="input input-sm rounded-full flex items-center gap-2 bg-zinc-200 mb-3">
                    <CircleUser size={15} className="text-red-700" />
                    <input name="email" type="email" className="grow font-semibold text-black" placeholder="Email" required />
                </label>

                <select
                    size={6}
                    multiple
                    name="stations"
                    className="select select-sm rounded-md shadow-sm bg-zinc-200 font-semibold text-black mb-3 h-14" required
                    defaultValue="">
                    <option className="text-xs" value="" disabled>Select Station(s)</option>
                    {Stations.map((item) => (
                        <option key={item._id} className="text-sm font-semibold" value={item._id}>
                            {item.name} {item.name === "N/A" ? "" : "| " + item.type }
                        </option>
                    ))}
                </select>

                <input name="access" type="checkbox" value="User" defaultChecked className="hidden checkbox checkbox-xs mb-3" />

                <div className="mb-4">
                    <label className="input input-sm rounded-full flex items-center gap-2 bg-zinc-200 mb-3">
                        <Key size={15} className="text-red-700" />
                        <input name="password" type="password" className="grow font-semibold text-black" placeholder="Create password" required />
                    </label>

                    <label className="input input-sm rounded-full flex items-center gap-2 bg-zinc-200 mb-2">
                        <Key size={15} className="text-red-700" />
                        <input name="confpassword" type="password" className="grow font-semibold text-black" placeholder="Confirm Password" required />
                    </label>
                    <div className={`flex justify-center items-center gap-1.5 text-red-700 ${passwordmismatch}`}>
                        <MessageCircleWarning className="transition-all" size={13} />
                        <span className="font-semibold text-xs transition-all">Those passwords do not match. Try again.</span>
                        <div onClick={() => setpasswordmismatch("invisible")} className="cursor-pointer rounded-full bg-zinc-100">
                            <X className="text-black" size={10} />
                        </div>
                    </div>
                </div>


                <div className="flex justify-end items-center gap-3">
                    {creating === false && (
                            <button
                                onClick={() => signIn()}
                                type="button"
                                className="btn-ghost text-black rounded-full font-sans font-semibold text-xs p-1 cursor-pointer">
                                Have credentials? Sign in.
                            </button>
                    )}
                    {creating === false && (
                        <button
                            type="submit"
                            className="btn-sm bg-cyan-900 rounded-full px-3 py-1 text-white font-sans font-bold text-xs cursor-pointer">
                            Create
                        </button>
                    )}
                    {creating === true && (
                        <button
                            type="button"
                            className="flex justify-start items-center gap-2 btn-sm bg-cyan-950 rounded-full px-3 py-1 text-white font-sans font-bold text-xs opacity-80 btn-disabled">
                            <span className="loading loading-spinner loading-xs text-red-green"></span>
                            Creating...
                        </button>
                    )}
                </div>
            </form>

            <ToastAlert
                stateVar={usercreated}
                textColor="text-cyan-950"
                text="Account created."
                onClick={
                    () => setusercreated(false)
                }
                iconHint="success"
            />
        </>
    )
}