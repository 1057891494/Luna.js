(function(window, Luna, undefined) {
    'use strict';
    Luna.extend({
        /**
         * 判断是不是闰年
         */
        'isLeapYear': function(year) {
            if ((year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)) {
                return true;
            } else {
                return false;
            }
        },
        /**
         * 判断某年某月多少天
         */
        'getMonthDay': function(month, year) {
            var monthDay = [31, -1, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
            if (!!monthDay && monthDay > 0) {
                return monthDay;
            } else if (!!year && month >= 1 && month <= 12) {
                return Luna.isLeapYear(year) ? 29 : 28;
            }
            throw new Error('parameter is unexcepted!');
        },
        /**
         * 计算某年某月第一天是星期几
         */
        'getBeginWeek': function(year, month) {
            var beginWeek = new Date(year + "/" + month + "/1").getDay();
            if (beginWeek == 0) {
                return 7;
            }
            return beginWeek;
        }
    });
})(window, window.Luna);
