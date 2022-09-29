const initRelations = require('../models/init')
const { Sequelize } = require('sequelize');
const category = require('../models/category');

const sequelize = new Sequelize('Gameball', 'postgres', '1234', {
    host: 'localhost',
    dialect:'postgres'
});
sequelize.authenticate().then( async ()=>{
    console.log("tamam")
    const { Category, Product } = initRelations(sequelize,Sequelize)
    await Category.sync({})
    // Category.create({
    //     name: "food"
    // })
    //     .then((category) => {
    //         console.log(">> Created tutorial: " + JSON.stringify(category));
    //         return category;
    //     })
    //     .catch((err) => {
    //         console.log(">> Error while creating tutorial: ", err);
    //     });
    await Product.sync({})
    // Product.create({
    //     name: "apple",
    //     price: 10.5,
    //     categoryId: 1
    // })
    //     .then((product) => {
    //         console.log(">> Created tutorial: " + JSON.stringify(product));
    //         return product;
    //     })
    //     .catch((err) => {
    //         console.log(">> Error while creating tutorial: ", err);
    //     });



});


module.exports = sequelize