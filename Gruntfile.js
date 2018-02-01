'use strict';

var sourceScript = [
    './script/core.js',
    './script/event.js',
    './script/dom.js',
    './script/selector.js',
    './script/tool.js'
];
var banner = '/*! \n====================================\n    <%= pkg.description %>\n    <%= pkg.author %>\n    V<%=pkg.version%>-<%=pkg.type%>\n    最后修改于：<%= grunt.template.today("yyyy-mm-dd") %>\n====================================\n*/\n';
module.exports = function(grunt) {
    /*配置插件*/
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: { //合并代码
            options: {
                separator: '\n', //文件连接分隔符，表示连接的文件用指定的separator分割。
                stripBanners: true, //如果为true，去除代码中的块注释，默认为false
                banner: banner
            },
            target: {
                src: sourceScript,
                dest: 'luna.js'
            }
        },
        jshint: { //语法检查
            options: { //语法检查配置
                '-W064': true,
                "strict": true,
                "eqnull": true,
                "undef": true,
                "globals": {
                    "$": true,
                    "window": true,
                    "Luna": true,
                    "setTimeout": true,
                    "document": true,
                    "console": true
                },
                "force": true, // 强制执行，即使出现错误也会执行下面的任务
                "reporterOutput": 'jshint.debug.txt' //将jshint校验的结果输出到文件
            },
            target: sourceScript
        },
        uglify: { //压缩代码
            options: {
                banner: banner
            },
            target: {
                options: {
                    mangle: true
                },
                files: [{
                    'luna.min.js': ['luna.js']
                }]
            }
        }
    });

    /*加载插件*/
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    /*注册任务*/
    grunt.registerTask('default', ['concat:target', 'jshint:target', 'uglify:target']);
};
