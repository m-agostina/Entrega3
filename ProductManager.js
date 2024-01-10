const fs = require ('fs')

class ProductManager {
    constructor() {
        this.products = []
        this.id = 1
        this.path = './products.json'
    }

    addProduct(product) {
        // Validar campos como obligatorios
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.error('Todos los campos son obligatorios.')
            return
        }

        // Validar que 'code' no se repita
        if (this.products.some(p => p.code === product.code)) {
            console.error('No se debe repetir el código del producto.')
            return
        }

        // Agregar producto con ID autoincrementable
        product.id = this.id++
        this.products.push(product)
        console.log(`Se añadió el producto con código ${product.code}`)

        // Guardar
        this.saveProducts()
    }


    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            this.products = JSON.parse(data)
    
            return this.products
        } catch (err) {
            console.log('Error al cargar productos')
        }
    }

    async getProductById(id) {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            this.products = JSON.parse(data)
            
            const product = this.products.find(p => p.id === id)
            return product
        } catch (err) {
            console.error('No se encontró producto')
        }
    }

    // Se crea función para evitar codear de más
    async saveProducts() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8')
            console.log('Productos guardados en el archivo')
        } catch (err) {
            console.error('Error al guardar productos')
        }
    }

    async updateProduct(id, updatedProduct) {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            this.products = JSON.parse(data)

            // Buscar con el ID
            const index = this.products.findIndex(p => p.id === id)

            // Validar si no se encontró
            if (index === -1) {
                console.error('No se encontró producto con ID:', id)
                return;
            }

            // Actualizar sin cambiar ID
            this.products[index] = { ...this.products[index], ...updatedProduct }

            await this.saveProducts()

            console.log(`Producto con ID ${id} actualizado correctamente`)
        } catch (err) {
            console.error('Error al actualizar producto')
        }
    }

    async deleteProduct(id) {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            this.products = JSON.parse(data)

            // Filtrar productos para excluir el ID que utilizamos
            this.products = this.products.filter(p => p.id !== id)

            await this.saveProducts()

            console.log(`Producto con ID ${id} eliminado correctamente`)
        } catch (err) {
            console.error('Error al eliminar producto')
        }
    }
}


module.exports = ProductManager
