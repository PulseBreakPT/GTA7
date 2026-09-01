#!/usr/bin/env node
/**
 * Gera os ficheiros de imagem do site a partir do material oficial extraído
 * de media6, para public/media.
 *
 * Porquê um script e não imagens commitadas à mão: os originais são 4K a ~2 MB
 * cada e não servem para servir na web. Aqui escolhe-se a variante certa para
 * cada uso, redimensiona-se e converte-se para WebP. Correr de novo é seguro.
 *
 *   node scripts/gerar-media.js [pasta-do-material-extraido]
 *
 * A escolha das variantes não é arbitrária: as `square` e `portrait` das
 * personagens são cortes verticais do wallpaper que deixam as cabeças fora do
 * enquadramento, por isso os cartões usam as `landscape`.
 */
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const ORIGEM = process.argv[2] || '/home/ubuntu/media6-extraido'
const DESTINO = path.join(__dirname, '..', 'public', 'media')

const A = path.join(ORIGEM, 'GTAVI_Artwork_Wallpapers')
const V = path.join(ORIGEM, 'GTAVI_Vintage_Vice_City_Pack')
const U = path.join(ORIGEM, 'rec_Ultimate')
const S = path.join(ORIGEM, 'rec_Screenshots', 'Places')

// [origem, destino, largura]
const MAPA = [
  // --- Arte oficial ------------------------------------------------------
  [`${A}/Jason_and_Lucia_01/Jason_and_Lucia_01_ultrawide.jpg`, 'key-art/jason-lucia-car.webp', 2400],
  [`${A}/Jason_and_Lucia_02/Jason_and_Lucia_02_landscape.jpg`, 'key-art/jason-lucia-pier.webp', 2000],
  [`${A}/Jason_and_Lucia_Beach/Jason_and_Lucia_Beach_landscape.jpg`, 'key-art/jason-lucia-beach.webp', 2000],
  [`${A}/Jason_and_Lucia_Robbery/Jason_and_Lucia_Robbery_landscape.jpg`, 'key-art/jason-lucia-robbery.webp', 2000],
  [`${A}/Jason_Lucia_Motel/Jason_and_Lucia_Motel_landscape.jpg`, 'key-art/jason-lucia-motel.webp', 2000],
  [`${A}/Official_Cover_Art/Official_Cover_Art_landscape.jpg`, 'key-art/cover.webp', 2000],

  // --- Lugares: postais oficiais ----------------------------------------
  [`${A}/Postcards/Vice_City/Vice_City_Postcard_landscape.jpg`, 'places/vice-city.webp', 1600],
  [`${A}/Postcards/Ambrosia/Ambrosia_Postcard_landscape.jpg`, 'places/ambrosia.webp', 1600],
  [`${A}/Postcards/Grassrivers/Grassrivers_Postcard_landscape.jpg`, 'places/grassrivers.webp', 1600],
  [`${A}/Postcards/Leonida_Keys/Leonida_Keys_Postcard_landscape.jpg`, 'places/leonida-keys.webp', 1600],
  [`${A}/Postcards/Mount_Kalaga_National_Park/Mount_Kalaga_National_Park_Postcard_landscape.jpg`, 'places/mount-kalaga.webp', 1600],
  [`${A}/Postcards/Port_Gellhorn/Port_Gellhorn_Postcard_landscape.jpg`, 'places/port-gellhorn.webp', 1600],

  // --- Lugares: capturas de jogo ----------------------------------------
  [`${S}/Ambrosia/Ambrosia_01.jpg`, 'scenes/ambrosia-bikers.webp', 1600],
  [`${S}/Ambrosia/Ambrosia_02.jpg`, 'scenes/ambrosia-night.webp', 1600],
  [`${S}/Ambrosia/Ambrosia_03.jpg`, 'scenes/ambrosia-couple.webp', 1600],
  [`${S}/Ambrosia/Ambrosia_04.jpg`, 'scenes/ambrosia-sunset.webp', 1600],
  [`${S}/Ambrosia/Ambrosia_05.jpg`, 'scenes/ambrosia-drive.webp', 1600],
  [`${S}/Ambrosia/Ambrosia_06.jpg`, 'scenes/ambrosia-party.webp', 1600],
  [`${S}/Grassrivers/Grassrivers_02.jpg`, 'scenes/swamp-stilts.webp', 1600],
  [`${S}/Grassrivers/Grassrivers_03.jpg`, 'scenes/swamp-airboat.webp', 1600],
  [`${S}/Grassrivers/Grassrivers_04.jpg`, 'scenes/swamp-chase.webp', 1600],
  [`${S}/Grassrivers/Grassrivers_05.jpg`, 'scenes/swamp-skyline.webp', 1600],
  [`${S}/Grassrivers/Grassrivers_06.jpg`, 'scenes/swamp-gator.webp', 1600],
  [`${S}/Leonida Keys/Leonida_Keys_02.jpg`, 'scenes/keys-street.webp', 1600],
  [`${S}/Leonida Keys/Leonida_Keys_03.jpg`, 'scenes/keys-bar.webp', 1600],

  // --- Personagens (landscape: as outras variantes cortam as cabeças) ----
  [`${A}/Cal_Hampton/Cal_Hampton_landscape.jpg`, 'characters/cal-hampton.webp', 1400],
  [`${A}/Cal_Hampton/Cal_Hampton_portrait.jpg`, 'characters/cal-hampton-portrait.webp', 1000],
  [`${A}/Cal_Hampton/Cal_Hampton_phone.jpg`, 'characters/cal-hampton-phone.webp', 900],
  [`${A}/Boobie_Ike/Boobie_Ike_landscape.jpg`, 'characters/boobie-ike.webp', 1400],
  [`${A}/Boobie_Ike/Boobie_Ike_portrait.jpg`, 'characters/boobie-ike-portrait.webp', 1000],
  [`${A}/Boobie_Ike/Boobie_Ike_phone.jpg`, 'characters/boobie-ike-phone.webp', 900],
  [`${A}/DreQuan_Priest/DreQuan_Priest_landscape.jpg`, 'characters/drequan-priest.webp', 1400],
  [`${A}/DreQuan_Priest/DreQuan_Priest_portrait.jpg`, 'characters/drequan-priest-portrait.webp', 1000],
  [`${A}/DreQuan_Priest/DreQuan_Priest_phone.jpg`, 'characters/drequan-priest-phone.webp', 900],
  [`${A}/Raul_Bautista/Raul_Bautista_landscape.jpg`, 'characters/raul-bautista.webp', 1400],
  [`${A}/Raul_Bautista/Raul_Bautista_portrait.jpg`, 'characters/raul-bautista-portrait.webp', 1000],
  [`${A}/Raul_Bautista/Raul_Bautista_phone.jpg`, 'characters/raul-bautista-phone.webp', 900],
  [`${A}/Brian_Heder/Brian_Heder_landscape.jpg`, 'characters/brian-heder.webp', 1400],
  [`${A}/Brian_Heder/Brian_Heder_portrait.jpg`, 'characters/brian-heder-portrait.webp', 1000],
  [`${A}/Brian_Heder/Brian_Heder_phone.jpg`, 'characters/brian-heder-phone.webp', 900],
  [`${A}/Real_Dimez/Real_Dimez_landscape.jpg`, 'characters/real-dimez.webp', 1400],
  [`${A}/Real_Dimez/Real_Dimez_portrait.jpg`, 'characters/real-dimez-portrait.webp', 1000],
  [`${A}/Real_Dimez/Real_Dimez_phone.jpg`, 'characters/real-dimez-phone.webp', 900],
  // Não há arte oficial de cada protagonista sozinho; estes grandes planos
  // vêm do Vintage Vice City Pack, que veste os protagonistas.
  [`${V}/VINTAGE_VICE_CITY_PACK_EXCLUSIVE_LOOKS_02.jpg`, 'characters/lucia-caminos.webp', 1400],
  [`${V}/VINTAGE_VICE_CITY_PACK_EXCLUSIVE_LOOKS_05.jpg`, 'characters/jason-duval.webp', 1400],

  // --- Veículos ----------------------------------------------------------
  [`${V}/VINTAGE_VICE_CITY_PACK_VAPID_STANIER_01.jpg`, 'vehicles/stanier-night.webp', 1600],
  [`${V}/VINTAGE_VICE_CITY_PACK_VAPID_STANIER_02.jpg`, 'vehicles/stanier-crew.webp', 1600],
  [`${V}/VINTAGE_VICE_CITY_PACK_VAPID_STANIER_03.jpg`, 'vehicles/stanier-side.webp', 1600],
  [`${V}/VINTAGE_VICE_CITY_PACK_VAPID_STANIER_04.jpg`, 'vehicles/stanier-tail.webp', 1600],
  [`${U}/ULTIMATE_EDITION_WYMAN_CAR_COLLECTION_06.jpg`, 'vehicles/deviant-flag.webp', 1600],
  [`${U}/ULTIMATE_EDITION_02.jpg`, 'vehicles/green-coupe.webp', 1600],

  // --- Armas / equipamento ----------------------------------------------
  [`${V}/VINTAGE_VICE_CITY_WEAPON_PATTERN_01.jpg`, 'gear/weapon-pattern.webp', 1600],
  [`${V}/VINTAGE_VICE_CITY_PACK_EXCLUSIVE_LOOKS_03.jpg`, 'gear/pistol-palms.webp', 1600],
  [`${V}/VINTAGE_VICE_CITY_PACK_01.jpg`, 'gear/ocean-view.webp', 1600],
  [`${V}/VINTAGE_VICE_CITY_PACK_02.jpg`, 'gear/docks-crew.webp', 1600],

  // --- Ambiente ----------------------------------------------------------
  [`${U}/ULTIMATE_EDITION_ELECTRIC_FANG_01.jpg`, 'scenes/tattoo-neon.webp', 1600],
  [`${U}/ULTIMATE_EDITION_ELECTRIC_FANG_04.jpg`, 'scenes/tattoo-back.webp', 1600],
  [`${U}/ULTIMATE_EDITION_01.jpg`, 'scenes/ultimate-palms.webp', 1600],
]

