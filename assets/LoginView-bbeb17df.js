import{_ as l,o as c,c as u,a as e,j as m,h as a,i as d}from"./index-ca20bf0e.js";const{VITE_APP_URL:p}={VITE_APP_URL:"https://vue3-course-api.hexschool.io",VITE_APP_PATH:"vuejslive2022",BASE_URL:"/2022-Vue-week06/",MODE:"production",DEV:!1,PROD:!0},_={data(){return{user:{username:"",password:""}}},methods:{login(){this.$http.post(`${p}/v2/admin/signin`,this.user).then(o=>{const{token:s,expired:n}=o.data;document.cookie=`loginToken=${s}; expires=${new Date(n)}, 31 Dec 9999 23:59:59 GMT;`,this.$router.push("/admin/products")}).catch(o=>{alert(o.response.data.message)})}}},h={class:"container"},f={class:"row justify-content-center mt-4"},w=e("h1",{class:"h3 mb-3 font-weight-normal text-center"}," 請先登入 ",-1),g={class:"col-8"},v={class:"form-floating mb-3"},b=e("label",{for:"username"},"Email address",-1),x={class:"form-floating"},P=e("label",{for:"password"},"Password",-1),V=e("button",{class:"btn btn-lg btn-primary w-100 mt-3",type:"submit"}," 登入 ",-1),E=e("p",{class:"mt-5 mb-3 text-muted text-center"}," © 2021~∞ - 六角學院 ",-1);function T(o,s,n,k,r,i){return c(),u("div",h,[e("div",f,[w,e("div",g,[e("form",{id:"form",class:"form-signin",onSubmit:s[2]||(s[2]=m((...t)=>i.login&&i.login(...t),["prevent"]))},[e("div",v,[a(e("input",{type:"email",class:"form-control",id:"username",placeholder:"name@example.com",required:"",autofocus:"","onUpdate:modelValue":s[0]||(s[0]=t=>r.user.username=t)},null,512),[[d,r.user.username]]),b]),e("div",x,[a(e("input",{type:"password",class:"form-control",id:"password",placeholder:"Password",required:"","onUpdate:modelValue":s[1]||(s[1]=t=>r.user.password=t)},null,512),[[d,r.user.password]]),P]),V],32)])]),E])}const y=l(_,[["render",T]]);export{y as default};