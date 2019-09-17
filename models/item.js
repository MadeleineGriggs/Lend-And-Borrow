
module.exports = function(sequelize, DataTypes) {
    var Item = sequelize.define("Item", {
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
        // reservation: {
        //     type: DataTypes.ARRAY(DataTypes.STRING)
        // }
        available: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }

    });

    Item.associate = function(models) {
        Item.belongsTo(models.User, {
            foreignKey: {allowNull: false}

        });
    };

    return Item;
};