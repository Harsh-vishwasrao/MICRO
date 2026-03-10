import { useState, useEffect, useRef } from "react";

const CATEGORIES = [
  { icon: "✦", label: "Design & Creative", color: "#8b5cf6" },
  { icon: "⌨", label: "Development", color: "#3b82f6" },
  { icon: "✉", label: "Marketing", color: "#f59e0b" },
  { icon: "✍", label: "Writing & Copy", color: "#10b981" },
  { icon: "◈", label: "Data & Analytics", color: "#ef4444" },
  { icon: "◎", label: "Video & Audio", color: "#ec4899" },
];

const ALL_GIGS = [
  { id:1, title:"Full-Stack Web App Development", freelancer:"Harsh Patil", avatar:"HP", rating:4.9, reviews:312, price:150, tags:["React","Node.js","AWS"], badge:"Top Rated", accent:"#16a34a", bg:"#f0fdf4", cat:"Development" },
  { id:2, title:"Brand Identity & Logo Design", freelancer:"Sofia Reyes", avatar:"SR", rating:5.0, reviews:198, price:80, tags:["Figma","Branding","Print"], badge:"Rising Star", accent:"#9333ea", bg:"#fdf4ff", cat:"Design & Creative" },
  { id:3, title:"SEO & Content Strategy", freelancer:"James Park", avatar:"JP", rating:4.8, reviews:421, price:60, tags:["SEO","Copywriting","Analytics"], badge:"Pro", accent:"#ea580c", bg:"#fff7ed", cat:"Marketing" },
  { id:4, title:"Mobile App UI/UX Design", freelancer:"Dev Sidhwani", avatar:"DS", rating:4.9, reviews:275, price:120, tags:["Figma","iOS","Prototyping"], badge:"Top Rated", accent:"#2563eb", bg:"#eff6ff", cat:"Design & Creative" },
  { id:5, title:"Data Science & ML Modeling", freelancer:"Marc Dubois", avatar:"MD", rating:4.7, reviews:89, price:200, tags:["Python","TensorFlow","SQL"], badge:"Expert", accent:"#ca8a04", bg:"#fefce8", cat:"Data & Analytics" },
  { id:6, title:"YouTube Video Editing", freelancer:"Anay Pai", avatar:"AP", rating:5.0, reviews:540, price:45, tags:["Premiere","AfterEffects","Canva"], badge:"Pro", accent:"#db2777", bg:"#fdf2f8", cat:"Video & Audio" },
  { id:7, title:"Technical Writing & API Docs", freelancer:"Omar Hassan", avatar:"OH", rating:4.8, reviews:130, price:55, tags:["Docs","API","Markdown"], badge:"Pro", accent:"#0891b2", bg:"#ecfeff", cat:"Writing & Copy" },
  { id:8, title:"WordPress & Shopify Dev", freelancer:"Nina Volkov", avatar:"NV", rating:4.9, reviews:310, price:90, tags:["WordPress","Shopify","PHP"], badge:"Top Rated", accent:"#16a34a", bg:"#f0fdf4", cat:"Development" },
  { id:9, title:"Social Media Management", freelancer:"Carlos Mendez", avatar:"CM", rating:4.6, reviews:88, price:40, tags:["Instagram","TikTok","Strategy"], badge:"Rising Star", accent:"#f59e0b", bg:"#fffbeb", cat:"Marketing" },
];

const FREELANCERS = [
  { id:1, name:"Harsh Patil", avatar:"HP", role:"Full-Stack Developer", rating:4.9, jobs:312, rate:150, skills:["React","Node.js","AWS","Docker"], color:"#3b82f6", online:true },
  { id:2, name:"Harsh Vishwasrao", avatar:"Hv", role:"Brand Designer", rating:5.0, jobs:198, rate:80, skills:["Figma","Illustrator","Branding"], color:"#9333ea", online:true },
  { id:3, name:"Dev Sidhwani", avatar:"DS", role:"UI/UX Designer", rating:4.9, jobs:275, rate:120, skills:["Figma","Prototyping","iOS"], color:"#ec4899", online:false },
  { id:4, name:"Marc Dubois", avatar:"MD", role:"Data Scientist", rating:4.7, jobs:89, rate:200, skills:["Python","TensorFlow","SQL"], color:"#ca8a04", online:true },
  { id:5, name:"Anay Pai", avatar:"AP", role:"Video Editor", rating:5.0, jobs:540, rate:45, skills:["Premiere","After Effects","DaVinci"], color:"#db2777", online:false },
  { id:6, name:"Omar Hassan", avatar:"OH", role:"Technical Writer", rating:4.8, jobs:130, rate:55, skills:["Docs","API Docs","Markdown"], color:"#0891b2", online:true },
];

const PRICING_PLANS = [
  { name:"Starter", price:0, desc:"For first-timers", features:["5 proposals/month","Basic profile","Chat support","Standard listing"], cta:"Get Started Free", highlight:false },
  { name:"Pro", price:29, desc:"For active freelancers", features:["Unlimited proposals","Featured badge","Priority support","Top search listing","Analytics dashboard","Skill certifications"], cta:"Start Pro Trial", highlight:true },
  { name:"Agency", price:79, desc:"For teams & studios", features:["10 team seats","Agency profile","Dedicated manager","API access","Custom contracts","White-label invoices"], cta:"Contact Sales", highlight:false },
];

/* ── MAIN APP ── */
export default function App() {
  const [page, setPage] = useState("home");
  const [mousePos, setMousePos] = useState({ x: -999, y: -999 });
  const [smoothPos, setSmoothPos] = useState({ x: -999, y: -999 });
  const [cursorBig, setCursorBig] = useState(false);
  const targetRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const animate = () => {
      setSmoothPos(prev => ({
        x: prev.x + (targetRef.current.x - prev.x) * 0.1,
        y: prev.y + (targetRef.current.y - prev.y) * 0.1,
      }));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div style={{ fontFamily:"'Georgia',serif", background:"#fafaf8", minHeight:"100vh", width:"100%", overflowX:"hidden", cursor:"none" }}>
      <div style={{
        position:"fixed", pointerEvents:"none", zIndex:9999,
        left: mousePos.x - 5, top: mousePos.y - 5,
        width:10, height:10, borderRadius:"50%",
        background: cursorBig ? "#6366f1" : "#111827",
        transform: cursorBig ? "scale(2.5)" : "scale(1)",
        transition:"background 0.2s, transform 0.15s",
      }} />
      {/* Ring cursor */}
      <div style={{
        position:"fixed", pointerEvents:"none", zIndex:9998,
        left: smoothPos.x - 22, top: smoothPos.y - 22,
        width:44, height:44, borderRadius:"50%",
        border:`2px solid ${cursorBig ? "rgba(99,102,241,0.6)" : "rgba(17,24,39,0.25)"}`,
        transition:"border-color 0.3s",
      }} />

      {/* Mouse-follow gradient orb on home page */}
      {page === "home" && (
        <div style={{
          position:"fixed", pointerEvents:"none", zIndex:0,
          left: smoothPos.x - 350, top: smoothPos.y - 350,
          width:700, height:700, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(99,102,241,0.10) 0%, rgba(236,72,153,0.05) 45%, transparent 70%)",
        }} />
      )}

      <Nav page={page} navTo={setPage} setBig={setCursorBig} />

      <div style={{ position:"relative", zIndex:1 }}>
        {page === "home"        && <HomePage navTo={setPage} mouse={smoothPos} setBig={setCursorBig} />}
        {page === "explore"     && <ExplorePage setBig={setCursorBig} />}
        {page === "howworks"    && <HowWorksPage />}
        {page === "pricing"     && <PricingPage setBig={setCursorBig} />}
        {page === "teams"       && <TeamsPage navTo={setPage} setBig={setCursorBig} />}
        {page === "freelancers" && <FreelancersPage setBig={setCursorBig} />}
        {page === "signin"      && <AuthPage mode="signin" navTo={setPage} />}
        {page === "signup"      && <AuthPage mode="signup" navTo={setPage} />}
        {page === "post"        && <PostProjectPage navTo={setPage} />}
      </div>
    </div>
  );
}

