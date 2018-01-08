const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var houseSchema = new Schema({
  title : String,
  description: String,
  property: String,
  harga: Number,
  kamarTidur: Number,
  jumlahLantai: Number,
  kamarMandi: Number,
  sertificate: String,
  luasTanah: Number,
  luasBangunan: Number,
  address: String,
  loc: {
    type: { type: String },
    coordinates: []
  },
  userId: {
    type : Schema.Types.ObjectId,
    ref: 'User'
  },
  photos: [{
    type: String
  }]
}, { timestamps : {} })

houseSchema.index({ 
  "loc": "2dsphere",
})

module.exports = mongoose.model('House', houseSchema)