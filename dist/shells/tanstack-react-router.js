import{createRoot as i}from"react-dom/client";import{createElement as c,StrictMode as s}from"react";function l(e,t=""){let r=[];function a(n,p){let o=n.path==="/"?p:`${p}/${n.path}`.replace(/\/+/g,"/");if(n.children)n.children.forEach((u)=>a(u,o));else r.push({path:o===""?"/":o,component:n.options?.component||"default"})}return a(e,t),r}function f(e,t){i(t).render(c(s,null,c(e)))}function h(e){return{bootstrap(t){return t&&e.bootstrap((r)=>{f(r,t())})}}}export{l as default,h as createRouterModule};

//# debugId=3974CAC54CBF2F8864756E2164756E21
