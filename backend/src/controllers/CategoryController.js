const express = require('express')

const categoryService = require('../services/Category')

const router = express.Router()

const CategoryService = new categoryService();

router.get('/', async (req, res) => {

    const beers = await CategoryService.all()

    res.json(beers)
})

module.exports = router