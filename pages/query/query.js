// pages/query/query.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    titles: {
      date: '日期',
      item: '项目',
      change: '金额',
      remain: '余额',
    },
    records: [],
    showModal: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const date = new Date();
    const year = date.getFullYear();
    const month = Number(date.getMonth()) + 1;
    this.queryYear = year;
    this.queryMonth = month;
    this._requestQuery(year, month);
  },

  _requestQuery(year, month) {

    const date = `${year}${month>9?month:"0"+month}`
    app.showLoading("等待加载");
    const data = {
      date: date,
    }
    app.request.get('/query', data).then((res) => {
      this.setData({
        records: res.data,
      })
      wx.hideLoading();
    }, (rej) => {
      if (rej === 417) {
        app.showToast("请求的数据不存在")
      } else {
        app.showToast("请求失败！请检查网络");
        wx.hideLoading();
        setTimeout(() => {
          wx.navigateBack();
        }, 1000);
      }
    })
  },

  onHandleModalTapped() {
    this.setData({
      showModal: !this.data.showModal,
    })
    if (!this.data.showModal) {
      this._requestQuery(this.queryYear, this.queryMonth);
    }
  },

  setYear(e) {
    this.queryYear = e.detail.year;
  },

  setMonth(e) {
    this.queryMonth = e.detail.month;
  }

})