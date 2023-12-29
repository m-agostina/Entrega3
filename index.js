const fs = require ('node:fs')

class ProductManager{
    constructor(){
        this.products = []
        this.id = 1
        this.path = './products.json'
    }
  
    addProduct(product) {
        //Validar campos como obligatorios
        if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock){
            console.error('Todos los campos son obligatorios.')
            return 
        }

        //Validar que 'code' no se repita
        if(this.products.some(p => p.code === product.code)){
            console.error('No se debe repetir el código del producto.')
            return
        }

        //Agregar producto con ID autoincrementable
        product.id = this.id++
        this.products.push(product)
        console.log(`Se añadió el producto con código ${product.code}`)

        //Guardar en array
        this.saveProducts()
    }

    getProducts(){
        try {
            const data = fs.readFileSync(this.path, 'utf-8')
            this.products = JSON.parse(data)

            return this.products
        } catch(err){
            console.log('Error al cargar productos')
        }
    }

    getProductById(id){
        try {
            const data =  fs.readFileSync(this.path, 'utf-8')
            this.products = JSON.parse(data)
            
            //Buscar por ID
            const product = this.products.find(p => p.id === id)
            
            //Validacion en caso de no encontrar ID
            if(!product){
                console.error('No se encontró producto')
            }else {
                return product     
            }

        } catch(err){
            console.log('Error al cargar productos')
        }
    }
    //Se crea funcion para evitar codear de mas
    saveProducts() {
        try{
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8')
            console.log('Productos guardados en el archivo:', this.path)
        } catch(err){
            console.error('Error al guardar productos')
        }
    }
    
    updateProduct(id, updatedProduct) {
        try{
            const data = fs.readFileSync(this.path, 'utf-8')
            this.products = JSON.parse(data)

            // Buscar con el ID
            const index = this.products.findIndex(p => p.id === id)

            // Validar si no se encontró-
            if (index === -1) {
                console.error('No se encontró producto con ID:', id)
                return
            }

            // Actualizar sin cambiar ID
            this.products[index] = { ...this.products[index], ...updatedProduct }

            this.saveProducts()

            console.log(`Producto con ID ${id} actualizado correctamente`)
        } catch(err){
            console.error('Error al actualizar producto')
        }
    }

    deleteProduct(id){
        try{
            const data = fs.readFileSync(this.path, 'utf-8')
            this.products = JSON.parse(data)

            // Filtrar productos para excluir el ID que utilizamos.
            this.products = this.products.filter(p => p.id !== id)

            this.saveProducts()

            console.log(`Producto con ID ${id} eliminado correctamente`)
        } catch(err){
            console.error('Error al eliminar producto');
        }
    }
}


// Ejemplos de uso
const productManager = new ProductManager()
/*
// Ejemplo de addProduct
const newProduct = {
    title: 'Producto 1',
    description: 'Descripción producto 1',
    price: 1999,
    thumbnail: 'ruta1.jpg',
    code: 'P001',
    stock: 11
}
const newProduct2 = {
    title: 'Producto 2',
    description: 'Descripción producto 2',
    price: 2999,
    thumbnail: 'ruta2.jpg',
    code: 'P002',
    stock: 15
}

const newProduct3 = {
    title: 'Producto 3',
    description: 'Descripción producto 3',
    price: 3999,
    thumbnail: 'ruta3.jpg',
    code: 'P003',
    stock: 21
}

productManager.addProduct(newProduct)
productManager.addProduct(newProduct2)
productManager.addProduct(newProduct3)

// Ejemplo de getProducts
const allProducts = productManager.getProducts();
console.log('Todos los productos:', allProducts);

// Ejemplo de getProductById
const foundProduct =  productManager.getProductById(2);
console.log('Producto encontrado por ID:', foundProduct);

// Ejemplo de updateProduct
const productId = 1
const updatedProduct = {
    title: 'Producto actualizado',
    price: 2550,
    stock: 5
}
productManager.updateProduct(productId, updatedProduct)

// Ejemplo de deleteProduct
const productToDelete = 2
productManager.deleteProduct(productToDelete)

// Obtener todos los productos después 
const allProductsAfter = productManager.getProducts()
console.log('Todos los productos después de las operaciones:', allProductsAfter)*/