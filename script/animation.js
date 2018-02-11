(function(window, Luna, undefined) {
    'use strict';
    Luna.extend({
        /*提供动画效果*/
        "animation": function(doback, duration, callback) {
            Luna.clock.timer(function(deep) {
                //其中deep为0-100，单位%，表示改变的程度
                doback(deep);
            }, duration, callback);
        }
    });

    Luna.extend(Luna.clock, {
        //把tick函数推入堆栈
        "timer": function(tick, duration, callback) {
            if (!tick) {
                throw new Error('tick is required!');
            }
            duration = duration || Luna.clock.speeds;
            Luna.clock.timers.push({
                "createTime": new Date(),
                "tick": tick,
                "duration": duration,
                "callback": callback
            });
            Luna.clock.start();
        },

        //开启唯一的定时器timerId
        "start": function() {
            if (!Luna.clock.timerId) {
                Luna.clock.timerId = window.setInterval(Luna.clock.tick, Luna.clock.interval);
            }
        },

        //被定时器调用，遍历timers堆栈
        "tick": function() {
            var createTime, flag, tick, callback, timer, duration, passTime, needStop, deep,
                timers = Luna.clock.timers;
            Luna.clock.timers = [];
            Luna.clock.timers.length = 0;
            for (flag = 0; flag < timers.length; flag++) {
                //初始化数据
                timer = timers[flag];
                createTime = timer.createTime;
                tick = timer.tick;
                duration = timer.duration;
                callback = timer.callback;
                needStop = false;

                //执行
                passTime = (+new Date() - createTime) / duration;
                if (passTime >= 1) {
                    needStop = true;
                }
                passTime = passTime > 1 ? 1 : passTime;
                deep = 100 * passTime;
                tick(deep);
                if (passTime < 1) {
                    //动画没有结束再添加
                    Luna.clock.timers.push(timer);
                } else if (callback) {
                    callback();
                }
            }
            if (Luna.clock.timers.length <= 0) {
                Luna.clock.stop();
            }
        },

        //停止定时器，重置timerId=null
        "stop": function() {
            if (Luna.clock.timerId) {
                window.clearInterval(Luna.clock.timerId);
                Luna.clock.timerId = null;
            }
        }
    });
})(window,window.Luna);
