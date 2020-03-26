/** 拖拽 */
import Vue from "vue";
class moveBuuild {
    constructor (ele,binding) {
      console.log(ele, 'element')
      this.ele = ele;
      this.binding = binding;
      this.init();
    }
  
    domPosition = {
      x: 0,
      y: 0
    }
  
    startPosition = {
        x: 0,
        y: 0
    }
  
    openMove = false
    transitionMove = {
        transform: `translate( 0px, 0px )`,
        background: 'red'
    }
    /** x y 默认都是0 */
    setMove ( x = (this.binding.value && this.binding.value.x) || 0, y = (this.binding.value && this.binding.value.y) || 0 ){
        if( this.binding.value && this.binding.value.transform ) {
            this.ele.style.transform = `translate( ${x}px, ${y}px )`;
        }else {
            this.ele.style.position = `fixed`;
            this.ele.style.left = `${x}px`;
            this.ele.style.top = `${y}px`;
        }
    }
  
    init () {
      this.ele.addEventListener('touchstart', (e) => this.start(e));
      this.ele.addEventListener('touchmove', (e) => this.move(e));
      this.ele.addEventListener('touchend', (e) => this.end(e));
      this.setMove();
    }
    
    start (e){
        const el = e.target;
        const { pageX, pageY } = e.changedTouches[0];
        this.startPosition = {
            x: pageX,
            y: pageY
        }
        if( this.binding.value && this.binding.value.transform ) {
            const domPosition = el.style.transform.match(/[\d]+.?[\d]*px/igm);
            this.domPosition = {
                x: parseInt(domPosition[0].replace('px', '')),
                y: parseInt(domPosition[1].replace('px', '')),
            }
        }else {
            this.domPosition = {
                x: parseInt(el.style.left.replace('px', '')),
                y: parseInt(el.style.top.replace('px', '')),
            }
        }
        this.openMove = true;
    }
  
    move(e){
        if( !this.openMove ){ return };
        /** 可视区宽度 可视区高度 元素宽度 元素高度 */
        const clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
        const clientHeight = document.documentElement.clientHeight || document.body.clientHeight; 
        const width = this.ele.offsetWidth; 
        const height = this.ele.offsetHeight;
        /** 移动的位置信息 */
        const { pageX, pageY } = e.changedTouches[0];
        const movePoisition = {
            x: pageX,
            y: pageY
        }
        /** 移动的位置信息 - 移动前的位置信息 */
        const level = movePoisition.x - this.startPosition.x + this.domPosition.x;
        const vertical = movePoisition.y - this.startPosition.y + this.domPosition.y;
        /** 防止移出可视区内 */
        const x = level <= 0 ? 0 : level >= (clientWidth - width) ? (clientWidth - width) : level;
        const y = vertical <= 0 ? 0 : vertical >= (clientHeight - height) ? (clientHeight - height) : vertical;
        const moveStyle = {
            transform: `translate( ${x}px, ${y}px )`,
            background: 'red'
        }
        
        this.setMove(x <= 0 ? 0 : x, y);
        this.transitionMove = moveStyle;
    }
  
    end (e){
        this.openMove = false;
    }
    
  }
  
// 配置指令
export default Vue.directive('drag', {
    inserted: (el,binding) =>{
        new moveBuuild(el,binding);
    }
})