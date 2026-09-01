'use client'

// Technical mini-map module with simplified 3D buildings, pink route and player marker.
export default function MiniMap({ label = 'VICE CITY · 1.86 MI', className = '', route = 'M40,150 L110,150 L110,96 L196,96 L196,60 L268,60', marker = { x: 268, y: 60 }, start = { x: 40, y: 150 } }) {
  const buildings = [
    [22, 30, 40, 34], [76, 22, 30, 46], [120, 34, 44, 28], [178, 20, 34, 30],
    [230, 26, 40, 40], [26, 92, 34, 40], [130, 120, 40, 34], [190, 122, 30, 36],
    [238, 112, 44, 30], [70, 118, 40, 26], [222, 74, 26, 24],
  ]
  return (
    <div className={`relative overflow-hidden tech-mask border border-line bg-surface2 ${className}`}>
      <svg viewBox="0 0 300 180" className="w-full h-full" role="img" aria-label={`Mini map: ${label}`} preserveAspectRatio="xMidYMid slice">
        <rect width="300" height="180" fill="#131a24" />
        {/* water on the right */}
        <path d="M300,0 L300,180 L262,180 C276,140 270,110 282,70 C290,44 284,20 292,0 Z" fill="#0d1522" />
        {/* street grid */}
        <g stroke="#1d2633" strokeWidth="6">
          <line x1="0" y1="78" x2="300" y2="78" />
          <line x1="0" y1="150" x2="300" y2="150" />
          <line x1="110" y1="0" x2="110" y2="180" />
          <line x1="196" y1="0" x2="196" y2="180" />
          <line x1="56" y1="0" x2="56" y2="180" strokeWidth="3" />
        </g>
        {/* simplified 3D buildings: side + top */}
        <g>
          {buildings.map(([x, y, w, h], i) => (
            <g key={i}>
              <rect x={x + 4} y={y + 4} width={w} height={h} fill="#0a0f16" />
              <rect x={x} y={y} width={w} height={h} fill="#232d3c" />
              <rect x={x} y={y} width={w} height={5} fill="#31405a" />
            </g>
          ))}
        </g>
        {/* pink route */}
        <path d={route} fill="none" stroke="#F1A3C3" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={start.x} cy={start.y} r="6" fill="#F1A3C3" />
        {/* player marker */}
        <g transform={`translate(${marker.x},${marker.y})`}>
          <circle r="11" fill="#F5F4F0" />
          <circle r="9" fill="#07090E" />
          <path d="M0,-4.5 L4.5,4 L0,1.8 L-4.5,4 Z" fill="#F5F4F0" />
        </g>
      </svg>
      <span className="absolute top-2.5 left-3 font-cond font-semibold uppercase tracking-[0.12em] text-[13px] text-paper drop-shadow">{label}</span>
      <span className="absolute bottom-2.5 left-3 w-6 h-6 rounded-full bg-ink/80 border border-line flex items-center justify-center font-cond font-bold text-[11px] text-paper" aria-hidden="true">N</span>
    </div>
  )
}
