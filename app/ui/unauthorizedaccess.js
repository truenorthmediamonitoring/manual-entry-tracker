import { LayoutDashboard, LockKeyhole } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedAccess() {
    return (
        <>
            <div className="flex flex-col md:flex-row gap-2 justify-between items-start">
                <div>
<<<<<<< HEAD
                    <LockKeyhole size={30} className="text-red-950" />
                    <h1 className=" text-3xl text-cyan-950 font-notosans font-bold ">Unauthorized Access</h1>
                    <span className="label-text text-cyan-950">You do not have the clearance to access this page</span>
=======
                    <LockKeyhole size={30} className="text-red-700" />
                    <h1 className=" text-3xl text-black font-notosans font-bold ">Unauthorized Access</h1>
                    <span className="label-text text-black">You do not have the clearance to access this page</span>
>>>>>>> 31010ff06a3c4bed4d51da2165ac65a643043482
                </div>
                <Link href="/dashboard">
                    <button
                        className="btn-ghost btn-xs rounded-full flex justify-start items-center gap-1 shadow-sm transition-all bg-cyan-900  text-cyan-50 mb-5 py-1.5 px-2 cursor-pointer hover:bg-cyan-950">
                        <LayoutDashboard size={15} />
                        <span className="text-xs font-semibold text-cyan-50">Go to Dashboard</span>
                    </button>
                </Link>
            </div>
        </>
    )
}