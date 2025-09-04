"use client"
// import DelCompanyForm from "./delcompanyform";
import DelCompanyListForm from "./delcompanylistform";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function CompaniesTable({ Variants, Companies }) {

    const { data: session, status, update } = useSession({ required: "true" });

    useEffect(() => {
        update(); // force refetch from /api/auth/session
    }, []);

    const VariantMap = new Map(
        Variants.map((vari) => [vari._id, vari.variant])
    );

    const filteredCompanies = Companies.filter(data => data.country === session.user.country)

    return (
        <>
            {filteredCompanies.length > 0 && (
                <div className="overflow-scroll md:overflow-auto max-h-96 max-w-lg shadow shadow-gray-300 rounded-xl flex-grow">
                    <table className="table table-xs table-pin-rows bg-zinc-100">
                        <tbody className=" ">
                            <tr className="text-cyan-950/50">
                                <th>Company</th>
                            </tr>
                        </tbody>
                        <tbody>
                            {filteredCompanies.reverse().map((item) => {
                                // Convert variant ObjectId to string for consistent matching
                                const variantName = VariantMap.get(item.variant) || 'Unknown';
                                return (
                                    <tr key={item._id} className="text-black  hover:bg-zinc-100">
                                        <td className="font-semibold">
                                            <div className=" text-xs text-cyan-800 flex justify-start items-center gap-2">
                                                <span className="font-normal">{variantName}</span>
                                                <DelCompanyListForm id={item._id} />
                                            </div>
                                            <div className="text-sm flex justify-between items-center">
                                                <span className="mb-1">{item.company}</span>
                                                {/* <span className="mb-1 text-xs font-normal">{item.country}</span> */}
                                            </div>
                                            {/* {item.companies.map(company => (
                                                <div className="text-sm flex justify-between items-center" key={company}>
                                                    <span className="mb-1">{company}</span>
                                                    <DelCompanyForm id={item._id} company={company} />
                                                </div>
                                            ))} */}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
            {/* {Companies.length > 0 && (
                    <table className="table table-xs table-pin-rows bg-zinc-100">
                        <tbody className=" ">
                            <tr className="text-cyan-950/50">
                                <th>Company</th>
                                <th>Country</th>
                                <th className="flex justify-end items-center">Actions</th>
                            </tr>
                        </tbody>
                        <tbody>
                            {Companies.reverse().map((item) => (
                                <tr key={item._id} className="text-black text-xs hover:bg-zinc-100">
                                    <td className="font-semibold text-sm">{item.company}</td>
                                    <td className="font-normal">{item.country}</td>
                                    <td className="flex justify-end items-center">
                                        <DelCompanyForm id={item._id} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )} */}
        </>
    )
}