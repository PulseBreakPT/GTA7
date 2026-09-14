'use client'

import Image from 'next/image'
import { Eye, Car, CarFront, Bike, Sailboat, Bus, Truck, Train, Siren, Construction, Wrench } from 'lucide-react'
import { cx } from './ui'

// Um id sem ícone aqui devolve `undefined` e parte a renderização da página
// inteira, por isso o fallback é obrigatório, não uma cortesia.
export const CLASS_ICONS = { all: Eye, muscle: Car, sports: CarFront, classics: Car, motorcycles: Bike, boats: Sailboat, aircraft: CarFront, offroad: Car,
  sedans: Car, suvs: CarFront, vans: Bus, trucks: Truck, trains: Train, cycles: Bike, emergency: Siren, industrial: Construction, service: Wrench }
export const classIcon = (id) => CLASS_ICONS[id] || Car

// A imagem de um veículo, com o mesmo fallback em toda a parte: sem captura
// oficial aparece o ícone da classe e diz-se que falta a imagem, em vez de
// se emprestar a fotografia de outro carro. Vive aqui, e não dentro da
// garagem, porque a ficha de cada veículo mostra os da mesma classe e as
// duas listas têm de dizer o mesmo sobre o que existe e o que não existe.
export default function VehicleVisual({ v, className, sizes = '220px', priority = false }) {
  const pos = className && className.includes('absolute') ? '' : 'relative'
  if (v.image) {
    return (
      <span className={cx(pos, 'block overflow-hidden', className)}>
        <Image src={v.image} alt={v.name} fill priority={priority} sizes={sizes} className="object-cover" />
      </span>
    )
  }
  const Icon = classIcon(v.cls)
  return (
    <span className={cx('flex flex-col items-center justify-center gap-2 bg-surface2/60 text-dim', className)} role="img" aria-label={`${v.name}: visual pending`}>
      <Icon size={30} aria-hidden="true" />
      <span className="font-mono text-[9px] uppercase tracking-[0.22em]">AWAITING VISUAL</span>
    </span>
  )
}
