
// Cada ficha mexida com os resumos comunitários de 10 e 11 de Setembro de
// 2026 passa a mostrar a data dessa revisão (lib/revisions).
applyRevisions('character', characters)
applyRevisions('vehicle', vehicles)
applyRevisions('weapon', weapons)
applyRevisions('location', locations)
applyRevisions('faction', factions)
applyRevisions('radio', radioStations)
applyRevisions('mechanic', mechanics)
applyRevisions('editions', [{ slug: 'gta-vi', get updatedAt() { return editions.updatedAt }, set updatedAt(date) { editions.updatedAt = date } }])
