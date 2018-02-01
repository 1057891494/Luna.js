(function(global, factory, undefined) {
    'use strict';

    if (global && global.document) {
        factory(global);
    } else {
        throw new Error("Luna requires a window with a document!");
    }

})(window, function(window, undefined) {
    'use strict';

    var Luna = function(selector, context) {
        return new Luna.prototype.init(selector, context);
    };

    /**
     * @param selector [string,function,dom,Luna Object] 选择器
     * @param context [dom,Luna Object] 查找上下文，默认document
     *
     * @return Luna Object
     * {
     *  [],//查找的结果保存在数组中
     *  context,//查找时使用的上下文
     *  length,//查找回来的个数
     *  isTouch//返回是否是已经查找过的结点
     *  selector//选择器
     * }
     */
    Luna.prototype.init = function(selector, context, root) {

        //准备工作
        if (typeof selector === 'string') {
            selector = (selector + "").trim();
        }

        var flag;
        this.length = 0;
        root = root || rootLuna;

        if (!context) {
            context = document;
        } else {
            context = Luna(context)[0];
        }

        //选择器: $(""), $(null), $(undefined), $(false)，兼容一下
        if (!selector) {
            return this;　　
        } else {
            this.selector = selector;
        }

        //body比较特殊，直接提出来
        if (selector == "body") {
            this.context = document;
            this[0] = document.body;
            this.isTouch = true;
            this.length = 1;
            return this;
        }

        //如果是字符串
        if (typeof selector === 'string') {
            //去掉：换行，换页，回车
            selector = (selector + "").trim().replace(/[\n\f\r]/g, '');
            if (/^</.test(selector)) {
                //如果是html文档
                if (!context) {
                    throw new Error("Parameter error!");
                }
                var frameDiv = document.createElement("div");
                frameDiv.innerHTML = selector;
                this[0] = frameDiv.childNodes[0];
                this.isTouch = true;
                this.length = 1;
                this.context = undefined;
                return this;
            } else {
                //内置小型sizzle选择器
                if (!Luna.doSelector) {
                    throw new Error("Sizzle is necessary for Luna!");
                }
                var nodes = Luna.sizzle(selector, context);
                flag = 0;
                for (; flag < nodes.length; flag++) {
                    this[flag] = nodes[flag];
                }
                this.length = flag;
                this.isTouch = true;
                this.context = context;
                return this;
            }
        }
        //如果是DOM节点
        if (selector.nodeType === 1 || selector.nodeType === 11 || selector.nodeType === 9) {
            this.context = context;
            this[0] = selector;
            this.isTouch = true;
            this.length = 1;
            return this;
        }

        //如果是function
        if (typeof selector === 'function') {
            if (Luna.__isLoad__) {
                selector();
            } else {
                if (document.addEventListener) {
                    //Mozilla, Opera and webkit
                    document.addEventListener("DOMContentLoaded", function doListenter() {
                        document.removeEventListener("DOMContentLoaded", doListenter, false);
                        selector();
                        Luna.__isLoad__ = true;
                    });

                } else if (document.attachEvent) {
                    //IE
                    document.attachEvent("onreadystatechange", function doListenter() {
                        if (document.readyState === "complete") {
                            document.detachEvent("onreadystatechange", doListenter);
                            selector();
                            Luna.__isLoad__ = true;
                        }
                    });

                }
            }
            return this;
        }

        //如果是Luna对象
        if (selector.isTouch) {
            this.isTouch = true;
            flag = 0;
            for (; flag < selector.length; flag++) {
                this[flag] = selector[flag];
            }
            this.context = selector.context || context;
            this.length = selector.length;
            this.selector = selector.selector;
            return this;
        }

        return this;

    };

    var rootLuna = Luna(document);

    Luna.prototype.extend = Luna.extend = function() {

        var target = arguments[0] || {};
        var source = arguments[1] || {};
        var length = arguments.length;

        /*
         * 确定复制目标和源
         */
        if (length === 1) {
            //如果只有一个参数，目标对象是自己
            source = target;
            target = this;
        }
        if (typeof target !== "object" && typeof target !== 'function') {
            //如果目标不是对象或函数，则初始化为空对象
            target = {};
        }

        /*
         * 复制属性到对象上面
         */
        for (var key in source) {
            try {
                target[key] = source[key];
            } catch (e) {
                throw new Error("Illegal property value！");
            }
        }

        return target;
    };

    Luna.prototype.init.prototype = Luna.prototype;

    Luna.__isLoad__ = false;

    window.Luna = window.$ = Luna;

});
