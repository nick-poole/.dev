import { chromium } from 'playwright-core';
import http from 'http'; import fs from 'fs'; import path from 'path';
const ROOT=path.resolve('public');
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.ico':'image/x-icon'};
const server=http.createServer((rq,rs)=>{let p=decodeURIComponent(rq.url.split('?')[0]);if(p.endsWith('/'))p+='index.html';fs.readFile(path.join(ROOT,p),(e,d)=>{if(e){rs.writeHead(404);rs.end();return;}rs.writeHead(200,{'content-type':types[path.extname(p)]||'text/plain'});rs.end(d);});});
await new Promise(r=>server.listen(0,r));const base=`http://localhost:${server.address().port}`;
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
for(const [url,name] of [['/','home'],['/resume/','resume'],['/portfolio/','portfolio'],['/credentials/','cred'],['/expertise/seo/','seo']]){
  for(const w of [320,375]){
    const ctx=await b.newContext({viewport:{width:w,height:900}});const p=await ctx.newPage();
    await p.goto(base+url,{waitUntil:'domcontentloaded'});await p.waitForTimeout(300);
    const ov=await p.evaluate(()=>{let mx=0,el=null;document.querySelectorAll('*').forEach(n=>{const r=n.getBoundingClientRect();if(r.right>mx){mx=r.right;el=n;}});return{sw:document.documentElement.scrollWidth,iw:window.innerWidth,mx:Math.round(mx),tag:el?el.tagName+'.'+(el.className&&el.className.baseVal!==undefined?el.className.baseVal:el.className):''};});
    console.log(name,'w='+w, ov.sw>ov.iw+1?('OVERFLOW sw='+ov.sw+' widest='+ov.tag):'ok');
    await ctx.close();
  }
}
await b.close();server.close();
