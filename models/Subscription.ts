import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  paddleSubscriptionId: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['active', 'paused', 'cancelled'],
    required: true
  },
  planId: {
    type: String,
    required: true
  },
  currentPeriodEnd: {
    type: Date,
    required: true
  },
  cancelAtPeriodEnd: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Subscription = mongoose.models?.Subscription || mongoose.model('Subscription', SubscriptionSchema);
export default Subscription;