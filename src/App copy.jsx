// =====================================================================
// DUKAAN MITRA — ALL-IN-ONE UPDATE (paste into your App.jsx)
// Includes: new theme · pro Today screen · your offers + promo video
//           (uses your existing OfferVideoContent, promoPoster, promoVideo)
//           · supplier "order" buttons removed
//
// STEPS
// 1) Replace DARK_C and LIGHT_C with the two objects in PART 1.
// 2) Paste PART 2 and PART 3 above `export default function DukaanMitraPrototype`.
// 3) In your big <style>{` ... `}</style>, add as the LAST line:  ${proCss(C)}
// 4) In DukaanMitraPrototype replace the HomeScreen line with:
//    {tab === "home" && <ProHomeScreen t={t} stock={stock} onScan={() => setShowScan(true)} onOpenReason={() => setShowReason(true)} onRecordSale={() => setActionMode("sale")} onAddProduct={() => setActionMode("add")} onOpenBrief={() => setShowBrief(true)} />}
// 5) In SupplierWindow (supplier order buttons):
//    a) replace  {cart.length > 0 && <div   with   {false && <div
//    b) replace  <div className="flex flex-wrap gap-1.5 mt-2">{supplier.products.map
//       with     <div hidden className="flex flex-wrap gap-1.5 mt-2">{supplier.products.map
// =====================================================================

// ------------------------- PART 1: theme tokens -------------------------
const DARK_C = {
  bgApp: "#070b0f", bezel1: "#111a22", bezel2: "#030507", screen: "#0b1117",
  card: "#111a22", cardAlt: "#17232d",
  border: "rgba(160,190,210,0.10)", borderStrong: "rgba(160,190,210,0.18)",
  text: "#e8eff5", sub: "#9db0bf", faint: "#6f8393",
  accent: "#2dd4a0", accent2: "#4aa3ff", gold: "#f5b83d", danger: "#f26b62", warn: "#f29a45",
  onAccent: "#04130e",
  hero: "linear-gradient(135deg, #0b2a3a 0%, #0d4f4a 58%, #0f6b5a 100%)",
  shadow: "0 1px 0 rgba(255,255,255,0.03) inset, 0 12px 28px -18px rgba(0,0,0,0.75)",
};
const LIGHT_C = {
  bgApp: "#eef2f6", bezel1: "#e3e9ef", bezel2: "#c5ced8", screen: "#f6f8fb",
  card: "#ffffff", cardAlt: "#eef2f6",
  border: "rgba(15, 30, 50, 0.09)", borderStrong: "rgba(15, 30, 50, 0.16)",
  text: "#0f1c2b", sub: "#4a5b6c", faint: "#7a8999",
  accent: "#0a8f6a", accent2: "#2563eb", gold: "#d99a0b", danger: "#d03a31", warn: "#d9731f",
  onAccent: "#ffffff",
  hero: "linear-gradient(135deg, #0f2a44 0%, #0e5a66 56%, #0a8f6a 100%)",
  shadow: "0 1px 2px rgba(15,30,50,0.05), 0 10px 26px -18px rgba(15,30,50,0.28)",
};

