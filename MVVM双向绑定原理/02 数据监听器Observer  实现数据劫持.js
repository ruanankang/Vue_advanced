// 定义MyVue构造函数
function MyVue(options = {}) {
  // 将所有的属性挂载到对象实例的属性$options上
  this.$options = options;
  // 将data所有的属性挂载到对象实例的属性_data和构造函数的静态属性data上
  let data = this._data = this.$options.data;
  // 通过观察者(数据监听器Observer)实现数据劫持
  observer(data);
  // 优化：在此之前我们要通过myVue._data.a才能访问到属性a，我们希望能通过myVue.a直接访问到属性a
  // 即：让 this 代理 this._data
  Object.keys(data).forEach(key => {
    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: false,
      get() {
        return this._data[key];
      },
      set(newValue) {
        this._data[key] = newValue;
      }
    })
  })

  // 编译模板
  new Compile(this.$options.el, this);
}


/**
  Observer：观察对象并给对象增加Oject.defineProperty();
*/
function Observer(data) { // 这里写主要的观察者逻辑
  for (let key in data) { // 遍历data所有的属性
    let value = data[key];
    // 监听子属性，由于data的属性可能也是一个对象如{a: {b : 1}}，为了把data的所有属性都进行数据劫持，采用递归的方式
    observer(value);
    // 通过Object.defineProperty方法，重新定义data的所有可遍历属性的读写方式，达到数据劫持的目的
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get() {
        return value
      },
      set(newValue) { // 更改属性值
        if (value !== newValue) {
          value = newValue;
          // 如果重新赋值的属性值也是一个对象，也需要观察监听
          if (value && typeof value === 'object') { // 因为typeof null === 'object'
            observer(value);
          }
        }
      }
    })
  }
}

function observer(data) {
  if (!data || typeof data !== 'object') { // 因为typeof null === 'object'
    return;
  }
  return new Observer(data);
}
/*
  vue特点不能新增不存在的属性，不能存在的属性没有getter和setter
  深度响应：因为每次给属性赋值时，会检测该值是否为一个对象，如果是，则会对该对象类型的属性值进行观察监听(数据劫持)
*/


/**
 * 编译模板Compile
 */
function Compile(el, vm) {
  // el 表示替换的范围
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


  /**
   * 发布订阅模式：先订阅
   */
  // 订阅收集器Dep
  function Dep() {
    this.subs = []
  }
  Dep.prototype.addSub = function(sub) {
    this.subs.push(sub)
  }
  Dep.prototype.notify = function() {
    this.subs.forEach(sub => {
      sub.update();
    })
  }

}