import Vue from 'vue'

/** 自定义scrollerUpdate 下拉刷新 */
const scrollUpdate = Vue.directive('scrollUpdate', {
    inserted: function(el, binding, vnode, oldVnode) {
        /** 变量scrollTop是滚动条滚动时，距离顶部的距离 */
        let touchStarY=0, touchEndY=0, touchDistance=0, 
            pageDownTimer=null, newLiEle=null, updateState=0;
        /** 触摸开始，多点触控，后面的手指同样会触发 */
        el.addEventListener('touchstart', async(e) => {
            touchStarY = e.touches[0].clientY;
            clearInterval(pageDownTimer);
        })
        /** 接触点改变，滑动时 */
        el.addEventListener('touchmove', async(e) => {
            touchEndY = e.touches[0].clientY;
            touchDistance = touchEndY - touchStarY;
            /** console.log("touch滑动了", touchDistance); */
            var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            let UpdateEle = document.getElementById("downUpdateEle");
            if( touchDistance < 0 ){      //上拉
                if( UpdateEle ) el.removeChild(newLiEle)
            }else{
                if( el.scrollTop == 0 && scrollTop <= 0 ){
                    // e.preventDefault();   /** 阻止浏览器的黑色背景 */
                    if(!UpdateEle){
                        //添加 li
                        newLiEle = document.createElement("li");
                        // 设置 li 属性： id、style；
                        newLiEle.setAttribute("id", "downUpdateEle");
                        newLiEle.setAttribute('style', 'text-align: center;list-style: none; background: #fefefe; color: #999999; font-size: 16px; opacity: 1;');
                        newLiEle.innerHTML = "下拉刷新";
                        el.insertBefore(newLiEle, el.firstChild);
                    }
                    newLiEle.style.lineHeight = touchDistance+'px';
                    if(touchDistance > 40){
                        newLiEle.innerHTML = "松开刷新";
                        newLiEle.style.lineHeight = '50px';
                        updateState = 1;
                    }
                }

            }
        })
        el.addEventListener('touchend', async() => {
            /** 确定是回到顶部 且 updateState == 1 就 刷新数据 */
            var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            if( updateState == 1 && scrollTop <= 0 ){     
                let expression_name = binding.expression;
                let expression_fun = vnode.context[expression_name];
                expression_fun && await expression_fun();
                updateState = 0;
                resetNewTopEle();
            }else{                 
                /** 不触发刷新数据 */
                resetNewTopEle()
            }
            function resetNewTopEle(){
                pageDownTimer = setInterval(()=>{
                    if(document.getElementById("downUpdateEle")){
                        //样式获取
                        let newLiLineheight = parseInt(newLiEle.style.lineHeight);
                        let newLiFontSize = parseInt(newLiEle.style.fontSize);
                        let newLiOpacity = newLiEle.style.opacity;
                        if(newLiLineheight<1){
                            el.removeChild(newLiEle)
                            clearInterval(pageDownTimer)
                        }else{
                            newLiEle.style.lineHeight = newLiLineheight/2+'px';
                            newLiEle.style.fontSize = newLiFontSize/2+'px';
                            newLiEle.style.opacity = newLiOpacity/2;
                        }
                    }
                }, 70)
            }
        })
    }
})


/** 自定义scrollMore 上拉加载更多 */
const scrollMore = Vue.directive('scrollMore', {
    bind: function(el, binding) {
        window.addEventListener('scroll', () => {
        /** 变量scrollTop是滚动条滚动时，距离顶部的距离 */
        var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
        /** 变量windowHeight是可视区的高度 */
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        /** 变量scrollHeight是滚动条的总高度 */
        var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
            /** 滚动条到底部的条件 */
            if(scrollTop+windowHeight >= scrollHeight - 30 ){
                /** 触发指令绑定的函数 */
                binding.value()
            } 
        })
    }
})

