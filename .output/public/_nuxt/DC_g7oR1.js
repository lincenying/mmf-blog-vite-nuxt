import{_ as Q}from"./DC-Wy9T5.js";import{_ as q}from"./DqvCePol.js";import{b as z,u as J,s as M}from"./Dg45MdiV.js";import{d as K,F as W,u as X,J as V,K as $,L as A,Q as Y,R,r as S,t as Z,i as B,v as g,x as y,y as o,A as d,B as _,S as h,T as O,G as c,W as tt,M as et,N as ot,z as at,X as st,Y as nt,C as it,Z as lt}from"./DPxB2w_0.js";import{u as ct}from"./Dn_8v55Y.js";import{u as rt}from"./JrUFQDTA.js";import{u as D,b as dt,a as T}from"./DEefp4d8.js";import{u as ut}from"./CN5EfcKS.js";import{u as U}from"./B8RxlIE4.js";import"./CcbZIe53.js";import"./B8H6CRKA.js";const mt={class:"settings-main card"},pt={class:"settings-main-content"},_t=o("span",{class:"input-info error"},"请输入标题",-1),ft=o("i",{class:"icon icon-arrow-down"},null,-1),gt=o("option",{value:""},"请选择分类",-1),yt=["value"],ht=o("span",{class:"input-info error"},"请输入分类",-1),bt={class:"settings-section"},vt={id:"modify-content",class:"settings-item-content"},kt={class:"settings-footer"},xt={"mr-10px":"","inline-flex":"","items-center":""},wt=o("span",{"ml-5px":""},"使用前端生成Html?",-1),Nt=K({name:"BackendArticleModify",__name:"modify",async setup(Ct){let u,m;const{ctx:I}=z(),N=W(),F=X(),f=ct("id"),b=rt();[u,m]=V(()=>D("backend-category-list",()=>b.getCategoryItem({path:N.fullPath,id:f.value}))),await u,m();const H=$(b),v=A(H,"lists"),k=ut();[u,m]=V(()=>D("backend-article-modify",()=>k.getArticleItem({id:f.value}))),await u,m();const G=$(k),L=A(G,"item"),t=Y({id:f.value,title:"",category:"",category_name:"",category_old:"",content:"",html:""});R(()=>t.category,s=>{const e=v.value.find(i=>i._id===s);e&&(t.category_name=e.cate_name)}),R(()=>L.value,s=>{s.data&&(t.title=s.data.title,t.category_old=s.data.category,t.category=s.data.category,t.content=s.data.content)},{immediate:!0,deep:!0});const[P,x]=J(!1),p=S(!0),{data:w}=dt("backend-article-list");async function j(){var r,l;if(!t.title||!t.category||!t.content){M("请将表单填写完整!");return}if(P.value)return;if(x(!0),p.value){const n=lt.vMdParser.themeConfig.markdownParser.render(t.content);t.html=n}const{code:s,message:e,data:i}=await T().$post("/api/backend/article/modify",{},{body:t});if(x(!1),s===200){M({type:"success",content:e});const n=((r=w.value)==null?void 0:r.data.list.findIndex(a=>a._id===t.id))||-1;n>-1&&((l=w.value)==null||l.data.list.splice(n,1,i)),F.push("/_backend/article/list")}}async function E(s,e,i){const r=I.$loading.show(),l=new FormData;l.append("file",i[0]);const{data:n}=await T().$post(`${U}/api/fetch/upload`,{},{body:l});n&&n.filepath&&e({url:`${U}/${n.filepath}`,desc:""}),r.hide()}const C=S("编辑文章 - M.M.F 小屋");return Z({title:C,meta:[{name:"description",content:C}]}),(s,e)=>{const i=Q,r=B("v-md-editor"),l=q,n=B("router-link");return g(),y("div",mt,[o("div",pt,[d(i,{title:"标题"},{default:_(()=>[h(o("input",{"onUpdate:modelValue":e[0]||(e[0]=a=>c(t).title=a),type:"text",placeholder:"标题",class:"base-input",name:"title"},null,512),[[O,c(t).title]]),_t]),_:1}),d(i,{title:"分类",classes:"select-item-wrap"},{default:_(()=>[ft,h(o("select",{"onUpdate:modelValue":e[1]||(e[1]=a=>c(t).category=a),class:"select-item",name:"category"},[gt,(g(!0),y(et,null,ot(v.value,a=>(g(),y("option",{key:a._id,value:a._id},at(a.cate_name),9,yt))),128))],512),[[tt,c(t).category]]),ht]),_:1}),o("div",bt,[o("div",vt,[d(l,null,{default:_(()=>[d(r,{modelValue:c(t).content,"onUpdate:modelValue":e[2]||(e[2]=a=>c(t).content=a),"disabled-menus":[],mode:"edit",height:"500px","left-toolbar":"undo redo clear | h bold italic strikethrough link | ul ol table hr | image quote code tip | save",onUploadImage:E},null,8,["modelValue"])]),_:1})])])]),o("div",kt,[o("label",xt,[h(o("input",{"onUpdate:modelValue":e[3]||(e[3]=a=>nt(p)?p.value=a:null),type:"checkbox",value:"1"},null,512),[[st,c(p)]]),wt]),o("a",{href:"javascript:;",class:"btn btn-yellow",onClick:j},"编辑文章"),d(n,{to:"/_backend/article/list",class:"btn btn-blue"},{default:_(()=>[it("返回")]),_:1})])])}}});export{Nt as default};