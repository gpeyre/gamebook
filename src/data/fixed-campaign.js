const l = (fr, en) => ({ fr, en });

// Authored, finite choices for the book mode.  The engine does not know any of
// these identifiers: it only reads choices, conditions, effects, and prose.
const WORLD_EXPANSION_SCENES = {
  festival_arcade: {
    title: l("La galerie des lanternes", "The lantern arcade"),
    description: l("Au-dessus de la faille, les marchands ont suspendu des centaines de lanternes de papier entre les arcades. Leur lumière rend les masques plus beaux et les mensonges plus faciles. Dans la foule, une cartographe aveugle au monde mais attentive aux voix vend des plans qui ne figurent sur aucun registre municipal.", "Above the chasm, merchants have strung hundreds of paper lanterns between the arcades. Their light makes masks lovelier and lies easier. In the crowd, a cartographer blind to the world but attentive to voices sells maps that appear in no municipal register."),
    revisitDescription: l("La galerie n'est plus tout à fait une fête depuis que vous savez ce qui dort sous les pavés. Les lanternes tremblent dans le vent venu de la faille, et chaque rire paraît trop bref.", "The arcade is no longer quite a festival now that you know what sleeps beneath the paving stones. Lanterns tremble in the wind from the chasm, and every laugh seems too brief."),
  },
  secret_map_stall: {
    title: l("L'étal des cartes sans nord", "The stall of northless maps"),
    description: l("La cartographe déplie une peau de poisson traitée à l'huile. Les rues de Laelith y sont dessinées comme des ruisseaux, et les égouts comme des constellations. Elle vous indique un ancien chenal reliant les douanes, le verger royal et les galeries Utruz, puis referme la carte avant que quiconque puisse la voir.", "The cartographer unfolds a fish-skin treated with oil. Laelith's streets are drawn upon it as streams, and its sewers as constellations. She points out an ancient channel linking the customs house, the royal orchard, and the Utruz galleries, then closes the map before anyone else can see it."),
  },
  canal_steps: {
    title: l("Les marches du canal", "The canal steps"),
    description: l("Les marches descendent entre deux maisons aux façades inclinées. Ici, le festival n'a jamais vraiment commencé : on lave le linge, on répare les filets, on regarde les portes avec l'inquiétude de ceux qui vivent au niveau de l'eau. Un passeur âgé connaît les raccourcis, mais il ne donne rien à ceux qui semblent déjà trop pressés.", "The steps descend between two houses with leaning façades. Here the festival never truly began: people wash linen, mend nets, and watch the gates with the unease of those who live at water level. An old ferryman knows the shortcuts, but gives nothing to those who already seem too hurried."),
  },
  old_customs: {
    title: l("Les douanes fermées", "The closed customs house"),
    description: l("Derrière une porte de cuivre, les anciennes douanes sentent le sel, la poussière et l'encre moisie. Les livres de passage remontent à des décennies; dans les derniers feuillets, les mêmes caisses de Souleyna apparaissent sous trois noms différents. La fraude est trop soigneuse pour être le travail de simples mercenaires.", "Behind a copper door, the old customs house smells of salt, dust, and mouldering ink. Its ledgers of passage reach back decades; in the latest folios, the same Souleyna crates appear under three different names. The fraud is too careful to be the work of simple mercenaries."),
    narrativeLayers: [{ priority: 20, requires: { path: "state.flags.foundManifest", equals: true }, text: l("Le manifeste récupéré sur la barge complète les colonnes du registre. Deux preuves qui s'accordent ainsi ne sont plus une intuition : elles sont une accusation.", "The manifest recovered from the barge completes the ledger's columns. Two pieces of evidence that agree so closely are no longer intuition: they are an accusation.") }],
  },
  river_shrine: {
    title: l("Le sanctuaire des rives", "The riverside shrine"),
    description: l("Une niche de pierre protège une statue sans visage, polie par des générations de mains mouillées. Des bateliers y ont laissé du pain, des rubans et un bol de sel. La prêtresse qui garde le sanctuaire ne vous demande pas qui vous êtes; elle demande seulement si vous avez déjà choisi de laisser quelqu'un derrière vous.", "A stone niche shelters a faceless statue, polished by generations of wet hands. Boatmen have left bread, ribbons, and a bowl of salt there. The priestess who keeps the shrine does not ask who you are; she asks only whether you have ever chosen to leave someone behind."),
  },
  echo_well: {
    title: l("Le puits des échos", "The echo well"),
    description: l("Le puits est plus ancien que les maisons qui l'entourent. Lorsque vous y laissez tomber un caillou, le bruit revient trois fois : d'abord comme une chute, puis comme un pas, enfin comme un coup de marteau très loin sous la ville. Une galerie étroite s'ouvre derrière son mur de soutènement.", "The well is older than the houses around it. When you drop a pebble, the sound returns three times: first as a fall, then as a footstep, finally as a hammer blow far beneath the city. A narrow gallery opens behind its retaining wall."),
  },
  moss_orchard: {
    title: l("Le verger sous la vase", "The orchard beneath the silt"),
    description: l("Des troncs torsadés percent la vase comme des doigts. C'était autrefois le verger d'une maison de plaisance, avant que la rivière ne change de lit. Les pommes noires qui pendent encore aux branches ne sont pas comestibles, mais leurs feuilles portent une poudre qui calme les plaies et révèle les traces de métal sur la peau.", "Twisted trunks pierce the silt like fingers. This was once the orchard of a pleasure house before the river changed course. The black apples still hanging from branches are inedible, but their leaves bear a powder that soothes wounds and reveals metal traces on skin."),
  },
  collapsed_baths: {
    title: l("Les bains effondrés", "The collapsed baths"),
    description: l("Sous les jalons de limon, une voûte de briques mène à des bains romains oubliés. Les mosaïques sont fendues, mais une frise montre les mêmes quatre anneaux que les boucliers. Dans le bassin vidé, des traces de bottes blanches convergent vers une grille que quelqu'un a forcée récemment.", "Beneath the silt gauges, a brick vault leads to forgotten Roman baths. The mosaics are cracked, yet one frieze shows the same four rings as the shields. In the drained basin, white boot prints converge on a grille someone forced open recently."),
  },
  counterweight_loft: {
    title: l("Le grenier des contrepoids", "The counterweight loft"),
    description: l("Au-dessus de la chambre des portes, des blocs de fonte sont suspendus par des chaînes grosses comme des poignets. Les saboteurs ont marqué l'un d'eux d'un trait de craie : en le libérant, ils auraient fait tomber la herse au pire instant. Un escalier de service grimpe vers une plateforme d'observation, hors de la vue des ouvriers.", "Above the gate chamber, blocks of cast iron hang from chains as thick as wrists. Saboteurs have marked one with chalk: releasing it would drop the portcullis at the worst possible moment. A service stair climbs toward an observation platform, out of the workers' sight."),
  },
  watch_platform: {
    title: l("La plateforme des veilleurs", "The watchers' platform"),
    description: l("De cette hauteur, Laelith paraît paisible : rubans, terrasses et toits de cuivre autour d'un ruban de rivière absent. Mais vous voyez aussi les positions des quatre boucliers et les ruelles qu'ils visent. Le complot ne menace pas une abstraction appelée la ville; il vise des maisons, des marchés et des familles précises.", "From this height, Laelith looks peaceful: ribbons, terraces, and copper roofs around an absent ribbon of river. But you can also see the positions of the four shields and the lanes they target. The plot does not threaten an abstraction called the city; it targets particular homes, markets, and families."),
  },
  archive_cloister: {
    title: l("Le cloître des comptes", "The cloister of accounts"),
    description: l("Le cloître municipal est fermé pour la fête, mais une fenêtre basse donne sur une salle de copie. Des archivistes ont laissé sécher leurs encres près d'un brasero. Dans un tiroir scellé, vous trouvez des lettres de transport portant le même code que le manifeste de Valdrick — et la contre-signature d'un conseiller de Laelith.", "The municipal cloister is closed for the festival, but a low window opens onto a copying room. Archivists have left their inks to dry near a brazier. In a sealed drawer, you find transport letters bearing the same code as Valdrick's manifest—and the countersignature of a Laelith councillor."),
  },
  council_antechamber: {
    title: l("L'antichambre du Conseil", "The Council antechamber"),
    description: l("Des tapis épais étouffent les pas devant les portes du Conseil. Les gardes vous arrêtent d'abord, puis reconnaissent le sergent, les voyageurs, ou la panique dans vos yeux. Ici, une preuve bien présentée pèse autant qu'une arme : le temps gagné par un mot juste peut sauver davantage qu'un coup porté dans les galeries.", "Thick carpets muffle footsteps outside the Council doors. Guards stop you at first, then recognize the sergeant, the travellers, or the panic in your eyes. Here, well-presented proof weighs as much as a weapon: time gained by the right word can save more than a blow struck in the galleries."),
  },
  glasswright_yard: {
    title: l("La cour des verriers", "The glasswrights' yard"),
    description: l("La fournaise des verriers continue de brûler malgré la fête. Les apprentis soufflent des sphères bleues destinées à flotter sur la rivière au retour des eaux. Leur maîtresse reconnaît immédiatement la poudre grise venue des vannes : elle entre dans le verre de signalisation, et ne devrait jamais se trouver sur un chantier.", "The glasswrights' furnace keeps burning despite the festival. Apprentices blow blue spheres meant to float upon the river when the water returns. Their mistress immediately recognizes the grey powder from the sluices: it belongs in signalling glass and should never be on a worksite."),
  },
  moonfish_tavern: {
    title: l("L'auberge du Poisson-Lune", "The Moonfish tavern"),
    description: l("Sous un plafond bas, l'auberge sent la bière épicée et les manteaux mouillés. Les bateliers parlent bas autour d'une table vide, réservée d'ordinaire aux messagers de Souleyna. La patronne garde les yeux sur les portes, mais son livre de comptes est ouvert à une page que personne n'a encore eu le temps de fermer.", "Beneath a low ceiling, the tavern smells of spiced beer and wet cloaks. Boatmen speak quietly around an empty table, usually reserved for Souleyna's messengers. The landlady keeps her eyes on the doors, but her account book lies open to a page no one has yet had time to close."),
  },
  paper_bridge: {
    title: l("Le pont de papier", "The paper bridge"),
    description: l("Le pont relie deux rangées de maisons par une arche si fine qu'on l'appelle le pont de papier. Des courriers y croisent des vendeurs de feuilles votives. En contrebas, une barque sans rameur dérive contre une pile; son fond porte des rayures fraîches, comme si l'on y avait récemment chargé une caisse trop lourde.", "The bridge joins two rows of houses by an arch so thin it is called the paper bridge. Couriers cross it beside sellers of votive sheets. Below, a rowboat without oars drifts against a piling; fresh scratches mark its bottom, as though a crate too heavy had recently been loaded aboard."),
  },
  undersluice_dock: {
    title: l("Le quai sous les vannes", "The dock beneath the sluices"),
    description: l("Un quai de service court sous les arches de la ville. Les amarres grincent dans des anneaux rouillés, et le courant absent a laissé des algues comme des cheveux sur la pierre. Une porte de cale conduit vers les tunnels, une autre vers les coursiers qui longent le canal sans jamais monter à la fête.", "A service dock runs beneath the city's arches. Moorings creak in rusted rings, and the absent current has left algae like hair upon the stone. One hold door leads to the tunnels, another toward couriers who follow the canal without ever joining the festival."),
  },
  seal_vault: {
    title: l("La chambre des sceaux", "The seal vault"),
    description: l("Sous les douanes, une petite salle protège les matrices de plomb qui donnent une identité aux cargaisons. Plusieurs portent les mêmes imperfections que les caisses de Souleyna. Une matrice est récente, trop récente : quelqu'un a fabriqué de faux passages avec l'autorité même de Laelith.", "Beneath the customs house, a small room protects the lead dies that grant cargoes an identity. Several bear the same imperfections as Souleyna's crates. One die is recent, far too recent: someone has forged passages using Laelith's own authority."),
  },
  embassy_vestry: {
    title: l("La sacristie de l'ambassade", "The embassy vestry"),
    description: l("Derrière la chapelle diplomatique, une sacristie minuscule sert à ranger les cadeaux officiels. Les rubans de Souleyna y côtoient des cierges et des reçus. Dans un coffret, une liste de visiteurs indique que le conseiller de Laelith a rencontré Valdrick trois nuits de suite, toujours après minuit.", "Behind the diplomatic chapel, a tiny vestry stores official gifts. Souleyna ribbons sit beside candles and receipts. In a casket, a visitor list shows that Laelith's councillor met Valdrick three nights in succession, always after midnight."),
  },
  ember_observatory: {
    title: l("L'observatoire des braises", "The ember observatory"),
    description: l("Une ancienne tour de guet domine les portes. Son astronome a remplacé les étoiles par des braises dans des coupelles de cuivre : chacune marque une pression, une marée ou une alarme. La dernière braise, rouge sombre, porte le signe des quatre boucliers et tremble déjà avant l'heure blanche.", "An old watchtower overlooks the gates. Its astronomer has replaced stars with embers in copper cups: each marks a pressure, a tide, or an alarm. The last ember, dark red, bears the sign of the four shields and already trembles before the white hour."),
  },
  rooftop_cistern: {
    title: l("La citerne des toits", "The rooftop cistern"),
    description: l("La citerne recueille les pluies rares de Laelith sous un dais de tuiles. D'ici, les messagers peuvent passer d'une terrasse à l'autre sans toucher les rues. Une corde de linge tendue vers l'ambassade porte un minuscule plomb de cachetage; le réseau n'est pas seulement souterrain, il vit aussi au-dessus des têtes.", "The cistern gathers Laelith's rare rain beneath a canopy of tiles. From here, messengers can pass from terrace to terrace without touching the streets. A clothesline drawn toward the embassy bears a tiny sealing lead; the network is not only underground, it also lives above people's heads."),
  },
  hidden_scriptorium: {
    title: l("Le scriptorium caché", "The hidden scriptorium"),
    description: l("Derrière le cloître, une salle murée a été rouverte par un seul battant. Des copistes y reproduisent des documents officiels avec une précision presque religieuse. Les papiers de Valdrick ont été recopiés ici, mais une main différente a ajouté les annotations donnant les quartiers pauvres comme zones 'acceptables de débordement'.", "Behind the cloister, a walled room has been reopened by a single shutter. Scribes reproduce official documents there with near-religious precision. Valdrick's papers were copied here, but a different hand added annotations marking poor wards as 'acceptable overflow zones'."),
  },
  tribunal_gallery: {
    title: l("La galerie du Tribunal", "The Tribunal gallery"),
    description: l("La galerie surplombe une salle de justice vide. Les portraits des anciens magistrats surveillent les bancs avec une dignité usée. Une trappe derrière un tableau mène à l'antichambre du Conseil : le chemin qu'empruntent les dossiers trop embarrassants pour passer par les couloirs publics.", "The gallery overlooks an empty court of justice. Portraits of old magistrates watch the benches with worn dignity. A hatch behind one painting leads to the Council antechamber: the route used by files too embarrassing to pass through public corridors."),
  },
  salt_market: {
    title: l("Le marché du sel bleu", "The blue-salt market"),
    description: l("Les paniers de sel bleu sont ouverts comme des fleurs minérales. Des pêcheuses y échangent des nouvelles contre des poignées de cristaux; elles savent que les coursiers de Souleyna ne paient jamais en cuivre, et que leurs bottes ne touchent jamais deux fois le même quai.", "Baskets of blue salt lie open like mineral flowers. Fishers trade news for handfuls of crystals; they know Souleyna's couriers never pay in copper, and that their boots never touch the same quay twice."),
    revisitDescription: l("Vous reconnaissez désormais les regards qui suivent votre groupe entre les paniers. Le marché reste bruyant, mais sa rumeur a pris la forme d'un avertissement.", "You now recognize the glances following your party between the baskets. The market remains noisy, but its murmur has taken the shape of a warning."),
  },
  ropewalk: {
    title: l("La corderie suspendue", "The hanging ropewalk"),
    description: l("Une longue galerie de bois relie les toits au-dessus d'un bras mort du canal. Des cordiers y tressent le chanvre en avançant à reculons; leurs bobines portent de petites marques de couleur que seuls les bateliers savent lire. Certaines correspondent aux caisses de Souleyna.", "A long wooden gallery links rooftops above a dead arm of the canal. Ropemakers braid hemp while walking backwards; their spools bear small coloured marks only boatmen know how to read. Some match Souleyna's crates."),
  },
  drowned_post: {
    title: l("Le relais noyé", "The drowned post"),
    description: l("Une ancienne poste fluviale dort à demi sous la boue. Ses casiers de laiton gardent des lettres gonflées d'eau, et les pigeonniers vides battent au vent. Un employé a continué de trier le courrier jusqu'à la dernière inondation : son registre est encore là, protégé dans une boîte à thé.", "An old river post lies half asleep beneath the mud. Its brass pigeonholes keep water-swollen letters, and empty dovecotes beat in the wind. One clerk kept sorting mail until the last flood: their ledger is still here, protected in a tea tin."),
  },
  tide_library: {
    title: l("La bibliothèque des marées", "The tide library"),
    description: l("Derrière une porte étanche, des rouleaux de toile cirée sont rangés par crue plutôt que par année. Une cartulaire aux doigts tachés de bleu vous montre une série de relevés interdits : le fleuve ne revient pas seulement selon la lune, mais aussi selon les cloches de signal qu'on lui impose.", "Behind a watertight door, rolls of oilcloth are shelved by flood rather than year. A cartulary with blue-stained fingers shows you a forbidden series of readings: the river returns not only by the moon, but also by the signal bells imposed upon it."),
  },
  ferrymen_guild: {
    title: l("La maison des passeurs", "The ferrymen's house"),
    description: l("Sous les poutres noircies, les passeurs ont gravé sur un mur les noms de ceux qu'ils ont ramenés vivants. Leur doyenne ne vous offre pas une barque : elle vous demande quel quartier vous choisiriez de sauver si tous ne pouvaient l'être. La réponse décide de la route qu'elle accepte de vous montrer.", "Beneath blackened beams, ferrymen have carved on one wall the names of those they brought back alive. Their elder does not offer you a boat: she asks which ward you would save if not all could be saved. Your answer decides the route she is willing to show you."),
  },
  rope_chapel: {
    title: l("La chapelle des cordages", "The rope chapel"),
    description: l("Des cordes votives pendent d'une coupole basse, chacune nouée pour un disparu. Au centre, une cloche sans battant ne sonne qu'avec le vent des canaux. Le lieu paraît humble, mais les marins y ont caché un plan des amarres qui mène sous les piles du grand pont.", "Votive ropes hang from a low dome, each knotted for someone missing. At its centre, a clapperless bell rings only with the wind from the canals. The place seems humble, yet sailors have hidden here a mooring chart leading beneath the great bridge piers."),
  },
  black_lantern_pier: {
    title: l("Le quai des lanternes noires", "The black-lantern pier"),
    description: l("À l'extrémité du canal, des lanternes peintes de suie attendent qu'on les allume sans être vues. Un batelier absent a laissé son manteau, une tasse encore chaude et une sphère bleue fendue. Quelqu'un a interrompu un départ qui devait se faire avant l'aube.", "At the canal's end, soot-painted lanterns wait to be lit unseen. An absent boatman has left a coat, a still-warm cup, and a cracked blue sphere. Someone interrupted a departure meant to happen before dawn."),
    narrativeLayers: [{ priority: 22, requires: { path: "state.expedition.alert", atLeast: 3 }, text: l("Les lanternes semblent déjà attendre un signal. Vos poursuivants ont assez d'avance pour que chaque reflet sur l'eau ressemble à un regard.", "The lanterns seem to be awaiting a signal already. Your pursuers are close enough that every reflection on the water resembles an eye.") }],
  },
  courier_locker: {
    title: l("Le casier du coursier", "The courier's locker"),
    description: l("Une porte d'acier se cache derrière un rideau de filets. À l'intérieur, des manteaux secs, des cachets de plomb et un tableau de service relient les quais aux toits de l'ambassade. La dernière tournée n'est pas rayée : elle porte simplement le mot 'blanc' à côté d'une heure.", "A steel door hides behind a curtain of nets. Inside, dry cloaks, lead seals, and a duty board link the quays to the embassy roofs. The last route is not crossed out: it simply bears the word 'white' beside a time."),
  },
  aqueduct_gallery: {
    title: l("La galerie de l'aqueduc", "The aqueduct gallery"),
    description: l("Un aqueduc oublié court dans la roche, si haut qu'il laisse sous vos pas une ombre sans fond. Les pierres de pression sont gravées d'encoches régulières; quelqu'un les a récemment calées avec des fragments de verre bleu afin de transmettre un ordre sans se montrer.", "A forgotten aqueduct runs through the rock, so high that it leaves bottomless shadow beneath your feet. Its pressure stones are cut with regular notches; someone recently wedged them with fragments of blue glass to transmit an order without being seen."),
  },
  underbridge_sluice: {
    title: l("La vanne sous le grand pont", "The sluice beneath the great bridge"),
    description: l("Sous la pile centrale, une roue de bronze commande un conduit plus ancien que les portes. Une manivelle relie le mécanisme à une ligne de cloches; si elle tourne à l'heure blanche, l'eau cherchera les quartiers bas par cette artère oubliée plutôt que par son lit naturel.", "Beneath the central pier, a bronze wheel controls a conduit older than the gates. A crank links the mechanism to a line of bells; if it turns at the white hour, water will seek the lower wards through this forgotten artery rather than its natural bed."),
  },
  signal_bell: {
    title: l("La cloche de l'heure blanche", "The bell of the white hour"),
    description: l("La chambre de la cloche est étroite et saturée d'odeur de cuivre. Son battant porte les mêmes quatre anneaux que les boucliers. Ici, le complot cesse d'être un réseau d'indices : il devient un geste très simple, quelqu'un levant un marteau au bon moment.", "The bell chamber is narrow and saturated with the smell of copper. Its clapper bears the same four rings as the shields. Here, the plot ceases to be a web of clues: it becomes one very simple gesture, someone raising a hammer at the right moment."),
  },
};

