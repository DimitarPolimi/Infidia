const functions = require('firebase-functions');
const admin = require('firebase-admin');

var serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://infidia.firebaseio.com"
});




const express = require('express');
const app = express();
const db = admin.firestore();
const cors = require('cors');
app.use(cors({ origin:true } ));

//Routes


//Create Client
app.post('/api/create_client', (req, res)=> {
    
    (async () =>{
        
        try
        {
            await db.collection('clients').doc('/' +req.body.id + '/')
            .create({
                name: req.body.name,
                vat: req.body.vat,
                reqnumber: req.body.reqnumber,
                authrepresentative: req.body.authrepresentative,
                street: req.body.street,
                zip: req.body.zip,
                city: req.body.city,
                country: req.body.country
                
            }) 

            return res.status(200).send();
        }
        catch(error)
        
        {
             console.log(error);
             return res.status(500).send(error);
        }
    })(); 
});

//Create store
app.post('/api/create_store', (req, res)=> {
    
    (async () =>{
        
        try
        {
            await db.collection('stores').doc('/' +req.body.id + '/')
            .create({
                name: req.body.name,
                telnumber: req.body.telnumber,
                email: req.body.email,
                street: req.body.street,
                zip: req.body.zip,
                city: req.body.city,
                country: req.body.country
                
            }) 

            return res.status(200).send();
        }
        catch(error)
        
        {
             console.log(error);
             return res.status(500).send(error);
        }
    })(); 
});

//Create product
app.post('/api/create_product', (req, res)=> {
    
    (async () =>{
        
        try
        {
            await db.collection('products').doc('/' +req.body.id + '/')
            .create({
                name: req.body.name,
                unit: req.body.unit,
                price: req.body.price,
            }) 

            return res.status(200).send();
        }
        catch(error)
        
        {
             console.log(error);
             return res.status(500).send(error);
        }
    })(); 
});


//Create Invoice

app.post('/api/create_invoice', (req, res)=> {
    
    (async () =>{
        
        try
        {
            await db.collection('invoices').doc('/' +req.body.id + '/')
            .create({
                clientname: req.body.clientname,
                invoiceamaount: req.body.invoiceamaount,
                duedate: req.body.duedate,
            }) 

            return res.status(200).send();
        }
        catch(error)
        
        {
             console.log(error);
             return res.status(500).send(error);
        }
    })(); 
});

//Create Order
app.post('/api/create_order', (req, res)=> {
    
    (async () =>{
        
        try
        {
            await db.collection('orders').doc('/' +req.body.id + '/')
            .create({
                productname: req.body.productname,
                quantity: req.body.quantity
            
            }) 

            return res.status(200).send();
        }
        catch(error)
        
        {
             console.log(error);
             return res.status(500).send(error);
        }
    })(); 
});

