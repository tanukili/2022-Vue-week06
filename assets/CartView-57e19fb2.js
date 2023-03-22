import{_ as P,r as g,o as c,c as m,a as e,F as v,f as x,g as V,n as u,t as n,b as d,w as k,d as b,h as y,v as E,i as U}from"./index-ca20bf0e.js";const{VITE_APP_URL:i,VITE_APP_PATH:r}={VITE_APP_URL:"https://vue3-course-api.hexschool.io",VITE_APP_PATH:"vuejslive2022",BASE_URL:"/2022-Vue-week06/",MODE:"production",DEV:!1,PROD:!0},q={data(){return{products:[],product:{},cart:{},haveProduct:0,loadingItem:"",form:{user:{name:"",email:"",tel:"",address:""},message:""}}},methods:{getProduct(s){this.loadingItem=s,this.$http.get(`${i}/api/${r}/product/${s}`).then(t=>{this.product=t.data.product,this.$refs.productModal.openModal(),this.loadingItem=""}).catch(t=>{alert(t.data.message)})},getCarts(){this.$http.get(`${i}/api/${r}/cart`).then(s=>{this.cart=s.data.data,this.haveProduct=this.cart.carts.length}).catch(s=>{alert(s.data.message)})},editCartItem(s){const t={product_id:s.product_id,qty:s.qty};this.loadingItem=s.id,this.$http.put(`${i}/api/${r}/cart/${s.id}`,{data:t}).then(h=>{alert(h.data.message),this.getCarts(),this.loadingItem=""}).catch(h=>{alert(h.data.message)})},delCartItem(s){this.loadingItem=s,this.$http.delete(`${i}/api/${r}/cart/${s}`).then(t=>{alert(t.data.message),this.getCarts(),this.loadingItem=""}).catch(t=>{alert(t.data.message)})},delCarts(){this.$http.delete(`${i}/api/${r}/carts`).then(s=>{alert(s.data.message),this.getCarts()}).catch(s=>{alert(s.data.message)})},createOrder(){const s=this.form;this.$http.post(`${i}/api/${r}/order`,{data:s}).then(t=>{alert(t.data.message),this.$refs.form.resetForm(),this.form.message="",this.getCarts()}).catch(t=>{alert(t.data.message)})}},mounted(){this.getCarts()}},$={class:"my-5 row justify-content-center"},w=e("h1",{class:"text-center mb-4"},"前台購物車",-1),T={class:"table align-middle"},A=e("thead",null,[e("tr",null,[e("th"),e("th",null,"品名"),e("th",{style:{width:"150px"}},"數量/單位"),e("th",null,"單價")])],-1),D=["onClick","disabled"],M={key:0,class:"fas fa-spinner fa-pulse"},S=e("div",{class:"text-success"},"已套用優惠券",-1),B={class:"input-group input-group-sm"},I=["onUpdate:modelValue","onChange","disabled"],L=["value"],N={class:"input-group-text",id:"basic-addon2"},O={class:"text-end"},R=e("small",{class:"text-success"},"折扣價：",-1),F=e("td",{colspan:"4",class:"text-center py-5 text-secondary"},"您的購物車未有商品",-1),j=[F],H=e("td",{colspan:"3",class:"text-end"},"總計",-1),z={class:"text-end"},G=e("td",{colspan:"3",class:"text-end text-success"},"折扣價",-1),J={class:"text-end text-success"},K=e("h4",{class:"text-center my-4"},"填寫訂單資料",-1),Q={class:"mb-3"},W=e("label",{for:"email",class:"form-label"},"Email",-1),X={class:"mb-3"},Y=e("label",{for:"name",class:"form-label"},"收件人姓名",-1),Z={class:"mb-3"},ee=e("label",{for:"tel",class:"form-label"},"收件人電話",-1),te={class:"mb-3"},se=e("label",{for:"address",class:"form-label"},"收件人地址",-1),ae={class:"mb-3"},le=e("label",{for:"message",class:"form-label"},"留言",-1),oe=e("div",{class:"text-end"},[e("button",{type:"submit",class:"btn btn-danger"},"送出訂單")],-1);function de(s,t,h,ne,a,f){const _=g("v-field"),p=g("error-message"),C=g("v-form");return c(),m("div",$,[w,e("table",T,[A,e("tbody",null,[a.cart.carts?(c(!0),m(v,{key:0},x(a.cart.carts,o=>(c(),m("tr",{key:o.id},[e("td",null,[e("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:l=>f.delCartItem(o.id),disabled:o.id===a.loadingItem},[o.id===a.loadingItem?(c(),m("i",M)):V("",!0),b(" x ")],8,D)]),e("td",null,[b(n(o.product.title)+" ",1),S]),e("td",null,[e("div",B,[y(e("select",{name:"quantity",id:"",class:"form-select","onUpdate:modelValue":l=>o.qty=l,onChange:l=>f.editCartItem(o),disabled:o.id===a.loadingItem},[(c(),m(v,null,x(10,l=>e("option",{value:l,key:`${l}0123`},n(l),9,L)),64))],40,I),[[E,o.qty]]),e("span",N,n(o.product.unit),1)])]),e("td",O,[R,b(" "+n(o.final_total),1)])]))),128)):V("",!0),e("tr",{class:u({"d-none":a.haveProduct!==0})},j,2)]),e("tfoot",null,[e("tr",null,[H,e("td",z,n(a.cart.total),1)]),e("tr",null,[G,e("td",J,n(a.cart.final_total),1)])])]),K,d(C,{ref:"form",class:"col-md-6",onSubmit:f.createOrder},{default:k(({errors:o})=>[e("div",Q,[W,d(_,{id:"email",name:"email",type:"email",class:u(["form-control",{"is-invalid":o.email}]),placeholder:"請輸入 Email",rules:"required|email",modelValue:a.form.user.email,"onUpdate:modelValue":t[0]||(t[0]=l=>a.form.user.email=l)},null,8,["class","modelValue"]),d(p,{name:"email",class:"invalid-feedback"})]),e("div",X,[Y,d(_,{id:"name",name:"姓名",type:"text",class:u(["form-control",{"is-invalid":o.姓名}]),placeholder:"請輸入姓名",rules:"required",modelValue:a.form.user.name,"onUpdate:modelValue":t[1]||(t[1]=l=>a.form.user.name=l)},null,8,["class","modelValue"]),d(p,{name:"姓名",class:"invalid-feedback"})]),e("div",Z,[ee,d(_,{id:"tel",name:"電話",type:"text",class:u(["form-control",{"is-invalid":o.電話}]),placeholder:"請輸入電話",rules:"required|min:8|max:10",modelValue:a.form.user.tel,"onUpdate:modelValue":t[2]||(t[2]=l=>a.form.user.tel=l)},null,8,["class","modelValue"]),d(p,{name:"電話",class:"invalid-feedback"})]),e("div",te,[se,d(_,{id:"address",name:"地址",type:"text",class:u(["form-control",{"is-invalid":o.地址}]),placeholder:"請輸入地址",rules:"required",modelValue:a.form.user.address,"onUpdate:modelValue":t[3]||(t[3]=l=>a.form.user.address=l)},null,8,["class","modelValue"]),d(p,{name:"地址",class:"invalid-feedback"})]),e("div",ae,[le,y(e("textarea",{id:"message",class:"form-control",cols:"30",rows:"10","onUpdate:modelValue":t[4]||(t[4]=l=>a.form.message=l)},null,512),[[U,a.form.message]])]),oe]),_:1},8,["onSubmit"])])}const re=P(q,[["render",de]]);export{re as default};