export const WORLD_EXPANSION_CHOICES = {
  river_gate: [
    { id: "browse-lanterns", label: l("Traverser la galerie des lanternes", "Cross the lantern arcade"), to: "festival_arcade" },
    { id: "ask-ferryman", label: l("Descendre vers les marches du canal", "Go down to the canal steps"), to: "canal_steps" },
    { id: "visit-salt-market", label: l("Suivre l'odeur du sel bleu jusqu'au marché", "Follow the scent of blue salt to the market"), to: "salt_market" },
  ],
  festival_arcade: [
    { id: "buy-secret-map", label: l("Écouter la cartographe et acheter son plan", "Hear the cartographer out and buy her map"), requires: { path: "state.expedition.wealth", atLeast: 8 }, effects: [{ op: "increment", path: "expedition.wealth", value: -8 }, { op: "addUnique", path: "clues", value: "old_flood_map" }, { op: "increment", path: "expedition.morale", value: 1 }], to: "secret_map_stall" },
    { id: "watch-festival", label: l("Observer les masques et les messagers", "Watch the masks and messengers"), effects: [{ op: "increment", path: "expedition.alert", value: 1 }], to: "river_gate" },
    { id: "visit-glasswrights", label: l("Suivre la lueur des verriers", "Follow the glasswrights' glow"), to: "glasswright_yard" },
  ],
  glasswright_yard: [
    { id: "compare-grey-powder", label: l("Comparer la poudre des vannes aux pigments", "Compare sluice powder with the pigments"), effects: [{ op: "addUnique", path: "clues", value: "white_boot_order" }, { op: "increment", path: "expedition.morale", value: 1 }], result: { text: l("La maîtresse verrière reconnaît la recette : cette poudre prépare un verre qui émet un signal dans l'eau. Les saboteurs disposent donc d'un moyen de commander au-delà des boucliers.", "The glass mistress recognizes the recipe: this powder prepares glass that emits a signal in water. The saboteurs therefore have a means of commanding beyond the shields.") } },
    { id: "follow-glass-courier", label: l("Suivre le coursier chargé de sphères bleues", "Follow the courier carrying blue spheres"), effects: [{ op: "increment", path: "expedition.alert", value: 1 }, { op: "set", path: "heroConditions.eryndor", value: "tired" }], to: "moonfish_tavern" },
  ],
  secret_map_stall: [
    { id: "follow-map-customs", label: l("Suivre le plan jusqu'aux douanes fermées", "Follow the map to the closed customs house"), to: "old_customs" },
    { id: "map-to-orchard", label: l("Prendre le chenal du verger sous la vase", "Take the channel to the orchard beneath the silt"), to: "moss_orchard" },
  ],
  canal_steps: [
    { id: "trust-ferryman", label: l("Échanger une pièce contre le raccourci du passeur", "Trade a coin for the ferryman's shortcut"), requires: { path: "state.expedition.wealth", atLeast: 1 }, effects: [{ op: "increment", path: "expedition.wealth", value: -1 }, { op: "increment", path: "expedition.fatigue", value: -1 }], to: "old_customs" },
    { id: "offer-shrine", label: l("Suivre la prêtresse jusqu'au sanctuaire", "Follow the priestess to the shrine"), to: "river_shrine" },
    { id: "return-gate-steps", label: l("Revenir aux portes de la rivière", "Return to the river gates"), to: "river_gate" },
    { id: "reach-undersluice", label: l("Passer sous les arches jusqu'au quai de service", "Pass beneath the arches to the service dock"), to: "undersluice_dock" },
  ],
  undersluice_dock: [
    { id: "inspect-rowboat", label: l("Examiner la barque rayée", "Inspect the scratched rowboat"), effects: [{ op: "addUnique", path: "clues", value: "old_flood_map" }, { op: "increment", path: "expedition.alert", value: 1 }], result: { text: l("Sous le banc, vous trouvez des fibres de corde identiques à celles des caisses de Souleyna. La barque a servi à acheminer quelque chose vers les galeries sans passer par le chantier.", "Beneath the bench, you find rope fibres identical to those on Souleyna crates. The boat carried something to the galleries without passing through the worksite.") } },
    { id: "dock-to-paper-bridge", label: l("Suivre les coursiers vers le pont de papier", "Follow the couriers to the paper bridge"), to: "paper_bridge" },
    { id: "dock-to-tunnel", label: l("Prendre la porte de cale vers le tunnel noyé", "Take the hold door to the flooded tunnel"), to: "flooded_tunnel" },
  ],
  old_customs: [
    { id: "copy-customs-ledger", label: l("Copier les lignes compromettantes du registre", "Copy the incriminating ledger entries"), effects: [{ op: "addUnique", path: "clues", value: "council_ledger" }, { op: "increment", path: "expedition.alert", value: 1 }], to: "dry_bed" },
    { id: "use-customs-drain", label: l("Passer par le drain des douanes", "Use the customs drain"), to: "moss_orchard" },
    { id: "open-seal-vault", label: l("Descendre vers la chambre des sceaux", "Descend to the seal vault"), to: "seal_vault" },
  ],
  seal_vault: [
    { id: "take-forged-seal", label: l("Relever la matrice falsifiée", "Record the forged die"), effects: [{ op: "addUnique", path: "clues", value: "council_ledger" }, { op: "increment", path: "expedition.alert", value: 1 }], result: { text: l("La matrice porte une minuscule marque de fabricant que seuls les officiers municipaux connaissent. Le complot a besoin d'un complice qui possède un accès officiel.", "The die bears a tiny maker's mark known only to municipal officers. The plot needs an accomplice with official access.") } },
    { id: "seal-to-embassy", label: l("Suivre les rubans jusqu'à la sacristie de l'ambassade", "Follow the ribbons to the embassy vestry"), to: "embassy_vestry" },
  ],
  embassy_vestry: [
    { id: "copy-visitor-list", label: l("Copier la liste des visites nocturnes", "Copy the list of nightly visits"), effects: [{ op: "addUnique", path: "clues", value: "council_ledger" }, { op: "increment", path: "expedition.alert", value: 2 }], result: { text: l("Les rendez-vous sont datés, codés et tous liés à une même initiale. Ce que vous tenez peut faire tomber un conseiller, à condition d'atteindre le Conseil avant qu'il ne brûle ses traces.", "The meetings are dated, coded, and all tied to the same initial. What you hold can bring down a councillor, provided you reach the Council before he burns his tracks.") } },
    { id: "vestry-to-tribunal", label: l("Passer par la coursive du Tribunal", "Take the Tribunal passage"), to: "tribunal_gallery" },
  ],
  river_shrine: [
    { id: "bind-wounds", label: l("Laisser la prêtresse panser les blessures", "Let the priestess bind the wounds"), requires: { path: "state.expedition.wounds", atLeast: 1 }, effects: [{ op: "increment", path: "expedition.wounds", value: -1 }, { op: "increment", path: "expedition.morale", value: 1 }, { op: "set", path: "heroConditions.bashkar", value: "tired" }], result: { text: l("La prêtresse écrase des feuilles de sel et de mousse contre la plaie. La douleur ne disparaît pas, mais elle cesse de décider pour vous.", "The priestess crushes salt leaves and moss against the wound. The pain does not vanish, but it stops making decisions for you.") } },
    { id: "hear-tide-prayer", label: l("Écouter la prière des marins", "Listen to the sailors' prayer"), effects: [{ op: "increment", path: "expedition.morale", value: 1 }, { op: "set", path: "heroConditions.odran", value: "inspired" }], to: "echo_well" },
    { id: "shrine-to-tavern", label: l("Rejoindre les bateliers au Poisson-Lune", "Join the boatmen at the Moonfish"), to: "moonfish_tavern" },
  ],
  moonfish_tavern: [
    { id: "read-tavern-book", label: l("Lire la page ouverte du livre de comptes", "Read the open page in the account book"), effects: [{ op: "addUnique", path: "clues", value: "valdrick_manifest" }, { op: "increment", path: "expedition.alert", value: 1 }], result: { text: l("Les additions sont anodines, sauf trois lignes de 'soupe pour messagers' réglées par une caisse de l'ambassade. Les faux ouvriers avaient un réseau de relais à la surface.", "The sums look harmless, except for three lines of 'messengers' soup' paid by an embassy crate. The false workers had a relay network on the surface.") } },
    { id: "tavern-to-paper-bridge", label: l("Sortir vers le pont de papier", "Leave for the paper bridge"), to: "paper_bridge" },
    { id: "tavern-to-shrine", label: l("Revenir au sanctuaire des rives", "Return to the riverside shrine"), to: "river_shrine" },
  ],
  paper_bridge: [
    { id: "follow-rowboat-trail", label: l("Suivre la trace de la barque vers le quai", "Follow the rowboat trail to the dock"), to: "undersluice_dock" },
    { id: "bridge-to-cloister", label: l("Prendre les ruelles jusqu'au cloître", "Take the lanes to the cloister"), to: "archive_cloister" },
  ],
  echo_well: [
    { id: "enter-well-gallery", label: l("Descendre par la galerie derrière le puits", "Descend through the gallery behind the well"), to: "flooded_tunnel" },
    { id: "surface-from-well", label: l("Remonter vers les rues du canal", "Climb back to the canal streets"), to: "canal_steps" },
  ],
  silt_archive: [
    { id: "open-baths", label: l("Forcer la grille des bains effondrés", "Force open the grille to the collapsed baths"), effects: [{ op: "increment", path: "expedition.fatigue", value: 1 }, { op: "set", path: "heroConditions.bashkar", value: "tired" }], to: "collapsed_baths" },
  ],
  moss_orchard: [
    { id: "gather-moss", label: l("Récolter la mousse qui calme les plaies", "Gather the moss that soothes wounds"), effects: [{ op: "increment", path: "expedition.supplies", value: 1 }, { op: "increment", path: "expedition.wounds", value: -1 }], result: { text: l("Vous préparez un cataplasme à la hâte. La mousse laisse sur vos doigts une odeur de pluie ancienne et rend au groupe un peu de souplesse.", "You prepare a poultice in haste. The moss leaves the scent of ancient rain on your fingers and returns a little suppleness to the party.") } },
    { id: "orchard-to-well", label: l("Suivre les racines jusqu'au puits des échos", "Follow the roots to the echo well"), to: "echo_well" },
    { id: "orchard-to-baths", label: l("Rejoindre les bains par le bassin vidé", "Reach the baths through the drained basin"), to: "collapsed_baths" },
  ],
  collapsed_baths: [
    { id: "read-bath-frieze", label: l("Relever les quatre anneaux de la mosaïque", "Study the four rings in the mosaic"), effects: [{ op: "addUnique", path: "clues", value: "shield_symbols" }, { op: "addUnique", path: "clues", value: "white_boot_order" }], result: { text: l("Sous les anneaux, une devise presque effacée donne l'ordre exact : retenir, guider, rompre. Les bottes blanches ont marché ici pour apprendre, pas seulement pour se cacher.", "Beneath the rings, a nearly erased motto gives the exact order: contain, guide, break. White boots walked here to learn, not merely to hide.") } },
    { id: "baths-to-dry-bed", label: l("Regagner le lit asséché par la voûte", "Return to the dry riverbed through the vault"), to: "dry_bed" },
  ],
  gate_chamber: [
    { id: "climb-counterweights", label: l("Monter inspecter les contrepoids", "Climb to inspect the counterweights"), to: "counterweight_loft" },
  ],
  counterweight_loft: [
    { id: "secure-counterweight", label: l("Bloquer le contrepoids marqué à la craie", "Secure the chalk-marked counterweight"), effects: [{ op: "increment", path: "expedition.fatigue", value: 1 }, { op: "increment", path: "expedition.morale", value: 1 }], result: { text: l("Vous passez une goupille dans l'axe et effacez la craie. Le piège secondaire ne tombera pas sur ceux qui viendront sauver les portes après vous.", "You drive a pin through the axle and wipe away the chalk. The secondary trap will not fall upon those who come to save the gates after you.") } },
    { id: "reach-watch-platform", label: l("Gagner la plateforme des veilleurs", "Reach the watchers' platform"), to: "watch_platform" },
  ],
  watch_platform: [
    { id: "mark-targeted-wards", label: l("Noter les quartiers visés par les boucliers", "Mark the wards targeted by the shields"), effects: [{ op: "addUnique", path: "clues", value: "old_flood_map" }, { op: "increment", path: "expedition.morale", value: -1 }], result: { text: l("Les cercles de feu que vous tracez sur le plan correspondent aux quartiers les moins riches de Laelith. Voir les cibles donne au complot un visage, et ce visage vous met en colère.", "The circles of fire you draw on the map correspond to Laelith's poorest wards. Seeing the targets gives the plot a face, and that face makes you angry.") } },
    { id: "platform-to-city", label: l("Descendre vers les marches de la ville", "Descend to the city steps"), to: "city_steps" },
    { id: "visit-ember-observatory", label: l("Gagner l'observatoire des braises", "Reach the ember observatory"), to: "ember_observatory" },
  ],
  ember_observatory: [
    { id: "read-pressure-embers", label: l("Lire les braises de pression", "Read the pressure embers"), effects: [{ op: "addUnique", path: "clues", value: "old_flood_map" }, { op: "increment", path: "expedition.morale", value: -1 }], result: { text: l("L'astronome vous montre la braise rouge : la retenue ne cédera pas seule. Une impulsion de signal est encore nécessaire, ce qui signifie qu'il existe du temps — très peu, mais du temps.", "The astronomer shows you the red ember: the reservoir will not fail alone. A signal pulse is still needed, which means there is time—very little, but time.") } },
    { id: "climb-rooftop-cistern", label: l("Passer par les toits jusqu'à la citerne", "Cross the roofs to the cistern"), to: "rooftop_cistern" },
  ],
  rooftop_cistern: [
    { id: "take-roof-seal", label: l("Prélever le plomb de cachetage sur la corde", "Take the sealing lead from the line"), effects: [{ op: "addUnique", path: "clues", value: "council_ledger" }, { op: "increment", path: "expedition.alert", value: 1 }], result: { text: l("Le plomb porte les deux emblèmes superposés de Laelith et Souleyna. Ce petit morceau de métal prouve que les messages ont circulé par les toits avec une bénédiction officielle.", "The lead bears Laelith and Souleyna's two emblems superimposed. This tiny piece of metal proves messages travelled by rooftop with official blessing.") } },
    { id: "cistern-to-city", label: l("Redescendre vers les marches de la ville", "Climb down to the city steps"), to: "city_steps" },
  ],
  city_steps: [
    { id: "search-cloister", label: l("Chercher les archives du cloître municipal", "Search the municipal cloister archives"), to: "archive_cloister" },
  ],
  archive_cloister: [
    { id: "take-countersignature", label: l("Prendre la lettre contre-signée", "Take the countersigned letter"), effects: [{ op: "addUnique", path: "clues", value: "council_ledger" }, { op: "increment", path: "expedition.alert", value: 1 }], to: "council_antechamber" },
    { id: "cloister-to-steps", label: l("Revenir voir le sergent", "Return to the sergeant"), to: "city_steps" },
    { id: "open-hidden-scriptorium", label: l("Pousser le battant du scriptorium caché", "Push open the hidden scriptorium shutter"), to: "hidden_scriptorium" },
  ],
  hidden_scriptorium: [
    { id: "copy-overflow-notes", label: l("Copier les annotations sur les quartiers sacrifiés", "Copy the annotations on sacrificed wards"), effects: [{ op: "addUnique", path: "clues", value: "council_ledger" }, { op: "increment", path: "expedition.morale", value: -1 }], result: { text: l("L'écriture froide classe des familles comme des dégâts acceptables. Cette preuve ne rendra pas votre décision plus simple; elle rendra votre accusation impossible à ignorer.", "The cold handwriting classifies families as acceptable damage. This proof will not make your decision easier; it will make your accusation impossible to ignore.") } },
    { id: "scriptorium-to-tribunal", label: l("Emprunter le passage derrière les portraits", "Take the passage behind the portraits"), to: "tribunal_gallery" },
  ],
  tribunal_gallery: [
    { id: "enter-council-hatch", label: l("Passer la trappe vers l'antichambre", "Use the hatch to the antechamber"), to: "council_antechamber" },
    { id: "tribunal-to-steps", label: l("Rejoindre le sergent par la galerie", "Reach the sergeant through the gallery"), to: "city_steps" },
  ],
  council_antechamber: [
    { id: "petition-council", label: l("Présenter les preuves au Conseil", "Present the evidence to the Council"), requires: { path: "state.flags.disabledSabotage", equals: true }, effects: [{ op: "increment", path: "expedition.morale", value: 1 }], to: "public_reckoning" },
    { id: "rush-gates", label: l("Refuser l'audience et courir vers les portes", "Refuse the hearing and run for the gates"), to: "gate_chamber" },
  ],
  salt_market: [
    { id: "trade-salt-rumour", label: l("Échanger du sel contre les rumeurs des pêcheuses", "Trade salt for the fishers' rumours"), effects: [{ op: "increment", path: "expedition.supplies", value: 1 }, { op: "increment", path: "expedition.morale", value: 1 }, { op: "set", path: "heroConditions.odran", value: "inspired" }], result: { text: l("Les pêcheuses vous donnent du pain salé et un nom : les sphères bleues partent toujours vers l'est, là où les coursiers changent de manteau.", "The fishers give you salted bread and a name: blue spheres always leave east, where couriers change cloaks.") } },
    { id: "track-blue-beads", label: l("Suivre les perles bleues vers la corderie", "Follow the blue beads to the ropewalk"), effects: [{ op: "increment", path: "expedition.alert", value: 1 }], to: "ropewalk" },
    { id: "descend-drowned-post", label: l("Descendre au relais noyé", "Descend to the drowned post"), to: "drowned_post" },
  ],
  ropewalk: [
    { id: "read-rope-marks", label: l("Déchiffrer les marques sur les bobines", "Read the marks on the spools"), effects: [{ op: "addUnique", path: "clues", value: "courier_seal" }], result: { text: l("Les couleurs composent un code de marée et de destination. Les caisses qui portent le bleu sombre doivent passer sans contrôle, sous une autorité empruntée à la ville.", "The colours form a code of tide and destination. Crates bearing dark blue are to pass unchecked, under authority borrowed from the city.") } },
    { id: "cross-roof-ropes", label: l("Passer par les cordes jusqu'au casier du coursier", "Cross the ropes to the courier's locker"), effects: [{ op: "increment", path: "expedition.fatigue", value: 1 }, { op: "set", path: "heroConditions.eryndor", value: "tired" }], to: "courier_locker" },
    { id: "ropewalk-to-steps", label: l("Redescendre vers les marches de la ville", "Climb down to the city steps"), to: "city_steps" },
  ],
  drowned_post: [
    { id: "open-tide-library", label: l("Ouvrir la porte étanche des archives de crue", "Open the watertight door to the flood archives"), to: "tide_library" },
    { id: "follow-mooring-marks", label: l("Suivre les marques d'amarre jusqu'au quai", "Follow the mooring marks to the pier"), to: "black_lantern_pier" },
    { id: "take-aqueduct", label: l("Emprunter la galerie de l'aqueduc", "Take the aqueduct gallery"), to: "aqueduct_gallery" },
  ],
  tide_library: [
    { id: "copy-flood-schedule", label: l("Copier le calendrier interdit des crues", "Copy the forbidden flood schedule"), effects: [{ op: "addUnique", path: "clues", value: "flood_schedule" }, { op: "increment", path: "expedition.morale", value: -1 }], result: { text: l("Les relevés prouvent que la catastrophe exige une cloche, un canal et un signal de verre. Vous tenez enfin la chronologie entière du piège.", "The readings prove the disaster requires a bell, a canal, and a glass signal. You finally hold the trap's complete chronology.") } },
    { id: "ask-ferrymen-house", label: l("Demander la route secrète des passeurs", "Ask for the ferrymen's secret route"), to: "ferrymen_guild" },
  ],
  ferrymen_guild: [
    { id: "buy-mooring-sigil", label: l("Payer le droit de voir le plan des amarres", "Pay to see the mooring chart"), requires: { path: "state.expedition.wealth", atLeast: 2 }, effects: [{ op: "increment", path: "expedition.wealth", value: -2 }, { op: "addUnique", path: "clues", value: "flood_schedule" }], to: "rope_chapel" },
    { id: "guild-to-black-pier", label: l("Accompagner une barque vers le quai des lanternes", "Accompany a boat to the black-lantern pier"), to: "black_lantern_pier" },
  ],
  rope_chapel: [
    { id: "bless-votive-rope", label: l("Nouer une corde votive pour les disparus", "Knot a votive rope for the missing"), effects: [{ op: "increment", path: "expedition.supplies", value: 1 }, { op: "increment", path: "expedition.morale", value: 1 }, { op: "set", path: "heroConditions.odran", value: "inspired" }], result: { text: l("La vieille cloche ne sonne pas, mais le groupe respire ensemble un instant. Un marin vous glisse le passage sous le pont.", "The old bell does not ring, but the party breathes together for a moment. A sailor slips you the passage beneath the bridge.") } },
    { id: "lower-underbridge", label: l("Descendre sous les piles du grand pont", "Lower yourselves beneath the great bridge piers"), to: "underbridge_sluice" },
  ],
  black_lantern_pier: [
    { id: "read-lantern-signal", label: l("Examiner la sphère bleue fendue", "Examine the cracked blue sphere"), effects: [{ op: "addUnique", path: "clues", value: "courier_seal" }, { op: "addUnique", path: "clues", value: "flood_schedule" }], result: { text: l("La sphère a été réglée pour répondre à une cloche unique. Elle n'indique pas seulement qui commande les boucliers : elle révèle d'où partira l'ordre.", "The sphere was tuned to answer a single bell. It does not merely show who commands the shields: it reveals where the order will begin.") } },
    { id: "follow-missing-courier", label: l("Suivre la trace du coursier disparu", "Follow the missing courier's trail"), effects: [{ op: "increment", path: "expedition.alert", value: 1 }], to: "courier_locker" },
    { id: "pier-to-drowned-post", label: l("Revenir au relais noyé", "Return to the drowned post"), to: "drowned_post" },
  ],
  courier_locker: [
    { id: "copy-courier-orders", label: l("Copier les ordres de tournée", "Copy the route orders"), effects: [{ op: "addUnique", path: "clues", value: "courier_seal" }, { op: "addUnique", path: "clues", value: "council_ledger" }, { op: "increment", path: "expedition.alert", value: 1 }], result: { text: l("La liste lie les cachets municipaux aux livraisons de verre bleu. Le conseiller n'a pas seulement couvert le réseau : il lui a prêté ses messagers.", "The list ties municipal seals to blue-glass deliveries. The councillor did not merely cover the network: he lent it his messengers.") } },
    { id: "take-courier-shaft", label: l("Prendre le conduit des coursiers jusqu'au scriptorium", "Take the couriers' shaft to the scriptorium"), to: "hidden_scriptorium" },
  ],
  aqueduct_gallery: [
    { id: "read-pressure-stones", label: l("Lire les encoches des pierres de pression", "Read the pressure-stone notches"), effects: [{ op: "addUnique", path: "clues", value: "flood_schedule" }, { op: "increment", path: "expedition.supplies", value: -1 }], result: { text: l("Les encoches racontent une succession très précise : ouvrir la vanne, sonner la cloche, puis donner la direction aux boucliers. La mécanique et le rite se rejoignent ici.", "The notches tell a very precise sequence: open the sluice, ring the bell, then give the shields direction. Machinery and rite meet here.") } },
    { id: "follow-dry-spillway", label: l("Suivre le déversoir asséché sous le pont", "Follow the dry spillway beneath the bridge"), to: "underbridge_sluice" },
    { id: "aqueduct-to-well", label: l("Regagner le puits des échos", "Return to the echo well"), to: "echo_well" },
  ],
  underbridge_sluice: [
    { id: "turn-service-wheel", label: l("Tourner la roue de service et atteindre la cloche", "Turn the service wheel and reach the bell"), effects: [{ op: "increment", path: "expedition.fatigue", value: 1 }, { op: "set", path: "heroConditions.bashkar", value: "strained" }], to: "signal_bell" },
    { id: "underbridge-to-gates", label: l("Courir par le conduit jusqu'à la chambre des portes", "Run through the conduit to the gate chamber"), to: "gate_chamber" },
  ],
  signal_bell: [
    { id: "silence-white-bell", label: l("Retirer le battant avant l'heure blanche", "Remove the clapper before the white hour"), effects: [{ op: "set", path: "flags.disabledSignal", value: true }, { op: "increment", path: "expedition.morale", value: 1 }], result: { text: l("Le battant est lourd, mais sa chute dans vos bras ne fait aucun bruit. Une voie du sabotage vient de s'éteindre; les autres comploteurs devront improviser.", "The clapper is heavy, but its fall into your arms makes no sound. One avenue of sabotage has just gone dark; the other conspirators will have to improvise.") } },
    { id: "bell-to-gates", label: l("Suivre le conduit de cuivre vers les portes", "Follow the copper conduit to the gates"), to: "gate_chamber" },
  ],
};

