import { Building, Save, Earth, X, Paperclip, Newspaper, Radio, Tv, RadioTower } from "lucide-react";
import { stationtype } from "../lib/data";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ToastAlert from "./toast";
import Image from "next/image";

export default function AddStationForm() {
    const { data: session, update } = useSession({ required: "true" });
    useEffect(() => {
        update(); // force refetch from /api/auth/session
    }, []);

    const [adding, setadding] = useState(false)
    const [stationadded, setstationadded] = useState(false)
    const [internalerror, setinternalerror] = useState(false);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setadding(true)

        const station = event.target.station.value;
        const type = event.target.type.value;
        const country = event.target.country.value;
        const region = event.target.region.value;
        const city = event.target.city.value;

        const data = {
            station,
            type,
            country,
            region,
            city,
        }

        // console.log(data);

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);

        // API endpoint where we send form data.
        const endpoint = "/api/savestation";

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
            setstationadded(true);
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
                    <div className="grow mb-4">
                        {/* <div className="label">
                            <span className="label-text font-normal text-black">Station</span>
                        </div> */}
                        <label className="input input-sm flex w-full md:max-w-2xl items-center gap-2 bg-zinc-100 rounded-md shadow-sm">

                            <input name="station" type="text" className="grow font-semibold text-black" placeholder="Station name" required />
                        </label>
                    </div>

                    <div className="grow mb-4">
                        <select name="type" className="select select-sm w-full rounded-md shadow-sm bg-zinc-100 text-black font-semibold" defaultValue="" required>
                            <option className="text-xs" value="" disabled>Station Type</option>
                            {stationtype.map((item) => (
                                <option key={item.id} className="text-sm" value={item.type}>{item.type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-start items-center gap-2 mb-4">
                        <select
                            name="country"
                            className="select select-sm w-full rounded-full shadow-sm bg-zinc-100 text-black font-semibold"
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

                </div>

                <div className="grow mb-4">
                    <label className="input input-sm flex w-full md:max-w-2xl items-center gap-2 bg-zinc-100 rounded-md shadow-sm">
                        <input name="region" type="text" className="grow font-semibold text-black" placeholder="Region" required />
                    </label>
                </div>

                <div className="grow mb-4">
                    <label className="input input-sm flex w-full md:max-w-2xl items-center gap-2 bg-zinc-100 rounded-md shadow-sm">
                        <input name="city" type="text" className="grow font-semibold text-black" placeholder="City" required />
                    </label>
                </div>


                {/* Buttons */}
                <div className="flex justify-between items-center gap-3">
                    <kbd className="kbd kbd-xs bg-zinc-100 text-black">esc</kbd>
                    <div className="flex justify-end items-center gap-3">
                        <button
                            type="reset"
                            className="btn-ghost flex justify-start items-center gap-2 bg-zinc-100 text-black rounded-full font-sans font-semibold text-xs p-1">
                            <X size={15} className="" />
                            <span>Clear</span>
                        </button>

                        {adding === false && (
                            <button
                                type="submit"
                                className="flex justify-start items-center gap-2 btn-sm bg-cyan-900 rounded-full px-3 py-1 text-white font-sans font-bold text-xs">
                                <Save size={15} className="" />
                                <span>Add</span>
                            </button>
                        )}
                        {adding === true && (
                            <button
                                type="button"
                                className="flex justify-start items-center gap-2 btn-sm bg-cyan-900/50 rounded-full px-3 py-1 text-white font-sans font-bold text-xs opacity-80 btn-disabled">
                                <span className="loading loading-spinner loading-xs text-red-green"></span>
                                <span>Adding...</span>
                            </button>
                        )}
                    </div>
                </div>
            </form>
            <ToastAlert
                stateVar={stationadded}
                textColor="text-cyan-900"
                text="Station added."
                onClick={() => setstationadded(false)}
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