"use client"

import { useSession } from "next-auth/react"
import DelEntryForm from "./delentryform";
import { useState } from "react";
import { ChevronRight, Trash2, X } from "lucide-react";

export default function UserEntriesTable({ UserEntries }) {
    const { data: session } = useSession({ required: "true" });

    const filteredUserEntries = UserEntries.filter(data => data.user === session.user.name).reverse();

    const [titleStation, setTitleStation] = useState({
        title: "",
        station: "",
        broadcasttime: "",
        id: ""
    });

    return (
        <>
            {filteredUserEntries.length > 0 && (
                <div className="text-cyan-950 text-xs font-semibold mb-2 ms-1.5 flex items-center gap-1">
                    All Your Entries
                    <ChevronRight size={10} />
                </div>
            )}

            <div className="overflow-scroll max-w-full md:overflow-auto max-h-80 shadow-sm shadow-gray-300 rounded-xl md:flex-grow mb-10">
                {filteredUserEntries.length > 0 && (
                    <>
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
                                    <th  className="font-normal">User</th>
                                    <th className=" text-end">Actions</th>
                                </tr>
                            </tbody>
                            <tbody>
                                {filteredUserEntries.map((item) => (
                                    <tr key={item._id} className="text-cyan-950 hover:bg-zinc-100">
                                        <td className="font-normal">{item.country}</td>
                                        <td className="font-normal">{item.region}</td>
                                        <td className="font-normal">{item.city}</td>
                                        <td className="font-normal">{item.type}</td>
                                        <td className="font-normal">{item.date}</td>
                                        <td className="font-medium">{item.broadcasttime}</td>
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
                                        <td className="font-bold">

                                            {/* Del Modal */}
                                            <button
                                                onClick={() => {
                                                    document.getElementById('del_entry_modal').showModal();
                                                    setTitleStation({
                                                        title: item.title,
                                                        station: item.station,
                                                        broadcasttime: item.broadcasttime,
                                                        id: item._id,
                                                    });
                                                }}
                                                type="button"
                                                className="btn-xs flex justify-start items-center gap-1 bg-red-700 text-white rounded-full font-sans font-semibold text-xs py-0.5 px-2">
                                                <Trash2 size={13} className="" />
                                                <span>Del</span>
                                            </button>

                                            <dialog id="del_entry_modal" className="modal">
                                                <div className="modal-box max-w-md bg-zinc-50">
                                                    <form method="dialog">
                                                        {/* if there is a button in form, it will close the modal */}
                                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                                            <X size={15} className="text-red-700" />
                                                        </button>
                                                    </form>

                                                    <div className="mb-5">
                                                        <div className="text-xs text-cyan-950 mb-2 font-normal">{titleStation.id}</div>
                                                        <div className="label-text text-base text-cyan-950">
                                                            Delete this entry for <span className="text-red-700 font-semibold">
                                                                {titleStation.station}
                                                            </span> with title <span className="text-red-700 font-semibold">
                                                                {titleStation.title}
                                                            </span> and broadcast time <span className="text-red-700 font-semibold"> {titleStation.broadcasttime}
                                                            </span> ?
                                                        </div>
                                                        {/* <h1 className="text-base text-cyan-950">
                                                            
                                                        </h1> */}
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <kbd className="kbd kbd-xs bg-zinc-100 text-black">esc</kbd>
                                                        <DelEntryForm id={titleStation.id} />
                                                    </div>
                                                </div>
                                            </dialog>
                                            {/* Del Modal */}

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </>
    )
}