const CORE_SCENES = {
  silt_archive: {
    title: l("Les archives de limon", "The silt archive"),
    description: l("Sous une bâche goudronnée, la boue a conservé les restes d'un poste de mesure : jalons, tablettes de cire, et une tasse encore cerclée de vert-de-gris. Les scribes de Laelith consignaient ici la hauteur de l'eau. Quelqu'un a gratté les derniers chiffres jusqu'au bois, avec la patience rageuse de qui voulait effacer un avertissement.", "Beneath a tarred sheet, mud has preserved the remains of a measuring post: gauges, wax tablets, and a cup still ringed with verdigris. Laelith's scribes recorded the water level here. Someone has scraped the last figures down to the wood with the furious patience of a person erasing a warning."),
    revisitDescription: l("Revenus parmi les jalons, vous voyez ce que le premier regard ne livrait pas : les mesures effacées ne montaient pas lentement. Elles sautaient, comme si une main invisible avait retenu puis rendu le fleuve par à-coups.", "Back among the gauges, you see what the first glance withheld: the erased measurements did not rise slowly. They leapt, as though an invisible hand had checked and released the river in jolts."),
  },
  foreman_parley: {
    title: l("Le mensonge du contremaître", "The foreman's lie"),
    description: l("Le contremaître vous reçoit derrière un rideau de toiles mouillées. Il parle avec l'assurance de ceux qui espèrent que la précision de leur jargon remplacera les preuves. Pourtant, à chaque grondement venu des portes, ses doigts se referment sur son sifflet. Il ne craint pas un accident : il attend un signal.", "The foreman receives you behind a curtain of wet canvas. He speaks with the assurance of those who hope technical language will substitute for proof. Yet at every rumble from the gates, his fingers close around his whistle. He fears no accident: he is waiting for a signal."),
    revisitDescription: l("Le rideau de toiles se soulève à nouveau, mais le contremaître n'est plus là. Sa chaise est encore tiède; sur la planche, une empreinte de bottine pointe vers le conduit de service. Votre premier entretien l'a forcé à déplacer ses pions.", "The canvas curtain lifts again, but the foreman is gone. His chair is still warm; on the plank, a boot print points toward the service conduit. Your first interview forced him to move his pieces."),
  },
  scaffold_shadow: {
    title: l("Sous l'échafaudage", "Beneath the scaffolding"),
    description: l("À plat ventre dans l'ombre des madriers, vous sentez la vibration des marteaux avant d'entendre les voix. Les hommes ne parlent pas du chantier, mais de 'l'heure blanche', du collier qui doit répondre, et d'une barge qui ne devra laisser aucun témoin. Une goutte de chaux tombe sur votre joue; vous n'osez pas l'essuyer.", "Flat beneath the shadow of the beams, you feel the hammers' vibration before you hear voices. The men speak not of works, but of the 'white hour', of a necklace that must answer, and of a barge that must leave no witness. A drop of lime falls on your cheek; you dare not wipe it away."),
  },
  maintenance_map: {
    title: l("Le plan oublié", "The forgotten plan"),
    description: l("Dans une boîte à outils abandonnée, un plan de briques bleui par l'humidité détaille un ancien conduit de délestage. Il passe sous les échafaudages et rejoint la chambre des portes par une trappe que les faux ouvriers n'ont pas condamnée. La marge porte les initiales de Poupiquet, ajoutées d'une écriture pressée.", "In an abandoned tool box, a brick plan blued by damp details an old relief conduit. It runs beneath the scaffolding and reaches the gate chamber through a hatch the false workers did not seal. The margin bears Poupiquet's initials, added in a hurried hand."),
  },
  kiki_trust: {
    title: l("La confiance du molosse", "The mastiff's trust"),
    description: l("Vous vous asseyez dans la vase plutôt que d'avancer. Longtemps, Kiki ne fait que respirer : souffle rauque, oreilles rabattues, regard fixé sur la sortie. Puis il pose son front énorme contre votre paume. Son collier est gravé d'une petite rose des eaux; ce n'est pas une parure, mais une clef de reconnaissance pour les galeries inondées.", "You sit in the mud instead of advancing. For a long while, Kiki only breathes: harsh exhale, pinned ears, gaze fixed on the exit. Then he presses his huge forehead to your palm. His collar bears a small water rose; it is not ornament, but a key of recognition for flooded galleries."),
  },
  dog_scent: {
    title: l("La piste du chien", "The dog's trail"),
    description: l("Kiki tire soudain sur la laisse improvisée. Il ne cherche pas la surface : il flaire une odeur de laine humide, de sang séché et de résine de bateau. Sa piste mène au tunnel noyé, là où le courant stagnant garde les secrets comme des pierres au fond d'une poche.", "Kiki suddenly tugs the improvised lead. He is not seeking the surface: he scents wet wool, dried blood, and boat resin. His trail leads to the flooded tunnel, where still water keeps secrets like stones at the bottom of a pocket."),
  },
  lantern_landing: {
    title: l("Le seuil de l'eau noire", "The threshold of black water"),
    description: l("La lanterne allumée, le tunnel change de nature. Le noir cesse d'être une absence et devient une matière lente, striée de poussière d'argent. Sur la corniche, des marques de doigts ont été gravées tous les trois pas : quelqu'un cherchait à ne pas perdre la raison en avançant.", "With the lantern lit, the tunnel changes its nature. Darkness ceases to be an absence and becomes a slow substance, streaked with silver dust. On the ledge, finger marks have been carved every three paces: someone was trying not to lose their mind while moving forward."),
    revisitDescription: l("La seconde fois, vos pas trouvent d'eux-mêmes les marques de doigts. L'eau ne paraît pas plus accueillante, mais elle n'est plus tout à fait inconnue; votre propre passage y a laissé une fragile permission.", "The second time, your steps find the finger marks of their own accord. The water is no more welcoming, but it is no longer wholly unknown; your own passage has left a fragile permission in it."),
    entryEffects: [{ op: "increment", path: "expedition.supplies", value: -1 }],
  },
  barge_hold: {
    title: l("La cale des absents", "The hold of the absent"),
    description: l("La barge craque à chaque oscillation du courant. Derrière une grille, deux voyageurs sont attachés dos à dos, trop épuisés pour appeler. Ils ont entendu un nom — Valdrick — et vu une caisse passer de main en main sous le sceau de Souleyna. Plus loin, un coffre scellé semble attendre qu'on décide quelle sorte de héros vous serez.", "The barge creaks with every shift of the current. Behind a grille, two travellers are tied back to back, too exhausted to call out. They heard a name—Valdrick—and saw a crate passed hand to hand under Souleyna's seal. Farther in, a sealed chest seems to wait for you to decide what kind of heroes you are."),
  },
  witness_oath: {
    title: l("Le serment des témoins", "The witnesses' oath"),
    description: l("Quand les liens cèdent, les voyageurs ne vous remercient pas immédiatement. Ils regardent d'abord la sortie, puis votre visage, comme s'ils y cherchaient la forme d'une promesse. Enfin, l'aînée parle : elle déposera son témoignage à Laelith, même si Souleyna envoie des hommes pour l'en empêcher.", "When the bonds give way, the travellers do not thank you at once. They first look toward the exit, then at your faces, as if searching there for the shape of a promise. At last, the older one speaks: she will give her testimony in Laelith, even if Souleyna sends men to stop her."),
  },
  smuggler_ledger: {
    title: l("Le manifeste de Valdrick", "Valdrick's manifest"),
    description: l("Le coffre ne contient ni or ni arme, mais des feuilles huilées serrées dans une boîte d'étain. Elles énumèrent des salaires, des livraisons et, entre deux lignes anodines, le prix d'un silence. Valdrick a payé des mercenaires pour préparer une catastrophe que sa cité rivale pourrait ensuite 'secourir'.", "The chest contains neither gold nor weapon, but oiled sheets packed in a tin box. They list wages, deliveries, and, between two harmless lines, the price of silence. Valdrick paid mercenaries to prepare a catastrophe his rival city could then 'relieve'."),
  },
  gallery_procession: {
    title: l("La procession d'Utruz", "The Utruz procession"),
    description: l("La galerie a été taillée pour que le visiteur baisse la tête. À la lumière, les glyphes se déroulent comme un chant sans voix : quatre anneaux retiennent la force de l'eau, un porteur lui indique une direction, et le cinquième anneau — absent de la fresque — représente celui qui choisit de rompre le rite.", "The gallery was cut so that visitors must bow their heads. In the light, its glyphs unfold like a voiceless song: four rings contain water's force, one bearer gives it direction, and the fifth ring—absent from the fresco—represents the person who chooses to break the rite."),
    revisitDescription: l("Les glyphes n'ont pas changé, mais votre regard oui. Après avoir vu les boucliers et la barge, la procession ne ressemble plus à une légende religieuse : c'est un manuel de sabotage écrit dans une langue sacrée.", "The glyphs have not changed, but your gaze has. After seeing the shields and the barge, the procession no longer resembles a religious legend: it is a sabotage manual written in a sacred language."),
  },
  poupiquet_cell: {
    title: l("La prison de pierre", "The stone prison"),
    description: l("Poupiquet est encastré jusqu'aux côtes dans un bloc qui se resserre au rythme des gouttes. Ses lunettes sont fendues; son esprit, heureusement, ne l'est pas. Entre deux souffles, il vous révèle que le coin placé dans les gonds n'est que la dernière étape : les boucliers guideront la vague vers les quartiers bas.", "Poupiquet is embedded up to his ribs in a block that tightens with each drip. His spectacles are cracked; his mind, fortunately, is not. Between breaths, he tells you the wedge in the hinges is only the final step: the shields will guide the wave toward the lower districts."),
  },
  poupiquet_free: {
    title: l("Le géologue délivré", "The freed geologist"),
    description: l("La pierre s'ouvre avec un bruit de mâchoire. Poupiquet tombe à genoux, serre la corde et rit une seule fois, d'un rire bref, incrédule. Il vous tend alors un feuillet couvert de calculs : à l'heure blanche, la retenue ne cédera pas naturellement. Quelqu'un doit donner le dernier ordre.", "The stone opens with the sound of a jaw. Poupiquet falls to his knees, grips the rope, and laughs once—a brief, unbelieving laugh. Then he gives you a sheet covered in calculations: at the white hour, the reservoir will not fail naturally. Someone must give the final order."),
  },
  water_chapel: {
    title: l("La chapelle de l'eau tenue", "The chapel of held water"),
    description: l("La chapelle est presque entièrement sous l'eau. Un autel de basalte émerge à peine, entouré de serpents translucides qui tournent sans vous attaquer. Au centre repose le collier trilobé. Il pulse avec la même lenteur que les portes au loin : le prendre avec avidité serait déjà répondre au rite.", "The chapel is almost entirely underwater. A basalt altar barely emerges, surrounded by translucent serpents that circle without attacking. At its centre rests the trilobed necklace. It pulses at the same slow rhythm as the distant gates: to take it greedily would already be to answer the rite."),
  },
  rite_broken: {
    title: l("Le cinquième anneau", "The fifth ring"),
    description: l("Vous ne portez pas le collier. Vous le retournez sur l'autel, suivant la ligne manquante des glyphes. Les serpents se défont en filets d'eau claire et une brèche s'ouvre dans le mur : elle conduit à la chambre des portes. Le rite n'est pas détruit; il est rendu à sa fonction première, protéger plutôt que punir.", "You do not wear the necklace. You turn it upon the altar, following the glyphs' missing line. The serpents unmake themselves into streams of clear water and a breach opens in the wall: it leads to the gate chamber. The rite is not destroyed; it is returned to its first purpose, to protect rather than punish."),
  },
  gate_chamber: {
    title: l("La chambre des portes", "The gate chamber"),
    description: l("Les engrenages occupent la salle comme les os d'une bête immense. Dans le gond occidental, le coin de sabotage luit d'un gris friable. Au-dessus, les câbles des boucliers vibrent sous tension. Vous comprenez enfin l'ampleur du plan : la porte doit céder au moment où le rite donnera un lit à la vague.", "The gears occupy the room like the bones of an immense beast. In the western hinge, the sabotage wedge glints a crumbling grey. Above, the shields' cables quiver under strain. At last you understand the plan's scope: the gate must fail at the moment the rite gives the wave a bed."),
    revisitDescription: l("La chambre vous accueille désormais avec le grondement familier de ses engrenages. Mais la familiarité est une menace : chaque retour a coûté du temps, et le coin continue de manger la pierre grain après grain.", "The chamber now receives you with the familiar rumble of its gears. But familiarity is a threat: every return cost time, and the wedge continues to eat the stone grain by grain."),
  },
  shield_terrace: {
    title: l("La terrasse des quatre boucliers", "The terrace of four shields"),
    description: l("Derrière la berge, les quatre boucliers ne sont plus dissimulés par les échafaudages. Ils forment une rose de métal tournée vers les quartiers bas. Défaire l'un d'eux à la hâte pourrait libérer la charge dans la mauvaise direction; il faut d'abord donner aux gardes et aux témoins de quoi comprendre ce qu'ils regardent.", "Beyond the bank, the four shields are no longer hidden by scaffolds. They form a metal rose turned toward the lower districts. To tear one free in haste could release the charge in the wrong direction; first the guards and witnesses must have enough to understand what they are seeing."),
  },
  city_steps: {
    title: l("Les marches vers Laelith", "The steps to Laelith"),
    description: l("La lumière du jour vous frappe comme un jugement. Au-dessus de la faille, la fête continue par habitude, tambours et guirlandes ignorant encore le danger. Geyma attend près des marches. Derrière elle, un sergent de la garde municipale hésite : il lui faut des faits, des visages, une preuve qu'il puisse défendre devant le Conseil.", "Daylight strikes you like a judgement. Above the chasm, the festival continues by habit, drums and garlands still ignorant of danger. Geyma waits near the steps. Behind her, a sergeant of the city guard hesitates: he needs facts, faces, a proof he can defend before the Council."),
    entryEffects: [{ op: "increment", path: "expedition.morale", value: 1 }, { op: "increment", path: "expedition.fatigue", value: -1 }],
  },
  public_reckoning: {
    title: l("L'heure blanche", "The white hour"),
    description: l("Tout se joue à voix haute. Les témoins parlent, Poupiquet déplie ses calculs, et Geyma place le collier de Kiki dans la paume du sergent comme un détail impossible à inventer. En contrebas, les faux ouvriers comprennent que leur silence ne les protège plus. Reste la décision qui vous appartient : sauver les portes discrètement, ou dévoiler le complot devant toute la ville.", "Everything happens aloud. Witnesses speak, Poupiquet unfolds his calculations, and Geyma places Kiki's collar in the sergeant's palm as a detail impossible to invent. Below, the false workers understand their silence no longer protects them. One choice remains yours: save the gates quietly, or expose the plot before the whole city."),
  },
  ending_dawn: { title: l("Une ville qui se souvient", "A city that remembers"), description: l("La vague revient, mais les portes tiennent. Les boucliers, privés de leur ordre, boivent leur propre lumière puis retombent inertes dans la vase. Laelith n'oubliera pas les noms de ceux qui l'ont sauvée — pas parce qu'ils furent parfaits, mais parce qu'ils choisirent, à chaque détour, de laisser plus de vivants derrière eux qu'ils n'en avaient trouvés.\n\nFIN — L'eau retrouve son cours; la ville retrouve sa voix.", "The wave returns, but the gates hold. Deprived of their command, the shields drink their own light and fall inert into the mud. Laelith will not forget the names of those who saved it—not because they were perfect, but because at every turning they chose to leave more people alive than they found.\n\nTHE END — Water finds its course; the city finds its voice."), ending: true },
  ending_silent: { title: l("Le salut sans témoin", "Salvation without witnesses"), description: l("Le coin est retiré à temps. La ville n'apprendra jamais toute l'histoire : les mercenaires fuient, Valdrick nie, et les boucliers sont emportés avant l'aube. Pourtant les portes tiennent, les quartiers bas dorment, et quelques personnes savent qu'une catastrophe a été empêchée dans le silence.\n\nFIN — Vous avez sauvé Laelith, mais pas encore sa vérité.", "The wedge is removed in time. The city will never learn the whole story: mercenaries flee, Valdrick denies everything, and the shields are removed before dawn. Yet the gates hold, the lower districts sleep, and a few people know a catastrophe was prevented in silence.\n\nTHE END — You saved Laelith, but not yet its truth."), ending: true },
};

