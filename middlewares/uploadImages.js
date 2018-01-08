const Storage = require('@google-cloud/storage')
const Multer = require('multer')
require('dotenv').config()
const CLOUD_BUCKET = process.env.CLOUD_BUCKET
const storage = Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH
})
const bucket = storage.bucket(CLOUD_BUCKET)

const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

function upload(multerFileObj) {
  const gcsname = Date.now() + multerFileObj.originalname
  const file = bucket.file(gcsname)
  return new Promise((resolve, reject) =>{
    file.save(multerFileObj.buffer, {
      metadata: {
        contentType: multerFileObj.mimetype
      }
    })
    .then(() => file.makePublic())
    .then(resolve(getPublicUrl(gcsname)))
    .catch(reject)
  })
  
}

module.exports = {
  uploadAllFiles : (req, res, next) =>{
    if(!req.files || req.files.length == 0){
      return next()
    }
    Promise.all(req.files.map(file => upload(file)))
    .then(photos => {
      console.log(photos, 'from uploadAllFiles')
      req.photos = photos
      next()
    })
    .catch(next)
  },
  multer : Multer({
    storage: Multer.MemoryStorage,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
    },
  })
}