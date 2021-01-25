/**
 * vue-meta v3.0.0-alpha.0
 * (c) 2021
 * - Pim (@pimlie)
 * - All the amazing contributors
 * @license MIT
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

const resolveOption = predicament => (options, contexts) => {
    let resolvedIndex = -1;
    contexts.reduce((acc, context, index) => {
        const retval = predicament(acc, context);
        if (retval !== acc) {
            resolvedIndex = index;
            return retval;
        }
        return acc;
    }, undefined);
    if (resolvedIndex > -1) {
        return options[resolvedIndex];
    }
};

function setup(context) {
    let depth = 0;
    if (context.vm) {
        let { vm } = context;
        do {
            if (vm.parent) {
                depth++;
                vm = vm.parent;
            }
        } while (vm && vm.parent && vm !== vm.root);
    }
    context.depth = depth;
}
const resolve = resolveOption((acc, context) => {
    const { depth } = context;
    if (!acc || depth > acc) {
        return acc;
    }
});

var deepest = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setup: setup,
  resolve: resolve
});

const defaultConfig = {
    body: {
        tag: 'script',
        to: 'body'
    },
    base: {
        valueAttribute: 'href'
    },
    charset: {
        tag: 'meta',
        nameless: true,
        valueAttribute: 'charset'
    },
    description: {
        tag: 'meta'
    },
    og: {
        group: true,
        namespacedAttribute: true,
        tag: 'meta',
        keyAttribute: 'property'
    },
    twitter: {
        group: true,
        namespacedAttribute: true,
        tag: 'meta'
    },
    htmlAttrs: {
        attributesFor: 'html'
    },
    headAttrs: {
        attributesFor: 'head'
    },
    bodyAttrs: {
        attributesFor: 'body'
    }
};

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 * IMPORTANT: all calls of this function must be prefixed with
 * \/\*#\_\_PURE\_\_\*\/
 * So that rollup can tree-shake them if necessary.
 */
(process.env.NODE_ENV !== 'production')
    ? Object.freeze({})
    : {};
(process.env.NODE_ENV !== 'production') ? Object.freeze([]) : [];
const isArray = Array.isArray;
const isFunction = (val) => typeof val === 'function';
const isString = (val) => typeof val === 'string';
const isObject = (val) => val !== null && typeof val === 'object';
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const isPlainObject = (val) => toTypeString(val) === '[object Object]';

/*
 * This is a fixed config for real HTML tags
 *
 * TODO: we probably dont need all attributes
 */
const tags = {
    title: {
        attributes: false
    },
    base: {
        contentAsAttribute: true,
        attributes: ['href', 'target']
    },
    meta: {
        contentAsAttribute: true,
        keyAttribute: 'name',
        attributes: ['content', 'name', 'http-equiv', 'charset']
    },
    link: {
        contentAsAttribute: true,
        attributes: [
            'href',
            'crossorigin',
            'rel',
            'media',
            'integrity',
            'hreflang',
            'type',
            'referrerpolicy',
            'sizes',
            'imagesrcset',
            'imagesizes',
            'as',
            'color'
        ]
    },
    style: {
        attributes: ['media']
    },
    script: {
        attributes: [
            'src',
            'type',
            'nomodule',
            'async',
            'defer',
            'crossorigin',
            'integrity',
            'referrerpolicy'
        ]
    },
    noscript: {
        attributes: false
    }
};

function getConfigByKey(tagOrName, key, config) {
    if (config && key in config) {
        return config[key];
    }
    if (isArray(tagOrName)) {
        for (const name of tagOrName) {
            if (name && name in tags) {
                return tags[name][key];
            }
        }
        return;
    }
    if (tagOrName in tags) {
        const tag = tags[tagOrName];
        return tag[key];
    }
}

// https://github.com/microsoft/TypeScript/issues/1863
const IS_PROXY = Symbol('kIsProxy');
const PROXY_SOURCES = Symbol('kProxySources');
const PROXY_TARGET = Symbol('kProxyTarget');
const RESOLVE_CONTEXT = Symbol('kResolveContext');

// See: https://github.com/vuejs/vue-next/blob/08b4e8815da4e8911058ccbab986bea6365c3352/packages/compiler-ssr/src/transforms/ssrTransformComponent.ts
function clone(v) {
    if (isArray(v)) {
        return v.map(clone);
    }
    if (isObject(v)) {
        const res = {};
        for (const key in v) {
            // never clone the context
            if (key === 'context') {
                res[key] = v[key];
            }
            else {
                res[key] = clone(v[key]);
            }
        }
        return res;
    }
    return v;
}