export const FIXED_SCENES = { ...CORE_SCENES, ...WORLD_EXPANSION_SCENES };

// Geographic layout is campaign data. Coordinates are deliberately separate
// from prose and rules, so another campaign can supply a wholly different map.
export const WORLD_MAP = {
  viewBox: "0 0 710 430",
  regions: [
    { id: "city", x: 12, y: 12, width: 536, height: 118, label: l("Laelith haute", "Upper Laelith") },
    { id: "riverbed", x: 90, y: 145, width: 350, height: 82, label: l("Lit asséché", "Dry riverbed") },
    { id: "depths", x: 18, y: 242, width: 365, height: 174, label: l("Galeries et eaux basses", "Galleries and low water") },
    { id: "machinery", x: 400, y: 165, width: 148, height: 250, label: l("Portes et mécanismes", "Gates and machinery") },
    { id: "east_canals", x: 565, y: 12, width: 133, height: 403, label: l("Canaux de l'est", "Eastern canals") },
  ],
  nodes: [
    { id: "festival_arcade", x: 74, y: 45 }, { id: "glasswright_yard", x: 42, y: 82 }, { id: "moonfish_tavern", x: 86, y: 112 },
    { id: "paper_bridge", x: 137, y: 94 }, { id: "secret_map_stall", x: 112, y: 45 }, { id: "river_gate", x: 210, y: 42 },
    { id: "canal_steps", x: 227, y: 85 }, { id: "undersluice_dock", x: 220, y: 119 }, { id: "river_shrine", x: 272, y: 105 },
    { id: "old_customs", x: 313, y: 52 }, { id: "seal_vault", x: 346, y: 84 }, { id: "embassy_vestry", x: 384, y: 52 },
    { id: "city_steps", x: 458, y: 42 }, { id: "archive_cloister", x: 442, y: 85 }, { id: "hidden_scriptorium", x: 472, y: 116 },
    { id: "tribunal_gallery", x: 512, y: 92 }, { id: "council_antechamber", x: 518, y: 47 },
    { id: "dry_bed", x: 230, y: 180 }, { id: "workers_bank", x: 285, y: 164 }, { id: "foreman_parley", x: 324, y: 150 },
    { id: "scaffold_shadow", x: 318, y: 185 }, { id: "sluice_passage", x: 360, y: 176 }, { id: "maintenance_map", x: 340, y: 210 },
    { id: "maintenance_crawl", x: 385, y: 212 }, { id: "silt_archive", x: 180, y: 197 }, { id: "collapsed_baths", x: 145, y: 215 },
    { id: "moss_orchard", x: 112, y: 265 }, { id: "narrow_fissure", x: 165, y: 258 }, { id: "kiki_trust", x: 112, y: 304 },
    { id: "dog_scent", x: 78, y: 338 }, { id: "echo_well", x: 52, y: 265 }, { id: "flooded_tunnel", x: 180, y: 316 },
    { id: "lantern_landing", x: 217, y: 347 }, { id: "barge_hold", x: 182, y: 385 }, { id: "witness_oath", x: 225, y: 400 },
    { id: "smuggler_ledger", x: 265, y: 385 }, { id: "gallery_procession", x: 275, y: 320 }, { id: "poupiquet_cell", x: 320, y: 350 },
    { id: "poupiquet_free", x: 347, y: 375 }, { id: "water_chapel", x: 355, y: 306 }, { id: "rite_broken", x: 385, y: 286 },
    { id: "gate_chamber", x: 440, y: 230 }, { id: "counterweight_loft", x: 493, y: 205 }, { id: "watch_platform", x: 515, y: 248 },
    { id: "ember_observatory", x: 510, y: 294 }, { id: "rooftop_cistern", x: 478, y: 338 }, { id: "shield_terrace", x: 450, y: 285 },
    { id: "public_reckoning", x: 480, y: 390 }, { id: "ending_dawn", x: 438, y: 405 }, { id: "ending_silent", x: 525, y: 405 },
    { id: "salt_market", x: 590, y: 48 }, { id: "ropewalk", x: 655, y: 78 }, { id: "drowned_post", x: 590, y: 113 },
    { id: "tide_library", x: 655, y: 132 }, { id: "ferrymen_guild", x: 590, y: 166 }, { id: "rope_chapel", x: 655, y: 190 },
    { id: "black_lantern_pier", x: 590, y: 225 }, { id: "courier_locker", x: 655, y: 246 }, { id: "aqueduct_gallery", x: 590, y: 282 },
    { id: "underbridge_sluice", x: 655, y: 305 }, { id: "signal_bell", x: 655, y: 360 },
  ],
};

