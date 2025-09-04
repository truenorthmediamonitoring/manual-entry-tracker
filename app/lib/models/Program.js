import mongoose from 'mongoose';

const ProgramSchema = new mongoose.Schema({
    station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station',
        required: true,
    },
    programs: {
        type: [String],
        default: [],
    },
    country: {
        type: String,
        required: true,
    },
});

export default mongoose.models.Program || mongoose.model('Program', ProgramSchema);
