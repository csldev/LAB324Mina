//logs.js
const app = getApp();
Page({
  account: '',
  passwords: '',
  data: {
    logs: []
  },
  onLoad: function () {

  },
  onAccountInputTapped(e) {
    this.account = e.detail.value;
  },
  onPasswordInputTapped(e) {
    this.passwords = e.detail.value;
  },
  onLoginTapped() {
    if (!this.account) {
      app.showToast('请输入账号')
    } else if (!this.passwords) {
      app.showToast('请输入密码')
    } else {
      app.login(this.account, this.passwords,this.loginSuccess)
    }
  },
  loginSuccess() {
    wx.navigateTo({
      url: '/pages/record/record',
    })
  }
})