//Read Client ID
app.get('/api/clientid/:id', (req, res)=> {

    (async () => {
        try 
        {
            const document = db.collection('clients').doc(req.params.id);
            let client = await document.get();
            let response = client.data();

            return res.status(200).send(response);
        }
        catch(error)
        {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

//Read All Clients

app.get('/api/clients', (req, res)=> {

    (async () => {
        try 
        {
            
            let query = db.collection('clients');
            let response =[];

            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs; //results

                for (let doc of docs)
                {
                    const selectedItem ={
                        id: doc.id,
                        name: doc.data().name,
                        vat: doc.data().vat,
                        reqnumber: doc.data().reqnumber,
                        authrepresentative: doc.data().authrepresentative,
                        street: doc.data().street,
                        zip: doc.data().zip,
                        city: doc.data().city,
                        country: doc.data().country

                    }
                    response.push(selectedItem); 
                }
                return response;
            })
            return res.status(200).send(response);
        }
        catch(error)
        {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
}); 

//Read Store ID
app.get('/api/storeid/:id', (req, res)=> {

    (async () => {
        try 
        {
            const document = db.collection('stores').doc(req.params.id);
            let store = await document.get();
            let response = store.data();

            return res.status(200).send(response);
        }
        catch(error)
        {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

//Read All Stores
app.get('/api/stores', (req, res)=> {

    (async () => {
        try 
        {
            
            let query = db.collection('stores');
            let response =[];

            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs; //results

                for (let doc of docs)
                {
                    const selectedItem ={
                        id: doc.id,
                        name: doc.data().name,
                        telnumber: doc.data().telnumber,
                        email: doc.data().email,
                        street: doc.data().street,
                        zip: doc.data().zip,
                        city: doc.data().city,
                        country: doc.data().country

                    }
                    response.push(selectedItem); 
                }
                return response;
            })
            return res.status(200).send(response);
        }
        catch(error)
        {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
}); 

//Read all stores mobile
exports.getAllStores = functions.https.onCall((data, context) => { 
    const uid = context.auth.uid;
    return db
    .collection('users')
    .doc(uid)
    .collection("stores")
    .get().then( querySnapshot => {
        let docs = querySnapshot.docs; //results
        let response =[];
        for (let doc of docs)
        {
            response.push( {
                id: doc.id,
                name: doc.data().name,
                city: doc.data().city,
                country: doc.data().country,
                street: doc.data().street
            })
        }
        return response;
    });
});

//Read all stores mobile
exports.getAllProducts = functions.https.onCall((data, context) => { 
    const uid = context.auth.uid;
    return db
        .collection('users')
        .doc(uid)
        .collection('products')
        .get().then( querySnapshot => {
            let docs = querySnapshot.docs; //results
            let response =[];
            for (let doc of docs)
            {
                response.push( {
                    id: doc.id,
                    name: doc.data().name,
                    price: doc.data().price
                })
            }
            return response;
        });
});

exports.createOrder = functions.https.onCall((data, context) => {
    const uid = context.auth.uid;
    return db
        .collection('users')
        .doc(uid)
        .collection('orders')
        .add(data).then(function(docRef) {
            return {orderId: docRef.id};
        })
});

//Read Product ID
app.get('/api/productid/:id', (req, res)=> {

    (async () => {
        try 
        {
            const document = db.collection('products').doc(req.params.id);
            let product = await document.get();
            let response = product.data();

            return res.status(200).send(response);
        }
        catch(error)
        {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

//Read All Products
app.get('/api/products', (req, res)=> {

    (async () => {
        try 
        {
            
            let query = db.collection('products');
            let response =[];

            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs; //results

                for (let doc of docs)
                {
                    const selectedItem ={
                        id: doc.id,
                        idnumber: doc.data().idnumber,
                        name: doc.data().name,
                        unit: doc.data().unit,
                        price: doc.data().price

                    }
                    response.push(selectedItem); 
                }
                return response;
            })
            return res.status(200).send(response);
        }
        catch(error)
        {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
}); 

//Read InvoiceId
app.get('/api/invoiceid/:id', (req, res)=> {

    (async () => {
        try 
        {
            const document = db.collection('invoices').doc(req.params.id);
            let invoice = await document.get();
            let response = invoice.data();

            return res.status(200).send(response);
        }
        catch(error)
        {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

//Read All Invoices
app.get('/api/invoices', (req, res)=> {

    (async () => {
        try 
        {
            
            let query = db.collection('invoices');
            let response =[];

            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs; //results

                for (let doc of docs)
                {
                    const selectedItem ={
                        id: doc.id,
                        clientname: doc.data().clientname,
                        invoiceamaount: doc.data().invoiceamaount,
                        duedate: doc.data().duedate

                    }
                    response.push(selectedItem); 
                }
                return response;
            })
            return res.status(200).send(response);
        }
        catch(error)
        {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
}); 

//Read Order Id

app.get('/api/orderid/:id', (req, res)=> {

    (async () => {
        try 
        {
            const document = db.collection('orders').doc(req.params.id);
            let order = await document.get();
            let response = order.data();

            return res.status(200).send(response);
        }
        catch(error)
        {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

//Read All Orders

app.get('/api/orders', (req, res)=> {

    (async () => {
        try 
        {
            
            let query = db.collection('orders');
            let response =[];

            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs; //results

                for (let doc of docs)
                {
                    const selectedItem ={
                        id: doc.id,
                        productname: doc.data().productname,
                        quantity: doc.data().quantity,

                    }
                    response.push(selectedItem); 
                }
                return response;
            })
            return res.status(200).send(response);
        }
        catch(error)
        {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
}); 

//Update Client

app.put('/api/update_client/:id', (req, res)=> {
    
    (async () =>{
        
        try
        {
            const document = db.collection('clients').doc(req.params.id);

            await document.update({
                name: req.body.name,
                vat: req.body.vat,
                reqnumber: req.body.reqnumber,
                authrepresentative: req.body.authrepresentative,
                street: req.body.street,
                zip: req.body.zip,
                city: req.body.city,
                country: req.body.country

            })

            return res.status(200).send();
        }
        catch(error)
        
        {
             console.log(error);
             return res.status(500).send(error);
        }
    })(); 
});

//Update Store

app.put('/api/update_store/:id', (req, res)=> {
    
    (async () =>{
        
        try
        {
            const document = db.collection('stores').doc(req.params.id);

            await document.update({
                name: req.body.name,
                telnumber: req.body.telnumber,
                email: req.body.email,
                street: req.body.street,
                zip: req.body.zip,
                city: req.body.city,
                country: req.body.country

            })

            return res.status(200).send();
        }
        catch(error)
        
        {
             console.log(error);
             return res.status(500).send(error);
        }
    })(); 
});


//Update Products

app.put('/api/update_product/:id', (req, res)=> {
    
    (async () =>{
        
        try
        {
            const document = db.collection('products').doc(req.params.id);

            await document.update({
                name: req.body.name,
                unit: req.body.unit,
                price: req.body.price,

            })

            return res.status(200).send();
        }
        catch(error)
        
        {
             console.log(error);
             return res.status(500).send(error);
        }
    })(); 
});

//Update Invoice

app.put('/api/update_invoice/:id', (req, res)=> {
    
    (async () =>{
        
        try
        {
            const document = db.collection('invoices').doc(req.params.id);

            await document.update({
                clientname: req.body.clientname,
                invoiceamaount: req.body.invoiceamaount,
                duedate: req.body.duedate,

            })

            return res.status(200).send();
        }
        catch(error)
        
        {
             console.log(error);
             return res.status(500).send(error);
        }
    })(); 
});

//Update Order

app.put('/api/update_order/:id', (req, res)=> {
    
    (async () =>{
        
        try
        {
            const document = db.collection('orders').doc(req.params.id);

            await document.update({
                productname: req.body.productname,
                quantity: req.body.quantity

            })

            return res.status(200).send();
        }
        catch(error)
        
        {
             console.log(error);
             return res.status(500).send(error);
        }
    })(); 
});

//Delete Client

app.delete('/api/delete_client/:id', (req, res)=> {
    
    (async () =>{
        
        try
        {
            const document = db.collection('clients').doc(req.params.id);

            await document.delete();

            return res.status(200).send();
        }
        catch(error)
        
        {
             console.log(error);
             return res.status(500).send(error);
        }
    })(); 
});

//Delete Store

app.delete('/api/delete_store/:id', (req, res)=> {
    
    (async () =>{
        
        try
        {
            const document = db.collection('stores').doc(req.params.id);

            await document.delete();

            return res.status(200).send();
        }
        catch(error)
        
        {
             console.log(error);
             return res.status(500).send(error);
        }
    })(); 
});

//Delete Product

app.delete('/api/delete_product/:id', (req, res)=> {
    
    (async () =>{
        
        try
        {
            const document = db.collection('products').doc(req.params.id);

            await document.delete();

            return res.status(200).send();
        }
        catch(error)
        
        {
             console.log(error);
             return res.status(500).send(error);
        }
    })(); 
});

//Delete Invoice

app.delete('/api/delete_invoice/:id', (req, res)=> {
    
    (async () =>{
        
        try
        {
            const document = db.collection('invoices').doc(req.params.id);

            await document.delete();

            return res.status(200).send();
        }
        catch(error)
        
        {
             console.log(error);
             return res.status(500).send(error);
        }
    })(); 
});

//Delete Orders

app.delete('/api/delete_order/:id', (req, res)=> {
    
    (async () =>{
        
        try
        {
            const document = db.collection('orders').doc(req.params.id);

            await document.delete();

            return res.status(200).send();
        }
        catch(error)
        
        {
             console.log(error);
             return res.status(500).send(error);
        }
    })(); 
});


//Sign in

//Export API to Firebase Cloud functions
exports.app = functions.https.onRequest(app);