const pluck = (collection, key, callback) => {
    const plucked = [];
    for (const row of collection) {
        if (key in row) {
            plucked.push(row[key]);
            if (callback) {
                callback(row);
            }
        }
    }
    return plucked;
};

const allKeys = (source, ...sources) => {
    const keys = source ? Object.keys(source) : [];
    if (sources) {
        for (const source of sources) {
            if (!source || !isObject(source)) {
                continue;
            }
            for (const key in source) {
                if (!keys.includes(key)) {
                    keys.push(key);
                }
            }
        }
    }
    // TODO: add check for consistent types for each key (dev only)
    return keys;
};
const recompute = (context, sources, target, path = []) => {
    if (!path.length) {
        if (!target) {
            target = context.active;
        }
        if (!sources) {
            sources = context.sources;
        }
    }
    if (!target || !sources) {
        return;
    }
    const keys = allKeys(...sources);
    // Clean up properties that dont exists anymore
    const targetKeys = Object.keys(target);
    for (const key of targetKeys) {
        if (!keys.includes(key)) {
            delete target[key];
        }
    }
    for (const key of keys) {
        // This assumes consistent types usages for keys across sources
        if (isPlainObject(sources[0][key])) {
            if (!target[key]) {
                target[key] = {};
            }
            const keySources = [];
            for (const source of sources) {
                if (key in source) {
                    keySources.push(source[key]);
                }
            }
            recompute(context, keySources, target[key], [...path, key]);
            continue;
        }
        // Ensure the target is an array if source is an array and target is empty
        if (!target[key] && isArray(sources[0][key])) {
            target[key] = [];
        }
        const keyContexts = [];
        const keySources = pluck(sources, key, source => keyContexts.push(source[RESOLVE_CONTEXT]));
        let resolved = context.resolve(keySources, keyContexts, target[key], key, path);
        if (isPlainObject(resolved)) {
            resolved = clone(resolved);
        }
        // console.log('RESOLVED', key, resolved, 'was', target[key])
        target[key] = resolved;
    }
};

