# JavaScript Promise 与 Async/Await

## 1. Promise

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。

### 三种状态
- **Pending** (进行中)
- **Fulfilled** (已成功)
- **Rejected** (已失败)

### 基本用法
```javascript
const promise = new Promise((resolve, reject) => {
  if (/* 异步操作成功 */) {
    resolve(value);
  } else {
    reject(error);
  }
});

promise.then((value) => {
  // success
}).catch((error) => {
  // failure
});
```

## 2. Async/Await

`async` 和 `await` 是 ES2017 引入的新语法，是 Generator 函数的语法糖，使异步代码看起来像同步代码。

### 优点
1. **代码更简洁**：不需要链式调用 `.then()`。
2. **错误处理**：可以使用 `try...catch` 捕获同步和异步错误。
3. **调试方便**：调试器可以像调试同步代码一样步进。

### 示例
```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}
```
