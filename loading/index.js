/** loading */
import Vue from 'vue';
import './loading.css'
export default Vue.directive('loading', {
    bind: (el, binding) => {
        const tempDiv = document.createElement('div')
        /** 是否添加动画 */
        if( binding.modifiers.animate ) {
            tempDiv.className = 'wavy'
        }
        if ( binding.arg ) {
            el.loadingElement = tempDiv
            const arr = [...binding.arg.toString()]
            let span = '';
            const color = binding.value.color || '';
            const font = binding.value.font || '';
            arr.forEach((element,index) => {
                span+=`<span style="--i:${index};color:${color};font-size:${font}">${element}</span>`
            })
            tempDiv.innerHTML = span;
            el.appendChild(tempDiv)
        }
    },
    update: (el, binding) => {
        if ( binding.arg && binding.value ) {
            if (el.loadingElement.parentNode === null) {
                el.appendChild(el.loadingElement)
            }
        } else {
            if (el === el.loadingElement.parentNode) {
                el.removeChild(el.loadingElement)
            }
        }
    },
    unbind: (el) => {
        if (el.loadingElement.parentNode === el) {
            el.removeChild(el.loadingElement)
        }
        el.loadingElement = null
    }
})