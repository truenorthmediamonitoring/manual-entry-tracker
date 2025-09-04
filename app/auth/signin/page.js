"use client"

import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CircleUser, Key, LogIn } from "lucide-react";
import { countries } from "@/app/lib/data";
import ToastAlert from "@/app/ui/toast";

export default function Signin() {

    // const { data: session } = useSession();
    // // console.log(session);
    // session ? redirect("/") : null

    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [password, setPassword] = useState("");
    const [processing, setProcessing] = useState(false);

    const [credentialserr, setCredentialserr] = useState(false);
    const [internalerror, setinternalerror] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true)

        // Processes at /app/api/auth/[...nextauth]/route.js
        try {
            const res = await signIn("credentials", {
                email,
                country,
                password,
                redirect: false,
                callbackUrl: "/",
            });

            if (res.error) {
                setProcessing(false)
                console.error("Login error:", res.error);
                setCredentialserr(true)
                return;
            }

            if (res.ok) {
                window.location.href = res.url || "/";
            }


        } catch (error) {
            setProcessing(false)
            console.error("Unexpected error:", err);
            setinternalerror(true)
            alert("Something went wrong. Please try again.");
        }


    };
    return (
        <>
            <div className="h-screen flex justify-center items-center bg-[url(/backgroundimages/Abstract-White-2.png)] bg-cover bg-center bg-no-repeat bg-fixed">

                <div className="py-6 px-6 w-80 shadow-md rounded-md bg-white text-center">
                    <div className="mb-4 text-black font-sans font-bold">
                        <Link href="/">
                            <Image
                                src="/tnmmlogotransparent.PNG"
                                width={40}
                                height={40}
                                alt="True North Logo Transparent"
                                className="m-auto mb-2"
                            />
                        </Link>
                        <span className="font-sans font-bold text-xs text-zinc-500" >Login to access your account</span>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <label className="input input-sm rounded-full flex items-center gap-2 bg-zinc-200 mb-3 text-cyan-900">
                            <CircleUser size={15} />
                            <input
                                type="email"
                                className="grow"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email" />
                        </label>

                        <select
                            className="select select-sm rounded-full shadow-sm bg-zinc-200 font-semibold mb-3 text-cyan-950"
                            required
                            // defaultValue=""
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                            <option className="text-xs" value="" disabled>Select Country</option>
                            {countries.slice(1).map((item) => (
                                <option key={item.id} className="text-sm" value={item.country}>{item.country}</option>
                            ))}
                        </select>

                        <label className="input input-sm rounded-full flex items-center gap-2 bg-zinc-200 mb-4 text-cyan-900">
                            <Key size={15} className="text-cyan-900" />
                            <input type="password"
                                className="grow"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password" />
                        </label>

                        <div className="flex justify-end items-center gap-3">
                            {/* <Link href="/signup">
                                <button
                                    type="button"
                                    className="btn-xs text-xs text-red-700 rounded-full font-sans font-semibold cursor-pointer">
                                    No credentials? Sign Up
                                </button>
                            </Link> */}
                            {processing === false && (
                                <button
                                    type="submit"
                                    className="btn-sm bg-cyan-900 rounded-full px-3 py-1 text-white font-sans font-bold text-xs cursor-pointer">
                                    Authenticate
                                </button>
                            )}

                            {processing === true && (
                                <button
                                    type="button"
                                    className="flex justify-start items-center gap-2 btn-sm bg-cyan-950 rounded-full px-3 py-1 text-white font-sans font-bold text-xs opacity-80 btn-disabled">
                                    <span className="loading loading-spinner loading-xs text-red-green"></span>
                                    Processing...
                                </button>
                            )}
                        </div>
                    </form>
                </div>
                <ToastAlert
                    stateVar={credentialserr}
                    textColor=" text-red-500"
                    text="Invalid credentials. Try again."
                    onClick={() => setCredentialserr(false)}
                    iconHint="internalerror"
                />
                <ToastAlert
                    stateVar={internalerror}
                    textColor=" text-red-500"
                    text="Something went wrong. Try again."
                    onClick={() => setinternalerror(false)}
                    iconHint="internalerror"
                />
            </div>
        </>
    )
}