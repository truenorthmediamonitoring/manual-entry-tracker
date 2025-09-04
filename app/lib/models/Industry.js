import mongoose from 'mongoose';

const IndustrySchema = new mongoose.Schema({
  variant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Variant',
    required: true,
  },
  industry: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Industry || mongoose.model('Industry', IndustrySchema);