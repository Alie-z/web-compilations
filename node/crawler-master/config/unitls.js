function getParamObj(params) {
  var obj = {};
  //[^&=]+ 表示不含&或=的连续字符，加上()就是提取对应字符串
  params.replace(/([^&=]+)=([^&=]*)/gi, function (rs, $1, $2) {
    //decodeURIComponent() 函数可对 encodeURIComponent() 函数编码的 URI 进行解码。
    obj[$1] = decodeURIComponent($2);
  });

  return obj;
}

module.exports = {
  getParamObj
}
