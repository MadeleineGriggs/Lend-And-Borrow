module.exports = function(sequelize, DataTypes) {
    var Item = sequelize.define("item", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reservation: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        }

    });

    Item.associate = function(models) {
        Item.belongsTo(models.User, {
            foreignKey: {allowNull: false}
        });
    };

    return Item;
};

