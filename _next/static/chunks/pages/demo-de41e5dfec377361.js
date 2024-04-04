(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[656],{44472:function(e,s,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/demo",function(){return t(28836)}])},28836:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return S}});var l=t(85893),n=t(48863),i=t(11151);t(25675);var a=t(67294),r=t(9544),c=t(30036),o=t(35441),d=t(19570),m=t(11710),u=t(35996),x=t(35079),h=t(17106),f=t(46134);let g={[u.uZ.icns]:"ICNS",[u.uZ.ibcDomains]:"IBC Domains",[u.uZ.stargazeNames]:"Stargaze Names",[u.uZ.archIds]:"Arch ID",[u.uZ.spaceIds]:"Space ID",[u.uZ.sns]:"SNS",[u.uZ.nibId]:"Nib ID"},j=Object.entries(g),p=e=>{let{value:s,setValue:t,label:n,options:i}=e;return(0,l.jsx)(x.R,{value:s,onChange:e=>{t(e)},children:(0,l.jsxs)("div",{className:"relative mt-1",children:[(0,l.jsxs)(x.R.Button,{className:"relative w-full cursor-default rounded-lg bg-gray-700 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm",children:[(0,l.jsx)("span",{className:"block truncate",children:n}),(0,l.jsx)("span",{className:"pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2",children:(0,l.jsx)(r.Z,{className:"h-5 w-5 text-gray-300","aria-hidden":"true"})})]}),(0,l.jsx)(h.u,{as:a.Fragment,leave:"transition ease-in duration-100",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,l.jsx)(x.R.Options,{className:"absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",children:i.map(e=>{let[s,t]=e;return(0,l.jsx)(x.R.Option,{className:e=>{let{active:s}=e;return"relative cursor-default select-none py-2 pl-10 pr-4 ".concat(s?"bg-indigo-400 text-white":"text-gray-300")},value:s,children:e=>{let{selected:s}=e;return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("span",{className:"block truncate ".concat(s?"font-medium":"font-normal"),children:t}),s?(0,l.jsx)("span",{className:"absolute inset-y-0 left-0 flex items-center pl-3 text-white",children:(0,l.jsx)(c.Z,{className:"h-5 w-5","aria-hidden":"true"})}):null]})}},s)})})})]})})},b=e=>{let{results:s}=e;return(0,l.jsx)("div",{className:"flex flex-col space-y-4",children:Object.entries(s).map(e=>{let[s,t]=e;return(0,l.jsxs)("div",{children:[(0,l.jsx)("p",{className:"font-bold mb-1",children:g[s]}),t?(0,l.jsx)("p",{className:"font-thin text-gray-300",children:t}):(0,l.jsx)("p",{className:"text-red-400",children:"Not found"})]},s)})})},N=e=>{let{text:s}=e,[t,n]=(0,a.useState)(!1);return(0,l.jsx)("button",{type:"button",className:"outline-none focus:ring-1 cursor-pointer",onClick:()=>{n(!0),navigator.clipboard.writeText(s),setTimeout(()=>{n(!1)},1e3)},disabled:t,children:t?(0,l.jsx)(c.Z,{weight:"bold",size:18}):(0,l.jsx)(o.Z,{size:18,weight:"bold"})})},v=e=>{let{testnet:s}=e,[t,n]=(0,a.useState)("idle"),[i,r]=(0,a.useState)(null),[c,o]=(0,a.useState)(null),[x,h]=(0,a.useState)(u.uZ.ibcDomains),[v,w]=(0,a.useState)("single");(0,a.useEffect)(()=>{u.i_.setNetwork(s?"testnet":"mainnet"),r(null)},[s]);let y=(0,a.useCallback)(e=>{e.preventDefault();let s=new FormData(e.currentTarget),t=s.get("name").toString().trim();if(t){if(!t.includes(".")){n("error"),o("Name must include a dot followed by a chain prefix");return}}else{n("error"),o("Name is required");return}n("loading"),"single"===v?u.i_.resolve(t,x,{allowedTopLevelDomains:u.L}).then(e=>{n("success"),o(null),r(e)}).catch(e=>{n("error"),o(e.type)}):u.i_.resolveAll(t,{allowedTopLevelDomains:u.L}).then(e=>{n("success"),o(null),r(e)}).catch(e=>{n("error"),o(e.type)})},[x,v]);return(0,a.useEffect)(()=>{o(null),r(null),n("idle")},[v]),(0,l.jsxs)("section",{className:"w-full md:w-4/5 lg:w-1/3 max-w-[20rem] mt-4 sm:mt-16 mx-auto",children:[(0,l.jsxs)("div",{className:"mt-8",children:[(0,l.jsx)("h1",{className:"font-bold text-2xl",children:"Name Resolution"}),(0,l.jsxs)("div",{className:"flex items-center justify-between mt-8",children:[(0,l.jsx)("p",{className:"text-sm",children:"Show Results from All Services"}),(0,l.jsx)(f.r,{checked:"multi"===v,onChange:e=>{w(e?"multi":"single")},className:"".concat("multi"===v?"bg-indigo-500":"bg-gray-700"," relative inline-flex h-6 w-11 items-center rounded-full"),children:(0,l.jsx)("span",{className:"".concat("multi"===v?"translate-x-6":"translate-x-1"," inline-block h-4 w-4 transform rounded-full bg-white transition")})})]})]}),(0,l.jsxs)("form",{onSubmit:y,className:"mt-4",children:["single"===v?(0,l.jsxs)("div",{children:[(0,l.jsx)("label",{htmlFor:"name-service",className:"block text-sm font-medium text-slate-200 mb-2",children:"Name Service"}),(0,l.jsx)(p,{label:g[x],value:x,setValue:h,options:j})]}):null,(0,l.jsxs)("div",{className:"flex items-end justify-center mt-4",children:[(0,l.jsxs)("div",{className:"flex-grow",children:[(0,l.jsx)("label",{htmlFor:"name",className:"block text-sm font-medium text-slate-200 mb-2",children:"Name"}),(0,l.jsx)("input",{id:"name",type:"text",name:"name",autoComplete:"off",placeholder:"Enter name to resolve",className:"px-3 py-2 border shadow-sm caret-white bg-[#111111] text-white border-slate-400 placeholder-slate-400 outline-none block w-full rounded-md sm:text-sm focus:ring-1"})]}),(0,l.jsx)("button",{type:"submit",className:"bg-indigo-500 p-2 border border-indigo-500 rounded ml-2 outline-none focus:ring-1",children:(0,l.jsx)(d.Z,{weight:"bold",size:20})})]}),"idle"===t?(0,l.jsx)("p",{className:"text-sm text-gray-300 mt-2",children:"For example - leapwallet.osmo"}):null]}),"idle"===t?null:(0,l.jsxs)("div",{className:"w-full min-h-[5rem] mt-8",children:["loading"===t?(0,l.jsx)("div",{className:"flex items-center justify-center",children:(0,l.jsx)(m.Z,{className:"animate-spin",size:24,weight:"bold"})}):null,"success"===t&&null!==i?(0,l.jsxs)("div",{className:"text-sm text-slate-200",children:[(0,l.jsxs)("div",{className:"flex items-center justify-between",children:[(0,l.jsx)("p",{children:"Result"}),"single"===v?(0,l.jsx)(N,{text:i}):null]}),(0,l.jsx)("div",{className:"mt-2 p-2 bg-slate-800 rounded-lg font-mono text-sm",children:"single"===v&&"string"==typeof i?(0,l.jsx)("p",{children:i}):(0,l.jsx)(b,{results:i})})]}):null,"error"===t?(0,l.jsxs)("p",{className:"text-red-400 text-sm -mt-4",children:[(0,l.jsx)("strong",{children:"Error:"})," ",(0,l.jsx)("code",{className:"text-xs",children:c})]}):null]})]})},w=e=>{let{testnet:s}=e,[t,n]=(0,a.useState)("idle"),[i,r]=(0,a.useState)(null),[c,o]=(0,a.useState)(null),[x,h]=(0,a.useState)(u.uZ.ibcDomains),[v,w]=(0,a.useState)("single");(0,a.useEffect)(()=>{u.i_.setNetwork(s?"testnet":"mainnet"),r(null)},[s]);let y=(0,a.useCallback)(e=>{e.preventDefault();let s=new FormData(e.currentTarget),t=s.get("address").toString().trim();if(!t){n("error"),o("Address is required");return}n("loading"),"single"===v?u.i_.lookup(t,x).then(e=>{n("success"),o(null),r(e)}).catch(e=>{n("error"),o(e.type)}):u.i_.lookupAll(t).then(e=>{n("success"),o(null),r(e)}).catch(e=>{n("error"),o(e.type)})},[x,v]);return(0,a.useEffect)(()=>{o(null),r(null),n("idle")},[v]),(0,l.jsxs)("section",{className:"w-full md:w-4/5 lg:w-1/3 max-w-[20rem] mt-4 sm:mt-16 mx-auto",children:[(0,l.jsxs)("div",{className:"mt-8",children:[(0,l.jsx)("h1",{className:"font-bold text-2xl",children:"Name Lookup"}),(0,l.jsxs)("div",{className:"flex items-center justify-between mt-8",children:[(0,l.jsx)("p",{className:"text-sm",children:"Show Results from All Services"}),(0,l.jsx)(f.r,{checked:"multi"===v,onChange:e=>{w(e?"multi":"single")},className:"".concat("multi"===v?"bg-indigo-500":"bg-gray-700"," relative inline-flex h-6 w-11 items-center rounded-full"),children:(0,l.jsx)("span",{className:"".concat("multi"===v?"translate-x-6":"translate-x-1"," inline-block h-4 w-4 transform rounded-full bg-white transition")})})]})]}),(0,l.jsxs)("form",{onSubmit:y,className:"mt-4",children:["single"===v?(0,l.jsxs)("div",{children:[(0,l.jsx)("label",{htmlFor:"name-service",className:"block text-sm font-medium text-slate-200 mb-2",children:"Name Service"}),(0,l.jsx)(p,{label:g[x],value:x,setValue:h,options:j})]}):null,(0,l.jsxs)("div",{className:"flex items-end justify-center mt-4",children:[(0,l.jsxs)("div",{className:"flex-grow",children:[(0,l.jsx)("label",{htmlFor:"address",className:"block text-sm font-medium text-slate-200 mb-2",children:"Address"}),(0,l.jsx)("input",{id:"address",type:"text",name:"address",autoComplete:"off",placeholder:"Enter address here",className:"px-3 py-2 border shadow-sm caret-white bg-[#111111] text-white border-slate-400 placeholder-slate-400 outline-none block w-full rounded-md sm:text-sm focus:ring-1"})]}),(0,l.jsx)("button",{type:"submit",className:"bg-indigo-500 p-2 border border-indigo-500 rounded ml-2 outline-none focus:ring-1",children:(0,l.jsx)(d.Z,{weight:"bold",size:20})})]}),"idle"===t?(0,l.jsx)("p",{className:"text-sm text-gray-300 mt-2",children:"For example - osmo19v...zu45k9"}):null]}),"idle"===t?null:(0,l.jsxs)("div",{className:"w-full min-h-[5rem] mt-8",children:["loading"===t?(0,l.jsx)("div",{className:"flex items-center justify-center",children:(0,l.jsx)(m.Z,{className:"animate-spin",size:24,weight:"bold"})}):null,"success"===t&&null!==i?(0,l.jsxs)("div",{className:"text-sm text-slate-200",children:[(0,l.jsxs)("div",{className:"flex items-center justify-between",children:[(0,l.jsx)("p",{children:"Result"}),"single"===v?(0,l.jsx)(N,{text:i}):null]}),(0,l.jsx)("div",{className:"mt-2 p-2 bg-slate-800 rounded-lg font-mono text-sm",children:"single"===v&&"string"==typeof i?(0,l.jsx)("p",{children:i}):(0,l.jsx)(b,{results:i})})]}):null,"error"===t?(0,l.jsxs)("p",{className:"text-red-400 text-sm -mt-4",children:[(0,l.jsx)("strong",{children:"Error:"})," ",(0,l.jsx)("code",{className:"text-xs",children:c})]}):null]})]})},y=()=>{let[e,s]=(0,a.useState)(!1);return(0,l.jsxs)("main",{className:"w-full h-[80%] py-8 dot-grid-bg",children:[(0,l.jsxs)("div",{className:"flex justify-end items-center mx-8",children:[(0,l.jsx)("p",{className:"text-md font-bold px-4",children:"Testnet"}),(0,l.jsx)(f.r,{checked:e,onChange:e=>{s(e)},className:"".concat(e?"bg-indigo-500":"bg-gray-700"," relative inline-flex h-6 w-11 items-center rounded-full"),children:(0,l.jsx)("span",{className:"".concat(e?"translate-x-6":"translate-x-1"," inline-block h-4 w-4 transform rounded-full bg-white transition")})})]}),(0,l.jsxs)("div",{className:"flex flex-col sm:flex-row justify-start sm:justify-center gap-4",children:[(0,l.jsx)(v,{testnet:e}),(0,l.jsx)(w,{testnet:e})]})]})};function k(e){return(0,l.jsx)(y,{})}var S=(0,n.j)({MDXContent:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{wrapper:s}=Object.assign({},(0,i.ah)(),e.components);return s?(0,l.jsx)(s,{...e,children:(0,l.jsx)(k,{...e})}):k(e)},pageOpts:{filePath:"pages/demo.mdx",route:"/demo",frontMatter:{title:"Demo",description:"A developer-friendly javascript library that provides a standardized way to easily resolve Cosmos ecosystem name services to wallet addresses (and vice-versa) using just one line of code."},headings:[],timestamp:1678825158e3,title:"Demo"},pageNextRoute:"/demo"})},46091:function(){},13995:function(){},68044:function(){},84095:function(){},83284:function(){}},function(e){e.O(0,[714,464,944,804,863,746,774,888,179],function(){return e(e.s=44472)}),_N_E=e.O()}]);