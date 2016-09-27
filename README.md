# jm-base
任何环境下通用的jm工具（封装了一些常用方法）

## 安装

``` bash
    npm install jm-base
```

## 属性

### version  版本

### timestamp   更新时间戳

## 方法

###     animate(obj, target, time, type)

字段 | 类型 | 默认值| 说明
------------ | ------------- | ------------ | ------------
obj | Object | ``无`` | jquery对象
target | String | ``"无"`` | transform属性值
time | String | ``"无"`` | 动画时间，单位/s
type | String | ``ease-out`` | 动画过渡方式

###     ajax(config)

config为参数配置对象

属性值 | 类型 | 默认值| 说明
------------ | ------------- | ------------ | ------------
url | String | ``"无"`` | request url
data | Object | ``{}`` | request params
type | String | ``"get"`` | 请求类型，可选``"get"``、``"post"``
dataType | String | ``"json"`` | 数据类型，可选``"json"``、``"jsonp"``
traditional | Boolean | ``false`` |
callback | Function | ``callback(data)`` | 成功回调函数
failFn | Function | ``failFn()`` | 失败回调函数

###     createDiv(className， innerHtml)

属性值 | 类型 | 默认值| 说明
------------ | ------------- | ------------ | ------------
className | String | ``"无"`` | class名
innerHtml | String | ``{}`` | inner内容

返回一个原生dom对象

###     format(str, data)

属性值 | 类型 | 默认值| 说明
------------ | ------------- | ------------ | ------------
str | String | ``"无"`` | html模板
data | JSON | ``{}`` | 数据

返回一个填充数据的html片段

###     formatTime(time, format)

属性值 | 类型 | 默认值| 说明
------------ | ------------- | ------------ | ------------
time | Number | ``无`` | 时间戳
format | String | ``"无"`` | 输出时间格式 "yyyy-MM-dd HH:mm:ss" 年月日 时分秒 格式自定义

返回一个自定义格式化好的时间字符串

###     getBrowserInfo(time, format)

返回一个结果对象，属性值有``systemType``和``appType``

systemType属性值 | 类型 | 说明
------------ | ------------- | ------------
iOS | Boolean | ``无`` | 是否iOS系统
Android | Boolean | ``无`` | 是否Android系统

appType属性值 | 类型 | 说明
------------ | ------------- | ------------
mqq | Boolean | ``无`` | 是否处于手机qq环境
wx | Boolean | ``无`` | 是否处于微信环境
jdApp | Boolean | ``无`` | 是否处于京东APP环境
jrApp | Boolean | ``无`` | 是否处于金融APP环境
wyApp | Boolean | ``无`` | 是否处于京东钱包APP环境
jdStock | Boolean | ``无`` | 是否处于京东股票APP环境

###     getCookie(name)

属性值 | 类型 | 默认值| 说明
------------ | ------------- | ------------ | ------------
name | String | ``无`` | cookie-name

返回cookie值

###     getUrlString(name)

属性值 | 类型 | 默认值| 说明
------------ | ------------- | ------------ | ------------
name | String | ``无`` | url参数

返回url参数值

###     lazyLoad($images)

属性值 | 类型 | 默认值| 说明
------------ | ------------- | ------------ | ------------
$images | Object | ``$("img[data-src]")`` | 需要懒加载的图片对象

返回一个是否完成的标志

###     pageLock()

移动端页面移动锁定

###     pageUnlock()

移动端页面移动解锁

###     toast(obj)

传入一个toast配置对象

参数值 | 类型 | 默认值| 说明
------------ | ------------- | ------------ | ------------
text | String | ``"无"`` | toast信息
pos | String/Object | ``"top"`` | toast位置字符串或者css配置对象
autoClose | Boolean | ``true`` | 是否自动消失
maxWidth | String | ``"无"`` | 最大宽度

## 用法

兼容AMD/CMD;
支持Node.js;

``` Javascript
    // import jm from 'jm'; // ES6
    var jm = require('jm');
    jm.API
```

## License

MIT
