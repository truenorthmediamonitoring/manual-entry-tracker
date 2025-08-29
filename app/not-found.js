"use client"

import Link from "next/link"
import Image from "next/image"
import { House } from "lucide-react"
import { usePathname } from "next/navigation"

export default function NotFound() {
    const pathname = usePathname();
    return (
        <div className="h-screen flex justify-center items-center bg-[url(/backgroundimages/Abstract-White-2.png)] bg-cover bg-center bg-no-repeat">

            <div className="w-80 p-6 rounded-lg shadow-sm bg-zinc-50 text-black hover:-rotate-6 transition-all">
                <Image
                    src="/tnmmlogotransparent.PNG"
                    width={40}
                    height={40}
                    alt="True North Logo Transparent"
                    className="mb-4"
                />
                <h1 className="text-4xl font-black">404</h1>
                <h2 className="font-normal mb-2">Not Found: <span className="font-medium">{pathname}</span></h2>
                <p className=" mb-4">Hmm?... The requested URL could not be found on this server.</p>
                <Link href="/">
                    <button
                        className="btn-neutral btn-xs rounded-full flex justify-start items-center gap-1 shadow-sm transition-all bg-cyan-700 text-white mb-5 hover:bg-cyan-600 px-1.5 py-1">
                        <House size={15} />
                        <span className="text-xs px-1">Homepage</span>
                    </button>
                </Link>
            </div>

        </div>
    )
}