
module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('User', {
        id: {
            primaryKey: true,
            type : DataTypes.INTEGER,
        },
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        role: DataTypes.STRING
    });
    User.associate = function (models) {
        models.User.belongsTo(models.Role,
            {
                foreignKey: {
                    allowNull: false,
                    name: 'role'
                }
            });
    };
    return User;
};
