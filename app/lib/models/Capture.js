import mongoose from 'mongoose';

const captureSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Station', required: true },
  month: { type: String, required: true }, // Format: YYYY-MM
  completedDays: [{ type: Number }],
}, { timestamps: true });

export default mongoose.models.Capture || mongoose.model('Capture', captureSchema);
