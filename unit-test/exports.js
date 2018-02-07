'use strict';

var luna = require('../luna.js');

// 测试动画
luna.animation(function(deep) {
    console.log("1 >>> " + deep + "%");
}, 1000, function() {
    console.log("1 >>> " + new Date());
});
luna.animation(function(deep) {
    console.log("2 >>> " + deep + "%");
}, 1000, function() {
    console.log("2 >>> " + new Date());
});
luna.animation(function(deep) {
    console.log("3 >>> " + deep + "%");
}, 1000, function() {
    console.log("3 >>> " + new Date());
});

console.log(luna);
