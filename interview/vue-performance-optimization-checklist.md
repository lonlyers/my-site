# Vue 项目性能优化与落地清单

本文档把之前给出的 Vue 项目优化建议整理成一份可操作的 Markdown 清单，按分析、构建、运行时、渲染、网络、资源、监控与安全等层面分类，便于落地执行与复查。每一项附带简短说明或常用命令/示例。

---

## 总体流程（简短）
- 先用性能分析定位瓶颈（Lighthouse、Vue Devtools、浏览器 Performance、后端 APM）。
- 优先优化用户“感知最慢”的部分（首屏加载、交互卡顿、内存泄漏）。
- 分阶段：分析 -> 小步优化 -> 验证 -> 扩展与监控。

---

## 目录（快速跳转）
- 分析与监测
- 构建与打包优化
- 网络与资源加载
- Vue 层面渲染优化
- JavaScript 运行时优化
- CSS 与样式优化
- 第三方脚本优化
- 后端与 API 优化
- 渐进式体验与可访问性
- 安全与稳定性
- CI/CD 与本地开发体验
- 常用工具与插件
- 落地检查表

---

## 一、分析与监测（必做）
- Lighthouse（Chrome）— 生成性能/可访问性/最佳实践/SEO 报告。
- Vue Devtools Profiler — 检查组件渲染次数与响应式依赖。
- 浏览器 Performance 面板 — 记录 FCP、LCP、TTI、长任务（>50ms）。
- RUM + 错误监控：Sentry（错误 + 性能）、Perfume.js、LogRocket、Datadog。
- 收集真实用户监控，判断受影响用户与环境分布。

---

## 二、构建与打包优化
- 生产构建：确保 NODE_ENV=production，并关闭 dev-only 插件/source maps（或只保留独立 source map）。
- Tree-shaking：使用 ESM 包（lodash → lodash-es），升级构建工具（Vite / webpack 5）。
- 代码分割：
  - 路由懒加载：
    - const Foo = () => import(/* webpackChunkName: "foo" */ '@/views/Foo.vue')
  - 组件懒加载（defineAsyncComponent、动态 import）。
- 按需引入库（UI 框架按需/组件化引入）。
- 产物压缩：Terser、cssnano、vite-plugin-compression（gzip/brotli）。
- 图片压缩与现代格式：WebP / AVIF / imagemin / sharp。
- 长缓存策略：输出文件使用 contenthash（[contenthash]），index.html 做短缓存或 no-cache。
- bundle 分析：webpack-bundle-analyzer、source-map-explorer、rollup-plugin-visualizer。
- 移除未使用依赖：npm/npm-check、depcheck。

---

## 三、网络与资源加载
- 使用 HTTP/2 或 HTTP/3（CDN 或服务器支持）。
- 关键 CSS 内联（critical CSS）减少渲染阻塞。
- 使用 async/defer 加载非关键脚本。
- 资源压缩（gzip 或 brotli）在服务器或 CDN 层启用。
- Cache-Control 策略：静态资源长期缓存，HTML 做短缓存。
- 使用 CDN 分发静态资源降低延迟。
- 预连接 / 预加载示例：
```js
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link rel="preload" as="script" href="/static/chunk.abc.js">
```
- 图片与媒体：
  - 响应式图片（srcset / sizes）。
  - 图片 lazy-loading（loading="lazy" 或 IntersectionObserver）。
  - 视频占位图与懒加载。

---

## 四、Vue 层面的渲染与组件优化
- 减少响应式追踪：对不变数据使用普通对象（非 reactive）。
- 复杂计算放 computed，不要在模板里执行昂贵计算。
- 避免不必要重渲染：
  - v-once 渲染静态内容。
  - 合理使用 key 控制组件重建。
  - 将大型/重量组件拆分为更小的子组件。
- 大量列表使用虚拟滚动（virtual-scroller / vue-virtual-scroll-list）。
- 防抖 / 节流：对 scroll、resize、input 建议使用 debounce/throttle。
- 状态管理：Pinia（模块化）、避免单一全局状态导致全局重渲染。
- 避免在模板中创建新函数/对象（如 :style="{ color: getColor() }"），使用 computed。
- 异步组件：defineAsyncComponent + 占位 UI。
- SSR / SSG（Nuxt、Vite-SSG）用于首屏渲染与 SEO。

---

## 五、JavaScript 运行时优化
- 替换大型库（moment → dayjs / date-fns）。
- 只引入所需 polyfills（browserslist + core-js 按需）。
- 将密集计算放到 Web Worker。
- 使用 requestIdleCallback 或 setTimeout 推迟低优先任务。
- 减少内存分配与短生命周期对象分配以降低 GC 压力。

---

