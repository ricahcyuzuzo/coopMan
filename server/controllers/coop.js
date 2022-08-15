import jwtDecode from 'jwt-decode';
import Mongoose from 'mongoose';
import Produce from '../models/produce';
import Sold from '../models/sold';
import Waste from '../models/waisted';

export const addProduce = (req, res) => {
  const { name, quantity, trimester } = req.body;
  const token = req.headers.authorization;
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
    trimester,
    cooperative: user,
    created_at: new Date(),
    updated_at: new Date(),
  });

  produce
    .save()
    .then(() => {
      res.status(201).json({
        message: 'A new produce is added',
        produce: produce
      });
    }).catch((err) => {
      res.status(500).json({
        message: 'Something went wrong, please try again later',
        error: err
      });
    })
}
export const sellProduce = async (req, res) => {
  const { price, quantity } = req.body;
  const { produce_id } = req.query;

  const wholeProduce = await Produce.findById(produce_id).exec();
  const produce = {
    _id: wholeProduce._id,
    name: wholeProduce.name,
    quantity: wholeProduce.quantity,
    cooperative: wholeProduce.cooperative,
  };

  if(quantity < wholeProduce.quantity){
    const sold = new Sold({
      _id: new Mongoose.Types.ObjectId(),
      produce,
      price,
      quantity,
    });

  
    sold
      .save()
      .then(() => {
        Produce.findByIdAndUpdate({_id: produce_id}, { quantity: wholeProduce.quantity - quantity }).exec().then(() => {
          res.status(201).json({
            message: 'The product sold successful',
            sold
          });
        }).catch(err => {
          res.status(500).json({
            message: 'Something went wrong',
            error: err
          });
        })

      }).catch((err) => {
        res.status(500).json({
          message: 'Something went wrong',
          error: err
        });
      });
  }

}

export const getProduce = (req, res) => {
  const token = req.headers.authorization;

  Produce.find({}, (error, results) => {
    res.status(200).json({
      results
    });
  })
}

export const registerWasted = async (req, res) => {
  const { produce_id , quantity, trimester } = req.body;

  const wholeProduce = await Produce.findById(produce_id).exec();
  const produce = {
    _id: wholeProduce._id,
    name: wholeProduce.name,
    cooperative: wholeProduce.cooperative,
  };

  const wasted = new Waste({
    _id: new Mongoose.Types.ObjectId(),
    produce,
    quantity,
    trimester,
  });

  wasted
    .save()
    .then(() => {
      Produce.findByIdAndUpdate({_id: produce_id}, { quantity: wholeProduce.quantity - quantity }).exec().then(() => {
        res.status(201).json({
          message: 'The product wasted registered successful',
          wasted
        });
      }).catch(err => {
        res.status(500).json({
          message: 'Something went wrong',
          error: err
        });
      })
    })
}
