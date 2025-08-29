"use client"

import { Trash2 } from "lucide-react";
import { useState } from "react"
import DelIndustryForm from "./delindustryform";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function IndustriesTable({ Industries, Variants }) {
    const { data: session, status, update } = useSession({ required: "true" });

    useEffect(() => {
        update(); // force refetch from /api/auth/session
    }, []);

    const VariantMap = new Map(
        Variants.map((vari) => [vari._id, vari.variant])
    );

    const filteredIndustries = Industries.filter(data => data.country === session.user.country)


    return (
        <>
            {filteredIndustries.length > 0 && (
                <div className="overflow-scroll md:overflow-auto max-h-96 max-w-lg shadow-sm shadow-gray-300 rounded-xl flex-grow">
                    <table className="table table-xs table-pin-rows bg-zinc-100">
                        <tbody className=" ">
                            <tr className="text-cyan-950/50">
                                <th>Industry</th>
                            </tr>
                        </tbody>
                        <tbody>
                            {filteredIndustries.reverse().map((item) => {
                                // Convert variant ObjectId to string for consistent matching
                                const variantName = VariantMap.get(item.variant) || 'Unknown';
                                return (
                                    <tr key={item._id} className="text-black  hover:bg-zinc-100">
                                        <td className="font-semibold">
                                            <div className=" text-xs text-cyan-800 flex justify-start items-center gap-2">
                                                <span className=" font-normal">{variantName}</span>
                                                <DelIndustryForm id={item._id} />
                                            </div>
                                            <div className="text-sm flex justify-between items-center">
                                                <span className="mb-1">{item.industry}</span>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

            )}
            {/* <table className="table table-xs table-pin-rows bg-zinc-100">
                <tbody className=" ">
                    <tr className="text-cyan-950/50">
                        <th>Industry</th>
                        <th className="flex justify-end items-center">Actions</th>
                    </tr>
                </tbody>
                <tbody>
                    {sortedIndustries.map((item) => (
                        <tr key={item._id} className="text-black hover:bg-zinc-100">
                            <td className="font-medium text-sm">{item.industry}</td>
                            <td className="font-bold">
                                <div className="flex justify-end items-center gap-1">
                                    <DelIndustryForm id={item._id} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </>
    )
}