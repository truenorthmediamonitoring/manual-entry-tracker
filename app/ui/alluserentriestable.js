"use client"

import { ChevronRight, FileText } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import DownloadAsXlsxFile from "./downloadasxlxsfile";


export default function AllUserEntriesTable({ Entries }) {
    const { data: session, status, update } = useSession({ required: "true" });

    useEffect(() => {
        update(); // force refetch from /api/auth/session
    }, []);

    const filteredEntries = Entries.filter(data => data.country === session.user.country)

    return (
        <>
            {/* {status === "loading" && (<span className="loading loading-spinner loading-xs text-cyan-950"></span>)} */}

            {filteredEntries.length > 0 && (
                <div className="text-cyan-950 text-xs mb-2 ms-1.5 flex items-center gap-1">
                    {status === "loading" && (<span className="loading loading-spinner loading-xs text-cyan-950"></span>)}
                    {session.user.country && (
                        <>
                            <FileText size={15} />
                            All Entries <span className=" font-bold">({session.user.country})</span>
                            <ChevronRight size={15} />
                        </>)}
                </div>
            )}

            {filteredEntries.length > 0 && (
                <>
                    <div className="overflow-scroll max-w-full md:overflow-auto max-h-94 shadow-sm shadow-gray-300 rounded-xl md:flex-grow mb-4">
                        <table className="table table-xs table-pin-rows bg-zinc-50">
                            <tbody>
                                <tr className="text-cyan-950/50">
                                    <th className="font-normal">Country</th>
                                    <th className="font-normal">Region</th>
                                    <th className="font-normal">City</th>
                                    <th className="font-normal">Type</th>
                                    <th className="font-normal">Date</th>
                                    <th className="font-normal">Broadcast Time</th>
                                    <th className="font-normal">Daypart</th>
                                    <th className="font-normal">Day of Week</th>
                                    <th className="font-normal">Media House</th>
                                    <th className="font-normal">Company</th>
                                    <th className="font-normal">Brand Generic</th>
                                    <th className="font-normal">Brand Variant</th>
                                    <th className="font-normal">Category</th>
                                    <th className="font-normal">Industry</th>
                                    <th className="font-normal">Title</th>
                                    <th className="font-normal">Product</th>
                                    <th className="font-normal">Duration</th>
                                    <th className="font-normal">Language</th>
                                    <th className="font-normal">Program</th>
                                    <th className="font-normal">Time Submitted</th>
                                    <th className="font-normal">Date Submitted</th>
                                    <th className="font-normal">User</th>
                                    {/* <th className=" text-end">Actions</th> */}
                                </tr>
                            </tbody>
                            <tbody>
                                {filteredEntries.reverse().map((item) => (
                                    <tr key={item._id} className="text-cyan-950 hover:bg-zinc-100">
                                        <td className="font-normal">{item.country}</td>
                                        <td className="font-normal">{item.region}</td>
                                        <td className="font-normal">{item.city}</td>
                                        <td className="font-normal">{item.type}</td>
                                        <td className="font-normal">{item.date}</td>
                                        <td className="font-bold">{item.broadcasttime}</td>
                                        <td className="font-medium">{item.daypart}</td>
                                        <td className="font-medium">{item.dayofweek}</td>
                                        <td className="font-black text-sm">{item.station}</td>
                                        <td className="font-normal">{item.company}</td>
                                        <td className="font-normal">{item.brand}</td>
                                        <td className="font-normal">{item.variant}</td>
                                        <td className="font-normal">{item.category}</td>
                                        <td className="font-normal">{item.industry}</td>
                                        <td className="font-bold">{item.title}</td>
                                        <td className="font-normal">{item.product}</td>
                                        <td className="font-normal">{item.duration}</td>
                                        <td className="font-normal">{item.language}</td>
                                        <td className="font-normal">{item.program}</td>
                                        <td className="font-normal">{item.timesubmitted}</td>
                                        <td className="font-normal">{item.datesubmitted.slice(0,10)}</td>
                                        <td className="font-bold">{item.user}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-wrap justify-between items-center gap-2 mb-15">
                        <div className="badge badge-sm bg-cyan-950 text-white border-0 rounded-full flex items-center gap-1.5">
                            <span>Count:</span>
                            <span className="font-bold">{filteredEntries.length}</span>
                        </div>
                        <DownloadAsXlsxFile />
                    </div>
                </>
            )}
        </>
    )

}