## 六、CSS 与样式优化
- 删除未使用 CSS（PurgeCSS、Tailwind purge）。
- 使用 CSS Modules 或 Scoped CSS 减少全局影响。
- 避免高成本重绘属性（layout-triggering properties），使用 transform / opacity 做动画。
- will-change 谨慎使用（内存开销）。
- 提取并压缩 CSS（mini-css-extract-plugin / vite 内置处理）。

---

## 七、第三方脚本优化
- 第三方脚本延迟或异步加载（analytics、chat、ads）。
- 评估第三方脚本体积与阻塞影响，必要时替换或本地托管减小请求开销。
- 使用策略隔离第三方脚本（iframe / sandbox）以降低主线程影响。

---

## 八、后端与 API 优化
- 合并小请求为批量接口（或使用 GraphQL）。
- 开启服务器端压缩（gzip / brotli）。
- 使用 HTTP 缓存（ETag、If-Modified-Since）。
- 对大数据使用分页/懒加载；前端做合理缓存（stale-while-revalidate）。
- 使用缓存层（Redis、CDN 缓存）降低后端负载。

---

## 九、渐进式增强与用户体验
- 骨架屏（skeleton）比 spinner 更能改善感知速度。
- 优先加载可交互首屏元素（First Interactive）。
- PWA / Service Worker：缓存关键资源、提供离线体验与更快的二次加载。
- 无障碍（a11y）检查：确保键盘导航、可读的对比度、ARIA 标签。

---

## 十、安全与稳定性（也影响体验）
- 依赖定期升级与扫描（Dependabot、Snyk）。
- 防止 XSS，谨慎使用 v-html，对用户输入做过滤。
- 增强错误处理与回退 UX（重试、降级策略、清晰错误提示）。

---

## 十一、CI/CD 与本地开发体验
- CI 缓存：依赖缓存、构建缓存（actions/cache、GitLab cache）。
- 在 CI 中自动执行 Lighthouse 或性能回归测试（示例：Lighthouse CI）。
- 组件隔离开发：Storybook，提高复用与测试效率。
- 在 PR 流程中加入 bundle size 检查（changeset 或 size-limit）。

---

## 十二、常用工具与插件（快速清单）
- 包体积分析：webpack-bundle-analyzer、source-map-explorer、rollup-plugin-visualizer
- 图片处理：imagemin、sharp、squoosh
- 性能检测：Lighthouse、WebPageTest、Perfume.js（RUM）
- Vue 专用：Vue Devtools、vite-plugin-legacy、vite-plugin-compression
- 依赖安全：Dependabot、Snyk

---

## 落地检查表（可复制到 TODO 工具）
- [ ] 用 Lighthouse 和 Vue Devtools 定位首要问题
- [ ] 做 bundle 分析并移除/替换大依赖
- [ ] 路由与组件做懒加载/按需加载
- [ ] 启用 gzip/brotli 与 CDN 分发静态资源
- [ ] 优化图片与字体（压缩、懒加载、WebP/AVIF）
- [ ] 减少不必要响应式依赖与重渲染
- [ ] 将密集计算移到 Web Worker（如需）
- [ ] 引入监控（Sentry + RUM）并监测关键指标（LCP、TTI、FCP）
- [ ] 在 CI 中添加性能回归检测或 Bundle-size 检查

---

## 常见情景与建议（快速参考）
- 首屏慢：考虑 SSR/SSG、critical CSS、路由懒加载、减少初始 bundle。
- 页面卡顿（交互延迟）：查长任务、减少主线程工作、Web Worker、减少同步渲染工作。
- bundle 太大：按需引入、替换大库、代码分割、分析具体大模块。
- 图片慢：压缩、WebP、lazy-load、CDN。

---

## 附：示例命令与片段
- 安装 bundle 分析器（webpack）：
  - npm install --save-dev webpack-bundle-analyzer
- Vite 压缩插件示例：
  - npm i -D vite-plugin-compression
  - vite.config.js 中添加： import compress from 'vite-plugin-compression'; plugins: [vue(), compress({ brotli: true })]
- 路由懒加载（Vue Router）：
  - const Home = () => import('@/views/Home.vue')

---

## 结束语
我已把之前的优化建议整理成这份 Markdown 文档，覆盖从分析、构建、运行时、前端渲染到后端与 CI 的实用清单，可直接复制进项目文档或 Wiki。  
如果你希望，我可以：
- 把它转换成项目仓库的 README.md（并提交到指定仓库/分支），或者
- 基于你的仓库做一次包体积分析和优先级建议（需要 repo 或构建产物）。

告诉我你要把这份文档放在哪（本地文件 / GitHub 仓库），我可以继续把文件写入仓库或生成下载内容。