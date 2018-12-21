const globalConfig = require("../config.js");
const common = require("./common.js");
const o = require("./observe")

/**
 * 获取openid
 */
export function getWxOpenId(device) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: globalConfig.openIdUrl,
      data: {
        appid: device.appid,
        secret: device.secret,
        js_code: device.code
      },
      method: "GET",
      success: resolve,
      fail: reject
    });
  });
}

/**
 * 获取二维码
 * @param
 */
export function getQrCode(device) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: globalConfig.qrCodeUrl,
      data: {
        appid: device.appid,
        secret: device.secret,
        js_code: device.code,
        agentid: device.agentid
      },
      method: "GET",
      success: resolve,
      fail: reject
    });
  });
}

/**
 * 获取微信code
 */
export function getWxCode() {
  return new Promise(function(resolve, reject) {
    wx.login({
      success: res => {
        resolve(res.code);
      },
      fail() {
        reject();
      }
    });
  });
}

/**
 * 查看是否授权
 * 查看授权
 */
export function checkAccredit(scopeName) {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success(res) {
        if (res.authSetting[scopeName]) {
          resolve();
        } else {
          reject();
        }
      },
      fail() {
        reject();
      }
    });
  });
}

/**
 * 获取用户数据
 */
export function getUserInfo() {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success: res => {
        resolve(res.userInfo);
      },
      fail: reject
    });
  });
}


/**
 * 提前向用户发起授权请求
 */
function requestAccredit(scopeName) {
  return new Promise((resolve, reject) => {
    wx.authorize({
      scope: scopeName,
      success(res) { resolve(); },
      fail() { reject(); }
    });
  });
}

/**
 * 探测授权
 * 1.scope.camera
 * 2.因为有可能取消，所以支持递归检测
 */
export function detectAccredit(scopeName) {
  return new Promise((resolve, reject) => {
    checkAccredit(scopeName).then(resolve, () => {
      //授权失败,发起新的授权请求
      requestAccredit(scopeName).then(resolve).catch(reject)
    });
  });
}

/**
 * 授权操作
 */
export function disposeAccredit(args) {
  checkAccredit(args.data.scopeName)
    .then(() => {
      // 如果已经授权了，直接跳转页面
      args.alreadyExisted && args.alreadyExisted()
    })
    .catch(() => {
      //成功
      o.observe.$$onceWatch("accredit-success", data => {
        args.success && args.success()
      });
      //失败
      o.observe.$$onceWatch("accredit-fail", data => {
        args.fail && args.fail()
      });
      common.gotoPage(`/public/accredit/accredit?data=${JSON.stringify(args)}`);
    })
}


/**
 * 获取定位数据
 * supportMap 是否支持地图
 * customExit 自定义退出
 * navigate   跳转导航
 */
export function getLocationData(data = {}) {

  return new Promise((resolve, reject) => {

    /**
     * 授权成功后
     * 开始获取定位地址
     * 1 支持地图定位
     * 2 直接获取
     */
    const setLocation = (existed) => {

      const setComplete = res => {

        if (!res) {
          res = {}
        }
        //确定已经是授权成功了
        res.alreadyExisted = existed

        if (!res.latitude || !res.longitude) {
          common.showToast("定位坐标获取失败")
          reject({})
          return
        }
        resolve(res);
      }

      // 地图方式
      if (data.supportMap) {
        wx.chooseLocation({
          complete: setComplete
        });
      } else {
        //直接获取
        wx.getLocation({
          type: "wgs84",
          complete: setComplete
        });
      }
    }

    // 1.如果有位置权限，直接获取
    // 2.如果没有，设置后，获取
    checkAccredit("scope.userLocation")
      .then(() => { setLocation(true) })
      .catch(() => {
        //强制授权,进入授权页面
        disposeAccredit({
          navigate: data.navigate,
          data: {
            title: "地理位置",
            scopeName: "scope.userLocation",
            modalText: "未获取当前手机的地址位置,会影响功能的体验与使用,需要获取您的地理位置,请设置打开",
            failText: "拒绝授权,无法定位当前位置"
          },
          //已经授权
          alreadyExisted() {
            setLocation(true)
          },
          //授权成功
          success: () => {
            //授权成功
            setLocation()
          },
          //授权失败
          fail: () => {
            reject({})
          }
        })
      })
  })

}