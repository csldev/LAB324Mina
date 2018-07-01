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
      app.login(this.account, this.passwords, this.loginSuccess)
    }
  },
  loginSuccess() {
    wx.reLaunch({
      url: '/pages/record/record',
    })
  },

  onRegisterTapped() {
    this.setData({
      showRegister: true,
    })
  },

  hideRegister() {
    this.setData({
      showRegister: false,
    })
  },

  onRegisterOK() {
    const that = this;
    if (!this.registerACC && !this.registerPSS) {
      app.showToast('null')
      return;
    }
    const data = {
      mode: 'register',
      account: this.registerACC,
      password: this.registerPSS,
    }
    app.request.get('/login', data).then((res) => {
      if (res.statusCode == 200) {
        app._setSessionData(res.data, function () {
          app.showToast('OK')
          that.setData({
            showRegister: false
          })
        });
      } else {
        app.showToast('net err')
      }
    }, () => {
      app.showToast('net err')
    })
  },

  acc(e) {
    this.registerACC = e.detail.value;
  },

  pss(e) {
    this.registerPSS = e.detail.value;
  }
})