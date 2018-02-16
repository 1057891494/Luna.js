# luna.js:The JavaScript Library

[![hompage](https://github.com/yelloxing/Luna.js/blob/master/SVG/github.svg)](https://github.com/yelloxing)
[![Luna Code](https://github.com/yelloxing/Luna.js/blob/master/SVG/luna.svg)](https://github.com/yelloxing/Luna.js)
[![Luna Code](https://github.com/yelloxing/Luna.js/blob/master/SVG/license.svg)](https://github.com/yelloxing/Luna.js/blob/master/LICENSE)

<img align="right" height="100" src="https://github.com/yelloxing/Luna.js/blob/master/luna.png">

### 作者:心叶
### 邮箱:yelloxing@gmail.com

### 免责声明
*   项目中部分数据（如图片等）来自互联网，如果侵犯到对应权益者请联系我们，方便我们及时删除！
*   保留贡献者全部权利，发生的任何纠纷，本项目作者和维护人概不负责，如有侵权，请及时和我们取得联系。

### 项目总览
*   整体设计思想是通过传递css选择器来选择想要操作的结点（只支持部分选择器），然后就可以调用定义好的方法来操作选择的结点。当然你可以调用内置的方法来加强选择或增加过滤条件，调用的方法也可以自己扩展。
*   除了和结点（Luna对象）相关的操作，在Luna上可以调用一些有价值的、经过不断迭代加以改进的快捷方法。

### 使用方法
*   你可以直接在这里下载代码里面的luna.js或luna.min.js来使用，或者通过npm install --save-dev luna-library 命令来安装本项目，然后引用luna.js或luna.min.js也可以。

### 支持的CSS选择器
*   第一类：class选择器、ID选择器、属性选择器和元素选择器。
*   第二类：第一类选择器的任意组合。
*   第三类：在前面二类中可以增加这四种结点关系选择器：'>',"空","~","+"。

### 重要说明
*   关于测试和不稳定版本问题：历史版本 V0.x.x 的为测试版本， V1.x.x 的为不稳定版本，为了保证安全使用，请使用时多测试，发现问题可以反馈或帮忙修改bug提交代码，非常感谢。
*   关于稳定版本：对于 V2.x.x 以及更高版本，请大家放心使用。
*   版本号规则：Va.b.c，其中a标记一个大的改变，如果设计的整体、性质（比如测试版本和稳定版本）或者性能没有非常大的改变的话，是不会轻易改变的；对于b就是非常大的功能添加或删除时改变；c一般针对小访问的功能优化和小功能的添加，特别的针对功能性bug的修复的更新，性能bug不一定会实时更新。

### 查询文档API
*   Luna.js官方API地址： https://yelloxing.github.io/Luna.js/index.html 
