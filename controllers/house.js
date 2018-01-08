const express = require('express')
const router = express.Router()
const HouseModel = require('../models/house')
const HttpStatus = require('http-status-codes')
const ObjectID = require('mongodb').ObjectID

class HouseController {
  static get(req, res) {
    HouseModel.find()
      .populate('userId')
      .exec()
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: 'Data Houses',
          data: result,
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: 'Data Houses Error Server',
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
        })
      })
  }

  static getUserHouses(req, res) {
    HouseModel.find({ userId: req.params.id })
      .populate('userId')
      .exec()
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: 'Data User Houses',
          data: result,
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: 'Data User Houses Error',
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
        })
      })
  }

  static getSingle(req, res) {
    HouseModel.findById(req.params.id)
      .populate('userId')
      .exec()
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: 'Data Single House',
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

  static create(req, res) {
    let objHouse = {
      title: req.body.title,
      description: req.body.description,
      property: req.body.property,
      harga: req.body.harga,
      kamarTidur: req.body.kamarTidur,
      jumlahLantai: req.body.jumlahLantai,
      kamarMandi: req.body.kamarMandi,
      sertificate: req.body.sertificate,
      luasTanah: req.body.luasTanah,
      luasBangunan: req.body.luasBangunan,
      userId: req.decoded.userId,
      photos: req.photos,
      address: req.body.address,
      loc: {
        type: 'Point',
        coordinates: [Number(req.body.longitude), Number(req.body.latitude)],
      },
    }
    let dataHouse = new HouseModel(objHouse)
    dataHouse
      .save()
      .then(result => {
        return result.populate('userId').execPopulate()
      })
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: 'House Created',
          data: result,
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: 'Data House Error Server',
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
        })
      })
  }

  static update(req, res) {
    let { caption } = req.body
    PhotoModel.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.decoded.userId,
      },
      { caption },
      {
        new: true,
      }
    )
      .then(result => {
        return result.populate('userId').execPopulate()
      })
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: 'Photo Updated',
          data: result,
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: 'Update Photo Error Server',
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
        })
      })
  }

  static destroy(req, res) {
    HouseModel.findByIdAndRemove(req.params.id)
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: 'Photo Deleted',
          data: result,
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: 'Delete Photo Error Server',
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
        })
      })
  }
}

module.exports = HouseController
