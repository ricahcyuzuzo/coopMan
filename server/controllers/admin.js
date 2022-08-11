import Mongoose from "mongoose";
import User from '../models/users';

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
