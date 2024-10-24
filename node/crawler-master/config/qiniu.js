const qiniu = require('qiniu')
var accessKey = 'AiyY5rgHbK8AgHYgx37-YSvE0QQqtRFCWTEilv6h';
var secretKey = 'Vw8LBhaythL2U1wzkTJtG5nyCgy7V2ETR-qgsibd';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

var config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_as0;
// 是否使用https域名
config.useHttpsDomain = true;
// 上传是否使用cdn加速
config.useCdnDomain = true;

var bucketManager = new qiniu.rs.BucketManager(mac, config);

module.exports = bucketManager






//
// const qiniu = require('qiniu')
// var accessKey = 'AiyY5rgHbK8AgHYgx37-YSvE0QQqtRFCWTEilv6h';
// var secretKey = 'Vw8LBhaythL2U1wzkTJtG5nyCgy7V2ETR-qgsibd';
// var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
// var bucket = 'uniqorn'
// var options = {
//   scope: bucket,
//   expires: 3600000,
//    returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
// };
// var putPolicy = new qiniu.rs.PutPolicy(options);
// var uploadToken=putPolicy.uploadToken(mac);
//
// var config = new qiniu.conf.Config();
// // 空间对应的机房
// config.zone = qiniu.zone.Zone_as0;
// // 是否使用https域名
// config.useHttpsDomain = true;
// // 上传是否使用cdn加速
// config.useCdnDomain = true;
//
// var bucketManager = new qiniu.rs.BucketManager(mac, config);
// var localFile = __dirname + "\/" + "asdfked356.mp4";
// var formUploader = new qiniu.form_up.FormUploader(config);
// var putExtra = new qiniu.form_up.PutExtra();
// var resUrl = 'https://redirector.googlevideo.com/videoplayback?expire=1571147961&ei=WXylXfrgA9fJigTM6YLICQ&ip=149.248.52.225&id=o-AJ8Sc7q9Xnjv456-FMCx6Us1cxLVh2tOunGc4AtIP0jf&itag=18&source=youtube&requiressl=yes&mm=31%2C26&mn=sn-tt1e7n7k%2Csn-vgqsknez&ms=au%2Conr&mv=u&mvi=3&pl=27&mime=video%2Fmp4&gir=yes&clen=15875423&ratebypass=yes&dur=251.890&lmt=1569828968738941&mt=1571126079&fvip=4&fexp=23842630&c=WEB&txp=5531432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&lsparams=mm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl&lsig=AHylml4wRQIhAKFXvH_v7jQqcoVUbZMg-R-OCi_-ksestZUfTlHbSvfSAiA8hIvHNtOPZgZCydaZtNQvGW0iRNQcw6sEXfezE2vaFA%3D%3D&sig=ALgxI2wwRAIgVXiVF9Hr5JiJWhVRnK5XbsqBRMbPMfqNFSmxxuOE6EkCICUAi6xeRuc9CFXlfADTX0_ePNAtKr5Q_jCV5hr_0TJ0&title=%E5%91%A8%E6%9D%B0%E5%80%AB+%E8%92%B2%E5%85%AC%E8%8B%B1%E7%9A%84%E7%BA%A6%E5%AE%9A+MV+%E9%AB%98%E7%95%AB%E5%80%BC';
// var key='/2019/10/15/666.mp4';
// // 文件上传
// // formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
// //   respBody, respInfo) {
// //   if (respErr) {
// //     throw respErr;
// //   }
// //   if (respInfo.statusCode == 200) {
// //     console.log('respBody-success',respBody);
// //   } else {
// //     console.log(respInfo.statusCode);
// //     console.log(respBody);
// //   }
// // });
//
// bucketManager.fetch(resUrl, bucket, key, function(err, respBody, respInfo) {
//   if (err) {
//     console.log(err);
//     //throw err;
//   } else {
//     if (respInfo.statusCode == 200) {
//       console.log(respBody.key);
//       console.log(respBody.hash);
//       console.log(respBody.fsize);
//       console.log(respBody.mimeType);
//     } else {
//       console.log(respInfo.statusCode);
//       console.log(respBody);
//     }
//   }
// });

// //需要填写你的 Access Key 和 Secret Key
// qiniu.conf.ACCESS_KEY = 'AiyY5rgHbK8AgHYgx37-YSvE0QQqtRFCWTEilv6h';
// qiniu.conf.SECRET_KEY = 'Vw8LBhaythL2U1wzkTJtG5nyCgy7V2ETR-qgsibd';
// //要上传的空间
// bucket = 'uniqorn';
// //上传到七牛后保存的文件名
// key = 'asdfked356.mp4';
// //构建上传策略函数
// function uptoken(bucket, key) {
//   var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
//   return putPolicy.token();
// }
//
// //生成上传 Token
// token = uptoken(bucket, key);
// //要上传文件的本地路径
// filePath = "./asdfked356.mp4"
// //构造上传函数
// function uploadFile(uptoken, key, localFile) {
//   var extra = new qiniu.io.PutExtra();
//     qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
//       if(!err) {
//         // 上传成功， 处理返回值
//         console.log(ret.hash, ret.key, ret.persistentId);
//       } else {
//         // 上传失败， 处理返回代码
//         console.log('-----',err);
//       }
//   });
// }
// //调用uploadFile上传
// uploadFile(token, key, filePath);
