//logs.js
const util = require('../../utils/util.js')
const app = getApp();
Page({
  account:'',
  passwords:'',
  data: {
    logs: []
  },
  onLoad: function () {
    
  },
  account(e){
    this.account = e.detail.value;
  },
  password(e){
    this.passwords = e.detail.value;
  },
  onLoginTapped(){
    if(app.checkLogin(this.account, this.passwords)){
      this.loginSuccess();
    }
  },
  loginSuccess(){
    wx.navigateTo({
      url: '/pages/record/record',
    })
  }
})
