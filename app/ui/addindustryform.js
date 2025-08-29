"use client"

import { Factory, Save } from "lucide-react";
import { useState } from "react";
import ToastAlert from "./toast";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Image from "next/image";

export default function AddIndustryForm({ Variants }) {
    const { data: session, status, update } = useSession({ required: "true" });

    useEffect(() => {
        update(); // force refetch from /api/auth/session
    }, []);

    const filteredVariants = Variants.filter(data => data.country === session.user.country)


    const [adding, setadding] = useState(false)
    const [industryadded, setindustryadded] = useState(false)
    const [internalerror, setinternalerror] = useState(false);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setadding(true)

        const variantId = event.target.variantId.value;
        const industry = event.target.industry.value;
        const country = event.target.country.value;

        const data = {
            variantId,
            industry,
            country
        }

        // console.log(data);

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);

        // API endpoint where we send form data.
        const endpoint = "/api/saveindustry";

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
            setindustryadded(true);
            setadding(false);
            event.target.reset();
            setTimeout(() => {
                location.reload(true);
            }, 1500);
        } else {
            setinternalerror(true)
            setadding(false);
        }

    }

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                    <select name="variantId" className="select select-sm w-full rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required defaultValue="">
                        <option className="text-xs" value="">Select Variant</option>
                        {filteredVariants.reverse().map((item) => (
                            <option key={item._id} className="text-sm" value={item._id}>{item.variant}</option>
                        ))}
                    </select>
                </div>
                <div className="grow mb-4">
                    <label className="input input-sm flex w-full md:max-w-2xl items-center gap-2 bg-zinc-100 rounded-md shadow-sm">
                        <Factory size={15} className="text-cyan-700" />
                        <input name="industry" type="text" className="grow font-semibold text-black" placeholder="Industry name" required />
                    </label>
                </div>

                {/* Country */}
                <div className="flex justify-start items-center gap-2 mb-4">
                    <select
                        name="country"
                        className="select select-sm w-full rounded-full shadow-sm bg-zinc-100 text-black font-semibold hidden"
                        required defaultValue=""
                    >
                        <option className="text-xs" value={session.user.country}>{session.user.country}</option>
                    </select>
                    {session && (
                        <>
                            <Image
                                className={`${session.user.country !== "Ghana" && "hidden"} rounded-sm`}
                                src="https://flagcdn.com/w40/gh.png"
                                width={20}
                                height={20}
                                alt="Ghana"
                            />
                            <Image
                                className={`${session.user.country !== "Nigeria" && "hidden"} rounded-sm`}
                                src="https://flagcdn.com/w40/ng.png"
                                width={20}
                                height={20}
                                alt="Nigeria"
                            />
                            <Image
                                className={`${session.user.country !== "Côte d'Ivoire" && "hidden"} rounded-sm`}
                                src="https://flagcdn.com/w40/ci.png"
                                width={20}
                                height={20}
                                alt="Côte d'Ivoire"
                            />
                        </>
                    )}
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
                stateVar={industryadded}
                textColor="text-cyan-950"
                text="Industry added."
                onClick={() => setindustryadded(false)}
                iconHint="success"
            />

            <ToastAlert
                stateVar={internalerror}
                textColor="text-red-500"
                text="Something went wrong. Try again."
                onClick={() => setinternalerror(false)}
                iconHint="internalerror"
            />
        </>
    )
}