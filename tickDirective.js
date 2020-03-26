import Vue from 'vue'

//全局自定义指令  给目标元素动画滚动到指定偏移位置 如果绑定值为true 则滚动到顶部
export default Vue.directive('scroll-top', {
    /**
     * 
     * @param {object} el 
     * @param {object} binding 
     * binding.value={
     *        allowScroll:false,是否允许滚动
     *        offset:0,滚动到距父元素上偏移量
     *        complete:()=>{},滚动结束的回调，用来初始化/还原绑定值
     * }
     */
    componentUpdated: function (el, binding, ) {
        //是否允许滚动
        let allowScroll = false
        //目标偏移
        let goalOffset = 0
        //动画完成的回调
        let completeCall = null
        //速度因子
        let divisor = 5

        //如果绑定值是boolean类型 默认滚动到顶部
        if (typeof binding.value == "boolean") {
            allowScroll = binding.value
        }
        //如果绑定值是对象类型 
        if (binding.value && typeof binding.value == "object") {
            allowScroll = binding.value.allowScroll || false
            goalOffset = binding.value.offset || 0
            completeCall = binding.value.complete
            divisor = binding.value.divisor || 5
        }

        //获取html原生元素
        const element = el.$el ? el.$el : el

        //滚动逻辑
        if (allowScroll == true) {
            //如果偏移量 和目标偏移量相等 则不滚动 并执行回调方法
            if (element.scrollTop == goalOffset) {
                if (completeCall) {
                    //回调函数里记得把绑定值初始化 比如设为false
                    completeCall()
                }
                return
            }

            //判断滚动方向 
            let direction = 'up'
            //目标偏移 大于当前偏移 需向上滚动 增加元素上偏移
            if (goalOffset > element.scrollTop) {
                //向上 
                direction = 'up'
            } else {
                //向下
                direction = 'down'
            }

            //获取当前偏移和目标偏移的绝对差值
            let offsetDiff = Math.abs(goalOffset - element.scrollTop)

            //计时器 滚动逻辑
            let timer = setInterval(() => {
                //计算速度  向上舍入 速度最小为 1 这样element.scrollTop == goalOffset 最后必然成立
                //注意 当offsetDiff小于divisor后 速度将恒为1 所以 divisor不不宜过大 建议设为5
                let ispeed = Math.ceil(offsetDiff / divisor)

                //计算剩余差值
                offsetDiff = offsetDiff - ispeed

                //根据滚动方向 判断偏移量是加是减
                if (direction == 'up') {
                    element.scrollTop = element.scrollTop + ispeed
                } else {
                    element.scrollTop = element.scrollTop - ispeed
                }

                //当前偏移 等于目标偏移 停止滚动 清除计时器 并执行回调方法
                if (element.scrollTop == goalOffset) {
                    clearInterval(timer)
                    if (completeCall) {
                        //回调函数里记得把绑定值初始化 比如设为false
                        completeCall()
                    }
                }
            }, 16)
        }
    }
})