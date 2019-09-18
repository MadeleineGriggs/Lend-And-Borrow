
module.exports = function(sequelize, DataTypes) {
    var Borrow = sequelize.define("Borrow", {
        itemId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    });

    Borrow.associate = function(models) {
        Borrow.belongsTo(models.User, {
            foreignKey: {allowNull: false}

        });
    };

    return Borrow;
};

