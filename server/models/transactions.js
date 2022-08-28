// Let us create a model for transactions;
//
// Language: javascript
// Path: server/models/transactions.js
import mongoose from 'mongoose';

const transactionsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cooperative: Object,
    produce: Object,
    type: String,
    quantity: Number,
    pesticide: String,
    fertilizer: String,
    created_at: String,
    updated_at: String,
    amount: Number,
    comment: String,
});

const transactionsModel = mongoose.model('transactions', transactionsSchema);

export default transactionsModel;
