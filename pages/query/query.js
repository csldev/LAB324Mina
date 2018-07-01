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
        this.setData({
          records: []
        })
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
  },

  deleteLastRecord() {
    const that = this;
    wx.showModal({
      title: '删除提示',
      content: '确定删除最后一条记录吗？',
      success: function (res) {
        if (res.confirm) {
          that._requestDelete();
        } else if (res.cancel) {
          app.showToast("取消删除")
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },

  _requestDelete() {
    app.request.get('/delete').then((res) => {
      if (res.statusCode === 200) {
        app.showToast('删除成功');
        this._requestQuery(this.queryYear, this.queryMonth);
      } else {
        app.showToast('删除失败')
      }
    }, () => {
      app.showToast('网络错误');
    })
  }

})