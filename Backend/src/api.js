const client = require('./DB/connection.js')
const express = require('express')
const relations = require('./models/init.js')
const app = express(), fs = require('fs')
var cors = require('cors');
const { json } = require("express");
const sequelize = require('./DB/connection.js');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const customCss = fs.readFileSync((process.cwd() + "/swagger.css"), 'utf8');

app.use(cors())

app.use(express.json());
app.listen(3300,()=>{ 
    console.log("server is now listening at port 3300")
}) 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customCss }));

  
app.get('/food/:type/:sort_by/:page', async(req, res) => {
    let foodType = req.params.type == "fruits" ? 1 : 2;
    let query = `Select * from products where categoryid = ${foodType} 
                    Order By ${req.params.sort_by}
                    OFFSET ((${req.params.page}-1) *10) ROWS
                    FETCH NEXT 10 ROWS ONLY;`

    const result = await sequelize.query(query, {raw: true})
    
    res.send(result[0]);
        
});



app.get('/electronics/:sort_by/:page', async (req, res) => {
    
    let query = `Select * from products where categoryID = 3
                    Order By ${req.params.sort_by}
                    OFFSET ((${req.params.page}-1) *10) ROWS
                    FETCH NEXT 10 ROWS ONLY;`

    const result = await sequelize.query(query, { raw: true })

    res.send(result[0]);

});

/**
 * 
 * 
 *        the 2 below api just to get results but to send the parameters in request body not in URL
 *          diff between post and get S
 */

app.post('/food', (req, res) => {
    const food = req.body;
    console.log(food)
    let query =    `Select * from ${food.type}
                    Order By ${food.sortBy}
                    OFFSET ((${food.page}-1) *10) ROWS
                    FETCH NEXT 10 ROWS ONLY;`

    client.query(query, (err, result) => {
        if (!err) {
            res.send(result.rows)
        }
        else { console.log(err.message) }
    })
    client.end;
})

app.post('/electronics', (req, res) => {
    const electronics = req.body;
    console.log(electronics)
    let query = `Select * from ${electronics.type}
                    Order By ${electronics.sortBy}
                    OFFSET ((${electronics.page}-1) *10) ROWS
                    FETCH NEXT 10 ROWS ONLY;`

    client.query(query, (err, result) => {
        if (!err) {
            res.send(result.rows)
        }
        else { console.log(err.message) }
    })
    client.end;
})


/************************************
 * 
 *  code below: just examples on the rest 
 *              of the CRUD operations 
 * 
 * 
 ***************************************/
/*
app.get('/users', async (req, res) => {

    const result = await sequelize.query('Select * from users', { raw: true })

    console.log(result)
    res.json(result[0]);


})


app.get('/users/:id', async (req, res) => {

    const result = await sequelize.query(`Select * from users where id=${req.params.id}`, { raw: true })

    console.log(result)
    res.json(result[0]);

})


app.post('/user', async (req, res) => {
    const data = req.body;
    console.log(data)
    let query = `INSERT INTO public.users(id, "name"  , age) VALUES (${data.id},'${data.name}', ${data.age});`

    const result =  await sequelize.query(query, { raw: true })
    console.log("result", result)
    if (result != null) 
    {
        res.json({status: 200 , message: "sucess"});
    }
    else 
    {
        res.json({ message: "fail" });
    }

})

app.put('/users/:id', (req, res) => {
    let user = req.body;
    let updateQuery = `update users
                       set firstname = '${user.firstname}',
                       lastname = '${user.lastname}',
                       location = '${user.location}'
                       where id = ${user.id}`

    client.query(updateQuery, (err, result) => {
        if (!err) {
            res.send('Update was successful')
        }
        else { console.log(err.message) }
    })
    client.end;
})

app.delete('/users/:id', (req, res) => {
    let insertQuery = `delete from users where id=${req.params.id}`

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Deletion was successful')
        }
        else { console.log(err.message) }
    })
    client.end;
})
/ */



