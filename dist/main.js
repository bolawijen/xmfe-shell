var i="",n={getBaseUrl:()=>i,init(t){t.on("routes",(e)=>{this.register(e)})},register(t){}};var s={on(t,e){window.addEventListener(`mfe:${t}`,(o)=>{if(o.detail)e?.(o.detail)})},emit(t,e){window.dispatchEvent(new CustomEvent(`xmfe:${t}`,{detail:e}))}};function r(t){n.init(s);let e=()=>document.getElementById("root");return t().bootstrap(e)}function u(){let t=n.getBaseUrl(),e=window.location.pathname;return t&&t!=="/"?e.slice(t.length):e}var d=r;export{s as xmfe,u as getRoute,d as default,r as createShell};

//# debugId=2AF80E2398CDD01664756E2164756E21
