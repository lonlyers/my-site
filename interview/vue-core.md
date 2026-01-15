# Vue 核心面试题

## 1. Vue 生命周期 (Vue 2 vs Vue 3)

| 阶段 | Vue 2 | Vue 3 (Composition API) |
| :--- | :--- | :--- |
| 创建前 | beforeCreate | setup() |
| 创建后 | created | setup() |
| 挂载前 | beforeMount | onBeforeMount |
| 挂载后 | mounted | onMounted |
| 更新前 | beforeUpdate | onBeforeUpdate |
| 更新后 | updated | onUpdated |
| 销毁前 | beforeDestroy | onBeforeUnmount |
| 销毁后 | destroyed | onUnmounted |

**Setup 执行时机**：在 `beforeCreate` 之前执行。

## 2. Vue 响应式原理

- **Vue 2**: 使用 `Object.defineProperty` 劫持 data 中属性的 getter/setter。
  - *缺点*：无法检测对象属性的新增/删除；数组索引修改无法检测（需重写数组方法）。
- **Vue 3**: 使用 ES6 `Proxy` 代理整个对象。
  - *优点*：支持数组和对象的新增删除，性能更好。

## 3. 组件通信方式

1. **props / $emit**: 父子组件。
2. **provide / inject**: 祖先与后代组件（依赖注入）。
3. **EventBus ($on/$emit)**: 任意组件（Vue 3 中已移除，需用库）。
4. **Vuex / Pinia**: 全局状态管理。
5. **$refs / $parent / $children**: 直接访问实例。
6. **$attrs / $listeners**: 跨级传递属性。

## 4. Computed vs Watch

- **Computed (计算属性)**: 支持缓存，只有依赖改变才重新计算。适合**一个数据受多个数据影响**。
- **Watch (侦听器)**: 不支持缓存，支持异步操作。适合**一个数据影响多个数据**，或执行开销较大的操作。

## 5. v-if 与 v-show

- **v-if**: 真正的条件渲染，条件为假时销毁 DOM。切换开销大。
- **v-show**: CSS `display: none` 切换。初始渲染开销大。
- *场景*：频繁切换用 v-show，不常切换用 v-if。

## 6. Vue 3 新特性

- **Composition API**: 逻辑复用更灵活（Hooks）。
- **Teleport**: 将组件内容渲染到 DOM 树的其他位置（如 Modal）。
- **Fragments**: 支持多个根节点。
- **Better TypeScript Support**.
