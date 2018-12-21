function getSystemInfo(arg) {
  var res = wx.getSystemInfoSync()
  return res[arg]
}

//状态栏高度
//处理刘海问题
const topBarHeight = 44 + getSystemInfo("statusBarHeight")

/**
 * 包裹区域大小
 * 做三次统计优化
 */
function getElementHeight() {
  const windowHeight = getSystemInfo("windowHeight")
  return windowHeight - topBarHeight
}

/**
 * 只有顶部区域
 * 主要区别就是商铺没有系统bar
 * 有自定义顶部条
 */
let topScrollHeight = 0
let topScrollCount = 0 //3次统计优化

function hasTopScrollHeight() {
  if (topScrollHeight && topScrollCount > 3) {
    return topScrollHeight
  } else {
    let newHeight = getElementHeight();
    if (newHeight > topScrollHeight) {
      topScrollHeight = newHeight //确定一定最大值
    }
    ++topScrollCount;
    return topScrollHeight
  }
}


/**
 * 有顶部与底部区域
 * 分3大块，顶部，底部，中间
 */
let topBottomScrollHeight = 0
let topBottomScrollCount = 0 //3次统计优化

function hasTopBottomScrollHeight() {
  if (topBottomScrollHeight && topBottomScrollCount > 3) {
    return topBottomScrollHeight
  } else {
    let newHeight = getElementHeight();
    if (newHeight > topBottomScrollHeight) {
      topBottomScrollHeight = newHeight //确定一定最大值
    }
    ++topBottomScrollCount;
    return topBottomScrollHeight
  }
}

/**
 * 操作平台
 * ios 
 */
function getPlatform() {
  const plat = getSystemInfo("platform")
  return plat
}

/**
 * 混入接口
 */
const mixin = function(newApi) {
  for (let key in newApi) {
    if (totalApi[key]) {
      console.log("混入api重复", key);
    } else {
      totalApi[key] = newApi[key];
    }
  }
};


const totalApi = {
  mixin,
  getPlatform,
  hasTopScrollHeight,
  hasTopBottomScrollHeight,
  getSystemInfo,
  topBarHeight,
  CountDown: require("./count-down")
};

mixin(require("./common"));
mixin(require("./lang"));
mixin(require("./accredit")); //授权接口
mixin(require("./debug")); //调试接口
mixin(require("./request")); //请求接口
mixin(require("./verify")); //权限
mixin(require("./icon-path")); //icon
mixin(require("./file")); //文件处理
mixin(require("./observer"));
mixin(require("./observe"))

module.exports = totalApi;