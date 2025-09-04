import getUserEntries from "@/app/lib/getUserEntries";
import * as XLSX from "xlsx"
import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const country = searchParams.get("country");

    // Fetch data
    let userentries = await getUserEntries();
    const jsonUserEntries = JSON.parse(JSON.stringify(userentries));

    // Filter by country if provided
    const filteredEntries = jsonUserEntries.filter((data) => {
        const isCountry = country ? data.country === country : true
        return isCountry;
    });

    const finalData = filteredEntries.map(({ _id, __v, ...rest }) => ({
        ...rest,
        // datesubmitted: new Date(datesubmitted).toISOString().split("T")[0], // Formats date as YYYY-MM-DD
    }));

    // Convert data to worksheet
    const ws = XLSX.utils.json_to_sheet(finalData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Entries" + country);

    // Generate buffer
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });

    // Set response headers
    const headers = new Headers();
    headers.append("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    headers.append("Content-Disposition", "attachment; filename=headlines.xlsx");

    return new NextResponse(buffer, { headers });
}