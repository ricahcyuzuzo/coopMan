import Mongoose from "mongoose";
import User from '../models/users';
import Transaction from '../models/transactions';

export const getUsers = (req, res) => {
  User.find()
    .exec()
    .then((res) => {
      res.status(200).json({
        results: res
      });
    }).catch(err => {
      res.status(500).json({
        error: err,
      })
    })
}

export const getTransactions = async (req, res) => {
  const transactions = await Transaction.find().exec();
  
  const totalCooperatives = await User.find({ type: '1' }).exec();
  const soldTrans = await Transaction.find({ type: 'sell_produce' }).exec();
  const wastedTrans = await Transaction.find({ type: 'wasted_produce' }).exec();  

  console.log(wastedTrans);


  const totalIncome = soldTrans.reduce((accumulator, object) => {
    return accumulator + object.amount;
  }, 0);

  const totalLoss = wastedTrans.reduce((accumulator, object) => {
    return accumulator + object.amount
  }, 0);

  if(transactions){
    return res.status(200).json({
      cooperatives: totalCooperatives.length,
      totalIncome,
      totalLoss,
      transactions
    });
  }
}
