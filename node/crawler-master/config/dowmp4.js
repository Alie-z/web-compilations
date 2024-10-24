// const fs = require('fs');
// const ytdl = require('ytdl-core');
// // TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// // TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// // TypeScript: import ytdl = require('ytdl-core'); with neither of the above
//
// // ytdl('https://www.youtube.com/watch?v=-jIRYAKf714',{ filter: (format) => format.container === 'mp4' })
// //   .on(fs.createWriteStream('video.mp4'));
// console.log('---')
// ytdl.getInfo('https://www.youtube.com/watch?v=-jIRYAKf714', (err, info) => {
//   if (err) throw err;
//   console.log('-----',info)
//   let format = ytdl.chooseFormat(info.formats, { quality: '134' });
//   if (format) {
//     console.log('Format found!');
//   }
// });
// var fs = require('fs');
// var youtubedl = require('youtube-dl');
//
// youtubedl.setPath("./bin")
//
// var video = youtubedl('http://www.youtube.com/watch?v=90AiXO1pAiA',
//   // Optional arguments passed to youtube-dl.
//   ['--format=18'],
//   // Additional options can be given for calling `child_process.execFile()`.
//   { cwd: __dirname });
//
// // Will be called when the download starts.
// video.on('info', function(info) {
//   console.log('Download started');
//   console.log('filename: ' + info._filename);
//   console.log('size: ' + info.size);
// });
//
// video.pipe(fs.createWriteStream('myvideo.mp4'));

// https://r2---sn-quxapm-3c2l.googlevideo.com/videoplayback?expire=1571070280&ei=6EykXeSGIsvY1gaDwKWgBw&ip=2001:41d0:a:46e3::&id=o-APtwl3QMg6poDHPEG0V-L35Kp5H73r-ypVHJjl-RXxde&itag=22&source=youtube&requiressl=yes&mm=31,29&mn=sn-quxapm-3c2l,sn-25glen7l&ms=au,rdu&mv=m&mvi=1&pcm2cms=yes&pl=45&mime=video/mp4&ratebypass=yes&dur=1020.424&lmt=1556206176633106&mt=1571048590&fvip=5&fexp=23842630&c=WEB&txp=5535432&sparams=expire,ei,ip,id,itag,source,requiressl,mime,ratebypass,dur,lmt&sig=ALgxI2wwRgIhAMVQuhOkDvqGrpGPbZRPpvagHcX92Ia19nc7r9c_oy_pAiEAskYb-MLtuRSru9DqGc31Gsspou9bQj3k64DmH6tFelg=&lsparams=mm,mn,ms,mv,mvi,pcm2cms,pl&lsig=AHylml4wRgIhANmKQn5r6J2zmWC4AIgb-W2QP-zk_8t1UOeHA22tBxA1AiEAol5DjZQUBTplEUevvVmMMpPIfTmCb1ogDj6v4jtGYLY=&title=%E7%9B%A4%E9%BB%9E%E6%AD%B7%E5%B1%86%E9%87%91%E5%83%8F%E7%8D%8E%E9%A0%92%E7%8D%8E%E5%85%B8%E7%A6%AE%E4%B8%AD%E5%8D%81%E5%80%8B%E6%9C%80%E6%90%9E%E7%AC%91%E7%9A%84%E5%A0%B4%E9%9D%A2+%28%E9%99%B3%E5%86%A0%E5%B8%8C%EF%BC%8C%E6%A2%81%E6%9C%9D%E5%81%89%EF%BC%8C%E5%8
