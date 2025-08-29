import { Schema, model, models } from "mongoose";

const stationSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['Radio', 'TV'], required: true },
    country: { type: String, enum: ["Ghana", "Nigeria", "Côte d'Ivoire"], required: true },
    region: { type: String,  required: true },
    city: { type: String,  required: true },
});

stationSchema.index({ country: "text" })

const Station = models.Station || model('Station', stationSchema);
export default Station