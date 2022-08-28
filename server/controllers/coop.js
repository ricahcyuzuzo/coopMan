import jwtDecode from 'jwt-decode';
import Mongoose from 'mongoose';
import Produce from '../models/produce';
import Transaction from '../models/transactions';

export const addProduce = (req, res) => {
  const { name, quantity, pesticide, fertilizer } = req.body;
  const token = req.headers.authorization;
  if(!token){
    return res.status(400).json({
      message: "Token is Required",
    })
  }
  const decodedToken = jwtDecode(token);

  const user = {
    user_id: decodedToken.user._id,
    name: decodedToken.user.cooperative,
    email: decodedToken.user.email,
  };

  const produce = new Produce({
    _id:  new Mongoose.Types.ObjectId(),
    name,
    quantity,
    pesticide,
    fertilizer,
    cooperative: user,
    created_at: new Date(),
    updated_at: new Date(),
  });

  produce
    .save()
    .then(() => {
      const transactions = new Transaction({
        _id: new Mongoose.Types.ObjectId(),
        cooperative: user,
        produce,
        type: 'add_produce',
        quantity,
        pesticide,
        fertilizer,
        created_at: new Date(),
        updated_at: new Date(),
        amount: 0,
        comment: 'In Stock',
      });

      transactions.save().then((results) => {
        res.status(201).json({
          message: 'A new produce is added',
          produce: results.produce
        });
      }).then(err => console.log(err));
    })
}
export const sellProduce = async (req, res) => {
  const { price, quantity } = req.body;
  const { produce_id } = req.query;

  const token = req.headers.authorization;
  if(!token){
    return res.status(400).json({
      message: "Token is Required",
    })
  }
  const decodedToken = jwtDecode(token);

  const user = {
    user_id: decodedToken.user._id,
    name: decodedToken.user.cooperative,
    email: decodedToken.user.email,
  };

  const wholeProduce = await Produce.findById(produce_id).exec();
  const produce = {
    _id: wholeProduce._id,
    name: wholeProduce.name,
    quantity: wholeProduce.quantity,
    cooperative: wholeProduce.cooperative,
  };

  if(quantity < wholeProduce.quantity){
        Produce.findByIdAndUpdate({_id: produce_id}, { quantity: wholeProduce.quantity - quantity }).exec().then(() => {
          const transaction = new Transaction({
            _id: new Mongoose.Types.ObjectId(),
            cooperative: user,
            produce,
            type: 'sell_produce',
            quantity,
            pesticide: wholeProduce.pesticide,
            fertilizer: wholeProduce.fertilizer,
            created_at: new Date(),
            updated_at: new Date(),
            amount: price,
            comment: 'Sold',
          });

          transaction.save().then((results) => {
            res.status(201).json({
              message: 'The product sold successful',
              produce: results.produce
            });
          }).catch(err => {
            res.status(500).json({
              message: 'Something went wrong',
              error: err
            });
          })
        }).catch(err => {
          res.status(500).json({
            message: 'Something went wrong',
            error: err
          });
        })
  }

}

export const getProduce = (req, res) => {
  Produce.find({}, (error, results) => {
    res.status(200).json({
      results
    });
  })
}

export const registerWasted = async (req, res) => {
  const { produce_id , quantity, value } = req.body;
      
      const token = req.headers.authorization;
      if(!token){
        return res.status(400).json({
          message: "Token is Required",
        })
      }
      const decodedToken = jwtDecode(token);

      const user = {
        user_id: decodedToken.user._id,
        name: decodedToken.user.cooperative,
        email: decodedToken.user.email,
      };
      
      const wholeProduce = await Produce.findById(produce_id).exec();
      const produce = {
        _id: wholeProduce._id,
        name: wholeProduce.name,
        cooperative: wholeProduce.cooperative,
      };

      Produce.findByIdAndUpdate({_id: produce_id}, { quantity: wholeProduce.quantity - quantity }).exec().then(() => {
        Transaction.create({
          _id: new Mongoose.Types.ObjectId(),
          cooperative: user,
          produce,
          type: 'wasted_produce',
          quantity,
          pesticide: wholeProduce.pesticide,
          fertilizer: wholeProduce.fertilizer,
          created_at: new Date(),
          updated_at: new Date(),
          amount: value,
          comment: 'Wasted',
        }).then((results) => {
          res.status(201).json({
            message: 'The product wasted registered successful',
            produce: results.produce
          });
      }).catch((err) => {
        res.status(500).json({
          message: 'Something went wrong, please try again later',
          error: err
        });
      })
      }).catch(err => {
        res.status(500).json({
          message: 'Something went wrong',
          error: err
        });
      })
}

export const getTotalCategory = async (req, res) => {
  const token = req.headers.authorization;
  const decodedToken = jwtDecode(token);
  const sold = await Transaction.find({ type: 'sell_produce' }).exec();
  const wasted = await Transaction.find({ type: 'wasted_produce' }).exec();  
  const crops = await Produce.find().exec();

  const produce = crops.filter(item => item.cooperative.user_id ===  decodedToken.user._id);
  const solds = sold.filter(item => item.cooperative.user_id ===  decodedToken.user._id);
  const wastes = wasted.filter(item => item.cooperative.user_id ===  decodedToken.user._id);


  const totalProduceQuantity = produce.reduce((accumulator, object) => {
    return accumulator + object.quantity;
  }, 0);

  const totalSoldQuantity = solds.reduce((accumulator, object) => {
    return accumulator + object.quantity;
  }, 0);

  const totalWastedQuantity = wastes.reduce((accumulator, object) => {
    return accumulator + object.quantity;
  }, 0);

  



  res.status(200).json({
    coopName: decodedToken.user.cooperative, 
    produceQuantity: totalProduceQuantity,
    totalSold: totalSoldQuantity,
    totalWasted: totalWastedQuantity,
    data: {
      produce: produce,
      sold: sold,
      wasted: wasted
    }
  })

}
