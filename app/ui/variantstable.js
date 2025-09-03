"use client"
import { Edit2, Trash2, X } from "lucide-react";
import DelVariantForm from "./delvariantform";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useState } from "react";
import ToastAlert from "./toast";

export default function VariantsTable({ Variants }) {

    const { data: session, status, update } = useSession({ required: "true" });

    useEffect(() => {
        update(); // force refetch from /api/auth/session
    }, []);

    const filteredVariants = Variants.filter(data => data.country === session.user.country);

    const [formvariant, setformvariant] = useState({
        id: "",
        vari: "",
    });

    const [editing, setediting] = useState(false)
    const [variantedited, setvariantedited] = useState(false)
    const [internalerror, setinternalerror] = useState(false);

    const [vari, setvari] = useState({
        id: "",
        name: "",
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setediting(true)

        const variant = event.target.variant.value;
        const id = event.target.id.value;

        const data = {
            variant,
            id,
        }

        // console.log(data);
        // setediting(false);

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);

        // API endpoint where we send form data.
        const endpoint = "/api/editvariant";

        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: "POST",
            // Tell the server we're sending JSON.
            headers: {
                "Content-Type": "application/json",
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        };

        // Send the form data to our forms API and get a response.
        const response = await fetch(endpoint, options);

        // Get the response data from server as JSON.
        const result = await response.json();
        console.log(result);

        if (result.okay) {
            setvariantedited(true);
            setediting(false);
            event.target.reset();
            setTimeout(() => {
                location.reload(true);
            }, 1000);
        } else {
            setinternalerror(true)
            setediting(false);
        }
    }

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
                                    <td>
                                        <div className="flex justify-end items-center gap-2">

                                            {/* Edit Variant Modal Button */}
                                            <button
                                                onClick={
                                                    () => {
                                                        document.getElementById('edit_variant_modal').showModal()
                                                        setformvariant({
                                                            id: item._id,
                                                            vari: item.variant,
                                                        })
                                                    }
                                                }
                                                type="submit"
                                                className="btn-xs flex justify-start items-center gap-1 bg-white text-cyan-950 rounded-full font-sans font-semibold text-xs p-1 cursor-pointer">
                                                <Edit2 size={13} className="" />
                                            </button>

                                            {/* Edit Variant Modal */}
                                            <dialog id="edit_variant_modal" className="modal">
                                                <div className="modal-box w-80 bg-zinc-50">
                                                    <form method="dialog">
                                                        {/* if there is a button in form, it will close the modal */}
                                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                                            <X size={15} className="text-red-700" />
                                                        </button>
                                                    </form>
                                                    <div className="mb-5">
                                                        <h1 className="text-xl text-cyan-950 font-notosans font-bold leading-none">Edit Brand Variant</h1>
                                                        <span className="label-text text-xs text-zinc-800">Edit variant and save.</span>
                                                    </div>

                                                    <form onSubmit={handleFormSubmit}>
                                                        <div className="grow mb-4">
                                                            <label className="input input-sm flex w-full md:max-w-2xl items-center gap-2 bg-zinc-100 rounded-md shadow-sm">
                                                                <input
                                                                    onChange={e => setformvariant({
                                                                        id: formvariant.id,
                                                                        vari: e.target.value
                                                                    })}

                                                                    name="variant"
                                                                    type="text"
                                                                    className="grow font-semibold text-black"
                                                                    placeholder="Variant name"
                                                                    value={formvariant.vari}
                                                                    required
                                                                />
                                                            </label>
                                                        </div>

                                                        <div className="flex justify-between items-center gap-3">
                                                            <kbd className="kbd kbd-xs bg-zinc-100 text-black">esc</kbd>
                                                            <div className="flex justify-end items-center gap-3">
                                                                {editing === false && (
                                                                    <button
                                                                        name="id"
                                                                        value={formvariant.id}
                                                                        type="submit"
                                                                        className="flex justify-start items-center gap-2 btn-sm bg-cyan-950 rounded-full px-3 py-1 text-white font-sans font-bold text-xs">
                                                                        <Edit2 size={15} />
                                                                        <span>Edit</span>
                                                                    </button>
                                                                )}

                                                                {editing === true && (
                                                                    <button
                                                                        type="button"
                                                                        className="flex justify-start items-center gap-2 btn-sm bg-cyan-800 rounded-full px-3 py-1 text-white font-sans font-bold text-xs opacity-80 btn-disabled">
                                                                        <span className="loading loading-spinner loading-xs text-red-green"></span>
                                                                        <span>Editing...</span>
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </form>

                                                </div>

                                                <ToastAlert
                                                    stateVar={variantedited}
                                                    textColor="text-cyan-950"
                                                    text="Brand Variant edited."
                                                    onClick={() => setvariantedited(false)}
                                                    iconHint="success"
                                                />

                                                <ToastAlert
                                                    stateVar={internalerror}
                                                    textColor=" text-red-500"
                                                    text="Something went wrong. Try again."
                                                    onClick={() => setinternalerror(false)}
                                                    iconHint="internalerror"
                                                />
                                            </dialog>
                                            {/* Edit Variant Modal Button */}


                                            {/* Del Modal Button */}
                                            <button
                                                onClick={() => {
                                                    document.getElementById('del_variant_modal').showModal();
                                                    setvari({
                                                        id: item._id,
                                                        name: item.variant,
                                                    })
                                                }}
                                                type="button"
                                                className="btn-xs flex justify-start items-center gap-1 bg-red-700 text-white rounded-full font-sans font-semibold text-xs py-0.5 px-2 cursor-pointer">
                                                <Trash2 size={13} className="" />
                                                <span>Delete</span>
                                            </button>
                                        </div>

                                        {/* Del Modal  */}
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