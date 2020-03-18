/**
 * 发布订阅模式， 先有订阅者watcher才有发布  [fn1, fn2, fn3]
 * 消息订阅器Dep，维护一个数组，用来收集订阅者，数据变动触发notify，再调用订阅者Watcher的update方法
 */


/**
 * 消息订阅器Dep，收集订阅者watcher
 */
function Dep() {
  this.subs = [];
}

// 给Dep定义收集订阅者的方法
Dep.prototype.addSub = function(sub) {
  this.subs.push(sub);
}

// 给Dep定义通知订阅者的方法，通知的同时出发订阅者的update方法
Dep.prototype.notify = function() {
  this.subs.forEach(sub => {
    sub.update();
  })
}


/**
 * 订阅者Watcher
 */
function Watcher(fn) {
  this.fn = fn;
}

// 给Watcher定义update方法，这个update方式就是执行fn
Watcher.prototype.update = function() {
  this.fn();
}

// 实例化一个watcher，传入的函数实际上就是监听函数
let watcher = new Watcher(function() { console.log('watcher') });

let dep = new Dep();
dep.addSub(watcher);

dep.notify();