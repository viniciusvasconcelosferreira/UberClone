//CONSTANTES
const express = require('express')
const bodyParser = require('body-parser');
const mercadopago = require('mercadopago');
const cors = require('cors');
const config = require('../config')

let app = express();
app.use(cors());
//REQUISIÇÕES POST
app.use(bodyParser.urlencoded({extended: false}));
//REQUISIÇÕES JSON
app.use(bodyParser.json());

//CONFIGURAÇÃO DO MERCADO PAGO
mercadopago.configure({
    access_token: config.token
});

//ROUTES
app.post('/', (req, res) => {
    let preference = {
        //ARRAY DE ITENS
        items: [{
            title: req.body.address,
            quantity: 1,
            currency_id: 'BRL',
            unit_price: parseFloat(req.body.price)
        }],
        payer: {
            //EMAIL DO PAGADOR
            name: "Vinicius Vasconcelos",
            email: "demo@mail.com"
        },
        payment_method: {
            //LIMITE DE PARCELAS
            installments: 3,
            //EXCLUSÃO DE MÉTODOS DE PAGAMENTO
            excluded_payment_types: [
                {"id": "ticket"},
                {"id": "debit_card"}
            ]
        },
    };

    mercadopago.preferences.create(preference).then(function (data) {
        //RESPONSE PARA O FRONTEND
        res.send(JSON.stringify(data.response.sandbox_init_point));
    }).catch(function (error) {
        console.log(error);
    });

    // console.log(req.body);
    // res.send(JSON.stringify(`Com o valor de ${req.body.price} você consegue comprar várias coisas`));
})

//START SERVER
let port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
    console.log('Servidor Rodando')
});