"use client"

import DelProgramForm from "./delprogramform";
import DelProgramListForm from "./delprogramlistform";
import { useSession } from "next-auth/react";
import { useEffect } from "react";


export default function StationsProgramsTable({ Stations, Programs }) {
    const { data: session, status, update } = useSession({ required: "true" });

    useEffect(() => {
        update(); // force refetch from /api/auth/session
    }, []);

    // const filteredStations = Stations.filter(data => data.country === session.user.country)

    const stationMap = new Map(
        Stations.map((sta) => [sta._id, sta.name])
    );

    // const filteredProgram = Programs.filter(data => data.station === session.user.country)


    return (
        <>
            <div className="overflow-scroll md:overflow-auto max-h-80 max-w-lg shadow-sm shadow-gray-300 rounded-xl flex-grow">
                {Programs.length > 0 && (
                    <table className="table table-xs table-pin-rows bg-zinc-100">
                        <tbody className=" ">
                            <tr className="text-cyan-950/50">
                                <th>Program</th>
                            </tr>
                        </tbody>
                        <tbody>
                            {Programs.map((item) => {
                                // Convert industry ObjectId to string for consistent matching
                                const stationName = stationMap.get(item.station) || 'Unknown';
                                return (
                                    <tr key={item._id} className="text-black  hover:bg-zinc-100">
                                        <td className="font-semibold">
                                            <div className=" text-xs text-cyan-800 flex justify-start items-center gap-2">
                                                <span className="">{stationName}</span>
                                                <DelProgramListForm id={item._id} />
                                            </div>
                                            {item.programs.map(program => (
                                                <div className="text-sm flex justify-between items-center" key={program}>
                                                    <span className="mb-1">{program}</span>
                                                    <DelProgramForm id={item._id} program={program} />
                                                </div>
                                            ))}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    )
}
