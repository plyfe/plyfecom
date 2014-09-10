/* prototype */

var Prototype = {
    Version: "1.7",
    Browser: (function () {
        var b = navigator.userAgent;
        var a = Object.prototype.toString.call(window.opera) == "[object Opera]";
        return {
            IE: !! window.attachEvent && !a,
            Opera: a,
            WebKit: b.indexOf("AppleWebKit/") > -1,
            Gecko: b.indexOf("Gecko") > -1 && b.indexOf("KHTML") === -1,
            MobileSafari: /Apple.*Mobile/.test(b)
        }
    })(),
    BrowserFeatures: {
        XPath: !! document.evaluate,
        SelectorsAPI: !! document.querySelector,
        ElementExtensions: (function () {
            var a = window.Element || window.HTMLElement;
            return !!(a && a.prototype)
        })(),
        SpecificElementExtensions: (function () {
            if (typeof window.HTMLDivElement !== "undefined") {
                return true
            }
            var c = document.createElement("div"),
                b = document.createElement("form"),
                a = false;
            if (c.__proto__ && (c.__proto__ !== b.__proto__)) {
                a = true
            }
            c = b = null;
            return a
        })()
    },
    ScriptFragment: "<script[^>]*>([\\S\\s]*?)<\/script>",
    JSONFilter: /^\/\*-secure-([\s\S]*)\*\/\s*$/,
    emptyFunction: function () {},
    K: function (a) {
        return a
    }
};
if (Prototype.Browser.MobileSafari) {
    Prototype.BrowserFeatures.SpecificElementExtensions = false
}
var Abstract = {};
var Try = {
    these: function () {
        var c;
        for (var b = 0, d = arguments.length; b < d; b++) {
            var a = arguments[b];
            try {
                c = a();
                break
            } catch (f) {}
        }
        return c
    }
};
var Class = (function () {
    var d = (function () {
        for (var e in {
            toString: 1
        }) {
            if (e === "toString") {
                return false
            }
        }
        return true
    })();

    function a() {}
    function b() {
        var h = null,
            g = $A(arguments);
        if (Object.isFunction(g[0])) {
            h = g.shift()
        }
        function e() {
            this.initialize.apply(this, arguments)
        }
        Object.extend(e, Class.Methods);
        e.superclass = h;
        e.subclasses = [];
        if (h) {
            a.prototype = h.prototype;
            e.prototype = new a;
            h.subclasses.push(e)
        }
        for (var f = 0, j = g.length; f < j; f++) {
            e.addMethods(g[f])
        }
        if (!e.prototype.initialize) {
            e.prototype.initialize = Prototype.emptyFunction
        }
        e.prototype.constructor = e;
        return e
    }
    function c(l) {
        var g = this.superclass && this.superclass.prototype,
            f = Object.keys(l);
        if (d) {
            if (l.toString != Object.prototype.toString) {
                f.push("toString")
            }
            if (l.valueOf != Object.prototype.valueOf) {
                f.push("valueOf")
            }
        }
        for (var e = 0, h = f.length; e < h; e++) {
            var k = f[e],
                j = l[k];
            if (g && Object.isFunction(j) && j.argumentNames()[0] == "$super") {
                var m = j;
                j = (function (i) {
                    return function () {
                        return g[i].apply(this, arguments)
                    }
                })(k).wrap(m);
                j.valueOf = m.valueOf.bind(m);
                j.toString = m.toString.bind(m)
            }
            this.prototype[k] = j
        }
        return this
    }
    return {
        create: b,
        Methods: {
            addMethods: c
        }
    }
})();
(function () {
    var C = Object.prototype.toString,
        B = "Null",
        o = "Undefined",
        v = "Boolean",
        f = "Number",
        s = "String",
        H = "Object",
        t = "[object Function]",
        y = "[object Boolean]",
        g = "[object Number]",
        l = "[object String]",
        h = "[object Array]",
        x = "[object Date]",
        i = window.JSON && typeof JSON.stringify === "function" && JSON.stringify(0) === "0" && typeof JSON.stringify(Prototype.K) === "undefined";

    function k(J) {
        switch (J) {
        case null:
            return B;
        case (void 0):
            return o
        }
        var I = typeof J;
        switch (I) {
        case "boolean":
            return v;
        case "number":
            return f;
        case "string":
            return s
        }
        return H
    }
    function z(I, K) {
        for (var J in K) {
            I[J] = K[J]
        }
        return I
    }
    function G(I) {
        try {
            if (c(I)) {
                return "undefined"
            }
            if (I === null) {
                return "null"
            }
            return I.inspect ? I.inspect() : String(I)
        } catch (J) {
            if (J instanceof RangeError) {
                return "..."
            }
            throw J
        }
    }
    function D(I) {
        return F("", {
            "": I
        }, [])
    }
    function F(R, O, P) {
        var Q = O[R],
            N = typeof Q;
        if (k(Q) === H && typeof Q.toJSON === "function") {
            Q = Q.toJSON(R)
        }
        var K = C.call(Q);
        switch (K) {
        case g:
        case y:
        case l:
            Q = Q.valueOf()
        }
        switch (Q) {
        case null:
            return "null";
        case true:
            return "true";
        case false:
            return "false"
        }
        N = typeof Q;
        switch (N) {
        case "string":
            return Q.inspect(true);
        case "number":
            return isFinite(Q) ? String(Q) : "null";
        case "object":
            for (var J = 0, I = P.length; J < I; J++) {
                if (P[J] === Q) {
                    throw new TypeError()
                }
            }
            P.push(Q);
            var M = [];
            if (K === h) {
                for (var J = 0, I = Q.length; J < I; J++) {
                    var L = F(J, Q, P);
                    M.push(typeof L === "undefined" ? "null" : L)
                }
                M = "[" + M.join(",") + "]"
            } else {
                var S = Object.keys(Q);
                for (var J = 0, I = S.length; J < I; J++) {
                    var R = S[J],
                        L = F(R, Q, P);
                    if (typeof L !== "undefined") {
                        M.push(R.inspect(true) + ":" + L)
                    }
                }
                M = "{" + M.join(",") + "}"
            }
            P.pop();
            return M
        }
    }
    function w(I) {
        return JSON.stringify(I)
    }
    function j(I) {
        return $H(I).toQueryString()
    }
    function p(I) {
        return I && I.toHTML ? I.toHTML() : String.interpret(I)
    }
    function r(I) {
        if (k(I) !== H) {
            throw new TypeError()
        }
        var J = [];
        for (var K in I) {
            if (I.hasOwnProperty(K)) {
                J.push(K)
            }
        }
        return J
    }
    function d(I) {
        var J = [];
        for (var K in I) {
            J.push(I[K])
        }
        return J
    }
    function A(I) {
        return z({}, I)
    }
    function u(I) {
        return !!(I && I.nodeType == 1)
    }
    function m(I) {
        return C.call(I) === h
    }
    var b = (typeof Array.isArray == "function") && Array.isArray([]) && !Array.isArray({});
    if (b) {
        m = Array.isArray
    }
    function e(I) {
        return I instanceof Hash
    }
    function a(I) {
        return C.call(I) === t
    }
    function n(I) {
        return C.call(I) === l
    }
    function q(I) {
        return C.call(I) === g
    }
    function E(I) {
        return C.call(I) === x
    }
    function c(I) {
        return typeof I === "undefined"
    }
    z(Object, {
        extend: z,
        inspect: G,
        toJSON: i ? w : D,
        toQueryString: j,
        toHTML: p,
        keys: Object.keys || r,
        values: d,
        clone: A,
        isElement: u,
        isArray: m,
        isHash: e,
        isFunction: a,
        isString: n,
        isNumber: q,
        isDate: E,
        isUndefined: c
    })
})();
Object.extend(Function.prototype, (function () {
    var k = Array.prototype.slice;

    function d(o, l) {
        var n = o.length,
            m = l.length;
        while (m--) {
            o[n + m] = l[m]
        }
        return o
    }
    function i(m, l) {
        m = k.call(m, 0);
        return d(m, l)
    }
    function g() {
        var l = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1].replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, "").replace(/\s+/g, "").split(",");
        return l.length == 1 && !l[0] ? [] : l
    }
    function h(n) {
        if (arguments.length < 2 && Object.isUndefined(arguments[0])) {
            return this
        }
        var l = this,
            m = k.call(arguments, 1);
        return function () {
            var o = i(m, arguments);
            return l.apply(n, o)
        }
    }
    function f(n) {
        var l = this,
            m = k.call(arguments, 1);
        return function (p) {
            var o = d([p || window.event], m);
            return l.apply(n, o)
        }
    }
    function j() {
        if (!arguments.length) {
            return this
        }
        var l = this,
            m = k.call(arguments, 0);
        return function () {
            var n = i(m, arguments);
            return l.apply(this, n)
        }
    }
    function e(n) {
        var l = this,
            m = k.call(arguments, 1);
        n = n * 1000;
        return window.setTimeout(function () {
            return l.apply(l, m)
        }, n)
    }
    function a() {
        var l = d([0.01], arguments);
        return this.delay.apply(this, l)
    }
    function c(m) {
        var l = this;
        return function () {
            var n = d([l.bind(this)], arguments);
            return m.apply(this, n)
        }
    }
    function b() {
        if (this._methodized) {
            return this._methodized
        }
        var l = this;
        return this._methodized = function () {
            var m = d([this], arguments);
            return l.apply(null, m)
        }
    }
    return {
        argumentNames: g,
        bind: h,
        bindAsEventListener: f,
        curry: j,
        delay: e,
        defer: a,
        wrap: c,
        methodize: b
    }
})());
(function (c) {
    function b() {
        return this.getUTCFullYear() + "-" + (this.getUTCMonth() + 1).toPaddedString(2) + "-" + this.getUTCDate().toPaddedString(2) + "T" + this.getUTCHours().toPaddedString(2) + ":" + this.getUTCMinutes().toPaddedString(2) + ":" + this.getUTCSeconds().toPaddedString(2) + "Z"
    }
    function a() {
        return this.toISOString()
    }
    if (!c.toISOString) {
        c.toISOString = b
    }
    if (!c.toJSON) {
        c.toJSON = a
    }
})(Date.prototype);
RegExp.prototype.match = RegExp.prototype.test;
RegExp.escape = function (a) {
    return String(a).replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1")
};
var PeriodicalExecuter = Class.create({
    initialize: function (b, a) {
        this.callback = b;
        this.frequency = a;
        this.currentlyExecuting = false;
        this.registerCallback()
    },
    registerCallback: function () {
        this.timer = setInterval(this.onTimerEvent.bind(this), this.frequency * 1000)
    },
    execute: function () {
        this.callback(this)
    },
    stop: function () {
        if (!this.timer) {
            return
        }
        clearInterval(this.timer);
        this.timer = null
    },
    onTimerEvent: function () {
        if (!this.currentlyExecuting) {
            try {
                this.currentlyExecuting = true;
                this.execute();
                this.currentlyExecuting = false
            } catch (a) {
                this.currentlyExecuting = false;
                throw a
            }
        }
    }
});
Object.extend(String, {
    interpret: function (a) {
        return a == null ? "" : String(a)
    },
    specialChar: {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        "\\": "\\\\"
    }
});
Object.extend(String.prototype, (function () {
    var NATIVE_JSON_PARSE_SUPPORT = window.JSON && typeof JSON.parse === "function" && JSON.parse('{"test": true}').test;

    function prepareReplacement(replacement) {
        if (Object.isFunction(replacement)) {
            return replacement
        }
        var template = new Template(replacement);
        return function (match) {
            return template.evaluate(match)
        }
    }
    function gsub(pattern, replacement) {
        var result = "",
            source = this,
            match;
        replacement = prepareReplacement(replacement);
        if (Object.isString(pattern)) {
            pattern = RegExp.escape(pattern)
        }
        if (!(pattern.length || pattern.source)) {
            replacement = replacement("");
            return replacement + source.split("").join(replacement) + replacement
        }
        while (source.length > 0) {
            if (match = source.match(pattern)) {
                result += source.slice(0, match.index);
                result += String.interpret(replacement(match));
                source = source.slice(match.index + match[0].length)
            } else {
                result += source, source = ""
            }
        }
        return result
    }
    function sub(pattern, replacement, count) {
        replacement = prepareReplacement(replacement);
        count = Object.isUndefined(count) ? 1 : count;
        return this.gsub(pattern, function (match) {
            if (--count < 0) {
                return match[0]
            }
            return replacement(match)
        })
    }
    function scan(pattern, iterator) {
        this.gsub(pattern, iterator);
        return String(this)
    }
    function truncate(length, truncation) {
        length = length || 30;
        truncation = Object.isUndefined(truncation) ? "..." : truncation;
        return this.length > length ? this.slice(0, length - truncation.length) + truncation : String(this)
    }
    function strip() {
        return this.replace(/^\s+/, "").replace(/\s+$/, "")
    }
    function stripTags() {
        return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, "")
    }
    function stripScripts() {
        return this.replace(new RegExp(Prototype.ScriptFragment, "img"), "")
    }
    function extractScripts() {
        var matchAll = new RegExp(Prototype.ScriptFragment, "img"),
            matchOne = new RegExp(Prototype.ScriptFragment, "im");
        return (this.match(matchAll) || []).map(function (scriptTag) {
            return (scriptTag.match(matchOne) || ["", ""])[1]
        })
    }
    function evalScripts() {
        return this.extractScripts().map(function (script) {
            return eval(script)
        })
    }
    function escapeHTML() {
        return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }
    function unescapeHTML() {
        return this.stripTags().replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
    }
    function toQueryParams(separator) {
        var match = this.strip().match(/([^?#]*)(#.*)?$/);
        if (!match) {
            return {}
        }
        return match[1].split(separator || "&").inject({}, function (hash, pair) {
            if ((pair = pair.split("="))[0]) {
                var key = decodeURIComponent(pair.shift()),
                    value = pair.length > 1 ? pair.join("=") : pair[0];
                if (value != undefined) {
                    value = decodeURIComponent(value)
                }
                if (key in hash) {
                    if (!Object.isArray(hash[key])) {
                        hash[key] = [hash[key]]
                    }
                    hash[key].push(value)
                } else {
                    hash[key] = value
                }
            }
            return hash
        })
    }
    function toArray() {
        return this.split("")
    }
    function succ() {
        return this.slice(0, this.length - 1) + String.fromCharCode(this.charCodeAt(this.length - 1) + 1)
    }
    function times(count) {
        return count < 1 ? "" : new Array(count + 1).join(this)
    }
    function camelize() {
        return this.replace(/-+(.)?/g, function (match, chr) {
            return chr ? chr.toUpperCase() : ""
        })
    }
    function capitalize() {
        return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase()
    }
    function underscore() {
        return this.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/-/g, "_").toLowerCase()
    }
    function dasherize() {
        return this.replace(/_/g, "-")
    }
    function inspect(useDoubleQuotes) {
        var escapedString = this.replace(/[\x00-\x1f\\]/g, function (character) {
            if (character in String.specialChar) {
                return String.specialChar[character]
            }
            return "\\u00" + character.charCodeAt().toPaddedString(2, 16)
        });
        if (useDoubleQuotes) {
            return '"' + escapedString.replace(/"/g, '\\"') + '"'
        }
        return "'" + escapedString.replace(/'/g, "\\'") + "'"
    }
    function unfilterJSON(filter) {
        return this.replace(filter || Prototype.JSONFilter, "$1")
    }
    function isJSON() {
        var str = this;
        if (str.blank()) {
            return false
        }
        str = str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@");
        str = str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]");
        str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, "");
        return (/^[\],:{}\s]*$/).test(str)
    }
    function evalJSON(sanitize) {
        var json = this.unfilterJSON(),
            cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        if (cx.test(json)) {
            json = json.replace(cx, function (a) {
                return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            })
        }
        try {
            if (!sanitize || json.isJSON()) {
                return eval("(" + json + ")")
            }
        } catch (e) {}
        throw new SyntaxError("Badly formed JSON string: " + this.inspect())
    }
    function parseJSON() {
        var json = this.unfilterJSON();
        return JSON.parse(json)
    }
    function include(pattern) {
        return this.indexOf(pattern) > -1
    }
    function startsWith(pattern) {
        return this.lastIndexOf(pattern, 0) === 0
    }
    function endsWith(pattern) {
        var d = this.length - pattern.length;
        return d >= 0 && this.indexOf(pattern, d) === d
    }
    function empty() {
        return this == ""
    }
    function blank() {
        return /^\s*$/.test(this)
    }
    function interpolate(object, pattern) {
        return new Template(this, pattern).evaluate(object)
    }
    return {
        gsub: gsub,
        sub: sub,
        scan: scan,
        truncate: truncate,
        strip: String.prototype.trim || strip,
        stripTags: stripTags,
        stripScripts: stripScripts,
        extractScripts: extractScripts,
        evalScripts: evalScripts,
        escapeHTML: escapeHTML,
        unescapeHTML: unescapeHTML,
        toQueryParams: toQueryParams,
        parseQuery: toQueryParams,
        toArray: toArray,
        succ: succ,
        times: times,
        camelize: camelize,
        capitalize: capitalize,
        underscore: underscore,
        dasherize: dasherize,
        inspect: inspect,
        unfilterJSON: unfilterJSON,
        isJSON: isJSON,
        evalJSON: NATIVE_JSON_PARSE_SUPPORT ? parseJSON : evalJSON,
        include: include,
        startsWith: startsWith,
        endsWith: endsWith,
        empty: empty,
        blank: blank,
        interpolate: interpolate
    }
})());
var Template = Class.create({
    initialize: function (a, b) {
        this.template = a.toString();
        this.pattern = b || Template.Pattern
    },
    evaluate: function (a) {
        if (a && Object.isFunction(a.toTemplateReplacements)) {
            a = a.toTemplateReplacements()
        }
        return this.template.gsub(this.pattern, function (d) {
            if (a == null) {
                return (d[1] + "")
            }
            var f = d[1] || "";
            if (f == "\\") {
                return d[2]
            }
            var b = a,
                g = d[3],
                e = /^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;
            d = e.exec(g);
            if (d == null) {
                return f
            }
            while (d != null) {
                var c = d[1].startsWith("[") ? d[2].replace(/\\\\]/g, "]") : d[1];
                b = b[c];
                if (null == b || "" == d[3]) {
                    break
                }
                g = g.substring("[" == d[3] ? d[1].length : d[0].length);
                d = e.exec(g)
            }
            return f + String.interpret(b)
        })
    }
});
Template.Pattern = /(^|.|\r|\n)(#\{(.*?)\})/;
var $break = {};
var Enumerable = (function () {
    function c(y, x) {
        var w = 0;
        try {
            this._each(function (A) {
                y.call(x, A, w++)
            })
        } catch (z) {
            if (z != $break) {
                throw z
            }
        }
        return this
    }
    function r(z, y, x) {
        var w = -z,
            A = [],
            B = this.toArray();
        if (z < 1) {
            return B
        }
        while ((w += z) < B.length) {
            A.push(B.slice(w, w + z))
        }
        return A.collect(y, x)
    }
    function b(y, x) {
        y = y || Prototype.K;
        var w = true;
        this.each(function (A, z) {
            w = w && !! y.call(x, A, z);
            if (!w) {
                throw $break
            }
        });
        return w
    }
    function i(y, x) {
        y = y || Prototype.K;
        var w = false;
        this.each(function (A, z) {
            if (w = !! y.call(x, A, z)) {
                throw $break
            }
        });
        return w
    }
    function j(y, x) {
        y = y || Prototype.K;
        var w = [];
        this.each(function (A, z) {
            w.push(y.call(x, A, z))
        });
        return w
    }
    function t(y, x) {
        var w;
        this.each(function (A, z) {
            if (y.call(x, A, z)) {
                w = A;
                throw $break
            }
        });
        return w
    }
    function h(y, x) {
        var w = [];
        this.each(function (A, z) {
            if (y.call(x, A, z)) {
                w.push(A)
            }
        });
        return w
    }
    function g(z, y, x) {
        y = y || Prototype.K;
        var w = [];
        if (Object.isString(z)) {
            z = new RegExp(RegExp.escape(z))
        }
        this.each(function (B, A) {
            if (z.match(B)) {
                w.push(y.call(x, B, A))
            }
        });
        return w
    }
    function a(w) {
        if (Object.isFunction(this.indexOf)) {
            if (this.indexOf(w) != -1) {
                return true
            }
        }
        var x = false;
        this.each(function (y) {
            if (y == w) {
                x = true;
                throw $break
            }
        });
        return x
    }
    function q(x, w) {
        w = Object.isUndefined(w) ? null : w;
        return this.eachSlice(x, function (y) {
            while (y.length < x) {
                y.push(w)
            }
            return y
        })
    }
    function l(w, y, x) {
        this.each(function (A, z) {
            w = y.call(x, w, A, z)
        });
        return w
    }
    function v(x) {
        var w = $A(arguments).slice(1);
        return this.map(function (y) {
            return y[x].apply(y, w)
        })
    }
    function p(y, x) {
        y = y || Prototype.K;
        var w;
        this.each(function (A, z) {
            A = y.call(x, A, z);
            if (w == null || A >= w) {
                w = A
            }
        });
        return w
    }
    function n(y, x) {
        y = y || Prototype.K;
        var w;
        this.each(function (A, z) {
            A = y.call(x, A, z);
            if (w == null || A < w) {
                w = A
            }
        });
        return w
    }
    function e(z, x) {
        z = z || Prototype.K;
        var y = [],
            w = [];
        this.each(function (B, A) {
            (z.call(x, B, A) ? y : w).push(B)
        });
        return [y, w]
    }
    function f(x) {
        var w = [];
        this.each(function (y) {
            w.push(y[x])
        });
        return w
    }
    function d(y, x) {
        var w = [];
        this.each(function (A, z) {
            if (!y.call(x, A, z)) {
                w.push(A)
            }
        });
        return w
    }
    function m(x, w) {
        return this.map(function (z, y) {
            return {
                value: z,
                criteria: x.call(w, z, y)
            }
        }).sort(function (B, A) {
            var z = B.criteria,
                y = A.criteria;
            return z < y ? -1 : z > y ? 1 : 0
        }).pluck("value")
    }
    function o() {
        return this.map()
    }
    function s() {
        var x = Prototype.K,
            w = $A(arguments);
        if (Object.isFunction(w.last())) {
            x = w.pop()
        }
        var y = [this].concat(w).map($A);
        return this.map(function (A, z) {
            return x(y.pluck(z))
        })
    }
    function k() {
        return this.toArray().length
    }
    function u() {
        return "#<Enumerable:" + this.toArray().inspect() + ">"
    }
    return {
        each: c,
        eachSlice: r,
        all: b,
        every: b,
        any: i,
        some: i,
        collect: j,
        map: j,
        detect: t,
        findAll: h,
        select: h,
        filter: h,
        grep: g,
        include: a,
        member: a,
        inGroupsOf: q,
        inject: l,
        invoke: v,
        max: p,
        min: n,
        partition: e,
        pluck: f,
        reject: d,
        sortBy: m,
        toArray: o,
        entries: o,
        zip: s,
        size: k,
        inspect: u,
        find: t
    }
})();

function $A(c) {
    if (!c) {
        return []
    }
    if ("toArray" in Object(c)) {
        return c.toArray()
    }
    var b = c.length || 0,
        a = new Array(b);
    while (b--) {
        a[b] = c[b]
    }
    return a
}
function $w(a) {
    if (!Object.isString(a)) {
        return []
    }
    a = a.strip();
    return a ? a.split(/\s+/) : []
}
Array.from = $A;
(function () {
    var r = Array.prototype,
        m = r.slice,
        o = r.forEach;

    function b(w, v) {
        for (var u = 0, x = this.length >>> 0; u < x; u++) {
            if (u in this) {
                w.call(v, this[u], u, this)
            }
        }
    }
    if (!o) {
        o = b
    }
    function l() {
        this.length = 0;
        return this
    }
    function d() {
        return this[0]
    }
    function g() {
        return this[this.length - 1]
    }
    function i() {
        return this.select(function (u) {
            return u != null
        })
    }
    function t() {
        return this.inject([], function (v, u) {
            if (Object.isArray(u)) {
                return v.concat(u.flatten())
            }
            v.push(u);
            return v
        })
    }
    function h() {
        var u = m.call(arguments, 0);
        return this.select(function (v) {
            return !u.include(v)
        })
    }
    function f(u) {
        return (u === false ? this.toArray() : this)._reverse()
    }
    function k(u) {
        return this.inject([], function (x, w, v) {
            if (0 == v || (u ? x.last() != w : !x.include(w))) {
                x.push(w)
            }
            return x
        })
    }
    function p(u) {
        return this.uniq().findAll(function (v) {
            return u.detect(function (w) {
                return v === w
            })
        })
    }
    function q() {
        return m.call(this, 0)
    }
    function j() {
        return this.length
    }
    function s() {
        return "[" + this.map(Object.inspect).join(", ") + "]"
    }
    function a(w, u) {
        u || (u = 0);
        var v = this.length;
        if (u < 0) {
            u = v + u
        }
        for (; u < v; u++) {
            if (this[u] === w) {
                return u
            }
        }
        return -1
    }
    function n(v, u) {
        u = isNaN(u) ? this.length : (u < 0 ? this.length + u : u) + 1;
        var w = this.slice(0, u).reverse().indexOf(v);
        return (w < 0) ? w : u - w - 1
    }
    function c() {
        var z = m.call(this, 0),
            x;
        for (var v = 0, w = arguments.length; v < w; v++) {
            x = arguments[v];
            if (Object.isArray(x) && !("callee" in x)) {
                for (var u = 0, y = x.length; u < y; u++) {
                    z.push(x[u])
                }
            } else {
                z.push(x)
            }
        }
        return z
    }
    Object.extend(r, Enumerable);
    if (!r._reverse) {
        r._reverse = r.reverse
    }
    Object.extend(r, {
        _each: o,
        clear: l,
        first: d,
        last: g,
        compact: i,
        flatten: t,
        without: h,
        reverse: f,
        uniq: k,
        intersect: p,
        clone: q,
        toArray: q,
        size: j,
        inspect: s
    });
    var e = (function () {
        return [].concat(arguments)[0][0] !== 1
    })(1, 2);
    if (e) {
        r.concat = c
    }
    if (!r.indexOf) {
        r.indexOf = a
    }
    if (!r.lastIndexOf) {
        r.lastIndexOf = n
    }
})();

function $H(a) {
    return new Hash(a)
}
var Hash = Class.create(Enumerable, (function () {
    function e(p) {
        this._object = Object.isHash(p) ? p.toObject() : Object.clone(p)
    }
    function f(q) {
        for (var p in this._object) {
            var r = this._object[p],
                s = [p, r];
            s.key = p;
            s.value = r;
            q(s)
        }
    }
    function j(p, q) {
        return this._object[p] = q
    }
    function c(p) {
        if (this._object[p] !== Object.prototype[p]) {
            return this._object[p]
        }
    }
    function m(p) {
        var q = this._object[p];
        delete this._object[p];
        return q
    }
    function o() {
        return Object.clone(this._object)
    }
    function n() {
        return this.pluck("key")
    }
    function l() {
        return this.pluck("value")
    }
    function g(q) {
        var p = this.detect(function (r) {
            return r.value === q
        });
        return p && p.key
    }
    function i(p) {
        return this.clone().update(p)
    }
    function d(p) {
        return new Hash(p).inject(this, function (q, r) {
            q.set(r.key, r.value);
            return q
        })
    }
    function b(p, q) {
        if (Object.isUndefined(q)) {
            return p
        }
        return p + "=" + encodeURIComponent(String.interpret(q))
    }
    function a() {
        return this.inject([], function (t, w) {
            var s = encodeURIComponent(w.key),
                q = w.value;
            if (q && typeof q == "object") {
                if (Object.isArray(q)) {
                    var v = [];
                    for (var r = 0, p = q.length, u; r < p; r++) {
                        u = q[r];
                        v.push(b(s, u))
                    }
                    return t.concat(v)
                }
            } else {
                t.push(b(s, q))
            }
            return t
        }).join("&")
    }
    function k() {
        return "#<Hash:{" + this.map(function (p) {
            return p.map(Object.inspect).join(": ")
        }).join(", ") + "}>"
    }
    function h() {
        return new Hash(this)
    }
    return {
        initialize: e,
        _each: f,
        set: j,
        get: c,
        unset: m,
        toObject: o,
        toTemplateReplacements: o,
        keys: n,
        values: l,
        index: g,
        merge: i,
        update: d,
        toQueryString: a,
        inspect: k,
        toJSON: o,
        clone: h
    }
})());
Hash.from = $H;
Object.extend(Number.prototype, (function () {
    function d() {
        return this.toPaddedString(2, 16)
    }
    function b() {
        return this + 1
    }
    function h(j, i) {
        $R(0, this, true).each(j, i);
        return this
    }
    function g(k, j) {
        var i = this.toString(j || 10);
        return "0".times(k - i.length) + i
    }
    function a() {
        return Math.abs(this)
    }
    function c() {
        return Math.round(this)
    }
    function e() {
        return Math.ceil(this)
    }
    function f() {
        return Math.floor(this)
    }
    return {
        toColorPart: d,
        succ: b,
        times: h,
        toPaddedString: g,
        abs: a,
        round: c,
        ceil: e,
        floor: f
    }
})());

function $R(c, a, b) {
    return new ObjectRange(c, a, b)
}
var ObjectRange = Class.create(Enumerable, (function () {
    function b(f, d, e) {
        this.start = f;
        this.end = d;
        this.exclusive = e
    }
    function c(d) {
        var e = this.start;
        while (this.include(e)) {
            d(e);
            e = e.succ()
        }
    }
    function a(d) {
        if (d < this.start) {
            return false
        }
        if (this.exclusive) {
            return d < this.end
        }
        return d <= this.end
    }
    return {
        initialize: b,
        _each: c,
        include: a
    }
})());


function $(b) {
    if (arguments.length > 1) {
        for (var a = 0, d = [], c = arguments.length; a < c; a++) {
            d.push($(arguments[a]))
        }
        return d
    }
    if (Object.isString(b)) {
        b = document.getElementById(b)
    }
    return Element.extend(b)
}
if (Prototype.BrowserFeatures.XPath) {
    document._getElementsByXPath = function (f, a) {
        var c = [];
        var e = document.evaluate(f, $(a) || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var b = 0, d = e.snapshotLength; b < d; b++) {
            c.push(Element.extend(e.snapshotItem(b)))
        }
        return c
    }
}
if (!Node) {
    var Node = {}
}
if (!Node.ELEMENT_NODE) {
    Object.extend(Node, {
        ELEMENT_NODE: 1,
        ATTRIBUTE_NODE: 2,
        TEXT_NODE: 3,
        CDATA_SECTION_NODE: 4,
        ENTITY_REFERENCE_NODE: 5,
        ENTITY_NODE: 6,
        PROCESSING_INSTRUCTION_NODE: 7,
        COMMENT_NODE: 8,
        DOCUMENT_NODE: 9,
        DOCUMENT_TYPE_NODE: 10,
        DOCUMENT_FRAGMENT_NODE: 11,
        NOTATION_NODE: 12
    })
}(function (c) {
    function d(f, e) {
        if (f === "select") {
            return false
        }
        if ("type" in e) {
            return false
        }
        return true
    }
    var b = (function () {
        try {
            var e = document.createElement('<input name="x">');
            return e.tagName.toLowerCase() === "input" && e.name === "x"
        } catch (f) {
            return false
        }
    })();
    var a = c.Element;
    c.Element = function (g, f) {
        f = f || {};
        g = g.toLowerCase();
        var e = Element.cache;
        if (b && f.name) {
            g = "<" + g + ' name="' + f.name + '">';
            delete f.name;
            return Element.writeAttribute(document.createElement(g), f)
        }
        if (!e[g]) {
            e[g] = Element.extend(document.createElement(g))
        }
        var h = d(g, f) ? e[g].cloneNode(false) : document.createElement(g);
        return Element.writeAttribute(h, f)
    };
    Object.extend(c.Element, a || {});
    if (a) {
        c.Element.prototype = a.prototype
    }
})(this);
Element.idCounter = 1;
Element.cache = {};
Element._purgeElement = function (b) {
    var a = b._prototypeUID;
    if (a) {
        Element.stopObserving(b);
        b._prototypeUID = void 0;
        delete Element.Storage[a]
    }
};
Element.Methods = {
    visible: function (a) {
        return $(a).style.display != "none"
    },
    toggle: function (a) {
        a = $(a);
        Element[Element.visible(a) ? "hide" : "show"](a);
        return a
    },
    hide: function (a) {
        a = $(a);
        a.style.display = "none";
        return a
    },
    show: function (a) {
        a = $(a);
        a.style.display = "";
        return a
    },
    remove: function (a) {
        a = $(a);
        a.parentNode.removeChild(a);
        return a
    },
    update: (function () {
        var d = (function () {
            var g = document.createElement("select"),
                h = true;
            g.innerHTML = '<option value="test">test</option>';
            if (g.options && g.options[0]) {
                h = g.options[0].nodeName.toUpperCase() !== "OPTION"
            }
            g = null;
            return h
        })();
        var b = (function () {
            try {
                var g = document.createElement("table");
                if (g && g.tBodies) {
                    g.innerHTML = "<tbody><tr><td>test</td></tr></tbody>";
                    var i = typeof g.tBodies[0] == "undefined";
                    g = null;
                    return i
                }
            } catch (h) {
                return true
            }
        })();
        var a = (function () {
            try {
                var g = document.createElement("div");
                g.innerHTML = "<link>";
                var i = (g.childNodes.length === 0);
                g = null;
                return i
            } catch (h) {
                return true
            }
        })();
        var c = d || b || a;
        var f = (function () {
            var g = document.createElement("script"),
                i = false;
            try {
                g.appendChild(document.createTextNode(""));
                i = !g.firstChild || g.firstChild && g.firstChild.nodeType !== 3
            } catch (h) {
                i = true
            }
            g = null;
            return i
        })();

        function e(l, m) {
            l = $(l);
            var g = Element._purgeElement;
            var n = l.getElementsByTagName("*"),
                k = n.length;
            while (k--) {
                g(n[k])
            }
            if (m && m.toElement) {
                m = m.toElement()
            }
            if (Object.isElement(m)) {
                return l.update().insert(m)
            }
            m = Object.toHTML(m);
            var j = l.tagName.toUpperCase();
            if (j === "SCRIPT" && f) {
                l.text = m;
                return l
            }
            if (c) {
                if (j in Element._insertionTranslations.tags) {
                    while (l.firstChild) {
                        l.removeChild(l.firstChild)
                    }
                    Element._getContentFromAnonymousElement(j, m.stripScripts()).each(function (i) {
                        l.appendChild(i)
                    })
                } else {
                    if (a && Object.isString(m) && m.indexOf("<link") > -1) {
                        while (l.firstChild) {
                            l.removeChild(l.firstChild)
                        }
                        var h = Element._getContentFromAnonymousElement(j, m.stripScripts(), true);
                        h.each(function (i) {
                            l.appendChild(i)
                        })
                    } else {
                        l.innerHTML = m.stripScripts()
                    }
                }
            } else {
                l.innerHTML = m.stripScripts()
            }
            m.evalScripts.bind(m).defer();
            return l
        }
        return e
    })(),
    replace: function (b, c) {
        b = $(b);
        if (c && c.toElement) {
            c = c.toElement()
        } else {
            if (!Object.isElement(c)) {
                c = Object.toHTML(c);
                var a = b.ownerDocument.createRange();
                a.selectNode(b);
                c.evalScripts.bind(c).defer();
                c = a.createContextualFragment(c.stripScripts())
            }
        }
        b.parentNode.replaceChild(c, b);
        return b
    },
    insert: function (c, e) {
        c = $(c);
        if (Object.isString(e) || Object.isNumber(e) || Object.isElement(e) || (e && (e.toElement || e.toHTML))) {
            e = {
                bottom: e
            }
        }
        var d, f, b, g;
        for (var a in e) {
            d = e[a];
            a = a.toLowerCase();
            f = Element._insertionTranslations[a];
            if (d && d.toElement) {
                d = d.toElement()
            }
            if (Object.isElement(d)) {
                f(c, d);
                continue
            }
            d = Object.toHTML(d);
            b = ((a == "before" || a == "after") ? c.parentNode : c).tagName.toUpperCase();
            g = Element._getContentFromAnonymousElement(b, d.stripScripts());
            if (a == "top" || a == "after") {
                g.reverse()
            }
            g.each(f.curry(c));
            d.evalScripts.bind(d).defer()
        }
        return c
    },
    wrap: function (b, c, a) {
        b = $(b);
        if (Object.isElement(c)) {
            $(c).writeAttribute(a || {})
        } else {
            if (Object.isString(c)) {
                c = new Element(c, a)
            } else {
                c = new Element("div", c)
            }
        }
        if (b.parentNode) {
            b.parentNode.replaceChild(c, b)
        }
        c.appendChild(b);
        return c
    },
    inspect: function (b) {
        b = $(b);
        var a = "<" + b.tagName.toLowerCase();
        $H({
            id: "id",
            className: "class"
        }).each(function (f) {
            var e = f.first(),
                c = f.last(),
                d = (b[e] || "").toString();
            if (d) {
                a += " " + c + "=" + d.inspect(true)
            }
        });
        return a + ">"
    },
    recursivelyCollect: function (a, c, d) {
        a = $(a);
        d = d || -1;
        var b = [];
        while (a = a[c]) {
            if (a.nodeType == 1) {
                b.push(Element.extend(a))
            }
            if (b.length == d) {
                break
            }
        }
        return b
    },
    ancestors: function (a) {
        return Element.recursivelyCollect(a, "parentNode")
    },
    descendants: function (a) {
        return Element.select(a, "*")
    },
    firstDescendant: function (a) {
        a = $(a).firstChild;
        while (a && a.nodeType != 1) {
            a = a.nextSibling
        }
        return $(a)
    },
    immediateDescendants: function (b) {
        var a = [],
            c = $(b).firstChild;
        while (c) {
            if (c.nodeType === 1) {
                a.push(Element.extend(c))
            }
            c = c.nextSibling
        }
        return a
    },
    previousSiblings: function (a, b) {
        return Element.recursivelyCollect(a, "previousSibling")
    },
    nextSiblings: function (a) {
        return Element.recursivelyCollect(a, "nextSibling")
    },
    siblings: function (a) {
        a = $(a);
        return Element.previousSiblings(a).reverse().concat(Element.nextSiblings(a))
    },
    match: function (b, a) {
        b = $(b);
        if (Object.isString(a)) {
            return Prototype.Selector.match(b, a)
        }
        return a.match(b)
    },
    up: function (b, d, a) {
        b = $(b);
        if (arguments.length == 1) {
            return $(b.parentNode)
        }
        var c = Element.ancestors(b);
        return Object.isNumber(d) ? c[d] : Prototype.Selector.find(c, d, a)
    },
    down: function (b, c, a) {
        b = $(b);
        if (arguments.length == 1) {
            return Element.firstDescendant(b)
        }
        return Object.isNumber(c) ? Element.descendants(b)[c] : Element.select(b, c)[a || 0]
    },
    previous: function (b, c, a) {
        b = $(b);
        if (Object.isNumber(c)) {
            a = c, c = false
        }
        if (!Object.isNumber(a)) {
            a = 0
        }
        if (c) {
            return Prototype.Selector.find(b.previousSiblings(), c, a)
        } else {
            return b.recursivelyCollect("previousSibling", a + 1)[a]
        }
    },
    next: function (b, d, a) {
        b = $(b);
        if (Object.isNumber(d)) {
            a = d, d = false
        }
        if (!Object.isNumber(a)) {
            a = 0
        }
        if (d) {
            return Prototype.Selector.find(b.nextSiblings(), d, a)
        } else {
            var c = Object.isNumber(a) ? a + 1 : 1;
            return b.recursivelyCollect("nextSibling", a + 1)[a]
        }
    },
    select: function (a) {
        a = $(a);
        var b = Array.prototype.slice.call(arguments, 1).join(", ");
        return Prototype.Selector.select(b, a)
    },
    adjacent: function (a) {
        a = $(a);
        var b = Array.prototype.slice.call(arguments, 1).join(", ");
        return Prototype.Selector.select(b, a.parentNode).without(a)
    },
    identify: function (a) {
        a = $(a);
        var b = Element.readAttribute(a, "id");
        if (b) {
            return b
        }
        do {
            b = "anonymous_element_" + Element.idCounter++
        } while ($(b));
        Element.writeAttribute(a, "id", b);
        return b
    },
    readAttribute: function (c, a) {
        c = $(c);
        if (Prototype.Browser.IE) {
            var b = Element._attributeTranslations.read;
            if (b.values[a]) {
                return b.values[a](c, a)
            }
            if (b.names[a]) {
                a = b.names[a]
            }
            if (a.include(":")) {
                return (!c.attributes || !c.attributes[a]) ? null : c.attributes[a].value
            }
        }
        return c.getAttribute(a)
    },
    writeAttribute: function (e, c, f) {
        e = $(e);
        var b = {},
            d = Element._attributeTranslations.write;
        if (typeof c == "object") {
            b = c
        } else {
            b[c] = Object.isUndefined(f) ? true : f
        }
        for (var a in b) {
            c = d.names[a] || a;
            f = b[a];
            if (d.values[a]) {
                c = d.values[a](e, f)
            }
            if (f === false || f === null) {
                e.removeAttribute(c)
            } else {
                if (f === true) {
                    e.setAttribute(c, c)
                } else {
                    e.setAttribute(c, f)
                }
            }
        }
        return e
    },
    getHeight: function (a) {
        return Element.getDimensions(a).height
    },
    getWidth: function (a) {
        return Element.getDimensions(a).width
    },
    classNames: function (a) {
        return new Element.ClassNames(a)
    },
    hasClassName: function (a, b) {
        if (!(a = $(a))) {
            return
        }
        var c = a.className;
        return (c.length > 0 && (c == b || new RegExp("(^|\\s)" + b + "(\\s|$)").test(c)))
    },
    addClassName: function (a, b) {
        if (!(a = $(a))) {
            return
        }
        if (!Element.hasClassName(a, b)) {
            a.className += (a.className ? " " : "") + b
        }
        return a
    },
    removeClassName: function (a, b) {
        if (!(a = $(a))) {
            return
        }
        a.className = a.className.replace(new RegExp("(^|\\s+)" + b + "(\\s+|$)"), " ").strip();
        return a
    },
    toggleClassName: function (a, b) {
        if (!(a = $(a))) {
            return
        }
        return Element[Element.hasClassName(a, b) ? "removeClassName" : "addClassName"](a, b)
    },
    cleanWhitespace: function (b) {
        b = $(b);
        var c = b.firstChild;
        while (c) {
            var a = c.nextSibling;
            if (c.nodeType == 3 && !/\S/.test(c.nodeValue)) {
                b.removeChild(c)
            }
            c = a
        }
        return b
    },
    empty: function (a) {
        return $(a).innerHTML.blank()
    },
    descendantOf: function (b, a) {
        b = $(b), a = $(a);
        if (b.compareDocumentPosition) {
            return (b.compareDocumentPosition(a) & 8) === 8
        }
        if (a.contains) {
            return a.contains(b) && a !== b
        }
        while (b = b.parentNode) {
            if (b == a) {
                return true
            }
        }
        return false
    },
    scrollTo: function (a) {
        a = $(a);
        var b = Element.cumulativeOffset(a);
        window.scrollTo(b[0], b[1]);
        return a
    },
    getStyle: function (b, c) {
        b = $(b);
        c = c == "float" ? "cssFloat" : c.camelize();
        var d = b.style[c];
        if (!d || d == "auto") {
            var a = document.defaultView.getComputedStyle(b, null);
            d = a ? a[c] : null
        }
        if (c == "opacity") {
            return d ? parseFloat(d) : 1
        }
        return d == "auto" ? null : d
    },
    getOpacity: function (a) {
        return $(a).getStyle("opacity")
    },
    setStyle: function (b, c) {
        b = $(b);
        var e = b.style,
            a;
        if (Object.isString(c)) {
            b.style.cssText += ";" + c;
            return c.include("opacity") ? b.setOpacity(c.match(/opacity:\s*(\d?\.?\d*)/)[1]) : b
        }
        for (var d in c) {
            if (d == "opacity") {
                b.setOpacity(c[d])
            } else {
                e[(d == "float" || d == "cssFloat") ? (Object.isUndefined(e.styleFloat) ? "cssFloat" : "styleFloat") : d] = c[d]
            }
        }
        return b
    },
    setOpacity: function (a, b) {
        a = $(a);
        a.style.opacity = (b == 1 || b === "") ? "" : (b < 0.00001) ? 0 : b;
        return a
    },
    makePositioned: function (a) {
        a = $(a);
        var b = Element.getStyle(a, "position");
        if (b == "static" || !b) {
            a._madePositioned = true;
            a.style.position = "relative";
            if (Prototype.Browser.Opera) {
                a.style.top = 0;
                a.style.left = 0
            }
        }
        return a
    },
    undoPositioned: function (a) {
        a = $(a);
        if (a._madePositioned) {
            a._madePositioned = undefined;
            a.style.position = a.style.top = a.style.left = a.style.bottom = a.style.right = ""
        }
        return a
    },
    makeClipping: function (a) {
        a = $(a);
        if (a._overflow) {
            return a
        }
        a._overflow = Element.getStyle(a, "overflow") || "auto";
        if (a._overflow !== "hidden") {
            a.style.overflow = "hidden"
        }
        return a
    },
    undoClipping: function (a) {
        a = $(a);
        if (!a._overflow) {
            return a
        }
        a.style.overflow = a._overflow == "auto" ? "" : a._overflow;
        a._overflow = null;
        return a
    },
    clonePosition: function (b, d) {
        var a = Object.extend({
            setLeft: true,
            setTop: true,
            setWidth: true,
            setHeight: true,
            offsetTop: 0,
            offsetLeft: 0
        }, arguments[2] || {});
        d = $(d);
        var e = Element.viewportOffset(d),
            f = [0, 0],
            c = null;
        b = $(b);
        if (Element.getStyle(b, "position") == "absolute") {
            c = Element.getOffsetParent(b);
            f = Element.viewportOffset(c)
        }
        if (c == document.body) {
            f[0] -= document.body.offsetLeft;
            f[1] -= document.body.offsetTop
        }
        if (a.setLeft) {
            b.style.left = (e[0] - f[0] + a.offsetLeft) + "px"
        }
        if (a.setTop) {
            b.style.top = (e[1] - f[1] + a.offsetTop) + "px"
        }
        if (a.setWidth) {
            b.style.width = d.offsetWidth + "px"
        }
        if (a.setHeight) {
            b.style.height = d.offsetHeight + "px"
        }
        return b
    }
};
Object.extend(Element.Methods, {
    getElementsBySelector: Element.Methods.select,
    childElements: Element.Methods.immediateDescendants
});
Element._attributeTranslations = {
    write: {
        names: {
            className: "class",
            htmlFor: "for"
        },
        values: {}
    }
};
if (Prototype.Browser.Opera) {
    Element.Methods.getStyle = Element.Methods.getStyle.wrap(function (d, b, c) {
        switch (c) {
        case "height":
        case "width":
            if (!Element.visible(b)) {
                return null
            }
            var e = parseInt(d(b, c), 10);
            if (e !== b["offset" + c.capitalize()]) {
                return e + "px"
            }
            var a;
            if (c === "height") {
                a = ["border-top-width", "padding-top", "padding-bottom", "border-bottom-width"]
            } else {
                a = ["border-left-width", "padding-left", "padding-right", "border-right-width"]
            }
            return a.inject(e, function (f, g) {
                var h = d(b, g);
                return h === null ? f : f - parseInt(h, 10)
            }) + "px";
        default:
            return d(b, c)
        }
    });
    Element.Methods.readAttribute = Element.Methods.readAttribute.wrap(function (c, a, b) {
        if (b === "title") {
            return a.title
        }
        return c(a, b)
    })
} else {
    if (Prototype.Browser.IE) {
        Element.Methods.getStyle = function (a, b) {
            a = $(a);
            b = (b == "float" || b == "cssFloat") ? "styleFloat" : b.camelize();
            var c = a.style[b];
            if (!c && a.currentStyle) {
                c = a.currentStyle[b]
            }
            if (b == "opacity") {
                if (c = (a.getStyle("filter") || "").match(/alpha\(opacity=(.*)\)/)) {
                    if (c[1]) {
                        return parseFloat(c[1]) / 100
                    }
                }
                return 1
            }
            if (c == "auto") {
                if ((b == "width" || b == "height") && (a.getStyle("display") != "none")) {
                    return a["offset" + b.capitalize()] + "px"
                }
                return null
            }
            return c
        };
        Element.Methods.setOpacity = function (b, e) {
            function f(g) {
                return g.replace(/alpha\([^\)]*\)/gi, "")
            }
            b = $(b);
            var a = b.currentStyle;
            if ((a && !a.hasLayout) || (!a && b.style.zoom == "normal")) {
                b.style.zoom = 1
            }
            var d = b.getStyle("filter"),
                c = b.style;
            if (e == 1 || e === "") {
                (d = f(d)) ? c.filter = d : c.removeAttribute("filter");
                return b
            } else {
                if (e < 0.00001) {
                    e = 0
                }
            }
            c.filter = f(d) + "alpha(opacity=" + (e * 100) + ")";
            return b
        };
        Element._attributeTranslations = (function () {
            var b = "className",
                a = "for",
                c = document.createElement("div");
            c.setAttribute(b, "x");
            if (c.className !== "x") {
                c.setAttribute("class", "x");
                if (c.className === "x") {
                    b = "class"
                }
            }
            c = null;
            c = document.createElement("label");
            c.setAttribute(a, "x");
            if (c.htmlFor !== "x") {
                c.setAttribute("htmlFor", "x");
                if (c.htmlFor === "x") {
                    a = "htmlFor"
                }
            }
            c = null;
            return {
                read: {
                    names: {
                        "class": b,
                        className: b,
                        "for": a,
                        htmlFor: a
                    },
                    values: {
                        _getAttr: function (d, e) {
                            return d.getAttribute(e)
                        },
                        _getAttr2: function (d, e) {
                            return d.getAttribute(e, 2)
                        },
                        _getAttrNode: function (d, f) {
                            var e = d.getAttributeNode(f);
                            return e ? e.value : ""
                        },
                        _getEv: (function () {
                            var d = document.createElement("div"),
                                g;
                            d.onclick = Prototype.emptyFunction;
                            var e = d.getAttribute("onclick");
                            if (String(e).indexOf("{") > -1) {
                                g = function (f, h) {
                                    h = f.getAttribute(h);
                                    if (!h) {
                                        return null
                                    }
                                    h = h.toString();
                                    h = h.split("{")[1];
                                    h = h.split("}")[0];
                                    return h.strip()
                                }
                            } else {
                                if (e === "") {
                                    g = function (f, h) {
                                        h = f.getAttribute(h);
                                        if (!h) {
                                            return null
                                        }
                                        return h.strip()
                                    }
                                }
                            }
                            d = null;
                            return g
                        })(),
                        _flag: function (d, e) {
                            return $(d).hasAttribute(e) ? e : null
                        },
                        style: function (d) {
                            return d.style.cssText.toLowerCase()
                        },
                        title: function (d) {
                            return d.title
                        }
                    }
                }
            }
        })();
        Element._attributeTranslations.write = {
            names: Object.extend({
                cellpadding: "cellPadding",
                cellspacing: "cellSpacing"
            }, Element._attributeTranslations.read.names),
            values: {
                checked: function (a, b) {
                    a.checked = !! b
                },
                style: function (a, b) {
                    a.style.cssText = b ? b : ""
                }
            }
        };
        Element._attributeTranslations.has = {};
        $w("colSpan rowSpan vAlign dateTime accessKey tabIndex encType maxLength readOnly longDesc frameBorder").each(function (a) {
            Element._attributeTranslations.write.names[a.toLowerCase()] = a;
            Element._attributeTranslations.has[a.toLowerCase()] = a
        });
        (function (a) {
            Object.extend(a, {
                href: a._getAttr2,
                src: a._getAttr2,
                type: a._getAttr,
                action: a._getAttrNode,
                disabled: a._flag,
                checked: a._flag,
                readonly: a._flag,
                multiple: a._flag,
                onload: a._getEv,
                onunload: a._getEv,
                onclick: a._getEv,
                ondblclick: a._getEv,
                onmousedown: a._getEv,
                onmouseup: a._getEv,
                onmouseover: a._getEv,
                onmousemove: a._getEv,
                onmouseout: a._getEv,
                onfocus: a._getEv,
                onblur: a._getEv,
                onkeypress: a._getEv,
                onkeydown: a._getEv,
                onkeyup: a._getEv,
                onsubmit: a._getEv,
                onreset: a._getEv,
                onselect: a._getEv,
                onchange: a._getEv
            })
        })(Element._attributeTranslations.read.values);
        if (Prototype.BrowserFeatures.ElementExtensions) {
            (function () {
                function a(e) {
                    var b = e.getElementsByTagName("*"),
                        d = [];
                    for (var c = 0, f; f = b[c]; c++) {
                        if (f.tagName !== "!") {
                            d.push(f)
                        }
                    }
                    return d
                }
                Element.Methods.down = function (c, d, b) {
                    c = $(c);
                    if (arguments.length == 1) {
                        return c.firstDescendant()
                    }
                    return Object.isNumber(d) ? a(c)[d] : Element.select(c, d)[b || 0]
                }
            })()
        }
    } else {
        if (Prototype.Browser.Gecko && /rv:1\.8\.0/.test(navigator.userAgent)) {
            Element.Methods.setOpacity = function (a, b) {
                a = $(a);
                a.style.opacity = (b == 1) ? 0.999999 : (b === "") ? "" : (b < 0.00001) ? 0 : b;
                return a
            }
        } else {
            if (Prototype.Browser.WebKit) {
                Element.Methods.setOpacity = function (a, b) {
                    a = $(a);
                    a.style.opacity = (b == 1 || b === "") ? "" : (b < 0.00001) ? 0 : b;
                    if (b == 1) {
                        if (a.tagName.toUpperCase() == "IMG" && a.width) {
                            a.width++;
                            a.width--
                        } else {
                            try {
                                var d = document.createTextNode(" ");
                                a.appendChild(d);
                                a.removeChild(d)
                            } catch (c) {}
                        }
                    }
                    return a
                }
            }
        }
    }
}
if ("outerHTML" in document.documentElement) {
    Element.Methods.replace = function (c, e) {
        c = $(c);
        if (e && e.toElement) {
            e = e.toElement()
        }
        if (Object.isElement(e)) {
            c.parentNode.replaceChild(e, c);
            return c
        }
        e = Object.toHTML(e);
        var d = c.parentNode,
            b = d.tagName.toUpperCase();
        if (Element._insertionTranslations.tags[b]) {
            var f = c.next(),
                a = Element._getContentFromAnonymousElement(b, e.stripScripts());
            d.removeChild(c);
            if (f) {
                a.each(function (g) {
                    d.insertBefore(g, f)
                })
            } else {
                a.each(function (g) {
                    d.appendChild(g)
                })
            }
        } else {
            c.outerHTML = e.stripScripts()
        }
        e.evalScripts.bind(e).defer();
        return c
    }
}
Element._returnOffset = function (b, c) {
    var a = [b, c];
    a.left = b;
    a.top = c;
    return a
};
Element._getContentFromAnonymousElement = function (e, d, f) {
    var g = new Element("div"),
        c = Element._insertionTranslations.tags[e];
    var a = false;
    if (c) {
        a = true
    } else {
        if (f) {
            a = true;
            c = ["", "", 0]
        }
    }
    if (a) {
        g.innerHTML = "&nbsp;" + c[0] + d + c[1];
        g.removeChild(g.firstChild);
        for (var b = c[2]; b--;) {
            g = g.firstChild
        }
    } else {
        g.innerHTML = d
    }
    return $A(g.childNodes)
};
Element._insertionTranslations = {
    before: function (a, b) {
        a.parentNode.insertBefore(b, a)
    },
    top: function (a, b) {
        a.insertBefore(b, a.firstChild)
    },
    bottom: function (a, b) {
        a.appendChild(b)
    },
    after: function (a, b) {
        a.parentNode.insertBefore(b, a.nextSibling)
    },
    tags: {
        TABLE: ["<table>", "</table>", 1],
        TBODY: ["<table><tbody>", "</tbody></table>", 2],
        TR: ["<table><tbody><tr>", "</tr></tbody></table>", 3],
        TD: ["<table><tbody><tr><td>", "</td></tr></tbody></table>", 4],
        SELECT: ["<select>", "</select>", 1]
    }
};
(function () {
    var a = Element._insertionTranslations.tags;
    Object.extend(a, {
        THEAD: a.TBODY,
        TFOOT: a.TBODY,
        TH: a.TD
    })
})();
Element.Methods.Simulated = {
    hasAttribute: function (a, c) {
        c = Element._attributeTranslations.has[c] || c;
        var b = $(a).getAttributeNode(c);
        return !!(b && b.specified)
    }
};
Element.Methods.ByTag = {};
Object.extend(Element, Element.Methods);
(function (a) {
    if (!Prototype.BrowserFeatures.ElementExtensions && a.__proto__) {
        window.HTMLElement = {};
        window.HTMLElement.prototype = a.__proto__;
        Prototype.BrowserFeatures.ElementExtensions = true
    }
    a = null
})(document.createElement("div"));
Element.extend = (function () {
    function c(g) {
        if (typeof window.Element != "undefined") {
            var i = window.Element.prototype;
            if (i) {
                var k = "_" + (Math.random() + "").slice(2),
                    h = document.createElement(g);
                i[k] = "x";
                var j = (h[k] !== "x");
                delete i[k];
                h = null;
                return j
            }
        }
        return false
    }
    function b(h, g) {
        for (var j in g) {
            var i = g[j];
            if (Object.isFunction(i) && !(j in h)) {
                h[j] = i.methodize()
            }
        }
    }
    var d = c("object");
    if (Prototype.BrowserFeatures.SpecificElementExtensions) {
        if (d) {
            return function (h) {
                if (h && typeof h._extendedByPrototype == "undefined") {
                    var g = h.tagName;
                    if (g && (/^(?:object|applet|embed)$/i.test(g))) {
                        b(h, Element.Methods);
                        b(h, Element.Methods.Simulated);
                        b(h, Element.Methods.ByTag[g.toUpperCase()])
                    }
                }
                return h
            }
        }
        return Prototype.K
    }
    var a = {},
        e = Element.Methods.ByTag;
    var f = Object.extend(function (i) {
        if (!i || typeof i._extendedByPrototype != "undefined" || i.nodeType != 1 || i == window) {
            return i
        }
        var g = Object.clone(a),
            h = i.tagName.toUpperCase();
        if (e[h]) {
            Object.extend(g, e[h])
        }
        b(i, g);
        i._extendedByPrototype = Prototype.emptyFunction;
        return i
    }, {
        refresh: function () {
            if (!Prototype.BrowserFeatures.ElementExtensions) {
                Object.extend(a, Element.Methods);
                Object.extend(a, Element.Methods.Simulated)
            }
        }
    });
    f.refresh();
    return f
})();
if (document.documentElement.hasAttribute) {
    Element.hasAttribute = function (a, b) {
        return a.hasAttribute(b)
    }
} else {
    Element.hasAttribute = Element.Methods.Simulated.hasAttribute
}
Element.addMethods = function (c) {
    var i = Prototype.BrowserFeatures,
        d = Element.Methods.ByTag;
    if (!c) {
        Object.extend(Form, Form.Methods);
        Object.extend(Form.Element, Form.Element.Methods);
        Object.extend(Element.Methods.ByTag, {
            FORM: Object.clone(Form.Methods),
            INPUT: Object.clone(Form.Element.Methods),
            SELECT: Object.clone(Form.Element.Methods),
            TEXTAREA: Object.clone(Form.Element.Methods),
            BUTTON: Object.clone(Form.Element.Methods)
        })
    }
    if (arguments.length == 2) {
        var b = c;
        c = arguments[1]
    }
    if (!b) {
        Object.extend(Element.Methods, c || {})
    } else {
        if (Object.isArray(b)) {
            b.each(g)
        } else {
            g(b)
        }
    }
    function g(k) {
        k = k.toUpperCase();
        if (!Element.Methods.ByTag[k]) {
            Element.Methods.ByTag[k] = {}
        }
        Object.extend(Element.Methods.ByTag[k], c)
    }
    function a(m, l, k) {
        k = k || false;
        for (var o in m) {
            var n = m[o];
            if (!Object.isFunction(n)) {
                continue
            }
            if (!k || !(o in l)) {
                l[o] = n.methodize()
            }
        }
    }
    function e(n) {
        var k;
        var m = {
            OPTGROUP: "OptGroup",
            TEXTAREA: "TextArea",
            P: "Paragraph",
            FIELDSET: "FieldSet",
            UL: "UList",
            OL: "OList",
            DL: "DList",
            DIR: "Directory",
            H1: "Heading",
            H2: "Heading",
            H3: "Heading",
            H4: "Heading",
            H5: "Heading",
            H6: "Heading",
            Q: "Quote",
            INS: "Mod",
            DEL: "Mod",
            A: "Anchor",
            IMG: "Image",
            CAPTION: "TableCaption",
            COL: "TableCol",
            COLGROUP: "TableCol",
            THEAD: "TableSection",
            TFOOT: "TableSection",
            TBODY: "TableSection",
            TR: "TableRow",
            TH: "TableCell",
            TD: "TableCell",
            FRAMESET: "FrameSet",
            IFRAME: "IFrame"
        };
        if (m[n]) {
            k = "HTML" + m[n] + "Element"
        }
        if (window[k]) {
            return window[k]
        }
        k = "HTML" + n + "Element";
        if (window[k]) {
            return window[k]
        }
        k = "HTML" + n.capitalize() + "Element";
        if (window[k]) {
            return window[k]
        }
        var l = document.createElement(n),
            o = l.__proto__ || l.constructor.prototype;
        l = null;
        return o
    }
    var h = window.HTMLElement ? HTMLElement.prototype : Element.prototype;
    if (i.ElementExtensions) {
        a(Element.Methods, h);
        a(Element.Methods.Simulated, h, true)
    }
    if (i.SpecificElementExtensions) {
        for (var j in Element.Methods.ByTag) {
            var f = e(j);
            if (Object.isUndefined(f)) {
                continue
            }
            a(d[j], f.prototype)
        }
    }
    Object.extend(Element, Element.Methods);
    delete Element.ByTag;
    if (Element.extend.refresh) {
        Element.extend.refresh()
    }
    Element.cache = {}
};
document.viewport = {
    getDimensions: function () {
        return {
            width: this.getWidth(),
            height: this.getHeight()
        }
    },
    getScrollOffsets: function () {
        return Element._returnOffset(window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft, window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop)
    }
};
(function (b) {
    var g = Prototype.Browser,
        e = document,
        c, d = {};

    function a() {
        if (g.WebKit && !e.evaluate) {
            return document
        }
        if (g.Opera && window.parseFloat(window.opera.version()) < 9.5) {
            return document.body
        }
        return document.documentElement
    }
    function f(h) {
        if (!c) {
            c = a()
        }
        d[h] = "client" + h;
        b["get" + h] = function () {
            return c[d[h]]
        };
        return b["get" + h]()
    }
    b.getWidth = f.curry("Width");
    b.getHeight = f.curry("Height")
})(document.viewport);
Element.Storage = {
    UID: 1
};
Element.addMethods({
    getStorage: function (b) {
        if (!(b = $(b))) {
            return
        }
        var a;
        if (b === window) {
            a = 0
        } else {
            if (typeof b._prototypeUID === "undefined") {
                b._prototypeUID = Element.Storage.UID++
            }
            a = b._prototypeUID
        }
        if (!Element.Storage[a]) {
            Element.Storage[a] = $H()
        }
        return Element.Storage[a]
    },
    store: function (b, a, c) {
        if (!(b = $(b))) {
            return
        }
        if (arguments.length === 2) {
            Element.getStorage(b).update(a)
        } else {
            Element.getStorage(b).set(a, c)
        }
        return b
    },
    retrieve: function (c, b, a) {
        if (!(c = $(c))) {
            return
        }
        var e = Element.getStorage(c),
            d = e.get(b);
        if (Object.isUndefined(d)) {
            e.set(b, a);
            d = a
        }
        return d
    },
    clone: function (c, a) {
        if (!(c = $(c))) {
            return
        }
        var e = c.cloneNode(a);
        e._prototypeUID = void 0;
        if (a) {
            var d = Element.select(e, "*"),
                b = d.length;
            while (b--) {
                d[b]._prototypeUID = void 0
            }
        }
        return Element.extend(e)
    },
    purge: function (c) {
        if (!(c = $(c))) {
            return
        }
        var a = Element._purgeElement;
        a(c);
        var d = c.getElementsByTagName("*"),
            b = d.length;
        while (b--) {
            a(d[b])
        }
        return null
    }
});
(function () {
    function h(v) {
        var u = v.match(/^(\d+)%?$/i);
        if (!u) {
            return null
        }
        return (Number(u[1]) / 100)
    }
    function o(F, G, v) {
        var y = null;
        if (Object.isElement(F)) {
            y = F;
            F = y.getStyle(G)
        }
        if (F === null) {
            return null
        }
        if ((/^(?:-)?\d+(\.\d+)?(px)?$/i).test(F)) {
            return window.parseFloat(F)
        }
        var A = F.include("%"),
            w = (v === document.viewport);
        if (/\d/.test(F) && y && y.runtimeStyle && !(A && w)) {
            var u = y.style.left,
                E = y.runtimeStyle.left;
            y.runtimeStyle.left = y.currentStyle.left;
            y.style.left = F || 0;
            F = y.style.pixelLeft;
            y.style.left = u;
            y.runtimeStyle.left = E;
            return F
        }
        if (y && A) {
            v = v || y.parentNode;
            var x = h(F);
            var B = null;
            var z = y.getStyle("position");
            var D = G.include("left") || G.include("right") || G.include("width");
            var C = G.include("top") || G.include("bottom") || G.include("height");
            if (v === document.viewport) {
                if (D) {
                    B = document.viewport.getWidth()
                } else {
                    if (C) {
                        B = document.viewport.getHeight()
                    }
                }
            } else {
                if (D) {
                    B = $(v).measure("width")
                } else {
                    if (C) {
                        B = $(v).measure("height")
                    }
                }
            }
            return (B === null) ? 0 : B * x
        }
        return 0
    }
    function g(u) {
        if (Object.isString(u) && u.endsWith("px")) {
            return u
        }
        return u + "px"
    }
    function j(v) {
        var u = v;
        while (v && v.parentNode) {
            var w = v.getStyle("display");
            if (w === "none") {
                return false
            }
            v = $(v.parentNode)
        }
        return true
    }
    var d = Prototype.K;
    if ("currentStyle" in document.documentElement) {
        d = function (u) {
            if (!u.currentStyle.hasLayout) {
                u.style.zoom = 1
            }
            return u
        }
    }
    function f(u) {
        if (u.include("border")) {
            u = u + "-width"
        }
        return u.camelize()
    }
    Element.Layout = Class.create(Hash, {
        initialize: function ($super, v, u) {
            $super();
            this.element = $(v);
            Element.Layout.PROPERTIES.each(function (w) {
                this._set(w, null)
            }, this);
            if (u) {
                this._preComputing = true;
                this._begin();
                Element.Layout.PROPERTIES.each(this._compute, this);
                this._end();
                this._preComputing = false
            }
        },
        _set: function (v, u) {
            return Hash.prototype.set.call(this, v, u)
        },
        set: function (v, u) {
            throw "Properties of Element.Layout are read-only."
        },
        get: function ($super, v) {
            var u = $super(v);
            return u === null ? this._compute(v) : u
        },
        _begin: function () {
            if (this._prepared) {
                return
            }
            var y = this.element;
            if (j(y)) {
                this._prepared = true;
                return
            }
            var A = {
                position: y.style.position || "",
                width: y.style.width || "",
                visibility: y.style.visibility || "",
                display: y.style.display || ""
            };
            y.store("prototype_original_styles", A);
            var B = y.getStyle("position"),
                u = y.getStyle("width");
            if (u === "0px" || u === null) {
                y.style.display = "block";
                u = y.getStyle("width")
            }
            var v = (B === "fixed") ? document.viewport : y.parentNode;
            y.setStyle({
                position: "absolute",
                visibility: "hidden",
                display: "block"
            });
            var w = y.getStyle("width");
            var x;
            if (u && (w === u)) {
                x = o(y, "width", v)
            } else {
                if (B === "absolute" || B === "fixed") {
                    x = o(y, "width", v)
                } else {
                    var C = y.parentNode,
                        z = $(C).getLayout();
                    x = z.get("width") - this.get("margin-left") - this.get("border-left") - this.get("padding-left") - this.get("padding-right") - this.get("border-right") - this.get("margin-right")
                }
            }
            y.setStyle({
                width: x + "px"
            });
            this._prepared = true
        },
        _end: function () {
            var v = this.element;
            var u = v.retrieve("prototype_original_styles");
            v.store("prototype_original_styles", null);
            v.setStyle(u);
            this._prepared = false
        },
        _compute: function (v) {
            var u = Element.Layout.COMPUTATIONS;
            if (!(v in u)) {
                throw "Property not found."
            }
            return this._set(v, u[v].call(this, this.element))
        },
        toObject: function () {
            var u = $A(arguments);
            var v = (u.length === 0) ? Element.Layout.PROPERTIES : u.join(" ").split(" ");
            var w = {};
            v.each(function (x) {
                if (!Element.Layout.PROPERTIES.include(x)) {
                    return
                }
                var y = this.get(x);
                if (y != null) {
                    w[x] = y
                }
            }, this);
            return w
        },
        toHash: function () {
            var u = this.toObject.apply(this, arguments);
            return new Hash(u)
        },
        toCSS: function () {
            var u = $A(arguments);
            var w = (u.length === 0) ? Element.Layout.PROPERTIES : u.join(" ").split(" ");
            var v = {};
            w.each(function (x) {
                if (!Element.Layout.PROPERTIES.include(x)) {
                    return
                }
                if (Element.Layout.COMPOSITE_PROPERTIES.include(x)) {
                    return
                }
                var y = this.get(x);
                if (y != null) {
                    v[f(x)] = y + "px"
                }
            }, this);
            return v
        },
        inspect: function () {
            return "#<Element.Layout>"
        }
    });
    Object.extend(Element.Layout, {
        PROPERTIES: $w("height width top left right bottom border-left border-right border-top border-bottom padding-left padding-right padding-top padding-bottom margin-top margin-bottom margin-left margin-right padding-box-width padding-box-height border-box-width border-box-height margin-box-width margin-box-height"),
        COMPOSITE_PROPERTIES: $w("padding-box-width padding-box-height margin-box-width margin-box-height border-box-width border-box-height"),
        COMPUTATIONS: {
            height: function (w) {
                if (!this._preComputing) {
                    this._begin()
                }
                var u = this.get("border-box-height");
                if (u <= 0) {
                    if (!this._preComputing) {
                        this._end()
                    }
                    return 0
                }
                var x = this.get("border-top"),
                    v = this.get("border-bottom");
                var z = this.get("padding-top"),
                    y = this.get("padding-bottom");
                if (!this._preComputing) {
                    this._end()
                }
                return u - x - v - z - y
            },
            width: function (w) {
                if (!this._preComputing) {
                    this._begin()
                }
                var v = this.get("border-box-width");
                if (v <= 0) {
                    if (!this._preComputing) {
                        this._end()
                    }
                    return 0
                }
                var z = this.get("border-left"),
                    u = this.get("border-right");
                var x = this.get("padding-left"),
                    y = this.get("padding-right");
                if (!this._preComputing) {
                    this._end()
                }
                return v - z - u - x - y
            },
            "padding-box-height": function (v) {
                var u = this.get("height"),
                    x = this.get("padding-top"),
                    w = this.get("padding-bottom");
                return u + x + w
            },
            "padding-box-width": function (u) {
                var v = this.get("width"),
                    w = this.get("padding-left"),
                    x = this.get("padding-right");
                return v + w + x
            },
            "border-box-height": function (v) {
                if (!this._preComputing) {
                    this._begin()
                }
                var u = v.offsetHeight;
                if (!this._preComputing) {
                    this._end()
                }
                return u
            },
            "border-box-width": function (u) {
                if (!this._preComputing) {
                    this._begin()
                }
                var v = u.offsetWidth;
                if (!this._preComputing) {
                    this._end()
                }
                return v
            },
            "margin-box-height": function (v) {
                var u = this.get("border-box-height"),
                    w = this.get("margin-top"),
                    x = this.get("margin-bottom");
                if (u <= 0) {
                    return 0
                }
                return u + w + x
            },
            "margin-box-width": function (w) {
                var v = this.get("border-box-width"),
                    x = this.get("margin-left"),
                    u = this.get("margin-right");
                if (v <= 0) {
                    return 0
                }
                return v + x + u
            },
            top: function (u) {
                var v = u.positionedOffset();
                return v.top
            },
            bottom: function (u) {
                var x = u.positionedOffset(),
                    v = u.getOffsetParent(),
                    w = v.measure("height");
                var y = this.get("border-box-height");
                return w - y - x.top
            },
            left: function (u) {
                var v = u.positionedOffset();
                return v.left
            },
            right: function (w) {
                var y = w.positionedOffset(),
                    x = w.getOffsetParent(),
                    u = x.measure("width");
                var v = this.get("border-box-width");
                return u - v - y.left
            },
            "padding-top": function (u) {
                return o(u, "paddingTop")
            },
            "padding-bottom": function (u) {
                return o(u, "paddingBottom")
            },
            "padding-left": function (u) {
                return o(u, "paddingLeft")
            },
            "padding-right": function (u) {
                return o(u, "paddingRight")
            },
            "border-top": function (u) {
                return o(u, "borderTopWidth")
            },
            "border-bottom": function (u) {
                return o(u, "borderBottomWidth")
            },
            "border-left": function (u) {
                return o(u, "borderLeftWidth")
            },
            "border-right": function (u) {
                return o(u, "borderRightWidth")
            },
            "margin-top": function (u) {
                return o(u, "marginTop")
            },
            "margin-bottom": function (u) {
                return o(u, "marginBottom")
            },
            "margin-left": function (u) {
                return o(u, "marginLeft")
            },
            "margin-right": function (u) {
                return o(u, "marginRight")
            }
        }
    });
    if ("getBoundingClientRect" in document.documentElement) {
        Object.extend(Element.Layout.COMPUTATIONS, {
            right: function (v) {
                var w = d(v.getOffsetParent());
                var x = v.getBoundingClientRect(),
                    u = w.getBoundingClientRect();
                return (u.right - x.right).round()
            },
            bottom: function (v) {
                var w = d(v.getOffsetParent());
                var x = v.getBoundingClientRect(),
                    u = w.getBoundingClientRect();
                return (u.bottom - x.bottom).round()
            }
        })
    }
    Element.Offset = Class.create({
        initialize: function (v, u) {
            this.left = v.round();
            this.top = u.round();
            this[0] = this.left;
            this[1] = this.top
        },
        relativeTo: function (u) {
            return new Element.Offset(this.left - u.left, this.top - u.top)
        },
        inspect: function () {
            return "#<Element.Offset left: #{left} top: #{top}>".interpolate(this)
        },
        toString: function () {
            return "[#{left}, #{top}]".interpolate(this)
        },
        toArray: function () {
            return [this.left, this.top]
        }
    });

    function r(v, u) {
        return new Element.Layout(v, u)
    }
    function b(u, v) {
        return $(u).getLayout().get(v)
    }
    function n(v) {
        v = $(v);
        var z = Element.getStyle(v, "display");
        if (z && z !== "none") {
            return {
                width: v.offsetWidth,
                height: v.offsetHeight
            }
        }
        var w = v.style;
        var u = {
            visibility: w.visibility,
            position: w.position,
            display: w.display
        };
        var y = {
            visibility: "hidden",
            display: "block"
        };
        if (u.position !== "fixed") {
            y.position = "absolute"
        }
        Element.setStyle(v, y);
        var x = {
            width: v.offsetWidth,
            height: v.offsetHeight
        };
        Element.setStyle(v, u);
        return x
    }
    function l(u) {
        u = $(u);
        if (e(u) || c(u) || m(u) || k(u)) {
            return $(document.body)
        }
        var v = (Element.getStyle(u, "display") === "inline");
        if (!v && u.offsetParent) {
            return $(u.offsetParent)
        }
        while ((u = u.parentNode) && u !== document.body) {
            if (Element.getStyle(u, "position") !== "static") {
                return k(u) ? $(document.body) : $(u)
            }
        }
        return $(document.body)
    }
    function t(v) {
        v = $(v);
        var u = 0,
            w = 0;
        if (v.parentNode) {
            do {
                u += v.offsetTop || 0;
                w += v.offsetLeft || 0;
                v = v.offsetParent
            } while (v)
        }
        return new Element.Offset(w, u)
    }
    function p(v) {
        v = $(v);
        var w = v.getLayout();
        var u = 0,
            y = 0;
        do {
            u += v.offsetTop || 0;
            y += v.offsetLeft || 0;
            v = v.offsetParent;
            if (v) {
                if (m(v)) {
                    break
                }
                var x = Element.getStyle(v, "position");
                if (x !== "static") {
                    break
                }
            }
        } while (v);
        y -= w.get("margin-top");
        u -= w.get("margin-left");
        return new Element.Offset(y, u)
    }
    function a(v) {
        var u = 0,
            w = 0;
        do {
            u += v.scrollTop || 0;
            w += v.scrollLeft || 0;
            v = v.parentNode
        } while (v);
        return new Element.Offset(w, u)
    }
    function s(y) {
        v = $(v);
        var u = 0,
            x = 0,
            w = document.body;
        var v = y;
        do {
            u += v.offsetTop || 0;
            x += v.offsetLeft || 0;
            if (v.offsetParent == w && Element.getStyle(v, "position") == "absolute") {
                break
            }
        } while (v = v.offsetParent);
        v = y;
        do {
            if (v != w) {
                u -= v.scrollTop || 0;
                x -= v.scrollLeft || 0
            }
        } while (v = v.parentNode);
        return new Element.Offset(x, u)
    }
    function q(u) {
        u = $(u);
        if (Element.getStyle(u, "position") === "absolute") {
            return u
        }
        var y = l(u);
        var x = u.viewportOffset(),
            v = y.viewportOffset();
        var z = x.relativeTo(v);
        var w = u.getLayout();
        u.store("prototype_absolutize_original_styles", {
            left: u.getStyle("left"),
            top: u.getStyle("top"),
            width: u.getStyle("width"),
            height: u.getStyle("height")
        });
        u.setStyle({
            position: "absolute",
            top: z.top + "px",
            left: z.left + "px",
            width: w.get("width") + "px",
            height: w.get("height") + "px"
        });
        return u
    }
    function i(v) {
        v = $(v);
        if (Element.getStyle(v, "position") === "relative") {
            return v
        }
        var u = v.retrieve("prototype_absolutize_original_styles");
        if (u) {
            v.setStyle(u)
        }
        return v
    }
    if (Prototype.Browser.IE) {
        l = l.wrap(function (w, v) {
            v = $(v);
            if (e(v) || c(v) || m(v) || k(v)) {
                return $(document.body)
            }
            var u = v.getStyle("position");
            if (u !== "static") {
                return w(v)
            }
            v.setStyle({
                position: "relative"
            });
            var x = w(v);
            v.setStyle({
                position: u
            });
            return x
        });
        p = p.wrap(function (x, v) {
            v = $(v);
            if (!v.parentNode) {
                return new Element.Offset(0, 0)
            }
            var u = v.getStyle("position");
            if (u !== "static") {
                return x(v)
            }
            var w = v.getOffsetParent();
            if (w && w.getStyle("position") === "fixed") {
                d(w)
            }
            v.setStyle({
                position: "relative"
            });
            var y = x(v);
            v.setStyle({
                position: u
            });
            return y
        })
    } else {
        if (Prototype.Browser.Webkit) {
            t = function (v) {
                v = $(v);
                var u = 0,
                    w = 0;
                do {
                    u += v.offsetTop || 0;
                    w += v.offsetLeft || 0;
                    if (v.offsetParent == document.body) {
                        if (Element.getStyle(v, "position") == "absolute") {
                            break
                        }
                    }
                    v = v.offsetParent
                } while (v);
                return new Element.Offset(w, u)
            }
        }
    }
    Element.addMethods({
        getLayout: r,
        measure: b,
        getDimensions: n,
        getOffsetParent: l,
        cumulativeOffset: t,
        positionedOffset: p,
        cumulativeScrollOffset: a,
        viewportOffset: s,
        absolutize: q,
        relativize: i
    });

    function m(u) {
        return u.nodeName.toUpperCase() === "BODY"
    }
    function k(u) {
        return u.nodeName.toUpperCase() === "HTML"
    }
    function e(u) {
        return u.nodeType === Node.DOCUMENT_NODE
    }
    function c(u) {
        return u !== document.body && !Element.descendantOf(u, document.body)
    }
    if ("getBoundingClientRect" in document.documentElement) {
        Element.addMethods({
            viewportOffset: function (u) {
                u = $(u);
                if (c(u)) {
                    return new Element.Offset(0, 0)
                }
                var v = u.getBoundingClientRect(),
                    w = document.documentElement;
                return new Element.Offset(v.left - w.clientLeft, v.top - w.clientTop)
            }
        })
    }
})();
window.$$ = function () {
    var a = $A(arguments).join(", ");
    return Prototype.Selector.select(a, document)
};
Prototype.Selector = (function () {
    function a() {
        throw new Error('Method "Prototype.Selector.select" must be defined.')
    }
    function c() {
        throw new Error('Method "Prototype.Selector.match" must be defined.')
    }
    function d(l, m, h) {
        h = h || 0;
        var g = Prototype.Selector.match,
            k = l.length,
            f = 0,
            j;
        for (j = 0; j < k; j++) {
            if (g(l[j], m) && h == f++) {
                return Element.extend(l[j])
            }
        }
    }
    function e(h) {
        for (var f = 0, g = h.length; f < g; f++) {
            Element.extend(h[f])
        }
        return h
    }
    var b = Prototype.K;
    return {
        select: a,
        match: c,
        find: d,
        extendElements: (Element.extend === b) ? b : e,
        extendElement: Element.extend
    }
})();
Prototype._original_property = window.Sizzle;
/*
 * Sizzle CSS Selector Engine - v1.0
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function () {
    var q = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
        j = 0,
        d = Object.prototype.toString,
        o = false,
        i = true;
    [0, 0].sort(function () {
        i = false;
        return 0
    });
    var b = function (E, u, B, w) {
            B = B || [];
            var e = u = u || document;
            if (u.nodeType !== 1 && u.nodeType !== 9) {
                return []
            }
            if (!E || typeof E !== "string") {
                return B
            }
            var C = [],
                D, z, I, H, A, t, s = true,
                x = p(u),
                G = E;
            while ((q.exec(""), D = q.exec(G)) !== null) {
                G = D[3];
                C.push(D[1]);
                if (D[2]) {
                    t = D[3];
                    break
                }
            }
            if (C.length > 1 && k.exec(E)) {
                if (C.length === 2 && f.relative[C[0]]) {
                    z = g(C[0] + C[1], u)
                } else {
                    z = f.relative[C[0]] ? [u] : b(C.shift(), u);
                    while (C.length) {
                        E = C.shift();
                        if (f.relative[E]) {
                            E += C.shift()
                        }
                        z = g(E, z)
                    }
                }
            } else {
                if (!w && C.length > 1 && u.nodeType === 9 && !x && f.match.ID.test(C[0]) && !f.match.ID.test(C[C.length - 1])) {
                    var J = b.find(C.shift(), u, x);
                    u = J.expr ? b.filter(J.expr, J.set)[0] : J.set[0]
                }
                if (u) {
                    var J = w ? {
                        expr: C.pop(),
                        set: a(w)
                    } : b.find(C.pop(), C.length === 1 && (C[0] === "~" || C[0] === "+") && u.parentNode ? u.parentNode : u, x);
                    z = J.expr ? b.filter(J.expr, J.set) : J.set;
                    if (C.length > 0) {
                        I = a(z)
                    } else {
                        s = false
                    }
                    while (C.length) {
                        var v = C.pop(),
                            y = v;
                        if (!f.relative[v]) {
                            v = ""
                        } else {
                            y = C.pop()
                        }
                        if (y == null) {
                            y = u
                        }
                        f.relative[v](I, y, x)
                    }
                } else {
                    I = C = []
                }
            }
            if (!I) {
                I = z
            }
            if (!I) {
                throw "Syntax error, unrecognized expression: " + (v || E)
            }
            if (d.call(I) === "[object Array]") {
                if (!s) {
                    B.push.apply(B, I)
                } else {
                    if (u && u.nodeType === 1) {
                        for (var F = 0; I[F] != null; F++) {
                            if (I[F] && (I[F] === true || I[F].nodeType === 1 && h(u, I[F]))) {
                                B.push(z[F])
                            }
                        }
                    } else {
                        for (var F = 0; I[F] != null; F++) {
                            if (I[F] && I[F].nodeType === 1) {
                                B.push(z[F])
                            }
                        }
                    }
                }
            } else {
                a(I, B)
            }
            if (t) {
                b(t, e, B, w);
                b.uniqueSort(B)
            }
            return B
        };
    b.uniqueSort = function (s) {
        if (c) {
            o = i;
            s.sort(c);
            if (o) {
                for (var e = 1; e < s.length; e++) {
                    if (s[e] === s[e - 1]) {
                        s.splice(e--, 1)
                    }
                }
            }
        }
        return s
    };
    b.matches = function (e, s) {
        return b(e, null, null, s)
    };
    b.find = function (y, e, z) {
        var x, v;
        if (!y) {
            return []
        }
        for (var u = 0, t = f.order.length; u < t; u++) {
            var w = f.order[u],
                v;
            if ((v = f.leftMatch[w].exec(y))) {
                var s = v[1];
                v.splice(1, 1);
                if (s.substr(s.length - 1) !== "\\") {
                    v[1] = (v[1] || "").replace(/\\/g, "");
                    x = f.find[w](v, e, z);
                    if (x != null) {
                        y = y.replace(f.match[w], "");
                        break
                    }
                }
            }
        }
        if (!x) {
            x = e.getElementsByTagName("*")
        }
        return {
            set: x,
            expr: y
        }
    };
    b.filter = function (B, A, E, u) {
        var t = B,
            G = [],
            y = A,
            w, e, x = A && A[0] && p(A[0]);
        while (B && A.length) {
            for (var z in f.filter) {
                if ((w = f.match[z].exec(B)) != null) {
                    var s = f.filter[z],
                        F, D;
                    e = false;
                    if (y == G) {
                        G = []
                    }
                    if (f.preFilter[z]) {
                        w = f.preFilter[z](w, y, E, G, u, x);
                        if (!w) {
                            e = F = true
                        } else {
                            if (w === true) {
                                continue
                            }
                        }
                    }
                    if (w) {
                        for (var v = 0;
                        (D = y[v]) != null; v++) {
                            if (D) {
                                F = s(D, w, v, y);
                                var C = u ^ !! F;
                                if (E && F != null) {
                                    if (C) {
                                        e = true
                                    } else {
                                        y[v] = false
                                    }
                                } else {
                                    if (C) {
                                        G.push(D);
                                        e = true
                                    }
                                }
                            }
                        }
                    }
                    if (F !== undefined) {
                        if (!E) {
                            y = G
                        }
                        B = B.replace(f.match[z], "");
                        if (!e) {
                            return []
                        }
                        break
                    }
                }
            }
            if (B == t) {
                if (e == null) {
                    throw "Syntax error, unrecognized expression: " + B
                } else {
                    break
                }
            }
            t = B
        }
        return y
    };
    var f = b.selectors = {
        order: ["ID", "NAME", "TAG"],
        match: {
            ID: /#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
            CLASS: /\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
            NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,
            ATTR: /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
            TAG: /^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,
            CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
            POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
            PSEUDO: /:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/
        },
        leftMatch: {},
        attrMap: {
            "class": "className",
            "for": "htmlFor"
        },
        attrHandle: {
            href: function (e) {
                return e.getAttribute("href")
            }
        },
        relative: {
            "+": function (y, e, x) {
                var v = typeof e === "string",
                    z = v && !/\W/.test(e),
                    w = v && !z;
                if (z && !x) {
                    e = e.toUpperCase()
                }
                for (var u = 0, t = y.length, s; u < t; u++) {
                    if ((s = y[u])) {
                        while ((s = s.previousSibling) && s.nodeType !== 1) {}
                        y[u] = w || s && s.nodeName === e ? s || false : s === e
                    }
                }
                if (w) {
                    b.filter(e, y, true)
                }
            },
            ">": function (x, s, y) {
                var v = typeof s === "string";
                if (v && !/\W/.test(s)) {
                    s = y ? s : s.toUpperCase();
                    for (var t = 0, e = x.length; t < e; t++) {
                        var w = x[t];
                        if (w) {
                            var u = w.parentNode;
                            x[t] = u.nodeName === s ? u : false
                        }
                    }
                } else {
                    for (var t = 0, e = x.length; t < e; t++) {
                        var w = x[t];
                        if (w) {
                            x[t] = v ? w.parentNode : w.parentNode === s
                        }
                    }
                    if (v) {
                        b.filter(s, x, true)
                    }
                }
            },
            "": function (u, s, w) {
                var t = j++,
                    e = r;
                if (!/\W/.test(s)) {
                    var v = s = w ? s : s.toUpperCase();
                    e = n
                }
                e("parentNode", s, t, u, v, w)
            },
            "~": function (u, s, w) {
                var t = j++,
                    e = r;
                if (typeof s === "string" && !/\W/.test(s)) {
                    var v = s = w ? s : s.toUpperCase();
                    e = n
                }
                e("previousSibling", s, t, u, v, w)
            }
        },
        find: {
            ID: function (s, t, u) {
                if (typeof t.getElementById !== "undefined" && !u) {
                    var e = t.getElementById(s[1]);
                    return e ? [e] : []
                }
            },
            NAME: function (t, w, x) {
                if (typeof w.getElementsByName !== "undefined") {
                    var s = [],
                        v = w.getElementsByName(t[1]);
                    for (var u = 0, e = v.length; u < e; u++) {
                        if (v[u].getAttribute("name") === t[1]) {
                            s.push(v[u])
                        }
                    }
                    return s.length === 0 ? null : s
                }
            },
            TAG: function (e, s) {
                return s.getElementsByTagName(e[1])
            }
        },
        preFilter: {
            CLASS: function (u, s, t, e, x, y) {
                u = " " + u[1].replace(/\\/g, "") + " ";
                if (y) {
                    return u
                }
                for (var v = 0, w;
                (w = s[v]) != null; v++) {
                    if (w) {
                        if (x ^ (w.className && (" " + w.className + " ").indexOf(u) >= 0)) {
                            if (!t) {
                                e.push(w)
                            }
                        } else {
                            if (t) {
                                s[v] = false
                            }
                        }
                    }
                }
                return false
            },
            ID: function (e) {
                return e[1].replace(/\\/g, "")
            },
            TAG: function (s, e) {
                for (var t = 0; e[t] === false; t++) {}
                return e[t] && p(e[t]) ? s[1] : s[1].toUpperCase()
            },
            CHILD: function (e) {
                if (e[1] == "nth") {
                    var s = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(e[2] == "even" && "2n" || e[2] == "odd" && "2n+1" || !/\D/.test(e[2]) && "0n+" + e[2] || e[2]);
                    e[2] = (s[1] + (s[2] || 1)) - 0;
                    e[3] = s[3] - 0
                }
                e[0] = j++;
                return e
            },
            ATTR: function (v, s, t, e, w, x) {
                var u = v[1].replace(/\\/g, "");
                if (!x && f.attrMap[u]) {
                    v[1] = f.attrMap[u]
                }
                if (v[2] === "~=") {
                    v[4] = " " + v[4] + " "
                }
                return v
            },
            PSEUDO: function (v, s, t, e, w) {
                if (v[1] === "not") {
                    if ((q.exec(v[3]) || "").length > 1 || /^\w/.test(v[3])) {
                        v[3] = b(v[3], null, null, s)
                    } else {
                        var u = b.filter(v[3], s, t, true ^ w);
                        if (!t) {
                            e.push.apply(e, u)
                        }
                        return false
                    }
                } else {
                    if (f.match.POS.test(v[0]) || f.match.CHILD.test(v[0])) {
                        return true
                    }
                }
                return v
            },
            POS: function (e) {
                e.unshift(true);
                return e
            }
        },
        filters: {
            enabled: function (e) {
                return e.disabled === false && e.type !== "hidden"
            },
            disabled: function (e) {
                return e.disabled === true
            },
            checked: function (e) {
                return e.checked === true
            },
            selected: function (e) {
                e.parentNode.selectedIndex;
                return e.selected === true
            },
            parent: function (e) {
                return !!e.firstChild
            },
            empty: function (e) {
                return !e.firstChild
            },
            has: function (t, s, e) {
                return !!b(e[3], t).length
            },
            header: function (e) {
                return /h\d/i.test(e.nodeName)
            },
            text: function (e) {
                return "text" === e.type
            },
            radio: function (e) {
                return "radio" === e.type
            },
            checkbox: function (e) {
                return "checkbox" === e.type
            },
            file: function (e) {
                return "file" === e.type
            },
            password: function (e) {
                return "password" === e.type
            },
            submit: function (e) {
                return "submit" === e.type
            },
            image: function (e) {
                return "image" === e.type
            },
            reset: function (e) {
                return "reset" === e.type
            },
            button: function (e) {
                return "button" === e.type || e.nodeName.toUpperCase() === "BUTTON"
            },
            input: function (e) {
                return /input|select|textarea|button/i.test(e.nodeName)
            }
        },
        setFilters: {
            first: function (s, e) {
                return e === 0
            },
            last: function (t, s, e, u) {
                return s === u.length - 1
            },
            even: function (s, e) {
                return e % 2 === 0
            },
            odd: function (s, e) {
                return e % 2 === 1
            },
            lt: function (t, s, e) {
                return s < e[3] - 0
            },
            gt: function (t, s, e) {
                return s > e[3] - 0
            },
            nth: function (t, s, e) {
                return e[3] - 0 == s
            },
            eq: function (t, s, e) {
                return e[3] - 0 == s
            }
        },
        filter: {
            PSEUDO: function (x, t, u, y) {
                var s = t[1],
                    v = f.filters[s];
                if (v) {
                    return v(x, u, t, y)
                } else {
                    if (s === "contains") {
                        return (x.textContent || x.innerText || "").indexOf(t[3]) >= 0
                    } else {
                        if (s === "not") {
                            var w = t[3];
                            for (var u = 0, e = w.length; u < e; u++) {
                                if (w[u] === x) {
                                    return false
                                }
                            }
                            return true
                        }
                    }
                }
            },
            CHILD: function (e, u) {
                var x = u[1],
                    s = e;
                switch (x) {
                case "only":
                case "first":
                    while ((s = s.previousSibling)) {
                        if (s.nodeType === 1) {
                            return false
                        }
                    }
                    if (x == "first") {
                        return true
                    }
                    s = e;
                case "last":
                    while ((s = s.nextSibling)) {
                        if (s.nodeType === 1) {
                            return false
                        }
                    }
                    return true;
                case "nth":
                    var t = u[2],
                        A = u[3];
                    if (t == 1 && A == 0) {
                        return true
                    }
                    var w = u[0],
                        z = e.parentNode;
                    if (z && (z.sizcache !== w || !e.nodeIndex)) {
                        var v = 0;
                        for (s = z.firstChild; s; s = s.nextSibling) {
                            if (s.nodeType === 1) {
                                s.nodeIndex = ++v
                            }
                        }
                        z.sizcache = w
                    }
                    var y = e.nodeIndex - A;
                    if (t == 0) {
                        return y == 0
                    } else {
                        return (y % t == 0 && y / t >= 0)
                    }
                }
            },
            ID: function (s, e) {
                return s.nodeType === 1 && s.getAttribute("id") === e
            },
            TAG: function (s, e) {
                return (e === "*" && s.nodeType === 1) || s.nodeName === e
            },
            CLASS: function (s, e) {
                return (" " + (s.className || s.getAttribute("class")) + " ").indexOf(e) > -1
            },
            ATTR: function (w, u) {
                var t = u[1],
                    e = f.attrHandle[t] ? f.attrHandle[t](w) : w[t] != null ? w[t] : w.getAttribute(t),
                    x = e + "",
                    v = u[2],
                    s = u[4];
                return e == null ? v === "!=" : v === "=" ? x === s : v === "*=" ? x.indexOf(s) >= 0 : v === "~=" ? (" " + x + " ").indexOf(s) >= 0 : !s ? x && e !== false : v === "!=" ? x != s : v === "^=" ? x.indexOf(s) === 0 : v === "$=" ? x.substr(x.length - s.length) === s : v === "|=" ? x === s || x.substr(0, s.length + 1) === s + "-" : false
            },
            POS: function (v, s, t, w) {
                var e = s[2],
                    u = f.setFilters[e];
                if (u) {
                    return u(v, t, s, w)
                }
            }
        }
    };
    var k = f.match.POS;
    for (var m in f.match) {
        f.match[m] = new RegExp(f.match[m].source + /(?![^\[]*\])(?![^\(]*\))/.source);
        f.leftMatch[m] = new RegExp(/(^(?:.|\r|\n)*?)/.source + f.match[m].source)
    }
    var a = function (s, e) {
            s = Array.prototype.slice.call(s, 0);
            if (e) {
                e.push.apply(e, s);
                return e
            }
            return s
        };
    try {
        Array.prototype.slice.call(document.documentElement.childNodes, 0)
    } catch (l) {
        a = function (v, u) {
            var s = u || [];
            if (d.call(v) === "[object Array]") {
                Array.prototype.push.apply(s, v)
            } else {
                if (typeof v.length === "number") {
                    for (var t = 0, e = v.length; t < e; t++) {
                        s.push(v[t])
                    }
                } else {
                    for (var t = 0; v[t]; t++) {
                        s.push(v[t])
                    }
                }
            }
            return s
        }
    }
    var c;
    if (document.documentElement.compareDocumentPosition) {
        c = function (s, e) {
            if (!s.compareDocumentPosition || !e.compareDocumentPosition) {
                if (s == e) {
                    o = true
                }
                return 0
            }
            var t = s.compareDocumentPosition(e) & 4 ? -1 : s === e ? 0 : 1;
            if (t === 0) {
                o = true
            }
            return t
        }
    } else {
        if ("sourceIndex" in document.documentElement) {
            c = function (s, e) {
                if (!s.sourceIndex || !e.sourceIndex) {
                    if (s == e) {
                        o = true
                    }
                    return 0
                }
                var t = s.sourceIndex - e.sourceIndex;
                if (t === 0) {
                    o = true
                }
                return t
            }
        } else {
            if (document.createRange) {
                c = function (u, s) {
                    if (!u.ownerDocument || !s.ownerDocument) {
                        if (u == s) {
                            o = true
                        }
                        return 0
                    }
                    var t = u.ownerDocument.createRange(),
                        e = s.ownerDocument.createRange();
                    t.setStart(u, 0);
                    t.setEnd(u, 0);
                    e.setStart(s, 0);
                    e.setEnd(s, 0);
                    var v = t.compareBoundaryPoints(Range.START_TO_END, e);
                    if (v === 0) {
                        o = true
                    }
                    return v
                }
            }
        }
    }(function () {
        var s = document.createElement("div"),
            t = "script" + (new Date).getTime();
        s.innerHTML = "<a name='" + t + "'/>";
        var e = document.documentElement;
        e.insertBefore(s, e.firstChild);
        if ( !! document.getElementById(t)) {
            f.find.ID = function (v, w, x) {
                if (typeof w.getElementById !== "undefined" && !x) {
                    var u = w.getElementById(v[1]);
                    return u ? u.id === v[1] || typeof u.getAttributeNode !== "undefined" && u.getAttributeNode("id").nodeValue === v[1] ? [u] : undefined : []
                }
            };
            f.filter.ID = function (w, u) {
                var v = typeof w.getAttributeNode !== "undefined" && w.getAttributeNode("id");
                return w.nodeType === 1 && v && v.nodeValue === u
            }
        }
        e.removeChild(s);
        e = s = null
    })();
    (function () {
        var e = document.createElement("div");
        e.appendChild(document.createComment(""));
        if (e.getElementsByTagName("*").length > 0) {
            f.find.TAG = function (s, w) {
                var v = w.getElementsByTagName(s[1]);
                if (s[1] === "*") {
                    var u = [];
                    for (var t = 0; v[t]; t++) {
                        if (v[t].nodeType === 1) {
                            u.push(v[t])
                        }
                    }
                    v = u
                }
                return v
            }
        }
        e.innerHTML = "<a href='#'></a>";
        if (e.firstChild && typeof e.firstChild.getAttribute !== "undefined" && e.firstChild.getAttribute("href") !== "#") {
            f.attrHandle.href = function (s) {
                return s.getAttribute("href", 2)
            }
        }
        e = null
    })();
    if (document.querySelectorAll) {
        (function () {
            var e = b,
                t = document.createElement("div");
            t.innerHTML = "<p class='TEST'></p>";
            if (t.querySelectorAll && t.querySelectorAll(".TEST").length === 0) {
                return
            }
            b = function (x, w, u, v) {
                w = w || document;
                if (!v && w.nodeType === 9 && !p(w)) {
                    try {
                        return a(w.querySelectorAll(x), u)
                    } catch (y) {}
                }
                return e(x, w, u, v)
            };
            for (var s in e) {
                b[s] = e[s]
            }
            t = null
        })()
    }
    if (document.getElementsByClassName && document.documentElement.getElementsByClassName) {
        (function () {
            var e = document.createElement("div");
            e.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (e.getElementsByClassName("e").length === 0) {
                return
            }
            e.lastChild.className = "e";
            if (e.getElementsByClassName("e").length === 1) {
                return
            }
            f.order.splice(1, 0, "CLASS");
            f.find.CLASS = function (s, t, u) {
                if (typeof t.getElementsByClassName !== "undefined" && !u) {
                    return t.getElementsByClassName(s[1])
                }
            };
            e = null
        })()
    }
    function n(s, x, w, B, y, A) {
        var z = s == "previousSibling" && !A;
        for (var u = 0, t = B.length; u < t; u++) {
            var e = B[u];
            if (e) {
                if (z && e.nodeType === 1) {
                    e.sizcache = w;
                    e.sizset = u
                }
                e = e[s];
                var v = false;
                while (e) {
                    if (e.sizcache === w) {
                        v = B[e.sizset];
                        break
                    }
                    if (e.nodeType === 1 && !A) {
                        e.sizcache = w;
                        e.sizset = u
                    }
                    if (e.nodeName === x) {
                        v = e;
                        break
                    }
                    e = e[s]
                }
                B[u] = v
            }
        }
    }
    function r(s, x, w, B, y, A) {
        var z = s == "previousSibling" && !A;
        for (var u = 0, t = B.length; u < t; u++) {
            var e = B[u];
            if (e) {
                if (z && e.nodeType === 1) {
                    e.sizcache = w;
                    e.sizset = u
                }
                e = e[s];
                var v = false;
                while (e) {
                    if (e.sizcache === w) {
                        v = B[e.sizset];
                        break
                    }
                    if (e.nodeType === 1) {
                        if (!A) {
                            e.sizcache = w;
                            e.sizset = u
                        }
                        if (typeof x !== "string") {
                            if (e === x) {
                                v = true;
                                break
                            }
                        } else {
                            if (b.filter(x, [e]).length > 0) {
                                v = e;
                                break
                            }
                        }
                    }
                    e = e[s]
                }
                B[u] = v
            }
        }
    }
    var h = document.compareDocumentPosition ?
    function (s, e) {
        return s.compareDocumentPosition(e) & 16
    } : function (s, e) {
        return s !== e && (s.contains ? s.contains(e) : true)
    };
    var p = function (e) {
            return e.nodeType === 9 && e.documentElement.nodeName !== "HTML" || !! e.ownerDocument && e.ownerDocument.documentElement.nodeName !== "HTML"
        };
    var g = function (e, y) {
            var u = [],
                v = "",
                w, t = y.nodeType ? [y] : y;
            while ((w = f.match.PSEUDO.exec(e))) {
                v += w[0];
                e = e.replace(f.match.PSEUDO, "")
            }
            e = f.relative[e] ? e + "*" : e;
            for (var x = 0, s = t.length; x < s; x++) {
                b(e, t[x], u)
            }
            return b.filter(v, u)
        };
    window.Sizzle = b
})();
(function (c) {
    var d = Prototype.Selector.extendElements;

    function a(e, f) {
        return d(c(e, f || document))
    }
    function b(f, e) {
        return c.matches(e, [f]).length == 1
    }
    Prototype.Selector.engine = c;
    Prototype.Selector.select = a;
    Prototype.Selector.match = b
})(Sizzle);
window.Sizzle = Prototype._original_property;
delete Prototype._original_property;
var Form = {
    reset: function (a) {
        a = $(a);
        a.reset();
        return a
    },
    serializeElements: function (h, d) {
        if (typeof d != "object") {
            d = {
                hash: !! d
            }
        } else {
            if (Object.isUndefined(d.hash)) {
                d.hash = true
            }
        }
        var e, g, a = false,
            f = d.submit,
            b, c;
        if (d.hash) {
            c = {};
            b = function (i, j, k) {
                if (j in i) {
                    if (!Object.isArray(i[j])) {
                        i[j] = [i[j]]
                    }
                    i[j].push(k)
                } else {
                    i[j] = k
                }
                return i
            }
        } else {
            c = "";
            b = function (i, j, k) {
                return i + (i ? "&" : "") + encodeURIComponent(j) + "=" + encodeURIComponent(k)
            }
        }
        return h.inject(c, function (i, j) {
            if (!j.disabled && j.name) {
                e = j.name;
                g = $(j).getValue();
                if (g != null && j.type != "file" && (j.type != "submit" || (!a && f !== false && (!f || e == f) && (a = true)))) {
                    i = b(i, e, g)
                }
            }
            return i
        })
    }
};
Form.Methods = {
    serialize: function (b, a) {
        return Form.serializeElements(Form.getElements(b), a)
    },
    getElements: function (e) {
        var f = $(e).getElementsByTagName("*"),
            d, a = [],
            c = Form.Element.Serializers;
        for (var b = 0; d = f[b]; b++) {
            a.push(d)
        }
        return a.inject([], function (g, h) {
            if (c[h.tagName.toLowerCase()]) {
                g.push(Element.extend(h))
            }
            return g
        })
    },
    getInputs: function (g, c, d) {
        g = $(g);
        var a = g.getElementsByTagName("input");
        if (!c && !d) {
            return $A(a).map(Element.extend)
        }
        for (var e = 0, h = [], f = a.length; e < f; e++) {
            var b = a[e];
            if ((c && b.type != c) || (d && b.name != d)) {
                continue
            }
            h.push(Element.extend(b))
        }
        return h
    },
    disable: function (a) {
        a = $(a);
        Form.getElements(a).invoke("disable");
        return a
    },
    enable: function (a) {
        a = $(a);
        Form.getElements(a).invoke("enable");
        return a
    },
    findFirstElement: function (b) {
        var c = $(b).getElements().findAll(function (d) {
            return "hidden" != d.type && !d.disabled
        });
        var a = c.findAll(function (d) {
            return d.hasAttribute("tabIndex") && d.tabIndex >= 0
        }).sortBy(function (d) {
            return d.tabIndex
        }).first();
        return a ? a : c.find(function (d) {
            return /^(?:input|select|textarea)$/i.test(d.tagName)
        })
    },
    focusFirstElement: function (b) {
        b = $(b);
        var a = b.findFirstElement();
        if (a) {
            a.activate()
        }
        return b
    },
    request: function (b, a) {
        b = $(b), a = Object.clone(a || {});
        var d = a.parameters,
            c = b.readAttribute("action") || "";
        if (c.blank()) {
            c = window.location.href
        }
        a.parameters = b.serialize(true);
        if (d) {
            if (Object.isString(d)) {
                d = d.toQueryParams()
            }
            Object.extend(a.parameters, d)
        }
        if (b.hasAttribute("method") && !a.method) {
            a.method = b.method
        }
        return new Ajax.Request(c, a)
    }
};
Form.Element = {
    focus: function (a) {
        $(a).focus();
        return a
    },
    select: function (a) {
        $(a).select();
        return a
    }
};

(function () {
    var C = {
        KEY_BACKSPACE: 8,
        KEY_TAB: 9,
        KEY_RETURN: 13,
        KEY_ESC: 27,
        KEY_LEFT: 37,
        KEY_UP: 38,
        KEY_RIGHT: 39,
        KEY_DOWN: 40,
        KEY_DELETE: 46,
        KEY_HOME: 36,
        KEY_END: 35,
        KEY_PAGEUP: 33,
        KEY_PAGEDOWN: 34,
        KEY_INSERT: 45,
        cache: {}
    };
    var f = document.documentElement;
    var D = "onmouseenter" in f && "onmouseleave" in f;
    var a = function (E) {
            return false
        };
    if (window.attachEvent) {
        if (window.addEventListener) {
            a = function (E) {
                return !(E instanceof window.Event)
            }
        } else {
            a = function (E) {
                return true
            }
        }
    }
    var r;

    function A(F, E) {
        return F.which ? (F.which === E + 1) : (F.button === E)
    }
    var o = {
        0: 1,
        1: 4,
        2: 2
    };

    function y(F, E) {
        return F.button === o[E]
    }
    function B(F, E) {
        switch (E) {
        case 0:
            return F.which == 1 && !F.metaKey;
        case 1:
            return F.which == 2 || (F.which == 1 && F.metaKey);
        case 2:
            return F.which == 3;
        default:
            return false
        }
    }
    if (window.attachEvent) {
        if (!window.addEventListener) {
            r = y
        } else {
            r = function (F, E) {
                return a(F) ? y(F, E) : A(F, E)
            }
        }
    } else {
        if (Prototype.Browser.WebKit) {
            r = B
        } else {
            r = A
        }
    }
    function v(E) {
        return r(E, 0)
    }
    function t(E) {
        return r(E, 1)
    }
    function n(E) {
        return r(E, 2)
    }
    function d(G) {
        G = C.extend(G);
        var F = G.target,
            E = G.type,
            H = G.currentTarget;
        if (H && H.tagName) {
            if (E === "load" || E === "error" || (E === "click" && H.tagName.toLowerCase() === "input" && H.type === "radio")) {
                F = H
            }
        }
        if (F.nodeType == Node.TEXT_NODE) {
            F = F.parentNode
        }
        return Element.extend(F)
    }
    function p(F, G) {
        var E = C.element(F);
        if (!G) {
            return E
        }
        while (E) {
            if (Object.isElement(E) && Prototype.Selector.match(E, G)) {
                return Element.extend(E)
            }
            E = E.parentNode
        }
    }
    function s(E) {
        return {
            x: c(E),
            y: b(E)
        }
    }
    function c(G) {
        var F = document.documentElement,
            E = document.body || {
                scrollLeft: 0
            };
        return G.pageX || (G.clientX + (F.scrollLeft || E.scrollLeft) - (F.clientLeft || 0))
    }
    function b(G) {
        var F = document.documentElement,
            E = document.body || {
                scrollTop: 0
            };
        return G.pageY || (G.clientY + (F.scrollTop || E.scrollTop) - (F.clientTop || 0))
    }
    function q(E) {
        C.extend(E);
        E.preventDefault();
        E.stopPropagation();
        E.stopped = true
    }
    C.Methods = {
        isLeftClick: v,
        isMiddleClick: t,
        isRightClick: n,
        element: d,
        findElement: p,
        pointer: s,
        pointerX: c,
        pointerY: b,
        stop: q
    };
    var x = Object.keys(C.Methods).inject({}, function (E, F) {
        E[F] = C.Methods[F].methodize();
        return E
    });
    if (window.attachEvent) {
        function i(F) {
            var E;
            switch (F.type) {
            case "mouseover":
            case "mouseenter":
                E = F.fromElement;
                break;
            case "mouseout":
            case "mouseleave":
                E = F.toElement;
                break;
            default:
                return null
            }
            return Element.extend(E)
        }
        var u = {
            stopPropagation: function () {
                this.cancelBubble = true
            },
            preventDefault: function () {
                this.returnValue = false
            },
            inspect: function () {
                return "[object Event]"
            }
        };
        C.extend = function (F, E) {
            if (!F) {
                return false
            }
            if (!a(F)) {
                return F
            }
            if (F._extendedByPrototype) {
                return F
            }
            F._extendedByPrototype = Prototype.emptyFunction;
            var G = C.pointer(F);
            Object.extend(F, {
                target: F.srcElement || E,
                relatedTarget: i(F),
                pageX: G.x,
                pageY: G.y
            });
            Object.extend(F, x);
            Object.extend(F, u);
            return F
        }
    } else {
        C.extend = Prototype.K
    }
    if (window.addEventListener) {
        C.prototype = window.Event.prototype || document.createEvent("HTMLEvents").__proto__;
        Object.extend(C.prototype, x)
    }
    function m(I, H, J) {
        var G = Element.retrieve(I, "prototype_event_registry");
        if (Object.isUndefined(G)) {
            e.push(I);
            G = Element.retrieve(I, "prototype_event_registry", $H())
        }
        var E = G.get(H);
        if (Object.isUndefined(E)) {
            E = [];
            G.set(H, E)
        }
        if (E.pluck("handler").include(J)) {
            return false
        }
        var F;
        if (H.include(":")) {
            F = function (K) {
                if (Object.isUndefined(K.eventName)) {
                    return false
                }
                if (K.eventName !== H) {
                    return false
                }
                C.extend(K, I);
                J.call(I, K)
            }
        } else {
            if (!D && (H === "mouseenter" || H === "mouseleave")) {
                if (H === "mouseenter" || H === "mouseleave") {
                    F = function (L) {
                        C.extend(L, I);
                        var K = L.relatedTarget;
                        while (K && K !== I) {
                            try {
                                K = K.parentNode
                            } catch (M) {
                                K = I
                            }
                        }
                        if (K === I) {
                            return
                        }
                        J.call(I, L)
                    }
                }
            } else {
                F = function (K) {
                    C.extend(K, I);
                    J.call(I, K)
                }
            }
        }
        F.handler = J;
        E.push(F);
        return F
    }
    function h() {
        for (var E = 0, F = e.length; E < F; E++) {
            C.stopObserving(e[E]);
            e[E] = null
        }
    }
    var e = [];
    if (Prototype.Browser.IE) {
        window.attachEvent("onunload", h)
    }
    if (Prototype.Browser.WebKit) {
        window.addEventListener("unload", Prototype.emptyFunction, false)
    }
    var l = Prototype.K,
        g = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        };
    if (!D) {
        l = function (E) {
            return (g[E] || E)
        }
    }
    function w(H, G, I) {
        H = $(H);
        var F = m(H, G, I);
        if (!F) {
            return H
        }
        if (G.include(":")) {
            if (H.addEventListener) {
                H.addEventListener("dataavailable", F, false)
            } else {
                H.attachEvent("ondataavailable", F);
                H.attachEvent("onlosecapture", F)
            }
        } else {
            var E = l(G);
            if (H.addEventListener) {
                H.addEventListener(E, F, false)
            } else {
                H.attachEvent("on" + E, F)
            }
        }
        return H
    }
    function k(K, H, L) {
        K = $(K);
        var G = Element.retrieve(K, "prototype_event_registry");
        if (!G) {
            return K
        }
        if (!H) {
            G.each(function (N) {
                var M = N.key;
                k(K, M)
            });
            return K
        }
        var I = G.get(H);
        if (!I) {
            return K
        }
        if (!L) {
            I.each(function (M) {
                k(K, H, M.handler)
            });
            return K
        }
        var J = I.length,
            F;
        while (J--) {
            if (I[J].handler === L) {
                F = I[J];
                break
            }
        }
        if (!F) {
            return K
        }
        if (H.include(":")) {
            if (K.removeEventListener) {
                K.removeEventListener("dataavailable", F, false)
            } else {
                K.detachEvent("ondataavailable", F);
                K.detachEvent("onlosecapture", F)
            }
        } else {
            var E = l(H);
            if (K.removeEventListener) {
                K.removeEventListener(E, F, false)
            } else {
                K.detachEvent("on" + E, F)
            }
        }
        G.set(H, I.without(F));
        return K
    }
    function z(H, G, F, E) {
        H = $(H);
        if (Object.isUndefined(E)) {
            E = true
        }
        if (H == document && document.createEvent && !H.dispatchEvent) {
            H = document.documentElement
        }
        var I;
        if (document.createEvent) {
            I = document.createEvent("HTMLEvents");
            I.initEvent("dataavailable", E, true)
        } else {
            I = document.createEventObject();
            I.eventType = E ? "ondataavailable" : "onlosecapture"
        }
        I.eventName = G;
        I.memo = F || {};
        if (document.createEvent) {
            H.dispatchEvent(I)
        } else {
            H.fireEvent(I.eventType, I)
        }
        return C.extend(I)
    }
    C.Handler = Class.create({
        initialize: function (G, F, E, H) {
            this.element = $(G);
            this.eventName = F;
            this.selector = E;
            this.callback = H;
            this.handler = this.handleEvent.bind(this)
        },
        start: function () {
            C.observe(this.element, this.eventName, this.handler);
            return this
        },
        stop: function () {
            C.stopObserving(this.element, this.eventName, this.handler);
            return this
        },
        handleEvent: function (F) {
            var E = C.findElement(F, this.selector);
            if (E) {
                this.callback.call(this.element, F, E)
            }
        }
    });

    function j(G, F, E, H) {
        G = $(G);
        if (Object.isFunction(E) && Object.isUndefined(H)) {
            H = E, E = null
        }
        return new C.Handler(G, F, E, H).start()
    }
    Object.extend(C, C.Methods);
    Object.extend(C, {
        fire: z,
        observe: w,
        stopObserving: k,
        on: j
    });
    Element.addMethods({
        fire: z,
        observe: w,
        stopObserving: k,
        on: j
    });
    Object.extend(document, {
        fire: z.methodize(),
        observe: w.methodize(),
        stopObserving: k.methodize(),
        on: j.methodize(),
        loaded: false
    });
    if (window.Event) {
        Object.extend(window.Event, C)
    } else {
        window.Event = C
    }
})();
(function () {
    var d;

    function a() {
        if (document.loaded) {
            return
        }
        if (d) {
            window.clearTimeout(d)
        }
        document.loaded = true;
        document.fire("dom:loaded")
    }
    function c() {
        if (document.readyState === "complete") {
            document.stopObserving("readystatechange", c);
            a()
        }
    }
    function b() {
        try {
            document.documentElement.doScroll("left")
        } catch (f) {
            d = b.defer();
            return
        }
        a()
    }
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", a, false)
    } else {
        document.observe("readystatechange", c);
        if (window == top) {
            d = b.defer()
        }
    }
    Event.observe(window, "load", a)
})();



/* extra */

