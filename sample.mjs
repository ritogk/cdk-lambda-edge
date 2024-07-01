var dt = Object.create;
var I = Object.defineProperty;
var mt = Object.getOwnPropertyDescriptor;
var wt = Object.getOwnPropertyNames;
var yt = Object.getPrototypeOf,
  xt = Object.prototype.hasOwnProperty;
var B = (i, t) => () => (t || i((t = { exports: {} }).exports, t), t.exports);
var vt = (i, t, e, s) => {
  if ((t && typeof t == "object") || typeof t == "function")
    for (let n of wt(t))
      !xt.call(i, n) &&
        n !== e &&
        I(i, n, {
          get: () => t[n],
          enumerable: !(s = mt(t, n)) || s.enumerable,
        });
  return i;
};
var St = (i, t, e) => (
  (e = i != null ? dt(yt(i)) : {}),
  vt(
    t || !i || !i.__esModule
      ? I(e, "default", { value: i, enumerable: !0 })
      : e,
    i
  )
);
var Z = B((pe, U) => {
  "use strict";
  U.exports = F;
  function F(i, t, e) {
    i instanceof RegExp && (i = _(i, e)), t instanceof RegExp && (t = _(t, e));
    var s = H(i, t, e);
    return (
      s && {
        start: s[0],
        end: s[1],
        pre: e.slice(0, s[0]),
        body: e.slice(s[0] + i.length, s[1]),
        post: e.slice(s[1] + t.length),
      }
    );
  }
  function _(i, t) {
    var e = t.match(i);
    return e ? e[0] : null;
  }
  F.range = H;
  function H(i, t, e) {
    var s,
      n,
      r,
      o,
      h,
      a = e.indexOf(i),
      c = e.indexOf(t, a + 1),
      l = a;
    if (a >= 0 && c > 0) {
      if (i === t) return [a, c];
      for (s = [], r = e.length; l >= 0 && !h; )
        l == a
          ? (s.push(l), (a = e.indexOf(i, l + 1)))
          : s.length == 1
          ? (h = [s.pop(), c])
          : ((n = s.pop()),
            n < r && ((r = n), (o = c)),
            (c = e.indexOf(t, l + 1))),
          (l = a < c && a >= 0 ? a : c);
      s.length && (h = [r, o]);
    }
    return h;
  }
});
var et = B((fe, tt) => {
  var J = Z();
  tt.exports = Tt;
  var V = "\0SLASH" + Math.random() + "\0",
    X = "\0OPEN" + Math.random() + "\0",
    D = "\0CLOSE" + Math.random() + "\0",
    K = "\0COMMA" + Math.random() + "\0",
    Q = "\0PERIOD" + Math.random() + "\0";
  function P(i) {
    return parseInt(i, 10) == i ? parseInt(i, 10) : i.charCodeAt(0);
  }
  function Et(i) {
    return i
      .split("\\\\")
      .join(V)
      .split("\\{")
      .join(X)
      .split("\\}")
      .join(D)
      .split("\\,")
      .join(K)
      .split("\\.")
      .join(Q);
  }
  function bt(i) {
    return i
      .split(V)
      .join("\\")
      .split(X)
      .join("{")
      .split(D)
      .join("}")
      .split(K)
      .join(",")
      .split(Q)
      .join(".");
  }
  function Y(i) {
    if (!i) return [""];
    var t = [],
      e = J("{", "}", i);
    if (!e) return i.split(",");
    var s = e.pre,
      n = e.body,
      r = e.post,
      o = s.split(",");
    o[o.length - 1] += "{" + n + "}";
    var h = Y(r);
    return (
      r.length && ((o[o.length - 1] += h.shift()), o.push.apply(o, h)),
      t.push.apply(t, o),
      t
    );
  }
  function Tt(i) {
    return i
      ? (i.substr(0, 2) === "{}" && (i = "\\{\\}" + i.substr(2)),
        R(Et(i), !0).map(bt))
      : [];
  }
  function Mt(i) {
    return "{" + i + "}";
  }
  function At(i) {
    return /^-?0\d/.test(i);
  }
  function Ot(i, t) {
    return i <= t;
  }
  function Nt(i, t) {
    return i >= t;
  }
  function R(i, t) {
    var e = [],
      s = J("{", "}", i);
    if (!s) return [i];
    var n = s.pre,
      r = s.post.length ? R(s.post, !1) : [""];
    if (/\$$/.test(s.pre))
      for (var o = 0; o < r.length; o++) {
        var h = n + "{" + s.body + "}" + r[o];
        e.push(h);
      }
    else {
      var a = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(s.body),
        c = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(s.body),
        l = a || c,
        g = s.body.indexOf(",") >= 0;
      if (!l && !g)
        return s.post.match(/,.*\}/)
          ? ((i = s.pre + "{" + s.body + D + s.post), R(i))
          : [i];
      var u;
      if (l) u = s.body.split(/\.\./);
      else if (
        ((u = Y(s.body)),
        u.length === 1 && ((u = R(u[0], !1).map(Mt)), u.length === 1))
      )
        return r.map(function (gt) {
          return s.pre + u[0] + gt;
        });
      var p;
      if (l) {
        var d = P(u[0]),
          f = P(u[1]),
          w = Math.max(u[0].length, u[1].length),
          S = u.length == 3 ? Math.abs(P(u[2])) : 1,
          O = Ot,
          E = f < d;
        E && ((S *= -1), (O = Nt));
        var b = u.some(At);
        p = [];
        for (var T = d; O(T, f); T += S) {
          var y;
          if (c) (y = String.fromCharCode(T)), y === "\\" && (y = "");
          else if (((y = String(T)), b)) {
            var G = w - y.length;
            if (G > 0) {
              var q = new Array(G + 1).join("0");
              T < 0 ? (y = "-" + q + y.slice(1)) : (y = q + y);
            }
          }
          p.push(y);
        }
      } else {
        p = [];
        for (var A = 0; A < u.length; A++) p.push.apply(p, R(u[A], !1));
      }
      for (var A = 0; A < p.length; A++)
        for (var o = 0; o < r.length; o++) {
          var h = n + p[A] + r[o];
          (!t || l || h) && e.push(h);
        }
    }
    return e;
  }
});
var ct = St(et(), 1);
var C = (i) => {
  if (typeof i != "string") throw new TypeError("invalid pattern");
  if (i.length > 65536) throw new TypeError("pattern is too long");
};
var $t = {
    "[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}", !0],
    "[:alpha:]": ["\\p{L}\\p{Nl}", !0],
    "[:ascii:]": ["\\x00-\\x7f", !1],
    "[:blank:]": ["\\p{Zs}\\t", !0],
    "[:cntrl:]": ["\\p{Cc}", !0],
    "[:digit:]": ["\\p{Nd}", !0],
    "[:graph:]": ["\\p{Z}\\p{C}", !0, !0],
    "[:lower:]": ["\\p{Ll}", !0],
    "[:print:]": ["\\p{C}", !0],
    "[:punct:]": ["\\p{P}", !0],
    "[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f", !0],
    "[:upper:]": ["\\p{Lu}", !0],
    "[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}", !0],
    "[:xdigit:]": ["A-Fa-f0-9", !1],
  },
  j = (i) => i.replace(/[[\]\\-]/g, "\\$&"),
  Rt = (i) => i.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
  st = (i) => i.join(""),
  it = (i, t) => {
    let e = t;
    if (i.charAt(e) !== "[") throw new Error("not in a brace expression");
    let s = [],
      n = [],
      r = e + 1,
      o = !1,
      h = !1,
      a = !1,
      c = !1,
      l = e,
      g = "";
    t: for (; r < i.length; ) {
      let f = i.charAt(r);
      if ((f === "!" || f === "^") && r === e + 1) {
        (c = !0), r++;
        continue;
      }
      if (f === "]" && o && !a) {
        l = r + 1;
        break;
      }
      if (((o = !0), f === "\\" && !a)) {
        (a = !0), r++;
        continue;
      }
      if (f === "[" && !a) {
        for (let [w, [S, O, E]] of Object.entries($t))
          if (i.startsWith(w, r)) {
            if (g) return ["$.", !1, i.length - e, !0];
            (r += w.length), E ? n.push(S) : s.push(S), (h = h || O);
            continue t;
          }
      }
      if (((a = !1), g)) {
        f > g ? s.push(j(g) + "-" + j(f)) : f === g && s.push(j(f)),
          (g = ""),
          r++;
        continue;
      }
      if (i.startsWith("-]", r + 1)) {
        s.push(j(f + "-")), (r += 2);
        continue;
      }
      if (i.startsWith("-", r + 1)) {
        (g = f), (r += 2);
        continue;
      }
      s.push(j(f)), r++;
    }
    if (l < r) return ["", !1, 0, !1];
    if (!s.length && !n.length) return ["$.", !1, i.length - e, !0];
    if (n.length === 0 && s.length === 1 && /^\\?.$/.test(s[0]) && !c) {
      let f = s[0].length === 2 ? s[0].slice(-1) : s[0];
      return [Rt(f), !1, l - e, !1];
    }
    let u = "[" + (c ? "^" : "") + st(s) + "]",
      p = "[" + (c ? "" : "^") + st(n) + "]";
    return [
      s.length && n.length ? "(" + u + "|" + p + ")" : s.length ? u : p,
      h,
      l - e,
      !0,
    ];
  };
