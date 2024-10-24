/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bizhi_type', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    count: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    ename: {
      type: DataTypes.STRING(16),
      allowNull: true,
      defaultValue: ''
    },
    rname: {
      type: DataTypes.STRING(16),
      allowNull: true,
      defaultValue: ''
    },
    name: {
      type: DataTypes.STRING(16),
      allowNull: true,
      defaultValue: ''
    },
    cover_temp: {
      type: DataTypes.STRING(64),
      allowNull: true,
      defaultValue: ''
    },
    cover: {
      type: DataTypes.STRING(512),
      allowNull: true,
      defaultValue: ''
    },
    rank: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    filter: {
      type: DataTypes.STRING(128),
      allowNull: true,
      defaultValue: ''
    },
    sn: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    icover: {
      type: DataTypes.STRING(64),
      allowNull: true,
      defaultValue: ''
    },
    atime: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    type: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    id: {
      type: DataTypes.STRING(64),
      allowNull: true,
      defaultValue: ''
    },
    picasso_cover: {
      type: DataTypes.STRING(64),
      allowNull: true,
      defaultValue: ''
    }
  }, {
    tableName: 'bizhi_type'
  });
};