window.hasOwnProperty = Object.prototype.hasOwnProperty;
var PL_STATIC = {
	country: 'us',
	language:'en',
	non_english:0, 
	translation_debug:0, 
	image_root: '#', 
	web_root: '', 
	version: '201408151345', 
};

/* ie? */
var ieV = parseInt(navigator.userAgent.substring(navigator.userAgent.indexOf("MSIE")+5));
Prototype.Browser.IE6 = (Prototype.Browser.IE && ieV == 6);
Prototype.Browser.IE7 = (Prototype.Browser.IE && ieV == 7);
Prototype.Browser.IE8 = (Prototype.Browser.IE && ieV == 8);
Prototype.Browser.IE9 = (Prototype.Browser.IE && ieV == 9);
Prototype.Browser.IE10 = (Prototype.Browser.IE && ieV == 1 || ieV == 10);

/* ff? */
Prototype.Browser.FF2 = ( navigator.userAgent.indexOf( "Firefox/2" ) != -1 && navigator.userAgent.match( /Firefox\/2\d+/ ).length == 0 );
Prototype.Browser.FF3_5 = ( navigator.userAgent.indexOf( "Firefox/3.5" ) != -1 );
Prototype.Browser.FF3_6 = ( navigator.userAgent.indexOf( "Firefox/3.6" ) != -1 );



