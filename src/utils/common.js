export function showBusy(title) {
  wx.showLoading({
    title: title || "载入中..."
  });
}

export function hideBusy() {
  wx.hideLoading();
}

export function showToast(text, time, icon) {
  return wx.showToast({
    title: text,
    icon: icon || "none",
    duration: time || 1500
  });
}

export function hideToast(text, time, icon) {
  return wx.hideToast();
}

/**
 * 跳页面
 * navigateTo 保留当前页面，跳页
 * redirectTo 关闭当前页面，跳页，用于基本不重复的页面，比如注册流程
 * reLaunch   关闭之前所有页面，一般用于注册完毕
 */
export function gotoPage(type, url) {
  //如果传一个参数,默认navigateTo
  if (!url) {
    url = type;
    type = "navigateTo";
  }
  //如果第一个参数传空
  if (!type) {
    type = "navigateTo";
  }
  // const number = Math.random()
  //   // 没有问号
  // if (url.indexOf("?") == -1) {
  //   url = `${url}?random=${number}`
  // } else {
  //   //有问号参数了
  //   url = `${url}&random=${number}`
  // }

  wx[type]({
    url
  });

}