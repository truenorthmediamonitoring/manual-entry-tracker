import { Schema, model, models } from "mongoose";

const entrySchema = new Schema({
    country: String,
    region: String,
    city: String,
    type: String,
    date: String,
    broadcasttime: String,
    daypart: String,
    dayofweek: String,
    station: String,
    company: String,
    brand: String,
    variant: String,
    category: String,
    industry: String,
    title: String,
    product: String,
    duration: String,
    language: String,
    program: String,
    timesubmitted: String,
    datesubmitted: String,
    user: String,
});

entrySchema.index(
    {user: "text", country: "text", company: "text", station: "text", product: "text"},
    { language_override: "none" }
);

const Entry = models.Entry || model("Entry", entrySchema);
export default Entry;