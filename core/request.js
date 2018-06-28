/**
 * 网络请求类
 */
export default class Request {
  // 微信请求的默认超时时间
  TIMEOUT = 60000;

  // // 取出 Cookie 中 kSeesionId 并保存
  // _fetchCookie(response) {
  //   let cookie = '';
  //   if ('Set-Cookie' in response.header) {
  //     cookie = response.header['Set-Cookie'];
  //   } else if ('set-cookie' in response.header) {
  //     cookie = response.header['set-cookie'];
  //   }
  //   return cookie;
  // }

  // _sliceHeader(cookie, key) {
  //   const regex = new RegExp(`${key}=((\\w)+);`);
  //   const results = regex.exec(cookie);
  //   if (results && results[1]) {
  //     return results[1];
  //   }
  //   return null;
  // }

  // // 取出 Cookie 中 kSeesionId 并保存
  // _saveKSessionId(response) {
  //   const cookie = this._fetchCookie(response);
  //   const tmpKSessionId = this._sliceHeader(cookie, 'KSESSIONID');
  //   if (tmpKSessionId) {
  //     getApp().sessionData.minaCookie.kSessionId = tmpKSessionId;
  //   }
  //   const qhdi = this._sliceHeader(cookie, 'qhdi');
  //   if (qhdi) {
  //     getApp().sessionData.minaCookie.qhdi = qhdi;
  //     getApp().kooldata.setCommon('qhdi', qhdi);
  //   }
  //   const qhssokey = this._sliceHeader(cookie, 'qhssokey');
  //   if (qhssokey) {
  //     getApp().sessionData.minaCookie.qhssokey = qhssokey;
  //   }
  //   const qhssokeyid = this._sliceHeader(cookie, 'qhssokeyid');
  //   if (qhssokeyid) {
  //     getApp().sessionData.minaCookie.qhssokeyid = qhssokeyid;
  //   }
  //   const qhssokeycheck = this._sliceHeader(cookie, 'qhssokeycheck');
  //   if (qhssokeycheck) {
  //     getApp().sessionData.minaCookie.qhssokeycheck = qhssokeycheck;
  //   }
  //   wx.setStorage({
  //     key: 'minaCookie',
  //     data: getApp().sessionData.minaCookie,
  //   });
  // }

  _request(method, path, data, header) {
    const app = getApp();
    const server = app.settings.SERVER_ADDRESS;
    // const userAgent = app.settings.MP_USER_AGENT;
    const minaCookieString = `sessionId=${app.sessionData.minaCookie||""}`;
    // if (app.sessionData.minaCookie) {
      // const {
      //   kSessionId, qhdi, qhssokey, qhssokeyid, qhssokeycheck,
      // } = app.sessionData.minaCookie;
      // if (kSessionId) {
      //   minaCookieString += `KSESSIONID=${kSessionId};`;
      // }
      // if (qhdi) {
      //   minaCookieString += `qhdi=${qhdi};`;
      // }
      // if (qhssokey) {
      //   minaCookieString += `qhssokey=${qhssokey};`;
      // }
      // if (qhssokeyid) {
      //   minaCookieString += `qhssokeyid=${qhssokeyid};`;
      // }
      // if (qhssokeycheck) {
      //   minaCookieString += `qhssokeycheck=${qhssokeycheck};`;
      // }
    // }
    return new Promise((resolve, reject) => {
      wx.request({
        url: server + path,
        method: method,
        data: data,
        header: {
          'content-type': 'application/json',
          // APIVERS: 'com.qunhe.instdeco.service.yun-yulei',
          Cookie: minaCookieString,
          // 'MP-User-Agent': userAgent,
          ...header,
        },
        success: (response) => {
          console.log(`${path} >> `);
          console.log(response);
          if (response.statusCode === 200) {
            resolve(response);
            // this._saveKSessionId(response);
            // const { data: result } = response;
            // if (result.hasOwnProperty('c')) {
            //   if (result.c === '0') {
            //     if ('d' in result) {
            //       resolve(result.d);
            //     } else {
            //       resolve({});
            //     }
            //   } else {
            //     getApp().showToast(result.m);
            //     reject(result.c);
            //   }
            // } else {
            //   resolve(result);
            // }
          } else if (response.statusCode === 401) {
            // // 登录过期，清除本地登录信息
            // console.log('401 logout');
            // getApp().showToast('登录过期，请重新登录');
            // getApp().clearLoginStates();
            // getApp().event.emit(getApp().eventNames.LOGOUT);
            // getApp().router.navigateTo(getApp().router.nativePage('login-first'));
            reject(response);
          } else {
            reject(response.statusCode);
          }
        },
        fail: () => {
          reject(new Error('请求失败'));
        },
      });
    });
  }

  get(path, data = {}, header = {}) {
    return this._request('GET', path, data, header);
  }

  post(path, data = {}, header = {}) {
    return this._request('POST', path, data, header);
  }

  delete(path, data = {}, header = {}) {
    return this._request('DELETE', path, data, header);
  }

  put(path, data = {}, header = {}) {
    return this._request('PUT', path, data, header);
  }
}