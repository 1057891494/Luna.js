(function(window, Luna, undefined) {
    'use strict';

    Luna.extend({
        "sizzle": function(selector, context) {
            selector = selector.trim();
            var resultData = [],
                flag, elems;

            //第0部分：选择全部
            if (selector == '*') {
                elems = context.getElementsByTagName('*');
                for (flag = 0; flag < elems.length; flag++) {
                    resultData.push(elems[flag]);
                }
            }
            //第一部分：最单纯的选择器
            else if (Luna._sizzle_.isSingle(selector)) {
                if (Luna._sizzle_.isID(selector)) {
                    //id选择器 上下文只能是HTML文档，考虑id的唯一性，直接全局查找
                    //浏览器支持情况：IE 6+, Firefox 3+, Safari 3+, Chrome 4+, and Opera 10+；
                    resultData.push(document.getElementById(selector.replace(/^#/, "")));
                } else if (Luna._sizzle_.isClass(selector)) {
                    //class选择器 上下文可以是HTML文档，XML文档及元素节点
                    if (context.getElementsByClassName) {
                        //浏览器支持情况：IE 9+, Firefox 3+, Safari4+, Chrome 4+, and Opera 10+；
                        elems = context.getElementsByClassName(selector.replace(/^./, ""));
                        for (flag = 0; flag < elems.length; flag++) {
                            resultData.push(elems[flag]);
                        }
                    } else {
                        elems = context.getElementsByTagName('*');
                        for (flag = 0; flag < elems.length; flag++) {
                            if (Luna(elems[flag]).hasClass(selector.replace(/^./, ""))) {
                                resultData.push(elems[flag]);
                            }
                        }
                    }
                } else if (Luna._sizzle_.isElemment(selector)) {
                    //元素选择器 上下文可以是HTML文档，XML文档及元素节点
                    elems = context.getElementsByTagName(selector);
                    for (flag = 0; flag < elems.length; flag++) {
                        resultData.push(elems[flag]);
                    }
                } else if (Luna._sizzle_.isAttr(selector)) {
                    if (!context.querySelectorAll) {
                        // 浏览器支持情况：IE 8+, Firefox 3.5+, Safari 3+, Chrome 4+, and Opera 10+；
                        // 上下文可以是HTML文档，XML文档及元素节点
                        elems = context.querySelectorAll(selector);
                        for (flag = 0; flag < elems.length; flag++) {
                            resultData.push(elems[flag]);
                        }
                    } else {
                        elems = context.getElementsByTagName('*');
                        var selector_exec = /^\[([^=]+)=(["'])([^=]+)\2\]$/.exec(selector);
                        for (flag = 0; flag < elems.length; flag++) {
                            if (selector_exec[3] == Luna(elems[flag]).attr(selector_exec[1])) {
                                resultData.push(elems[flag]);
                            }
                        }
                    }
                } else {
                    throw new Error('非法的选择器:' + selector);
                }
            }
            //第二部分：复合的单选择器
            else if (Luna._sizzle_.notLayer(selector)) {
                resultData.push('第二部分：复合的单选择器   开发中');
            }
            //第三部分：关系选择器 【'>',"空","~","+"】
            else {
                resultData.push('第三部分：关系选择器 【' > ',"空","~","+"】     开发中');
            }
            return resultData;
        }
    });
    Luna.extend(Luna._sizzle_, {
        "notLayer": function(selector) {
            // 判断是否是关系选择器，只可以确定不是关系选择器
            if (/[> ~+]/.test(selector)) {
                return false;
            } else {
                return true;
            }
        },
        "notComplex": function(selector) {
            // 判断是否是复合的单选择器，只可以确定不是复合的单选择器
            if (!Luna._sizzle_.notLayer(selector)) {
                return true; //如果可能是关系选择器又认为它不是复合的单选择器
            } else {
                if (!/[#.[]/.test(selector)) { //如果只是元素选择器，一定不是复合的单选择器
                    return true;
                } else if (!/^[#.[]/.test(selector)) { //如果不只是元素选择器，而且元素选择器开头，就一定不是复合的单选择器
                    return false;
                }
                //去掉开头的非元素选择器标志
                selector = selector.replace(/^[#.[]/, '');
                if (/[#.[]/.test(selector)) { //如果不只是元素选择器，一定是复合的单选择器
                    return false;
                } else {
                    return true;
                }
            }
        },
        "isSingle": function(selector) {
            //判断是不是最单纯的选择器
            if (Luna._sizzle_.notLayer(selector) && Luna._sizzle_.notComplex(selector)) {
                return true;
            } else {
                return false;
            }
        },
        "isID": function(selector) {
            // #id 前置条件：已经知道是最单纯的选择器
            if (/^#/.test(selector)) {
                return true;
            } else {
                return false;
            }
        },
        "isClass": function(selector) {
            // .class 前置条件：已经知道是最单纯的选择器
            if (/^\./.test(selector)) {
                return true;
            } else {
                return false;
            }
        },
        "isElemment": function(selector) {
            // element 前置条件：已经知道是最单纯的选择器
            if (!/^[#.[]/.test(selector)) {
                return true;
            } else {
                return false;
            }
        },
        "isAttr": function(selector) {
            //[attr="val"] 前置条件：已经知道是最单纯的选择器
            if (/^\[([^=]+)=(["'])([^=]+)\2\]$/.test(selector)) {
                return true;
            } else {
                return false;
            }
        }
    });

})(window, window.Luna);
