// pages/form/form.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'name': null,
    'chinese': null,
    'math': null,
    'average': null,
    'is_show': false
  },
  fn0 (e) {
    this.fn()
    let name = e.detail.value
    this.setData({
      'name': name
    })
  },
  fn1 (e) {
    let chinese = e.detail.value
    if(!isNaN(chinese)){
      this.setData({
        'chinese': chinese
      })
    }
  },
  fn2 (e) {
    let math = e.detail.value
    if (!isNaN(math)) {
      this.setData({
        'math': math
      })
    }
  },
  fn3 (e) {
    if(this.data.name==null||this.data.chinese==null||this.data.math==null){
      return
    }
    this.setData({
      'average': (this.data.chinese*1+this.data.math*1)/2,
      'is_show': true
    })
  },
  fn () {
    console.log(222)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})