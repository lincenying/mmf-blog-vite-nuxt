import{_ as y}from"./DC-Wy9T5.js";import{u as b}from"./Kw-0CWFx.js";import{d as k,V as w,L as x,r as c,o as A,t as M,v as B,x as C,y as s,A as _,B as f,G as i,S,T as V,Y as $,Q as z}from"./DPxB2w_0.js";import{a as v}from"./DEefp4d8.js";import{c as F,s as r}from"./Dg45MdiV.js";import"./B8H6CRKA.js";import"./CcbZIe53.js";const R={class:"cards-wrap home-feeds"},T={class:"card settings-main"},U={class:"settings-main-content"},Z=["value"],G=s("span",{class:"input-info error"},"请输入昵称",-1),H=s("span",{class:"input-info error"},"请输入邮箱",-1),L={class:"settings-footer"},J=k({name:"FrontendUserAccount",__name:"account",setup(N){const u=b(),h=w(u),d=x(h,"cookies");let l=c(""),e=c("");async function g(){const{code:o,data:t}=await v().$get("/api/frontend/user/account");o===200&&(l.value=t.username,e.value=t.email)}A(()=>{g()});const m=F(async()=>{const o=/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_-]+)(\.[a-zA-Z0-9_-]+)$/i;if(e.value){if(!o.test(e.value)){r("邮箱格式错误!");return}}else{r("请填写邮箱地址!");return}const t=z({email:e.value,username:l.value,id:d.value.userid}),{code:n,message:a}=await v().$post("/api/frontend/user/account",{},{body:t});n===200?(u.setCookies({...d.value,useremail:e.value}),r({type:"success",content:a})):r(a)}),p=c("帐号 - M.M.F 小屋");return M({title:p,meta:[{name:"description",content:p}]}),(o,t)=>{const n=y;return B(),C("div",R,[s("div",T,[s("div",U,[s("form",null,[_(n,{title:"昵称"},{default:f(()=>[s("input",{type:"text",value:i(l),placeholder:"昵称",class:"base-input",name:"username",readonly:""},null,8,Z),G]),_:1}),_(n,{title:"邮箱"},{default:f(()=>[S(s("input",{"onUpdate:modelValue":t[0]||(t[0]=a=>$(e)?e.value=a:e=a),type:"text",placeholder:"邮箱",class:"base-input",name:"email"},null,512),[[V,i(e)]]),H]),_:1})])]),s("div",L,[s("a",{href:"javascript:;",class:"btn btn-yellow",onClick:t[1]||(t[1]=(...a)=>i(m)&&i(m)(...a))},"保存设置")])])])}}});export{J as default};