const createProxy = (context, target, resolveContext, pathSegments = []) => {
    const handler = createHandler(context, resolveContext, pathSegments);
    const proxy = vue.markRaw(new Proxy(target, handler));
    if (!pathSegments.length && context.sources) {
        context.sources.push(proxy);
    }
    return proxy;
};
const createHandler = (context, resolveContext, pathSegments = []) => ({
    get: (target, key, receiver) => {
        if (key === IS_PROXY) {
            return true;
        }
        if (key === PROXY_SOURCES) {
            return context.sources;
        }
        if (key === PROXY_TARGET) {
            return target;
        }
        if (key === RESOLVE_CONTEXT) {
            return resolveContext;
        }
        let value = Reflect.get(target, key, receiver);
        if (!isObject(value)) {
            return value;
        }
        if (!value[IS_PROXY]) {
            const keyPath = [...pathSegments, key];
            value = createProxy(context, value, resolveContext, keyPath);
            target[key] = value;
        }
        return value;
    },
    set: (target, key, value) => {
        const success = Reflect.set(target, key, value);
        // console.warn(success, 'PROXY SET\nkey:', key, '\npath:', pathSegments, '\ntarget:', isArray(target), target, '\ncontext:\n', context)
        if (success) {
            const isArrayItem = isArray(target);
            let hasArrayParent = false;
            let { sources: proxies, active } = context;
            let activeSegmentKey;
            let index = 0;
            for (const segment of pathSegments) {
                proxies = pluck(proxies, segment);
                if (isArrayItem && index === pathSegments.length - 1) {
                    activeSegmentKey = segment;
                    break;
                }
                if (isArray(active)) {
                    hasArrayParent = true;
                }
                active = active[segment];
                index++;
            }
            if (hasArrayParent) {
                // TODO: fix that we dont have to recompute the full merged object
                // we should only have to recompute the branch that has changed
                // but there is an issue here with supporting both arrays of strings
                // as collections (parent vs parent of parent we need to trigger the
                // update from)
                recompute(context);
                return success;
            }
            let keyContexts = [];
            let keySources;
            if (isArrayItem) {
                keySources = proxies;
                keyContexts = proxies.map(proxy => proxy[RESOLVE_CONTEXT]);
            }
            else {
                keySources = pluck(proxies, key, proxy => keyContexts.push(proxy[RESOLVE_CONTEXT]));
            }
            let resolved = context.resolve(keySources, keyContexts, active, key, pathSegments);
            // Ensure to clone if value is an object, cause sources is an array of
            // the sourceProxies not the sources so we could trigger an endless loop when
            // updating a prop on an obj as the prop on the active object refers to
            // a prop on a proxy
            if (isPlainObject(resolved)) {
                resolved = clone(resolved);
            }
            //      console.log('SET VALUE', isArrayItem, key, '\nresolved:\n', resolved, '\nsources:\n', context.sources, '\nactive:\n', active, Object.keys(active))
            if (isArrayItem && activeSegmentKey) {
                active[activeSegmentKey] = resolved;
            }
            else {
                active[key] = resolved;
            }
        }
        //    console.log('CONTEXT.ACTIVE', context.active, '\nparent:\n', target)
        return success;
    },
    deleteProperty: (target, key) => {
        const success = Reflect.deleteProperty(target, key);
        //    console.warn('PROXY DELETE\nkey:', key, '\npath:', pathSegments, '\nparent:', isArray(target), target)
        if (success) {
            const isArrayItem = isArray(target);
            let activeSegmentKey;
            let proxies = context.sources;
            let active = context.active;
            let index = 0;
            for (const segment of pathSegments) {
                proxies = proxies.map(proxy => proxy[segment]);
                if (isArrayItem && index === pathSegments.length - 1) {
                    activeSegmentKey = segment;
                    break;
                }
                active = active[segment];
                index++;
            }
            // Check if the key still exists in one of the sourceProxies,
            // if so resolve the new value, if not remove the key
            if (proxies.some(proxy => (key in proxy))) {
                let keyContexts = [];
                let keySources;
                if (isArrayItem) {
                    keySources = proxies;
                    keyContexts = proxies.map(proxy => proxy[RESOLVE_CONTEXT]);
                }
                else {
                    keySources = pluck(proxies, key, proxy => keyContexts.push(proxy[RESOLVE_CONTEXT]));
                }
                let resolved = context.resolve(keySources, keyContexts, active, key, pathSegments);
                if (isPlainObject(resolved)) {
                    resolved = clone(resolved);
                }
                //        console.log('SET VALUE', resolved)
                if (isArrayItem && activeSegmentKey) {
                    active[activeSegmentKey] = resolved;
                }
                else {
                    active[key] = resolved;
                }
            }
            else {
                delete active[key];
            }
        }
        return success;
    }
});

const createMergedObject = (resolve, active = {}) => {
    const sources = [];
    if (!active) {
        active = {};
    }
    const context = {
        active,
        resolve,
        sources
    };
    const compute = () => recompute(context);
    const addSource = (source, resolveContext, recompute = false) => {
        const proxy = createProxy(context, source, resolveContext || {});
        if (recompute) {
            compute();
        }
        return proxy;
    };
    const delSource = (sourceOrProxy, recompute = true) => {
        const index = sources.findIndex(src => src === sourceOrProxy || src[PROXY_TARGET] === sourceOrProxy);
        if (index > -1) {
            sources.splice(index, 1);
            if (recompute) {
                compute();
            }
            return true;
        }
        return false;
    };
    return {
        context,
        active,
        resolve,
        sources,
        addSource,
        delSource,
        compute
    };
};

