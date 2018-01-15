const express = require('express')
const router = express.Router()
const HouseModel = require('../models/house')
const HttpStatus = require('http-status-codes')
const ObjectID = require('mongodb').ObjectID

class HouseController {
  static get(req, res) {
    let regex = new RegExp(req.query.search, 'i')
    console.log(regex)
    HouseModel.find({
      $or : [
        { title : regex},
        { address: regex}
      ]
    })
    .populate('userId')
    .exec()
    .then(result => {
      res.status(HttpStatus.OK).json({
        messages: 'Data Search House',
        data: result,
      })
    })
    .catch(err => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        messages: 'Data House Error',
        data: err,
        error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
      })
    })
  }
}

module.exports = HouseController
