
export default function DashboardFooter() {
    return (
        <>
            <div className="rounded-lg bg-white shadow-sm px-4 md:px-10 py-2 mt-1">
                <p className=" font-notosans font-light text-xs text-zinc-400">Team Progress Tracker</p>
                <p className=" font-notosans text-black text-xs">© {new Date().getFullYear()} True North Media Monitoring Ltd.</p>
            </div>
        </>
    )
}