/** 输入框输入之后自动获取下一个输入框的焦点 常用于6位验证码、密码框 */
import Vue from "vue";
export const enterIntegerNumber = Vue.directive('enterIntegerNumber', {
    inserted: function(event) {
        /** input限制输入数字 */
        event.addEventListener('keypress', function(e) {
            e = e || window.event
            const code = typeof e.charCode === 'number' ? e.charCode : e.keyCode
            const re = /\d/
            if (!re.test(String.fromCharCode(code)) && code > 9 && !e.ctrlKey) {
                if (e.preventDefault) {
                    e.preventDefault()
                } else {
                    e.returnValue = false
                }
            }
        });
      
        /** 焦点自动跳转 */
        event.addEventListener("keyup", function (e) {
            e = e || window.event /** 没有这一句，无法使用e.keyCode */
            const txts = document.getElementsByTagName('input'); /** 一个input标签的html集合 */
            for (let i = 0; i < txts.length; i += 1) { /** i++=》i+=1  */
                const t = txts[i];
                t.index = i;
                t.setAttribute('readonly', true);
                t.onkeyup = function () {
                    this.value = this.value.replace(/^(.).*$/, '$1');
                    /** 最后一次删除时，光标停留在当前位置而不是前一，否则最后一个数字无法回退删除 */
                    const next = t.index <txts.length-1? this.index + 1:this.index;
                    /** 同理，避免第一个数字prev为-1 */
                    const prev = t.index <1? this.index :this.index -1;
        
                    if(e.keyCode !== 8){
                        if (next > txts.length - 1) return next;
                        /** //只读 */
                        txts[next].removeAttribute('readonly');
                        txts[next].focus();
                    }
                    else {
                        txts[prev].removeAttribute('readonly');
                        txts[prev].focus();
                    }
                }
                txts[0].removeAttribute('readonly');
            }
        })
    }
})