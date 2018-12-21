/**
 * 小程序配置文件
 * http://yuewangt.yuqianshu.com/lcc/lcc 等同于 http://118.31.6.114:8080/lssSys
 * http://yuewangt.yuqianshu.com/lcc/pay 等同于 http://118.31.6.114:8990/pay
 *
 */

const lcc = "https://lccpay.joylifepay.com/lssSys";
const pay = "https://lcc.joylifepay.com/pay";
const serverImageUrl = "https://lccpay.joylifepay.com/lssSys/xcx/"


let config = {
  //启动代码追踪模式
  debug: {
    desktop: false, //桌面模式
    launch: false,
    //face 人脸识别模块
    //merchant:login ,商家注册第一步
    //merchant:certificate ,商家注册第二步
    silent: [
      "ajax:error", //ajax的请求错误
      "user:face",
      "merchant:login",
      "merchant:certificate",
      "merchant:settlement",
      "merchant:payment",
      "merchant:order",
      "merchant:member"
    ]
  },

  api: "appaccount/appbase",
  /**
   * 获取openid请求
   */
  openIdUrl: `${lcc}/loginAction!weixingcode2session.ilf`,
  /**
   * 二维码请求地址
   */
  qrCodeUrl: `${lcc}/loginAction!weixingcodeImage.ilf`,
  /**
   * 人脸识别设备请求
   */
  deviceUrl: `${pay}/smallProgram`,
  /**
   * 上传文件
   */
  uploadFile: `${lcc}/loginAction!uploadFile.ilf`,
  /**
   * 普通请求
   */
  requestUrl: `${lcc}/loginAction!currency.ilf`,
  /**
   * 加密请求
   */
  md5Url: `${lcc}/lssSys/loginAction!des.ilf`,
  /**
   * 服务器图片
   */
  serverImageUrl,
  /**
   * 基础地址
   */
  baseUrl: lcc
};

/**
 * 服务器图片
 */
config.imageUrls = {

  // 用户
  "user-register-login-logo": "register-login.jpg", //注册logo
  "user-register-face-camera": "camera.png", //人脸摄像头
  "user-home-carousel": ["carousel/1.jpg", "carousel/2.jpg", "carousel/3.jpg"], //主页轮播

  //商户
  "merchant-register-login": "register-login.jpg", //商户注册logo
  "merchant-register-refer": ["merchant/refer-1.jpg", "merchant/refer-2.jpg", "merchant/refer-3.jpg", "merchant/refer-4.jpg", "merchant/refer-5.jpg", "merchant/refer-6.jpg"], //商户注册refer
  "merchant-register-certificate-popup-face": "merchant/popup-face.jpg", //上传门脸照
  "merchant-register-certificate-popup-shop": "merchant/popup-shop.jpg", //上传店内照片
  "merchant-register-certificate-popup-logo": "merchant/popup-logo.jpg", //上传LOGO
  "merchant-register-certification-popup-front": "merchant/popup-front.jpg", //上传正面照
  "merchant-register-certification-popup-back": "merchant/popup-back.jpg", //上传反面照
  "merchant-register-certification-popup-hand": "merchant/popup-hand.jpg", //上传手持身份证正面照
  "merchant-register-certification-popup-business": "merchant/popup-business.jpg", //上传营业执照
  "merchant-register-certification-popup-industry": "merchant/popup-industry.jpg", //上传行业许可证
  "merchant-register-settlement-logo": "merchant-settlement-logo.png", //注册最后一步
  "merchant-home-banner": "home-banner.jpg", //商户主页logo
  "merchant-home-device-password": "device-password.png", //设备密控

  // 组件
  "commponent-pay-dialog-box": "dialog-decoration.png",
  "commponent-qr-code-bg": "qr-code.jpg",
  "commponent-qr-code-user-bg": "user-qr-code.jpg"
}

function isArray(o) {　　
  return Object.prototype.toString.call(o);
}

for (let key in config.imageUrls) {
  let data = config.imageUrls[key]
    // 数组
  if (isArray(data) === "[object Array]") {
    config.imageUrls[key] = data.map(item => {
      return `${serverImageUrl}${item}`
    })
  } else {
    config.imageUrls[key] = `${serverImageUrl}${data}`
  }

}

module.exports = config;