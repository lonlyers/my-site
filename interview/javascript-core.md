# JavaScript 核心高频面试题

## 1. 数据类型与检测

**基本数据类型**：Number, String, Boolean, Null, Undefined, Symbol, BigInt
**引用数据类型**：Object (Array, Function, Date ...)

**检测方式**：
- `typeof`: 适合基本类型，但 output `null` 为 `'object'`。
- `instanceof`: 基于原型链判断。
- `Object.prototype.toString.call(val)`: 最准确，返回 `[object Type]`。

## 2. 闭包 (Closure)

**定义**：一个函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是闭包。

**应用场景**：
- 数据私有化（模拟私有变量）。
- 柯里化函数 (Currying)。
- 防抖与节流。

**缺点**：容易导致内存泄漏（旧版浏览器或引用未清理）。

## 3. 原型与原型链

- **原型 (`prototype`)**: 每个函数都有 `prototype` 属性。
- **原型链 (`__proto__`)**: 对象通过 `__proto__` 指向构造函数的 `prototype`，层层向上直到 `null`。
- **继承**: ES5 使用组合继承/寄生组合继承，ES6 使用 `class extends`。

## 4. this 指向

1. **全局/函数调用**: 非严格模式 window，严格模式 undefined。
2. **对象方法**: 指向调用对象。
3. **构造函数**: 指向新创建的实例。
4. **箭头函数**: 没有自己的 this，继承自外层作用域。
5. **call/apply/bind**: 显式绑定。

## 5. 防抖 (Debounce) 与节流 (Throttle)

- **防抖**: N 秒内只执行最后一次（搜索框输入）。
- **节流**: N 秒内只执行一次（滚动事件监听）。

```javascript
// 简易防抖
function debounce(fn, delay) {
  let timer = null;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, arguments), delay);
  }
}
```

## 6. ES6+ 新特性

- `let` / `const` (块级作用域)
- 箭头函数
- 解构赋值
- 模板字符串
- Promise / async / await (见单独章节)
- Set / Map 数据结构
- Module (import / export)
