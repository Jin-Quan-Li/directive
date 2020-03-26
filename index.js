/** 所有自定义指令在此文件统一导出 */
import { tap, swipe, swipeleft, swiperight, swipedown, swipeup, longtap  } from "./gestures";
import showTips from './showTips';
import clickoutside from './clickoutside';
import { scrollUpdate, scrollMore, loadmore} from './scroll';
import enterIntegerNumber from './enterIntegerNumber';
import points from './points';
import { antiShake, throttling } from './throttle';
import lazyload from './lazyload';
import drag from './drag';
import tickDirective from './tickDirective';
import waves from './waves';
import loading from './loading';

export default (Vue) => {
    tap;
    swipe;
    swipeleft;
    swiperight;
    swipedown;
    swipeup;
    longtap;
    showTips;
    clickoutside;
    scrollUpdate;
    scrollMore;
    loadmore;
    enterIntegerNumber;
    points;
    antiShake;
    throttling;
    lazyload;
    drag;
    tickDirective;
    waves;
    loading;
}