var M = (i, { windowsPathsNoEscape: t = !1 } = {}) =>
  t
    ? i.replace(/\[([^\/\\])\]/g, "$1")
    : i
        .replace(/((?!\\).|^)\[([^\/\\])\]/g, "$1$2")
        .replace(/\\([^\/])/g, "$1");
var Ct = new Set(["!", "?", "+", "*", "@"]),
  nt = (i) => Ct.has(i),
  jt = "(?!(?:^|/)\\.\\.?(?:$|/))",
  W = "(?!\\.)",
  Wt = new Set(["[", "."]),
  Lt = new Set(["..", "."]),
  Pt = new Set("().*{}+?[]^$\\!"),
  Dt = (i) => i.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
  k = "[^/]",
  rt = k + "*?",
  ot = k + "+?",
  N = class i {
    type;
    #s;
    #i;
    #r = !1;
    #t = [];
    #e;
    #o;
    #a;
    #h = !1;
    #n;
    #c;
    #u = !1;
    constructor(t, e, s = {}) {
      (this.type = t),
        t && (this.#i = !0),
        (this.#e = e),
        (this.#s = this.#e ? this.#e.#s : this),
        (this.#n = this.#s === this ? s : this.#s.#n),
        (this.#a = this.#s === this ? [] : this.#s.#a),
        t === "!" && !this.#s.#h && this.#a.push(this),
        (this.#o = this.#e ? this.#e.#t.length : 0);
    }
    get hasMagic() {
      if (this.#i !== void 0) return this.#i;
      for (let t of this.#t)
        if (typeof t != "string" && (t.type || t.hasMagic))
          return (this.#i = !0);
      return this.#i;
    }
    toString() {
      return this.#c !== void 0
        ? this.#c
        : this.type
        ? (this.#c =
            this.type + "(" + this.#t.map((t) => String(t)).join("|") + ")")
        : (this.#c = this.#t.map((t) => String(t)).join(""));
    }
    #f() {
      if (this !== this.#s) throw new Error("should only call on root");
      if (this.#h) return this;
      this.toString(), (this.#h = !0);
      let t;
      for (; (t = this.#a.pop()); ) {
        if (t.type !== "!") continue;
        let e = t,
          s = e.#e;
        for (; s; ) {
          for (let n = e.#o + 1; !s.type && n < s.#t.length; n++)
            for (let r of t.#t) {
              if (typeof r == "string")
                throw new Error("string part in extglob AST??");
              r.copyIn(s.#t[n]);
            }
          (e = s), (s = e.#e);
        }
      }
      return this;
    }
    push(...t) {
      for (let e of t)
        if (e !== "") {
          if (typeof e != "string" && !(e instanceof i && e.#e === this))
            throw new Error("invalid part: " + e);
          this.#t.push(e);
        }
    }
    toJSON() {
      let t =
        this.type === null
          ? this.#t.slice().map((e) => (typeof e == "string" ? e : e.toJSON()))
          : [this.type, ...this.#t.map((e) => e.toJSON())];
      return (
        this.isStart() && !this.type && t.unshift([]),
        this.isEnd() &&
          (this === this.#s || (this.#s.#h && this.#e?.type === "!")) &&
          t.push({}),
        t
      );
    }
    isStart() {
      if (this.#s === this) return !0;
      if (!this.#e?.isStart()) return !1;
      if (this.#o === 0) return !0;
      let t = this.#e;
      for (let e = 0; e < this.#o; e++) {
        let s = t.#t[e];
        if (!(s instanceof i && s.type === "!")) return !1;
      }
      return !0;
    }
    isEnd() {
      if (this.#s === this || this.#e?.type === "!") return !0;
      if (!this.#e?.isEnd()) return !1;
      if (!this.type) return this.#e?.isEnd();
      let t = this.#e ? this.#e.#t.length : 0;
      return this.#o === t - 1;
    }
    copyIn(t) {
      typeof t == "string" ? this.push(t) : this.push(t.clone(this));
    }
    clone(t) {
      let e = new i(this.type, t);
      for (let s of this.#t) e.copyIn(s);
      return e;
    }
    static #l(t, e, s, n) {
      let r = !1,
        o = !1,
        h = -1,
        a = !1;
      if (e.type === null) {
        let p = s,
          d = "";
        for (; p < t.length; ) {
          let f = t.charAt(p++);
          if (r || f === "\\") {
            (r = !r), (d += f);
            continue;
          }
          if (o) {
            p === h + 1
              ? (f === "^" || f === "!") && (a = !0)
              : f === "]" && !(p === h + 2 && a) && (o = !1),
              (d += f);
            continue;
          } else if (f === "[") {
            (o = !0), (h = p), (a = !1), (d += f);
            continue;
          }
          if (!n.noext && nt(f) && t.charAt(p) === "(") {
            e.push(d), (d = "");
            let w = new i(f, e);
            (p = i.#l(t, w, p, n)), e.push(w);
            continue;
          }
          d += f;
        }
        return e.push(d), p;
      }
      let c = s + 1,
        l = new i(null, e),
        g = [],
        u = "";
      for (; c < t.length; ) {
        let p = t.charAt(c++);
        if (r || p === "\\") {
          (r = !r), (u += p);
          continue;
        }
        if (o) {
          c === h + 1
            ? (p === "^" || p === "!") && (a = !0)
            : p === "]" && !(c === h + 2 && a) && (o = !1),
            (u += p);
          continue;
        } else if (p === "[") {
          (o = !0), (h = c), (a = !1), (u += p);
          continue;
        }
        if (nt(p) && t.charAt(c) === "(") {
          l.push(u), (u = "");
          let d = new i(p, l);
          l.push(d), (c = i.#l(t, d, c, n));
          continue;
        }
        if (p === "|") {
          l.push(u), (u = ""), g.push(l), (l = new i(null, e));
          continue;
        }
        if (p === ")")
          return (
            u === "" && e.#t.length === 0 && (e.#u = !0),
            l.push(u),
            (u = ""),
            e.push(...g, l),
            c
          );
        u += p;
      }
      return (e.type = null), (e.#i = void 0), (e.#t = [t.substring(s - 1)]), c;
    }
    static fromGlob(t, e = {}) {
      let s = new i(null, void 0, e);
      return i.#l(t, s, 0, e), s;
    }
    toMMPattern() {
      if (this !== this.#s) return this.#s.toMMPattern();
      let t = this.toString(),
        [e, s, n, r] = this.toRegExpSource();
      if (
        !(
          n ||
          this.#i ||
          (this.#n.nocase &&
            !this.#n.nocaseMagicOnly &&
            t.toUpperCase() !== t.toLowerCase())
        )
      )
        return s;
      let h = (this.#n.nocase ? "i" : "") + (r ? "u" : "");
      return Object.assign(new RegExp(`^${e}$`, h), { _src: e, _glob: t });
    }
    get options() {
      return this.#n;
    }
    toRegExpSource(t) {
      let e = t ?? !!this.#n.dot;
      if ((this.#s === this && this.#f(), !this.type)) {
        let a = this.isStart() && this.isEnd(),
          c = this.#t
            .map((p) => {
              let [d, f, w, S] =
                typeof p == "string"
                  ? i.#g(p, this.#i, a)
                  : p.toRegExpSource(t);
              return (this.#i = this.#i || w), (this.#r = this.#r || S), d;
            })
            .join(""),
          l = "";
        if (
          this.isStart() &&
          typeof this.#t[0] == "string" &&
          !(this.#t.length === 1 && Lt.has(this.#t[0]))
        ) {
          let d = Wt,
            f =
              (e && d.has(c.charAt(0))) ||
              (c.startsWith("\\.") && d.has(c.charAt(2))) ||
              (c.startsWith("\\.\\.") && d.has(c.charAt(4))),
            w = !e && !t && d.has(c.charAt(0));
          l = f ? jt : w ? W : "";
        }
        let g = "";
        return (
          this.isEnd() &&
            this.#s.#h &&
            this.#e?.type === "!" &&
            (g = "(?:$|\\/)"),
          [l + c + g, M(c), (this.#i = !!this.#i), this.#r]
        );
      }
      let s = this.type === "*" || this.type === "+",
        n = this.type === "!" ? "(?:(?!(?:" : "(?:",
        r = this.#p(e);
      if (this.isStart() && this.isEnd() && !r && this.type !== "!") {
        let a = this.toString();
        return (
          (this.#t = [a]),
          (this.type = null),
          (this.#i = void 0),
          [a, M(this.toString()), !1, !1]
        );
      }
      let o = !s || t || e || !W ? "" : this.#p(!0);
      o === r && (o = ""), o && (r = `(?:${r})(?:${o})*?`);
      let h = "";
      if (this.type === "!" && this.#u)
        h = (this.isStart() && !e ? W : "") + ot;
      else {
        let a =
          this.type === "!"
            ? "))" + (this.isStart() && !e && !t ? W : "") + rt + ")"
            : this.type === "@"
            ? ")"
            : this.type === "?"
            ? ")?"
            : this.type === "+" && o
            ? ")"
            : this.type === "*" && o
            ? ")?"
            : `)${this.type}`;
        h = n + r + a;
      }
      return [h, M(r), (this.#i = !!this.#i), this.#r];
    }
    #p(t) {
      return this.#t
        .map((e) => {
          if (typeof e == "string")
            throw new Error("string type in extglob ast??");
          let [s, n, r, o] = e.toRegExpSource(t);
          return (this.#r = this.#r || o), s;
        })
        .filter((e) => !(this.isStart() && this.isEnd()) || !!e)
        .join("|");
    }
    static #g(t, e, s = !1) {
      let n = !1,
        r = "",
        o = !1;
      for (let h = 0; h < t.length; h++) {
        let a = t.charAt(h);
        if (n) {
          (n = !1), (r += (Pt.has(a) ? "\\" : "") + a);
          continue;
        }
        if (a === "\\") {
          h === t.length - 1 ? (r += "\\\\") : (n = !0);
          continue;
        }
        if (a === "[") {
          let [c, l, g, u] = it(t, h);
          if (g) {
            (r += c), (o = o || l), (h += g - 1), (e = e || u);
            continue;
          }
        }
        if (a === "*") {
          s && t === "*" ? (r += ot) : (r += rt), (e = !0);
          continue;
        }
        if (a === "?") {
          (r += k), (e = !0);
          continue;
        }
        r += Dt(a);
      }
      return [r, M(t), !!e, o];
    }
  };
var z = (i, { windowsPathsNoEscape: t = !1 } = {}) =>
  t ? i.replace(/[?*()[\]]/g, "[$&]") : i.replace(/[?*()[\]\\]/g, "\\$&");
var m = (i, t, e = {}) => (
    C(t), !e.nocomment && t.charAt(0) === "#" ? !1 : new $(t, e).match(i)
  ),
  kt = /^\*+([^+@!?\*\[\(]*)$/,
  zt = (i) => (t) => !t.startsWith(".") && t.endsWith(i),
  Gt = (i) => (t) => t.endsWith(i),
  qt = (i) => (
    (i = i.toLowerCase()),
    (t) => !t.startsWith(".") && t.toLowerCase().endsWith(i)
  ),
  It = (i) => ((i = i.toLowerCase()), (t) => t.toLowerCase().endsWith(i)),
  Bt = /^\*+\.\*+$/,
  _t = (i) => !i.startsWith(".") && i.includes("."),
  Ft = (i) => i !== "." && i !== ".." && i.includes("."),
  Ht = /^\.\*+$/,
  Ut = (i) => i !== "." && i !== ".." && i.startsWith("."),
  Zt = /^\*+$/,
  Jt = (i) => i.length !== 0 && !i.startsWith("."),
  Vt = (i) => i.length !== 0 && i !== "." && i !== "..",
  Xt = /^\?+([^+@!?\*\[\(]*)?$/,
  Kt = ([i, t = ""]) => {
    let e = lt([i]);
    return t
      ? ((t = t.toLowerCase()), (s) => e(s) && s.toLowerCase().endsWith(t))
      : e;
  },
  Qt = ([i, t = ""]) => {
    let e = ut([i]);
    return t
      ? ((t = t.toLowerCase()), (s) => e(s) && s.toLowerCase().endsWith(t))
      : e;
  },
  Yt = ([i, t = ""]) => {
    let e = ut([i]);
    return t ? (s) => e(s) && s.endsWith(t) : e;
  },
  te = ([i, t = ""]) => {
    let e = lt([i]);
    return t ? (s) => e(s) && s.endsWith(t) : e;
  },
  lt = ([i]) => {
    let t = i.length;
    return (e) => e.length === t && !e.startsWith(".");
  },
  ut = ([i]) => {
    let t = i.length;
    return (e) => e.length === t && e !== "." && e !== "..";
  },
  pt =
    typeof process == "object" && process
      ? (typeof process.env == "object" &&
          process.env &&
          process.env.__MINIMATCH_TESTING_PLATFORM__) ||
        process.platform
      : "posix",
  ht = { win32: { sep: "\\" }, posix: { sep: "/" } },
  ee = pt === "win32" ? ht.win32.sep : ht.posix.sep;
m.sep = ee;
var v = Symbol("globstar **");
m.GLOBSTAR = v;
var se = "[^/]",
  ie = se + "*?",
  ne = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?",
  re = "(?:(?!(?:\\/|^)\\.).)*?",
  oe =
    (i, t = {}) =>
    (e) =>
      m(e, i, t);
m.filter = oe;
var x = (i, t = {}) => Object.assign({}, i, t),
  he = (i) => {
    if (!i || typeof i != "object" || !Object.keys(i).length) return m;
    let t = m;
    return Object.assign((s, n, r = {}) => t(s, n, x(i, r)), {
      Minimatch: class extends t.Minimatch {
        constructor(n, r = {}) {
          super(n, x(i, r));
        }
        static defaults(n) {
          return t.defaults(x(i, n)).Minimatch;
        }
      },
      AST: class extends t.AST {
        constructor(n, r, o = {}) {
          super(n, r, x(i, o));
        }
        static fromGlob(n, r = {}) {
          return t.AST.fromGlob(n, x(i, r));
        }
      },
      unescape: (s, n = {}) => t.unescape(s, x(i, n)),
      escape: (s, n = {}) => t.escape(s, x(i, n)),
      filter: (s, n = {}) => t.filter(s, x(i, n)),
      defaults: (s) => t.defaults(x(i, s)),
      makeRe: (s, n = {}) => t.makeRe(s, x(i, n)),
      braceExpand: (s, n = {}) => t.braceExpand(s, x(i, n)),
      match: (s, n, r = {}) => t.match(s, n, x(i, r)),
      sep: t.sep,
      GLOBSTAR: v,
    });
  };
m.defaults = he;
var ft = (i, t = {}) => (
  C(i), t.nobrace || !/\{(?:(?!\{).)*\}/.test(i) ? [i] : (0, ct.default)(i)
);
m.braceExpand = ft;
var ae = (i, t = {}) => new $(i, t).makeRe();
m.makeRe = ae;
var ce = (i, t, e = {}) => {
  let s = new $(t, e);
  return (
    (i = i.filter((n) => s.match(n))),
    s.options.nonull && !i.length && i.push(t),
    i
  );
};
m.match = ce;
var at = /[?*]|[+@!]\(.*?\)|\[|\]/,
  le = (i) => i.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
  $ = class {
    options;
    set;
    pattern;
    windowsPathsNoEscape;
    nonegate;
    negate;
    comment;
    empty;
    preserveMultipleSlashes;
    partial;
    globSet;
    globParts;
    nocase;
    isWindows;
    platform;
    windowsNoMagicRoot;
    regexp;
    constructor(t, e = {}) {
      C(t),
        (e = e || {}),
        (this.options = e),
        (this.pattern = t),
        (this.platform = e.platform || pt),
        (this.isWindows = this.platform === "win32"),
        (this.windowsPathsNoEscape =
          !!e.windowsPathsNoEscape || e.allowWindowsEscape === !1),
        this.windowsPathsNoEscape &&
          (this.pattern = this.pattern.replace(/\\/g, "/")),
        (this.preserveMultipleSlashes = !!e.preserveMultipleSlashes),
        (this.regexp = null),
        (this.negate = !1),
        (this.nonegate = !!e.nonegate),
        (this.comment = !1),
        (this.empty = !1),
        (this.partial = !!e.partial),
        (this.nocase = !!this.options.nocase),
        (this.windowsNoMagicRoot =
          e.windowsNoMagicRoot !== void 0
            ? e.windowsNoMagicRoot
            : !!(this.isWindows && this.nocase)),
        (this.globSet = []),
        (this.globParts = []),
        (this.set = []),
        this.make();
    }
    hasMagic() {
      if (this.options.magicalBraces && this.set.length > 1) return !0;
      for (let t of this.set)
        for (let e of t) if (typeof e != "string") return !0;
      return !1;
    }
    debug(...t) {}
    make() {
      let t = this.pattern,
        e = this.options;
      if (!e.nocomment && t.charAt(0) === "#") {
        this.comment = !0;
        return;
      }
      if (!t) {
        this.empty = !0;
        return;
      }
      this.parseNegate(),
        (this.globSet = [...new Set(this.braceExpand())]),
        e.debug && (this.debug = (...r) => console.error(...r)),
        this.debug(this.pattern, this.globSet);
      let s = this.globSet.map((r) => this.slashSplit(r));
      (this.globParts = this.preprocess(s)),
        this.debug(this.pattern, this.globParts);
      let n = this.globParts.map((r, o, h) => {
        if (this.isWindows && this.windowsNoMagicRoot) {
          let a =
              r[0] === "" &&
              r[1] === "" &&
              (r[2] === "?" || !at.test(r[2])) &&
              !at.test(r[3]),
            c = /^[a-z]:/i.test(r[0]);
          if (a)
            return [...r.slice(0, 4), ...r.slice(4).map((l) => this.parse(l))];
          if (c) return [r[0], ...r.slice(1).map((l) => this.parse(l))];
        }
        return r.map((a) => this.parse(a));
      });
      if (
        (this.debug(this.pattern, n),
        (this.set = n.filter((r) => r.indexOf(!1) === -1)),
        this.isWindows)
      )
        for (let r = 0; r < this.set.length; r++) {
          let o = this.set[r];
          o[0] === "" &&
            o[1] === "" &&
            this.globParts[r][2] === "?" &&
            typeof o[3] == "string" &&
            /^[a-z]:$/i.test(o[3]) &&
            (o[2] = "?");
        }
      this.debug(this.pattern, this.set);
    }
    preprocess(t) {
      if (this.options.noglobstar)
        for (let s = 0; s < t.length; s++)
          for (let n = 0; n < t[s].length; n++)
            t[s][n] === "**" && (t[s][n] = "*");
      let { optimizationLevel: e = 1 } = this.options;
      return (
        e >= 2
          ? ((t = this.firstPhasePreProcess(t)),
            (t = this.secondPhasePreProcess(t)))
          : e >= 1
          ? (t = this.levelOneOptimize(t))
          : (t = this.adjascentGlobstarOptimize(t)),
        t
      );
    }
    adjascentGlobstarOptimize(t) {
      return t.map((e) => {
        let s = -1;
        for (; (s = e.indexOf("**", s + 1)) !== -1; ) {
          let n = s;
          for (; e[n + 1] === "**"; ) n++;
          n !== s && e.splice(s, n - s);
        }
        return e;
      });
    }
    levelOneOptimize(t) {
      return t.map(
        (e) => (
          (e = e.reduce((s, n) => {
            let r = s[s.length - 1];
            return n === "**" && r === "**"
              ? s
              : n === ".." && r && r !== ".." && r !== "." && r !== "**"
              ? (s.pop(), s)
              : (s.push(n), s);
          }, [])),
          e.length === 0 ? [""] : e
        )
      );
    }
    levelTwoFileOptimize(t) {
      Array.isArray(t) || (t = this.slashSplit(t));
      let e = !1;
      do {
        if (((e = !1), !this.preserveMultipleSlashes)) {
          for (let n = 1; n < t.length - 1; n++) {
            let r = t[n];
            (n === 1 && r === "" && t[0] === "") ||
              ((r === "." || r === "") && ((e = !0), t.splice(n, 1), n--));
          }
          t[0] === "." &&
            t.length === 2 &&
            (t[1] === "." || t[1] === "") &&
            ((e = !0), t.pop());
        }
        let s = 0;
        for (; (s = t.indexOf("..", s + 1)) !== -1; ) {
          let n = t[s - 1];
          n &&
            n !== "." &&
            n !== ".." &&
            n !== "**" &&
            ((e = !0), t.splice(s - 1, 2), (s -= 2));
        }
      } while (e);
      return t.length === 0 ? [""] : t;
    }
    firstPhasePreProcess(t) {
      let e = !1;
      do {
        e = !1;
        for (let s of t) {
          let n = -1;
          for (; (n = s.indexOf("**", n + 1)) !== -1; ) {
            let o = n;
            for (; s[o + 1] === "**"; ) o++;
            o > n && s.splice(n + 1, o - n);
            let h = s[n + 1],
              a = s[n + 2],
              c = s[n + 3];
            if (
              h !== ".." ||
              !a ||
              a === "." ||
              a === ".." ||
              !c ||
              c === "." ||
              c === ".."
            )
              continue;
            (e = !0), s.splice(n, 1);
            let l = s.slice(0);
            (l[n] = "**"), t.push(l), n--;
          }
          if (!this.preserveMultipleSlashes) {
            for (let o = 1; o < s.length - 1; o++) {
              let h = s[o];
              (o === 1 && h === "" && s[0] === "") ||
                ((h === "." || h === "") && ((e = !0), s.splice(o, 1), o--));
            }
            s[0] === "." &&
              s.length === 2 &&
              (s[1] === "." || s[1] === "") &&
              ((e = !0), s.pop());
          }
          let r = 0;
          for (; (r = s.indexOf("..", r + 1)) !== -1; ) {
            let o = s[r - 1];
            if (o && o !== "." && o !== ".." && o !== "**") {
              e = !0;
              let a = r === 1 && s[r + 1] === "**" ? ["."] : [];
              s.splice(r - 1, 2, ...a), s.length === 0 && s.push(""), (r -= 2);
            }
          }
        }
      } while (e);
      return t;
    }
    secondPhasePreProcess(t) {
      for (let e = 0; e < t.length - 1; e++)
        for (let s = e + 1; s < t.length; s++) {
          let n = this.partsMatch(t[e], t[s], !this.preserveMultipleSlashes);
          if (n) {
            (t[e] = []), (t[s] = n);
            break;
          }
        }
      return t.filter((e) => e.length);
    }
    partsMatch(t, e, s = !1) {
      let n = 0,
        r = 0,
        o = [],
        h = "";
      for (; n < t.length && r < e.length; )
        if (t[n] === e[r]) o.push(h === "b" ? e[r] : t[n]), n++, r++;
        else if (s && t[n] === "**" && e[r] === t[n + 1]) o.push(t[n]), n++;
        else if (s && e[r] === "**" && t[n] === e[r + 1]) o.push(e[r]), r++;
        else if (
          t[n] === "*" &&
          e[r] &&
          (this.options.dot || !e[r].startsWith(".")) &&
          e[r] !== "**"
        ) {
          if (h === "b") return !1;
          (h = "a"), o.push(t[n]), n++, r++;
        } else if (
          e[r] === "*" &&
          t[n] &&
          (this.options.dot || !t[n].startsWith(".")) &&
          t[n] !== "**"
        ) {
          if (h === "a") return !1;
          (h = "b"), o.push(e[r]), n++, r++;
        } else return !1;
      return t.length === e.length && o;
    }
    parseNegate() {
      if (this.nonegate) return;
      let t = this.pattern,
        e = !1,
        s = 0;
      for (let n = 0; n < t.length && t.charAt(n) === "!"; n++) (e = !e), s++;
      s && (this.pattern = t.slice(s)), (this.negate = e);
    }
    matchOne(t, e, s = !1) {
      let n = this.options;
      if (this.isWindows) {
        let f = typeof t[0] == "string" && /^[a-z]:$/i.test(t[0]),
          w =
            !f &&
            t[0] === "" &&
            t[1] === "" &&
            t[2] === "?" &&
            /^[a-z]:$/i.test(t[3]),
          S = typeof e[0] == "string" && /^[a-z]:$/i.test(e[0]),
          O =
            !S &&
            e[0] === "" &&
            e[1] === "" &&
            e[2] === "?" &&
            typeof e[3] == "string" &&
            /^[a-z]:$/i.test(e[3]),
          E = w ? 3 : f ? 0 : void 0,
          b = O ? 3 : S ? 0 : void 0;
        if (typeof E == "number" && typeof b == "number") {
          let [T, y] = [t[E], e[b]];
          T.toLowerCase() === y.toLowerCase() &&
            ((e[b] = T), b > E ? (e = e.slice(b)) : E > b && (t = t.slice(E)));
        }
      }
      let { optimizationLevel: r = 1 } = this.options;
      r >= 2 && (t = this.levelTwoFileOptimize(t)),
        this.debug("matchOne", this, { file: t, pattern: e }),
        this.debug("matchOne", t.length, e.length);
      for (
        var o = 0, h = 0, a = t.length, c = e.length;
        o < a && h < c;
        o++, h++
      ) {
        this.debug("matchOne loop");
        var l = e[h],
          g = t[o];
        if ((this.debug(e, l, g), l === !1)) return !1;
        if (l === v) {
          this.debug("GLOBSTAR", [e, l, g]);
          var u = o,
            p = h + 1;
          if (p === c) {
            for (this.debug("** at the end"); o < a; o++)
              if (
                t[o] === "." ||
                t[o] === ".." ||
                (!n.dot && t[o].charAt(0) === ".")
              )
                return !1;
            return !0;
          }
          for (; u < a; ) {
            var d = t[u];
            if (
              (this.debug(
                `
globstar while`,
                t,
                u,
                e,
                p,
                d
              ),
              this.matchOne(t.slice(u), e.slice(p), s))
            )
              return this.debug("globstar found match!", u, a, d), !0;
            if (d === "." || d === ".." || (!n.dot && d.charAt(0) === ".")) {
              this.debug("dot detected!", t, u, e, p);
              break;
            }
            this.debug("globstar swallow a segment, and continue"), u++;
          }
          return !!(
            s &&
            (this.debug(
              `
>>> no match, partial?`,
              t,
              u,
              e,
              p
            ),
            u === a)
          );
        }
        let f;
        if (
          (typeof l == "string"
            ? ((f = g === l), this.debug("string match", l, g, f))
            : ((f = l.test(g)), this.debug("pattern match", l, g, f)),
          !f)
        )
          return !1;
      }
      if (o === a && h === c) return !0;
      if (o === a) return s;
      if (h === c) return o === a - 1 && t[o] === "";
      throw new Error("wtf?");
    }
    braceExpand() {
      return ft(this.pattern, this.options);
    }
    parse(t) {
      C(t);
      let e = this.options;
      if (t === "**") return v;
      if (t === "") return "";
      let s,
        n = null;
      (s = t.match(Zt))
        ? (n = e.dot ? Vt : Jt)
        : (s = t.match(kt))
        ? (n = (e.nocase ? (e.dot ? It : qt) : e.dot ? Gt : zt)(s[1]))
        : (s = t.match(Xt))
        ? (n = (e.nocase ? (e.dot ? Qt : Kt) : e.dot ? Yt : te)(s))
        : (s = t.match(Bt))
        ? (n = e.dot ? Ft : _t)
        : (s = t.match(Ht)) && (n = Ut);
      let r = N.fromGlob(t, this.options).toMMPattern();
      return (
        n &&
          typeof r == "object" &&
          Reflect.defineProperty(r, "test", { value: n }),
        r
      );
    }
    makeRe() {
      if (this.regexp || this.regexp === !1) return this.regexp;
      let t = this.set;
      if (!t.length) return (this.regexp = !1), this.regexp;
      let e = this.options,
        s = e.noglobstar ? ie : e.dot ? ne : re,
        n = new Set(e.nocase ? ["i"] : []),
        r = t
          .map((a) => {
            let c = a.map((l) => {
              if (l instanceof RegExp)
                for (let g of l.flags.split("")) n.add(g);
              return typeof l == "string" ? le(l) : l === v ? v : l._src;
            });
            return (
              c.forEach((l, g) => {
                let u = c[g + 1],
                  p = c[g - 1];
                l !== v ||
                  p === v ||
                  (p === void 0
                    ? u !== void 0 && u !== v
                      ? (c[g + 1] = "(?:\\/|" + s + "\\/)?" + u)
                      : (c[g] = s)
                    : u === void 0
                    ? (c[g - 1] = p + "(?:\\/|" + s + ")?")
                    : u !== v &&
                      ((c[g - 1] = p + "(?:\\/|\\/" + s + "\\/)" + u),
                      (c[g + 1] = v)));
              }),
              c.filter((l) => l !== v).join("/")
            );
          })
          .join("|"),
        [o, h] = t.length > 1 ? ["(?:", ")"] : ["", ""];
      (r = "^" + o + r + h + "$"), this.negate && (r = "^(?!" + r + ").+$");
      try {
        this.regexp = new RegExp(r, [...n].join(""));
      } catch {
        this.regexp = !1;
      }
      return this.regexp;
    }
    slashSplit(t) {
      return this.preserveMultipleSlashes
        ? t.split("/")
        : this.isWindows && /^\/\/[^\/]+/.test(t)
        ? ["", ...t.split(/\/+/)]
        : t.split(/\/+/);
    }
    match(t, e = this.partial) {
      if ((this.debug("match", t, this.pattern), this.comment)) return !1;
      if (this.empty) return t === "";
      if (t === "/" && e) return !0;
      let s = this.options;
      this.isWindows && (t = t.split("\\").join("/"));
      let n = this.slashSplit(t);
      this.debug(this.pattern, "split", n);
      let r = this.set;
      this.debug(this.pattern, "set", r);
      let o = n[n.length - 1];
      if (!o) for (let h = n.length - 2; !o && h >= 0; h--) o = n[h];
      for (let h = 0; h < r.length; h++) {
        let a = r[h],
          c = n;
        if (
          (s.matchBase && a.length === 1 && (c = [o]), this.matchOne(c, a, e))
        )
          return s.flipNegate ? !0 : !this.negate;
      }
      return s.flipNegate ? !1 : this.negate;
    }
    static defaults(t) {
      return m.defaults(t).Minimatch;
    }
  };
m.AST = N;
m.Minimatch = $;
m.escape = z;
m.unescape = M;
var L = class {
  static async execute(t) {
    console.log(m);
    let e = t.Records[0].cf.request,
      s = e.uri;
    return (
      console.log("\u2605\u2605\u2605\u2605\u2605"),
      console.log("test"),
      console.log(s),
      e
    );
  }
};
var Le = async (i) => await L.execute(i);
export { Le as handler };
