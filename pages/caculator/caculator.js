// pages/caculator/caculator.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id1: "clear",//清除
    id2: "back",//回退
    id3: "history",
    id4: "div",//除号
    id5: "num_7",
    id6: "num_8",
    id7: "num_9",
    id8: "mul",//乘号
    id9: "num_4",
    id10: "num_5",
    id11: "num_6",
    id12: "sub",//减号
    id13: "num_1",
    id14: "num_2",
    id15: "num_3",
    id16: "add",
    id17: "num_0",
    id18: "dot",//小于号
    id19: "equals",//等于号

    result: "0",
    dotSign: false,//是否加小数点标志
  },
  click_btn (e) {
    let id = e.target.id
    let res = this.data.result
    let has_dot = this.data.dotSign
    if(id.match('num_')){
    // 如果点击到数字按钮↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
      let id_number = id.split('_')[1]  //注意==>>id_number是字符串
      if(res=='0'){
        res = id_number
      }else{
        res = res + id_number
      }
    }else if(id=='dot'&&has_dot==false) {
    // 如果点击到==>>小数点=>>并且==>>res不存在小数点↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
      if (
        res.substr(res.length - 1) != '+' &&
        res.substr(res.length - 1) != '-' &&
        res.substr(res.length - 1) != '×' &&
        res.substr(res.length - 1) != '÷'
      ) {
        res = res + '.'
        has_dot = true
      }
    }else if (id=='clear') {
    // 如果点击到==>>清除↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
      res = '0'
      has_dot = false
    }else if (id=='back') {
    // 如果点击到===>>>回退↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
      let res_length = res.length
      if(res_length==1){
        res = '0'
      }else{
        if(res.substr(res_length-1)=='.'){
          has_dot = false
        }
        res = res.substr(0, res_length-1)
      }
    }else if (id=='add'||id=='sub'||id=='mul'||id=='div') {
      let sign 
      has_dot = false
      switch (id) {
        case 'add':
          sign = '+'
          break;
        case 'sub':
          sign = '-'
          break;
        case 'mul':
          sign = '×'
          break;
        case 'div':
          sign = '÷'
          break;
      }
      if(
        res.substr(res.length - 1) != '.' &&
        res.substr(res.length - 1) != '+' &&
        res.substr(res.length - 1) != '-' &&
        res.substr(res.length - 1) != '×' &&
        res.substr(res.length - 1) != '÷' 
      ){
        res = res + sign
      }
    }

    this.setData({
      result: res,
      dotSign: has_dot
    })
  },
  equal () {
    let end
    let res = this.data.result
    if (
    // 如果res最后一项不为==>>加减乘除点==>>就可以开始计算
      res.substr(res.length - 1) != '.' &&
      res.substr(res.length - 1) != '+' &&
      res.substr(res.length - 1) != '-' &&
      res.substr(res.length - 1) != '×' &&
      res.substr(res.length - 1) != '÷'
    ) {
      let n = res.split('=')
      res = n[n.length-1]
      let add_sub = res.match(/[\+\-]/g)
      let cul_div = res.match(/[\×\÷]/g)
      console.log(add_sub)
      console.log(cul_div)
      if(add_sub==null){
      // 如果只有乘除↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
        let list1 = res.split(/[\×\÷\+\-]/)
        let list2 = res.match(/[\×\÷]/g)
        end = this.calculate(list1,list2)
      }else if(cul_div==null){
      // 如果只有加减↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
        let list1 = res.split(/[\×\÷\+\-]/)
        let list2 = res.match(/[\+\-]/g)
        end = this.calculate(list1,list2)
      }else{
      // 如果既有乘除又有加减↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
        // 1: ==>>提取出乘除表达式==>>例如==>>["9×8", "6÷2", "6×7", "5÷8"]
        let list1 = res.split(/[\+\-]/)
        console.log(list1)
        // 2: ==>>提取出加减号==>>例如==>>["-", "+", "-"]
        let list_sign = res.match(/[\+\-]/g)
        console.log(list_sign)
        // 3: ==>>将==>>["9×8", "6÷2", "6×7", "5÷8"]==>>变成==>>[72, 3, 42, 40]
        let list2 = list1.map(item=> {
          // 3.1: ==>>将'7x8x9'==>>['7', '8', '9']
          let item_list = item.split(/[\×\÷\+\-]/)
          console.log(item_list)
          if(item_list.length==1){
            return item
          }else{
            // 3.2 ==>>将'7x8x9'==>> ['x', 'x']
            let item_sign_list = item.match(/[\×\÷]/g)
            console.log(item_sign_list)
            // 3.3 ==>>8*1*2===>>>16
            return this.calculate(item_list, item_sign_list)
          }
        })
        // 4: ==>>计算出最终结果
        end = this.calculate(list2, list_sign)
      }
      // 5: ==>>
      end = end.toFixed(2)
      this.setData({
        result: res+' = '+end
      })

    }
  },
  calculate (list1, list2) {
    // list1==>>['7', '8', '9']
    // list2==>>['x', 'x']
    let r
    list2.map((item, index) => {
      if (index == 0) {
        r = list1[0]
      }
      if (item == '×') {
        r = r * 1 * list1[index + 1] * 1
      } else if (item =='÷') {
        r = r * 1/list1[index + 1] * 1
      } else if (item == '+'){
        r = r * 1 + list1[index + 1] * 1
      }else{
        r = r * 1 - list1[index + 1] * 1
      }
    })
    return r
  },
  /**
   * 生命周期函数--监听页面加载==============================================================================================
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