import mongoose from 'mongoose';

const BrandSchema = new mongoose.Schema({
    variant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Variant',
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
});

export default mongoose.models.Brand || mongoose.model('Brand', BrandSchema);