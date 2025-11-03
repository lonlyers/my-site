# 浏览器事件循环深度解答

## 1. 什么是事件循环？

事件循环（Event Loop）是浏览器和 Node.js 执行 JavaScript 的核心机制。它负责协调**同步任务**和**异步任务**的执行，使 JS 能够在单线程环境下实现高效的异步操作。

---

## 2. 浏览器中事件循环的组成

### 2.1. 执行栈（Call Stack）

- 存放正在执行的函数和上下文。
- 只有栈为空时，事件循环才会处理异步任务。

### 2.2. 消息队列（Task Queues）

事件循环中有两类主要队列：

#### （1）宏任务队列（Macrotask Queue）

包括：
- script（整体代码块）
- setTimeout / setInterval
- setImmediate（IE/Node.js）
- I/O 操作
- UI 渲染
- MessageChannel

#### （2）微任务队列（Microtask Queue）

包括：
- Promise.then/catch/finally 的回调
- MutationObserver
- queueMicrotask

---

## 3. 事件循环的执行流程

1. **执行全局同步代码，进入主线程执行栈。**
2. **遇到异步代码（如 setTimeout、Promise），相关回调加入对应队列。**
3. **当前执行栈清空后，事件循环开始：**
    - 先清空微任务队列（Microtask），**全部执行完毕**。
    - 再取一个宏任务（Macrotask）并执行。
    - 宏任务执行中产生的微任务立即加入微任务队列，循环上述流程。

**简化版流程：**
> 取宏任务 -> 执行 -> 清空微任务 -> 渲染 -> 下一轮

---

## 4. 代码实例深度剖析

```js
console.log('start');

setTimeout(() => {
  console.log('timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('promise');
});

console.log('end');
```

**输出顺序：**
```
start
end
promise
timeout
```

**解释：**
- start、end 属于同步代码，直接执行。
- setTimeout 回调属于宏任务，加入宏任务队列。
- Promise.then 属于微任务，加入微任务队列。
- 当前执行栈清空后，先清空微任务队列（输出 promise），再执行宏任务队列（输出 timeout）。

---

## 5. 微任务与宏任务的优先级

- **微任务优先于宏任务**。每次宏任务执行完毕，都会立刻清空所有微任务队列。
- 微任务常用于细粒度的异步 DOM 操作或数据处理，保证状态及时一致。

---

## 6. 浏览器渲染与事件循环关系

- 浏览器在每轮宏任务与微任务队列都执行完毕后，进行**页面渲染**（布局与绘制）。
- 如果微任务太多，可能导致渲染延迟，造成页面卡顿。

---

## 7. 进阶：异步任务嵌套

```js
setTimeout(() => {
  console.log('timeout1');
  Promise.resolve().then(() => {
    console.log('promise1');
  });
}, 0);

Promise.resolve().then(() => {
  console.log('promise2');
  setTimeout(() => {
    console.log('timeout2');
  }, 0);
});
```

**输出顺序：**
```
promise2
timeout1
promise1
timeout2
```

**流程分析：**
1. 主线程同步结束，promise2 微任务先执行。
2. setTimeout 的 timeout1 宏任务执行，期间注册 promise1 微任务。
3. 清空 promise1 微任务。
4. 最后 timeout2 宏任务。

---

## 8. 事件循环与浏览器 API

- JS 引擎只管理 JS 代码的执行和事件队列。
- 浏览器的定时器、DOM 事件等由宿主环境负责，将回调放入对应队列，等待事件循环处理。

---

## 9. 总结

- 浏览器事件循环是**同步+异步**任务调度的机制。
- 优先执行微任务，保证异步流程的高效与一致。
- 宏任务执行后会触发页面渲染，渲染前会清空所有微任务。
- 理解事件循环有助于优化性能、避免卡顿、正确处理异步代码。

---

> 如需可视化演示、不同浏览器实现细节或 Node.js 事件循环对比，请继续提问！