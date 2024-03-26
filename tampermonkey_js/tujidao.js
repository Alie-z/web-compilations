// ==UserScript==
// @name 图集岛破解VIP-威力加强版
// @namespace http://tampermonkey.net/
// @version 1.3.7
// @description 破解VIP、一键打包下载和图片自适应
// @author fordes123
// @require https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/jquery/3.0.0/jquery.min.js
// @require https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/jszip/3.7.1/jszip.min.js
// @require https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/FileSaver.js/2.0.5/FileSaver.min.js
// @match https://tujidao.com/*
// @match *://*.tujidao*.com/*
// @include /^http[s]?:\/\/(\w*\.)?tujidao[\d]*\.com.*$/
// @grant  GM_xmlhttpRequest
// @license MIT
// ==/UserScript==

(function () {
    'use strict';
    var list = document.querySelectorAll('div.hezi>ul>li');
    if (list.length > 0) {
        for (const item of list) {
            var a = item.querySelector('a:first-child');
            var img = a.querySelector('img:first-child');

            a.removeAttribute('href');
            img.removeAttribute('href');

            var title = item.querySelector('p.biaoti > a');
            var href = title.getAttribute('href');
            title.setAttribute('id', href.split('id=')[1]);
            title.removeAttribute('href');

            img.onclick = function () {
                var num = item.querySelector('span.shuliang').innerText.split('P')[0];
                var tags = item.querySelectorAll('p:not(.biaoti)');
                var title = item.querySelector('p.biaoti > a');
                var id = title.getAttribute('id');
                show(id, num, title.text, tags);
            };
            title.onclick = function () {
                var num = item.querySelector('span.shuliang').innerText.split('P')[0];
                var tags = item.querySelectorAll('p:not(.biaoti)');
                var title = item.querySelector('p.biaoti > a');
                var id = title.getAttribute('id');
                show(id, num, title.text, tags);
            };
        } //批量下载
        var flag = false;
        $(document).on('click', '#xiazai', function () {
            if (!flag) {
                flag = true;
                layer.msg('已创建下载任务', download());
            } else {
                layer.msg('努力打包中, 请耐心等待！', {time: 1000});
            }
        });
        //快速回顶
        $(document).on('click', '#huiding', function () {
            scrollTo(0, 0);
        });
    }
})();

var pic_template =
    "<img class='lazy' filename='{title}-{num}.jpg' src='https://pic.gzhuibei.com/a/1/{pic_id}/{num}.jpg' data-src='https://pic.gzhuibei.com/a/1/{pic_id}/{num}.jpg'>";

function asyncGet(zip, filename, url) {
    var defered = $.Deferred();

    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        headers: {
            referer: window.location.href
        },
        responseType: 'blob',
        onload: function (response) {
            zip.file(filename, response.response);
            defered.resolve('success');
            // console.log(filename + 'download completed~')
        },
        onerror: function () {
            console.log(filename + '(' + url + ') download failed!');
        }
    });
    return defered;
}

//下载文件
function download() {
    var start = performance.now();
    var zip = new JSZip();
    var list = document.querySelectorAll('#kbox>img');
    console.log('start download... ' + list.length + ' task');

    let arr = [];
    for (const item of list) {
        var filename = item.getAttribute('filename');
        var url = item.getAttribute('src');
        arr.push(asyncGet(zip, filename, url));
    }

    var filename = $('title').text();
    $.when.apply(this, arr).then(function (...args) {
        console.log('download completed... ' + args.length + ' task');
        console.log('start generate zip files, timely: ', `${(performance.now() - start) / 1000} s`);
        //生成zip文件
        zip.generateAsync({
            type: 'blob'
        }).then(function (content) {
            saveAs(content, filename + '.zip');
            console.log('all completed: ', `${(performance.now() - start) / 1000} s`);
        });
    });
}

function show(id, num, title, tags) {
    //劫持返回(后退)事件，以刷新代替后退
    var state = {
        url: window.location.href
    };
    window.history.pushState(state, '', window.location.href);
    window.addEventListener(
        'popstate',
        function (e) {
            window.location.reload();
        },
        false
    );
    //修改标题
    $('title').html(title);

    //初始化layer，用于页内通知
    layui.use(['layer'], function () {
        layer = layui.layer;
    });

    //删除无用元素
    $('.hezi').remove();
    $('.bk20').remove();
    $('center').remove();
    $('.width').remove();
    $('.titletxt').remove();

    //头部信息
    var tuji = $("<div class='tuji'></div>");
    tuji.append('<h1>' + title + '</h1>');
    tuji.append(tags);
    $('.footer').before(tuji);

    //右下角按钮
    var mulu = $("<div class='mulu'></div>");
    mulu.append("<li id='huiding' title='回顶'>回顶</li>");
    mulu.append("<li onclick='location.reload();' title='返回'>返回 </li>");
    mulu.append("<li id='xiazai' title='打包下载'>下载 </li>");
    $('.footer').before(mulu);

    //图片
    var kbox = $("<div id='kbox'></div>");
    var pic_item = pic_template.replaceAll('{pic_id}', id).replaceAll('{title}', title);
    for (var i = 1; i <= num; i++) {
        kbox.append($(pic_item.replaceAll('{num}', i)));
    }
    $('.footer').before(kbox);
}
