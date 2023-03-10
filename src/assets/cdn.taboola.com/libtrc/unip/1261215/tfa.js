/*! 20230226-7-RELEASE */

function _typeof(t) {
    "@babel/helpers - typeof";
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    })(t)
}! function(t) {
    var e = 'TFASC';
    e.indexOf("{jsScope}") > -1 && (e = "TRC"), t[e] || (t[e] = {})
}(window),
function(t, e) {
    t.TRC = t.TRC || {};
    var i = function t() {
            return !0
        },
        n = function i(n, r, o, s) {
            var a = n + "/" + encodeURIComponent(o || t.TRC.publisherId) + "/log/3" + "/" + r;
            return s && (a += "?" + e.TRCLogger.formatParams(s)), a
        },
        r = function e(n, r) {
            var o, s = new(t.XDomainRequest || t.XMLHttpRequest);
            return s.open(n, r), s.onload = i, s.onerror = i, s.ontimeout = i, s.onprogress = i, s.withCredentials = !0, s
        };
    t.TRC.TRCLogger = e.TRCLogger = {
        post: function i(o, s, a, c, u, l) {
            var f = n(o, s, c, u),
                d = r("POST", f);
            l && "function" == typeof t.navigator.sendBeacon ? t.navigator.sendBeacon(f, e.TRCLogger.formatBeaconParams(a)) : (d.setRequestHeader && d.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), d.send(e.TRCLogger.formatParams(a)))
        },
        get: function t(e, i, o, s) {
            var a = n(e, i, s, o),
                c;
            r("GET", a).send()
        },
        formatParams: function t(e) {
            var i = [];
            for (var n in e) e.hasOwnProperty(n) && i.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
            return i.join("&")
        },
        formatBeaconParams: function t(e) {
            var i = "",
                n;
            for (var r in e) e.hasOwnProperty(r) && (i += r + "=" + encodeURIComponent(e[r]) + "&");
            return new Blob([i.slice(0, -1)], {
                type: "application/x-www-form-urlencoded"
            })
        },
        reportES: function t(i) {
            if (e && e.util && e.util.isPercentEnabled(TRCImpl.global, "enable-rbox-es-events")) {
                var n = TRCImpl && TRCImpl.global && TRCImpl.global["rbox-es-events-url"] || "https://vidanalytics.taboola.com/putes";
                n = n + "/" + i.index;
                var r = {
                    timestamp: (new Date).toISOString(),
                    name: i.name
                };
                for (var o in i.data) r[o] = i.data[o];
                if ("function" == typeof navigator.sendBeacon) navigator.sendBeacon(n, JSON.stringify(r));
                else {
                    var s = new XMLHttpRequest;
                    s.open("POST", n, !0), s.send(JSON.stringify(r))
                }
            }
        }
    }
}(window, window['TFASC'.indexOf("{jsScope}") >= 0 ? "TRC" : 'TFASC']),
function(t, e) {
    if (e && !e.MessageDelayer) {
        var i = function i(n) {
                return function(i) {
                    var r = i.detail,
                        o = i.type,
                        s = "" + r[this.groupingKeyName],
                        a = this.delayedEventsMap[s],
                        c = e.eventUtils.getDateNow();
                    if (a) {
                        this.timeoutHandles[s] && (clearTimeout(this.timeoutHandles[s]), this.timeoutHandles[s] = null);
                        var u = [].concat(a);
                        this.delayedEventsMap[s] = [];
                        for (var l = 0; l < u.length; l++) {
                            var f = u[l],
                                d;
                            n(f.config).apply(t, [f.groupingKey, f.message, r, o, c - f.queueTime])
                        }
                    }
                }
            },
            n = i(function(t) {
                return t.successCallback
            }),
            r = i(function(t) {
                return t.failCallback
            }),
            o = function t(e, i) {
                var n = "" + e;
                this.timeoutHandles[n] || (this.timeoutHandles[n] = setTimeout(function() {
                    this.timeoutHandles[n] = null;
                    var t = {};
                    t[this.groupingKeyName] = e, r.call(this, {
                        detail: t,
                        type: "dt"
                    })
                }.bind(this), i))
            };
        e.MessageDelayer = function(t, i, o) {
            if (this.groupingKeyName = t, this.delayedEventsMap = {}, this.timeoutHandles = {}, e.eventUtils.safeAddEventListener(i, n.bind(this)), o)
                for (var s = 0; s < o.length; s++) e.eventUtils.safeAddEventListener(o[s], r.bind(this))
        }, e.MessageDelayer.prototype = {
            constructor: e.MessageDelayer,
            delayMessage: function t(i, n, r) {
                var s = "" + i;
                r.failCallback = r.failCallback || function() {}, this.delayedEventsMap[s] || (this.delayedEventsMap[s] = []), this.delayedEventsMap[s].push({
                    groupingKey: i,
                    message: n,
                    config: r,
                    queueTime: e.eventUtils.getDateNow()
                }), r.timeoutInMillis && o.call(this, i, r.timeoutInMillis)
            }
        }
    }
}(window, window['TFASC'.indexOf("{jsScope}") >= 0 ? "TRC" : 'TFASC']),
function(t) {
    t.TRC = t.TRC || {}, t.TRC.sharedObjects = t.TRC.sharedObjects || {}, t.TRC.sharedObjects.loadedScripts = t.TRC.sharedObjects.loadedScripts || {}, t.TRC.sharedObjects.loadedPixels = t.TRC.sharedObjects.loadedPixels || {}
}(window),
function(t, e, i) {
    ! function() {
        if ("function" == typeof t.CustomEvent) return !1;

        function i(t, i) {
            i = i || {
                bubbles: !1,
                cancelable: !1,
                detail: void 0
            };
            var n = e.createEvent("CustomEvent");
            return n.initCustomEvent(t, i.bubbles, i.cancelable, i.detail), n
        }
        i.prototype = t.Event.prototype, t.CustomEvent = i
    }(), i.eventUtils = i.eventUtils || {}, i.eventUtils.dispatchEvent = i.eventUtils.dispatchEvent || function(t, e) {
        "function" == typeof CustomEvent && document.dispatchEvent(new CustomEvent(t, {
            detail: e || {}
        }))
    }, i.eventUtils.safeAddEventListener = i.eventUtils.safeAddEventListener || function(t, e) {
        document.addEventListener(t, function(t) {
            try {
                e.call(this, t)
            } catch (t) {}
        })
    }, i.eventUtils.safeAddEventListenerToWindow = i.eventUtils.safeAddEventListenerToWindow || function(t, e) {
        window.addEventListener(t, function(t) {
            try {
                e.call(this, t)
            } catch (t) {}
        })
    }, i.eventUtils.getDateNow = i.eventUtils.getDateNow || function() {
        var t, e;
        if (Date.now) {
            if ("number" == typeof(t = Date.now())) return t;
            if ("number" == typeof(e = Number(t))) return e
        }
        return (new Date).getTime()
    }, i.eventUtils.hashString = i.eventUtils.hashString || function(t) {
        var e = 0;
        if (0 == t.length) return e;
        for (var i = 0; i < t.length; i++) {
            var n;
            e = (e << 5) - e + t.charCodeAt(i), e &= e
        }
        return e
    }, i.sharedEvents = i.sharedEvents || {
        PAGE_VIEW: "TRK_TFA_PAGE_VIEW",
        REQUEST_ID_CREATED: "TRK_TFA_REQUEST_ID_CREATED",
        REQUEST_ID_CREATION_TIMEOUT: "TRK_TFA_REQUEST_ID_CREATION_TIMEOUT",
        REQUEST_ID_CREATION_ERROR: "TRK_TFA_REQUEST_ID_CREATION_ERROR",
        REQUEST_ID_CREATION_JS_ERROR: "TRK_TFA_REQUEST_ID_CREATION_JS_ERROR",
        INVALID_TRK_RESPONSE: "TRK_TFA_INVALID_TRK_RESPONSE"
    }, i.publisherIdType = i.publisherIdType || {
        NAME: "n",
        ID: "i"
    }, i.pageViewInitiator = i.pageViewInitiator || {
        TRK: "trk",
        TFA: "tfa"
    }
}(window, document, window['TFASC'.indexOf("{jsScope}") >= 0 ? "TRC" : 'TFASC']),
function(t, e) {
    t._tfa = t._tfa || [], t._tfa.config || (t._tfa.TfaConfig = function() {
        this.configMap = {}
    }, t._tfa.TfaConfig.prototype = {
        safeGet: function t(e, i, n) {
            var r, o, s;
            if (n && this.configMap[n]) r = "" + n;
            else {
                if (!this.firstPublisherId) return i;
                r = this.firstPublisherId
            }
            try {
                return void 0 === (s = (o = this.configMap[r])[e]) ? i : s
            } catch (t) {
                return i
            }
        },
        hasValidConfig: function t() {
            return !!this.firstPublisherId
        },
        addConfig: function t(e, i) {
            "string" == typeof i || i instanceof String || (this.firstPublisherId || (this.firstPublisherId = e), this.configMap["" + e] = i)
        }
    }, t._tfa.config = new t._tfa.TfaConfig, t._taboola = t._taboola || []), t._tfa.config.addConfig(1261215, {
        "tfa:event-host-map": {
            "pre_d_eng_tb": "trc-events.taboola.com"
        },
        "tfa:add-item-url:event-list": "*",
        "tfa:trk:is-unified-page-view": true,
        "eid:send-eid-encoded": true,
        "tfa-uid:send-ids-to-cds": false,
        "cds:send-uad-req": true,
        "cds:send-dnid-req": true,
        "tfa:get-publisher-id-from-baker": true,
        "tfa:trk:flc-enabled": true,
        "tfa:engagement:return-visits:is-enabled": true,
        "tfa:collect-eid-from-page": false,
        "eid-enabled": "false",
        "eid:tfa:common-eid-keywords": "help,support,contact,readme,test,info,reply,careers,spam,login,subscribe,feedback,reachus,customers,cookie,members"
    })
}(window, window['TFASC'.indexOf("{jsScope}") >= 0 ? "TRC" : 'TFASC']),
function(t, e, i) {
    "use strict";
    var n = t[i.jsScope],
        r = {
            map: function t(e, i) {
                if ("function" == typeof Array.prototype.map) return i.map(e);
                for (var n = [], r = 0; r < i.length; r++) n.push(e(i[r], r, i));
                return n
            },
            forEach: function t(e, i) {
                if ("function" == typeof Array.prototype.forEach) return i.forEach(e);
                for (var n = 0; n < i.length; n++) e(i[n], n, i)
            },
            filter: function t(e, i) {
                if ("function" == typeof Array.prototype.filter) return i.filter(e);
                for (var n = [], r = 0; r < i.length; r++) e(i[r], r, i) && n.push(i[r]);
                return n
            },
            objKeys: Object.keys || (o = Object.prototype.hasOwnProperty, s = !{
                toString: null
            }.propertyIsEnumerable("toString"), a = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], c = a.length, function(t) {
                if ("function" != typeof t && ("object" !== _typeof(t) || null === t)) throw new TypeError("Object.keys called on non-object");
                var e = [],
                    i, n;
                for (i in t) o.call(t, i) && e.push(i);
                if (s)
                    for (n = 0; n < c; n++) o.call(t, a[n]) && e.push(a[n]);
                return e
            })
        },
        o, s, a, c;
    i.networkMap && "string" != typeof i.networkMap || (i.networkMap = {});
    var u = null,
        l = null,
        f = null,
        d = null,
        h = {},
        g = 0,
        p = !1,
        m = "requestTimeoutHandle",
        v = "requestId",
        S = "requestStatus",
        b = "trkRequestDone",
        I = 5e3,
        T = 2e3,
        y = "init",
        E = "pr",
        w = "pud",
        R = "tto",
        _ = "s",
        C = "f",
        U = "u",
        D = [R, C],
        O = [y, E, w],
        k = ((G = {})[n.publisherIdType.NAME] = "name", G[n.publisherIdType.ID] = "id", G),
        P = function() {
            for (var t = {}, e = r.objKeys(i.networkMap), o = 0; o < e.length; ++o) {
                var s;
                t["" + i.networkMap[e[o]][k[n.publisherIdType.ID]]] = !0
            }
            return t
        }(),
        N = "gk",
        A = "dk",
        x = "TRK_RELEASE_DELAYED_REQUESTS_EVENT",
        M = function() {
            var t = {};
            return t[N] = A, t
        }(),
        V = new n.MessageDelayer(N, x),
        L = function t(e, i) {
            K = K.loadTrc(i.publisherId, i.publisherIdType, i.config, i.requestData)
        },
        j = {
            UNINITIALIZED: {
                loadTrc: function t(e, i, n, r) {
                    var o = Dt();
                    return it(e, i, n, r), o ? j.USER_ID_SET : j.PENDING_USER_ID_SET
                }
            },
            PENDING_USER_ID_SET: {
                loadTrc: function t(e, i, n, r) {
                    return r[S] = w, V.delayMessage(A, {
                        publisherId: e,
                        publisherIdType: i,
                        config: n,
                        requestData: r
                    }, {
                        successCallback: L
                    }), j.PENDING_USER_ID_SET
                }
            },
            USER_ID_SET: {
                loadTrc: function t(e, i, n, r) {
                    return it(e, i, n, r), j.USER_ID_SET
                }
            }
        },
        K = j.UNINITIALIZED,
        $ = (t.taboola_view_id || (t.taboola_view_id = (new Date).getTime()), t.taboola_view_id),
        F, G, q = function t() {
            return !0 === i.tfaContext
        },
        B = function t() {
            try {
                localStorage.setItem("taboolaStorageDetection", "detect"), localStorage.removeItem("taboolaStorageDetection")
            } catch (t) {
                return !1
            }
            return !0
        },
        H = function t(e, i, n) {
            var r = e.split(i);
            return r.slice(0, n - 1).concat(r.length >= n ? r.slice(n - 1).join(i) : [])
        },
        W = function t(e) {
            if (!e) throw new Error("Invalid URL!");
            this.href = e;
            var i = H(e, "#", 2);
            return this.hash = i.length > 1 ? "#" + i.pop() : "", e = i[0], i = H(e, "?", 2), this.search = i.length > 1 ? "?" + i.pop() : "", e = i[0], i = H(e, "://", 2), this.protocol = i.length > 1 ? i.shift() + ":" : "", e = i[0], i = H(e, "/", 2), this.pathname = i.length > 1 ? "/" + i.pop() : "/", e = i[0], i = H(e, "@", 2), this.auth = i.length > 1 ? i.shift() : "", e = i[0], i = H(e, ":", 2), this.port = i.length > 1 ? parseInt(i.pop()) : 0, this.host = i[0], this
        },
        z = {
            "http:": 1,
            "https:": 1
        };
    W.prototype.toString = function(t) {
        return (this.host ? this.protocol + "//" + (this.auth ? this.auth + "@" : "") + this.host + (this.port ? ":" + this.port : "") : "") + this.pathname + this.search + (t ? "" : this.hash || "")
    }, W.prototype.switchProtocol = function(t, e) {
        var i = this instanceof W ? this : new W(this),
            n;
        return z[t] && (e && "https:" === i.protocol || (i.protocol = t)), (n = i.toString(!1)).length > 1 ? n : ""
    }, W.prototype.getParameter = function(t) {
        for (var e, i = (this instanceof W ? this : new W(this)).search.substr(1).split(/&/), n = 0; n < i.length; n++) {
            var r = i[n].split(new RegExp("="), 2);
            if (unescape(r[0]) === t) return unescape(r[1])
        }
        return null
    };
    var J = {
            states: {
                ABP_DETECTION_DISABLED: -2,
                ABP_NOT_DETECTED: 0,
                ABP_DETECTED: 1
            },
            createBlockDetectionDiv: function t(i) {
                var n = e.createElement("div");
                return n.className = i, n.style.fontSize = "initial", n.appendChild(e.createTextNode(".")), e.documentElement.appendChild(n), n
            },
            isBlockDetectedOnDiv: function t(e) {
                return !e.offsetHeight
            },
            isBlockDetectedOnClassNames: function t(i) {
                var n, r = i.length,
                    o;
                for (n = 0; n < r; n++)
                    if (i[n]) {
                        o = this.createBlockDetectionDiv(i[n]);
                        try {
                            if (this.isBlockDetectedOnDiv(o)) return !0
                        } catch (t) {} finally {
                            e.documentElement.removeChild(o)
                        }
                    }
                return !1
            },
            getBlockedState: function t(e) {
                return bt() || It() ? this.states.ABP_NOT_DETECTED : e && this.isBlockDetectedOnClassNames(e) ? this.states.ABP_DETECTED : this.states.ABP_NOT_DETECTED
            }
        },
        Q = function t(e, i) {
            for (var n = r.objKeys(e), o = 0; o < n.length; o++) {
                var s = n[o];
                i.push([s, e[s]])
            }
        },
        Y = function t(e) {
            n[e.callbackName] = function() {}, e.newScriptElement.parentNode.removeChild(e.newScriptElement), e.newScriptElement = null, delete e.newScriptElement
        },
        Z = function e(i) {
            Y(i), i[S] = R, i.isMediaRequest || (t.TRC.trkRequestStatus = !1), K === j.PENDING_USER_ID_SET && (K = j.UNINITIALIZED), i[b] ? n.eventUtils.dispatchEvent(n.sharedEvents.INVALID_TRK_RESPONSE, {
                publisherId: i.publisherId
            }) : n.eventUtils.dispatchEvent(n.sharedEvents.REQUEST_ID_CREATION_TIMEOUT, {
                publisherId: i.publisherId
            }), st()
        },
        X = function t(i, n, r, o) {
            var s = e.getElementsByTagName("script")[0],
                a = e.createElement("script");
            return a.type = "text/javascript", a.src = i, a.charset = "UTF-8", r ? a.setAttribute("defer", "defer") : o && a.setAttribute("async", "async"), "function" == typeof n && (a.addEventListener ? (a.addEventListener("load", n, !1), a.addEventListener("error", n, !1)) : a.onreadystatechange = function() {
                "loaded" !== a.readyState && "complete" !== a.readyState || n.apply(a)
            }), s.parentNode.insertBefore(a, s), a
        },
        tt = function t(e, i, n, r) {
            var o = {
                publisherId: e,
                isMediaRequest: n.isMediaRequest,
                isUnifiedPageView: n.isUnifiedPageView,
                publisherIdType: i,
                callbackName: "trkCallback" + (0 === g ? "" : g),
                metadata: r
            };
            return o[S] = y, h[e] || (h[e] = []), h[e].push(o), ++g, o
        },
        et = function t(e) {
            return function() {
                Z(e)
            }
        },
        it = function e(n, r, o, s) {
            var a = i.rboxTrcProtocol + "//trc.taboola.com/" + n + "/trc/3/json?" + "tim=" + (new Date).getTime() + "&" + "data=" + encodeURIComponent(JSON.stringify(rt(s))) + "&" + "pubit=" + r,
                c = o.isMediaRequest ? t._tfa.config.safeGet("tfa:trk:tracking-request-timeout", T, n) : I;
            s[S] = E, s[m] = t.setTimeout(et(s), c), s.newScriptElement = X(a, function() {
                s[b] = !0
            })
        },
        nt = function t(e) {
            return function(t) {
                at(e, t)
            }
        },
        rt = function t(e) {
            return n[e.callbackName] = nt(e), gt(e)
        },
        ot = function t(e) {
            var i = h[e = "" + e];
            return i && i.length > 0 ? i[i.length - 1] : null
        },
        st = function t() {
            n.eventUtils.dispatchEvent(x, M)
        },
        at = function e(r, o) {
            if (t.clearTimeout(r[m]), o && o.trc) {
                if (o.trc.ui ? (o.trc["DNT"] && "TRUE" === o.trc["DNT"].toUpperCase() ? localStorage.removeItem("taboola global:user-id") : o.trc["cm"] || localStorage.setItem("taboola global:user-id", o.trc["ui"]), K = j.USER_ID_SET) : K = j.UNINITIALIZED, o.trc.sd && !o.trc["cm"] && localStorage.setItem(r.publisherId + ":session-data", o.trc["sd"]), o.trc["vl"] && o.trc["vl"].length) {
                    var s = o.trc["vl"][0].ri;
                    r.isMediaRequest || (t.TRC.events_ri = s), r[v] = s, r[S] = _, n.eventUtils.dispatchEvent(n.sharedEvents.REQUEST_ID_CREATED, {
                        publisherId: r.publisherId,
                        requestId: s
                    })
                }
                r.isMediaRequest && n.trk.rboxNotLoaded() && (o.trc.stp && n.trk.loadPixels(o.trc.stp), o.trc.jst && n.trk.loadScriptTags(o.trc.jst))
            }
            r[S] !== _ && (r[S] = C, n.eventUtils.dispatchEvent(n.sharedEvents.REQUEST_ID_CREATION_ERROR, {
                publisherId: r.publisherId
            })), r.isMediaRequest || (t.TRC.trkRequestStatus = !(D.indexOf(r[S]) >= 0)), t.TRC.alertVVResponseLoaded && t.TRC.alertVVResponseLoaded(i.tblVersion), Y(r), st()
        },
        ct = function() {
            var t, e = function t() {
                    try {
                        return decodeURI(top.window.document.referrer)
                    } catch (t) {}
                    return null
                },
                i = /https?:\/\/\w+\.taboola(?:syndication)?\.com/,
                n = function t(e) {
                    return i.test(e) ? e.split("?")[0] : e.substr(0, 400)
                },
                r, o = [function t() {
                    for (var e = document.head.getElementsByTagName("link"), i = 0; i < e.length; i++)
                        if ("referrer" === e[i].rel) return e[i].href;
                    return null
                }, function t() {
                    var i = e();
                    return i ? n(i) : null
                }],
                s = function t() {
                    for (var t, e = 0; !t && e < o.length; e++) t = o[e].call(this);
                    return t
                };
            return s.innerExtractReferrerFromTopMostReferrer = n, s
        }(),
        ut = function t() {
            var e = d;
            return e || (e = ct()), e
        },
        lt = function t(e) {
            var i;
            if (e) {
                try {
                    i = W.prototype.getParameter.call(window.location.href, "cnsntstr")
                } catch (t) {}
                i && (e.tcs = i, e.ga = !0, e.cmps = 5), e.ad = {
                    sdkd: {
                        os: "AMP",
                        osv: 1,
                        sdkt: "Taboola AMP Driver",
                        sdkv: "1"
                    }
                }
            }
        },
        ft = function e() {
            if (F) return F;
            var i = 400,
                n;
            return (F = t.location.search).length > i && (n = F.substring(0, i - 1), F = n.substring(0, n.lastIndexOf("&"))), F
        },
        dt = function o(s, a) {
            var c = {},
                u = s.metadata,
                l = s.publisherId,
                f = t._tfa.config.safeGet("tfa:trk:should-send-media-data", !0, l),
                d = t._tfa.config.safeGet("tfa:trk:media-data-param-name", "mpvd", l),
                h = t._tfa.config.safeGet("tfa:trk:page-view-payload-param-name", "mpv", l),
                g = t._tfa.config.safeGet("tfa:trk:unified-page-view-param-name", "supv", l),
                p;
            return r.forEach(function(t) {
                var e = u[t];
                a.hasOwnProperty(t) && e === a[t] || (c[t] = e)
            }, r.objKeys(u)), a[h] = !0, s.isUnifiedPageView && (a[g] = !0, c[g] = !0), f && (a[d] = c), t._tfa.config.safeGet("tfa:trk:topics-enabled", !1, i.bakedPublisherId) && e.browsingTopics && (p = n.trk.readGoogleTopicsApiFromLocalStorage()) && (a.top = p), a
        },
        ht = function e(n) {
            var r = i.jsScope + "." + n.callbackName,
                o = J.getBlockedState(["banner_ad", "sponsored_ad"]);
            return {
                id: ~~(1e3 * Math.random()),
                ii: vt(n),
                it: Ct(t._taboola),
                sd: Ut(n.publisherId),
                ui: Dt(),
                vi: $,
                cv: i.tblVersion,
                uiv: "default",
                u: Ot(),
                e: ut(),
                cb: r,
                qs: ft(),
                r: [{
                    li: "rbox-tracking",
                    s: 0,
                    uim: "rbox-tracking:pub=" + i.bakedPublisherName + ":abp=" + o,
                    uip: "rbox-tracking",
                    orig_uip: "rbox-tracking"
                }]
            }
        },
        gt = function t(e) {
            var i = ht(e);
            return bt() && lt(i), e.isMediaRequest && (i = dt(e, i)), i
        },
        pt = function t(e) {
            for (var i = 0; i < e.length; ++i)
                for (var n = e[i], o = r.objKeys(n), s = 0; s < o.length; ++s) {
                    var a = o[s],
                        c = n[a];
                    if ("unknown" !== c) switch ("auto" === c && (c = ""), a) {
                        case "video":
                            u = c;
                            break;
                        case "url":
                            f = c;
                            break;
                        case "article":
                        case "category":
                        case "home":
                        case "search":
                        case "photo":
                        case "other":
                        case "content_hub":
                            l = c;
                            break;
                        case "ref_url":
                            d = c
                    }
                }
        },
        mt = function e(i) {
            if (i) {
                var r = n.trk.getPublisherRequestId(i);
                if (r) return r
            }
            return t.TRC.events_ri
        },
        vt = function t(e) {
            var n = null;
            return u || "" === u ? n = u : (l || "" === l) && (n = l), ("" === n || e.isMediaRequest) && (n = yt("item-id", i.normalizeItemId, i.prenormalizeIdRules)), n
        },
        St = function t(e, i, n) {
            var o;
            if (!n) return i;
            r.forEach(function(t) {
                var e = i.search(t);
                e >= 0 && (i = i.substr(0, e))
            }, n["truncate-at"] || []);
            for (var s = new W(i), a = r.objKeys(n), c = 0; c < a.length; ++c) {
                var u = a[c];
                if (n[u]) switch (u) {
                    case "host":
                        delete s.host;
                        break;
                    case "trailing-dirsep":
                        for (;
                            "/" === s.pathname.substr(s.pathname.length - 1);) s.pathname = s.pathname.substr(0, s.pathname.length - 1);
                        break;
                    case "query":
                        var l = [],
                            f = s.search.replace(/^\?/, "").split("&");
                        "string" == typeof(o = n[u]) && (o = new RegExp(o));
                        var d = o instanceof Array ? function(t) {
                            for (var e = 0; e < o.length; e++)
                                if (t === o[e]) return !0;
                            return !1
                        } : o instanceof RegExp ? o.test.trcBind(o) : function() {
                            return !1
                        };
                        f.forEach(function(t) {
                            d(decodeURIComponent(t.split("=")[0])) && l.push(t)
                        }), s.search = (l.length ? "?" : "") + l.join("&");
                        break;
                    case "fragment":
                        var h = s.hash.replace(/^#/, "");
                        "string" == typeof(o = n[u]) && (o = new RegExp(o)), s.hash = "", o instanceof RegExp && o.test(h) ? s.hash = "#" + h : o instanceof Array && o.forEach(function(t) {
                            h.search(t) >= 0 && (s.hash = "#" + h)
                        })
                }
            }
            return s.pathname || (s.pathname = "/"), "item-id" === e ? s.toString().toLowerCase() : s.toString()
        },
        bt = function t() {
            return Tt(ut(), "ampproject.net")
        },
        It = function t() {
            return Tt(ut(), "instantarticles.fb.com")
        },
        Tt = function t(e, i) {
            try {
                return void 0 !== e && void 0 !== i && e.indexOf(i) > 0
            } catch (t) {
                return !1
            }
        },
        yt = function t(e, n, r) {
            var o = ["paramUrl", "meta", "canonical", "og", "location"],
                s = {
                    paramUrl: Et,
                    canonical: wt,
                    og: Rt,
                    location: _t
                },
                a = i.urlExtractOrder && Array.isArray(i.urlExtractOrder) ? i.urlExtractOrder : o,
                c = 0,
                l, f, d, h = "",
                g = function t(e, i) {
                    return St.call(this, e, i, r)
                };
            for (a.push("location"); c < a.length && (!h || /^\s*$/.test(h));) f = a[c], h = (l = s[a[c]]) ? l.call(null, e, g) : null, c++;
            return "item-url" === e && f === Et ? h : (d = f !== _t, h = "function" == typeof n ? n.call(this, h, u ? "video" : "text", d) : h)
        },
        Et = function t(e, i) {
            return !f || "item-id" !== e && "item-url" !== e ? null : i.call(this, e, n.trk.encodeItemUrlIfNeeded(f))
        },
        wt = function t(i, r) {
            for (var o = e.head.getElementsByTagName("link"), s = 0; s < o.length; s++)
                if ("canonical" === o[s].rel && o[s].href) return r.call(this, i, n.trk.encodeItemUrlIfNeeded(o[s].href));
            return null
        },
        Rt = function t(i, r) {
            for (var o = e.head.getElementsByTagName("meta"), s = 0; s < o.length; s++)
                if ("og:url" === o[s].getAttribute("property") && o[s].content.length > 5) return r.call(this, i, n.trk.encodeItemUrlIfNeeded(o[s].content));
            return null
        },
        _t = function e(i, n) {
            var o = function e() {
                var i = t.location,
                    n = r.filter(function(t) {
                        return 0 !== t.search("trc_") && "taboola-debug" !== t
                    }, i.search.replace(/^\?/, "").split("&")).join("&");
                return i.origin + i.pathname + "?" + n
            };
            return n.call(this, i, o())
        },
        Ct = function t(e) {
            try {
                var i = r.objKeys(e[0]);
                for (var n in i) switch (i[n]) {
                    case "home":
                        return "home";
                    case "category":
                        return "category";
                    case "text":
                    case "article":
                        return "text";
                    case "search":
                        return "search";
                    case "photo":
                        return "photo";
                    case "other":
                        return "other";
                    case "content_hub":
                        return "content_hub";
                    case "video":
                    default:
                        return "video"
                }
            } catch (t) {
                return "video"
            }
        },
        Ut = function t(e) {
            return localStorage.getItem(e + ":session-data")
        },
        Dt = function t() {
            return localStorage.getItem("taboola global:user-id")
        },
        Ot = function t() {
            return yt("item-url", i.normalizeItemUrl, i.prenormalizeUrlRules)
        },
        kt = function t(e) {
            for (var i, n = /^(.*\/libtrc\/.+\/)(?:(?:trk)|(?:tfa))\.js(?:\?(.*))?$/, r = 0; r < e.length; r++)
                if (i = e[r].src.match(n)) return i[1]
        },
        Pt = function t() {
            for (var i = kt(e.getElementsByTagName("script")), n = [{
                    key: "?",
                    index: 0
                }, {
                    key: "://",
                    index: 1
                }, {
                    key: "//",
                    index: 1
                }, {
                    key: "/",
                    index: 0
                }], r = 0, o = n.length, s = i, a; r < o; r++) s = (a = H(s, n[r].key, 2)).length > 1 ? a[n[r].index] : a[0];
            return s
        },
        Nt = function e() {
            if (!t.TRC.AdServerManager) {
                var n = Pt();
                t.TRC.VVReady = At, X("//" + n + "/libtrc/vv." + i.tblVersion + ".js")
            }
        },
        At = function e() {
            t.TRC.adManager = new t.TRC.AdServerManager(i.vvConfig, i.tblVersion), t.TRC.adManager.startVV().then(function() {
                t.TRC.adManager.run()
            })
        },
        xt = function t(e, i) {
            return e ? e[i] : e
        },
        Mt = function t(e, i, n) {
            if (0 === r.objKeys(n).length || P["" + e]) return e;
            var o = document.createElement("a");
            o.href = f;
            var s = (o.host || location.host).toLowerCase(),
                a = (o.href || location.href).toLowerCase(),
                c = k[i],
                u = xt(n[s], c),
                l = "/",
                d = ["m", "mobile", "www2", "www3"],
                h = [],
                g, p, m, v, S;
            if (!u) {
                for (Q(n, h), h.sort(function(t, e) {
                        return t[0].length > e[0].length ? -1 : t[0].length < e[0].length ? 1 : 0
                    }), g = 0, p = h.length; g < p; g++)
                    if ((m = h[g][0].toLowerCase()).indexOf(l) > 0) {
                        if (a.match(m)) {
                            u = xt(h[g][1], c);
                            break
                        }
                        if (m.indexOf("www.") > -1 && a.match(m.replace("www.", ""))) {
                            u = xt(h[g][1], c);
                            break
                        }
                    } else if (s.match(m)) {
                    u = xt(h[g][1], c);
                    break
                }
                if (!u && s.indexOf("www.") < 0) {
                    for (g = 0, p = d.length; g < p && (v = new RegExp("(https://|http://|^)" + d[g] + "."), S = s.replace(v, "www."), !(u = xt(n[S], c))); g++);
                    u || (u = xt(n[S = "www." + s], c))
                }
            }
            return u || "unknown-site-on-" + e
        },
        Vt = function t(e, i, n) {
            var r = ot(e);
            return r ? i.call(this, r[S]) : n
        },
        Lt = function t(e, i, r) {
            var o, s, a = [];
            try {
                if (!Array.isArray(e)) return;
                for (s = 0; s < e.length; s++)(o = e[s]) && !i[o] && (i[o] = !0, o = W.prototype.switchProtocol.call(o, n.trk.rboxTrcProtocol()), a.push(r(o)));
                return a
            } catch (t) {}
        };
    t.TRC = t.TRC || {}, t.TRC.trk = n.trk = t.TRC.trk || {
        init: function e() {
            t.TRC.utm && !q() || (q() || p || (t.TRC._getGlobalRequestId = mt, t.TRC._getItemId = vt, t.TRC._getItemType = Ct, p = !0), t.TRC.hasTrk ? q() || n.trk.execute() : t._tfa && !t._tfa.config.hasValidConfig() || (n.hasTrk = !0, B() && (n.eventUtils.safeAddEventListener(n.sharedEvents.PAGE_VIEW, function(e) {
                try {
                    var r = e.detail,
                        o = r.publisherIdType,
                        s = r.accountId,
                        a = r.pageViewInitiator,
                        c = r.isUnifiedPageView,
                        u = a === n.pageViewInitiator.TFA,
                        l = r.metadata,
                        f, d;
                    if (pt(t._taboola), u) {
                        if (t._tfa.config.safeGet("tfa:trk:prevent-concurrent-requests", !0, s) && n.trk.isRequestProcessing(s)) return;
                        t._tfa.config.safeGet("tfa:trk:network-solution-enabled", !1, s) && (s = Mt(s, o, i.networkMap))
                    }
                    d = tt(s, o, f = {
                        pageViewInitiator: a,
                        isMediaRequest: u,
                        isUnifiedPageView: c
                    }, l), K = K.loadTrc(s, o, f, d)
                } catch (e) {
                    n.eventUtils.dispatchEvent(n.sharedEvents.REQUEST_ID_CREATION_JS_ERROR, {
                        publisherId: s
                    })
                }
            }), q() || n.trk.execute(), i.enableVV && Nt(), q() && t._tfa.config.safeGet("tfa:trk:topics-enabled", !1, i.bakedPublisherId) && this.saveGoogleTopicsApiInLocalStorage())))
        },
        execute: function e() {
            var r = n.publisherIdType.NAME,
                o = Mt(i.bakedPublisherName, r, i.networkMap);
            n.eventUtils.dispatchEvent(n.sharedEvents.PAGE_VIEW, {
                accountId: o,
                publisherIdType: r,
                pageViewInitiator: n.pageViewInitiator.TRK
            }), t.TRC.publisherId = t.TRC.publisherId || o
        },
        getRequestStatus: function t(e) {
            var i = ot(e);
            return i ? i[S] : U
        },
        isRequestProcessing: function t(e) {
            return Vt(e, function(t) {
                return O.indexOf(t) > -1
            }, !1)
        },
        hasRequestEnded: function t(e) {
            return Vt(e, function(t) {
                return D.indexOf(t) > -1 || !(O.indexOf(t) > -1)
            }, !1)
        },
        getPublisherRequestId: function t(e) {
            var i = ot(e);
            return i && i[S] === _ ? i[v] : null
        },
        getPublisherSessionData: function t(e) {
            var i = Ut(e);
            return i || null
        },
        getViewId: function t() {
            return $
        },
        getReferrer: ct,
        loadPixels: function e(i) {
            try {
                return Lt(i, t.TRC.sharedObjects.loadedPixels, function(t) {
                    var e = new Image;
                    return e.src = t, e
                })
            } catch (t) {}
        },
        loadScriptTags: function e(i) {
            try {
                return Lt(i, t.TRC.sharedObjects.loadedScripts, function(t) {
                    return X(t, null, null, !0)
                })
            } catch (t) {}
        },
        rboxNotLoaded: function e() {
            return !(t.TRC && t.TRC.utm)
        },
        rboxTrcProtocol: function t() {
            return i.rboxTrcProtocol
        },
        saveGoogleTopicsApiInLocalStorage: function t() {
            try {
                if (!e.browsingTopics) return;
                return e.browsingTopics().then(function(t) {
                    for (var e = [], i = 0; i < t.length; i++)
                        if (t[i].topic && t[i].taxonomyVersion) {
                            var n = {
                                i: t[i].topic,
                                v: t[i].taxonomyVersion
                            };
                            e.push(n)
                        }
                    localStorage.setItem("taboola global:top", JSON.stringify(e))
                }).catch(function() {})
            } catch (t) {}
        },
        readGoogleTopicsApiFromLocalStorage: function t() {
            var e, i;
            try {
                if ((i = (e = localStorage.getItem("taboola global:top")) ? JSON.parse(e) : null) && i.length > 0) return i
            } catch (t) {}
        },
        hasSuperUTFSeq: function t(e) {
            for (var i = e.split("").map(function(t) {
                    return t.charCodeAt(0)
                }), r = 0, o = 0; o < i.length; o++) {
                if (n.trk.isSuperUTF(i[o]) || (r = 0), r >= 3) return !0;
                r++
            }
            return !1
        },
        isSuperUTF: function t(e) {
            var i;
            return e > 1200
        },
        encodeItemUrlIfNeeded: function t(e) {
            try {
                if (n.trk.hasSuperUTFSeq(e)) return encodeURI(e)
            } catch (t) {}
            return e
        }
    }, q() && !t._tfa.config.safeGet("tfa:trk:enabled", !0, i.bakedPublisherId) || n.trk.init()
}(window, document, {
    bakedPublisherId: 1261215,
    bakedPublisherName: 'djichina-sc',
    tblVersion: "20230226-7-RELEASE",
    normalizeItemId: function(itemid, type, canon) {
        if (!canon && type == 'text' && typeof itemid == 'string' && itemid.search(new RegExp('^https?://')) == 0) itemid = itemid.replace(/\?.*/, '', false);
        return itemid.toLowerCase();
    },
    prenormalizeIdRules: {
        "host": true,
        "fragment": "^(/video/|!)",
        "query": ["p", "id"],
        "truncate-at": ["search.searchcompletion.com", "org.mozilla.javascript.undefined"],
        "trailing-dirsep": true
    },
    prenormalizeUrlRules: false,
    normalizeItemUrl: function(itemurl, type, canon) {
        return itemurl;
    },
    urlExtractOrder: null,
    networkMap: {},
    vvConfig: null,
    enableVV: false,
    rboxTrcProtocol: 'https:',
    tfaContext: true,
    jsScope: 'TFASC'.indexOf("{jsScope}") >= 0 ? "TRC" : 'TFASC'
}),
function(t, e) {
    t._tfa = t._tfa || [], e.useStorageDetection = t.TRC.useStorageDetection = t.TRC.useStorageDetection || !0, e.text = e.text || {}, e.text.lsplit = e.text.lsplit || function(t, e, i) {
        var n = t.split(e);
        return n.slice(0, i - 1).concat(n.length >= i ? n.slice(i - 1).join(e) : [])
    }, e.tfaUtil = e.tfaUtil || {}, e.tfaUtil.safeAddParam = e.tfaUtil.safeAddParam || function(t, e, i) {
        var n, r;
        i && e && t && (n = encodeURIComponent(t), r = encodeURIComponent(e), i.push(n + "=" + r))
    }, e.tfaUtil.getParameterByName = e.tfaUtil.getParameterByName || function(t, e) {
        if (!e || !t) return null;
        t = t.replace(/[\[\]]/g, "\\$&");
        var i, n = new RegExp("[?&]" + t + "(=([^&#]*)|&|#|$)").exec(e);
        return n ? n[2] ? decodeURIComponent(n[2].replace(/\+/g, " ")) : "" : null
    };
    var i = t.TRCImpl = t.TRCImpl || {};
    i.global = i.global || {}, t.__trcError = t.__trcError || function t() {}
}(window, window['TFASC'.indexOf("{jsScope}") >= 0 ? "TRC" : 'TFASC']),
function(t, e) {
    var i = "taboola global",
        n = "trctestcookie";

    function r() {
        for (var t = "trc_cookie_storage", i = new Object, n = document.cookie.split(/;\s+/), r = 0; r < n.length; r++) {
            var o = e.text.lsplit(n[r], "=", 2),
                s = unescape(o[0]),
                a = unescape(o[1]);
            if (s == t) {
                for (var c = a.split("|"), u = 0; u < c.length; u++) {
                    var o = c[u].split("=");
                    i[unescape(o[0])] = unescape(o[1])
                }
                break
            }
        }

        function l() {
            var e = new Array,
                n, r;
            for (var o in i) i.hasOwnProperty(o) && null != i[o] && (e[e.length] = escape(o) + "=" + escape(i[o]));
            n = e.length > 0 ? 1 : -1, r = new Date((new Date).getTime() + 365 * n * 864e5), document.cookie = t + "=" + escape(e.join("|")) + ";path=/;expires=" + r.toUTCString()
        }
        return this.getValue = function(t) {
            return i.hasOwnProperty(t) ? i[t] : null
        }, this.setValue = function(t, e) {
            i[t] = e, l()
        }, this.removeKey = function(t) {
            delete i[t], l()
        }, this
    }

    function o(t) {
        var e = t || {};
        return this.getValue = function(t) {
            return e[t] ? e[t] : null
        }, this.setValue = function(t, i) {
            e[t] = i
        }, this.removeKey = function(t) {
            delete e[t]
        }, this.getData = function() {
            return e
        }, this
    }

    function s(e) {
        return this.getValue = function(i) {
            return t[e + "Storage"].getItem(i)
        }, this.setValue = function(i, n) {
            try {
                t[e + "Storage"].setItem(i, n)
            } catch (t) {}
        }, this.removeKey = function(i) {
            try {
                t[e + "Storage"].removeItem(i)
            } catch (t) {}
        }, this
    }

    function a(e) {
        var i = t[e + "Storage"],
            n = (new Date).getTime() + "",
            r = "_taboolaStorageDetection";
        try {
            if (i.setItem(r, n), i.getItem(r) == n) return i.removeItem(r), i
        } catch (t) {}
        return null
    }

    function c(i) {
        try {
            if (t.localStorage instanceof Storage && e.useStorageDetection && a(i)) return new s(i)
        } catch (t) {
            return null
        }
    }
    var u = function n() {
        return this.state = {}, this.getLocalStorageImplementation = function(e, i) {
            if (null != this.state.privateStorageImpl && "strict-w3c-storage" != e) return this.state.privateStorageImpl;
            var n = t.TRCImpl ? t.TRCImpl.global : {};
            switch (e = e || (n["local-storage-usage"] ? n["local-storage-usage"] : "prefer-w3c-storage")) {
                case "strict-w3c-storage":
                    return c("session" === i ? "session" : "local");
                case "prefer-w3c-storage":
                    var s = c("local");
                    if (s) return this.state.privateStorageImpl = s;
                case "prefer-cookies":
                    try {
                        if (this.canWriteCookies()) return this.state.privateStorageImpl = new r
                    } catch (t) {}
                default:
                    return this.state.privateStorageImpl = new o
            }
        }, this.getFirstPartyCookie = function() {
            if (this.state.firstPartyCookie) return this.state.firstPartyCookie;
            var t = this.getLocalStorageImplementation();
            if (t instanceof r || t instanceof o) return this.state.firstPartyCookie = t;
            try {
                if (this.canWriteCookies()) return this.state.firstPartyCookie = new r
            } catch (t) {}
            return this.state.firstPartyCookie = new o
        }, this.canWriteCookies = function() {
            return t.navigator.cookieEnabled
        }, this.getDummyStorage = function(t) {
            return new o(t)
        }, this.getValue = function(t) {
            return this.getPublisherValue(i, t)
        }, this.storePublisherValue = function(t, e, i) {
            var n;
            this.isNotAllowedToWriteValue(e, i) || (n = this.buildKeyWithPublisher(t, e), this.getLocalStorageImplementation().setValue(n, i), this.addKeyToStoredKeysList(n))
        }, this.isNotAllowedToWriteValue = function(t, i) {
            return null == i || void 0 == i || e.doNotTrack && !this.isAllowedKeyWhenDoNotTrack(t)
        }, this.buildKeyWithPublisher = function(t, e) {
            return t + ":" + e
        }, this.getPublisherValue = function(t, i) {
            return e.doNotTrack && !this.isAllowedKeyWhenDoNotTrack(i) ? null : this.getLocalStorageImplementation().getValue(this.buildKeyWithPublisher(t, i))
        }, this.addKeyToStoredKeysList = function(t) {
            var e = this.getStoredKeysList(); - 1 === e.indexOf(t) && (e.push(t), this.setStoredKeysList(e))
        }, this.getStoredKeysList = function() {
            var t = this.buildKeyWithPublisher(i, "local-storage-keys"),
                e = this.getLocalStorageImplementation().getValue(t),
                n = [];
            try {
                n = JSON.parse(e) || []
            } catch (t) {
                __trcError("Could not parse local storage keys", t)
            }
            return n
        }, this.setStoredKeysList = function(t) {
            var e, n;
            try {
                e = JSON.stringify(t), n = this.buildKeyWithPublisher(i, "local-storage-keys"), this.getLocalStorageImplementation().setValue(n, e)
            } catch (t) {
                __trcError("Could not stringify local storage keys", t)
            }
        }, this.isAllowedKeyWhenDoNotTrack = function(e) {
            var i, n = (t.TRCImpl && t.TRCImpl.global || {})["dnt-allowed-keys"] || ["session-id"],
                r;
            return null !== e && void 0 !== e && (r = e.split(":")[1] || e, -1 !== n.indexOf(r))
        }, this.storeUserId = function(t) {
            this.isNotAllowedToWriteValue("user-id", t) || this.storePublisherValue(i, "user-id", t)
        }, this.getUserIdFirstPartyCookie = function() {
            return this.getFirstPartyCookie().getValue(this.buildKeyWithPublisher(i, "user-id"))
        }, this.getSessionDataFirstPartyCookie = function() {
            return this.getFirstPartyCookie().getValue(this.buildKeyWithPublisher(i, "session-data"))
        }, this.initState = function() {
            void 0 === this.state && (this.state = {}), this.state.privateStorageImpl = null
        }, this.initState(), this
    };
    e.tfaPageManager = e.tfaPageManager || new u, e.tfaPageManager.TABOOLA_GLOBAL_KEY = i
}(window, window['TFASC'.indexOf("{jsScope}") >= 0 ? "TRC" : 'TFASC']),
function(t, e, i) {
    var n = i.tfaPageManager,
        r = "https://",
        o = "tblci",
        s = "TABOOLA-DO-NOT-TRACK",
        a = "#" + o;

    function c(t, e) {
        t && e && (e[t] = !0)
    }

    function u(t, e, i) {
        for (var n = {}, r = 0; r < arguments.length; r++) c(arguments[r], n);
        return Object.keys(n).length > 1
    }
    i.tfaUserId = {
        initialized: !1,
        userId: null,
        clickId: null,
        getUserId: function t() {
            return this.userId
        },
        getClickId: function t() {
            return this.clickId
        },
        getHttpsPrefix: function t() {
            return r
        },
        sendUserIdsToTrc: function e(n, r, o, s) {
            var a, c = 'https:',
                l = [];
            if (u(n, r, o)) return i.tfaUtil.safeAddParam("uiref", n, l), i.tfaUtil.safeAddParam("uils", r, l), i.tfaUtil.safeAddParam("uifpc", o, l), i.tfaUtil.safeAddParam("tblci", s, l), a = new Image, t._tfa.config.safeGet("tfa:add-referrer-policy-when-firing-pixel", !0) && (a.referrerPolicy = "no-referrer-when-downgrade"), a.src = c + "//trc.taboola.com/sg/taboola-tfa/1/um/?" + l.join("&"), a
        },
        isUserCanBeTracked: function e(i) {
            return !i || !t._tfa.config.safeGet("tfa-uid:filter-do-not-track", !0) || -1 === i.indexOf(s)
        },
        readAndStoreUserId: function t() {
            var e = this.extractUserIdFromReferrer(),
                i = n.getValue("user-id"),
                r = n.getUserIdFirstPartyCookie();
            this.isUserCanBeTracked(e) || (e = void 0), this.isUserCanBeTracked(i) || (i = void 0), this.isUserCanBeTracked(r) || (r = void 0), this.sendUserIdsToTrc(e, i, r, this.getClickId()), e && (n.storeUserId(e), r && n.getFirstPartyCookie().setValue(n.TABOOLA_GLOBAL_KEY + ":" + "user-id", e)), this.userId = e || i || r
        },
        readAndStoreClickIdParam: function t() {
            var e = this.extractClickIdFromUrl(this.getWindowLocation().toString()) || this.extractClickIdFromUrl(this.getReferrer()),
                i = n.getValue(o);
            e && n.storePublisherValue(n.TABOOLA_GLOBAL_KEY, o, e), this.clickId = e || i
        },
        extractUserIdFromReferrer: function t() {
            var e = this.getReferrer();
            if (e && e.indexOf("taboola") > -1) return i.tfaUtil.getParameterByName("ui", e)
        },
        extractClickIdFromUrl: function t(e) {
            if (e) {
                var n = e.length > 1 && -1 !== e.indexOf("#") ? e.substring(e.indexOf("#")) : "",
                    r;
                if (r = i.tfaUtil.getParameterByName(o, e)) return r;
                if (n && n.length > a.length && 0 === n.indexOf(a)) return n.substr(a.length)
            }
        },
        getWindowLocation: function e() {
            return t.location
        },
        getReferrer: function t() {
            return e.referrer
        },
        init: function t() {
            this.initialized || (this.readAndStoreUserId(), this.readAndStoreClickIdParam(), this.initialized = !0)
        }
    }, i.tfaUserId.init(), i.tfaUserId.CLICK_ID_KEY = o
}(window, document, window['TFASC'.indexOf("{jsScope}") >= 0 ? "TRC" : 'TFASC']),
function(t, e) {
    var i = "_tfa",
        n = t[i] = t[i] || [],
        r, o, s, a, c = 6 * 60 * 60 * 1e3,
        u = "eng_mt",
        l = "crossSessionsData",
        f = 36,
        d;

    function h(t, e, i) {
        var n = this.getTimeLeftForSession(t, this.getSessionDuration(), e);
        n < 0 && (n = 0), setTimeout(function() {
            i()
        }, n)
    }

    function g(t) {
        return t.ver && t.ver === this.getDataVersion()
    }
    var p = function t() {};
    p.prototype = {
        constructor: p,
        init: function t(i) {
            if (d = n.config.safeGet("tfa:engagement:session-duration-in-milliseconds", c), !this.isInitialized()) {
                var r = e.eventUtils.getDateNow(),
                    o = this.getSessionDataFromStorage();
                if (this.getIsLocalStorageAvailable()) return s = o && o.sessionStartTime, h.call(this, o, r, i), s && !this.isSessionInvalid(o) || (s = r, this.persistDefaultValues(s)), a = !0, this
            }
        },
        getStorageKey: function t() {
            return u
        },
        getCrossSessionsData: function t(e) {
            var i = e && e.getValue(this.getStorageKey()),
                n = i && JSON.parse(i);
            return n && n[l]
        },
        resetStorageMetricData: function t() {
            var i = e.tfaPageManager.getLocalStorageImplementation("strict-w3c-storage"),
                n = this.getCrossSessionsData(i),
                r = {
                    crossSessionsData: n
                };
            i.setValue(this.getStorageKey(), n ? JSON.stringify(r) : "")
        },
        hasOnlyCrossSessionData: function t(e, i) {
            return e && 1 === e.length && i.hasOwnProperty(l)
        },
        isSessionInvalid: function t(e) {
            if (!e) return !0;
            var i = Object.keys(e);
            return this.hasOnlyCrossSessionData(i, e)
        },
        getSessionDataFromStorage: function t() {
            var i, n;
            i = e.tfaPageManager.getLocalStorageImplementation("strict-w3c-storage"), o = !!i;
            var r = i && i.getValue(this.getStorageKey());
            if (n = r && JSON.parse(r)) return this.isSessionInvalid(n) ? n : !g.call(this, n) || this.hasSessionEnded() ? (this.resetStorageMetricData(), n) : n
        },
        hasSessionEnded: function t() {
            return !!a && (!s || e.eventUtils.getDateNow() - s > this.getSessionDuration())
        },
        persistDefaultValues: function t(i) {
            var n = e.tfaPageManager.getLocalStorageImplementation("strict-w3c-storage");
            if (n) {
                var r = {
                        ver: f,
                        sessionStartTime: i,
                        scrollDepth: 0,
                        sessionDepth: [],
                        timeOnSite: 0
                    },
                    o = this.getCrossSessionsData(n);
                o && (r[l] = o), n.setValue(this.getStorageKey(), JSON.stringify(r))
            }
        },
        persistSpecificMetricsData: function t(i, n) {
            var r = e.tfaPageManager.getLocalStorageImplementation("strict-w3c-storage"),
                o;
            r && i && (o = this.getSessionDataFromStorage()) && (o[i] = n, r.setValue(this.getStorageKey(), JSON.stringify(o)))
        },
        getCrossSessionsDataKey: function t() {
            return l
        },
        getSessionDuration: function t() {
            return d
        },
        getDataVersion: function t() {
            return f
        },
        getIsLocalStorageAvailable: function t() {
            return o
        },
        getSessionStartTime: function t() {
            return s
        },
        getTimeLeftForSession: function t(e, i, n) {
            return e && s ? s + i - n : i
        },
        isInitialized: function t() {
            return a
        }
    }, (r = n.TEM = n.TEM || {}).ESU = r.ESU || new p
}(window, window['TFASC'.indexOf("{jsScope}") >= 0 ? "TRC" : 'TFASC']),
function(t, e) {
    var i = "_tfa",
        n;

    function r(t, e) {
        this.storageUtils.persistSpecificMetricsData(t, e)
    }
    var o = function t() {};
    o.prototype = {
        constructor: o,
        init: function t(e, i, n) {
            this.isValid = e && i && n, this.storageUtils = e, this.visibilityListener = n, this.refreshFromStorage(), this.initLastVisibleStartTime(), this.visibilityListener.subscribeToEvent(this.handleVisibilityChange.bind(this)), i.subscribeToEvent(this.handleStorageChange.bind(this))
        },
        getStorageKey: function t() {
            return "timeOnSite"
        },
        initLastVisibleStartTime: function t() {
            this.isValid && (this.lastVisibleStartTime = e.eventUtils.getDateNow())
        },
        refreshFromStorage: function t() {
            if (this.isValid) {
                var e = this.storageUtils.getSessionDataFromStorage(),
                    i = 0;
                e && e[this.getStorageKey()] && (i = e[this.getStorageKey()] || 0), this.timeOnSite = i
            }
        },
        calcTimeOnSite: function t() {
            if (this.isValid) return this.lastVisibleStartTime ? this.timeOnSite + (e.eventUtils.getDateNow() - this.lastVisibleStartTime) : this.timeOnSite
        },
        handleVisibilityChange: function t() {
            this.isValid && (this.visibilityListener.getIsPageHidden() ? (this.timeOnSite = this.calcTimeOnSite(), r.call(this, this.getStorageKey(), this.timeOnSite)) : this.lastVisibleStartTime = e.eventUtils.getDateNow())
        },
        handleStorageChange: function t() {
            this.refreshFromStorage()
        },
        getTimeOnSite: function t() {
            if (this.isValid) return this.visibilityListener.getIsPageHidden() ? this.timeOnSite : this.calcTimeOnSite()
        }
    }, (n = t[i] = t[i] || []).TEM = n.TEM || {}, n.TEM.TOS = n.TEM.TOS || new o
}(window, window['TFASC'.indexOf("{jsScope}") >= 0 ? "TRC" : 'TFASC']),
function() {
    var t = "_tfa",
        e, i = !1,
        n;

    function r() {
        return void 0 == document.body || void 0 == document.documentElement ? 0 : (i = !0, Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) - document.documentElement.clientHeight);
        var t
    }

    function o(t, e) {
        this.storageUtils.persistSpecificMetricsData(t, e)
    }

    function s(t, e) {
        var i;
        return function() {
            var n = this,
                r = arguments;
            clearTimeout(i), i = setTimeout(function() {
                t.apply(n, r)
            }, e)
        }
    }
    var a = function t() {};
    a.prototype = {
        constructor: a,
        init: function t(e, i) {
            this.storageUtils = e || {}, i.subscribeToEvent(this.handleStorageChange.bind(this)), this.refreshFromStorage(), this.initEventListeners(), this.updateMeasurements(), this.calcMaxScrollPercentage()
        },
        getStorageKey: function t() {
            return "scrollDepth"
        },
        getScrollDepth: function t() {
            return i || this.calcMaxScrollPercentage(), this.maxScrollPercentage
        },
        getMaxScrollableAmount: function t() {
            return i || (this.maxScrollableAmount = r()), this.maxScrollableAmount
        },
        initEventListeners: function t() {
            window.addEventListener("resize", s(this.onResize.bind(this), 100)), window.addEventListener("scroll", s(this.onScroll.bind(this), 50))
        },
        refreshFromStorage: function t() {
            var e = this.storageUtils.getSessionDataFromStorage(),
                i = 0;
            e && e[this.getStorageKey()] && (i = e[this.getStorageKey()] || 0), this.maxScrollPercentage = i
        },
        onResize: function t() {
            this.updateMeasurements()
        },
        onScroll: function t() {
            this.calcMaxScrollPercentage()
        },
        updateMeasurements: function t() {
            this.winHeight = window.innerHeight, this.maxScrollableAmount = r()
        },
        calcMaxScrollPercentage: function t() {
            this.updateMeasurements();
            var e = 0 === this.maxScrollableAmount ? 0 : Math.floor(window.pageYOffset / this.maxScrollableAmount * 100);
            e > this.maxScrollPercentage && (this.maxScrollPercentage = e, o.call(this, this.getStorageKey(), this.maxScrollPercentage))
        },
        handleStorageChange: function t() {
            this.refreshFromStorage()
        }
    }, (n = (e = window[t] = window[t] || []).TEM = e.TEM || {}).SCD = n.SCD || new a
}(),
function(t, e) {
    var i, n, r = t["_tfa"].TEM,
        o = function t() {};
    o.prototype = {
        constructor: o,
        init: function t(i, n, r) {
            this.storageUtils = i, this.refreshFromStorage(), e.eventUtils.safeAddEventListener(r, this.handleUnipPageView.bind(this)), n.subscribeToEvent(this.handleStorageChange.bind(this))
        },
        getKey: function t() {
            return "ssd"
        },
        getStorageKey: function t() {
            return "sessionDepth"
        },
        setState: function t(e) {
            this.visitedUrls = {};
            for (var i = 0; i < e.length; i++) this.visitedUrls[e[i]] = !0
        },
        getState: function t() {
            return this.visitedUrls ? Object.keys(this.visitedUrls) : []
        },
        getMetric: function t() {
            return this.getState().length
        },
        persistState: function t() {
            var e = this.getState();
            this.storageUtils.persistSpecificMetricsData(this.getStorageKey(), e)
        },
        refreshFromStorage: function t() {
            var e = this.storageUtils.getSessionDataFromStorage(),
                i = [];
            e && e[this.getStorageKey()] && (i = e[this.getStorageKey()] || []), this.setState(i)
        },
        handleUnipPageView: function t() {
            try {
                var i = e.eventUtils.hashString(window.location.href);
                this.visitedUrls[i] || (this.visitedUrls[i] = !0, this.persistState())
            } catch (t) {}
        },
        handleStorageChange: function t() {
            this.refreshFromStorage()
        },
        isURLVisited: function t(e) {
            return this.visitedUrls && this.visitedUrls[e]
        }
    }, r.SSD = r.SSD || new o
}(window, window['TFASC'.indexOf("{jsScope}") >= 0 ? "TRC" : 'TFASC']),
function(t) {
    var e, i = t["_tfa"] || [],
        n = i.TEM || {},
        r = 30 * 24 * 60 * 60 * 1e3,
        o = 10,
        s = "tfa:engagement:session-history-timeframe-in-milliseconds",
        a = "tfa:engagement:session-history-limit",
        c = "sessionsHistory",
        u, l, f = function t() {};
    f.prototype = {
        init: function t(e) {
            u = i.config.safeGet(a, o), l = i.config.safeGet(s, r), this.storageUtils = e, this.updateCrossSessionsData(this.storageUtils.getSessionStartTime())
        },
        updateCrossSessionsData: function t(e) {
            var i = this.updateData(e);
            return this.storageUtils.persistSpecificMetricsData(this.storageUtils.getCrossSessionsDataKey(), i), i
        },
        updateData: function t(e) {
            var i = this.getCrossSessionsDataFromStorage() || {};
            return i[c] = this.getSessionsHistory(e), i
        },
        resetCrossSessionsData: function t() {
            this.storageUtils.persistSpecificMetricsData(this.storageUtils.getCrossSessionsDataKey(), "")
        },
        getCrossSessionsDataFromStorage: function t() {
            var e = this.storageUtils.getSessionDataFromStorage();
            return e && e[this.storageUtils.getCrossSessionsDataKey()]
        },
        getFilteredSessionsHistory: function t(e, i) {
            var n = e ? this.removeOldSessions(e, i) : [];
            if (!n.indexOf(i) > -1 && !this.isInPreviousSession(n, i)) {
                for (; n.length > u - 1;) n.shift();
                n.push(i)
            }
            return n
        },
        removeOldSessions: function t(e, i) {
            for (var n = [], r = 0; r < e.length; r++) this.isSessionOld(e[r], i) || n.push(e[r]);
            return n
        },
        isSessionOld: function t(e, i) {
            return i - l > e
        },
        getSessionsHistory: function t(e) {
            var i = this.getCrossSessionsDataFromStorage(),
                n = i ? i[c] : [];
            return this.getFilteredSessionsHistory(n, e)
        },
        isInPreviousSession: function t(e, i) {
            return !(!Array.isArray(e) || !e.length) && i - e[e.length - 1] < this.storageUtils.getSessionDuration();
            var n, r
        }
    }, n.crossSessionsUtils = n.crossSessionsUtils || new f
}(window),
function(t) {
    var e, i = t["_tfa"] || [],
        n = i.TEM || {},
        r = "tfa:engagement:return-visits:is-enabled",
        o, s = function t() {};
    s.prototype = {
        init: function t(e, n, s) {
            (o = i.config.safeGet(r, !1)) && (this.storageUtils = e, this.crossSessionsUtils = s, this.refreshSessionsHistoryFromLocalStorage(), n.subscribeToEvent(this.handleStorageChange.bind(this)))
        },
        setState: function t(e) {
            this.sessionsHistory = [];
            for (var i = 0; i < e.length; i++) this.sessionsHistory.push(e[i])
        },
        addReturnVisits: function t(e) {
            if (e) {
                if (o) {
                    var i = this.getReturnVisits();
                    e.rv = i && i.length
                }
                return e
            }
        },
        getReturnVisits: function t() {
            var e = this.sessionsHistory;
            return Array.isArray(e) && e.length ? e : []
        },
        refreshSessionsHistoryFromLocalStorage: function t() {
            var e = this.storageUtils ? this.storageUtils.getSessionStartTime() : [],
                i = this.crossSessionsUtils && this.crossSessionsUtils.getSessionsHistory(e);
            this.setState(i)
        },
        handleStorageChange: function t() {
            this.refreshSessionsHistoryFromLocalStorage()
        }
    }, n.returnVisits = n.returnVisits || new s
}(window),
function(t, e) {
    var i = "_tfa",
        n, r = function t() {};
    r.prototype = {
        constructor: r,
        init: function t() {
            this.runningId = 0, this.subscribers = {}, this.setVisibilityProperties(), this.initMetricData(), this.initListener()
        },
        initMetricData: function t() {
            this.isPageHidden = document[this.hiddenProp]
        },
        initListener: function t() {
            e.eventUtils.safeAddEventListener(this.visibilityChangeEventName, this.handleVisibilityChange.bind(this))
        },
        setVisibilityProperties: function t() {
            void 0 !== document.hidden ? (this.hiddenProp = "hidden", this.visibilityChangeEventName = "visibilitychange") : void 0 !== document.msHidden ? (this.hiddenProp = "msHidden", this.visibilityChangeEventName = "msvisibilitychange") : void 0 !== document.webkitHidden && (this.hiddenProp = "webkitHidden", this.visibilityChangeEventName = "webkitvisibilitychange")
        },
        handleVisibilityChange: function t() {
            this.isPageHidden = document[this.hiddenProp], this.notify()
        },
        getIsPageHidden: function t() {
            return this.isPageHidden
        },
        subscribeToEvent: function t(e) {
            var i = this.runningId++;
            return this.subscribers[i] = e,
                function() {
                    delete this.subscribers[i]
                }.bind(this)
        },
        notify: function t() {
            Object.keys(this.subscribers).forEach(function(t) {
                this.subscribers[t]()
            }.bind(this))
        }
    }, (n = t[i] = t[i] || []).TEM = n.TEM || {}, n.TEM.visibilityListener = n.TEM.visibilityListener || new r
}(window, window['TFASC'.indexOf("{jsScope}") >= 0 ? "TRC" : 'TFASC']),
function(t, e) {
    var i = "_tfa",
        n, r = function t() {};
    r.prototype = {
        constructor: r,
        init: function t(e) {
            this.runningId = 0, this.subscribers = {}, this.storageUtils = e, this.initListener()
        },
        initListener: function t() {
            e.eventUtils.safeAddEventListenerToWindow("storage", this.handleStorageChange.bind(this))
        },
        handleStorageChange: function t(e) {
            e && e.key === this.storageUtils.getStorageKey() && this.notify(e)
        },
        subscribeToEvent: function t(e) {
            var i = this.runningId++;
            return this.subscribers[i] = e,
                function() {
                    delete this.subscribers[i]
                }.bind(this)
        },
        notify: function t(e) {
            Object.keys(this.subscribers).forEach(function(t) {
                this.subscribers[t](e)
            }.bind(this))
        }
    }, (n = t[i] = t[i] || []).TEM = n.TEM || {}, n.TEM.storageListener = n.TEM.storageListener || new r
}(window, window['TFASC'.indexOf("{jsScope}") >= 0 ? "TRC" : 'TFASC']),
function(t, e) {
    var i = "_tfa",
        n = t[i] = t[i] || [],
        r, o = n.TEM = n.TEM || {},
        s = o.ESU || {},
        a = o.SCD || {},
        c = o.SSD || {},
        u = o.TOS || {},
        l = o.returnVisits || {},
        f = o.crossSessionsUtils || {},
        d = o.visibilityListener || {},
        h = o.storageListener || {},
        g = 1500,
        p = 50,
        m = 3e4,
        v = "numOfTimesMetricsSent",
        S = "pre_d_eng_tb",
        b = {
            SESSION_END: "SESSION_END"
        },
        I, T, y = !1,
        E = Date.now();

    function w(t, e) {
        var i = u.getTimeOnSite(),
            n = a.getScrollDepth(),
            r = c.getMetric(),
            o = {
                notify: "event",
                name: S,
                tos: i,
                scd: n,
                ssd: r,
                est: s.getSessionStartTime(),
                ver: s.getDataVersion(),
                isls: s.getIsLocalStorageAvailable(),
                src: t,
                invt: e,
                msa: "function" == typeof a.getMaxScrollableAmount ? a.getMaxScrollableAmount() : void 0
            };
        return o = l.addReturnVisits(o)
    }

    function R(t, e) {
        var i = w(t, e);
        i.est && (r.pageViewAccountIds ? _(r.pageViewAccountIds, i) : C(i))
    }

    function _(t, e) {
        var i = Object.keys(t);
        i.length > 0 ? i.forEach(function(i) {
            e.id = t[i], C(e)
        }) : C(e)
    }

    function C(t) {
        r.push(t)
    }

    function U() {
        D(), s.resetStorageMetricData()
    }

    function D() {
        clearTimeout(T)
    }

    function O(t) {
        (isNaN(I) || I < 0) && (I = 0), s.hasSessionEnded() || (I++, s.persistSpecificMetricsData(v, I), k() || o.sendMetrics("i", t), P())
    }

    function k() {
        return u.getTimeOnSite() > 5 * 60 * 1e3 && c.getMetric() > 5
    }

    function P() {
        if (clearTimeout(T), y && !d.getIsPageHidden()) {
            var t = g * Math.pow(2, I);
            t !== 1 / 0 && (T = setTimeout(O, t, t))
        }
    }

    function N() {
        A(), P()
    }

    function A() {
        var t = s.getSessionDataFromStorage();
        I = t && t[v] && t[v] || 0
    }

    function x() {
        h.subscribeToEvent(V.bind(this)), d.subscribeToEvent(M.bind(this))
    }

    function M() {
        d.getIsPageHidden() ? D() : P()
    }

    function V(t) {
        function e(t) {
            var e = JSON.parse(t.newValue),
                r = JSON.parse(t.oldValue);
            return !i(e, r) && !n(e, r)
        }

        function i(t, e) {
            return t.sessionDepth.length !== e.sessionDepth.length
        }

        function n(t, e) {
            return t.timeOnSite !== e.timeOnSite
        }
        A(), t && y && !d.getIsPageHidden() && e(t) && (y = !1, D(), L(p, m, N, D))
    }

    function L(t, e, i, n) {
        var r = !1;

        function o(t) {
            if (window.top !== window) {
                var e = window.parent;
                for (e.postMessage(t, "*"); e !== e.parent;)(e = e.parent).postMessage(t, "*")
            }

            function i(e) {
                try {
                    for (var n = 0; n < e.frames.length; n++) {
                        var r = e.frames[n];
                        r !== window && (r.postMessage(t, "*"), i(r))
                    }
                } catch (t) {}
            }
            i(window.top), window.parent !== window && i(window)
        }

        function s() {
            o({
                type: "TARP",
                query: !1,
                t: E
            })
        }

        function a() {
            r = !1, o({
                type: "TARP",
                query: !0
            }), setTimeout(function() {
                r ? setTimeout(e, a) : y || (y = !0, i(), s())
            }, t)
        }
        y = !1, window.addEventListener("message", function(t) {
            var o = t.data;
            "TARP" === o.type && t.source !== window && (y ? o.query ? s() : o.t < E ? (y = !1, r = !0, n(), setTimeout(e, a)) : s() : o.query || (o.t < E ? r = !0 : (y = !0, i(), s())))
        }), a()
    }

    function j() {
        o.initialized || n.config.safeGet("tfa:engagement:is-manager-disabled", !1, 1261215) || (r = n.TUP || {}, o.initialized = !0, o.ESU.init(U), d.init(), h.init(s), x(), o.ESU.getIsLocalStorageAvailable() && (f.init(s), u.init(s, h, d), a.init(s, h), c.init(s, h, e.sharedEvents.PAGE_VIEW), l.init(s, h, f), o.initIntervalTrigger()), L(p, m, N, D))
    }
    o.init = o.init || j, o.onSessionEndTrigger = o.onSessionEndTrigger || U, o.sendMetrics = o.sendMetrics || R, o.initIntervalTrigger = o.initIntervalTrigger || N, o.EVENTS = o.EVENTS || b
}(window, window['TFASC'.indexOf("{jsScope}") >= 0 ? "TRC" : 'TFASC']),
function(t, e) {
    var i = "_tfa",
        n = t[i] = t[i] || [],
        r = "taboola global:last-external-referrer",
        o = "taboola",
        s = "other",
        a = ["taboola", "taboolanews", "taboolasyndication"];
    e.lastExternalReferrer = {
        init: function t() {
            n.config.safeGet("tfa:last-external-referrer:is-disabled", !1, 1261215) || this.extractExternalReferrerIfExistsAndStoreLocally()
        },
        extractExternalReferrerIfExistsAndStoreLocally: function e() {
            var i = this.extractExternalReferrer(t);
            i && this.saveExternalReferrerToLocalStorage(i)
        },
        extractExternalReferrer: function t(i) {
            var n = i.location.href,
                r = this.getExternalReferrer(i);
            return this.isExternalReferrerTaboola(n, r) ? o : r || e.tfaUtil.getParameterByName("utm_source", n) || e.tfaUtil.getParameterByName("gclid", n) || e.tfaUtil.getParameterByName("fbclid", n) || e.tfaUtil.getParameterByName("dicbo", n) || e.tfaUtil.getParameterByName("dclid", n) ? s : ""
        },
        isExternalReferrerTaboola: function t(i, n) {
            if (e.tfaUtil.getParameterByName("tblci", i)) return !0;
            var r = e.tfaUtil.getParameterByName("utm_source", i);
            if (r && "taboola" === r.toLowerCase()) return !0;
            if (n)
                for (var o = n.split("/")[2], s = 0; s < a.length; s++) {
                    var c, u;
                    if (new RegExp("(^|.+\\.)" + a[s] + "\\.com.*").exec(o)) return !0
                }
            return !1
        },
        getExternalReferrer: function t(e) {
            var i = e.document.referrer,
                n, r;
            if (i && e.location.hostname !== i.split("/")[2]) return i;
            return ""
        },
        saveExternalReferrerToLocalStorage: function t(i) {
            var n = e.tfaPageManager.getLocalStorageImplementation("strict-w3c-storage");
            n && n.setValue(r, i)
        },
        getLastExternalReferrer: function i() {
            var n = e.tfaPageManager.getLocalStorageImplementation("strict-w3c-storage");
            return n ? n.getValue(r) : this.extractExternalReferrer(t)
        }
    }, e.lastExternalReferrer.init()
}(window, window['TFASC'.indexOf("{jsScope}") >= 0 ? "TRC" : 'TFASC']),
function(t, e, i) {
    var n = e.tfaPageManager || {},
        r = "_tfa",
        o = window[r] = window[r] || [],
        s = o.TEM || {},
        a = {
            event: tt,
            subscription: it
        },
        c = /(\S+)taboola(\S+|)\.com\/libtrc\/unip\/(\S+)\/tfa\.js(\S+|)/,
        u = "script[src$='tfa.js']",
        l = "//",
        f = "page_view",
        d = ["notify", "id"],
        h = {
            name: "en",
            url: "item-url",
            referrer: "ref",
            timestamp: "tim"
        },
        g = -1,
        p = {
            protocol: 'https:',
            host: "trc.taboola.com",
            httpMethod: "get",
            loggerEventName: "unip",
            logToConsole: !0
        },
        m = {
            EMPTY_COMMAND: "EMPTY_COMMAND",
            MISSING_NOTIFY: "MISSING_NOTIFY",
            INVALID_NOTIFY: "INVALID_NOTIFY",
            MISSING_NAME: "MISSING_NAME",
            INVALID_ID: "INVALID_ID"
        },
        v = {
            TFA_VALIDATION_ERROR: "TFA_VALIDATION_ERROR"
        },
        S = ((E = {})[f] = rt, E),
        b = function() {
            var t = {};
            return t[e.sharedEvents.REQUEST_ID_CREATION_TIMEOUT] = "to", t[e.sharedEvents.REQUEST_ID_CREATION_ERROR] = "err", t[e.sharedEvents.REQUEST_ID_CREATION_JS_ERROR] = "jserr", t[e.sharedEvents.INVALID_TRK_RESPONSE] = "itrkr", t
        }(),
        I = !isNaN(parseFloat(1261215)),
        T = "callback",
        y = "ler",
        E;

    function w() {
        var t = st();
        t.initialized && t.domAccountId && setTimeout(function() {
            for (var t = st().asyncQueue; t.length;) at(t.shift())
        }, 0)
    }

    function R() {
        var t = _(),
            e;
        if (t && t.src && (e = t.src.replace(c, "$3"))) return /^\d+$/.test(e) ? parseInt(e, 10) : (ut("Value '" + e + "' is invalid for 'id' param in script source url '" + t.src + "'. Only numeric values are allowed."), g)
    }

    function _() {
        for (var t = document.querySelectorAll(u), e, i = 0; i < t.length; i++)
            if ((e = t[i]).src && e.src.indexOf("/unip/") > 0) return e
    }

    function C() {
        return e.eventUtils.getDateNow()
    }

    function U(t) {
        t["ce"] = "subscr"
    }

    function D(t) {
        var e = n.getSessionDataFirstPartyCookie();
        void 0 !== e && e && (t["sd"] = e)
    }

    function O(t) {
        var e = k();
        e && (t["ui"] = e)
    }

    function k() {
        try {
            var t = e.tfaUserId.getUserId(),
                i = n.getValue("user-id");
            if (t || i) return t || i
        } catch (t) {
            ut("Error while trying to add user-id param", t)
        }
    }

    function P(t) {
        try {
            var i = e.tfaUserId.getClickId();
            i && (t[e.tfaUserId.CLICK_ID_KEY] = i)
        } catch (e) {
            ut("Error while trying to addClickIdParam, params=" + JSON.stringify(t), e)
        }
    }

    function N(t) {
        var i = st();
        i.referrer || (i.referrer = e.trk.getReferrer()), t[h.referrer] = i.referrer
    }

    function A(t, e) {
        var i = h.url,
            n;
        St(dt(t), e) && (t[i] = t[i] || document.location.href)
    }

    function x(t) {
        var e = {},
            i = !1,
            n;
        for (var r in t[h.timestamp] = C(), t) !t.hasOwnProperty(r) || d.indexOf(r) >= 0 || (e[n = h.hasOwnProperty(r) ? h[r] : r] = t[r], i = !0);
        return i && e
    }

    function M(t, e) {
        L(e), V(t, e)
    }

    function V(t, i) {
        var n = ht(t) + l + gt(t, i);
        B(i, t), j(i, t);
        try {
            e.TRCLogger[p.httpMethod](n, p.loggerEventName, i, t)
        } catch (e) {
            ut("Error while trying to send to server event with id '" + t + "' and params '" + JSON.stringify(i) + "'.", e)
        }
    }

    function L(t) {
        var e = k(),
            i = t[T];
        if (i) {
            if (!e) return lt("No UserId to notify callback"), void delete t[T];
            if ("function" != typeof i) return lt("Callback function parameter is not a function " + i), void delete t[T];
            try {
                i({
                    userId: e
                })
            } catch (t) {
                ut("Error calling advertiser callback", t)
            }
            delete t[T]
        }
    }

    function j(t, e) {
        O(t), P(t), N(t), Y(t), A(t, e), $(t), K(t)
    }

    function K(t) {
        var i = e.lastExternalReferrer.getLastExternalReferrer();
        i && (t[y] = i)
    }

    function $(t) {
        t && s && s.ESU && s.ESU.getIsLocalStorageAvailable() && (F(t), G(t), q(t))
    }

    function F(t) {
        s.TOS && (t.tos = s.TOS.getTimeOnSite())
    }

    function G(t) {
        if (s.SSD) {
            var i = s.SSD.getMetric(),
                n = e.eventUtils.hashString(window.location.href);
            s.SSD.isURLVisited(n) || i++, t.ssd = i
        }
    }

    function q(t) {
        s.SCD && (t.scd = s.SCD.getScrollDepth())
    }

    function B(t, e) {
        W(t), z(t, e), J(t, e)
    }

    function H(t, e) {
        U(e), D(e), et(t, e)
    }

    function W(t) {
        t["vi"] = e.trk.getViewId()
    }

    function z(t, i) {
        var n = e.trk.getPublisherRequestId(i);
        n && (t["ri"] = n)
    }

    function J(t, i) {
        var n = e.trk.getPublisherSessionData(i);
        n && (t["sd"] = n)
    }

    function Q(t, e) {
        t["mrir"] = e
    }

    function Y(t) {
        t["cv"] = i
    }

    function Z(t, e) {
        if (t === f)
            for (var i in e)
                if (!([h.name, h.timestamp].indexOf(i) >= 0)) return !0;
        return !1
    }

    function X(t, i) {
        var n = st(),
            r;
        if (!e.trk.getPublisherRequestId(t)) {
            if (e.trk.isRequestProcessing(t)) return void n.messageDelayer.delayMessage(t, i, {
                successCallback: M,
                failCallback: function t(e, i, n, r) {
                    var o = b[r];
                    o || (o = r), Q(i, o), V(e, i)
                },
                timeoutInMillis: ft(t)
            });
            Q(i, e.trk.getRequestStatus(t))
        }
        V(t, i)
    }

    function tt(t, i) {
        var n = x(t),
            r = dt(n),
            o = S[r];
        if (i = parseInt(i, 10), !o || !o(n, i)) {
            if (mt(i)) {
                if (vt(i)) return void X(i, n);
                e.trk.getPublisherRequestId(i) || Q(n, "wffo")
            } else Q(n, "ttd");
            V(i, n)
        }
    }

    function et(t, e) {
        void 0 !== t["sourceurl"] && t["sourceurl"] && (e["surl"] = t["sourceurl"])
    }

    function it(t, e) {
        var i = x(t);
        H(t, i), V(parseInt(e, 10), i)
    }

    function nt(t, i) {
        var n = !1;
        try {
            n = !!e.tfaUserId.getClickId()
        } catch (t) {}
        return pt(i) && !Z(f, t) && !n
    }

    function rt(t, i) {
        var n = st(),
            r = !1;
        return i && (r = nt(t, i), j(t), n.pageViewAccountIds[i] = parseInt(i, 10), e.eventUtils.dispatchEvent(e.sharedEvents.PAGE_VIEW, {
            accountId: i,
            publisherIdType: e.publisherIdType.ID,
            pageViewInitiator: e.pageViewInitiator.TFA,
            isUnifiedPageView: r,
            metadata: t
        })), r
    }

    function ot(t) {
        return t ? t.notify ? a.hasOwnProperty(t.notify) ? t.name ? !(t.hasOwnProperty("id") && !/^\d+$/.test(t.id)) || (ct(m.INVALID_ID, t, "Value '" + t.id + "' is invalid for 'id' field in command '" + JSON.stringify(t) + "'. Only numeric values are allowed."), !1) : (ct(m.MISSING_NAME, t, "Mandatory 'name' field is missing in command '" + JSON.stringify(t) + "'."), !1) : (ct(m.INVALID_NOTIFY, t, "Value '" + t.notify + "' is invalid for 'notify' field in command '" + JSON.stringify(t) + "'."), !1) : (ct(m.MISSING_NOTIFY, t, "Mandatory 'notify' field is missing in command '" + JSON.stringify(t) + "'."), !1) : (ct(m.EMPTY_COMMAND, t, "Command is '" + t + "'."), !1)
    }

    function st() {
        return window && window[r] && window[r].TUP || {}
    }

    function at(t) {
        var e, i;
        if (ot(t))
            if (e = st(), i = t.id || e.domAccountId) {
                if (i !== g) try {
                    a[t.notify](t, i)
                } catch (e) {
                    ut("An error occurred while handling command '" + JSON.stringify(t) + "'.", e)
                }
            } else e.asyncQueue.push(t)
    }

    function ct(t, i, n) {
        var r = st();
        e.eventUtils.dispatchEvent(v.TFA_VALIDATION_ERROR, {
            accountId: r.domAccountId,
            errorCode: t,
            command: i
        }), ut(n)
    }

    function ut(t, e) {
        p.logToConsole && lt(t, e)
    }

    function lt(t, e) {
        e ? console.log("Taboola Pixel: " + t, e) : console.log("Taboola Pixel: " + t)
    }

    function ft(t) {
        return 500 + o.config.safeGet("tfa:trk:tracking-request-timeout", 2e3, t)
    }

    function dt(t) {
        return t[h.name]
    }

    function ht(t) {
        return o.config.safeGet("tfa:default-protocol", p.protocol, t)
    }

    function gt(t, e) {
        var i = dt(e),
            n;
        return o.config.safeGet("tfa:event-host-map", {}, t)[i] || p.host
    }

    function pt(t) {
        return mt(t) && o.config.safeGet("tfa:trk:is-unified-page-view", !1, t)
    }

    function mt(t) {
        return o.config.safeGet("tfa:trk:enabled", !0, t)
    }

    function vt(t) {
        return o.config.safeGet("tfa:trk:wait-for-request-id", !0, t)
    }

    function St(t, e) {
        var i = o.config.safeGet("tfa:add-item-url:event-list", [], e);
        return "*" === i || i.indexOf(t) >= 0
    }

    function bt() {
        var t = o.TUP = o.TUP || {},
            i = o.config.safeGet("tfa:get-publisher-id-from-baker", !1);
        t.domAccountId = t.domAccountId || (i && I ? 1261215 : R()), t.initialized || (t.push = o.TUP.push || at, t.initialized = !0, t.asyncQueue = [], t.EVENTS = v, t.pageViewAccountIds = {}, t.messageDelayer = new e.MessageDelayer("publisherId", e.sharedEvents.REQUEST_ID_CREATED, [e.sharedEvents.REQUEST_ID_CREATION_JS_ERROR, e.sharedEvents.REQUEST_ID_CREATION_ERROR, e.sharedEvents.REQUEST_ID_CREATION_TIMEOUT, e.sharedEvents.INVALID_TRK_RESPONSE]), s && s.init && s.init()), w()
    }
    bt()
}(window, window['TFASC'.indexOf("{jsScope}") >= 0 ? "TRC" : 'TFASC'], "20230226-7-RELEASE"),
function(t, e, i) {
    var n = "_tfa",
        r, o = {
            orderid: "orderid",
            currency: "currency",
            revenue: "revenue",
            quantity: "quantity",
            name: "name",
            attributionGroup: "attributionGroup"
        },
        s = {
            type: "marking-type"
        },
        a = 'https:' + "//trc.taboola.com/{$publishreId}log/3/{$logType}?",
        c = /(\S+)taboola(\S+|)\.com\/libtrc\/(\S+)\/tfa\.js(\S+|)/,
        u = "unip/",
        l = [],
        f = [],
        d = "_tecq",
        h = "_dcojobs",
        g = !isNaN(parseFloat(1261215));

    function p(t) {
        var e;
        switch (t.notify) {
            case "action":
                e = l;
                break;
            case "mark":
                e = f;
                break;
            case "event":
            case "subscription":
                e = r.TUP;
                break;
            case "ecevent":
                r.config && r.config.safeGet("tfa:ecomm:enabled", !1, t.id) ? e = window[d] = window[d] || [] : r.config && r.config.safeGet("tfa:dco:jobs:enabled", !1, t.id) && (e = window[h] = window[h] || []);
                break;
            default:
                return
        }
        e && e.push(t)
    }

    function m() {
        return i.tfaUserId && i.tfaUserId.getUserId() ? "&ui=" + encodeURIComponent(i.tfaUserId.getUserId()) : ""
    }

    function v() {
        return i.tfaUserId && i.tfaUserId.getClickId() ? "&" + i.tfaUserId.CLICK_ID_KEY + "=" + encodeURIComponent(i.tfaUserId.getClickId()) : ""
    }

    function S() {
        var e, i, n, r;
        if (n = t._tfa.config.safeGet("tfa:get-publisher-id-from-baker", !1) && g ? 1261215 : _())
            for (e = 0, i = l.length; e < i; e++) T(I(a, {
                $publishreId: n ? n + "/" : "",
                $logType: "action"
            }) + "tim=" + escape(E()) + "&item-url=" + escape(y()) + C(o, l.shift()) + w() + m() + v())
    }

    function b() {
        var e, i, n, r;
        if (n = t._tfa.config.safeGet("tfa:get-publisher-id-from-baker", !1) && g ? 1261215 : _())
            for (e = 0, i = f.length; e < i; e++) T(I(a, {
                $publishreId: n ? n + "/" : "",
                $logType: "mark"
            }) + "tim=" + escape(E()) + "&item-url=" + escape(y()) + C(s, f.shift()) + w() + m() + v())
    }

    function I(t, e) {
        return t.replace(/\{([^{}]*)\}/g, function(t, i) {
            var n = e[i];
            return "string" == typeof n || "number" == typeof n ? n : t
        })
    }

    function T(e) {
        var i = new Image;
        t._tfa.config.safeGet("tfa:add-referrer-policy-when-firing-pixel", !0) && (i.referrerPolicy = "no-referrer-when-downgrade"), i.src = e
    }

    function y() {
        return t.location.href
    }

    function E() {
        var t = new Date,
            e = t.getHours(),
            i = t.getMinutes(),
            n = t.getSeconds() + t.getMilliseconds() / 1e3;
        return (e < 10 ? "0" : "") + e + ":" + (i < 10 ? "0" : "") + i + ":" + (n < 10 ? "0" : "") + n.toFixed(3)
    }

    function w() {
        var i = t.location.search,
            n = e.referrer.match(/(\?\S+)$/g),
            r = "";
        return r = R(i.replace(/^\?/, "").split(/&/)) + (n ? R(n[0].replace(/^\?/, "").split(/&/)) : "")
    }

    function R(t) {
        var e = "",
            i, n, r = "trc_";
        for (i = 0, n = t.length; i < n; i++) 0 == t[i].indexOf(r) && (e = e + "&" + t[i]);
        return e
    }

    function _() {
        var t = document.getElementsByTagName("script"),
            e, i, n = "",
            r;
        for (e = 0, i = t.length; e < i; e++)
            if ((r = t[e].src) && (n = r.replace(c, "$3")) !== t[e].src && n.indexOf(u) < 0) return n;
        return n
    }

    function C(t, e) {
        var i, n = "";
        for (i in t) void 0 !== e[i] && (n += "&" + t[i] + "=" + e[i]);
        return n
    }

    function U(t) {
        for (var e = 0; e < arguments.length; e++)(t = arguments[e]) instanceof Object && p(t);
        return D(), arguments.length
    }

    function D() {
        S(), b()
    }

    function O() {
        for (; r.length;) U(r.shift())
    }

    function k() {
        (r = t[n] = t[n] || []).registered || (r.push = U, r.registered = !0, O())
    }
    k()
}(window, document, window['TFASC'.indexOf("{jsScope}") >= 0 ? "TRC" : 'TFASC']);