"use client"

import { Plus, X } from "lucide-react";
import AddUserForm from "./adduserform";


export default function AddUserModal({ Stations }) {

    return (<>
        <button
            onClick={() => document.getElementById('adduser_modal').showModal()}
            type="button"
            className="btn-xs flex justify-start items-center gap-1 bg-cyan-950 text-white rounded-full font-sans font-semibold text-xs px-2 py-1.5">
            <Plus size={13} className="" />
            <span>Add User</span>
        </button>

        <dialog id="adduser_modal" className="modal">
            <div className="modal-box w-80 bg-zinc-50">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        <X size={15} className="text-red-900" />
                    </button>
                </form>
                <div className="mb-5">
                    <h1 className="text-xl text-black font-notosans font-bold leading-none">Add New User</h1>
                    <span className="label-text text-xs text-zinc-800">Fill out the form and add User.</span>
                </div>

                <AddUserForm Stations={Stations} />
            </div>
        </dialog>
    </>)
}