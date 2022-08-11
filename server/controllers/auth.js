import Mongoose from 'mongoose';
import { comparingPassword, generateToken, hashingPassword } from "../helpers/authentication";
import User from "../models/users";


export const createAccount = (req, res) => {
  const { cooperative, email, password } = req.body;

  User.find({ email }, (error, result) => {
    if(result.length > 0){
      return res.status(409).json({
        message: 'Email is already used, please try another',
      })
    }

    const hashPassword = hashingPassword(password);
    const user = new User({
      _id: new Mongoose.Types.ObjectId(),
      cooperative,
      email,
      password: hashPassword,
      type: '1'
    });

    user
      .save()
      .then(() => {
        res.status(201).json({
          message: 'Account registered',
        });
      }).catch((err) => {
        res.status(500).json({
          message: 'Something is wrong, try again later',
          error: err
        });
      });
  })


}

export const Login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .exec()
    .then((doc) => {
      const compare = comparingPassword(password, doc.password); 
      if(compare){
        if(doc){
          res.status(200).json({
            token: generateToken(doc),
          });
        }else{
          res.status(401).json({
            message: 'Wrong email or password'
          });
        }
      }else{
        res.status(401).json({
          message: 'Wrong email or password',
        });
      }
    }).catch(err => {
      res.status(401).json({
        message: 'Wrong Email or password'
      })
    }) 
} 