'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = "/* add css styles here (optional) */\n\n\n/* Shared */\n.loginBtn {\n  box-sizing: border-box;\n  position: relative;\n  /* width: 13em;  - apply for fixed size */\n  margin: 0.2em;\n  padding: 0 15px 0 46px;\n  border: none;\n  text-align: left;\n  line-height: 34px;\n  white-space: nowrap;\n  border-radius: 0.2em;\n  font-size: 16px;\n  color: #FFF;\n}\n.loginBtn:before {\n  content: \"\";\n  box-sizing: border-box;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 34px;\n  height: 100%;\n}\n.loginBtn:focus {\n  outline: none;\n}\n.loginBtn:active {\n  box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);\n}\n\n\n/* Facebook */\n.loginBtn--facebook {\n  background-color: #4C69BA;\n  background-image: linear-gradient(#4C69BA, #3B55A0);\n  /*font-family: \"Helvetica neue\", Helvetica Neue, Helvetica, Arial, sans-serif;*/\n  text-shadow: 0 -1px 0 #354C8C;\n}\n.loginBtn--facebook:before {\n  border-right: #364e92 1px solid;\n  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat;\n}\n.loginBtn--facebook:hover,\n.loginBtn--facebook:focus {\n  background-color: #5B7BD5;\n  background-image: linear-gradient(#5B7BD5, #4864B1);\n}\n\n\n/* Google */\n.loginBtn--google {\n  /*font-family: \"Roboto\", Roboto, arial, sans-serif;*/\n  background: #DD4B39;\n}\n.loginBtn--google:before {\n  border-right: #BB3F30 1px solid;\n  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png') 6px 6px no-repeat;\n}\n.loginBtn--google:hover,\n.loginBtn--google:focus {\n  background: #E74B37;\n}\n";
styleInject(css);

var FacebookSSO = /** @class */ (function (_super) {
    __extends(FacebookSSO, _super);
    function FacebookSSO(props) {
        var _this_1 = _super.call(this, props) || this;
        _this_1.SDK_URL = "https://connect.facebook.net/vi_VI/sdk.js";
        _this_1.SCRIPT_ID = "facebook-jssdk";
        _this_1._window = window;
        _this_1.state = {
            isSdkLoaded: false,
            isProgressing: false
        };
        _this_1.loginFB = _this_1.loginFB.bind(_this_1);
        _this_1.getMe = _this_1.getMe.bind(_this_1);
        _this_1.handleResponse = _this_1.handleResponse.bind(_this_1);
        _this_1.initFbSDK = _this_1.initFbSDK.bind(_this_1);
        return _this_1;
    }
    FacebookSSO.prototype.componentDidMount = function () {
        var _this_1 = this;
        if (this.checkIsExistsSDKScript()) {
            this.setState({
                isSdkLoaded: true
            });
            return;
        }
        else {
            this.insertSDKScript(document, function () {
                _this_1.initFbSDK({
                    appId: _this_1.props.appId,
                    xfbml: _this_1.props.xfbml,
                    version: _this_1.props.version,
                    cookie: _this_1.props.cookie
                }, document);
            });
        }
    };
    FacebookSSO.prototype.insertSDKScript = function (document, cb) {
        var fbScriptTag = document.createElement("script");
        fbScriptTag.id = this.SCRIPT_ID;
        fbScriptTag.src = this.SDK_URL;
        var scriptNode = document.getElementsByTagName("script")[0];
        scriptNode &&
            scriptNode.parentNode &&
            scriptNode.parentNode.insertBefore(fbScriptTag, scriptNode);
        cb();
    };
    FacebookSSO.prototype.checkIsExistsSDKScript = function () {
        return !!document.getElementById(this.SCRIPT_ID);
    };
    FacebookSSO.prototype.initFbSDK = function (config, document) {
        var _this = this;
        var _window = window;
        _window.fbAsyncInit = function () {
            _window.FB && _window.FB.init(__assign({}, config));
            _this.setState({
                isSdkLoaded: true
            });
            var fbRoot = document.getElementById("fb-root");
            if (!fbRoot) {
                fbRoot = document.createElement("div");
                fbRoot.id = "fb-root";
                document.body.appendChild(fbRoot);
            }
        };
    };
    FacebookSSO.prototype.getMe = function (authResponse) {
        var _this_1 = this;
        this._window.FB.api("/me", { locale: this.props.language, fields: this.props.fieldsProfile }, function (me) {
            _this_1.props
                .onResolve({
                provider: "facebook",
                data: __assign({}, authResponse, me)
            })
                .then(function () {
                _this_1.setState({
                    isProgressing: false
                });
            });
        });
    };
    FacebookSSO.prototype.handleResponse = function (response) {
        if (response.authResponse) {
            this.getMe(response.authResponse);
        }
        else {
            this.setState({
                isProgressing: false
            });
            this.props.onReject(response);
        }
    };
    FacebookSSO.prototype.loginFB = function () {
        var _this_1 = this;
        if (this.state.isProgressing || !this.state.isSdkLoaded)
            return;
        this.setState({
            isProgressing: true
        });
        // only case mobile (redirect to fb)
        // window.location.href = `https://www.facebook.com/dialog/oauth${getParamsFromObject(params)}`;
        if (!this._window.FB) {
            this.setState({
                isProgressing: false
            });
            this.insertSDKScript(document, function () {
                _this_1.initFbSDK({
                    appId: _this_1.props.appId,
                    xfbml: _this_1.props.xfbml,
                    version: _this_1.props.version,
                    cookie: _this_1.props.cookie
                }, document);
            });
            this.props.onReject("Fb isn't loaded!");
        }
        else {
            this._window.FB.login(this.handleResponse, {
                scope: this.props.scope,
                return_scopes: this.props.return_scopes,
                auth_type: this.props.auth_type
            });
        }
    };
    FacebookSSO.prototype.render = function () {
        return (React.createElement("button", { disabled: this.props.isDisabled || this.state.isProgressing, onClick: this.loginFB, className: [this.props.className, "loginBtn loginBtn--facebook"].join(" ") }, this.props.children));
    };
    FacebookSSO.defaultProps = {
        // appId: "2086263614924092",
        scope: "email, public_profile",
        redirect_uri: typeof window !== "undefined" ? window.location.href : "/",
        state: "facebookdirect",
        response_type: "code",
        auth_type: "",
        return_scopes: true,
        enable_profile_selector: true,
        profile_selector_id: true,
        language: "vi_VN",
        fieldsProfile: "name, email, birthday",
        xfbml: true,
        version: "v5.0",
        cookie: true,
        isDisabled: false,
        className: "",
        children: "Login Facebook"
    };
    return FacebookSSO;
}(React.PureComponent));

var GoogleSSO = /** @class */ (function (_super) {
    __extends(GoogleSSO, _super);
    function GoogleSSO(props) {
        var _this = _super.call(this, props) || this;
        _this.JS_SRC = "https://apis.google.com/js/api.js";
        _this.SCRIPT_ID = "google-login";
        // private SCOPE = "https://www.googleapis.com/auth/drive.file";
        _this.SCOPE = "";
        _this._window = window;
        _this.state = {
            isSdkLoaded: false,
            isProgressing: false
        };
        _this.loginGoogle = _this.loginGoogle.bind(_this);
        _this.handleResponse = _this.handleResponse.bind(_this);
        _this.handleError = _this.handleError.bind(_this);
        return _this;
    }
    GoogleSSO.prototype.componentDidMount = function () {
        var _this = this;
        if (this.checkIsExistsSDKScript()) {
            this.setState({
                isSdkLoaded: true
            });
        }
        else {
            this.insertScriptGoogle(document, "script", this.SCRIPT_ID, this.JS_SRC, function () {
                var params = {
                    client_id: _this.props.client_id,
                    cookie_policy: _this.props.cookie_policy,
                    login_hint: _this.props.login_hint,
                    hosted_domain: _this.props.hosted_domain,
                    fetch_basic_profile: _this.props.fetch_basic_profile,
                    discoveryDocs: _this.props.discoveryDocs,
                    ux_mode: _this.props.ux_mode,
                    redirect_uri: _this.props.redirect_uri,
                    access_type: _this.props.access_type,
                    scope: _this.SCOPE,
                    immediate: true
                };
                _this._window.gapi.load("auth2", function () {
                    var gapiAuth = _this._window.gapi.auth2;
                    if (!gapiAuth.getAuthInstance()) {
                        gapiAuth.init(params).then(function () {
                            _this.setState({
                                isSdkLoaded: true
                            });
                        });
                    }
                    else {
                        _this.props.onReject("not exist an instance");
                    }
                });
            });
        }
    };
    GoogleSSO.prototype.checkIsExistsSDKScript = function () {
        return !!document.getElementById(this.SCRIPT_ID);
    };
    GoogleSSO.prototype.insertScriptGoogle = function (d, s, id, jsSrc, cb) {
        if (s === void 0) { s = "script"; }
        var ggScriptTag = d.createElement(s);
        ggScriptTag.id = id;
        ggScriptTag.src = jsSrc;
        ggScriptTag.async = true;
        ggScriptTag.defer = true;
        var scriptNode = document.getElementsByTagName("script")[0];
        scriptNode &&
            scriptNode.parentNode &&
            scriptNode.parentNode.insertBefore(ggScriptTag, scriptNode);
        ggScriptTag.onload = cb;
    };
    GoogleSSO.prototype.handleResponse = function (res) {
        var _this = this;
        // const auth2 = this._window.gapi.auth2.getAuthInstance();
        // var user = auth2.currentUser.get();
        // var auth = user.getAuthResponse();
        this.props.onResolve({ provider: "google", data: res }).then(function () {
            _this.setState({
                isProgressing: false
            });
        });
    };
    GoogleSSO.prototype.handleError = function (err) {
        this.setState({
            isProgressing: false
        });
        this.props.onReject(err);
    };
    GoogleSSO.prototype.loginGoogle = function () {
        if (!this.state.isSdkLoaded)
            return;
        this.setState({
            isProgressing: true
        });
        var auth2 = this._window.gapi.auth2.getAuthInstance();
        var options = {
            prompt: this.props.prompt,
            scope: this.props.scope,
            ux_mode: this.props.ux_mode
        };
        // responseType = code then =>
        // auth2.grantOfflineAccess(options).then((res: any) => {
        //   console.log(res);
        // });
        auth2
            .signIn(options)
            .then(this.handleResponse)
            .catch(this.handleError);
    };
    GoogleSSO.prototype.render = function () {
        return (React.createElement("button", { className: [this.props.className, "loginBtn loginBtn--google"].join(" "), disabled: this.props.isDisabled || this.state.isProgressing, onClick: this.loginGoogle }, this.props.children));
    };
    GoogleSSO.defaultProps = {
        // client_id: "142305466831-gol9khuhp2ufjh15cktevde0m8hd6vlp.apps.googleusercontent.com",
        cookie_policy: "single_host_origin",
        scope: "email profile",
        fetch_basic_profile: true,
        ux_mode: "popup",
        prompt: "select_account",
        response_type: "permission",
        login_hint: "",
        discoveryDocs: "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
        access_type: "online",
        isDisabled: false,
        redirect_uri: "/",
        hosted_domain: "",
        openid_realm: "",
        className: "",
        children: "Login Google"
    };
    return GoogleSSO;
}(React.PureComponent));

var GoogleSignIn = /** @class */ (function (_super) {
    __extends(GoogleSignIn, _super);
    function GoogleSignIn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GoogleSignIn.prototype.render = function () {
        return (React.createElement(GoogleSSO, { onResolve: this.props.onResolve, onReject: this.props.onReject, client_id: this.props.client_id, className: this.props.className, cookie_policy: this.props.cookie_policy, scope: this.props.scope, fetch_basic_profile: this.props.fetch_basic_profile, hosted_domain: this.props.hosted_domain, openid_realm: this.props.openid_realm, ux_mode: this.props.ux_mode, redirect_uri: this.props.redirect_uri, prompt: this.props.prompt, response_type: this.props.response_type, login_hint: this.props.login_hint, discoveryDocs: this.props.discoveryDocs, access_type: this.props.access_type, isDisabled: this.props.isDisabled }, this.props.children));
    };
    GoogleSignIn.defaultProps = {
        // client_id: "142305466831-gol9khuhp2ufjh15cktevde0m8hd6vlp.apps.googleusercontent.com",
        cookie_policy: "single_host_origin",
        scope: "email profile",
        fetch_basic_profile: true,
        ux_mode: "popup",
        prompt: "select_account",
        response_type: "permission",
        login_hint: "",
        discoveryDocs: "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
        access_type: "online",
        isDisabled: false,
        redirect_uri: "/",
        hosted_domain: "",
        openid_realm: "",
        className: "",
        children: "Login Google"
    };
    return GoogleSignIn;
}(React.Component));
var FacebookSignIn = /** @class */ (function (_super) {
    __extends(FacebookSignIn, _super);
    function FacebookSignIn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FacebookSignIn.prototype.render = function () {
        var result = React.createElement(FacebookSSO, { onResolve: this.props.onResolve, onReject: this.props.onReject, className: this.props.className, scope: this.props.scope, redirect_uri: this.props.redirect_uri, state: this.props.state, response_type: this.props.response_type, auth_type: this.props.auth_type, return_scopes: this.props.return_scopes, enable_profile_selector: this.props.enable_profile_selector, profile_selector_id: this.props.profile_selector_id, language: this.props.language, appId: this.props.appId, isDisabled: this.props.isDisabled, fieldsProfile: this.props.fieldsProfile, xfbml: this.props.xfbml, version: this.props.version, cookie: this.props.cookie }, this.props.children);
        return result;
    };
    FacebookSignIn.defaultProps = {
        scope: "email, public_profile",
        redirect_uri: typeof window !== "undefined" ? window.location.href : "/",
        state: "facebookdirect",
        response_type: "code",
        auth_type: "",
        return_scopes: true,
        enable_profile_selector: true,
        profile_selector_id: true,
        language: "vi_VN",
        fieldsProfile: "name, email, birthday",
        // appId: "2086263614924092",
        xfbml: true,
        version: "v5.0",
        cookie: true,
        isDisabled: false,
        className: "",
        children: "Login Facebook"
    };
    return FacebookSignIn;
}(React.Component));

exports.GoogleSignIn = GoogleSignIn;
exports.FacebookSignIn = FacebookSignIn;
//# sourceMappingURL=index.js.map
