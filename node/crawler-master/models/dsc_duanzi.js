/* jshint indent: 2 */
// sequelize-auto -h 128.1.135.44 -d dsc_video_yn -u root -x uniqorn_20181212 -p 3306 -t dsc_duanzi

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dsc_duanzi', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    like: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    share: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    ip: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    time: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    shenhe: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      defaultValue: '1'
    },
    is_delete: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      defaultValue: '0'
    },
    type: {
      type: DataTypes.INTEGER(2),
      allowNull: true,
      defaultValue: '0'
    },
    imgs: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    top: {
      type: DataTypes.INTEGER(8).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    pinglun: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    old_like: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    shaixuan: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      defaultValue: ''
    },
    img_content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fabu: {
      type: DataTypes.INTEGER(2).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    },
    fanyi: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'dsc_duanzi'
  });
};
