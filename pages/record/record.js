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

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.checkLogin()
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
    const data = {
      date: this._getDate(this.date),
      item: this._getItem(this.Item),
      change: this._getChange(this.change)
    }
    app.reuqest.post('/postRecord', data).then((res) => {
      app.showToast('上传成功！')
    }, () => {
      app.showToast('请求失败！请检查网络');
    })
  },
  onResetTapped() {
    console.log("reset")
  },
  onQueryTapped() {
    wx.navigateTo({
      url: '/pages/query/query',
    })
  },

  _getDate(date){
    
  },

  _getItem(item){
    return item;
  },

  _getChange(change){
    return change;
  }

})