"use client"

import DelCategoryForm from "./delcategoryform";
import DelCategoryListForm from "./delcategorylistform";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function CategoriesTable({ Variants, Categories }) {
    const { data: session, status, update } = useSession({ required: "true" });

    useEffect(() => {
        update(); // force refetch from /api/auth/session
    }, []);

    const VariantMap = new Map(
        Variants.map((vari) => [vari._id, vari.variant])
    );

    const filteredCategories = Categories.filter(data => data.country === session.user.country)


    return (
        <>
            <div className="overflow-scroll md:overflow-auto max-h-96 max-w-lg shadow-sm shadow-gray-300 rounded-xl flex-grow">
                {filteredCategories.length > 0 && (
                    <table className="table table-xs table-pin-rows bg-zinc-100">
                        <tbody className=" ">
                            <tr className="text-cyan-950/50">
                                <th>Category</th>
                            </tr>
                        </tbody>
                        <tbody>
                            {filteredCategories.reverse().map((item) => {
                                // Convert variant ObjectId to string for consistent matching
                                const variantName = VariantMap.get(item.variant) || 'Unknown';
                                return (
                                    <tr key={item._id} className="text-black  hover:bg-zinc-100">
                                        <td className="font-semibold">
                                            <div className=" text-xs text-cyan-800 flex justify-start items-center gap-2">
                                                <span className="">{variantName}</span>
                                                <DelCategoryListForm id={item._id} />
                                            </div>
                                            <div className="text-sm flex justify-between items-center">
                                                <span className="mb-1">{item.category}</span>
                                            </div>
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
