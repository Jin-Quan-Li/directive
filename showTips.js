/** 文字超出显示... */
import Vue from "vue";
export default Vue.directive('showTips', {
    // el {element} 当前元素
    bind(el, binding,vnode) {
        el.style.display = '-webkit-box';
        el.style['-webkit-box-orient'] = 'vertical';
        el.style['-webkit-line-clamp'] = binding.value || 1;
        el.style.overflow = 'hidden';
    }
})