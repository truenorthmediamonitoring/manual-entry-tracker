
import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    access: { type: String },
    country: { type: String },
    password: { type: String },
    assignedStations: [{ type: Schema.Types.ObjectId, ref: 'Station' }],
});

const User = models.User || model('User', userSchema);
export default User;
