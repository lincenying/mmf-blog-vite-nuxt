import{a as h}from"./DEefp4d8.js";import{U as f,Q as u,V as x}from"./DPxB2w_0.js";const C=f("globalCommentStore",()=>{const t=u({lists:{data:[],hasNext:0,hasPrev:0,page:1,path:""}}),n=async s=>{if(s.path===t.lists.path&&s.page===1)return;const{code:e,data:a}=await h().$get("/api/frontend/comment/list",{...s,path:void 0,cache:!0});if(e===200&&a){const{list:i=[],path:r="",hasNext:m=0,hasPrev:p=0,page:o=1}={...s,...a};t.lists={data:o===1?i:t.lists.data.concat(i),hasNext:m,hasPrev:p,page:o,path:r}}},d=s=>{t.lists.data=[s].concat(t.lists.data)},l=s=>{const e=t.lists.data.findIndex(a=>a._id===s);e>-1&&t.lists.data.splice(e,1,{...t.lists.data[e],is_delete:1})},c=s=>{const e=t.lists.data.findIndex(a=>a._id===s);e>-1&&t.lists.data.splice(e,1,{...t.lists.data[e],is_delete:0})};return{...x(t),getCommentList:n,insertCommentItem:d,deleteComment:l,recoverComment:c}}),_=C;export{_ as u};
