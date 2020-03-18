/**
 * 编译模板Compile
 */
function Compile(el, vm) {
  // el 表示替换的范围 vue根结点 vm表示vue根节点的实例
  vm.$el = document.querySelector(el);
  // createDocumentFragment用来创建一个虚拟的节点对象，或者说是用来创建文档碎片节点。它可以包含各种类型的节点，在创建之初是空的。
  let fragment = document.createDocumentFragment();
  // 将vm.$el的所有子节点剪切到fragment中，存在内存中
  while (childNode = vm.$el.firstChild) {
    fragment.appendChild(childNode)
  }

  // 在文档碎片fragment中进行模板解析，将变量转换为对应的值
  replace(fragment);

  function replace(fragment) {
    Array.from(fragment.childNodes).forEach(node => {
      let text = node.textContent;
      const reg = /\{\{(.*)\}\}/;
      if (node.nodeType === 3 && reg.test(text)) {
        console.log(RegExp.$1); // a  b.c
        let _vm = vm;
        RegExp.$1.split('.').forEach(key => { // 取this.a  this.b.c
          _vm = _vm[key];
        });
        node.textContent = text.replace(/\{\{(.*)\}\}/, _vm)
      }
      if (node.childNodes) {
        replace(node);
      }
    })
  }

  // 将模板编译之后解析的节点插入vm.$el中
  while (childNode = fragment.firstChild) {
    vm.$el.appendChild(childNode)
  }
}