! function(t) {
    try {
        var n = "https://",
            e = "aHR0cHM6Ly9waXBzLnRhYm9vbGEuY29t",
            r = ["YXJjaGl0ZWN0dXJl", "cGxhdGZvcm1WZXJzaW9u", "dWFGdWxsVmVyc2lvbg=="],
            a = ["YnJhbmRz", "bW9iaWxl", "bW9kZWw=", "cGxhdGZvcm0=", "cGxhdGZvcm1WZXJzaW9u", "dWFGdWxsVmVyc2lvbg=="];
        t.TRC.cdsPips = {
            userId: null,
            getHttpsPrefix: function t() {
                return n
            },
            doNothing: function t() {
                return !0
            },
            safeGetTfaConfig: function n(e, r, a) {
                return t._tfa && t._tfa.config && t._tfa.config.safeGet && t._tfa.config.safeGet(e, r, a)
            },
            safeGetRboxConfig: function t(n) {
                var e;
                return (TRCImpl ? TRCImpl.global : {})[n]
            },
            prepareGenericRequest: function n(e, r) {
                var a, o = new(t.XDomainRequest || t.XMLHttpRequest);
                return o.open(e, r), o.onload = this.doNothing, o.onerror = this.doNothing, o.onprogress = this.doNothing, o
            },
            tryToReadUserIdFromLocalStorage: function t() {
                try {
                    return window.localStorage["taboola global:user-id"]
                } catch (t) {
                    return null
                }
            },
            getUserId: function n() {
                var e = t.TFASC && t.TFASC.tfaUserId && "function" == typeof t.TFASC.tfaUserId.getUserId ? t.TFASC.tfaUserId.getUserId() : null,
                    r = t.TRC.pageManager && "function" == typeof t.TRC.pageManager.getUserId ? t.TRC.pageManager.getUserId() : null,
                    a = TRC.cdsPips.tryToReadUserIdFromLocalStorage();
                return e || r || a
            },
            sendFinalReq: function n(e) {
                var r = "".concat(this.getHttpsPrefix(), "cds.taboola.com?uid=").concat(this.userId),
                    a;
                (null !== e[0] && (r += "&uad=".concat(e[0])), e[1] && (e[1].platform && (r += "&ptf=".concat(t.btoa(e[1].platform)), e[1].platformVersion && (r += "&ptfv=".concat(t.btoa(e[1].platformVersion)))), e[1].model && (r += "&mdl=".concat(t.btoa(e[1].model))), e[1].uaFullVersion && (r += "&ufv=".concat(t.btoa(e[1].uaFullVersion))), e[1].brands && (r += this.parseFullVersionList(e[1].brands)), "mobile" in e[1] && (r += "&mbl=".concat(t.btoa(e[1].mobile)))), r !== "".concat(this.getHttpsPrefix(), "cds.taboola.com?uid=").concat(this.userId)) && this.prepareGenericRequest("GET", r).send()
            },
            parseFullVersionList: function n(e) {
                for (var r = "", a = 0; a < e.length; a++) r += "&bnd=".concat(t.btoa(e[a].brand), "&bndv=").concat(t.btoa(e[a].version));
                return r
            },
            sendSimpleReq: function t() {
                var n = "".concat(this.getHttpsPrefix(), "cds.taboola.com?uid=").concat(this.userId),
                    e;
                this.prepareGenericRequest("GET", n).send()
            },
            fetchUserAgentData: function n() {
                return new Promise(function(n) {
                    try {
                        navigator && navigator.userAgentData && navigator.userAgentData.getHighEntropyValues ? navigator.userAgentData.getHighEntropyValues(r.map(function(n) {
                            return t.atob(n)
                        })).then(function(e) {
                            var r = {};
                            a.forEach(function(n) {
                                var a = t.atob(n);
                                a in e && (r[a] = e[a])
                            }), Object.keys(r).length > 0 ? n(r) : n(null)
                        }) : n(null)
                    } catch (t) {
                        n(null)
                    }
                })
            },
            sendUadRequest: function n() {
                var r = this;
                return new Promise(function(n, a) {
                    if (r.safeGetTfaConfig("cds:send-uad-req", !1) || r.safeGetRboxConfig("cds:send-uad")) {
                        var o = r.prepareGenericRequest("GET", t.atob(e));
                        o.onreadystatechange = function() {
                            if (4 === this.readyState)
                                if (200 === this.status) {
                                    var t = o.responseText;
                                    t ? n("NULL" !== t ? t : null) : (__trcWarn("cds: error in pips - status ".concat(this.status, ", return null")), n(null))
                                } else __trcWarn("cds: error in pips - status ".concat(this.status, ", return null")), n(null)
                        }, o.timeout = 3e4, o.ontimeout = function() {
                            __trcWarn("cds: error in pips - timeout"), n(null)
                        }, o.send()
                    } else n(null)
                })
            },
            init: function n() {
                var e = this;
                t.TRC.cdsPips.cdsInitialized || (t.Promise ? (t.__trcWarn = t.__trcWarn || function t() {}, this.userId = this.getUserId(), this.userId && Promise.all([this.sendUadRequest(), this.fetchUserAgentData()]).then(function(t) {
                    return e.sendFinalReq(t)
                }, function() {
                    return e.sendSimpleReq()
                }), t.TRC.cdsPips.cdsInitialized = !0) : t.TRC.cdsPips.cdsInitialized = !0)
            }
        }, t.TRC.cdsPips.init()
    } catch (t) {
        __trcError("Error running cds", t)
    }
}(window);