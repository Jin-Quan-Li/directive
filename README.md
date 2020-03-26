一、说明：
随手写的基于vue的自定义指令

6、列表 
1. loading/index.js   
   * loading动画 
   * v-loading
2. waves/index.js   
   * 点击添加水波纹效果
   * v-waves
3. drag.js   
   * 拖拽指令
   * v-drag
4. clickoutside.js   
   * 点击除当前元素外的事件， 常用于点击空白区域关闭下拉框、模态框等
   * v-clickoutside
5. enterIntegerNumber.js   
   * 输入框输入之后自动获取下一个输入框的焦点 常用于6位验证码、密码框
   * v-enterIntegerNumber
6. gestures.js   
   * 点击 v-tap
   * 滑动 v-swipe
   * 左滑 v-swipeleft
   * 右滑 v-swiperight
   * 上滑 v-swipeup
   * 下滑 v-swipedown
   * 长按 v-longtap
7. lazyload.js   
   * 图片懒加载
   * v-lazyload=""
8. points.js   
   * 防连点
   * v-points
9. scroll.js   
   * 下拉刷新 v-scrollUpdate
   * 上拉加载更多 v-scrollMore
10. showTips.js   
   * 文字超出显示...
   * v-showTips
11. throttle.js   
   * 防抖 v-antiShake
   * 节流 v-throttling
12. tickDirective.js   
   * 给目标元素动画滚动到指定偏移位置 如果绑定值为true 则滚动到顶部
   * v-tickDirective



2、使用  
`import directive from '@/directive`   
`Vue.use(directive)`   

