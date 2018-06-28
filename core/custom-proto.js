/* 这边最开始的时候就使用了此方法，用起来比较方便。之所以有lint告警，是可能存在覆盖原生 prototype 方法的可能，所以我们在使用时需要注意命名不要过于通用 */
/* https://github.com/jamesallardice/jslint-error-explanations/blob/master/message-articles/extending-native.md */
/* eslint-disable no-extend-native */

function removeOwnRule(originUrl) {
  // 去除我们自己服务端的规则
  let url = originUrl;
  url = url.replace(/@!?[0-9xwq]*$/g, '');
  // 去除阿里云的规则
  const index = url.lastIndexOf('?x-oss-process');
  if (index > 0) {
    url = url.substring(0, index);
  }
  return url;
}

/**
 * https://help.aliyun.com/document_detail/44688.html?spm=5176.doc44696.6.946.oyGqnl
 * 自定义阿里云图片加载策略，去除酷家乐服务器图片策略
 * @param strategy 阿里云策略
 */
String.prototype.aliImgProcess = function aliImgProcess(strategy) {
  const url = removeOwnRule(this);
  return `${url}?x-oss-process=image/resize,${strategy}`;
};

/**
 * 等比缩放，延伸出指定w与h的矩形框外的最小图片。此方法可以获得不会模糊的相对该区域的最小图片
 * @param width 区域宽度
 * @param height 区域长度
 */
String.prototype.resizeMFit = function resizeMFit(width, height) {
  return this.aliImgProcess(`m_mfit,w_${width},h_${height}`);
};

/**
 * 缩略后，固定宽高，自动裁剪，取中间，相对于 resizeMFit 而言，多了裁减
 * 如果最短边小于设定的宽、高，则不会进行裁减
 * @param width 区域宽度
 * @param height 区域长度
 */
String.prototype.resizeMFill = function resizeMFill(width, height) {
  return this.aliImgProcess(`m_fill,w_${width},h_${height}`);
};

String.prototype.fixW = function fixW(width) {
  const url = removeOwnRule(this);
  return `${url}@${width}w`;
};

String.prototype.completeURL = function completeURL() {
  if (this.startsWith('//')) {
    return `https:${this}`;
  } else if (this.startsWith('/')) {
    if (HOST === undefined) {
      return `https://www.kujiale.com${this}`;
    } else {
      return HOST + this;
    }
  } else {
    return `${this}`;
  }
};

