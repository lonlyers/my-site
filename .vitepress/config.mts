import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "智伟的文档网站",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text:'面试题', link:'/interview/browser-event-loop-detail',activeMatch: '/interview/' },
      { text: '案例', link: '/markdown-examples' },
      { text: '项目经历', link: '/project-jl.md' }
    ],

    sidebar: {
     '/interview/':[
      {
        text: '面试宝典索引',
        items: [
          { text: '🔴 面试题总览', link: '/interview/' },
        ]
      },
      {
        text: 'HTML & CSS',
        collapsed: false,
        items: [
          { text: 'HTML/CSS 核心摘要', link: '/interview/html-css-summary' },
          { text: 'CSS 盒模型详解', link: '/interview/css-box-model' },
        ]
      },
      {
        text: 'JavaScript',
        collapsed: false,
        items: [
          { text: 'JS 核心高频', link: '/interview/javascript-core' },
          { text: 'Promise 与 Async/Await', link: '/interview/js-promise-async-await' },
        ]
      },
      {
        text: 'Vue 框架',
        collapsed: false,
        items: [
          { text: 'Vue 核心面试题', link: '/interview/vue-core' },
          { text: 'Vue 性能优化清单', link: '/interview/vue-performance-optimization-checklist' },
        ]
      },
      {
        text: '浏览器 & 网络',
        collapsed: false,
        items: [
          { text: '网络与浏览器综合', link: '/interview/network-browser' },
          { text: '浏览器事件循环', link: '/interview/browser-event-loop-detail' },
          { text: 'HTTP 与 HTTPS', link: '/interview/http-https-difference' },
        ]
      }
     ]
      
     
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