/* general */

var Localization = function () {
        this.test_mode = false;
        this.language = null;
        this.non_english = null;
        this.init = function () {
            if (typeof PL_STATIC != "undefined") {
                localize.language = localize.returnLang();
                localize.non_english = localize.nonEnglish();
                localize.test_mode = localize.inTestMode()
            }
        };
        this.returnLang = function () {
            if (typeof PL_STATIC.language != "undefined") {
                return PL_STATIC.language
            } else {
                return null
            }
        };
        this.nonEnglish = function () {
            if (typeof PL_STATIC.non_english != "undefined" && PL_STATIC.non_english) {
                return true
            } else {
                return false
            }
        };
        this.inTestMode = function () {
            if (typeof PL_STATIC.translation_debug != "undefined" && PL_STATIC.translation_debug && localize.non_english && localize.language) {
                return true
            } else {
                return false
            }
        };
        this.dictionary = function () {
            if (!localize.language) {
                return null
            }
            try {
                return eval(localize.language + "_dictionary")
            } catch (e) {
                return null
            }
        };
        this.testMode = function (str) {
            return (str + " (" + localize.language + ")")
        };
        this.translate = function (string, args) {
            if (!string || typeof string != "string") {
                return null
            }
            var translation, start_space = string.charAt(0) == " " ? true : false,
                end_space = string.charAt(string.length - 1) == " " ? true : false;
            string = localize.strip_spaces(string);
            translation = localize.dictionary() && localize.dictionary()[string] ? localize.dictionary()[string] : string;
            if (translation && args && args.variables) {
                translation = localize.var_replace(translation, args.variables)
            }
            if (start_space) {
                translation = " " + translation
            }
            if (end_space) {
                translation = translation + " "
            }
            if (localize.test_mode) {
                translation = localize.testMode(translation)
            }
            return translation
        };
        this.strip_spaces = function (string) {
            if (string.charAt(0) == " ") {
                string = string.slice(1, string.length - 1)
            }
            if (string.charAt(string.length - 1) == " ") {
                string = string.slice(0, string.length - 2)
            }
            return string
        };
        this.var_replace = function (string, vars) {
            var variable, counter, subString, split = string.split("#{"),
                length = split.length;
            for (counter = 0; counter < length; counter++) {
                subString = split[counter];
                if (subString) {
                    subString = subString.split("}")[0];
                    variable = (vars.hasOwnProperty(subString) ? vars[subString].toString() : null);
                    if (variable) {
                        variable = localize.translate(variable);
                        string = string.replace("#{" + subString + "}", variable)
                    }
                }
            }
            return string
        }
    };
