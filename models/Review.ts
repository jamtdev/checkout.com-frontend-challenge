import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    reviewId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    created: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: false,
    },
  },
  {
    collection: 'reviews',
  }
);

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);
