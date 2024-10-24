/* jshint indent: 2 */
// sequelize-auto -h 128.1.135.44 -d dsc_video_yn -u root -x uniqorn_20181212 -p 3306 -t dsc_duanzi
// sequelize-auto -h 122.51.3.174 -d mystore -u root -x mysql@666 -p 3306 -t bizhi_type

module.exports = function (sequelize, DataTypes) {
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
      allowNull: true,
      defaultValue: 0
    },
    tag: {
      type: DataTypes.STRING(512),
      allowNull: true,
      defaultValue: ''
    },
    desc: {
      type: DataTypes.STRING(512),
      allowNull: true,
      defaultValue: ''
    },
    img: {
      type: DataTypes.STRING(512),
      allowNull: true,
      defaultValue: ''
    },
    cid: {
      type: DataTypes.STRING(64),
      allowNull: true,
      defaultValue: 0
    },
    url: {
      type: DataTypes.STRING(128),
      allowNull: true,
      defaultValue: ''
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
      allowNull: true,
      defaultValue: ''
    },
    rule_new: {
      type: DataTypes.STRING(128),
      allowNull: true,
      defaultValue: ''
    },
    store: {
      type: DataTypes.STRING(8),
      allowNull: true,
      defaultValue: ''
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
    },
    type: {
      type: DataTypes.STRING(8),
      allowNull: true,
      defaultValue: ''
    }
  }, {
    tableName: 'aibizhi',
    timestamps: false,
    freezeTableName: true
  })
}

