const docEle = document.documentElement;
function setRemUnit(){
  let rem = docEle.clientWidth / 10;
  docEle.style.fontSize = rem + 'px';
}
setRemUnit();
window.addEventListener('resize', setRemUnit);