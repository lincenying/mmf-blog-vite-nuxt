import{_ as f}from"./DJ0I6kDE.js";import{d as _,F as d,K as g,L as v,J as y,v as A,H as x,G as L}from"./DPxB2w_0.js";import{u as b}from"./BVUqdimP.js";import{u as h}from"./DEefp4d8.js";import{a as R}from"./Dn_8v55Y.js";import{u as w}from"./CiqCsSE6.js";import{u as C}from"./Dg45MdiV.js";import"./BECqvDc1.js";import"./Kw-0CWFx.js";import"./JrUFQDTA.js";import"./B8H6CRKA.js";import"./CcbZIe53.js";const P=_({name:"FrontendIndexVisit",__name:"[by]",async setup(F){let s,i;const m=d(),o=b(),u=g(o),n=v(u,"visit");function r(t=1){const p=m.path,e=R("by");return{page:t,limit:10,path:p,by:e.value}}[s,i]=y(()=>h("frontend-index-visit",()=>o.getArticleList(r(),"visit"))),await s,i(),w("frontend-index-visit");const[a,c]=C(!1);async function l(t=n.value.page){a.value||(c(!0),await o.getArticleList(r(t)),c(!1))}return(t,p)=>{const e=f;return A(),x(e,{topics:n.value,loading:L(a),"page-type":"visit",onLoadMore:l},null,8,["topics","loading"])}}});export{P as default};