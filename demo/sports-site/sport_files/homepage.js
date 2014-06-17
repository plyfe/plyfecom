/*! jQuery v1.8.3 jquery.com | jquery.org/license */
(function (e, t) {
    function _(e) {
        var t = M[e] = {};
        return v.each(e.split(y), function (e, n) {
            t[n] = !0;
        }), t;
    }
    function H(e, n, r) {
        if (r === t && e.nodeType === 1) {
            var i = "data-" + n.replace(P, "-$1").toLowerCase();
            r = e.getAttribute(i);
            if (typeof r == "string") {
                try {
                    r = r === "true" ? !0 : r === "false" ? !1 : r === "null" ? null : +r + "" === r ? +r : D.test(r) ? v.parseJSON(r) : r;
                } catch (s) {}
                v.data(e, n, r);
            } else {
                r = t;
            }
        }
        return r;
    }
    function B(e) {
        var t;
        for (t in e) {
            if (t === "data" && v.isEmptyObject(e[t])) {
                continue;
            }
            if (t !== "toJSON") {
                return !1;
            }
        }
        return !0;
    }
    function et() {
        return !1;
    }
    function tt() {
        return !0;
    }
    function ut(e) {
        return !e || !e.parentNode || e.parentNode.nodeType === 11;
    }
    function at(e, t) {
        do {
            e = e[t];
        } while (e && e.nodeType !== 1);
        return e;
    }
    function ft(e, t, n) {
        t = t || 0;
        if (v.isFunction(t)) {
            return v.grep(e, function (e, r) {
                var i = !! t.call(e, r, e);
                return i === n;
            });
        }
        if (t.nodeType) {
            return v.grep(e, function (e, r) {
                return e === t === n;
            });
        }
        if (typeof t == "string") {
            var r = v.grep(e, function (e) {
                return e.nodeType === 1;
            });
            if (it.test(t)) {
                return v.filter(t, r, !n);
            }
            t = v.filter(t, r);
        }
        return v.grep(e, function (e, r) {
            return v.inArray(e, t) >= 0 === n;
        });
    }
    function lt(e) {
        var t = ct.split("|"),
            n = e.createDocumentFragment();
        if (n.createElement) {
            while (t.length) {
                n.createElement(t.pop());
            }
        }
        return n;
    }
    function Lt(e, t) {
        return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t));
    }
    function At(e, t) {
        if (t.nodeType !== 1 || !v.hasData(e)) {
            return;
        }
        var n, r, i, s = v._data(e),
            o = v._data(t, s),
            u = s.events;
        if (u) {
            delete o.handle, o.events = {};
            for (n in u) {
                for (r = 0, i = u[n].length; r < i; r++) {
                    v.event.add(t, n, u[n][r]);
                }
            }
        }
        o.data && (o.data = v.extend({}, o.data));
    }
    function Ot(e, t) {
        var n;
        if (t.nodeType !== 1) {
            return;
        }
        t.clearAttributes && t.clearAttributes(), t.mergeAttributes && t.mergeAttributes(e), n = t.nodeName.toLowerCase(), n === "object" ? (t.parentNode && (t.outerHTML = e.outerHTML), v.support.html5Clone && e.innerHTML && !v.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : n === "input" && Et.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : n === "option" ? t.selected = e.defaultSelected : n === "input" || n === "textarea" ? t.defaultValue = e.defaultValue : n === "script" && t.text !== e.text && (t.text = e.text), t.removeAttribute(v.expando);
    }
    function Mt(e) {
        return typeof e.getElementsByTagName != "undefined" ? e.getElementsByTagName("*") : typeof e.querySelectorAll != "undefined" ? e.querySelectorAll("*") : [];
    }
    function _t(e) {
        Et.test(e.type) && (e.defaultChecked = e.checked);
    }
    function Qt(e, t) {
        if (t in e) {
            return t;
        }
        var n = t.charAt(0).toUpperCase() + t.slice(1),
            r = t,
            i = Jt.length;
        while (i--) {
            t = Jt[i] + n;
            if (t in e) {
                return t;
            }
        }
        return r;
    }
    function Gt(e, t) {
        return e = t || e, v.css(e, "display") === "none" || !v.contains(e.ownerDocument, e);
    }
    function Yt(e, t) {
        var n, r, i = [],
            s = 0,
            o = e.length;
        for (; s < o; s++) {
            n = e[s];
            if (!n.style) {
                continue;
            }
            i[s] = v._data(n, "olddisplay"), t ? (!i[s] && n.style.display === "none" && (n.style.display = ""), n.style.display === "" && Gt(n) && (i[s] = v._data(n, "olddisplay", nn(n.nodeName)))) : (r = Dt(n, "display"), !i[s] && r !== "none" && v._data(n, "olddisplay", r));
        }
        for (s = 0; s < o; s++) {
            n = e[s];
            if (!n.style) {
                continue;
            }
            if (!t || n.style.display === "none" || n.style.display === "") {
                n.style.display = t ? i[s] || "" : "none";
            }
        }
        return e;
    }
    function Zt(e, t, n) {
        var r = Rt.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t;
    }
    function en(e, t, n, r) {
        var i = n === (r ? "border" : "content") ? 4 : t === "width" ? 1 : 0,
            s = 0;
        for (; i < 4; i += 2) {
            n === "margin" && (s += v.css(e, n + $t[i], !0)), r ? (n === "content" && (s -= parseFloat(Dt(e, "padding" + $t[i])) || 0), n !== "margin" && (s -= parseFloat(Dt(e, "border" + $t[i] + "Width")) || 0)) : (s += parseFloat(Dt(e, "padding" + $t[i])) || 0, n !== "padding" && (s += parseFloat(Dt(e, "border" + $t[i] + "Width")) || 0));
        }
        return s;
    }
    function tn(e, t, n) {
        var r = t === "width" ? e.offsetWidth : e.offsetHeight,
            i = !0,
            s = v.support.boxSizing && v.css(e, "boxSizing") === "border-box";
        if (r <= 0 || r == null) {
            r = Dt(e, t);
            if (r < 0 || r == null) {
                r = e.style[t];
            }
            if (Ut.test(r)) {
                return r;
            }
            i = s && (v.support.boxSizingReliable || r === e.style[t]), r = parseFloat(r) || 0;
        }
        return r + en(e, t, n || (s ? "border" : "content"), i) + "px";
    }
    function nn(e) {
        if (Wt[e]) {
            return Wt[e];
        }
        var t = v("<" + e + ">").appendTo(i.body),
            n = t.css("display");
        t.remove();
        if (n === "none" || n === "") {
            Pt = i.body.appendChild(Pt || v.extend(i.createElement("iframe"), {
                frameBorder: 0,
                width: 0,
                height: 0
            }));
            if (!Ht || !Pt.createElement) {
                Ht = (Pt.contentWindow || Pt.contentDocument).document, Ht.write("<!doctype html><html><body>"), Ht.close();
            }
            t = Ht.body.appendChild(Ht.createElement(e)), n = Dt(t, "display"), i.body.removeChild(Pt);
        }
        return Wt[e] = n, n;
    }
    function fn(e, t, n, r) {
        var i;
        if (v.isArray(t)) {
            v.each(t, function (t, i) {
                n || sn.test(e) ? r(e, i) : fn(e + "[" + (typeof i == "object" ? t : "") + "]", i, n, r);
            });
        } else {
            if (!n && v.type(t) === "object") {
                for (i in t) {
                    fn(e + "[" + i + "]", t[i], n, r);
                }
            } else {
                r(e, t);
            }
        }
    }
    function Cn(e) {
        return function (t, n) {
            typeof t != "string" && (n = t, t = "*");
            var r, i, s, o = t.toLowerCase().split(y),
                u = 0,
                a = o.length;
            if (v.isFunction(n)) {
                for (; u < a; u++) {
                    r = o[u], s = /^\+/.test(r), s && (r = r.substr(1) || "*"), i = e[r] = e[r] || [], i[s ? "unshift" : "push"](n);
                }
            }
        };
    }
    function kn(e, n, r, i, s, o) {
        s = s || n.dataTypes[0], o = o || {}, o[s] = !0;
        var u, a = e[s],
            f = 0,
            l = a ? a.length : 0,
            c = e === Sn;
        for (; f < l && (c || !u); f++) {
            u = a[f](n, r, i), typeof u == "string" && (!c || o[u] ? u = t : (n.dataTypes.unshift(u), u = kn(e, n, r, i, u, o)));
        }
        return (c || !u) && !o["*"] && (u = kn(e, n, r, i, "*", o)), u;
    }
    function Ln(e, n) {
        var r, i, s = v.ajaxSettings.flatOptions || {};
        for (r in n) {
            n[r] !== t && ((s[r] ? e : i || (i = {}))[r] = n[r]);
        }
        i && v.extend(!0, e, i);
    }
    function An(e, n, r) {
        var i, s, o, u, a = e.contents,
            f = e.dataTypes,
            l = e.responseFields;
        for (s in l) {
            s in r && (n[l[s]] = r[s]);
        }
        while (f[0] === "*") {
            f.shift(), i === t && (i = e.mimeType || n.getResponseHeader("content-type"));
        }
        if (i) {
            for (s in a) {
                if (a[s] && a[s].test(i)) {
                    f.unshift(s);
                    break;
                }
            }
        }
        if (f[0] in r) {
            o = f[0];
        } else {
            for (s in r) {
                if (!f[0] || e.converters[s + " " + f[0]]) {
                    o = s;
                    break;
                }
                u || (u = s);
            }
            o = o || u;
        }
        if (o) {
            return o !== f[0] && f.unshift(o), r[o];
        }
    }
    function On(e, t) {
        var n, r, i, s, o = e.dataTypes.slice(),
            u = o[0],
            a = {},
            f = 0;
        e.dataFilter && (t = e.dataFilter(t, e.dataType));
        if (o[1]) {
            for (n in e.converters) {
                a[n.toLowerCase()] = e.converters[n];
            }
        }
        for (; i = o[++f];) {
            if (i !== "*") {
                if (u !== "*" && u !== i) {
                    n = a[u + " " + i] || a["* " + i];
                    if (!n) {
                        for (r in a) {
                            s = r.split(" ");
                            if (s[1] === i) {
                                n = a[u + " " + s[0]] || a["* " + s[0]];
                                if (n) {
                                    n === !0 ? n = a[r] : a[r] !== !0 && (i = s[0], o.splice(f--, 0, i));
                                    break;
                                }
                            }
                        }
                    }
                    if (n !== !0) {
                        if (n && e["throws"]) {
                            t = n(t);
                        } else {
                            try {
                                t = n(t);
                            } catch (l) {
                                return {
                                    state: "parsererror",
                                    error: n ? l : "No conversion from " + u + " to " + i
                                };
                            }
                        }
                    }
                }
                u = i;
            }
        }
        return {
            state: "success",
            data: t
        };
    }
    function Fn() {
        try {
            return new e.XMLHttpRequest;
        } catch (t) {}
    }
    function In() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP");
        } catch (t) {}
    }
    function $n() {
        return setTimeout(function () {
            qn = t;
        }, 0), qn = v.now();
    }
    function Jn(e, t) {
        v.each(t, function (t, n) {
            var r = (Vn[t] || []).concat(Vn["*"]),
                i = 0,
                s = r.length;
            for (; i < s; i++) {
                if (r[i].call(e, t, n)) {
                    return;
                }
            }
        });
    }
    function Kn(e, t, n) {
        var r, i = 0,
            s = 0,
            o = Xn.length,
            u = v.Deferred().always(function () {
                delete a.elem;
            }),
            a = function () {
                var t = qn || $n(),
                    n = Math.max(0, f.startTime + f.duration - t),
                    r = n / f.duration || 0,
                    i = 1 - r,
                    s = 0,
                    o = f.tweens.length;
                for (; s < o; s++) {
                    f.tweens[s].run(i);
                }
                return u.notifyWith(e, [f, i, n]), i < 1 && o ? n : (u.resolveWith(e, [f]), !1);
            },
            f = u.promise({
                elem: e,
                props: v.extend({}, t),
                opts: v.extend(!0, {
                    specialEasing: {}
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: qn || $n(),
                duration: n.duration,
                tweens: [],
                createTween: function (t, n, r) {
                    var i = v.Tween(e, f.opts, t, n, f.opts.specialEasing[t] || f.opts.easing);
                    return f.tweens.push(i), i;
                },
                stop: function (t) {
                    var n = 0,
                        r = t ? f.tweens.length : 0;
                    for (; n < r; n++) {
                        f.tweens[n].run(1);
                    }
                    return t ? u.resolveWith(e, [f, t]) : u.rejectWith(e, [f, t]), this;
                }
            }),
            l = f.props;
        Qn(l, f.opts.specialEasing);
        for (; i < o; i++) {
            r = Xn[i].call(f, e, l, f.opts);
            if (r) {
                return r;
            }
        }
        return Jn(f, l), v.isFunction(f.opts.start) && f.opts.start.call(e, f), v.fx.timer(v.extend(a, {
            anim: f,
            queue: f.opts.queue,
            elem: e
        })), f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always);
    }
    function Qn(e, t) {
        var n, r, i, s, o;
        for (n in e) {
            r = v.camelCase(n), i = t[r], s = e[n], v.isArray(s) && (i = s[1], s = e[n] = s[0]), n !== r && (e[r] = s, delete e[n]), o = v.cssHooks[r];
            if (o && "expand" in o) {
                s = o.expand(s), delete e[r];
                for (n in s) {
                    n in e || (e[n] = s[n], t[n] = i);
                }
            } else {
                t[r] = i;
            }
        }
    }
    function Gn(e, t, n) {
        var r, i, s, o, u, a, f, l, c, h = this,
            p = e.style,
            d = {},
            m = [],
            g = e.nodeType && Gt(e);
        n.queue || (l = v._queueHooks(e, "fx"), l.unqueued == null && (l.unqueued = 0, c = l.empty.fire, l.empty.fire = function () {
            l.unqueued || c();
        }), l.unqueued++, h.always(function () {
            h.always(function () {
                l.unqueued--, v.queue(e, "fx").length || l.empty.fire();
            });
        })), e.nodeType === 1 && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], v.css(e, "display") === "inline" && v.css(e, "float") === "none" && (!v.support.inlineBlockNeedsLayout || nn(e.nodeName) === "inline" ? p.display = "inline-block" : p.zoom = 1)), n.overflow && (p.overflow = "hidden", v.support.shrinkWrapBlocks || h.done(function () {
            p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2];
        }));
        for (r in t) {
            s = t[r];
            if (Un.exec(s)) {
                delete t[r], a = a || s === "toggle";
                if (s === (g ? "hide" : "show")) {
                    continue;
                }
                m.push(r);
            }
        }
        o = m.length;
        if (o) {
            u = v._data(e, "fxshow") || v._data(e, "fxshow", {}), "hidden" in u && (g = u.hidden), a && (u.hidden = !g), g ? v(e).show() : h.done(function () {
                v(e).hide();
            }), h.done(function () {
                var t;
                v.removeData(e, "fxshow", !0);
                for (t in d) {
                    v.style(e, t, d[t]);
                }
            });
            for (r = 0; r < o; r++) {
                i = m[r], f = h.createTween(i, g ? u[i] : 0), d[i] = u[i] || v.style(e, i), i in u || (u[i] = f.start, g && (f.end = f.start, f.start = i === "width" || i === "height" ? 1 : 0));
            }
        }
    }
    function Yn(e, t, n, r, i) {
        return new Yn.prototype.init(e, t, n, r, i);
    }
    function Zn(e, t) {
        var n, r = {
            height: e
        },
            i = 0;
        t = t ? 1 : 0;
        for (; i < 4; i += 2 - t) {
            n = $t[i], r["margin" + n] = r["padding" + n] = e;
        }
        return t && (r.opacity = r.width = e), r;
    }
    function tr(e) {
        return v.isWindow(e) ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : !1;
    }
    var n, r, i = e.document,
        s = e.location,
        o = e.navigator,
        u = e.jQuery,
        a = e.$,
        f = Array.prototype.push,
        l = Array.prototype.slice,
        c = Array.prototype.indexOf,
        h = Object.prototype.toString,
        p = Object.prototype.hasOwnProperty,
        d = String.prototype.trim,
        v = function (e, t) {
            return new v.fn.init(e, t, n);
        },
        m = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
        g = /\S/,
        y = /\s+/,
        b = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        w = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
        E = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        S = /^[\],:{}\s]*$/,
        x = /(?:^|:|,)(?:\s*\[)+/g,
        T = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        N = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
        C = /^-ms-/,
        k = /-([\da-z])/gi,
        L = function (e, t) {
            return (t + "").toUpperCase();
        },
        A = function () {
            i.addEventListener ? (i.removeEventListener("DOMContentLoaded", A, !1), v.ready()) : i.readyState === "complete" && (i.detachEvent("onreadystatechange", A), v.ready());
        },
        O = {};
    v.fn = v.prototype = {
        constructor: v,
        init: function (e, n, r) {
            var s, o, u, a;
            if (!e) {
                return this;
            }
            if (e.nodeType) {
                return this.context = this[0] = e, this.length = 1, this;
            }
            if (typeof e == "string") {
                e.charAt(0) === "<" && e.charAt(e.length - 1) === ">" && e.length >= 3 ? s = [null, e, null] : s = w.exec(e);
                if (s && (s[1] || !n)) {
                    if (s[1]) {
                        return n = n instanceof v ? n[0] : n, a = n && n.nodeType ? n.ownerDocument || n : i, e = v.parseHTML(s[1], a, !0), E.test(s[1]) && v.isPlainObject(n) && this.attr.call(e, n, !0), v.merge(this, e);
                    }
                    o = i.getElementById(s[2]);
                    if (o && o.parentNode) {
                        if (o.id !== s[2]) {
                            return r.find(e);
                        }
                        this.length = 1, this[0] = o;
                    }
                    return this.context = i, this.selector = e, this;
                }
                return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e);
            }
            return v.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), v.makeArray(e, this));
        },
        selector: "",
        jquery: "1.8.3",
        length: 0,
        size: function () {
            return this.length;
        },
        toArray: function () {
            return l.call(this);
        },
        get: function (e) {
            return e == null ? this.toArray() : e < 0 ? this[this.length + e] : this[e];
        },
        pushStack: function (e, t, n) {
            var r = v.merge(this.constructor(), e);
            return r.prevObject = this, r.context = this.context, t === "find" ? r.selector = this.selector + (this.selector ? " " : "") + n : t && (r.selector = this.selector + "." + t + "(" + n + ")"), r;
        },
        each: function (e, t) {
            return v.each(this, e, t);
        },
        ready: function (e) {
            return v.ready.promise().done(e), this;
        },
        eq: function (e) {
            return e = +e, e === -1 ? this.slice(e) : this.slice(e, e + 1);
        },
        first: function () {
            return this.eq(0);
        },
        last: function () {
            return this.eq(-1);
        },
        slice: function () {
            return this.pushStack(l.apply(this, arguments), "slice", l.call(arguments).join(","));
        },
        map: function (e) {
            return this.pushStack(v.map(this, function (t, n) {
                return e.call(t, n, t);
            }));
        },
        end: function () {
            return this.prevObject || this.constructor(null);
        },
        push: f,
        sort: [].sort,
        splice: [].splice
    }, v.fn.init.prototype = v.fn, v.extend = v.fn.extend = function () {
        var e, n, r, i, s, o, u = arguments[0] || {},
            a = 1,
            f = arguments.length,
            l = !1;
        typeof u == "boolean" && (l = u, u = arguments[1] || {}, a = 2), typeof u != "object" && !v.isFunction(u) && (u = {}), f === a && (u = this, --a);
        for (; a < f; a++) {
            if ((e = arguments[a]) != null) {
                for (n in e) {
                    r = u[n], i = e[n];
                    if (u === i) {
                        continue;
                    }
                    l && i && (v.isPlainObject(i) || (s = v.isArray(i))) ? (s ? (s = !1, o = r && v.isArray(r) ? r : []) : o = r && v.isPlainObject(r) ? r : {}, u[n] = v.extend(l, o, i)) : i !== t && (u[n] = i);
                }
            }
        }
        return u;
    }, v.extend({
        noConflict: function (t) {
            return e.$ === v && (e.$ = a), t && e.jQuery === v && (e.jQuery = u), v;
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function (e) {
            e ? v.readyWait++ : v.ready(!0);
        },
        ready: function (e) {
            if (e === !0 ? --v.readyWait : v.isReady) {
                return;
            }
            if (!i.body) {
                return setTimeout(v.ready, 1);
            }
            v.isReady = !0;
            if (e !== !0 && --v.readyWait > 0) {
                return;
            }
            r.resolveWith(i, [v]), v.fn.trigger && v(i).trigger("ready").off("ready");
        },
        isFunction: function (e) {
            return v.type(e) === "function";
        },
        isArray: Array.isArray ||
        function (e) {
            return v.type(e) === "array";
        },
        isWindow: function (e) {
            return e != null && e == e.window;
        },
        isNumeric: function (e) {
            return !isNaN(parseFloat(e)) && isFinite(e);
        },
        type: function (e) {
            return e == null ? String(e) : O[h.call(e)] || "object";
        },
        isPlainObject: function (e) {
            if (!e || v.type(e) !== "object" || e.nodeType || v.isWindow(e)) {
                return !1;
            }
            try {
                if (e.constructor && !p.call(e, "constructor") && !p.call(e.constructor.prototype, "isPrototypeOf")) {
                    return !1;
                }
            } catch (n) {
                return !1;
            }
            var r;
            for (r in e) {}
            return r === t || p.call(e, r);
        },
        isEmptyObject: function (e) {
            var t;
            for (t in e) {
                return !1;
            }
            return !0;
        },
        error: function (e) {
            throw new Error(e);
        },
        parseHTML: function (e, t, n) {
            var r;
            return !e || typeof e != "string" ? null : (typeof t == "boolean" && (n = t, t = 0), t = t || i, (r = E.exec(e)) ? [t.createElement(r[1])] : (r = v.buildFragment([e], t, n ? null : []), v.merge([], (r.cacheable ? v.clone(r.fragment) : r.fragment).childNodes)));
        },
        parseJSON: function (t) {
            if (!t || typeof t != "string") {
                return null;
            }
            t = v.trim(t);
            if (e.JSON && e.JSON.parse) {
                return e.JSON.parse(t);
            }
            if (S.test(t.replace(T, "@").replace(N, "]").replace(x, ""))) {
                return (new Function("return " + t))();
            }
            v.error("Invalid JSON: " + t);
        },
        parseXML: function (n) {
            var r, i;
            if (!n || typeof n != "string") {
                return null;
            }
            try {
                e.DOMParser ? (i = new DOMParser, r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n));
            } catch (s) {
                r = t;
            }
            return (!r || !r.documentElement || r.getElementsByTagName("parsererror").length) && v.error("Invalid XML: " + n), r;
        },
        noop: function () {},
        globalEval: function (t) {
            t && g.test(t) && (e.execScript ||
            function (t) {
                e.eval.call(e, t);
            })(t);
        },
        camelCase: function (e) {
            return e.replace(C, "ms-").replace(k, L);
        },
        nodeName: function (e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
        },
        each: function (e, n, r) {
            var i, s = 0,
                o = e.length,
                u = o === t || v.isFunction(e);
            if (r) {
                if (u) {
                    for (i in e) {
                        if (n.apply(e[i], r) === !1) {
                            break;
                        }
                    }
                } else {
                    for (; s < o;) {
                        if (n.apply(e[s++], r) === !1) {
                            break;
                        }
                    }
                }
            } else {
                if (u) {
                    for (i in e) {
                        if (n.call(e[i], i, e[i]) === !1) {
                            break;
                        }
                    }
                } else {
                    for (; s < o;) {
                        if (n.call(e[s], s, e[s++]) === !1) {
                            break;
                        }
                    }
                }
            }
            return e;
        },
        trim: d && !d.call("\ufeff\u00a0") ?
        function (e) {
            return e == null ? "" : d.call(e);
        } : function (e) {
            return e == null ? "" : (e + "").replace(b, "");
        },
        makeArray: function (e, t) {
            var n, r = t || [];
            return e != null && (n = v.type(e), e.length == null || n === "string" || n === "function" || n === "regexp" || v.isWindow(e) ? f.call(r, e) : v.merge(r, e)), r;
        },
        inArray: function (e, t, n) {
            var r;
            if (t) {
                if (c) {
                    return c.call(t, e, n);
                }
                r = t.length, n = n ? n < 0 ? Math.max(0, r + n) : n : 0;
                for (; n < r; n++) {
                    if (n in t && t[n] === e) {
                        return n;
                    }
                }
            }
            return -1;
        },
        merge: function (e, n) {
            var r = n.length,
                i = e.length,
                s = 0;
            if (typeof r == "number") {
                for (; s < r; s++) {
                    e[i++] = n[s];
                }
            } else {
                while (n[s] !== t) {
                    e[i++] = n[s++];
                }
            }
            return e.length = i, e;
        },
        grep: function (e, t, n) {
            var r, i = [],
                s = 0,
                o = e.length;
            n = !! n;
            for (; s < o; s++) {
                r = !! t(e[s], s), n !== r && i.push(e[s]);
            }
            return i;
        },
        map: function (e, n, r) {
            var i, s, o = [],
                u = 0,
                a = e.length,
                f = e instanceof v || a !== t && typeof a == "number" && (a > 0 && e[0] && e[a - 1] || a === 0 || v.isArray(e));
            if (f) {
                for (; u < a; u++) {
                    i = n(e[u], u, r), i != null && (o[o.length] = i);
                }
            } else {
                for (s in e) {
                    i = n(e[s], s, r), i != null && (o[o.length] = i);
                }
            }
            return o.concat.apply([], o);
        },
        guid: 1,
        proxy: function (e, n) {
            var r, i, s;
            return typeof n == "string" && (r = e[n], n = e, e = r), v.isFunction(e) ? (i = l.call(arguments, 2), s = function () {
                return e.apply(n, i.concat(l.call(arguments)));
            }, s.guid = e.guid = e.guid || v.guid++, s) : t;
        },
        access: function (e, n, r, i, s, o, u) {
            var a, f = r == null,
                l = 0,
                c = e.length;
            if (r && typeof r == "object") {
                for (l in r) {
                    v.access(e, n, l, r[l], 1, o, i);
                }
                s = 1;
            } else {
                if (i !== t) {
                    a = u === t && v.isFunction(i), f && (a ? (a = n, n = function (e, t, n) {
                        return a.call(v(e), n);
                    }) : (n.call(e, i), n = null));
                    if (n) {
                        for (; l < c; l++) {
                            n(e[l], r, a ? i.call(e[l], l, n(e[l], r)) : i, u);
                        }
                    }
                    s = 1;
                }
            }
            return s ? e : f ? n.call(e) : c ? n(e[0], r) : o;
        },
        now: function () {
            return (new Date).getTime();
        }
    }), v.ready.promise = function (t) {
        if (!r) {
            r = v.Deferred();
            if (i.readyState === "complete") {
                setTimeout(v.ready, 1);
            } else {
                if (i.addEventListener) {
                    i.addEventListener("DOMContentLoaded", A, !1), e.addEventListener("load", v.ready, !1);
                } else {
                    i.attachEvent("onreadystatechange", A), e.attachEvent("onload", v.ready);
                    var n = !1;
                    try {
                        n = e.frameElement == null && i.documentElement;
                    } catch (s) {}
                    n && n.doScroll &&
                    function o() {
                        if (!v.isReady) {
                            try {
                                n.doScroll("left");
                            } catch (e) {
                                return setTimeout(o, 50);
                            }
                            v.ready();
                        }
                    }();
                }
            }
        }
        return r.promise(t);
    }, v.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (e, t) {
        O["[object " + t + "]"] = t.toLowerCase();
    }), n = v(i);
    var M = {};
    v.Callbacks = function (e) {
        e = typeof e == "string" ? M[e] || _(e) : v.extend({}, e);
        var n, r, i, s, o, u, a = [],
            f = !e.once && [],
            l = function (t) {
                n = e.memory && t, r = !0, u = s || 0, s = 0, o = a.length, i = !0;
                for (; a && u < o; u++) {
                    if (a[u].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                        n = !1;
                        break;
                    }
                }
                i = !1, a && (f ? f.length && l(f.shift()) : n ? a = [] : c.disable());
            },
            c = {
                add: function () {
                    if (a) {
                        var t = a.length;
                        (function r(t) {
                            v.each(t, function (t, n) {
                                var i = v.type(n);
                                i === "function" ? (!e.unique || !c.has(n)) && a.push(n) : n && n.length && i !== "string" && r(n);
                            });
                        })(arguments), i ? o = a.length : n && (s = t, l(n));
                    }
                    return this;
                },
                remove: function () {
                    return a && v.each(arguments, function (e, t) {
                        var n;
                        while ((n = v.inArray(t, a, n)) > -1) {
                            a.splice(n, 1), i && (n <= o && o--, n <= u && u--);
                        }
                    }), this;
                },
                has: function (e) {
                    return v.inArray(e, a) > -1;
                },
                empty: function () {
                    return a = [], this;
                },
                disable: function () {
                    return a = f = n = t, this;
                },
                disabled: function () {
                    return !a;
                },
                lock: function () {
                    return f = t, n || c.disable(), this;
                },
                locked: function () {
                    return !f;
                },
                fireWith: function (e, t) {
                    return t = t || [], t = [e, t.slice ? t.slice() : t], a && (!r || f) && (i ? f.push(t) : l(t)), this;
                },
                fire: function () {
                    return c.fireWith(this, arguments), this;
                },
                fired: function () {
                    return !!r;
                }
            };
        return c;
    }, v.extend({
        Deferred: function (e) {
            var t = [
                ["resolve", "done", v.Callbacks("once memory"), "resolved"],
                ["reject", "fail", v.Callbacks("once memory"), "rejected"],
                ["notify", "progress", v.Callbacks("memory")]
            ],
                n = "pending",
                r = {
                    state: function () {
                        return n;
                    },
                    always: function () {
                        return i.done(arguments).fail(arguments), this;
                    },
                    then: function () {
                        var e = arguments;
                        return v.Deferred(function (n) {
                            v.each(t, function (t, r) {
                                var s = r[0],
                                    o = e[t];
                                i[r[1]](v.isFunction(o) ?
                                function () {
                                    var e = o.apply(this, arguments);
                                    e && v.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s + "With"](this === i ? n : this, [e]);
                                } : n[s]);
                            }), e = null;
                        }).promise();
                    },
                    promise: function (e) {
                        return e != null ? v.extend(e, r) : r;
                    }
                },
                i = {};
            return r.pipe = r.then, v.each(t, function (e, s) {
                var o = s[2],
                    u = s[3];
                r[s[1]] = o.add, u && o.add(function () {
                    n = u;
                }, t[e ^ 1][2].disable, t[2][2].lock), i[s[0]] = o.fire, i[s[0] + "With"] = o.fireWith;
            }), r.promise(i), e && e.call(i, i), i;
        },
        when: function (e) {
            var t = 0,
                n = l.call(arguments),
                r = n.length,
                i = r !== 1 || e && v.isFunction(e.promise) ? r : 0,
                s = i === 1 ? e : v.Deferred(),
                o = function (e, t, n) {
                    return function (r) {
                        t[e] = this, n[e] = arguments.length > 1 ? l.call(arguments) : r, n === u ? s.notifyWith(t, n) : --i || s.resolveWith(t, n);
                    };
                },
                u, a, f;
            if (r > 1) {
                u = new Array(r), a = new Array(r), f = new Array(r);
                for (; t < r; t++) {
                    n[t] && v.isFunction(n[t].promise) ? n[t].promise().done(o(t, f, n)).fail(s.reject).progress(o(t, a, u)) : --i;
                }
            }
            return i || s.resolveWith(f, n), s.promise();
        }
    }), v.support = function () {
        var t, n, r, s, o, u, a, f, l, c, h, p = i.createElement("div");
        p.setAttribute("className", "t"), p.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = p.getElementsByTagName("*"), r = p.getElementsByTagName("a")[0];
        if (!n || !r || !n.length) {
            return {};
        }
        s = i.createElement("select"), o = s.appendChild(i.createElement("option")), u = p.getElementsByTagName("input")[0], r.style.cssText = "top:1px;float:left;opacity:.5", t = {
            leadingWhitespace: p.firstChild.nodeType === 3,
            tbody: !p.getElementsByTagName("tbody").length,
            htmlSerialize: !! p.getElementsByTagName("link").length,
            style: /top/.test(r.getAttribute("style")),
            hrefNormalized: r.getAttribute("href") === "/a",
            opacity: /^0.5/.test(r.style.opacity),
            cssFloat: !! r.style.cssFloat,
            checkOn: u.value === "on",
            optSelected: o.selected,
            getSetAttribute: p.className !== "t",
            enctype: !! i.createElement("form").enctype,
            html5Clone: i.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
            boxModel: i.compatMode === "CSS1Compat",
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        }, u.checked = !0, t.noCloneChecked = u.cloneNode(!0).checked, s.disabled = !0, t.optDisabled = !o.disabled;
        try {
            delete p.test;
        } catch (d) {
            t.deleteExpando = !1;
        }!p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", h = function () {
            t.noCloneEvent = !1;
        }), p.cloneNode(!0).fireEvent("onclick"), p.detachEvent("onclick", h)), u = i.createElement("input"), u.value = "t", u.setAttribute("type", "radio"), t.radioValue = u.value === "t", u.setAttribute("checked", "checked"), u.setAttribute("name", "t"), p.appendChild(u), a = i.createDocumentFragment(), a.appendChild(p.lastChild), t.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked, t.appendChecked = u.checked, a.removeChild(u), a.appendChild(p);
        if (p.attachEvent) {
            for (l in {
                submit: !0,
                change: !0,
                focusin: !0
            }) {
                f = "on" + l, c = f in p, c || (p.setAttribute(f, "return;"), c = typeof p[f] == "function"), t[l + "Bubbles"] = c;
            }
        }
        return v(function () {
            var n, r, s, o, u = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
                a = i.getElementsByTagName("body")[0];
            if (!a) {
                return;
            }
            n = i.createElement("div"), n.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", a.insertBefore(n, a.firstChild), r = i.createElement("div"), n.appendChild(r), r.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", s = r.getElementsByTagName("td"), s[0].style.cssText = "padding:0;margin:0;border:0;display:none", c = s[0].offsetHeight === 0, s[0].style.display = "", s[1].style.display = "none", t.reliableHiddenOffsets = c && s[0].offsetHeight === 0, r.innerHTML = "", r.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", t.boxSizing = r.offsetWidth === 4, t.doesNotIncludeMarginInBodyOffset = a.offsetTop !== 1, e.getComputedStyle && (t.pixelPosition = (e.getComputedStyle(r, null) || {}).top !== "1%", t.boxSizingReliable = (e.getComputedStyle(r, null) || {
                width: "4px"
            }).width === "4px", o = i.createElement("div"), o.style.cssText = r.style.cssText = u, o.style.marginRight = o.style.width = "0", r.style.width = "1px", r.appendChild(o), t.reliableMarginRight = !parseFloat((e.getComputedStyle(o, null) || {}).marginRight)), typeof r.style.zoom != "undefined" && (r.innerHTML = "", r.style.cssText = u + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = r.offsetWidth === 3, r.style.display = "block", r.style.overflow = "visible", r.innerHTML = "<div></div>", r.firstChild.style.width = "5px", t.shrinkWrapBlocks = r.offsetWidth !== 3, n.style.zoom = 1), a.removeChild(n), n = r = s = o = null;
        }), a.removeChild(p), n = r = s = o = u = a = p = null, t;
    }();
    var D = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        P = /([A-Z])/g;
    v.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + (v.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function (e) {
            return e = e.nodeType ? v.cache[e[v.expando]] : e[v.expando], !! e && !B(e);
        },
        data: function (e, n, r, i) {
            if (!v.acceptData(e)) {
                return;
            }
            var s, o, u = v.expando,
                a = typeof n == "string",
                f = e.nodeType,
                l = f ? v.cache : e,
                c = f ? e[u] : e[u] && u;
            if ((!c || !l[c] || !i && !l[c].data) && a && r === t) {
                return;
            }
            c || (f ? e[u] = c = v.deletedIds.pop() || v.guid++ : c = u), l[c] || (l[c] = {}, f || (l[c].toJSON = v.noop));
            if (typeof n == "object" || typeof n == "function") {
                i ? l[c] = v.extend(l[c], n) : l[c].data = v.extend(l[c].data, n);
            }
            return s = l[c], i || (s.data || (s.data = {}), s = s.data), r !== t && (s[v.camelCase(n)] = r), a ? (o = s[n], o == null && (o = s[v.camelCase(n)])) : o = s, o;
        },
        removeData: function (e, t, n) {
            if (!v.acceptData(e)) {
                return;
            }
            var r, i, s, o = e.nodeType,
                u = o ? v.cache : e,
                a = o ? e[v.expando] : v.expando;
            if (!u[a]) {
                return;
            }
            if (t) {
                r = n ? u[a] : u[a].data;
                if (r) {
                    v.isArray(t) || (t in r ? t = [t] : (t = v.camelCase(t), t in r ? t = [t] : t = t.split(" ")));
                    for (i = 0, s = t.length; i < s; i++) {
                        delete r[t[i]];
                    }
                    if (!(n ? B : v.isEmptyObject)(r)) {
                        return;
                    }
                }
            }
            if (!n) {
                delete u[a].data;
                if (!B(u[a])) {
                    return;
                }
            }
            o ? v.cleanData([e], !0) : v.support.deleteExpando || u != u.window ? delete u[a] : u[a] = null;
        },
        _data: function (e, t, n) {
            return v.data(e, t, n, !0);
        },
        acceptData: function (e) {
            var t = e.nodeName && v.noData[e.nodeName.toLowerCase()];
            return !t || t !== !0 && e.getAttribute("classid") === t;
        }
    }), v.fn.extend({
        data: function (e, n) {
            var r, i, s, o, u, a = this[0],
                f = 0,
                l = null;
            if (e === t) {
                if (this.length) {
                    l = v.data(a);
                    if (a.nodeType === 1 && !v._data(a, "parsedAttrs")) {
                        s = a.attributes;
                        for (u = s.length; f < u; f++) {
                            o = s[f].name, o.indexOf("data-") || (o = v.camelCase(o.substring(5)), H(a, o, l[o]));
                        }
                        v._data(a, "parsedAttrs", !0);
                    }
                }
                return l;
            }
            return typeof e == "object" ? this.each(function () {
                v.data(this, e);
            }) : (r = e.split(".", 2), r[1] = r[1] ? "." + r[1] : "", i = r[1] + "!", v.access(this, function (n) {
                if (n === t) {
                    return l = this.triggerHandler("getData" + i, [r[0]]), l === t && a && (l = v.data(a, e), l = H(a, e, l)), l === t && r[1] ? this.data(r[0]) : l;
                }
                r[1] = n, this.each(function () {
                    var t = v(this);
                    t.triggerHandler("setData" + i, r), v.data(this, e, n), t.triggerHandler("changeData" + i, r);
                });
            }, null, n, arguments.length > 1, null, !1));
        },
        removeData: function (e) {
            return this.each(function () {
                v.removeData(this, e);
            });
        }
    }), v.extend({
        queue: function (e, t, n) {
            var r;
            if (e) {
                return t = (t || "fx") + "queue", r = v._data(e, t), n && (!r || v.isArray(n) ? r = v._data(e, t, v.makeArray(n)) : r.push(n)), r || [];
            }
        },
        dequeue: function (e, t) {
            t = t || "fx";
            var n = v.queue(e, t),
                r = n.length,
                i = n.shift(),
                s = v._queueHooks(e, t),
                o = function () {
                    v.dequeue(e, t);
                };
            i === "inprogress" && (i = n.shift(), r--), i && (t === "fx" && n.unshift("inprogress"), delete s.stop, i.call(e, o, s)), !r && s && s.empty.fire();
        },
        _queueHooks: function (e, t) {
            var n = t + "queueHooks";
            return v._data(e, n) || v._data(e, n, {
                empty: v.Callbacks("once memory").add(function () {
                    v.removeData(e, t + "queue", !0), v.removeData(e, n, !0);
                })
            });
        }
    }), v.fn.extend({
        queue: function (e, n) {
            var r = 2;
            return typeof e != "string" && (n = e, e = "fx", r--), arguments.length < r ? v.queue(this[0], e) : n === t ? this : this.each(function () {
                var t = v.queue(this, e, n);
                v._queueHooks(this, e), e === "fx" && t[0] !== "inprogress" && v.dequeue(this, e);
            });
        },
        dequeue: function (e) {
            return this.each(function () {
                v.dequeue(this, e);
            });
        },
        delay: function (e, t) {
            return e = v.fx ? v.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
                var r = setTimeout(t, e);
                n.stop = function () {
                    clearTimeout(r);
                };
            });
        },
        clearQueue: function (e) {
            return this.queue(e || "fx", []);
        },
        promise: function (e, n) {
            var r, i = 1,
                s = v.Deferred(),
                o = this,
                u = this.length,
                a = function () {
                    --i || s.resolveWith(o, [o]);
                };
            typeof e != "string" && (n = e, e = t), e = e || "fx";
            while (u--) {
                r = v._data(o[u], e + "queueHooks"), r && r.empty && (i++, r.empty.add(a));
            }
            return a(), s.promise(n);
        }
    });
    var j, F, I, q = /[\t\r\n]/g,
        R = /\r/g,
        U = /^(?:button|input)$/i,
        z = /^(?:button|input|object|select|textarea)$/i,
        W = /^a(?:rea|)$/i,
        X = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        V = v.support.getSetAttribute;
    v.fn.extend({
        attr: function (e, t) {
            return v.access(this, v.attr, e, t, arguments.length > 1);
        },
        removeAttr: function (e) {
            return this.each(function () {
                v.removeAttr(this, e);
            });
        },
        prop: function (e, t) {
            return v.access(this, v.prop, e, t, arguments.length > 1);
        },
        removeProp: function (e) {
            return e = v.propFix[e] || e, this.each(function () {
                try {
                    this[e] = t, delete this[e];
                } catch (n) {}
            });
        },
        addClass: function (e) {
            var t, n, r, i, s, o, u;
            if (v.isFunction(e)) {
                return this.each(function (t) {
                    v(this).addClass(e.call(this, t, this.className));
                });
            }
            if (e && typeof e == "string") {
                t = e.split(y);
                for (n = 0, r = this.length; n < r; n++) {
                    i = this[n];
                    if (i.nodeType === 1) {
                        if (!i.className && t.length === 1) {
                            i.className = e;
                        } else {
                            s = " " + i.className + " ";
                            for (o = 0, u = t.length; o < u; o++) {
                                s.indexOf(" " + t[o] + " ") < 0 && (s += t[o] + " ");
                            }
                            i.className = v.trim(s);
                        }
                    }
                }
            }
            return this;
        },
        removeClass: function (e) {
            var n, r, i, s, o, u, a;
            if (v.isFunction(e)) {
                return this.each(function (t) {
                    v(this).removeClass(e.call(this, t, this.className));
                });
            }
            if (e && typeof e == "string" || e === t) {
                n = (e || "").split(y);
                for (u = 0, a = this.length; u < a; u++) {
                    i = this[u];
                    if (i.nodeType === 1 && i.className) {
                        r = (" " + i.className + " ").replace(q, " ");
                        for (s = 0, o = n.length; s < o; s++) {
                            while (r.indexOf(" " + n[s] + " ") >= 0) {
                                r = r.replace(" " + n[s] + " ", " ");
                            }
                        }
                        i.className = e ? v.trim(r) : "";
                    }
                }
            }
            return this;
        },
        toggleClass: function (e, t) {
            var n = typeof e,
                r = typeof t == "boolean";
            return v.isFunction(e) ? this.each(function (n) {
                v(this).toggleClass(e.call(this, n, this.className, t), t);
            }) : this.each(function () {
                if (n === "string") {
                    var i, s = 0,
                        o = v(this),
                        u = t,
                        a = e.split(y);
                    while (i = a[s++]) {
                        u = r ? u : !o.hasClass(i), o[u ? "addClass" : "removeClass"](i);
                    }
                } else {
                    if (n === "undefined" || n === "boolean") {
                        this.className && v._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : v._data(this, "__className__") || "";
                    }
                }
            });
        },
        hasClass: function (e) {
            var t = " " + e + " ",
                n = 0,
                r = this.length;
            for (; n < r; n++) {
                if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(q, " ").indexOf(t) >= 0) {
                    return !0;
                }
            }
            return !1;
        },
        val: function (e) {
            var n, r, i, s = this[0];
            if (!arguments.length) {
                if (s) {
                    return n = v.valHooks[s.type] || v.valHooks[s.nodeName.toLowerCase()], n && "get" in n && (r = n.get(s, "value")) !== t ? r : (r = s.value, typeof r == "string" ? r.replace(R, "") : r == null ? "" : r);
                }
                return;
            }
            return i = v.isFunction(e), this.each(function (r) {
                var s, o = v(this);
                if (this.nodeType !== 1) {
                    return;
                }
                i ? s = e.call(this, r, o.val()) : s = e, s == null ? s = "" : typeof s == "number" ? s += "" : v.isArray(s) && (s = v.map(s, function (e) {
                    return e == null ? "" : e + "";
                })), n = v.valHooks[this.type] || v.valHooks[this.nodeName.toLowerCase()];
                if (!n || !("set" in n) || n.set(this, s, "value") === t) {
                    this.value = s;
                }
            });
        }
    }), v.extend({
        valHooks: {
            option: {
                get: function (e) {
                    var t = e.attributes.value;
                    return !t || t.specified ? e.value : e.text;
                }
            },
            select: {
                get: function (e) {
                    var t, n, r = e.options,
                        i = e.selectedIndex,
                        s = e.type === "select-one" || i < 0,
                        o = s ? null : [],
                        u = s ? i + 1 : r.length,
                        a = i < 0 ? u : s ? i : 0;
                    for (; a < u; a++) {
                        n = r[a];
                        if ((n.selected || a === i) && (v.support.optDisabled ? !n.disabled : n.getAttribute("disabled") === null) && (!n.parentNode.disabled || !v.nodeName(n.parentNode, "optgroup"))) {
                            t = v(n).val();
                            if (s) {
                                return t;
                            }
                            o.push(t);
                        }
                    }
                    return o;
                },
                set: function (e, t) {
                    var n = v.makeArray(t);
                    return v(e).find("option").each(function () {
                        this.selected = v.inArray(v(this).val(), n) >= 0;
                    }), n.length || (e.selectedIndex = -1), n;
                }
            }
        },
        attrFn: {},
        attr: function (e, n, r, i) {
            var s, o, u, a = e.nodeType;
            if (!e || a === 3 || a === 8 || a === 2) {
                return;
            }
            if (i && v.isFunction(v.fn[n])) {
                return v(e)[n](r);
            }
            if (typeof e.getAttribute == "undefined") {
                return v.prop(e, n, r);
            }
            u = a !== 1 || !v.isXMLDoc(e), u && (n = n.toLowerCase(), o = v.attrHooks[n] || (X.test(n) ? F : j));
            if (r !== t) {
                if (r === null) {
                    v.removeAttr(e, n);
                    return;
                }
                return o && "set" in o && u && (s = o.set(e, r, n)) !== t ? s : (e.setAttribute(n, r + ""), r);
            }
            return o && "get" in o && u && (s = o.get(e, n)) !== null ? s : (s = e.getAttribute(n), s === null ? t : s);
        },
        removeAttr: function (e, t) {
            var n, r, i, s, o = 0;
            if (t && e.nodeType === 1) {
                r = t.split(y);
                for (; o < r.length; o++) {
                    i = r[o], i && (n = v.propFix[i] || i, s = X.test(i), s || v.attr(e, i, ""), e.removeAttribute(V ? i : n), s && n in e && (e[n] = !1));
                }
            }
        },
        attrHooks: {
            type: {
                set: function (e, t) {
                    if (U.test(e.nodeName) && e.parentNode) {
                        v.error("type property can't be changed");
                    } else {
                        if (!v.support.radioValue && t === "radio" && v.nodeName(e, "input")) {
                            var n = e.value;
                            return e.setAttribute("type", t), n && (e.value = n), t;
                        }
                    }
                }
            },
            value: {
                get: function (e, t) {
                    return j && v.nodeName(e, "button") ? j.get(e, t) : t in e ? e.value : null;
                },
                set: function (e, t, n) {
                    if (j && v.nodeName(e, "button")) {
                        return j.set(e, t, n);
                    }
                    e.value = t;
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function (e, n, r) {
            var i, s, o, u = e.nodeType;
            if (!e || u === 3 || u === 8 || u === 2) {
                return;
            }
            return o = u !== 1 || !v.isXMLDoc(e), o && (n = v.propFix[n] || n, s = v.propHooks[n]), r !== t ? s && "set" in s && (i = s.set(e, r, n)) !== t ? i : e[n] = r : s && "get" in s && (i = s.get(e, n)) !== null ? i : e[n];
        },
        propHooks: {
            tabIndex: {
                get: function (e) {
                    var n = e.getAttributeNode("tabindex");
                    return n && n.specified ? parseInt(n.value, 10) : z.test(e.nodeName) || W.test(e.nodeName) && e.href ? 0 : t;
                }
            }
        }
    }), F = {
        get: function (e, n) {
            var r, i = v.prop(e, n);
            return i === !0 || typeof i != "boolean" && (r = e.getAttributeNode(n)) && r.nodeValue !== !1 ? n.toLowerCase() : t;
        },
        set: function (e, t, n) {
            var r;
            return t === !1 ? v.removeAttr(e, n) : (r = v.propFix[n] || n, r in e && (e[r] = !0), e.setAttribute(n, n.toLowerCase())), n;
        }
    }, V || (I = {
        name: !0,
        id: !0,
        coords: !0
    }, j = v.valHooks.button = {
        get: function (e, n) {
            var r;
            return r = e.getAttributeNode(n), r && (I[n] ? r.value !== "" : r.specified) ? r.value : t;
        },
        set: function (e, t, n) {
            var r = e.getAttributeNode(n);
            return r || (r = i.createAttribute(n), e.setAttributeNode(r)), r.value = t + "";
        }
    }, v.each(["width", "height"], function (e, t) {
        v.attrHooks[t] = v.extend(v.attrHooks[t], {
            set: function (e, n) {
                if (n === "") {
                    return e.setAttribute(t, "auto"), n;
                }
            }
        });
    }), v.attrHooks.contenteditable = {
        get: j.get,
        set: function (e, t, n) {
            t === "" && (t = "false"), j.set(e, t, n);
        }
    }), v.support.hrefNormalized || v.each(["href", "src", "width", "height"], function (e, n) {
        v.attrHooks[n] = v.extend(v.attrHooks[n], {
            get: function (e) {
                var r = e.getAttribute(n, 2);
                return r === null ? t : r;
            }
        });
    }), v.support.style || (v.attrHooks.style = {
        get: function (e) {
            return e.style.cssText.toLowerCase() || t;
        },
        set: function (e, t) {
            return e.style.cssText = t + "";
        }
    }), v.support.optSelected || (v.propHooks.selected = v.extend(v.propHooks.selected, {
        get: function (e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null;
        }
    })), v.support.enctype || (v.propFix.enctype = "encoding"), v.support.checkOn || v.each(["radio", "checkbox"], function () {
        v.valHooks[this] = {
            get: function (e) {
                return e.getAttribute("value") === null ? "on" : e.value;
            }
        };
    }), v.each(["radio", "checkbox"], function () {
        v.valHooks[this] = v.extend(v.valHooks[this], {
            set: function (e, t) {
                if (v.isArray(t)) {
                    return e.checked = v.inArray(v(e).val(), t) >= 0;
                }
            }
        });
    });
    var $ = /^(?:textarea|input|select)$/i,
        J = /^([^\.]*|)(?:\.(.+)|)$/,
        K = /(?:^|\s)hover(\.\S+|)\b/,
        Q = /^key/,
        G = /^(?:mouse|contextmenu)|click/,
        Y = /^(?:focusinfocus|focusoutblur)$/,
        Z = function (e) {
            return v.event.special.hover ? e : e.replace(K, "mouseenter$1 mouseleave$1");
        };
    v.event = {
        add: function (e, n, r, i, s) {
            var o, u, a, f, l, c, h, p, d, m, g;
            if (e.nodeType === 3 || e.nodeType === 8 || !n || !r || !(o = v._data(e))) {
                return;
            }
            r.handler && (d = r, r = d.handler, s = d.selector), r.guid || (r.guid = v.guid++), a = o.events, a || (o.events = a = {}), u = o.handle, u || (o.handle = u = function (e) {
                return typeof v == "undefined" || !! e && v.event.triggered === e.type ? t : v.event.dispatch.apply(u.elem, arguments);
            }, u.elem = e), n = v.trim(Z(n)).split(" ");
            for (f = 0; f < n.length; f++) {
                l = J.exec(n[f]) || [], c = l[1], h = (l[2] || "").split(".").sort(), g = v.event.special[c] || {}, c = (s ? g.delegateType : g.bindType) || c, g = v.event.special[c] || {}, p = v.extend({
                    type: c,
                    origType: l[1],
                    data: i,
                    handler: r,
                    guid: r.guid,
                    selector: s,
                    needsContext: s && v.expr.match.needsContext.test(s),
                    namespace: h.join(".")
                }, d), m = a[c];
                if (!m) {
                    m = a[c] = [], m.delegateCount = 0;
                    if (!g.setup || g.setup.call(e, i, h, u) === !1) {
                        e.addEventListener ? e.addEventListener(c, u, !1) : e.attachEvent && e.attachEvent("on" + c, u);
                    }
                }
                g.add && (g.add.call(e, p), p.handler.guid || (p.handler.guid = r.guid)), s ? m.splice(m.delegateCount++, 0, p) : m.push(p), v.event.global[c] = !0;
            }
            e = null;
        },
        global: {},
        remove: function (e, t, n, r, i) {
            var s, o, u, a, f, l, c, h, p, d, m, g = v.hasData(e) && v._data(e);
            if (!g || !(h = g.events)) {
                return;
            }
            t = v.trim(Z(t || "")).split(" ");
            for (s = 0; s < t.length; s++) {
                o = J.exec(t[s]) || [], u = a = o[1], f = o[2];
                if (!u) {
                    for (u in h) {
                        v.event.remove(e, u + t[s], n, r, !0);
                    }
                    continue;
                }
                p = v.event.special[u] || {}, u = (r ? p.delegateType : p.bindType) || u, d = h[u] || [], l = d.length, f = f ? new RegExp("(^|\\.)" + f.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                for (c = 0; c < d.length; c++) {
                    m = d[c], (i || a === m.origType) && (!n || n.guid === m.guid) && (!f || f.test(m.namespace)) && (!r || r === m.selector || r === "**" && m.selector) && (d.splice(c--, 1), m.selector && d.delegateCount--, p.remove && p.remove.call(e, m));
                }
                d.length === 0 && l !== d.length && ((!p.teardown || p.teardown.call(e, f, g.handle) === !1) && v.removeEvent(e, u, g.handle), delete h[u]);
            }
            v.isEmptyObject(h) && (delete g.handle, v.removeData(e, "events", !0));
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function (n, r, s, o) {
            if (!s || s.nodeType !== 3 && s.nodeType !== 8) {
                var u, a, f, l, c, h, p, d, m, g, y = n.type || n,
                    b = [];
                if (Y.test(y + v.event.triggered)) {
                    return;
                }
                y.indexOf("!") >= 0 && (y = y.slice(0, -1), a = !0), y.indexOf(".") >= 0 && (b = y.split("."), y = b.shift(), b.sort());
                if ((!s || v.event.customEvent[y]) && !v.event.global[y]) {
                    return;
                }
                n = typeof n == "object" ? n[v.expando] ? n : new v.Event(y, n) : new v.Event(y), n.type = y, n.isTrigger = !0, n.exclusive = a, n.namespace = b.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + b.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, h = y.indexOf(":") < 0 ? "on" + y : "";
                if (!s) {
                    u = v.cache;
                    for (f in u) {
                        u[f].events && u[f].events[y] && v.event.trigger(n, r, u[f].handle.elem, !0);
                    }
                    return;
                }
                n.result = t, n.target || (n.target = s), r = r != null ? v.makeArray(r) : [], r.unshift(n), p = v.event.special[y] || {};
                if (p.trigger && p.trigger.apply(s, r) === !1) {
                    return;
                }
                m = [
                    [s, p.bindType || y]
                ];
                if (!o && !p.noBubble && !v.isWindow(s)) {
                    g = p.delegateType || y, l = Y.test(g + y) ? s : s.parentNode;
                    for (c = s; l; l = l.parentNode) {
                        m.push([l, g]), c = l;
                    }
                    c === (s.ownerDocument || i) && m.push([c.defaultView || c.parentWindow || e, g]);
                }
                for (f = 0; f < m.length && !n.isPropagationStopped(); f++) {
                    l = m[f][0], n.type = m[f][1], d = (v._data(l, "events") || {})[n.type] && v._data(l, "handle"), d && d.apply(l, r), d = h && l[h], d && v.acceptData(l) && d.apply && d.apply(l, r) === !1 && n.preventDefault();
                }
                return n.type = y, !o && !n.isDefaultPrevented() && (!p._default || p._default.apply(s.ownerDocument, r) === !1) && (y !== "click" || !v.nodeName(s, "a")) && v.acceptData(s) && h && s[y] && (y !== "focus" && y !== "blur" || n.target.offsetWidth !== 0) && !v.isWindow(s) && (c = s[h], c && (s[h] = null), v.event.triggered = y, s[y](), v.event.triggered = t, c && (s[h] = c)), n.result;
            }
            return;
        },
        dispatch: function (n) {
            n = v.event.fix(n || e.event);
            var r, i, s, o, u, a, f, c, h, p, d = (v._data(this, "events") || {})[n.type] || [],
                m = d.delegateCount,
                g = l.call(arguments),
                y = !n.exclusive && !n.namespace,
                b = v.event.special[n.type] || {},
                w = [];
            g[0] = n, n.delegateTarget = this;
            if (b.preDispatch && b.preDispatch.call(this, n) === !1) {
                return;
            }
            if (m && (!n.button || n.type !== "click")) {
                for (s = n.target; s != this; s = s.parentNode || this) {
                    if (s.disabled !== !0 || n.type !== "click") {
                        u = {}, f = [];
                        for (r = 0; r < m; r++) {
                            c = d[r], h = c.selector, u[h] === t && (u[h] = c.needsContext ? v(h, this).index(s) >= 0 : v.find(h, this, null, [s]).length), u[h] && f.push(c);
                        }
                        f.length && w.push({
                            elem: s,
                            matches: f
                        });
                    }
                }
            }
            d.length > m && w.push({
                elem: this,
                matches: d.slice(m)
            });
            for (r = 0; r < w.length && !n.isPropagationStopped(); r++) {
                a = w[r], n.currentTarget = a.elem;
                for (i = 0; i < a.matches.length && !n.isImmediatePropagationStopped(); i++) {
                    c = a.matches[i];
                    if (y || !n.namespace && !c.namespace || n.namespace_re && n.namespace_re.test(c.namespace)) {
                        n.data = c.data, n.handleObj = c, o = ((v.event.special[c.origType] || {}).handle || c.handler).apply(a.elem, g), o !== t && (n.result = o, o === !1 && (n.preventDefault(), n.stopPropagation()));
                    }
                }
            }
            return b.postDispatch && b.postDispatch.call(this, n), n.result;
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function (e, t) {
                return e.which == null && (e.which = t.charCode != null ? t.charCode : t.keyCode), e;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (e, n) {
                var r, s, o, u = n.button,
                    a = n.fromElement;
                return e.pageX == null && n.clientX != null && (r = e.target.ownerDocument || i, s = r.documentElement, o = r.body, e.pageX = n.clientX + (s && s.scrollLeft || o && o.scrollLeft || 0) - (s && s.clientLeft || o && o.clientLeft || 0), e.pageY = n.clientY + (s && s.scrollTop || o && o.scrollTop || 0) - (s && s.clientTop || o && o.clientTop || 0)), !e.relatedTarget && a && (e.relatedTarget = a === e.target ? n.toElement : a), !e.which && u !== t && (e.which = u & 1 ? 1 : u & 2 ? 3 : u & 4 ? 2 : 0), e;
            }
        },
        fix: function (e) {
            if (e[v.expando]) {
                return e;
            }
            var t, n, r = e,
                s = v.event.fixHooks[e.type] || {},
                o = s.props ? this.props.concat(s.props) : this.props;
            e = v.Event(r);
            for (t = o.length; t;) {
                n = o[--t], e[n] = r[n];
            }
            return e.target || (e.target = r.srcElement || i), e.target.nodeType === 3 && (e.target = e.target.parentNode), e.metaKey = !! e.metaKey, s.filter ? s.filter(e, r) : e;
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function (e, t, n) {
                    v.isWindow(this) && (this.onbeforeunload = n);
                },
                teardown: function (e, t) {
                    this.onbeforeunload === t && (this.onbeforeunload = null);
                }
            }
        },
        simulate: function (e, t, n, r) {
            var i = v.extend(new v.Event, n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? v.event.trigger(i, null, t) : v.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault();
        }
    }, v.event.handle = v.event.dispatch, v.removeEvent = i.removeEventListener ?
    function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1);
    } : function (e, t, n) {
        var r = "on" + t;
        e.detachEvent && (typeof e[r] == "undefined" && (e[r] = null), e.detachEvent(r, n));
    }, v.Event = function (e, t) {
        if (!(this instanceof v.Event)) {
            return new v.Event(e, t);
        }
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? tt : et) : this.type = e, t && v.extend(this, t), this.timeStamp = e && e.timeStamp || v.now(), this[v.expando] = !0;
    }, v.Event.prototype = {
        preventDefault: function () {
            this.isDefaultPrevented = tt;
            var e = this.originalEvent;
            if (!e) {
                return;
            }
            e.preventDefault ? e.preventDefault() : e.returnValue = !1;
        },
        stopPropagation: function () {
            this.isPropagationStopped = tt;
            var e = this.originalEvent;
            if (!e) {
                return;
            }
            e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0;
        },
        stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = tt, this.stopPropagation();
        },
        isDefaultPrevented: et,
        isPropagationStopped: et,
        isImmediatePropagationStopped: et
    }, v.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function (e, t) {
        v.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function (e) {
                var n, r = this,
                    i = e.relatedTarget,
                    s = e.handleObj,
                    o = s.selector;
                if (!i || i !== r && !v.contains(r, i)) {
                    e.type = s.origType, n = s.handler.apply(this, arguments), e.type = t;
                }
                return n;
            }
        };
    }), v.support.submitBubbles || (v.event.special.submit = {
        setup: function () {
            if (v.nodeName(this, "form")) {
                return !1;
            }
            v.event.add(this, "click._submit keypress._submit", function (e) {
                var n = e.target,
                    r = v.nodeName(n, "input") || v.nodeName(n, "button") ? n.form : t;
                r && !v._data(r, "_submit_attached") && (v.event.add(r, "submit._submit", function (e) {
                    e._submit_bubble = !0;
                }), v._data(r, "_submit_attached", !0));
            });
        },
        postDispatch: function (e) {
            e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && v.event.simulate("submit", this.parentNode, e, !0));
        },
        teardown: function () {
            if (v.nodeName(this, "form")) {
                return !1;
            }
            v.event.remove(this, "._submit");
        }
    }), v.support.changeBubbles || (v.event.special.change = {
        setup: function () {
            if ($.test(this.nodeName)) {
                if (this.type === "checkbox" || this.type === "radio") {
                    v.event.add(this, "propertychange._change", function (e) {
                        e.originalEvent.propertyName === "checked" && (this._just_changed = !0);
                    }), v.event.add(this, "click._change", function (e) {
                        this._just_changed && !e.isTrigger && (this._just_changed = !1), v.event.simulate("change", this, e, !0);
                    });
                }
                return !1;
            }
            v.event.add(this, "beforeactivate._change", function (e) {
                var t = e.target;
                $.test(t.nodeName) && !v._data(t, "_change_attached") && (v.event.add(t, "change._change", function (e) {
                    this.parentNode && !e.isSimulated && !e.isTrigger && v.event.simulate("change", this.parentNode, e, !0);
                }), v._data(t, "_change_attached", !0));
            });
        },
        handle: function (e) {
            var t = e.target;
            if (this !== t || e.isSimulated || e.isTrigger || t.type !== "radio" && t.type !== "checkbox") {
                return e.handleObj.handler.apply(this, arguments);
            }
        },
        teardown: function () {
            return v.event.remove(this, "._change"), !$.test(this.nodeName);
        }
    }), v.support.focusinBubbles || v.each({
        focus: "focusin",
        blur: "focusout"
    }, function (e, t) {
        var n = 0,
            r = function (e) {
                v.event.simulate(t, e.target, v.event.fix(e), !0);
            };
        v.event.special[t] = {
            setup: function () {
                n++ === 0 && i.addEventListener(e, r, !0);
            },
            teardown: function () {
                --n === 0 && i.removeEventListener(e, r, !0);
            }
        };
    }), v.fn.extend({
        on: function (e, n, r, i, s) {
            var o, u;
            if (typeof e == "object") {
                typeof n != "string" && (r = r || n, n = t);
                for (u in e) {
                    this.on(u, n, r, e[u], s);
                }
                return this;
            }
            r == null && i == null ? (i = n, r = n = t) : i == null && (typeof n == "string" ? (i = r, r = t) : (i = r, r = n, n = t));
            if (i === !1) {
                i = et;
            } else {
                if (!i) {
                    return this;
                }
            }
            return s === 1 && (o = i, i = function (e) {
                return v().off(e), o.apply(this, arguments);
            }, i.guid = o.guid || (o.guid = v.guid++)), this.each(function () {
                v.event.add(this, e, i, r, n);
            });
        },
        one: function (e, t, n, r) {
            return this.on(e, t, n, r, 1);
        },
        off: function (e, n, r) {
            var i, s;
            if (e && e.preventDefault && e.handleObj) {
                return i = e.handleObj, v(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
            }
            if (typeof e == "object") {
                for (s in e) {
                    this.off(s, n, e[s]);
                }
                return this;
            }
            if (n === !1 || typeof n == "function") {
                r = n, n = t;
            }
            return r === !1 && (r = et), this.each(function () {
                v.event.remove(this, e, r, n);
            });
        },
        bind: function (e, t, n) {
            return this.on(e, null, t, n);
        },
        unbind: function (e, t) {
            return this.off(e, null, t);
        },
        live: function (e, t, n) {
            return v(this.context).on(e, this.selector, t, n), this;
        },
        die: function (e, t) {
            return v(this.context).off(e, this.selector || "**", t), this;
        },
        delegate: function (e, t, n, r) {
            return this.on(t, e, n, r);
        },
        undelegate: function (e, t, n) {
            return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n);
        },
        trigger: function (e, t) {
            return this.each(function () {
                v.event.trigger(e, t, this);
            });
        },
        triggerHandler: function (e, t) {
            if (this[0]) {
                return v.event.trigger(e, t, this[0], !0);
            }
        },
        toggle: function (e) {
            var t = arguments,
                n = e.guid || v.guid++,
                r = 0,
                i = function (n) {
                    var i = (v._data(this, "lastToggle" + e.guid) || 0) % r;
                    return v._data(this, "lastToggle" + e.guid, i + 1), n.preventDefault(), t[i].apply(this, arguments) || !1;
                };
            i.guid = n;
            while (r < t.length) {
                t[r++].guid = n;
            }
            return this.click(i);
        },
        hover: function (e, t) {
            return this.mouseenter(e).mouseleave(t || e);
        }
    }), v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
        v.fn[t] = function (e, n) {
            return n == null && (n = e, e = null), arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
        }, Q.test(t) && (v.event.fixHooks[t] = v.event.keyHooks), G.test(t) && (v.event.fixHooks[t] = v.event.mouseHooks);
    }), function (e, t) {
        function nt(e, t, n, r) {
            n = n || [], t = t || g;
            var i, s, a, f, l = t.nodeType;
            if (!e || typeof e != "string") {
                return n;
            }
            if (l !== 1 && l !== 9) {
                return [];
            }
            a = o(t);
            if (!a && !r) {
                if (i = R.exec(e)) {
                    if (f = i[1]) {
                        if (l === 9) {
                            s = t.getElementById(f);
                            if (!s || !s.parentNode) {
                                return n;
                            }
                            if (s.id === f) {
                                return n.push(s), n;
                            }
                        } else {
                            if (t.ownerDocument && (s = t.ownerDocument.getElementById(f)) && u(t, s) && s.id === f) {
                                return n.push(s), n;
                            }
                        }
                    } else {
                        if (i[2]) {
                            return S.apply(n, x.call(t.getElementsByTagName(e), 0)), n;
                        }
                        if ((f = i[3]) && Z && t.getElementsByClassName) {
                            return S.apply(n, x.call(t.getElementsByClassName(f), 0)), n;
                        }
                    }
                }
            }
            return vt(e.replace(j, "$1"), t, n, r, a);
        }
        function rt(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return n === "input" && t.type === e;
            };
        }
        function it(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return (n === "input" || n === "button") && t.type === e;
            };
        }
        function st(e) {
            return N(function (t) {
                return t = +t, N(function (n, r) {
                    var i, s = e([], n.length, t),
                        o = s.length;
                    while (o--) {
                        n[i = s[o]] && (n[i] = !(r[i] = n[i]));
                    }
                });
            });
        }
        function ot(e, t, n) {
            if (e === t) {
                return n;
            }
            var r = e.nextSibling;
            while (r) {
                if (r === t) {
                    return -1;
                }
                r = r.nextSibling;
            }
            return 1;
        }
        function ut(e, t) {
            var n, r, s, o, u, a, f, l = L[d][e + " "];
            if (l) {
                return t ? 0 : l.slice(0);
            }
            u = e, a = [], f = i.preFilter;
            while (u) {
                if (!n || (r = F.exec(u))) {
                    r && (u = u.slice(r[0].length) || u), a.push(s = []);
                }
                n = !1;
                if (r = I.exec(u)) {
                    s.push(n = new m(r.shift())), u = u.slice(n.length), n.type = r[0].replace(j, " ");
                }
                for (o in i.filter) {
                    (r = J[o].exec(u)) && (!f[o] || (r = f[o](r))) && (s.push(n = new m(r.shift())), u = u.slice(n.length), n.type = o, n.matches = r);
                }
                if (!n) {
                    break;
                }
            }
            return t ? u.length : u ? nt.error(e) : L(e, a).slice(0);
        }
        function at(e, t, r) {
            var i = t.dir,
                s = r && t.dir === "parentNode",
                o = w++;
            return t.first ?
            function (t, n, r) {
                while (t = t[i]) {
                    if (s || t.nodeType === 1) {
                        return e(t, n, r);
                    }
                }
            } : function (t, r, u) {
                if (!u) {
                    var a, f = b + " " + o + " ",
                        l = f + n;
                    while (t = t[i]) {
                        if (s || t.nodeType === 1) {
                            if ((a = t[d]) === l) {
                                return t.sizset;
                            }
                            if (typeof a == "string" && a.indexOf(f) === 0) {
                                if (t.sizset) {
                                    return t;
                                }
                            } else {
                                t[d] = l;
                                if (e(t, r, u)) {
                                    return t.sizset = !0, t;
                                }
                                t.sizset = !1;
                            }
                        }
                    }
                } else {
                    while (t = t[i]) {
                        if (s || t.nodeType === 1) {
                            if (e(t, r, u)) {
                                return t;
                            }
                        }
                    }
                }
            };
        }
        function ft(e) {
            return e.length > 1 ?
            function (t, n, r) {
                var i = e.length;
                while (i--) {
                    if (!e[i](t, n, r)) {
                        return !1;
                    }
                }
                return !0;
            } : e[0];
        }
        function lt(e, t, n, r, i) {
            var s, o = [],
                u = 0,
                a = e.length,
                f = t != null;
            for (; u < a; u++) {
                if (s = e[u]) {
                    if (!n || n(s, r, i)) {
                        o.push(s), f && t.push(u);
                    }
                }
            }
            return o;
        }
        function ct(e, t, n, r, i, s) {
            return r && !r[d] && (r = ct(r)), i && !i[d] && (i = ct(i, s)), N(function (s, o, u, a) {
                var f, l, c, h = [],
                    p = [],
                    d = o.length,
                    v = s || dt(t || "*", u.nodeType ? [u] : u, []),
                    m = e && (s || !t) ? lt(v, h, e, u, a) : v,
                    g = n ? i || (s ? e : d || r) ? [] : o : m;
                n && n(m, g, u, a);
                if (r) {
                    f = lt(g, p), r(f, [], u, a), l = f.length;
                    while (l--) {
                        if (c = f[l]) {
                            g[p[l]] = !(m[p[l]] = c);
                        }
                    }
                }
                if (s) {
                    if (i || e) {
                        if (i) {
                            f = [], l = g.length;
                            while (l--) {
                                (c = g[l]) && f.push(m[l] = c);
                            }
                            i(null, g = [], f, a);
                        }
                        l = g.length;
                        while (l--) {
                            (c = g[l]) && (f = i ? T.call(s, c) : h[l]) > -1 && (s[f] = !(o[f] = c));
                        }
                    }
                } else {
                    g = lt(g === o ? g.splice(d, g.length) : g), i ? i(null, o, g, a) : S.apply(o, g);
                }
            });
        }
        function ht(e) {
            var t, n, r, s = e.length,
                o = i.relative[e[0].type],
                u = o || i.relative[" "],
                a = o ? 1 : 0,
                f = at(function (e) {
                    return e === t;
                }, u, !0),
                l = at(function (e) {
                    return T.call(t, e) > -1;
                }, u, !0),
                h = [function (e, n, r) {
                    return !o && (r || n !== c) || ((t = n).nodeType ? f(e, n, r) : l(e, n, r));
                }];
            for (; a < s; a++) {
                if (n = i.relative[e[a].type]) {
                    h = [at(ft(h), n)];
                } else {
                    n = i.filter[e[a].type].apply(null, e[a].matches);
                    if (n[d]) {
                        r = ++a;
                        for (; r < s; r++) {
                            if (i.relative[e[r].type]) {
                                break;
                            }
                        }
                        return ct(a > 1 && ft(h), a > 1 && e.slice(0, a - 1).join("").replace(j, "$1"), n, a < r && ht(e.slice(a, r)), r < s && ht(e = e.slice(r)), r < s && e.join(""));
                    }
                    h.push(n);
                }
            }
            return ft(h);
        }
        function pt(e, t) {
            var r = t.length > 0,
                s = e.length > 0,
                o = function (u, a, f, l, h) {
                    var p, d, v, m = [],
                        y = 0,
                        w = "0",
                        x = u && [],
                        T = h != null,
                        N = c,
                        C = u || s && i.find.TAG("*", h && a.parentNode || a),
                        k = b += N == null ? 1 : Math.E;
                    T && (c = a !== g && a, n = o.el);
                    for (;
                    (p = C[w]) != null; w++) {
                        if (s && p) {
                            for (d = 0; v = e[d]; d++) {
                                if (v(p, a, f)) {
                                    l.push(p);
                                    break;
                                }
                            }
                            T && (b = k, n = ++o.el);
                        }
                        r && ((p = !v && p) && y--, u && x.push(p));
                    }
                    y += w;
                    if (r && w !== y) {
                        for (d = 0; v = t[d]; d++) {
                            v(x, m, a, f);
                        }
                        if (u) {
                            if (y > 0) {
                                while (w--) {
                                    !x[w] && !m[w] && (m[w] = E.call(l));
                                }
                            }
                            m = lt(m);
                        }
                        S.apply(l, m), T && !u && m.length > 0 && y + t.length > 1 && nt.uniqueSort(l);
                    }
                    return T && (b = k, c = N), x;
                };
            return o.el = 0, r ? N(o) : o;
        }
        function dt(e, t, n) {
            var r = 0,
                i = t.length;
            for (; r < i; r++) {
                nt(e, t[r], n);
            }
            return n;
        }
        function vt(e, t, n, r, s) {
            var o, u, f, l, c, h = ut(e),
                p = h.length;
            if (!r && h.length === 1) {
                u = h[0] = h[0].slice(0);
                if (u.length > 2 && (f = u[0]).type === "ID" && t.nodeType === 9 && !s && i.relative[u[1].type]) {
                    t = i.find.ID(f.matches[0].replace($, ""), t, s)[0];
                    if (!t) {
                        return n;
                    }
                    e = e.slice(u.shift().length);
                }
                for (o = J.POS.test(e) ? -1 : u.length - 1; o >= 0; o--) {
                    f = u[o];
                    if (i.relative[l = f.type]) {
                        break;
                    }
                    if (c = i.find[l]) {
                        if (r = c(f.matches[0].replace($, ""), z.test(u[0].type) && t.parentNode || t, s)) {
                            u.splice(o, 1), e = r.length && u.join("");
                            if (!e) {
                                return S.apply(n, x.call(r, 0)), n;
                            }
                            break;
                        }
                    }
                }
            }
            return a(e, h)(r, t, s, n, z.test(e)), n;
        }
        function mt() {}
        var n, r, i, s, o, u, a, f, l, c, h = !0,
            p = "undefined",
            d = ("sizcache" + Math.random()).replace(".", ""),
            m = String,
            g = e.document,
            y = g.documentElement,
            b = 0,
            w = 0,
            E = [].pop,
            S = [].push,
            x = [].slice,
            T = [].indexOf ||
        function (e) {
            var t = 0,
                n = this.length;
            for (; t < n; t++) {
                if (this[t] === e) {
                    return t;
                }
            }
            return -1;
        }, N = function (e, t) {
            return e[d] = t == null || t, e;
        }, C = function () {
            var e = {},
                t = [];
            return N(function (n, r) {
                return t.push(n) > i.cacheLength && delete e[t.shift()], e[n + " "] = r;
            }, e);
        }, k = C(), L = C(), A = C(), O = "[\\x20\\t\\r\\n\\f]", M = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+", _ = M.replace("w", "w#"), D = "([*^$|!~]?=)", P = "\\[" + O + "*(" + M + ")" + O + "*(?:" + D + O + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + _ + ")|)|)" + O + "*\\]", H = ":(" + M + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + P + ")|[^:]|\\\\.)*|.*))\\)|)", B = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + O + "*((?:-\\d)?\\d*)" + O + "*\\)|)(?=[^-]|$)", j = new RegExp("^" + O + "+|((?:^|[^\\\\])(?:\\\\.)*)" + O + "+$", "g"), F = new RegExp("^" + O + "*," + O + "*"), I = new RegExp("^" + O + "*([\\x20\\t\\r\\n\\f>+~])" + O + "*"), q = new RegExp(H), R = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, U = /^:not/, z = /[\x20\t\r\n\f]*[+~]/, W = /:not\($/, X = /h\d/i, V = /input|select|textarea|button/i, $ = /\\(?!\\)/g, J = {
            ID: new RegExp("^#(" + M + ")"),
            CLASS: new RegExp("^\\.(" + M + ")"),
            NAME: new RegExp("^\\[name=['\"]?(" + M + ")['\"]?\\]"),
            TAG: new RegExp("^(" + M.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + P),
            PSEUDO: new RegExp("^" + H),
            POS: new RegExp(B, "i"),
            CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + O + "*(even|odd|(([+-]|)(\\d*)n|)" + O + "*(?:([+-]|)" + O + "*(\\d+)|))" + O + "*\\)|)", "i"),
            needsContext: new RegExp("^" + O + "*[>+~]|" + B, "i")
        }, K = function (e) {
            var t = g.createElement("div");
            try {
                return e(t);
            } catch (n) {
                return !1;
            } finally {
                t = null;
            }
        }, Q = K(function (e) {
            return e.appendChild(g.createComment("")), !e.getElementsByTagName("*").length;
        }), G = K(function (e) {
            return e.innerHTML = "<a href='#'></a>", e.firstChild && typeof e.firstChild.getAttribute !== p && e.firstChild.getAttribute("href") === "#";
        }), Y = K(function (e) {
            e.innerHTML = "<select></select>";
            var t = typeof e.lastChild.getAttribute("multiple");
            return t !== "boolean" && t !== "string";
        }), Z = K(function (e) {
            return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !e.getElementsByClassName || !e.getElementsByClassName("e").length ? !1 : (e.lastChild.className = "e", e.getElementsByClassName("e").length === 2);
        }), et = K(function (e) {
            e.id = d + 0, e.innerHTML = "<a name='" + d + "'></a><div name='" + d + "'></div>", y.insertBefore(e, y.firstChild);
            var t = g.getElementsByName && g.getElementsByName(d).length === 2 + g.getElementsByName(d + 0).length;
            return r = !g.getElementById(d), y.removeChild(e), t;
        });
        try {
            x.call(y.childNodes, 0)[0].nodeType;
        } catch (tt) {
            x = function (e) {
                var t, n = [];
                for (; t = this[e]; e++) {
                    n.push(t);
                }
                return n;
            };
        }
        nt.matches = function (e, t) {
            return nt(e, null, null, t);
        }, nt.matchesSelector = function (e, t) {
            return nt(t, null, null, [e]).length > 0;
        }, s = nt.getText = function (e) {
            var t, n = "",
                r = 0,
                i = e.nodeType;
            if (i) {
                if (i === 1 || i === 9 || i === 11) {
                    if (typeof e.textContent == "string") {
                        return e.textContent;
                    }
                    for (e = e.firstChild; e; e = e.nextSibling) {
                        n += s(e);
                    }
                } else {
                    if (i === 3 || i === 4) {
                        return e.nodeValue;
                    }
                }
            } else {
                for (; t = e[r]; r++) {
                    n += s(t);
                }
            }
            return n;
        }, o = nt.isXML = function (e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? t.nodeName !== "HTML" : !1;
        }, u = nt.contains = y.contains ?
        function (e, t) {
            var n = e.nodeType === 9 ? e.documentElement : e,
                r = t && t.parentNode;
            return e === r || !! (r && r.nodeType === 1 && n.contains && n.contains(r));
        } : y.compareDocumentPosition ?
        function (e, t) {
            return t && !! (e.compareDocumentPosition(t) & 16);
        } : function (e, t) {
            while (t = t.parentNode) {
                if (t === e) {
                    return !0;
                }
            }
            return !1;
        }, nt.attr = function (e, t) {
            var n, r = o(e);
            return r || (t = t.toLowerCase()), (n = i.attrHandle[t]) ? n(e) : r || Y ? e.getAttribute(t) : (n = e.getAttributeNode(t), n ? typeof e[t] == "boolean" ? e[t] ? t : null : n.specified ? n.value : null : null);
        }, i = nt.selectors = {
            cacheLength: 50,
            createPseudo: N,
            match: J,
            attrHandle: G ? {} : {
                href: function (e) {
                    return e.getAttribute("href", 2);
                },
                type: function (e) {
                    return e.getAttribute("type");
                }
            },
            find: {
                ID: r ?
                function (e, t, n) {
                    if (typeof t.getElementById !== p && !n) {
                        var r = t.getElementById(e);
                        return r && r.parentNode ? [r] : [];
                    }
                } : function (e, n, r) {
                    if (typeof n.getElementById !== p && !r) {
                        var i = n.getElementById(e);
                        return i ? i.id === e || typeof i.getAttributeNode !== p && i.getAttributeNode("id").value === e ? [i] : t : [];
                    }
                },
                TAG: Q ?
                function (e, t) {
                    if (typeof t.getElementsByTagName !== p) {
                        return t.getElementsByTagName(e);
                    }
                } : function (e, t) {
                    var n = t.getElementsByTagName(e);
                    if (e === "*") {
                        var r, i = [],
                            s = 0;
                        for (; r = n[s]; s++) {
                            r.nodeType === 1 && i.push(r);
                        }
                        return i;
                    }
                    return n;
                },
                NAME: et &&
                function (e, t) {
                    if (typeof t.getElementsByName !== p) {
                        return t.getElementsByName(name);
                    }
                },
                CLASS: Z &&
                function (e, t, n) {
                    if (typeof t.getElementsByClassName !== p && !n) {
                        return t.getElementsByClassName(e);
                    }
                }
            },
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function (e) {
                    return e[1] = e[1].replace($, ""), e[3] = (e[4] || e[5] || "").replace($, ""), e[2] === "~=" && (e[3] = " " + e[3] + " "), e.slice(0, 4);
                },
                CHILD: function (e) {
                    return e[1] = e[1].toLowerCase(), e[1] === "nth" ? (e[2] || nt.error(e[0]), e[3] = +(e[3] ? e[4] + (e[5] || 1) : 2 * (e[2] === "even" || e[2] === "odd")), e[4] = +(e[6] + e[7] || e[2] === "odd")) : e[2] && nt.error(e[0]), e;
                },
                PSEUDO: function (e) {
                    var t, n;
                    if (J.CHILD.test(e[0])) {
                        return null;
                    }
                    if (e[3]) {
                        e[2] = e[3];
                    } else {
                        if (t = e[4]) {
                            q.test(t) && (n = ut(t, !0)) && (n = t.indexOf(")", t.length - n) - t.length) && (t = t.slice(0, n), e[0] = e[0].slice(0, n)), e[2] = t;
                        }
                    }
                    return e.slice(0, 3);
                }
            },
            filter: {
                ID: r ?
                function (e) {
                    return e = e.replace($, ""), function (t) {
                        return t.getAttribute("id") === e;
                    };
                } : function (e) {
                    return e = e.replace($, ""), function (t) {
                        var n = typeof t.getAttributeNode !== p && t.getAttributeNode("id");
                        return n && n.value === e;
                    };
                },
                TAG: function (e) {
                    return e === "*" ?
                    function () {
                        return !0;
                    } : (e = e.replace($, "").toLowerCase(), function (t) {
                        return t.nodeName && t.nodeName.toLowerCase() === e;
                    });
                },
                CLASS: function (e) {
                    var t = k[d][e + " "];
                    return t || (t = new RegExp("(^|" + O + ")" + e + "(" + O + "|$)")) && k(e, function (e) {
                        return t.test(e.className || typeof e.getAttribute !== p && e.getAttribute("class") || "");
                    });
                },
                ATTR: function (e, t, n) {
                    return function (r, i) {
                        var s = nt.attr(r, e);
                        return s == null ? t === "!=" : t ? (s += "", t === "=" ? s === n : t === "!=" ? s !== n : t === "^=" ? n && s.indexOf(n) === 0 : t === "*=" ? n && s.indexOf(n) > -1 : t === "$=" ? n && s.substr(s.length - n.length) === n : t === "~=" ? (" " + s + " ").indexOf(n) > -1 : t === "|=" ? s === n || s.substr(0, n.length + 1) === n + "-" : !1) : !0;
                    };
                },
                CHILD: function (e, t, n, r) {
                    return e === "nth" ?
                    function (e) {
                        var t, i, s = e.parentNode;
                        if (n === 1 && r === 0) {
                            return !0;
                        }
                        if (s) {
                            i = 0;
                            for (t = s.firstChild; t; t = t.nextSibling) {
                                if (t.nodeType === 1) {
                                    i++;
                                    if (e === t) {
                                        break;
                                    }
                                }
                            }
                        }
                        return i -= r, i === n || i % n === 0 && i / n >= 0;
                    } : function (t) {
                        var n = t;
                        switch (e) {
                        case "only":
                        case "first":
                            while (n = n.previousSibling) {
                                if (n.nodeType === 1) {
                                    return !1;
                                }
                            }
                            if (e === "first") {
                                return !0;
                            }
                            n = t;
                        case "last":
                            while (n = n.nextSibling) {
                                if (n.nodeType === 1) {
                                    return !1;
                                }
                            }
                            return !0;
                        }
                    };
                },
                PSEUDO: function (e, t) {
                    var n, r = i.pseudos[e] || i.setFilters[e.toLowerCase()] || nt.error("unsupported pseudo: " + e);
                    return r[d] ? r(t) : r.length > 1 ? (n = [e, e, "", t], i.setFilters.hasOwnProperty(e.toLowerCase()) ? N(function (e, n) {
                        var i, s = r(e, t),
                            o = s.length;
                        while (o--) {
                            i = T.call(e, s[o]), e[i] = !(n[i] = s[o]);
                        }
                    }) : function (e) {
                        return r(e, 0, n);
                    }) : r;
                }
            },
            pseudos: {
                not: N(function (e) {
                    var t = [],
                        n = [],
                        r = a(e.replace(j, "$1"));
                    return r[d] ? N(function (e, t, n, i) {
                        var s, o = r(e, null, i, []),
                            u = e.length;
                        while (u--) {
                            if (s = o[u]) {
                                e[u] = !(t[u] = s);
                            }
                        }
                    }) : function (e, i, s) {
                        return t[0] = e, r(t, null, s, n), !n.pop();
                    };
                }),
                has: N(function (e) {
                    return function (t) {
                        return nt(e, t).length > 0;
                    };
                }),
                contains: N(function (e) {
                    return function (t) {
                        return (t.textContent || t.innerText || s(t)).indexOf(e) > -1;
                    };
                }),
                enabled: function (e) {
                    return e.disabled === !1;
                },
                disabled: function (e) {
                    return e.disabled === !0;
                },
                checked: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return t === "input" && !! e.checked || t === "option" && !! e.selected;
                },
                selected: function (e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0;
                },
                parent: function (e) {
                    return !i.pseudos.empty(e);
                },
                empty: function (e) {
                    var t;
                    e = e.firstChild;
                    while (e) {
                        if (e.nodeName > "@" || (t = e.nodeType) === 3 || t === 4) {
                            return !1;
                        }
                        e = e.nextSibling;
                    }
                    return !0;
                },
                header: function (e) {
                    return X.test(e.nodeName);
                },
                text: function (e) {
                    var t, n;
                    return e.nodeName.toLowerCase() === "input" && (t = e.type) === "text" && ((n = e.getAttribute("type")) == null || n.toLowerCase() === t);
                },
                radio: rt("radio"),
                checkbox: rt("checkbox"),
                file: rt("file"),
                password: rt("password"),
                image: rt("image"),
                submit: it("submit"),
                reset: it("reset"),
                button: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return t === "input" && e.type === "button" || t === "button";
                },
                input: function (e) {
                    return V.test(e.nodeName);
                },
                focus: function (e) {
                    var t = e.ownerDocument;
                    return e === t.activeElement && (!t.hasFocus || t.hasFocus()) && !! (e.type || e.href || ~e.tabIndex);
                },
                active: function (e) {
                    return e === e.ownerDocument.activeElement;
                },
                first: st(function () {
                    return [0];
                }),
                last: st(function (e, t) {
                    return [t - 1];
                }),
                eq: st(function (e, t, n) {
                    return [n < 0 ? n + t : n];
                }),
                even: st(function (e, t) {
                    for (var n = 0; n < t; n += 2) {
                        e.push(n);
                    }
                    return e;
                }),
                odd: st(function (e, t) {
                    for (var n = 1; n < t; n += 2) {
                        e.push(n);
                    }
                    return e;
                }),
                lt: st(function (e, t, n) {
                    for (var r = n < 0 ? n + t : n; --r >= 0;) {
                        e.push(r);
                    }
                    return e;
                }),
                gt: st(function (e, t, n) {
                    for (var r = n < 0 ? n + t : n; ++r < t;) {
                        e.push(r);
                    }
                    return e;
                })
            }
        }, f = y.compareDocumentPosition ?
        function (e, t) {
            return e === t ? (l = !0, 0) : (!e.compareDocumentPosition || !t.compareDocumentPosition ? e.compareDocumentPosition : e.compareDocumentPosition(t) & 4) ? -1 : 1;
        } : function (e, t) {
            if (e === t) {
                return l = !0, 0;
            }
            if (e.sourceIndex && t.sourceIndex) {
                return e.sourceIndex - t.sourceIndex;
            }
            var n, r, i = [],
                s = [],
                o = e.parentNode,
                u = t.parentNode,
                a = o;
            if (o === u) {
                return ot(e, t);
            }
            if (!o) {
                return -1;
            }
            if (!u) {
                return 1;
            }
            while (a) {
                i.unshift(a), a = a.parentNode;
            }
            a = u;
            while (a) {
                s.unshift(a), a = a.parentNode;
            }
            n = i.length, r = s.length;
            for (var f = 0; f < n && f < r; f++) {
                if (i[f] !== s[f]) {
                    return ot(i[f], s[f]);
                }
            }
            return f === n ? ot(e, s[f], -1) : ot(i[f], t, 1);
        }, [0, 0].sort(f), h = !l, nt.uniqueSort = function (e) {
            var t, n = [],
                r = 1,
                i = 0;
            l = h, e.sort(f);
            if (l) {
                for (; t = e[r]; r++) {
                    t === e[r - 1] && (i = n.push(r));
                }
                while (i--) {
                    e.splice(n[i], 1);
                }
            }
            return e;
        }, nt.error = function (e) {
            throw new Error("Syntax error, unrecognized expression: " + e);
        }, a = nt.compile = function (e, t) {
            var n, r = [],
                i = [],
                s = A[d][e + " "];
            if (!s) {
                t || (t = ut(e)), n = t.length;
                while (n--) {
                    s = ht(t[n]), s[d] ? r.push(s) : i.push(s);
                }
                s = A(e, pt(i, r));
            }
            return s;
        }, g.querySelectorAll &&
        function () {
            var e, t = vt,
                n = /'|\\/g,
                r = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
                i = [":focus"],
                s = [":active"],
                u = y.matchesSelector || y.mozMatchesSelector || y.webkitMatchesSelector || y.oMatchesSelector || y.msMatchesSelector;
            K(function (e) {
                e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || i.push("\\[" + O + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), e.querySelectorAll(":checked").length || i.push(":checked");
            }), K(function (e) {
                e.innerHTML = "<p test=''></p>", e.querySelectorAll("[test^='']").length && i.push("[*^$]=" + O + "*(?:\"\"|'')"), e.innerHTML = "<input type='hidden'/>", e.querySelectorAll(":enabled").length || i.push(":enabled", ":disabled");
            }), i = new RegExp(i.join("|")), vt = function (e, r, s, o, u) {
                if (!o && !u && !i.test(e)) {
                    var a, f, l = !0,
                        c = d,
                        h = r,
                        p = r.nodeType === 9 && e;
                    if (r.nodeType === 1 && r.nodeName.toLowerCase() !== "object") {
                        a = ut(e), (l = r.getAttribute("id")) ? c = l.replace(n, "\\$&") : r.setAttribute("id", c), c = "[id='" + c + "'] ", f = a.length;
                        while (f--) {
                            a[f] = c + a[f].join("");
                        }
                        h = z.test(e) && r.parentNode || r, p = a.join(",");
                    }
                    if (p) {
                        try {
                            return S.apply(s, x.call(h.querySelectorAll(p), 0)), s;
                        } catch (v) {} finally {
                            l || r.removeAttribute("id");
                        }
                    }
                }
                return t(e, r, s, o, u);
            }, u && (K(function (t) {
                e = u.call(t, "div");
                try {
                    u.call(t, "[test!='']:sizzle"), s.push("!=", H);
                } catch (n) {}
            }), s = new RegExp(s.join("|")), nt.matchesSelector = function (t, n) {
                n = n.replace(r, "='$1']");
                if (!o(t) && !s.test(n) && !i.test(n)) {
                    try {
                        var a = u.call(t, n);
                        if (a || e || t.document && t.document.nodeType !== 11) {
                            return a;
                        }
                    } catch (f) {}
                }
                return nt(n, null, null, [t]).length > 0;
            });
        }(), i.pseudos.nth = i.pseudos.eq, i.filters = mt.prototype = i.pseudos, i.setFilters = new mt, nt.attr = v.attr, v.find = nt, v.expr = nt.selectors, v.expr[":"] = v.expr.pseudos, v.unique = nt.uniqueSort, v.text = nt.getText, v.isXMLDoc = nt.isXML, v.contains = nt.contains;
    }(e);
    var nt = /Until$/,
        rt = /^(?:parents|prev(?:Until|All))/,
        it = /^.[^:#\[\.,]*$/,
        st = v.expr.match.needsContext,
        ot = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    v.fn.extend({
        find: function (e) {
            var t, n, r, i, s, o, u = this;
            if (typeof e != "string") {
                return v(e).filter(function () {
                    for (t = 0, n = u.length; t < n; t++) {
                        if (v.contains(u[t], this)) {
                            return !0;
                        }
                    }
                });
            }
            o = this.pushStack("", "find", e);
            for (t = 0, n = this.length; t < n; t++) {
                r = o.length, v.find(e, this[t], o);
                if (t > 0) {
                    for (i = r; i < o.length; i++) {
                        for (s = 0; s < r; s++) {
                            if (o[s] === o[i]) {
                                o.splice(i--, 1);
                                break;
                            }
                        }
                    }
                }
            }
            return o;
        },
        has: function (e) {
            var t, n = v(e, this),
                r = n.length;
            return this.filter(function () {
                for (t = 0; t < r; t++) {
                    if (v.contains(this, n[t])) {
                        return !0;
                    }
                }
            });
        },
        not: function (e) {
            return this.pushStack(ft(this, e, !1), "not", e);
        },
        filter: function (e) {
            return this.pushStack(ft(this, e, !0), "filter", e);
        },
        is: function (e) {
            return !!e && (typeof e == "string" ? st.test(e) ? v(e, this.context).index(this[0]) >= 0 : v.filter(e, this).length > 0 : this.filter(e).length > 0);
        },
        closest: function (e, t) {
            var n, r = 0,
                i = this.length,
                s = [],
                o = st.test(e) || typeof e != "string" ? v(e, t || this.context) : 0;
            for (; r < i; r++) {
                n = this[r];
                while (n && n.ownerDocument && n !== t && n.nodeType !== 11) {
                    if (o ? o.index(n) > -1 : v.find.matchesSelector(n, e)) {
                        s.push(n);
                        break;
                    }
                    n = n.parentNode;
                }
            }
            return s = s.length > 1 ? v.unique(s) : s, this.pushStack(s, "closest", e);
        },
        index: function (e) {
            return e ? typeof e == "string" ? v.inArray(this[0], v(e)) : v.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1;
        },
        add: function (e, t) {
            var n = typeof e == "string" ? v(e, t) : v.makeArray(e && e.nodeType ? [e] : e),
                r = v.merge(this.get(), n);
            return this.pushStack(ut(n[0]) || ut(r[0]) ? r : v.unique(r));
        },
        addBack: function (e) {
            return this.add(e == null ? this.prevObject : this.prevObject.filter(e));
        }
    }), v.fn.andSelf = v.fn.addBack, v.each({
        parent: function (e) {
            var t = e.parentNode;
            return t && t.nodeType !== 11 ? t : null;
        },
        parents: function (e) {
            return v.dir(e, "parentNode");
        },
        parentsUntil: function (e, t, n) {
            return v.dir(e, "parentNode", n);
        },
        next: function (e) {
            return at(e, "nextSibling");
        },
        prev: function (e) {
            return at(e, "previousSibling");
        },
        nextAll: function (e) {
            return v.dir(e, "nextSibling");
        },
        prevAll: function (e) {
            return v.dir(e, "previousSibling");
        },
        nextUntil: function (e, t, n) {
            return v.dir(e, "nextSibling", n);
        },
        prevUntil: function (e, t, n) {
            return v.dir(e, "previousSibling", n);
        },
        siblings: function (e) {
            return v.sibling((e.parentNode || {}).firstChild, e);
        },
        children: function (e) {
            return v.sibling(e.firstChild);
        },
        contents: function (e) {
            return v.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : v.merge([], e.childNodes);
        }
    }, function (e, t) {
        v.fn[e] = function (n, r) {
            var i = v.map(this, t, n);
            return nt.test(e) || (r = n), r && typeof r == "string" && (i = v.filter(r, i)), i = this.length > 1 && !ot[e] ? v.unique(i) : i, this.length > 1 && rt.test(e) && (i = i.reverse()), this.pushStack(i, e, l.call(arguments).join(","));
        };
    }), v.extend({
        filter: function (e, t, n) {
            return n && (e = ":not(" + e + ")"), t.length === 1 ? v.find.matchesSelector(t[0], e) ? [t[0]] : [] : v.find.matches(e, t);
        },
        dir: function (e, n, r) {
            var i = [],
                s = e[n];
            while (s && s.nodeType !== 9 && (r === t || s.nodeType !== 1 || !v(s).is(r))) {
                s.nodeType === 1 && i.push(s), s = s[n];
            }
            return i;
        },
        sibling: function (e, t) {
            var n = [];
            for (; e; e = e.nextSibling) {
                e.nodeType === 1 && e !== t && n.push(e);
            }
            return n;
        }
    });
    var ct = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        ht = / jQuery\d+="(?:null|\d+)"/g,
        pt = /^\s+/,
        dt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        vt = /<([\w:]+)/,
        mt = /<tbody/i,
        gt = /<|&#?\w+;/,
        yt = /<(?:script|style|link)/i,
        bt = /<(?:script|object|embed|option|style)/i,
        wt = new RegExp("<(?:" + ct + ")[\\s/>]", "i"),
        Et = /^(?:checkbox|radio)$/,
        St = /checked\s*(?:[^=]|=\s*.checked.)/i,
        xt = /\/(java|ecma)script/i,
        Tt = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
        Nt = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        },
        Ct = lt(i),
        kt = Ct.appendChild(i.createElement("div"));
    Nt.optgroup = Nt.option, Nt.tbody = Nt.tfoot = Nt.colgroup = Nt.caption = Nt.thead, Nt.th = Nt.td, v.support.htmlSerialize || (Nt._default = [1, "X<div>", "</div>"]), v.fn.extend({
        text: function (e) {
            return v.access(this, function (e) {
                return e === t ? v.text(this) : this.empty().append((this[0] && this[0].ownerDocument || i).createTextNode(e));
            }, null, e, arguments.length);
        },
        wrapAll: function (e) {
            if (v.isFunction(e)) {
                return this.each(function (t) {
                    v(this).wrapAll(e.call(this, t));
                });
            }
            if (this[0]) {
                var t = v(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                    var e = this;
                    while (e.firstChild && e.firstChild.nodeType === 1) {
                        e = e.firstChild;
                    }
                    return e;
                }).append(this);
            }
            return this;
        },
        wrapInner: function (e) {
            return v.isFunction(e) ? this.each(function (t) {
                v(this).wrapInner(e.call(this, t));
            }) : this.each(function () {
                var t = v(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e);
            });
        },
        wrap: function (e) {
            var t = v.isFunction(e);
            return this.each(function (n) {
                v(this).wrapAll(t ? e.call(this, n) : e);
            });
        },
        unwrap: function () {
            return this.parent().each(function () {
                v.nodeName(this, "body") || v(this).replaceWith(this.childNodes);
            }).end();
        },
        append: function () {
            return this.domManip(arguments, !0, function (e) {
                (this.nodeType === 1 || this.nodeType === 11) && this.appendChild(e);
            });
        },
        prepend: function () {
            return this.domManip(arguments, !0, function (e) {
                (this.nodeType === 1 || this.nodeType === 11) && this.insertBefore(e, this.firstChild);
            });
        },
        before: function () {
            if (!ut(this[0])) {
                return this.domManip(arguments, !1, function (e) {
                    this.parentNode.insertBefore(e, this);
                });
            }
            if (arguments.length) {
                var e = v.clean(arguments);
                return this.pushStack(v.merge(e, this), "before", this.selector);
            }
        },
        after: function () {
            if (!ut(this[0])) {
                return this.domManip(arguments, !1, function (e) {
                    this.parentNode.insertBefore(e, this.nextSibling);
                });
            }
            if (arguments.length) {
                var e = v.clean(arguments);
                return this.pushStack(v.merge(this, e), "after", this.selector);
            }
        },
        remove: function (e, t) {
            var n, r = 0;
            for (;
            (n = this[r]) != null; r++) {
                if (!e || v.filter(e, [n]).length) {
                    !t && n.nodeType === 1 && (v.cleanData(n.getElementsByTagName("*")), v.cleanData([n])), n.parentNode && n.parentNode.removeChild(n);
                }
            }
            return this;
        },
        empty: function () {
            var e, t = 0;
            for (;
            (e = this[t]) != null; t++) {
                e.nodeType === 1 && v.cleanData(e.getElementsByTagName("*"));
                while (e.firstChild) {
                    e.removeChild(e.firstChild);
                }
            }
            return this;
        },
        clone: function (e, t) {
            return e = e == null ? !1 : e, t = t == null ? e : t, this.map(function () {
                return v.clone(this, e, t);
            });
        },
        html: function (e) {
            return v.access(this, function (e) {
                var n = this[0] || {},
                    r = 0,
                    i = this.length;
                if (e === t) {
                    return n.nodeType === 1 ? n.innerHTML.replace(ht, "") : t;
                }
                if (typeof e == "string" && !yt.test(e) && (v.support.htmlSerialize || !wt.test(e)) && (v.support.leadingWhitespace || !pt.test(e)) && !Nt[(vt.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = e.replace(dt, "<$1></$2>");
                    try {
                        for (; r < i; r++) {
                            n = this[r] || {}, n.nodeType === 1 && (v.cleanData(n.getElementsByTagName("*")), n.innerHTML = e);
                        }
                        n = 0;
                    } catch (s) {}
                }
                n && this.empty().append(e);
            }, null, e, arguments.length);
        },
        replaceWith: function (e) {
            return ut(this[0]) ? this.length ? this.pushStack(v(v.isFunction(e) ? e() : e), "replaceWith", e) : this : v.isFunction(e) ? this.each(function (t) {
                var n = v(this),
                    r = n.html();
                n.replaceWith(e.call(this, t, r));
            }) : (typeof e != "string" && (e = v(e).detach()), this.each(function () {
                var t = this.nextSibling,
                    n = this.parentNode;
                v(this).remove(), t ? v(t).before(e) : v(n).append(e);
            }));
        },
        detach: function (e) {
            return this.remove(e, !0);
        },
        domManip: function (e, n, r) {
            e = [].concat.apply([], e);
            var i, s, o, u, a = 0,
                f = e[0],
                l = [],
                c = this.length;
            if (!v.support.checkClone && c > 1 && typeof f == "string" && St.test(f)) {
                return this.each(function () {
                    v(this).domManip(e, n, r);
                });
            }
            if (v.isFunction(f)) {
                return this.each(function (i) {
                    var s = v(this);
                    e[0] = f.call(this, i, n ? s.html() : t), s.domManip(e, n, r);
                });
            }
            if (this[0]) {
                i = v.buildFragment(e, this, l), o = i.fragment, s = o.firstChild, o.childNodes.length === 1 && (o = s);
                if (s) {
                    n = n && v.nodeName(s, "tr");
                    for (u = i.cacheable || c - 1; a < c; a++) {
                        r.call(n && v.nodeName(this[a], "table") ? Lt(this[a], "tbody") : this[a], a === u ? o : v.clone(o, !0, !0));
                    }
                }
                o = s = null, l.length && v.each(l, function (e, t) {
                    t.src ? v.ajax ? v.ajax({
                        url: t.src,
                        type: "GET",
                        dataType: "script",
                        async: !1,
                        global: !1,
                        "throws": !0
                    }) : v.error("no ajax") : v.globalEval((t.text || t.textContent || t.innerHTML || "").replace(Tt, "")), t.parentNode && t.parentNode.removeChild(t);
                });
            }
            return this;
        }
    }), v.buildFragment = function (e, n, r) {
        var s, o, u, a = e[0];
        return n = n || i, n = !n.nodeType && n[0] || n, n = n.ownerDocument || n, e.length === 1 && typeof a == "string" && a.length < 512 && n === i && a.charAt(0) === "<" && !bt.test(a) && (v.support.checkClone || !St.test(a)) && (v.support.html5Clone || !wt.test(a)) && (o = !0, s = v.fragments[a], u = s !== t), s || (s = n.createDocumentFragment(), v.clean(e, n, s, r), o && (v.fragments[a] = u && s)), {
            fragment: s,
            cacheable: o
        };
    }, v.fragments = {}, v.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (e, t) {
        v.fn[e] = function (n) {
            var r, i = 0,
                s = [],
                o = v(n),
                u = o.length,
                a = this.length === 1 && this[0].parentNode;
            if ((a == null || a && a.nodeType === 11 && a.childNodes.length === 1) && u === 1) {
                return o[t](this[0]), this;
            }
            for (; i < u; i++) {
                r = (i > 0 ? this.clone(!0) : this).get(), v(o[i])[t](r), s = s.concat(r);
            }
            return this.pushStack(s, e, o.selector);
        };
    }), v.extend({
        clone: function (e, t, n) {
            var r, i, s, o;
            v.support.html5Clone || v.isXMLDoc(e) || !wt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (kt.innerHTML = e.outerHTML, kt.removeChild(o = kt.firstChild));
            if ((!v.support.noCloneEvent || !v.support.noCloneChecked) && (e.nodeType === 1 || e.nodeType === 11) && !v.isXMLDoc(e)) {
                Ot(e, o), r = Mt(e), i = Mt(o);
                for (s = 0; r[s]; ++s) {
                    i[s] && Ot(r[s], i[s]);
                }
            }
            if (t) {
                At(e, o);
                if (n) {
                    r = Mt(e), i = Mt(o);
                    for (s = 0; r[s]; ++s) {
                        At(r[s], i[s]);
                    }
                }
            }
            return r = i = null, o;
        },
        clean: function (e, t, n, r) {
            var s, o, u, a, f, l, c, h, p, d, m, g, y = t === i && Ct,
                b = [];
            if (!t || typeof t.createDocumentFragment == "undefined") {
                t = i;
            }
            for (s = 0;
            (u = e[s]) != null; s++) {
                typeof u == "number" && (u += "");
                if (!u) {
                    continue;
                }
                if (typeof u == "string") {
                    if (!gt.test(u)) {
                        u = t.createTextNode(u);
                    } else {
                        y = y || lt(t), c = t.createElement("div"), y.appendChild(c), u = u.replace(dt, "<$1></$2>"), a = (vt.exec(u) || ["", ""])[1].toLowerCase(), f = Nt[a] || Nt._default, l = f[0], c.innerHTML = f[1] + u + f[2];
                        while (l--) {
                            c = c.lastChild;
                        }
                        if (!v.support.tbody) {
                            h = mt.test(u), p = a === "table" && !h ? c.firstChild && c.firstChild.childNodes : f[1] === "<table>" && !h ? c.childNodes : [];
                            for (o = p.length - 1; o >= 0; --o) {
                                v.nodeName(p[o], "tbody") && !p[o].childNodes.length && p[o].parentNode.removeChild(p[o]);
                            }
                        }!v.support.leadingWhitespace && pt.test(u) && c.insertBefore(t.createTextNode(pt.exec(u)[0]), c.firstChild), u = c.childNodes, c.parentNode.removeChild(c);
                    }
                }
                u.nodeType ? b.push(u) : v.merge(b, u);
            }
            c && (u = c = y = null);
            if (!v.support.appendChecked) {
                for (s = 0;
                (u = b[s]) != null; s++) {
                    v.nodeName(u, "input") ? _t(u) : typeof u.getElementsByTagName != "undefined" && v.grep(u.getElementsByTagName("input"), _t);
                }
            }
            if (n) {
                m = function (e) {
                    if (!e.type || xt.test(e.type)) {
                        return r ? r.push(e.parentNode ? e.parentNode.removeChild(e) : e) : n.appendChild(e);
                    }
                };
                for (s = 0;
                (u = b[s]) != null; s++) {
                    if (!v.nodeName(u, "script") || !m(u)) {
                        n.appendChild(u), typeof u.getElementsByTagName != "undefined" && (g = v.grep(v.merge([], u.getElementsByTagName("script")), m), b.splice.apply(b, [s + 1, 0].concat(g)), s += g.length);
                    }
                }
            }
            return b;
        },
        cleanData: function (e, t) {
            var n, r, i, s, o = 0,
                u = v.expando,
                a = v.cache,
                f = v.support.deleteExpando,
                l = v.event.special;
            for (;
            (i = e[o]) != null; o++) {
                if (t || v.acceptData(i)) {
                    r = i[u], n = r && a[r];
                    if (n) {
                        if (n.events) {
                            for (s in n.events) {
                                l[s] ? v.event.remove(i, s) : v.removeEvent(i, s, n.handle);
                            }
                        }
                        a[r] && (delete a[r], f ? delete i[u] : i.removeAttribute ? i.removeAttribute(u) : i[u] = null, v.deletedIds.push(r));
                    }
                }
            }
        }
    }), function () {
        var e, t;
        v.uaMatch = function (e) {
            e = e.toLowerCase();
            var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
            return {
                browser: t[1] || "",
                version: t[2] || "0"
            };
        }, e = v.uaMatch(o.userAgent), t = {}, e.browser && (t[e.browser] = !0, t.version = e.version), t.chrome ? t.webkit = !0 : t.webkit && (t.safari = !0), v.browser = t, v.sub = function () {
            function e(t, n) {
                return new e.fn.init(t, n);
            }
            v.extend(!0, e, this), e.superclass = this, e.fn = e.prototype = this(), e.fn.constructor = e, e.sub = this.sub, e.fn.init = function (r, i) {
                return i && i instanceof v && !(i instanceof e) && (i = e(i)), v.fn.init.call(this, r, i, t);
            }, e.fn.init.prototype = e.fn;
            var t = e(i);
            return e;
        };
    }();
    var Dt, Pt, Ht, Bt = /alpha\([^)]*\)/i,
        jt = /opacity=([^)]*)/,
        Ft = /^(top|right|bottom|left)$/,
        It = /^(none|table(?!-c[ea]).+)/,
        qt = /^margin/,
        Rt = new RegExp("^(" + m + ")(.*)$", "i"),
        Ut = new RegExp("^(" + m + ")(?!px)[a-z%]+$", "i"),
        zt = new RegExp("^([-+])=(" + m + ")", "i"),
        Wt = {
            BODY: "block"
        },
        Xt = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Vt = {
            letterSpacing: 0,
            fontWeight: 400
        },
        $t = ["Top", "Right", "Bottom", "Left"],
        Jt = ["Webkit", "O", "Moz", "ms"],
        Kt = v.fn.toggle;
    v.fn.extend({
        css: function (e, n) {
            return v.access(this, function (e, n, r) {
                return r !== t ? v.style(e, n, r) : v.css(e, n);
            }, e, n, arguments.length > 1);
        },
        show: function () {
            return Yt(this, !0);
        },
        hide: function () {
            return Yt(this);
        },
        toggle: function (e, t) {
            var n = typeof e == "boolean";
            return v.isFunction(e) && v.isFunction(t) ? Kt.apply(this, arguments) : this.each(function () {
                (n ? e : Gt(this)) ? v(this).show() : v(this).hide();
            });
        }
    }), v.extend({
        cssHooks: {
            opacity: {
                get: function (e, t) {
                    if (t) {
                        var n = Dt(e, "opacity");
                        return n === "" ? "1" : n;
                    }
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": v.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function (e, n, r, i) {
            if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style) {
                return;
            }
            var s, o, u, a = v.camelCase(n),
                f = e.style;
            n = v.cssProps[a] || (v.cssProps[a] = Qt(f, a)), u = v.cssHooks[n] || v.cssHooks[a];
            if (r === t) {
                return u && "get" in u && (s = u.get(e, !1, i)) !== t ? s : f[n];
            }
            o = typeof r, o === "string" && (s = zt.exec(r)) && (r = (s[1] + 1) * s[2] + parseFloat(v.css(e, n)), o = "number");
            if (r == null || o === "number" && isNaN(r)) {
                return;
            }
            o === "number" && !v.cssNumber[a] && (r += "px");
            if (!u || !("set" in u) || (r = u.set(e, r, i)) !== t) {
                try {
                    f[n] = r;
                } catch (l) {}
            }
        },
        css: function (e, n, r, i) {
            var s, o, u, a = v.camelCase(n);
            return n = v.cssProps[a] || (v.cssProps[a] = Qt(e.style, a)), u = v.cssHooks[n] || v.cssHooks[a], u && "get" in u && (s = u.get(e, !0, i)), s === t && (s = Dt(e, n)), s === "normal" && n in Vt && (s = Vt[n]), r || i !== t ? (o = parseFloat(s), r || v.isNumeric(o) ? o || 0 : s) : s;
        },
        swap: function (e, t, n) {
            var r, i, s = {};
            for (i in t) {
                s[i] = e.style[i], e.style[i] = t[i];
            }
            r = n.call(e);
            for (i in t) {
                e.style[i] = s[i];
            }
            return r;
        }
    }), e.getComputedStyle ? Dt = function (t, n) {
        var r, i, s, o, u = e.getComputedStyle(t, null),
            a = t.style;
        return u && (r = u.getPropertyValue(n) || u[n], r === "" && !v.contains(t.ownerDocument, t) && (r = v.style(t, n)), Ut.test(r) && qt.test(n) && (i = a.width, s = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = r, r = u.width, a.width = i, a.minWidth = s, a.maxWidth = o)), r;
    } : i.documentElement.currentStyle && (Dt = function (e, t) {
        var n, r, i = e.currentStyle && e.currentStyle[t],
            s = e.style;
        return i == null && s && s[t] && (i = s[t]), Ut.test(i) && !Ft.test(t) && (n = s.left, r = e.runtimeStyle && e.runtimeStyle.left, r && (e.runtimeStyle.left = e.currentStyle.left), s.left = t === "fontSize" ? "1em" : i, i = s.pixelLeft + "px", s.left = n, r && (e.runtimeStyle.left = r)), i === "" ? "auto" : i;
    }), v.each(["height", "width"], function (e, t) {
        v.cssHooks[t] = {
            get: function (e, n, r) {
                if (n) {
                    return e.offsetWidth === 0 && It.test(Dt(e, "display")) ? v.swap(e, Xt, function () {
                        return tn(e, t, r);
                    }) : tn(e, t, r);
                }
            },
            set: function (e, n, r) {
                return Zt(e, n, r ? en(e, t, r, v.support.boxSizing && v.css(e, "boxSizing") === "border-box") : 0);
            }
        };
    }), v.support.opacity || (v.cssHooks.opacity = {
        get: function (e, t) {
            return jt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : t ? "1" : "";
        },
        set: function (e, t) {
            var n = e.style,
                r = e.currentStyle,
                i = v.isNumeric(t) ? "alpha(opacity=" + t * 100 + ")" : "",
                s = r && r.filter || n.filter || "";
            n.zoom = 1;
            if (t >= 1 && v.trim(s.replace(Bt, "")) === "" && n.removeAttribute) {
                n.removeAttribute("filter");
                if (r && !r.filter) {
                    return;
                }
            }
            n.filter = Bt.test(s) ? s.replace(Bt, i) : s + " " + i;
        }
    }), v(function () {
        v.support.reliableMarginRight || (v.cssHooks.marginRight = {
            get: function (e, t) {
                return v.swap(e, {
                    display: "inline-block"
                }, function () {
                    if (t) {
                        return Dt(e, "marginRight");
                    }
                });
            }
        }), !v.support.pixelPosition && v.fn.position && v.each(["top", "left"], function (e, t) {
            v.cssHooks[t] = {
                get: function (e, n) {
                    if (n) {
                        var r = Dt(e, t);
                        return Ut.test(r) ? v(e).position()[t] + "px" : r;
                    }
                }
            };
        });
    }), v.expr && v.expr.filters && (v.expr.filters.hidden = function (e) {
        return e.offsetWidth === 0 && e.offsetHeight === 0 || !v.support.reliableHiddenOffsets && (e.style && e.style.display || Dt(e, "display")) === "none";
    }, v.expr.filters.visible = function (e) {
        return !v.expr.filters.hidden(e);
    }), v.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function (e, t) {
        v.cssHooks[e + t] = {
            expand: function (n) {
                var r, i = typeof n == "string" ? n.split(" ") : [n],
                    s = {};
                for (r = 0; r < 4; r++) {
                    s[e + $t[r] + t] = i[r] || i[r - 2] || i[0];
                }
                return s;
            }
        }, qt.test(e) || (v.cssHooks[e + t].set = Zt);
    });
    var rn = /%20/g,
        sn = /\[\]$/,
        on = /\r?\n/g,
        un = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        an = /^(?:select|textarea)/i;
    v.fn.extend({
        serialize: function () {
            return v.param(this.serializeArray());
        },
        serializeArray: function () {
            return this.map(function () {
                return this.elements ? v.makeArray(this.elements) : this;
            }).filter(function () {
                return this.name && !this.disabled && (this.checked || an.test(this.nodeName) || un.test(this.type));
            }).map(function (e, t) {
                var n = v(this).val();
                return n == null ? null : v.isArray(n) ? v.map(n, function (e, n) {
                    return {
                        name: t.name,
                        value: e.replace(on, "\r\n")
                    };
                }) : {
                    name: t.name,
                    value: n.replace(on, "\r\n")
                };
            }).get();
        }
    }), v.param = function (e, n) {
        var r, i = [],
            s = function (e, t) {
                t = v.isFunction(t) ? t() : t == null ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t);
            };
        n === t && (n = v.ajaxSettings && v.ajaxSettings.traditional);
        if (v.isArray(e) || e.jquery && !v.isPlainObject(e)) {
            v.each(e, function () {
                s(this.name, this.value);
            });
        } else {
            for (r in e) {
                fn(r, e[r], n, s);
            }
        }
        return i.join("&").replace(rn, "+");
    };
    var ln, cn, hn = /#.*$/,
        pn = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        dn = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        vn = /^(?:GET|HEAD)$/,
        mn = /^\/\//,
        gn = /\?/,
        yn = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        bn = /([?&])_=[^&]*/,
        wn = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        En = v.fn.load,
        Sn = {},
        xn = {},
        Tn = ["*/"] + ["*"];
    try {
        cn = s.href;
    } catch (Nn) {
        cn = i.createElement("a"), cn.href = "", cn = cn.href;
    }
    ln = wn.exec(cn.toLowerCase()) || [], v.fn.load = function (e, n, r) {
        if (typeof e != "string" && En) {
            return En.apply(this, arguments);
        }
        if (!this.length) {
            return this;
        }
        var i, s, o, u = this,
            a = e.indexOf(" ");
        return a >= 0 && (i = e.slice(a, e.length), e = e.slice(0, a)), v.isFunction(n) ? (r = n, n = t) : n && typeof n == "object" && (s = "POST"), v.ajax({
            url: e,
            type: s,
            dataType: "html",
            data: n,
            complete: function (e, t) {
                r && u.each(r, o || [e.responseText, t, e]);
            }
        }).done(function (e) {
            o = arguments, u.html(i ? v("<div>").append(e.replace(yn, "")).find(i) : e);
        }), this;
    }, v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (e, t) {
        v.fn[t] = function (e) {
            return this.on(t, e);
        };
    }), v.each(["get", "post"], function (e, n) {
        v[n] = function (e, r, i, s) {
            return v.isFunction(r) && (s = s || i, i = r, r = t), v.ajax({
                type: n,
                url: e,
                data: r,
                success: i,
                dataType: s
            });
        };
    }), v.extend({
        getScript: function (e, n) {
            return v.get(e, t, n, "script");
        },
        getJSON: function (e, t, n) {
            return v.get(e, t, n, "json");
        },
        ajaxSetup: function (e, t) {
            return t ? Ln(e, v.ajaxSettings) : (t = e, e = v.ajaxSettings), Ln(e, t), e;
        },
        ajaxSettings: {
            url: cn,
            isLocal: dn.test(ln[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": Tn
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": e.String,
                "text html": !0,
                "text json": v.parseJSON,
                "text xml": v.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: Cn(Sn),
        ajaxTransport: Cn(xn),
        ajax: function (e, n) {
            function T(e, n, s, a) {
                var l, y, b, w, S, T = n;
                if (E === 2) {
                    return;
                }
                E = 2, u && clearTimeout(u), o = t, i = a || "", x.readyState = e > 0 ? 4 : 0, s && (w = An(c, x, s));
                if (e >= 200 && e < 300 || e === 304) {
                    c.ifModified && (S = x.getResponseHeader("Last-Modified"), S && (v.lastModified[r] = S), S = x.getResponseHeader("Etag"), S && (v.etag[r] = S)), e === 304 ? (T = "notmodified", l = !0) : (l = On(c, w), T = l.state, y = l.data, b = l.error, l = !b);
                } else {
                    b = T;
                    if (!T || e) {
                        T = "error", e < 0 && (e = 0);
                    }
                }
                x.status = e, x.statusText = (n || T) + "", l ? d.resolveWith(h, [y, T, x]) : d.rejectWith(h, [x, T, b]), x.statusCode(g), g = t, f && p.trigger("ajax" + (l ? "Success" : "Error"), [x, c, l ? y : b]), m.fireWith(h, [x, T]), f && (p.trigger("ajaxComplete", [x, c]), --v.active || v.event.trigger("ajaxStop"));
            }
            typeof e == "object" && (n = e, e = t), n = n || {};
            var r, i, s, o, u, a, f, l, c = v.ajaxSetup({}, n),
                h = c.context || c,
                p = h !== c && (h.nodeType || h instanceof v) ? v(h) : v.event,
                d = v.Deferred(),
                m = v.Callbacks("once memory"),
                g = c.statusCode || {},
                b = {},
                w = {},
                E = 0,
                S = "canceled",
                x = {
                    readyState: 0,
                    setRequestHeader: function (e, t) {
                        if (!E) {
                            var n = e.toLowerCase();
                            e = w[n] = w[n] || e, b[e] = t;
                        }
                        return this;
                    },
                    getAllResponseHeaders: function () {
                        return E === 2 ? i : null;
                    },
                    getResponseHeader: function (e) {
                        var n;
                        if (E === 2) {
                            if (!s) {
                                s = {};
                                while (n = pn.exec(i)) {
                                    s[n[1].toLowerCase()] = n[2];
                                }
                            }
                            n = s[e.toLowerCase()];
                        }
                        return n === t ? null : n;
                    },
                    overrideMimeType: function (e) {
                        return E || (c.mimeType = e), this;
                    },
                    abort: function (e) {
                        return e = e || S, o && o.abort(e), T(0, e), this;
                    }
                };
            d.promise(x), x.success = x.done, x.error = x.fail, x.complete = m.add, x.statusCode = function (e) {
                if (e) {
                    var t;
                    if (E < 2) {
                        for (t in e) {
                            g[t] = [g[t], e[t]];
                        }
                    } else {
                        t = e[x.status], x.always(t);
                    }
                }
                return this;
            }, c.url = ((e || c.url) + "").replace(hn, "").replace(mn, ln[1] + "//"), c.dataTypes = v.trim(c.dataType || "*").toLowerCase().split(y), c.crossDomain == null && (a = wn.exec(c.url.toLowerCase()), c.crossDomain = !(!a || a[1] === ln[1] && a[2] === ln[2] && (a[3] || (a[1] === "http:" ? 80 : 443)) == (ln[3] || (ln[1] === "http:" ? 80 : 443)))), c.data && c.processData && typeof c.data != "string" && (c.data = v.param(c.data, c.traditional)), kn(Sn, c, n, x);
            if (E === 2) {
                return x;
            }
            f = c.global, c.type = c.type.toUpperCase(), c.hasContent = !vn.test(c.type), f && v.active++ === 0 && v.event.trigger("ajaxStart");
            if (!c.hasContent) {
                c.data && (c.url += (gn.test(c.url) ? "&" : "?") + c.data, delete c.data), r = c.url;
                if (c.cache === !1) {
                    var N = v.now(),
                        C = c.url.replace(bn, "$1_=" + N);
                    c.url = C + (C === c.url ? (gn.test(c.url) ? "&" : "?") + "_=" + N : "");
                }
            }(c.data && c.hasContent && c.contentType !== !1 || n.contentType) && x.setRequestHeader("Content-Type", c.contentType), c.ifModified && (r = r || c.url, v.lastModified[r] && x.setRequestHeader("If-Modified-Since", v.lastModified[r]), v.etag[r] && x.setRequestHeader("If-None-Match", v.etag[r])), x.setRequestHeader("Accept", c.dataTypes[0] && c.accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + (c.dataTypes[0] !== "*" ? ", " + Tn + "; q=0.01" : "") : c.accepts["*"]);
            for (l in c.headers) {
                x.setRequestHeader(l, c.headers[l]);
            }
            if (!c.beforeSend || c.beforeSend.call(h, x, c) !== !1 && E !== 2) {
                S = "abort";
                for (l in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) {
                    x[l](c[l]);
                }
                o = kn(xn, c, n, x);
                if (!o) {
                    T(-1, "No Transport");
                } else {
                    x.readyState = 1, f && p.trigger("ajaxSend", [x, c]), c.async && c.timeout > 0 && (u = setTimeout(function () {
                        x.abort("timeout");
                    }, c.timeout));
                    try {
                        E = 1, o.send(b, T);
                    } catch (k) {
                        if (!(E < 2)) {
                            throw k;
                        }
                        T(-1, k);
                    }
                }
                return x;
            }
            return x.abort();
        },
        active: 0,
        lastModified: {},
        etag: {}
    });
    var Mn = [],
        _n = /\?/,
        Dn = /(=)\?(?=&|$)|\?\?/,
        Pn = v.now();
    v.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var e = Mn.pop() || v.expando + "_" + Pn++;
            return this[e] = !0, e;
        }
    }), v.ajaxPrefilter("json jsonp", function (n, r, i) {
        var s, o, u, a = n.data,
            f = n.url,
            l = n.jsonp !== !1,
            c = l && Dn.test(f),
            h = l && !c && typeof a == "string" && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Dn.test(a);
        if (n.dataTypes[0] === "jsonp" || c || h) {
            return s = n.jsonpCallback = v.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, o = e[s], c ? n.url = f.replace(Dn, "$1" + s) : h ? n.data = a.replace(Dn, "$1" + s) : l && (n.url += (_n.test(f) ? "&" : "?") + n.jsonp + "=" + s), n.converters["script json"] = function () {
                return u || v.error(s + " was not called"), u[0];
            }, n.dataTypes[0] = "json", e[s] = function () {
                u = arguments;
            }, i.always(function () {
                e[s] = o, n[s] && (n.jsonpCallback = r.jsonpCallback, Mn.push(s)), u && v.isFunction(o) && o(u[0]), u = o = t;
            }), "script";
        }
    }), v.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function (e) {
                return v.globalEval(e), e;
            }
        }
    }), v.ajaxPrefilter("script", function (e) {
        e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1);
    }), v.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var n, r = i.head || i.getElementsByTagName("head")[0] || i.documentElement;
            return {
                send: function (s, o) {
                    n = i.createElement("script"), n.async = "async", e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function (e, i) {
                        if (i || !n.readyState || /loaded|complete/.test(n.readyState)) {
                            n.onload = n.onreadystatechange = null, r && n.parentNode && r.removeChild(n), n = t, i || o(200, "success");
                        }
                    }, r.insertBefore(n, r.firstChild);
                },
                abort: function () {
                    n && n.onload(0, 1);
                }
            };
        }
    });
    var Hn, Bn = e.ActiveXObject ?
    function () {
        for (var e in Hn) {
            Hn[e](0, 1);
        }
    } : !1, jn = 0;
    v.ajaxSettings.xhr = e.ActiveXObject ?
    function () {
        return !this.isLocal && Fn() || In();
    } : Fn, function (e) {
        v.extend(v.support, {
            ajax: !! e,
            cors: !! e && "withCredentials" in e
        });
    }(v.ajaxSettings.xhr()), v.support.ajax && v.ajaxTransport(function (n) {
        if (!n.crossDomain || v.support.cors) {
            var r;
            return {
                send: function (i, s) {
                    var o, u, a = n.xhr();
                    n.username ? a.open(n.type, n.url, n.async, n.username, n.password) : a.open(n.type, n.url, n.async);
                    if (n.xhrFields) {
                        for (u in n.xhrFields) {
                            a[u] = n.xhrFields[u];
                        }
                    }
                    n.mimeType && a.overrideMimeType && a.overrideMimeType(n.mimeType), !n.crossDomain && !i["X-Requested-With"] && (i["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (u in i) {
                            a.setRequestHeader(u, i[u]);
                        }
                    } catch (f) {}
                    a.send(n.hasContent && n.data || null), r = function (e, i) {
                        var u, f, l, c, h;
                        try {
                            if (r && (i || a.readyState === 4)) {
                                r = t, o && (a.onreadystatechange = v.noop, Bn && delete Hn[o]);
                                if (i) {
                                    a.readyState !== 4 && a.abort();
                                } else {
                                    u = a.status, l = a.getAllResponseHeaders(), c = {}, h = a.responseXML, h && h.documentElement && (c.xml = h);
                                    try {
                                        c.text = a.responseText;
                                    } catch (p) {}
                                    try {
                                        f = a.statusText;
                                    } catch (p) {
                                        f = "";
                                    }!u && n.isLocal && !n.crossDomain ? u = c.text ? 200 : 404 : u === 1223 && (u = 204);
                                }
                            }
                        } catch (d) {
                            i || s(-1, d);
                        }
                        c && s(u, f, c, l);
                    }, n.async ? a.readyState === 4 ? setTimeout(r, 0) : (o = ++jn, Bn && (Hn || (Hn = {}, v(e).unload(Bn)), Hn[o] = r), a.onreadystatechange = r) : r();
                },
                abort: function () {
                    r && r(0, 1);
                }
            };
        }
    });
    var qn, Rn, Un = /^(?:toggle|show|hide)$/,
        zn = new RegExp("^(?:([-+])=|)(" + m + ")([a-z%]*)$", "i"),
        Wn = /queueHooks$/,
        Xn = [Gn],
        Vn = {
            "*": [function (e, t) {
                var n, r, i = this.createTween(e, t),
                    s = zn.exec(t),
                    o = i.cur(),
                    u = +o || 0,
                    a = 1,
                    f = 20;
                if (s) {
                    n = +s[2], r = s[3] || (v.cssNumber[e] ? "" : "px");
                    if (r !== "px" && u) {
                        u = v.css(i.elem, e, !0) || n || 1;
                        do {
                            a = a || ".5", u /= a, v.style(i.elem, e, u + r);
                        } while (a !== (a = i.cur() / o) && a !== 1 && --f);
                    }
                    i.unit = r, i.start = u, i.end = s[1] ? u + (s[1] + 1) * n : n;
                }
                return i;
            }]
        };
    v.Animation = v.extend(Kn, {
        tweener: function (e, t) {
            v.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            var n, r = 0,
                i = e.length;
            for (; r < i; r++) {
                n = e[r], Vn[n] = Vn[n] || [], Vn[n].unshift(t);
            }
        },
        prefilter: function (e, t) {
            t ? Xn.unshift(e) : Xn.push(e);
        }
    }), v.Tween = Yn, Yn.prototype = {
        constructor: Yn,
        init: function (e, t, n, r, i, s) {
            this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = s || (v.cssNumber[n] ? "" : "px");
        },
        cur: function () {
            var e = Yn.propHooks[this.prop];
            return e && e.get ? e.get(this) : Yn.propHooks._default.get(this);
        },
        run: function (e) {
            var t, n = Yn.propHooks[this.prop];
            return this.options.duration ? this.pos = t = v.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Yn.propHooks._default.set(this), this;
        }
    }, Yn.prototype.init.prototype = Yn.prototype, Yn.propHooks = {
        _default: {
            get: function (e) {
                var t;
                return e.elem[e.prop] == null || !! e.elem.style && e.elem.style[e.prop] != null ? (t = v.css(e.elem, e.prop, !1, ""), !t || t === "auto" ? 0 : t) : e.elem[e.prop];
            },
            set: function (e) {
                v.fx.step[e.prop] ? v.fx.step[e.prop](e) : e.elem.style && (e.elem.style[v.cssProps[e.prop]] != null || v.cssHooks[e.prop]) ? v.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now;
            }
        }
    }, Yn.propHooks.scrollTop = Yn.propHooks.scrollLeft = {
        set: function (e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
        }
    }, v.each(["toggle", "show", "hide"], function (e, t) {
        var n = v.fn[t];
        v.fn[t] = function (r, i, s) {
            return r == null || typeof r == "boolean" || !e && v.isFunction(r) && v.isFunction(i) ? n.apply(this, arguments) : this.animate(Zn(t, !0), r, i, s);
        };
    }), v.fn.extend({
        fadeTo: function (e, t, n, r) {
            return this.filter(Gt).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r);
        },
        animate: function (e, t, n, r) {
            var i = v.isEmptyObject(e),
                s = v.speed(t, n, r),
                o = function () {
                    var t = Kn(this, v.extend({}, e), s);
                    i && t.stop(!0);
                };
            return i || s.queue === !1 ? this.each(o) : this.queue(s.queue, o);
        },
        stop: function (e, n, r) {
            var i = function (e) {
                    var t = e.stop;
                    delete e.stop, t(r);
                };
            return typeof e != "string" && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function () {
                var t = !0,
                    n = e != null && e + "queueHooks",
                    s = v.timers,
                    o = v._data(this);
                if (n) {
                    o[n] && o[n].stop && i(o[n]);
                } else {
                    for (n in o) {
                        o[n] && o[n].stop && Wn.test(n) && i(o[n]);
                    }
                }
                for (n = s.length; n--;) {
                    s[n].elem === this && (e == null || s[n].queue === e) && (s[n].anim.stop(r), t = !1, s.splice(n, 1));
                }(t || !r) && v.dequeue(this, e);
            });
        }
    }), v.each({
        slideDown: Zn("show"),
        slideUp: Zn("hide"),
        slideToggle: Zn("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function (e, t) {
        v.fn[e] = function (e, n, r) {
            return this.animate(t, e, n, r);
        };
    }), v.speed = function (e, t, n) {
        var r = e && typeof e == "object" ? v.extend({}, e) : {
            complete: n || !n && t || v.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !v.isFunction(t) && t
        };
        r.duration = v.fx.off ? 0 : typeof r.duration == "number" ? r.duration : r.duration in v.fx.speeds ? v.fx.speeds[r.duration] : v.fx.speeds._default;
        if (r.queue == null || r.queue === !0) {
            r.queue = "fx";
        }
        return r.old = r.complete, r.complete = function () {
            v.isFunction(r.old) && r.old.call(this), r.queue && v.dequeue(this, r.queue);
        }, r;
    }, v.easing = {
        linear: function (e) {
            return e;
        },
        swing: function (e) {
            return 0.5 - Math.cos(e * Math.PI) / 2;
        }
    }, v.timers = [], v.fx = Yn.prototype.init, v.fx.tick = function () {
        var e, n = v.timers,
            r = 0;
        qn = v.now();
        for (; r < n.length; r++) {
            e = n[r], !e() && n[r] === e && n.splice(r--, 1);
        }
        n.length || v.fx.stop(), qn = t;
    }, v.fx.timer = function (e) {
        e() && v.timers.push(e) && !Rn && (Rn = setInterval(v.fx.tick, v.fx.interval));
    }, v.fx.interval = 13, v.fx.stop = function () {
        clearInterval(Rn), Rn = null;
    }, v.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, v.fx.step = {}, v.expr && v.expr.filters && (v.expr.filters.animated = function (e) {
        return v.grep(v.timers, function (t) {
            return e === t.elem;
        }).length;
    });
    var er = /^(?:body|html)$/i;
    v.fn.offset = function (e) {
        if (arguments.length) {
            return e === t ? this : this.each(function (t) {
                v.offset.setOffset(this, e, t);
            });
        }
        var n, r, i, s, o, u, a, f = {
            top: 0,
            left: 0
        },
            l = this[0],
            c = l && l.ownerDocument;
        if (!c) {
            return;
        }
        return (r = c.body) === l ? v.offset.bodyOffset(l) : (n = c.documentElement, v.contains(n, l) ? (typeof l.getBoundingClientRect != "undefined" && (f = l.getBoundingClientRect()), i = tr(c), s = n.clientTop || r.clientTop || 0, o = n.clientLeft || r.clientLeft || 0, u = i.pageYOffset || n.scrollTop, a = i.pageXOffset || n.scrollLeft, {
            top: f.top + u - s,
            left: f.left + a - o
        }) : f);
    }, v.offset = {
        bodyOffset: function (e) {
            var t = e.offsetTop,
                n = e.offsetLeft;
            return v.support.doesNotIncludeMarginInBodyOffset && (t += parseFloat(v.css(e, "marginTop")) || 0, n += parseFloat(v.css(e, "marginLeft")) || 0), {
                top: t,
                left: n
            };
        },
        setOffset: function (e, t, n) {
            var r = v.css(e, "position");
            r === "static" && (e.style.position = "relative");
            var i = v(e),
                s = i.offset(),
                o = v.css(e, "top"),
                u = v.css(e, "left"),
                a = (r === "absolute" || r === "fixed") && v.inArray("auto", [o, u]) > -1,
                f = {},
                l = {},
                c, h;
            a ? (l = i.position(), c = l.top, h = l.left) : (c = parseFloat(o) || 0, h = parseFloat(u) || 0), v.isFunction(t) && (t = t.call(e, n, s)), t.top != null && (f.top = t.top - s.top + c), t.left != null && (f.left = t.left - s.left + h), "using" in t ? t.using.call(e, f) : i.css(f);
        }
    }, v.fn.extend({
        position: function () {
            if (!this[0]) {
                return;
            }
            var e = this[0],
                t = this.offsetParent(),
                n = this.offset(),
                r = er.test(t[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : t.offset();
            return n.top -= parseFloat(v.css(e, "marginTop")) || 0, n.left -= parseFloat(v.css(e, "marginLeft")) || 0, r.top += parseFloat(v.css(t[0], "borderTopWidth")) || 0, r.left += parseFloat(v.css(t[0], "borderLeftWidth")) || 0, {
                top: n.top - r.top,
                left: n.left - r.left
            };
        },
        offsetParent: function () {
            return this.map(function () {
                var e = this.offsetParent || i.body;
                while (e && !er.test(e.nodeName) && v.css(e, "position") === "static") {
                    e = e.offsetParent;
                }
                return e || i.body;
            });
        }
    }), v.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function (e, n) {
        var r = /Y/.test(n);
        v.fn[e] = function (i) {
            return v.access(this, function (e, i, s) {
                var o = tr(e);
                if (s === t) {
                    return o ? n in o ? o[n] : o.document.documentElement[i] : e[i];
                }
                o ? o.scrollTo(r ? v(o).scrollLeft() : s, r ? s : v(o).scrollTop()) : e[i] = s;
            }, e, i, arguments.length, null);
        };
    }), v.each({
        Height: "height",
        Width: "width"
    }, function (e, n) {
        v.each({
            padding: "inner" + e,
            content: n,
            "": "outer" + e
        }, function (r, i) {
            v.fn[i] = function (i, s) {
                var o = arguments.length && (r || typeof i != "boolean"),
                    u = r || (i === !0 || s === !0 ? "margin" : "border");
                return v.access(this, function (n, r, i) {
                    var s;
                    return v.isWindow(n) ? n.document.documentElement["client" + e] : n.nodeType === 9 ? (s = n.documentElement, Math.max(n.body["scroll" + e], s["scroll" + e], n.body["offset" + e], s["offset" + e], s["client" + e])) : i === t ? v.css(n, r, i, u) : v.style(n, r, i, u);
                }, n, o ? i : t, o, null);
            };
        });
    }), e.jQuery = e.$ = v, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function () {
        return v;
    });
})(window);
jQuery.ui || (function (q) {
    var k = q.fn.remove,
        p = q.browser.mozilla && (parseFloat(q.browser.version) < 1.9);
    q.ui = {
        version: "1.7.2",
        plugin: {
            add: function (d, b, f) {
                var a = q.ui[d].prototype;
                for (var e in f) {
                    a.plugins[e] = a.plugins[e] || [];
                    a.plugins[e].push([b, f[e]]);
                }
            },
            call: function (e, b, d) {
                var f = e.plugins[b];
                if (!f || !e.element[0].parentNode) {
                    return;
                }
                for (var a = 0; a < f.length; a++) {
                    if (e.options[f[a][0]]) {
                        f[a][1].apply(e.element, d);
                    }
                }
            }
        },
        contains: function (a, b) {
            return document.compareDocumentPosition ? a.compareDocumentPosition(b) & 16 : a !== b && a.contains(b);
        },
        hasScroll: function (a, d) {
            if (q(a).css("overflow") == "hidden") {
                return false;
            }
            var e = (d && d == "left") ? "scrollLeft" : "scrollTop",
                b = false;
            if (a[e] > 0) {
                return true;
            }
            a[e] = 1;
            b = (a[e] > 0);
            a[e] = 0;
            return b;
        },
        isOverAxis: function (b, d, a) {
            return (b > d) && (b < (d + a));
        },
        isOver: function (f, d, g, a, e, b) {
            return q.ui.isOverAxis(f, g, e) && q.ui.isOverAxis(d, a, b);
        },
        keyCode: {
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    };
    if (p) {
        var n = q.attr,
            o = q.fn.removeAttr,
            l = "http://www.w3.org/2005/07/aaa",
            s = /^aria-/,
            r = /^wairole:/;
        q.attr = function (d, e, b) {
            var a = b !== undefined;
            return (e == "role" ? (a ? n.call(this, d, e, "wairole:" + b) : (n.apply(this, arguments) || "").replace(r, "")) : (s.test(e) ? (a ? d.setAttributeNS(l, e.replace(s, "aaa:"), b) : n.call(this, d, e.replace(s, "aaa:"))) : n.apply(this, arguments)));
        };
        q.fn.removeAttr = function (a) {
            return (s.test(a) ? this.each(function () {
                this.removeAttributeNS(l, a.replace(s, ""));
            }) : o.call(this, a));
        };
    }
    q.fn.extend({
        remove: function () {
            q("*", this).add(this).each(function () {
                q(this).triggerHandler("remove");
            });
            return k.apply(this, arguments);
        },
        enableSelection: function () {
            return this.attr("unselectable", "off").css("MozUserSelect", "").unbind("selectstart.ui");
        },
        disableSelection: function () {
            return this.attr("unselectable", "on").css("MozUserSelect", "none").bind("selectstart.ui", function () {
                return false;
            });
        },
        scrollParent: function () {
            var a;
            if ((q.browser.msie && (/(static|relative)/).test(this.css("position"))) || (/absolute/).test(this.css("position"))) {
                a = this.parents().filter(function () {
                    return (/(relative|absolute|fixed)/).test(q.curCSS(this, "position", 1)) && (/(auto|scroll)/).test(q.curCSS(this, "overflow", 1) + q.curCSS(this, "overflow-y", 1) + q.curCSS(this, "overflow-x", 1));
                }).eq(0);
            } else {
                a = this.parents().filter(function () {
                    return (/(auto|scroll)/).test(q.curCSS(this, "overflow", 1) + q.curCSS(this, "overflow-y", 1) + q.curCSS(this, "overflow-x", 1));
                }).eq(0);
            }
            return (/fixed/).test(this.css("position")) || !a.length ? q(document) : a;
        }
    });
    q.extend(q.expr[":"], {
        data: function (a, b, d) {
            return !!q.data(a, d[3]);
        },
        focusable: function (b) {
            var a = b.nodeName.toLowerCase(),
                d = q.attr(b, "tabindex");
            return (/input|select|textarea|button|object/.test(a) ? !b.disabled : "a" == a || "area" == a ? b.href || !isNaN(d) : !isNaN(d)) && !q(b)["area" == a ? "parents" : "closest"](":hidden").length;
        },
        tabbable: function (a) {
            var b = q.attr(a, "tabindex");
            return (isNaN(b) || b >= 0) && q(a).is(":focusable");
        }
    });

    function m(a, g, f, b) {
        function d(h) {
            var u = q[a][g][h] || [];
            return (typeof u == "string" ? u.split(/,?\s+/) : u);
        }
        var e = d("getter");
        if (b.length == 1 && typeof b[0] == "string") {
            e = e.concat(d("getterSetter"));
        }
        return (q.inArray(f, e) != -1);
    }
    q.widget = function (b, d) {
        var a = b.split(".")[0];
        b = b.split(".")[1];
        q.fn[b] = function (f) {
            var h = (typeof f == "string"),
                g = Array.prototype.slice.call(arguments, 1);
            if (h && f.substring(0, 1) == "_") {
                return this;
            }
            if (h && m(a, b, f, g)) {
                var e = q.data(this[0], b);
                return (e ? e[f].apply(e, g) : undefined);
            }
            return this.each(function () {
                var u = q.data(this, b);
                (!u && !h && q.data(this, b, new q[a][b](this, f))._init());
                (u && h && q.isFunction(u[f]) && u[f].apply(u, g));
            });
        };
        q[a] = q[a] || {};
        q[a][b] = function (f, g) {
            var e = this;
            this.namespace = a;
            this.widgetName = b;
            this.widgetEventPrefix = q[a][b].eventPrefix || b;
            this.widgetBaseClass = a + "-" + b;
            this.options = q.extend({}, q.widget.defaults, q[a][b].defaults, q.metadata && q.metadata.get(f)[b], g);
            this.element = q(f).bind("setData." + b, function (u, v, h) {
                if (u.target == f) {
                    return e._setData(v, h);
                }
            }).bind("getData." + b, function (h, u) {
                if (h.target == f) {
                    return e._getData(u);
                }
            }).bind("remove", function () {
                return e.destroy();
            });
        };
        q[a][b].prototype = q.extend({}, q.widget.prototype, d);
        q[a][b].getterSetter = "option";
    };
    q.widget.prototype = {
        _init: function () {},
        destroy: function () {
            this.element.removeData(this.widgetName).removeClass(this.widgetBaseClass + "-disabled " + this.namespace + "-state-disabled").removeAttr("aria-disabled");
        },
        option: function (b, a) {
            var d = b,
                e = this;
            if (typeof b == "string") {
                if (a === undefined) {
                    return this._getData(b);
                }
                d = {};
                d[b] = a;
            }
            q.each(d, function (g, f) {
                e._setData(g, f);
            });
        },
        _getData: function (a) {
            return this.options[a];
        },
        _setData: function (b, a) {
            this.options[b] = a;
            if (b == "disabled") {
                this.element[a ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled " + this.namespace + "-state-disabled").attr("aria-disabled", a);
            }
        },
        enable: function () {
            this._setData("disabled", false);
        },
        disable: function () {
            this._setData("disabled", true);
        },
        _trigger: function (b, a, h) {
            var f = this.options[b],
                e = (b == this.widgetEventPrefix ? b : this.widgetEventPrefix + b);
            a = q.Event(a);
            a.type = e;
            if (a.originalEvent) {
                for (var d = q.event.props.length, g; d;) {
                    g = q.event.props[--d];
                    a[g] = a.originalEvent[g];
                }
            }
            this.element.trigger(a, h);
            return !(q.isFunction(f) && f.call(this.element[0], a, h) === false || a.isDefaultPrevented());
        }
    };
    q.widget.defaults = {
        disabled: false
    };
    q.ui.mouse = {
        _mouseInit: function () {
            var a = this;
            this.element.bind("mousedown." + this.widgetName, function (b) {
                return a._mouseDown(b);
            }).bind("click." + this.widgetName, function (b) {
                if (a._preventClickEvent) {
                    a._preventClickEvent = false;
                    b.stopImmediatePropagation();
                    return false;
                }
            });
            if (q.browser.msie) {
                this._mouseUnselectable = this.element.attr("unselectable");
                this.element.attr("unselectable", "on");
            }
            this.started = false;
        },
        _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName);
            (q.browser.msie && this.element.attr("unselectable", this._mouseUnselectable));
        },
        _mouseDown: function (b) {
            b.originalEvent = b.originalEvent || {};
            if (b.originalEvent.mouseHandled) {
                return;
            }(this._mouseStarted && this._mouseUp(b));
            this._mouseDownEvent = b;
            var d = this,
                a = (b.which == 1),
                e = (typeof this.options.cancel == "string" ? q(b.target).parents().add(b.target).filter(this.options.cancel).length : false);
            if (!a || e || !this._mouseCapture(b)) {
                return true;
            }
            this.mouseDelayMet = !this.options.delay;
            if (!this.mouseDelayMet) {
                this._mouseDelayTimer = setTimeout(function () {
                    d.mouseDelayMet = true;
                }, this.options.delay);
            }
            if (this._mouseDistanceMet(b) && this._mouseDelayMet(b)) {
                this._mouseStarted = (this._mouseStart(b) !== false);
                if (!this._mouseStarted) {
                    b.preventDefault();
                    return true;
                }
            }
            this._mouseMoveDelegate = function (f) {
                return d._mouseMove(f);
            };
            this._mouseUpDelegate = function (f) {
                return d._mouseUp(f);
            };
            q(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
            (q.browser.safari || b.preventDefault());
            b.originalEvent.mouseHandled = true;
            return true;
        },
        _mouseMove: function (a) {
            if (q.browser.msie && !a.button) {
                return this._mouseUp(a);
            }
            if (this._mouseStarted) {
                this._mouseDrag(a);
                return a.preventDefault();
            }
            if (this._mouseDistanceMet(a) && this._mouseDelayMet(a)) {
                this._mouseStarted = (this._mouseStart(this._mouseDownEvent, a) !== false);
                (this._mouseStarted ? this._mouseDrag(a) : this._mouseUp(a));
            }
            return !this._mouseStarted;
        },
        _mouseUp: function (a) {
            q(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                this._preventClickEvent = (a.target == this._mouseDownEvent.target);
                this._mouseStop(a);
            }
            return false;
        },
        _mouseDistanceMet: function (a) {
            return (Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance);
        },
        _mouseDelayMet: function (a) {
            return this.mouseDelayMet;
        },
        _mouseStart: function (a) {},
        _mouseDrag: function (a) {},
        _mouseStop: function (a) {},
        _mouseCapture: function (a) {
            return true;
        }
    };
    q.ui.mouse.defaults = {
        cancel: null,
        distance: 1,
        delay: 0
    };
})(jQuery);
(function (b) {
    b.widget("ui.tabs", {
        _init: function () {
            if (this.options.deselectable !== undefined) {
                this.options.collapsible = this.options.deselectable;
            }
            this._tabify(true);
        },
        _setData: function (a, d) {
            if (a == "selected") {
                if (this.options.collapsible && d == this.options.selected) {
                    return;
                }
                this.select(d);
            } else {
                this.options[a] = d;
                if (a == "deselectable") {
                    this.options.collapsible = d;
                }
                this._tabify();
            }
        },
        _tabId: function (a) {
            return a.title && a.title.replace(/\s/g, "_").replace(/[^A-Za-z0-9\-_:\.]/g, "") || this.options.idPrefix + b.data(a);
        },
        _sanitizeSelector: function (a) {
            return a.replace(/:/g, "\\:");
        },
        _cookie: function () {
            var a = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + b.data(this.list[0]));
            return b.cookie.apply(null, [a].concat(b.makeArray(arguments)));
        },
        _ui: function (d, a) {
            return {
                tab: d,
                panel: a,
                index: this.anchors.index(d)
            };
        },
        _cleanup: function () {
            this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function () {
                var a = b(this);
                a.html(a.data("label.tabs")).removeData("label.tabs");
            });
        },
        _tabify: function (o) {
            this.list = this.element.children("ul:first");
            this.lis = b("li:has(a[href])", this.list);
            this.anchors = this.lis.map(function () {
                return b("a", this)[0];
            });
            this.panels = b([]);
            var a = this,
                z = this.options;
            var A = /^#.+/;
            this.anchors.each(function (h, l) {
                var k = b(l).attr("href");
                var g = k.split("#")[0],
                    f;
                if (g && (g === location.toString().split("#")[0] || (f = b("base")[0]) && g === f.href)) {
                    k = l.hash;
                    l.href = k;
                }
                if (A.test(k)) {
                    a.panels = a.panels.add(a._sanitizeSelector(k));
                } else {
                    if (k != "#") {
                        b.data(l, "href.tabs", k);
                        b.data(l, "load.tabs", k.replace(/#.*$/, ""));
                        var d = a._tabId(l);
                        l.href = "#" + d;
                        var e = b("#" + d);
                        if (!e.length) {
                            e = b(z.panelTemplate).attr("id", d).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(a.panels[h - 1] || a.list);
                            e.data("destroy.tabs", true);
                        }
                        a.panels = a.panels.add(e);
                    } else {
                        z.disabled.push(h);
                    }
                }
            });
            if (o) {
                this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
                this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
                this.lis.addClass("ui-state-default ui-corner-top");
                this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");
                if (z.selected === undefined) {
                    if (location.hash) {
                        this.anchors.each(function (d, e) {
                            if (e.hash == location.hash) {
                                z.selected = d;
                                return false;
                            }
                        });
                    }
                    if (typeof z.selected != "number" && z.cookie) {
                        z.selected = parseInt(a._cookie(), 10);
                    }
                    if (typeof z.selected != "number" && this.lis.filter(".ui-tabs-selected").length) {
                        z.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"));
                    }
                    z.selected = z.selected || 0;
                } else {
                    if (z.selected === null) {
                        z.selected = -1;
                    }
                }
                z.selected = ((z.selected >= 0 && this.anchors[z.selected]) || z.selected < 0) ? z.selected : 0;
                z.disabled = b.unique(z.disabled.concat(b.map(this.lis.filter(".ui-state-disabled"), function (d, e) {
                    return a.lis.index(d);
                }))).sort();
                if (b.inArray(z.selected, z.disabled) != -1) {
                    z.disabled.splice(b.inArray(z.selected, z.disabled), 1);
                }
                this.panels.addClass("ui-tabs-hide");
                this.lis.removeClass("ui-tabs-selected ui-state-active");
                if (z.selected >= 0 && this.anchors.length) {
                    this.panels.eq(z.selected).removeClass("ui-tabs-hide");
                    this.lis.eq(z.selected).addClass("ui-tabs-selected ui-state-active");
                    a.element.queue("tabs", function () {
                        a._trigger("show", null, a._ui(a.anchors[z.selected], a.panels[z.selected]));
                    });
                    this.load(z.selected);
                }
                b(window).bind("unload", function () {
                    a.lis.add(a.anchors).unbind(".tabs");
                    a.lis = a.anchors = a.panels = null;
                });
            } else {
                z.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"));
            }
            this.element[z.collapsible ? "addClass" : "removeClass"]("ui-tabs-collapsible");
            if (z.cookie) {
                this._cookie(z.selected, z.cookie);
            }
            for (var w = 0, q;
            (q = this.lis[w]); w++) {
                b(q)[b.inArray(w, z.disabled) != -1 && !b(q).hasClass("ui-tabs-selected") ? "addClass" : "removeClass"]("ui-state-disabled");
            }
            if (z.cache === false) {
                this.anchors.removeData("cache.tabs");
            }
            this.lis.add(this.anchors).unbind(".tabs");
            if (z.event != "mouseover") {
                var x = function (e, d) {
                        if (d.is(":not(.ui-state-disabled)")) {
                            d.addClass("ui-state-" + e);
                        }
                    };
                var u = function (e, d) {
                        d.removeClass("ui-state-" + e);
                    };
                this.lis.bind("mouseover.tabs", function () {
                    x("hover", b(this));
                });
                this.lis.bind("mouseout.tabs", function () {
                    u("hover", b(this));
                });
                this.anchors.bind("focus.tabs", function () {
                    x("focus", b(this).closest("li"));
                });
                this.anchors.bind("blur.tabs", function () {
                    u("focus", b(this).closest("li"));
                });
            }
            var B, v;
            if (z.fx) {
                if (b.isArray(z.fx)) {
                    B = z.fx[0];
                    v = z.fx[1];
                } else {
                    B = v = z.fx;
                }
            }
            function y(d, e) {
                d.css({
                    display: ""
                });
                if (b.browser.msie && e.opacity) {
                    d[0].style.removeAttribute("filter");
                }
            }
            var s = v ?
            function (d, e) {
                b(d).closest("li").removeClass("ui-state-default").addClass("ui-tabs-selected ui-state-active");
                e.hide().removeClass("ui-tabs-hide").animate(v, v.duration || "normal", function () {
                    y(e, v);
                    a._trigger("show", null, a._ui(d, e[0]));
                });
            } : function (d, e) {
                b(d).closest("li").removeClass("ui-state-default").addClass("ui-tabs-selected ui-state-active");
                e.removeClass("ui-tabs-hide");
                a._trigger("show", null, a._ui(d, e[0]));
            };
            var r = B ?
            function (e, d) {
                d.animate(B, B.duration || "normal", function () {
                    a.lis.removeClass("ui-tabs-selected ui-state-active").addClass("ui-state-default");
                    d.addClass("ui-tabs-hide");
                    y(d, B);
                    a.element.dequeue("tabs");
                });
            } : function (f, d, e) {
                a.lis.removeClass("ui-tabs-selected ui-state-active").addClass("ui-state-default");
                d.addClass("ui-tabs-hide");
                a.element.dequeue("tabs");
            };
            this.anchors.bind(z.event + ".tabs", function () {
                var g = this,
                    e = b(this).closest("li"),
                    d = a.panels.filter(":not(.ui-tabs-hide)"),
                    f = b(a._sanitizeSelector(this.hash));
                if ((e.hasClass("ui-tabs-selected") && !z.collapsible) || e.hasClass("ui-state-disabled") || e.hasClass("ui-state-processing") || a._trigger("select", null, a._ui(this, f[0])) === false) {
                    this.blur();
                    return false;
                }
                z.selected = a.anchors.index(this);
                a.abort();
                if (z.collapsible) {
                    if (e.hasClass("ui-tabs-selected")) {
                        z.selected = -1;
                        if (z.cookie) {
                            a._cookie(z.selected, z.cookie);
                        }
                        a.element.queue("tabs", function () {
                            r(g, d);
                        }).dequeue("tabs");
                        this.blur();
                        return false;
                    } else {
                        if (!d.length) {
                            if (z.cookie) {
                                a._cookie(z.selected, z.cookie);
                            }
                            a.element.queue("tabs", function () {
                                s(g, f);
                            });
                            a.load(a.anchors.index(this));
                            this.blur();
                            return false;
                        }
                    }
                }
                if (z.cookie) {
                    a._cookie(z.selected, z.cookie);
                }
                if (f.length) {
                    if (d.length) {
                        a.element.queue("tabs", function () {
                            r(g, d);
                        });
                    }
                    a.element.queue("tabs", function () {
                        s(g, f);
                    });
                    a.load(a.anchors.index(this));
                } else {
                    throw "jQuery UI Tabs: Mismatching fragment identifier.";
                }
                if (b.browser.msie) {
                    this.blur();
                }
            });
            this.anchors.bind("click.tabs", function () {
                return false;
            });
        },
        destroy: function () {
            var a = this.options;
            this.abort();
            this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");
            this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
            this.anchors.each(function () {
                var f = b.data(this, "href.tabs");
                if (f) {
                    this.href = f;
                }
                var e = b(this).unbind(".tabs");
                b.each(["href", "load", "cache"], function (g, d) {
                    e.removeData(d + ".tabs");
                });
            });
            this.lis.unbind(".tabs").add(this.panels).each(function () {
                if (b.data(this, "destroy.tabs")) {
                    b(this).remove();
                } else {
                    b(this).removeClass(["ui-state-default", "ui-corner-top", "ui-tabs-selected", "ui-state-active", "ui-state-hover", "ui-state-focus", "ui-state-disabled", "ui-tabs-panel", "ui-widget-content", "ui-corner-bottom", "ui-tabs-hide"].join(" "));
                }
            });
            if (a.cookie) {
                this._cookie(null, a.cookie);
            }
        },
        add: function (o, p, q) {
            if (q === undefined) {
                q = this.anchors.length;
            }
            var a = this,
                m = this.options,
                k = b(m.tabTemplate.replace(/#\{href\}/g, o).replace(/#\{label\}/g, p)),
                l = !o.indexOf("#") ? o.replace("#", "") : this._tabId(b("a", k)[0]);
            k.addClass("ui-state-default ui-corner-top").data("destroy.tabs", true);
            var n = b("#" + l);
            if (!n.length) {
                n = b(m.panelTemplate).attr("id", l).data("destroy.tabs", true);
            }
            n.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
            if (q >= this.lis.length) {
                k.appendTo(this.list);
                n.appendTo(this.list[0].parentNode);
            } else {
                k.insertBefore(this.lis[q]);
                n.insertBefore(this.panels[q]);
            }
            m.disabled = b.map(m.disabled, function (d, e) {
                return d >= q ? ++d : d;
            });
            this._tabify();
            if (this.anchors.length == 1) {
                k.addClass("ui-tabs-selected ui-state-active");
                n.removeClass("ui-tabs-hide");
                this.element.queue("tabs", function () {
                    a._trigger("show", null, a._ui(a.anchors[0], a.panels[0]));
                });
                this.load(0);
            }
            this._trigger("add", null, this._ui(this.anchors[q], this.panels[q]));
        },
        remove: function (a) {
            var g = this.options,
                f = this.lis.eq(a).remove(),
                h = this.panels.eq(a).remove();
            if (f.hasClass("ui-tabs-selected") && this.anchors.length > 1) {
                this.select(a + (a + 1 < this.anchors.length ? 1 : -1));
            }
            g.disabled = b.map(b.grep(g.disabled, function (d, e) {
                return d != a;
            }), function (d, e) {
                return d >= a ? --d : d;
            });
            this._tabify();
            this._trigger("remove", null, this._ui(f.find("a")[0], h[0]));
        },
        enable: function (a) {
            var d = this.options;
            if (b.inArray(a, d.disabled) == -1) {
                return;
            }
            this.lis.eq(a).removeClass("ui-state-disabled");
            d.disabled = b.grep(d.disabled, function (f, g) {
                return f != a;
            });
            this._trigger("enable", null, this._ui(this.anchors[a], this.panels[a]));
        },
        disable: function (f) {
            var a = this,
                e = this.options;
            if (f != e.selected) {
                this.lis.eq(f).addClass("ui-state-disabled");
                e.disabled.push(f);
                e.disabled.sort();
                this._trigger("disable", null, this._ui(this.anchors[f], this.panels[f]));
            }
        },
        select: function (a) {
            if (typeof a == "string") {
                a = this.anchors.index(this.anchors.filter("[href$=" + a + "]"));
            } else {
                if (a === null) {
                    a = -1;
                }
            }
            if (a == -1 && this.options.collapsible) {
                a = this.options.selected;
            }
            this.anchors.eq(a).trigger(this.options.event + ".tabs");
        },
        load: function (l) {
            var n = this,
                h = this.options,
                a = this.anchors.eq(l)[0],
                m = b.data(a, "load.tabs");
            this.abort();
            if (!m || this.element.queue("tabs").length !== 0 && b.data(a, "cache.tabs")) {
                this.element.dequeue("tabs");
                return;
            }
            this.lis.eq(l).addClass("ui-state-processing");
            if (h.spinner) {
                var k = b("span", a);
                k.data("label.tabs", k.html()).html(h.spinner);
            }
            this.xhr = b.ajax(b.extend({}, h.ajaxOptions, {
                url: m,
                success: function (e, f) {
                    b(n._sanitizeSelector(a.hash)).html(e);
                    n._cleanup();
                    if (h.cache) {
                        b.data(a, "cache.tabs", true);
                    }
                    n._trigger("load", null, n._ui(n.anchors[l], n.panels[l]));
                    try {
                        h.ajaxOptions.success(e, f);
                    } catch (d) {}
                    n.element.dequeue("tabs");
                }
            }));
        },
        abort: function () {
            this.element.queue([]);
            this.panels.stop(false, true);
            if (this.xhr) {
                this.xhr.abort();
                delete this.xhr;
            }
            this._cleanup();
        },
        url: function (d, a) {
            this.anchors.eq(d).removeData("cache.tabs").data("load.tabs", a);
        },
        length: function () {
            return this.anchors.length;
        }
    });
    b.extend(b.ui.tabs, {
        version: "1.7.2",
        getter: "length",
        defaults: {
            ajaxOptions: null,
            cache: false,
            cookie: null,
            collapsible: false,
            disabled: [],
            event: "click",
            fx: null,
            idPrefix: "ui-tabs-",
            panelTemplate: "<div></div>",
            spinner: "<em>Loading&#8230;</em>",
            tabTemplate: '<li><a href="#{href}"><span>#{label}</span></a></li>'
        }
    });
    b.extend(b.ui.tabs.prototype, {
        rotation: null,
        rotate: function (m, k) {
            var a = this,
                h = this.options;
            var n = a._rotate || (a._rotate = function (d) {
                clearTimeout(a.rotation);
                a.rotation = setTimeout(function () {
                    var e = h.selected;
                    a.select(++e < a.anchors.length ? e : 0);
                }, m);
                if (d) {
                    d.stopPropagation();
                }
            });
            var l = a._unrotate || (a._unrotate = !k ?
            function (d) {
                if (d.clientX) {
                    a.rotate(null);
                }
            } : function (d) {
                t = h.selected;
                n();
            });
            if (m) {
                this.element.bind("tabsshow", n);
                this.anchors.bind(h.event + ".tabs", l);
                n();
            } else {
                clearTimeout(a.rotation);
                this.element.unbind("tabsshow", n);
                this.anchors.unbind(h.event + ".tabs", l);
                delete this._rotate;
                delete this._unrotate;
            }
        }
    });
})(jQuery);
jQuery.extend(jQuery.easing, {
    easeInQuad: function (e, f, a, h, g) {
        return h * (f /= g) * f + a;
    },
    easeOutQuad: function (e, f, a, h, g) {
        return -h * (f /= g) * (f - 2) + a;
    },
    easeInOutQuad: function (e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f + a;
        }
        return -h / 2 * ((--f) * (f - 2) - 1) + a;
    },
    easeInCubic: function (e, f, a, h, g) {
        return h * (f /= g) * f * f + a;
    },
    easeOutCubic: function (e, f, a, h, g) {
        return h * ((f = f / g - 1) * f * f + 1) + a;
    },
    easeInOutCubic: function (e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f + a;
        }
        return h / 2 * ((f -= 2) * f * f + 2) + a;
    },
    easeInQuart: function (e, f, a, h, g) {
        return h * (f /= g) * f * f * f + a;
    },
    easeOutQuart: function (e, f, a, h, g) {
        return -h * ((f = f / g - 1) * f * f * f - 1) + a;
    },
    easeInOutQuart: function (e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f * f + a;
        }
        return -h / 2 * ((f -= 2) * f * f * f - 2) + a;
    },
    easeInQuint: function (e, f, a, h, g) {
        return h * (f /= g) * f * f * f * f + a;
    },
    easeOutQuint: function (e, f, a, h, g) {
        return h * ((f = f / g - 1) * f * f * f * f + 1) + a;
    },
    easeInOutQuint: function (e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f * f * f + a;
        }
        return h / 2 * ((f -= 2) * f * f * f * f + 2) + a;
    },
    easeInSine: function (e, f, a, h, g) {
        return -h * Math.cos(f / g * (Math.PI / 2)) + h + a;
    },
    easeOutSine: function (e, f, a, h, g) {
        return h * Math.sin(f / g * (Math.PI / 2)) + a;
    },
    easeInOutSine: function (e, f, a, h, g) {
        return -h / 2 * (Math.cos(Math.PI * f / g) - 1) + a;
    },
    easeInExpo: function (e, f, a, h, g) {
        return (f == 0) ? a : h * Math.pow(2, 10 * (f / g - 1)) + a;
    },
    easeOutExpo: function (e, f, a, h, g) {
        return (f == g) ? a + h : h * (-Math.pow(2, -10 * f / g) + 1) + a;
    },
    easeInOutExpo: function (e, f, a, h, g) {
        if (f == 0) {
            return a;
        }
        if (f == g) {
            return a + h;
        }
        if ((f /= g / 2) < 1) {
            return h / 2 * Math.pow(2, 10 * (f - 1)) + a;
        }
        return h / 2 * (-Math.pow(2, -10 * --f) + 2) + a;
    },
    easeInCirc: function (e, f, a, h, g) {
        return -h * (Math.sqrt(1 - (f /= g) * f) - 1) + a;
    },
    easeOutCirc: function (e, f, a, h, g) {
        return h * Math.sqrt(1 - (f = f / g - 1) * f) + a;
    },
    easeInOutCirc: function (e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return -h / 2 * (Math.sqrt(1 - f * f) - 1) + a;
        }
        return h / 2 * (Math.sqrt(1 - (f -= 2) * f) + 1) + a;
    },
    easeInElastic: function (f, h, e, n, m) {
        var k = 1.70158;
        var l = 0;
        var g = n;
        if (h == 0) {
            return e;
        }
        if ((h /= m) == 1) {
            return e + n;
        }
        if (!l) {
            l = m * 0.3;
        }
        if (g < Math.abs(n)) {
            g = n;
            var k = l / 4;
        } else {
            var k = l / (2 * Math.PI) * Math.asin(n / g);
        }
        return -(g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * m - k) * (2 * Math.PI) / l)) + e;
    },
    easeOutElastic: function (f, h, e, n, m) {
        var k = 1.70158;
        var l = 0;
        var g = n;
        if (h == 0) {
            return e;
        }
        if ((h /= m) == 1) {
            return e + n;
        }
        if (!l) {
            l = m * 0.3;
        }
        if (g < Math.abs(n)) {
            g = n;
            var k = l / 4;
        } else {
            var k = l / (2 * Math.PI) * Math.asin(n / g);
        }
        return g * Math.pow(2, -10 * h) * Math.sin((h * m - k) * (2 * Math.PI) / l) + n + e;
    },
    easeInOutElastic: function (f, h, e, n, m) {
        var k = 1.70158;
        var l = 0;
        var g = n;
        if (h == 0) {
            return e;
        }
        if ((h /= m / 2) == 2) {
            return e + n;
        }
        if (!l) {
            l = m * (0.3 * 1.5);
        }
        if (g < Math.abs(n)) {
            g = n;
            var k = l / 4;
        } else {
            var k = l / (2 * Math.PI) * Math.asin(n / g);
        }
        if (h < 1) {
            return -0.5 * (g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * m - k) * (2 * Math.PI) / l)) + e;
        }
        return g * Math.pow(2, -10 * (h -= 1)) * Math.sin((h * m - k) * (2 * Math.PI) / l) * 0.5 + n + e;
    },
    easeInBack: function (e, f, a, k, h, g) {
        if (g == undefined) {
            g = 1.70158;
        }
        return k * (f /= h) * f * ((g + 1) * f - g) + a;
    },
    easeOutBack: function (e, f, a, k, h, g) {
        if (g == undefined) {
            g = 1.70158;
        }
        return k * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a;
    },
    easeInOutBack: function (e, f, a, k, h, g) {
        if (g == undefined) {
            g = 1.70158;
        }
        if ((f /= h / 2) < 1) {
            return k / 2 * (f * f * (((g *= (1.525)) + 1) * f - g)) + a;
        }
        return k / 2 * ((f -= 2) * f * (((g *= (1.525)) + 1) * f + g) + 2) + a;
    },
    easeInBounce: function (e, f, a, h, g) {
        return h - jQuery.easing.easeOutBounce(e, g - f, 0, h, g) + a;
    },
    easeOutBounce: function (e, f, a, h, g) {
        if ((f /= g) < (1 / 2.75)) {
            return h * (7.5625 * f * f) + a;
        } else {
            if (f < (2 / 2.75)) {
                return h * (7.5625 * (f -= (1.5 / 2.75)) * f + 0.75) + a;
            } else {
                if (f < (2.5 / 2.75)) {
                    return h * (7.5625 * (f -= (2.25 / 2.75)) * f + 0.9375) + a;
                } else {
                    return h * (7.5625 * (f -= (2.625 / 2.75)) * f + 0.984375) + a;
                }
            }
        }
    },
    easeInOutBounce: function (e, f, a, h, g) {
        if (f < g / 2) {
            return jQuery.easing.easeInBounce(e, f * 2, 0, h, g) * 0.5 + a;
        }
        return jQuery.easing.easeOutBounce(e, f * 2 - g, 0, h, g) * 0.5 + h * 0.5 + a;
    }
});
(function (Z, ac) {
    function aa() {}
    function I(a) {
        ab = [a];
    }
    function R(a) {
        Y.insertBefore(a, Y.firstChild);
    }
    function S(a, d, b) {
        return a && a.apply(d.context || d, b);
    }
    function T(a) {
        return /\?/.test(a) ? "&" : "?";
    }
    var Q = "async",
        J = "charset",
        M = "",
        N = "error",
        K = "_jqjsp",
        F = "on",
        P = F + "click",
        O = F + N,
        ad = F + "load",
        V = F + "readystatechange",
        C = "removeChild",
        X = "<script/>",
        G = "success",
        D = "timeout",
        E = Z.browser,
        Y = Z("head")[0] || document.documentElement,
        H = {},
        U = 0,
        ab, W = {
            callback: K,
            url: location.href
        };

    function L(b) {
        b = Z.extend({}, W, b);
        var e = b.complete,
            s = b.dataFilter,
            k = b.callbackParameter,
            d = b.callback,
            q = b.cache,
            n = b.pageCache,
            o = b.charset,
            a = b.url,
            l = b.data,
            f = b.timeout,
            g, m = 0,
            p = aa;
        b.abort = function () {
            !m++ && p();
        };
        if (S(b.beforeSend, b, [b]) === false || m) {
            return b;
        }
        a = a || M;
        l = l ? ((typeof l) == "string" ? l : Z.param(l, b.traditional)) : M;
        a += l ? (T(a) + l) : M;
        k && (a += T(a) + encodeURIComponent(k) + "=?");
        !q && !n && (a += T(a) + "_" + (new Date()).getTime() + "=");
        a = a.replace(/=\?(&|$)/, "=" + d + "$1");

        function h(u) {
            !m++ && ac(function () {
                p();
                n && (H[a] = {
                    s: [u]
                });
                s && (u = s.apply(b, [u]));
                S(b.success, b, [u, G]);
                S(e, b, [b, G]);
            }, 0);
        }
        function r(u) {
            !m++ && ac(function () {
                p();
                n && u != D && (H[a] = u);
                S(b.error, b, [b, u]);
                S(e, b, [b, u]);
            }, 0);
        }
        n && (g = H[a]) ? (g.s ? h(g.s[0]) : r(g)) : ac(function (w, x, v) {
            if (!m) {
                v = f > 0 && ac(function () {
                    r(D);
                }, f);
                p = function () {
                    v && clearTimeout(v);
                    w[V] = w[P] = w[ad] = w[O] = null;
                    Y[C](w);
                    x && Y[C](x);
                };
                window[d] = I;
                w = Z(X)[0];
                w.id = K + U++;
                if (o) {
                    w[J] = o;
                }
                function u(y) {
                    (w[P] || aa)();
                    y = ab;
                    ab = undefined;
                    y ? h(y[0]) : r(N);
                }
                if (E.msie) {
                    w.event = P;
                    w.htmlFor = w.id;
                    w[V] = function () {
                        /loaded|complete/.test(w.readyState) && u();
                    };
                } else {
                    w[O] = w[ad] = u;
                    E.opera ? ((x = Z(X)[0]).text = "jQuery('#" + w.id + "')[0]." + O + "()") : w[Q] = Q;
                }
                w.src = a;
                R(w);
                x && R(x);
            }
        }, 0);
        return b;
    }
    L.setup = function (a) {
        Z.extend(W, a);
    };
    Z.jsonp = L;
})(jQuery, setTimeout);
eval(function (h, b, l, d, g, f) {
    g = function (a) {
        return (a < b ? "" : g(parseInt(a / b))) + ((a = a % b) > 35 ? String.fromCharCode(a + 29) : a.toString(36));
    };
    if (!"".replace(/^/, String)) {
        while (l--) {
            f[g(l)] = d[l] || g(l);
        }
        d = [function (a) {
            return f[a];
        }];
        g = function () {
            return "\\w+";
        };
        l = 1;
    }
    while (l--) {
        if (d[l]) {
            h = h.replace(new RegExp("\\b" + g(l) + "\\b", "g"), d[l]);
        }
    }
    return h;
}("(9($){$.1s.A=9(o){z 4.14(9(){2H r(4,o)})};8 q={W:F,23:1,1G:1,u:7,15:3,16:7,1H:'2I',24:'2J',1i:0,B:7,1j:7,1I:7,25:7,26:7,27:7,28:7,29:7,2a:7,2b:7,1J:'<N></N>',1K:'<N></N>',2c:'2d',2e:'2d',1L:7,1M:7};$.A=9(e,o){4.5=$.17({},q,o||{});4.Q=F;4.D=7;4.H=7;4.t=7;4.R=7;4.S=7;4.O=!4.5.W?'1N':'2f';4.E=!4.5.W?'2g':'2h';8 a='',1d=e.J.1d(' ');1k(8 i=0;i<1d.K;i++){6(1d[i].2i('A-2j')!=-1){$(e).1t(1d[i]);8 a=1d[i];1l}}6(e.2k=='2K'||e.2k=='2L'){4.t=$(e);4.D=4.t.18();6(4.D.1m('A-H')){6(!4.D.18().1m('A-D'))4.D=4.D.B('<N></N>');4.D=4.D.18()}X 6(!4.D.1m('A-D'))4.D=4.t.B('<N></N>').18()}X{4.D=$(e);4.t=$(e).2M('>2l,>2m,N>2l,N>2m')}6(a!=''&&4.D.18()[0].J.2i('A-2j')==-1)4.D.B('<N 2N=\" '+a+'\"></N>');4.H=4.t.18();6(!4.H.K||!4.H.1m('A-H'))4.H=4.t.B('<N></N>').18();4.S=$('.A-11',4.D);6(4.S.u()==0&&4.5.1K!=7)4.S=4.H.1u(4.5.1K).11();4.S.V(4.J('A-11'));4.R=$('.A-19',4.D);6(4.R.u()==0&&4.5.1J!=7)4.R=4.H.1u(4.5.1J).11();4.R.V(4.J('A-19'));4.H.V(4.J('A-H'));4.t.V(4.J('A-t'));4.D.V(4.J('A-D'));8 b=4.5.16!=7?1n.1O(4.1o()/4.5.16):7;8 c=4.t.2O('1v');8 d=4;6(c.u()>0){8 f=0,i=4.5.1G;c.14(9(){d.1P(4,i++);f+=d.T(4,b)});4.t.y(4.O,f+'U');6(!o||o.u===L)4.5.u=c.u()}4.D.y('1w','1x');4.R.y('1w','1x');4.S.y('1w','1x');4.2n=9(){d.19()};4.2o=9(){d.11()};4.1Q=9(){d.2p()};6(4.5.1j!=7)4.5.1j(4,'2q');6($.2r.2s){4.1e(F,F);$(2t).1y('2P',9(){d.1z()})}X 4.1z()};8 r=$.A;r.1s=r.2Q={A:'0.2.3'};r.1s.17=r.17=$.17;r.1s.17({1z:9(){4.C=7;4.G=7;4.Y=7;4.12=7;4.1a=F;4.1f=7;4.P=7;4.Z=F;6(4.Q)z;4.t.y(4.E,4.1A(4.5.1G)+'U');8 p=4.1A(4.5.23);4.Y=4.12=7;4.1p(p,F);$(2t).1R('2u',4.1Q).1y('2u',4.1Q)},2v:9(){4.t.2w();4.t.y(4.E,'2R');4.t.y(4.O,'2S');6(4.5.1j!=7)4.5.1j(4,'2v');4.1z()},2p:9(){6(4.P!=7&&4.Z)4.t.y(4.E,r.I(4.t.y(4.E))+4.P);4.P=7;4.Z=F;6(4.5.1I!=7)4.5.1I(4);6(4.5.16!=7){8 a=4;8 b=1n.1O(4.1o()/4.5.16),O=0,E=0;$('1v',4.t).14(9(i){O+=a.T(4,b);6(i+1<a.C)E=O});4.t.y(4.O,O+'U');4.t.y(4.E,-E+'U')}4.15(4.C,F)},2T:9(){4.Q=1g;4.1e()},2U:9(){4.Q=F;4.1e()},u:9(s){6(s!=L){4.5.u=s;6(!4.Q)4.1e()}z 4.5.u},2V:9(i,a){6(a==L||!a)a=i;6(4.5.u!==7&&a>4.5.u)a=4.5.u;1k(8 j=i;j<=a;j++){8 e=4.M(j);6(!e.K||e.1m('A-1b-1B'))z F}z 1g},M:9(i){z $('.A-1b-'+i,4.t)},2x:9(i,s){8 e=4.M(i),1S=0,2x=0;6(e.K==0){8 c,e=4.1C(i),j=r.I(i);1q(c=4.M(--j)){6(j<=0||c.K){j<=0?4.t.2y(e):c.1T(e);1l}}}X 1S=4.T(e);e.1t(4.J('A-1b-1B'));1U s=='2W'?e.2X(s):e.2w().2Y(s);8 a=4.5.16!=7?1n.1O(4.1o()/4.5.16):7;8 b=4.T(e,a)-1S;6(i>0&&i<4.C)4.t.y(4.E,r.I(4.t.y(4.E))-b+'U');4.t.y(4.O,r.I(4.t.y(4.O))+b+'U');z e},1V:9(i){8 e=4.M(i);6(!e.K||(i>=4.C&&i<=4.G))z;8 d=4.T(e);6(i<4.C)4.t.y(4.E,r.I(4.t.y(4.E))+d+'U');e.1V();4.t.y(4.O,r.I(4.t.y(4.O))-d+'U')},19:9(){4.1D();6(4.P!=7&&!4.Z)4.1W(F);X 4.15(((4.5.B=='1X'||4.5.B=='G')&&4.5.u!=7&&4.G==4.5.u)?1:4.C+4.5.15)},11:9(){4.1D();6(4.P!=7&&4.Z)4.1W(1g);X 4.15(((4.5.B=='1X'||4.5.B=='C')&&4.5.u!=7&&4.C==1)?4.5.u:4.C-4.5.15)},1W:9(b){6(4.Q||4.1a||!4.P)z;8 a=r.I(4.t.y(4.E));!b?a-=4.P:a+=4.P;4.Z=!b;4.Y=4.C;4.12=4.G;4.1p(a)},15:9(i,a){6(4.Q||4.1a)z;4.1p(4.1A(i),a)},1A:9(i){6(4.Q||4.1a)z;i=r.I(i);6(4.5.B!='1c')i=i<1?1:(4.5.u&&i>4.5.u?4.5.u:i);8 a=4.C>i;8 b=r.I(4.t.y(4.E));8 f=4.5.B!='1c'&&4.C<=1?1:4.C;8 c=a?4.M(f):4.M(4.G);8 j=a?f:f-1;8 e=7,l=0,p=F,d=0;1q(a?--j>=i:++j<i){e=4.M(j);p=!e.K;6(e.K==0){e=4.1C(j).V(4.J('A-1b-1B'));c[a?'1u':'1T'](e)}c=e;d=4.T(e);6(p)l+=d;6(4.C!=7&&(4.5.B=='1c'||(j>=1&&(4.5.u==7||j<=4.5.u))))b=a?b+d:b-d}8 g=4.1o();8 h=[];8 k=0,j=i,v=0;8 c=4.M(i-1);1q(++k){e=4.M(j);p=!e.K;6(e.K==0){e=4.1C(j).V(4.J('A-1b-1B'));c.K==0?4.t.2y(e):c[a?'1u':'1T'](e)}c=e;8 d=4.T(e);6(d==0){2Z('30: 31 1N/2f 32 1k 33. 34 35 36 37 38 39. 3a...');z 0}6(4.5.B!='1c'&&4.5.u!==7&&j>4.5.u)h.3b(e);X 6(p)l+=d;v+=d;6(v>=g)1l;j++}1k(8 x=0;x<h.K;x++)h[x].1V();6(l>0){4.t.y(4.O,4.T(4.t)+l+'U');6(a){b-=l;4.t.y(4.E,r.I(4.t.y(4.E))-l+'U')}}8 n=i+k-1;6(4.5.B!='1c'&&4.5.u&&n>4.5.u)n=4.5.u;6(j>n){k=0,j=n,v=0;1q(++k){8 e=4.M(j--);6(!e.K)1l;v+=4.T(e);6(v>=g)1l}}8 o=n-k+1;6(4.5.B!='1c'&&o<1)o=1;6(4.Z&&a){b+=4.P;4.Z=F}4.P=7;6(4.5.B!='1c'&&n==4.5.u&&(n-k+1)>=1){8 m=r.10(4.M(n),!4.5.W?'1r':'1Y');6((v-m)>g)4.P=v-g-m}1q(i-->o)b+=4.T(4.M(i));4.Y=4.C;4.12=4.G;4.C=o;4.G=n;z b},1p:9(p,a){6(4.Q||4.1a)z;4.1a=1g;8 b=4;8 c=9(){b.1a=F;6(p==0)b.t.y(b.E,0);6(b.5.B=='1X'||b.5.B=='G'||b.5.u==7||b.G<b.5.u)b.2z();b.1e();b.1Z('2A')};4.1Z('3c');6(!4.5.1H||a==F){4.t.y(4.E,p+'U');c()}X{8 o=!4.5.W?{'2g':p}:{'2h':p};4.t.1p(o,4.5.1H,4.5.24,c)}},2z:9(s){6(s!=L)4.5.1i=s;6(4.5.1i==0)z 4.1D();6(4.1f!=7)z;8 a=4;4.1f=3d(9(){a.19()},4.5.1i*3e)},1D:9(){6(4.1f==7)z;3f(4.1f);4.1f=7},1e:9(n,p){6(n==L||n==7){8 n=!4.Q&&4.5.u!==0&&((4.5.B&&4.5.B!='C')||4.5.u==7||4.G<4.5.u);6(!4.Q&&(!4.5.B||4.5.B=='C')&&4.5.u!=7&&4.G>=4.5.u)n=4.P!=7&&!4.Z}6(p==L||p==7){8 p=!4.Q&&4.5.u!==0&&((4.5.B&&4.5.B!='G')||4.C>1);6(!4.Q&&(!4.5.B||4.5.B=='G')&&4.5.u!=7&&4.C==1)p=4.P!=7&&4.Z}8 a=4;4.R[n?'1y':'1R'](4.5.2c,4.2n)[n?'1t':'V'](4.J('A-19-1E')).20('1E',n?F:1g);4.S[p?'1y':'1R'](4.5.2e,4.2o)[p?'1t':'V'](4.J('A-11-1E')).20('1E',p?F:1g);6(4.R.K>0&&(4.R[0].1h==L||4.R[0].1h!=n)&&4.5.1L!=7){4.R.14(9(){a.5.1L(a,4,n)});4.R[0].1h=n}6(4.S.K>0&&(4.S[0].1h==L||4.S[0].1h!=p)&&4.5.1M!=7){4.S.14(9(){a.5.1M(a,4,p)});4.S[0].1h=p}},1Z:9(a){8 b=4.Y==7?'2q':(4.Y<4.C?'19':'11');4.13('25',a,b);6(4.Y!==4.C){4.13('26',a,b,4.C);4.13('27',a,b,4.Y)}6(4.12!==4.G){4.13('28',a,b,4.G);4.13('29',a,b,4.12)}4.13('2a',a,b,4.C,4.G,4.Y,4.12);4.13('2b',a,b,4.Y,4.12,4.C,4.G)},13:9(a,b,c,d,e,f,g){6(4.5[a]==L||(1U 4.5[a]!='2B'&&b!='2A'))z;8 h=1U 4.5[a]=='2B'?4.5[a][b]:4.5[a];6(!$.3g(h))z;8 j=4;6(d===L)h(j,c,b);X 6(e===L)4.M(d).14(9(){h(j,4,d,c,b)});X{1k(8 i=d;i<=e;i++)6(i!==7&&!(i>=f&&i<=g))4.M(i).14(9(){h(j,4,i,c,b)})}},1C:9(i){z 4.1P('<1v></1v>',i)},1P:9(e,i){8 a=$(e).V(4.J('A-1b')).V(4.J('A-1b-'+i));a.20('3h',i);z a},J:9(c){z c+' '+c+(!4.5.W?'-3i':'-W')},T:9(e,d){8 a=e.2C!=L?e[0]:e;8 b=!4.5.W?a.1F+r.10(a,'2D')+r.10(a,'1r'):a.2E+r.10(a,'2F')+r.10(a,'1Y');6(d==L||b==d)z b;8 w=!4.5.W?d-r.10(a,'2D')-r.10(a,'1r'):d-r.10(a,'2F')-r.10(a,'1Y');$(a).y(4.O,w+'U');z 4.T(a)},1o:9(){z!4.5.W?4.H[0].1F-r.I(4.H.y('3j'))-r.I(4.H.y('3k')):4.H[0].2E-r.I(4.H.y('3l'))-r.I(4.H.y('3m'))},3n:9(i,s){6(s==L)s=4.5.u;z 1n.3o((((i-1)/s)-1n.3p((i-1)/s))*s)+1}});r.17({3q:9(d){z $.17(q,d||{})},10:9(e,p){6(!e)z 0;8 a=e.2C!=L?e[0]:e;6(p=='1r'&&$.2r.2s){8 b={'1w':'1x','3r':'3s','1N':'1i'},21,22;$.2G(a,b,9(){21=a.1F});b['1r']=0;$.2G(a,b,9(){22=a.1F});z 22-21}z r.I($.y(a,p))},I:9(v){v=3t(v);z 3u(v)?0:v}})})(3v);", 62, 218, "||||this|options|if|null|var|function||||||||||||||||||||list|size||||css|return|jcarousel|wrap|first|container|lt|false|last|clip|intval|className|length|undefined|get|div|wh|tail|locked|buttonNext|buttonPrev|dimension|px|addClass|vertical|else|prevFirst|inTail|margin|prev|prevLast|callback|each|scroll|visible|extend|parent|next|animating|item|circular|split|buttons|timer|true|jcarouselstate|auto|initCallback|for|break|hasClass|Math|clipping|animate|while|marginRight|fn|removeClass|before|li|display|block|bind|setup|pos|placeholder|create|stopAuto|disabled|offsetWidth|offset|animation|reloadCallback|buttonNextHTML|buttonPrevHTML|buttonNextCallback|buttonPrevCallback|width|ceil|format|funcResize|unbind|old|after|typeof|remove|scrollTail|both|marginBottom|notify|attr|oWidth|oWidth2|start|easing|itemLoadCallback|itemFirstInCallback|itemFirstOutCallback|itemLastInCallback|itemLastOutCallback|itemVisibleInCallback|itemVisibleOutCallback|buttonNextEvent|click|buttonPrevEvent|height|left|top|indexOf|skin|nodeName|ul|ol|funcNext|funcPrev|reload|init|browser|safari|window|resize|reset|empty|add|prepend|startAuto|onAfterAnimation|object|jquery|marginLeft|offsetHeight|marginTop|swap|new|normal|swing|UL|OL|find|class|children|load|prototype|0px|10px|lock|unlock|has|string|html|append|isNan|jCarousel|No|set|items|This|will|cause|an|infinite|loop|Aborting|push|onBeforeAnimation|setTimeout|1000|clearTimeout|isFunction|jcarouselindex|horizontal|borderLeftWidth|borderRightWidth|borderTopWidth|borderBottomWidth|index|round|floor|defaults|float|none|parseInt|isNaN|jQuery".split("|"), 0, {}));
var cnnad_tileID = cnnad_getID();
var cnnad_enabled = true;
var cnnad_adIframes = new Array();
var cnnad_adVault = new Array();
var cnnad_adCache = new Array();
var cnnad_interstitialPID = null;
var cnnad_interstitialPlaying = false;
var cnnad_transactionID = null;
document.cnnAdDisplayAds = (document.location.host == "jcmsprod8.turner.com:84") ? false : true;
var alreadySwappedDETargetImage = false;
var cnnDEadDEonCookie = false;
var cnnDocDomain = cnnad_getTld(location.hostname);
var cnnad_pageMode = 1;
var cnnad_calledURLs = new Array();
var cnnad_successfulSend = 0;
var cnnad_resultArray = new Array();
var cnnad_ADMSizes = new Array();
cnnad_ADMSizes = ["728x90", "300x250", "336x280", "160x600", "336x850", "300x600"];

