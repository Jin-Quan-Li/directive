/** 防连点  */
import Vue from "vue";
/** 使用这个指令的所有DOM对象 */
const pointDoms = []; 
export const points = Vue.directive('points', {
    inserted(el, binding) {
        /** 存储使用这个指令的DOM */
        pointDoms.push(el); 
        el.addEventListener('click', () => {
            /** 禁用所有使用这个指令的DOM结构点击事件 */
            pointDoms.forEach(pointItem => {
                pointItem.style.pointerEvents = 'none';
            });
            const time = setTimeout(() => {
                /** 启动所有使用这个指令的DOM结构点击事件 */
                pointDoms.forEach(pointItem => {
                    pointItem.style.pointerEvents = 'auto';
                });
            }, binding.value || 500);
        });
    }
});

