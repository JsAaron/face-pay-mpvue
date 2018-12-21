/**
 * @class String
 * 格式化字符串
 */
String.format = function(format) {
  var args = Xut.toArray(arguments, 1);
  return format.replace(/\{(\d+)\}/g, function(m, i) {
    return args[i];
  });
};

String.styleFormat = function(format) {
  return format.replace(/\s+/g, " ");
};

/**
 * 格式化日期时间
 */
Date.prototype.Format = function(fmt) {
  //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

/**
 * 分割数据，4位+空格
 */
export function splitNumber(str, type) {
  if (type === "identity") {
    return str.replace(/\s/g, "").replace(/(\d{6})(?=\d)/g, "$1 ");
  }
  return str.replace(/\s/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
}

/**
 * 移除所有空格
 * @param {*} str
 */
export function removeSpace(str) {
  return str.replace(/\s+/g, "");
}

/**
 * 移除前后空格
 * @param {*} str
 */
export function removeBorderSpace(str) {
  return str.replace(/^\s+|\s+$/g, "");
}

export function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : "0" + n;
}

Date.prototype.addMonths = function(m) {
  var temp = new Date(
    this.getFullYear(),
    this.getMonth(),
    this.getDate(),
    this.getHours(),
    this.getMinutes(),
    this.getSeconds(),
    this.getMilliseconds()
  );
  temp.setMonth(temp.getMonth() + m);
  return temp;
};
Date.prototype.addDays = function(d) {
  var temp = new Date(
    this.getFullYear(),
    this.getMonth(),
    this.getDate(),
    this.getHours(),
    this.getMinutes(),
    this.getSeconds(),
    this.getMilliseconds()
  );
  temp.setDate(temp.getDate() + d);
  return temp;
};
Date.prototype.addHours = function(h) {
  var temp = new Date(
    this.getFullYear(),
    this.getMonth(),
    this.getDate(),
    this.getHours(),
    this.getMinutes(),
    this.getSeconds(),
    this.getMilliseconds()
  );
  temp.setHours(temp.getHours() + h);
  return temp;
};
Date.prototype.addMinutes = function(m) {
  var temp = new Date(
    this.getFullYear(),
    this.getMonth(),
    this.getDate(),
    this.getHours(),
    this.getMinutes(),
    this.getSeconds(),
    this.getMilliseconds()
  );
  temp.setMinutes(temp.getMinutes() + m);
  return temp;
};

/**
 *config = {
   addMonth :增加月份
 }
 * @param {*} date
 */
export function formatDate(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return [year, month, day].map(formatNumber).join("-");
}

/**
 * 获取日期差
 */
export function getDateDiff(start, end) {
  var stime = Date.parse(new Date(start));
  var etime = Date.parse(new Date(end));
  if (stime > etime) {
    return "";
  }
  var usedTime = etime - stime; //两个时间戳相差的毫秒数
  return Math.floor(usedTime / (24 * 3600 * 1000));
}

/**
 * 转化字节=》M
 */
export function converByte(limit) {
  var size = "";
  if (limit < 0.1 * 1024) {
    //如果小于0.1KB转化成B
    size = limit.toFixed(2) + "B";
  } else if (limit < 0.1 * 1024 * 1024) {
    //如果小于0.1MB转化成KB
    size = (limit / 1024).toFixed(2) + "KB";
  } else if (limit < 0.1 * 1024 * 1024 * 1024) {
    //如果小于0.1GB转化成MB
    size = (limit / (1024 * 1024)).toFixed(2) + "MB";
  } else {
    //其他转化成GB
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
  }

  var sizestr = size + "";
  var len = sizestr.indexOf(".");
  var dec = sizestr.substr(len + 1, 2);
  if (dec == "00") {
    //当小数点后为00时 去掉小数部分
    return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
  }
  return sizestr;
}

export function signStartTime() {
  return new Date();
}

export function signEndTime(startTime) {
  let end = new Date();
  let date3 = end.getTime() - startTime.getTime();
  // //计算出相差天数
  // var days = Math.floor(date3 / (24 * 3600 * 1000))
  // //计算出小时数
  // var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
  // var hours = Math.floor(leave1 / (3600 * 1000))
  // //计算相差分钟数
  // var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
  // var minutes = Math.floor(leave2 / (60 * 1000))
  // //计算相差秒数
  // var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
  // var seconds = Math.round(leave3 / 1000)
  return `用时${date3 / 1000}秒`;
}

/**
 * 判断为空
 * 排除未定义
 */
export function isEmpty(value) {
  if (!value) {
    return true;
  }
  if (value == undefined) {
    return true;
  }
  if (value == "undefined") {
    return true;
  }
}

/**
 * 电话加密
 * 134****0000
 */
export function phoneEncrypt(phone) {
  return phone && phone.replace(/^(\d{3})\d{4}(\d+)/, "$1****$2");
}



/**
 * 必须是整数
 */
export function isInteger(num) {
  if (!/(^[1-9]\d*$)/.test(num)) {
    return false;
  } else {
    return true;
  }
}