/* ── NAV ── */
function Nav({ page, navTo, setBig }) {
  const [menu, setMenu] = useState(false);
  const links = [
    { label:"Explore", page:"explore" },
    { label:"How It Works", page:"howworks" },
    { label:"Pricing", page:"pricing" },
    { label:"For Teams", page:"teams" },
  ];
  return (
    <nav style={{ position:"sticky",top:0,zIndex:100,background:"rgba(250,250,248,0.92)",backdropFilter:"blur(20px)",borderBottom:"1px solid #e5e7eb" }}>
      <div style={{ maxWidth:1200,margin:"0 auto",padding:"0 24px",height:64,display:"flex",alignItems:"center",gap:24 }}>
        <button onClick={()=>navTo("home")} onMouseEnter={()=>setBig(true)} onMouseLeave={()=>setBig(false)}
          style={{ display:"flex",alignItems:"center",gap:8,background:"none",border:"none",cursor:"none",padding:0 }}>
          <span style={{ fontSize:18 }}>◆</span>
          <span style={{ fontSize:21,fontWeight:800,letterSpacing:"-0.5px",color:"#111827" }}>Freel</span>
        </button>
        <div style={{ display:"flex",gap:4,flex:1,flexWrap:"wrap" }}>
          {links.map(l => (
            <button key={l.page} onClick={()=>navTo(l.page)}
              onMouseEnter={()=>setBig(true)} onMouseLeave={()=>setBig(false)}
              style={{ background:page===l.page?"#111827":"none",color:page===l.page?"#fff":"#6b7280",
                border:"none",borderRadius:8,padding:"6px 14px",fontSize:14,fontFamily:"inherit",cursor:"none",
                transition:"all 0.2s",fontWeight:page===l.page?700:400 }}>
              {l.label}
            </button>
          ))}
        </div>
        <div style={{ display:"flex",gap:8 }}>
          <button onClick={()=>navTo("signin")} onMouseEnter={()=>setBig(true)} onMouseLeave={()=>setBig(false)}
            style={{ background:"none",border:"1px solid #d1d5db",borderRadius:8,padding:"7px 16px",
              cursor:"none",fontFamily:"inherit",fontSize:13,color:"#374151",fontWeight:500 }}>Sign In</button>
          <button onClick={()=>navTo("signup")} onMouseEnter={()=>setBig(true)} onMouseLeave={()=>setBig(false)}
            style={{ background:"#111827",color:"#fff",border:"none",borderRadius:8,padding:"7px 16px",
              cursor:"none",fontFamily:"inherit",fontSize:13,fontWeight:700 }}>Get Started</button>
        </div>
      </div>
    </nav>
  );
}

