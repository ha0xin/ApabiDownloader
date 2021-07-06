// ==UserScript==
// @name         ApabiDownloader
// @namespace    https://qinlili.bid/
// @version      0.4
// @description  导出最高清晰度的图片用于制作PDF
// @author       琴梨梨
// @match        *://*/OnLineReader/Default.aspx?*
// @match        *://cebxol.apabi.com/*
// @match        *://cebxol.apabiedu.com/?metaid=*
// @icon        data:image/x-icon;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAABEkswAlNb8AJTS/AAEAxwADxckAHrB7ACEsMQAYIWcAH/A5AAiMEwAiM/0ADxQdAAaMEQAGihEAEya3ABsv+wAmeH8AITK9AAJEBwAUarsAERuhACc2fwAPny0ACo6QgBDXmkApeH8AKfg9AAkMDwAMFl0AEeGtABOmMwALD1cAHXB9AARG0QAQFh0AJLI3AAoUIQArun8AKTo/AAyRVwAnNr0AHvH9ACS1/QAHjFcAAQFNAAvPkwAf6m8AERkbABvl6wABAIkAA8YLACc5vwABwo1AAcKIQBMp+QABAMUAAsRLAA2SGwAbLr0AGS47AAEAiwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDwzMR8lPDw8PDw8PDw8Lzw8JjwGIzw8MTw8PDw8PBAzMSU3JRgxJSg8PDw8PDw8JiYaLiU1JSI8PDw8PDAzGzElLSUHJQ08FCk8PDw8CyUlJQksPBUqCikhPDw8PDwxFxIxPDw8AzE8PCw8PAwlJSUlGzw8CikFOjc8PDwrOTwxJTUBCCkEPBYTPDw8PDwnGSICHCk4OzI8PDw8PDwsGTQ8ETEPHDQ2ADw8PDw8PDw8PCA8HR48PDw8PDw8PDw8PDw6PCQOPDw8PDw8PDw8PDw8PDw8PDw8PDw8PAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=
// @grant        none
// @run-at document-end
// ==/UserScript==

(function() {
    'use strict';//解除右键
    document.body.oncontextmenu = ""
    var pageTotal = 0;
    var picUrl = ""
    var pageCurrent = 1;
    var urlhost = "";
    //下载指定页面图片
    function downloadPic(page) {
        if (document.location.host=="cebxol.apabi.com"){
            urlhost="/"
        }else{
            urlhost="/OnLineReader/"
        }
        picUrl = window.location.origin + urlhost + encodeURI(getUrl(page));
        fetch(picUrl).then(res => res.blob().then(blob => {
            var a = document.createElement('a');
            var url = window.URL.createObjectURL(blob);
            var filename = page + '.jpg';
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
        }))
    }
    //批量下载
    function batchDownload() {
        //最大化图片尺寸
        currentHeight = 9999;
        currentWidth = 9999;
        pageTotal = document.getElementById("TotalCount").innerText;
        for (pageCurrent = 1; pageCurrent <= pageTotal; pageCurrent++) {
            downloadPic(pageCurrent);
        }
    }
    //创建下载按钮
    var downloadBtn = document.createElement("a");
    downloadBtn.innerText = "批量下载全书";
    downloadBtn.onclick = function () { batchDownload() }
    document.querySelector("body > div.page > div.header > ul").appendChild(downloadBtn);

})();
