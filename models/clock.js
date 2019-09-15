'use strict';
module.exports = (sequelize, DataTypes) => {
  let Clock = sequelize.define('Clock', {
    id: {
      primaryKey: true,
      type : DataTypes.INTEGER,
    },
    time: DataTypes.DATE,
    status: DataTypes.BOOLEAN,
    id_user: DataTypes.INTEGER
  }, {});
  Clock.associate = function(models) {
    models.Clock.belongsTo(models.User,
        {
          foreignKey : {
            name : 'id_user',
            allowNull : false
          }
        })
  };
  return Clock;
};
