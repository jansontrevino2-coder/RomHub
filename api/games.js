const OWNER=process.env.GITHUB_OWNER;
const REPO=process.env.GITHUB_REPO;
const BRANCH=process.env.GITHUB_BRANCH||'main';
const TOKEN=process.env.GITHUB_TOKEN;
const headers={Accept:'application/vnd.github+json',...(TOKEN?{Authorization:`Bearer ${TOKEN}`}:{})};
async function contents(path){const r=await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}?ref=${encodeURIComponent(BRANCH)}`,{headers});if(!r.ok)throw new Error(`GitHub API ${r.status}`);return r.json()}
export default async function handler(req,res){try{if(!OWNER||!REPO)return res.status(500).json({error:'Set GITHUB_OWNER and GITHUB_REPO in Vercel.'});const root=await contents('Games');const dirs=root.filter(x=>x.type==='dir');const games=[];for(const dir of dirs){const files=await contents(dir.path);const cover=files.find(x=>x.name.toLowerCase()==='cover.png');const rom=files.find(x=>/^rom\.[a-z0-9]+$/i.test(x.name));if(cover&&rom)games.push({name:dir.name,format:rom.name.split('.').pop(),cover:cover.download_url,rom:rom.download_url});}res.setHeader('Cache-Control','s-maxage=60, stale-while-revalidate=300');res.status(200).json({games});}catch(e){res.status(500).json({error:e.message})}}