function renderMeta(context, key, data, config) {
    // console.info('renderMeta', key, data, config)
    if (config.attributesFor) {
        return renderAttributes(context, key, data, config);
    }
    if (config.group) {
        return renderGroup(context, key, data, config);
    }
    return renderTag(context, key, data, config);
}
function renderGroup(context, key, data, config) {
    // console.info('renderGroup', key, data, config)
    if (isArray(data)) {
        {
            // eslint-disable-next-line no-console
            console.warn('Specifying an array for group properties isnt supported mostly as we didnt found a use-case for this yet. If you have one, please create an issue on the vue-meta repo');
        }
        // config.attributes = getConfigKey([key, config.tag], 'attributes', config)
        return [];
    }
    return Object.keys(data)
        .map((childKey) => {
        const groupConfig = {
            group: key,
            data
        };
        if (config.namespaced) {
            groupConfig.tagNamespace = config.namespaced === true ? key : config.namespaced;
        }
        else if (config.namespacedAttribute) {
            const namespace = config.namespacedAttribute === true ? key : config.namespacedAttribute;
            groupConfig.fullName = `${namespace}:${childKey}`;
            groupConfig.slotName = `${namespace}(${childKey})`;
        }
        return renderTag(context, key, data[childKey], config, groupConfig);
    })
        .flat();
}
function renderTag(context, key, data, config = {}, groupConfig) {
    // console.info('renderTag', key, data, config, groupConfig)
    const contentAttributes = ['content', 'json', 'rawContent'];
    const getConfig = (key) => getConfigByKey([tag, config.tag], key, config);
    if (isArray(data)) {
        return data
            .map((child) => {
            return renderTag(context, key, child, config, groupConfig);
        })
            .flat();
    }
    const { tag = config.tag || key } = data;
    let content;
    let hasChilds = false;
    let isRaw = false;
    if (isString(data)) {
        content = data;
    }
    else if (data.children && isArray(data.children)) {
        hasChilds = true;
        content = data.children.map((child) => {
            const data = renderTag(context, key, child, config, groupConfig);
            if (isArray(data)) {
                return data.map(({ vnode }) => vnode);
            }
            return data.vnode;
        });
    }
    else {
        let i = 0;
        for (const contentAttribute of contentAttributes) {
            if (!content && data[contentAttribute]) {
                if (i === 1) {
                    content = JSON.stringify(data[contentAttribute]);
                }
                else {
                    content = data[contentAttribute];
                }
                isRaw = i > 1;
                break;
            }
            i++;
        }
    }
    const fullName = (groupConfig && groupConfig.fullName) || key;
    const slotName = (groupConfig && groupConfig.slotName) || key;
    let { attrs: attributes } = data;
    if (!attributes && typeof data === 'object') {
        attributes = { ...data };
        delete attributes.tag;
        delete attributes.children;
        delete attributes.to;
        // cleanup all content attributes
        for (const attr of contentAttributes) {
            delete attributes[attr];
        }
    }
    else if (!attributes) {
        attributes = {};
    }
    if (hasChilds) {
        content = getSlotContent(context, slotName, content, data);
    }
    else {
        const contentAsAttribute = getConfig('contentAsAttribute');
        let valueAttribute = config.valueAttribute;
        if (!valueAttribute && contentAsAttribute) {
            const tagAttributes = getConfig('attributes');
            valueAttribute = isString(contentAsAttribute) ? contentAsAttribute : tagAttributes[0];
        }
        if (!valueAttribute) {
            content = getSlotContent(context, slotName, content, data);
        }
        else {
            if (!config.nameless) {
                const keyAttribute = getConfig('keyAttribute');
                if (keyAttribute) {
                    attributes[keyAttribute] = fullName;
                }
            }
            attributes[valueAttribute] = getSlotContent(context, slotName, attributes[valueAttribute] || content, groupConfig);
            content = undefined;
        }
    }
    const finalTag = groupConfig && groupConfig.tagNamespace
        ? `${groupConfig.tagNamespace}:${tag}`
        : tag;
    // console.info('FINAL TAG', finalTag)
    // console.log('      ATTRIBUTES', attributes)
    // console.log('      CONTENT', content)
    // // console.log(data, attributes, config)
    let vnode;
    if (isRaw) {
        attributes.innerHTML = content;
        vnode = vue.h(finalTag, attributes);
    }
    else {
        vnode = vue.h(finalTag, attributes, content);
    }
    return {
        to: data.to,
        vnode
    };
}
function renderAttributes(context, key, data, config = {}) {
    // console.info('renderAttributes', key, data, config)
    const { attributesFor } = config;
    {
        // render attributes in a placeholder vnode so Vue
        // will render the string for us
        return {
            to: '',
            vnode: vue.h(`ssr-${attributesFor}`, data)
        };
    }
}
function getSlotContent({ metainfo, slots }, slotName, content, groupConfig) {
    if (!slots || !slots[slotName]) {
        return content;
    }
    const slotProps = {
        content,
        metainfo
    };
    if (groupConfig && groupConfig.group) {
        slotProps[groupConfig.group] = groupConfig.data;
    }
    const slotContent = slots[slotName](slotProps);
    if (slotContent && slotContent.length) {
        return slotContent[0].children;
    }
    return content;
}

const hasSymbol = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
const PolySymbol = (name) => 
// vm = vue meta
hasSymbol
    ? Symbol( '[vue-meta]: ' + name )
    : ( '[vue-meta]: ' ) + name;
const metaInfoKey = PolySymbol( 'metainfo' );

