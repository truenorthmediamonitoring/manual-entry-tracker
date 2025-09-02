"use client"

import { Asterisk, CloudUpload, Text, TimerIcon, User2, X } from "lucide-react";
import { useState, useEffect } from "react";
import { languages, products } from "../lib/data";
import { useSession } from "next-auth/react"
import axios from "axios";
import ToastAlert from "./toast";
import Image from "next/image";

export default function DataEntryForm({ UserID, User, Variants }) {
    const { data: session, update } = useSession({ required: "true" });

    useEffect(() => {
        update(); // force refetch from /api/auth/session
    }, []);

    const filteredVariants = Variants.filter(data => data.country === session.user.country)

    const [saving, setsaving] = useState(false);
    const [entrysaved, setentrysaved] = useState(false)
    const [internalerror, setinternalerror] = useState(false);

    const [stations, setStations] = useState([]);

    const [stationID, setstationID] = useState("");
    const [stationName, setstationName] = useState("");
    const [stationRegion, setstationRegion] = useState("");
    const [stationcity, setstationcity] = useState("");
    const [stationtype, setstationtype] = useState("");
    const [stationPrograms, setstationPrograms] = useState([]);

    const [dayofweek, setDayOfWeek] = useState("");
    const [daypart, setDayPart] = useState("");

    const [variantID, setvariantID] = useState("");
    const [variantName, setvariantName] = useState("");
    const [brandgeneric, setbrandgeneric] = useState("");
    const [company, setcompany] = useState("");
    const [industry, setindustry] = useState("");
    const [category, setcategory] = useState("");

    useEffect(() => {
        if (!UserID) return;
        axios.get(`/api/user-stations?userId=${UserID}`).then(res => {
            setStations(res.data);
        });
    }, [session]);

    // Fetching Region, City, Type & Programs by passing stationID
    useEffect(() => {
        if (!stationID) return;

        const fetchRegionCityPrograms = async () => {
            const res = await fetch(`/api/regioncitytypeprograms?station=${stationID}`);
            const data = await res.json();
            console.log(data);

            setstationRegion(data.region || "");
            setstationcity(data.city || "");
            setstationtype(data.type || "");
            setstationPrograms(data.programs || []);
        };

        fetchRegionCityPrograms();
    }, [stationID]);

    // Fetching Brands, Companies, Industry & Category  by passing variantID
    useEffect(() => {
        if (!variantID) return;
        const fetchBCIC = async () => {
            const res = await fetch(`/api/brandcompanyindustrycategory?variant=${variantID}`);
            const data = await res.json();
            setbrandgeneric(data.brand || "");
            setcompany(data.company || "");
            setindustry(data.industry || "")
            setcategory(data.category || "")
        }
        fetchBCIC();
    }, [variantID])

    // Current Time
    const [currentTime, setCurrentTime] = useState("");
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const formatted = now.toLocaleTimeString("en-GB", { hour12: false }); // HH:MM:SS
            setCurrentTime(formatted);
        };

        updateTime(); // initial call
        const intervalId = setInterval(updateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    // Current/Today's Date
    const [currentDate, setCurrentDate] = useState("");
    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split("T")[0];
        setCurrentDate(formattedDate);
    }, []);

    const dayParts = [
        { start: "05:00:00", end: "09:59:59", label: "1 Morning Drive" },
        { start: "10:00:00", end: "11:59:59", label: "2 Mid Morning" },
        { start: "12:00:00", end: "14:59:59", label: "3 Afternoon" },
        { start: "15:00:00", end: "17:59:59", label: "4 Afternoon Drive" },
        { start: "18:00:00", end: "21:59:59", label: "5 Evening" },
        { start: "22:00:00", end: "23:59:59", label: "6 Late Night" },
        { start: "00:00:00", end: "04:59:59", label: "7 Overnight" }
    ];


    function toSeconds(timeStr) {
        const [h, m, s] = timeStr.split(":").map(Number);
        return h * 3600 + m * 60 + (s || 0);
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setsaving(true);

        const country = session.user.country //event.target.country.value;
        const region = stationRegion //event.target.region.value;
        const city = stationcity //event.target.city.value;
        const type = stationtype //event.target.type.value;

        const date = event.target.date.value;
        const broadcasttime = event.target.broadcasttime.value;

        const station = stationName;

        const title = event.target.title.value;
        const product = event.target.product.value;
        const duration = event.target.duration.value;
        const language = event.target.language.value;
        const program = event.target.program.value;

        const variant = variantName;
        const brand = event.target.brand.value;
        const company = event.target.company.value;
        const industry = event.target.industry.value;
        const category = event.target.category.value;

        const timesubmitted = event.target.timesubmitted.value;
        const datesubmitted = event.target.datesubmitted.value;
        const user = event.target.user.value;

        const data = {
            country,
            region,
            city,
            type,
            date,
            broadcasttime,
            daypart,
            dayofweek,
            station,
            company,
            brand,
            variant,
            category,
            industry,
            title,
            product,
            duration,
            language,
            program,
            timesubmitted,
            datesubmitted,
            user,
        }

        // console.log(data);
        // setsaving(false);

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);

        // API endpoint where we send form data.
        const endpoint = "/api/saveentry";

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
            setentrysaved(true)
            setsaving(false)
            // event.target.reset();
            setTimeout(() => { location.reload(true); }, 1000);
        } else {
            setinternalerror(true)
            setsaving(false)
        }

    }

    return (
        <>
            <form onSubmit={handleFormSubmit}>

                <div className="flex flex-wrap justify-start items-center gap-5 mb-5">
                    {/* Country */}
                    <div className="flex justify-start items-center gap-2">
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
                        <select
                            name="country"
                            className="select select-sm w-full rounded-full shadow-sm bg-zinc-100 text-black font-semibold"
                            required defaultValue=""
                        >
                            <option className="text-xs" value={session.user.country}>{session.user.country}</option>

                            {/* {countries.slice(1).map((item) => (
                                <option key={item.id} className="text-sm" value={item.country}>{item.country}</option>
                            ))} */}
                        </select>
                    </div>

                    {/* Station Selection */}
                    <div className="label flex justify-start items-center gap-1">
                        <Asterisk size={15} className=" text-red-700" />
                        <select name="station" className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold"
                            required defaultValue=""
                            onChange={(e) => {
                                const selectedID = e.target.value;
                                setstationID(selectedID);
                                const selectedStation = stations.find(item => item._id === selectedID);
                                setstationName(selectedStation?.name || '');
                            }}
                        >
                            <option className="text-xs" value="" disabled>Select Station</option>
                            {stations.map((station) => (
                                <option key={station._id} className="text-sm" value={station._id}>{station.name}</option>
                            ))}
                        </select>
                    </div>


                    {/* Region Selection*/}
                    <div className="">
                        <select name="region" className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold"
                            required defaultValue="">
                            {!stationID && (
                                <option className="text-xs" value="" disabled>
                                    {!stationID ? "Select Station first" : ""}
                                </option>
                            )}
                            {stationRegion ? (
                                <option value={stationRegion}>
                                    {stationRegion}
                                </option>
                            ) : (<option className="text-xs" value="N/A">
                                N/A
                            </option>)}
                        </select>
                    </div>

                    {/* City Selection*/}
                    <div className="">
                        <select name="city" className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required defaultValue="">
                            {!stationID && (
                                <option className="text-xs" value="" disabled>
                                    {!stationID ? "Select Station first" : ""}
                                </option>
                            )}
                            {stationcity ? (
                                <option value={stationcity}>
                                    {stationcity}
                                </option>
                            ) : (<option className="text-xs" value="N/A">
                                N/A
                            </option>)}
                        </select>
                    </div>

                    {/* Media type Selection*/}
                    <div className="">
                        <select name="type" className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold"
                            required defaultValue="">
                            {!stationtype && (
                                <option className="text-xs" value="" disabled>
                                    {!stationtype ? "Select Station first" : ""}
                                </option>
                            )}
                            {stationtype ? (
                                <option value={stationtype}>
                                    {stationtype}
                                </option>
                            ) : (<option className="text-xs" value="N/A">
                                N/A
                            </option>)}
                        </select>
                    </div>

                    {/* Date */}
                    <div className="w-full md:max-w-34">
                        <input
                            onChange={(e) => {
                                const dateValue = e.target.value;
                                if (dateValue) {
                                    const date = new Date(dateValue);
                                    const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
                                    setDayOfWeek(weekday);
                                }
                            }}
                            name="date"
                            type="date"
                            min="2018-01-01"
                            className="py-1 px-2 text-sm font-semibold rounded-md focus:outline-none shadow-sm bg-cyan-950 text-white"
                            required
                        />
                    </div>

                    {/* Broadcast Time Selection */}
                    <input
                        onChange={(e) => {
                            const timeValue = e.target.value;
                            console.log(daypart)

                            const seconds = toSeconds(timeValue);

                            for (const part of dayParts) {
                                const start = toSeconds(part.start);
                                const end = toSeconds(part.end);


                                if (start <= end) {
                                    if (seconds >= start && seconds <= end) {
                                        setDayPart(part.label);
                                        break;
                                    }
                                } else {
                                    // Handles overnight ranges (e.g., 00:00 - 04:59)
                                    if (seconds >= start || seconds <= end) {
                                        setDayPart(part.label);
                                        break;
                                    }
                                }
                            }
                        }}
                        name="broadcasttime"
                        type="time"
                        className="py-0.5 px-1 rounded-md focus:outline-none shadow-sm bg-cyan-950 text-white"
                        step={1}
                        required
                    />

                </div>

                <div className="flex flex-wrap justify-start items-center gap-5 mb-5">
                    {/* Title Entry */}
                    <div className="grow">
                        {/* <div className="label">
                            <span className="label-text font-normal text-black">Headline</span>
                        </div> */}
                        <label className="input input-sm flex w-full items-center gap-2 bg-zinc-100 rounded-md shadow-sm">
                            <Text size={15} className="text-cyan-700" />
                            <input name="title" type="text" className="grow font-semibold text-black" placeholder="Title"
                                // value={variantName}
                                defaultValue={variantName}
                                required />
                        </label>
                    </div>

                    {/* Product Selection */}
                    <div className="label flex justify-start items-center gap-1">
                        <Asterisk size={15} className="text-red-700" />
                        <select name="product" className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required defaultValue="">
                            <option className="text-xs" value="" disabled>Select Product</option>
                            {products.map((item) => (
                                <option key={item.id} className="text-sm" value={item.product}>{item.product}</option>
                            ))}
                        </select>
                    </div>

                    {/* Duration Selection */}
                    <div className="label flex justify-start items-center gap-1">
                        <Asterisk size={15} className="text-red-700" />
                        <label className="input input-sm flex items-center gap-2 bg-zinc-100 rounded-md shadow-sm">
                            <TimerIcon size={20} className="text-cyan-950" />
                            <input name="duration" type="number" min={0} className="grow font-semibold text-black" placeholder="Duration" required />
                        </label>
                    </div>

                    {/* Language Selection */}
                    <div className="label flex justify-start items-center gap-1">
                        <Asterisk size={15} className="text-red-700" />
                        <select name="language" className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required defaultValue="">
                            <option className="text-xs" value="" disabled>Select Language</option>
                            {languages.map((item) => (
                                <option key={item.id} className="text-sm" value={item.language}>{item.language}</option>
                            ))}
                        </select>
                    </div>

                    {/* Program Selection */}
                    <div className="label flex justify-start items-center gap-1">
                        <Asterisk size={15} className="text-red-700" />
                        <select name="program" className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required defaultValue="">
                            <option className="text-xs" value="" disabled>Select program</option>
                            {stationPrograms.map((program, idx) => (
                                <option key={idx} value={program}>
                                    {program}
                                </option>
                            ))}
                            {stationPrograms.length === 0 && (
                                <option className="text-xs" value="ROS">
                                    ROS (Default)
                                </option>
                            )}
                        </select>
                    </div>

                </div>

                <div className="flex flex-wrap justify-start items-center gap-5 mb-5">
                    {/* Brand Variant Selection*/}
                    <div className="label flex justify-start items-center gap-1">
                        <Asterisk size={15} className="text-red-700" />
                        <select
                            name="variant"
                            className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold"
                            required
                            defaultValue=""
                            onChange={(e) => {
                                const selectedID = e.target.value;
                                setvariantID(selectedID)
                                // setbrandgeneric("Pepsodent")
                                // setcompany("Unilever")
                                const selectedVariant = filteredVariants.find(item => item._id === selectedID);
                                setvariantName(selectedVariant?.variant || '')
                            }}
                        >
                            <option className="text-xs" value="" disabled>Select Brand Variant </option>
                            {filteredVariants.reverse().map((item) => (
                                <option key={item._id} className="text-sm" value={item._id}>
                                    {item.variant}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Brand Generic Selection*/}
                    <div>
                        <select name="brand" className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required defaultValue="">
                            {!variantID && (
                                <option className="text-xs" value="" disabled>
                                    {!variantID ? "Select Variant first" : "Select Brand Generic"}
                                </option>
                            )}
                            {brandgeneric ? (
                                <option value={brandgeneric}>
                                    {brandgeneric}
                                </option>
                            ) : (<option className="text-xs" value="N/A">
                                No Brands Available
                            </option>)}
                        </select>
                    </div>

                    {/* Company */}
                    <div>
                        <select
                            name="company"
                            className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold"
                            required
                            defaultValue=""
                        >
                            {!variantID && (
                                <option className="text-xs" value="" disabled>
                                    {!variantID ? "Select Variant first" : "Select Company"}
                                </option>
                            )}
                            {company ? (
                                <option value={company}>
                                    {company}
                                </option>
                            ) : (<option className="text-xs" value="N/A">
                                No Company Available
                            </option>)}
                        </select>
                    </div>

                    {/* Industry */}
                    <div className="">
                        <select
                            name="industry"
                            className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold max-w-xs"
                            required
                            defaultValue=""
                        >
                            {!variantID && (
                                <option className="text-xs" value="" disabled>
                                    {!variantID ? "Select Variant first" : "Select Industry"}
                                </option>
                            )}

                            {industry ? (
                                <option value={industry}>
                                    {industry}
                                </option>
                            ) : (<option className="text-xs" value="N/A">
                                No industry Available
                            </option>)}
                        </select>
                    </div>

                    {/* Category */}
                    <div>
                        <select name="category" className="select select-sm rounded-md shadow-sm bg-zinc-100 text-black font-semibold" required defaultValue="">
                            {!variantID && (
                                <option className="text-xs text-black" value="" disabled>
                                    {!variantID ? "Select Variant first" : "Select Category"}
                                </option>
                            )}
                            {category ? (
                                <option value={category}>
                                    {category}
                                </option>
                            ) : (<option className="text-xs" value="N/A">
                                No category Available
                            </option>)}
                        </select>
                    </div>

                </div>

                <div className="flex flex-wrap justify-start items-center gap-5 mb-5">

                    {/* Time Submitted (Hidden) */}
                    <input
                        name="timesubmitted"
                        type="time"
                        className="py-0.5 px-1 rounded-md focus:outline-none text-sm bg-zinc-50 text-zinc-500 hidden"
                        step={1}
                        value={currentTime}
                        disabled
                        required
                    />

                    {/* Date Submitted (Hidden) */}
                    <input
                        name="datesubmitted"
                        type="date"
                        className="py-1 px-2 text-sm font-semibold rounded-md focus:outline-none bg-cyan-950 text-white hidden"
                        value={currentDate}
                        // onChange={(e) => setCurrentDate(e.target.value)}
                        disabled
                        required
                    />

                    {/* User */}
                    <div className=" flex justify-start items-center gap-1">
                        <User2 size={15} className="text-cyan-950" />
                        <input
                            name="user"
                            type="text"
                            className="input-md bg-zinc-50 text-cyan-950 rounded-md font-semibold"
                            value={User}
                            disabled
                            required
                        />
                    </div>
                </div>

                {/* Buttons  */}
                <div className="flex justify-between items-center gap-3">
                    <kbd className="kbd kbd-xs bg-zinc-100 text-black">esc</kbd>
                    <div className="flex justify-end items-center gap-3">
                        <button
                            type="reset"
                            className="btn-ghost flex justify-start items-center gap-2 bg-zinc-100 text-cyan-700 rounded-full font-sans font-semibold text-xs p-1">
                            <X size={15} className="" />
                            <span>Clear</span>
                        </button>

                        {saving === false && (
                            <button
                                type="submit"
                                className="flex justify-start items-center gap-2 btn-sm bg-cyan-950 rounded-full px-3 py-1 text-white font-sans font-bold text-xs">
                                <CloudUpload size={15} className="" />
                                <span>Save</span>
                            </button>
                        )}

                        {saving === true && (
                            <button
                                type="button"
                                className="flex justify-start items-center gap-2 btn-sm bg-cyan-900 rounded-full px-3 py-1 text-white font-sans font-bold text-xs opacity-80 btn-disabled">
                                <span className="loading loading-spinner loading-xs text-red-green"></span>
                                <span>Saving...</span>
                            </button>
                        )}
                    </div>
                </div>
            </form>

            <ToastAlert
                stateVar={entrysaved}
                textColor="text-cyan-950"
                text="Entry saved."
                onClick={() => setentrysaved(false)}
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