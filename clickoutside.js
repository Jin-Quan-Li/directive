/** 点击除当前元素外的事件， 常用于点击空白区域关闭下拉框、模态框等 */
import Vue from "vue";
export default Vue.directive('clickoutside', {
    // el {element} 当前元素
    bind(el, binding, vnode) {
        const documentHandler = (e) => {
            if (el.contains(e.target)) {
                return false
            }
            if (binding.expression) {
                binding.value(e)
            }
        }
        const KeyUp = (e) => {
            if (e.keyCode == 27) {
                if (binding.expression) {
                    binding.value(e)
                }
            }
        }
        el.__vueClickOutSize__ = documentHandler
        el.__vueKeyup__ = KeyUp
        
        document.addEventListener('keyup', KeyUp)
        document.addEventListener('click', documentHandler)
    },
    unbind(el, binding) {
        document.removeEventListener('click', el.__vueClickOutSize__)
        delete  el.__vueClickOutSize__

        document.removeEventListener('keyup', el.__vueKeyup__)
        delete  el.__vueKeyup__
    }
})