function cnnad_setADMSizes(a) {
    cnnad_ADMSizes = a;
}
function cnnad_parseReferrer(b) {
    if (!b) {
        return null;
    }
    var d = b.substring(0, b.indexOf("/", 7));
    if (d.indexOf(":", 5) > 0) {
        d = d.substring(0, b.indexOf(":", 5));
    }
    d = d.substring(d.lastIndexOf("/") + 1);
    var a = d.split(".");
    return (a[a.length - 2] + "." + a[a.length - 1]);
}
function cnnad_sendADMData() {
    var h = "";
    for (as = 0; as < cnnad_ADMSizes.length; as++) {
        var d = cnnad_calledURLs[cnnad_ADMSizes[as]];
        if (d && cnnad_successfulSend == 0) {
            if (cnnad_pageMode != 3) {
                h += "<scr" + "ipt> \n ";
                if (cnnad_pageMode == 1) {
                    h += '  A09801.DM_cat("';
                    var b = cnnad_getParamValue(d, "site=", "&");
                    var e = cnnad_getParamValue(d, "_rollup=", "&");
                    var g = cnnad_getParamValue(d, "_section=", "&");
                    var f = cnnad_getParamValue(d, "_subsection=", "&");
                    var a = cnnad_parseReferrer(document.referrer);
                    h += b;
                    if ((b != "") && ((e != "") || (g != "") || (f != ""))) {
                        h += " > ";
                    }
                    h += e;
                    if ((e != "") && ((g != "") || (f != ""))) {
                        h += " > ";
                    }
                    h += g;
                    if ((g != "") && (f != "")) {
                        h += " > ";
                    }
                    h += f;
                    h += '"); \n ';
                    if (a) {
                        h += ' A09801.DM_addEncToLoc("refer", "' + a + '"); \n ';
                    } else {
                        h += " A09801.DM_addEncToLoc(); \n ";
                    }
                }
                h += "  A09801.DM_tag(); \n ";
                h += "</scr" + "ipt> \n ";
                document.write(h);
            }
            cnnad_successfulSend = 1;
            break;
        }
    }
}
function cnnad_getParamValue(f, g, d) {
    if (f.match(g)) {
        var a = f.indexOf(g) + g.length;
        var b = f.indexOf(d, a);
        var e = f.substring(a, b);
        return e;
    } else {
        return "";
    }
}
var cnnad_adTileIDGroup = new Array();
var cnnad_newTileIDIteration = 0;
var cnnad_tileExemptions = new Array();

