import mongoose from 'mongoose';


const VariantSchema = new mongoose.Schema({
    variant: {
        type: String,
        required: true,
        unique: true,
        // trim: true,
    },
    country: {
        type: String,
        required: true,
    },
});

export default mongoose.models.Variant || mongoose.model('Variant', VariantSchema);