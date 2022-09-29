module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('product', {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
            // allowNull defaults to true
        },


    }, {
        // Other model options go here
    });
    return Product
}