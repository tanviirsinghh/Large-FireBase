import{y as a}from"./index-DoHB2i9g.js";import{a as t,C as s}from"./axios-DjXiXPf6.js";const u=async r=>{const e=new FormData;e.append("file",r),e.append("upload_preset","Blog-Project"),e.append("cloud_name","dktr9buob"),console.log("start request");try{return(await t.post(`${s}`,e,{headers:{"Content-Type":"multipart/form-data"}})).data.secure_url}catch{a.error("Error Occurred / Please Re-Upload");return}};export{u};
