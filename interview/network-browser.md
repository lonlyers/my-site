# 浏览器与计算机网络

## 1. 从输入 URL 到页面展示

1. **DNS 解析**：域名 -> IP 地址。
2. **TCP 连接**：三次握手建立连接。
3. **发送 HTTP 请求**。
4. **服务器处理并返回响应**。
5. **浏览器解析渲染**：
   - 解析 HTML -> DOM 树。
   - 解析 CSS -> CSSOM 树。
   - 合并为 Render Tree。
   - Layout (回流/重排)。
   - Paint (重绘)。
6. **TCP 断开**：四次挥手。

## 2. HTTP 缓存策略

- **强缓存** (不向服务器发请求):
  - `Expires`: 绝对时间 (HTTP/1.0)。
  - `Cache-Control`: `max-age=3600` (HTTP/1.1，优先级高)。
- **协商缓存** (向服务器验证):
  - `Last-Modified` / `If-Modified-Since` (基于时间)。
  - `ETag` / `If-None-Match` (基于内容哈希，优先级高)。

## 3. TCP 三次握手与四次挥手

- **三次握手**: 确认双方收发能力正常。
  - SYN -> SYN+ACK -> ACK
- **四次挥手**: 确保数据传输完毕安全断开。
  - FIN -> ACK -> FIN -> ACK

## 4. 跨域 (CORS)

**同源策略**：协议、域名、端口必须一致。

**解决方案**：
1. **CORS** (跨域资源共享): 后端设置 `Access-Control-Allow-Origin`。
2. **JSONP**: 利用 `<script>` 标签不受同源限制 (仅支持 GET)。
3. **Nginx 反向代理**: 服务器之间请求无跨域限制。
4. **开发环境 Proxy**: Vite/Webpack 配置 `server.proxy`。

## 5. 前端安全

- **XSS (跨站脚本攻击)**:
  - 注入恶意脚本。
  - *防范*：转义输入输出，开启 CSP (内容安全策略)。
- **CSRF (跨站请求伪造)**:
  - 诱导用户点击链接，利用用户登录态发请求。
  - *防范*：Token 验证，SameSite Cookie。
