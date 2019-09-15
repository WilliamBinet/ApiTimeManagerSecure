'use strict';
module.exports = (sequelize, DataTypes) => {
  const TeamMember = sequelize.define('TeamMember', {
    id_user: DataTypes.INTEGER,
    id_team: DataTypes.INTEGER
  }, {});
  TeamMember.associate = function(models) {
    models.TeamMember.belongsTo(models.User,
        {
          foreignKey : {
              name : 'id_user',
              allowNull : false
          }
        });
    models.TeamMember.belongsTo(models.Team,
        {
          foreignKey : {
              name : 'id_team',

              allowNull : false
          }
        })
  };
  return TeamMember;
};
