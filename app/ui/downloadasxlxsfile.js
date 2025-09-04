"use client"

import { ArrowDownToDot, FileSpreadsheet } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function DownloadAsXlsxFile() {

    const { data: session, status, update } = useSession({ required: "true" })

    useEffect(() => {
        update(); // force refetch from /api/auth/session
    }, []);

    const country = session.user.country;


    const [downloading, setdownloading] = useState(false);

    const handleXlsxDownload = async () => {
        setdownloading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await fetch(`/api/downloadasxlsxfile${country ? `?country=${country}` : ""}`);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "AllEntries" + country + ".xlsx";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setdownloading(false)
    }

    return (
        <>
            <div className="flex items-center">
                {downloading === false && (
                    <button
                        onClick={handleXlsxDownload}
                        type="button"
                        className="btn-xs flex justify-start items-center gap-1.5 bg-cyan-800 hover:bg-cyan-950/90 text-zinc-100 rounded-full font-sans font-semibold text-xs px-2 py-1 cursor-pointer">
                        <FileSpreadsheet size={15} />
                        <span>Download</span>
                        <ArrowDownToDot size={15} />
                    </button>
                )}

                {downloading === true && (
                    <button
                        type="button"
                        className="btn-ghost flex justify-start items-center gap-1.5 bg-cyan-800/40 text-zinc-100 rounded-full font-sans font-semibold text-xs px-2 py-1 btn-disabled">
                        <span className="loading loading-spinner loading-xs text-red-green"></span>
                        <span>Downloading...</span>
                    </button>
                )}
            </div>
        </>
    )
}