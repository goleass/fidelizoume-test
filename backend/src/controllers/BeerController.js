const express = require('express')

const beerService = require('../services/Beer')

const router = express.Router()

const BeerService = new beerService();

router.get('/', async (req, res) => {

    const {page, limit} = req.query

    const params = {...req.query, page:undefined, limit:undefined}

    const startIndex = (page -1) * limit
    
    const endIndex = page * limit

    let beers = await BeerService.findAll(params)

    const totalBeers = beers.length

    beers = beers.slice(startIndex, endIndex)
    
    res.json({totalBeers, beers})
})

router.get('/random', async (req, res) => {

    const beers = await BeerService.random(5)

    res.json(beers)
})

module.exports = router