function getCurrentManager(vm) {
    if (!vm) {
        vm = vue.getCurrentInstance();
    }
    return vm.appContext.config.globalProperties.$metaManager;
}
function useMeta(obj, manager) {
    const vm = vue.getCurrentInstance();
    if (!manager && vm) {
        manager = getCurrentManager(vm);
    }
    if (!manager) {
        // oopsydoopsy
        throw new Error('No manager or current instance');
    }
    return manager.addMeta(obj, vm || undefined);
}
function useMetainfo() {
    return vue.inject(metaInfoKey);
}

const MetainfoImpl = vue.defineComponent({
    name: 'Metainfo',
    inheritAttrs: false,
    setup(_, { slots }) {
        return () => {
            const manager = getCurrentManager();
            if (!manager) {
                return;
            }
            return manager.render({ slots });
        };
    }
});
const Metainfo = MetainfoImpl;

const ssrAttribute = 'data-vm-ssr';
const active = vue.reactive({});
function addVnode(teleports, to, _vnodes) {
    const vnodes = (isArray(_vnodes) ? _vnodes : [_vnodes]);
    {
        // dont add ssrAttribute for attribute vnode placeholder
        if (!to.endsWith('Attrs')) {
            vnodes.forEach((vnode) => {
                if (!vnode.props) {
                    vnode.props = {};
                }
                vnode.props[ssrAttribute] = true;
            });
        }
    }
    if (!teleports[to]) {
        teleports[to] = [];
    }
    teleports[to].push(...vnodes);
}
function createMetaManager(config, resolver) {
    const resolve = (options, contexts, active, key, pathSegments) => {
        if (isFunction(resolver)) {
            return resolver(options, contexts, active, key, pathSegments);
        }
        return resolver.resolve(options, contexts, active, key, pathSegments);
    };
    const { addSource, delSource } = createMergedObject(resolve, active);
    // TODO: validate resolver
    const manager = {
        config,
        install(app) {
            app.component('Metainfo', Metainfo);
            app.config.globalProperties.$metaManager = manager;
            app.provide(metaInfoKey, active);
        },
        addMeta(metaObj, vm) {
            const resolveContext = { vm };
            if (resolver && 'setup' in resolver && isFunction(resolver.setup)) {
                resolver.setup(resolveContext);
            }
            // TODO: optimize initial compute
            const meta = addSource(metaObj, resolveContext, true);
            const unmount = () => delSource(meta);
            if (vm) {
                vue.onUnmounted(unmount);
            }
            return {
                meta,
                unmount
            };
        },
        render({ slots } = {}) {
            const teleports = {};
            for (const key in active) {
                const config = this.config[key] || {};
                const vnode = renderMeta({ metainfo: active, slots }, key, active[key], config);
                if (!vnode) {
                    continue;
                }
                const vnodes = isArray(vnode) ? vnode : [vnode];
                const defaultTo = (key !== 'base' && active[key].to) || config.to || (config.attributesFor ? key : 'head');
                for (const { to, vnode } of vnodes) {
                    addVnode(teleports, to || defaultTo, vnode);
                }
            }
            if (slots) {
                for (const tag in slots) {
                    const slotFn = slots[tag];
                    if (isFunction(slotFn)) {
                        addVnode(teleports, tag === 'default' ? 'head' : tag, slotFn({ metainfo: active }));
                    }
                }
            }
            return Object.keys(teleports).map((to) => {
                return vue.h(vue.Teleport, { to }, teleports[to]);
            });
        }
    };
    return manager;
}

// rollup doesnt like an import, cant find export so use require
const { renderToString } = require('@vue/server-renderer');
async function renderToStringWithMeta(app) {
    const ctx = {};
    const html = await renderToString(app, ctx);
    // TODO: better way of determining whether meta was rendered with the component or not
    if (!ctx.teleports || !ctx.teleports.head) {
        const teleports = app.config.globalProperties.$metaManager.render();
        await Promise.all(teleports.map((teleport) => renderToString(teleport, ctx)));
    }
    const { teleports } = ctx;
    for (const target in teleports) {
        if (target.endsWith('Attrs')) {
            const str = teleports[target];
            // match from first space to first >, these should be all rendered attributes
            teleports[target] = str.slice(str.indexOf(' ') + 1, str.indexOf('>'));
        }
    }
    return [html, ctx];
}

exports.createMetaManager = createMetaManager;
exports.deepestResolver = deepest;
exports.defaultConfig = defaultConfig;
exports.getCurrentManager = getCurrentManager;
exports.renderToStringWithMeta = renderToStringWithMeta;
exports.resolveOption = resolveOption;
exports.useMeta = useMeta;
exports.useMetainfo = useMetainfo;
