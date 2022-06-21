export const requestAll = (params) => {

    const baseUrl = "http://music.eleuu.com";
    return new Promise((resolve,reject) => {
      wx.request({
        ...params,
        url: baseUrl+params.url,
        success: (result) => {
          resolve(result);
        },
        fail: (err) => {
          reject(err);
        }
      })
    })
  }