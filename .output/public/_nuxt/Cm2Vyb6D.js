import{u as c,_ as d}from"./BVUqdimP.js";import{u as o}from"./DEefp4d8.js";import{d as r,J as v,K as m,L as u,r as f,t as p,v as _,x,y as g,A as b,P as h}from"./DPxB2w_0.js";import"./B8H6CRKA.js";const S={class:"main wrap"},y=h('<div class="main-left"><div class="card card-answer card-about"><div class="answer-content"><div class="article-content"><h3 class="about-title">关于作者</h3><div class="flex-item"><div class="flex-label">姓名:</div><div class="flex-content">林岑影</div></div><div class="flex-item"><div class="flex-label">年龄:</div><div class="flex-content">1987.09</div></div><div class="flex-item"><div class="flex-label">职业:</div><div class="flex-content">前端开发</div></div><div class="flex-item"><div class="flex-label">Github:</div><div class="flex-content"><a href="https://github.com/lincenying" target="_blank">@lincenying</a></div></div><div class="flex-item"><div class="flex-label">技能:</div><div class="flex-content"><ul class="about-ul"><li>HTML5 + CSS3</li><li>NodeJS</li><li>React</li><li>Vue</li><li>ES6</li><li>Gulp</li><li>WebPack</li><li>jQuery</li><li>PHP</li></ul></div></div><h3 class="about-title">关于网站</h3><p> 源代码: <a href="https://github.com/lincenying/mmf-blog-vite-vue3-ssr" target="_blank">mmf-blog-vite-vue3-ssr</a> 欢迎收藏加星 </p><p>本站服务端采用 express + mongoDB 搭建, 客户端采用 Vue3 渲染搭建</p><p>网站分成前台和后台, 前台采用 SSR 模式渲染, 后台采用 SPA 模式</p><p>主要功能包括: 管理员, 用户, 分类, 文章, 评论, 文章点赞</p><p>主要技术栈: pwa, vite4, unocss, eslint, express, mongoose, vue3, vue-router4, pinia</p></div></div></div></div>',1),A={class:"main-right"},T=r({name:"FrontendAbout",__name:"about",async setup(w){let e,t;const i=c();[e,t]=v(()=>o("frontend-article-trending",()=>i.getTrending())),await e,t();const l=m(i),a=u(l,"trending"),s=f("关于 - M.M.F 小屋");return p({title:s,meta:[{name:"description",content:s}]}),(k,P)=>{const n=d;return _(),x("div",S,[y,g("div",A,[b(n,{trending:a.value},null,8,["trending"])])])}}});export{T as default};