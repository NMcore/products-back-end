require("dotenv").config();
const express = require("express");
const massive = require("massive");

const { 
    create,
    getOne,
    getAll,
    update,
    remove
} = require('./products_controller')

const app = express();

const { SERVER_PORT } = process.env;

app.use(express.json());

massive({
    connectionString: process.env.CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false,
    }
})
.then((dbInstance) => {
    app.set('db', dbInstance);
    console.log('DB connected')
})
.catch((e) => {
    console.log(e)
    return e;
})
app.get('/api/products', getAll);
app.get('/api/products/:id', getOne);
app.put('/api/products/:id', update);
app.post('/api/products', create);
app.delete('/api/products/:id', remove);
app.listen(process.env.SERVER_PORT, () => console.log(`Check me out on port ${process.env.SERVER_PORT}`))
