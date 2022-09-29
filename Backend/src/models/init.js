const category = require('./category.js')
const product = require('./product.js')


function initRelations(sequelize, Sequelize){
    const Category = category(sequelize, Sequelize)
    const Product = product(sequelize, Sequelize)
    Category.hasMany(Product, { as: "products" });
    Product.belongsTo(Category, {
        foreignKey: "categoryId",
        as: "category",
    });
    return {Category, Product}
}   





module.exports = initRelations