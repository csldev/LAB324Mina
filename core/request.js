//网络请求
import Settings from '../utils/settings.js';

export default class Request{

  constructor(){
    const settings = new Settings();
    this.SERVER_ADDRESS = settings.SERVER_ADDRESS;
  }

  _request(callback,method){
    const that = this;
    const url = this.SERVER_ADDRESS+this.path;
    console.log(url)
    wx.request({
      url:url,
      method:method,
      data:this.data,
      success:function(res){
        callback(res);
      },
      fail:function(res){
        callback(res)
      }
    })
  }

  get(callback,path,data){
    this.path = path;
    this.data = data;
    this._request(callback,'GET');
  }

  post(callback,path,data){
    this.path = path;
    this.data = data;
    this._request(callback,'POST')
  }

}