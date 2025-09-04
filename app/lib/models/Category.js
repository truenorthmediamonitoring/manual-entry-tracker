import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  variant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Variant',
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);