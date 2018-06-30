// pages/record/record.js
const app = getApp();
Page({
  date: '',
  item: '',
  change: '',
  /**
   * 页面的初始数据
   */
  data: {
    date: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.checkLogin();
    this._setDate();
  },

  _setDate() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateString = `${date.getFullYear()}-${Number(month)>9?""+month:"0"+month}-${Number(day)>9?""+day:"0"+day}`;
    this.setData({
      date: dateString
    })
    this.date = dateString
  },

  onDateTapped(e) {
    this.date = e.detail.value;
  },
  onItemTapped(e) {
    this.item = e.detail.value;
  },
  onChangeTapped(e) {
    this.change = e.detail.value;
  },
  onCommitTapped() {
    if (!(this.date && this.item && this.change)) {
      app.showToast('请输入信息')
      return;
    }
    const data = {
      date: this._getDate(this.date),
      item: this._getItem(this.item),
      change: this._getChange(this.change)
    }
    app.request.post('/postRecord', data).then((res) => {
      app.showToast('上传成功！')
    })
  },
  onResetTapped() {
    app.showToast('你猜这个按钮是干嘛用的？')
  },
  onQueryTapped() {
    wx.navigateTo({
      url: '/pages/query/query',
    })
  },

  _getDate(date) {
    if (/^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9][12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/.test(date)) {
      return date;
    }
    app.showToast('日期格式错误！')
  },

  _getItem(item) {
    return item;
  },

  _getChange(change) {
    return change;
  }

})