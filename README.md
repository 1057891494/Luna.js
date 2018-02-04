# Luna.js:The JavaScript Library

[![hompage](https://github.com/yelloxing/Luna.js/blob/master/SVG/github.svg)](https://github.com/yelloxing)
[![Luna Code](https://github.com/yelloxing/Luna.js/blob/master/SVG/luna.svg)](https://github.com/yelloxing/Luna.js)
[![Luna Code](https://github.com/yelloxing/Luna.js/blob/master/SVG/license.svg)](https://github.com/yelloxing/Luna.js/blob/master/LICENSE)

<img align="right" height="100" src="https://github.com/yelloxing/Luna.js/blob/master/luna.png">

### 作者:心叶
### 邮箱:yelloxing@gmail.com

### 免责声明
*   项目中部分数据（如图片等）来自互联网，如果侵犯到对应权益者请联系我们，方便我们及时删除！
*   本文档保留贡献者全部权利，不用于非商业的学习交流之外的任何地方，发生的任何纠纷，本文档作者和维护人概不负责，如有侵权，请及时和我们取得联系。

### 项目总览
*   整体设计思想是通过传递css选择器来选择想要操作的结点（只支持部分选择器），然后就可以调用定义好的方法来操作选择的结点。当然你可以调用内置的方法来加强选择或增加过滤条件，调用的方法也可以自己扩展。
*   除了和结点（Luna对象）相关的操作，在Luna上可以调用一些有价值的、经过不断迭代加以改进的快捷方法。

### 支持的CSS选择器
*   第一类：class选择器、ID选择器、属性选择器和元素选择器。
*   第二类：第一类选择器的任意组合。
*   第三类：在前面二类中可以增加这四种结点关系选择器：'>',"空","~","+"。
