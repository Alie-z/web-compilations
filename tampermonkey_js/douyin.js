// ==UserScript==
// @name         抖音自动化
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.douyin.com
// @match      /(^https:\/\/www\.douyin\.com)/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=douyin.com
// @grant        GM_xmlhttpRequest
// @grant        GM_download
// ==/UserScript==
var faceNode = `<div class="m_wrap">
<div class="m_mask m_position"></div>
<div class="m_content m_position">
    <div class="m_discern">人脸识别中</div>
    <div class="m_item_wrap"></div>
</div>
</div>
`;
var faceCss = `
.m_wrap {
    width: 220px;
    height: 55px;
    position: fixed;
    top: 72px;
    left: 200px;
    overflow: hidden;
    border-radius: 10px;
    transition: height 0.5s ease-in-out;
}
.m_position {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
.m_mask {
    z-index: -2;
    height: 100%;
    width: 100%;
    background: #9493ec;
    box-shadow: inset 20px 20px 60px #7e7dc9, inset -20px -20px 60px #aaa9ff;
    filter: blur(70px);
}
.m_content {
    padding: 15px;
    box-sizing: border-box;
}
.m_discern {
    width: 100%;
    text-align: center;
    font-size: 24px;
}
.m_item {
    line-height: 24px;
    padding: 4px 0;
}
.text_gradient {
    background-image: linear-gradient(to right, orange, purple);
    -webkit-background-clip: text;
    color: transparent;
    font-size: 20px;
}
`;
var timer = null;
var checkNum = 0;
var playNum = 0;
var isBeauty = false;
var video = null;
(function () {
    'use strict';
    console.log('🚀 脚本开始');
    // 增加样式
    var styleNode = document.createElement('style');
    styleNode.innerHTML = faceCss;
    document.querySelector('head').appendChild(styleNode);
    // 增加dom
    var node = document.createElement('div');
    node.innerHTML = faceNode;
    document.body.appendChild(node);

    // timeoutInit(3000);
    setInterval(() => {
        checkTime();
    }, 1000);
})();
function checkTime() {
    const advertising = document
        .querySelector("div[data-e2e='feed-active-video'] div[data-e2e='video-desc']")
        ?.innerText.includes('广告');
    advertising && document.querySelector('.xgplayer-playswitch-next').click();

    var durationNode = document.querySelector("div[data-e2e='feed-active-video'] .time-duration");
    if (!durationNode) {
        // 直播
        document.querySelector('.xgplayer-playswitch-next').click();
    }
    var duration = durationNode.innerText?.split(':') || [];
    const dura = duration[0] * 1 * 60 + duration[1] * 1;
    if (dura > 90) {
        // 长视频
        document.querySelector('.xgplayer-playswitch-next').click();
    }

    if (dura == 0) {
        // 未加载出来
        return;
    }
    var currTime = document.querySelector("div[data-e2e='feed-active-video'] .time-current").innerText.split(':');
    const cur = currTime[0] * 1 + currTime[1] * 1;
    console.log('🚀 > checkTime > cur:', cur);
    if (cur == 0) {
        console.log('🚀 > 新的视频开始');
        handleNext();
    }
}

// timer init
function timeoutInit(time) {
    const showCheckNum = checkNum * 1 + 1;
    document.querySelector('.m_wrap').style.height = '55px';
    document.querySelector('.m_content').innerHTML =
        '<div class="m_discern">人脸识别中(' + showCheckNum + ')</div><div class="m_item_wrap"></div>';
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
    timer = setTimeout(function () {
        checkFace();
    }, time);
}

