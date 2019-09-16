var bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {isEmail: true}
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
        // borrowing: {
        //     type: DataTypes.ARRAY(DataTypes.STRING)
        // }

    });

    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    User.addHook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    User.associate = function(models) {
        User.hasMany(models.item);
    };

    return User;
};

