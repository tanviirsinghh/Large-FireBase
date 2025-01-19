import{j as e,u as i,B as l,a,L as c}from"./index-wms118WM.js";import{c as d}from"./utils-QGIUj4o4.js";function u({className:t,children:s,pulseColor:r="#4a45f0",duration:n="1.5s",...o}){return e.jsxs("button",{className:d("relative flex cursor-pointer items-center justify-center rounded-lg bg-indigo-500 px-6 py-2 text-center text-white dark:bg-indigo-500 dark:text-black",t),style:{"--pulse-color":r,"--duration":n},...o,children:[e.jsx("div",{className:"relative z-10",children:s}),e.jsx("div",{className:"absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-lg bg-inherit"})]})}function x(){const t=i();function s(){localStorage.getItem("token")||l.warn("Login First",{position:"top-right"}),t("/publish")}return e.jsx(u,{onClick:s,children:"Write"})}function m(){const t=i(),r=a().pathname!=="/publish";function n(){localStorage.getItem("token")||l.warn("Sign In First",{position:"top-right"}),t("/userprofile")}return e.jsx("nav",{className:"fixed top-0 w-full left-0 right-0  backdrop-blur-lg border-b border-gray-700/50 z-50",children:e.jsx("div",{className:"max-w-7xl  px-4 sm:px-6 lg:px-8  flex items-center justify-center",children:e.jsxs("div",{className:"flex justify-between w-[39rem] items-center h-16 ",children:[e.jsx("div",{className:"flex items-center ",children:e.jsx("div",{className:"ml-4 text-3xl font-mono font-bold text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text",children:e.jsx(c,{to:"/blogs",children:" Large"})})}),e.jsxs("div",{className:"flex items-center justify-between space-x-9 w-44  ",children:[r&&e.jsx(x,{}),e.jsxs("button",{onClick:n,className:"ml-3 p-1 rounded-full text-gray-300 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",children:[e.jsxs("div",{className:"relative w-10 h-10 bg-sky-100 border-2 border-solid border-sky-600 flex justify-center items-center rounded-full",children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",children:[e.jsx("path",{d:"M15.9998 7C15.9998 9.20914 14.2089 11 11.9998 11C9.79067 11 7.99981 9.20914 7.99981 7C7.99981 4.79086 9.79067 3 11.9998 3C14.2089 3 15.9998 4.79086 15.9998 7Z",stroke:"#0284C7",strokeWidth:"1.6"}),e.jsx("path",{d:"M11.9998 14C9.15153 14 6.65091 15.3024 5.23341 17.2638C4.48341 18.3016 4.10841 18.8204 4.6654 19.9102C5.2224 21 6.1482 21 7.99981 21H15.9998C17.8514 21 18.7772 21 19.3342 19.9102C19.8912 18.8204 19.5162 18.3016 18.7662 17.2638C17.3487 15.3024 14.8481 14 11.9998 14Z",stroke:"#0284C7",strokeWidth:"1.6"})]}),e.jsx("span",{className:"bottom-0 left-7 absolute  w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"})]})," "]})]})]})})})}export{m as N};