/* ── HOME PAGE ── */
function HomePage({ navTo, mouse, setBig }) {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [filter, setFilter] = useState("All");

  const PARTICLES = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i, x: Math.random()*90+5, y: Math.random()*80+5,
      size: Math.random()*5+2, depth: Math.random()*0.5+0.05,
      hue: [240,280,320,200,160][Math.floor(Math.random()*5)],
      opacity: Math.random()*0.35+0.1,
    }))
  )[0];

  const toggleBookmark = (id) =>
    setBookmarks(p => p.includes(id) ? p.filter(x=>x!==id) : [...p, id]);

  const filteredGigs = ALL_GIGS.filter(g => {
    const matchCat = !activeCat || g.cat === activeCat;
    const matchFilter = filter==="All" || (filter==="Top Rated"&&g.badge==="Top Rated") ||
      (filter==="Budget"&&g.price<70) || (filter==="New"&&g.badge==="Rising Star");
    const q = search.toLowerCase();
    const matchSearch = !search || g.title.toLowerCase().includes(q) ||
      g.freelancer.toLowerCase().includes(q) || g.tags.some(t=>t.toLowerCase().includes(q));
    return matchCat && matchFilter && matchSearch;
  });

  const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;

  return (
    <div>
      {/* HERO */}
      <section style={{ maxWidth:1200,margin:"0 auto",padding:"80px 24px 60px",display:"flex",
        alignItems:"center",gap:60,flexWrap:"wrap",position:"relative",overflow:"hidden" }}>

        {/* Floating particles that react to mouse */}
        {PARTICLES.map(p => (
          <div key={p.id} style={{
            position:"absolute", pointerEvents:"none", zIndex:0,
            left:`calc(${p.x}% + ${(mouse.x/vw - 0.5) * p.depth * -80}px)`,
            top:`calc(${p.y}% + ${(mouse.y/vh - 0.5) * p.depth * -60}px)`,
            width:p.size, height:p.size, borderRadius:"50%",
            background:`hsla(${p.hue},70%,65%,${p.opacity})`,
            transition:"left 1s ease, top 1s ease",
            filter:"blur(1px)",
          }} />
        ))}

        {/* Text content */}
        <div style={{ flex:"1 1 440px",minWidth:280,position:"relative",zIndex:2 }}>
          <div style={{ display:"inline-block",background:"#fff7ed",border:"1px solid #fed7aa",
            borderRadius:100,padding:"6px 16px",fontSize:13,color:"#ea580c",marginBottom:24,fontWeight:500 }}>
            ✦ Trusted by 500k+ businesses worldwide
          </div>
          <h1 style={{ fontSize:"clamp(28px,4vw,52px)",fontWeight:800,lineHeight:1.1,
            letterSpacing:"-1.5px",margin:"0 0 16px",color:"#111827" }}>
            Work with the<br/>
            <span style={{ background:"linear-gradient(135deg,#6366f1,#ec4899)",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>world's best</span><br/>
            freelancers.
          </h1>
          <p style={{ fontSize:17,color:"#6b7280",lineHeight:1.75,maxWidth:440,margin:"0 0 32px" }}>
            Find top talent, launch projects, and scale your business — all in one beautifully crafted workspace.
          </p>
          <div style={{ display:"flex",alignItems:"center",background:"#fff",border:"2px solid #e5e7eb",
            borderRadius:14,padding:"6px 6px 6px 16px",boxShadow:"0 4px 24px rgba(0,0,0,0.06)",
            gap:8,marginBottom:20,maxWidth:500 }}>
            <span style={{ fontSize:20,color:"#9ca3af" }}>⌕</span>
            <input style={{ flex:1,border:"none",outline:"none",fontSize:15,fontFamily:"inherit",
              background:"transparent",color:"#111827",padding:"8px 0",cursor:"none" }}
              placeholder="Search skills, services, experts..."
              value={search} onChange={e=>setSearch(e.target.value)} />
            <button onMouseEnter={()=>setBig(true)} onMouseLeave={()=>setBig(false)}
              style={{ background:"#111827",color:"#fff",border:"none",borderRadius:10,
                padding:"10px 22px",cursor:"none",fontFamily:"inherit",fontWeight:700,fontSize:14 }}>
              Search
            </button>
          </div>
          <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
            {["UI Designer","React Dev","Copywriter","Brand Strategist"].map(t=>(
              <span key={t} onClick={()=>setSearch(t)}
                onMouseEnter={()=>setBig(true)} onMouseLeave={()=>setBig(false)}
                style={{ background:"#f3f4f6",border:"1px solid #e5e7eb",borderRadius:100,
                  padding:"6px 14px",fontSize:13,cursor:"none",color:"#374151",transition:"all 0.2s" }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Hero card with parallax */}
        <div style={{ flex:"1 1 320px",minWidth:260,position:"relative",height:380,zIndex:2 }}>
          <div style={{
            background:"#fff",borderRadius:20,boxShadow:"0 20px 60px rgba(0,0,0,0.1)",
            padding:24,width:270,position:"absolute",top:0,right:0,
            transform:`translate(${(mouse.x/vw-0.5)*-14}px, ${(mouse.y/vh-0.5)*-10}px)`,
            transition:"transform 0.8s ease",
          }}>
            <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:16 }}>
              <div style={{ width:44,height:44,borderRadius:12,background:"#6366f1",display:"flex",
                alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700 }}>AM</div>
              <div>
                <div style={{ fontWeight:700,fontSize:15 }}>Amara M.</div>
                <div style={{ fontSize:12,color:"#6b7280" }}>Senior UI Designer</div>
              </div>
              <div style={{ marginLeft:"auto",background:"#dcfce7",color:"#16a34a",fontSize:11,padding:"4px 10px",borderRadius:100,fontWeight:600,whiteSpace:"nowrap" }}>● Live</div>
            </div>
            <div style={{ display:"flex",gap:8,marginBottom:14,flexWrap:"wrap" }}>
              {["⭐ 5.0","✔ 340 jobs","$95/hr"].map(s=>(
                <span key={s} style={{ background:"#f9fafb",padding:"4px 10px",borderRadius:8,fontSize:12,fontWeight:600,color:"#374151" }}>{s}</span>
              ))}
            </div>
            <div style={{ display:"flex",gap:6,flexWrap:"wrap",marginBottom:16 }}>
              {["Figma","Design Systems","Prototyping"].map(sk=>(
                <span key={sk} style={{ background:"#ede9fe",color:"#6d28d9",borderRadius:6,padding:"3px 8px",fontSize:11,fontWeight:600 }}>{sk}</span>
              ))}
            </div>
            <button onMouseEnter={()=>setBig(true)} onMouseLeave={()=>setBig(false)}
              onClick={()=>navTo("freelancers")}
              style={{ background:"#111827",color:"#fff",border:"none",borderRadius:10,
                padding:"10px 0",width:"100%",cursor:"none",fontFamily:"inherit",fontWeight:700,fontSize:14 }}>
              View Profile →
            </button>
          </div>

          <div style={{
            position:"absolute",bottom:60,left:-20,background:"#fff",borderRadius:14,
            padding:"12px 16px",boxShadow:"0 8px 30px rgba(0,0,0,0.1)",display:"flex",alignItems:"center",gap:12,
            transform:`translate(${(mouse.x/vw-0.5)*18}px, ${(mouse.y/vh-0.5)*12}px)`,
            transition:"transform 0.5s ease",
          }}>
            <span style={{ fontSize:22 }}>🚀</span>
            <div><div style={{ fontWeight:700,fontSize:14 }}>Project Launched</div><div style={{ fontSize:12,color:"#6b7280" }}>2 mins ago</div></div>
          </div>
          <div style={{
            position:"absolute",bottom:0,left:30,background:"#fff",borderRadius:14,
            padding:"12px 16px",boxShadow:"0 8px 30px rgba(0,0,0,0.1)",display:"flex",alignItems:"center",gap:12,
            transform:`translate(${(mouse.x/vw-0.5)*10}px, ${(mouse.y/vh-0.5)*18}px)`,
            transition:"transform 0.65s ease",
          }}>
            <span style={{ fontSize:22 }}>💸</span>
            <div><div style={{ fontWeight:700,fontSize:14 }}>$12,400 Earned</div><div style={{ fontSize:12,color:"#6b7280" }}>This month</div></div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ maxWidth:1200,margin:"0 auto 0",padding:"0 24px" }}>
        <div style={{ background:"#111827",borderRadius:20,display:"flex",flexWrap:"wrap" }}>
          {[{v:"2.4M+",l:"Active Freelancers"},{v:"18M+",l:"Projects Done"},{v:"190+",l:"Countries"},{v:"98%",l:"Satisfaction"}].map((s,i)=>(
            <div key={i} style={{ flex:"1 1 140px",padding:"26px 20px",textAlign:"center",
              borderRight:i<3?"1px solid rgba(255,255,255,0.08)":"none" }}>
              <div style={{ fontSize:30,fontWeight:800,color:"#fff",letterSpacing:"-1px" }}>{s.v}</div>
              <div style={{ fontSize:12,color:"#9ca3af",marginTop:4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ maxWidth:1200,margin:"0 auto",padding:"56px 24px 0" }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:28 }}>
          <h2 style={{ fontSize:26,fontWeight:800,letterSpacing:"-0.5px",margin:0 }}>Browse by Category</h2>
          {activeCat && (
            <button onClick={()=>setActiveCat(null)} onMouseEnter={()=>setBig(true)} onMouseLeave={()=>setBig(false)}
              style={{ background:"none",border:"none",cursor:"none",color:"#ef4444",fontSize:14,fontFamily:"inherit",fontWeight:600 }}>
              Clear ✕
            </button>
          )}
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:10 }}>
          {CATEGORIES.map(c=>(
            <button key={c.label} onClick={()=>setActiveCat(activeCat===c.label?null:c.label)}
              onMouseEnter={()=>setBig(true)} onMouseLeave={()=>setBig(false)}
              style={{ background:activeCat===c.label?c.color:"#fff",
                border:`2px solid ${activeCat===c.label?c.color:"#e5e7eb"}`,
                color:activeCat===c.label?"#fff":"#374151",
                borderRadius:14,padding:"16px 12px",display:"flex",flexDirection:"column",
                alignItems:"center",gap:8,cursor:"none",fontFamily:"inherit",transition:"all 0.2s",
                boxShadow:activeCat===c.label?`0 4px 20px ${c.color}44`:"none" }}>
              <span style={{ fontSize:22 }}>{c.icon}</span>
              <span style={{ fontSize:12,fontWeight:600,textAlign:"center",lineHeight:1.3 }}>{c.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* GIGS */}
      <section style={{ maxWidth:1200,margin:"0 auto",padding:"36px 24px 60px" }}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24,flexWrap:"wrap",gap:12 }}>
          <h2 style={{ fontSize:26,fontWeight:800,letterSpacing:"-0.5px",margin:0 }}>
            {activeCat ? activeCat+" Services" : "Featured Services"}
            {search && <span style={{ fontSize:15,color:"#9ca3af",fontWeight:400,marginLeft:10 }}>"{search}"</span>}
          </h2>
          <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
            {["All","New","Budget","Top Rated"].map(f=>(
              <button key={f} onClick={()=>setFilter(f)}
                onMouseEnter={()=>setBig(true)} onMouseLeave={()=>setBig(false)}
                style={{ background:filter===f?"#111827":"#f3f4f6",color:filter===f?"#fff":"#374151",
                  border:"1px solid #e5e7eb",borderRadius:100,padding:"6px 14px",
                  cursor:"none",fontFamily:"inherit",fontSize:13,transition:"all 0.2s" }}>{f}</button>
            ))}
          </div>
        </div>
        {filteredGigs.length === 0 ? (
          <div style={{ textAlign:"center",padding:"60px 0",color:"#9ca3af" }}>
            <div style={{ fontSize:48,marginBottom:16 }}>🔍</div>
            <div style={{ fontSize:18,fontWeight:600,color:"#374151" }}>No results found</div>
            <div style={{ fontSize:14,marginTop:8 }}>Try a different search or category</div>
          </div>
        ) : (
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:18 }}>
            {filteredGigs.map(g=>(
              <GigCard key={g.id} g={g} bookmarks={bookmarks} onBookmark={toggleBookmark} setBig={setBig} />
            ))}
          </div>
        )}
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background:"#111827",padding:"72px 24px",textAlign:"center" }}>
        <h2 style={{ fontSize:34,fontWeight:800,color:"#fff",letterSpacing:"-1px",margin:"0 0 10px" }}>How Freel Works</h2>
        <p style={{ color:"#9ca3af",fontSize:16,margin:"0 0 44px" }}>Three simple steps to get your project done.</p>
        <div style={{ display:"flex",gap:20,justifyContent:"center",maxWidth:880,margin:"0 auto",flexWrap:"wrap" }}>
          {[
            {num:"01",title:"Post a Project",desc:"Describe your needs. Free and takes just 2 minutes."},
            {num:"02",title:"Match with Talent",desc:"Browse proposals or let AI suggest the best match."},
            {num:"03",title:"Collaborate & Pay",desc:"Work seamlessly and pay only when you're satisfied."},
          ].map(s=>(
            <div key={s.num} style={{ flex:"1 1 230px",background:"rgba(255,255,255,0.05)",
              border:"1px solid rgba(255,255,255,0.1)",borderRadius:20,padding:28,textAlign:"left" }}>
              <div style={{ fontSize:38,fontWeight:900,color:"rgba(99,102,241,0.4)",marginBottom:14,letterSpacing:"-2px" }}>{s.num}</div>
              <h3 style={{ fontSize:17,fontWeight:700,color:"#fff",margin:"0 0 8px" }}>{s.title}</h3>
              <p style={{ fontSize:14,color:"#9ca3af",lineHeight:1.7,margin:0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:"linear-gradient(135deg,#6366f1,#ec4899)",padding:"72px 24px",textAlign:"center" }}>
        <h2 style={{ fontSize:38,fontWeight:800,color:"#fff",letterSpacing:"-1px",margin:"0 0 10px" }}>Ready to start building?</h2>
        <p style={{ color:"rgba(255,255,255,0.8)",fontSize:16,margin:"0 0 32px" }}>Join over 2 million businesses on Freel.</p>
        <div style={{ display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap" }}>
          <button onMouseEnter={()=>setBig(true)} onMouseLeave={()=>setBig(false)} onClick={()=>navTo("post")}
            style={{ background:"#fff",color:"#6366f1",border:"none",borderRadius:12,padding:"13px 26px",
              cursor:"none",fontFamily:"inherit",fontWeight:800,fontSize:15 }}>
            Post a Project — Free
          </button>
          <button onMouseEnter={()=>setBig(true)} onMouseLeave={()=>setBig(false)} onClick={()=>navTo("freelancers")}
            style={{ background:"rgba(255,255,255,0.15)",color:"#fff",border:"2px solid rgba(255,255,255,0.35)",
              borderRadius:12,padding:"13px 26px",cursor:"none",fontFamily:"inherit",fontWeight:700,fontSize:15 }}>
            Browse Freelancers
          </button>
        </div>
      </section>

      <Footer navTo={navTo} setBig={setBig} />
    </div>
  );
}

/* ── GIG CARD ── */
function GigCard({ g, bookmarks, onBookmark, setBig }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ background:g.bg,borderRadius:20,padding:22,
      border:"1px solid rgba(0,0,0,0.06)",
      boxShadow:hov?"0 14px 44px rgba(0,0,0,0.13)":"0 2px 10px rgba(0,0,0,0.04)",
      transform:hov?"translateY(-4px)":"none",
      transition:"all 0.25s" }}
      onMouseEnter={()=>{setHov(true);setBig(true);}}
      onMouseLeave={()=>{setHov(false);setBig(false);}}>
      <div style={{ display:"flex",justifyContent:"space-between",marginBottom:14 }}>
        <div style={{ background:g.accent,color:"#fff",borderRadius:100,padding:"3px 12px",fontSize:11,fontWeight:700 }}>{g.badge}</div>
        <button onClick={()=>onBookmark(g.id)} style={{ background:"none",border:"none",cursor:"none",fontSize:18,color:bookmarks.includes(g.id)?"#e11d48":"#d1d5db",padding:0,transition:"color 0.2s" }}>
          {bookmarks.includes(g.id)?"♥":"♡"}
        </button>
      </div>
      <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:12 }}>
        <div style={{ width:38,height:38,borderRadius:10,background:g.accent,display:"flex",alignItems:"center",
          justifyContent:"center",color:"#fff",fontWeight:700,fontSize:12,flexShrink:0 }}>{g.avatar}</div>
        <div>
          <div style={{ fontWeight:700,fontSize:13 }}>{g.freelancer}</div>
          <div style={{ fontSize:12,color:"#d97706",fontWeight:600 }}>★ {g.rating} <span style={{ color:"#9ca3af",fontWeight:400 }}>({g.reviews})</span></div>
        </div>
      </div>
      <h3 style={{ fontSize:15,fontWeight:700,lineHeight:1.4,margin:"0 0 12px" }}>{g.title}</h3>
      <div style={{ display:"flex",gap:5,flexWrap:"wrap",marginBottom:16 }}>
        {g.tags.map(t=>(
          <span key={t} style={{ border:`1px solid ${g.accent}`,color:g.accent,borderRadius:6,
            padding:"2px 8px",fontSize:11,fontWeight:600,background:"rgba(255,255,255,0.6)" }}>{t}</span>
        ))}
      </div>
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
        <div>
          <div style={{ fontSize:10,color:"#9ca3af" }}>Starting at</div>
          <div style={{ fontSize:19,fontWeight:800,letterSpacing:"-0.5px",color:g.accent }}>${g.price}/hr</div>
        </div>
        <button style={{ background:g.accent,color:"#fff",border:"none",borderRadius:9,
          padding:"9px 16px",cursor:"none",fontFamily:"inherit",fontWeight:700,fontSize:13 }}>Hire Now</button>
      </div>
    </div>
  );
}

