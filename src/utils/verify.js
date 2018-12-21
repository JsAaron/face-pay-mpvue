/**
 * 验证手机号
 */
export function validateMobile(mobile) {
  if (mobile.length == 0) {
    wx.showToast({
      title: "请输入手机号！",
      icon: "none",
      duration: 1500
    });
    return false;
  }
  if (mobile.length != 11) {
    wx.showToast({
      title: "手机号长度有误！",
      icon: "none",
      duration: 1500
    });
    return false;
  }
  var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
  if (!myreg.test(mobile)) {
    wx.showToast({
      title: "手机号有误！",
      icon: "none",
      duration: 1500
    });
    return false;
  }
  return true;
}

var moneyReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;

export function validateMoney(money) {
  if (money == 0) {
    return false;
  }
  if (money < 0.2) {
    return false;
  }
  //000 错
  //0 对
  //0. 错
  //0.0 对
  //050 错
  //00050.12错
  //70.1 对
  //70.11 对
  //70.111错
  //500 正确
  if (moneyReg.test(money)) {
    return true;
  } else {
    return false;
  }
}