function cnnad_addExemptCriteria() {
    var a = cnnad_tileExemptions.length;
    if (arguments.length % 2 != 0) {
        return;
    }
    cnnad_tileExemptions[a] = new Array();
    for (var b = 0; b < arguments.length; b += 2) {
        cnnad_tileExemptions[a][arguments[b]] = arguments[b + 1];
    }
}
function cnnad_checkTileExempt(d) {
    var a;
    for (var b = 0; b < cnnad_tileExemptions.length; b++) {
        a = true;
        for (adKey in cnnad_tileExemptions[b]) {
            adValue = cnnad_getParamValue(d, adKey + "=", "&");
            if (cnnad_tileExemptions[b][adKey] != adValue) {
                a = false;
                break;
            }
        }
        if (a) {
            return true;
        }
    }
    return false;
}
function cnnad_newTileIDGroup(d) {
    var b = (cnnad_tileID * 1 + 4 * (++cnnad_newTileIDIteration));
    for (var a = 0; a < d.length; a++) {
        cnnad_adTileIDGroup[cnnad_adTileIDGroup.length] = {
            tileID: b,
            adName: d[a]
        };
    }
}
function cnnad_getDynamicTileID(d) {
    var b = cnnad_tileID;
    if (cnnad_checkTileExempt(d)) {
        return b;
    }
    if (cnnad_adTileIDGroup.length > 0) {
        var f;
        if (d.match("_position=")) {
            f = cnnad_getParamValue(d, "_position=", "&");
        } else {
            if (d.match("_pos=")) {
                f = cnnad_getParamValue(d, "_pos=", "&");
            } else {
                f = "";
            }
        }
        for (var a = 0; a < cnnad_adTileIDGroup.length; a++) {
            var e = cnnad_adTileIDGroup[a].adName;
            if (f == e) {
                b = cnnad_adTileIDGroup[a].tileID;
                break;
            }
        }
    }
    return b;
}
function cnnad_debug(a) {
    if (typeof (console) != "undefined" && typeof (console.debug) != "undefined") {
        console.debug(a);
    }
}
function cnnad_error(a) {
    if (typeof (console) != "undefined" && typeof (console.error) != "undefined") {
        console.error(a);
    }
}
function cnnad_reverseString(b) {
    b = "" + b;
    var a = "";
    if (b.length) {
        var d;
        for (d = b.length; d > 0; d--) {
            a += b.charAt(d - 1);
        }
    }
    return (a);
}
function cnnad_getID() {
    return (cnnad_reverseString(new Date().getTime()));
}
function cnnad_renderAd(a) {
    if (!document.cnnAdDisplayAds) {
        document.write('<div style="display: block; background: #444; color: #fff; font-size: 10px; text-align: center; ">Ad</div>');
        return;
    }
    a = cnnad_preview(a);
    a = cnnad_statusCodeQA(a);
    if (cnnad_enabled == true) {
        document.write('<script type="text/javascript"');
        document.write(' src="' + a + "&tile=" + cnnad_getDynamicTileID(a) + "&transactionID=" + cnnad_getTransactionID() + '"></scr');
        document.write("ipt>");
    }
}
function cnnad_preview(b) {
    if (location.host.indexOf("turner.com") > -1) {
        b = b.replace(new RegExp("ads..*?.com", "gi"), "ads.turner.com");
        b = b.replace(new RegExp("ads..*?.tv", "gi"), "ads.turner.com");
    }
    var a = cnnad_readCookie("ug");
    if (a) {
        b = b + "&Params.User.UserID=" + a;
    } else {
        b = b + "&Params.User.UserID=";
    }
    return b;
}
function cnnad_getTransactionID() {
    if (cnnad_transactionID == null) {
        cnnad_transactionID = "";
        cnnad_transactionID = Math.floor(Math.random() * 9007199254740992);
    }
    return cnnad_transactionID;
}
function cnnad_isBlocking(b) {
    var a = false;
    if (document.getElementById("ad-" + b) != null && document.getElementById("ad-" + b).style.display === "none") {
        a = true;
    } else {
        if (cnnad_interstitialPlaying === true) {
            a = true;
        }
    }
    return a;
}
function cnnad_createIframe(d, b) {
    var a = document.createElement("iframe");
    a.id = d;
    a.name = d;
    a.width = 0;
    a.height = 0;
    a.style.position = "absolute";
    a.style.top = "-20px";
    a.style.left = "-20px";
    a.marginWidth = 0;
    a.marginHeight = 0;
    a.frameBorder = 0;
    a.scrolling = "no";
    a.allowTransparency = "true";
    a.src = b;
    return a;
}
function cnnad_createAdHelper(a, f, e, b, g) {
    if (cnnad_isBlocking(a)) {
        window.setTimeout(function () {
            cnnad_createAdHelper(a, f, e, b, g);
        }, 1000);
    } else {
        if (!document.cnnAdDisplayAds) {
            document.write('<div style="display: block; background: #444; color: #fff; width: ' + b + "; height: " + e + '; font-size: 10px; text-align: center; ">' + b + "x" + e + " Ad</div>");
            return;
        }
        var h = document.getElementById("ad-" + a);
        if (h) {
            h.appendChild(cnnad_createIframe(a, f));
        } else {
            if (!g) {
                document.write('<iframe ALLOWTRANSPARENCY="true" hspace="0" vspace="0" marginHeight="0" marginWidth="0" src="' + f + '" border="0" frameBorder="0" height="0" width="0" scrolling="no"  id="' + a + '" style="position: absolute; top: -20px; left: -20px;" ></iframe>');
            } else {
                document.getElementById(g).innerHTML = '<iframe ALLOWTRANSPARENCY="true" hspace="0" vspace="0" marginHeight="0" marginWidth="0" src="' + f + '" border="0" frameBorder="0" height="0" width="0" scrolling="no"  id="' + a + '" style="position: absolute; top: -20px; left: -20px;" ></iframe>';
            }
        }
    }
}
function cnnad_createAdNoTileId(a, e, d, b, f) {
    e = cnnad_preview(e);
    e = cnnad_statusCodeQA(e);
    e += "&transactionID=" + cnnad_getTransactionID();
    e += "&domId=" + a;
    cnnad_createAdHelper(a, e, d, b, f, false);
}
function cnnad_createAd(b, f, e, d, g) {
    f = cnnad_preview(f);
    f = cnnad_statusCodeQA(f);
    f += "&transactionID=" + cnnad_getTransactionID();
    f += "&tile=" + cnnad_getDynamicTileID(f) + "&domId=" + b;
    cnnad_createAdHelper(b, f, e, d, g, false);
    var a = new String();
    if (f.match("_position=")) {
        a = cnnad_getParamValue(f, "_position=", "_");
    } else {
        if (f.match("_pos=")) {
            a = cnnad_getParamValue(f, "_pos=", "_");
        } else {
            a = "";
        }
    }
    cnnad_calledURLs[a] = f;
}
function cnnad_writeAd(b, a) {
    if (cnnad_enabled == true) {
        document.write('<script id="' + b + '" type="text/javascript" onload="cnnSendData();"');
        document.write(' src="' + a + "&tile=" + cnnad_getDynamicTileID(a) + '"></scr');
        document.write("ipt>");
    }
}
function cnnad_showAd(a) {
    var b = document.getElementById(a);
    if (b) {
        b.style.position = "relative";
        b.style.left = "0px";
        b.style.top = "0px";
        if (b.style.visibility === "hidden") {
            b.style.visibility = "visible";
        }
        if (b.style.display === "none") {
            b.style.display = "block";
        }
    } else {
        cnnad_error("Could not find element by id: " + a);
    }
}
function cnnad_setAdSize(d, a, e) {
    var b = document.getElementById(d);
    if (b) {
        b.height = a;
        b.width = e;
        b.className += " adunit_" + e + "x" + a;
    } else {
        cnnad_error("Could not find element by id: " + cnnad_id);
    }
}
function cnnad_readCookie(b) {
    if (document.cookie == "") {
        return null;
    } else {
        var a = document.cookie.split(";");
        var e = b + "=";
        for (var d = 0; d < a.length; d++) {
            var f = a[d];
            while (f.charAt(0) == " ") {
                f = f.substring(1, f.length);
            }
            if (f.indexOf(e) == 0) {
                return f.substring(e.length, f.length);
            }
        }
        return null;
    }
}
function cnnad_getTld(a) {
    var b = a.split(".");
    if (b.length >= 2) {
        return (b[b.length - 2] + "." + b[b.length - 1]);
    }
    return (null);
}
function cnnad_refreshAds(d) {
    if (!cnnad_adIframes) {
        return;
    }
    for (var b = 0; b < cnnad_adIframes.length; b++) {
        var e = cnnad_adIframes[b];
        var a = cnnad_findAd(d, e.getWidth(), e.getHeight());
        cnnad_swapAd(e.getId(), a);
    }
}
function cnnad_swapAd(h, b) {
    var f = document.getElementById(h);
    if (f) {
        f.width = 0;
        f.height = 0;
        f.style.display = "none";
        if (cnnad_adCache[b]) {
            for (var d = 0;
            d < window.frames.length; d++) {
                try {
                    if (window.frames[d].location.href.indexOf("domId=" + h) > -1) {
                        window.frames[d].location.replace(cnnad_adCache[b]);
                    }
                } catch (g) {}
            }
            return;
        }
        if ((typeof Ajax != "undefined") && (typeof Ajax.Request != "undefined")) {
            var a = new Ajax.Request(b, {
                method: "get",
                onSuccess: function (m) {
                    var l = cnnad_parseResponse(m.responseText, h);
                    l = cnnad_preview(l);
                    l = cnnad_statusCodeQA(l);
                    l += "&transactionID=" + cnnad_getTransactionID();
                    if (l) {
                        cnnad_adCache[b] = l;
                        for (var k = 0; k < window.frames.length; k++) {
                            try {
                                if (window.frames[k].location.href.indexOf("domId=" + h) > -1) {
                                    window.frames[k].location.replace(l);
                                }
                            } catch (n) {}
                        }
                        return;
                    }
                }
            });
        } else {
            if (typeof dojo != "undefined") {
                if (typeof dojo.io == "undefined") {
                    dojo.require("dojo.io.*");
                }
                dojo.io.bind({
                    url: b,
                    load: function (l, m, e) {
                        var k = cnnad_parseResponse(m, h);
                        k = cnnad_preview(k);
                        k = cnnad_statusCodeQA(k);
                        k += "&transactionID=" + cnnad_getTransactionID();
                        if (k) {
                            cnnad_adCache[b] = k;
                            f.src = k;
                        }
                    }
                });
            } else {}
        }
    }
}
function cnnad_parseResponse(f, h) {
    var b = "<!-- CALLOUT|";
    var d = "|CALLOUT -->";
    var g = f.indexOf(b);
    var a = f.indexOf(d);
    var e = null;
    if (g >= 0 && a > g) {
        e = f.substring(g + b.length, a);
    }
    if (e) {
        return (e + "&tile=" + cnnad_getDynamicTileID(e) + "&domId=" + h);
    } else {
        return null;
    }
}
function cnnad_findAd(g, f, a) {
    var b = null;
    for (var d = 0; d < cnnad_adVault.length; d++) {
        var e = cnnad_adVault[d];
        if (e.getType() == g && e.getHeight() == a && e.getWidth() == f) {
            b = e.getUrl();
            break;
        }
    }
    return b;
}
function cnnad_getDEAdHeadCookie(b) {
    if (typeof (cnnad_readCookie) != "undefined") {
        cnnDEadDEonCookie = cnnad_readCookie("adDEon");
    }
    var a = "http://gdyn." + cnnad_getTld(location.hostname) + "/1.1/1.gif?" + new Date().getTime();
    if (!alreadySwappedDETargetImage && !cnnDEadDEonCookie) {
        b.src = a;
        alreadySwappedDETargetImage = true;
    }
}
function cnnad_registerAd(f, e, a, b) {
    var d = new cnnad_AdObject(null, e, a, f, b);
    cnnad_adVault[cnnad_adVault.length] = d;
}
function cnnad_registerSpace(e, d, a) {
    var b = new cnnad_AdObject(e, d, a, null, null);
    cnnad_adIframes[cnnad_adIframes.length] = b;
}
function cnnad_endInterstitial(d) {
    var b = document.getElementById("interstitial" + d);
    if (b && b.parentNode) {
        b.parentNode.removeChild(b);
    }
    var e = document.getElementById("interstitialcss" + d);
    if (e && e.parentNode) {
        e.parentNode.removeChild(e);
    }
    if (typeof (document.createStyleSheet) != "undefined") {
        var a = document.createStyleSheet();
        a.addRule("table", "{display:inline}");
    }
    cnnad_interstitialPlaying = false;
}
function cnnad_startInterstitial(a, d, e) {
    cnnad_interstitialPlaying = true;
    var b = d + "&tile=" + cnnad_getDynamicTileID(d) + "&domId=" + a;
    document.write('<div id="interstitial' + a + '" class="interstitial" align="center"><iframe ALLOWTRANSPARENCY="true" hspace="0" vspace="0" marginHeight="0" marginWidth="0" src="' + b + '" border="0" frameBorder="0" height="0" width="0" scrolling="no" id="' + a + '"></iframe></div>');
    if (!e) {
        e = 1500;
    }
    cnnad_interstitialPID = window.setTimeout('cnnad_endInterstitial("' + a + '");', e);
}
function cnnad_resetInterstitial(a, d) {
    cnnad_interstitialPlaying = true;
    var b = document.getElementById(a);
    if (null != b && b.height > 20 && b.width > 20) {
        if (cnnad_interstitialPID) {
            window.clearTimeout(cnnad_interstitialPID);
        }
        if (!d) {
            d = 15000;
        }
        cnnad_interstitialPID = window.setTimeout('cnnad_endInterstitial("' + a + '");', d);
    }
}
function cnnad_getUrlParam(b) {
    b = b.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var a = "[\\?&]" + b + "=([^&#]*)";
    var e = new RegExp(a);
    var d = e.exec(window.location.href);
    if (d == null) {
        return "";
    } else {
        return d[1];
    }
}
function cnnad_statusCodeQA(b) {
    var a = cnnad_getUrlParam("adsqa");
    if (a) {
        b = b + "&" + a.replace("%3D", "=");
    }
    return b;
}
function cnnad_updateIframeSource(b, a) {
    a = cnnad_preview(a);
    a = cnnad_statusCodeQA(a);
    a += "&transactionID=" + cnnad_getTransactionID();
    document.getElementById(b).contentWindow.location.replace(a + "&tile=" + cnnad_tileID + "&domId=" + b);
}
function cnnad_showAdByKey(a, b) {
    cnnad_swapAd(b, cnnad_adUrls[a]);
}
function cnnad_haveCookie(a) {
    return cnnad_readCookie(a);
}
function cnnad_ugsync() {
    if (!cnnad_haveCookie("ugs")) {
        document.write("<scr" + 'ipt src="http://www.ugdt' + 'urner.com/xd.sjs"></scr' + "ipt>");
    }
}
function cnnad_AdObject(f, e, a, d, b) {
    this.id = f;
    this.width = e;
    this.height = a;
    this.type = d;
    this.url = b;
    this.getId = function () {
        return this.id;
    };
    this.setId = function (g) {
        this.id = g;
    };
    this.getWidth = function () {
        return this.width;
    };
    this.setWidth = function (g) {
        this.width = g;
    };
    this.getHeight = function () {
        return this.height;
    };
    this.setHeight = function (g) {
        this.height = g;
    };
    this.getType = function () {
        return this.type;
    };
    this.setType = function (g) {
        this.type = g;
    };
    this.getUrl = function () {
        return this.url;
    };
    this.setUrl = function (g) {
        this.url = g;
    };
    this.toString = function () {
        return "[AD|ID=" + this.id + "|WIDTH=" + this.width + "|HEIGHT=" + this.height + "]";
    };
}
var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function (e) {
        for (var a = 0; a < e.length; a++) {
            var b = e[a].string;
            var d = e[a].prop;
            this.versionSearchString = e[a].versionSearch || e[a].identity;
            if (b) {
                if (b.indexOf(e[a].subString) != -1) {
                    return e[a].identity;
                }
            } else {
                if (d) {
                    return e[a].identity;
                }
            }
        }
    },
    searchVersion: function (b) {
        var a = b.indexOf(this.versionSearchString);
        if (a == -1) {
            return;
        }
        return parseFloat(b.substring(a + this.versionSearchString.length + 1));
    },
    dataBrowser: [{
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
    }, {
        string: navigator.userAgent,
        subString: "OmniWeb",
        versionSearch: "OmniWeb/",
        identity: "OmniWeb"
    }, {
        string: navigator.vendor,
        subString: "Apple",
        identity: "Safari",
        versionSearch: "Version"
    }, {
        prop: window.opera,
        identity: "Opera"
    }, {
        string: navigator.vendor,
        subString: "iCab",
        identity: "iCab"
    }, {
        string: navigator.vendor,
        subString: "KDE",
        identity: "Konqueror"
    }, {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
    }, {
        string: navigator.vendor,
        subString: "Camino",
        identity: "Camino"
    }, {
        string: navigator.userAgent,
        subString: "Netscape",
        identity: "Netscape"
    }, {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Explorer",
        versionSearch: "MSIE"
    }, {
        string: navigator.userAgent,
        subString: "Gecko",
        identity: "Mozilla",
        versionSearch: "rv"
    }, {
        string: navigator.userAgent,
        subString: "Mozilla",
        identity: "Netscape",
        versionSearch: "Mozilla"
    }],
    dataOS: [{
        string: navigator.platform,
        subString: "Win",
        identity: "Windows"
    }, {
        string: navigator.platform,
        subString: "Mac",
        identity: "Mac"
    }, {
        string: navigator.userAgent,
        subString: "iPhone",
        identity: "iPhone/iPod"
    }, {
        string: navigator.userAgent,
        subString: "iPod",
        identity: "iPhone/iPod"
    }, {
        string: navigator.userAgent,
        subString: "iPad",
        identity: "iPad"
    }, {
        string: navigator.platform,
        subString: "Linux",
        identity: "Linux"
    }]
};
BrowserDetect.init();
var isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
var flashVersion = 0;
flashDetect();

