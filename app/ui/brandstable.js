"use client"
// import DelBrandForm from "./delbrandform";
import DelBrandListForm from "./delbrandlistform";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function BrandsTable({ Variants, Brands }) {

    const { data: session, status, update } = useSession({ required: "true" });

    useEffect(() => {
        update(); // force refetch from /api/auth/session
    }, []);

    const VariantMap = new Map(
        Variants.map((vari) => [vari._id, vari.variant])
    );

    const filteredBrands = Brands.filter(data => data.country === session.user.country)


    return (
        <>
            {filteredBrands.length > 0 && (
                <div className="overflow-scroll md:overflow-auto max-h-96 max-w-lg shadow-sm shadow-gray-300 rounded-xl flex-grow">
                    <table className="table table-xs table-pin-rows bg-zinc-100">
                        <tbody className=" ">
                            <tr className="text-cyan-950/50">
                                <th>Brand (Generic)</th>
                            </tr>
                        </tbody>
                        <tbody>
                            {filteredBrands.reverse().map((item) => {
                                // Convert variant ObjectId to string for consistent matching
                                const variantName = VariantMap.get(item.variant) || 'Unknown';
                                return (
                                    <tr key={item._id} className="text-black  hover:bg-zinc-100">
                                        <td className="font-semibold">
                                            <div className=" text-xs text-cyan-800 flex justify-start items-center gap-2">
                                                <span className=" font-normal">{variantName}</span>
                                                <DelBrandListForm id={item._id} />
                                            </div>
                                            <div className="text-sm flex justify-between items-center">
                                                <span className="mb-1">{item.brand}</span>
                                            </div>
                                            {/* {item.brands.map(brand => (
                                                <div className="text-sm flex justify-between items-center" key={brand}>
                                                    <span className="mb-1">{brand}</span>
                                                    <DelBrandForm id={item._id} brand={brand} />
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
        </>
    )
}