'use client'

import Image from 'next/image'
import { Crosshair } from 'lucide-react'
import { cx } from './ui'

// A imagem de uma arma, com o mesmo fallback em toda a parte: sem captura
// oficial fica a mira e a palavra «CLASSIFIED», em vez de se emprestar a
// fotografia de outra arma. Vive aqui, e não dentro do arsenal, porque a
// ficha de cada arma mostra as do mesmo tipo e as duas listas têm de dizer
// o mesmo sobre o que existe e o que não existe.
export default function WeaponVisual({ w, className, sizes = '160px', priority = false }) {
  if (w.image) {
    return (
      <span className={cx('relative block overflow-hidden', className)}>
        <Image src={w.image} alt={w.name} fill priority={priority} sizes={sizes} className="object-cover" />
        <span className="absolute inset-0 bg-ink/35" aria-hidden="true" />
      </span>
    )
  }
  return (
    <span className={cx('flex flex-col items-center justify-center gap-1.5 bg-surface2/60 text-dim', className)} role="img" aria-label={`${w.name}: visual pending`}>
      <Crosshair size={22} aria-hidden="true" />
      <span className="font-mono text-[8px] uppercase tracking-[0.2em]">CLASSIFIED</span>
    </span>
  )
}
