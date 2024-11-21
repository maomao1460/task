// app.js
App({
  globalData: {
    userInfo: null,
    tasks: [],
    isAdmin: false
  },
  onLaunch: function() {
    // 初始化云开发环境
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'education-0g819hzx7afe07b5', // 修改为你的云环境ID
        traceUser: true
      })
    }
    
    // 检查登录状态
    wx.checkSession({
      fail: () => {
        // session失效，需要重新登录
        this.globalData.userInfo = null
      }
    })
    
    // 从本地存储加载数据
    const userInfo = wx.getStorageSync('userInfo')
    const tasks = wx.getStorageSync('tasks') || []
    
    if (userInfo) {
      this.globalData.userInfo = userInfo
      this.globalData.isAdmin = userInfo.role === 'admin'
    }
    this.globalData.tasks = tasks
  }
})