/* ── EXPLORE PAGE ── */
function ExplorePage({ setBig }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Relevant");
  const [bookmarks, setBookmarks] = useState([]);
  const sorted = [...ALL_GIGS]
    .filter(g => !search || g.title.toLowerCase().includes(search.toLowerCase()) || g.tags.some(t=>t.toLowerCase().includes(search.toLowerCase())))
    .sort((a,b)=> sort==="Price Low"?a.price-b.price: sort==="Price High"?b.price-a.price: sort==="Rating"?b.rating-a.rating:0);
  return (
    <div style={{ maxWidth:1200,margin:"0 auto",padding:"56px 24px" }}>
      <h1 style={{ fontSize:38,fontWeight:800,letterSpacing:"-1px",margin:"0 0 6px" }}>Explore Services</h1>
      <p style={{ color:"#6b7280",margin:"0 0 32px" }}>Discover {ALL_GIGS.length} services from top-rated freelancers.</p>
      <div style={{ display:"flex",gap:12,marginBottom:28,flexWrap:"wrap" }}>
        <div style={{ display:"flex",alignItems:"center",flex:1,minWidth:220,background:"#fff",
          border:"2px solid #e5e7eb",borderRadius:12,padding:"8px 14px",gap:8 }}>
          <span style={{ color:"#9ca3af" }}>⌕</span>
          <input style={{ flex:1,border:"none",outline:"none",fontFamily:"inherit",fontSize:15,cursor:"none" }}
            placeholder="Search services..." value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
        <select value={sort} onChange={e=>setSort(e.target.value)}
          style={{ background:"#fff",border:"2px solid #e5e7eb",borderRadius:12,padding:"8px 14px",
            fontFamily:"inherit",fontSize:14,cursor:"none",outline:"none" }}>
          {["Relevant","Rating","Price Low","Price High"].map(o=><option key={o}>{o}</option>)}
        </select>
      </div>
      <div style={{ fontSize:13,color:"#6b7280",marginBottom:18 }}>{sorted.length} results</div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:18 }}>
        {sorted.map(g=><GigCard key={g.id} g={g} bookmarks={bookmarks}
          onBookmark={id=>setBookmarks(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id])} setBig={setBig} />)}
      </div>
    </div>
  );
}

