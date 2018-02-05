(function(window, Luna, undefined) {
    'use strict';

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
        },
        "isValidComplex": function(selector) {
            //判断是不是合法的第二类选择器 前置条件：已经知道只可能是第二类选择器或者非法
            selector = selector.replace(/^[^#.[]+/, ''); //去掉开头的标签选择器
            selector = selector.replace(/\[([^=]+)=(["'])([^=]+)\2\]/g, ''); //去掉合法的属性选择器
            selector = selector.replace(/#[^#.[]+/g, ''); //去掉id选择器
            selector = selector.replace(/\.[^#.[]+/g, ''); //去掉class选择器
            if (selector != "") { //如果此时还存在，一定是非法的
                return false;
            } else {
                return true;
            }
        },
        "toComplexSelectorObject": function(selector) {
            //前置条件：已经知道确定是第二类选择器
            var selectorObj = {},
                flag;
            var currentSelector = selector.match(/^[^#.[]+/); //标签
            if (!!currentSelector && currentSelector.length > 0) {
                selectorObj._elem_ = currentSelector[0];
            }
            currentSelector = selector.match(/\[([^=]+)=(["'])([^=]+)\2\]/g); //属性选择器
            if (!!currentSelector && currentSelector.length > 0) {
                selectorObj._attr_ = [];
                for (flag = 0; flag < currentSelector.length; flag++) {
                    selectorObj._attr_.push(currentSelector[flag]);
                }
            }
            currentSelector = selector.match(/#[^#.[]+/g); //id选择器
            if (!!currentSelector && currentSelector.length > 0) {
                selectorObj._id_ = (currentSelector[0]).replace(/^#/, "");
            }
            currentSelector = selector.match(/\.[^#.[]+/g); //class选择器
            if (!!currentSelector && currentSelector.length > 0) {
                selectorObj._class_ = [];
                for (flag = 0; flag < currentSelector.length; flag++) {
                    selectorObj._class_.push(currentSelector[flag].replace(/^\./, ""));
                }
            }
            return selectorObj;
        },
        "checkedElems": function(needCheckResultArray, selectorObj) {
            //id选择器不用匹配了，如果有一定会用，不用就是错误
            var flag, resultData = [],
                innerFlag, tempClass, selector_exec,
                isAccept;
            for (flag = 0; flag < needCheckResultArray.length; flag++) {
                isAccept = true;
                if (!!selectorObj._elem_ && isAccept) { //1.检测元素类型
                    if (needCheckResultArray[flag].tagName != (selectorObj._elem_ + "").toUpperCase()) {
                        isAccept = false;
                    }
                }
                if (!!selectorObj._class_ && selectorObj._class_.length > 0 && isAccept) { //2.检测class
                    if (!needCheckResultArray[flag].getAttribute) {
                        isAccept = false;
                    } else {
                        tempClass = needCheckResultArray[flag].getAttribute('class') || '';
                        tempClass = " " + tempClass + " ";
                    }
                    for (innerFlag = 0; innerFlag < selectorObj._class_.length && isAccept; innerFlag++) {
                        if (tempClass.search(" " + selectorObj._class_[innerFlag] + " ") < 0) {
                            isAccept = false;
                        }
                    }
                }
                if (!!selectorObj._attr_ && selectorObj._attr_.length > 0 && isAccept) { //3.检测attr
                    for (innerFlag = 0; innerFlag < selectorObj._attr_.length && isAccept; innerFlag++) {
                        selector_exec = /^\[([^=]+)=(["'])([^=]+)\2\]$/.exec(selectorObj._attr_[innerFlag]);
                        if (!needCheckResultArray[flag].getAttribute || needCheckResultArray[flag].getAttribute(selector_exec[1]) != selector_exec[3]) {
                            isAccept = false;
                        }
                    }
                }
                if (isAccept) { //通过全部检测就接受
                    resultData.push(needCheckResultArray[flag]);
                }
            }
            return resultData;
        },
        "filter": function(tempResult, selector) {
            var selector_exec,
                helpResult, flag;
            if (!!selector && selector != "*") {
                selector = selector.trim();
                if (Luna._sizzle_.isSingle(selector)) {
                    if (Luna._sizzle_.isID(selector)) {
                        helpResult = tempResult;
                        tempResult = [];
                        for (flag = 0; flag < helpResult.length; flag++) {
                            if (helpResult[flag].getAttribute && ("#" + helpResult[flag].getAttribute('id')) == selector) {
                                tempResult.push(helpResult[flag]);
                            }
                        }
                    } else if (Luna._sizzle_.isClass(selector)) {
                        helpResult = tempResult;
                        tempResult = [];
                        for (flag = 0; flag < helpResult.length; flag++) {
                            if (helpResult[flag].getAttribute && (" " + helpResult[flag].getAttribute('class') + " ").search(" " + (selector.replace(/^\./, '')) + " ") >= 0) {
                                tempResult.push(helpResult[flag]);
                            }
                        }
                    } else if (Luna._sizzle_.isElemment(selector)) {
                        helpResult = tempResult;
                        tempResult = [];
                        for (flag = 0; flag < helpResult.length; flag++) {
                            if (helpResult[flag].tagName == ((selector + "").toUpperCase())) {
                                tempResult.push(helpResult[flag]);
                            }
                        }
                    } else if (Luna._sizzle_.isAttr(selector)) {
                        helpResult = tempResult;
                        tempResult = [];
                        for (flag = 0; flag < helpResult.length; flag++) {
                            selector_exec = /^\[([^=]+)=(["'])([^=]+)\2\]$/.exec(selector);
                            if (helpResult[flag].getAttribute && helpResult[flag].getAttribute(selector_exec[1]) == selector_exec[3]) {
                                tempResult.push(helpResult[flag]);
                            }
                        }
                    } else {
                        throw new Error('invalid selector1:' + selector);
                    }
                } else if (Luna._sizzle_.notLayer(selector)) {
                    if (Luna._sizzle_.isValidComplex(selector)) {
                        tempResult = Luna._sizzle_.checkedElems(tempResult, Luna._sizzle_.toComplexSelectorObject(selector));
                    } else {
                        throw new Error('invalid selector2:' + selector);
                    }
                } else {
                    throw new Error('undesigned selector:' + selector);
                }
            }
            return tempResult;
        }
    });

    Luna.extend({
        "sizzle": function(selector, context) {
            selector = selector.trim();
            var resultData = [],
                flag, elems, innerFlag;

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
                    //id选择器 上下文只能是HTML文档，考虑id的唯一性，直接全局查找，因此id选择器不支持上下文查找，各种类型都一样
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
                    throw new Error('invalid selector1:' + selector);
                }
            }
            //第二部分：复合的单选择器
            else if (Luna._sizzle_.notLayer(selector)) {
                if (Luna._sizzle_.isValidComplex(selector)) {
                    var complexSelectorObj = Luna._sizzle_.toComplexSelectorObject(selector);
                    var needCheckResultArray = [];
                    if (!!complexSelectorObj._id_) { //如果存在id选择器
                        needCheckResultArray = [document.getElementById(complexSelectorObj._id_)];
                        return Luna._sizzle_.checkedElems(needCheckResultArray, complexSelectorObj);
                    } else if (!!complexSelectorObj._elem_) { //如果存在elem
                        needCheckResultArray = context.getElementsByTagName(complexSelectorObj._elem_);
                        return Luna._sizzle_.checkedElems(needCheckResultArray, complexSelectorObj);
                    } else if (!!complexSelectorObj._class_ && complexSelectorObj._class_.length > 0) {
                        if (context.getElementsByClassName) { //如果是class
                            //浏览器支持情况：IE 9+, Firefox 3+, Safari4+, Chrome 4+, and Opera 10+；
                            needCheckResultArray = context.getElementsByClassName(complexSelectorObj._class_[0]);
                            return Luna._sizzle_.checkedElems(needCheckResultArray, complexSelectorObj);
                        }
                    } else { //如果没办法提前过滤，就检测全部
                        needCheckResultArray = context.getElementsByTagName('*');
                        return Luna._sizzle_.checkedElems(needCheckResultArray, complexSelectorObj);
                    }
                } else {
                    throw new Error('invalid selector2:' + selector);
                }
            }
            //第三部分：关系选择器 【'>',"空","~","+"】【儿子选择器，子孙选择器，后续兄弟选择器，后续第一个兄弟选择器】
            else {
                //切割第三部分选择器为之前部分选择器，用关系符号分割
                var layerSelectorArray = selector.replace(/ *([>+~]) */g, '@$1@').replace(/ +/g, '@ @').split('@');

                //层次上检测
                for (flag = 0; flag < layerSelectorArray.length; flag++) {
                    if (layerSelectorArray[flag] == "") {
                        throw new Error('invalid selector3:' + selector);
                    }
                }

                //关系上没有问题以后，开始查找，内部错误会有对应的处理函数暴露，和这里没有关系
                var nodes = Luna.sizzle(layerSelectorArray[layerSelectorArray.length - 1], context);
                var helpNodes = [];
                for (flag = 0; flag < nodes.length; flag++) {
                    helpNodes.push({
                        "0": nodes[flag],
                        "length": 1
                    });
                }

                //过滤
                var filterSelector, filterLayer, _inFlag_, num, tempLuna, tempHelpNodes, tempFlag;
                for (flag = layerSelectorArray.length - 1; flag > 1; flag = flag - 2) {
                    filterSelector = layerSelectorArray[flag - 2];
                    filterLayer = layerSelectorArray[flag - 1];
                    if ('>' == filterLayer) { //如果是>
                        for (innerFlag = 0; innerFlag < nodes.length; innerFlag++) { //检测每个可能入选的节点
                            num = 0;
                            if (!!helpNodes[innerFlag] && helpNodes[innerFlag].length > 0) {
                                for (_inFlag_ = 0; _inFlag_ < helpNodes[innerFlag].length; _inFlag_++) { //检测判断是否合法路径，有一个合法即可
                                    tempLuna = $(helpNodes[innerFlag][_inFlag_]).parent().filter(filterSelector);
                                    if (tempLuna.length > 0) {
                                        helpNodes[innerFlag][num] = tempLuna;
                                        num++;
                                    }
                                }
                                helpNodes[innerFlag].length = num;
                            }
                        }
                    } else if ('~' == filterLayer) { //如果是~
                        for (innerFlag = 0; innerFlag < nodes.length; innerFlag++) { //检测每个可能入选的节点
                            num = 0;
                            if (!!helpNodes[innerFlag] && helpNodes[innerFlag].length > 0) {
                                tempHelpNodes = [];
                                for (_inFlag_ = 0; _inFlag_ < helpNodes[innerFlag].length; _inFlag_++) { //检测判断是否合法路径，有一个合法即可
                                    tempLuna = $(helpNodes[innerFlag][_inFlag_]).prevAll(filterSelector);
                                    for (tempFlag = 0; tempFlag < tempLuna.length; tempFlag++) {
                                        tempHelpNodes[num] = tempLuna[tempFlag];
                                        num++;
                                    }
                                }
                                helpNodes[innerFlag].length = num;
                                for (tempFlag = 0; tempFlag < tempHelpNodes.length; tempFlag++) {
                                    helpNodes[innerFlag][tempFlag] = tempHelpNodes[tempFlag];
                                }
                            }
                        }
                    } else if ('+' == filterLayer) { //如果是+
                        for (innerFlag = 0; innerFlag < nodes.length; innerFlag++) { //检测每个可能入选的节点
                            num = 0;
                            if (!!helpNodes[innerFlag] && helpNodes[innerFlag].length > 0) {
                                for (_inFlag_ = 0; _inFlag_ < helpNodes[innerFlag].length; _inFlag_++) { //检测判断是否合法路径，有一个合法即可
                                    tempLuna = $(helpNodes[innerFlag][_inFlag_]).prev().filter(filterSelector);
                                    if (tempLuna.length > 0) {
                                        helpNodes[innerFlag][num] = tempLuna;
                                        num++;
                                    }
                                }
                                helpNodes[innerFlag].length = num;
                            }
                        }
                    } else { //上面都不是，就只可能是空格了
                        for (innerFlag = 0; innerFlag < nodes.length; innerFlag++) {
                            num = 0;
                            if (!!helpNodes[innerFlag] && helpNodes[innerFlag].length > 0) {
                                tempHelpNodes = [];
                                for (_inFlag_ = 0; _inFlag_ < helpNodes[innerFlag].length; _inFlag_++) { //检测判断是否合法路径，有一个合法即可
                                    tempLuna = $(helpNodes[innerFlag][_inFlag_]).parents(filterSelector);
                                    for (tempFlag = 0; tempFlag < tempLuna.length; tempFlag++) {
                                        tempHelpNodes[num] = tempLuna[tempFlag];
                                        num++;
                                    }
                                }
                                helpNodes[innerFlag].length = num;
                                for (tempFlag = 0; tempFlag < tempHelpNodes.length; tempFlag++) {
                                    helpNodes[innerFlag][tempFlag] = tempHelpNodes[tempFlag];
                                }
                            }
                        }
                    }
                }
                //最后被留下的就是我们需要的
                for (flag = 0; flag < nodes.length; flag++) {
                    if (!!helpNodes[flag] && helpNodes[flag].length > 0) {
                        resultData.push(nodes[flag]);
                    }
                }

            }
            return resultData;
        }
    });


})(window, window.Luna);
