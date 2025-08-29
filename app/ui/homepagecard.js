"use client"

import { Layout, LogIn, LogOut } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react"
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";


export default function HomepageCard() {

    const { data: session, status, update } = useSession({ required: true });

    useEffect(() => {
        update(); // force refetch from /api/auth/session
    }, []);

    return (<>
        <div className="">
            <div className="px-6 pt-12 pb-6 rounded-t-2xl bg-cyan-50 shadow-sm">
                <Image
                    src="/tnmmlogotransparent.PNG"
                    width={40}
                    height={40}
                    alt="True North Logo Transparent"
                    className=" mb-2"
                />
                <div className=" text-sm text-cyan-950">TrueNorth Media Monitoring Ltd</div>
                <h1 className=" text-5xl font-bold text-cyan-950 max-w-md mb-2">Manual Entry & Progress Tracker</h1>

                {status === "loading" && (<span className="loading loading-spinner loading-xs text-cyan-950"></span>)}

                {status === "authenticated" && (
                    <div className=" text-sm text-cyan-950 mb-2">Welcome, {session?.user.name}.</div>
                )}
                {status === "authenticated" && (
                    <>
                        <Image
                            className={`${session.user.country !== "Ghana" && "hidden"} rounded-sm`}
                            src="https://flagcdn.com/w40/gh.png"
                            width={20}
                            height={20}
                            alt="Ghana"
                        />
                        <Image
                            className={`${session.user.country !== "Nigeria" && "hidden"} rounded-sm`}
                            src="https://flagcdn.com/w40/ng.png"
                            width={20}
                            height={20}
                            alt="Nigeria"
                        />
                        <Image
                            className={`${session.user.country !== "Côte d'Ivoire" && "hidden"} rounded-sm`}
                            src="https://flagcdn.com/w40/ci.png"
                            width={20}
                            height={20}
                            alt="Côte d'Ivoire"
                        />
                    </>
                )}
            </div>

            <div className="px-6 py-6 rounded-b-2xl bg-zinc-50 shadow-sm">
                <div className="flex justify-start items-center gap-2">
                    {!session && (<>
                        <button
                            onClick={() => signIn()}
                            type="button"
                            className="btn-sm bg-zinc-900 rounded-full px-5 py-1.5 text-white font-sans font-bold text-xs md:text-sm flex items-center gap-2 hover:-rotate-3 transition-all cursor-pointer">
                            <LogIn size={15} className=" text-zinc-50" /> &nbsp; Sign in
                        </button>
                    </>)}

                    {session && (
                        <>
                            <Link href="/dashboard">
                                <button
                                    type="button"
                                    className="btn-sm bg-cyan-950 rounded-full px-5 py-1.5 text-white font-sans font-bold text-xs md:text-sm flex items-center gap-2 hover:-rotate-3 transition-all cursor-pointer">
                                    <Layout size={15} className=" text-zinc-50" /> &nbsp; Dashboard
                                </button>
                            </Link>
                        </>
                    )}

                    {session && (
                        <>
                            <button
                                onClick={() => signOut()}
                                type="button"
                                className="btn-sm bg-red-700 rounded-full px-5 py-1.5 text-white font-sans font-bold text-xs md:text-sm flex items-center gap-2 hover:-rotate-3 transition-all cursor-pointer">
                                <LogOut size={15} className=" text-zinc-50" />
                                {/* &nbsp; Signout */}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    </>)
}