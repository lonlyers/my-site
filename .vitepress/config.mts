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
       
        items: [
          { text: '浏览器事件循环', link: '/interview/browser-event-loop-detail' },
          { text: 'vue项目性能优化建议', link: '/interview/vue-performance-optimization-checklist.md' },
        ]
      },
     ]
      
     
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
