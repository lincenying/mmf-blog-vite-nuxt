import{_ as f}from"./DC-Wy9T5.js";import{d as h,u as w,Q as b,o as k,r as g,t as v,v as x,x as y,y as e,A as c,B as p,S as u,T as m,G as a}from"./DPxB2w_0.js";import{d as B}from"./Dbq26dxh.js";import{c as M,s as C}from"./Dg45MdiV.js";import{a as L}from"./DEefp4d8.js";import{u as U}from"./B9DE6HdW.js";import"./CcbZIe53.js";import"./B8H6CRKA.js";const V={class:"settings-main card"},T={class:"settings-main-content"},$=e("span",{class:"input-info error"},"请输入昵称",-1),E=e("span",{class:"input-info error"},"请输入密码",-1),F={class:"settings-footer"},q=h({name:"BackendLogin",__name:"login",setup(H){const r=w(),_=B.useLoading(),t=b({username:"",password:""}),d=M(async()=>{if(!t.username||!t.password)return C("请输入用户名和密码!");const i=_.show(),{code:s,data:n}=await L().$post("/api/backend/admin/login",{},{body:t});i.hide(),s===200&&n&&r.push("/_backend/article/list")});k(()=>{U("b_user").value&&r.push("/_backend/article/list")});const l=g("管理员登录 - M.M.F 小屋");return v({title:l,meta:[{name:"description",content:l}]}),(i,s)=>{const n=f;return x(),y("div",V,[e("div",T,[e("form",null,[c(n,{title:"账号"},{default:p(()=>[u(e("input",{"onUpdate:modelValue":s[0]||(s[0]=o=>a(t).username=o),type:"text",placeholder:"请输入管理员账号",class:"base-input",name:"username"},null,512),[[m,a(t).username]]),$]),_:1}),c(n,{title:"密码"},{default:p(()=>[u(e("input",{"onUpdate:modelValue":s[1]||(s[1]=o=>a(t).password=o),type:"password",placeholder:"请输入管理员密码",class:"base-input",name:"password"},null,512),[[m,a(t).password]]),E]),_:1})])]),e("div",F,[e("a",{href:"javascript:;",class:"btn btn-yellow",onClick:s[2]||(s[2]=(...o)=>a(d)&&a(d)(...o))},"登录")])])}}});export{q as default};
