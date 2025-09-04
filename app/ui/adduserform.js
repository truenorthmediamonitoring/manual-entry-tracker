"use client"

import { AtSign, CircleUser, Earth, Key, MessageCircleWarning, X } from "lucide-react"

import { useState } from "react"
import _ from "lodash"
import ToastAlert from "./toast"
import { access } from "../lib/data"
import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { countries } from "../lib/data"


export default function AddUserForm({ Stations }) {
    const { data: session, status, update } = useSession({ required: "true" });

    useEffect(() => {
        update(); // force refetch from /api/auth/session
    }, []);

    const filteredStations = Stations.filter(data => data.country === session.user.country)



    const [country, setCountry] = useState("");
    const [creating, setcreating] = useState(false);
    const [passwordmismatch, setpasswordmismatch] = useState("invisible");
    const [usercreated, setusercreated] = useState(false);
    const [internalerror, setinternalerror] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setcreating(true)

        let firstname = _.upperFirst(event.target.fname.value);
        let lastname = _.upperFirst(event.target.lname.value);
        let email = event.target.email.value;
        const stations = event.target.stations;
        const access = event.target.access.value;
        const country = event.target.country.value;
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
                country,
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
                setusercreated(true)
                setcreating(false)
                console.log(result);
                setTimeout(() => {
                    location.reload(true);
                }, 1500);
            } else if (result.error) {
                setinternalerror(true)
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
            <form onSubmit={handleSubmit}>
                <label className="input input-sm rounded-full flex items-center gap-2 bg-zinc-200 mb-3">
                    <CircleUser size={15} className="text-cyan-700" />
                    <input name="fname" type="text" className="grow font-semibold text-black" placeholder="First Name" required />
                </label>

                <label className="input input-sm rounded-full flex items-center gap-2 bg-zinc-200 mb-3">
                    <CircleUser size={15} className="text-cyan-700" />
                    <input name="lname" type="text" className="grow font-semibold text-black" placeholder="Last Name" required />
                </label>

                <label className="input input-sm rounded-full flex items-center gap-2 bg-zinc-200 mb-3">
                    <AtSign size={15} className="text-cyan-700" />
                    <input name="email" type="email" className="grow font-semibold text-black" placeholder="Email" required />
                </label>

                <select
                    size={6}
                    multiple
                    name="stations"
                    className="select select-sm rounded-md shadow-sm bg-zinc-200 font-semibold text-cyan-950 mb-3 h-14" required
                    defaultValue={[]}>
                    <option className="text-xs" value="" disabled>Select Station(s)</option>
                    {/* <option className="text-sm font-medium" value={0}>N/A</option> */}
                    {filteredStations.map((item) => (
                        <option key={item._id} className="text-sm font-semibold" value={item._id}>
                            {item.name} {item.name === "N/A" ? "" : "| " + item.type}
                        </option>
                    ))}
                </select>

                <select name="access" className="select select-sm w-full rounded-full shadow-sm bg-zinc-200 text-cyan-950 font-semibold mb-3" required defaultValue=""
                >
                    <option className="text-xs" value="" disabled>Select Access</option>
                    {access.map((item) => (
                        <option 
                        key={item.id} 
                        className="text-sm" 
                        value={item.role === "Admin (Read Only)" ? "AdminReadOnly" : item.role}
                        >
                        {item.role}
                        </option>
                    ))}
                </select>

                <select
                    name="country"
                    className="select select-sm rounded-full shadow-sm bg-zinc-200 font-semibold mb-3 text-cyan-950"
                    required
                >
                    <option className="text-xs" value={session.user.country}>{session.user.country}</option>
                    {/* {countries.slice(1).map((item) => (
                        <option key={item.id} className="text-sm" value={item.country}>{item.country}</option>
                    ))} */}
                </select>

                <div className="mb-4">
                    <label className="input input-sm rounded-full flex items-center gap-2 bg-zinc-200 mb-3">
                        <Key size={15} className="text-cyan-700" />
                        <input name="password" type="password" className="grow font-semibold text-black" placeholder="Create password" required />
                    </label>

                    <label className="input input-sm rounded-full flex items-center gap-2 bg-zinc-200 mb-2">
                        <Key size={15} className="text-cyan-700" />
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


                <div className="flex justify-between items-center gap-3">
                    <kbd className="kbd kbd-xs bg-zinc-100 text-black">esc</kbd>
                    <div className="flex justify-end items-center gap-3">

                        <button
                            type="reset"
                            className="btn-xs flex justify-start items-center gap-2 bg-zinc-100 text-black rounded-full font-sans font-semibold text-xs p-1">
                            <X size={15} className="" />
                            <span>Clear</span>
                        </button>

                        {creating === false && (
                            <button
                                type="submit"
                                className="btn-sm bg-cyan-950 rounded-full px-3 py-1 text-white font-sans font-bold text-xs">
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
            <ToastAlert
                stateVar={internalerror}
                textColor=" text-red-500"
                text="Something went wrong. Try again."
                onClick={() => setinternalerror(false)}
                iconHint="internalerror"
            />
        </>
    )
}