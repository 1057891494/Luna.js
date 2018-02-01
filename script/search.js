(function(window, Luna, undefined) {
    'use strict';

    Luna.prototype.extend({

        /**
         * 返回全部被选元素的直接父元素
         */
        "parent": function() {
            var $this = Luna(this);
            var i = 0,
                node = $this[i],
                parent;
            while (node) {
                parent = node;
                do {
                    parent = parent.parentNode;
                    $this[i] = (function(flag) {
                        if (flag) {
                            return parent;
                        }
                        return null;
                    })(parent && parent.nodeType === 1);
                } while (parent.parentNode && !$this[i]);
                i++;
                node = $this[i];
            }
            $this.selector = $this.selector + ":parent";
            return $this;
        },

        /**
         * 返回被选元素的所有祖先元素，不包括祖先的兄弟
         */
        "parents": function() {
            var $this = Luna(this);
            var parent = $this[0];
            $this.length = 0;
            do {
                parent = parent.parentNode;
                if (parent && parent.nodeType === 1) {
                    $this[$this.length] = parent;
                    $this.length += 1;
                }
            } while (parent);
            $this.selector = $this.selector + ":parents";
            return $this;
        },

        /**
         * 返回被选元素的所有直接子元素
         */
        "children": function() {
            var $this = Luna(this);
            var children = $this[0].childNodes;
            var i = 0,
                node = children[i];
            $this.length = 0;
            while (node) {
                if (node && node.nodeType === 1) {
                    $this[$this.length] = node;
                    $this.length++;
                }
                i++;
                node = children[i];
            }
            $this.selector = $this.selector + ":children";
            return $this;
        },

        /**
         * 返回被选元素的所有同胞元素
         */
        "siblings": function() {
            var $this = Luna(this);
            var $parent = $this.parent();
            $this.selector = $this.selector + ":siblings";
            return Luna($parent[0]).children();
        },

        /**
         * 返回全部被选元素的下一个同胞元素
         */
        "next": function() {
            var $this = Luna(this);
            var i = 0,
                node = $this[i],
                sibling;
            while (node) {
                sibling = node;
                do {
                    sibling = sibling.nextSibling;
                    $this[i] = (function(flag) {
                        if (flag) {
                            return sibling;
                        }
                        return null;
                    })(sibling && sibling.nodeType === 1);
                } while (sibling.nextSibling && !$this[i]);
                i++;
                node = $this[i];
            }
            var len = 0;
            for (i = 0; i < $this.length; i++) {
                if (!!$this[i]) {
                    $this[len] = $this[i];
                    len++;
                }
            }
            $this.length=len;
            $this.selector = $this.selector + ":next";
            return $this;
        },

        /**
         * 返回被选元素的所有跟随的同胞元素
         */
        "nextAll": function() {
            var $this = Luna(this);
            var sibling = $this[0];
            $this.length = 0;
            do {
                sibling = sibling.nextSibling;
                if (sibling && sibling.nodeType === 1) {
                    $this[$this.length] = sibling;
                    $this.length += 1;
                }
            } while (sibling);
            $this.selector = $this.selector + ":nextAll";
            return $this;
        },

        /**
         * 返回全部被选元素的前一个同胞元素
         */
        "prev": function() {
            var $this = Luna(this);
            var i = 0,
                node = $this[i],
                sibling;
            while (node) {
                sibling = node;
                do {
                    sibling = sibling.previousSibling;
                    $this[i] = (function(flag) {
                        if (flag) {
                            return sibling;
                        }
                        return null;
                    })(sibling && sibling.nodeType === 1);
                } while (sibling.previousSibling && !$this[i]);
                i++;
                node = $this[i];
            }
            $this.selector = $this.selector + ":prev";
            return $this;
        },

        /**
         * 返回被选元素的所有之前的同胞元素
         */
        "prevAll": function() {
            var $this = Luna(this);
            var sibling = $this[0];
            $this.length = 0;
            do {
                sibling = sibling.previousSibling;
                if (sibling && sibling.nodeType === 1) {
                    $this[$this.length] = sibling;
                    $this.length += 1;
                }
            } while (sibling);
            $this.selector = $this.selector + ":prevAll";
            return $this;
        },

        /**
         * 查找结点
         */
        "find": function(selector) {
            var $this = Luna(this);
            selector = selector || "*";
            return Luna(selector, $this[0]);
        },

        /**
         * 返回被选元素的首个元素
         */
        "first": function() {
            var $this = Luna(this);
            if ($this[0]) {
                $this.length = 1;
            } else {
                $this.length = 0;
            }
            $this.selector = $this.selector + ":first";
            return $this;
        },

        /**
         * 返回被选元素的最后一个元素
         */
        "last": function() {
            var $this = Luna(this);
            if ($this[$this.length - 1]) {
                $this[0] = $this[$this.length - 1];
                $this.length = 1;
            } else {
                $this.length = 0;
            }
            $this.selector = $this.selector + ":last";
            return $this;
        },

        /**
         * 返回被选元素中带有指定索引号的元素，从0开始
         */
        "eq": function(num) {
            var $this = Luna(this);
            if ($this[num]) {
                $this[0] = $this[num];
                $this.length = 1;
            } else {
                $this.length = 0;
            }
            $this.selector = $this.selector + ":eq(" + num + ")";
            return $this;
        }
    });
})(window, window.Luna);
