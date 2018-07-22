const util = {};

util.getSafeObject = function (target, keys) {
    if (typeof keys === "string") {
        keys = util.getKeys(keys);
    }
    if (!keys.length) {
        return target;
    }

    let nextKey = keys.shift();
    if (typeof target === "object" && nextKey in target) {
        return util.getSafeObject(target[nextKey], keys);
    } else {
        return "";
    }
}

util.getKeys = function (keyString) {
    return keyString.replace(/\[/g, ".").replace(/\]/g, "").split(".");
}

module.exports = util;
