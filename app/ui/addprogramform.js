"use client"

import { Save } from "lucide-react"
import { useState } from "react"
import { useEffect } from "react"
import { useSession } from "next-auth/react"
import ToastAlert from "./toast"

export default function AddProgramForm({ Stations }) {
    const { data: session, update } = useSession({ required: "true" });

    useEffect(() => {
        update(); // force refetch from /api/auth/session
    }, []);

    const filteredStations = Stations.filter(data => data.country === session.user.country)

    const [adding, setadding] = useState(false)
    const [programadded, setprogramadded] = useState(false)
    const [internalerror, setinternalerror] = useState(false);


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setadding(true)

        const stationId = event.target.stationId.value;
        const program = event.target.program.value;

        const data = {
            stationId,
            program,
        }

        // console.log(data);

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);

        // API endpoint where we send form data.
        const endpoint = "/api/saveprogram";

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
            setprogramadded(true);
            setadding(false);
            event.target.reset();
            setTimeout(() => {
                location.reload(true);
            }, 1000);
        } else {
            setinternalerror(true)
            setadding(false);
        }

    }

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                    <select name="stationId" className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required defaultValue="">
                        <option className="text-xs" value="" disabled>Select Station</option>
                        {filteredStations.map((item) => (
                            <option key={item._id} className="text-sm" value={item._id}>{item.name}</option>
                        ))}
                    </select>
                </div>

                <div className="grow mb-4">
                    <label className="input input-sm flex w-full md:max-w-2xl items-center gap-2 bg-zinc-100 rounded-md shadow-sm">
                        <input name="program" type="text" className="grow font-semibold text-black" placeholder="Program name" required />
                    </label>
                </div>

                <div className="flex justify-between items-center gap-3">
                    <kbd className="kbd kbd-xs bg-zinc-100 text-black">esc</kbd>
                    <div className="flex justify-end items-center gap-3">
                        {adding === false && (
                            <button
                                type="submit"
                                className="flex justify-start items-center gap-2 btn-sm bg-cyan-950 rounded-full px-3 py-1 text-white font-sans font-bold text-xs">
                                <Save size={15} className="" />
                                <span>Add</span>
                            </button>
                        )}

                        {adding === true && (
                            <button
                                type="button"
                                className="flex justify-start items-center gap-2 btn-sm bg-cyan-800 rounded-full px-3 py-1 text-white font-sans font-bold text-xs opacity-80 btn-disabled">
                                <span className="loading loading-spinner loading-xs text-red-green"></span>
                                <span>Adding...</span>
                            </button>
                        )}
                    </div>
                </div>
            </form>

            <ToastAlert
                stateVar={programadded}
                textColor="text-cyan-950"
                text="Program added."
                onClick={() => setprogramadded(false)}
                iconHint="success"
            />

            <ToastAlert
                stateVar={internalerror}
                textColor=" text-red-500"
                text="Something went wrong. Try again."
                onClick={() => setinternalerror(false)}
                iconHint="internalerror"
            />
        </>
    )
}
