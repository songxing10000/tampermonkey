// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-04-27
// @description  try to take over the world!
// @author       You
// @match        *://*.jianshu.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jianshu.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 定义一个方法来点击新增元素
    function clickNewElement(element) {
        var maxAttempts = 10; // 最大尝试次数
        var attempt = 0; // 当前尝试次数

        var interval = setInterval(function() {
            // 选择按钮元素
            var closeButton = document.querySelector('button._23ISFX-close');

            // 检查按钮是否存在
            if (closeButton) {
                // 模拟点击按钮
                closeButton.click();
                console.log('成功点击关闭按钮');
                clearInterval(interval); // 停止循环
            } else {
                attempt++;
                if (attempt >= maxAttempts) {
                    console.error('超过最大尝试次数，未找到关闭按钮。');
                    clearInterval(interval); // 停止循环
                }
            }
        }, 100); // 100毫秒间隔

    }

    // 创建一个 MutationObserver 实例
    var observer = new MutationObserver(function(mutationsList) {
        // 遍历每个变化
        for(var mutation of mutationsList) {
            // 检查每个新增的节点
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    // 检查是否是元素节点
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // 调用点击新增元素的方法
                        clickNewElement(node);
                    }
                });
            }
        }
    });

    // 配置 MutationObserver 监听的选项
    var config = { childList: true, subtree: true };

    // 开始观察 document 的变化
    observer.observe(document, config);
})();