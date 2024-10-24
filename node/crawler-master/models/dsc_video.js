/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dsc_video', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    time: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    url: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      defaultValue: ''
    },
    uid: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    shenhe: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    is_delete: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    cat_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    img_url: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      defaultValue: ''
    },
    video_time: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: ''
    },
    video_id: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: ''
    },
    source: {
      type: DataTypes.STRING(64),
      allowNull: false
    }
  }, {
    tableName: 'dsc_video'
  });
};
