const express = require('express');
const router = express.Router();
const UserModel = require('../models/user')
const HttpStatus = require('http-status-codes')
const ObjectID = require('mongodb').ObjectID;

class UserController {
  static get(req, res) {
    UserModel.find()
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: "Data Users",
          data: result
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: "Data Users Error Server",
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }

  static getSingle(req, res) {
    UserModel.findById(req.params.id)
    .populate('follows')
    .exec()
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: "Data Single User",
          data: result
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: "Data User Error",
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }

  static update(req, res) {
    let { name, email, password } = req.body
    UserModel.findByIdAndUpdate(req.params.id, { name, email, password }, {new : true})
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: "User Updated",
          data: result
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: "Update User Error Server",
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }
  static destroy(req, res) {
    UserModel.findByIdAndRemove(req.params.id)
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: "User Deleted",
          data: result
        })
      })
  }

}

module.exports = UserController