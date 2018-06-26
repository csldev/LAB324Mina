// pages/record/record.js
Page({
  date:'',
  item:'',
  change:'',
  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  onDateTapped(e){
    this.date = e.detail.value;
  },
  onItemTapped(e) {
    this.item = e.detail.value;
  },
  onChangeTapped(e) {
    this.change = e.detail.value;
  },
  onCommitTapped(){
    console.log("commit")
  },
  onResetTapped() { 
    console.log("reset")
  },
  onQueryTapped(){
    wx.navigateTo({
      url: '/pages/query/query',
    })
  }
})