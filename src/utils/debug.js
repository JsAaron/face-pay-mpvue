const globalConfig = require('../config.js')
const hasConsole = typeof console !== 'undefined'

let count = 0

/**
 * 
  debug({
    type: 'api',
    content: `拦截:重复触发Xut.View.LoadScenario,seasonId:${seasonId},chapterId:${chapterId}`,
    color: 'red'
  })
 */
function debug(data, content, level, color) {

  if (!globalConfig.debug.launch) {
    return
  }

  const silent = globalConfig.debug.silent

  if (!silent) {
    return
  }

  if (!hasConsole) {
    return
  }

  const dataType = typeof data

  /**
   * 输出日志
   * @return {[type]} [description]
   */
  function outlog(type, content, level, color) {

    //如果启动了全部处理
    //如果能找到对应的处理
    //silent：['all','preload'.....]
    if ((~silent.indexOf('all')) || (~silent.indexOf(type))) {
      const stringType = typeof content === 'string';
      ++count;
      //console输出
      const command = console[level] || console.log
      if (stringType) {
        command(`%c${count} 类型:%c${type} %c内容:%c${String.styleFormat(content)}`, "color:#A0522D", "color:" + color, "color:#A0522D", "color:" + color)
      } else {
        command(`${count} 类型:${type} 内容:`, content)
      }
      if (level && typeof level === 'function') {
        let fn = level()
        if (fn) {
          console.log(fn)
        }
      }
    }
  }

  //如果是对象数据
  //data = {
  //  type
  //  content
  //  level
  //  color
  //}
  if (dataType === 'object') {
    const type = data.type
    const content = data.content
    const level = data.level
    const color = data.color
    outlog(type, content, level, color)
  } else {
    //传递的是普通类型
    //debug(type,content,level,color)
    outlog(data, content, level, color)
  }

}

function resetCount() {
  count = 0
}


export {
  resetCount,
  debug
}