var localize = new Localization();
localize.init();
var local = localize;
local.t = local.translate;

var s_account = "#";
var s = s_gi(s_account);
s.debugTracking = false;
s.trackDownloadLinks = false;
s.trackExternalLinks = false;
s.trackInlineStats = true;
s.linkDownloadFileTypes = "exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";
s.linkInternalFilters = "javascript:";
s.linkLeaveQueryString = false;
s.linkTrackVars = "None";
s.linkTrackEvents = "None";
s.usePlugins = true;

function s_doPlugins(a) {}
s.doPlugins = s_doPlugins;
var s_code = "",
    s_objectID;

function s_gi(o, p, F) {
    var r = "s.version='H.27.2';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(s.rep(m,\"\\\\\",\"\\\\\\\\\"),\"\\n\",\"\\\\n\"),\"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){return o};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',f=\"+~!*()'\",i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComponent(x);for(i=0;i<f.length;i++) {n=f.substring(i,i+1);if(x.indexOf(n)>=0)x=s.rep(x,n,\"%\"+n.charCodeAt(0).toString(16).toUpperCase())}}else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x){var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Function('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unescape(x)}return y');return tcf(x)}else return unescape(x)}return y};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.mpc=function(m,a){var s=this,c,l,n,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(v&&v=='prerender'){if(!s.mpq){s.mpq=new Array;l=s.sp('webkitvisibilitychange,visibilitychange',',');for(n=0;n<l.length;n++){s.d.addEventListener(l[n],new Function('var s=s_c_il['+s._in+'],c,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(s.mpq&&v==\"visible\"){while(s.mpq.length>0){c=s.mpq.shift();s[c.m].apply(s,c.a)}s.mpq=0}'),false)}}c=new Object;c.m=m;c.a=a;s.mpq.push(c);return 1}return 0};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=function(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+s._in+'_'+un,im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.version+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}if(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.alt=\"\";im.s_l=0;im.onload=im.onerror=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.bcr();s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if(s.useForcedLinkTracking||s.bcf){if(!s.forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].bcr()',s.forcedLinkTrackingTimeout);}else if((s.lnk||s.eo)&&(!ta||ta=='_self'||ta=='_top'||ta=='_parent'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v)if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv||fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='supplementalDataID')q='sdid';else if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='marketingCloudVisitorID')q='mid';else if(k=='analyticsVisitorID')q='aid';else if(k=='audienceManagerLocationHint')q='aamlh';else if(k=='audienceManagerBlob')q='aamb';else if(k=='pageURL'){q='g';if(v.length>255){s.pageURLRest=v.substring(255);v=v.substring(0,255);}}else if(k=='pageURLRest')q='-g';else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?'),hi=h.indexOf('#');if(qi>=0){if(hi>=0&&hi<qi)qi=hi;}else qi=hi;h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.indexOf('#')!=0&&h.indexOf('about:')!=0&&h.indexOf('javascript:')!=0&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=this;s.t();s.lnk=0;if(b)return this[b](e);return true');s.bcr=function(){var s=this;if(s.bct&&s.bce)s.bct.dispatchEvent(s.bce);if(s.bcf){if(typeof(s.bcf)=='function')s.bcf();else if(s.bct&&s.bct.href)s.d.location=s.bct.href}s.bct=s.bce=s.bcf=0};s.bc=new Function('e','if(e&&e.s_fe)return;var s=s_c_il['+s._in+'],f,tcf,t,n,nrs,a,h;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;if(!s.bbc)s.useForcedLinkTracking=0;else if(!s.useForcedLinkTracking){s.b.removeEventListener(\"click\",s.bc,true);s.bbc=s.useForcedLinkTracking=0;return}else s.b.removeEventListener(\"click\",s.bc,false);s.eo=e.srcElement?e.srcElement:e.target;nrs=s.nrs;s.t();s.eo=0;if(s.nrs>nrs&&s.useForcedLinkTracking&&e.target){a=e.target;while(a&&a!=s.b&&a.tagName.toUpperCase()!=\"A\"&&a.tagName.toUpperCase()!=\"AREA\")a=a.parentNode;if(a){h=a.href;if(h.indexOf(\"#\")==0||h.indexOf(\"about:\")==0||h.indexOf(\"javascript:\")==0)h=0;t=a.target;if(e.target.dispatchEvent&&h&&(!t||t==\"_self\"||t==\"_top\"||t==\"_parent\"||(s.wd.name&&t==s.wd.name))){tcf=new Function(\"s\",\"var x;try{n=s.d.createEvent(\\\\\"MouseEvents\\\\\")}catch(x){n=new MouseEvent}return n\");n=tcf(s);if(n){tcf=new Function(\"n\",\"e\",\"var x;try{n.initMouseEvent(\\\\\"click\\\\\",e.bubbles,e.cancelable,e.view,e.detail,e.screenX,e.screenY,e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget)}catch(x){n=0}return n\");n=tcf(n,e);if(n){n.s_fe=1;e.stopPropagation();if (e.stopImmediatePropagation) {e.stopImmediatePropagation();}e.preventDefault();s.bct=e.target;s.bce=n}}}}}');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener){if(s.n&&((s.n.userAgent.indexOf('WebKit')>=0&&s.d.createEvent)||(s.n.userAgent.indexOf('Firefox/2')>=0&&s.wd.MouseEvent))){s.bbc=1;s.useForcedLinkTracking=1;s.b.addEventListener('click',s.bc,true)}s.b.addEventListener('click',s.bc,false)}else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s=this;if(s.un&&s.mpc('sa',arguments))return;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(s.mpc(\"m_a\",arguments))return;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo,onlySet){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!onlySet&&!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s._waitingForMarketingCloudVisitorID = false;s._doneWaitingForMarketingCloudVisitorID = false;s._marketingCloudVisitorIDCallback=function(marketingCloudVisitorID) {var s=this;s.marketingCloudVisitorID = marketingCloudVisitorID;s._doneWaitingForMarketingCloudVisitorID = true;s._callbackWhenReadyToTrackCheck();};s._waitingForAnalyticsVisitorID = false;s._doneWaitingForAnalyticsVisitorID = false;s._analyticsVisitorIDCallback=function(analyticsVisitorID) {var s=this;s.analyticsVisitorID = analyticsVisitorID;s._doneWaitingForAnalyticsVisitorID = true;s._callbackWhenReadyToTrackCheck();};s._waitingForAudienceManagerLocationHint = false;s._doneWaitingForAudienceManagerLocationHint = false;s._audienceManagerLocationHintCallback=function(audienceManagerLocationHint) {var s=this;s.audienceManagerLocationHint = audienceManagerLocationHint;s._doneWaitingForAudienceManagerLocationHint = true;s._callbackWhenReadyToTrackCheck();};s._waitingForAudienceManagerBlob = false;s._doneWaitingForAudienceManagerBlob = false;s._audienceManagerBlobCallback=function(audienceManagerBlob) {var s=this;s.audienceManagerBlob = audienceManagerBlob;s._doneWaitingForAudienceManagerBlob = true;s._callbackWhenReadyToTrackCheck();};s.isReadyToTrack=function() {var s=this,readyToTrack = true,visitor = s.visitor;if ((visitor) && (visitor.isAllowed())) {if ((!s._waitingForMarketingCloudVisitorID) && (!s.marketingCloudVisitorID) && (visitor.getMarketingCloudVisitorID)) {s._waitingForMarketingCloudVisitorID = true;s.marketingCloudVisitorID = visitor.getMarketingCloudVisitorID([s,s._marketingCloudVisitorIDCallback]);if (s.marketingCloudVisitorID) {s._doneWaitingForMarketingCloudVisitorID = true;}}if ((!s._waitingForAnalyticsVisitorID) && (!s.analyticsVisitorID) && (visitor.getAnalyticsVisitorID)) {s._waitingForAnalyticsVisitorID = true;s.analyticsVisitorID = visitor.getAnalyticsVisitorID([s,s._analyticsVisitorIDCallback]);if (s.analyticsVisitorID) {s._doneWaitingForAnalyticsVisitorID = true;}}if ((!s._waitingForAudienceManagerLocationHint) && (!s.audienceManagerLocationHint) && (visitor.getAudienceManagerLocationHint)) {s._waitingForAudienceManagerLocationHint = true;s.audienceManagerLocationHint = visitor.getAudienceManagerLocationHint([s,s._audienceManagerLocationHintCallback]);if (s.audienceManagerLocationHint) {s._doneWaitingForAudienceManagerLocationHint = true;}}if ((!s._waitingForAudienceManagerBlob) && (!s.audienceManagerBlob) && (visitor.getAudienceManagerBlob)) {s._waitingForAudienceManagerBlob = true;s.audienceManagerBlob = visitor.getAudienceManagerBlob([s,s._audienceManagerBlobCallback]);if (s.audienceManagerBlob) {s._doneWaitingForAudienceManagerBlob = true;}}if (((s._waitingForMarketingCloudVisitorID)     && (!s._doneWaitingForMarketingCloudVisitorID)     && (!s.marketingCloudVisitorID)) ||((s._waitingForAnalyticsVisitorID)          && (!s._doneWaitingForAnalyticsVisitorID)          && (!s.analyticsVisitorID)) ||((s._waitingForAudienceManagerLocationHint) && (!s._doneWaitingForAudienceManagerLocationHint) && (!s.audienceManagerLocationHint)) ||((s._waitingForAudienceManagerBlob)         && (!s._doneWaitingForAudienceManagerBlob)         && (!s.audienceManagerBlob))) {readyToTrack = false;}}return readyToTrack;};s._callbackWhenReadyToTrackQueue = null;s._callbackWhenReadyToTrackInterval = 0;s.callbackWhenReadyToTrack=function(callbackThis,callback,args) {var s=this,callbackInfo;callbackInfo = {};callbackInfo.callbackThis = callbackThis;callbackInfo.callback     = callback;callbackInfo.args         = args;if (s._callbackWhenReadyToTrackQueue == null) {s._callbackWhenReadyToTrackQueue = [];}s._callbackWhenReadyToTrackQueue.push(callbackInfo);if (s._callbackWhenReadyToTrackInterval == 0) {s._callbackWhenReadyToTrackInterval = setInterval(s._callbackWhenReadyToTrackCheck,100);}};s._callbackWhenReadyToTrackCheck=new Function('var s=s_c_il['+s._in+'],callbackNum,callbackInfo;if (s.isReadyToTrack()) {if (s._callbackWhenReadyToTrackInterval) {clearInterval(s._callbackWhenReadyToTrackInterval);s._callbackWhenReadyToTrackInterval = 0;}if (s._callbackWhenReadyToTrackQueue != null) {while (s._callbackWhenReadyToTrackQueue.length > 0) {callbackInfo = s._callbackWhenReadyToTrackQueue.shift();callbackInfo.callback.apply(callbackInfo.callbackThis,callbackInfo.args);}}}');s._handleNotReadyToTrack=function(variableOverrides) {var s=this,args,varKey,variableOverridesCopy = null,setVariables = null;if (!s.isReadyToTrack()) {args = [];if (variableOverrides != null) {variableOverridesCopy = {};for (varKey in variableOverrides) {variableOverridesCopy[varKey] = variableOverrides[varKey];}}setVariables = {};s.vob(setVariables,true);args.push(variableOverridesCopy);args.push(setVariables);s.callbackWhenReadyToTrack(s,s.track,args);return true;}return false;};s.gfid=function(){var s=this,d='0123456789ABCDEF',k='s_fid',fid=s.c_r(k),h='',l='',i,j,m=8,n=4,e=new Date,y;if(!fid||fid.indexOf('-')<0){for(i=0;i<16;i++){j=Math.floor(Math.random()*m);h+=d.substring(j,j+1);j=Math.floor(Math.random()*n);l+=d.substring(j,j+1);m=n=16}fid=h+'-'+l;}y=e.getYear();e.setYear(y+2+(y<1900?1900:0));if(!s.c_w(k,fid,e))fid=0;return fid};s.track=s.t=function(vo,setVariables){var s=this,notReadyToTrack,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;if ((!s.supplementalDataID) && (s.visitor) && (s.visitor.getSupplementalDataID)) {s.supplementalDataID = s.visitor.getSupplementalDataID(\"AppMeasurement:\" + s._in,(s.expectSupplementalData ? false : true));}if(s.mpc('t',arguments))return;s.gl(s.vl_g);s.uns();s.m_ll();notReadyToTrack = s._handleNotReadyToTrack(vo);if (!notReadyToTrack) {if (setVariables) {s.voa(setVariables);}if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next){j='1.7';if(a.reduce){j='1.8';if(j.trim){j='1.8.1';if(Date.parse){j='1.8.2';if(Object.create)j='1.8.5'}}}}}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if(!s.analyticsVisitorID&&!s.marketingCloudVisitorID)s.fid=s.gfid();if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);if(!s.abort){var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');s.pev2=(l?s.ape(l):'')}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(o.dataset&&o.dataset.sObjectId){s.wd.s_objectID=o.dataset.sObjectId;}else if(o.getAttribute&&o.getAttribute('data-s-object-id')){s.wd.s_objectID=o.getAttribute('data-s-object-id');}else if(s.useForcedLinkTracking){s.wd.s_objectID='';oc=o.onclick?''+o.onclick:'';if(oc){var ocb=oc.indexOf('s_objectID'),oce,ocq,ocx;if(ocb>=0){ocb+=10;while(ocb<oc.length&&(\"= \\t\\r\\n\").indexOf(oc.charAt(ocb))>=0)ocb++;if(ocb<oc.length){oce=ocb;ocq=ocx=0;while(oce<oc.length&&(oc.charAt(oce)!=';'||ocq)){if(ocq){if(oc.charAt(oce)==ocq&&!ocx)ocq=0;else if(oc.charAt(oce)==\"\\\\\")ocx=!ocx;else ocx=0;}else{ocq=oc.charAt(oce);if(ocq!='\"'&&ocq!=\"'\")ocq=0}oce++;}oc=oc.substring(ocb,oce);if(oc){o.s_soid=new Function('s','var e;try{s.wd.s_objectID='+oc+'}catch(e){}');o.s_soid(s)}}}}}if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}}else s.dl(vo);if(vo)s.voa(vb,1);}s.abort=0;s.supplementalDataID=s.pageURLRest=s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo,f){var s=this;s.lnk=o;s.linkType=t;s.linkName=n;if(f){s.bct=o;s.bcf=f}s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='supplementalDataID,timestamp,dynamicVariablePrefix,visitorID,marketingCloudVisitorID,analyticsVisitorID,audienceManagerLocationHint,fid,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,deleteLightProfiles,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,audienceManagerBlob,linkName,linkType';var n;for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,pageURLRest,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){return o};s.wd.s_gs=function(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
        A = window,
        g = A.s_c_il,
        b = navigator,
        D = b.userAgent,
        B = b.appVersion,
        q = B.indexOf("MSIE "),
        f = D.indexOf("Netscape6/"),
        z, k, h, t, E;
    if (o) {
        o = o.toLowerCase();
        if (g) {
            for (h = 0; h < 2; h++) {
                for (k = 0; k < g.length; k++) {
                    E = g[k];
                    t = E._c;
                    if ((!t || t == "s_c" || (h > 0 && t == "s_l")) && (E.oun == o || (E.fs && E.sa && E.fs(E.oun, o)))) {
                        if (E.sa) {
                            E.sa(o)
                        }
                        if (t == "s_c") {
                            return E
                        }
                    } else {
                        E = 0
                    }
                }
            }
        }
    }
    A.s_an = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    A.s_sp = new Function("x", "d", "var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.substring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
    A.s_jn = new Function("a", "d", "var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
    A.s_rep = new Function("x", "o", "n", "return s_jn(s_sp(x,o),n)");
    A.s_d = new Function("x", "var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn(x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
    A.s_fe = new Function("c", "return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
    A.s_fa = new Function("f", "var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':a");
    A.s_ft = new Function("c", "c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){if(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
    r = s_d(r);
    if (q > 0) {
        z = parseInt(k = B.substring(q + 5));
        if (z > 3) {
            z = parseFloat(k)
        }
    } else {
        if (f > 0) {
            z = parseFloat(D.substring(f + 10))
        } else {
            z = parseFloat(B)
        }
    }
    if (z < 5 || B.indexOf("Opera") >= 0 || D.indexOf("Opera") >= 0) {
        r = s_ft(r)
    }
    if (!E) {
        E = new Object;
        if (!A.s_c_in) {
            A.s_c_il = new Array;
            A.s_c_in = 0
        }
        E._il = A.s_c_il;
        E._in = A.s_c_in;
        E._il[E._in] = E;
        A.s_c_in++
    }
    E._c = "s_c";
    (new Function("s", "un", "pg", "ss", r))(E, o, p, F);
    return E
}

function EventManagerBase() {
    this.EVENTS = {}
}
EventManagerBase.prototype = {
    constructor: EventManagerBase,
    observe: function (b, a) {
        if (!this.EVENTS[b]) {
            this.EVENTS[b] = {
                listeners: [],
                one_time_listeners: []
            }
        }
        if (this.EVENTS[b].listeners.indexOf(a) == -1) {
            this.EVENTS[b].listeners.push(a)
        }
    },
    observe_once: function (b, a) {
        if (!this.EVENTS[b]) {
            this.EVENTS[b] = {
                listeners: [],
                one_time_listeners: []
            }
        }
        if (this.EVENTS[b].one_time_listeners.indexOf(a) == -1) {
            this.EVENTS[b].one_time_listeners.push(a)
        }
    },
    stop_observing: function (c, b) {
        if (this.EVENTS[c]) {
            var a = this.EVENTS[c].listeners.indexOf(b);
            if (a > -1) {
                this.EVENTS[c].listeners.splice(a, 1)
            } else {
                return false
            }
            return true
        } else {
            return false
        }
    },
    fire: function (f, g, h) {
        if (PL_STATIC && PL_STATIC.pl_env && PL_STATIC.pl_env == "dev") {
            console.log("Firing: " + f);
            if (PL_STATIC.pl_test_mode) {
                if (!this.eventStack) {
                    this.eventStack = {}
                }
                if (!this.eventStack[f]) {
                    this.eventStack[f] = []
                }
                this.eventStack[f].push({
                    ev: f,
                    data: g,
                    target: h
                });
                if (this.eventListeners && this.eventListeners[f]) {
                    this.eventListeners[f].map(function (k) {
                        if (!k.fulfilled) {
                            k.fulfilled = true;
                            k.data = g;
                            k.target = h
                        }
                    })
                }
            }
        }
        window[f] = true;
        if (typeof g == "undefined") {
            g = {}
        }
        if (this.EVENTS[f]) {
            var c = this.EVENTS[f].listeners;
            for (var a = 0; a < c.length; a++) {
                this._single_fire(c[a], g, h)
            }
            for (var b; b = this.EVENTS[f].one_time_listeners.pop();) {
                this._single_fire(b, g, h)
            }
        }
    },
    _single_fire: function (a, c, f) {
        try {
            a(c, f)
        } catch (b) {
            console.dir(b)
        }
    }
};
if (PL_STATIC && PL_STATIC.pl_env && PL_STATIC.pl_env == "dev" && PL_STATIC.pl_test_mode) {
    EventManagerBase.prototype.eventStack = {};
    EventManagerBase.prototype.findEventInStack = function (a) {
        if (this.eventStack[a]) {
            return this.eventStack[a].pop()
        } else {
            return null
        }
    };
    EventManagerBase.prototype.clearEventStack = function (a) {
        if (this.eventStack[a]) {
            this.eventStack[a] = []
        }
    };
    EventManagerBase.prototype.eventListeners = {};
    EventManagerBase.prototype.addEventListener = function (a) {
        if (!this.eventListeners[a]) {
            this.eventListeners[a] = []
        }
        var b = {
            id: (new Date().getTime() + Math.random().toString().substr(2, 3)),
            fulfilled: false
        };
        this.eventListeners[a].push(b);
        return b.id
    };
    EventManagerBase.prototype.acceptEventOrAddEventListener = function (b) {
        if (!this.eventListeners[b]) {
            this.eventListeners[b] = []
        }
        var a = this.findEventInStack(b);
        var c = {
            id: (new Date().getTime() + Math.random().toString().substr(2, 3)),
            fulfilled: false
        };
        if (a) {
            c.fulfilled = true;
            c.data = a.data;
            c.target = a.target
        }
        this.eventListeners[b].push(c);
        return c.id
    };
    EventManagerBase.prototype.getEventListener = function (f, b) {
        try {
            var a = null;
            if (this.eventListeners[b]) {
                a = this.eventListeners[b].find(function (g) {
                    if (g.id == f) {
                        return true
                    } else {
                        return false
                    }
                })
            }
            return a
        } catch (c) {
            console.error(c)
        }
    }
}
var EventManager = new EventManagerBase();
var plyfeLoader = function () {
        var b = false;
        var a = {
            p1: [],
            p2: [],
            p3: [],
            p4: [],
            p5: [],
            p6: [],
            p7: [],
            p8: [],
            p9: [],
            p10: [],
            user: []
        };
        var c = function () {
                var f;
                for (f = 1; f <= 10; f++) {
                    a["p" + f].each(function (h) {
                        try {
                            h()
                        } catch (g) {
                            if (typeof window.PL_STATIC != "undefined" && PL_STATIC.pl_env == "dev") {
                                console.dir(g.message);
                                console.log(h)
                            }
                        }
                    })
                }
                b = true;
                a.user.each(function (g) {
                    g()
                })
            };
        return {
            waitForDOM: function () {
                if (Prototype.Browser.IE) {
                    if (!$("plyfe-body")) {
                        setTimeout("plyfeLoader.waitForDOM();", 100)
                    } else {
                        c()
                    }
                } else {
                    document.observe("dom:loaded", c)
                }
            },
            callLoaded: function (f) {
                if (b) {
                    f()
                } else {
                    a.user.push(f)
                }
            },
            register: function (g, f) {
                if (b) {
                    g()
                }
                if (f > 10 || f < 1) {
                    return 0
                }
                a["p" + f].push(g);
                return 1
            },
            register_injection: function (f, g) {
                return plyfeLoader.register(function () {
                    setTimeout(function () {
                        PL_XSS.swift_injection(f)
                    }, 1)
                }, g)
            }
        }
    }();
plyfeLoader.waitForDOM();
PLW_COOKIE = "pl2-b";
PLW_INFO_COOKIE = "pl2-b_info";
DEFAULT_USER = "default_user";


function TT_cleanEntities(f) {
    var c = {
        160: "nbsp",
        161: "iexcl",
        164: "curren",
        162: "cent",
        163: "pound",
        165: "yen",
        166: "brvbar",
        167: "sect",
        168: "uml",
        169: "copy",
        170: "ordf",
        171: "laquo",
        172: "not",
        173: "shy",
        174: "reg",
        8482: "trade",
        175: "macr",
        176: "deg",
        177: "plusmn",
        178: "sup2",
        179: "sup3",
        180: "acute",
        181: "micro",
        182: "para",
        183: "middot",
        184: "cedil",
        185: "sup1",
        186: "ordm",
        187: "raquo",
        188: "frac14",
        189: "frac12",
        190: "frac34",
        191: "iquest",
        215: "times",
        247: "divide",
        192: "Agrave",
        193: "Aacute",
        194: "Acirc",
        195: "Atilde",
        196: "Auml",
        197: "Aring",
        198: "AElig",
        199: "Ccedil",
        200: "Egrave",
        201: "Eacute",
        202: "Ecirc",
        203: "Euml",
        204: "Igrave",
        205: "Iacute",
        206: "Icirc",
        207: "Iuml",
        208: "ETH",
        209: "Ntilde",
        210: "Ograve",
        211: "Oacute",
        212: "Ocirc",
        213: "Otilde",
        214: "Ouml",
        216: "Oslash",
        217: "Ugrave",
        218: "Uacute",
        219: "Ucirc",
        220: "Uuml",
        221: "Yacute",
        222: "THORN",
        223: "szlig",
        224: "agrave",
        225: "aacute",
        226: "acirc",
        227: "atilde",
        228: "auml",
        229: "aring",
        230: "aelig",
        231: "ccedil",
        232: "egrave",
        233: "eacute",
        234: "ecirc",
        235: "euml",
        236: "igrave",
        237: "iacute",
        238: "icirc",
        239: "iuml",
        240: "eth",
        241: "ntilde",
        242: "ograve",
        243: "oacute",
        244: "ocirc",
        245: "otilde",
        246: "ouml",
        248: "oslash",
        249: "ugrave",
        250: "uacute",
        251: "ucirc",
        252: "uuml",
        253: "yacute",
        254: "thorn",
        255: "yuml",
        338: "OElig",
        339: "oelig",
        352: "Scaron",
        353: "scaron",
        376: "Yuml",
        710: "circ",
        732: "tilde",
        8194: "ensp",
        8195: "emsp",
        8201: "thinsp",
        8204: "zwnj",
        8205: "zwj",
        8206: "lrm",
        8207: "rlm",
        8211: "ndash",
        8212: "mdash",
        8216: "lsquo",
        8217: "rsquo",
        8218: "sbquo",
        8220: "ldquo",
        8221: "rdquo",
        8222: "bdquo",
        8224: "dagger",
        8225: "Dagger",
        8230: "hellip",
        8240: "permil",
        8249: "lsaquo",
        8250: "rsaquo",
        8364: "euro"
    };
    var b = f.split("");
    var g = "";
    for (i = 0; i < b.length; i++) {
        var a = b[i].charCodeAt(0);
        if (c[a]) {
            g += "&" + c[a] + ";"
        } else {
            if (a > 127) {
                g += "&#" + a + ";"
            } else {
                g += b[i]
            }
        }
    }
    return g
}
var effect_callbacks = {};
var PL_Effect = {
    OpenMenu: function (c, f, b) {
        if (!b) {
            b = {}
        }
        b.top = (objExists(b.top) ? b.top : 0);
        b.left = (objExists(b.left) ? b.left : 0);
        var g = $(c);
        var a = g.positionedOffset();
        var c = {
            el: g,
            offSetTop: Number(a[1]) + Number(g.getHeight()),
            offSetLeft: Number(a[0])
        };
        $(c.el).insert(f);
        $(f).setStyle({
            top: c.offSetTop + b.top + "px",
            left: c.offSetLeft + b.left + "px",
            position: "absolute"
        }).show()
    },
    EffectCallbacks: function (a) {
        EventManager.fire("PL_Effect:" + a, {});
        if (objExists(effect_callbacks[a])) {
            effect_callbacks[a].each(function (b) {
                b()
            })
        }
    },
    EffectCallbacksAdd: function (a, b) {
        effect_callbacks[a] = [];
        effect_callbacks[a].push(b)
    },
    MarqueeOn: function (c, b) {
        if (!c) {
            return
        }
        if (!b) {
            b = 250
        }
        if (!$(c).hasClassName("marquee")) {
            $(c).addClassName("marquee");
            $(c).setAttribute("rel:mtext", $(c).innerHTML.replace("&nbsp;", " ").toString());
            $(c).setAttribute("rel:mstatus", "on");
            $(c).setAttribute("rel:mpos", 0)
        }
        if ($(c).hasClassName("marquee") && $(c).getAttribute("rel:mstatus") == "on") {
            var f = Number($(c).getAttribute("rel:mpos"));
            var a = $(c).getAttribute("rel:mtext").toString();
            $(c).innerHTML = a.substr(a.length - f, a.length);
            $(c).setAttribute("rel:mpos", f + 1)
        }
        setTimeout(function () {
            PL_Effect.MarqueeOn(c, b)
        }, b)
    },
    ScrollIntoView: function (k, g) {
        if (!$(k) || $(k).viewportOffset().top == 0 || (window.PL_STATIC && PL_STATIC.pl_test_mode)) {
            return
        }
        var c = false;
        Event.observe(window, "mousewheel", a);
        if (typeof (g) == "undefined") {
            g = 0.5
        }
        var b = document.viewport.getHeight();
        var f = $(k).getHeight();
        var n = document.viewport.getScrollOffsets().top + $(k).viewportOffset().top;
        var l = Math.ceil($(k).viewportOffset().top / g / 100);
        if ($(k).viewportOffset().top > 0) {
            if (b >= f) {
                var m = (b - f) / 2;
                n -= m;
                l = Math.ceil(($(k).viewportOffset().top - m) / g / 100)
            }
        }
        function a() {
            c = true
        }
        function h(q, p) {
            if (c) {
                Event.stopObserving(window, "mousewheel", a);
                return
            }
            var o = document.viewport.getScrollOffsets().top;
            if (Math.abs(q - o) < Math.abs(p)) {
                p = q - o
            }
            window.scrollTo(0, (o + p));
            if (o == document.viewport.getScrollOffsets().top) {
                Event.stopObserving(window, "mousewheel", a);
                return
            }
            if ((o + p) != q) {
                setTimeout(function () {
                    h(q, p)
                }, 1)
            } else {
                Event.stopObserving(window, "mousewheel", a);
                return
            }
        }
        h(n, l)
    },
    FadeOut: function (b, a, c, f) {
        if (f) {
            PL_Effect.EffectCallbacksAdd("FadeOut", f)
        }
        if (!c) {
            c = 50
        }
        if (!a) {
            $(b).setOpacity(1).show();
            a = 100 - 2;
            setTimeout(function () {
                PL_Effect.FadeOut(b, a, c)
            }, c)
        } else {
            a = a - 10;
            if (a > 0) {
                $(b).setOpacity(a / 100);
                setTimeout(function () {
                    PL_Effect.FadeOut(b, a, c)
                }, c)
            } else {
                $(b).hide();
                PL_Effect.EffectCallbacks("FadeOut")
            }
        }
    },
    FadeIn: function (b, a, c, g) {
        try {
            if (g) {
                PL_Effect.EffectCallbacksAdd("FadeIn", g)
            }
            if (!c) {
                c = 5
            }
            if (!a) {
                $(b).setOpacity(0.01);
                $(b).show();
                a = 1;
                setTimeout(function () {
                    PL_Effect.FadeIn(b, a, c)
                }, c)
            } else {
                a = a + 10;
                if (a < 100) {
                    $(b).setOpacity(a / 100);
                    setTimeout(function () {
                        PL_Effect.FadeIn(b, a, c)
                    }, c)
                } else {
                    $(b).setOpacity(1);
                    PL_Effect.EffectCallbacks("FadeIn")
                }
            }
        } catch (f) {
            console.error(f)
        }
    },
    SlideDown: function (a, b) {
        try {
            if (!$(a)) {
                return
            }
            if (!b) {
                b = 20
            }
            if (isIE7() || isIE8() || (window.PL_STATIC && PL_STATIC.pl_test_mode)) {
                $(a).setStyle({
                    height: "auto"
                }).show();
                return
            }
            if (!$(a).hasClassName("SlideDown")) {
                $(a).addClassName("SlideDown");
                $(a).setStyle({
                    height: "auto",
                    overflow: "hidden"
                });
                $(a).setAttribute("rel:SlideGoal", $(a).getHeight());
                $(a).setAttribute("rel:Step", Math.max(1, Math.round($(a).getHeight() / 20)));
                $(a).setStyle({
                    height: "0px"
                });
                $(a).show()
            } else {
                if ($(a).getHeight() >= (parseInt($(a).getAttribute("rel:SlideGoal")))) {
                    $(a).setStyle({
                        height: "auto",
                        overflow: "visible"
                    });
                    $(a).removeClassName("SlideDown");
                    return
                }
            }
            $(a).setStyle({
                height: (Number($(a).getHeight()) + Number($(a).getAttribute("rel:Step"))) + "px"
            });
            setTimeout(function () {
                PL_Effect.SlideDown(a, b)
            }, b)
        } catch (c) {
            console.error(c)
        }
    },
    SlideUp: function (a, b) {
        try {
            if (!$(a)) {
                return
            }
            if (!b) {
                b = 20
            }
            if (isIE7() || isIE8() || (window.PL_STATIC && PL_STATIC.pl_test_mode)) {
                $(a).hide();
                return
            }
            if (!$(a).hasClassName("SlideUp")) {
                $(a).addClassName("SlideUp");
                $(a).setAttribute("rel:Step", Math.max(1, Math.round($(a).getHeight() / 20)));
                $(a).setStyle({
                    overflow: "hidden"
                });
                $(a).show()
            } else {
                if ($(a).cleanHeight() <= (Number($(a).getAttribute("rel:Step")) * 2)) {
                    $(a).removeClassName("SlideUp");
                    $(a).hide();
                    return
                }
            }
            $(a).setStyle({
                height: (Number($(a).cleanHeight()) - Number($(a).getAttribute("rel:Step"))) + "px"
            });
            setTimeout(function () {
                PL_Effect.SlideUp(a, b)
            }, b)
        } catch (c) {
            console.error(c)
        }
    }
};
Object.extend(Element.Methods, {
    showOnScreen: function (a, b) {
        a.show();
        PL_Effect.ScrollIntoView(a, b)
    }
});
Object.extend(Element.Methods, {
    PLOnAttributeChange: function (b, c, a) {
        if (typeof b.observers == "undefined") {
            b.observers = {}
        }
        if (typeof b.observers[c] == "undefined") {
            b.observers[c] = []
        }
        b.observers[c].push(a)
    }
});
Object.extend(Element.Methods, {
    PLSetAttribute: function (b, c, f) {
        var a = b.getAttribute(c);
        b.setAttribute(c, f);
        if (typeof b.observers != "undefined" && typeof b.observers[c] != "undefined") {
            b.observers[c].each(function (g) {
                g({
                    element: b,
                    old_value: a,
                    new_value: f
                })
            })
        }
    }
});
Element.addMethods();
var PL_PrototypeExtend = {
    getTextDescendants: function (c, b) {
        var a = [];

        function f(g) {
            var h = g.firstChild;
            while (h) {
                if (Node.TEXT_NODE == h.nodeType) {
                    if (!b || ( !! b && !h.nodeValue.match(/^([\s\n\t\r]+)$/))) {
                        a.push(h)
                    }
                }
                if (Object.isElement(h) && ["script", "style", "iframe", "embed", "object", "head"].indexOf(h.tagName.toLowerCase()) == -1) {
                    f(h)
                }
                h = h.nextSibling
            }
        }
        f(c);
        return a
    }
};
Element.addMethods(PL_PrototypeExtend);
try {
    var pl_ee = pl_ee || {};
    pl_ee.keys = [], pl_ee.code = "38,38,40,40,37,39,37,39,66,65";
    document.observe("keydown", function (g) {
        try {
            pl_ee.keys.push(g.keyCode);
            if (pl_ee.keys.toString().indexOf(pl_ee.code) >= 0) {
                pl_ee.keys = [];
                var c = 0,
                    f = ["thumb.jpg", "thumb1.jpg", "thumb2.jpg", "thumb3.jpg", "thumb4.jpg", "thumb5.jpg", "thumb6.jpg", "thumb7.jpg"],
                    a = ["bigstory.jpg", "bigstory1.jpg", "bigstory2.jpg", "bigstory3.jpg", "bigstory4.jpg", "bigstory5.jpg"];
                $$(".thumb img, img.pl-image, img.thumb, .thumb-unit img, .thumbbb img, .sub_plyfe_content img").each(function (b) {
                    b.src = PL_STATIC.static_root + "/images/public/slothsgiving/" + f[c % f.length];
                    c++
                });
                $$(".pinned-image, .pl-image-bigstory").each(function (b) {
                    b.src = PL_STATIC.static_root + "/images/public/slothsgiving/" + a[c % a.length];
                    c++
                });
                $("splash-image") && ($("splash-image").src = PL_STATIC.static_root + "/images/public/slothsgiving/splash.jpg");
                $$("body").first().setStyle({
                    "background-color": "#6235ac"
                });
                $$(".page_header").each(function (b) {
                    b.setStyle({
                        "border-bottom-color": "#6235ac"
                    })
                });
                pl_ee.words = $$("body").first().getTextDescendants(true);
                if (pl_ee.words.length > 0) {
                    pl_ee.words.each(function (m) {
                        var k = 0,
                            h = "",
                            b = 0,
                            n = m.nodeValue.length;
                        while (n > b) {
                            h += "sloths ";
                            b = h.length;
                            k++
                        }
                        h = h.substr(0, n);
                        m.nodeValue = h
                    })
                }
            }
        } catch (g) {}
    })
} catch (e) {}


var PLJS = function () {
        this.selector = (typeof window.jQuery != "undefined") ? "find" : "select";
        this.observer = (typeof window.jQuery != "undefined") ? "on" : "observe";
        this.read_attr = (typeof window.jQuery != "undefined") ? "attr" : "getAttribute";
        this.write_attr = (typeof window.jQuery != "undefined") ? "attr" : "setAttribute";
        this.stop_observing = (typeof window.jQuery != "undefined") ? "unbind" : "stopObserving";
        this.remove_class = (typeof window.jQuery != "undefined") ? "removeClass" : "removeClassName";
        this.add_class = (typeof window.jQuery != "undefined") ? "addClass" : "addClassName";
        this.has_class = (typeof window.jQuery != "undefined") ? "hasClass" : "hasClassName";
        this.update_html = (typeof window.jQuery != "undefined") ? "html" : "update";
        this.get_height = (typeof window.jQuery != "undefined") ? "height" : "getHeight";
        this.get_width = (typeof window.jQuery != "undefined") ? "width" : "getWidth";
        this.up = (typeof window.jQuery != "undefined") ? "parents" : "up";
        this.gtrack_cat = (typeof window.jQuery != "undefined") ? "data-category" : "rel:gt_cat";
        this.gtrack_act = (typeof window.jQuery != "undefined") ? "data-action" : "rel:gt_act";
        this.gtrack_label = (typeof window.jQuery != "undefined") ? "data-label" : "rel:gt_label";
        this.datetime = (typeof window.jQuery != "undefined") ? "data-datetime" : "rel:datetime";
        this.dateformat = (typeof window.jQuery != "undefined") ? "data-dateformat" : "rel:date_format";
        this.prefix = (typeof window.jQuery != "undefined") ? "data-prefix" : "rel:prefix";
        this.read_cookie = function (a) {
            if (pljs.isMobile()) {
                return readCookie(a)
            } else {
                return PLW_Util.getCookie(a)
            }
        };
        this.write_cookie = function (a, b) {
            if (pljs.isMobile()) {
                createCookie(a, b, 9999)
            } else {
                PLW_Util.setCookie({
                    name: a,
                    value: b
                })
            }
        };
        this.eventFindEl = function (b, a) {
            if (pljs.isMobile()) {
                return $(b.currentTarget).closest(a)[0]
            } else {
                return b.findElement(a)
            }
        };
        this.windowEvent = function (b, a) {
            if (pljs.isMobile()) {
                $(window).on(b, a)
            } else {
                Event.observe(window, b, a)
            }
        };
        this.getFirstEl = function (a) {
            return (pljs.isMobile() && a.jquery) ? a[0] : a
        };
        this.getElsByAttr = function (a) {
            if (pljs.isMobile()) {
                return $(a)
            } else {
                return $$(a)
            }
        };
        this.getElementFromEvent = function (a) {
            if (pljs.isMobile()) {
                return a.target
            } else {
                return a.element()
            }
        };
        this.getOffset = function (a) {
            if (pljs.isMobile()) {
                var c = $(a).offset().top,
                    b = $(a).offset().left;
                return [b, c]
            } else {
                return $(a).cumulativeOffset()
            }
        };
        this.setStyle = function (a, b) {
            if (pljs.isMobile()) {
                for (key in b) {
                    $(a).css(key, b[key])
                }
            } else {
                a.setStyle(b)
            }
        };
        this.universal_each = function (b, a) {
            if (pljs.isMobile()) {
                $.each(b, function (f, c) {
                    a(c, f)
                })
            } else {
                b.each(function (f, c) {
                    a(f, c)
                })
            }
        };
        this.universal_compare_els = function (a, b) {
            if (pljs.isMobile()) {
                return a.is(b)
            } else {
                return a == b
            }
        };
        this.isMobile = function () {
            if (typeof window.jQuery != "undefined" && /^mobile/i.test(PL_STATIC.tt_page)) {
                return true
            } else {
                if (typeof window.jQuery != "undefined" && /^ab_debug/i.test(PL_STATIC.tt_page)) {
                    return true
                } else {
                    return false
                }
            }
        };
        this.onPageLoad = function (a) {
            if (pljs.isMobile()) {
                $(document).ready(a)
            } else {
                plyfeLoader.register(a, 1)
            }
        };
        this.toggleClass = function (c, b, f) {
            f = (typeof f === "undefined") ? false : f;
            var a = $(pljs.getFirstEl(c));
            if (!f && a[pljs.has_class](b)) {
                a[pljs.remove_class](b)
            } else {
                if (f) {
                    a[pljs.add_class](b)
                }
            }
        };
        this.indexOf = function (b, a) {
            if (pljs.isMobile()) {
                return $.inArray(b, a)
            } else {
                return a.indexOf(b)
            }
        }
    };

var pljs = new PLJS();
String.prototype.replaceAll = function (b, a) {
    return this.split(b).join(a)
};
String.prototype.capitalize = function () {
    return this.replace(/\w+/g, function (b) {
        return b.charAt(0).toUpperCase() + b.substr(1).toLowerCase()
    })
};
String.prototype.commafy = function () {
    return this.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
};
if (typeof (String.prototype.trim) != "function") {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, "")
    }
}
Array.prototype.remove = function () {
    var g, c = arguments,
        b = c.length,
        f;
    while (b && this.length) {
        g = c[--b];
        while ((f = this.indexOf(g)) !== -1) {
            this.splice(f, 1)
        }
    }
    return this
};

function IsNumeric(a) {
    return !isNaN(parseFloat(a)) && isFinite(a)
}
function PL_cumulativeScrollOffset(b) {
    var a = 0,
        c = 0;
    do {
        if (b === document.body) {
            var f = document.documentElement || document.body.parentNode || document.body;
            a += !Object.isUndefined(window.pageYOffset) ? window.pageYOffset : f.scrollTop || 0;
            c += !Object.isUndefined(window.pageXOffset) ? window.pageXOffset : f.scrollLeft || 0;
            break
        } else {
            a += b.scrollTop || 0;
            c += b.scrollLeft || 0;
            b = b.parentNode
        }
    } while (b);
    return new Element.Offset(c, a)
}
var $s = function (a) {
        var b = $$(a);
        if (b.length == 0) {
            if (/dev\./.test(window.location.href)) {
                console.error("No " + a + " in document!");
                console.trace()
            }
            return new Element("div")
        } else {
            return b[0]
        }
    };

function isHTMLElement(a) {
    if (typeof (HTMLElement) == "object" || typeof (HTMLElement) == "function") {
        return (a && (a instanceof HTMLElement))
    } else {
        return (a && typeof (a) == "object" && a !== null && a.nodeType === 1 && typeof (a.nodeName) == "string")
    }
}
function isNumber(a) {
    return !isNaN(parseFloat(a)) && isFinite(a)
}
function clearTimer(a) {
    if (objExists(a)) {
        clearTimeout(a)
    }
}
function notEmptyStr(a) {
    return "string" === typeof a && 0 < a.length ? !0 : !1
}
function truncateStr(f, a) {
    var c, b;
    if ("string" !== typeof f) {
        return ""
    }
    c = f.split("");
    if (c.length > a) {
        for (b = c.length - 1; b > -1; --b) {
            if (b > a) {
                c.length = b
            } else {
                if (" " === c[b]) {
                    c.length = b;
                    break
                }
            }
        }
        c.push("...")
    }
    return c.join("")
}
function hasLocalStorage() {
    var a;
    a = ("localStorage" in window) && window.localStorage !== null ? true : false;
    if (a) {
        try {
            localStorage.setItem("__test", "data")
        } catch (b) {
            a = false
        }
    }
    return a
}
function findMatchesExec(f, g) {
    if (!(f instanceof RegExp)) {
        if (PL_STATIC.env != "live") {
            throw new Error("Error: findMatchesExec() : pattern is not RegExp object")
        }
        return false
    }
    var c = (f.global) ? true : false;
    var b = [];
    var a;
    f.lastIndex = 0;
    while ((a = f.exec(g)) != null) {
        b.push(a);
        if (!c) {
            break
        }
    }
    return (b.length) ? b : null
}

function isIE7() {
    var a = false;
    if (navigator.appVersion.indexOf("MSIE") != -1 && parseFloat(navigator.appVersion.split("MSIE")[1]) < 8) {
        a = true
    }
    return a
}
function isIE8() {
    var a = false;
    if (navigator.appVersion.indexOf("MSIE") != -1 && parseFloat(navigator.appVersion.split("MSIE")[1]) == 8) {
        a = true
    }
    return a
}
function isIE9() {
    var a = false;
    if (navigator.appVersion.indexOf("MSIE") != -1 && parseFloat(navigator.appVersion.split("MSIE")[1]) == 9) {
        a = true
    }
    return a
}
function isIE10() {
    if (uagent.match("msie 10")) {
        return true
    }
}
function isIE11() {
    return !!(navigator.userAgent.match(/Trident/) && !navigator.userAgent.match(/MSIE/))
}
function isMSIE() {
    return (navigator.appVersion.indexOf("MSIE") != -1) || isIE11()
}
function isFirefox() {
    return (navigator.userAgent.toLowerCase().indexOf("firefox") != -1)
}
function isMac() {
    return (navigator.platform.toLowerCase().indexOf("mac") != -1)
}
function isSafari5() {
    if ((uagent.match("safari") && !uagent.match("chrome")) && !(uagent.match(/Version\/[6-9](?:\.[0-9])* Safari/i) || uagent.match(/Version\/[5-9](?:\.\d+)*\.\d+ Mobile\/\S*\sSafari/i))) {
        return true
    }
}
function getUrlVars() {
    var b = {};
    var a = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (c, f, g) {
        b[f] = g
    });
    return b
}
function is_touch() {
    var a;
    if (("ontouchstart" in window) || window.DocumentTouch && document instanceof DocumentTouch) {
        a = true
    } else {
        a = false
    }
    return a
}
function is_mobile() {
    var a = navigator.userAgent.toLowerCase();
    if (a.match(/iphone|ipod|android|ipad/)) {
        return true
    } else {
        return false
    }
}
function PLWebPath() {
    var a = PL_STATIC.pl_env == "dev" ? "dev." : PL_STATIC.pl_env == "stage" ? "stage." : "www.";
    return a + "#" + PL_STATIC.web_root
}
function getWidth(a) {
    return $(a).getWidth()
}
function objExists(b) {
    try {
        if (typeof (b) != "undefined") {
            return true
        } else {
            return false
        }
    } catch (a) {
        return false
    }
}
function removeAllCssClasses(a) {
    $w($(a).className).each(function (b) {
        $(a).removeClassName(b)
    })
}
function trackPixel(a) {
    var c = new Image();
    var b = (Math.random() * 100000000000000000);
    a = a.replace("[timestamp]", b);
    if (PL_STATIC.pl_env == "dev" || PL_STATIC.pl_test_mode) {
        console.log("Pixel Tracked: ", a)
    } else {
        c.src = a
    }
}
function ukBackground() {
    if (PL_STATIC.country == "uk" && (acl.user_can("homepage_edit") || acl.user_can("uk_homepage_edit"))) {
        $$("body")[0].addClassName("uk_edit")
    }
}
function toggleGraphicImage(c, g) {
    if (!isSafari5() && !isIE10()) {
        var h = c.getOffsetParent(),
            f = h.select(".graphic_image")[0],
            b = h.select(".graphic_image_warning")[0],
            a = h.select("reblur")[0];
        if (!g) {
            if (f) {
                f.removeClassName("graphic_image")
            }
            if (b) {
                b.addClassName("hidden")
            }
            h.addClassName("no_blur")
        } else {
            if (g) {
                f = h.select("img")[0];
                if (f) {
                    f.addClassName("graphic_image")
                }
                if (b) {
                    b.removeClassName("hidden")
                }
                h.removeClassName("no_blur")
            }
        }
    }
}
(function () {
})();



/* user: This is where the quiz happens */

var PL_Quiz = function () {
        this.quizes = {};
        this.answerResponse = "#{a} is the correct answer.";
        this.init = function () {
            var b = $(document.body)[pljs.selector]("#plyfe_sub_plyfe .quiz");
            pljs.universal_each(b, function (d, m) {
                var k = $(d)[pljs.read_attr]("rel:quiz_type");
                var c = $(d)[pljs.read_attr]("rel:id");
                var f = $(d)[pljs.read_attr]("rel:swap") == "1" ? true : false;
                var g = $(d)[pljs.selector](".quiz_question");
                var j = (k == "single question") ? ".quiz_reveal" : ".quiz_result";
                var h = $(d)[pljs.selector](j);
                var e = $(d)[pljs.read_attr]("rel:question_count");
                var l = $(d)[pljs.selector](".quiz_result_area").first();
                pl_quiz.quizes[m] = {};
                pl_quiz.quizes[m]["id"] = c;
                pl_quiz.quizes[m]["type"] = k;
                pl_quiz.quizes[m]["swap"] = f;
                pl_quiz.quizes[m]["el"] = $(d);
                pl_quiz.quizes[m]["questions"] = {};
                pl_quiz.quizes[m]["results"] = {};
                pl_quiz.quizes[m]["question_count"] = e;
                pl_quiz.quizes[m]["quiz_result_area_el"] = l;
                pl_quiz.quizes[m]["completed"] = false;
                pl_quiz.quizes[m]["result_verb"] = $(d)[pljs.read_attr]("rel:result_verb");
                pl_quiz.quizes[m]["result_subject"] = $(d)[pljs.read_attr]("rel:result_subject");
                pl_quiz.quizes[m]["answer_positions"] = [];
                pl_quiz.quizes[m]["el"][pljs.add_class](pl_quiz.quizes[m]["type"].replace(" ", "_") + "_quiz");
                if (pl_quiz.isChecklist(pl_quiz.quizes[m]["type"])) {
                    pl_quiz.quizes[m].el[pljs.selector](".show_results").first()[pljs.observer]("click", function (n) {
                        $(n.target)[pljs.up](".show_results_container").hide();
                        pl_quiz.quiz_shares(pl_quiz.quizes[m]);
                        pl_quiz.show_results(pl_quiz.quizes[m]);
                        pl_quiz.quiz_complete(pl_quiz.quizes[m]);
                        pljs.universal_each(pl_quiz.quizes[m].questions[0].answers, function (p, o) {
                            if ($(p)[pljs.has_class]("selected")) {
                                return
                            }
                            pljs.toggleClass(p, "deactivated", true)
                        })
                    })
                }
                pljs.universal_each(g, function (s, u) {
                    var n = $(s)[pljs.read_attr]("rel:id");
                    var z = $(s)[pljs.selector](".quiz_answer");
                    var w = $(s)[pljs.selector](".quiz_reveal");
                    var p = $(s)[pljs.read_attr]("rel:question_type");
                    var t = pl_quiz.quizes[m]["questions"];
                    t[u] = {};
                    t[u]["id"] = n;
                    t[u]["el"] = $(s);
                    t[u]["answers"] = z;
                    t[u]["image"] = $(s)[pljs.selector](".quiz_img").first();
                    t[u]["reveal"] = w;
                    t[u]["type"] = p;
                    t[u]["response"] = null;
                    t[u]["correct"] = null;
                    t[u]["personality_index"] = null;
                    var o = $(s)[pljs.selector](".quiz_un_reveal");
                    if (o.length > 0) {
                        o.first()[pljs.observer]("click", function (H) {
                            var B = $(t[u]["image"])[pljs.read_attr]("rel:question_src");
                            var F = $(t[u]["image"])[pljs.read_attr]("rel:reveal_src");
                            var A = $(t[u]["image"])[pljs.read_attr]("src");
                            var C = $(t[u]["image"])[pljs.read_attr]("rel:attr");
                            var E = $(t[u]["image"])[pljs.read_attr]("rel:reveal_attr");
                            var G = $(t[u]["image"])[pljs.up]()[pljs.selector](".plyfe_attribution").first();
                            var D = "";
                            if (F && A == F) {
                                $(t[u]["image"])[pljs.write_attr]("src", B);
                                if (C) {
                                    D = C
                                }
                                $(H.target)[pljs.update_html]("Show new image")
                            } else {
                                if (F) {
                                    if (E) {
                                        D = E
                                    }
                                    $(t[u]["image"])[pljs.write_attr]("src", F);
                                    $(H.target)[pljs.update_html]("Show original image")
                                }
                            }
                            if (G) {
                                G[pljs.update_html](D)
                            }
                        })
                    }
                    pljs.universal_each(z, function (B, A) {
                        var C = $(B);
                        C[pljs.observer]("mouseover", function (E) {
                            var D = E || window.event;
                            if (!E.relatedTarget && E.fromElement) {
                                E.relatedTarget = E.fromElement === E.target ? E.toElement : E.fromElement
                            }
                            if ((E.relatedTarget && $(E.relatedTarget)[pljs.up](".quiz_answer") == B) || B === t[u].response) {
                                return
                            }
                            if (B === t[u].response || (pl_quiz.isChecklist(pl_quiz.quizes[m].type) && C[pljs.has_class]("selected"))) {
                                return
                            }
                            pl_quiz.style(0, t[u], B)
                        });
                        C[pljs.observer]("mouseout", function (E) {
                            var D = E || window.event;
                            if (!E.target) {
                                E.target = E.srcElement || document
                            }
                            if (!E.relatedTarget && E.fromElement) {
                                E.relatedTarget = E.fromElement === E.target ? E.toElement : E.fromElement
                            }
                            if (pl_quiz.isChecklist(pl_quiz.quizes[m].type) && C[pljs.has_class]("selected")) {
                                return
                            }
                            if ((E.relatedTarget && $(E.relatedTarget)[pljs.up](".quiz_answer") != B) && (E.target == B || $(E.target)[pljs.up](".quiz_answer") == B)) {
                                pl_quiz.style(1, t[u], B)
                            }
                        });
                        C[pljs.observer]("click", function (D) {
                            if (D.target.nodeName.toLowerCase() == "a" && $(D.target)[pljs.up]()[pljs.has_class]("sub_plyfe_source_via")) {
                                return true
                            }
                            if (pl_quiz.isChecklist(pl_quiz.quizes[m].type)) {
                                return pl_quiz.toggleSelection(m, u, A)
                            }
                            pl_quiz.answered(m, u, A);
                            pl_quiz.submit_quiz(pl_quiz.quizes[m])
                        })
                    })
                });
                pljs.universal_each(h, function (n, o) {
                    var s = $(n)[pljs.read_attr]("rel:range_start");
                    var u = $(n)[pljs.read_attr]("rel:range_end");
                    var p = pl_quiz.quizes[m]["results"];
                    var t = $(n)[pljs.read_attr]("rel:id");
                    p[o] = {};
                    p[o]["id"] = t;
                    p[o]["el"] = $(n);
                    p[o]["range_start"] = s;
                    p[o]["range_end"] = u
                })
            })
        };
        this.style = function (b, c, f) {
            var e = (typeof window.jQuery != "undefined") ? "parents" : "up";
            var d = $(c.el)[e](".quiz")[pljs.read_attr]("rel:quiz_type");
            if (pl_quiz.isChecklist(d)) {
                if (b == 2) {
                    pljs.toggleClass(f, "selected", true)
                } else {
                    if (b == 1) {
                        pljs.toggleClass(f, "selected")
                    }
                }
            }
            if ((b == 2 || b >= 4) && c.response && f == pljs.getFirstEl(c.response)) {
                pljs.toggleClass(f, "selected", true)
            }
            if (b == 0) {
                pljs.toggleClass(f, "deactivated")
            } else {
                if (b == 1) {
                    if (!pljs.universal_compare_els($(c.response), $(f))) {
                        pljs.toggleClass(f, "selected");
                        pljs.toggleClass(f, "def_answer");
                        if ((c.type == "text" || c.type == "image") && c.correct != null) {
                            pljs.toggleClass(f, "deactivated", true)
                        } else {
                            pljs.toggleClass(f, "deactivated")
                        }
                    }
                } else {
                    if (b == 2) {
                        $(f)[pljs.add_class]("selected");
                        pljs.toggleClass(f, "deactivated")
                    } else {
                        if (b == 4) {
                            $(f)[pljs.add_class]("correct_answer");
                            pljs.toggleClass(f, "deactivated")
                        } else {
                            if (b == 5) {
                                $(f)[pljs.add_class]("wrong_answer");
                                pljs.toggleClass(f, "deactivated", true)
                            }
                        }
                    }
                }
            }
        };

        /* quiz answer happens here */
        this.toggleSelection = function (l, e, j) {
            var d = pl_quiz.quizes[l];
            var g = d.questions[e];
            var h = g.answers;
            var k = g.answers[j];
            var c = $(h[j])[pljs.read_attr]("rel:id");
            var f = g.id;
            var b = $(k)[pljs.has_class]("selected") ? 1 : 2;
            pl_quiz.style(b, g, k);
            if (b == 2) {
                pl_quiz.gaTrack("[ttp]:content", "quiz-answer", [f, c].join("="))
            }
        };
        this.answered = function (k, e, j) {
            var d = pl_quiz.quizes[k];
            var g = d.questions[e];
            var h = g.answers;
            var c = $(h[j])[pljs.read_attr]("rel:id");
            var f = g.id;
            var b = 1;
            d.answer_positions[e] = j;
            g.response = $(h[j]);
            g.correct = $(g.response)[pljs.read_attr]("rel:correct") == "1" ? true : false;
            g.personality_index = $(g.response)[pljs.read_attr]("rel:personality_index");
            pljs.universal_each(h, function (l) {
                b = l === pljs.getFirstEl(g.response) ? 2 : 1;
                pl_quiz.style(b, g, l)
            });
            if (d.type == "single question") {
                pl_quiz.show_answers(g, d);
                pl_quiz.show_results(d)
            } else {
                if (d.type == "standard") {
                    pl_quiz.show_answers(g, d)
                }
            }
            pl_quiz.gaTrack("[ttp]:content", "quiz-answer", [f, c].join("="))
        };

/*here's the answer's logic */
        this.submit_quiz = function (d) {
            if (pl_quiz.quiz_complete(d) && !d.completed) {
                if (d.type != "single question") {
                    pl_quiz.quiz_shares(d)
                }
                pl_quiz.show_results(d);
                d.completed = true;
                var b = pl_quiz.get_completed_quiz_result(d);
                if (d.answer_positions.length == d.question_count) {
                    var e = d.answer_positions
                }
                if (pljs.isMobile()) {
                    var c = $.Event("quiz_complete");
                    c.answer_data = d.answer_positions;
                    c.el = b.el;
                    $(document).trigger(c)
                } else {
                    EventManager.fire("quiz_complete", e, b.el)
                }
            }
        };
        this.show_answers = function (b, d) {
            var e = b.answers;
            var c = d ? d.type : null;
            pl_quiz.disable_question(b);
            pljs.universal_each(e, function (f) {
                if (d.type == "single question" && e.length <= 1) {
                    return
                }
                if (c != "personality") {
                    if ($(f)[pljs.read_attr]("rel:correct") == "1") {
                        pl_quiz.style(4, b, f)
                    } else {
                        if (f === pljs.getFirstEl(b.response)) {
                            pl_quiz.style(5, b, f)
                        }
                    }
                }
            });
            if (c == "single question" || c == "standard") {
                pl_quiz.reveal(b, d)
            }
        };
        this.save = function (d) {
            if (typeof PL_Pixel == "undefined") {
                return false
            }
            var g = {};
            g.quiz = d.id;
            if (pl_quiz.isChecklist(d.type)) {
                var f = new Array;
                for (x in d.questions) {
                    var b = d.questions[x];
                    for (y in b.answers) {
                        var e = b.answers[y];
                        if (typeof e == "object") {
                            var c = $(e)[pljs.has_class]("selected"),
                                h = $(e)[pljs.read_attr]("rel:id");
                            if (c) {
                                f.push(h)
                            }
                        }
                    }
                }
                g.answers = f.join()
            } else {
                for (x in d.questions) {
                    var b = d.questions[x];
                    g[b.id] = $(b.response)[pljs.read_attr]("rel:id")
                }
            }
            PL_Pixel.save({
                dir: "quiz",
                params: g
            })
        };

        /* result is here */
        this.show_results = function (d) {
            var e = d.swap;
            var g = d.questions;
            var h = d.results;
            var n = pl_quiz.get_completed_quiz_result(d);
            var c = n ? $(n.el)[pljs.selector](".answer_response").first() : null;
            for (q in g) {
                pl_quiz.disable_question(g[q])
            }
            if ($(d.quiz_result_area_el)) {
                $(d.quiz_result_area_el).show()
            }
            if (d.type == "personality") {
                if (n) {
                    $(d.el)[pljs.selector](".quiz_tally_results").first().show();
                    $(d.el)[pljs.selector](".quiz_tally").first().hide();
                    $(n.el).show();
                    if (typeof window.PL_Effect != "undefined") {
                        PL_Effect.ScrollIntoView($(n.el))
                    }
                }
            } else {
                if (d.type == "single question") {
                    if (d.questions[0].answers.length > 1) {
                        var f = d.questions[0];
                        var l = $(f.el)[pljs.selector](".answer_response");
                        var m = pl_quiz.correct_answer(f);
                        var b = f.correct ? "Correct! " : "Wrong! ";
                        if (l.size() > 0) {
                            $(l[0])[pljs.add_class](f.correct ? "correct" : "wrong")[pljs.selector](".message_text").first()[pljs.update_html](b)
                        } else {
                            if (n) {
                                c.hide()
                            }
                        }
                    }
                } else {
                    if (pl_quiz.isChecklist(d.type)) {
                        var k = pl_quiz.get_message("checklist", "tally", {
                            "#{result_verb}": d.result_verb,
                            "#{result_subject}": d.result_subject
                        });
                        k = local.t(k, {
                            variables: {
                                total: d.questions[0].answers.length,
                                checked: pl_quiz.number_selected(d)
                            }
                        });
                        var j = $(d.el)[pljs.selector](".quiz_tally").first();
                        $(j)[pljs.update_html](k);
                        $(d.el)[pljs.selector](".quiz_tally_results").first().show();
                        if (n) {
                            $(n.el).show();
                            if (typeof window.PL_Effect != "undefined") {
                                PL_Effect.ScrollIntoView($(n.el))
                            }
                            c.hide()
                        }
                    } else {
                        var k = pl_quiz.get_message("generic", "tally", {
                            "#{x}": pl_quiz.number_correct(d),
                            "#{y}": d.question_count
                        });
                        var j = $(d.el)[pljs.selector](".quiz_tally").first();
                        $(j)[pljs.update_html](k);
                        $(d.el)[pljs.selector](".quiz_tally_results").first().show();
                        if (d.type == "percentage") {
                            for (q in d.questions) {
                                pl_quiz.show_answers(d.questions[q], d)
                            }
                        }
                        if (n) {
                            c.hide();
                            $(n.el).show()
                        }
                    }
                }
            }
        };
        this.disable_question = function (b) {
            var c = b.answers;
            for (a in c) {
                if (typeof c[a] != "object" || !$(c[a])) {
                    continue
                }
                $(c[a])[pljs.stop_observing]("mouseover");
                $(c[a])[pljs.stop_observing]("mouseout");
                $(c[a])[pljs.stop_observing]("click");
                pljs.setStyle($(c[a]), {
                    cursor: "default"
                })
            }
        };
        this.get_message = function (e, b, f) {
            var d = pl_quiz.messages.generic[b];
            if (pl_quiz.messages.hasOwnProperty(e) && pl_quiz.messages[e].hasOwnProperty(b)) {
                d = pl_quiz.messages[e][b]
            }
            d = local.t(d);
            for (var c in f) {
                if (!f.hasOwnProperty(c)) {
                    continue
                }
                f[c] = typeof (f[c]) == "string" ? f[c].replace("$", "$/") : f[c];
                d = d.replace(c, f[c])
            }
            d = d.replace("$/", "$");
            return d
        };
        this.get_completed_quiz_result = function (f) {
            var e = f.results;
            if (f.type == "personality") {
                var g = pl_quiz.personality(f);
                return e[g[0]]
            } else {
                if (f.type == "single question") {
                    return e[0]
                } else {
                    if (pl_quiz.isChecklist(f.type)) {
                        var d = pl_quiz.percent_checked(f);
                        for (var c in e) {
                            var b = e[c];
                            if (d >= b.range_start && d <= b.range_end) {
                                return b
                            }
                        }
                    } else {
                        var d = pl_quiz.percent_correct(f);
                        for (c in e) {
                            var b = e[c];
                            if (d >= b.range_start && d <= b.range_end) {
                                return b
                            }
                        }
                    }
                }
            }
            return false
        };
        this.reveal = function (b, g) {
            var h, e, d;
            if (b.reveal) {
                if (b.image && b.image[pljs.read_attr]("rel:reveal_src")) {
                    b.image[pljs.write_attr]("rel:question_src", b.image[pljs.read_attr]("src"));
                    b.image[pljs.write_attr]("src", b.image[pljs.read_attr]("rel:reveal_src"));
                    d = b.image[pljs.read_attr]("rel:reveal_attr");
                    if (d) {
                        h = b.image[pljs.up]()[pljs.selector](".plyfe_attribution").first();
                        if (h) {
                            e = pljs.getFirstEl(h).innerText || pljs.getFirstEl(h).textContent;
                            if (e) {
                                b.image[pljs.write_attr]("rel:attr", e.replace('"', "&quot;"))
                            }
                            h[pljs.update_html](d)
                        }
                    }
                }
                if ($(b.el)[pljs.selector](".reveal_embed").length > 0) {
                    $(b.el)[pljs.selector](".reveal_embed").first().show();
                    $(b.el)[pljs.selector](".question_embed").first().hide()
                }
                pljs.universal_each(b.reveal, function (k) {
                    $(k).show()
                })
            }
            if (g.type != "single question" || (g.type == "single question" && b.answers.length > 1)) {
                var j = $(b.el)[pljs.selector](".answer_response");
                var c = pl_quiz.correct_answer(b);
                var f = b.correct ? local.t("Correct!") : local.t("Wrong!");
                if (j.size() > 0) {
                    $(j[0])[pljs.add_class](b.correct ? "correct" : "wrong")[pljs.selector](".message_text").first()[pljs.update_html](f)
                }
            }
        };
        this.correct_answer = function (b) {
            pljs.universal_each(b.answers, function (c) {
                if ($(c)[pljs.read_attr]("rel:correct") == "1") {
                    return $(c)
                }
            });
            return null
        };
        this.personality = function (g) {
            var c = 0;
            var e = [];
            for (f in g.results) {
                e[f] = 0
            }
            for (f in g.questions) {
                var d = g.questions[f];
                e[d.personality_index]++;
                c++
            }
            var b = 0;
            for (var f = e.length - 1; f >= 0; f--) {
                if (e[f] > b) {
                    b = e[f]
                }
            }
            var h = [];
            for (var f = e.length - 1; f >= 0; f--) {
                if (e[f] == b) {
                    h.push(f)
                }
            }
            return h
        };
        this.percent_checked = function (d) {
            var c = pl_quiz.number_selected(d);
            var b = d.questions[0].answers.length;
            return Math.round((c / b) * 100)
        };
        this.percent_correct = function (d) {
            var b = 0;
            var e = 0;
            for (i in d.questions) {
                var c = d.questions[i];
                b++;
                if (c.correct == true) {
                    e++
                }
            }
            return Math.round((e / b) * 100)
        };
        this.number_selected = function (b) {
            return b.el[pljs.selector](".quiz_answer.selected").length
        };
        this.number_correct = function (c) {
            var d = 0;
            for (i in c.questions) {
                var b = c.questions[i];
                if (b.correct == true) {
                    d++
                }
            }
            return d
        };
        this.quiz_complete = function (e) {
            var d = pl_quiz.GALabel(e),
                c = "quiz-complete";
            if (!pl_quiz.isChecklist(e.type)) {
                for (i in e.questions) {
                    var b = e.questions[i];
                    if (b.correct == null) {
                        return false
                    }
                }
            }
            if (e.type == "personality") {
                if (pl_quiz.personality(e).length > 1) {
                    c = "quiz-complete-ties"
                }
            }
            if (pljs.isMobile()) {
                $(".answer_shares_buttons a").each(function () {
                    $(this).attr("data-label", d)
                })
            }
            pl_quiz.gaTrack("[ttp]:content", c, d);
            pl_quiz.save(e);
            return true
        };
        this.GALabel = function (d) {
            var b = "";
            if (d.type == "personality") {
                var f = pl_quiz.personality(d),
                    e = [];
                for (var c = 0; c < f.length; c++) {
                    e.push(d.results[f[c]]["id"])
                }
                b = d.id + "=" + e.join(",")
            } else {
                if (pl_quiz.isChecklist(d.type)) {
                    b = pl_quiz.number_selected(d) + " out " + d.questions[0].answers.length
                } else {
                    b = pl_quiz.number_correct(d) + " out " + d.question_count
                }
            }
            return b
        };
        this.isChecklist = function (b) {
            var c = ["checklist", "image checklist"];
            return c.indexOf(b) > -1
        };
        this.quiz_shares = function (b) {
            try {
                var k = pl_quiz.get_completed_quiz_result(b),
                    j, e = k && k.el ? $(k.el)[pljs.read_attr]("rel:description") : "";
                var g = {
                    el: $(b.el)[pljs.selector](".answer_shares .answer_shares_buttons").first(),
                    plyfe_uri: window.location,
                    plyfe_name: (pljs.isMobile() ? $("<div/>").html(PL_STATIC.plyfe_name).text() : PL_UI.renderEntities(PL_STATIC.plyfe_name)),
                    plyfe_blurb: (pljs.isMobile() ? $("<div/>").html(PL_STATIC.plyfe_blurb).text() : PL_UI.renderEntities(PL_STATIC.plyfe_blurb)),
                    picture: k && $(k.el)[pljs.selector](".result_img").size() > 0 ? $(k.el)[pljs.selector](".result_img")[0].src : "",
                    result_description: (pljs.isMobile() ? $("<div/>").html(e).text() : PL_UI.renderEntities(e)),
                    fb_title: "",
                    fb_blurb: "",
                    tw_blurb: "",
                    tw_hashtags: typeof ad_tw_hashtags != "undefined" ? ad_tw_hashtags : "",
                    tw_via: $(b.el)[pljs.selector](".quiz_tally_results").first()[pljs.read_attr]("rel:tweet_via") || "plyfe",
                    email_subject: "",
                    email_body: ""
                };
                if (typeof pound != "undefined" && !PL_STATIC.mobile_app) {
                    g.plyfe_uri = {
                        href: pound.urls.unescaped.queryStringOnly(),
                        toString: pound.urls.unescaped.queryStringOnly
                    }
                }
                var f = {
                    "#{title}": g.plyfe_name,
                    "#{link}": g.plyfe_uri,
                    "#{result_verb}": b.result_verb,
                    "#{result_subject}": b.result_subject
                };
                if (b.type == "personality" && !pl_quiz.post_rec) {
                    f["#{result}"] = $(k.el)[pljs.read_attr]("rel:name");
                    g.fb_title = pl_quiz.get_message("personality", "fb", f);
                    g.fb_blurb = g.result_description ? g.result_description : g.plyfe_blurb;
                    g.tw_blurb = pl_quiz.get_message("personality", "tw", f);
                    g.email_subject = pl_quiz.get_message("personality", "email_subject", f);
                    if (!unescape(g.email_subject).match("Quiz:")) {
                        g.email_subject = "Quiz: " + g.email_subject
                    }
                    g.email_body = pl_quiz.get_message("personality", "email_body", f)
                } else {
                    if (b.type == "personality" && pl_quiz.post_rec) {
                        f["#{result}"] = $(k.el)[pljs.read_attr]("rel:name");
                        g.fb_title = g.plyfe_name;
                        g.fb_blurb = g.plyfe_blurb;
                        g.tw_blurb = g.plyfe_name;
                        g.email_subject = g.plyfe_name;
                        if (!unescape(g.email_subject).match("Quiz:")) {
                            g.email_subject = "Quiz: " + g.email_subject
                        }
                        g.email_body = g.plyfe_name + "  " + g.plyfe_uri.href
                    } else {
                        if (pl_quiz.isChecklist(b.type)) {
                            f["#{checked}"] = pl_quiz.number_selected(b);
                            f["#{total}"] = b.questions[0].answers.length;
                            g.fb_title = pl_quiz.get_message("checklist", "fb", f);
                            g.fb_blurb = g.result_description || g.plyfe_blurb;
                            g.tw_blurb = pl_quiz.get_message("checklist", "tw", f);
                            g.email_subject = pl_quiz.get_message("checklist", "email_subject", f);
                            if (!unescape(g.email_subject).match("Quiz:")) {
                                g.email_subject = "Quiz: " + g.email_subject
                            }
                            g.email_body = pl_quiz.get_message("checklist", "email_body", f)
                        } else {
                            f["#{score}"] = pl_quiz.number_correct(b);
                            f["#{total}"] = b.question_count;
                            g.fb_title = g.plyfe_name;
                            g.fb_blurb = pl_quiz.get_message("generic", "fb", f);
                            g.tw_blurb = pl_quiz.get_message("generic", "tw", f);
                            g.email_subject = pl_quiz.get_message("generic", "email_subject", f);
                            if (!unescape(g.email_subject).match("Quiz:")) {
                                g.email_subject = "Quiz: " + g.email_subject
                            }
                            g.email_body = pl_quiz.get_message("generic", "email_body", f)
                        }
                    }
                }
                if (PL_STATIC.campaignid == "1931201") {
                    var h = "Remember to eat your cereal, not your serial killers.";
                    g.fb_blurb = h;
                    g.tw_blurb = g.plyfe_name + " " + h;
                    g.tw_hashtags = "ripperstreet";
                    g.email_subject = pl_quiz.get_message("generic", "email_subject", {
                        "#{title}": g.plyfe_name
                    });
                    g.email_body = h + " " + escape(g.plyfe_uri)
                }
                if (PL_STATIC.campaignid == "3397410") {
                    var c = {
                        "Constant Commentator": "I’m an over-sharer and proud",
                        "Too Proud Parent": "I’m all about my brilliant brood",
                        Failosopher: "I love getting deep and meaningful",
                        Animaniac: "I admit it, I’m all about the cute animals",
                        "Smug Couple": "I’m loved up and you’re tired of seeing it",
                        "Score Bore": "I’ve been boring you with my gym brags",
                        "Social Show-Off": "I’ve been flaunting the high life on here too long",
                        "Foodie Fanatic": "I’ve been over-sharing my food snaps",
                        Lurker: "Okay, I spend too much time looking at other peoples’ updates"
                    };
                    f["#{outcome}"] = c[f["#{result}"]];
                    g.fb_title = pl_quiz.get_message("3397410", "fb_title", f);
                    g.fb_blurb = pl_quiz.get_message("3397410", "fb_description", f);
                    g.email_subject = pl_quiz.get_message("3397410", "email_subject", f);
                    g.email_body = pl_quiz.get_message("3397410", "email_body", f);
                    f["#{title}"] = "What's Your Social Media Sin?";
                    f["#{link}"] = escape(g.plyfe_uri);
                    g.tw_blurb = pl_quiz.get_message("3397410", "tw", f)
                }
                $(g.el).show();
                if (pljs.isMobile()) {
                    $(document.body)[pljs.selector](".share-buttons.position-lower")[pljs.add_class]("hidden");
                    if (PL_STATIC.mobile_app == false) {
                        $(document.body)[pljs.selector](".share-buttons.position-quiz .fb-share-dialog a")[pljs.observer]("click", function (m) {
                            m.preventDefault();
                            var l = {
                                name: unescape(g.fb_title),
                                description: unescape(g.fb_blurb),
                                link: g.plyfe_uri.toString(),
                                picture: g.picture,
                                parent_id: "share-buttons-quiz"
                            };
                            l.parent_id = "subplyfe-share";
                            l.category = "Mobileplyfe:content";
                            l.action = $(m).data("action");
                            l.legacy_url = l.link.replace(/^http\:\/\/[a-z\.]*\//, "/");
                            Share.facebook(l)
                        });
                        $(document.body)[pljs.selector](".share-buttons.position-quiz .tweet_btn a")[pljs.observer]("click", function (m) {
                            m.preventDefault();
                            var l = {
                                text: g.tw_blurb,
                                url: g.plyfe_uri,
                                via: g.tw_via,
                                parent_id: "share-buttons-quiz",
                                legacy_url: document.URL.replace(/[?#].*$/g, "")
                            };
                            l.category = "Mobileplyfe:content";
                            l.action = $(m).data("action");
                            Share.twitter(l)
                        });
                        $(document.body)[pljs.selector](".share-buttons.position-quiz .pin a")[pljs.observer]("click", function (m) {
                            m.preventDefault();
                            var l = {
                                media: g.picture,
                                description: g.tw_blurb,
                                url: g.plyfe_uri,
                                parent_id: "share-buttons-quiz",
                                legacy_url: document.URL.replace(/[?#].*$/g, "")
                            };
                            l.category = "Mobileplyfe:content";
                            l.action = $(m).data("action");
                            Share.pinterest(l)
                        });
                        $(document.body)[pljs.selector](".share-buttons.position-quiz .email a")[pljs.observer]("click", function (m) {
                            m.preventDefault();
                            var l = {
                                subject: g.email_subject,
                                body: g.email_body,
                                parent_id: "share-buttons-quiz"
                            };
                            Share.email(l)
                        })
                    }
                }
            } catch (d) {
            }
        };
        this.gaTrack = function (b, c, d) {
            if (typeof gtrack != "undefined") {
                gtrack.track_events(b, c, d)
            }
        }
    };
var pl_quiz = new PL_Quiz();
pljs.onPageLoad(pl_quiz.init);
PL_Related = function () {
    this.related_links_controller = "/plyfe/_related_links";
    this.init = function () {
        if (!acl.user_can("general_admin")) {
            return
        }
        related.assign_handlers()
    };
    this.assign_handlers = function () {
        universal_dom.assign_handler({
            bucket: "update-related",
            handler: related.update_related,
            event: "click"
        });
        universal_dom.assign_handler({
            bucket: "related-cancel",
            handler: related.related_cancel,
            event: "click"
        });
        universal_dom.assign_handler({
            bucket: "related-save",
            handler: related.save_related,
            event: "click"
        })
    };
    this.update_related = function (args) {
        if (args.plyfe_id) {
            var dialog = $$(".update_related")[0];
            var dialogWidth = dialog.getWidth();
            var dialogHeight = dialog.getHeight();
            var topPos = args.clientY;
            related.show_body_overlay();
            dialog.show();
            if ((topPos + dialogHeight) > PL_UTIL.browser.dimensions.height()) {
                topPos = PL_UTIL.browser.dimensions.height() - dialogHeight
            }
            dialog.setStyle({
                left: args.clientX + "px",
                top: topPos + "px",
                position: "fixed"
            })
        } else {
            console.log("update_related: Invalid plyfe id")
        }
    };
    this.related_cancel = function () {
        if ($("bodyOverlay")) {
            document.body.removeChild($("bodyOverlay"))
        }
        $("save_spinner").hide();
        var dialog = $$(".update_related")[0];
        dialog.hide()
    };
    this.show_body_overlay = function () {
        var bodyHeight = document.body.getHeight();
        var bodyWidth = document.body.getWidth();
        if (!$("bodyOverlay")) {
            var overlay = document.createElement("div");
            overlay.setAttribute("id", "bodyOverlay");
            overlay.setStyle({
                width: bodyWidth + "px",
                height: bodyHeight + "px"
            });
            document.body.appendChild(overlay)
        }
    };
    this.save_related = function (args) {
        if (args.plyfe_id) {
            $("save_spinner").show();
            var newRelated = new Array();
            var related_input = $$(".related_input");
            for (var i = related_input.length; i >= 1; i--) {
                if ($("related" + i) != undefined && $("related" + i).value !== undefined && $("related" + i).value != "") {
                    newRelated.push($("related" + i).value)
                }
            }
            var params = {
                action: "validate_and_save",
                campaignid: args.plyfe_id,
                related_urls: JSON.stringify(newRelated)
            };
            (new PL_Request()).request("/plyfe/_related_links", {
                method: "get",
                parameters: params,
                onSuccess: function (r) {
                    var obj = eval("(" + r.responseText + ")");
                    console.log(obj.number);
                    if (obj.success == 0) {
                        related.error(obj.message)
                    } else {
                        if (obj.number == 0) {
                            related.error("No urls could be validated. Must be # links.")
                        } else {
                            if (newRelated.length > obj.number) {
                                related.error("Only " + obj.number + " out of " + newRelated.length + " urls could be validated.")
                            }
                        }
                    }
                    related.related_cancel()
                },
                onFailure: function (r) {
                    var obj = eval("(" + r.responseText + ")");
                    related.error(obj.message || "save_related: validate and save failure")
                }
            })
        } else {
            console.log("save_related: Invalid plyfe id")
        }
    };
    this.error = function (message) {
        console.log("related.error");
        (new PL_Request()).alert(message)
    }
};
document.observe("dom:loaded", function () {
    if ($("plyfe_sub_plyfe") && ($("plyfe_sub_plyfe").hasClassName("suplist_long") || $("plyfe_sub_plyfe").hasClassName("suplist_article"))) {
        var b = new PL_InlineSharing();
        b.init();
        var c = new PL_ReadLater();
        c.init()
    }
});

Array.isArray || (Array.isArray = function (b) {
    return "object" === typeof b && "[object Array]" === Object.prototype.toString.call(b)
});
var CountView = function () {
        this._elems_arr = [];
        this._time_interval = 250;
        this._callback = null;
        this._interval_id = null
    };
plyfeLoader.register(function () {
    flagComment.init()
}, 1);