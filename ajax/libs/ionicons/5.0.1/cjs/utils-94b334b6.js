'use strict';

const core = require('./core-beb31360.js');

let CACHED_MAP;
const getIconMap = () => {
    if (typeof window === 'undefined') {
        return new Map();
    }
    else {
        if (!CACHED_MAP) {
            const win = window;
            win.Ionicons = win.Ionicons || {};
            CACHED_MAP = win.Ionicons.map = win.Ionicons.map || new Map();
        }
        return CACHED_MAP;
    }
};
const addIcons = (icons) => {
    const map = getIconMap();
    Object.keys(icons).forEach(name => map.set(name, icons[name]));
};
const getUrl = (i) => {
    let url = getSrc(i.src);
    if (url) {
        return url;
    }
    url = getName(i.name, i.icon, i.mode, i.ios, i.md);
    if (url) {
        return getNamedUrl(url);
    }
    if (i.icon) {
        url = getSrc(i.icon);
        if (url) {
            return url;
        }
        url = getSrc(i.icon[i.mode]);
        if (url) {
            return url;
        }
    }
    return null;
};
const getNamedUrl = (iconName) => {
    const url = getIconMap().get(iconName);
    if (url) {
        return url;
    }
    return core.getAssetPath(`svg/${iconName}.svg`);
};
const getName = (iconName, icon, mode, ios, md) => {
    // default to "md" if somehow the mode wasn't set
    mode = (mode && toLower(mode)) === 'ios' ? 'ios' : 'md';
    // if an icon was passed in using the ios or md attributes
    // set the iconName to whatever was passed in
    if (ios && mode === 'ios') {
        iconName = toLower(ios);
    }
    else if (md && mode === 'md') {
        iconName = toLower(md);
    }
    else {
        if (!iconName && icon && !isSrc(icon)) {
            iconName = icon;
        }
        if (isStr(iconName)) {
            iconName = toLower(iconName);
        }
    }
    if (!isStr(iconName) || iconName.trim() === '') {
        return null;
    }
    // only allow alpha characters and dash
    const invalidChars = iconName.replace(/[a-z]|-|\d/gi, '');
    if (invalidChars !== '') {
        return null;
    }
    return iconName;
};
const getSrc = (src) => {
    if (isStr(src)) {
        src = src.trim();
        if (isSrc(src)) {
            return src;
        }
    }
    return null;
};
const isSrc = (str) => str.length > 0 && /(\/|\.)/.test(str);
const isStr = (val) => typeof val === 'string';
const toLower = (val) => val.toLowerCase();

exports.addIcons = addIcons;
exports.getName = getName;
exports.getUrl = getUrl;
exports.isStr = isStr;
