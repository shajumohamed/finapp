import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  paddleTransactionId: {
    type: String,
    required: true,
    unique: true
  },
  subscriptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription'
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['completed', 'refunded', 'failed'],
    required: true
  }
}, {
  timestamps: true
});

const Transaction = mongoose.models?.Transaction || mongoose.model('Transaction', TransactionSchema);
export default Transaction;