require('dotenv').config();
const express = require('express');
const massive = require('massive');
const { createProduct } = require('./controller');
const controller = require('./controller')

const app = express();
app.use(express.json());

const {SERVER_PORT,CONNECTION_STRING} = process.env;

//ENDPOINTS -------------------------------

//GET LIST
app.get('/api/inventory',controller.getList)

//GET SINGLE
app.get('/api/inventory/:id',controller.getSingle)

//ADD PRODUCT
app.post('/api/inventory',controller.createProduct)

//DELETE PRODUCT
app.delete('/api/inventory/:id',controller.deleteProduct)

//UPDATE PRODUCT
app.put('/api/inventory/:id',controller.editProduct)


//INIT SERVER--------------------------------
massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db=>{
    console.log('Massive: db connected');
    app.set("db",db);
    app.listen(SERVER_PORT, ()=>{
        console.log('Express: Server is running on port '+SERVER_PORT);
    })
}).catch(err=>console.log(err));