const db = require('../database/db.json')

class Beer {

    constructor() {
        this.db = JSON.stringify(db)
    }

    async all() {
        const beers = db

        return beers
    }

    async findAll(params) {

        const filtered = db.filter(beer => Object.keys(params).every(param => {
            if (param == 'category' && params[param] == 'Uncategorized')
                return !beer[param]

            return beer[param] == params[param]
        }))

        return filtered
    }

    async random(n) {
        let beers = []

        for (let i = 0; i < n; i++) {
            let r = Math.floor(Math.random() * db.length)
            beers.push(db[r])
        }

        return beers
    }
}

module.exports = Beer