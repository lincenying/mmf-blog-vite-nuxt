import{d as A,V as k,L,i as N,v as _,x as u,y as i,M as S,N as w,z as r,A as $,B,C as h,U as C,Q as T}from"./DPxB2w_0.js";import{a as g}from"./DEefp4d8.js";const V={class:"card card-trending"},I=i("h2",{class:"card-title"},"热门文章",-1),P={class:"card-content"},b={class:"trending-rank-num"},j={class:"trending-meta"},E={class:"trending-meta-item"},F=i("i",{class:"icon icon-action-voteup"},null,-1),R={class:"trending-meta-item"},z=i("i",{class:"icon icon-action-comment"},null,-1),Q=A({name:"AsideTrending",__name:"aside-trending",props:{trending:null},setup(t){const l=k(t),p=L(l,"trending");return(f,a)=>{const s=N("router-link");return _(),u("div",V,[I,i("div",P,[(_(!0),u(S,null,w(p.value,(e,o)=>(_(),u("div",{key:e._id,class:"trending-item"},[i("span",b,r(o+1),1),$(s,{to:`/article/${e._id}`,class:"trending-title"},{default:B(()=>[h(r(e.title),1)]),_:2},1032,["to"]),i("div",j,[i("div",E,[F,h(r(e.like),1)]),i("div",R,[z,h(r(e.comment_count),1)])])]))),128))])])}}});function d(){return{data:[],path:"",hasNext:0,hasPrev:0,page:1}}const D=["lists","visit","category","search"],H=C("frontendArticleStore",()=>{const t=T({lists:d(),visit:d(),category:d(),search:d(),item:{data:null,path:""},trending:[]}),m=async(a,s="lists")=>{if(t.lists.data.length>0&&a.path===t.lists.path&&a.page===1)return;const{code:e,data:o}=await g().$get("/api/frontend/article/list",{...a,path:void 0,cache:!0});if(e===200&&o){const{list:c=[],path:n,hasNext:y=0,hasPrev:x=0,page:v}={...o,path:a.path,page:a.page};t[s]={data:v===1?c:t.lists.data.concat(c),hasNext:y,hasPrev:x,page:(v||1)+1,path:n}}},l=async a=>{const{code:s,data:e}=await g().$get("/api/frontend/article/item",{...a,path:void 0,markdown:1,cache:!0});s===200&&e&&(t.item={data:e,...a,isLoad:!0})},p=async()=>{if(t.trending.length)return;const{code:a,data:s}=await g().$get("/api/frontend/trending",{cache:!0});a===200&&s&&(t.trending=s.list)},f=a=>{const{id:s,status:e}=a;t.item.data&&t.item.data._id===s&&(e?t.item.data.like++:t.item.data.like--,t.item.data.like_status=e),D.forEach(o=>{const c=t[o].data.findIndex(n=>n._id===s);if(c>-1){const n=Object.assign({},t.lists.data[c]);e?n.like++:n.like--,n.like_status=e,t[o].data.splice(c,1,n)}})};return{...k(t),getArticleList:m,getArticleItem:l,getTrending:p,modifyLikeStatus:f}}),U=H;export{Q as _,U as u};
