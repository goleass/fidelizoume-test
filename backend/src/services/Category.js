const db = require('../database/db.json')

class Category {

    constructor() {
        this.db = JSON.stringify(db)
    }

    async all() {
        let categories = db.map(item => {
            const category = item.category

            if(!category) return 'Uncategorized'

            return category
        })

        categories = [...new Set(categories)]

        categories = categories.sort()

        return categories
    }
}

module.exports = Category