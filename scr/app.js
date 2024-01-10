const express = require('express')
const ProductManager = require('../ProductManager')

const products = new ProductManager()
const app = express()
PORT = 8080

app.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`)
})

//endpoints
app.get('/products', async (req, res) => {
    try {
        const response = await products.getProducts()
        res.send(JSON.stringify(response, null, 2))
    } catch (error) {
        console.error(error)
    }
})

app.get('/products/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid)

    try {
        const product = await products.getProductById(productId)
        res.type('json').send(JSON.stringify(product, null, 2))
    } catch (error) {
        console.error(error)
    }
})
