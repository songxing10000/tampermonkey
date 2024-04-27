// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-04-27
// @description  try to take over the world!
// @author       You
// @match        *://*.jianshu.com/p/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jianshu.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // 在页面加载完成后运行的函数
    window.addEventListener('load', function() {
        // 删除 推荐的好看文章
        document.querySelectorAll('section').forEach(function(section) {
            if (section.textContent.startsWith("热门故事")||
                section.textContent.includes("总资产") ||
                section.textContent.includes("发现更多相似") ||
                section.textContent.includes("全部评论")) {

            } else {
                setTimeout(function() {
                    section.parentNode.removeChild(section);
                }, 1000);
            }
        });
    });

    // 创建一个 MutationObserver 实例
    var observer = new MutationObserver(function(mutationsList) {
        // 遍历每个变化
        for(var mutation of mutationsList) {
            // 检查每个新增的节点
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {

                    // 点击 扫码弹窗
                    var closeButton = document.querySelector('button._23ISFX-close');
                    if (closeButton) {
                        // 模拟点击按钮
                        closeButton.click();
                        console.log('成功点击关闭按钮');

                    }
                    // 删除 热门故事
                    if (node.textContent.startsWith("热门故事")) {
                        node.parentNode.removeChild(node);
                        console.log('已删除包含热门故事的 section 元素。');
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