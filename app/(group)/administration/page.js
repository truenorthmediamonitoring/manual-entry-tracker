import Link from "next/link"
import { getServerSession } from "next-auth"
import { House } from "lucide-react"
import UserProgressDashboard from "@/app/ui/userprogressdashboard"
import userAccess from "@/app/lib/getUserAccess"
import UnauthorizedAccess from "@/app/ui/unauthorizedaccess"
import TableSkeleton from "@/app/ui/skeletons"
import { Suspense } from "react"
import AllUserEntriesTable from "@/app/ui/alluserentriestable"
import getUserEntries from "@/app/lib/getUserEntries"

export default async function Admin() {
    const session = await getServerSession();
    const useraccess = await userAccess(session.user.email);
    console.log(useraccess);
    // console.log(session);


    const userentries = await getUserEntries();
    const UserEntries = JSON.parse(JSON.stringify(userentries));


    return (
        <>
            <div className="py-6 md:pt-24 px-4 md:px-10 h-screen rounded-lg bg-white/70 shadow-sm overflow-scroll">
                {useraccess !== "Admin" && (
                    <UnauthorizedAccess />
                )}
                {useraccess === "Admin" && (
                    <>
                        <div className="flex flex-wrap justify-between items-center gap-2 mb-10">
                            <div className="">
                                <h1 className=" text-3xl text-cyan-950 font-notosans font-bold leading-none">Entries & Tracking</h1>
                                <p className="label-text text-cyan-950 text-sm">All Team Entries & Tracking</p>
                            </div>
                        </div>

                        <Suspense fallback={<TableSkeleton />}>
                            <AllUserEntriesTable Entries={UserEntries} />
                            <UserProgressDashboard />
                        </Suspense>
                    </>
                )}
            </div>
        </>
    )
}