"use client"

import { Radio, RadioTower, Trash2, Tv, X } from "lucide-react";
import DelStationForm from "./delstationform";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useState } from "react";


export default function StationsTable({ Stations }) {
    const { data: session, update } = useSession({ required: "true" });

    const [stationregion, setstationregion] = useState({
        id: "",
        name: "",
        region: "",
    });


    useEffect(() => {
        update(); // force refetch from /api/auth/session
    }, []);

    const filteredStations = Stations.filter(data => data.country === session.user.country)

    return (<>
        {filteredStations.length > 0 && (
            <div className="overflow-scroll max-w-xl md:overflow-auto max-h-96 shadow-sm shadow-gray-300 rounded-xl md:flex-grow">
                <table className="table table-xs table-pin-rows bg-zinc-100">
                    <tbody>
                        <tr className="text-cyan-950/50">
                            <th>Media House</th>
                            <th>Type</th>
                            <th>Country</th>
                            <th>Region</th>
                            <th>City</th>
                            <th className=" text-end">Actions</th>
                        </tr>
                    </tbody>
                    <tbody>
                        {filteredStations.map((item) => (
                            <tr key={item._id} className="text-black hover:bg-zinc-100">
                                <td className="font-semibold text-sm">
                                    {item.name}
                                </td>
                                <td>
                                    <div className="flex justify-start items-center gap-2">
                                        {item.type === "TV" && (
                                            <Tv size={13} className="text-cyan-700" />
                                        )}
                                        {item.type === "Radio" && (
                                            <Radio size={13} className="text-cyan-700" />
                                        )}
                                        {item.type}
                                    </div>
                                </td>
                                <td className="font-normal">
                                    {item.country}
                                </td>
                                <td className="font-normal">
                                    {item.region}
                                </td>
                                <td className="font-normal">
                                    {item.city}
                                </td>
                                <td className="flex justify-end">
                                    {/* Del Modal */}
                                    <button
                                        onClick={() => {
                                            document.getElementById('del_station_modal').showModal();
                                            setstationregion({
                                                id: item._id,
                                                name: item.name,
                                                region: item.region,
                                            });
                                        }}
                                        type="button"
                                        className="btn-xs flex justify-start items-center gap-1 bg-red-700 text-white rounded-full font-sans font-semibold text-xs py-0.5 px-2">
                                        <Trash2 size={13} className="" />
                                        <span>Delete</span>
                                    </button>

                                    <dialog id="del_station_modal" className="modal">
                                        <div className="modal-box max-w-md bg-zinc-50">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                                    <X size={15} className="text-red-700" />
                                                </button>
                                            </form>

                                            <div className="mb-5">
                                                <div className="text-xs text-cyan-950 mb-2 font-normal">{stationregion.id}</div>
                                                <span className="label-text text-base text-cyan-950">
                                                    Delete this station <span className="text-red-700 font-semibold">
                                                        {stationregion.name}
                                                    </span>
                                                </span>
                                                <h1 className="text-base text-cyan-950">
                                                    with region <span className="text-red-700 font-semibold"> {stationregion.region}
                                                    </span> ?
                                                </h1>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <kbd className="kbd kbd-xs bg-zinc-100 text-black">esc</kbd>
                                                <DelStationForm id={item._id} />
                                            </div>
                                        </div>
                                    </dialog>
                                    {/* Del Modal */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
    </>)
}