//  人脸检测
function checkFace() {
    console.time('checkFaceTime');
    console.time('videoImg');
    var canvas = document.createElement('canvas');
    var canvasCtx = canvas.getContext('2d');
    var ratio = getPixelRatio(canvasCtx);
    video = document.querySelector("div[data-e2e='feed-active-video'] video");
    canvas.width = video.offsetWidth * ratio;
    canvas.height = video.offsetHeight * ratio;
    canvasCtx.fillStyle = '#222125';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    var imgWidth = Math.min(canvas.width, (video.videoWidth * canvas.height) / video.videoHeight);
    var imgHeight = Math.min(canvas.height, (video.videoHeight * canvas.width) / video.videoWidth);
    canvasCtx.drawImage(
        video,
        0,
        0,
        video.videoWidth,
        video.videoHeight,
        (canvas.width - imgWidth) / 2,
        (canvas.height - imgHeight) / 2,
        imgWidth,
        imgHeight
    );
    var MIME_TYPE = 'image/png'; // 保存文件类型
    var imgURL = canvas.toDataURL(MIME_TYPE);
    const blob = convertBase64ToBlob(imgURL);
    console.timeEnd('videoImg');
    runAsync('http://192.168.0.100:8081/face/recognition', 'POST', blob)
        .then(result => {
            return result;
        })
        .then(function (result) {
            console.log('🚀 >检测结果>>', checkNum, JSON.stringify(result.data));
            if (result.data) {
                const resFace = result.data['face_list'][0];
                const expression = {
                    none: '无表情',
                    smile: '微笑',
                    laugh: '大笑'
                };
                const conNode = `<div class="m_item m_item_title">检测到 <span class="text_gradient face_num">${
                    result.data.face_num
                }</span> 张人脸</div>
                    <div class="m_item">
                        <span>性别:</span>
                        <span class="text_gradient m_female">${resFace.gender.type}</span>
                    </div>
                    <div class="m_item">
                        <span>年龄:</span>
                        <span class="text_gradient m_age">${resFace.age}</span>
                    </div>
                    <div class="m_item">
                        <span>颜值:</span>
                        <span class="text_gradient">${resFace.beauty}</span>
                    </div>
                    <div class="m_item">
                        <span>表情:</span>
                        <span class="text_gradient m_expression">${expression[resFace.expression.type]}</span>
                    </div>`;
                document.querySelector('.m_wrap').style.height = '230px';
                // var conDom = document.createElement('div');
                // conDom.innerHTML = conNode;
                // document.querySelector('.m_content').appendChild(conDom);
                document.querySelector('.m_item_wrap').innerHTML = conNode;
                document.querySelector('.m_discern').innerHTML = '检测完成';
                if (parseInt(resFace.beauty) >= 50) {
                    isBeauty = true;
                    // 关注
                    var follow = document.querySelector(
                        "div[data-e2e='feed-active-video'] div[data-e2e='feed-follow-icon'] div div"
                    );
                    resFace.gender.type === 'female' && follow?.click();
                    var like = document.querySelector(
                        "div[data-e2e='feed-active-video'] div[data-e2e-state='video-player-no-digged'] div"
                    );
                    like?.click();
                } else if (checkNum <= 3) {
                    checkNum++;
                    console.log('🚀 > 第', checkNum, '次检测');
                    timeoutInit(2000);
                } else if (checkNum > 3) {
                    // 多次检测没有就跳过
                    console.log('🚀 > 多次检测颜值未达标，跳过', checkNum);
                    document.querySelector('.xgplayer-playswitch-next').click();
                }
            } else {
                if (checkNum <= 3) {
                    checkNum++;
                    timeoutInit(2000);
                } else {
                    // 多次检测没有就跳过
                    console.log('🚀 > 多次检测没有就跳过', checkNum);
                    document.querySelector('.xgplayer-playswitch-next').click();
                }
            }
        });
    console.timeEnd('checkFaceTime');
}

function handleNext() {
    timer = null;
    checkNum = 0;
    playNum = 0;
    video = null;
    // document.querySelector('.xgplayer-playswitch-next').click();
    timeoutInit(2000);
}

// 获取radio
function getPixelRatio(context) {
    var backingStore =
        context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio ||
        1;
    return (window.devicePixelRatio || 1) / backingStore - 0.5;
}
// 将 base64 转换为二进制格式
function convertBase64ToBlob(base64) {
    const byteString = atob(base64.split(',')[1]);
    const mimeType = base64.split(';')[0].split(':')[1];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: mimeType});
}

//send数据函数
//参数1：url;参数2：请求类型get或post;参数3：post的body;
function runAsync(url, send_type, data_ry) {
    var p = new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: send_type,
            url: url,
            headers: {
                'Content-Type': 'application/octet-stream'
            },
            data: data_ry,
            onload: function (response) {
                resolve(JSON.parse(response.responseText));
            },
            onerror: function (err) {
                reject(err);
            }
        });
    });
    return p;
}