// These additions are selected at runtime from the current state.  They are
// authored prose, not generated text; several can enrich one arrival at once.
export const NARRATIVE_LAYERS = [
  {
    id: "spent-party", priority: 30,
    requires: { path: "state.expedition.fatigue", atLeast: 6 },
    when: { scene: ["dry_bed", "narrow_fissure", "gate_chamber", "city_steps"] },
    text: l("La fatigue a cessé d'être une gêne diffuse : elle pèse dans les cuisses, raccourcit les silences et transforme chaque décision en effort partagé.", "Fatigue has stopped being a vague inconvenience: it weighs in your thighs, shortens every silence, and turns each decision into a shared effort."),
  },
  {
    id: "wounded-party", priority: 40,
    requires: { path: "state.expedition.wounds", atLeast: 1 },
    when: { scene: ["flooded_tunnel", "gallery_procession", "gate_chamber", "shield_terrace"] },
    text: l("Le sang séché sous vos manches tire à chaque geste. Personne ne le commente; c'est précisément ainsi que le groupe tient encore debout.", "Dried blood beneath your sleeves pulls at every movement. No one remarks on it; that is precisely how the party is still standing."),
  },
  {
    id: "empty-packs", priority: 35,
    requires: { path: "state.expedition.supplies", atMost: 1 },
    when: { scene: ["flooded_tunnel", "lantern_landing", "poupiquet_cell", "water_chapel"] },
    text: l("Vos provisions ne font plus de bruit dans les sacs. La lanterne, la corde et le moindre détour ont maintenant un prix que chacun connaît sans le dire.", "Your provisions no longer make a sound in your packs. The lantern, the rope, and every detour now carry a price everyone knows without saying."),
  },
  {
    id: "kiki-companion", priority: 12,
    requires: { path: "state.flags.befriendedKiki", equals: true },
    when: { scene: ["dry_bed", "flooded_tunnel", "city_steps", "gate_chamber"] },
    text: l("Kiki avance à votre rythme, museau bas, et s'arrête avant les endroits où l'eau ou la peur ont laissé une odeur trop récente. Sa présence calme les mains autant que les voix.", "Kiki moves at your pace with his nose low, stopping before places where water or fear has left too recent a scent. His presence steadies hands as much as voices."),
  },
  {
    id: "witnesses-saved", priority: 18,
    requires: { path: "state.flags.freedCaptives", equals: true },
    when: { scene: ["gallery_procession", "gate_chamber", "city_steps", "public_reckoning"] },
    text: l("Derrière vous, les voyageurs sauvés portent la preuve la plus difficile à écarter : des visages, des noms, et une mémoire qui ne dépend d'aucun document.", "Behind you, the rescued travellers carry the hardest proof to dismiss: faces, names, and a memory that depends on no document."),
  },
  {
    id: "poupiquet-voice", priority: 16,
    requires: { path: "state.flags.freedPoupiquet", equals: true },
    when: { scene: ["water_chapel", "gate_chamber", "shield_terrace", "city_steps"] },
    text: l("Poupiquet, pâle mais attentif, désigne parfois un détail du mécanisme avant même que vous le voyiez. Sa survie a changé la nature de votre expédition : vous ne cherchez plus seuls.", "Poupiquet, pale but alert, sometimes points out a detail of the mechanism before you see it. His survival has changed the nature of the expedition: you are no longer searching alone."),
  },
  {
    id: "rich-but-watched", priority: 10,
    requires: { all: [{ path: "state.expedition.wealth", atLeast: 80 }, { path: "state.expedition.alert", atLeast: 1 }] },
    when: { scene: ["dry_bed", "city_steps", "gate_chamber"] },
    text: l("La bourse obtenue pèse agréablement, mais elle vous rend aussi visibles. Dans une ville en fête, l'argent raconte toujours une histoire — parfois avant que vous l'ayez choisie.", "The purse you gained has a pleasing weight, but it also makes you visible. In a city at festival, money always tells a story—sometimes before you have chosen it."),
  },
  {
    id: "workers-alert", priority: 32,
    requires: { path: "state.expedition.alert", atLeast: 3 },
    when: { scene: ["dry_bed", "workers_bank", "sluice_passage", "gate_chamber"] },
    text: l("Quelque part dans les galeries, un sifflet répond à un autre. Les saboteurs ne vous cherchent plus au hasard; ils ont compris la forme de votre enquête.", "Somewhere in the galleries, one whistle answers another. The saboteurs are no longer searching at random; they understand the shape of your investigation."),
  },
  {
    id: "morale-low", priority: 28,
    requires: { path: "state.expedition.morale", atMost: -1 },
    when: { scene: ["dry_bed", "gate_chamber", "city_steps"] },
    text: l("Les réponses viennent moins vite. On vérifie deux fois les nœuds, les plans et les mots à employer, non par prudence seulement, mais parce que l'assurance a déserté le groupe.", "Answers come more slowly. Knots, plans, and words are checked twice—not only from caution, but because confidence has deserted the group."),
  },
  {
    id: "morale-high", priority: 8,
    requires: { path: "state.expedition.morale", atLeast: 3 },
    when: { scene: ["dry_bed", "gallery_procession", "city_steps", "public_reckoning"] },
    text: l("Malgré l'urgence, une confiance discrète circule entre vous. Elle n'efface pas le risque; elle donne seulement à chacun la force de regarder le suivant dans les yeux.", "Despite the urgency, a quiet confidence passes among you. It does not erase the danger; it merely gives each of you strength to meet the next person's eyes."),
  },
  {
    id: "rite-knowledge", priority: 14,
    requires: { path: "state.flags.understoodRite", equals: true },
    when: { scene: ["gate_chamber", "shield_terrace", "public_reckoning"] },
    text: l("Vous reconnaissez désormais le rythme des anneaux et des câbles. Ce qui vous paraissait une machinerie monstrueuse révèle sa grammaire : pression, direction, renoncement.", "You now recognize the rhythm of rings and cables. What looked like monstrous machinery reveals its grammar: pressure, direction, renunciation."),
  },
  {
    id: "signal-silenced", priority: 15,
    requires: { path: "state.flags.disabledSignal", equals: true },
    when: { scene: ["gate_chamber", "shield_terrace", "public_reckoning"] },
    text: l("La cloche de l'heure blanche est muette. Le danger n'a pas disparu, mais le plan adverse a perdu sa cadence la plus sûre.", "The bell of the white hour is silent. The danger has not vanished, but the opposing plan has lost its surest rhythm."),
  },
];