/* ── HOW IT WORKS PAGE ── */
function HowWorksPage() {
  const steps = [
    {num:"01",icon:"📋",title:"Create Your Account",desc:"Sign up for free in under 2 minutes. No credit card required. Set up your profile and tell us if you're looking to hire or find work.",color:"#6366f1"},
    {num:"02",icon:"🔍",title:"Post or Browse",desc:"Post a detailed project brief and receive proposals within hours — or browse thousands of freelancer profiles filtered by skill, rating, and budget.",color:"#ec4899"},
    {num:"03",icon:"🤝",title:"Connect & Discuss",desc:"Review proposals, chat with candidates, and interview potential hires. Use our built-in workspace to share files and give feedback in real time.",color:"#f59e0b"},
    {num:"04",icon:"💳",title:"Secure Payment",desc:"Fund a milestone before work starts. Your payment is held safely in escrow and only released when you approve the deliverables.",color:"#10b981"},
    {num:"05",icon:"⭐",title:"Review & Repeat",desc:"Leave a review to build community trust. Rehire your favorite freelancers with one click — your project history lives in your dashboard forever.",color:"#3b82f6"},
  ];
  return (
    <div style={{ maxWidth:860,margin:"0 auto",padding:"72px 24px" }}>
      <div style={{ textAlign:"center",marginBottom:56 }}>
        <h1 style={{ fontSize:42,fontWeight:800,letterSpacing:"-1.5px",margin:"0 0 10px" }}>How Freel Works</h1>
        <p style={{ color:"#6b7280",fontSize:17 }}>Simple, transparent, and designed for results.</p>
      </div>
      <div style={{ display:"flex",flexDirection:"column" }}>
        {steps.map((s,i)=>(
          <div key={i} style={{ display:"flex",gap:28,alignItems:"flex-start",marginBottom:44 }}>
            <div style={{ display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0 }}>
              <div style={{ width:60,height:60,borderRadius:16,background:s.color,
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0 }}>{s.icon}</div>
              {i<steps.length-1 && <div style={{ width:2,height:44,background:"#e5e7eb",marginTop:8 }} />}
            </div>
            <div style={{ paddingTop:6 }}>
              <div style={{ fontSize:11,fontWeight:700,color:s.color,letterSpacing:2,marginBottom:5 }}>STEP {s.num}</div>
              <h3 style={{ fontSize:21,fontWeight:800,margin:"0 0 8px" }}>{s.title}</h3>
              <p style={{ color:"#6b7280",lineHeight:1.7,fontSize:15,margin:0 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background:"#f0f9ff",border:"1px solid #bae6fd",borderRadius:20,padding:32,textAlign:"center" }}>
        <div style={{ fontSize:30,marginBottom:10 }}>💡</div>
        <h3 style={{ fontSize:20,fontWeight:800,margin:"0 0 8px" }}>Need help getting started?</h3>
        <p style={{ color:"#6b7280",margin:"0 0 20px",fontSize:14 }}>Our onboarding team is available 24/7 to guide you.</p>
        <button style={{ background:"#0891b2",color:"#fff",border:"none",borderRadius:12,padding:"11px 26px",
          cursor:"none",fontFamily:"inherit",fontWeight:700,fontSize:14 }}>Chat with Support</button>
      </div>
    </div>
  );
}

/* ── PRICING PAGE ── */
function PricingPage({ setBig }) {
  const [billing, setBilling] = useState("monthly");
  return (
    <div style={{ margin:"0 auto",maxWidth:"100%", padding:"72px 48px" }}>
      <div style={{ textAlign:"center",marginBottom:44 }}>
        <h1 style={{ fontSize:42,fontWeight:800,letterSpacing:"-1.5px",margin:"0 0 10px" }}>Simple, Transparent Pricing</h1>
        <p style={{ color:"#6b7280",fontSize:17,margin:"0 0 24px" }}>Start free, upgrade when you're ready.</p>
        <div style={{ display:"inline-flex",background:"#f3f4f6",borderRadius:100,padding:4,gap:4 }}>
          {["monthly","yearly"].map(b=>(
            <button key={b} onClick={()=>setBilling(b)}
              onMouseEnter={()=>setBig(true)} onMouseLeave={()=>setBig(false)}
              style={{ background:billing===b?"#fff":"transparent",border:"none",borderRadius:100,
                padding:"8px 20px",cursor:"none",fontFamily:"inherit",fontSize:14,fontWeight:600,
                boxShadow:billing===b?"0 2px 8px rgba(0,0,0,0.1)":undefined,transition:"all 0.2s" }}>
              {b.charAt(0).toUpperCase()+b.slice(1)}{b==="yearly"&&<span style={{ color:"#16a34a",fontSize:12,marginLeft:4 }}>Save 20%</span>}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display:"flex",gap:20,justifyContent:"center",flexWrap:"wrap" }}>
        {PRICING_PLANS.map(plan=>(
          <div key={plan.name} onMouseEnter={()=>setBig(true)} onMouseLeave={()=>setBig(false)}
            style={{ flex:"1 1 270px",maxWidth:320,
              background:plan.highlight?"#111827":"#fff",
              border:plan.highlight?"2px solid #6366f1":"2px solid #e5e7eb",
              borderRadius:24,padding:32,position:"relative",
              boxShadow:plan.highlight?"0 20px 60px rgba(99,102,241,0.18)":"0 2px 12px rgba(0,0,0,0.04)",
              transition:"transform 0.2s",cursor:"none" }}>
            {plan.highlight && (
              <div style={{ position:"absolute",top:-13,left:"50%",transform:"translateX(-50%)",
                background:"linear-gradient(135deg,#6366f1,#ec4899)",color:"#fff",borderRadius:100,
                padding:"4px 16px",fontSize:11,fontWeight:700,whiteSpace:"nowrap" }}>Most Popular</div>
            )}
            <div style={{ color:plan.highlight?"#9ca3af":"#6b7280",fontSize:12,marginBottom:6 }}>{plan.desc}</div>
            <div style={{ fontSize:24,fontWeight:800,color:plan.highlight?"#fff":"#111827",marginBottom:2 }}>{plan.name}</div>
            <div style={{ marginBottom:24 }}>
              <span style={{ fontSize:44,fontWeight:900,color:plan.highlight?"#fff":"#111827" }}>
                ${billing==="yearly"?Math.round(plan.price*0.8):plan.price}
              </span>
              {plan.price>0&&<span style={{ color:plan.highlight?"#9ca3af":"#6b7280",fontSize:13 }}>/mo</span>}
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:8,marginBottom:24 }}>
              {plan.features.map(f=>(
                <div key={f} style={{ display:"flex",alignItems:"center",gap:8 }}>
                  <span style={{ color:"#16a34a",fontSize:14 }}>✓</span>
                  <span style={{ fontSize:13,color:plan.highlight?"#d1d5db":"#374151" }}>{f}</span>
                </div>
              ))}
            </div>
            <button onMouseEnter={()=>setBig(true)} onMouseLeave={()=>setBig(false)}
              style={{ width:"100%",background:plan.highlight?"linear-gradient(135deg,#6366f1,#ec4899)":"#111827",
                color:"#fff",border:"none",borderRadius:11,padding:"13px 0",cursor:"none",
                fontFamily:"inherit",fontWeight:800,fontSize:14 }}>{plan.cta}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── FOR TEAMS PAGE ── */
function TeamsPage({ navTo, setBig }) {
  const features = [
    {icon:"👥",title:"Team Workspace",desc:"Invite up to 50 members, assign roles, and manage permissions centrally."},
    {icon:"📊",title:"Analytics & Reports",desc:"Track spending, monitor velocity, and export reports for finance teams."},
    {icon:"🔐",title:"SSO & Security",desc:"Enterprise-grade security with SSO, 2FA, and audit logs."},
    {icon:"🤖",title:"AI Matching",desc:"AI recommends the best freelancers based on your history and outcomes."},
    {icon:"📄",title:"Custom Contracts",desc:"Use your own NDAs with built-in e-signatures and custom templates."},
    {icon:"💬",title:"Dedicated Support",desc:"A dedicated account manager available Mon–Fri for fast issue resolution."},
  ];
  return (
    <div>
      <div style={{ background:"linear-gradient(135deg,#0f172a,#1e1b4b)",padding:"90px 24px",textAlign:"center" }}>
        <div style={{ display:"inline-block",background:"rgba(99,102,241,0.2)",border:"1px solid rgba(99,102,241,0.4)",
          borderRadius:100,padding:"6px 16px",fontSize:12,color:"#a5b4fc",marginBottom:22 }}>
          ◆ Built for Enterprise Teams
        </div>
        <h1 style={{ fontSize:"clamp(32px,5vw,56px)",fontWeight:800,color:"#fff",letterSpacing:"-2px",margin:"0 0 18px",lineHeight:1.1 }}>
          Scale your workforce<br/>with confidence.
        </h1>
        <p style={{ color:"#94a3b8",fontSize:16,maxWidth:520,margin:"0 auto 36px",lineHeight:1.7 }}>
          Freel for Teams gives you the control, visibility, and tools to manage external talent at scale.
        </p>
        <div style={{ display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap" }}>
          <button onMouseEnter={()=>setBig(true)} onMouseLeave={()=>setBig(false)} onClick={()=>navTo("signup")}
            style={{ background:"#6366f1",color:"#fff",border:"none",borderRadius:12,padding:"13px 26px",
              cursor:"none",fontFamily:"inherit",fontWeight:800,fontSize:14 }}>Start Free Trial</button>
          <button onMouseEnter={()=>setBig(true)} onMouseLeave={()=>setBig(false)}
            style={{ background:"rgba(255,255,255,0.1)",color:"#fff",border:"2px solid rgba(255,255,255,0.2)",
              borderRadius:12,padding:"13px 26px",cursor:"none",fontFamily:"inherit",fontWeight:700,fontSize:14 }}>Book a Demo</button>
        </div>
      </div>
      <div style={{ maxWidth:1060,margin:"0 auto",padding:"72px 24px" }}>
        <h2 style={{ fontSize:30,fontWeight:800,textAlign:"center",letterSpacing:"-0.5px",margin:"0 0 44px" }}>Everything your team needs</h2>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))",gap:20 }}>
          {features.map(f=>(
            <div key={f.title} onMouseEnter={()=>setBig(true)} onMouseLeave={()=>setBig(false)}
              style={{ background:"#fff",border:"1px solid #e5e7eb",borderRadius:18,padding:24,cursor:"none" }}>
              <div style={{ fontSize:28,marginBottom:14 }}>{f.icon}</div>
              <h3 style={{ fontSize:17,fontWeight:700,margin:"0 0 7px" }}>{f.title}</h3>
              <p style={{ color:"#6b7280",fontSize:13,lineHeight:1.7,margin:0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── FREELANCERS PAGE ── */
function FreelancersPage({ setBig }) {
  const [search, setSearch] = useState("");
  const filtered = FREELANCERS.filter(f =>
    !search || f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.role.toLowerCase().includes(search.toLowerCase()) ||
    f.skills.some(s=>s.toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <div style={{ maxWidth:1200,margin:"0 auto",padding:"56px 24px" }}>
      <h1 style={{ fontSize:38,fontWeight:800,letterSpacing:"-1px",margin:"0 0 6px" }}>Browse Freelancers</h1>
      <p style={{ color:"#6b7280",margin:"0 0 32px" }}>Hand-picked, vetted talent ready to work with you.</p>
      <div style={{ display:"flex",alignItems:"center",background:"#fff",border:"2px solid #e5e7eb",borderRadius:12,
        padding:"8px 14px",gap:8,maxWidth:380,marginBottom:32 }}>
        <span style={{ color:"#9ca3af" }}>⌕</span>
        <input style={{ flex:1,border:"none",outline:"none",fontFamily:"inherit",fontSize:15,cursor:"none" }}
          placeholder="Search by name, skill, role..." value={search} onChange={e=>setSearch(e.target.value)} />
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:18 }}>
        {filtered.map(f=>(
          <div key={f.id} onMouseEnter={()=>setBig(true)} onMouseLeave={()=>setBig(false)}
            style={{ background:"#fff",border:"1px solid #e5e7eb",borderRadius:20,padding:26,cursor:"none",
              transition:"box-shadow 0.2s, transform 0.2s" }}>
            <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:14 }}>
              <div style={{ width:52,height:52,borderRadius:14,background:f.color,display:"flex",
                alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:17,flexShrink:0 }}>{f.avatar}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700,fontSize:16 }}>{f.name}</div>
                <div style={{ fontSize:12,color:"#6b7280" }}>{f.role}</div>
              </div>
              {f.online&&<div style={{ background:"#dcfce7",color:"#16a34a",fontSize:10,padding:"3px 10px",borderRadius:100,fontWeight:600,whiteSpace:"nowrap" }}>● Online</div>}
            </div>
            <div style={{ display:"flex",gap:14,marginBottom:14,fontSize:13 }}>
              <span style={{ color:"#d97706",fontWeight:600 }}>★ {f.rating}</span>
              <span style={{ color:"#6b7280" }}>✔ {f.jobs} jobs</span>
              <span style={{ marginLeft:"auto",fontWeight:700,color:f.color }}>${f.rate}/hr</span>
            </div>
            <div style={{ display:"flex",gap:5,flexWrap:"wrap",marginBottom:16 }}>
              {f.skills.map(s=>(
                <span key={s} style={{ background:"#f3f4f6",color:"#374151",borderRadius:6,padding:"3px 9px",fontSize:11,fontWeight:500 }}>{s}</span>
              ))}
            </div>
            <button style={{ width:"100%",background:f.color,color:"#fff",border:"none",borderRadius:10,
              padding:"10px 0",cursor:"none",fontFamily:"inherit",fontWeight:700,fontSize:13 }}>
              View Profile →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── AUTH PAGE ── */
function AuthPage({ mode, navTo }) {
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const [done, setDone] = useState(false);
  const isSignup = mode === "signup";

  if (done) return (
    <div style={{ minHeight:"80vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"24px" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:52,marginBottom:14 }}>🎉</div>
        <h2 style={{ fontSize:22,fontWeight:800,margin:"0 0 8px" }}>
          {isSignup?"Welcome to Freel!":"Welcome back!"}
        </h2>
        <p style={{ color:"#6b7280",marginBottom:22,fontSize:14 }}>You're now signed {isSignup?"up":"in"}.</p>
        <button onClick={()=>navTo("home")} style={{ background:"#111827",color:"#fff",border:"none",borderRadius:10,
          padding:"11px 24px",cursor:"none",fontFamily:"inherit",fontWeight:800,fontSize:14 }}>Go to Home →</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"85vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"24px" }}>
      <div style={{ width:"100%",maxWidth:420 }}>
        <button onClick={()=>navTo("home")} style={{ background:"none",border:"none",cursor:"none",
          color:"#6b7280",fontFamily:"inherit",fontSize:13,marginBottom:20,display:"block" }}>← Back to Home</button>
        <div style={{ background:"#fff",border:"1px solid #e5e7eb",borderRadius:20,padding:"32px 28px",
          boxShadow:"0 8px 40px rgba(0,0,0,0.06)" }}>
          <div style={{ textAlign:"center",marginBottom:24 }}>
            <div style={{ fontSize:16,fontWeight:800,marginBottom:6 }}>◆ Freel</div>
            <h2 style={{ fontSize:20,fontWeight:800,letterSpacing:"-0.3px",margin:"0 0 5px" }}>
              {isSignup?"Create your account":"Sign in to Freel"}
            </h2>
            <p style={{ color:"#6b7280",fontSize:13,margin:0 }}>
              {isSignup?"Start hiring or earning in minutes.":"Good to have you back."}
            </p>
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:13 }}>
            {isSignup&&(
              <div>
                <label style={{ fontSize:12,fontWeight:600,color:"#374151",display:"block",marginBottom:4 }}>Full Name</label>
                <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Jane Smith"
                  style={{ width:"100%",border:"1.5px solid #e5e7eb",borderRadius:9,padding:"9px 12px",fontFamily:"inherit",fontSize:13,outline:"none",boxSizing:"border-box",cursor:"none" }} />
              </div>
            )}
            <div>
              <label style={{ fontSize:12,fontWeight:600,color:"#374151",display:"block",marginBottom:4 }}>Email</label>
              <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="jane@example.com"
                style={{ width:"100%",border:"1.5px solid #e5e7eb",borderRadius:9,padding:"9px 12px",fontFamily:"inherit",fontSize:13,outline:"none",boxSizing:"border-box",cursor:"none" }} />
            </div>
            <div>
              <label style={{ fontSize:12,fontWeight:600,color:"#374151",display:"block",marginBottom:4 }}>Password</label>
              <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="••••••••"
                style={{ width:"100%",border:"1.5px solid #e5e7eb",borderRadius:9,padding:"9px 12px",fontFamily:"inherit",fontSize:13,outline:"none",boxSizing:"border-box",cursor:"none" }} />
            </div>
            <button onClick={()=>setDone(true)}
              style={{ background:"#111827",color:"#fff",border:"none",borderRadius:10,padding:"12px 0",
                cursor:"none",fontFamily:"inherit",fontWeight:800,fontSize:14,marginTop:4 }}>
              {isSignup?"Create Account →":"Sign In →"}
            </button>
          </div>
          <div style={{ textAlign:"center",marginTop:16,fontSize:13,color:"#6b7280" }}>
            {isSignup?"Already have an account? ":"Don't have an account? "}
            <button onClick={()=>navTo(isSignup?"signin":"signup")}
              style={{ background:"none",border:"none",cursor:"none",color:"#6366f1",fontWeight:600,fontSize:13,fontFamily:"inherit" }}>
              {isSignup?"Sign In":"Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── POST PROJECT PAGE ── */
function PostProjectPage({ navTo }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ title:"", category:"", budget:"", duration:"", desc:"" });
  const [done, setDone] = useState(false);
  const u = (k,v) => setForm({...form,[k]:v});

  if (done) return (
    <div style={{ maxWidth:500,margin:"90px auto",padding:"0 24px",textAlign:"center" }}>
      <div style={{ fontSize:60,marginBottom:16 }}>🚀</div>
      <h2 style={{ fontSize:26,fontWeight:800,margin:"0 0 10px" }}>Project Posted!</h2>
      <p style={{ color:"#6b7280",marginBottom:6 }}>Your project <strong>"{form.title}"</strong> is now live.</p>
      <p style={{ color:"#9ca3af",fontSize:13,marginBottom:28 }}>Expect proposals within the next few hours.</p>
      <button onClick={()=>navTo("home")} style={{ background:"#111827",color:"#fff",border:"none",borderRadius:12,
        padding:"12px 28px",cursor:"none",fontFamily:"inherit",fontWeight:800,fontSize:14 }}>← Back to Home</button>
    </div>
  );

  return (
    <div style={{ maxWidth:600,margin:"56px auto",padding:"0 24px" }}>
      <button onClick={()=>navTo("home")} style={{ background:"none",border:"none",cursor:"none",
        color:"#6b7280",fontFamily:"inherit",fontSize:13,marginBottom:22 }}>← Back</button>
      <h1 style={{ fontSize:30,fontWeight:800,letterSpacing:"-0.5px",margin:"0 0 6px" }}>Post a Project</h1>
      <p style={{ color:"#6b7280",margin:"0 0 28px" }}>Tell us what you need — it's free.</p>
      <div style={{ display:"flex",gap:6,marginBottom:36 }}>
        {[1,2,3].map(n=>(
          <div key={n} style={{ flex:1,height:4,borderRadius:100,background:n<=step?"#6366f1":"#e5e7eb",transition:"background 0.3s" }} />
        ))}
      </div>
      <div style={{ background:"#fff",border:"1px solid #e5e7eb",borderRadius:22,padding:36,boxShadow:"0 4px 24px rgba(0,0,0,0.06)" }}>
        {step===1&&(
          <div>
            <h3 style={{ fontWeight:800,fontSize:19,margin:"0 0 22px" }}>What do you need done?</h3>
            <div style={{ display:"flex",flexDirection:"column",gap:18 }}>
              <div>
                <label style={{ fontSize:12,fontWeight:600,color:"#374151",display:"block",marginBottom:5 }}>Project Title *</label>
                <input value={form.title} onChange={e=>u("title",e.target.value)} placeholder="e.g. Build a React e-commerce website"
                  style={{ width:"100%",border:"2px solid #e5e7eb",borderRadius:10,padding:"10px 13px",fontFamily:"inherit",fontSize:14,outline:"none",boxSizing:"border-box",cursor:"none" }} />
              </div>
              <div>
                <label style={{ fontSize:12,fontWeight:600,color:"#374151",display:"block",marginBottom:5 }}>Category *</label>
                <select value={form.category} onChange={e=>u("category",e.target.value)}
                  style={{ width:"100%",border:"2px solid #e5e7eb",borderRadius:10,padding:"10px 13px",fontFamily:"inherit",fontSize:14,background:"#fff",cursor:"none",boxSizing:"border-box",outline:"none" }}>
                  <option value="">Select a category...</option>
                  {CATEGORIES.map(c=><option key={c.label}>{c.label}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}
        {step===2&&(
          <div>
            <h3 style={{ fontWeight:800,fontSize:19,margin:"0 0 22px" }}>Budget & Timeline</h3>
            <div style={{ display:"flex",flexDirection:"column",gap:18 }}>
              <div>
                <label style={{ fontSize:12,fontWeight:600,color:"#374151",display:"block",marginBottom:8 }}>Budget Range</label>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
                  {["< $500","$500–$2k","$2k–$10k","$10k+"].map(b=>(
                    <button key={b} onClick={()=>u("budget",b)}
                      style={{ background:form.budget===b?"#111827":"#f3f4f6",color:form.budget===b?"#fff":"#374151",
                        border:"2px solid "+(form.budget===b?"#111827":"transparent"),borderRadius:10,
                        padding:"11px 0",cursor:"none",fontFamily:"inherit",fontWeight:600,fontSize:13,transition:"all 0.2s" }}>{b}</button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ fontSize:12,fontWeight:600,color:"#374151",display:"block",marginBottom:8 }}>Duration</label>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
                  {["< 1 week","1–4 weeks","1–3 months","Ongoing"].map(d=>(
                    <button key={d} onClick={()=>u("duration",d)}
                      style={{ background:form.duration===d?"#111827":"#f3f4f6",color:form.duration===d?"#fff":"#374151",
                        border:"2px solid "+(form.duration===d?"#111827":"transparent"),borderRadius:10,
                        padding:"11px 0",cursor:"none",fontFamily:"inherit",fontWeight:600,fontSize:13,transition:"all 0.2s" }}>{d}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {step===3&&(
          <div>
            <h3 style={{ fontWeight:800,fontSize:19,margin:"0 0 22px" }}>Describe your project</h3>
            <textarea value={form.desc} onChange={e=>u("desc",e.target.value)}
              placeholder="Describe the scope, deliverables, requirements, and any relevant context..."
              rows={7}
              style={{ width:"100%",border:"2px solid #e5e7eb",borderRadius:10,padding:"13px",
                fontFamily:"inherit",fontSize:14,outline:"none",boxSizing:"border-box",resize:"vertical",lineHeight:1.7,cursor:"none" }} />
            <div style={{ marginTop:10,background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:10,padding:"10px 14px",fontSize:12,color:"#15803d" }}>
              ✓ Your project will be reviewed and live within minutes.
            </div>
          </div>
        )}
        <div style={{ display:"flex",justifyContent:"space-between",marginTop:28,gap:10 }}>
          {step>1
            ?<button onClick={()=>setStep(s=>s-1)} style={{ background:"#f3f4f6",color:"#374151",border:"none",borderRadius:11,padding:"11px 22px",cursor:"none",fontFamily:"inherit",fontWeight:600,fontSize:14 }}>← Back</button>
            :<div/>
          }
          <button onClick={()=>step<3?setStep(s=>s+1):setDone(true)}
            disabled={step===1&&(!form.title||!form.category)}
            style={{ background:(step===1&&(!form.title||!form.category))?"#d1d5db":"#111827",
              color:"#fff",border:"none",borderRadius:11,padding:"11px 26px",
              cursor:"none",fontFamily:"inherit",fontWeight:800,fontSize:14 }}>
            {step===3?"Post Project 🚀":"Continue →"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── FOOTER ── */
function Footer({ navTo, setBig }) {
  return (
    <footer style={{ background:"#0d0d0d",padding:"56px 24px 22px" }}>
      <div style={{ maxWidth:1200,margin:"0 auto 36px",display:"flex",gap:44,flexWrap:"wrap" }}>
        <div style={{ flex:"1 1 180px" }}>
          <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:10 }}>
            <span style={{ fontSize:16,color:"#fff" }}>◆</span>
            <span style={{ fontSize:19,fontWeight:800,color:"#fff" }}>Freel</span>
          </div>
          <p style={{ color:"#6b7280",fontSize:12 }}>The future of work, today.</p>
        </div>
        {[
          {h:"Platform",links:[{l:"Browse Talent",p:"freelancers"},{l:"Post a Job",p:"post"},{l:"How It Works",p:"howworks"},{l:"Pricing",p:"pricing"}]},
          {h:"Company",links:[{l:"About",p:"home"},{l:"For Teams",p:"teams"},{l:"Sign In",p:"signin"},{l:"Sign Up",p:"signup"}]},
          {h:"Support",links:[{l:"Help Center",p:"howworks"},{l:"Explore",p:"explore"},{l:"Freelancers",p:"freelancers"},{l:"Contact",p:"home"}]},
        ].map(col=>(
          <div key={col.h} style={{ flex:"1 1 110px" }}>
            <div style={{ color:"#fff",fontWeight:700,fontSize:13,marginBottom:14 }}>{col.h}</div>
            {col.links.map(l=>(
              <div key={l.l} onClick={()=>navTo(l.p)} onMouseEnter={()=>setBig(true)} onMouseLeave={()=>setBig(false)}
                style={{ color:"#6b7280",fontSize:12,marginBottom:9,cursor:"none" }}>{l.l}</div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ maxWidth:1200,margin:"0 auto",borderTop:"1px solid #1f2937",paddingTop:20,
        color:"#4b5563",fontSize:12,textAlign:"center" }}>
        © 2026 Freel, Inc. All rights reserved. — Made with Creativity..
      </div>
    </footer>
  );
}