;(async () => {
  let feitos = 0
  const faltam = []

  for (const [origem, relativo, largura] of MAPA) {
    if (!fs.existsSync(origem)) {
      faltam.push(relativo)
      continue
    }
    const alvo = path.join(DESTINO, relativo)
    fs.mkdirSync(path.dirname(alvo), { recursive: true })
    try {
      // failOn:'none' — três originais vieram de arquivos truncados; a parte
      // legível é reencodada num ficheiro válido em vez de se perder tudo.
      await sharp(origem, { failOn: 'none' })
        .resize({ width: largura, withoutEnlargement: true })
        .webp({ quality: 80, effort: 5 })
        .toFile(alvo)
      feitos++
    } catch (e) {
      faltam.push(`${relativo} (${e.message.slice(0, 50)})`)
    }
  }

  const total = execSizeMB(DESTINO)
  console.log(`geradas ${feitos}/${MAPA.length} imagens, ${total} MB em public/media`)
  if (faltam.length) {
    console.log('não geradas:')
    faltam.forEach((f) => console.log('  -', f))
  }
})()

function execSizeMB(dir) {
  let total = 0
  const andar = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name)
      if (e.isDirectory()) andar(p)
      else total += fs.statSync(p).size
    }
  }
  if (fs.existsSync(dir)) andar(dir)
  return (total / 1048576).toFixed(1)
}
