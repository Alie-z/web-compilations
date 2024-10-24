/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('aibizhi', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id: {
      type: DataTypes.STRING(68),
      allowNull: false,
      defaultValue: ''
    },
    atime: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    tag: {
      type: DataTypes.STRING(128),
      allowNull: false,
      defaultValue: ''
    },
    desc: {
      type: DataTypes.STRING(512),
      allowNull: true,
      defaultValue: ''
    },
    img: {
      type: DataTypes.STRING(512),
      allowNull: false,
      defaultValue: ''
    },
    cid: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(128),
      allowNull: true,
      defaultValue: '\'[]\''
    },
    preview: {
      type: DataTypes.STRING(512),
      allowNull: true,
      defaultValue: ''
    },
    thumb: {
      type: DataTypes.STRING(512),
      allowNull: true,
      defaultValue: ''
    },
    rule: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    rule_new: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    store: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    views: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    ncos: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    rank: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    favs: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'aibizhi'
  });
};