// ------------------------- PART 2: CSS layer -------------------------
function proCss(C) {
  return `
  .app-shell.app-shell { font-variant-numeric: tabular-nums;
    background: linear-gradient(${C.border} 1px, transparent 1px) 0 0 / 36px 36px,
      linear-gradient(90deg, ${C.border} 1px, transparent 1px) 0 0 / 36px 36px,
      radial-gradient(ellipse at 50% -10%, ${C.accent}14, transparent 55%), ${C.bgApp} !important; }
  .app-shell [class*="rounded-[20px]"], .app-shell .rounded-2xl { border-radius: 14px !important; }
  .app-shell [class*="rounded-[28px]"] { border-radius: 18px !important; }
  .app-shell [class*="rounded-[20px]"]:hover, .app-shell .rounded-2xl:hover { box-shadow: ${C.shadow} !important; border-color: ${C.borderStrong} !important; }
  .app-header > div:first-child { border-bottom: 1px solid rgba(255,255,255,.08); box-shadow: none !important; }
  .app-header > div:first-child > [aria-hidden="true"] { height: 4px !important; }
  .shop-banner::after, .hero-orb, .quick-action::after { display: none; }
  .awning-segment { animation: none; }
  .quick-action { background: ${C.card} !important; border: 1px solid ${C.border} !important; box-shadow: ${C.shadow} !important; border-radius: 14px !important; }
  .quick-action:hover { transform: none; border-color: ${C.accent}66 !important; }
  .bottom-nav { background: ${C.screen} !important; border-top: 1px solid ${C.border}; backdrop-filter: none; }
  .bottom-nav > div > div { background: ${C.card} !important; border-radius: 16px !important; box-shadow: none !important; border: 1px solid ${C.border} !important; }
  .bottom-nav .top-nav-button[style*="linear-gradient"] { background: ${C.accent} !important; box-shadow: none !important; }
  .app-shell button[style*="linear-gradient(90deg"] { background: ${C.accent} !important; box-shadow: none !important; border-radius: 10px !important; }
  .app-shell .field:focus-within, .app-shell .stock-search-box:focus-within { border-color: ${C.accent} !important; box-shadow: 0 0 0 3px ${C.accent}22; animation: none; }

  /* Pro Today screen */
  .pro-wrap { max-width: 1280px; margin: 0 auto; padding: 0 20px; display: grid; gap: 12px; }
  @media (min-width: 900px) { .pro-wrap { grid-template-columns: repeat(2, 1fr); } .pro-wrap > .pro-full, .pro-kpi-grid { grid-column: 1 / -1; } }
  .pro-status { display: flex; flex-wrap: wrap; gap: 14px; border-radius: 12px; padding: 9px 14px; font: 600 11.5px ${fontMono}; background: ${C.card}; border: 1px solid ${C.border}; color: ${C.faint}; }
  .pro-live { display: inline-block; width: 8px; height: 8px; margin-right: 6px; border-radius: 50%; background: ${C.accent}; animation: pulseDot 1.8s infinite; }
  .pro-kpi-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
  @media (min-width: 900px) { .pro-kpi-grid { grid-template-columns: repeat(4, 1fr); } }
  .pro-kpi { border-radius: 14px; padding: 14px; display: flex; flex-direction: column; gap: 12px; background: ${C.card}; border: 1px solid ${C.border}; box-shadow: ${C.shadow}; }
  .pro-kpi-top { display: flex; justify-content: space-between; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: ${C.sub}; }
  .pro-kpi-bottom { display: flex; justify-content: space-between; align-items: flex-end; gap: 8px; }
  .pro-kpi-bottom strong { font: 700 24px ${fontHead}; letter-spacing: -.03em; line-height: 1; color: ${C.text}; }
  .pro-delta { border-radius: 999px; padding: 3px 8px; font-size: 10.5px; font-weight: 700; white-space: nowrap; }
  .pro-signal { display: flex; align-items: flex-start; gap: 10px; border-radius: 12px; padding: 12px; margin-top: 8px; background: ${C.cardAlt}; border: 1px solid ${C.border}; }
  .pro-action { flex-shrink: 0; border: 1px solid; border-radius: 10px; padding: 6px 12px; font-size: 12px; font-weight: 700; background: transparent; }
  .pro-log-row { display: grid; grid-template-columns: 44px 8px 1fr; gap: 10px; align-items: baseline; padding: 8px 0; font-size: 12.5px; border-bottom: 1px solid ${C.border}; }
  .pro-log-row:last-child { border-bottom: 0; } .pro-log-row i { width: 8px; height: 8px; border-radius: 50%; align-self: center; }

  /* Your offers + promo video (recoloured to the new theme) */
  .pro-wrap .offer-video-content .mx-5 { margin-left: 0; margin-right: 0; }
  .offers-section-heading { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
  .offers-section-heading h2 { margin: 0; font: 700 15px ${fontHead}; color: ${C.text}; }
  .offers-section-heading span { font-size: 12px; color: ${C.faint}; }
  .offer-card { display: flex; align-items: center; justify-content: space-between; gap: 12px; border-radius: 14px; padding: 18px; min-height: 132px; color: #fff; background: linear-gradient(135deg, #0f2a44, #0e5a66 60%, #0a8f6a) !important; }
  .offer-card h3 { margin: 0 0 4px; font: 700 18px ${fontHead}; } .offer-card p { margin: 0 0 12px; opacity: .85; font-size: 13px; }
  .offer-cta { display: inline-flex; align-items: center; gap: 6px; background: #fff; color: #0f2a44; border: 0; border-radius: 10px; padding: 8px 14px; font-weight: 700; font-size: 13px; }
  .offer-pagination { display: flex; gap: 6px; justify-content: center; margin-top: 10px; }
  .offer-pagination button { width: 8px; height: 8px; border-radius: 99px; border: 0; padding: 0; background: ${C.borderStrong}; }
  .offer-pagination button.active { width: 22px; background: ${C.accent}; }
  .promo-video-card { border-radius: 14px; overflow: hidden; border: 1px solid ${C.border}; background: #000; box-shadow: ${C.shadow}; }
  .promo-video { display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover; }
  .promo-video-error { color: ${C.danger}; font-size: 12px; margin-top: 6px; }
  `;
}

