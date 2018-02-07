(function(noGlobal, window, Luna, undefined) {
    'use strict';

    if (noGlobal) {
        return window;
    }

    Luna.prototype.extend({
        /**
         * 返回全部被选元素的直接父元素
         */
        "parent": function() {
            var $this = Luna(this),
                flag, num = 0,
                parent;
            for (flag = 0; flag < $this.length; flag++) {
                if (!!$this[flag]) {
                    parent = $this[flag].parentNode;
                }
                while (parent && parent.nodeType !== 1 && parent.nodeType !== 11 && parent.nodeType !== 9 && parent.parentNode) {
                    parent = parent.parentNode;
                }
                if (parent && (parent.nodeType === 1 || parent.nodeType === 11 || parent.nodeType === 9)) {
                    $this[num] = parent;
                    num++;
                }
            }
            for (flag = num; flag < $this.length; flag++) {
                delete $this[flag];
            }
            $this.length = num;
            $this.selector = $this.selector + ":parent()";
            return $this;
        },

        /**
         * 返回被选元素的所有祖先元素（不包括祖先的兄弟）
         * selector只支持二类选择器
         */
        "parents": function(selector) {
            selector = selector || '';
            var $this = Luna(this),
                flag,
                parent = $this[0],
                tempResult = [];
            while (parent && parent.parentNode) {
                parent = parent.parentNode;
                if (parent.nodeType === 1 || parent.nodeType === 11 || parent.nodeType === 9) {
                    tempResult.push(parent);
                }
            }
            tempResult = Luna._sizzle_.filter(tempResult, selector);
            for (flag = tempResult.length; flag < $this.length; flag++) {
                delete $this[flag];
            }
            $this.length = tempResult.length;
            for (flag = 0; flag < tempResult.length; flag++) {
                $this[flag] = tempResult[flag];
            }
            $this.selector = $this.selector + ":parents('" + selector + "')";
            return $this;
        },

        /**
         * 返回被选元素的所有直接子元素
         * selector只支持二类选择器
         */
        "children": function(selector) {
            selector = selector || '';
            var $this = Luna(this),
                flag,
                child = $this[0],
                tempResult = [];
            if (!child) {
                tempResult = [];
            } else {
                child = child.childNodes;
                for (flag = 0; flag < child.length; flag++) {
                    if (child[flag].nodeType === 1 || child[flag].nodeType === 11 || child[flag].nodeType === 9) {
                        tempResult.push(child[flag]);
                    }
                }
                tempResult = Luna._sizzle_.filter(tempResult, selector);
            }

            for (flag = tempResult.length; flag < $this.length; flag++) {
                delete $this[flag];
            }
            $this.length = tempResult.length;
            for (flag = 0; flag < tempResult.length; flag++) {
                $this[flag] = tempResult[flag];
            }
            $this.selector = $this.selector + ":children('" + selector + "')";
            return $this;
        },

        /**
         * 返回被选元素的所有同胞元素，包括自己
         * selector只支持二类选择器
         */
        "siblings": function(selector) {
            selector = selector || '';
            var $this = Luna(this),
                flag,
                sibling = $this[0],
                tempResult = [];
            if (!sibling) {
                tempResult = [];
            } else {
                sibling = sibling.parentNode;
                while (sibling && sibling.nodeType !== 1 && sibling.nodeType !== 11 && sibling.nodeType !== 9 && sibling.parentNode) {
                    sibling = sibling.parentNode;
                }
                if (!sibling) {
                    tempResult = [];
                } else {
                    sibling = sibling.childNodes;
                    for (flag = 0; flag < sibling.length; flag++) {
                        if (sibling[flag].nodeType === 1 || sibling[flag].nodeType === 11 || sibling[flag].nodeType === 9) {
                            tempResult.push(sibling[flag]);
                        }
                    }
                    tempResult = Luna._sizzle_.filter(tempResult, selector);
                }

            }

            for (flag = tempResult.length; flag < $this.length; flag++) {
                delete $this[flag];
            }
            $this.length = tempResult.length;
            for (flag = 0; flag < tempResult.length; flag++) {
                $this[flag] = tempResult[flag];
            }
            $this.selector = $this.selector + ":siblings('" + selector + "')";
            return $this;
        },

        /**
         * 返回全部被选元素的下一个同胞元素
         */
        "next": function() {
            var $this = Luna(this),
                flag, num = 0,
                next;
            for (flag = 0; flag < $this.length; flag++) {
                if (!!$this[flag]) {
                    next = $this[flag].nextSibling;
                }
                while (next && next.nodeType !== 1 && next.nodeType !== 11 && next.nodeType !== 9 && next.nextSibling) {
                    next = next.nextSibling;
                }
                if (next && (next.nodeType === 1 || next.nodeType === 11 || next.nodeType === 9)) {
                    $this[num] = next;
                    num++;
                }
            }
            for (flag = num; flag < $this.length; flag++) {
                delete $this[flag];
            }
            $this.length = num;
            $this.selector = $this.selector + ":next()";
            return $this;
        },

        /**
         * 返回被选元素的所有跟随的同胞元素
         * selector只支持二类选择器
         */
        "nextAll": function(selector) {
            selector = selector || '';
            var $this = Luna(this),
                flag,
                next = $this[0],
                tempResult = [];
            while (next && next.nextSibling) {
                next = next.nextSibling;
                if (next.nodeType === 1 || next.nodeType === 11 || next.nodeType === 9) {
                    tempResult.push(next);
                }
            }
            tempResult = Luna._sizzle_.filter(tempResult, selector);
            for (flag = tempResult.length; flag < $this.length; flag++) {
                delete $this[flag];
            }
            $this.length = tempResult.length;
            for (flag = 0; flag < tempResult.length; flag++) {
                $this[flag] = tempResult[flag];
            }
            $this.selector = $this.selector + ":nextAll('" + selector + "')";
            return $this;
        },

        /**
         * 返回全部被选元素的前一个同胞元素
         */
        "prev": function() {
            var $this = Luna(this),
                flag, num = 0,
                prev;
            for (flag = 0; flag < $this.length; flag++) {
                if (!!$this[flag]) {
                    prev = $this[flag].previousSibling;
                }
                while (prev && prev.nodeType !== 1 && prev.nodeType !== 11 && prev.nodeType !== 9 && prev.previousSibling) {
                    prev = prev.previousSibling;
                }
                if (prev && (prev.nodeType === 1 || prev.nodeType === 11 || prev.nodeType === 9)) {
                    $this[num] = prev;
                    num++;
                }
            }
            for (flag = num; flag < $this.length; flag++) {
                delete $this[flag];
            }
            $this.length = num;
            $this.selector = $this.selector + ":prev()";
            return $this;
        },

        /**
         * 返回被选元素的所有之前的同胞元素
         * selector只支持二类选择器
         */
        "prevAll": function(selector) {
            selector = selector || '';
            var $this = Luna(this),
                flag,
                prev = $this[0],
                tempResult = [];
            while (prev && prev.previousSibling) {
                prev = prev.previousSibling;
                if (prev.nodeType === 1 || prev.nodeType === 11 || prev.nodeType === 9) {
                    tempResult.push(prev);
                }
            }
            tempResult = Luna._sizzle_.filter(tempResult, selector);
            for (flag = tempResult.length; flag < $this.length; flag++) {
                delete $this[flag];
            }
            $this.length = tempResult.length;
            for (flag = 0; flag < tempResult.length; flag++) {
                $this[flag] = tempResult[flag];
            }
            $this.selector = $this.selector + ":prevAll('" + selector + "')";
            return $this;
        },
        /**
         * 根据选择器过滤已经选择的节点
         * selector只支持二类选择器
         */
        "filter": function(selector) {
            selector = selector || '';
            var $this = Luna(this),
                flag, tempResult = [];
            for (flag = 0; flag < $this.length; flag++) {
                tempResult.push($this[flag]);
            }
            tempResult = Luna._sizzle_.filter(tempResult, selector);
            for (flag = tempResult.length; flag < $this.length; flag++) {
                delete $this[flag];
            }
            $this.length = tempResult.length;
            for (flag = 0; flag < tempResult.length; flag++) {
                $this[flag] = tempResult[flag];
            }
            $this.selector = $this.selector + ":filter('" + selector + "')";
            return $this;
        }
    });
})(typeof window !== "undefined" ? false : true, typeof window !== "undefined" ? window : this, (typeof window !== "undefined" ? window : this).Luna);
