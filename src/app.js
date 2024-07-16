const express = require("express");
const app = express(); 
const PUERTO = 8080; 

const ProductManager = require("./controllers/product-manager.js"); 
const manager = new ProductManager("./src/data/productos.json"); 

app.get("/", (req, res) => {
    res.send("Hola!");
})

app.get("/products", async (req, res) => {
    const arrayProductos = await manager.getProducts(); 
    res.send(arrayProductos); 
})

app.get("/products/:pid", async (req, res) => {
    let id = req.params.pid; 

    const producto = await manager.getProductById(parseInt(id)); 

    if( !producto ) {
        res.send("No se encuentra el producto deseado."); 
    } else {
        res.send({producto}); 
    }
})


app.listen(PUERTO, () => {
    console.log("Escuchando en el puerto 8080");
})


