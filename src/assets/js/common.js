(function () {
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  var recalc = function () {
    var clientWidth = document.body.clientWidth;
    if(!clientWidth){
      return;
    }
    document.documentElement.style.fontSize = 10 * (clientWidth/375)+ 'px';
    document.documentElement.style.visibility = 'visible';
  }
  if(!document.documentElement.addEventListener){
    return;
  }
  window.addEventListener(resizeEvt,recalc,false);
  window.addEventListener('DOMContentLoaded',recalc,false);
})();
