!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.ExifReader = t() : e.ExifReader = t()
}(this, function() {
    return function(e) {
        function t(r) {
            if (n[r])
                return n[r].exports;
            var i = n[r] = {
                exports: {},
                id: r,
                loaded: !1
            };
            return e[r].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports
        }
        var n = {};
        return t.m = e, t.c = n, t.p = "", t(0)
    }([function(e, t, n) {
        var r,
            i,
            o;
        !function(a, u) {
            i = [t, n(1), n(3), n(12), n(14), n(16)], r = u, o = "function" == typeof r ? r.apply(t, i) : r, !(void 0 !== o && (e.exports = o))
        }(this, function(e, t, n, r, i, o) {
            "use strict";
            function a(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function u(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                        expanded: !1
                    },
                    n = void 0;
                try {
                    n = new DataView(e)
                } catch (e) {
                    return console.warn("Warning: A full DataView implementation is not available. If you're using Node.js you probably want to do this:\n  1. Install a DataView polyfill, e.g. jdataview: npm install --save jdataview\n  2. Require that at the top of your script: global.DataView = require('jdataview');\nSee an example of this in the ExifReader example directory."), {}
                }
                return c(n, t)
            }
            function c(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                        expanded: !1
                    },
                    n = !1,
                    r = {};
                l.default.check(e);
                var i = l.default.parseAppMarkers(e),
                    o = i.tiffHeaderOffset,
                    a = i.iptcDataOffset,
                    u = i.xmpDataOffset,
                    c = i.xmpFieldLength;
                if (d(o)) {
                    n = !0;
                    var y = p.default.read(e, o);
                    t.expanded ? r.exif = y : r = h({}, r, y)
                }
                if (f(a)) {
                    n = !0;
                    var S = m.default.read(e, a);
                    t.expanded ? r.iptc = S : r = h({}, r, S)
                }
                if (s(u)) {
                    n = !0;
                    var b = v.default.read(e, u, c);
                    t.expanded ? r.xmp = b : r = h({}, r, b)
                }
                if (!n)
                    throw new g.default.MetadataMissingError;
                return r
            }
            function d(e) {
                return void 0 !== e
            }
            function f(e) {
                return void 0 !== e
            }
            function s(e) {
                return void 0 !== e
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.load = u, e.loadView = c;
            var l = a(t),
                p = a(n),
                m = a(r),
                v = a(i),
                g = a(o),
                h = Object.assign || function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var r in n)
                            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                    }
                    return e
                };
            e.default = {
                load: u,
                loadView: c,
                errors: g.default
            }
        })
    }, function(e, t, n) {
        var r,
            i,
            o;
        !function(a, u) {
            i = [t, n(2)], r = u, o = "function" == typeof r ? r.apply(t, i) : r, !(void 0 !== o && (e.exports = o))
        }(this, function(e, t) {
            "use strict";
            function n(e) {
                if (e.byteLength < c || e.getUint16(0, !1) !== d)
                    throw new Error("Invalid image format")
            }
            function r(e) {
                for (var t = f, n = void 0, r = void 0, c = void 0, d = void 0, g = void 0; t + s + 5 <= e.byteLength;) {
                    if (i(e, t))
                        n = e.getUint16(t + l, !1), r = t + p;
                    else if (o(e, t))
                        n = e.getUint16(t + l, !1), d = t + v, g = n - (v - l);
                    else if (a(e, t))
                        n = e.getUint16(t + l, !1), c = t + m;
                    else {
                        if (!u(e, t))
                            break;
                        n = e.getUint16(t + l, !1)
                    }
                    t += l + n
                }
                return {
                    hasAppMarkers: t > f,
                    tiffHeaderOffset: r,
                    iptcDataOffset: c,
                    xmpDataOffset: d,
                    xmpFieldLength: g
                }
            }
            function i(e, n) {
                var r = w.length;
                return e.getUint16(n, !1) === h && (0, t.getStringFromDataView)(e, n + s, r) === w && 0 === e.getUint8(n + s + r, !1)
            }
            function o(e, n) {
                var r = A.length;
                return e.getUint16(n, !1) === h && (0, t.getStringFromDataView)(e, n + s, r) === A && 0 === e.getUint8(n + s + r, !1)
            }
            function a(e, n) {
                var r = P.length;
                return e.getUint16(n, !1) === y && (0, t.getStringFromDataView)(e, n + s, r) === P && 0 === e.getUint8(n + s + r, !1)
            }
            function u(e, t) {
                var n = e.getUint16(t, !1);
                return n >= g && n <= S || n === b
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var c = 2,
                d = 65496,
                f = 2,
                s = 4,
                l = 2,
                p = 10,
                m = 18,
                v = 33,
                g = 65504,
                h = 65505,
                y = 65517,
                S = 65519,
                b = 65534,
                w = "Exif",
                A = "http://ns.adobe.com/xap/1.0/",
                P = "Photoshop 3.0";
            e.default = {
                check: n,
                parseAppMarkers: r
            }
        })
    }, function(e, t, n) {
        var r,
            i,
            o;
        !function(n, a) {
            i = [t], r = a, o = "function" == typeof r ? r.apply(t, i) : r, !(void 0 !== o && (e.exports = o))
        }(this, function(e) {
            "use strict";
            function t(e, t, r) {
                for (var i = [], o = 0; o < r && t + o < e.byteLength; o++)
                    i.push(e.getUint8(t + o, !1));
                return n(i).join("")
            }
            function n(e) {
                return e.map(function(e) {
                    return String.fromCharCode(e)
                })
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.getStringFromDataView = t
        })
    }, function(e, t, n) {
        var r,
            i,
            o;
        !function(a, u) {
            i = [t, n(4), n(5), n(6)], r = u, o = "function" == typeof r ? r.apply(t, i) : r, !(void 0 !== o && (e.exports = o))
        }(this, function(e, t, n, r) {
            "use strict";
            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function o(e, t) {
                var n = y.default.getByteOrder(e, t),
                    r = a(e, t, n);
                return r = c(r, e, t, n), r = d(r, e, t, n), r = f(r, e, t, n)
            }
            function a(e, t, n) {
                return s(e, "0th", t, u(e, t, n), n)
            }
            function u(e, t, n) {
                return t + S.default.getLongAt(e, t + 4, n)
            }
            function c(e, t, n, r) {
                return void 0 !== e[A] ? w(e, s(t, "exif", n, n + e[A].value, r)) : e
            }
            function d(e, t, n, r) {
                return void 0 !== e[P] ? w(e, s(t, "gps", n, n + e[P].value, r)) : e
            }
            function f(e, t, n, r) {
                return void 0 !== e[C] ? w(e, s(t, "interoperability", n, n + e[C].value, r)) : e
            }
            function s(e, t, n, r, i) {
                var o = S.default.getTypeSize("SHORT"),
                    a = 12,
                    u = {},
                    c = S.default.getShortAt(e, r, i);
                r += o;
                for (var d = 0; d < c; d++) {
                    var f = l(e, t, n, r, i);
                    void 0 !== f && (u[f.name] = {
                        value: f.value,
                        description: f.description
                    }), r += a
                }
                return u
            }
            function l(e, t, n, r, i) {
                var o = S.default.getTypeSize("SHORT"),
                    a = o + S.default.getTypeSize("SHORT"),
                    u = a + S.default.getTypeSize("LONG"),
                    c = S.default.getShortAt(e, r, i),
                    d = S.default.getShortAt(e, r + o, i),
                    f = S.default.getLongAt(e, r + a, i),
                    s = void 0;
                if (void 0 !== S.default.typeSizes[d]) {
                    if (p(d, f))
                        s = m(e, r + u, d, f, i);
                    else {
                        var l = S.default.getLongAt(e, r + u, i);
                        s = v(e, n, l, d, f) ? m(e, n + l, d, f, i) : "<faulty value>"
                    }
                    if (d === S.default.tagTypes.ASCII && (s = g(s), s = h(s)), void 0 !== b.default[t][c]) {
                        var y = void 0,
                            w = void 0;
                        return void 0 !== b.default[t][c].name && void 0 !== b.default[t][c].description ? (y = b.default[t][c].name, w = b.default[t][c].description(s)) : (y = b.default[t][c], w = s instanceof Array ? s.join(", ") : s), {
                            name: y,
                            value: s,
                            description: w
                        }
                    }
                    return {
                        name: "undefined-" + c,
                        value: s,
                        description: s
                    }
                }
            }
            function p(e, t) {
                return S.default.typeSizes[e] * t <= S.default.getTypeSize("LONG")
            }
            function m(e, t, n, r, i) {
                for (var o = [], a = 0; a < r; a++)
                    o.push(D[n](e, t, i)), t += S.default.typeSizes[n];
                return n === S.default.tagTypes.ASCII ? o = S.default.getAsciiValue(o) : 1 === o.length && (o = o[0]), o
            }
            function v(e, t, n, r, i) {
                return t + n + S.default.typeSizes[r] * i <= e.byteLength
            }
            function g(e) {
                var t = [],
                    n = 0,
                    r = !0,
                    i = !1,
                    o = void 0;
                try {
                    for (var a, u = e[Symbol.iterator](); !(r = (a = u.next()).done); r = !0) {
                        var c = a.value;
                        "\0" !== c ? (void 0 === t[n] && (t[n] = ""), t[n] += c) : n++
                    }
                } catch (e) {
                    i = !0, o = e
                } finally {
                    try {
                        !r && u.return && u.return()
                    } finally {
                        if (i)
                            throw o
                    }
                }
                return t
            }
            function h(e) {
                try {
                    return e.map(function(e) {
                        return decodeURIComponent(escape(e))
                    })
                } catch (t) {
                    return e
                }
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var y = i(t),
                S = i(n),
                b = i(r),
                w = Object.assign || function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var r in n)
                            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                    }
                    return e
                },
                A = "Exif IFD Pointer",
                P = "GPS Info IFD Pointer",
                C = "Interoperability IFD Pointer",
                D = {
                    1: S.default.getByteAt,
                    2: S.default.getAsciiAt,
                    3: S.default.getShortAt,
                    4: S.default.getLongAt,
                    5: S.default.getRationalAt,
                    7: S.default.getUndefinedAt,
                    9: S.default.getSlongAt,
                    10: S.default.getSrationalAt
                };
            e.default = {
                read: o
            }
        })
    }, function(e, t, n) {
        var r,
            i,
            o;
        !function(n, a) {
            i = [t], r = a, o = "function" == typeof r ? r.apply(t, i) : r, !(void 0 !== o && (e.exports = o))
        }(this, function(e) {
            "use strict";
            function t(e, t) {
                if (e.getUint16(t) === n)
                    return n;
                if (e.getUint16(t) === r)
                    return r;
                throw new Error("Illegal byte order value. Faulty image.")
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var n = 18761,
                r = 19789;
            e.default = {
                BIG_ENDIAN: r,
                LITTLE_ENDIAN: n,
                getByteOrder: t
            }
        })
    }, function(e, t, n) {
        var r,
            i,
            o;
        !function(a, u) {
            i = [t, n(4)], r = u, o = "function" == typeof r ? r.apply(t, i) : r, !(void 0 !== o && (e.exports = o))
        }(this, function(e, t) {
            "use strict";
            function n(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function r(e) {
                return e.map(function(e) {
                    return String.fromCharCode(e)
                })
            }
            function i(e, t) {
                return e.getUint8(t)
            }
            function o(e, t) {
                return e.getUint8(t)
            }
            function a(e, t, n) {
                return e.getUint16(t, n === p.default.LITTLE_ENDIAN)
            }
            function u(e, t, n) {
                return e.getUint32(t, n === p.default.LITTLE_ENDIAN)
            }
            function c(e, t, n) {
                return u(e, t, n) / u(e, t + 4, n)
            }
            function d(e, t) {
                return i(e, t)
            }
            function f(e, t, n) {
                return e.getInt32(t, n === p.default.LITTLE_ENDIAN)
            }
            function s(e, t, n) {
                return f(e, t, n) / f(e, t + 4, n)
            }
            function l(e) {
                if (void 0 === v[e])
                    throw new Error("No such type found.");
                return m[v[e]]
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var p = n(t),
                m = {
                    1: 1,
                    2: 1,
                    3: 2,
                    4: 4,
                    5: 8,
                    7: 1,
                    9: 4,
                    10: 8
                },
                v = {
                    BYTE: 1,
                    ASCII: 2,
                    SHORT: 3,
                    LONG: 4,
                    RATIONAL: 5,
                    UNDEFINED: 7,
                    SLONG: 9,
                    SRATIONAL: 10
                };
            e.default = {
                getAsciiValue: r,
                getByteAt: i,
                getAsciiAt: o,
                getShortAt: a,
                getLongAt: u,
                getRationalAt: c,
                getUndefinedAt: d,
                getSlongAt: f,
                getSrationalAt: s,
                typeSizes: m,
                tagTypes: v,
                getTypeSize: l
            }
        })
    }, function(e, t, n) {
        var r,
            i,
            o;
        !function(a, u) {
            i = [t, n(7), n(8), n(10), n(11)], r = u, o = "function" == typeof r ? r.apply(t, i) : r, !(void 0 !== o && (e.exports = o))
        }(this, function(e, t, n, r, i) {
            "use strict";
            function o(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var a = o(t),
                u = o(n),
                c = o(r),
                d = o(i);
            e.default = {
                "0th": a.default,
                exif: u.default,
                gps: c.default,
                interoperability: d.default
            }
        })
    }, function(e, t, n) {
        var r,
            i,
            o;
        !function(n, a) {
            i = [t], r = a, o = "function" == typeof r ? r.apply(t, i) : r, !(void 0 !== o && (e.exports = o))
        }(this, function(e) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = {
                256: "ImageWidth",
                257: "ImageLength",
                258: "BitsPerSample",
                259: "Compression",
                262: "PhotometricInterpretation",
                270: "ImageDescription",
                271: "Make",
                272: "Model",
                273: "StripOffsets",
                274: {
                    name: "Orientation",
                    description: function(e) {
                        return 1 === e ? "top-left" : 2 === e ? "top-right" : 3 === e ? "bottom-right" : 4 === e ? "bottom-left" : 5 === e ? "left-top" : 6 === e ? "right-top" : 7 === e ? "right-bottom" : 8 === e ? "left-bottom" : "Undefined"
                    }
                },
                277: "SamplesPerPixel",
                278: "RowsPerStrip",
                279: "StripByteCounts",
                282: "XResolution",
                283: "YResolution",
                284: "PlanarConfiguration",
                296: {
                    name: "ResolutionUnit",
                    description: function(e) {
                        return 2 === e ? "inches" : 3 === e ? "centimeters" : "Unknown"
                    }
                },
                301: "TransferFunction",
                305: "Software",
                306: "DateTime",
                315: "Artist",
                318: "WhitePoint",
                319: "PrimaryChromaticities",
                513: "JPEGInterchangeFormat",
                514: "JPEGInterchangeFormatLength",
                529: "YCbCrCoefficients",
                530: "YCbCrSubSampling",
                531: {
                    name: "YCbCrPositioning",
                    description: function(e) {
                        return 1 === e ? "centered" : 2 === e ? "co-sited" : "undefined " + e
                    }
                },
                532: "ReferenceBlackWhite",
                33432: {
                    name: "Copyright",
                    description: function(e) {
                        return e.join("; ")
                    }
                },
                34665: "Exif IFD Pointer",
                34853: "GPS Info IFD Pointer"
            }
        })
    }, function(e, t, n) {
        var r,
            i,
            o;
        !function(a, u) {
            i = [t, n(9)], r = u, o = "function" == typeof r ? r.apply(t, i) : r, !(void 0 !== o && (e.exports = o))
        }(this, function(e, t) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var n = function() {
                function e(e, t) {
                    var n = [],
                        r = !0,
                        i = !1,
                        o = void 0;
                    try {
                        for (var a, u = e[Symbol.iterator](); !(r = (a = u.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0)
                            ;
                    } catch (e) {
                        i = !0, o = e
                    } finally {
                        try {
                            !r && u.return && u.return()
                        } finally {
                            if (i)
                                throw o
                        }
                    }
                    return n
                }
                return function(t, n) {
                    if (Array.isArray(t))
                        return t;
                    if (Symbol.iterator in Object(t))
                        return e(t, n);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();
            e.default = {
                33434: "ExposureTime",
                33437: "FNumber",
                34850: {
                    name: "ExposureProgram",
                    description: function(e) {
                        return 0 === e ? "Undefined" : 1 === e ? "Manual" : 2 === e ? "Normal program" : 3 === e ? "Aperture priority" : 4 === e ? "Shutter priority" : 5 === e ? "Creative program" : 6 === e ? "Action program" : 7 === e ? "Portrait mode" : 8 === e ? "Landscape mode" : "Unknown"
                    }
                },
                34852: "SpectralSensitivity",
                34855: "ISOSpeedRatings",
                34856: {
                    name: "OECF",
                    description: function() {
                        return "[Raw OECF table data]"
                    }
                },
                36864: {
                    name: "ExifVersion",
                    description: function(e) {
                        return (0, t.getStringValue)(e)
                    }
                },
                36867: "DateTimeOriginal",
                36868: "DateTimeDigitized",
                37121: {
                    name: "ComponentsConfiguration",
                    description: function(e) {
                        return e.map(function(e) {
                            return 49 === e ? "Y" : 50 === e ? "Cb" : 51 === e ? "Cr" : 52 === e ? "R" : 53 === e ? "G" : 54 === e ? "B" : void 0
                        }).join("")
                    }
                },
                37122: "CompressedBitsPerPixel",
                37377: "ShutterSpeedValue",
                37378: "ApertureValue",
                37379: "BrightnessValue",
                37380: "ExposureBiasValue",
                37381: "MaxApertureValue",
                37382: "SubjectDistance",
                37383: {
                    name: "MeteringMode",
                    description: function(e) {
                        return 1 === e ? "Average" : 2 === e ? "CenterWeightedAverage" : 3 === e ? "Spot" : 4 === e ? "MultiSpot" : 5 === e ? "Pattern" : 6 === e ? "Partial" : 255 === e ? "Other" : "Unknown"
                    }
                },
                37384: {
                    name: "LightSource",
                    description: function(e) {
                        return 1 === e ? "Daylight" : 2 === e ? "Fluorescent" : 3 === e ? "Tungsten (incandescent light)" : 4 === e ? "Flash" : 9 === e ? "Fine weather" : 10 === e ? "Cloudy weather" : 11 === e ? "Shade" : 12 === e ? "Daylight fluorescent (D 5700 – 7100K)" : 13 === e ? "Day white fluorescent (N 4600 – 5400K)" : 14 === e ? "Cool white fluorescent (W 3900 – 4500K)" : 15 === e ? "White fluorescent (WW 3200 – 3700K)" : 17 === e ? "Standard light A" : 18 === e ? "Standard light B" : 19 === e ? "Standard light C" : 20 === e ? "D55" : 21 === e ? "D65" : 22 === e ? "D75" : 23 === e ? "D50" : 24 === e ? "ISO studio tungsten" : 255 === e ? "Other light source" : "Unknown"
                    }
                },
                37385: {
                    name: "Flash",
                    description: function(e) {
                        return 0 === e ? "Flash did not fire" : 1 === e ? "Flash fired" : 5 === e ? "Strobe return light not detected" : 7 === e ? "Strobe return light detected" : 9 === e ? "Flash fired, compulsory flash mode" : 13 === e ? "Flash fired, compulsory flash mode, return light not detected" : 15 === e ? "Flash fired, compulsory flash mode, return light detected" : 16 === e ? "Flash did not fire, compulsory flash mode" : 24 === e ? "Flash did not fire, auto mode" : 25 === e ? "Flash fired, auto mode" : 29 === e ? "Flash fired, auto mode, return light not detected" : 31 === e ? "Flash fired, auto mode, return light detected" : 32 === e ? "No flash function" : 65 === e ? "Flash fired, red-eye reduction mode" : 69 === e ? "Flash fired, red-eye reduction mode, return light not detected" : 71 === e ? "Flash fired, red-eye reduction mode, return light detected" : 73 === e ? "Flash fired, compulsory flash mode, red-eye reduction mode" : 77 === e ? "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected" : 79 === e ? "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected" : 89 === e ? "Flash fired, auto mode, red-eye reduction mode" : 93 === e ? "Flash fired, auto mode, return light not detected, red-eye reduction mode" : 95 === e ? "Flash fired, auto mode, return light detected, red-eye reduction mode" : "Unknown"
                    }
                },
                37386: "FocalLength",
                37396: {
                    name: "SubjectArea",
                    description: function(e) {
                        return 2 === e.length ? "Location; X: " + e[0] + ", Y: " + e[1] : 3 === e.length ? "Circle; X: " + e[0] + ", Y: " + e[1] + ", diameter: " + e[2] : 4 === e.length ? "Rectangle; X: " + e[0] + ", Y: " + e[1] + ", width: " + e[2] + ", height: " + e[3] : "Unknown"
                    }
                },
                37500: {
                    name: "MakerNote",
                    description: function() {
                        return "[Raw maker note data]"
                    }
                },
                37510: {
                    name: "UserComment",
                    description: t.getEncodedString
                },
                37520: "SubSecTime",
                37521: "SubSecTimeOriginal",
                37522: "SubSecTimeDigitized",
                40960: {
                    name: "FlashpixVersion",
                    description: function(e) {
                        return e.map(function(e) {
                            return String.fromCharCode(e)
                        }).join("")
                    }
                },
                40961: {
                    name: "ColorSpace",
                    description: function(e) {
                        return 1 === e ? "sRGB" : 65535 === e ? "Uncalibrated" : "Unknown"
                    }
                },
                40962: "PixelXDimension",
                40963: "PixelYDimension",
                40964: "RelatedSoundFile",
                40965: "Interoperability IFD Pointer",
                41483: "FlashEnergy",
                41484: {
                    name: "SpatialFrequencyResponse",
                    description: function() {
                        return "[Raw SFR table data]"
                    }
                },
                41486: "FocalPlaneXResolution",
                41487: "FocalPlaneYResolution",
                41488: {
                    name: "FocalPlaneResolutionUnit",
                    description: function(e) {
                        return 2 === e ? "inches" : 3 === e ? "centimeters" : "Unknown"
                    }
                },
                41492: {
                    name: "SubjectLocation",
                    description: function(e) {
                        var t = n(e, 2),
                            r = t[0],
                            i = t[1];
                        return "X: " + r + ", Y: " + i
                    }
                },
                41493: "ExposureIndex",
                41495: {
                    name: "SensingMethod",
                    description: function(e) {
                        return 1 === e ? "Undefined" : 2 === e ? "One-chip color area sensor" : 3 === e ? "Two-chip color area sensor" : 4 === e ? "Three-chip color area sensor" : 5 === e ? "Color sequential area sensor" : 7 === e ? "Trilinear sensor" : 8 === e ? "Color sequential linear sensor" : "Unknown"
                    }
                },
                41728: {
                    name: "FileSource",
                    description: function(e) {
                        return 3 === e ? "DSC" : "Unknown"
                    }
                },
                41729: {
                    name: "SceneType",
                    description: function(e) {
                        return 1 === e ? "A directly photographed image" : "Unknown"
                    }
                },
                41730: {
                    name: "CFAPattern",
                    description: function() {
                        return "[Raw CFA pattern table data]"
                    }
                },
                41985: {
                    name: "CustomRendered",
                    description: function(e) {
                        return 0 === e ? "Normal process" : 1 === e ? "Custom process" : "Unknown"
                    }
                },
                41986: {
                    name: "ExposureMode",
                    description: function(e) {
                        return 0 === e ? "Auto exposure" : 1 === e ? "Manual exposure" : 2 === e ? "Auto bracket" : "Unknown"
                    }
                },
                41987: {
                    name: "WhiteBalance",
                    description: function(e) {
                        return 0 === e ? "Auto white balance" : 1 === e ? "Manual white balance" : "Unknown"
                    }
                },
                41988: {
                    name: "DigitalZoomRatio",
                    description: function(e) {
                        return 0 === e ? "Digital zoom was not used" : e
                    }
                },
                41989: {
                    name: "FocalLengthIn35mmFilm",
                    description: function(e) {
                        return 0 === e ? "Unknown" : e
                    }
                },
                41990: {
                    name: "SceneCaptureType",
                    description: function(e) {
                        return 0 === e ? "Standard" : 1 === e ? "Landscape" : 2 === e ? "Portrait" : 3 === e ? "Night scene" : "Unknown"
                    }
                },
                41991: {
                    name: "GainControl",
                    description: function(e) {
                        return 0 === e ? "None" : 1 === e ? "Low gain up" : 2 === e ? "High gain up" : 3 === e ? "Low gain down" : 4 === e ? "High gain down" : "Unknown"
                    }
                },
                41992: {
                    name: "Contrast",
                    description: function(e) {
                        return 0 === e ? "Normal" : 1 === e ? "Soft" : 2 === e ? "Hard" : "Unknown"
                    }
                },
                41993: {
                    name: "Saturation",
                    description: function(e) {
                        return 0 === e ? "Normal" : 1 === e ? "Low saturation" : 2 === e ? "High saturation" : "Unknown"
                    }
                },
                41994: {
                    name: "Sharpness",
                    description: function(e) {
                        return 0 === e ? "Normal" : 1 === e ? "Soft" : 2 === e ? "Hard" : "Unknown"
                    }
                },
                41995: {
                    name: "DeviceSettingDescription",
                    description: function() {
                        return "[Raw device settings table data]"
                    }
                },
                41996: {
                    name: "SubjectDistanceRange",
                    description: function(e) {
                        return 1 === e ? "Macro" : 2 === e ? "Close view" : 3 === e ? "Distant view" : "Unknown"
                    }
                },
                42016: "ImageUniqueID"
            }
        })
    }, function(e, t, n) {
        var r,
            i,
            o;
        !function(n, a) {
            i = [t], r = a, o = "function" == typeof r ? r.apply(t, i) : r, !(void 0 !== o && (e.exports = o))
        }(this, function(e) {
            "use strict";
            function t(e) {
                return e.map(function(e) {
                    return String.fromCharCode(e)
                }).join("")
            }
            function n(e) {
                if (e.length >= 8) {
                    var n = t(e.slice(0, 8));
                    if ("ASCII\0\0\0" === n)
                        return t(e.slice(8));
                    if ("JIS\0\0\0\0\0" === n)
                        return "[JIS encoded text]";
                    if ("UNICODE\0" === n)
                        return "[Unicode encoded text]";
                    if ("\0\0\0\0\0\0\0\0" === n)
                        return "[Undefined encoding]"
                }
                return "Undefined"
            }
            function r(e) {
                return e.split("").map(function(e) {
                    return e.charCodeAt(0)
                })
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.getStringValue = t, e.getEncodedString = n, e.getCharacterArray = r
        })
    }, function(e, t, n) {
        var r,
            i,
            o;
        !function(a, u) {
            i = [t, n(9)], r = u, o = "function" == typeof r ? r.apply(t, i) : r, !(void 0 !== o && (e.exports = o))
        }(this, function(e, t) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = {
                0: {
                    name: "GPSVersionID",
                    description: function(e) {
                        return 2 === e[0] && 2 === e[1] && 0 === e[2] && 0 === e[3] ? "Version 2.2" : "Unknown"
                    }
                },
                1: {
                    name: "GPSLatitudeRef",
                    description: function(e) {
                        var t = e.join("");
                        return "N" === t ? "North latitude" : "S" === t ? "South latitude" : "Unknown"
                    }
                },
                2: {
                    name: "GPSLatitude",
                    description: function(e) {
                        return e[0] + e[1] / 60 + e[2] / 3600
                    }
                },
                3: {
                    name: "GPSLongitudeRef",
                    description: function(e) {
                        var t = e.join("");
                        return "E" === t ? "East longitude" : "W" === t ? "West longitude" : "Unknown"
                    }
                },
                4: {
                    name: "GPSLongitude",
                    description: function(e) {
                        return e[0] + e[1] / 60 + e[2] / 3600
                    }
                },
                5: {
                    name: "GPSAltitudeRef",
                    description: function(e) {
                        return 0 === e ? "Sea level" : 1 === e ? "Sea level reference (negative value)" : "Unknown"
                    }
                },
                6: {
                    name: "GPSAltitude",
                    description: function(e) {
                        return e + " m"
                    }
                },
                7: {
                    name: "GPSTimeStamp",
                    description: function(e) {
                        return e.map(function(e) {
                            return 1 === ("" + e).length ? "0" + e : e
                        }).join(":")
                    }
                },
                8: "GPSSatellites",
                9: {
                    name: "GPSStatus",
                    description: function(e) {
                        var t = e.join("");
                        return "A" === t ? "Measurement in progress" : "V" === t ? "Measurement Interoperability" : "Unknown"
                    }
                },
                10: {
                    name: "GPSMeasureMode",
                    description: function(e) {
                        var t = e.join("");
                        return "2" === t ? "2-dimensional measurement" : "3" === t ? "3-dimensional measurement" : "Unknown"
                    }
                },
                11: "GPSDOP",
                12: {
                    name: "GPSSpeedRef",
                    description: function(e) {
                        var t = e.join("");
                        return "K" === t ? "Kilometers per hour" : "M" === t ? "Miles per hour" : "N" === t ? "Knots" : "Unknown"
                    }
                },
                13: "GPSSpeed",
                14: {
                    name: "GPSTrackRef",
                    description: function(e) {
                        var t = e.join("");
                        return "T" === t ? "True direction" : "M" === t ? "Magnetic direction" : "Unknown"
                    }
                },
                15: "GPSTrack",
                16: {
                    name: "GPSImgDirectionRef",
                    description: function(e) {
                        var t = e.join("");
                        return "T" === t ? "True direction" : "M" === t ? "Magnetic direction" : "Unknown"
                    }
                },
                17: "GPSImgDirection",
                18: "GPSMapDatum",
                19: {
                    name: "GPSDestLatitudeRef",
                    description: function(e) {
                        var t = e.join("");
                        return "N" === t ? "North latitude" : "S" === t ? "South latitude" : "Unknown"
                    }
                },
                20: {
                    name: "GPSDestLatitude",
                    description: function(e) {
                        return e[0] + e[1] / 60 + e[2] / 3600
                    }
                },
                21: {
                    name: "GPSDestLongitudeRef",
                    description: function(e) {
                        var t = e.join("");
                        return "E" === t ? "East longitude" : "W" === t ? "West longitude" : "Unknown"
                    }
                },
                22: {
                    name: "GPSDestLongitude",
                    description: function(e) {
                        return e[0] + e[1] / 60 + e[2] / 3600
                    }
                },
                23: {
                    name: "GPSDestBearingRef",
                    description: function(e) {
                        var t = e.join("");
                        return "T" === t ? "True direction" : "M" === t ? "Magnetic direction" : "Unknown"
                    }
                },
                24: "GPSDestBearing",
                25: {
                    name: "GPSDestDistanceRef",
                    description: function(e) {
                        var t = e.join("");
                        return "K" === t ? "Kilometers" : "M" === t ? "Miles" : "N" === t ? "Knots" : "Unknown"
                    }
                },
                26: "GPSDestDistance",
                27: {
                    name: "GPSProcessingMethod",
                    description: t.getEncodedString
                },
                28: {
                    name: "GPSAreaInformation",
                    description: t.getEncodedString
                },
                29: "GPSDateStamp",
                30: {
                    name: "GPSDifferential",
                    description: function(e) {
                        return 0 === e ? "Measurement without differential correction" : 1 === e ? "Differential correction applied" : "Unknown"
                    }
                }
            }
        })
    }, function(e, t, n) {
        var r,
            i,
            o;
        !function(n, a) {
            i = [t], r = a, o = "function" == typeof r ? r.apply(t, i) : r, !(void 0 !== o && (e.exports = o))
        }(this, function(e) {
            "use strict";
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = {
                1: "InteroperabilityIndex"
            }
        })
    }, function(e, t, n) {
        var r,
            i,
            o;
        !function(a, u) {
            i = [t, n(13)], r = u, o = "function" == typeof r ? r.apply(t, i) : r, !(void 0 !== o && (e.exports = o))
        }(this, function(e, t) {
            "use strict";
            function n(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function r(e, t) {
                try {
                    var n = i(e, t),
                        r = n.naaBlock,
                        o = n.dataOffset;
                    return c(e, r, o)
                } catch (e) {
                    return {}
                }
            }
            function i(e, t) {
                for (; t + v <= e.byteLength;) {
                    var n = o(e, t);
                    if (a(n))
                        return {
                            naaBlock: n,
                            dataOffset: t
                        };
                    t += v + n.size + u(n.size)
                }
                throw new Error("No IPTC NAA resource block.")
            }
            function o(e, t) {
                var n = 10;
                if (e.getUint32(t, !1) !== p)
                    throw new Error("Not an IPTC resource block.");
                return {
                    type: e.getUint16(t + m, !1),
                    size: e.getUint16(t + n, !1)
                }
            }
            function a(e) {
                return e.type === g
            }
            function u(e) {
                return e % 2 !== 0 ? 1 : 0
            }
            function c(e, t, n) {
                var r = {};
                n += v;
                for (var i = n + t.size; n < i && n < e.byteLength;) {
                    var o = d(e, n, r),
                        a = o.tag,
                        u = o.tagSize;
                    void 0 === r[a.name] || void 0 === a.repeatable ? r[a.name] = {
                        value: a.value,
                        description: a.description
                    } : (r[a.name] instanceof Array || (r[a.name] = [{
                        value: r[a.name].value,
                        description: r[a.name].description
                    }]), r[a.name].push({
                        value: a.value,
                        description: a.description
                    })), n += h + u
                }
                return r
            }
            function d(e, t, n) {
                var r = 1,
                    i = 3,
                    o = e.getUint16(t + r, !1),
                    a = e.getUint16(t + i, !1),
                    u = f(e, t + h, a),
                    c = void 0;
                if (void 0 !== l.default.iptc[o]) {
                    var d = void 0,
                        p = void 0;
                    void 0 !== l.default.iptc[o].name && void 0 !== l.default.iptc[o].description ? (d = l.default.iptc[o].name, p = l.default.iptc[o].description(u, n)) : (d = void 0 !== l.default.iptc[o].name ? l.default.iptc[o].name : l.default.iptc[o], u instanceof Array ? (p = u.map(function(e) {
                        return String.fromCharCode(e)
                    }).join(""), p = s(p)) : p = u), c = {
                        name: d,
                        value: u,
                        description: p
                    }, void 0 !== l.default.iptc[o].repeatable && (c.repeatable = !0)
                } else
                    c = {
                        name: "undefined-" + o,
                        value: u,
                        description: u
                    };
                return {
                    tag: c,
                    tagSize: a
                }
            }
            function f(e, t, n) {
                for (var r = [], i = 0; i < n; i++)
                    r.push(e.getUint8(t + i));
                return r
            }
            function s(e) {
                try {
                    return decodeURIComponent(escape(e))
                } catch (t) {
                    return e
                }
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var l = n(t),
                p = 943868237,
                m = 4,
                v = m + 8,
                g = 1028,
                h = 5;
            e.default = {
                read: r
            }
        })
    }, function(e, t, n) {
        var r,
            i,
            o;
        !function(a, u) {
            i = [t, n(9)], r = u, o = "function" == typeof r ? r.apply(t, i) : r, !(void 0 !== o && (e.exports = o))
        }(this, function(e, t) {
            "use strict";
            function n(e) {
                var n = (0, t.getStringValue)(e);
                return n.length >= 8 ? n.substr(0, 4) + "-" + n.substr(4, 2) + "-" + n.substr(6, 2) : n
            }
            function r(e) {
                var n = (0, t.getStringValue)(e),
                    r = n;
                return n.length >= 6 && (r = n.substr(0, 2) + ":" + n.substr(2, 2) + ":" + n.substr(4, 2), 11 === n.length && (r += n.substr(6, 1) + n.substr(7, 2) + ":" + n.substr(9, 2))), r
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.default = {
                iptc: {
                    346: {
                        name: "Coded Character Set",
                        description: function(e) {
                            var n = (0, t.getStringValue)(e);
                            return "%G" === n ? "UTF-8" : "%/G" === n ? "UTF-8 Level 1" : "%/H" === n ? "UTF-8 Level 2" : "%/I" === n ? "UTF-8 Level 3" : "Unknown"
                        }
                    },
                    512: {
                        name: "Record Version",
                        description: function(e) {
                            return ((e[0] << 8) + e[1]).toString()
                        }
                    },
                    515: "Object Type Reference",
                    516: "Object Attribute Reference",
                    517: "Object Name",
                    519: "Edit Status",
                    520: {
                        name: "Editorial Update",
                        description: function(e) {
                            return "01" === (0, t.getStringValue)(e) ? "Additional Language" : "Unknown"
                        }
                    },
                    522: "Urgency",
                    524: {
                        name: "Subject Reference",
                        repeatable: !0,
                        description: function(e) {
                            var n = (0, t.getStringValue)(e).split(":");
                            return n[2] + (n[3] ? "/" + n[3] : "") + (n[4] ? "/" + n[4] : "")
                        }
                    },
                    527: "Category",
                    532: {
                        name: "Supplemental Category",
                        repeatable: !0
                    },
                    534: "Fixture Identifier",
                    537: {
                        name: "Keywords",
                        repeatable: !0
                    },
                    538: {
                        name: "Content Location Code",
                        repeatable: !0
                    },
                    539: {
                        name: "Content Location Name",
                        repeatable: !0
                    },
                    542: "Release Date",
                    547: "Release Time",
                    549: "Expiration Date",
                    550: "Expiration Time",
                    552: "Special Instructions",
                    554: {
                        name: "Action Advised",
                        description: function(e) {
                            var n = (0, t.getStringValue)(e);
                            return "01" === n ? "Object Kill" : "02" === n ? "Object Replace" : "03" === n ? "Object Append" : "04" === n ? "Object Reference" : "Unknown"
                        }
                    },
                    557: {
                        name: "Reference Service",
                        repeatable: !0
                    },
                    559: {
                        name: "Reference Date",
                        repeatable: !0
                    },
                    562: {
                        name: "Reference Number",
                        repeatable: !0
                    },
                    567: {
                        name: "Date Created",
                        description: n
                    },
                    572: {
                        name: "Time Created",
                        description: r
                    },
                    574: {
                        name: "Digital Creation Date",
                        description: n
                    },
                    575: {
                        name: "Digital Creation Time",
                        description: r
                    },
                    577: "Originating Program",
                    582: "Program Version",
                    587: {
                        name: "Object Cycle",
                        description: function(e) {
                            var n = (0, t.getStringValue)(e);
                            return "a" === n ? "morning" : "p" === n ? "evening" : "b" === n ? "both" : "Unknown"
                        }
                    },
                    592: {
                        name: "By-line",
                        repeatable: !0
                    },
                    597: {
                        name: "By-line Title",
                        repeatable: !0
                    },
                    602: "City",
                    604: "Sub-location",
                    607: "Province/State",
                    612: "Country/Primary Location Code",
                    613: "Country/Primary Location Name",
                    615: "Original Transmission Reference",
                    617: "Headline",
                    622: "Credit",
                    627: "Source",
                    628: "Copyright Notice",
                    630: {
                        name: "Contact",
                        repeatable: !0
                    },
                    632: "Caption/Abstract",
                    634: {
                        name: "Writer/Editor",
                        repeatable: !0
                    },
                    637: {
                        name: "Rasterized Caption",
                        description: function(e) {
                            return e
                        }
                    },
                    642: "Image Type",
                    643: {
                        name: "Image Orientation",
                        description: function(e) {
                            var n = (0, t.getStringValue)(e);
                            return "P" === n ? "Portrait" : "L" === n ? "Landscape" : "S" === n ? "Square" : "Unknown"
                        }
                    },
                    647: "Language Identifier",
                    662: {
                        name: "Audio Type",
                        description: function e(n) {
                            var r = (0, t.getStringValue)(n),
                                i = r.charAt(0),
                                o = r.charAt(1),
                                e = "";
                            return "1" === i ? e += "Mono" : "2" === i && (e += "Stereo"), "A" === o ? e += ", actuality" : "C" === o ? e += ", question and answer session" : "M" === o ? e += ", music, transmitted by itself" : "Q" === o ? e += ", response to a question" : "R" === o ? e += ", raw sound" : "S" === o ? e += ", scener" : "V" === o ? e += ", voicer" : "W" === o && (e += ", wrap"), "" !== e ? e : r
                        }
                    },
                    663: {
                        name: "Audio Sampling Rate",
                        description: function(e) {
                            return parseInt((0, t.getStringValue)(e), 10) + " Hz"
                        }
                    },
                    664: {
                        name: "Audio Sampling Resolution",
                        description: function(e) {
                            var n = parseInt((0, t.getStringValue)(e), 10);
                            return n + (1 === n ? " bit" : " bits")
                        }
                    },
                    665: {
                        name: "Audio Duration",
                        description: function(e) {
                            var n = (0, t.getStringValue)(e);
                            return n.length >= 6 ? n.substr(0, 2) + ":" + n.substr(2, 2) + ":" + n.substr(4, 2) : n
                        }
                    },
                    666: "Audio Outcue",
                    712: {
                        name: "ObjectData Preview File Format",
                        description: function(e) {
                            var n = (0, t.getStringValue)(e);
                            return "00" === n ? "No ObjectData" : "01" === n ? "IPTC-NAA Digital Newsphoto Parameter Record" : "02" === n ? "IPTC7901 Recommended Message Format" : "03" === n ? "Tagged Image File Format (Adobe/Aldus Image data)" : "04" === n ? "Illustrator (Adobe Graphics data)" : "05" === n ? "AppleSingle (Apple Computer Inc)" : "06" === n ? "NAA 89-3 (ANPA 1312)" : "07" === n ? "MacBinary II" : "08" === n ? "IPTC Unstructured Character Oriented File Format (UCOFF)" : "09" === n ? "United Press International ANPA 1312 variant" : "10" === n ? "United Press International Down-Load Message" : "11" === n ? "JPEG File Interchange (JFIF)" : "12" === n ? "Photo-CD Image-Pac (Eastman Kodak)" : "13" === n ? "Microsoft Bit Mapped Graphics File [*.BMP]" : "14" === n ? "Digital Audio File [*.WAV] (Microsoft & Creative Labs)" : "15" === n ? "Audio plus Moving Video [*.AVI] (Microsoft)" : "16" === n ? "PC DOS/Windows Executable Files [*.COM][*.EXE]" : "17" === n ? "Compressed Binary File [*.ZIP] (PKWare Inc)" : "18" === n ? "Audio Interchange File Format AIFF (Apple Computer Inc)" : "19" === n ? "RIFF Wave (Microsoft Corporation)" : "20" === n ? "Freehand (Macromedia/Aldus)" : "21" === n ? 'Hypertext Markup Language "HTML" (The Internet Society)' : "22" === n ? "MPEG 2 Audio Layer 2 (Musicom), ISO/IEC" : "23" === n ? "MPEG 2 Audio Layer 3, ISO/IEC" : "24" === n ? "Portable Document File (*.PDF) Adobe" : "25" === n ? "News Industry Text Format (NITF)" : "26" === n ? "Tape Archive (*.TAR)" : "27" === n ? "Tidningarnas Telegrambyrå NITF version (TTNITF DTD)" : "28" === n ? "Ritzaus Bureau NITF version (RBNITF DTD)" : "29" === n ? "Corel Draw [*.CDR]" : "Unknown format " + n
                        }
                    },
                    713: {
                        name: "ObjectData Preview File Format Version",
                        description: function(e, n) {
                            var r = {
                                    "00": {
                                        "00": "1"
                                    },
                                    "01": {
                                        "01": "1",
                                        "02": "2",
                                        "03": "3",
                                        "04": "4"
                                    },
                                    "02": {
                                        "04": "4"
                                    },
                                    "03": {
                                        "01": "5.0",
                                        "02": "6.0"
                                    },
                                    "04": {
                                        "01": "1.40"
                                    },
                                    "05": {
                                        "01": "2"
                                    },
                                    "06": {
                                        "01": "1"
                                    },
                                    11: {
                                        "01": "1.02"
                                    },
                                    20: {
                                        "01": "3.1",
                                        "02": "4.0",
                                        "03": "5.0",
                                        "04": "5.5"
                                    },
                                    21: {
                                        "02": "2.0"
                                    }
                                },
                                i = (0, t.getStringValue)(e);
                            if (n["ObjectData Preview File Format"]) {
                                var o = (0, t.getStringValue)(n["ObjectData Preview File Format"].value);
                                if (r[o] && r[o][i])
                                    return r[o][i]
                            }
                            return i
                        }
                    },
                    714: "ObjectData Preview Data"
                }
            }
        })
    }, function(e, t, n) {
        var r,
            i,
            o;
        !function(a, u) {
            i = [t, n(2), n(15)], r = u, o = "function" == typeof r ? r.apply(t, i) : r, !(void 0 !== o && (e.exports = o))
        }(this, function(e, t, n) {
            "use strict";
            function r(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            function i(e, t, n) {
                try {
                    var r = o(e, t, n),
                        i = a(r);
                    return v(u(i, !0))
                } catch (e) {
                    return {}
                }
            }
            function o(e, n, r) {
                if ("undefined" == typeof DOMParser)
                    throw console.warn("Warning: DOMParser is not available. If you're using Node.js you probably want to do this:\n  1. Install a DOM parser, e.g. xmldom: npm install --save xmldom\n  2. Require that at the top of your script: global.DOMParser = require('xmldom').DOMParser;\nSee an example of this in the ExifReader example directory."), new Error;
                var i = new DOMParser,
                    o = (0, t.getStringFromDataView)(e, n, r),
                    a = i.parseFromString(o, "application/xml");
                if ("parsererror" === a.documentElement.nodeName)
                    throw new Error;
                return a
            }
            function a(e) {
                for (var t = 0; t < e.childNodes.length; t++) {
                    if ("x:xmpmeta" === e.childNodes[t].tagName)
                        return a(e.childNodes[t]);
                    if ("rdf:RDF" === e.childNodes[t].tagName)
                        return e.childNodes[t]
                }
                throw new Error
            }
            function u(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                    n = c(e);
                return d(n) ? t ? {} : f(n[0]) : s(n)
            }
            function c(e) {
                for (var t = [], n = 0; n < e.childNodes.length; n++)
                    t.push(e.childNodes[n]);
                return t
            }
            function d(e) {
                return 1 === e.length && "#text" === e[0].nodeName
            }
            function f(e) {
                return e.nodeValue
            }
            function s(e) {
                var t = {};
                return e.forEach(function(e) {
                    if (l(e)) {
                        var n = p(e);
                        void 0 !== t[e.nodeName] ? (Array.isArray(t[e.nodeName]) || (t[e.nodeName] = [t[e.nodeName]]), t[e.nodeName].push(n)) : t[e.nodeName] = n
                    }
                }), t
            }
            function l(e) {
                return e.nodeName && "#text" !== e.nodeName
            }
            function p(e) {
                return {
                    attributes: m(e),
                    value: u(e)
                }
            }
            function m(e) {
                for (var t = {}, n = 0; n < e.attributes.length; n++)
                    t[e.attributes[n].nodeName] = e.attributes[n].value;
                return t
            }
            function v(e) {
                var t = {};
                if ("string" == typeof e)
                    return e;
                for (var n in e) {
                    var r = e[n];
                    Array.isArray(r) || (r = [r]), r.forEach(function(e) {
                        z(t, g(e.attributes)), "object" === B(e.value) && z(t, C(e.value))
                    })
                }
                return t
            }
            function g(e) {
                var t = {};
                for (var n in e)
                    h(n) && (t[S(n)] = {
                        value: e[n],
                        attributes: {},
                        description: b(e[n], n)
                    });
                return t
            }
            function h(e) {
                return "rdf:parseType" !== e && !y(e)
            }
            function y(e) {
                return "xmlns" === e.split(":")[0]
            }
            function S(e) {
                return e.split(":")[1]
            }
            function b(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0;
                if (Array.isArray(e))
                    return w(e);
                if ("object" === ("undefined" == typeof e ? "undefined" : B(e)))
                    return A(e);
                try {
                    return t && "function" == typeof W.default[t] ? W.default[t](e) : decodeURIComponent(escape(e))
                } catch (t) {
                    return e
                }
            }
            function w(e) {
                return e.map(function(e) {
                    return b(void 0 !== e.value ? e.value : e)
                }).join(", ")
            }
            function A(e) {
                var t = [];
                for (var n in e)
                    t.push(P(n) + ": " + e[n].value);
                return t.join("; ")
            }
            function P(e) {
                return "CiAdrCity" === e ? "CreatorCity" : "CiAdrCtry" === e ? "CreatorCountry" : "CiAdrExtadr" === e ? "CreatorAddress" : "CiAdrPcode" === e ? "CreatorPostalCode" : "CiAdrRegion" === e ? "CreatorRegion" : "CiEmailWork" === e ? "CreatorWorkEmail" : "CiTelWork" === e ? "CreatorWorkPhone" : "CiUrlWork" === e ? "CreatorWorkUrl" : e
            }
            function C(e) {
                var t = {};
                for (var n in e)
                    y(n) || (t[S(n)] = D(e[n], n));
                return t
            }
            function D(e, t) {
                return I(e) ? F(e, t) : M(e) ? T(e, t) : N(e) ? R(e, t) : j(e) ? k(e, t) : _(e, t)
            }
            function I(e) {
                return "Resource" === e.attributes["rdf:parseType"] && void 0 !== e.value["rdf:value"] || void 0 !== e.value["rdf:Description"] && void 0 !== e.value["rdf:Description"].value["rdf:value"]
            }
            function F(e, t) {
                var n = U(e);
                void 0 !== e.value["rdf:Description"] && (e = e.value["rdf:Description"]),
                z(n, U(e), O(e));
                var r = x(e);
                return {
                    value: r,
                    attributes: n,
                    description: b(r, t)
                }
            }
            function U(e) {
                var t = {};
                for (var n in e.attributes)
                    "rdf:parseType" === n || "rdf:resource" === n || y(n) || (t[S(n)] = e.attributes[n]);
                return t
            }
            function O(e) {
                var t = {};
                for (var n in e.value)
                    "rdf:value" === n || y(n) || (t[S(n)] = e.value[n].value);
                return t
            }
            function x(e) {
                return V(e.value["rdf:value"]) || e.value["rdf:value"].value
            }
            function M(e) {
                return "Resource" === e.attributes["rdf:parseType"] || void 0 !== e.value["rdf:Description"] && void 0 === e.value["rdf:Description"].value["rdf:value"]
            }
            function T(e, t) {
                var n = {
                    value: {},
                    attributes: {}
                };
                return void 0 !== e.value["rdf:Description"] && (z(n.value, g(e.value["rdf:Description"].attributes)), z(n.attributes, U(e)), e = e.value["rdf:Description"]), z(n.value, C(e.value)), n.description = b(n.value, t), n
            }
            function N(e) {
                return 0 === Object.keys(e.value).length && void 0 === e.attributes["rdf:resource"]
            }
            function R(e, t) {
                var n = g(e.attributes);
                return {
                    value: n,
                    attributes: {},
                    description: b(n, t)
                }
            }
            function j(e) {
                return void 0 !== E(e.value)
            }
            function E(e) {
                return e["rdf:Bag"] || e["rdf:Seq"] || e["rdf:Alt"]
            }
            function k(e, t) {
                var n = E(e.value).value["rdf:li"],
                    r = U(e),
                    i = [];
                return Array.isArray(n) || (n = [n]), n.forEach(function(e) {
                    i.push(L(e))
                }), {
                    value: i,
                    attributes: r,
                    description: b(i, t)
                }
            }
            function L(e) {
                return I(e) ? F(e) : G(e) ? C(e.value) : {
                    value: e.value,
                    attributes: U(e),
                    description: b(e.value)
                }
            }
            function G(e) {
                return "Resource" === e.attributes["rdf:parseType"]
            }
            function _(e, t) {
                var n = V(e) || v(e.value);
                return {
                    value: n,
                    attributes: U(e),
                    description: b(n, t)
                }
            }
            function V(e) {
                return e.attributes && e.attributes["rdf:resource"]
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var W = r(n),
                B = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                },
                z = Object.assign || function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var r in n)
                            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                    }
                    return e
                };
            e.default = {
                read: i
            }
        })
    }, function(e, t, n) {
        var r,
            i,
            o;
        !function(n, a) {
            i = [t], r = a, o = "function" == typeof r ? r.apply(t, i) : r, !(void 0 !== o && (e.exports = o))
        }(this, function(e) {
            "use strict";
            function t(e) {
                var t = e.split(","),
                    r = n(t, 2),
                    i = r[0],
                    o = r[1];
                if (void 0 !== i && void 0 !== o) {
                    var a = parseFloat(i),
                        u = parseFloat(o),
                        c = o.charAt(o.length - 1);
                    if (!Number.isNaN(a) && !Number.isNaN(u))
                        return "" + (a + u / 60) + c
                }
                return e
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            });
            var n = function() {
                function e(e, t) {
                    var n = [],
                        r = !0,
                        i = !1,
                        o = void 0;
                    try {
                        for (var a, u = e[Symbol.iterator](); !(r = (a = u.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0)
                            ;
                    } catch (e) {
                        i = !0, o = e
                    } finally {
                        try {
                            !r && u.return && u.return()
                        } finally {
                            if (i)
                                throw o
                        }
                    }
                    return n
                }
                return function(t, n) {
                    if (Array.isArray(t))
                        return t;
                    if (Symbol.iterator in Object(t))
                        return e(t, n);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();
            e.default = {
                "tiff:Orientation": function(e) {
                    return "1" === e ? "Horizontal (normal)" : "2" === e ? "Mirror horizontal" : "3" === e ? "Rotate 180" : "4" === e ? "Mirror vertical" : "5" === e ? "Mirror horizontal and rotate 270 CW" : "6" === e ? "Rotate 90 CW" : "7" === e ? "Mirror horizontal and rotate 90 CW" : "8" === e ? "Rotate 270 CW" : e
                },
                "exif:GPSLatitude": t,
                "exif:GPSLongitude": t
            }
        })
    }, function(e, t, n) {
        var r,
            i,
            o;
        !function(n, a) {
            i = [t], r = a, o = "function" == typeof r ? r.apply(t, i) : r, !(void 0 !== o && (e.exports = o))
        }(this, function(e) {
            "use strict";
            function t(e) {
                this.name = "MetadataMissingError", this.message = e || "No Exif data", this.stack = (new Error).stack
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), t.prototype = new Error, e.default = {
                MetadataMissingError: t
            }
        })
    }])
});
//# sourceMappingURL=exif-reader.js.map

