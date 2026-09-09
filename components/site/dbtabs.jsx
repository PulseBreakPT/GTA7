// The former route-specific database navigation was removed so every route
// uses the same global header. This small evidence glyph remains shared by
// the weapons catalogue.
export function WeaponGlyph({ type, size = 18, className }) {
  const paths = {
    handgun: 'M2,10 h16 l2,2 v3 h-8 l-1.6,6 h-5 l1.8,-6 h-5.2 z M18,10 v-2 h-4 v2',
    shotgun: 'M1,11 h21 v2.4 h-9 l-2.4,5 h-4 l2.4,-5 h-8 z M22,11 l1.5,-3',
    smg: 'M3,9 h15 v3.6 h-4.4 v6 h-4 v-6 h-6.6 z M18,9 v-2.4 h-4 v2.4 M3,10.6 h-2.4',
    rifle: 'M0.5,11 h23 v2.2 h-7.6 l-1.4,5.4 h-3.4 l1.4,-5.4 h-9 z M23.5,11 l0,-2.6 h-3.6',
    heavy: 'M2,9 h18 v5 h-5 v5 h-5 v-5 h-8 z M20,10 h3 v3 h-3',
    explosives: 'M12,8 a6.4,6.4 0 1,0 0.01,0 z M12,8 l2.2,-3.6 h3 M17,3 a1.6,1.6 0 1,0 0.01,0',
    custom: 'M3,4 h18 v16 h-18 z M6,8 h12 M6,12 h12 M6,16 h12',
  }
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <path d={paths[type] || paths.handgun} fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  )
}
