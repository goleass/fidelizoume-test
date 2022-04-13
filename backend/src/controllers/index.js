const express = require("express");

const beerController = require('./BeerController')
const categoryController = require('./CategoryController')

const router = express.Router()


router.use('/beer', beerController)

router.use('/category', categoryController)

module.exports = router