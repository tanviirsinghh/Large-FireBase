import{u as P,r as t,j as e,L as U,B as s}from"./index-wms118WM.js";import{u as A}from"./ImageUploadHook-D3vOJK0L.js";import{a as p,B as I}from"./axios-DjXiXPf6.js";const z=()=>{const l=P(),f=localStorage.getItem("token");t.useEffect(()=>{if(f)l("/blogs");else{l("/signin");return}});const[c,x]=t.useState(""),[u,m]=t.useState(""),[d,h]=t.useState(""),[g,b]=t.useState(""),[y,w]=t.useState(""),[j,v]=t.useState(""),[a,N]=t.useState(null),[i,k]=t.useState(void 0),S=r=>{if(r.target&&r.target.files&&r.target.files[0]){const o=r.target.files[0];i&&URL.revokeObjectURL(i);const n=URL.createObjectURL(o);k(n),N(o),console.log("img stored in the state")}},L=async r=>{if(r.preventDefault(),!c||!u||!d||!g){s.error("All fields are required!");return}try{const o=a?await A(a):"";if(!o&&a){s.error("Image upload failed. Cannot proceed.");return}await C(o||"")}catch(o){console.error("Error in handleSubmit:",o),s.error("An unexpected error occurred. Please try again.")}},C=async r=>{var o;try{const n=await p.post(`${I}/api/v1/user/signup`,{name:c,email:u,password:d,blogName:g,profilePicture:r,bio:y,location:j});s.success("Signup Successfully");const B=n.data.token;localStorage.setItem("token",B),l("/blogs")}catch(n){if(p.isAxiosError(n))switch((o=n.response)==null?void 0:o.status){case 401:s.error("User not found / Sign up first");break;case 411:s.error("Input Not Correct");break;case 500:s.error("Please try again / Internal Server Error");break;case 403:s.error("Email Already in use");break;default:s.error("An unexpected error occurred")}}};return e.jsx("div",{className:"min-h-screen flex items-center justify-center bg-black p-4",children:e.jsxs("div",{className:"bg-black rounded-md shadow-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden",children:[e.jsxs("div",{className:"w-full md:w-1/2 p-8 border-2 border-gray-300 bg-black",children:[e.jsx("h2",{className:"text-4xl font-bold mb-6 text-gray-300 text-center",children:"Unleash Your Creativity!"}),e.jsx("div",{className:"",children:e.jsx("img",{src:"src/imgs/modern-blogger-concept-with-flat-design_23-2147996703.jpg",alt:"Blog ",className:"rounded-lg shadow-lg mb-6"})}),e.jsx("p",{className:"text-gray-300 text-lg mb-6 text-center",children:"Join our vibrant community of bloggers and share your unique voice with the world!"}),e.jsxs("div",{className:"flex justify-center space-x-4",children:[e.jsx("span",{className:"bg-gray-300 rounded-full p-2",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6 text-yellow-50",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:[e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"}),e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"})]})}),e.jsx("span",{className:"bg-gray-300 rounded-full p-2",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6 text-yellow-50",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"})})}),e.jsx("span",{className:"bg-gray-300 rounded-full p-2",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6 text-yellow-50",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13 10V3L4 14h7v7l9-11h-7z"})})})]})]}),e.jsxs("div",{className:"w-full md:w-1/2 p-8 border-2 bg-black  border-gray-400",children:[e.jsx("h3",{className:"text-3xl font-bold mb-6 text-gray-300 text-center",children:"Sign Up Now!"}),e.jsxs("form",{onSubmit:L,className:"space-y-4",children:[e.jsxs("div",{className:"flex flex-col items-center mb-4",children:[e.jsx("div",{className:"w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-2 border-4 border-gray-300",children:a?e.jsx("img",{src:i,alt:"Profile",className:"w-full h-full object-cover"}):e.jsx("div",{className:"w-full h-full flex items-center justify-center text-gray-300",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-16 w-16",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"})})})}),e.jsxs("label",{className:"cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-full  transition-colors",children:["Choose Profile Picture",e.jsx("input",{type:"file",className:"hidden",onChange:S,accept:"image/*"})]})]}),e.jsx("input",{type:"text",name:"name",placeholder:"Your Awesome Name",onChange:r=>{x(r.target.value)},className:"w-full px-4 py-2 rounded-full border text-gray-300 bg-black focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50",required:!0}),e.jsx("input",{type:"email",name:"email",placeholder:"your@email.com",onChange:r=>{m(r.target.value)},className:"w-full px-4 py-2 rounded-full border text-gray-300 bg-black focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50",required:!0}),e.jsx("input",{type:"password",name:"password",placeholder:"Super Secret Password",onChange:r=>{h(r.target.value)},className:"w-full px-4 py-2 rounded-full border text-gray-300 bg-black focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50",required:!0}),e.jsx("input",{type:"text",name:"Bio",placeholder:"Bio",onChange:r=>{w(r.target.value)},className:"w-full px-4 py-2 rounded-full border text-gray-300 bg-black focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50",required:!0}),e.jsx("input",{type:"text",name:"Location",placeholder:"Location",onChange:r=>{v(r.target.value)},className:"w-full px-4 py-2 rounded-full border text-gray-300 bg-black focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50",required:!0}),e.jsxs("select",{name:"blogCategory",onChange:r=>{b(r.target.value)},className:"w-full px-4 py-2 rounded-full border text-gray-300 bg-black focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50",required:!0,children:[e.jsx("option",{value:"",children:"Select Your Blog's Superpower"}),e.jsx("option",{value:"technology",children:"Tech Wizardry"}),e.jsx("option",{value:"lifestyle",children:"Life's Adventures"}),e.jsx("option",{value:"travel",children:"Wanderlust Chronicles"}),e.jsx("option",{value:"food",children:"Culinary Quests"}),e.jsx("option",{value:"fashion",children:"Style Spectrum"}),e.jsx("option",{value:"other",children:"Unique Perspectives"})]}),e.jsx("button",{type:"submit",className:"w-full bg-indigo-500 text-yellow-50 font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 hover:text-white transition-all duration-300 transform hover:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50",children:"Launch My Blogging Journey! 🚀"})]}),e.jsx("p",{className:"mt-6 text-sm text-gray-600 text-center",children:"By signing up, you're joining an epic community of creators!"}),e.jsx(U,{to:"/signin",children:e.jsxs("p",{className:"mt-6 text-sm text-gray-300 text-center",children:["Already have an Account"," ",e.jsxs("h5",{className:"font-semibold underline hover:text-yellow-600",children:[" ","Sign In here"]})]})})]})]})})};export{z as default};
