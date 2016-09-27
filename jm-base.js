/**
 * @Author: Created By McChen
 * @Date: 2016/7/11
 * @Mail: chenjiahao@jd.com
 * @Version: V1.0.0
 */

(function (root, factory) {
    if (typeof exports === 'object') {  // 判断是否支持node模块
        module.exports = factory();

    } else if (typeof define === 'function' && define.amd) {    // 判断是否支持AMD
        define(factory);

    } else if (typeof define == "function" && define.cmd) {
        define(function (require, exports, module) {
            module.exports = factory();

        })
    } else {    // 全局
        root.jm = factory();
    }
})(this, function () {
    /**============================
     private
     ==============================*/
    function pageLockHandler(e) {
        e.preventDefault();
    }

    var __jm = {
        version: "0.0.1",
        timestamp: "2016/7/1",
        /**=======================
         方法按阿拉伯字母顺序排序
         =======================**/
        /**
         * @function object animate by transition
         * @param {Object} obj，DOM对象
         * @param {String} target，transform属性
         * @param {Number} time，动画周期
         * @param {String} type，默认为ease-out（选填）
         * @return {Object} obj，DOM对象
         **/
        animate: function (obj, target, time, type) {
            obj.css({
                "transition": time + "s",
                "-webkit-transition": time + "s",
                "transform": target,
                "-webkit-transform": target,
                "transition-timing-function": type || "ease-out",
                "-webkit-transition-timing-function": type || "ease-out"
            });
            return obj;
        },

        /**
         * @function send a ajax request
         * @param {Object} config 配置对象（必填）
         * @attr {String} url，请求地址（必填）
         * @attr {Json} data，默认为空对象（选填）
         * @attr {String} type，默认为get（选填）
         * @attr {String} dataType，默认为json（选填）
         * @attr {String} traditional，默认为false（选填）
         * @return {function} callback，成功回调（必填）
         * @return {function} failFn，失败回调（选填，建议填）
         **/
        ajax: function (config) {
            $.ajax({
                url: config.url,
                data: config.data || {},
                type: config.type || "get",
                dataType: config.dataType || "json",
                traditional: config.traditional || false,
                success: function (data) {
                    config.callback && config.callback(data);
                },
                error: function () {
                    config.failFn && config.failFn();
                }
            })
        },

        /**
         * @function create a div
         * @param {String} className
         * @param {String} innerHTML
         * @return {Object} DOM
         **/
        createDiv: function (className, innerHTML) {
            var oDiv = document.createElement("div");
            oDiv.className = className;
            if (innerHTML) {
                oDiv.innerHTML = innerHTML
            }
            document.body.appendChild(oDiv);
            return oDiv;
        },

        /**
         * @function template html module
         * @param {String} str, html template
         * @argument {Json} data, fill data
         * @return {String} formatStr 填充数据后html template
         **/
        format: function (str) {
            var pattern = /\{([\w\-_]+)\}/gm;
            var arr = Array.prototype.slice.call(arguments, 1);
            var args = /\{(\d+)\}/.test(str) ? arr : arr[0];
            var formatStr = str.replace(pattern, function () {
                return args[arguments[1]];
            });
            return formatStr;
        },

        /**
         * @function format the date
         * @param {Number} time(时间戳)
         * @param {String} format(格式)Eg: 'yyyy-MM-dd HH:mm:ss'
         */
        formatTime: function (time, format) {
            var t = new Date(time);
            var tf = function (i) {
                return ( i < 10 ? '0' : '') + i
            };
            return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
                switch (a) {
                    case 'yyyy':
                        return tf(t.getFullYear());
                        break;
                    case 'MM':
                        return tf(t.getMonth() + 1);
                        break;
                    case 'mm':
                        return tf(t.getMinutes());
                        break;
                    case 'dd':
                        return tf(t.getDate());
                        break;
                    case 'HH':
                        return tf(t.getHours());
                        break;
                    case 'ss':
                        return tf(t.getSeconds());
                        break;
                }
            })
        },

        /**
         * @function get systemType and appType
         * @return {Object}
         * @use {Object}.{type}.{param} = {Boolean}
         * @type systemType/appType
         * @params isIos/inWx/inApp/inJdApp/inJrApp/inWyApp
         **/
        getBrowserInfo: function () {
            var ua = navigator.userAgent.toLowerCase();
            var isIos = ua.indexOf('ipad') > -1 || ua.indexOf('iphone') > -1 || false;
            var mqq = ua.indexOf("_sq_") > -1 || false;
            var wx = ua.indexOf('micromessenger') > -1 || false;
            var jdApp = ua.indexOf('jdapp') > -1 || false;
            var jrApp = ua.indexOf('jdjr') > -1 || ua.indexOf('android-async-http') > -1 || false;
            var wyApp = ua.indexOf('walletclient') > -1 || false;
            var jdStock = ua.indexOf("jdstock") > -1 || false;

            var systemType = {
                iOS: isIos,
                Android: !isIos
            };
            var appType = {
                mqq: mqq,
                wx: wx,
                jdApp: jdApp,
                jrApp: jrApp,
                wyApp: wyApp,
                jdStock: jdStock
            };
            return {
                systemType: systemType,
                appType: appType
            };
        },

        /**
         * @function get cookie by name
         * @return {String}
         * @param {String} name
         **/
        getCookie: function (name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(";");
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == " ") c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },

        /**
         * @function get the value of url string
         * @param {String} name
         **/
        getUrlString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURIComponent(r[2]);
            return null;
        },

        /**
         * @function Specify the picture to be lazy
         * @param
         **/
        lazyLoad: function ($images) {
            var images = $images || $("img[data-src]");
            var finish = false;
            // 加载在可视取中的图片
            $(images).each(function (index) {
                if (isElementInViewport(this)) {
                    $(this).attr("src", $(this).attr("data-src"));
                    $(this).removeAttr("data-src")
                }
            });
            // 当图片加载完时，停止监听
            if (images.length == 0) {
                finish = true;
            }
            return finish;

            function isElementInViewport(el) {
                var rect = el.getBoundingClientRect();
                return (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.top <= $(window).height() &&
                    rect.left <= $(window).width()
                );
            }
        },

        /**
         * @function lock the screen
         **/
        pageLock: function () {
            document.addEventListener("touchmove", pageLockHandler, false)
        },

        /**
         * @function unlock the screen
         **/
        pageUnlock: function () {
            document.removeEventListener("touchmove", pageLockHandler, false)
        },

        /**
         * @function add a toast
         * @param {Object} Object => Object.text {String} Object.pos {String} Object.autoClose {Boolean}
         * @return $(toast)
         **/
        toast: function (obj) {
            if($(".toast").length == 1){
                return $(".toast");
            }
            var text = obj.text;
            var pos = obj.pos;
            var autoClose = obj.autoClose;
            var maxWidth = obj.maxWidth || "";

            if (autoClose == false || autoClose == "false") {   // 避免误输入
                autoClose = false;
            } else {
                autoClose = true;
            }

            switch (pos) {
                case "top":
                    var toast = createDiv('toast fix-mt', text);
                    break;
                case "middle":
                    var toast = createDiv('toast fix-mm', text);
                    break;
                case "bottom":
                    var toast = createDiv('toast fix-mb', text);
                    break;
                default :
                    if(typeof pos == "object"){
                        var toast = createDiv('toast '+pos.pos, text);
                        var styles = pos.styles;
                        for(var s in styles){
                            toast.style[s] = styles[s];
                        }
                    } else {
                        var toast = createDiv('toast fix-mt', text);
                    }
                    break;
            }

            if (maxWidth) toast.style.maxWidth = maxWidth;
            if (autoClose) {
                $(toast).addClass("toast-fadeOut");
                $(toast).off().on("animationend webkitAnimationEnd mozAnimationEnd", function () {
                    $(this).remove();
                });
                //toast.addEventListener("webkitAnimationEnd", function () {
                //    $(this).remove();
                //})
            }

            return $(toast);

            //创建div
            function createDiv(className, innerHTML, styleSheet) {
                var oDiv = document.createElement("div");
                oDiv.className = className;
                if (innerHTML) {
                    oDiv.innerHTML = innerHTML;
                }
                if (styleSheet) {
                    oDiv.style.top = styleSheet;
                }
                document.body.appendChild(oDiv);
                return oDiv;
            }

        }
    };

    if (typeof exports === 'object') {  // 判断是否支持node模块
        var jm = __jm;
    } else {    // window 下
        var jm = Object.create(__jm);
    }
    return jm;
});