'use client'

// O terreno do mapa de Leonida: linha de costa, ilha-barreira, cayos,
// estradas e rótulos de região. Vive aqui em vez de dentro do mapa
// interactivo porque a ficha de cada local também o desenha, em ponto
// pequeno, para mostrar onde fica — e as duas têm de ser o mesmo desenho.
export const MAP_VBW = 1000
export const MAP_VBH = 620

// `labels` existe para a miniatura de um local: os rótulos de região estão
// dimensionados para o mapa inteiro e, num recorte aproximado, cobrem o
// próprio alvo que a miniatura serve para mostrar.
export default function MapTerrain({ labels = true }) {
  return (
    <>
    {/* water texture */}
    <g stroke="#C4D3E0" strokeWidth="1.5">
      {[...Array(12)].map((_, i) => <line key={i} x1={520 + i * 6} y1={40 + i * 46} x2={560 + i * 6} y2={40 + i * 46} />)}
    </g>
    {/* mainland */}
    <path d="M40,20 L560,20 L595,80 L615,150 L608,290 L565,375 L480,465 L350,515 L150,555 L55,515 L40,20 Z" fill="#F7F8FA" stroke="rgba(11,15,22,0.28)" strokeWidth="1.5" />
    {/* port gellhorn basin cut */}
    <path d="M120,58 L292,58 L292,92 L206,92 L206,126 L120,126 Z" fill="#DCE6EF" stroke="rgba(11,15,22,0.18)" strokeWidth="1" />
    {/* docks */}
    <g fill="#D3DCE6">
      <rect x="140" y="94" width="46" height="10" />
      <rect x="150" y="110" width="58" height="8" />
      <rect x="216" y="96" width="12" height="34" />
      <rect x="238" y="96" width="12" height="44" />
    </g>
    {/* grassrivers wetland texture */}
    <g stroke="#CBDAD2" strokeWidth="2.5" fill="none">
      {[[130,360],[190,405],[150,455],[230,470],[280,430],[210,350],[300,505],[120,505]].map(([x, y], i) => (
        <path key={i} d={`M${x},${y} q10,-8 20,0 q10,8 20,0`} />
      ))}
    </g>
    {/* vice city barrier island */}
    <path d="M655,115 C695,92 762,102 772,155 L788,295 C795,360 765,425 722,436 C688,443 660,412 656,358 L648,170 C647,148 648,122 655,115 Z" fill="#F2F4F7" stroke="rgba(11,15,22,0.3)" strokeWidth="1.5" />
    {/* beach edge */}
    <path d="M772,155 L788,295 C793,352 770,415 726,431" fill="none" stroke="#A9B6C7" strokeWidth="5" />
    {/* keys */}
    <g fill="#F2F4F7" stroke="rgba(11,15,22,0.26)" strokeWidth="1.5">
      <ellipse cx="655" cy="505" rx="30" ry="14" />
      <ellipse cx="712" cy="532" rx="26" ry="12" />
      <ellipse cx="768" cy="556" rx="24" ry="11" />
      <ellipse cx="822" cy="572" rx="20" ry="10" />
      <ellipse cx="874" cy="586" rx="18" ry="9" />
    </g>
    {/* roads */}
    <g stroke="#BFCAD8" strokeWidth="4" fill="none" strokeLinecap="round">
      <path d="M200,120 L420,130 L590,150 L660,190" />
      <path d="M180,380 L340,360 L520,330 L640,320" />
      <path d="M700,140 L700,420" />
      <path d="M672,200 L760,208 M668,260 L775,268 M664,320 L780,330 M668,380 L764,388" strokeWidth="2.5" />
      <path d="M712,436 L695,470 L655,505 L712,532 L768,556 L822,572 L874,586" strokeDasharray="7 5" strokeWidth="3" />
    </g>
    {/* region labels */}
    {labels && (
    <g fontFamily="var(--font-cond)" fontWeight="600" fill="#55606E" letterSpacing="3">
      <text x="150" y="180" fontSize="17">PORT GELLHORN</text>
      <text x="165" y="330" fontSize="17">GRASSRIVERS</text>
      <text x="686" y="96" fontSize="17">VICE CITY</text>
      <text x="760" y="525" fontSize="15">LEONIDA KEYS</text>
      {/* Sem estes dois rótulos, as regiões apareciam na lista lateral e
          o botão voava para um ponto vazio do mapa. Kalaga fica a norte e
          Ambrosia no centro, que é o que a Rockstar diz de cada uma. */}
      <text x="352" y="92" fontSize="17">MOUNT KALAGA</text>
      <text x="382" y="262" fontSize="17">AMBROSIA</text>
    </g>
    )}
    </>
  )
}
