const express = require('express');
const router = express.Router();
const House = require('../controllers/house')
const authentification = require('../middlewares/authentification')
const uploadImages = require('../middlewares/uploadImages')

router.get('/', House.get)
router.get('/:id', House.getSingle)
router.post('/', authentification,
  uploadImages.multer.array('image'),
  uploadImages.uploadAllFiles,
  House.create)
router.put('/:id', authentification,
  uploadImages.multer.array('image'),
  uploadImages.uploadAllFiles,
  House.update)
router.delete('/:id', authentification, House.destroy)
router.get('/user/:id', authentification, House.getUserHouses)
module.exports = router