"use client"

import { Plus, X } from "lucide-react";
import DataEntryForm from "./dataentryform";


export default function DataEntryModal({ UserID, User, Variants }) {
    return (
        <>
            <button
                onClick={() => document.getElementById('data_capture_modal').showModal()}
                type="button"
                className="btn-xs flex justify-start items-center gap-1 bg-cyan-950 text-white rounded-full font-sans font-semibold text-xs py-1.5 px-2">
                <Plus size={13} className="" />
                <span>Make an Entry</span>
            </button>


            <dialog id="data_capture_modal" className="modal">
                <div className="modal-box max-w-7xl bg-zinc-50">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            <X size={15} className="text-red-700" />
                        </button>
                    </form>
                    <div className="mb-5">
                        <h1 className="text-xl text-cyan-950 font-notosans font-bold leading-none">Add Entry</h1>
                        <span className="label-text text-xs text-zinc-800">Fill out the form and Save.</span>
                    </div>

                    <DataEntryForm UserID={UserID} User={User} Variants={Variants} />
                </div>
            </dialog>
        </>
    )
}