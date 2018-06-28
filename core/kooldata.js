import Settings from '../utils/settings';

const settings = new Settings();

const UPLOAD_THRESHOLD = 10;
// 小程序数据采集相关
let trackedData = [];
let common = {};

export default class KoolData {
  constructor() {
    try {
      const systemInfo = wx.getSystemInfoSync();
      common = systemInfo;
    } catch (error) {
      console.error('get system info failed');
    }
    this.setCommon('ua', settings.MP_USER_AGENT);
  }

  /**
   * 设置一些通用字段
   * @param {String} key
   * @param {Object} value
   */
  setCommon(key, value) {
    common[key] = value;
  }

  track(eventType, data) {
    const pages = getCurrentPages();
    const pageInfo = {};
    // 是否有 page 信息，自动加上路径
    if (pages[pages.length - 1]) {
      pageInfo['pagePath'] = pages[pages.length - 1].route;
    }

    trackedData.push(Object.assign(pageInfo, { eventType: eventType, time: new Date().getTime() }, data));
    if (trackedData.length > UPLOAD_THRESHOLD) {
      this.upload();
    }
  }

  /**
   * 跟踪点击事件
   * @param {String} subjectDetail 标记点击在哪里，如果按钮的话一般为按钮上的名字
   * @param {Object} data 额外数据
   */
  trackClick(subjectDetail, data) {
    this.track('click_event', Object.assign({ subjectDetail: subjectDetail }, data));
  }

  /**
   * 跟踪浏览事件
   * @param {Object} data 额外数据
   */
  trackBrowser(data) {
    this.track('client_browser', data);
  }

  /**
   * 上传当前已采集到的所有事件，并且清空当前事件吃
   */
  upload() {
    const body = {};
    body['common'] = common;
    body['list'] = JSON.parse(JSON.stringify(trackedData));
    trackedData = [];
    wx.request({
      url: 'https://actionstat.kujiale.com/api/toolbehaviors/miniProgramPersonalCardClient/multilog',
      data: body,
      header: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
  }
}
