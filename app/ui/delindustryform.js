"use client"

import { Trash, Trash2 } from "lucide-react"
import { useState } from "react"
import ToastAlert from "./toast"

export default function DelIndustryForm({ id }) {
    const [deleting, setdeleting] = useState(false);
    const [deleted, setdeleted] = useState(false);
    const [internalerror, setinternalerror] = useState(false);

    const handleIndustryDeletion = async (event) => {
        event.preventDefault();
        setdeleting(true)

        // const id = event.target.id.value;
        // console.log(id);

        const data = {
            id
        }

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);

        // API endpoint where we send form data.
        const endpoint = "/api/deleteindustry";

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
            setdeleted(true)
            setdeleting(false)
            setTimeout(() => {
                location.reload(true);
            }, 500);
        } else {
            setdeleting(false)
            setinternalerror(true)
        }

    }

    return (
        <>
            <form>
                {deleting === false && (
                    <button
                        onClick={handleIndustryDeletion}
                        type="submit"
                        className="btn-xs flex justify-start items-center gap-1 bg-white text-red-700 rounded-full font-sans font-semibold text-xs p-1">
                        <Trash2 size={13} className="" />
                    </button>
                )}

                {deleting === true && (
                    <button
                        type="button"
                        className="btn-xs flex justify-start items-center gap-1 bg-white/50 text-red-700 rounded-full font-sans font-semibold text-xs p-1 btn-disabled">
                        <span className="loading loading-spinner loading-xs text-red-green"></span>
                    </button>
                )}
            </form>

            <ToastAlert
                stateVar={deleted}
                textColor=" text-red-500"
                text="Industry deleted"
                onClick={() => setdeleted(false)}
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
