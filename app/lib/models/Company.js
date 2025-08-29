import { Schema, model, models } from "mongoose";

const companySchema = new Schema({
    variant: {
        type: Schema.Types.ObjectId,
        ref: 'Variant',
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    // companies: {
    //     type: [String],
    //     default: [],
    // },
    country: {
        type: String,
        required: true,
    },
})

companySchema.index({ company: "text", country: "text" });

const Company = models.Company || model("Company", companySchema);
export default Company;