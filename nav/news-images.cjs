const sharp = require('/home/ubuntu/gta7/node_modules/sharp')
const src = '/home/ubuntu/.claude/jobs/aa302669/tmp'
const out = '/home/ubuntu/gta7/public/media/news'
;(async () => {
  // Foto do letreiro: sem as barras de gradiente laterais que o post acrescentou.
  await sharp(`${src}/x-HR7SaIkWwAkuoMM.jpg`).extract({ left: 184, top: 0, width: 1612, height: 2048 }).resize({ width: 1400 }).webp({ quality: 82 }).toFile(`${out}/kaseya-center-vice-city-sign.webp`)
  await sharp(`${src}/x-HR6Ar3raUAAZdjI.jpg`).webp({ quality: 86 }).toFile(`${out}/miami-beach-campaign.webp`)
  await sharp(`${src}/x-HR4R5OvbIAA7PSR.jpg`).webp({ quality: 84 }).toFile(`${out}/rockstar-tribunal-32-players.webp`)
  await sharp(`${src}/x-HR4H8VnWUAQ1Ab5.jpg`).resize({ width: 1600 }).webp({ quality: 84 }).toFile(`${out}/tgs-2026-playstation-gta-vi-tshirt.webp`)
  for (const f of ['kaseya-center-vice-city-sign', 'miami-beach-campaign', 'rockstar-tribunal-32-players', 'tgs-2026-playstation-gta-vi-tshirt']) {
    const m = await sharp(`${out}/${f}.webp`).metadata()
    console.log(f, m.width, 'x', m.height)
  }
})()
