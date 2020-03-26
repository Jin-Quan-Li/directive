/** 点击 滑动 左滑 右滑 上滑 下滑 长按 */
import Vue from "vue";
class  vueTouch {
    constructor(el, binding, type) {
        /** 触屏函数 */
        this.obj = el;
        this.binding = binding;
        this.touchType = type;
        /** 触屏坐标 */
        this.vueTouches = { x: 0, y: 0 };
        this.vueMoves = true;
        this.vueLeave = true;
        this.vueCallBack = typeof binding.value == 'object' ? binding.value.fn : binding.value;
        this.obj.addEventListener(
            'touchstart',
            (e) => {
                this.start(e);
            },
            false
        );
        this.obj.addEventListener(
            'touchend',
            (e) => {
                this.end(e);
            },
            false
        );
        this.obj.addEventListener(
            'touchmove',
            (e) => {
                this.move(e);
            },
            false
        );
    }
    start(e) {
        /** 监听touchstart事件 */
        this.vueMoves = true;
        this.vueLeave = true;
        this.longTouch = true;
        this.vueTouches = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
        // console.log('targetTouches', e.targetTouches[0]);
        this.time = setTimeout(
            function() {
                if (this.vueLeave && this.vueMoves) {
                    this.touchType == 'longtap' && this.vueCallBack(this.binding.value, e);
                    this.longTouch = false;
                }
            }.bind(this),
            1000
        );
    }
    end(e) {
        // console.log('this.vueTouches', this.vueTouches);
        // console.log('this.changedTouches', e.changedTouches[0].clientX);
        // 此处代码用来解决IOS回弹问题 begain
        /** 监听touchend事件 */
        /** 此处代码用来解决IOS回弹问题 begain */
        if (e.changedTouches[0].clientX<0) {
            return;
        }
        /** 此处代码用来解决IOS回弹问题 end */
        var disX = e.changedTouches[0].clientX - this.vueTouches.x; // 计算移动的位移差
        var disY = e.changedTouches[0].clientY - this.vueTouches.y;
        // console.log(Math.abs(disX), Math.abs(disY));
        clearTimeout(this.time);
        if (Math.abs(disX) > 10 || Math.abs(disY) > 100) {
            /** 当横向位移大于10，纵向位移大于100，则判定为滑动事件 */
            this.touchType == 'swipe' && this.vueCallBack(this.binding.value, e); // 若为滑动事件则返回
            if (Math.abs(disX) > Math.abs(disY)) {
                /** 判断是横向滑动还是纵向滑动 */
                if (disX > 30) {
                    this.touchType == 'swiperight' && this.vueCallBack(this.binding.value, e); // 右滑
                    console.log("右滑")
                }
                if (disX < -30) {
                    this.touchType == 'swipeleft' && this.vueCallBack(this.binding.value, e); // 左滑
                    console.log("左滑")
                }
            } else {
                if (disY > 30) {
                    this.touchType == 'swipedown' && this.vueCallBack(this.binding.value, e); // 下滑
                    console.log("下滑")
                }
                if (disY < -30) {
                    this.touchType == 'swipeup' && this.vueCallBack(this.binding.value, e); // 上滑
                    console.log("上滑")
                }
            }
        } else if (this.longTouch && this.vueMoves) {
            this.touchType == 'tap' && this.vueCallBack(this.binding.value, e);
            this.vueLeave = false;
        }
    }
    move(e) {
        // 监听touchmove事件
        this.vueMoves = false;
    }
}


export const tap = Vue.directive('tap', {
    // 点击事件
    bind(el, binding,vnode) {
        vnode.key = Math.random().toString(36).substring(2)//randomString会返回一个随机字符串
        new vueTouch(el, binding, 'tap');
    }
});

export const swipe = Vue.directive('swipe', {
    // 滑动事件
    bind(el, binding,vnode) {
        vnode.key = Math.random().toString(36).substring(2)//randomString会返回一个随机字符串
        new vueTouch(el, binding, 'swipe');
    }
});

export const swipeleft = Vue.directive('swipeleft', {
    // 左滑事件
    bind(el, binding,vnode) {
        vnode.key = Math.random().toString(36).substring(2)//randomString会返回一个随机字符串
        new vueTouch(el, binding, 'swipeleft');
    }
});

export const swiperight = Vue.directive('swiperight', {
    // 右滑事件
    bind(el, binding,vnode) {
        vnode.key = Math.random().toString(36).substring(2)//randomString会返回一个随机字符串
        new vueTouch(el, binding, 'swiperight');
    }
});
export const swipedown = Vue.directive('swipedown', {
    // 下滑事件
    bind(el, binding,vnode) {
        vnode.key = Math.random().toString(36).substring(2)//randomString会返回一个随机字符串
        new vueTouch(el, binding, 'swipedown');
    }
});
export const swipeup = Vue.directive('swipeup', {
    // 上滑事件
    bind(el, binding,vnode) {
        vnode.key = Math.random().toString(36).substring(2)//randomString会返回一个随机字符串
        new vueTouch(el, binding, 'swipeup');
    }
});

export const longtap = Vue.directive('longtap', {
    // 长按事件
    bind(el, binding,vnode) {
        vnode.key = Math.random().toString(36).substring(2)//randomString会返回一个随机字符串
        new vueTouch(el, binding, 'longtap');
    }
});


