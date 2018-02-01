function toEqual(value, target, key, flag) {
    if (!!flag) {
        console.log(target);
        target = target[key](flag);
    } else if (!!key) {
        console.log(target);
        target = target[key];
    }
    if (value != target) {
        console.log("%c[测试失败]" + value + "!=" + target, 'color:#ff0000');
    } else {
        console.log("%c[测试成功]" + value + "==" + target, 'color:#2196F3');
    }
}
