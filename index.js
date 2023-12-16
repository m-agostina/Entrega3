class ProductManager{
    constructor(){
        this.products = []
        this.id = 1
    }
    products = []

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
    }

    getProducts(){
        return this.products
    }
    getProductById(id){
        //Buscar por ID
        const product = this.products.find(p => p.id === id)

        //Validacion en caso de no encontrar ID
        if(!product){
            console.error('No se encontró producto')
        }
       return product
    }
}



// Ejemplo 
const productManager = new ProductManager()

productManager.addProduct({
  title: 'Producto 1',
  description: 'Descripción producto 1',
  price: 1999,
  thumbnail: 'ruta1.jpg',
  code: 'P001',
  stock: 11
})

productManager.addProduct({
  title: 'Producto 2',
  description: 'Descripción producto 2',
  price: 2999,
  thumbnail: 'ruta2.jpg',
  code: 'P002',
  stock: 15
})

// Mostrar todos los productos
const allProducts = productManager.getProducts();
console.log('Todos los productos:', allProducts);

// Mostrar un producto por id
const productById = productManager.getProductById(2);
console.log('Producto por ID:', productById);
