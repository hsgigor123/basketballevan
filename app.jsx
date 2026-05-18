/* Baseline Supply Co. — App */

const { useState, useEffect, useRef } = React;

const PRODUCTS = [
  {
    n: "01",
    name: "The Baseline",
    sub: "Classic crewneck",
    price: 48,
    badge: "Core",
    colors: ["#0c0c0c", "#efeae0", "#6e1c25"],
    teeClass: "tee",
    teeColor: "#0c0c0c",
    desc: "14 oz cotton crewneck. The one you reach for."
  },
  {
    n: "02",
    name: "Triple Threat",
    sub: "Heavyweight boxy fit",
    price: 58,
    badge: "Drop 03",
    colors: ["#1a1a1a", "#3a2410", "#efeae0"],
    teeClass: "tee tee--boxy",
    teeColor: "#1a1a1a",
    desc: "Boxy cut. Drop shoulder. Sits where it should."
  },
  {
    n: "03",
    name: "And One",
    sub: "Pocket tee",
    price: 42,
    badge: null,
    colors: ["#efeae0", "#0c0c0c", "#7a8472"],
    teeClass: "tee",
    teeColor: "#efeae0",
    pocket: true,
    desc: "Garment-dyed pocket tee. Earned creases."
  },
  {
    n: "04",
    name: "Buzzer",
    sub: "Long sleeve",
    price: 54,
    badge: "New",
    colors: ["#0c0c0c", "#6e1c25", "#3a2410"],
    teeClass: "tee tee--long",
    teeColor: "#0c0c0c",
    desc: "Long sleeve in heavyweight cotton. Layer ready."
  }
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Marquee() {
  const items = [
    "Free shipping on US orders over $120",
    "Drop 03 — Buzzer long sleeve",
    "Made in Los Angeles",
    "14 oz heavyweight cotton",
    "Cotton for the court and everywhere after"
  ];
  const line = items.map((t, i) => (
    <span key={i}>
      <span>{t}</span>
      <span className="dot"></span>
    </span>
  ));
  return (
    <div className="marquee">
      <div className="marquee__track">
        {line}{line}{line}
      </div>
    </div>
  );
}

function Nav({ cartCount }) {
  return (
    <div className="nav">
      <div className="wrap nav__inner">
        <div className="nav__left">
          <div className="navlinks" style={{display:'flex', gap:28}}>
            <a href="#shop">Shop</a>
            <a href="#story">Story</a>
            <a href="#lookbook">Lookbook</a>
          </div>
        </div>
        <a href="#" className="nav__brand">Baseline<span style={{color:'var(--accent)'}}>.</span></a>
        <div className="nav__right">
          <div className="navlinks" style={{display:'flex', gap:28}}>
            <a href="#stockists">Stockists</a>
            <a href="#account">Account</a>
            <a href="#cart">Cart ({String(cartCount).padStart(2, "0")})</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero({ direction, accent }) {
  return (
    <section className={`hero ${direction === "studio" ? "hero--studio" : ""}`}>
      <div className={`hero__image ${direction === "court" ? "court-bg" : ""}`}>
        {direction === "court" && <CourtArt />}
      </div>
      <div className="grain"></div>
      <div className="wrap hero__inner">
        <div className="hero__meta">
          <div className="label">Est. 2024 — Los Angeles</div>
          <div className="label">No. 003 / Cotton Program</div>
        </div>

        <div className="hero__lockup">
          <div className="hero__tagline reveal" style={{"--d":"60ms"}}>
            <span className="bar"></span>
            Cotton for the court — and everywhere after.
          </div>
          <h1 className="hero__title reveal" style={{"--d":"160ms"}}>
            Base<span className="amp">·</span>line
            <span className="l2">Supply Co.</span>
          </h1>
        </div>

        <div className="hero__foot">
          <div className="hero__cta-wrap reveal" style={{"--d":"260ms"}}>
            <a href="#shop" className="btn btn--invert">
              Shop the collection
              <span className="arrow">→</span>
            </a>
          </div>
          <div className="hero__scrollhint">
            <span>Scroll</span>
            <span className="tick"></span>
          </div>
          <div className="hero__stat reveal" style={{"--d":"360ms"}}>
            <div><strong>14 oz</strong> heavyweight cotton</div>
            <div>Garment dyed · Made in LA</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* SVG-rendered court at golden hour — moody backdrop */
function CourtArt() {
  return (
    <svg
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        zIndex: 1, mixBlendMode: "screen", opacity: 0.85
      }}
      viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1108"/>
          <stop offset="40%" stopColor="#3a1f0e"/>
          <stop offset="68%" stopColor="#8a3f12"/>
          <stop offset="82%" stopColor="#d76321"/>
          <stop offset="100%" stopColor="#f0a046"/>
        </linearGradient>
        <radialGradient id="sun" cx="50%" cy="62%" r="40%">
          <stop offset="0%" stopColor="#ffd58a" stopOpacity="0.9"/>
          <stop offset="40%" stopColor="#f0a046" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#f0a046" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="court" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a1f0e" stopOpacity="0.0"/>
          <stop offset="20%" stopColor="#2a1a0e" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#0e0a06" stopOpacity="1"/>
        </linearGradient>
      </defs>
      {/* Sky */}
      <rect width="1600" height="620" fill="url(#sky)"/>
      <ellipse cx="800" cy="600" rx="520" ry="220" fill="url(#sun)"/>
      {/* Skyline silhouette */}
      <path d="M0,580 L60,560 L70,540 L90,540 L100,560 L160,558 L170,520 L210,520 L220,540 L300,540 L320,500 L360,500 L380,540 L460,540 L470,510 L510,510 L520,540 L600,540 L620,490 L660,490 L680,540 L780,540 L800,470 L840,470 L860,540 L960,540 L980,500 L1020,500 L1040,540 L1140,540 L1160,510 L1200,510 L1220,540 L1320,540 L1340,490 L1380,490 L1400,540 L1500,540 L1520,520 L1560,520 L1580,560 L1600,560 L1600,620 L0,620 Z"
            fill="#0b0805" opacity="0.92"/>
      {/* Court ground */}
      <rect y="600" width="1600" height="300" fill="url(#court)"/>
      {/* Court key lines (perspective) */}
      <g stroke="#d76321" strokeWidth="1.4" fill="none" opacity="0.55">
        <path d="M 200 900 L 720 620"/>
        <path d="M 1400 900 L 880 620"/>
        <path d="M 0 760 L 1600 760" opacity="0.25"/>
      </g>
      {/* Free throw arc + circle */}
      <g stroke="#d76321" strokeWidth="1.5" fill="none" opacity="0.5">
        <ellipse cx="800" cy="760" rx="320" ry="60"/>
        <ellipse cx="800" cy="760" rx="120" ry="22"/>
      </g>
      {/* Hoop pole + backboard, distant left */}
      <g opacity="0.85">
        <rect x="160" y="500" width="3" height="220" fill="#0b0805"/>
        <rect x="120" y="470" width="80" height="34" fill="#0b0805"/>
        <rect x="130" y="478" width="60" height="22" fill="none" stroke="#d76321" strokeWidth="1" opacity="0.5"/>
        <ellipse cx="160" cy="510" rx="18" ry="4" fill="none" stroke="#d76321" strokeWidth="1.4" opacity="0.7"/>
      </g>
      {/* Hoop pole right */}
      <g opacity="0.85">
        <rect x="1438" y="500" width="3" height="220" fill="#0b0805"/>
        <rect x="1398" y="470" width="80" height="34" fill="#0b0805"/>
        <rect x="1408" y="478" width="60" height="22" fill="none" stroke="#d76321" strokeWidth="1" opacity="0.5"/>
        <ellipse cx="1438" cy="510" rx="18" ry="4" fill="none" stroke="#d76321" strokeWidth="1.4" opacity="0.7"/>
      </g>
      {/* Lone figure silhouette */}
      <g transform="translate(770, 580)" fill="#0a0604">
        <ellipse cx="0" cy="10" rx="9" ry="11"/>
        <path d="M -10 22 Q 0 18 10 22 L 12 70 L 4 100 L -4 100 L -12 70 Z"/>
        <path d="M -12 30 L -22 70 L -16 72 L -8 36 Z"/>
        <path d="M 12 30 L 24 50 L 30 48 L 16 30 Z"/>
        <circle cx="26" cy="46" r="6" fill="#d76321" opacity="0.9"/>
      </g>
      {/* Atmospheric haze */}
      <rect width="1600" height="900" fill="#000" opacity="0.18"/>
    </svg>
  );
}

function Products({ onAdd }) {
  return (
    <section id="shop" className="products section-pad">
      <div className="wrap">
        <div className="section-head">
          <div className="reveal">
            <div className="eyebrow" style={{marginBottom:18, color:"var(--mute)"}}>
              <span style={{color:"var(--accent)"}}>●</span> &nbsp; Drop 03 · In stock now
            </div>
            <h2>
              The starting<br/>
              <span style={{color:"var(--accent)"}}>five.</span>
            </h2>
          </div>
          <div className="right reveal" style={{"--d":"120ms"}}>
            <div><span className="count">04</span> styles</div>
            <div>14 oz cotton</div>
            <div>Garment dyed</div>
            <div>Sizes XS — XXL</div>
          </div>
        </div>

        <div className="products__grid">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.name} p={p} onAdd={onAdd} delay={i * 80} />
          ))}
        </div>

        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:32}}>
          <div className="small" style={{color:"var(--mute)"}}>Free US shipping over $120 · 30-day returns</div>
          <a href="#shop" className="btn btn--ghost">
            View all 12 styles <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ p, onAdd, delay }) {
  const [added, setAdded] = useState(null);
  const handle = (size) => {
    setAdded(size);
    onAdd(p, size);
    setTimeout(() => setAdded(null), 1600);
  };
  return (
    <div className="card reveal" style={{"--d": `${delay}ms`}}>
      <div className="card__media">
        <span className="card__num">{p.n}</span>
        {p.badge && <span className="card__badge">{p.badge}</span>}
        <div className={p.teeClass} style={{"--teeColor": p.teeColor}}>
          <div className="tee__body"></div>
          <div className="tee__neck"></div>
          {p.pocket && <div className="tee__pocket"></div>}
        </div>
        <div className="card__quickadd">
          <span>{added ? `Added ${added}` : "Quick add"}</span>
          <div className="sizes">
            {["S","M","L","XL"].map(s => (
              <button key={s} onClick={(e)=>{e.stopPropagation(); handle(s);}}
                      className={added === s ? "added" : ""}>{s}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="card__row">
        <h3 className="card__name">{p.name}</h3>
        <span className="card__price mono">${p.price}</span>
      </div>
      <div className="card__meta">{p.sub}</div>
      <div className="card__colors">
        {p.colors.map((c,i)=>(
          <span key={i} className="swatch" style={{background:c}}></span>
        ))}
      </div>
    </div>
  );
}

function Story() {
  return (
    <section id="story" className="story section-pad">
      <div className="wrap story__grid">
        <div className="story__media reveal">
          <div className="tag">Field 014 — Venice Beach</div>
          <div className="floor"></div>
          <div className="court-line"></div>
          <div className="arc"></div>
          <div className="tag-r">35°N · 118°W</div>
        </div>

        <div className="story__copy">
          <div className="eyebrow reveal" style={{color:"var(--accent)", marginBottom:24}}>
            Chapter 01 — Why a tee
          </div>
          <h3 className="reveal" style={{"--d":"80ms"}}>
            Basketball deserves a better <span className="accent">tee.</span>
          </h3>
          <p className="story__lead reveal" style={{"--d":"160ms"}}>
            We grew up between the gym and the corner court. Most of what we wore was loud, licensed, and built to be loud again next season. Baseline is the opposite: garments cut for people who actually run pickup, who watch tape on the bus, who want something quiet enough to wear past the parking lot.
          </p>
          <p className="story__lead reveal" style={{"--d":"220ms"}}>
            Heavyweight 14 oz cotton. Garment dyed for depth and an honest hand. Cut and sewn in Los Angeles, in runs small enough to get every detail right.
          </p>

          <div className="spec-list reveal" style={{"--d":"300ms"}}>
            <div className="spec">
              <span className="spec__num">/ 01</span>
              <span className="spec__label">Heavyweight cotton</span>
              <span className="spec__value">14 oz · Pre-shrunk</span>
            </div>
            <div className="spec">
              <span className="spec__num">/ 02</span>
              <span className="spec__label">Garment dyed</span>
              <span className="spec__value">Reactive · Low-water</span>
            </div>
            <div className="spec">
              <span className="spec__num">/ 03</span>
              <span className="spec__label">Made in Los Angeles</span>
              <span className="spec__value">Cut · Sewn · Finished</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="features section-pad-sm">
      <div className="wrap">
        <div className="features__head">
          <h2 className="reveal">
            Built for <span className="accent">the game.</span>
          </h2>
          <div className="eyebrow reveal" style={{"--d":"100ms", color:"var(--mute)"}}>Three things, done right</div>
        </div>
      </div>

      <div className="wrap">
        <div className="features__grid">
          <Feature
            n="/ 01"
            visual={<IconCotton />}
            title="Heavyweight cotton"
            body="14 oz, single-origin combed cotton. Holds its shape through warmups, hard fouls, and the bus ride home."
            delay={0}
          />
          <Feature
            n="/ 02"
            visual={<IconDye />}
            title="Pre-shrunk, garment dyed"
            body="Each batch is washed and dyed after cutting, so the fit you try on is the fit you keep. Color settles deep, not on top."
            delay={120}
          />
          <Feature
            n="/ 03"
            visual={<IconHoop />}
            title="Designed by hoopers"
            body="Sleeve length, shoulder slope, body taper — every block tested in shootarounds before it ever hits the line."
            delay={240}
          />
        </div>
      </div>
    </section>
  );
}

function Feature({ n, visual, title, body, delay }) {
  return (
    <div className="feature reveal" style={{"--d": `${delay}ms`}}>
      <div className="feature__num">{n}</div>
      <div className="feature__visual">{visual}</div>
      <div>
        <h4>{title}</h4>
        <p>{body}</p>
      </div>
    </div>
  );
}

function IconCotton() {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="34" cy="42" r="18"/>
      <circle cx="58" cy="36" r="14"/>
      <circle cx="64" cy="58" r="16"/>
      <circle cx="40" cy="62" r="14"/>
      <path d="M 20 78 L 80 78" strokeWidth="1.2"/>
      <path d="M 28 84 L 72 84" strokeWidth="1.2" opacity="0.5"/>
      <text x="50" y="96" textAnchor="middle" fontSize="6.5" fontFamily="Geist Mono, monospace" fill="currentColor" stroke="none" letterSpacing="1.2">14 OZ</text>
    </svg>
  );
}
function IconDye() {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M 30 18 L 30 28 L 22 36 L 22 80 Q 22 86 28 86 L 72 86 Q 78 86 78 80 L 78 36 L 70 28 L 70 18 Z"/>
      <path d="M 30 28 L 70 28"/>
      <path d="M 22 56 Q 35 50 50 56 Q 65 62 78 56" stroke="var(--accent)"/>
      <path d="M 22 64 Q 35 58 50 64 Q 65 70 78 64" stroke="var(--accent)" opacity="0.6"/>
      <circle cx="50" cy="72" r="2" fill="currentColor" stroke="none"/>
    </svg>
  );
}
function IconHoop() {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="28" y="22" width="44" height="30"/>
      <rect x="40" y="32" width="20" height="14"/>
      <ellipse cx="50" cy="56" rx="14" ry="3.5" stroke="var(--accent)"/>
      <path d="M 38 58 L 36 78" />
      <path d="M 44 59 L 44 80" />
      <path d="M 50 60 L 50 81" />
      <path d="M 56 59 L 56 80" />
      <path d="M 62 58 L 64 78" />
      <path d="M 36 78 Q 50 84 64 78"/>
      <path d="M 50 52 L 50 18"/>
    </svg>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSent(true);
    setTimeout(() => { setSent(false); setEmail(""); }, 3200);
  };
  return (
    <section className="news section-pad">
      <div className="wrap news__inner">
        <div className="reveal">
          <div className="eyebrow" style={{color:"var(--accent)", marginBottom:24}}>
            ● &nbsp; Roster
          </div>
          <h2>
            Get early access<br/>to <span className="accent">drops.</span>
          </h2>
          <p className="news__sub">
            One email a month. Restocks, new fits, occasional in-person open runs. No spam, no countdowns, no urgency theater.
          </p>
        </div>
        <form className="news__form reveal" onSubmit={submit} style={{"--d":"160ms"}}>
          <div className="news__inputrow">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
            <button type="submit">
              {sent ? "Signed up" : "Subscribe"} <span>→</span>
            </button>
          </div>
          <div className="news__fine">
            <span>{sent ? <span className="news__success">● You're on the roster</span> : "No spam — unsubscribe anytime"}</span>
            <span className="mono" style={{letterSpacing:"0.1em"}}>EST. 2024</span>
          </div>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__top">
        <h2 className="footer__brand">Baseline<span className="dot">.</span></h2>
        <div className="footer__col">
          <h5>Shop</h5>
          <ul>
            <li><a href="#">All tees</a></li>
            <li><a href="#">The Baseline</a></li>
            <li><a href="#">Triple Threat</a></li>
            <li><a href="#">And One</a></li>
            <li><a href="#">Buzzer</a></li>
            <li><a href="#">Gift cards</a></li>
          </ul>
        </div>
        <div className="footer__col">
          <h5>Help</h5>
          <ul>
            <li><a href="#">Shipping</a></li>
            <li><a href="#">Returns &amp; exchanges</a></li>
            <li><a href="#">Sizing &amp; fit</a></li>
            <li><a href="#">Care guide</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="footer__col">
          <h5>Connect</h5>
          <ul>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">TikTok</a></li>
            <li><a href="#">Tumblr</a></li>
            <li><a href="#">Open runs</a></li>
            <li><a href="#">Stockists</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap footer__bottom">
        <div>© 2026 Baseline Supply Co. — Cut and sewn in Los Angeles, CA.</div>
        <div className="legal">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Accessibility</a>
        </div>
      </div>
    </footer>
  );
}

function Toast({ msg }) {
  return (
    <div className={`toast ${msg ? "show" : ""}`}>
      <span style={{color:"var(--accent)"}}>●</span>
      <span>{msg}</span>
    </div>
  );
}

function App() {
  useReveal();
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "accent": "court",
    "heroDirection": "court",
    "showMarquee": true
  }/*EDITMODE-END*/;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [cart, setCart] = useState(0);
  const [toast, setToast] = useState("");

  // Apply accent
  useEffect(() => {
    const root = document.documentElement;
    if (t.accent === "burgundy") {
      root.style.setProperty("--accent", "#6e1c25");
      root.style.setProperty("--accent-deep", "#4d1218");
    } else {
      root.style.setProperty("--accent", "#d76321");
      root.style.setProperty("--accent-deep", "#b04d14");
    }
  }, [t.accent]);

  const handleAdd = (p, size) => {
    setCart(c => c + 1);
    setToast(`${p.name} · ${size} added`);
    setTimeout(() => setToast(""), 1800);
  };

  return (
    <>
      <Nav cartCount={cart} />
      {t.showMarquee && <Marquee />}
      <Hero direction={t.heroDirection} accent={t.accent} />
      <Products onAdd={handleAdd} />
      <Story />
      <Features />
      <Newsletter />
      <Footer />
      <Toast msg={toast} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Hero">
          <TweakRadio
            label="Direction"
            value={t.heroDirection}
            onChange={v => setTweak("heroDirection", v)}
            options={["court", "studio"]}
          />
        </TweakSection>
        <TweakSection label="Accent color">
          <TweakColor
            label="Brand accent"
            value={t.accent === "burgundy" ? "#6e1c25" : "#d76321"}
            onChange={v => setTweak("accent", v === "#6e1c25" ? "burgundy" : "court")}
            options={["#d76321", "#6e1c25"]}
          />
        </TweakSection>
        <TweakSection label="Chrome">
          <TweakToggle
            label="Announcement marquee"
            value={t.showMarquee}
            onChange={v => setTweak("showMarquee", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
