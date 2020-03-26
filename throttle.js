import Vue from "vue";
/** 防抖 */
export const antiShake =  Vue.directive('antiShake', {
    // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
    /**
    * el 指令所绑定的元素，可以用来直接操作 DOM 。
    * binding 一个对象，包含绑定的值
    */
    
    inserted: function(el, binding) {
        const { callback, time } = binding.value
        el.callback = callback
        el.time = time
        el.timeCall = null
        el.addEventListener('click', () => {
            clearTimeout(el.timeCall)
            el.timeCall = setTimeout(() => {
                el.callback()
            }, el.time || 500)
        })
    },
    // 所在组件的 VNode 更新时调用
    update: function(el, binding) {
        const { callback, time } = binding.value
        el.callback = callback
        el.time = time
    },
})


/** 节流 */
export const throttling = Vue.directive('throttling', {
    /** 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中) */
    inserted: function(el, binding) {
        const { callback, time } = binding.value
        el.callback = callback
        el.time = time
        el.addEventListener('click', () => {
            const nowTime = new Date().getTime()
            if (!el.preTime || nowTime - el.preTime > el.time) {
                el.preTime = nowTime
                el.callback()
            }
        })
    },
    update: function(el, binding) {
        const { callback, time } = binding.value
        el.callback = callback
        el.time = time
    }
})