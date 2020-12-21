/*! UIkit 3.6.1 | https://www.getuikit.com | (c) 2014 - 2020 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikitfilter', ['uikit-util'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkitFilter = factory(global.UIkit.util));
}(this, (function (uikitUtil) { 'use strict';

    function getRows(items) {
        return sortBy(items, 'top', 'bottom');
    }

    function sortBy(items, startProp, endProp) {

        var sorted = [[]];

        for (var i = 0; i < items.length; i++) {

            var el = items[i];

            if (!uikitUtil.isVisible(el)) {
                continue;
            }

            var dim = getOffset(el);

            for (var j = sorted.length - 1; j >= 0; j--) {

                var current = sorted[j];

                if (!current[0]) {
                    current.push(el);
                    break;
                }

                var startDim = (void 0);
                if (current[0].offsetParent === el.offsetParent) {
                    startDim = getOffset(current[0]);
                } else {
                    dim = getOffset(el, true);
                    startDim = getOffset(current[0], true);
                }

                if (dim[startProp] >= startDim[endProp] - 1 && dim[startProp] !== startDim[startProp]) {
                    sorted.push([el]);
                    break;
                }

                if (dim[endProp] - 1 > startDim[startProp] || dim[startProp] === startDim[startProp]) {
                    current.push(el);
                    break;
                }

                if (j === 0) {
                    sorted.unshift([el]);
                    break;
                }

            }

        }

        return sorted;
    }

    function getOffset(element, offset) {
        var assign;

        if ( offset === void 0 ) offset = false;

        var offsetTop = element.offsetTop;
        var offsetLeft = element.offsetLeft;
        var offsetHeight = element.offsetHeight;
        var offsetWidth = element.offsetWidth;

        if (offset) {
            (assign = uikitUtil.offsetPosition(element), offsetTop = assign[0], offsetLeft = assign[1]);
        }

        return {
            top: offsetTop,
            left: offsetLeft,
            bottom: offsetTop + offsetHeight,
            right: offsetLeft + offsetWidth
        };
    }

    var clsLeave = 'uk-transition-leave';
    var clsEnter = 'uk-transition-enter';

    function fade(action, target, duration, stagger) {
        if ( stagger === void 0 ) stagger = 40;


        var index = transitionIndex(target, true);
        var propsIn = {opacity: 1};
        var propsOut = {opacity: 0};

        var wrapIndexFn = function (fn) { return function () { return index === transitionIndex(target) ? fn() : uikitUtil.Promise.reject(); }; };

        var leaveFn = wrapIndexFn(function () {

            uikitUtil.addClass(target, clsLeave);

            return uikitUtil.Promise.all(getTransitionNodes(target).map(function (child, i) { return new uikitUtil.Promise(function (resolve) { return setTimeout(function () { return uikitUtil.Transition.start(child, propsOut, duration / 2, 'ease').then(resolve); }, i * stagger); }
                ); }
            )).then(function () { return uikitUtil.removeClass(target, clsLeave); });

        });

        var enterFn = wrapIndexFn(function () {

            var oldHeight = uikitUtil.height(target);

            uikitUtil.addClass(target, clsEnter);
            action();

            uikitUtil.css(uikitUtil.children(target), {opacity: 0});

            uikitUtil.trigger(uikitUtil.toWindow(target), 'resize'); // IE11

            return new uikitUtil.Promise(function (resolve) {
                requestAnimationFrame(function () {

                    var nodes = uikitUtil.children(target);
                    var newHeight = uikitUtil.height(target);

                    uikitUtil.height(target, oldHeight);

                    var transitionNodes = getTransitionNodes(target);
                    uikitUtil.css(nodes, propsOut);

                    var transitions = transitionNodes.map(function (child, i) { return new uikitUtil.Promise(function (resolve) { return setTimeout(function () { return uikitUtil.Transition.start(child, propsIn, duration / 2, 'ease').then(resolve); }, i * stagger); }
                        ); }
                    );

                    if (oldHeight !== newHeight) {
                        transitions.push(uikitUtil.Transition.start(target, {height: newHeight}, duration / 2 + transitionNodes.length * stagger, 'ease'));
                    }

                    uikitUtil.Promise.all(transitions).then(function () {
                        uikitUtil.removeClass(target, clsEnter);
                        if (index === transitionIndex(target)) {
                            uikitUtil.css(target, 'height', '');
                            uikitUtil.css(nodes, {opacity: ''});
                            delete target.dataset.transition;
                        }
                        resolve();
                    });
                });
            });
        });

        return uikitUtil.hasClass(target, clsLeave)
            ? waitTransitionend(target).then(enterFn)
            : uikitUtil.hasClass(target, clsEnter)
                ? waitTransitionend(target).then(leaveFn).then(enterFn)
                : leaveFn().then(enterFn);
    }

    function transitionIndex(target, next) {
        if (next) {
            target.dataset.transition = 1 + transitionIndex(target);
        }

        return uikitUtil.toNumber(target.dataset.transition) || 0;
    }

    function waitTransitionend(target) {
        return uikitUtil.Promise.all(uikitUtil.children(target).filter(uikitUtil.Transition.inProgress).map(function (el) { return new uikitUtil.Promise(function (resolve) { return uikitUtil.once(el, 'transitionend transitioncanceled', resolve); }); }
        ));
    }

    function getTransitionNodes(target) {
        return getRows(uikitUtil.children(target)).reduce(function (nodes, row) { return nodes.concat(uikitUtil.sortBy(row.filter(function (el) { return uikitUtil.isInView(el); }), 'offsetLeft')); }, []);
    }

    var targetClass = 'uk-animation-target';

    function shift (action, target, duration) {

        addStyle();

        var nodes = uikitUtil.children(target);
        var propsFrom = nodes.map(function (el) { return getProps(el, true); });

        var oldHeight = uikitUtil.height(target);

        action();

        uikitUtil.Transition.cancel(target);
        nodes.forEach(uikitUtil.Transition.cancel);

        reset(target);

        uikitUtil.trigger(uikitUtil.toWindow(target), 'resize'); // IE11

        return uikitUtil.Promise.resolve().then(function () {

            uikitUtil.fastdom.flush();

            var newHeight = uikitUtil.height(target);

            nodes = nodes.concat(uikitUtil.children(target).filter(function (el) { return !uikitUtil.includes(nodes, el); }));

            var propsTo = nodes.map(function (el, i) { return uikitUtil.parent(el) && i in propsFrom
                    ? propsFrom[i]
                        ? uikitUtil.isVisible(el)
                            ? getPositionWithMargin(el)
                            : {opacity: 0}
                        : {opacity: uikitUtil.isVisible(el) ? 1 : 0}
                    : false; }
            );

            propsFrom = propsTo.map(function (props, i) {

                var from = uikitUtil.parent(nodes[i]) === target && (propsFrom[i] || getProps(nodes[i]));

                if (!from) {
                    return false;
                }

                if (!props) {
                    delete from.opacity;
                } else if (!('opacity' in props)) {
                    var opacity = from.opacity;

                    if (opacity % 1) {
                        props.opacity = 1;
                    } else {
                        delete from.opacity;
                    }
                }

                return from;
            });

            uikitUtil.addClass(target, targetClass);
            nodes.forEach(function (el, i) { return propsFrom[i] && uikitUtil.css(el, propsFrom[i]); });
            uikitUtil.css(target, {height: oldHeight, display: 'block'});

            var transitions = nodes.map(function (el, i) { return uikitUtil.Transition.start(el, propsTo[i], duration, 'ease'); }
            );

            if (oldHeight !== newHeight) {
                transitions.push(uikitUtil.Transition.start(target, {height: newHeight}, duration, 'ease'));
            }

            return uikitUtil.Promise.all(transitions).then(function () {
                nodes.forEach(function (el, i) { return uikitUtil.css(el, {display: propsTo[i].opacity === 0 ? 'none' : '', zIndex: ''}); });
                reset(target);
            }, uikitUtil.noop);
        });
    }

    function getProps(el, opacity) {

        var zIndex = uikitUtil.css(el, 'zIndex');

        return uikitUtil.isVisible(el)
            ? uikitUtil.assign({
                display: '',
                opacity: opacity ? uikitUtil.css(el, 'opacity') : '0',
                pointerEvents: 'none',
                position: 'absolute',
                zIndex: zIndex === 'auto' ? uikitUtil.index(el) : zIndex
            }, getPositionWithMargin(el))
            : false;
    }

    function reset(el) {
        uikitUtil.css(el.children, {
            height: '',
            left: '',
            opacity: '',
            pointerEvents: '',
            position: '',
            top: '',
            width: ''
        });
        uikitUtil.removeClass(el, targetClass);
        uikitUtil.css(el, {height: '', display: ''});
    }

    function getPositionWithMargin(el) {
        var ref = uikitUtil.offset(el);
        var height = ref.height;
        var width = ref.width;
        var ref$1 = uikitUtil.position(el);
        var top = ref$1.top;
        var left = ref$1.left;

        return {top: top, left: left, height: height, width: width};
    }

    var style;

    function addStyle() {
        if (style) {
            return;
        }
        style = !!uikitUtil.append(document.head, ("<style> ." + targetClass + " > * {\n            margin-top: 0 !important;\n            transform: none !important;\n        } </style>"));
    }

    var Animate = {

        props: {
            animation: Number,
            animationMode: String
        },

        data: {
            animation: 150,
            animationMode: 'shift'
        },

        methods: {

            animate: function(action, target) {
                if ( target === void 0 ) target = this.$el;

                var animationFn = this.animationMode === 'fade' ? fade : shift;
                return animationFn(action, target, this.animation)
                    .then(function () { return uikitUtil.trigger(uikitUtil.toWindow(target), 'resize'); }, uikitUtil.noop);
            }
        }
    };

    var Component = {

        mixins: [Animate],

        args: 'target',

        props: {
            target: Boolean,
            selActive: Boolean
        },

        data: {
            target: null,
            selActive: false,
            attrItem: 'uk-filter-control',
            cls: 'uk-active',
            animation: 250
        },

        computed: {

            toggles: {

                get: function(ref, $el) {
                    var attrItem = ref.attrItem;

                    return uikitUtil.$$(("[" + (this.attrItem) + "],[data-" + (this.attrItem) + "]"), $el);
                },

                watch: function() {
                    var this$1 = this;


                    this.updateState();

                    if (this.selActive !== false) {
                        var actives = uikitUtil.$$(this.selActive, this.$el);
                        this.toggles.forEach(function (el) { return uikitUtil.toggleClass(el, this$1.cls, uikitUtil.includes(actives, el)); });
                    }

                },

                immediate: true

            },

            children: {

                get: function(ref, $el) {
                    var target = ref.target;

                    return uikitUtil.$$((target + " > *"), $el);
                },

                watch: function(list, old) {
                    if (!isEqualList(list, old)) {
                        this.updateState();
                    }
                }
            }

        },

        events: [

            {

                name: 'click',

                delegate: function() {
                    return ("[" + (this.attrItem) + "],[data-" + (this.attrItem) + "]");
                },

                handler: function(e) {

                    e.preventDefault();
                    this.apply(e.current);

                }

            }

        ],

        methods: {

            apply: function(el) {
                this.setState(mergeState(el, this.attrItem, this.getState()));
            },

            getState: function() {
                var this$1 = this;

                return this.toggles
                    .filter(function (item) { return uikitUtil.hasClass(item, this$1.cls); })
                    .reduce(function (state, el) { return mergeState(el, this$1.attrItem, state); }, {filter: {'': ''}, sort: []});
            },

            setState: function(state, animate) {
                var this$1 = this;
                if ( animate === void 0 ) animate = true;


                state = uikitUtil.assign({filter: {'': ''}, sort: []}, state);

                uikitUtil.trigger(this.$el, 'beforeFilter', [this, state]);

                this.toggles.forEach(function (el) { return uikitUtil.toggleClass(el, this$1.cls, !!matchFilter(el, this$1.attrItem, state)); });

                uikitUtil.Promise.all(uikitUtil.$$(this.target, this.$el).map(function (target) {
                    var children = uikitUtil.children(target);
                    return animate
                        ? this$1.animate(function () { return applyState(state, target, children); }, target)
                        : applyState(state, target, children);
                })).then(function () { return uikitUtil.trigger(this$1.$el, 'afterFilter', [this$1]); });

            },

            updateState: function() {
                var this$1 = this;

                uikitUtil.fastdom.write(function () { return this$1.setState(this$1.getState(), false); });
            }

        }

    };

    function getFilter(el, attr) {
        return uikitUtil.parseOptions(uikitUtil.data(el, attr), ['filter']);
    }

    function applyState(state, target, children) {
        var selector = getSelector(state);

        children.forEach(function (el) { return uikitUtil.css(el, 'display', selector && !uikitUtil.matches(el, selector) ? 'none' : ''); });

        var ref = state.sort;
        var sort = ref[0];
        var order = ref[1];

        if (sort) {
            var sorted = sortItems(children, sort, order);
            if (!uikitUtil.isEqual(sorted, children)) {
                uikitUtil.append(target, sorted);
            }
        }
    }

    function mergeState(el, attr, state) {

        var filterBy = getFilter(el, attr);
        var filter = filterBy.filter;
        var group = filterBy.group;
        var sort = filterBy.sort;
        var order = filterBy.order; if ( order === void 0 ) order = 'asc';

        if (filter || uikitUtil.isUndefined(sort)) {

            if (group) {

                if (filter) {
                    delete state.filter[''];
                    state.filter[group] = filter;
                } else {
                    delete state.filter[group];

                    if (uikitUtil.isEmpty(state.filter) || '' in state.filter) {
                        state.filter = {'': filter || ''};
                    }

                }

            } else {
                state.filter = {'': filter || ''};
            }

        }

        if (!uikitUtil.isUndefined(sort)) {
            state.sort = [sort, order];
        }

        return state;
    }

    function matchFilter(el, attr, ref) {
        var stateFilter = ref.filter; if ( stateFilter === void 0 ) stateFilter = {'': ''};
        var ref_sort = ref.sort;
        var stateSort = ref_sort[0];
        var stateOrder = ref_sort[1];


        var ref$1 = getFilter(el, attr);
        var filter = ref$1.filter; if ( filter === void 0 ) filter = '';
        var group = ref$1.group; if ( group === void 0 ) group = '';
        var sort = ref$1.sort;
        var order = ref$1.order; if ( order === void 0 ) order = 'asc';

        return uikitUtil.isUndefined(sort)
            ? group in stateFilter && filter === stateFilter[group]
                || !filter && group && !(group in stateFilter) && !stateFilter['']
            : stateSort === sort && stateOrder === order;
    }

    function isEqualList(listA, listB) {
        return listA.length === listB.length
            && listA.every(function (el) { return ~listB.indexOf(el); });
    }

    function getSelector(ref) {
        var filter = ref.filter;

        var selector = '';
        uikitUtil.each(filter, function (value) { return selector += value || ''; });
        return selector;
    }

    function sortItems(nodes, sort, order) {
        return uikitUtil.assign([], nodes).sort(function (a, b) { return uikitUtil.data(a, sort).localeCompare(uikitUtil.data(b, sort), undefined, {numeric: true}) * (order === 'asc' || -1); });
    }

    if (typeof window !== 'undefined' && window.UIkit) {
        window.UIkit.component('filter', Component);
    }

    return Component;

})));