const CORE_CHOICES = {
  river_gate: [
    { id: "meet-geyma", label: l("Écouter Dame Geyma jusqu'au bout", "Hear Lady Geyma out"), effects: [{ op: "set", path: "flags.metGeyma", value: true }, { op: "set", path: "flags.readNotice", value: true }], result: { text: l("Geyma vous raconte la disparition de Poupiquet, puis s'interrompt devant le vacarme des portes. « Si vous descendez, ne croyez personne qui porte un tablier trop propre. »", "Geyma tells you of Poupiquet's disappearance, then stops at the roar of the gates. “If you go down, trust no one wearing an apron that is too clean.”") } },
    { id: "read-notice", label: l("Lire l'avis de recherche ligne par ligne", "Read the missing notice line by line"), effects: [{ op: "set", path: "flags.readNotice", value: true }], result: { text: l("L'encre a bavé sous l'humidité, sauf autour du dessin de Kiki. Une annotation récente, presque invisible, ajoute : « le chien a suivi l'homme aux bottes blanches ». La piste ne commence pas sous terre : elle commence parmi les ouvriers.", "The ink has run in the damp, except around Kiki's drawing. A recent, almost invisible note adds: “the dog followed the man in white boots.” The trail does not begin underground: it begins among the workers.") } },
    { id: "descend-river", label: l("Descendre dans le lit asséché", "Descend into the dry riverbed"), to: "dry_bed" },
  ],
  dry_bed: [
    { id: "visit-workers", label: l("Approcher les ouvriers et leurs boucliers", "Approach the workers and their shields"), to: "workers_bank" },
    { id: "follow-fissure", label: l("Suivre les traces vers la fissure", "Follow the tracks into the fissure"), to: "narrow_fissure" },
    { id: "search-silt", label: l("Fouiller les jalons enfouis dans la vase", "Search the gauges buried in the silt"), to: "silt_archive" },
    { id: "use-maintenance", label: l("Emprunter le conduit de maintenance révélé", "Use the revealed maintenance conduit"), requires: { path: "state.flags.exposedWorkers", equals: true }, to: "maintenance_crawl" },
  ],
  silt_archive: [
    { id: "keep-tablet", label: l("Conserver la tablette effacée comme preuve", "Keep the erased tablet as evidence"), effects: [{ op: "addUnique", path: "clues", value: "gate_sabotage" }], to: "dry_bed" },
    { id: "trace-boots", label: l("Suivre les traces de bottes blanches", "Follow the white boot prints"), to: "workers_bank" },
  ],
  workers_bank: [
    { id: "study-shields", label: l("Examiner les boucliers sans les toucher", "Study the shields without touching them"), effects: [{ op: "set", path: "flags.exposedWorkers", value: true }, { op: "addUnique", path: "clues", value: "shield_symbols" }, { op: "increment", path: "expedition.alert", value: 1 }], result: { text: l("Sous le vernis de chantier, quatre anneaux retiennent une magie de courant. Ce ne sont pas des protections : ils attendent de donner une direction à une eau libérée trop vite.", "Beneath the worksite varnish, four rings contain a current-magic. They are not protection: they are waiting to give direction to water released too quickly.") } },
    { id: "parley-foreman", label: l("Questionner le contremaître avec calme", "Question the foreman calmly"), to: "foreman_parley" },
    { id: "shadow-workers", label: l("Se glisser sous l'échafaudage pour écouter", "Slip beneath the scaffolding to listen"), effects: [{ op: "increment", path: "expedition.alert", value: 2 }, { op: "set", path: "heroConditions.eryndor", value: "tired" }], to: "scaffold_shadow" },
    { id: "reach-sluice", label: l("Profiter de leur distraction pour gagner les vannes", "Use their distraction to reach the sluice"), requires: { path: "state.flags.exposedWorkers", equals: true }, to: "sluice_passage" },
  ],
  foreman_parley: [
    { id: "press-lie", label: l("Relever l'incohérence de son histoire", "Point out the flaw in his story"), effects: [{ op: "set", path: "flags.exposedWorkers", value: true }, { op: "addUnique", path: "clues", value: "shield_symbols" }, { op: "increment", path: "expedition.alert", value: 1 }, { op: "increment", path: "expedition.morale", value: 1 }], to: "maintenance_map" },
    { id: "leave-parley", label: l("Feindre de le croire et repartir", "Pretend to believe him and leave"), to: "dry_bed" },
  ],
  scaffold_shadow: [
    { id: "mark-signal", label: l("Mémoriser l'heure blanche et le signal", "Memorise the white hour and its signal"), effects: [{ op: "set", path: "flags.exposedWorkers", value: true }, { op: "addUnique", path: "clues", value: "gate_sabotage" }, { op: "increment", path: "expedition.alert", value: 2 }, { op: "set", path: "heroConditions.eryndor", value: "strained" }], to: "sluice_passage" },
    { id: "withdraw-shadow", label: l("Reculer avant que la chaux ne vous trahisse", "Withdraw before the lime betrays you"), to: "dry_bed" },
  ],
  maintenance_map: [
    { id: "take-map", label: l("Prendre le plan et rejoindre le conduit", "Take the plan and enter the conduit"), effects: [{ op: "set", path: "flags.exposedWorkers", value: true }], to: "maintenance_crawl" },
  ],
  sluice_passage: [
    { id: "follow-powder", label: l("Suivre la poudre grise jusqu'aux gonds", "Follow the grey powder to the hinges"), effects: [{ op: "set", path: "flags.foundSabotage", value: true }, { op: "addUnique", path: "clues", value: "gate_sabotage" }], to: "gate_chamber" },
    { id: "retreat-sluice", label: l("Revenir vers le lit de la rivière", "Return to the riverbed"), to: "dry_bed" },
  ],
  maintenance_crawl: [
    { id: "crawl-hatch", label: l("Ramper jusqu'à la trappe des portes", "Crawl to the gate hatch"), to: "gate_chamber" },
  ],
  narrow_fissure: [
    { id: "calm-kiki", label: l("S'approcher du molosse avec patience", "Approach the mastiff patiently"), to: "kiki_trust" },
    { id: "follow-water", label: l("Descendre vers le tunnel noyé", "Descend toward the flooded tunnel"), to: "flooded_tunnel" },
    { id: "return-fissure", label: l("Revenir au lit asséché", "Return to the dry riverbed"), to: "dry_bed" },
  ],
  kiki_trust: [
    { id: "bring-kiki", label: l("Ramener Kiki à Geyma avec son secret", "Bring Kiki and his secret back to Geyma"), effects: [{ op: "set", path: "flags.befriendedKiki", value: true }, { op: "set", path: "flags.returnedKiki", value: true }, { op: "addUnique", path: "inventory", value: "reward_purse" }, { op: "increment", path: "expedition.wealth", value: 100 }, { op: "increment", path: "expedition.morale", value: 2 }, { op: "set", path: "heroConditions.odran", value: "inspired" }], to: "river_gate" },
    { id: "ask-kiki", label: l("Laisser Kiki vous guider par son flair", "Let Kiki guide you by scent"), effects: [{ op: "set", path: "flags.befriendedKiki", value: true }, { op: "increment", path: "expedition.morale", value: 1 }, { op: "set", path: "heroConditions.odran", value: "inspired" }], to: "dog_scent" },
  ],
  dog_scent: [
    { id: "enter-tunnel", label: l("Suivre Kiki jusque sous l'eau", "Follow Kiki beneath the water"), to: "flooded_tunnel" },
  ],
  flooded_tunnel: [
    { id: "light-lantern", label: l("Allumer la lanterne et longer la corniche", "Light the lantern and follow the ledge"), effects: [{ op: "set", path: "flags.lanternLit", value: true }, { op: "increment", path: "expedition.supplies", value: -1 }, { op: "set", path: "heroConditions.aldren", value: "tired" }], to: "lantern_landing" },
    { id: "leave-tunnel", label: l("Refuser l'obscurité et remonter", "Refuse the darkness and climb back"), to: "narrow_fissure" },
  ],
  lantern_landing: [
    { id: "board-barge", label: l("Explorer la barge prise dans la roche", "Explore the barge wedged in the rock"), to: "barge_hold" },
    { id: "read-glyphs", label: l("Suivre les glyphes vers la galerie Utruz", "Follow the glyphs to the Utruz gallery"), to: "gallery_procession" },
  ],
  barge_hold: [
    { id: "free-witnesses", label: l("Libérer les voyageurs et écouter leur témoignage", "Free the travellers and hear their testimony"), effects: [{ op: "set", path: "flags.freedCaptives", value: true }, { op: "increment", path: "expedition.supplies", value: -1 }, { op: "increment", path: "expedition.morale", value: 2 }, { op: "set", path: "heroConditions.bashkar", value: "tired" }], to: "witness_oath" },
    { id: "open-ledger", label: l("Ouvrir le coffre scellé avec précaution", "Open the sealed chest carefully"), effects: [{ op: "set", path: "flags.foundManifest", value: true }, { op: "addUnique", path: "clues", value: "valdrick_manifest" }, { op: "increment", path: "expedition.alert", value: 1 }], to: "smuggler_ledger" },
  ],
  witness_oath: [
    { id: "escort-witnesses", label: l("Confier les voyageurs à Kiki et poursuivre", "Entrust the travellers to Kiki and continue"), to: "gallery_procession" },
  ],
  smuggler_ledger: [
    { id: "share-ledger", label: l("Montrer le manifeste aux captifs", "Show the manifest to the captives"), effects: [{ op: "set", path: "flags.freedCaptives", value: true }], to: "witness_oath" },
    { id: "take-ledger", label: l("Garder le manifeste et rejoindre la galerie", "Keep the manifest and enter the gallery"), to: "gallery_procession" },
  ],
  gallery_procession: [
    { id: "decipher-rite", label: l("Déchiffrer le cinquième anneau", "Decipher the fifth ring"), effects: [{ op: "set", path: "flags.understoodRite", value: true }, { op: "addUnique", path: "clues", value: "water_rite" }], to: "poupiquet_cell" },
    { id: "follow-scratch", label: l("Suivre les griffures de Poupiquet", "Follow Poupiquet's scratches"), to: "poupiquet_cell" },
  ],
  poupiquet_cell: [
    { id: "free-poupiquet", label: l("Passer la corde dans la rainure et tirer", "Thread the rope through the groove and pull"), effects: [{ op: "set", path: "flags.freedPoupiquet", value: true }, { op: "increment", path: "expedition.fatigue", value: 2 }, { op: "increment", path: "expedition.wounds", value: 1 }, { op: "set", path: "heroConditions.bashkar", value: "hurt" }, { op: "increment", path: "expedition.morale", value: 2 }], to: "poupiquet_free" },
    { id: "leave-poupiquet", label: l("Retenir l'information et chercher l'autel", "Keep the information and seek the altar"), effects: [{ op: "set", path: "flags.warnedByPoupiquet", value: true }], to: "water_chapel" },
  ],
  poupiquet_free: [
    { id: "take-poupiquet", label: l("Suivre Poupiquet vers la chapelle", "Follow Poupiquet to the chapel"), effects: [{ op: "set", path: "flags.warnedByPoupiquet", value: true }], to: "water_chapel" },
  ],
  water_chapel: [
    { id: "break-rite", label: l("Retourner le collier selon le cinquième anneau", "Turn the necklace according to the fifth ring"), requires: { path: "state.flags.understoodRite", equals: true }, to: "rite_broken" },
    { id: "take-necklace", label: l("Prendre le collier trilobé pour vous-même", "Take the trilobed necklace for yourself"), effects: [{ op: "set", path: "flags.tookNecklace", value: true }, { op: "addUnique", path: "inventory", value: "trilobed_necklace" }, { op: "increment", path: "expedition.alert", value: 1 }, { op: "increment", path: "expedition.morale", value: -2 }, { op: "set", path: "heroConditions.aldren", value: "strained" }], to: "gate_chamber" },
  ],
  rite_broken: [
    { id: "cross-breach", label: l("Passer par la brèche vers les portes", "Cross the breach toward the gates"), to: "gate_chamber" },
  ],
  gate_chamber: [
    { id: "inspect-wedge", label: l("Examiner le coin de sabotage et ses runes", "Examine the sabotage wedge and its runes"), effects: [{ op: "set", path: "flags.foundSabotage", value: true }, { op: "addUnique", path: "clues", value: "gate_sabotage" }], result: { text: l("Le coin a été enduit d'une magie de désagrégation. Il ne suffit pas de le retirer : les boucliers doivent être neutralisés, ou la porte tiendra pendant qu'une autre vague sera guidée sur la ville.", "The wedge has been coated in a magic of disintegration. Removing it is not enough: the shields must be neutralised, or the gate will hold while another wave is guided into the city.") } },
    { id: "catch-breath", label: l("S'adosser aux engrenages et reprendre souffle", "Lean against the gears and catch your breath"), requires: { path: "state.expedition.fatigue", atLeast: 5 }, effects: [{ op: "increment", path: "expedition.fatigue", value: -3 }, { op: "increment", path: "expedition.morale", value: 1 }, { op: "set", path: "heroConditions.party", value: "steady" }], result: { text: l("Vous vous accordez quelques respirations, pas davantage. Les engrenages imposent leur cadence; pourtant, ce court silence suffit à remettre les mains et les regards à l'unisson.", "You grant yourselves a few breaths, no more. The gears impose their cadence; yet this brief silence is enough to bring hands and glances back into rhythm.") } },
    { id: "remove-wedge", label: l("Arracher le coin et sécuriser le gond", "Tear out the wedge and secure the hinge"), requires: { path: "state.flags.foundSabotage", equals: true }, effects: [{ op: "set", path: "flags.disabledSabotage", value: true }, { op: "addUnique", path: "inventory", value: "sabotage_wedge" }, { op: "increment", path: "expedition.fatigue", value: 2 }, { op: "set", path: "heroConditions.bashkar", value: "strained" }, { op: "increment", path: "expedition.morale", value: 1 }], to: "shield_terrace" },
    { id: "climb-surface", label: l("Remonter chercher la garde municipale", "Climb up to seek the city guard"), to: "city_steps" },
  ],
  shield_terrace: [
    { id: "present-proof", label: l("Porter les preuves à la surface", "Carry the evidence to the surface"), to: "city_steps" },
    { id: "disarm-shields", label: l("Désamorcer les boucliers grâce au rite", "Disarm the shields through the rite"), requires: { path: "state.flags.understoodRite", equals: true }, to: "public_reckoning" },
  ],
  city_steps: [
    { id: "call-guard", label: l("Mettre les preuves entre les mains du sergent", "Place the evidence in the sergeant's hands"), requires: { path: "state.flags.disabledSabotage", equals: true }, to: "public_reckoning" },
    { id: "return-gates", label: l("Redescendre régler le danger sans témoin", "Descend to settle the danger without witnesses"), requires: { path: "state.flags.disabledSabotage", equals: true }, to: "ending_silent" },
  ],
  public_reckoning: [
    { id: "save-city", label: l("Faire arrêter les saboteurs et briser le réseau", "Have the saboteurs arrested and break the network"), requires: { all: [{ path: "state.flags.disabledSabotage", equals: true }, { path: "state.clues", lengthAtLeast: 2 }] }, to: "ending_dawn" },
    { id: "save-quietly", label: l("Choisir le salut discret avant l'aube", "Choose quiet salvation before dawn"), requires: { path: "state.flags.disabledSabotage", equals: true }, to: "ending_silent" },
  ],
};

export const FIXED_CHOICES = Object.fromEntries(
  [...new Set([...Object.keys(CORE_CHOICES), ...Object.keys(WORLD_EXPANSION_CHOICES)])]
    .map((sceneId) => [sceneId, [...(CORE_CHOICES[sceneId] ?? []), ...(WORLD_EXPANSION_CHOICES[sceneId] ?? [])]]),
);
