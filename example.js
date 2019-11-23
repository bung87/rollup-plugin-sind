const sid = require('sind');
const tpl = `
<div class="header other-class">
  <div class="&-menu">
    <div class="&__item">1</div>
    <div class="&__item">2</div>
    <div class="&__item">3</div>
    <div class="&__item">4</div>
  </div>
</div>
`;
const s = sid(tpl)
console.log(s)
const tpl2 = '<div class="header other-class"><div class="&-menu"> </div></div>'
const s2 = sid(tpl2)
console.log(s2)