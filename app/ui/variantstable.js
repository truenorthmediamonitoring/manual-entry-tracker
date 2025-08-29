"use client"
import { Trash2, X } from "lucide-react";
import DelVariantForm from "./delvariantform";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useState } from "react";

export default function VariantsTable({ Variants }) {

    const { data: session, status, update } = useSession({ required: "true" });

    useEffect(() => {
        update(); // force refetch from /api/auth/session
    }, []);

    const filteredVariants = Variants.filter(data => data.country === session.user.country)

    const [vari, setvari] = useState({
        id: "",
        name: "",
    });

    return (
        <>
            {filteredVariants.length > 0 && (
                <div className="overflow-scroll md:overflow-auto max-h-96 max-w-lg shadow-sm shadow-gray-300 rounded-xl flex-grow">

                    <table className="table table-xs table-pin-rows bg-zinc-100">
                        <tbody className=" ">
                            <tr className="text-cyan-950/50">
                                <th>Brand (Variant)</th>
                                <th className="flex justify-end items-center">Actions</th>
                            </tr>
                        </tbody>
                        <tbody>
                            {filteredVariants.reverse().map((item) => (
                                <tr key={item._id} className="text-black text-xs hover:bg-zinc-100">
                                    <td className="font-semibold text-sm">{item.variant}</td>
                                    <td className="flex justify-end items-center">

                                        {/* Del Modal */}
                                        <button
                                            onClick={() => {
                                                document.getElementById('del_variant_modal').showModal();
                                                setvari({
                                                    id: item._id,
                                                    name: item.variant,
                                                })
                                            }}
                                            type="button"
                                            className="btn-xs flex justify-start items-center gap-1 bg-red-700 text-white rounded-full font-sans font-semibold text-xs py-0.5 px-2">
                                            <Trash2 size={13} className="" />
                                            <span>Delete</span>
                                        </button>

                                        <dialog id="del_variant_modal" className="modal">
                                            <div className="modal-box max-w-md bg-zinc-50">
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                                        <X size={15} className="text-red-700" />
                                                    </button>
                                                </form>

                                                <div className="mb-5">
                                                    <div className="text-xs text-cyan-950 mb-2 font-normal">{vari.id}</div>
                                                    <div className="label-text text-base text-cyan-950">
                                                        Delete this brand variant <span className="text-red-700 font-semibold">
                                                            &apos;{vari.name}&apos;
                                                        </span> ?
                                                    </div>
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <kbd className="kbd kbd-xs bg-zinc-100 text-black">esc</kbd>
                                                    <DelVariantForm id={vari.id} />
                                                </div>
                                            </div>
                                        </dialog>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )

}