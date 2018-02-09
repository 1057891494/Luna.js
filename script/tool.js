(function(window, Luna, undefined) {
    'use strict';
    Luna.extend({
        /**
         * 合并若干个class
         */
        "uniqueClass": function() {
            var classString = '',
                flag = 0;
            for (; flag < arguments.length; flag++) {
                if (typeof arguments[flag] !== 'string') {
                    throw new Error('Only string is valid,not project!');
                }
                classString += arguments[flag] + " ";
            }
            classString = classString.trim();
            var classArray = classString.split(/ +/);
            var classObj = {};
            classArray.forEach(function(item) {
                classObj[item] = true;
            }, this);
            classString = '';
            for (var item in classObj) {
                if (classObj[item])
                    classString += item + " ";
            }

            return classString.trim();
        },

        /**
         * 删除已经存在的class或toggle，用flag来标记，flag为真表示删除
         */
        "operateClass": function(srcClass, opeClass, flag) {
            if (typeof srcClass !== 'string' || typeof opeClass !== 'string') {
                throw new Error('Only string is valid,not project!');
            }
            srcClass = srcClass.trim();
            opeClass = opeClass.trim();
            var srcClassArray = srcClass.split(/ +/);
            var opeClassArray = opeClass.split(/ +/);
            var classObj = {};
            srcClassArray.forEach(function(item) {
                classObj[item] = true;
            }, this);
            opeClassArray.forEach(function(item) {
                classObj[item] = flag ? false : !classObj[item];
            }, this);
            var classString = '';
            for (var item in classObj) {
                if (classObj[item])
                    classString += item + " ";
            }

            return classString.trim();
        }
    });
})(typeof window !== "undefined" ? window : this, (typeof window !== "undefined" ? window : this).Luna);
