/* jshint indent: 2 */
// sequelize-auto -h 128.1.135.44 -d dsc_video_yn -u root -x uniqorn_20181212 -p 3306 -t dsc_duanzi
// sequelize-auto -h 122.51.3.174 -d mystore -u root -x mysql@666 -p 3306 -t bizhi_type

module.exports = function (sequelize, DataTypes) {
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
    timestamps: false,
    freezeTableName: true
  })
}