function flashGetVerIE() {
    var a = 0;
    var b;
    var d;
    try {
        b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
        a = b.GetVariable("$version");
    } catch (d) {}
    if (!a) {
        try {
            b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
            a = "WIN 6,0,21,0";
            b.AllowScriptAccess = "always";
            a = b.GetVariable("$version");
        } catch (d) {}
    }
    if (!a) {
        try {
            b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
            a = b.GetVariable("$version");
        } catch (d) {}
    }
    return a;
}
function flashGetVer() {
    var f = -1;
    if (navigator.plugins != null && navigator.plugins.length > 0) {
        if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
            var e = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
            var a = navigator.plugins["Shockwave Flash" + e].description;
            var d = a.split(" ");
            var b = d[2].split(".");
            var g = b[0];
            var f = g;
        }
    } else {
        if (isIE && isWin && !isOpera) {
            f = flashGetVerIE();
        }
    }
    return f;
}
function TryParseInt(d, a) {
    var b = a;
    if (d != null) {
        if (d.length > 0) {
            if (!isNaN(d)) {
                b = parseInt(d);
            }
        }
    }
    return b;
}
function flashDetect(a) {
    var f = flashGetVer();
    if (f == -1) {
        return false;
    } else {
        if (f != 0) {
            if (isIE && isWin && !isOpera) {
                var e = f.split(" ");
                var d = e[1];
                var b = d.split(",");
                flashVersion = b[0];
            } else {
                flashVersion = TryParseInt(f, 0);
            }
            if (flashVersion >= a) {
                return true;
            }
            return false;
        }
    }
}
function flashWrite(a, b, d, l, e, k) {
    var h = "";
    for (var g in k) {
        if (h != "") {
            h += "&";
        }
        h += g + "=" + k[g];
    }
    var f = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="' + d + '" height="' + l + '" id="' + a + '">';
    f += '<param name="movie" value="' + b + '" /><param name="quality" value="high" /><param name="wmode" value="transparent" />';
    for (var g in e) {
        f += ' <param name="' + g + '" value="' + e[g] + '" />';
    }
    f += '<param name="flashvars" value="' + h + '" />';
    f += '<embed src="' + b + '" quality="high" wmode="transparent" width="' + d + '" height="' + l + '" name="' + a + '" ';
    for (var g in e) {
        f += " " + g + '="' + e[g] + '" ';
    }
    f += 'flashvars="' + h + '" ';
    f += 'type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
    f += "</object>";
    document.write(f);
    return f;
}
tmp = new Array("toggle", "clear", "profile", "group", "groupEnd", "time", "timeEnd", "fatal", "trace", "traceEnd", "error", "warn", "debug", "info", "move", "resize");
var siLog = new Object();
for (i = 0; i < tmp.length; i++) {
    siLog[tmp[i]] = function (a) {};
}
if (typeof console != "object") {
    var console = new Object();
    for (i = 0; i < tmp.length; i++) {
        console[tmp[i]] = function (a) {};
    }
}
function $e(e, d, b) {
    if (d == null) {
        if (document.getElementById) {
            return document.getElementById(e);
        } else {
            if (document.all) {
                return document.all[e];
            } else {
                return false;
            }
        }
    } else {
        if (b == null) {
            b = "*";
        }
        var a = $c(d, b, document.getElementById(e));
        if (a) {
            if (a.length > 0) {
                return a[0];
            }
        }
        return false;
    }
}
function $c(e, d, g) {
    var f = new Array();
    if (g == null) {
        g = document;
    }
    if (d == null) {
        d = "*";
    }
    if (!g.getElementsByTagName) {
        return false;
    }
    var b = g.getElementsByTagName(d);
    var a = b.length;
    var h = new RegExp("(^|\\s)" + e + "(\\s|$)");
    for (i = 0, j = 0; i < a; i++) {
        if (h.test(b[i].className)) {
            f[j] = b[i];
            j++;
        }
    }
    return f;
}
function cnnInc(a) {
    var b = "";
    if (a.indexOf("http://") == -1) {
        b = "http://i.cdn.turner.com/si";
    }
    if (a.indexOf(".css") > 0) {
        document.write('<link rel="stylesheet" type="text/css" href="' + b + a + '" media="all" />');
    } else {
        document.write("<scri" + 'pt language="JavaScript" src="' + b + a + '"></scr' + "ipt>");
    }
}
function cnnJS(a) {
    siLog.debug("cnnJS: " + a);
    cnnInc(a);
}
function cnnJSrun(a) {
    document.write("<scr" + 'ipt type="text/javascript">' + a + "</scr" + "ipt>" + "\n");
}
var cnnPage = new Object();
cnnPage.url = window.location.href.toString();
cnnPage.path = cnnPage.url.replace(/http:\/\/[^\/]*/, "").replace(/[\?\#].*$/, "").replace(/\/[^\/]+\.(html|htm|js|jsp)$/i, "/").replace(/\/$/, "");
cnnPage.title = document.title;
cnnPage.isHomepage = (cnnPage.path == "/" || cnnPage.path.length == "") ? true : false;
cnnPage.isStory = (cnnPage.path.match(/^\/20\d\d\/.*\/\d\d\//)) ? true : false;
cnnPage.isVideo = (cnnPage.path.match(/^\/video\/.+\/20\d\d\/\d\d\//)) ? true : false;
cnnPage.isScoreboard = (cnnPage.path.match(/^\/(football|basketball|hockey|baseball).*\/scoreboards/)) ? true : false;
cnnPage.isPhotoGallery = (cnnPage.path.match(/^\/multimedia\/photo_gallery\/\d\d/)) ? true : false;
cnnPage.host = window.location.hostname.toString();
cnnPage.isLive = (cnnPage.host.indexOf("cnn.com") > -1) ? true : false;
cnnPage.debug = (document.cookie.indexOf("siDebug=set") > -1 || (getParam("debug") == "y")) ? true : false;
cnnPage.section = "";
cnnPage.storySection = "";
cnnPage.videoSection = "";
if (cnnPage.isStory) {
    cnnPage.storySection = cnnPage.section = cnnPage.path.match(/^\/20\d\d(\/.*)\/\d\d\/\d\d\//)[1];
}
if (cnnPage.isVideo) {
    cnnPage.videoSection = cnnPage.section = cnnPage.path.match(/^(\/video\/.*)\/\d\d\d\d\/\d\d\//)[1];
}
function cnnIsScoreboardPage() {
    return cnnPage.isScoreboard;
}
if (cnnPage.debug) {
    cnnJS("/.e/js/4.1/global/lib/log4javascript.js");
}
if (!cnnPage.isLive) {
    document.write("<scri" + 'pt language="JavaScript" src=""></scr' + "ipt>");
}
function cnnShow(a) {
    if (a.style) {
        a.style.display = "block";
    }
}
function cnnHide(a) {
    if (a.style) {
        a.style.display = "none";
    }
}
function cnnRand(b, a) {
    return Math.floor(Math.random() * (a - b + 1)) + b;
}
function getElementsByClass(b, a, d) {
    return $c(b, a, d);
}
function cnnGetObject(a) {
    if ($e(a)) {
        return $e(a);
    } else {
        return null;
    }
}
function cnnIsExternal(b) {
    var a = b;
    if (b.href) {
        a = b.href;
    }
    if (a.match(/cnn\.com\//i) || a.match(/fannation\.com\//i) || a.match(/golf\.com\//i) || a.match(/sikids\.com\//i) || a.match(/si\.com\//i) || a.match(/turner\.com\:84\//i)) {
        return false;
    } else {
        return true;
    }
}
function cnnIsInternal(b) {
    var a = b;
    if (b.href) {
        a = b.href;
    }
    if (a.match(/cnn\.com\//i) || a.match(/fannation\.com\//i) || a.match(/golf\.com\//i) || a.match(/sikids\.com\//i) || a.match(/si\.com\//i) || a.match(/turner\.com\:84\//i)) {
        return true;
    } else {
        return false;
    }
}
function cnnAddParam(a, b) {
    if (a.href) {
        if (a.href.toLowerCase().indexOf("javascript") == -1) {
            if (a.href.indexOf(b) > 0) {
                return;
            }
            if (a.href.indexOf("?") > 0) {
                a.href = a.href + "&" + b;
            } else {
                a.href = a.href + "?" + b;
            }
        }
    } else {
        if (a.href.indexOf(b) > 0) {
            return a;
        }
        if (a.indexOf("?") > 0) {
            a = a + "&" + b;
        } else {
            a = a + "?" + b;
        }
        return a;
    }
}
function getElementByClass(e, b, d) {
    var a = $c(e, b, d);
    if (a) {
        if (a.length > 0) {
            return a[0];
        }
    }
    return false;
}
function getParam(a) {
    var d = new RegExp("[\\?&]" + a + "=*([^&#]*)");
    var b = d.exec(window.location.href);
    if (b == null) {
        return false;
    } else {
        return b[1];
    }
}
function createCookie(d, e, f) {
    if (f) {
        var b = new Date();
        b.setTime(b.getTime() + (f * 24 * 60 * 60 * 1000));
        var a = "; expires=" + b.toGMTString();
    } else {
        var a = "";
    }
    document.cookie = d + "=" + e + a + "; path=/";
}
function readCookie(b) {
    var e = b + "=";
    var a = document.cookie.split(";");
    for (var d = 0; d < a.length; d++) {
        var f = a[d];
        while (f.charAt(0) == " ") {
            f = f.substring(1, f.length);
        }
        if (f.indexOf(e) == 0) {
            return f.substring(e.length, f.length).split("&");
        }
    }
    return null;
}
function eraseCookie(a) {
    createCookie(a, "", -1);
}
function CNN_getCookies() {
    var e = new Array;
    if (document.cookie) {
        var d = document.cookie.split("; ");
        for (var b = 0; b < d.length; b++) {
            var a = d[b].split("=");
            e[a[0]] = unescape(a[1]) || null;
        }
    }
    return e;
}
function CNN_parseCookieData(a) {
    var e = new Object();
    var f = a.split("&");
    for (var b = 0; b < f.length; b++) {
        var d = f[b].split(":");
        e[d[0]] = d[1] || null;
    }
    return e;
}
function CNN_setCookie(d, f, a, h, e, g) {
    var b = 0;
    if (a) {
        if ((typeof (a) == "string") && Date.parse(a)) {
            b = a;
        } else {
            if (typeof (a) == "number") {
                b = (new Date((new Date()).getTime() + a * 3600000)).toGMTString();
            }
        }
    }
    document.cookie = d + "=" + escape(f) + ((b) ? (";expires=" + b) : "") + ((h) ? ";path=" + h : "") + ((e) ? ";domain=" + e : "") + ((g && (g == true)) ? "; secure" : "");
}
function CNN_killCookie(b, e, d) {
    var a = CNN_getCookies();
    var f = a[b] || null;
    if (f) {
        document.cookie = b + "=" + f + "; expires=Fri, 13-Apr-1970 00:00:00 GMT" + ((e) ? ";path=" + e : "") + ((d) ? ";domain=" + d : "");
    }
}
function WM_readCookie(b) {
    if (document.cookie == "") {
        return false;
    } else {
        var e, d;
        var a = document.cookie;
        e = a.indexOf(b);
        var f = e + b.length;
        if ((e != -1) && (a.charAt(f) == "=")) {
            e += b.length + 1;
            d = a.indexOf(";", e);
            if (d == -1) {
                d = a.length;
            }
            return unescape(a.substring(e, d));
        } else {
            return false;
        }
    }
}
var allCookies = CNN_getCookies();

function cnnToggleSelect(e) {
    var f = ($e) ? true : false;
    var d = (navigator.userAgent.toLowerCase().indexOf("windows") > -1) ? true : false;
    var a = ((navigator.userAgent.toLowerCase().indexOf("msie") > -1) && f) ? true : false;
    var b = document.getElementsByTagName("select");
    if (d && a) {
        for (i = 0; i < b.length; i++) {
            b[i].style.visibility = e;
        }
    }
}
function cnnSubmitSearchSite(a) {
    if (document[a].query.value != "") {
        document[a].submit();
    }
}
function CNN_openPopup(d, b, g, a) {
    var h = location.hostname;
    try {
        window.top.name = "opener";
    } catch (k) {}
    var f = window.open(d, b, g);
    if (f) {
        cnnHasOpenPopup = 1;
    }
    if (f && f.opener) {
        if (a) {
            f.opener.location = a;
        }
    }
    if (f) {
        f.focus();
    }
}
function cnnVideo(f, a, b) {
    var d = "/video/player/quickdetect.exclude.html";
    var e = "mode=" + f + "&arg=" + a;
    if (d.indexOf("http://") == -1) {
        d = "http://sportsillustrated.cnn.com/" + d;
    }
    CNN_openPopup(d + "?" + e, "CNNVideoPlayer", "scrollbars=no,resizable=no,width=770,height=570");
}
function showReply(a) {
    storeReply(a);
}
var cnnEnableSL = true;

function cnnad_createSL() {
    if (cnnEnableSL) {
        if (WM_readCookie("cnnad_quigo") == "set") {
            document.write('<div style="background-color:#f00;color:#fff;font-family:verdana;font-size:9px;width:' + adsonar_zw + 'px;">');
            document.write("<div>translated ID: " + adsonar_placementId + "</div>");
            document.write("<div>adsonar_placementId: " + adsonar_placementId + "</div>");
            document.write("<div>adsonar_pid: " + adsonar_pid + "</div>");
            document.write("<div>size of iframe: " + adsonar_zw + "x" + adsonar_zh + "</div>");
            document.write("</div>");
        }
        adsonar_jv = "ads.tw.adsonar.com";
        document.write("<scr" + 'ipt language="JavaScript" src="http://js.adsonar.com/js/tw_cnn_adsonar.js"></scr' + "ipt>");
    }
}
function cnnPageOnload() {}
function cnnStartList() {
    var b = 13;
    for (var a = 0; a <= b; a++) {
        if ($e("cnnDropNav" + a)) {
            d = $e("cnnDropNav" + a).getElementsByTagName("LI");
            for (i = 0;
            i < d.length; i++) {
                node = d[i];
                if (node.className == "cnnMenu") {
                    node.onmouseover = function () {
                        this.className = "cnnMenuOver";
                    };
                    node.onmouseout = function () {
                        this.className = "cnnMenu";
                    };
                }
            }
        }
    }
    var d = $e("cnnBotnav");
    if (d) {
        for (i = 0; i < d.childNodes.length; i++) {
            node = d.childNodes[i];
            if (node.nodeName == "LI") {
                node.onmouseover = function () {
                    this.className = "cnnOver";
                };
                node.onmouseout = function () {
                    this.className = "";
                };
            }
        }
    }
    d = $e("cnnCM1");
    if (d) {
        for (i = 0; i < d.childNodes.length; i++) {
            node = d.childNodes[i];
            if (node.nodeName == "DL") {
                node.onmouseover = function () {
                    this.className = "cnnOver";
                };
                node.onmouseout = function () {
                    this.className = "";
                };
            }
        }
    }
}
function cnnBrowserFixes() {
    if (window.cnnPageInfo_pageType == "section") {
        if (window.devicePixelRatio) {
            document.write('<link rel="stylesheet" type="text/css" href="http://i.cdn.turner.com/si/.element/css/4.1/safari.css"/>');
        } else {
            if ((BrowserDetect.browser == "Firefox") && (BrowserDetect.version >= 3) && (BrowserDetect.OS == "Mac")) {
                document.write('<link rel="stylesheet" type="text/css" href="http://i.cdn.turner.com/si/.element/css/4.1/mac_ff.css"/>');
            } else {
                if ((BrowserDetect.OS == "Mac")) {
                    document.write('<link rel="stylesheet" type="text/css" href="http://i.cdn.turner.com/si/.element/css/4.1/mac.css"/>');
                }
            }
        }
        $(document).ready(function () {
            $(".cnnPage").addClass(BrowserDetect.browser.toLowerCase() + " " + BrowserDetect.OS.toLowerCase());
        });
    }
}
var siCMlinks = {
    "link_id": "cnn_cm_subscribe",
    "init": function () {
        siLog.info("siCMlinks.init");
        var a = 23;
        if (cnnPage.isHomepage) {
            a = 18;
        }
        if (cnnPage.path.indexOf("/football/nfl/") >= 0) {
            a = 12;
        }
        if (cnnPage.path.indexOf("/football/ncaa/") >= 0) {
            a = 13;
        }
        if (cnnPage.path.indexOf("/baseball/mlb/") >= 0) {
            a = 14;
        }
        if (cnnPage.path.indexOf("/basketball/nba/") >= 0) {
            a = 15;
        }
        if (cnnPage.path.indexOf("/basketball/ncaa/") >= 0) {
            a = 16;
        }
        if (cnnPage.path.indexOf("/hockey/nhl/") >= 0) {
            a = 17;
        }
        this.update(2, "http://subs.timeinc.net/CampaignHandler/si_nb?source_id=" + a);
    },
    "update": function (e, d, b) {
        var a = $e(this.link_id + e);
        if (a) {} else {
            return;
        }
        if (d) {
            siLog.debug("siCMlinks.update: button " + e + ", link=" + d);
            a.href = d;
        }
        if (b) {
            siLog.debug("siCMlinks.update: button " + e + ", html=" + b);
            a.innerHTML = b;
        }
    }
};
var siWriters = {
    "isBlank": function (a) {
        if (typeof a == "undefined") {
            return true;
        }
        if (a) {
            return false;
        } else {
            return true;
        }
    },
    "sort_writers": function (e, d) {
        if (e.lname != "" && d.lname == "") {
            return -1;
        }
        if (e.lname == "" && d.lname != "") {
            return 1;
        }
        if (e.lname > d.lname) {
            return 1;
        }
        if (e.lname < d.lname) {
            return -1;
        }
        if (e.fname > d.fname) {
            return 1;
        }
        if (e.fname < d.fname) {
            return -1;
        }
        if (e.nick > d.nick) {
            return 1;
        }
        if (e.nick < d.nick) {
            return -1;
        }
        return 0;
    },
    "sort": function () {
        this.list.sort(this.sort_writers);
    },
    "dropdown": function (d, b) {
        if (d === null) {
            d = 1;
        }
        this.sort();
        for (i = 0; i < this.list.length; i++) {
            var a = this.list[i];
            if (!b && !a.si) {
                continue;
            }
            var e = "";
            var f = "";
            if (a.lname && a.fname) {
                f = a.fname + " " + a.lname;
            } else {
                if (a.lname) {
                    f = a.lname;
                } else {
                    if (a.nick) {
                        f = a.nick;
                    } else {
                        continue;
                    }
                }
            }
            if (d == 1) {
                if (a.archive) {
                    e = a.archive;
                } else {
                    if (a.path) {
                        e = "/writers/" + a.path + "/archive/";
                    }
                }
            } else {
                if (a.path) {
                    e = a.path;
                } else {
                    continue;
                }
            }
            document.write('<option value="' + e + '">' + f + "</option>" + "\n");
        }
    },
    "dropdown_si_archives": function () {
        this.dropdown(1, false);
    },
    "dropdown_archives": function () {
        this.dropdown(1, true);
    },
    "dropdown_rss": function () {
        this.dropdown(2, false);
    },
    "end": ""
};
$(".siti-magazine-cover").ready(function () {
    var b = $(".siti-magazine-cover DIV .cnnLine0").attr("href");
    var a = $(".siti-magazine-cover DIV .cnnLine0").html();
    var d = '<a href="' + b + '">' + a + "<span></span></a>";
    if (b && a) {
        $(".siti-magazine-cover").html(d);
    }
});
var cnnDocDomain = "";
if (location.hostname.indexOf("cnn.com") > 0) {
    cnnDocDomain = "cnn.com";
}
if (location.hostname.indexOf("turner.com") > 0) {
    if (document.layers) {
        cnnDocDomain = "turner.com:" + location.port;
    } else {
        cnnDocDomain = "turner.com";
    }
}
function ajaxer(b, a) {
    var d = this;
    this.updating = false;
    this.abort = function () {
        if (d.updating) {
            d.updating = false;
            d.AJAX.abort();
            d.AJAX = null;
        }
    };
    this.update = function (l, f) {
        if (d.updating) {
            return false;
        }
        d.AJAX = null;
        if (window.XMLHttpRequest) {
            d.AJAX = new XMLHttpRequest();
        } else {
            d.AJAX = new ActiveXObject("Microsoft.XMLHTTP");
        }
        if (d.AJAX == null) {
            return false;
        } else {
            d.AJAX.onreadystatechange = function () {
                if (d.AJAX.readyState == 4) {
                    d.updating = false;
                    d.callback(d.AJAX);
                    d.AJAX = null;
                }
            };
            d.updating = new Date();
            if (/post/i.test(f)) {
                var h = e + "?" + d.updating.getTime();
                d.AJAX.open("POST", h, true);
                d.AJAX.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                d.AJAX.setRequestHeader("Content-Length", l.length);
                d.AJAX.send(l);
            } else {
                var h = e;
                var k = d.updating.getTime();
                var g = new Date(0);
                d.AJAX.open("GET", h, true);
                if (navigator.appName == "Microsoft Internet Explorer") {
                    d.AJAX.setRequestHeader("If-Modified-Since", g);
                }
                d.AJAX.send(null);
            }
            return true;
        }
    };
    var e = b;
    this.callback = a ||
    function () {};
}
var mysi_ncaaf_team_ids = ["air force", "airfor", "akron", "akron", "alabama", "alabam", "arizona", "arizon", "arizona st", "arizst", "arkansas", "arkans", "arkansas st", "arkst", "army", "army", "auburn", "auburn", "ball st", "ballst", "baylor", "baylor", "boston coll", "bc", "bowling green", "bgsu", "boise st", "boise", "buffalo", "buff", "byu", "byu", "california", "calif", "cent michigan", "centmi", "cincinnati", "cin", "clemson", "clemso", "colorado", "colo", "colorado st", "colost", "duke", "duke", "east michigan", "eastmi", "east carolina", "ecu", "florida atl", "flaatl", "florida int", "flaint", "florida st", "flast", "florida", "florid", "fresno st", "fresno", "georgia tech", "gatech", "georgia", "georgi", "hawaii", "hawaii", "houston", "houst", "idaho", "idaho", "illinois", "illino", "indiana", "indian", "iowa", "iowa", "iowa st", "iowast", "kansas", "kansas", "kent state", "kentst", "kentucky", "kentuc", "kansas st", "kstate", "la tech", "latech", "louisville", "lou", "lsu", "lsu", "marshall", "marsh", "memphis", "memphi", "miami", "mia_fl", "miami-oh", "mia_oh", "michigan", "mich", "mid tennessee", "middtn", "minnesota", "minnes", "missouri", "missou", "miss st", "missst", "maryland", "mrylnd", "michigan st", "msu", "navy", "navy", "nc state", "ncstat", "nebraska", "nebras", "nevada", "nevada", "new mexico", "newmex", "n illinois", "niu", "new mexico st", "nmst", "northwestern", "northw", "notre dame", "notred", "north texas", "ntexas", "ohio", "ohio", "ohio st", "ohiost", "oklahoma", "okla", "oklahoma st", "oklast", "mississippi", "olemis", "oregon", "oregon", "oregon st", "oregst", "pittsburgh", "pitt", "penn st", "psu", "purdue", "purdue", "rice", "rice", "rutgers", "rutger", "san diego st", "sdsu", "san jose st", "sjsu", "smu", "smu", "usf", "sofla", "s carolina", "soucar", "southern miss", "soumis", "stanford", "stanfo", "syracuse", "syracu", "tcu", "tcu", "temple", "temple", "tennessee", "tenn", "texas am", "texam", "texas", "texas", "toledo", "toledo", "troy", "troy", "tulane", "tulane", "tulsa", "tulsa", "texas tech", "txtech", "uab", "uab", "ucf", "ucf", "ucla", "ucla", "connecticut", "uconn", "ul-lafayette", "ul_laf", "ul-monroe", "ul_mon", "unc", "unc", "unlv", "unlv", "usc", "usc", "utah", "utah", "utah st", "utahst", "utep", "utep", "virginia", "uva", "vanderbilt", "vandy", "va tech", "vatech", "wake forest", "wakef", "washington", "wash", "washington st", "washst", "west michigan", "westmi", "wisconsin", "wisc", "west virginia", "wvu", "wyoming", "wyomin"];
var mysi_ncaab_team_ids = ["boston col", "bc", "clemson", "clemso", "duke", "duke", "florida st", "flast", "georgia tech", "gatech", "miami-fl", "mia_fl", "maryland", "mrylnd", "nc st", "ncstat", "n carolina", "unc", "virginia", "uva", "virginia tech", "vatech", "wake forest", "wakef", "albany", "albany", "binghamton", "bing", "boston u", "bu", "hartford", "hartfo", "maine", "maine", "stony brook", "stnybr", "maryland-balt", "umbc", "new hampshire", "unh", "vermont", "vermon", "charlotte", "char", "dayton", "dayton", "duquesne", "duques", "fordham", "ford", "g washington", "geowas", "la salle", "lasall", "richmond", "richmo", "st bonaven", "stbona", "st joes-pa", "stjo", "saint louis", "stloui", "temple", "temple", "massachusetts", "umass", "rhode island", "uri", "xavier", "xavier", "belmont", "belmnt", "campbell", "campbe", "e tenn st", "easttn", "gardner-webb", "g_webb", "jacksonville", "jksnvl", "kennesaw st", "ksawst", "lipscomb", "lips", "mercer", "mercer", "north florida", "nofla", "sc upstate", "scupst", "stetson", "stetso", "illinois", "illino", "indiana", "indian", "iowa", "iowa", "michigan", "mich", "minnesota", "minnes", "michigan st", "msu", "northwestern", "northw", "ohio st", "ohiost", "penn st", "psu", "purdue", "purdue", "wisconsin", "wisc", "baylor", "baylor", "colorado", "colo", "iowa state", "iowast", "kansas", "kansas", "kansas st", "kstate", "missouri", "missou", "nebraska", "nebras", "oklahoma", "okla", "oklahoma st", "oklast", "texas a&m", "texam", "texas", "texas", "texas tech", "txtech", "cincinnati", "cin", "depaul", "depaul", "georgetown", "gtown", "louisville", "lou", "marquette", "marque", "notre dame", "notred", "pittsburgh", "pitt", "providence", "provid", "rutgers", "rutger", "seton hall", "setonh", "south florida", "sofla", "st. john's", "stjohn", "syracuse", "syracu", "connecticut", "uconn", "villanova", "vill", "west virginia", "wvu", "cal poly", "calply", "uc-riverside", "calrv", "csu-fullerton", "cs_ful", "csu-northrdge", "cs_nor", "long beach st", "longbe", "pacific", "pacifi", "uc-irvine", "uc_irv", "uc-santa barb", "uc_sb", "e washington", "eastwa", "idaho st", "idast", "montana", "mont", "montana st", "montst", "northern colo", "nco", "n arizona", "noariz", "portland st", "portst", "sacramento st", "sac", "weber state", "weber", "charleston s", "chsou", "coa carolina", "coastc", "high point", "highpt", "liberty", "libert", "unc-asheville", "nc_ash", "radford", "radfor", "va military", "vmi", "winthrop", "winthr", "delaware", "delawa", "drexel", "drexel", "georgia st", "gast", "george mason", "gmason", "hofstra", "hofstr", "james madison", "jmu", "unc-wilmingtn", "nc_wil", "northeastern", "northe", "old dominion", "olddom", "towson", "towson", "va common", "vcu", "william mary", "wilma", "east carolina", "ecu", "houston", "houst", "marshall", "marsh", "memphis", "memphi", "rice", "rice", "so methodist", "smu", "southern miss", "soumis", "tulane", "tulane", "tulsa", "tulsa", "uab", "uab", "ucf", "ucf", "utep", "utep", "butler", "butler", "cleveland st", "clevst", "detroit", "detroi", "loyola-il", "loy_il", "ill-chicago", "uic", "wis-milwaukee", "uw_mil", "valparaiso", "valpo", "wis-green bay", "wiscgb", "wright state", "wright", "youngstown st", "ysu", "uc davis", "caldav", "chicago st", "chist", "longwood", "longwd", "nc central", "nccent", "njit", "njit", "presbyterian", "presby", "savannah st", "savan", "ut-pan amer", "tex_pa", "utah valley st", "uvsc", "win-salem st", "w_sal", "brown", "brown", "columbia", "colum", "cornell", "cornel", "dartmouth", "dart", "harvard", "harv", "pennsylvania", "penn", "princeton", "prince", "yale", "yale", "canisius", "canisi", "fairfield", "fairfi", "iona", "iona", "loyola-md", "loy_md", "manhattan", "manhat", "marist", "marist", "niagara", "niagar", "rider", "rider", "siena", "siena", "st. peter's", "stpete", "beth-cookman", "b_c", "coppin st", "coppin", "delaware st", "delst", "florida a&m", "flaam", "hampton", "hamp", "howard", "howard", "mary-e shore", "md_es", "morgan st", "morgan", "nc a&t", "ncat", "norfolk st", "norfol", "s carolina st", "scst", "akron", "akron", "ball st", "ballst", "bowling green", "bgsu", "buffalo", "buff", "central mich", "centmi", "e michigan", "eastmi", "kent st", "kentst", "miami (oh)", "mia_oh", "no illinois", "niu", "ohio", "ohio", "toledo", "toledo", "w michigan", "westmi", "bradley", "bradle", "creighton", "creigh", "drake", "drake", "evansville", "evansv", "illinois st", "illst", "indiana st", "indst", "missouri st", "mostu", "northern iowa", "noiowa", "so illinois", "siu", "wichita st", "wichit", "air force", "airfor", "brigham young", "byu", "colorado st", "colost", "new mexico", "newmex", "san diego st", "sdsu", "tcu", "tcu", "unlv", "unlv", "utah", "utah", "wyoming", "wyomin", "cent conn st", "centct", "fairleigh d", "fdu", "long island", "liu", "monmouth", "monmou", "mt st mary's", "mtstma", "quinnipiac", "quinni", "robert morris", "rmorri", "sacred heart", "sheart", "st francis ny", "stfrny", "st francis pa", "stfrpa", "wagner", "wagner", "austin peay", "apsu", "e illinois", "eastil", "e kentucky", "eastky", "jvlle st", "jvilst", "morehead st", "morehe", "murray st", "murray", "samford", "samfor", "se mo st", "semo", "tennessee st", "tennst", "tenn-martin", "tn_mar", "tenn tech", "tntech", "arizona", "arizon", "arizona st", "arizst", "california", "calif", "oregon", "oregon", "oregon st", "oregst", "stanford", "stanfo", "ucla", "ucla", "usc", "usc", "washington", "wash", "washington st", "washst", "american univ", "americ", "army", "army", "bucknell", "buck", "colgate", "colgat", "holy cross", "holycr", "lafayette", "lafaye", "lehigh", "lehigh", "navy", "navy", "ark-little r", "ark_lr", "arkansas st", "arkst", "denver", "denver", "fla atlantic", "flaatl", "florida intnl", "flaint", "middle tenn", "middtn", "north texas", "ntexas", "troy", "troy", "la-lafayette", "ul_laf", "la monroe", "ul_mon", "new orleans", "uno", "south alabama", "usa", "w kentucky", "westky", "alabama", "alabam", "arkansas", "arkans", "auburn", "auburn", "florida", "florid", "georgia", "georgi", "kentucky", "kentuc", "lsu", "lsu", "miss st", "missst", "mississippi", "olemis", "s carolina", "soucar", "tennessee", "tenn", "vanderbilt", "vandy", "central ark", "cnak", "lamar", "lamar", "mcneese st", "mcnees", "nicholls st", "nichol", "nw st", "norwst", "sam houston", "samhou", "se louisiana", "sela", "sf austin", "sfa", "tex a&m cc", "tamcc", "tex-san ant", "tex_sa", "tex-arlington", "tx_arl", "texas st", "txst", "appalchian st", "appala", "chattanooga", "chatta", "charleston", "chrlst", "citadel", "citade", "davidson", "davids", "elon", "elon", "furman", "furman", "ga southern", "geosou", "unc-grensboro", "nc_gre", "w carolina", "wcu", "wofford", "woffor", "centenary", "centen", "ipfw", "ipfw", "iupui", "iupui", "n dakota st", "ndakst", "oakland", "oaklan", "oral roberts", "oralro", "s dakota st", "sdkst", "southern utah", "sout", "umkc", "umkc", "w illinois", "westil", "alabama a&m", "alaam", "alabama st", "alast", "alcorn st", "alcorn", "arkansas-pb", "ark_pb", "grambling st", "grambl", "jackson st", "jackst", "miss val st", "missvl", "prairie v a&m", "pvam", "southern univ", "southe", "tex southern", "texsou", "boise st", "boise", "fresno st", "fresno", "hawaii", "hawaii", "idaho", "idaho", "la tech", "latech", "nevada", "nevada", "new mexico st", "nmst", "san jose st", "sjsu", "utah st", "utahst", "gonzaga", "gonzag", "loyola mrymnt", "loymnt", "pepperdine", "pepper", "portland", "portla", "san francisco", "sanfr", "santa clara", "santac", "san diego", "sdiego", "saint mary's", "stmary"];
var mySIcookie = readCookie("mySIcom");
var mySITeams = new Array();
var mySITeamPages = new Array();
mySITeamPages = {
    mlb: "/baseball/mlb/teams/",
    nfl: "/football/nfl/teams/",
    nba: "/basketball/nba/teams/",
    nhl: "/hockey/nhl/teams/",
    ncaaf: "/football/ncaa/teams/",
    ncaab: "/basketball/ncaa/men/teams/"
};
if (mySIcookie) {
    if (mySIcookie[mySIcookie.length - 1] == "") {
        mySIcookie.pop();
    }
    for (var i = 0; i < mySIcookie.length; i++) {
        if (mySIcookie[i].indexOf("NHL") > -1) {
            var mySITeam = new Array();
            mySITeam["sportID"] = "nhl";
            mySITeam["team"] = mySIcookie[i].replace(/_NHL/, "");
            mySITeam["teamID"] = ((mySITeam["team"]).toLowerCase()).replace(/\s/g, "_");
            mySITeam["team_s"] = "";
            mySITeams[i] = mySITeam;
        } else {
            if (mySIcookie[i].indexOf("NBA") > -1) {
                var mySITeam = new Array();
                mySITeam["sportID"] = "nba";
                mySITeam["team"] = mySIcookie[i].replace(/_NBA/, "");
                mySITeam["teamID"] = ((mySITeam["team"]).toLowerCase()).replace(/\s/g, "_");
                mySITeam["team_s"] = "";
                mySITeams[i] = mySITeam;
            } else {
                if (mySIcookie[i].indexOf("NFL") > -1) {
                    var mySITeam = new Array();
                    mySITeam["sportID"] = "nfl";
                    mySITeam["team"] = mySIcookie[i].replace(/_NFL/, "");
                    mySITeam["teamID"] = ((mySITeam["team"]).toLowerCase()).replace(/\s/g, "_");
                    mySITeam["team_s"] = "";
                    mySITeams[i] = mySITeam;
                } else {
                    if (mySIcookie[i].indexOf("MLB") > -1) {
                        var mySITeam = new Array();
                        mySITeam["sportID"] = "mlb";
                        mySITeam["team"] = mySIcookie[i].replace(/_MLB/, "");
                        mySITeam["teamID"] = ((mySITeam["team"]).toLowerCase()).replace(/\s/g, "_");
                        mySITeam["team_s"] = "";
                        mySITeams[i] = mySITeam;
                    } else {
                        if (mySIcookie[i].indexOf("NCAAF") > -1) {
                            var mySITeam = new Array();
                            mySITeam["sportID"] = "ncaaf";
                            mySITeam["team"] = mySIcookie[i].replace(/_NCAAF \(FB\)/, "");
                            for (var entryNo = 0; entryNo < mysi_ncaaf_team_ids.length; entryNo += 2) {
                                if (mysi_ncaaf_team_ids[entryNo] == (mySITeam["team"]).toLowerCase()) {
                                    mySITeam["teamID"] = mysi_ncaaf_team_ids[entryNo + 1];
                                }
                            }
                            mySITeam["teamID"] = (mySITeam["teamID"]).replace(/\s/g, "_");
                            mySITeam["team_s"] = " <span>(FB)</span>";
                            mySITeams[i] = mySITeam;
                        } else {
                            if (mySIcookie[i].indexOf("NCAAB") > -1) {
                                var mySITeam = new Array();
                                mySITeam["sportID"] = "ncaab";
                                mySITeam["team"] = mySIcookie[i].replace(/_NCAAB \(BB\)/, "");
                                for (var entryNo = 0; entryNo < mysi_ncaab_team_ids.length; entryNo += 2) {
                                    if (mysi_ncaab_team_ids[entryNo] == (mySITeam["team"]).toLowerCase()) {
                                        mySITeam["teamID"] = mysi_ncaab_team_ids[entryNo + 1];
                                    }
                                }
                                mySITeam["teamID"] = (mySITeam["teamID"]).replace(/\s/g, "_");
                                mySITeam["team_s"] = " <span>(BB)</span>";
                                mySITeams[i] = mySITeam;
                            }
                        }
                    }
                }
            }
        }
    }
}
function cnn_writePresonalizeBar() {
    if (mySITeams.length > 0) {
        document.write("<ul><li>");
        for (var a = 0; a < mySITeams.length; a++) {
            document.write(makeMySIBarEntry(mySITeams[a]) + "|");
        }
        document.write('<span><a href="/mysi/personalization/">EDIT MY TEAMS</a></span></li></ul>');
    } else {
        document.write('<a href="/mysi/personalization/"><img src="http://i.cdn.turner.com/si/.element/img/4.1/global/personalize/mysi_full.gif" alt="Personalize SI.com With News and Scores From Your Favorite Pro and College Teams. It\'s Fast and Free!" title="Personalize SI.com With News and Scores From Your Favorite Pro and College Teams. It\'s Fast and Free!"/></a>');
    }
}
function cnn_writePersonalizBarWithSprites() {
    var b = "";
    if (mySITeams.length > 0) {
        b += "<span class='mysi_bar_sprite mysi_sprite_shim_med'></span><span class='mysi_bar_sprite mysi_sprite_mysi_logo'></span><span class='mysi_bar_sprite mysi_sprite_shim_small'></span><span class='mysi_bar_sprite mysi_sprite_team_box'><ul><li>";
        for (var a = 0; a < mySITeams.length; a++) {
            b += makeMySIBarEntry(mySITeams[a]) + "|";
        }
        b += '<span><a href="/mysi/personalization/">EDIT MY TEAMS</a></span></li></ul>';
        b += "</span><span class='mysi_bar_sprite mysi_sprite_shim_med'></span>";
    } else {
        b = "<span class='mysi_bar_sprite mysi_sprite_shim_big_l'></span><a href='/mysi/personalization/'><span class='mysi_bar_sprite mysi_sprite_imgtext'></span></a><span class='mysi_bar_sprite mysi_sprite_shim_big_r'></span>";
    }
    document.write(b);
}
function makeMySIBarEntry(a) {
    var b = '<a href="' + mySITeamPages[a["sportID"]] + a["teamID"] + "/" + '"><strong>' + a["team"] + "</strong>" + a["team_s"] + "</a>";
    return b;
}
function cnn_writeMySIBar() {
    if (mySITeams.length > 0) {
        document.write('<table border="0" cellpadding="0" cellspacing="0"><tr>');
        document.write('<td class="col0"><a href="/mysi/personalization/"><img src="http://i.cdn.turner.com/si/.element/img/4.0/global/personalize/myi_logo.gif" alt="mySI" title="mySI"/></a></td>');
        document.write('<td class="col1"><div><table border="0" cellpadding="0" cellspacing="0"><tr>');
        for (var a = 0; a < mySITeams.length; a++) {
            document.write('<td class="col' + a + '">' + makeMySIBarEntry(mySITeams[a]) + "</td>");
        }
        document.write("</tr></table></div></td>");
        document.write('<td class="col2"><a href="/mysi/personalization/"><img src="http://i.cdn.turner.com/si/.element/img/4.0/global/personalize/mysi_changemyteams.gif" alt="Change My Teams" title="Change My Teams"/></a></td>');
        document.write("</tr></table>");
    } else {
        document.write('<a href="/mysi/personalization/"><img src="http://i.cdn.turner.com/si/.element/img/4.0/global/personalize/personalize_si.gif" alt="Personalize SI.com With Your Favorite Pro and College Teams. It\'s Fast and Free!" title="Personalize SI.com With Your Favorite Pro and College Teams. It\'s Fast and Free!"/></a>');
    }
}
function makeMySIStoryEntry(b) {
    var d = '<li class="cnn_header"><a href="' + mySITeamPages[b["sportID"]] + b["teamID"] + "/" + '">' + b["team"] + b["team_s"] + "</a></li>";
    var a = mysiHeadlines[b["sportID"]];
    if (a && a["team_" + b["teamID"]]) {
        d += "<li>" + a["team_" + b["teamID"]] + "</li>";
    } else {
        d += '<li><a href="' + mySITeamPages[b["sportID"]] + b["teamID"] + "/" + '">Team Page</a></li>';
    }
    return d;
}
function cnn_writeMySITopStories() {
    if (mySITeams.length > 0) {
        for (var a = 0; a < mySITeams.length; a++) {
            document.write(makeMySIStoryEntry(mySITeams[a]));
        }
    } else {
        document.write('<li><a href="/mysi/personalization/">Select up to six of your favorite teams to get the latest local news from across the web.</a></li>');
    }
}
var siSurvey = {
    showFlash: function () {
        siLog.debug("siSurvery.showFlash: cookie=" + b);
        var b = readCookie("userChoice");
        if (b != null) {
            return;
        }
        if (!$e("survey")) {
            siLog.debug("siSurvery.showFlash: render id:survey");
            var d = document.createElement("div");
            d.id = "survey";
            d.innerHTML = '<div id="survey_swf"></div>' + "\n" + '<div id="surveyHomeText" class="surveyHomeText" style="visibility: visible !important">' + "\n" + '<form><input id="radioanswer1" type="radio" name="survey" onclick="javascript:siSurvey.storeReply(\'Yes\');">' + "\n" + '<span style="font-size: 11pt;"><b>YES, I WILL TAKE THE SURVEY</b></span><br><br>' + "\n" + '<input id="radioanswer2" type="radio" name="survey" onclick="javascript:siSurvey.storeReply(\'Maybe\');"> MAYBE LATER<br><br>' + "\n" + '<input id="radioanswer3" type="radio" name="survey" onclick="javascript:siSurvey.storeReply(\'No\');"> NO THANKS </form>' + "\n" + "</div>";
            var a = document.getElementsByTagName("body").item(0);
            a.appendChild(d);
            swfobject.embedSWF("http://i.cdn.turner.com/si/.e/swf/4.0/sect/global/surveyHome.swf", "survey_swf", "300", "250", "9.0.115", "expressInstall.swf", 1, {
                quality: "high",
                bgcolor: "#000000",
                allowFullScreen: "true",
                allowScriptAccess: "always",
                wmode: "transparent"
            });
        }
        $e("survey").style.display = "block";
    },
    showSurveyHtml: function () {
        siLog.info("siSurvery.showSurveyHtml");
        $e("surveyHomeText").style.visibility = "visible";
    },
    runPopup: function () {
        var b = Math.ceil(Math.random() * 400);
        siLog.debug("siSurvery.runPopup: rand=" + b + ", " + ((b < 399) ? "hide" : "display"));
        if (b < 399) {
            return 1;
        }
        var a = readCookie("userChoice");
        siLog.debug("siSurvery.runPopup: cookie=" + a);
        if (cnnPage.isHomepage) {
            if ($e("surveyHome") && a !== null) {
                $e("hide300x250").style.display = "block";
            } else {
                if ($e("surveyHome") && a === null) {
                    $e("surveyHome").style.display = "block";
                    $e("hide300x250").style.display = "none";
                    setTimeout("siSurvey.showSurveyHtml()", 2000);
                }
            }
        } else {
            setTimeout("siSurvey.showFlash()", 7000);
        }
    },
    storeReply: function (b) {
        if (b == "Yes") {
            createCookie("userChoice", b, 30);
            var a = "http://apps.si.com/survey/?path=" + cnnPage.path;
            siLog.debug("siSurvey.storeReply: opening: " + a);
            window.open(a, "_blank");
            siLog.debug(a);
        }
        if (b == "No") {
            createCookie("userChoice", b, 30);
        }
        if (b == "Maybe" || b == "close") {
            createCookie("userChoice", b, 10);
        }
        if ($e("surveyHome")) {
            $e("surveyHome").style.display = "none";
            $e("hide300x250").style.display = "block";
            $e("hide300x250").getElementsByTagName("table")[0].style.display = "block";
        } else {
            $e("survey").style.display = "none";
        }
    }
};
if (window.addEventListener) {
    window.addEventListener("load", siSurvey.runPopup, false);
}
if (window.attachEvent) {
    window.attachEvent("onload", siSurvey.runPopup);
}
function storeReply(a) {
    siSurvey.storeReply(a);
}
var Tynt = Tynt || [];
Tynt.push("s!4");
Tynt.s = Tynt.s || {
    l: "http://asc.tynt.com/si_logo.png",
    lh: 34,
    lw: 50,
    dd: 3,
    ed: ["sports.yahoo.com", "foxsports.com", "espn.go.com"]
};
var siTracking = {
    init: function () {
        siLog.time("siTracking");
        siLog.group("siTracking");
        siLog.debug("siTracking.init");
        this.dynamic_logic();
        this.tynt();
        this.revsci();
        cnnJSrun("siLog.groupEnd('siTracking');siLog.timeEnd('siTracking');");
        if (allCookies["cnnad_tracking"] == "set") {
            document.write('<div class="cnnSiteDebug">Tracking suite in place.</div>');
        }
    },
    dynamic_logic: function () {
        siLog.info("siTracking:dynamic_logic");
        cnnJS("http://content.dl-rms.com/rms/mother/901/nodetag.js");
    },
    revsci: function () {
        siLog.info("siTracking:revsci");
        cnnJS("http://js.revsci.net/gateway/gw.js?csid=A09801");
    },
    tynt: function () {
        if (cnnPage.isLive) {
            siLog.info("siTracking:tynt");
            document.tyntVariables = {
                "spt": "Get a free NFL Team Jacket and Tee with",
                "spid": 2,
                "ap": "Read More:",
                "sp": "SI Subscription"
            };
            cnnJS("http://tcr.tynt.com/javascripts/Tracer.js?user=ccCFqQFFmr3OTvab7jrHcU&s=81");
        }
        if (document.location.protocol == "http:") {
            siLog.info("siTracking:tyntSS");
            document.write("<scr" + 'ipt src="http://asd.tynt.com/ts.js" type="text/javascript" async=""></scr' + "ipt>");
        }
    }
};

function cnnSendComscoreBeacon(h, k) {
    try {
        var g = "1";
        var f = "8586808";
        var e = "00004";
        var b = "8586811";
        var a = "010000";
        if (k == 1) {
            a = "020000";
        }
        var l = new Image();
        l.src = "http://b.scorecardresearch.com/p?c1=" + g + "&c2=" + f + "&c3=" + e + "&c4=" + b + "&c5=" + a + "";
    } catch (d) {}
}(function () {
    if (location.search.toLowerCase().indexOf("mobile=no") !== -1 || location.search.toLowerCase().indexOf("mobile=n") !== -1 || location.search.toLowerCase().indexOf("mobile =no") !== -1 || location.search.toLowerCase().indexOf("mobile= no") !== -1 || location.search.toLowerCase().indexOf("mobile = no") !== -1 || location.search.toLowerCase().indexOf("mobile =n") !== -1 || location.search.toLowerCase().indexOf("mobile= n") !== -1 || location.search.toLowerCase().indexOf("mobile = n") !== -1) {
        var b = new Date(),
            a = "";
        b.setTime(b.getTime() + 3600000);
        a = b.toGMTString();
        document.cookie = "mobile=n; expires=" + a;
    }
}());
(function (e) {
    var g, d, f, a, b = 66;
    g = function () {
        var h = e("#sitiT1Holder > #sitiT1 > ul > li");
        e.getScript("http://zor.livefyre.com/wjs/v1.0/javascripts/CommentCount.js");
        h.each(d);
    };
    a = function (p) {
        var q = p,
            m = ["", "K", "M", "B", "T"],
            o = Math.floor(("" + p).length / 3),
            n = "",
            h, k, l;
        if (p >= 1000) {
            for (h = 2; h >= 1; h -= 1) {
                n = parseFloat((o != 0 ? (p / Math.pow(1000, o)) : p).toPrecision(h));
                k = (n + "").replace(/[^a-zA-Z 0-9]+/g, "");
                if (k.length <= 2) {
                    break;
                }
            }
            if (n % 1 != 0) {
                l = n.toFixed(1);
            }
            q = n + m[o];
        }
        return q;
    };
    d = function (z) {
        var x, A, y = {
            "anchor": false,
            "image": false,
            "tabLabel": false,
            "summary": false,
            "link": false,
            "headline": false,
            "og": false
        },
            B = z + 1,
            v = e(this),
            F = "",
            n, l, G, p, H, w, D, o, C, u, r, k, E, h, s, m, q, I;
        x = v.find("MAP");
        if (x.length) {
            return true;
        }
        A = v;
        $videoinnard = v.find(".video-player .share");
        if (!A.length) {
            return true;
        }
        y.anchor = A.find("DIV.siti-t1-header > A");
        y.image = A.find("A.sitiImage img").attr("src");
        y.tabLabel = A.find("DIV.siti-t1-header SPAN.tabLabel");
        y.headline = A.find("DIV.siti-t1-header H1").text();
        if (!y.tabLabel.length || !y.tabLabel.text()) {
            y.tabLabel = y.headline;
        } else {
            y.tabLabel = y.tabLabel.text();
        }
        y.summary = A.find("DIV.siti-t1-header SPAN.tease").text();
        y.link = y.anchor.attr("href");
        y.og = y.tabLabel + " - " + y.summary.substr(0, 80) + "...";
        y.link = (y.link.match(/gameflash/)) ? y.link.split("?")[0] : y.link.split("#")[0].split("?")[0];
        if (!y.link.match(/http\:\/\//)) {
            y.link = "http://sportsillustrated.cnn.com" + y.link;
        }
        n = "308570";
        G = "?sct=overlay_comment_b";
        p = true;
        H = true;
        if (!y.link.match(/sportsillustrated\.cnn\.com/)) {
            p = false;
            H = (y.link.match(/si\.com/)) ? true : false;
            G = "";
        }
        w = "#comments";
        l = y.link;
        if (y.link.match(/gameflash/)) {
            w = "#gamechat";
            l = "gameflash_";
            D = y.link.split("/");
            o = (typeof D[4] !== "undefined") ? D[4] : false;
            u = (typeof D[9] !== "undefined") ? D[9] : false;
            C = (typeof D[3] !== "undefined") ? D[3] : false;
            if (!o || !u || !C) {
                H = false;
            } else {
                switch (o) {
                case "mlb":
                    break;
                case "ncaa":
                    l += (C === "football") ? "ncaaf_" : "ncaab_";
                    break;
                default:
                    l += o + "_";
                }
                l += u;
            }
            if (y.link.indexOf("#") !== -1) {
                y.link = y.link.split("#")[0];
            }
        } else {
            if (y.link.match(/\/(specials|video|photo\_gallery|gallery)\//)) {
                H = false;
            }
        }
        F += '<div class="share-row" id="T1ShareRow_' + B + '" >';
        if (H) {
            F += (p === false) ? '<div class="t1-share-container t1-share-container-countless-comment-button">' : '<div class="t1-share-container">';
        } else {
            F += '<div class="t1-share-container t1-share-container-no-comment-button">';
        }
        F += '<a href="#" class="twitter" onclick="return(si_twitterShare(\'' + y.link + "', '" + escape(y.tabLabel) + '\', \'b\'));"><span class="count-bubble count-bubble-twitter">0</span></a><span class="sm_divider"></span>';
        F += '<a href="#" class="facebook" onclick="return(si_facebookComplexShare(\'' + y.link + "', '" + y.link + "', '" + escape(y.tabLabel) + "', '" + escape(y.summary) + '\', \'b\'));" ><span class="count-bubble count-bubble-facebook">0</span></a><span class="sm_divider"></span>';
        if (H) {
            if (p) {
                F += '<a href="' + y.link + G + w + '" class="comments">';
                F += '<span class="count-bubble count-bubble-comments livefyre-commentcount" data-lf-site-id="' + n + '" data-lf-article-id="' + l + '" >0</span>';
                F += "</a>";
            } else {
                F += '<a href="#" class="comments" onclick="return(si_commentsExternal(\'' + y.link + w + "', 'b'));\" >";
                F += "</a>";
            }
        }
        F += '<a href="#" class="email" onclick="return(si_t1ET(\'' + y.link + "', '" + escape(y.og) + "', 'b'));\"></a><span class=\"sm_divider\"></span>";
        F += "</div></div>";
        A.append(F);
        if ($videoinnard) {
            $videoinnard.append(F);
        }
        k = 'http://graph.facebook.com/fql?q=SELECT%20total_count%20FROM%20link_stat%20WHERE%20url="' + y.link + '"';
        e.ajax({
            url: k,
            dataType: "jsonp",
            success: function (J) {
                if (!J || typeof J.data === "undefined" || typeof J.data[0] === "undefined" || typeof J.data[0].total_count !== "number") {
                    I = 0;
                } else {
                    I = J.data[0].total_count;
                }
                I = a(I);
                e("#T1ShareRow_" + B + " SPAN.count-bubble-facebook").html(I);
            }
        });
        r = "http://urls.api.twitter.com/1/urls/count.json?url=" + y.link;
        e.ajax({
            url: r,
            dataType: "jsonp",
            success: function (J) {
                if (J.count === undefined) {
                    I = 0;
                } else {
                    I = J.count;
                }
                e("#T1ShareRow_" + B + " SPAN.count-bubble-twitter").html(I);
            }
        });
    };
    f = function () {
        var o, k, n, m = false,
            p, l = false,
            h = false;
    };
    e(document).ready(function () {
        g();
    });
}(jQuery));

function si_facebookComplexShare(a, b, n, h, k) {
    var l, g, m, d;
    try {
        trackMetrics({
            type: "livefyre-click",
            data: {
                action: "fb_overlay_" + k
            }
        });
    } catch (f) {}
    m = n.replace(/%A0/g, "%20");
    d = h.replace(/%A0/g, "%20");
    g = "http://www.facebook.com/sharer.php?";
    g += "s=100";
    g += "&p[url]=" + a;
    g += "&p[images][0]=" + b;
    g += "&p[title]=" + m;
    g += "&p[summary]=" + d;
    g += "";
    l = window.open(g, "si_bookmark", "height=400,width=500,toolbar=no,resizable=no,scrollbars=yes");
    if (window.focus) {
        l.focus();
    }
    return false;
}
function si_twitterShare(h, k, g) {
    var d, b, a;
    try {
        trackMetrics({
            type: "livefyre-click",
            data: {
                action: "twitter_overlay_" + g
            }
        });
    } catch (f) {}
    a = k.replace(/%A0/g, "%20");
    b = "https://twitter.com/intent/tweet?url=" + h + "&related=sinow&text=" + a;
    d = window.open(b, "si_bookmark", "height=400,width=500,toolbar=no,resizable=no,scrollbars=yes");
    if (window.focus) {
        d.focus();
    }
    return false;
}
function si_t1ET(a, f, k) {
    var d, h, b;
    try {
        trackMetrics({
            type: "livefyre-click",
            data: {
                action: "emailthis_overlay_" + k
            }
        });
    } catch (g) {}
    d = "width=510,height=480,resizable=1,scrollbars=1";
    h = "678912";
    b = "&fb=Y&url=" + escape(a) + "&title=" + f + "&random=" + Math.random() + "&partnerID=" + h + "&expire=";
    window.open("http://si.emailthis.clickability.com/et/emailThis?clickMap=create" + b, "click", d);
    return false;
}
function si_commentsExternal(a, d) {
    try {
        trackMetrics({
            type: "livefyre-click",
            data: {
                action: "comments_overlay_" + d
            }
        });
    } catch (b) {}
    window.location = a;
    return false;
}
function siRunZoneTagging(b) {
    var a = siDeterminePage();
    switch (b) {
    case "AF":
        siZoneTagAboveFold(a);
        break;
    case "BF":
        siZoneTagBelowFold(a);
        break;
    case "BO":
        siZoneTagBottom(a);
        break;
    }
}
function siDeterminePage() {
    var d = window.location.pathname;
    d = (d).replace(/\/\//, "/");
    if (d.charAt(d.length - 1) == "/") {
        d += "index.html";
    }
    var e = (d.substr(1)).split("/");
    if (e[0] == "index.html") {
        var b = "hp";
    } else {
        if (e[1] == "index.html") {
            var a = e[0];
            var b = siGetSectionName(a);
        } else {
            if (e[2] == "index.html") {
                var a = e[0] + "/" + e[1];
                var b = siGetSectionName(a);
            } else {
                var b = "uk";
            }
        }
    }
    b = b.toLowerCase();
    return b;
}
function siGetSectionName(a) {
    var b;
    switch (a) {
    case "extramustard":
        b = "em";
        break;
    case "swimsuit":
        b = "su";
        break;
    case "multimedia/photo_gallery/":
        b = "pg";
        break;
    case "baseball/mlb":
        b = "mlb";
        break;
    case "basketball/nba":
        b = "nba";
        break;
    case "basketball/ncaa":
        b = "cb";
        break;
    case "football/ncaa":
        b = "cf";
        break;
    case "football/nfl":
        b = "nfl";
        break;
    case "highschool":
        b = "hs";
        break;
    case "hockey/nhl":
        b = "nhl";
        break;
    case "more":
        b = "mr";
        break;
    case "mma":
        b = "mma";
        break;
    case "racing":
        b = "rc";
        break;
    case "soccer":
        b = "sc";
        break;
    case "magazine/sportsman":
        b = "mg";
        break;
    case "tennis":
        b = "tn";
        break;
    case "mlb":
        b = "mlb";
        break;
    case "nba":
        b = "nba";
        break;
    case "college-basketbll":
        b = "cb";
        break;
    case "college-football":
        b = "cf";
        break;
    case "nfl":
        b = "nfl";
        break;
    case "nhl":
        b = "nhl";
        break;
    default:
        b = "uk";
        break;
    }
    return b;
}
function siZoneTagAboveFold(a) {
    var b = new Array;
    if ($(".cnnPersonalize").length) {
        b["class"] = ".cnnPersonalize";
        b["classalt"] = "";
        b["tag"] = "pr";
        b["page"] = a;
        siAddTag(b);
    }
    if ($(".cnnSearch .cnnLeft").length) {
        b["class"] = ".cnnSearch .cnnLeft";
        b["classalt"] = "";
        b["tag"] = "cm";
        b["page"] = a;
        siAddTag(b);
    }
    if ($(".siti-cm-row").length) {
        b["class"] = ".siti-cm-row";
        b["classalt"] = "";
        b["tag"] = "cm";
        b["page"] = a;
        siAddTag(b);
    }
    if ($(".siti-magazine-cover").length) {
        b["class"] = ".siti-magazine-cover";
        b["classalt"] = "";
        b["tag"] = "cmc";
        b["page"] = a;
        siAddTag(b);
    }
    if ($(".cnnTopnav").length && $(".cnnBotnav").length) {
        b["class"] = ".cnnTopnav";
        b["classalt"] = ".cnnBotnav";
        b["tag"] = "nv";
        b["page"] = a;
        siAddTag(b);
    }
    if ($(".cnnNavBar").length && $(".hiddenNav").length) {
        b["class"] = ".cnnNavBar";
        b["classalt"] = ".hiddenNav";
        b["tag"] = "nv";
        b["page"] = a;
        siAddTag(b);
    }
    if ($(".cnnBannerSection div").length) {
        b["class"] = ".cnnBannerSection div";
        b["classalt"] = "";
        b["tag"] = "bnv";
        b["page"] = a;
        siAddTag(b);
    }
    if ($(".siti-banner").length) {
        b["class"] = ".siti-banner";
        b["classalt"] = "";
        b["tag"] = "bnv";
        b["page"] = a;
        siAddTag(b);
    }
    if ($("#cnnT1Holder").length) {
        b["class"] = ".cnnT1Pane";
        b["classalt"] = "";
        b["tag"] = "t1";
        b["page"] = a;
        siAddTag(b);
    }
    if ($("#sitiT1 LI").length) {
        b["class"] = "#sitiT1 LI";
        b["classalt"] = "";
        b["tag"] = "t1";
        b["page"] = a;
        siAddTag(b);
    }
    if ($(".t1-thumb-nav").length) {
        b["class"] = ".t1-thumb-nav";
        b["classalt"] = "";
        b["tag"] = "t1t";
        b["page"] = a;
        siAddTag(b);
    }
    if ($(".cnnT2s").length) {
        b["class"] = ".cnnT2s";
        b["classalt"] = "";
        b["tag"] = "t2";
        b["page"] = a;
        siAddTag(b);
    }
    if ($("#sitiT2").length) {
        b["class"] = "#sitiT2";
        b["classalt"] = "";
        b["tag"] = "t2";
        b["page"] = a;
        siAddTag(b);
    }
}
function siZoneTagBelowFold(a) {
    var b = new Array;
    if ($(".cnnBox .cnnBoxWriters").length) {
        b["class"] = ".cnnBox .cnnBoxWriters";
        b["classalt"] = "";
        b["tag"] = "wr";
        b["page"] = a;
        siAddTag(b);
    }
    if ($(".cnnBox").length) {
        b["class"] = ".cnnBox";
        b["classalt"] = ".cnnBoxTR";
        b["tag"] = "bf";
        b["page"] = a;
        siAddTag(b);
    }
    $(document).ready(function () {
        if ($("#cnnGameScoresContent").length) {
            b["class"] = "#cnnGameScoresContent";
            b["classalt"] = "";
            b["tag"] = "sb";
            b["page"] = a;
            siAddTag(b);
        }
    });
}
function siZoneTagBottom(a) {
    var b = new Array;
    if ($("#cnnSponsoredPods .cnnBox").length) {
        b["class"] = "#cnnSponsoredPods .cnnBox";
        b["classalt"] = "";
        b["tag"] = "sl";
        b["page"] = a;
        siAddTag(b);
    }
    if ($(".cnnMySITeamBox .cnnBox").length) {
        b["class"] = ".cnnMySITeamBox .cnnBox";
        b["classalt"] = "";
        b["tag"] = "tb";
        b["page"] = a;
        siAddTag(b);
    }
    if ($(".cnnBelowContent .cnnRight").length) {
        b["class"] = ".cnnBelowContent .cnnRight";
        b["classalt"] = "";
        b["tag"] = "so";
        b["page"] = a;
        siAddTag(b);
    }
    if ($(".cnnHolder .cnnBot").length) {
        b["class"] = ".cnnHolder .cnnBot > div";
        b["classalt"] = "";
        b["tag"] = "ft";
        b["page"] = a;
        siAddTag(b);
    }
    if ($(".cnnHolder .cnnArea1").length) {
        b["class"] = ".cnnHolder .cnnArea1 > div";
        b["classalt"] = "";
        b["tag"] = "fb";
        b["page"] = a;
        siAddTag(b);
    }
    if ($(".cnnFooterBoxTC").length) {
        b["class"] = ".cnnFooterBoxTC";
        b["classalt"] = "";
        b["tag"] = "fs";
        b["page"] = a;
        siAddTag(b);
    }
}
function siAddTag(b) {
    var a = b["class"] + " a";
    siTagCycler(b, a);
    if (b["classalt"] != 0) {
        b["class"] = b["classalt"];
        var d = b["class"] + " a";
        siTagCycler(b, d, 1);
    }
}
function siTagCycler(l, b, h) {
    var k = 1;
    var f = RegExp("^((f|ht)tps?:)?//(?!" + location.host + ")");
    var m = function (n) {
            return (n.indexOf(".si.com") > -1);
        };
    cyclerPath = 0;
    switch (l["tag"]) {
    case "wr":
        cyclerPath = 0;
        break;
    case "vi":
        cyclerPath = 0;
        break;
    case "t1":
        cyclerPath = 2;
        break;
    case "bf":
        cyclerPath = 1;
        break;
    case "ft":
        cyclerPath = 1;
        break;
    case "fb":
        cyclerPath = 1;
        break;
    case "fs":
        cyclerPath = 0;
        l["tag"] = "ft";
        break;
    default:
        cyclerPath = 0;
        break;
    }
    if (cyclerPath == 0) {
        $(b).each(function () {
            if ($(this).attr("href")) {
                var n = $(this).attr("href");
                _hrefJS = n.substring(0, 10);
                if (_hrefJS != "javascript") {
                    var o;
                    if (l["tag"] == "nv") {
                        var p = k;
                        k = "";
                    }
                    o = siTooManyParams(n);
                    if (l["tag"] == "vi") {
                        siLog.debug(n + o + "sct=" + l["page"] + "_" + l["tag"] + "_" + "a" + k);
                    }
                    if (!f.test(n) || m(n)) {
                        $(this).attr("href", n + o + "sct=" + l["page"] + "_" + l["tag"] + "_" + "a" + k);
                    }
                    if (l["tag"] == "nv") {
                        k = p;
                    }
                    k++;
                }
            }
        });
    }
    if (cyclerPath == 1) {
        var e = $(l["class"]).length;
        var g = 1;
        var d = l["tag"];
        if (h != 1) {
            $(l["class"]).each(function () {
                var n = $(this).attr("class");
                if ($(this).children(".cnnBoxWriters").length == 0) {
                    if ($(this).children(".cnnBoxSiVideo").length != 0) {
                        $(this).addClass("cnnSiVideoSC");
                        $(".cnnBox.cnnSiVideoSC a").each(function () {
                            var o = $(this).attr("href");
                            _hrefJS = o.substring(0, 10);
                            if (_hrefJS != "javascript") {
                                var p;
                                p = siTooManyParams(o);
                                if (!f.test(o) || m(o)) {
                                    $(this).attr("href", o + p + "sct=" + l["page"] + "_vi" + g + "_" + "a" + k);
                                }
                                k++;
                            }
                        });
                    } else {
                        $(this).attr("class", n + " " + d + g);
                        g++;
                    }
                }
            });
        }
        for (g = 1; g <= e; g++) {
            var k = 1;
            var a = d + g;
            $(l["class"] + "." + d + g + " a").each(function () {
                var n = $(this).attr("href");
                var o;
                o = siTooManyParams(n);
                if (!f.test(n) || m(n)) {
                    $(this).attr("href", n + o + "sct=" + l["page"] + "_" + l["tag"] + g + "_" + "a" + k);
                }
                k++;
            });
        }
    }
    if (cyclerPath == 2) {
        var e = $(l["class"]).length;
        var g = 1;
        if (h != 1) {
            $("#sitiT1 > UL > LI").each(function () {
                g++;
            });
        }
        for (g = 1; g <= e; g++) {
            var k = 0;
            $("#sitiT1 LI.t1_" + g + " a").each(function () {
                var n;
                n = $(this).attr("href");
                if (n != "" && n != undefined) {
                    _hrefJS = n.substring(0, 10);
                    if (_hrefJS != "javascript") {
                        var o;
                        o = siTooManyParams(n);
                        if (!f.test(n) || m(n)) {
                            $(this).attr("href", n + o + "sct=" + l["page"] + "_" + l["tag"] + g + "_" + "a" + k);
                        }
                    }
                }
                k++;
            });
        }
    }
}
function siTooManyParams(a) {
    var d = new RegExp(/\?.*/);
    var b;
    if (a.match(d)) {
        b = "&";
        return b;
    } else {
        b = "?";
        return b;
    }
}
function CNN_PodcastAudio(b, e) {
    var d = e + "/listenlive.player.html";
    var a = "";
    b = unescape(b);
    if (b != "") {
        a = "?file=" + b;
    }
    if (window.name == "PodcastAudioPlayer") {
        writeAudio(b);
    } else {
        CNN_openPopup(d + a, "PodcastAudioPlayer", "toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=650,height=380");
    }
}
teamsObj = {
    "nfl": {
        "id": 1,
        "path": "/football/nfl/teams/",
        "sport": "football",
        "49ers": {
            id: 1,
            statsId: 128,
            name: "San Francisco 49ers",
            stub: "san-francisco-49ers-tickets"
        },
        "bears": {
            id: 2,
            statsId: 107,
            name: "Chicago Bears",
            stub: "chicago-bears-tickets"
        },
        "bengals": {
            id: 3,
            statsId: 108,
            name: "Cincinnati Bengals",
            stub: "cincinnati-bengals-tickets"
        },
        "bills": {
            id: 4,
            statsId: 105,
            name: "Buffalo Bills",
            stub: "buffalo-bills-tickets"
        },
        "broncos": {
            id: 5,
            statsId: 111,
            name: "Denver Broncos",
            stub: "denver-broncos-tickets"
        },
        "browns": {
            id: 6,
            statsId: 109,
            name: "Cleveland Browns",
            stub: "cleveland-browns-tickets"
        },
        "buccaneers": {
            id: 7,
            statsId: 131,
            name: "Tampa Bay Buccaneers",
            stub: "tampa-bay-buccaneers-tickets"
        },
        "cardinals": {
            id: 8,
            statsId: 102,
            name: "Arizona Cardinals",
            stub: "arizona-cardinals-tickets"
        },
        "chargers": {
            id: 9,
            statsId: 127,
            name: "San Diego Chargers",
            stub: "san-diego-chargers-tickets"
        },
        "chiefs": {
            id: 10,
            statsId: 117,
            name: "Kansas City Chiefs",
            stub: "kansas-city-chiefs-tickets"
        },
        "colts": {
            id: 11,
            statsId: 115,
            name: "Indianapolis Colts",
            stub: "indianapolis-colts-tickets"
        },
        "cowboys": {
            id: 12,
            statsId: 110,
            name: "Dallas Cowboys",
            stub: "dallas-cowboys-tickets"
        },
        "dolphins": {
            id: 13,
            statsId: 118,
            name: "Miami Dolphins",
            stub: "miami-dolphins-tickets"
        },
        "eagles": {
            id: 14,
            statsId: 125,
            name: "Philadelphia Eagles",
            stub: "philadelphia-eagles-tickets"
        },
        "falcons": {
            id: 15,
            statsId: 103,
            name: "Atlanta Falcons",
            stub: "atlanta-falcons-tickets"
        },
        "giants": {
            id: 16,
            statsId: 122,
            name: "New York Giants",
            stub: "new-york-giants-tickets"
        },
        "jaguars": {
            id: 17,
            statsId: 116,
            name: "Jacksonville Jaguars",
            stub: "jacksonville-jaguars-tickets"
        },
        "jets": {
            id: 18,
            statsId: 123,
            name: "New York Jets",
            stub: "new-york-jets-tickets"
        },
        "lions": {
            id: 19,
            statsId: 112,
            name: "Detroit Lions",
            stub: "detroit-lions-tickets"
        },
        "packers": {
            id: 20,
            statsId: 113,
            name: "Green Bay Packers",
            stub: "green-bay-packers-tickets"
        },
        "panthers": {
            id: 21,
            statsId: 106,
            name: "Carolina Panthers",
            stub: "carolina-panthers-tickets"
        },
        "patriots": {
            id: 22,
            statsId: 120,
            name: "New England Patriots",
            stub: "new-england-patriots-tickets"
        },
        "raiders": {
            id: 23,
            statsId: 124,
            name: "Oakland Raiders",
            stub: "oakland-raiders-tickets"
        },
        "rams": {
            id: 24,
            statsId: 130,
            name: "St. Louis Rams",
            stub: "st-louis-rams-tickets"
        },
        "ravens": {
            id: 25,
            statsId: 104,
            name: "Baltimore Ravens",
            stub: "baltimore-ravens-tickets"
        },
        "redskins": {
            id: 26,
            statsId: 133,
            name: "Washington Redskins",
            stub: "washington-redskins-tickets"
        },
        "saints": {
            id: 27,
            statsId: 121,
            name: "New Orleans Saints",
            stub: "new-orleans-saints-tickets"
        },
        "seahawks": {
            id: 28,
            statsId: 129,
            name: "Seattle Seahawks",
            stub: "seattle-seahawks-tickets"
        },
        "steelers": {
            id: 29,
            statsId: 126,
            name: "Pittsburgh Steelers",
            stub: "pittsburgh-steelers-tickets"
        },
        "texans": {
            id: 30,
            statsId: 114,
            name: "Houston Texans",
            stub: "houston-texans-tickets"
        },
        "titans": {
            id: 31,
            statsId: 132,
            name: "Tennessee Titans",
            stub: "tennessee-titans-tickets"
        },
        "vikings": {
            id: 32,
            statsId: 119,
            name: "Minnesota Vikings",
            stub: "minnesota-vikings-tickets"
        }
    },
    "mlb": {
        "id": 2,
        "path": "/baseball/mlb/teams/",
        "sport": "baseball",
        "angels": {
            id: 1,
            statsId: 3,
            name: "Los Angeles Angels",
            stub: "los-angeles-angels-tickets"
        },
        "astros": {
            id: 2,
            statsId: 18,
            name: "Houston Astros",
            stub: "houston-astros-tickets"
        },
        "athletics": {
            id: 3,
            statsId: 11,
            name: "Oakland Athletics",
            stub: "oakland-athletics-tickets"
        },
        "blue_jays": {
            id: 4,
            statsId: 14,
            name: "Toronto Blue Jays",
            stub: "toronto-blue-jays-tickets"
        },
        "braves": {
            id: 5,
            statsId: 15,
            name: "Atlanta Braves",
            stub: "atlanta-braves-tickets"
        },
        "brewers": {
            id: 6,
            statsId: 8,
            name: "Milwaukee Brewers",
            stub: "milwaukee-brewers-tickets"
        },
        "cardinals": {
            id: 7,
            statsId: 24,
            name: "St. Louis Cardinals",
            stub: "st-louis-cardinals-tickets"
        },
        "cubs": {
            id: 8,
            statsId: 16,
            name: "Chicago Cubs",
            stub: "chicago-cubs-tickets"
        },
        "diamondbacks": {
            id: 9,
            statsId: 29,
            name: "Arizona Diamondbacks",
            stub: "arizona-diamondbacks-tickets"
        },
        "dodgers": {
            id: 10,
            statsId: 19,
            name: "Los Angeles Dodgers",
            stub: "los-angeles-dodgers-tickets"
        },
        "giants": {
            id: 11,
            statsId: 26,
            name: "San Francisco Giants",
            stub: "san-francisco-giants-tickets"
        },
        "indians": {
            id: 12,
            statsId: 5,
            name: "Cleveland Indians",
            stub: "cleveland-indians-tickets"
        },
        "mariners": {
            id: 13,
            statsId: 12,
            name: "Seattle Mariners",
            stub: "seattle-mariners-tickets"
        },
        "marlins": {
            id: 14,
            statsId: 28,
            name: "Florida Marlins",
            stub: "florida-marlins-tickets"
        },
        "mets": {
            id: 15,
            statsId: 21,
            name: "New York Mets",
            stub: "new-york-mets-tickets"
        },
        "nationals": {
            id: 16,
            statsId: 20,
            name: "Washington Nationals",
            stub: "washington-nationals-tickets"
        },
        "orioles": {
            id: 17,
            statsId: 1,
            name: "Baltimore Orioles",
            stub: "baltimore-orioles-tickets"
        },
        "padres": {
            id: 18,
            statsId: 25,
            name: "San Diego Padres",
            stub: "san-diego-padres-tickets"
        },
        "phillies": {
            id: 19,
            statsId: 22,
            name: "Philadelphia Phillies",
            stub: "philadelphia-phillies-tickets"
        },
        "pirates": {
            id: 20,
            statsId: 23,
            name: "Pittsburgh Pirates",
            stub: "pittsburgh-pirates-tickets"
        },
        "rangers": {
            id: 21,
            statsId: 13,
            name: "Texas Rangers",
            stub: "texas-rangers-tickets"
        },
        "rays": {
            id: 22,
            statsId: 30,
            name: "Tampa Bay Rays",
            stub: "tampa-bay-devil-rays-tickets"
        },
        "red_sox": {
            id: 23,
            statsId: 2,
            name: "Boston Red Sox",
            stub: "boston-red-sox-tickets"
        },
        "reds": {
            id: 24,
            statsId: 17,
            name: "Cincinnati Reds",
            stub: "cincinnati-reds-tickets"
        },
        "rockies": {
            id: 25,
            statsId: 27,
            name: "Colorado Rockies",
            stub: "colorado-rockies-tickets"
        },
        "royals": {
            id: 26,
            statsId: 7,
            name: "Kansas City Royals",
            stub: "kansas-city-royals-tickets"
        },
        "tigers": {
            id: 27,
            statsId: 6,
            name: "Detroit Tigers",
            stub: "detroit-tigers-tickets"
        },
        "twins": {
            id: 28,
            statsId: 9,
            name: "Minnesota Twins",
            stub: "minnesota-twins-tickets"
        },
        "white_sox": {
            id: 29,
            statsId: 4,
            name: "Chicago White Sox",
            stub: "chicago-white-sox-tickets"
        },
        "yankees": {
            id: 30,
            statsId: 10,
            name: "New York Yankees",
            stub: "new-york-yankees-tickets"
        }
    },
    "nba": {
        "id": 3,
        "path": "/basketball/nba/teams/",
        "sport": "basketball",
        "76ers": {
            id: 1,
            statsId: 20,
            name: "Philadelphia 76ers",
            stub: "philadelphia-76ers-tickets"
        },
        "bobcats": {
            id: 2,
            statsId: 74,
            name: "Charlotte Bobcats",
            stub: "charlotte-bobcats-tickets"
        },
        "bucks": {
            id: 3,
            statsId: 15,
            name: "Milwaukee Bucks",
            stub: "milwaukee-bucks-tickets"
        },
        "bulls": {
            id: 4,
            statsId: 4,
            name: "Chicago Bulls",
            stub: "chicago-bulls-tickets"
        },
        "cavaliers": {
            id: 5,
            statsId: 5,
            name: "Cleveland Cavaliers",
            stub: "cleveland-cavaliers-tickets"
        },
        "celtics": {
            id: 6,
            statsId: 2,
            name: "Boston Celtics",
            stub: "boston-celtics-tickets"
        },
        "clippers": {
            id: 7,
            statsId: 12,
            name: "Los Angeles Clippers",
            stub: "los-angeles-clippers-tickets"
        },
        "grizzlies": {
            id: 8,
            statsId: 51,
            name: "Memphis Grizzlies",
            stub: "memphis-grizzlies-tickets"
        },
        "hawks": {
            id: 9,
            statsId: 1,
            name: "Atlanta Hawks",
            stub: "atlanta-hawks-tickets"
        },
        "heat": {
            id: 10,
            statsId: 14,
            name: "Miami Heat",
            stub: "miami-heat-tickets"
        },
        "hornets": {
            id: 11,
            statsId: 3,
            name: "New Orleans Hornets",
            stub: "new-orleans-hornets-tickets"
        },
        "jazz": {
            id: 12,
            statsId: 26,
            name: "Utah Jazz",
            stub: "utah-jazz-tickets"
        },
        "kings": {
            id: 13,
            statsId: 23,
            name: "Sacramento Kings",
            stub: "sacramento-kings-tickets"
        },
        "knicks": {
            id: 14,
            statsId: 18,
            name: "New York Knicks",
            stub: "new-york-knicks-tickets"
        },
        "lakers": {
            id: 15,
            statsId: 13,
            name: "Los Angeles Lakers",
            stub: "los-angeles-lakers-tickets"
        },
        "magic": {
            id: 16,
            statsId: 19,
            name: "Orlando Magic",
            stub: "orlando-magic-tickets"
        },
        "mavericks": {
            id: 17,
            statsId: 6,
            name: "Dallas Mavericks",
            stub: "dallas-mavericks-tickets"
        },
        "nets": {
            id: 18,
            statsId: 17,
            name: "Brooklyn Nets",
            stub: "new-jersey-nets-tickets"
        },
        "nuggets": {
            id: 19,
            statsId: 7,
            name: "Denver Nuggets",
            stub: "denver-nuggets-tickets"
        },
        "pacers": {
            id: 20,
            statsId: 11,
            name: "Indiana Pacers",
            stub: "indiana-pacers-tickets"
        },
        "pistons": {
            id: 21,
            statsId: 8,
            name: "Detroit Pistons",
            stub: "detroit-pistons-tickets"
        },
        "raptors": {
            id: 22,
            statsId: 50,
            name: "Toronto Raptors",
            stub: "toronto-raptors-tickets"
        },
        "rockets": {
            id: 23,
            statsId: 10,
            name: "Houston Rockets",
            stub: "houston-rockets-tickets"
        },
        "spurs": {
            id: 24,
            statsId: 24,
            name: "San Antonio Spurs",
            stub: "san-antonio-spurs-tickets"
        },
        "suns": {
            id: 25,
            statsId: 21,
            name: "Phoenix Suns",
            stub: "phoenix-suns-tickets"
        },
        "thunder": {
            id: 26,
            statsId: 25,
            name: "Oklahoma City Thunder",
            stub: "oklahoma-city-thunder-tickets"
        },
        "timberwolves": {
            id: 27,
            statsId: 16,
            name: "Minnesota Timberwolves",
            stub: "minnesota-timberwolves-tickets"
        },
        "trail_blazers": {
            id: 28,
            statsId: 22,
            name: "Portland Trail Blazers",
            stub: "portland-trail-blazers-tickets"
        },
        "warriors": {
            id: 29,
            statsId: 9,
            name: "Golden State Warriors",
            stub: "golden-state-warriors-tickets"
        },
        "wizards": {
            id: 30,
            statsId: 27,
            name: "Washington Wizards",
            stub: "washington-wizards-tickets"
        }
    },
    "nhl": {
        "id": 4,
        "path": "/hockey/nhl/teams/",
        "sport": "hockey",
        "avalanche": {
            id: 1,
            statsId: 17,
            name: "Colorado Avalanche",
            stub: "colorado-avalanche"
        },
        "blackhawks": {
            id: 2,
            statsId: 4,
            name: "Chicago Blackhawks",
            stub: "chicago-blackhawks"
        },
        "blues": {
            id: 4,
            statsId: 19,
            name: "St. Louis Blues",
            stub: "st-louis-blues"
        },
        "blue_jackets": {
            id: 3,
            statsId: 29,
            name: "Columbus Blue Jackets",
            stub: "columbus-blue-jackets"
        },
        "bruins": {
            id: 5,
            statsId: 1,
            name: "Boston Bruins",
            stub: "boston-bruins"
        },
        "canadiens": {
            id: 6,
            statsId: 10,
            name: "Montreal Canadiens",
            stub: "montreal-canadiens"
        },
        "canucks": {
            id: 7,
            statsId: 22,
            name: "Vancouver Canucks",
            stub: "vancouver-canucks"
        },
        "capitals": {
            id: 8,
            statsId: 23,
            name: "Washington Capitals",
            stub: "washington-capitals"
        },
        "coyotes": {
            id: 9,
            statsId: 24,
            name: "Phoenix Coyotes",
            stub: "phoenix-coyotes"
        },
        "devils": {
            id: 10,
            statsId: 11,
            name: "New Jersey Devils",
            stub: "new-jersey-devils"
        },
        "ducks": {
            id: 11,
            statsId: 25,
            name: "Anaheim Ducks",
            stub: "anaheim-ducks"
        },
        "flames": {
            id: 12,
            statsId: 3,
            name: "Calgary Flames",
            stub: "calgary-flames"
        },
        "flyers": {
            id: 13,
            statsId: 15,
            name: "Philadelphia Flyers",
            stub: "philadelphia-flyers"
        },
        "hurricanes": {
            id: 14,
            statsId: 7,
            name: "Carolina Hurricanes",
            stub: "carolina-hurricanes"
        },
        "islanders": {
            id: 15,
            statsId: 12,
            name: "New York Islanders",
            stub: "new-york-islanders"
        },
        "jets": {
            id: 16,
            statsId: 28,
            name: "Winnipeg Jets",
            stub: "winnipeg-jets"
        },
        "kings": {
            id: 17,
            statsId: 8,
            name: "Los Angeles Kings",
            stub: "los-angeles-kings"
        },
        "lightning": {
            id: 18,
            statsId: 20,
            name: "Tampa Bay Lightning",
            stub: "tampa-bay-lightning"
        },
        "maple_leafs": {
            id: 19,
            statsId: 21,
            name: "Toronto Maple Leafs",
            stub: "toronto-maple-leafs"
        },
        "oilers": {
            id: 20,
            statsId: 6,
            name: "Edmonton Oilers",
            stub: "edmonton-oilers"
        },
        "panthers": {
            id: 21,
            statsId: 26,
            name: "Florida Panthers",
            stub: "florida-panthers"
        },
        "penguins": {
            id: 22,
            statsId: 16,
            name: "Pittsburgh Penguins",
            stub: "pittsburgh-penguins"
        },
        "predators": {
            id: 23,
            statsId: 27,
            name: "Nashville Predators",
            stub: "nashville-predators"
        },
        "rangers": {
            id: 24,
            statsId: 13,
            name: "New York Rangers",
            stub: "new-york-rangers"
        },
        "red_wings": {
            id: 25,
            statsId: 5,
            name: "Detroit Red Wings",
            stub: "detroit-red-wings"
        },
        "sabres": {
            id: 26,
            statsId: 2,
            name: "Buffalo Sabres",
            stub: "buffalo-sabres"
        },
        "senators": {
            id: 27,
            statsId: 14,
            name: "Ottawa Senators",
            stub: "ottawa-senators"
        },
        "sharks": {
            id: 28,
            statsId: 18,
            name: "San Jose Sharks",
            stub: "san-jose-sharks"
        },
        "stars": {
            id: 29,
            statsId: 9,
            name: "Dallas Stars",
            stub: "dallas-stars"
        },
        "wild": {
            id: 30,
            statsId: 30,
            name: "Minnesota Wild",
            stub: "minnesota-wild"
        }
    }
};

function cnnPopulateMySI() {
    var e = document.getElementById("cnnMySITeamBox");
    var g = e.getElementsByTagName("div");
    for (var f = 0; f < g.length; f++) {
        var a = g[f];
        var b = a.getAttribute("team");
        if (b == null) {
            continue;
        }
        var d = b.substring(0, 3);
        b = b.substring(4);
        var l = teamsObj[d].path;
        var k = 0 - ((teamsObj[d].id - 1) * 50);
        var h = 0 - ((teamsObj[d][b].id - 1) * 50);
        a.innerHTML = '<div><a href="' + l + b + '/"><img src="http://i.cdn.turner.com/si/.e/img/4.0/global/pixels/blank_pixel.gif" style="background-position:' + k + "px " + h + 'px;" alt="' + teamsObj[d][b].name + '" title="' + teamsObj[d][b].name + '" width="60" height="40"/></a></div>' + '<span id="mysic-tix-team-' + teamsObj[d][b].statsId + '"></span>';
    }
}
cnnStartList = function () {
    navRoot = cnnGetObject("cnnBotnav");
    if (navRoot) {
        for (i = 0; i < navRoot.childNodes.length; i++) {
            node = navRoot.childNodes[i];
            if (node.nodeName == "LI") {
                node.onmouseover = function () {
                    this.className = "cnnOver";
                };
                node.onmouseout = function () {
                    this.className = "";
                };
            }
        }
    }
};
var isBoxQed = false;
var isBox = false;
var sivContextAdZone = "";

function siSetAdSection(a) {}
function siTemplateReady(d, f) {
    try {
        var a = d.headline;
        sivContextAdZone = f;
        if (sivContextAdZone == "t1_bc") {
            trackMetrics({
                type: "livefyre-click",
                data: {
                    action: "t1_overlay - " + a
                }
            });
        }
    } catch (b) {}
}
function siVideoBegin(g, f) {
    if (cnnPage.isHomepage) {
        if ($("#cvpTitle")) {
            for (var b = 0; b < cvpBox1Playlist.length; b++) {
                if (f == cvpBox1Playlist[b][0]) {
                    isBox = true;
                }
            }
        }
    }
    if (cnnPage.isHomepage && isBox) {
        if ($("#cvpTitle")) {
            for (var b = 0; b < cvpBox1Playlist.length; b++) {
                if (f == cvpBox1Playlist[b][0]) {
                    $("#cvpTitle").html('<a href="' + cvpBox1Playlist[b][2] + '">' + cvpBox1Playlist[b][1] + "</a>");
                }
            }
        }
    }
    try {
        var a = g.headline;
        if (sivContextAdZone == "t1_bc") {
            trackMetrics({
                type: "livefyre-click",
                data: {
                    action: "t1_overlay_play - " + a
                }
            });
        }
    } catch (d) {}
}
function siVideoPlay(d, b) {
    if (cnnPage.isHomepage && isBox) {
        if ($("#cvpTitle")) {
            for (var a = 0; a < cvpBox1Playlist.length; a++) {
                if (b == cvpBox1Playlist[a][0]) {
                    $("#cvpTitle").html('<a href="' + cvpBox1Playlist[a][2] + '">' + cvpBox1Playlist[a][1] + "</a>");
                }
            }
        }
    }
    if (!isBox) {
        document.getElementById("cnnCredit").style.visibility = "hidden";
    }
}
function siVideoAdStarted(b, a) {}
function siVideoTrackingAdCountdown(a) {}
function siVideoPlayHead(b, a, d) {}
function siVideoComplete(b, a) {}
function siVideoPause(d, b, a) {}
function siVideoSeek() {}
function CNN_launchNFLDotComPlayer(a) {
    CNN_openPopup("http://nfl.cpl.delvenetworks.com/player/si/popup/index.html?mediaId=" + a, "liveNFL", "toolbar=no,directories=no,location=no,status=no,menubar=no,scrollbars=no,width=850,height=640");
}
$(document).ready(function () {
    $(".cnnT1Bullets").find('a[href*="CNN_launchNFLDotComPlayer"]').each(function () {
        $(this).prepend('<img src="http://i.cdn.turner.com/si/.element/img/4.0/global/video_19x14.gif" />');
    });
    $(".cnnT1Tease").find('a[href*="CNN_launchNFLDotComPlayer"]').each(function () {
        $(this).find('img[src*="http://i.cdn.turner.com/si/.element/img/4.1/sect/MAIN/fullstory_87x21.gif"]').replaceWith('<img src="http://i.cdn.turner.com/si/.element/img/4.0/global/video_19x14.gif" />');
    });
});
var SIShare = function () {
        var a = this;
        a.metrics = function (b) {
            try {
                trackMetrics(b);
            } catch (d) {}
        };
        a.facebook = function (b, d, m, h, f) {
            var k, g, l, e;
            f = (f != null || typeof f != "undefined") ? f : "fb_share";
            this.metrics({
                type: "livefyre-click",
                data: {
                    action: f
                }
            });
            l = m.replace(/%A0/g, "%20");
            e = h.replace(/%A0/g, "%20");
            g = "http://www.facebook.com/sharer.php?";
            g += "s=100";
            g += "&p[url]=" + b;
            g += "&p[images][0]=" + d;
            g += "&p[title]=" + l;
            g += "&p[summary]=" + e;
            g += "";
            k = window.open(g, "si_bookmark", "height=400,width=500,toolbar=no,resizable=no,scrollbars=yes");
            if (window.focus) {
                k.focus();
            }
            return false;
        };
        a.twitter = function (g, h, d) {
            var f, e, b;
            d = (d != null || typeof d != "undefined") ? d : "twitter_share";
            this.metrics({
                type: "livefyre-click",
                data: {
                    action: d
                }
            });
            b = h.replace(/%A0/g, "%20");
            e = "https://twitter.com/intent/tweet?url=" + g + "&related=sinow&text=" + b;
            f = window.open(e, "si_bookmark", "height=400,width=500,toolbar=no,resizable=no,scrollbars=yes");
            if (window.focus) {
                f.focus();
            }
            return false;
        };
        a.googlePlus = function (e, h, d) {
            var g, f, b;
            d = (d != null || typeof d != "undefined") ? d : "google_plus_share";
            this.metrics({
                type: "livefyre-click",
                data: {
                    action: d
                }
            });
            f = "https://plus.google.com/share?url=?" + e;
            g = window.open(f, "si_bookmark", "height=400,width=500,toolbar=no,resizable=no,scrollbars=yes");
            if (window.focus) {
                g.focus();
            }
            return false;
        };
        a.emailThis = function (b, g, d) {
            var f, h, e;
            d = (d != null || typeof d != "undefined") ? d : "twitter_share";
            this.metrics({
                type: "livefyre-click",
                data: {
                    action: d
                }
            });
            f = "width=510,height=480,resizable=1,scrollbars=1";
            h = "678912";
            e = "&fb=Y&url=" + escape(b) + "&title=" + g + "&random=" + Math.random() + "&partnerID=" + h + "&expire=";
            window.open("http://si.emailthis.clickability.com/et/emailThis?clickMap=create" + e, "click", f);
            return false;
        };
    };
var siShare = new SIShare();
cnnPage.isHomepage = true;
var cnnCVPBox;
cnnStartList = function () {
    navRoot = cnnGetObject("cnnBotnav");
    if (navRoot) {
        for (i = 0; i < navRoot.childNodes.length; i++) {
            node = navRoot.childNodes[i];
            if (node.nodeName == "LI") {
                node.onmouseover = function () {
                    this.className = "cnnOver";
                };
                node.onmouseout = function () {
                    this.className = "";
                };
            }
        }
    }
};

function cvpPlayBox(d, b, a) {
    $(siOverlayBox).css({
        "visibility": "hidden"
    });
    siCVPSubsequent = false;
    if (typeof BCL.context !== "undefined" && typeof BCL.isPlayerAdded !== "undefined" && BCL.cvpContext == "cms3HomepageVideoBox") {
        BCL.getVideo(c);
        isBoxQed = false;
    } else {
        cnnVideoNewPlayer(d, b, a, 0, 320, 180) || null;
    }
    isBox = true;
}
function cvpPlayT1(d, b, a) {
    $(siOverlayT1).css({
        "visibility": "hidden"
    });
    if (typeof BCL.context !== "undefined" && typeof BCL.isPlayerAdded !== "undefined" && BCL.cvpContext == "t1") {
        BCL.getVideo(c);
        isBoxQed = false;
    } else {
        cnnVideoNewPlayer(d, b, a, 0, 662, 440);
    }
}
function cvpShowCTPBox() {
    if (isAppleMobile() === "true") {
        $("#siCTPBox").attr("src", "http://i.cdn.turner.com/si/.element/img/4.1/video/click_to_play.png");
        $("#siCTPBox").removeClass("hover");
    } else {
        $("#siCTPBox").attr("src", "http://i.cdn.turner.com/si/.element/img/4.1/video/giant_play_buton.png");
    }
}
function cvpShowCTPT1() {
    if ($("#siCTPT1")) {
        if (isAppleMobile() === "true") {
            $("#siCTPT1").attr("src", "http://i.cdn.turner.com/si/.element/img/4.1/video/click_to_play.png");
            $("#siCTPT1").removeClass("hover");
        } else {
            $("#siCTPT1").attr("src", "http://i.cdn.turner.com/si/.element/img/4.1/video/giant_play_buton.png");
        }
    }
}
function cvpInitCTP() {
    cvpShowCTPBox();
    cvpShowCTPT1();
}
function cnnTagHPLinks() {
    if (!cnnPage.isHomepage) {
        return;
    }
    siLog.group("cnnTagHPLinks");
    var a = document.getElementsByTagName("a");
    for (var d = 0; d < a.length; d++) {
        var b = a[d].href;
        if (cnnIsInternal(b) && b.match(/[\?\&](eref|xid)\=/) == null && b.match(/ad\.doubleclick/) == null && b.match(/\/behindthemic/) == null) {
            cnnAddParam(a[d], "eref=sihp");
            siLog.debug("eref=sihp: " + b);
        }
    }
    siLog.groupEnd("cnnTagHPLinks");
}
function mycarousel_itemVisibleInCallback(g, e, d, f, b) {
    var a = g.index(d, mycarousel_itemList.length);
    g.add(d, mycarousel_getItemHTML(mycarousel_itemList[a - 1]));
}
function mycarousel_itemVisibleOutCallback(f, d, b, e, a) {
    f.remove(b);
}
function mycarousel_initCallback(a) {
    a.clip.hover(function () {
        a.stopAuto();
    }, function () {
        a.startAuto();
    });
}
function mycarousel_getItemHTML(a) {
    return '<div><a href="javascript:void(0);" id="' + a.id + '" onClick="cvpPlayBox(\'' + a.id + "', 'playerareaBox1', 'cms3HomepageVideoBox');hideVideoThumb('cnnSmallVideoCol0');\"><img src=\"" + a.src + '" alt="' + a.title + '"/><div class="cnnVideoText">' + a.title + "</div></a></div>";
}
function hideVideoThumb(a) {}
jQuery(document).ready(function () {
    jQuery("#mycarousel_homevideo").jcarousel({
        scroll: 2,
        auto: 10,
        wrap: "circular",
        itemVisibleInCallback: {
            onBeforeAnimation: mycarousel_itemVisibleInCallback
        },
        itemVisibleOutCallback: {
            onAfterAnimation: mycarousel_itemVisibleOutCallback
        },
        initCallback: mycarousel_initCallback
    });
    if (cnnPage.isHomepage || cnnPage.path === "") {
        var a = jQuery("a#cnn_cm_subscribe2");
        a = a.attr("href", "https://subscription.si.com/storefront/subscribe-to-sports-illustrated/link/1002345.html");
    }
});

function cnnT2BlogsTrim() {
    var a = $(".cnnT2s UL").height();
    var b = 0;
    $(".cnnT2Blogs UL LI").each(function () {
        var d = $(this).outerHeight();
        b += d;
        if (b > a) {
            b = a;
            $(this).hide();
        }
    });
}
$(document).ready(function () {
    cvpInitCTP();
});
