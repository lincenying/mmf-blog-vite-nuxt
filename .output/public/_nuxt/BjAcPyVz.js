import{a as m}from"./DEefp4d8.js";import{d as i,i as r,v as l,x as _,A as o,B as a,C as e,y as s}from"./DPxB2w_0.js";import"./B8H6CRKA.js";const h={class:"card card-me"},p=s("i",{class:"icon icon-arrow-right"},null,-1),f=s("i",{class:"icon icon-menu-articles"},null,-1),v=s("i",{class:"icon icon-arrow-right"},null,-1),w=s("i",{class:"icon icon-menu-articles"},null,-1),x=s("i",{class:"icon icon-arrow-right"},null,-1),C=s("i",{class:"icon icon-menu-articles"},null,-1),g=i({name:"AsideAccount",__name:"aside-account",setup(d){async function n(){await m().$post("/api/frontend/user/logout"),window.location.href="/"}return(u,c)=>{const t=r("router-link");return l(),_("div",h,[o(t,{to:"/user/account","active-class":"active",class:"side-entry"},{default:a(()=>[p,f,e("帐号 ")]),_:1}),o(t,{to:"/user/password","active-class":"active",class:"side-entry"},{default:a(()=>[v,w,e("密码 ")]),_:1}),s("a",{href:"javascript:;",class:"side-entry",onClick:n},[x,C,e("退出 ")])])}}}),k={class:"main wrap"},y={class:"main-left"},N={class:"main-right"},V=i({name:"FrontendUser",__name:"user",setup(d){return(n,u)=>{const c=r("NuxtChild"),t=g;return l(),_("div",k,[s("div",y,[o(c)]),s("div",N,[o(t)])])}}});export{V as default};
