"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import axios from "axios"

export default function UserDashboard({ UserID }) {
    const { data: session, status } = useSession();
    const [stations, setStations] = useState([]);
    const [captureData, setCaptureData] = useState({});
    const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7));

    useEffect(() => {
        if (!UserID) return;
        axios.get(`/api/user-stations?userId=${UserID}`).then(res => {
            setStations(res.data);
        });
    }, [session]);


    useEffect(() => {
        if (!UserID || stations.length === 0) return;
        stations.forEach(station => {
            axios.get(`/api/captures?userId=${UserID}&stationId=${station._id}&month=${month}`)
                .then(res => {
                    setCaptureData(prev => ({ ...prev, [station._id]: res.data.completedDays }));
                });
        });
    }, [stations, session, month]);


    const toggleDay = async (stationId, day) => {
        const currentDays = captureData[stationId] || [];
        const updatedDays = currentDays.includes(day)
            ? currentDays.filter(d => d !== day)
            : [...currentDays, day];

        setCaptureData(prev => ({ ...prev, [stationId]: updatedDays }));

        await axios.post('/api/captures', {
            userId: UserID,
            stationId,
            month,
            completedDays: updatedDays,
        });
    };


    const renderDayCheckboxes = (stationId) => {
        const [year, mon] = month.split('-').map(Number);
        const daysInMonth = new Date(year, mon, 0).getDate();
        const disabled = month < new Date().toISOString().slice(0, 7);

        return (
            <div className="grid grid-cols-7 mt-2">
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
                    <label key={day} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={captureData[stationId]?.includes(day) || false}
                            onChange={() => toggleDay(stationId, day)}
                            disabled={disabled}
                        />
                        <span className="text-sm font-normal">{day}</span>
                    </label>
                ))}
            </div>
        );
    };

    return (
        <main className="pb-6 text-cyan-900">
            <>
                {/* {stations[0].name !== "N/A" && ( */}
                <div className="mb-6">
                    {/* station.name !== "N/A" && ( */}
                    <input
                        type="month"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="py-0.5 px-2 text-sm font-bold rounded-lg focus:outline-none shadow-sm bg-cyan-700 text-white"
                    />
                    {/* ) */}
                </div>
                {/* )} */}
            </>

            <div className="flex flex-wrap gap-4 mb-5 max-w-full">
                {stations.map(station => (
                    <>
                        {station.name !== "N/A" && (
                            <>
                                <div key={station._id} className="p-6 rounded-3xl bg-cyan-50 shadow w-96">
                                    <h2 className="text-lg font-semibold">{station.name}</h2>
                                    {renderDayCheckboxes(station._id)}
                                </div>
                            </>
                        )}
                    </>
                ))}
            </div>
        </main>
    );
}