"use client"

import { AlertCircle, KeyRound, Trash2, User, X } from "lucide-react";
import DelUserForm from "./deluserform";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function UsersTable({ Users }) {
    const { data: session, update } = useSession({ required: "true" });

    useEffect(() => {
        update(); // force refetch from /api/auth/session
    }, []);

    const filteredUsers = Users.filter(data => data.country === session.user.country)


    const [user, setuser] = useState({
        id: "",
        name: "",
        email: "",
    });


    return (<>
        {filteredUsers.length > 0 && (
            <div className="overflow-scroll w-full md:overflow-auto max-h-80 shadow-sm shadow-gray-300 rounded-xl md:flex-grow">
                <table className="table table-xs table-pin-rows bg-zinc-100">
                    <tbody>
                        <tr className="text-zinc-950/50">
                            <th>User</th>
                            <th>Email</th>
                            <th>Access</th>
                            <th>Country</th>
                            <th>
                                <div className="flex justify-end">
                                    Actions
                                </div>
                            </th>
                        </tr>
                    </tbody>
                    <tbody>
                        {filteredUsers.map((item) => (
                            <tr key={item._id} className="text-black text-xs hover:bg-zinc-100">
                                <td className="flex justify-start items-center gap-1"><User className="text-cyan-500" size={13} />
                                    {item.fname + " " + item.lname}
                                </td>
                                <td className="font-bold">{item.email}</td>
                                <td>
                                    <div className="flex justify-start items-center gap-1 font-medium">
                                        <KeyRound size={15} className="text-cyan-700" />
                                        {item.access}
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-start items-center gap-1 font-medium">
                                        {item.country}
                                    </div>
                                </td>
                                <td className="flex justify-end">

                                    {/* Del Modal */}

                                    {/* <span className={`${item.access === "Admin" ? "hidden" : "inline-block"}`}> */}
                                        <button
                                            onClick={() => {
                                                document.getElementById('del_user_modal').showModal();
                                                setuser({
                                                    id: item._id,
                                                    name: item.fname + " " + item.lname,
                                                    email: item.email,
                                                });
                                            }}
                                            type="button"
                                            className={`btn-xs flex justify-start items-center gap-1 bg-red-700 text-white rounded-full font-sans font-semibold text-xs py-0.5 px-2 cursor-pointer`}
                                        >
                                            <Trash2 size={13} className="" />
                                            <span>Delete</span>
                                        </button>
                                    {/* </span> */}

                                    <dialog id="del_user_modal" className="modal">
                                        <div className="modal-box max-w-md bg-zinc-50">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                                    <X size={15} className="text-red-700" />
                                                </button>
                                            </form>

                                            <div className="mb-5">
                                                <div className="text-xs text-cyan-950 mb-2 font-normal">{user.id}</div>
                                                <span className="label-text text-base text-cyan-950">
                                                    Delete this user <span className="text-red-700 font-semibold">
                                                        {user.email} ?
                                                    </span>
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <kbd className="kbd kbd-xs bg-zinc-100 text-black">esc</kbd>
                                                <DelUserForm id={user.id} />
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
