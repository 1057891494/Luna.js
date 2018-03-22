(function(window, Luna, undefined) {
    'use strict';

    Luna.extend({

        /**
         * 获取XHR对象
         */
        "getXHR": function() {
            if (!!Luna.XHR) {
                return Luna.XHR;
            }

            if (window.XMLHttpRequest) {
                Luna.XHR = new window.XMLHttpRequest();
            } else {
                Luna.XHR = new window.ActiveXObject("Microsoft.XMLHTTP");
            }

            return Luna.XHR;
        },

        /**
         * 通过HTTP GET获取指定路径文件
         */
        "get": function(url, callback, errorback) {
            var xmlhttp = Luna.getXHR();
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        if (callback) {
                            callback(this.responseText);
                        }
                    } else {
                        if (errorback) {
                            errorback();
                        }
                    }
                }
            };
            xmlhttp.open('get', url + "?Token=" + (new Date()).valueOf(), true);
            xmlhttp.send();
        },

        /**
         * 通过HTTP GET形式的加载JavaScript文件并在全局运行它
         */
        "getScript": function(url, callback, errorback) {
            Luna.get(url, function(js) {
                Luna.eval(js);
                callback();
            }, errorback);
        }
    });
})(window, window.Luna);
