import Request from '/core/request.js'
//app.js
App({
  request : new Request(),
  
  onLaunch: function () {
    this.sessionData.userInfo.sessionId = '';
  },

  checkLogin(account, password){
    this.request.get(function(res){
      if(res.statusCode===200){
        console.log(res)
        this.setSessiongId(res.data)
      }else{
        console.log(res)
      }
    },'/login')
  },

  setSessionId(sessionId){
    this.sessionData.userInfo.sessionId = sessionId;
  }

})