// ------------------------- PART 3: pro Today screen -------------------------
function Sparkline({ values, color, w = 84, h = 28 }) {
  const max = Math.max(...values), min = Math.min(...values);
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * w},${h - 3 - ((v - min) / Math.max(max - min, 1)) * (h - 6)}`).join(" ");
  return <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true"><polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function KpiCard({ label, value, delta, up, values, tone }) {
  const c = up ? C.accent : C.danger;
  return (
    <div className="pro-kpi">
      <div className="pro-kpi-top"><span>{label}</span><span className="pro-delta" style={{ color: c, background: `${c}16` }}>{delta}</span></div>
      <div className="pro-kpi-bottom"><strong>{value}</strong><Sparkline values={values} color={tone} /></div>
    </div>
  );
}

function HealthRing({ pct, tone }) {
  const r = 38, circ = 2 * Math.PI * r;
  return (
    <svg width="92" height="92" viewBox="0 0 92 92" role="img" aria-label={`Inventory health ${pct}%`}>
      <circle cx="46" cy="46" r={r} fill="none" stroke={C.cardAlt} strokeWidth="9" />
      <circle cx="46" cy="46" r={r} fill="none" stroke={tone} strokeWidth="9" strokeLinecap="round" strokeDasharray={`${(pct / 100) * circ} ${circ}`} transform="rotate(-90 46 46)" />
      <text x="46" y="51" textAnchor="middle" fontSize="19" fontWeight="800" fill={C.text} fontFamily={fontHead}>{pct}%</text>
    </svg>
  );
}

function ForecastPanel() {
  const actual = umbrellaSeries;
  const future = [8, 9, 10].map((x) => Math.max(0, umbrellaRegression.intercept + umbrellaRegression.slope * x));
  const all = [...actual, ...future], n = actual.length;
  const W = 340, H = 130, P = 14, top = Math.max(...all) + umbrellaStd + 1;
  const x = (i) => P + (i * (W - P * 2)) / (all.length - 1), y = (v) => H - P - (v / top) * (H - P * 2);
  const line = actual.map((v, i) => `${x(i)},${y(v)}`).join(" ");
  const fLine = [actual[n - 1], ...future].map((v, i) => `${x(n - 1 + i)},${y(v)}`).join(" ");
  const band = [...future.map((v, i) => `${x(n + i)},${y(v + umbrellaStd)}`), ...[...future].reverse().map((v, i) => `${x(all.length - 1 - i)},${y(Math.max(0, v - umbrellaStd))}`)].join(" ");
  return (
    <GlassCard className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[14px] font-extrabold" style={{ color: C.text, fontFamily: fontHead }}>Demand forecast · Umbrellas</p>
          <p className="mt-0.5 text-[11px]" style={{ color: C.faint }}>Linear regression · 7-day history · 3-day horizon</p>
        </div>
        <ConfidenceBadge text="82% CONF." />
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full" style={{ height: 140 }} role="img" aria-label="Demand forecast chart">
        {[0.25, 0.5, 0.75].map((r) => <line key={r} x1={P} x2={W - P} y1={P + r * (H - P * 2)} y2={P + r * (H - P * 2)} stroke={C.border} strokeDasharray="3 5" />)}
        <polygon points={band} fill={C.gold} opacity=".18" />
        <polyline points={line} fill="none" stroke={C.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points={fLine} fill="none" stroke={C.gold} strokeWidth="3" strokeDasharray="6 5" strokeLinecap="round" />
        {all.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r="3.2" fill={i < n ? C.accent : C.gold} />)}
      </svg>
    </GlassCard>
  );
}

function SignalFeed({ onOpenReason }) {
  const rows = [
    { icon: Umbrella, tone: C.danger, title: "Stock-out risk: Umbrella", body: "3 units left against a forecast of 9–11 per day.", src: "POS velocity + Weather API", conf: stockOutProbability, action: "Reorder" },
    { icon: Flame, tone: C.warn, title: "Demand spike: Cold drink 750ml", body: "Footfall near the school is up. Move stock to the front shelf.", src: "Local events feed", conf: 74, action: "Review" },
    { icon: CalendarDays, tone: C.accent, title: "Seasonal lift expected", body: "Festival items usually sell about 3× in the 9 days before the event.", src: "Seasonality model", conf: 68, action: "Plan" },
  ];
  return (
    <GlassCard className="p-4">
      <p className="text-[14px] font-extrabold" style={{ color: C.text, fontFamily: fontHead }}>AI signals</p>
      {rows.map((r) => (
        <div key={r.title} className="pro-signal" style={{ borderLeft: `3px solid ${r.tone}` }}>
          <IconBadge icon={r.icon} tone={r.tone} size={34} />
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-bold leading-tight" style={{ color: C.text }}>{r.title}</p>
            <p className="mt-1 text-[12px] leading-snug" style={{ color: C.sub }}>{r.body}</p>
            <p className="mt-1.5 text-[10.5px]" style={{ color: C.faint, fontFamily: fontMono }}>Source: {r.src} · {r.conf}% confidence</p>
          </div>
          <button type="button" onClick={onOpenReason} className="pro-action" style={{ color: r.tone, borderColor: `${r.tone}55` }}>{r.action}</button>
        </div>
      ))}
    </GlassCard>
  );
}

function ActivityLog() {
  const log = [["09:42", "Sale recorded", "Parle-G × 4", C.accent], ["09:15", "Stock alert raised", "Umbrella below safety level", C.danger], ["08:50", "Forecast refreshed", "Rain probability 71%", C.accent2], ["08:30", "Cloud sync complete", "All devices up to date", C.faint]];
  return (
    <GlassCard className="p-4">
      <p className="text-[14px] font-extrabold mb-2" style={{ color: C.text, fontFamily: fontHead }}>System activity</p>
      {log.map(([time, title, detail, tone]) => (
        <div key={time} className="pro-log-row">
          <span style={{ color: C.faint, fontFamily: fontMono }}>{time}</span><i style={{ background: tone }} />
          <div className="min-w-0"><b style={{ color: C.text }}>{title}</b><span style={{ color: C.sub }}> — {detail}</span></div>
        </div>
      ))}
    </GlassCard>
  );
}

function ProHomeScreen({ t, stock, onOpenReason, onRecordSale, onAddProduct, onScan, onOpenBrief }) {
  const low = stock.filter((s) => s.qty < s.min);
  const health = Math.round(((stock.length - low.length) / Math.max(stock.length, 1)) * 100);
  const tone = health >= 75 ? C.accent : health >= 50 ? C.warn : C.danger;
  const latest = monthlyFinancials[monthlyFinancials.length - 1];
  const margin = Math.round(((latest.revenue - latest.expenses) / latest.revenue) * 100);
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });
  return (
    <main className="offers-screen flex-1 overflow-y-auto pb-6">
      <Header title={`${t.greeting}, ${USER.owner}`} subtitle={`${today} · Synced just now`} />
      <div className="pro-wrap">
        <div className="pro-status pro-full">
          <span style={{ color: C.text }}><i className="pro-live" />Live</span>
          <span>Store ID DM-{(USER.phone || "0000").slice(-4)}</span><span>{USER.area}</span>
        </div>
        <div className="pro-kpi-grid">
          <KpiCard label={t.statSales} value="₹4,280" delta="↗ 8.2%" up values={[15, 21, 17, 29, 25, 37, 32]} tone={C.accent} />
          <KpiCard label="Net margin" value={`${margin}%`} delta="↗ 2.1 pts" up={margin >= 0} values={[9, 11, 10, 12, 13, 14, margin]} tone={C.accent2} />
          <KpiCard label={t.statLow} value={`${low.length}`} delta={low.length ? "Action" : "Clear"} up={!low.length} values={[1, 1, 2, 2, 3, 2, low.length]} tone={C.danger} />
          <KpiCard label={t.pending} value="₹1,920" delta="2 people" up={false} values={[900, 1100, 1500, 1300, 1700, 1800, 1920]} tone={C.warn} />
        </div>
        <GlassCard className="p-4">
          <div className="flex items-center gap-4">
            <HealthRing pct={health} tone={tone} />
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-extrabold" style={{ color: C.text, fontFamily: fontHead }}>{t.stockLevelsTitle}</p>
              <p className="mt-1 text-[12px] leading-snug" style={{ color: C.sub }}>{stock.length - low.length} of {stock.length} products are above safety level.</p>
              <button type="button" onClick={onOpenBrief} className="pro-action mt-2" style={{ color: C.accent, borderColor: `${C.accent}55` }}>{t.viewBrief}</button>
            </div>
          </div>
        </GlassCard>
        <div className="grid grid-cols-3 gap-2">
          <QuickAction icon={ShoppingCart} label={t.recordSale} onClick={onRecordSale} tone={C.accent} />
          <QuickAction icon={PackagePlus} label={t.addProduct} onClick={onAddProduct} tone={C.warn} />
          <QuickAction icon={ScanLine} label={t.scan} onClick={onScan} tone={C.accent2} />
        </div>
        <SignalFeed onOpenReason={onOpenReason} />
        <ForecastPanel />
        {/* YOUR offers carousel + promo video (uses promoPoster / promoVideo imports) */}
        <div className="pro-full"><OfferVideoContent onOpenReason={onOpenReason} /></div>
        <div className="pro-full"><ActivityLog /></div>
      </div>
    </main>
  );
}