//CONSTANTES
const express = require('express')
const bodyParser = require('body-parser');
const mercadopago = require('mercadopago');
const cors = require('cors');

let app = express();
app.use(cors());
//REQUISIÇÕES POST
app.use(bodyParser.urlencoded({extended: false}));
//REQUISIÇÕES JSON
app.use(bodyParser.json());

//ROUTES
app.post('/', (req, res) => {
    // console.log(req.body);
    res.send(JSON.stringify(`Com o valor de ${req.body.price} você consegue comprar várias coisas`));
})

//START SERVER
let port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
    console.log('Servidor Rodando')
});