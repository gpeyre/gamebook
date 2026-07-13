const l = (fr, en) => ({ fr, en });

// Authored, finite choices for the book mode.  The engine does not know any of
// these identifiers: it only reads choices, conditions, effects, and prose.
const WORLD_EXPANSION_SCENES = {
  festival_arcade: {
    title: l("La galerie des lanternes", "The lantern arcade"),
    description: l("Au-dessus de la faille, les marchands ont suspendu des centaines de lanternes de papier entre les arcades. Leur lumière rend les masques plus beaux et les mensonges plus faciles. Néris Vhal, cartographe aveugle au monde mais attentive aux voix, vend des plans absents de tout registre municipal; elle reconnaît les gens au rythme de leurs pas.", "Above the chasm, merchants have strung hundreds of paper lanterns between the arcades. Their light makes masks lovelier and lies easier. Neris Vhal, a cartographer blind to the world but attentive to voices, sells maps absent from every municipal register; she recognizes people by the rhythm of their steps."),
    revisitDescription: l("La galerie n'est plus tout à fait une fête depuis que vous savez ce qui dort sous les pavés. Néris reconnaît votre pas avant votre voix et relève la tête : « Vous marchez comme quelqu'un qui a trouvé trop de portes. »", "The arcade is no longer quite a festival now that you know what sleeps beneath the paving stones. Neris recognizes your step before your voice and looks up: “You walk like someone who has found too many doors.”"),
  },
  secret_map_stall: {
    title: l("L'étal des cartes sans nord", "The stall of northless maps"),
    description: l("Néris déplie une peau de poisson traitée à l'huile. Les rues de Laelith y sont dessinées comme des ruisseaux, et les égouts comme des constellations. Elle ne vous demande pas pourquoi vous cherchez un passage : elle écoute le silence après votre réponse, puis indique un ancien chenal reliant les douanes, le verger royal et les galeries Utruz.", "Neris unfolds a fish-skin treated with oil. Laelith's streets are drawn upon it as streams, and its sewers as constellations. She does not ask why you seek a passage: she listens to the silence after your answer, then points out an old channel linking customs, the royal orchard, and the Utruz galleries."),
    visitDescriptions: [{ requires: { path: "state.flags.metNeris", equals: true }, text: l("Néris a laissé une tasse chaude pour vous, ce qui vaut chez elle promesse de confiance. Ses doigts suivent vos nouvelles traces sur la carte et elle murmure : « Les mêmes hommes déplacent les caisses et les peurs. Ne confondez pas le chemin avec celui qui le paie. »", "Neris has left a warm cup for you, which from her amounts to a promise of trust. Her fingers follow your new tracks on the map and she murmurs: “The same men move the crates and the fear. Do not confuse the road with the one who pays for it.”") }],
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
    description: l("Une niche de pierre protège une statue sans visage, polie par des générations de mains mouillées. Des bateliers y ont laissé du pain, des rubans et un bol de sel. Sœur Ysilde garde le sanctuaire : elle ne vous demande pas qui vous êtes, seulement si vous avez déjà choisi de laisser quelqu'un derrière vous — puis elle attend une réponse, sans vous sauver de son poids.", "A stone niche shelters a faceless statue, polished by generations of wet hands. Boatmen have left bread, ribbons, and a bowl of salt there. Sister Ysilde keeps the shrine: she does not ask who you are, only whether you have ever chosen to leave someone behind—then waits for an answer, without rescuing you from its weight."),
    visitDescriptions: [{ requires: { path: "state.flags.metYsilde", equals: true }, text: l("Ysilde ne vous bénit pas cette fois. Elle regarde vos mains, vos blessures et le nombre de personnes qui vous suivent. « On reconnaît une promesse à ce qu'elle vous coûte », dit-elle avant de préparer ses herbes.", "Ysilde does not bless you this time. She looks at your hands, your wounds, and how many people follow you. “You recognize a promise by what it costs you,” she says before preparing her herbs.") }],
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
    description: l("La fournaise des verriers continue de brûler malgré la fête. Les apprentis soufflent des sphères bleues destinées à flotter sur la rivière au retour des eaux. Leur maîtresse, Maëlin Orse, reconnaît immédiatement la poudre grise venue des vannes : elle entre dans le verre de signalisation, et ne devrait jamais se trouver sur un chantier. Elle feint pourtant l'indifférence avant de vérifier qui écoute.", "The glasswrights' furnace keeps burning despite the festival. Apprentices blow blue spheres meant to float upon the river when the water returns. Their mistress, Maelin Orse, immediately recognizes the grey powder from the sluices: it belongs in signalling glass and should never be on a worksite. Yet she feigns indifference before checking who is listening."),
    visitDescriptions: [{ requires: { path: "state.flags.metMaelin", equals: true }, text: l("Maëlin ne vous offre pas un sourire, mais elle a fait éloigner ses apprentis des fours. Sa réserve n'est plus de la méfiance : c'est la peur de les mêler à une histoire dont elle connaît trop bien la matière.", "Maelin offers no smile, but she has sent her apprentices away from the furnaces. Her reserve is no longer distrust: it is fear of involving them in a story whose materials she knows too well.") }],
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
    description: l("Sous les poutres noircies, les passeurs ont gravé sur un mur les noms de ceux qu'ils ont ramenés vivants. Leur doyenne, Barga Senn, ne vous offre pas une barque : elle vous demande quel quartier vous choisiriez de sauver si tous ne pouvaient l'être. Elle ne cherche pas la bonne réponse, mais la réponse que vous assumerez lorsqu'elle aura un visage.", "Beneath blackened beams, ferrymen have carved on one wall the names of those they brought back alive. Their elder, Barga Senn, does not offer you a boat: she asks which ward you would save if not all could be saved. She is not looking for the right answer, but for the one you will own when it has a face."),
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

// Optional stories and intermediate junctions. They are fully authored nodes,
// not procedural filler: each can be investigated, used as a shortcut, or
// become a different route back into the main conspiracy.
const ANNEX_SCENES = {
  mask_exchange: {
    title: l("La bourse des visages empruntés", "The exchange of borrowed faces"),
    description: l("Sous une halle de bois, les masques passent de main en main contre des promesses plutôt que des pièces. Un visage de cire blanche porte le même pli à l'œil que les coursiers de Souleyna. Derrière les étals, des escaliers descendent vers des conduites que les danseurs n'utilisent jamais.", "Beneath a wooden hall, masks pass from hand to hand for promises rather than coins. A white wax face bears the same crease at the eye as Souleyna's couriers. Behind the stalls, stairs descend to conduits the dancers never use."),
  },
  water_clock: {
    title: l("L'horloge des eaux lentes", "The clock of slow waters"),
    description: l("Une tour carrée cache une horloge dont le pendule baigne dans un tube de verre. Elle ne compte pas les heures, mais les pressions dans les canaux. Ses aiguilles se sont arrêtées juste avant une marque gravée d'un anneau quadruple.", "A square tower hides a clock whose pendulum bathes in a glass tube. It counts not hours but pressures in the canals. Its hands stopped just before a mark engraved with a quadruple ring."),
    revisitDescription: l("Les aiguilles n'ont pas bougé, mais vous savez désormais lire leur immobilité. L'arrêt n'est pas une panne : c'est le signal que quelqu'un attend.", "The hands have not moved, but you now know how to read their stillness. The stop is not a fault: it is the signal someone is waiting for."),
  },
  bell_foundry: {
    title: l("La fonderie des cloches sourdes", "The foundry of mute bells"),
    description: l("Les moules de bronze refroidissent dans le sable. Ici, les cloches sont conçues pour parler sous l'eau : leur métal est percé de rainures presque invisibles. Maëlin Orse a conservé un battant refusé par les portes, car son timbre faisait trembler les vitres de tout un quartier. Elle vous reçoit ici sans ses apprentis, comme si elle avait déjà décidé jusqu'où son courage pouvait aller.", "Bronze moulds cool in the sand. Here, bells are made to speak beneath water: their metal is cut with almost invisible grooves. Maelin Orse kept a clapper rejected by the gates, because its tone made every window in a ward tremble. She receives you here without her apprentices, as if she had already decided how far her courage can go."),
    visitDescriptions: [{ requires: { path: "state.flags.metMaelin", equals: true }, text: l("Maëlin a disposé la facture brûlée près du battant, sans la commenter. C'est sa manière de vous dire qu'elle vous croit désormais assez pour risquer sa propre place.", "Maelin has set the burnt invoice beside the clapper without commenting on it. This is her way of telling you she now trusts you enough to risk her own position.") }],
  },
  customs_annex: {
    title: l("L'annexe des cargaisons grises", "The annex of grey cargoes"),
    description: l("L'annexe n'apparaît sur aucun plan municipal. Ses couloirs sont garnis d'étiquettes, de cordes et de balances portatives. Les caisses sans propriétaire y restent une nuit, assez longtemps pour recevoir un nouveau sceau et une nouvelle histoire.", "The annex appears on no municipal map. Its corridors are lined with labels, ropes, and portable scales. Ownerless crates remain here for one night—long enough to receive a new seal and a new story."),
  },
  canal_infirmary: {
    title: l("L'infirmerie des haleurs", "The haulers' infirmary"),
    description: l("Des lits étroits bordent une salle qui sent le vinaigre et les algues. Les haleurs blessés y parlent dans leur sommeil de charges trop lourdes et de lumières bleues sous les arches. Ysilde a confié la salle à Hara, une soigneuse qui tient la liste de ceux que les patrons ont fait disparaître des registres — et qui redoute que cette liste devienne bientôt la sienne.", "Narrow beds line a room smelling of vinegar and algae. Injured haulers speak in their sleep of loads too heavy and blue lights beneath the arches. Ysilde entrusted the room to Hara, a healer who keeps the list of those employers erased from the records—and fears that the list will soon include her."),
    visitDescriptions: [{ requires: { path: "state.flags.metYsilde", equals: true }, text: l("Hara a déjà reçu le mot d'Ysilde. Elle ne pose pas de question sur votre passage par le sanctuaire; elle vous tend simplement des bandages et vous laisse choisir ce que vous êtes prêts à porter avec vous.", "Hara has already received Ysilde's word. She asks no question about your passage through the shrine; she simply offers bandages and lets you choose what you are prepared to carry with you.") }],
  },
  tide_garden: {
    title: l("Le jardin des eaux retenues", "The garden of held waters"),
    description: l("Dans une cour inondable, des roseaux sont plantés en spirale autour de bassins peu profonds. Les jardiniers les utilisent pour lire la qualité de l'eau : certaines tiges noircissent lorsqu'un ordre magique traverse le canal. Ce matin, trois spirales ont noirci d'un seul coup.", "In a floodable courtyard, reeds are planted in spirals around shallow basins. Gardeners use them to read water quality: certain stems blacken when a magical command crosses the canal. This morning, three spirals blackened at once."),
  },
  sluice_workshop: {
    title: l("L'atelier des vannes de secours", "The workshop of emergency sluices"),
    description: l("Des engrenages démontés sont suspendus à des crochets, chacun étiqueté d'une date de crue. Les faux ouvriers ont pris une roue de secours et laissé à sa place un cercle de bois peint. Un apprenti terrifié sait où la vraie pièce a été portée, mais il ne veut pas parler à voix haute.", "Dismantled gears hang from hooks, each labelled with a flood date. The false workers took a spare wheel and left a painted wooden circle in its place. A frightened apprentice knows where the real part was carried, but will not speak aloud."),
  },
  broken_weir: {
    title: l("Le déversoir brisé", "The broken weir"),
    description: l("Une dent de pierre manque au déversoir, ouvrant une bouche noire vers les niveaux bas. Les marques de corde sur le bord sont récentes; quelqu'un a descendu une charge en évitant les quais. L'eau absente a laissé dans les fissures des cristaux bleus qui vibrent à chaque grondement.", "One stone tooth is missing from the weir, opening a black mouth toward the lower levels. Rope marks on its edge are recent; someone lowered a load while avoiding the docks. The absent water left blue crystals in the cracks, vibrating with every rumble."),
  },
  submerged_theater: {
    title: l("Le théâtre submergé", "The submerged theatre"),
    description: l("Les gradins plongent dans une eau immobile et la scène est recouverte de limon. Des décors de tempête sont encore suspendus aux cintres. Les contrebandiers ont profité des dessous du théâtre : leurs caisses se cachent parmi les accessoires, là où personne ne chercherait autre chose que des fantômes.", "The seating descends into still water and the stage is covered in silt. Storm scenery still hangs from the flies. Smugglers used the theatre's under-stage spaces: their crates hide among props, where no one would seek anything but ghosts."),
  },
  whisper_stairs: {
    title: l("Les escaliers qui répètent", "The repeating stairs"),
    description: l("Ces marches tournent autour d'un puits d'aération. Chaque mot prononcé sur la première volée revient, déformé, à la quatrième. Des coursiers y échangent des phrases coupées en morceaux, confiants que personne ne peut comprendre une conversation dont l'écho arrive dans le désordre.", "These steps coil around an air shaft. Every word spoken on the first flight returns, distorted, on the fourth. Couriers exchange sentences cut into pieces here, trusting that no one can understand a conversation whose echo arrives out of order."),
  },
  drowned_oratory: {
    title: l("L'oratoire englouti", "The drowned oratory"),
    description: l("Sous un plafond de pierre, des bancs de prière flottent à demi disloqués. Les fresques ne représentent pas des saints, mais des mains ouvertes devant l'eau. Une psalmodie gravée dans le mur donne des noms anciens aux mêmes gestes que le rite d'Utruz.", "Beneath a stone ceiling, prayer benches float half broken apart. The frescoes show not saints but open hands before water. A chant carved in the wall gives ancient names to the same gestures as the Utruz rite."),
  },
  signal_gallery: {
    title: l("La galerie des fils de cuivre", "The gallery of copper wires"),
    description: l("Des fils de cuivre courent le long d'une galerie trop propre pour être abandonnée. Ils relient les cloches, les boucliers et des niches de verre bleu. À chaque jonction, quelqu'un a inscrit une initiale différente : le réseau a plusieurs mains, et aucune ne veut signer l'ensemble.", "Copper wires run along a gallery too clean to be abandoned. They link bells, shields, and niches of blue glass. At every junction, someone inscribed a different initial: the network has many hands, and none wants to sign the whole."),
  },
  chain_walkway: {
    title: l("La passerelle des chaînes", "The chain walkway"),
    description: l("Une passerelle étroite suit les chaînes qui équilibrent les portes. Sous vos pieds, chaque maillon porte une marque d'entretien ou de sabotage. Le vide ne tue pas seulement : il offre aussi la meilleure vue sur les chemins que les mécaniciens croyaient secrets.", "A narrow walkway follows the chains balancing the gates. Beneath your feet, each link bears a maintenance or sabotage mark. The void does not only kill: it also offers the best view of paths mechanics thought secret."),
  },
  lantern_hospice: {
    title: l("L'hospice des lanternes basses", "The hospice of low lanterns"),
    description: l("Au fond d'une cour silencieuse, des lanternes restent suspendues à hauteur de visage pour guider les blessés dans la brume. Les sœurs de l'hospice, alliées d'Ysilde sans être ses subordonnées, ont recueilli un messager sans mémoire. Sœur Ivara refuse de le livrer aux gardes : ses doigts portent encore de la poudre bleue, mais sa peur lui paraît plus vraie que sa faute.", "At the back of a silent courtyard, lanterns hang at face height to guide the injured through mist. The hospice sisters, allies of Ysilde but not her subordinates, sheltered a messenger with no memory. Sister Ivara refuses to surrender him to the guards: blue powder still clings to his fingers, but his fear feels truer to her than his guilt."),
    visitDescriptions: [{ requires: { path: "state.flags.metYsilde", equals: true }, text: l("Ivara vous reconnaît à la manière dont Ysilde a noué votre bandage. Elle vous laisse approcher le messager, mais prévient : « Aidez-le à se souvenir; ne faites pas de lui une preuve avant qu'il redevienne une personne. »", "Ivara recognizes you by the way Ysilde tied your bandage. She lets you approach the messenger, but warns: “Help him remember; do not make him evidence before he becomes a person again.”") }],
  },
  alchemist_pier: {
    title: l("Le quai des alchimistes", "The alchemists' pier"),
    description: l("Des fioles sont suspendues au-dessus d'une eau stagnante pour y prendre la couleur des reflets. Les alchimistes du canal prétendent fabriquer des teintures; leurs registres montrent surtout des commandes de verre, de sel et de cuivre pour des clients qui n'existent pas.", "Vials hang above stagnant water to take on the colour of reflections. Canal alchemists claim to make dyes; their ledgers mostly show orders for glass, salt, and copper from clients who do not exist."),
  },
  submerged_granary: {
    title: l("Le grenier noyé", "The drowned granary"),
    description: l("Les silos de pierre plongent sous une eau sombre, mais les passerelles de chargement tiennent encore. Dans les sacs gonflés de grain, quelqu'un a caché des sphères de verre bleu et des rouleaux de fil de cuivre, comme si la famine devait servir de rideau à une autre opération.", "Stone silos plunge beneath dark water, but their loading walkways still stand. Among swollen sacks of grain, someone hid blue-glass spheres and coils of copper wire, as if famine were meant to curtain another operation."),
  },
  salt_tunnels: {
    title: l("Les tunnels de sel ancien", "The tunnels of ancient salt"),
    description: l("Sous les entrepôts, des veines de sel traversent la roche et renvoient la moindre lueur en éclats pâles. Les contrebandiers ont gravé des flèches sur les parois; certaines mènent vers les canaux, d'autres vers des portes que les plans modernes ont oubliées.", "Beneath the warehouses, veins of salt run through the rock and return the slightest light in pale flashes. Smugglers carved arrows into the walls; some lead toward the canals, others toward doors modern maps forgot."),
  },
  ancient_pump_room: {
    title: l("La chambre des pompes antiques", "The chamber of ancient pumps"),
    description: l("Quatre pompes de bronze reposent dans une salle ronde, chacune assez grande pour avaler un homme. Elles ne servent plus à remonter l'eau, mais leurs pistons restent reliés aux déversoirs. Une seule manivelle bloquée pourrait détourner une pression entière vers les portes.", "Four bronze pumps rest in a round room, each large enough to swallow a person. They no longer raise water, but their pistons remain linked to the weirs. A single jammed crank could divert an entire pressure toward the gates."),
  },
  paper_mill: {
    title: l("Le moulin à papier", "The paper mill"),
    description: l("La roue du moulin est immobile, mais les cuves de pâte blanche sont encore tièdes. Des feuilles officielles sèchent sur des cordes, vierges de tout texte mais déjà timbrées. On peut y fabriquer un ordre avant même de décider ce qu'il ordonnera.", "The mill wheel is still, but vats of white pulp are warm. Official sheets dry on lines, blank of text but already stamped. Here, an order can be made before anyone decides what it will command."),
  },
  archivist_cellar: {
    title: l("La cave des archivistes", "The archivists' cellar"),
    description: l("Sous le cloître, des rayonnages de pierre conservent les copies qu'on ne veut pas brûler. L'humidité a soudé les boîtes à leurs étagères. Dans l'une d'elles, un archiviste prudent a caché une chronologie des inondations politiques de Laelith.", "Beneath the cloister, stone shelves preserve copies no one wants to burn. Damp has fused boxes to their shelves. In one, a prudent archivist hid a chronology of Laelith's political floods."),
  },
  ruined_bell_tower: {
    title: l("La tour des cloches ruinée", "The ruined bell tower"),
    description: l("La moitié haute de la tour s'est effondrée depuis longtemps, laissant les cloches ouvertes au vent. Une corde neuve descend pourtant jusqu'à une fenêtre murée. Quelqu'un utilise les ruines pour écouter le réseau sans passer par ses chambres officielles.", "The tower's upper half collapsed long ago, leaving its bells open to the wind. Yet a new rope drops to a walled window. Someone uses the ruins to listen to the network without entering its official chambers."),
  },
};

export const WORLD_EXPANSION_CHOICES = {
  river_gate: [
    { id: "browse-lanterns", label: l("Traverser la galerie des lanternes", "Cross the lantern arcade"), to: "festival_arcade" },
    { id: "ask-ferryman", label: l("Descendre vers les marches du canal", "Go down to the canal steps"), to: "canal_steps" },
    { id: "visit-salt-market", label: l("Suivre l'odeur du sel bleu jusqu'au marché", "Follow the scent of blue salt to the market"), to: "salt_market" },
  ],
  festival_arcade: [
    { id: "buy-secret-map", label: l("Écouter Néris et acheter son plan", "Hear Neris out and buy her map"), requires: { path: "state.expedition.wealth", atLeast: 8 }, effects: [{ op: "increment", path: "expedition.wealth", value: -8 }, { op: "addUnique", path: "clues", value: "old_flood_map" }, { op: "set", path: "flags.metNeris", value: true }, { op: "increment", path: "relationships.neris", value: 2 }, { op: "increment", path: "expedition.morale", value: 1 }], to: "secret_map_stall" },
    { id: "consult-neris-again", label: l("Revenir demander à Néris ce que vos pas racontent", "Return to ask Neris what your steps reveal"), requires: { path: "state.flags.metNeris", equals: true }, effects: [{ op: "increment", path: "relationships.neris", value: 1 }, { op: "increment", path: "expedition.morale", value: 1 }], result: { text: l("Néris écoute votre démarche sur les dalles avant de toucher votre carte. « Vous revenez de l'eau, mais vous portez aussi le bruit du cuivre. Les deux pistes se rejoignent toujours chez ceux qui prétendent ne rien savoir. »", "Neris listens to your gait on the paving stones before touching your map. “You return from water, but you also carry the sound of copper. The two trails always meet among those who claim to know nothing.”") } },
    { id: "watch-festival", label: l("Observer les masques et les messagers", "Watch the masks and messengers"), effects: [{ op: "increment", path: "expedition.alert", value: 1 }], to: "river_gate" },
    { id: "visit-glasswrights", label: l("Suivre la lueur des verriers", "Follow the glasswrights' glow"), to: "glasswright_yard" },
  ],
  glasswright_yard: [
    { id: "compare-grey-powder", label: l("Comparer la poudre des vannes aux pigments avec Maëlin", "Compare sluice powder with the pigments alongside Maelin"), effects: [{ op: "addUnique", path: "clues", value: "white_boot_order" }, { op: "set", path: "flags.metMaelin", value: true }, { op: "increment", path: "relationships.maelin", value: 2 }, { op: "increment", path: "expedition.morale", value: 1 }], result: { text: l("Maëlin reconnaît la recette, puis se tait assez longtemps pour que vous compreniez qu'elle a déjà refusé une commande semblable. « La poudre prépare un verre qui émet un signal dans l'eau. Je n'ai pas posé de question la première fois. »", "Maelin recognizes the recipe, then falls silent long enough for you to understand she has refused such an order before. “The powder prepares glass that emits a signal in water. I did not ask questions the first time.”") } },
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
    { id: "bind-wounds", label: l("Laisser Sœur Ysilde panser les blessures", "Let Sister Ysilde bind the wounds"), requires: { path: "state.expedition.wounds", atLeast: 1 }, effects: [{ op: "increment", path: "expedition.wounds", value: -1 }, { op: "set", path: "flags.metYsilde", value: true }, { op: "increment", path: "relationships.ysilde", value: 2 }, { op: "increment", path: "expedition.morale", value: 1 }, { op: "set", path: "heroConditions.bashkar", value: "tired" }], result: { text: l("Ysilde écrase des feuilles de sel et de mousse contre la plaie. La douleur ne disparaît pas, mais elle cesse de décider pour vous. « Revenez vivant », dit-elle, comme une instruction plutôt qu'une bénédiction.", "Ysilde crushes salt leaves and moss against the wound. The pain does not vanish, but it stops making decisions for you. “Come back alive,” she says, like an instruction rather than a blessing.") } },
    { id: "hear-tide-prayer", label: l("Écouter la prière des marins avec Ysilde", "Listen to the sailors' prayer with Ysilde"), effects: [{ op: "set", path: "flags.metYsilde", value: true }, { op: "increment", path: "relationships.ysilde", value: 1 }, { op: "increment", path: "expedition.morale", value: 1 }, { op: "set", path: "heroConditions.odran", value: "inspired" }], to: "echo_well" },
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

const ANNEX_CHOICES = {
  mask_exchange: [
    { id: "unmask-courier", label: l("Examiner le pli de cire d'un masque de coursier", "Examine the wax fold on a courier's mask"), effects: [{ op: "addUnique", path: "clues", value: "courier_seal" }], result: { text: l("Sous la cire, vous trouvez une empreinte de sceau municipale inversée. Les messagers ne se déguisent pas pour fuir la loi, mais pour emprunter son visage.", "Beneath the wax, you find an inverted municipal-seal impression. The messengers do not disguise themselves to flee the law, but to borrow its face.") } },
    { id: "mask-to-embassy", label: l("Passer par l'arrière-salle vers l'ambassade", "Pass through the back room toward the embassy"), to: "embassy_vestry" },
    { id: "mask-to-festival", label: l("Acheter un masque neutre et rejoindre la fête", "Buy a neutral mask and rejoin the festival"), effects: [{ op: "increment", path: "expedition.wealth", value: -1 }], to: "festival_arcade" },
    { id: "mask-to-glass", label: l("Suivre la poudre bleue jusqu'aux verriers", "Follow blue powder to the glasswrights"), to: "glasswright_yard" },
    { id: "mask-to-clock", label: l("Descendre l'escalier caché vers l'horloge", "Descend the hidden stair to the clock"), to: "water_clock" },
  ],
  water_clock: [
    { id: "read-stopped-dial", label: l("Lire les marques autour de l'aiguille arrêtée", "Read the marks around the stopped hand"), effects: [{ op: "addUnique", path: "clues", value: "flood_schedule" }], result: { text: l("Le cadran associe la marque des quatre anneaux à une impulsion de cloche et à un canal de dérivation. Le signal n'est pas abstrait : il a une heure mécanique.", "The dial ties the four-ring mark to a bell pulse and a diversion canal. The signal is not abstract: it has a mechanical hour.") } },
    { id: "clock-to-foundry", label: l("Monter par la cage du pendule jusqu'à la fonderie", "Climb the pendulum cage to the foundry"), to: "bell_foundry" },
    { id: "clock-to-garden", label: l("Suivre le trop-plein vers le jardin des eaux", "Follow the overflow to the water garden"), to: "tide_garden" },
    { id: "clock-to-annex", label: l("Comparer les relevés aux registres de l'annexe", "Compare the readings with the annex registers"), to: "customs_annex" },
    { id: "clock-to-city", label: l("Sortir par la tour vers les marches de la ville", "Leave the tower for the city steps"), to: "city_steps" },
  ],
  bell_foundry: [
    { id: "compare-rejected-clapper", label: l("Comparer le battant refusé aux marques des boucliers", "Compare the rejected clapper with the shield marks"), effects: [{ op: "addUnique", path: "clues", value: "white_boot_order" }], result: { text: l("Les rainures donnent la même séquence que la devise ancienne : retenir, guider, rompre. Ici, elle devient un son que la ville entière pourrait entendre.", "The grooves give the same sequence as the ancient motto: contain, guide, break. Here, it becomes a sound the whole city could hear.") } },
    { id: "ask-founder", label: l("Demander à Maëlin ce qu'elle risque en parlant", "Ask Maelin what she risks by speaking"), effects: [{ op: "set", path: "flags.metMaelin", value: true }, { op: "increment", path: "relationships.maelin", value: 1 }, { op: "increment", path: "expedition.morale", value: 1 }], result: { text: l("Maëlin refuse d'abord un nom, puis vous remet une facture brûlée. « Mes apprentis n'ont que leurs fours. Si le Conseil apprend que j'ai parlé, ils les perdront avec moi. » Un conseiller a payé pour que certaines cloches ne figurent jamais dans l'inventaire.", "Maelin first refuses a name, then gives you a burnt invoice. “My apprentices have only their furnaces. If the Council learns I spoke, they will lose them with me.” A councillor paid to keep certain bells out of the inventory.") } },
    { id: "foundry-to-signal", label: l("Suivre le fil de cuivre jusqu'à la galerie des signaux", "Follow the copper wire to the signal gallery"), to: "signal_gallery" },
    { id: "foundry-to-cistern", label: l("Passer par les toits jusqu'à la citerne", "Cross the rooftops to the cistern"), to: "rooftop_cistern" },
    { id: "foundry-to-mask", label: l("Revenir au marché des masques par les fours éteints", "Return to the mask market through the cold furnaces"), to: "mask_exchange" },
  ],
  customs_annex: [
    { id: "audit-grey-crates", label: l("Auditer les matrices des caisses grises", "Audit the dies on the grey crates"), effects: [{ op: "addUnique", path: "clues", value: "council_ledger" }], result: { text: l("Les mêmes matrices servent à créer trois cargaisons imaginaires à partir d'une seule boîte réelle. Le conseiller n'a pas seulement fermé les yeux : il a fourni la méthode.", "The same dies create three imaginary cargos from one real box. The councillor did not merely look away: he supplied the method.") } },
    { id: "annex-to-salt", label: l("Suivre les reçus jusqu'au marché du sel", "Follow the receipts to the salt market"), to: "salt_market" },
    { id: "annex-to-infirmary", label: l("Suivre un manifeste de canal jusqu'à l'infirmerie", "Follow a canal manifest to the infirmary"), to: "canal_infirmary" },
    { id: "annex-to-garden", label: l("Prendre la porte de lavage vers le jardin des eaux", "Take the wash door to the water garden"), to: "tide_garden" },
    { id: "annex-to-tribunal", label: l("Porter les écarts de registre au Tribunal", "Take the ledger discrepancies to the Tribunal"), to: "tribunal_gallery" },
  ],
  canal_infirmary: [
    { id: "treat-hauler-wound", label: l("Aider Hara à panser un haleur", "Help Hara bind a hauler's wound"), requires: { path: "state.expedition.wounds", atLeast: 1 }, effects: [{ op: "increment", path: "expedition.wounds", value: -1 }, { op: "set", path: "flags.metYsilde", value: true }, { op: "increment", path: "relationships.ysilde", value: 1 }, { op: "increment", path: "expedition.morale", value: 1 }], result: { text: l("Hara voit que vous connaissez les gestes d'Ysilde et cesse de vous cacher ses inquiétudes. En échange, le haleur murmure qu'une caisse de verre bleu a été descendue sous le théâtre, loin de tout contrôle.", "Hara sees that you know Ysilde's methods and stops hiding her worries from you. In return, the hauler whispers that a crate of blue glass was lowered beneath the theatre, far from any inspection.") } },
    { id: "hear-hauler-dream", label: l("Écouter le récit fiévreux d'un haleur", "Listen to a hauler's fevered account"), effects: [{ op: "addUnique", path: "clues", value: "white_boot_order" }], to: "glasswright_yard" },
    { id: "infirmary-to-garden", label: l("Suivre les herbes médicinales vers le jardin", "Follow medicinal herbs to the garden"), to: "tide_garden" },
    { id: "infirmary-to-shrine", label: l("Rejoindre la prêtresse du sanctuaire", "Rejoin the shrine priestess"), to: "river_shrine" },
    { id: "infirmary-to-theater", label: l("Suivre les brancards jusqu'au théâtre submergé", "Follow the stretchers to the submerged theatre"), to: "submerged_theater" },
  ],
  tide_garden: [
    { id: "harvest-black-reeds", label: l("Récolter des roseaux noircis pour vos provisions", "Gather blackened reeds for your supplies"), effects: [{ op: "increment", path: "expedition.supplies", value: 1 }], result: { text: l("Les jardiniers vous apprennent à filtrer l'eau avec les fibres encore saines. Ce n'est pas un remède, mais c'est une marge de sécurité.", "The gardeners show you how to filter water with the still-healthy fibres. It is not a cure, but it is a margin of safety.") } },
    { id: "garden-to-weir", label: l("Suivre le canal secondaire jusqu'au déversoir", "Follow the secondary canal to the weir"), to: "broken_weir" },
    { id: "garden-to-clock", label: l("Remonter le tuyau de mesure vers l'horloge", "Climb the measuring pipe to the clock"), to: "water_clock" },
    { id: "garden-to-oratory", label: l("Prendre un passage de racines vers l'oratoire", "Take a root passage to the oratory"), to: "drowned_oratory" },
    { id: "garden-to-steps", label: l("Revenir aux marches du canal", "Return to the canal steps"), to: "canal_steps" },
  ],
  sluice_workshop: [
    { id: "inspect-spare-gear", label: l("Examiner la roue de secours remplacée", "Inspect the replaced spare wheel"), effects: [{ op: "addUnique", path: "clues", value: "gate_sabotage" }], result: { text: l("Le cercle de bois cache une empreinte de métal frais. Les saboteurs n'ont pas seulement préparé la rupture : ils ont retiré de quoi la réparer vite.", "The wooden circle hides an imprint of fresh metal. Saboteurs did not only prepare the break: they removed what could repair it quickly.") } },
    { id: "workshop-to-weir", label: l("Suivre la pièce volée jusqu'au déversoir", "Follow the stolen part to the weir"), to: "broken_weir" },
    { id: "workshop-to-signal", label: l("Prendre le puits des apprentis vers les signaux", "Take the apprentices' shaft to the signals"), to: "signal_gallery" },
    { id: "workshop-to-workers", label: l("Revenir au chantier en portant une roue", "Return to the worksite carrying a wheel"), to: "workers_bank" },
    { id: "workshop-to-loft", label: l("Grimper jusqu'aux contrepoids", "Climb to the counterweights"), to: "counterweight_loft" },
  ],
  broken_weir: [
    { id: "read-weir-crystals", label: l("Lire les vibrations des cristaux bleus", "Read the vibration of the blue crystals"), effects: [{ op: "addUnique", path: "clues", value: "old_flood_map" }], result: { text: l("Les cristaux réagissent à la direction de l'eau, pas à sa force. Vous pouvez tracer le chemin que les saboteurs veulent imposer à la vague.", "The crystals react to water's direction, not its force. You can trace the path saboteurs mean to impose upon the wave.") } },
    { id: "weir-to-garden", label: l("Traverser les pierres vers le jardin", "Cross the stones to the garden"), to: "tide_garden" },
    { id: "weir-to-tunnel", label: l("Descendre par la bouche du déversoir", "Descend through the weir's mouth"), to: "flooded_tunnel" },
    { id: "weir-to-workshop", label: l("Revenir à l'atelier par l'arche basse", "Return to the workshop through the low arch"), to: "sluice_workshop" },
    { id: "weir-to-underbridge", label: l("Longer le canal jusqu'à la vanne sous le pont", "Follow the canal to the underbridge sluice"), to: "underbridge_sluice" },
  ],
  submerged_theater: [
    { id: "search-theater-props", label: l("Fouiller les décors de tempête", "Search the storm scenery"), effects: [{ op: "addUnique", path: "clues", value: "valdrick_manifest" }], result: { text: l("Derrière un nuage de toile, vous trouvez une liste de figurants qui sont en réalité des mercenaires. Le théâtre a servi de dépôt, mais aussi de couverture pour leur présence.", "Behind a canvas cloud, you find a cast list whose extras are in fact mercenaries. The theatre served as a depot, but also as cover for their presence.") } },
    { id: "theater-to-stairs", label: l("Passer par les coulisses vers les escaliers qui répètent", "Use the backstage route to the repeating stairs"), to: "whisper_stairs" },
    { id: "theater-to-barge", label: l("Gagner la barge par le balcon effondré", "Reach the barge through the collapsed balcony"), to: "barge_hold" },
    { id: "theater-to-oratory", label: l("Descendre dans la fosse vers l'oratoire", "Descend through the pit to the oratory"), to: "drowned_oratory" },
    { id: "theater-to-moonfish", label: l("Sortir par les anciennes loges vers le Poisson-Lune", "Leave through the old boxes toward the Moonfish"), to: "moonfish_tavern" },
  ],
  whisper_stairs: [
    { id: "listen-broken-message", label: l("Recomposer une phrase dans les échos", "Reconstruct a sentence from the echoes"), effects: [{ op: "addUnique", path: "clues", value: "courier_seal" }], result: { text: l("Les fragments donnent un ordre de tournée et un mot de passe : 'visage blanc, cloche muette'. Les coursiers préparent déjà un repli.", "The fragments yield a route order and a password: 'white face, silent bell.' The couriers are already preparing a retreat.") } },
    { id: "stairs-to-mask", label: l("Remonter vers la bourse des masques", "Climb to the mask exchange"), to: "mask_exchange" },
    { id: "stairs-to-theater", label: l("Revenir sous les gradins du théâtre", "Return beneath the theatre seating"), to: "submerged_theater" },
    { id: "stairs-to-cell", label: l("Suivre le dernier écho jusqu'à la prison de pierre", "Follow the final echo to the stone prison"), to: "poupiquet_cell" },
    { id: "stairs-to-gallery", label: l("Prendre la passerelle des voix vers les glyphes", "Take the voice bridge to the glyphs"), to: "gallery_procession" },
  ],
  drowned_oratory: [
    { id: "read-water-psalm", label: l("Lire la psalmodie des mains ouvertes", "Read the chant of open hands"), effects: [{ op: "addUnique", path: "clues", value: "water_rite" }], result: { text: l("Le texte confirme que le geste de renoncement précède toujours le geste de direction. Le cinquième anneau n'est pas une exception : il est la première règle.", "The text confirms that the gesture of renunciation always comes before the gesture of direction. The fifth ring is not an exception: it is the first rule.") } },
    { id: "oratory-to-chapel", label: l("Suivre le tunnel de prière jusqu'à la chapelle", "Follow the prayer tunnel to the chapel"), to: "water_chapel" },
    { id: "oratory-to-garden", label: l("Remonter par les racines vers le jardin", "Climb through roots to the garden"), to: "tide_garden" },
    { id: "oratory-to-gallery", label: l("Passer par la nef fendue vers la galerie", "Use the cracked nave to reach the gallery"), to: "gallery_procession" },
    { id: "oratory-to-well", label: l("Rejoindre le puits des échos", "Reach the echo well"), to: "echo_well" },
  ],
  signal_gallery: [
    { id: "map-copper-course", label: l("Cartographier le parcours des fils de cuivre", "Map the copper wires' course"), effects: [{ op: "addUnique", path: "clues", value: "flood_schedule" }], result: { text: l("Les fils dessinent un réseau en étoile : une cloche lance le signal, mais chaque quartier possède une dérivation. Le sabotage est plus vaste que les portes seules.", "The wires draw a star-shaped network: one bell launches the signal, but each ward has a diversion. The sabotage is wider than the gates alone.") } },
    { id: "signal-to-foundry", label: l("Remonter la ligne jusqu'à la fonderie", "Follow the line up to the foundry"), to: "bell_foundry" },
    { id: "signal-to-chain", label: l("Traverser les câbles vers la passerelle des chaînes", "Cross the cables to the chain walkway"), to: "chain_walkway" },
    { id: "signal-to-workshop", label: l("Descendre par le fil jusqu'à l'atelier", "Follow the wire down to the workshop"), to: "sluice_workshop" },
    { id: "signal-to-city", label: l("Suivre un conduit de service vers la ville", "Follow a service conduit toward the city"), to: "city_steps" },
  ],
  chain_walkway: [
    { id: "brace-chain-link", label: l("Bloquer un maillon marqué de craie", "Brace a chalk-marked chain link"), effects: [{ op: "increment", path: "expedition.fatigue", value: 1 }, { op: "increment", path: "expedition.morale", value: 1 }], result: { text: l("Le maillon cesse de vibrer contre les autres. Vous n'avez pas réparé les portes, mais vous avez retiré au sabotage une autre manière de les faire céder.", "The link stops shivering against the others. You have not repaired the gates, but you have removed another way for sabotage to make them fail.") } },
    { id: "chain-to-loft", label: l("Traverser jusqu'au grenier des contrepoids", "Cross to the counterweight loft"), to: "counterweight_loft" },
    { id: "chain-to-gates", label: l("Descendre le long des chaînes vers les portes", "Descend along the chains to the gates"), to: "gate_chamber" },
    { id: "chain-to-signal", label: l("Revenir à la galerie des fils", "Return to the wire gallery"), to: "signal_gallery" },
    { id: "chain-to-city", label: l("Prendre l'échelle d'urgence vers la ville", "Take the emergency ladder to the city"), to: "city_steps" },
  ],
  lantern_hospice: [
    { id: "question-lost-messenger", label: l("Aider le messager à reconstituer sa tournée", "Help the messenger reconstruct their route"), effects: [{ op: "addUnique", path: "clues", value: "courier_seal" }, { op: "increment", path: "expedition.morale", value: 1 }], result: { text: l("Un nom revient avec la douleur : le messager devait porter une sphère jusqu'au grenier noyé, puis oublier qu'il y était allé.", "A name returns with the pain: the messenger was to carry a sphere to the drowned granary, then forget they had gone there.") } },
    { id: "hospice-to-mask", label: l("Suivre la cour des lanternes vers les masques", "Follow the lantern court to the masks"), to: "mask_exchange" },
    { id: "hospice-to-infirmary", label: l("Échanger des remèdes avec l'infirmerie des haleurs", "Exchange remedies with the haulers' infirmary"), to: "canal_infirmary" },
    { id: "hospice-to-garden", label: l("Prendre la venelle des herbes vers le jardin", "Take the herb lane to the garden"), to: "tide_garden" },
  ],
  alchemist_pier: [
    { id: "test-blue-vial", label: l("Tester une fiole bleue dans l'eau", "Test a blue vial in the water"), effects: [{ op: "addUnique", path: "clues", value: "flood_schedule" }], result: { text: l("La fiole s'allume au rythme d'une impulsion venue de la ville. Le verre bleu n'est pas une cargaison : c'est un récepteur.", "The vial lights to an impulse coming from the city. Blue glass is not cargo: it is a receiver.") } },
    { id: "pier-to-canal-steps", label: l("Remonter vers les marches du canal", "Climb to the canal steps"), to: "canal_steps" },
    { id: "pier-to-garden", label: l("Suivre l'eau teintée jusqu'au jardin", "Follow the dyed water to the garden"), to: "tide_garden" },
    { id: "pier-to-glasswrights", label: l("Porter une fiole aux verriers", "Take a vial to the glasswrights"), to: "glasswright_yard" },
  ],
  submerged_granary: [
    { id: "search-grain-sacks", label: l("Fouiller les sacs de grain gonflés d'eau", "Search the water-swollen grain sacks"), effects: [{ op: "addUnique", path: "clues", value: "valdrick_manifest" }], result: { text: l("Les numéros de lot correspondent à ceux du manifeste : le grain nourrissait officiellement les quartiers bas, mais ses barges transportaient aussi le matériel du signal.", "The lot numbers match the manifest: the grain officially fed the lower wards, but its barges also carried signal equipment.") } },
    { id: "granary-to-post", label: l("Rejoindre le relais noyé par les silos", "Reach the drowned post through the silos"), to: "drowned_post" },
    { id: "granary-to-barge", label: l("Suivre le quai de chargement vers la barge", "Follow the loading quay to the barge"), to: "barge_hold" },
    { id: "granary-to-theater", label: l("Passer sous les réserves jusqu'au théâtre", "Pass beneath the stores to the theatre"), to: "submerged_theater" },
  ],
  salt_tunnels: [
    { id: "read-salt-arrows", label: l("Déchiffrer les flèches gravées dans le sel", "Read the arrows carved in the salt"), effects: [{ op: "addUnique", path: "clues", value: "old_flood_map" }], result: { text: l("Les flèches ne désignent pas des sorties, mais les lieux où l'eau s'est autrefois retirée trop vite. Elles dessinent une carte clandestine des faiblesses de Laelith.", "The arrows point not to exits, but to places where water once withdrew too quickly. They draw a clandestine map of Laelith's weaknesses.") } },
    { id: "salt-tunnels-to-market", label: l("Remonter vers le marché du sel", "Climb to the salt market"), to: "salt_market" },
    { id: "salt-tunnels-to-orchard", label: l("Suivre une veine jusqu'au verger sous la vase", "Follow a vein to the orchard beneath the silt"), to: "moss_orchard" },
    { id: "salt-tunnels-to-well", label: l("Prendre un boyau jusqu'au puits des échos", "Take a crawlspace to the echo well"), to: "echo_well" },
  ],
  ancient_pump_room: [
    { id: "free-pump-crank", label: l("Débloquer la manivelle de la pompe", "Free the pump crank"), effects: [{ op: "addUnique", path: "clues", value: "gate_sabotage" }, { op: "increment", path: "expedition.fatigue", value: 1 }], result: { text: l("La manivelle cède d'un coup. Vous sentez la pression se répartir autrement : une des dérivations prévues par les saboteurs vient de perdre sa force.", "The crank gives at once. You feel pressure distribute differently: one diversion planned by the saboteurs has lost its force.") } },
    { id: "pumps-to-weir", label: l("Suivre les pistons jusqu'au déversoir", "Follow the pistons to the weir"), to: "broken_weir" },
    { id: "pumps-to-workshop", label: l("Revenir à l'atelier des vannes", "Return to the sluice workshop"), to: "sluice_workshop" },
    { id: "pumps-to-gates", label: l("Prendre le conduit des pompes vers les portes", "Take the pump conduit to the gates"), to: "gate_chamber" },
  ],
  paper_mill: [
    { id: "inspect-prestamped-paper", label: l("Examiner les feuilles déjà timbrées", "Examine the already-stamped sheets"), effects: [{ op: "addUnique", path: "clues", value: "council_ledger" }], result: { text: l("Les cachets sont authentiques, mais les séries manquent dans les registres. Des ordres peuvent circuler avec la voix de la ville sans jamais avoir été signés par elle.", "The seals are authentic, but their series are missing from the ledgers. Orders can travel with the city's voice without ever having been signed by it.") } },
    { id: "mill-to-paper-bridge", label: l("Suivre la pâte jusqu'au pont de papier", "Follow the pulp to the paper bridge"), to: "paper_bridge" },
    { id: "mill-to-annex", label: l("Porter une feuille à l'annexe des cargaisons", "Take a sheet to the cargo annex"), to: "customs_annex" },
    { id: "mill-to-scriptorium", label: l("Remonter vers le scriptorium caché", "Climb to the hidden scriptorium"), to: "hidden_scriptorium" },
  ],
  archivist_cellar: [
    { id: "read-flood-chronology", label: l("Lire la chronologie des crues politiques", "Read the chronology of political floods"), effects: [{ op: "addUnique", path: "clues", value: "council_ledger" }], result: { text: l("Chaque crise mentionne le même procédé : déplacer une responsabilité vers les quartiers bas, puis vendre la solution comme un secours. Le complot suit une vieille habitude.", "Every crisis mentions the same method: shift responsibility toward the lower wards, then sell the solution as rescue. The plot follows an old habit.") } },
    { id: "cellar-to-cloister", label: l("Remonter au cloître des comptes", "Climb to the cloister of accounts"), to: "archive_cloister" },
    { id: "cellar-to-library", label: l("Comparer les dates à la bibliothèque des marées", "Compare the dates at the tide library"), to: "tide_library" },
    { id: "cellar-to-stairs", label: l("Suivre un conduit sec vers les escaliers qui répètent", "Follow a dry conduit to the repeating stairs"), to: "whisper_stairs" },
  ],
  ruined_bell_tower: [
    { id: "listen-ruined-bells", label: l("Écouter les cloches ouvertes au vent", "Listen to bells open to the wind"), effects: [{ op: "addUnique", path: "clues", value: "flood_schedule" }], result: { text: l("Le vent fait vibrer trois cloches dans le même ordre que le réseau de cuivre. Même ruinée, la tour reçoit encore les impulsions du complot.", "The wind makes three bells vibrate in the same order as the copper network. Even ruined, the tower still receives the conspiracy's pulses.") } },
    { id: "tower-to-foundry", label: l("Descendre vers la fonderie par la corde neuve", "Descend to the foundry by the new rope"), to: "bell_foundry" },
    { id: "tower-to-platform", label: l("Rejoindre la plateforme des veilleurs", "Reach the watchers' platform"), to: "watch_platform" },
    { id: "tower-to-signal", label: l("Suivre la fenêtre murée vers la galerie des signaux", "Follow the walled window to the signal gallery"), to: "signal_gallery" },
  ],
};

const ANNEX_ENTRY_CHOICES = {
  festival_arcade: [{ id: "arcade-to-mask-exchange", label: l("Suivre un masque blanc jusqu'à la halle des échanges", "Follow a white mask to the exchange hall"), to: "mask_exchange" }],
  city_steps: [{ id: "city-to-water-clock", label: l("Chercher la tour de l'horloge des eaux", "Seek the tower of the water clock"), to: "water_clock" }],
  glasswright_yard: [{ id: "glass-to-bell-foundry", label: l("Porter les pigments à la fonderie", "Carry the pigments to the bell foundry"), to: "bell_foundry" }],
  old_customs: [{ id: "customs-to-annex", label: l("Suivre un registre jusqu'à l'annexe grise", "Follow a ledger to the grey annex"), to: "customs_annex" }],
  river_shrine: [{ id: "shrine-to-infirmary", label: l("Accompagner un haleur jusqu'à l'infirmerie", "Accompany a hauler to the infirmary"), to: "canal_infirmary" }],
  canal_steps: [
    { id: "steps-to-tide-garden", label: l("Suivre les jardiniers vers les bassins", "Follow the gardeners to the basins"), to: "tide_garden" },
    { id: "steps-to-alchemist-pier", label: l("Longer les fioles jusqu'au quai des alchimistes", "Follow the vials to the alchemists' pier"), to: "alchemist_pier" },
  ],
  workers_bank: [{ id: "workers-to-sluice-workshop", label: l("Repérer l'atelier derrière les palissades", "Spot the workshop behind the palisades"), to: "sluice_workshop" }],
  silt_archive: [{ id: "silt-to-broken-weir", label: l("Suivre la mesure effacée jusqu'au déversoir", "Follow the erased measurement to the weir"), to: "broken_weir" }],
  barge_hold: [{ id: "barge-to-submerged-theater", label: l("Suivre les décors flottants jusqu'au théâtre", "Follow floating scenery to the theatre"), to: "submerged_theater" }],
  gallery_procession: [{ id: "gallery-to-whisper-stairs", label: l("Chercher les escaliers où les glyphes deviennent voix", "Seek the stairs where glyphs become voices"), to: "whisper_stairs" }],
  water_chapel: [{ id: "chapel-to-drowned-oratory", label: l("Suivre les prières gravées sous l'eau", "Follow the prayers carved beneath water"), to: "drowned_oratory" }],
  signal_bell: [{ id: "bell-to-signal-gallery", label: l("Remonter le fil jusqu'à la galerie de cuivre", "Follow the wire up to the copper gallery"), to: "signal_gallery" }],
  counterweight_loft: [{ id: "loft-to-chain-walkway", label: l("Gagner la passerelle des chaînes", "Reach the chain walkway"), to: "chain_walkway" }],
  mask_exchange: [{ id: "mask-to-hospice", label: l("Suivre une sœur vers l'hospice des lanternes", "Follow a sister to the lantern hospice"), to: "lantern_hospice" }],
  drowned_post: [{ id: "post-to-granary", label: l("Suivre une péniche de grain jusqu'au grenier noyé", "Follow a grain barge to the drowned granary"), to: "submerged_granary" }],
  salt_market: [{ id: "market-to-salt-tunnels", label: l("Suivre un contrebandier jusqu'aux tunnels de sel", "Follow a smuggler to the salt tunnels"), to: "salt_tunnels" }],
  broken_weir: [{ id: "weir-to-pump-room", label: l("Chercher la chambre des pompes derrière le déversoir", "Seek the pump room behind the weir"), to: "ancient_pump_room" }],
  paper_bridge: [{ id: "bridge-to-paper-mill", label: l("Remonter le canal jusqu'au moulin à papier", "Follow the canal up to the paper mill"), to: "paper_mill" }],
  archive_cloister: [{ id: "cloister-to-cellar", label: l("Descendre dans la cave des archivistes", "Descend into the archivists' cellar"), to: "archivist_cellar" }],
  bell_foundry: [{ id: "foundry-to-ruined-tower", label: l("Suivre la corde neuve vers la tour ruinée", "Follow the new rope to the ruined tower"), to: "ruined_bell_tower" }],
};

// Small, physically nearby returns prevent local dead ends without turning the
// campaign into a fast-travel network.
const LOCAL_RETURN_CHOICES = {
  maintenance_map: [
    { id: "plan-back-to-workers", label: l("Revenir au chantier par les madriers", "Return to the worksite by the beams"), to: "workers_bank" },
    { id: "plan-back-to-dry-bed", label: l("Reprendre le drain vers le lit asséché", "Take the drain back to the dry riverbed"), to: "dry_bed" },
  ],
  maintenance_crawl: [
    { id: "crawl-back-to-sluice", label: l("Ressortir près du passage des vannes", "Emerge near the sluice passage"), to: "sluice_passage" },
    { id: "crawl-back-to-dry-bed", label: l("Ramper en arrière vers le lit asséché", "Crawl back to the dry riverbed"), to: "dry_bed" },
  ],
  dog_scent: [
    { id: "scent-back-to-fissure", label: l("Revenir à la fissure avec Kiki", "Return to the fissure with Kiki"), to: "narrow_fissure" },
    { id: "scent-to-barge-local", label: l("Suivre l'odeur de résine jusqu'à la barge", "Follow the resin scent to the barge"), to: "barge_hold" },
  ],
  witness_oath: [
    { id: "oath-back-to-barge", label: l("Ramener les voyageurs vers la barge", "Lead the travellers back toward the barge"), to: "barge_hold" },
    { id: "oath-to-tunnel", label: l("Suivre la corniche jusqu'au tunnel", "Follow the ledge to the tunnel"), to: "flooded_tunnel" },
  ],
  poupiquet_free: [
    { id: "freed-to-gallery", label: l("Laisser Poupiquet relire les glyphes proches", "Let Poupiquet reread the nearby glyphs"), to: "gallery_procession" },
    { id: "freed-to-gates", label: l("Suivre ses calculs jusqu'aux portes", "Follow his calculations to the gates"), to: "gate_chamber" },
  ],
  rite_broken: [
    { id: "broken-back-to-chapel", label: l("Revenir vérifier la chapelle apaisée", "Return to inspect the calmed chapel"), to: "water_chapel" },
    { id: "broken-to-terrace", label: l("Prendre la brèche vers la terrasse des boucliers", "Take the breach to the shield terrace"), to: "shield_terrace" },
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
    description: l("Edras Veyr vous reçoit derrière un rideau de toiles mouillées. Il parle avec l'assurance de ceux qui espèrent que la précision de leur jargon remplacera les preuves, mais sa voix se brise quand les marteaux se taisent. À chaque grondement venu des portes, ses doigts se referment sur son sifflet. Il ne craint pas un accident : il attend un signal — et semble craindre autant ceux qui le donneront que vous.", "Edras Veyr receives you behind a curtain of wet canvas. He speaks with the assurance of those who hope technical language will substitute for proof, but his voice breaks when the hammers fall silent. At every rumble from the gates, his fingers close around his whistle. He fears no accident: he is waiting for a signal—and seems as afraid of those who will give it as of you."),
    revisitDescription: l("Le rideau de toiles se soulève à nouveau, mais Edras n'est plus là. Sa chaise est encore tiède; sur la planche, une empreinte de bottine pointe vers le conduit de service. Votre premier entretien l'a forcé à déplacer ses pions, ou à fuir ceux qui les déplaçaient pour lui.", "The canvas curtain lifts again, but Edras is gone. His chair is still warm; on the plank, a boot print points toward the service conduit. Your first interview forced him to move his pieces—or to flee those who were moving them for him."),
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
    description: l("La galerie a été taillée pour que le visiteur baisse la tête. À la lumière, les glyphes se déroulent comme un chant sans voix : quatre anneaux retiennent la force de l'eau, un porteur lui indique une direction, et le cinquième anneau — absent de la fresque — oblige ce porteur à répondre de celles et ceux qu'il laisse exposés. Rompre le rite ne consiste donc pas à détruire l'eau, mais à lui refuser une cible.", "The gallery was cut so that visitors must bow their heads. In the light, its glyphs unfold like a voiceless song: four rings contain water's force, one bearer gives it direction, and the fifth ring—absent from the fresco—compels that bearer to answer for those left exposed. To break the rite is therefore not to destroy water, but to deny it a target."),
    revisitDescription: l("Les glyphes n'ont pas changé, mais votre regard oui. Après avoir vu les boucliers et la barge, la procession ne ressemble plus à une légende religieuse : c'est un manuel de sabotage écrit dans une langue sacrée.", "The glyphs have not changed, but your gaze has. After seeing the shields and the barge, the procession no longer resembles a religious legend: it is a sabotage manual written in a sacred language."),
  },
  poupiquet_cell: {
    title: l("La prison de pierre", "The stone prison"),
    description: l("Poupiquet est encastré jusqu'aux côtes dans un bloc qui se resserre au rythme des gouttes. Ses lunettes sont fendues; son esprit, heureusement, ne l'est pas. Entre deux souffles, il vous révèle que le coin placé dans les gonds n'est que la dernière étape : les boucliers guideront la vague vers les quartiers bas.", "Poupiquet is embedded up to his ribs in a block that tightens with each drip. His spectacles are cracked; his mind, fortunately, is not. Between breaths, he tells you the wedge in the hinges is only the final step: the shields will guide the wave toward the lower districts."),
    entryEffects: [{ op: "set", path: "flags.foundPoupiquet", value: true }],
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
    description: l("Vous ne portez pas le collier. Vous le retournez sur l'autel, suivant la ligne manquante des glyphes. Les serpents se défont en filets d'eau claire et une brèche s'ouvre dans le mur : elle conduit à la chambre des portes. Le rite n'est pas détruit; il est rendu à sa fonction première : empêcher qu'une décision humaine se dissimule derrière la force de l'eau.", "You do not wear the necklace. You turn it upon the altar, following the glyphs' missing line. The serpents unmake themselves into streams of clear water and a breach opens in the wall: it leads to the gate chamber. The rite is not destroyed; it is returned to its first purpose: preventing a human decision from hiding behind the force of water."),
  },
  gate_chamber: {
    title: l("La chambre des portes", "The gate chamber"),
    description: l("Les engrenages occupent la salle comme les os d'une bête immense. Dans le gond occidental, un coin grisâtre ronge la pierre; au-dessus, des câbles inconnus vibrent vers les échafaudages. Vous avez trouvé un sabotage, mais pas encore son intention ni la manière de l'arrêter sans déplacer le danger ailleurs.", "The gears occupy the room like the bones of an immense beast. In the western hinge, a grey wedge gnaws at the stone; above, unfamiliar cables tremble toward the scaffolds. You have found sabotage, but not yet its purpose or a way to stop it without moving the danger elsewhere."),
    visitDescriptions: [
      { requires: { all: [{ path: "state.flags.disabledSabotage", equals: true }, { path: "state.flags.disarmedShields", equals: true }] }, text: l("Le gond est consolidé et les câbles ont perdu leur tension. Le mécanisme n'est plus un piège, seulement une lourde machine à surveiller pendant que vous décidez ce que la ville doit savoir.", "The hinge is reinforced and the cables have lost their tension. The mechanism is no longer a trap, only a heavy machine to watch while you decide what the city should know.") },
      { requires: { path: "state.flags.disabledSabotage", equals: true }, text: l("Le coin est retiré, mais les câbles des boucliers vibrent encore. Vous avez sauvé la porte; il reste à empêcher que la vague trouve une autre route.", "The wedge is out, but the shields' cables still tremble. You have saved the gate; it remains to prevent the wave finding another route.") },
      { requires: { all: [{ path: "state.flags.foundSabotage", equals: true }, { path: "state.flags.understoodRite", equals: true }] }, text: l("Le rite donne enfin un sens aux câbles : le coin doit briser le gond pendant que les anneaux choisissent où l'eau frappera. La porte et les boucliers sont deux moitiés du même piège.", "The rite finally gives the cables meaning: the wedge must break the hinge while the rings choose where the water will strike. Gate and shields are two halves of the same trap.") },
      { requires: { path: "state.flags.foundSabotage", equals: true }, text: l("Vous reconnaissez le coin de désagrégation. Sa présence confirme une attaque contre les portes; les câbles, eux, attendent encore une explication.", "You recognize the disintegration wedge. Its presence confirms an attack on the gates; the cables still await an explanation.") },
    ],
  },
  shield_terrace: {
    title: l("La terrasse des quatre boucliers", "The terrace of four shields"),
    description: l("Derrière la berge, les quatre boucliers forment une rose de métal tournée vers les quartiers bas. Le gond sécurisé ne suffit pas : tant que cette rose reçoit une direction, une vague peut être détournée sans faire céder les portes. Les anneaux ne choisissent rien seuls; ils obéissent à une décision transmise par les câbles, les signaux et le rite. Il faut leur refuser cette décision sans les briser.", "Beyond the bank, the four shields form a metal rose turned toward the lower districts. Securing the hinge is not enough: while that rose receives a direction, a wave can be diverted without breaking the gates. The rings choose nothing by themselves; they obey a decision passed through cables, signals, and the rite. You must deny them that decision without shattering them."),
    visitDescriptions: [{ requires: { path: "state.flags.disarmedShields", equals: true }, text: l("Les quatre boucliers ne renvoient plus qu'une lumière terne. La menace immédiate est finie; ce qui demeure est la question des responsables, et de la vérité que vous choisirez de porter à la surface.", "The four shields now return only dull light. The immediate threat is over; what remains is the question of those responsible, and of the truth you choose to carry to the surface.") }],
  },
  city_steps: {
    title: l("Les marches vers Laelith", "The steps to Laelith"),
    description: l("La lumière du jour vous frappe comme un jugement. Au-dessus de la faille, la fête continue par habitude, tambours et guirlandes ignorant encore le danger. Geyma attend près des marches. Derrière elle, un sergent de la garde municipale hésite : il lui faut des faits, des visages, une preuve qu'il puisse défendre devant le Conseil.", "Daylight strikes you like a judgement. Above the chasm, the festival continues by habit, drums and garlands still ignorant of danger. Geyma waits near the steps. Behind her, a sergeant of the city guard hesitates: he needs facts, faces, a proof he can defend before the Council."),
    entryEffects: [{ op: "increment", path: "expedition.morale", value: 1 }, { op: "increment", path: "expedition.fatigue", value: -1 }],
    visitDescriptions: [
      { requires: { all: [{ path: "state.flags.disarmedShields", equals: true }, { any: [{ path: "state.flags.freedCaptives", equals: true }, { path: "state.clues", includes: "valdrick_manifest" }, { path: "state.clues", includes: "council_ledger" }] }] }, text: l("Geyma a rassemblé le sergent et les rares personnes capables de reconnaître vos preuves. Les portes et les boucliers sont hors de danger; votre accusation, elle, doit encore survivre aux regards de la ville.", "Geyma has gathered the sergeant and the few people able to recognize your evidence. Gates and shields are safe; your accusation must still survive the city's scrutiny.") },
      { requires: { path: "state.flags.disabledSabotage", equals: true }, text: l("Le sergent écoute, mais son regard revient vers la faille. Vous avez sauvé le gond, pas encore les quartiers visés par les boucliers. Il vous faut finir le travail avant de demander à la ville de vous croire.", "The sergeant listens, but his gaze keeps returning to the chasm. You saved the hinge, not yet the wards targeted by the shields. Finish the work before asking the city to believe you.") },
    ],
  },
  public_reckoning: {
    title: l("L'heure blanche", "The white hour"),
    description: l("La menace immédiate est passée, mais personne ne parle encore d'une même voix. Geyma tient les preuves que vous avez rapportées; le sergent attend de savoir si elles suffiront à arrêter des hommes puissants. En contrebas, les faux ouvriers comprennent que leur silence ne les protège plus. Reste une décision : exposer le réseau avec ce que vous pouvez prouver, ou laisser la ville croire à un simple accident évité. Selon ce que vous avez découvert, l'affaire peut aussi forcer Laelith à regarder l'ancienne règle qui rendait certains quartiers plus sacrifiables que d'autres.", "The immediate threat has passed, but no one yet speaks with one voice. Geyma holds the proof you brought; the sergeant waits to know whether it will be enough to arrest powerful people. Below, the false workers understand their silence no longer protects them. One decision remains: expose the network with what you can prove, or let the city believe a simple accident was avoided. Depending on what you discovered, the case may also force Laelith to face the old rule that made some wards more sacrificial than others."),
    visitDescriptions: [{ requires: { all: [{ path: "state.flags.freedCaptives", equals: true }, { path: "state.flags.freedPoupiquet", equals: true }, { path: "state.clues", includes: "council_ledger" }] }, text: l("Les voyageurs nomment les hommes de Souleyna; Poupiquet déroule ses calculs; les registres donnent un visage municipal à leur complice. Cette fois, le sergent n'écoute pas seulement une alerte : il reçoit une affaire complète.", "The travellers name Souleyna's men; Poupiquet unrolls his calculations; the ledgers give their accomplice a municipal face. This time, the sergeant is not merely hearing an alarm: he is receiving a complete case.") }],
  },
  ending_dawn: { title: l("Une ville qui se souvient", "A city that remembers"), description: l("La vague revient, mais les portes tiennent. Les boucliers, privés de leur direction, boivent leur propre lumière puis retombent inertes dans la vase. Les preuves ne résolvent pas tous les mensonges de Laelith, mais elles suffisent pour que les responsables ne puissent plus les cacher.\n\nFIN — L'eau retrouve son cours; la ville retrouve sa voix.", "The wave returns, but the gates hold. Deprived of their direction, the shields drink their own light and fall inert into the mud. The evidence does not solve every lie in Laelith, but it is enough that those responsible can no longer hide them.\n\nTHE END — Water finds its course; the city finds its voice."), ending: true },
  ending_silent: { title: l("Le salut sans témoin", "Salvation without witnesses"), description: l("Le coin est retiré et les boucliers sont rendus inertes avant le retour de l'eau. La ville n'apprendra jamais toute l'histoire : les mercenaires fuient, Valdrick nie, et les preuves les plus fragiles disparaissent dans le tumulte. Pourtant les portes tiennent, les quartiers bas dorment, et quelques personnes savent qu'une catastrophe a été empêchée dans le silence.\n\nFIN — Vous avez sauvé Laelith, mais pas encore sa vérité.", "The wedge is removed and the shields are made inert before the water returns. The city will never learn the whole story: mercenaries flee, Valdrick denies everything, and the most fragile evidence vanishes in the tumult. Yet the gates hold, the lower districts sleep, and a few people know a catastrophe was prevented in silence.\n\nTHE END — You saved Laelith, but not yet its truth."), ending: true },
};

// A third authored layer deepens the city's older fault line. These places do
// not replace the immediate sabotage: they reveal why the city was already
// capable of imagining that some districts could be sacrificed.
const LORE_EXPANSION_SCENES = {
  votive_roof: {
    title: l("Le toit des prières sans adresse", "The roof of unaddressed prayers"),
    description: l("Au-dessus de la galerie des lanternes, des milliers de feuilles votives ont été nouées aux gouttières. La pluie les a soudées en une dentelle de papier brun. Sava Rhyss, collectrice de vœux pour le sanctuaire, les détache une à une avec des pinces d'orfèvre. Elle affirme que certaines prières reviennent toujours sans destinataire — celles des rues que les registres ont cessé de nommer.", "Above the lantern arcade, thousands of votive sheets have been tied to the gutters. Rain has fused them into lacework of brown paper. Sava Rhyss, the shrine's collector of vows, loosens them one by one with jeweller's tongs. She claims some prayers always return without an addressee—those from streets the registers have stopped naming."),
    visitDescriptions: [{ requires: { path: "state.flags.metSava", equals: true }, text: l("Sava a séparé pour vous une feuille restée blanche au milieu des autres. « Les villes mentent rarement en brûlant les preuves, dit-elle. Elles commencent par oublier à qui répondre. »", "Sava has set aside for you a sheet that remained blank among the others. “Cities rarely lie by burning proof,” she says. “They begin by forgetting whom to answer.”") }],
  },
  veil_theatre: {
    title: l("Le théâtre des voiles", "The theatre of veils"),
    description: l("Derrière le marché des masques, un ancien théâtre conserve ses gradins sous des tentures humides. Orthe Kair y répète seul les voix des puissants : il peut faire parler un douanier, une ambassadrice ou un juge avec une exactitude inquiétante. Il jure qu'il ne les imite pas pour les tromper, mais pour savoir à quel moment leurs phrases cessent d'être les leurs.", "Behind the mask market, an old theatre keeps its tiers beneath damp drapes. Orthe Kair rehearses the voices of the powerful there alone: he can speak as a customs officer, an ambassador, or a judge with unsettling accuracy. He swears he does not mimic them to deceive, but to learn when their sentences cease to be their own."),
    visitDescriptions: [{ requires: { path: "state.flags.metOrthe", equals: true }, text: l("Orthe a changé les sièges de place. Il prétend que cela suffit à faire avouer une salle entière, puis vous demande lequel de vos alliés vous craignez le plus de voir parler à votre place.", "Orthe has moved the seats around. He claims that is enough to make an entire room confess, then asks which of your allies you most fear hearing speak in your place.") }],
  },
  mirror_archive: {
    title: l("L'archive des encres miroirs", "The archive of mirror inks"),
    description: l("Sous le cloître, des plaques d'étain reflètent les feuillets à contre-jour. Ilyra Morn, restauratrice disgraciée, y fait remonter les mots grattés avec une eau noire qui brûle les doigts. Elle a autrefois effacé des noms sur ordre du Conseil; depuis, elle ne restaure rien sans vous demander qui profitera de la vérité retrouvée.", "Beneath the cloister, tin plates reflect folios against the light. Ilyra Morn, a disgraced restorer, brings scraped words back with black water that burns the fingers. She once erased names on the Council's orders; since then, she restores nothing without asking who will profit from the truth recovered."),
    visitDescriptions: [{ requires: { path: "state.clues", includes: "erased_quarters" }, text: l("L'encre miroir a rendu un quartier à la carte, mais Ilyra garde le dernier feuillet sous sa paume. Il porte le nom de la personne qui a demandé l'effacement. Elle veut savoir si vous cherchez une affaire, ou quelqu'un à livrer.", "Mirror ink has returned a district to the map, but Ilyra keeps the last folio beneath her palm. It bears the name of the person who ordered the erasure. She wants to know whether you seek a case, or someone to hand over.") }],
  },
  wicker_docks: {
    title: l("Les quais des paniers creux", "The hollow-basket docks"),
    description: l("Les barges de pêche sont rangées si serrées que l'on marche de pont en pont. Sous des piles de paniers à anguilles, Noma Pell tresse des doubles fonds avec une patience presque tendre. Les coursiers paient pour ses paniers; les familles des quartiers bas y cachent aussi leurs lettres quand les patrouilles lisent trop vite.", "Fishing barges are packed so closely that one walks from deck to deck. Beneath stacks of eel baskets, Noma Pell weaves false bottoms with almost tender patience. Couriers pay for her baskets; families from the lower wards also hide letters in them when patrols read too quickly."),
    visitDescriptions: [{ requires: { path: "state.flags.metNoma", equals: true }, text: l("Noma n'a pas déplacé ses paniers, seulement les ombres qu'ils projettent. Elle vous montre deux voies identiques sur l'eau : l'une mène au réseau, l'autre à celles et ceux qui essaient de lui survivre.", "Noma has not moved her baskets, only the shadows they cast. She shows you two identical paths on the water: one leads to the network, the other to those trying to survive it.") }],
  },
  moonwell_grotto: {
    title: l("La grotte du puits-lune", "The moonwell grotto"),
    description: l("Une cavité ronde s'ouvre sous le puits des échos, lisse comme l'intérieur d'une coupe. Kos Veyr, ancien plongeur des sondes, a suspendu des coquilles au plafond; il lit leur tremblement comme d'autres lisent les étoiles. Il sait qu'il y avait un cinquième anneau dans le rite, mais refuse d'abord de prononcer le nom qui allait avec : sa dernière mission a emporté son frère dans un quartier que personne ne commémore.", "A round hollow opens beneath the echo well, smooth as the inside of a cup. Kos Veyr, a former sounding diver, has hung shells from the ceiling; he reads their trembling as others read stars. He knows there was a fifth ring in the rite, but at first refuses to speak the name that went with it: his last mission took his brother in a district no one commemorates."),
    visitDescriptions: [{ requires: { path: "state.clues", includes: "fifth_name" }, text: l("Kos a cessé d'écouter les coquilles. Il écoute votre silence à présent, comme s'il voulait savoir si vous avez compris que le cinquième nom n'était pas une arme, mais une obligation.", "Kos has stopped listening to the shells. He listens to your silence now, as if he wants to know whether you understand that the fifth name was not a weapon, but an obligation.") }],
  },
  glass_catacomb: {
    title: l("La nécropole des lentilles", "The necropolis of lenses"),
    description: l("Sous les fours, des générations de lentilles de signal ratées ont été empilées dans des niches funéraires. Elles captent encore la lumière et la rendent par fragments bleus. Vess Tar, ancien apprenti de Maëlin, y classe les éclats selon les voix qu'ils ont portées. Il s'est enfui de la cour des verriers après avoir compris que certains verres n'avertissaient pas du danger : ils choisissaient qui devait le recevoir.", "Beneath the furnaces, generations of failed signal lenses have been stacked in funerary niches. They still catch light and return it in blue fragments. Vess Tar, Maelin's former apprentice, sorts the shards by the voices they carried. He fled the glasswrights' yard after learning that some glasses did not warn of danger: they chose who was meant to receive it."),
    visitDescriptions: [{ requires: { path: "state.flags.metVess", equals: true }, text: l("Vess vous laisse tenir une lentille fêlée. À travers elle, les quatre boucliers semblent pointer non vers la ville entière, mais vers des noms précis. Il attend de voir si vous la reposez, ou si vous lui demandez lesquels.", "Vess lets you hold a cracked lens. Through it, the four shields seem to point not at the whole city, but at particular names. He waits to see whether you set it down, or ask him which ones.") }],
  },
  tide_ossuary: {
    title: l("L'ossuaire des marées", "The tide ossuary"),
    description: l("Sous l'oratoire noyé, des ossements reposent dans des jarres scellées au goudron. Theska Mor, gardienne des morts d'eau, date chaque jarre à la couche de limon collée aux côtes. Ses registres prouvent qu'une crue ancienne a déjà frappé les mêmes rues que les boucliers visent aujourd'hui. Elle ne parle pas de malédiction : elle parle de décisions répétées par des gens qui se disent raisonnables.", "Beneath the drowned oratory, bones rest in jars sealed with tar. Theska Mor, keeper of the water-dead, dates each jar by the silt layer clinging to its ribs. Her records prove an old flood already struck the same streets the shields target today. She does not speak of a curse: she speaks of decisions repeated by people who call themselves reasonable."),
    visitDescriptions: [{ requires: { path: "state.clues", includes: "black_oath" }, text: l("Theska a ajouté une jarre vide sur l'étagère la plus basse. « Celle-ci est pour la prochaine excuse », dit-elle. Les morts, chez elle, ne sont jamais des symboles : ce sont des absents qui avaient une adresse.", "Theska has added an empty jar to the lowest shelf. “This one is for the next excuse,” she says. In her keeping, the dead are never symbols: they are absences that once had an address.") }],
  },
};

const SECOND_LORE_SCENES = {
  copper_aviary: {
    title: l("La volière de cuivre", "The copper aviary"),
    description: l("Sous les tuiles les plus hautes de Laelith, des martinets vivent dans des cages de cuivre ouvertes sur le ciel. Nival Sorn lit les rubans attachés à leurs pattes sans jamais les détacher. Les messages d'alerte de la ville passent ici avant les cloches; elle vous montre que certains trajets ont été raccourcis, comme si des quartiers n'avaient jamais mérité d'être prévenus.", "Beneath Laelith's highest tiles, swifts live in copper cages open to the sky. Nival Sorn reads the ribbons tied to their legs without ever removing them. The city's warning messages pass here before the bells; she shows you that some routes were shortened, as though certain wards had never deserved warning."),
    visitDescriptions: [{ requires: { path: "state.flags.metNival", equals: true }, text: l("Nival laisse un martinet choisir votre main. L'oiseau porte un ruban sans sceau, destiné à une rue qui n'existe plus sur les plans. Elle vous avertit que les messages perdus ont parfois de meilleurs souvenirs que les personnes qui les ont écrits.", "Nival lets a swift choose your hand. The bird bears an unsealed ribbon addressed to a street no longer on maps. She warns that lost messages sometimes have better memories than those who wrote them.") }],
  },
  house_of_measures: {
    title: l("La maison des mesures", "The house of measures"),
    description: l("Des règles de bronze couvrent les murs de cette petite administration oubliée. Rissa Vaun, ancienne magistrate des jauges, continue d'y aligner des poids sans avoir plus d'autorité sur rien. Elle a contresigné le Concordat de laiton lorsqu'elle croyait sauver les portes; elle sait aujourd'hui que la formule a transformé une précaution en permission de choisir qui compterait comme perte acceptable.", "Bronze rules cover the walls of this small forgotten office. Rissa Vaun, former magistrate of gauges, still aligns weights there despite having no authority over anything. She countersigned the Brass Concord when she believed she was saving the gates; she now knows the formula turned a precaution into permission to choose who would count as acceptable loss."),
    visitDescriptions: [{ requires: { path: "state.flags.metRissa", equals: true }, text: l("Rissa a retiré de son bureau la balance qui servait aux audiences de crue. Elle dit qu'aucun poids ne devrait décider d'une vie, mais conserve le contrepoids dans un tissu, comme une preuve qu'elle n'ose pas encore brûler.", "Rissa has removed from her desk the scale used in flood hearings. She says no weight should decide a life, yet keeps its counterweight wrapped in cloth, as proof she cannot yet bring herself to burn.") }],
  },
  brass_reliquary: {
    title: l("Le reliquaire de laiton", "The brass reliquary"),
    description: l("Derrière le sanctuaire, une porte minuscule ouvre sur les objets que personne n'ose jeter : cloches fendues, jauges de crue, clés sans serrure. Darel Fenn, gardien sans titre, les astique comme s'ils pouvaient encore répondre. Il vous montre un disque de laiton gravé d'Eshra, puis la rayure qui a tenté de convertir son nom en simple numéro de procédure.", "Behind the shrine, a tiny door opens onto objects no one dares discard: cracked bells, flood gauges, keys without locks. Darel Fenn, keeper without a title, polishes them as if they might still answer. He shows you a brass disc engraved with Eshra, then the scratch that tried to turn her name into a mere procedure number."),
    visitDescriptions: [{ requires: { path: "state.clues", includes: "brass_concord" }, text: l("Le disque de Darel paraît plus lourd depuis que vous connaissez son histoire. Il ne contient aucune magie spectaculaire; seulement la trace d'une ville qui a poli sa conscience jusqu'à la rendre administrative.", "Darel's disc seems heavier now that you know its history. It holds no spectacular magic; only the trace of a city that polished its conscience until it became administrative.") }],
  },
  exile_courtyard: {
    title: l("La cour des maisons déplacées", "The court of moved houses"),
    description: l("Derrière des façades rapiécées, une cour conserve des portes récupérées dans des rues disparues. Maëra Doss, qui en garde les clés, n'appelle pas les siens des réfugiés : « nous avons été déplacés par une phrase », dit-elle. Ses aïeux ont survécu à Vire-Basse, mais la ville les a disséminés avant qu'ils puissent raconter où l'eau avait été envoyée.", "Behind patched façades, a courtyard keeps doors salvaged from vanished streets. Maera Doss, who keeps their keys, does not call her people refugees: “we were moved by a sentence,” she says. Her forebears survived Low Vire, but the city scattered them before they could say where the water had been sent."),
    visitDescriptions: [{ requires: { path: "state.flags.metMaera", equals: true }, text: l("Maëra a laissé une porte entrouverte pour vous. De l'autre côté, il n'y a pas de passage secret, seulement une cuisine où l'on raconte les rues par leurs odeurs. C'est une carte que le Conseil n'a jamais su confisquer.", "Maera has left a door ajar for you. Beyond it lies no secret passage, only a kitchen where streets are remembered by their smells. It is a map the Council never knew how to seize.") }],
  },
  silt_observatory: {
    title: l("L'observatoire du limon", "The silt observatory"),
    description: l("À l'extrémité d'un canal mort, des vitres inclinées donnent sur des colonnes de sédiments. Siren Hyl, hydrologue des jardins, y conserve les couches de chaque grande crue. Elle a découvert une chose impossible : la couche de Vire-Basse contient du verre bleu, preuve qu'un avertissement a été préparé puis retenu. Elle ne sait pas encore qui a ordonné le silence; elle sait que la rivière n'a jamais choisi seule.", "At the end of a dead canal, slanted panes look down upon columns of sediment. Siren Hyl, hydrologist of the gardens, keeps layers from every great flood there. She discovered something impossible: Low Vire's layer contains blue glass, proof that a warning was prepared then withheld. She does not yet know who ordered the silence; she knows the river never chose alone."),
    visitDescriptions: [{ requires: { path: "state.flags.metSiren", equals: true }, text: l("Siren a marqué la couche actuelle d'une épingle de cuivre. Elle vous demande de revenir après l'aube, non pour voir si elle avait raison, mais pour s'assurer qu'il y aura encore une couche à lire.", "Siren has marked the current layer with a copper pin. She asks you to return after dawn, not to see whether she was right, but to make sure there will still be a layer to read.") }],
  },
  drowned_mailroom: {
    title: l("Le bureau des lettres noyées", "The office of drowned letters"),
    description: l("Une ancienne poste s'est affaissée au bord du quai. Ses casiers de bois contiennent des sacs de courrier gonflés d'eau, jamais ouverts parce que personne ne pouvait décider à qui appartenaient les mauvaises nouvelles. Oren Fael, dernier trieur, les sèche feuille à feuille. Il a repéré des convocations de crue parties vers les quartiers hauts — et leurs copies, jamais envoyées, destinées à Vire-Basse.", "An old post office has slumped at the dock's edge. Its wooden pigeonholes hold mailbags swollen with water, never opened because no one could decide who owned bad news. Oren Fael, the last sorter, dries them sheet by sheet. He found flood summons sent to the upper wards—and their never-sent copies addressed to Low Vire."),
    visitDescriptions: [{ requires: { path: "state.flags.metOren", equals: true }, text: l("Oren a classé les lettres par silence plutôt que par nom. Il vous tend une enveloppe vide et dit que c'est la plus honnête de toutes : elle n'a même pas prétendu que quelqu'un serait prévenu.", "Oren has sorted the letters by silence rather than by name. He hands you an empty envelope and says it is the most honest of all: it never even pretended someone would be warned.") }],
  },
};

// Vire-Basse is not merely a lost district in a document. This layer lets the
// player meet the people who kept it alive, decide how to use their testimony,
// and open several grounded routes back into the central crisis.
const THIRD_LORE_SCENES = {
  low_vire_threshold: {
    title: l("Le seuil de Vire-Basse", "The threshold of Low Vire"),
    description: l("Au bout d'une venelle qui n'apparaît sur aucun plan récent, une arche basse porte encore cinq encoches de crue. Quelqu'un a couvert les quatre premières d'une couche de chaux; la cinquième a été laissée nue, comme un reproche. Derrière, les maisons de Vire-Basse ne sont pas englouties : elles ont été contraintes de devenir invisibles.", "At the end of a lane absent from recent maps, a low arch still bears five flood notches. Someone covered the first four with lime; the fifth was left bare, like a rebuke. Beyond it, Low Vire's houses are not drowned: they were forced to become invisible."),
    visitDescriptions: [{ requires: { path: "state.flags.metMarwen", equals: true }, text: l("Le seuil n'est plus vide. Une petite marque de craie — trois lignes et un point — vous indique que Marwen a fait passer le mot. Dans Vire-Basse, on ne promet pas la confiance; on prépare une place pour qu'elle puisse arriver.", "The threshold is no longer empty. A small chalk mark—three lines and a dot—shows Marwen passed the word. In Low Vire, trust is not promised; a place is prepared for it to arrive.") }],
  },
  witness_kitchen: {
    title: l("La cuisine des témoins", "The witnesses' kitchen"),
    description: l("Une cuisine trop petite sert de salle commune à trois maisons murées. Les casseroles sont suspendues au-dessus d'une table où les familles de Vire-Basse reconstituent des rues avec des épices, des clés et des morceaux de ficelle. Marwen Rell ne vous demande pas ce que vous avez découvert : elle vous demande ce que vous comptez faire de celles et ceux qui n'ont jamais été consultés.", "A kitchen too small serves as a common room for three walled-up houses. Pots hang above a table where Low Vire families rebuild streets with spices, keys, and lengths of twine. Marwen Rell does not ask what you found: she asks what you intend to do with people who were never consulted."),
    visitDescriptions: [{ requires: { path: "state.clues", includes: "vire_proceedings" }, text: l("Les noms du registre ont atteint la cuisine avant vous. Personne ne se réjouit d'être enfin inscrit : les témoins savent qu'un nom peut devenir une liste de victimes si l'on ne lui rend pas aussi une voix.", "The register's names reached the kitchen before you. No one celebrates being entered at last: witnesses know a name can become a list of victims unless it is also given a voice.") }],
  },
  ledger_scriptorium: {
    title: l("Le scriptorium des absents", "The scriptorium of the absent"),
    description: l("Derrière une cloison de linge séché, des registres municipaux reposent sur des étagères sans cote. Tovar Quill, ancien copiste du Conseil, les a classés par personne disparue plutôt que par année fiscale. Il a la précision d'un homme qui a participé à l'effacement, et l'obstination d'un homme qui refuse désormais de laisser une ligne blanche finir son travail.", "Behind a partition of drying linen, municipal ledgers rest on shelves without catalogue marks. Tovar Quill, a former Council copyist, has sorted them by missing person rather than fiscal year. He has the precision of a man who helped erase things, and the stubbornness of one who now refuses to let a blank line finish the work."),
    visitDescriptions: [{ requires: { path: "state.flags.metTovar", equals: true }, text: l("Tovar a retourné son sablier. Il ne vous accorde pas davantage de confiance; seulement un temps de travail, ce qui chez lui vaut presque une absolution.", "Tovar has turned over his sandglass. He grants you no more trust; only time to work, which from him nearly amounts to absolution.") }],
  },
  flood_marks_house: {
    title: l("La maison aux marques d'eau", "The house of water marks"),
    description: l("Chaque pièce porte sur son mur une hauteur d'eau, un prénom et une date. Les marques les plus anciennes sont effacées à hauteur d'enfant, comme si la ville avait voulu grandir par-dessus elles. Celen Arv, arpenteur révoqué, a mesuré les angles de ces lignes pendant quinze ans : elles prouvent que les anciennes vannes ont été réglées pour atteindre Vire-Basse avant les quais hauts.", "Every room bears a water height, a first name, and a date upon its wall. The oldest marks are rubbed away at a child's height, as if the city wanted to grow over them. Celen Arv, a dismissed surveyor, has measured the angles of these lines for fifteen years: they prove the old sluices were set to reach Low Vire before the high quays."),
    visitDescriptions: [{ requires: { path: "state.clues", includes: "flood_marks" }, text: l("Celen a redessiné les lignes en bleu sombre. À présent, elles ne ressemblent plus à des souvenirs : elles ressemblent à une flèche que quelqu'un a tenue trop longtemps.", "Celen has redrawn the lines in dark blue. They no longer resemble memories: they resemble an arrow someone held for far too long.") }],
  },
  quiet_school: {
    title: l("L'école sans registre", "The school without a register"),
    description: l("Dans une ancienne remise, des adultes apprennent encore à lire les adresses que les cartes ont retirées. La maîtresse Letha Vorn garde une liste d'élèves qui n'existent officiellement dans aucun quartier. Elle ne veut ni héroïsme ni promesse : elle veut savoir si la prochaine alerte comportera des noms que ses élèves pourront reconnaître.", "In an old shed, adults still learn to read addresses maps removed. Teacher Letha Vorn keeps a list of pupils who officially exist in no ward. She wants neither heroism nor a promise: she wants to know whether the next warning will carry names her pupils can recognise."),
  },
  forgotten_causeway: {
    title: l("La chaussée des portes basses", "The low-gates causeway"),
    description: l("Une chaussée de briques traverse un ancien canal et rejoint les sous-sols des portes. Les habitants l'appellent le chemin des retours, parce que c'est par là que les familles dispersées revenaient chercher une casserole, une clef, parfois un corps. Le passage mène aux mécanismes plus vite que les escaliers de la ville, mais il vous force à voir ce que ces mécanismes ont déjà fait.", "A brick causeway crosses an old canal and joins the gate underlevels. Residents call it the road of returns, because scattered families used it to come back for a pot, a key, sometimes a body. The passage reaches the machinery faster than the city's stairs, but forces you to see what that machinery has already done."),
  },
  echo_vault: {
    title: l("La chambre des essais silencieux", "The vault of silent trials"),
    description: l("Sous le scriptorium, une chambre ronde conserve des plaques de cuivre et des rapports d'essai. Les ingénieurs y testaient les cloches sans les faire entendre en surface. Un protocole porte une annotation terrifiante : « maintien du calme dans les secteurs non prioritaires ». Le silence de Vire-Basse n'était pas un oubli; il avait une méthode, un budget et des signatures.", "Beneath the scriptorium, a round chamber keeps copper plates and trial reports. Engineers tested bells there without letting them be heard above. One protocol bears a dreadful note: “maintain calm in non-priority sectors.” Low Vire's silence was not an oversight; it had a method, a budget, and signatures."),
  },
  brass_lift: {
    title: l("L'ascenseur de laiton", "The brass lift"),
    description: l("Une cage de service pend au-dessus d'un puits de roues. Celen y a remplacé les contrepoids par des sacs de sable afin que les inspecteurs ne puissent plus l'utiliser sans lui. Il peut vous faire gagner les portes, ou vous expliquer comment les signaux de la ville ont été déviés. Les deux choix vous coûtent quelque chose, et il refuse de prétendre le contraire.", "A service cage hangs over a well of wheels. Celen replaced its counterweights with sandbags so inspectors could no longer use it without him. He can get you to the gates, or explain how the city's signals were diverted. Both choices cost you something, and he refuses to pretend otherwise."),
  },
  understreet_lift: {
    title: l("Le palier sous les rues", "The landing beneath the streets"),
    description: l("La cage débouche derrière les fondations de Laelith. Des conduits de parole, de verre et d'eau y sont réunis comme les nerfs d'un même corps. Vous comprenez enfin que le réseau de Valdrick n'a pas construit une machine : il a appris à jouer d'une machine que la ville utilisait déjà pour classer ses habitants.", "The cage opens behind Laelith's foundations. Conduits for voice, glass, and water meet here like nerves in one body. You finally understand Valdrick's network did not build a machine: it learned to play a machine the city already used to sort its residents."),
  },
  fifth_quarter_assembly: {
    title: l("L'assemblée du cinquième quartier", "The fifth ward assembly"),
    description: l("Dans la cuisine élargie par des portes ouvertes, les habitantes et habitants de Vire-Basse se réunissent sans estrade. Marwen refuse que vous lisiez vos preuves à leur place. Tovar veut joindre les signatures, Celen veut joindre les mesures, Letha veut joindre les noms absents des listes. La discussion est lente, parfois dure, mais elle produit une chose que les conspirateurs n'avaient pas prévue : des personnes qui choisissent ensemble la manière dont elles seront défendues.", "In the kitchen widened by open doors, Low Vire's residents gather without a dais. Marwen refuses to let you read your proof in their stead. Tovar wants to add signatures, Celen the measurements, Letha the names absent from lists. The discussion is slow, sometimes hard, but it produces something conspirators did not expect: people choosing together how they will be defended."),
    visitDescriptions: [{ requires: { path: "state.clues", includes: "vire_witnesses" }, text: l("L'assemblée a déjà désigné des porteuses et porteurs de parole. Vous n'êtes plus seul à porter l'histoire; c'est plus lourd pour le pouvoir, et plus léger pour vous.", "The assembly has already chosen its speakers. You no longer carry the story alone; it is heavier for power, and lighter for you.") }],
  },
};

// The Retention Ward is a second, less visible civic system beside Vire-Basse:
// it turns an old emergency-water network into a route about mutual aid,
// records, and the practical cost of making an alarm reach everyone.
const FOURTH_LORE_SCENES = {
  retention_gate: {
    title: l("La porte de retenue", "The retention gate"),
    description: l("Au-delà de la chaussée des portes basses, une herse de bronze isole un ancien quartier de réservoirs. Les habitants l'appellent la Retenue : non parce qu'elle garde l'eau, mais parce que chaque décision prise ici avait autrefois le pouvoir de la retenir pour quelqu'un d'autre. Un anneau de cloches muettes pend au-dessus du seuil.", "Beyond the low-gates causeway, a bronze portcullis seals off an old reservoir ward. Its residents call it the Retention: not because it holds water, but because every decision made here once had the power to hold it back from someone else. A ring of silent bells hangs over the threshold."),
  },
  waterkeepers_court: {
    title: l("La cour des gardiens d'eau", "The waterkeepers' court"),
    description: l("Des bassins peu profonds occupent une cour pavée, chacun marqué d'un symbole de quartier. Miren Aulne, gardienne des niveaux, y échange des seaux contre des promesses écrites. Elle a appris à compter ce qui manque avant que les notables ne puissent appeler cela une simple pénurie.", "Shallow basins fill a paved court, each marked with a ward symbol. Miren Aulne, keeper of levels, trades buckets for written promises. She learned to count what is missing before notables can call it a mere shortage."),
    visitDescriptions: [{ requires: { path: "state.flags.metMiren", equals: true }, text: l("Miren a ajouté un bassin vide au plan de la cour. Il ne porte aucun nom officiel, mais vous reconnaissez le signe de Vire-Basse. « Une carte commence parfois par une place laissée libre », dit-elle.", "Miren has added an empty basin to the court plan. It bears no official name, but you recognise Low Vire's mark. “A map sometimes begins with a place left open,” she says.") }],
  },
  tally_weighbridge: {
    title: l("Le pont-bascule des comptes", "The tally weighbridge"),
    description: l("Un pont étroit franchit un canal de dérivation. Sous ses dalles, une mécanique de plomb pesait jadis les barriques et, avec elles, le droit d'un quartier à recevoir de l'eau. Des chiffres gravés dans le garde-corps ont été martelés jusqu'à devenir presque illisibles.", "A narrow bridge crosses a diversion canal. Beneath its slabs, a lead mechanism once weighed barrels and, with them, a ward's right to receive water. Figures carved into the rail have been hammered until nearly illegible."),
  },
  brass_garden: {
    title: l("Le jardin de laiton", "The brass garden"),
    description: l("Entre les soupapes abandonnées, des herbes médicinales poussent dans des cuvettes de cuivre. Les familles de la Retenue y ont remplacé les jauges par des plants de fièvre et des racines filtrantes. L'endroit prouve qu'un mécanisme peut être détourné vers le soin sans cesser d'être un mécanisme.", "Among abandoned valves, medicinal herbs grow in copper basins. Retention families have replaced gauges with fever plants and filtering roots. The place proves a mechanism can be turned toward care without ceasing to be a mechanism."),
  },
  names_reservoir: {
    title: l("Le réservoir des noms", "The reservoir of names"),
    description: l("L'eau a disparu du grand bassin, révélant des milliers de petites plaquettes attachées à des chaînes. Chaque nom désigne une maison qui devait recevoir l'alerte ou une famille à qui l'on devait une ration. Beaucoup ont été retournées face au mur. On comprend ici que l'oubli fut aussi une tâche quotidienne.", "Water has drained from the great basin, revealing thousands of small plaques tied to chains. Each name marks a house meant to receive warning or a family owed a ration. Many have been turned to face the wall. Here you understand forgetting was also a daily task."),
  },
  storm_registry: {
    title: l("Le registre des orages", "The storm registry"),
    description: l("Un cabinet de pierre conserve les prévisions de crue sous des feuilles de mica. Sera Uln, ancienne copiste des services d'urgence, les classe par délai plutôt que par année : qui a été prévenu à l'heure, qui l'a été trop tard, et qui ne figure même pas dans la colonne des destinataires.", "A stone cabinet keeps flood forecasts beneath mica sheets. Sera Uln, a former emergency-services copyist, files them by delay rather than year: who was warned on time, who too late, and who does not appear in the recipient column at all."),
    visitDescriptions: [{ requires: { path: "state.flags.metSera", equals: true }, text: l("Sera a cessé de dissimuler les pages sous le mica. Elle les laisse ouvertes, mais garde la main dessus : une preuve peut voyager, elle ne doit pas être arrachée.", "Sera has stopped hiding the pages under mica. She leaves them open, but keeps her hand upon them: evidence may travel, it must not be torn away.") }],
  },
  pledge_chamber: {
    title: l("La chambre des engagements", "The pledge chamber"),
    description: l("Sous le registre, une salle circulaire porte des crochets pour autant de lanternes que de quartiers anciens. Les contrats d'eau y étaient autrefois jurés à voix haute afin que nul ne puisse prétendre ne pas savoir. Les crochets de Vire-Basse sont vides; l'un d'eux attend encore une lanterne jamais allumée.", "Beneath the registry, a round chamber bears hooks for as many lanterns as there were old wards. Water contracts were once sworn aloud here so none could claim ignorance. Low Vire's hooks are empty; one still awaits a lantern never lit."),
  },
  relief_quay: {
    title: l("Le quai du secours", "The relief quay"),
    description: l("Derrière des hangars murés, un quai étroit permettait aux barques de ravitaillement d'atteindre les rues basses pendant les crues. Pavos Renn y entretient une coque qui ne figure sur aucun registre. Il n'est ni héros ni contrebandier par goût : il a transporté ce que les listes autorisaient, puis ce que les listes oubliaient.", "Behind walled-up sheds, a narrow quay once let relief boats reach the lower streets during floods. Pavos Renn maintains a hull that appears in no ledger. He is neither hero nor smuggler by taste: he carried what lists allowed, then what lists forgot."),
  },
  rain_chain: {
    title: l("La chaîne de pluie", "The rain chain"),
    description: l("Une chaîne de godets remonte l'eau depuis le quai jusqu'aux citernes. Chaque maillon porte une entaille : une livraison détournée, un avertissement arrivé, une porte restée ouverte. Le dispositif rejoint les conduits de verre du réseau actuel; les conspirateurs l'ont utilisé parce qu'il était déjà là.", "A chain of cups lifts water from the quay to the cisterns. Each link bears a notch: a diverted delivery, a warning received, a door left open. The device joins the current network's glass conduits; conspirators used it because it was already there."),
  },
  breakwater_chapel: {
    title: l("La chapelle du brise-lame", "The breakwater chapel"),
    description: l("Une chapelle sans autel est bâtie dans l'épaisseur d'une digue. Des couvertures sèchent près de niches où l'on range des rames, des fioles et des listes de personnes à rejoindre. Ce n'est pas un refuge abstrait : chaque objet indique quel geste faire quand l'eau revient.", "A chapel without an altar is built into the thickness of a breakwater. Blankets dry beside niches holding oars, vials, and lists of people to reach. This is no abstract refuge: every object indicates what to do when water returns."),
  },
  overflow_gallery: {
    title: l("La galerie du trop-plein", "The overflow gallery"),
    description: l("La galerie longe un déversoir qui peut soulager les réservoirs ou envoyer toute leur pression vers les mécanismes des portes. Des graffitis de bateliers couvrent le mur : des flèches, des noms, des calculs de marée. Les plus récents prolongent les relevés de Celen jusqu'à la terrasse des boucliers.", "The gallery follows an overflow channel that can ease the reservoirs or send all their pressure toward the gate mechanisms. Boatmen's graffiti covers the wall: arrows, names, tide calculations. The most recent extend Celen's readings to the shield terrace."),
  },
};

// The Dawn Ward was once responsible for carrying a warning from rooftop to
// rooftop. Its surviving routes show that the city did not only silence people
// by withholding bells: it taught itself which voices were allowed to ring.
const FIFTH_LORE_SCENES = {
  dawn_portal: { title: l("Le portail de l'aube", "The dawn portal"), description: l("Une porte haute ouvre sur un quartier perché au-dessus des canaux. Les battants portent des soleils rayés, comme si quelqu'un avait voulu empêcher l'aube d'entrer. Ici commençait jadis le relais des cloches : une alerte passait de toit en toit avant de descendre vers les quais.", "A tall gate opens onto a ward perched above the canals. Its doors bear scratched-out suns, as if someone tried to stop dawn from entering. The bell relay once began here: a warning passed from rooftop to rooftop before descending to the quays.") },
  bellkeepers_yard: { title: l("La cour des sonneurs", "The bellkeepers' yard"), description: l("Des cloches de tailles différentes sont suspendues à un figuier sec. Veyra Mall, dernière sonneuse du quartier, les reconnaît au poids plutôt qu'au son. Elle affirme que le réseau n'a jamais eu une seule voix : il a toujours eu une cloche pour les riches et une autre pour les rues qu'on disait trop basses.", "Bells of different sizes hang from a dry fig tree. Veyra Mall, the ward's last bellkeeper, knows them by weight rather than sound. She insists the network never had one voice: it always kept one bell for the wealthy and another for streets called too low."), visitDescriptions: [{ requires: { path: "state.flags.metVeyra", equals: true }, text: l("Veyra a posé deux maillets sur la pierre. Elle ne vous demande plus lequel est le bon; elle vous demande qui doit pouvoir les tenir.", "Veyra has laid two mallets on the stone. She no longer asks which one is right; she asks who should be allowed to hold them.") }] },
  cracked_chime_gallery: { title: l("La galerie des carillons fêlés", "The cracked-chime gallery"), description: l("Un couloir étroit aligne des carillons de cuivre, chacun fendu à un endroit différent. Les fissures ont été calculées : certaines empêchaient un son de franchir la cour, d'autres le rendaient audible seulement depuis les terrasses hautes. La sélection avait même une acoustique.", "A narrow corridor lines up copper chimes, each cracked in a different place. The fractures were calculated: some stopped a sound crossing the court, others made it audible only from high terraces. Selection even had an acoustics.") },
  dawn_market: { title: l("Le marché de l'aube", "The dawn market"), description: l("Les échoppes ne vendent qu'avant le lever du soleil : pain, mèches, rubans et nouvelles. Salma Vell tient un comptoir de petites lanternes à fenêtre bleue. Elle a vu les messagers municipaux acheter des lots entiers la veille des crues, puis les distribuer à des adresses dont personne au marché ne voulait prononcer les noms.", "The stalls trade only before sunrise: bread, wicks, ribbons, and news. Salma Vell keeps a counter of small blue-window lanterns. She saw municipal messengers buy whole lots before floods, then distribute them to addresses no one in the market wished to name.") },
  courier_roof: { title: l("Le toit des coursiers", "The couriers' roof"), description: l("Des cordes relient les cheminées de trois pâtés de maisons. Iven Korr, ancien coureur de dépêches, y conserve des boîtes de métal dans lesquelles il glissait les avis que ses supérieurs lui ordonnaient de ne pas remettre. Il ne se présente pas comme un résistant : il se reproche surtout d'avoir trop longtemps confondu discrétion et obéissance.", "Ropes link the chimneys of three blocks. Iven Korr, a former dispatch runner, keeps metal boxes there in which he slipped notices his superiors ordered him not to deliver. He does not call himself resistance: he mostly reproaches himself for confusing discretion with obedience for too long.") },
  relay_conservatory: { title: l("Le conservatoire des relais", "The relay conservatory"), description: l("Sous une verrière poussiéreuse, des modèles de clochers, de lentilles et de conduits sont reliés par des fils colorés. Les apprentis y apprenaient à faire circuler l'alerte sans dépendre d'un seul bâtiment. Plus tard, les fils ont été renommés selon les quartiers qu'ils pouvaient contourner.", "Beneath a dusty glass roof, models of belfries, lenses, and conduits are joined by coloured threads. Apprentices learned here to circulate warning without depending on a single building. Later, the threads were renamed after the wards they could bypass.") },
  voices_cistern: { title: l("La citerne des voix", "The cistern of voices"), description: l("Une citerne vide répercute le moindre souffle. Ses parois sont couvertes de noms et de dates, inscrits par des familles qui venaient vérifier si leur rue avait été entendue. Lorsque deux personnes parlent depuis des niches opposées, leurs mots se rejoignent au centre : une ingénierie faite pour que personne n'ait à crier seul.", "An empty cistern echoes the slightest breath. Its walls are covered in names and dates, written by families who came to check whether their street had been heard. When two people speak from opposite niches, their words meet at the centre: engineering made so no one has to shout alone.") },
  blue_window_workshop: { title: l("L'atelier des fenêtres bleues", "The blue-window workshop"), description: l("Des cadres de cuivre et des éclats de verre bleu couvrent les établis. Les fenêtres ne servaient pas à décorer les maisons, mais à relayer l'alerte par lumière lorsque les cloches étaient noyées par la pluie. Sur un patron, vous reconnaissez le même bleu que dans le limon de Siren.", "Copper frames and shards of blue glass cover the workbenches. The windows did not decorate houses; they relayed warning by light when rain drowned the bells. On one pattern, you recognize the same blue found in Siren's silt.") },
  civic_tribune: { title: l("La tribune des rues", "The street tribune"), description: l("Une petite terrasse domine quatre venelles. Avant les sceaux et les procédures, les gardiens y lisaient les noms des rues qui devaient être prévenues. Les plaques de bronze ont été retirées, mais leurs contours restent dans la pierre; une ville peut effacer un texte sans effacer la place où il fut prononcé.", "A small terrace overlooks four lanes. Before seals and procedures, wardens read here the names of streets that must be warned. The bronze plaques were removed, but their outlines remain in stone; a city can erase a text without erasing the place where it was spoken.") },
  message_bridge: { title: l("Le pont des messages", "The message bridge"), description: l("Un pont de service franchit une rue si étroite que les lettres passaient autrefois dans des paniers tirés par poulie. Le mécanisme rejoint les couloirs du Conseil d'un côté, les marches de la ville de l'autre. Il a servi à accélérer les ordres; il peut désormais accélérer les réponses.", "A service bridge crosses a lane so narrow that letters once travelled in pulley-drawn baskets. Its mechanism joins the Council corridors on one side and the city steps on the other. It served to speed orders; it can now speed responses.") },
  unheard_stairs: { title: l("Les escaliers des sans-voix", "The unheard stairs"), description: l("Les marches montent sous des murs couverts de noms qui ne furent jamais lus à la tribune. Quelqu'un a ajouté les dates récentes à la craie, refusant que l'histoire s'arrête aux morts anciens. Chaque palier mène vers une ouverture plus claire, mais personne ne prétend que la lumière soit une réparation.", "The stairs rise beneath walls covered in names never read at the tribune. Someone has added recent dates in chalk, refusing to let the story stop with old dead. Each landing leads toward a brighter opening, but no one claims light is repair.") },
  first_light_chamber: { title: l("La chambre de première lumière", "The first-light chamber"), description: l("Au sommet du quartier, un disque de miroirs orientables attend derrière une coupole. Il pouvait envoyer le premier signal vers tous les toits de Laelith, ou n'en éclairer qu'une moitié. La dernière inscription est simple : « aucune aube ne vaut si elle choisit ses fenêtres ».", "At the top of the ward, a disk of adjustable mirrors waits beneath a dome. It could send the first signal to every roof in Laelith, or light only half of them. The final inscription is simple: “no dawn is worth anything if it chooses its windows.”") },
};

// The Makers' Basin is the craft district beneath the gates. Its workshops
// reveal that the same labour which built the apparatus can also refuse its
// misuse and repair it in public sight.
const SIXTH_LORE_SCENES = {
  makers_gate: { title: l("La porte des faiseurs", "The makers' gate"), description: l("Une porte de fonte donne sur des ateliers invisibles depuis la ville haute. Les ouvriers y entraient par équipes avant l'aube, afin que les portes de la rivière paraissent fonctionner seules. Sur le linteau, une devise a été recouverte de suie : « ce qui tient doit répondre à celles et ceux qu'il protège ».", "An iron gate opens onto workshops invisible from the upper city. Workers entered in shifts before dawn so the river gates might appear to run themselves. On the lintel, a motto lies beneath soot: ‘what holds must answer to those it protects.’") },
  tool_court: { title: l("La cour des outils", "The tool court"), description: l("Des établis encerclent une cour où chaque outil porte le poinçon de l'équipe qui l'a fabriqué. Roul Venn, ancien maître de forge, a conservé les marteaux dont les manches furent remplacés après les premiers ordres de sabotage. Il ne fait confiance ni aux beaux discours ni aux pièces sans trace de main.", "Benches ring a court where every tool bears the stamp of the crew that made it. Roul Venn, a former forge master, kept the hammers whose handles were replaced after the first sabotage orders. He trusts neither fine speeches nor parts without a trace of a hand.") },
  chain_foundry: { title: l("La fonderie des chaînes", "The chain foundry"), description: l("Des chaînes refroidissent dans des cuves noires. Les maillons sont destinés aux contrepoids, mais certains portent une rainure qui ne devrait pas exister : une manière de les faire céder sur commande. Les ouvriers appelaient cela une faiblesse; les acheteurs appelaient cela une option.", "Chains cool in black vats. The links are meant for counterweights, but some bear a groove that should not exist: a way to make them fail on command. Workers called it a weakness; buyers called it an option.") },
  bellows_loft: { title: l("Le grenier des soufflets", "The bellows loft"), description: l("Sous le toit, des soufflets géants alimentent les fours. Nyma Tress, apprentie mécanicienne, y a caché des copies de commandes parce qu'elle ne savait pas encore qui croire. Elle sait seulement qu'un atelier change de visage lorsque les mêmes mains doivent réparer ce qu'on leur a ordonné de briser.", "Under the roof, giant bellows feed the furnaces. Nyma Tress, an apprentice mechanic, hid copies of orders here because she did not yet know whom to trust. She only knows a workshop changes face when the same hands must repair what they were ordered to break.") },
  waterwright_archive: { title: l("Les archives des hydrauliciens", "The waterwrights' archive"), description: l("Des plans roulés sont rangés dans des tubes de cuivre. Ils décrivent les portes comme un pacte de travail : la force de l'eau devait être surveillée par celles et ceux qui en subiraient le premier choc. Une note plus récente transforme ce pacte en protocole réservé à des inspecteurs nommés.", "Rolled plans rest in copper tubes. They describe the gates as a labour pact: water's force was to be watched by those who would take its first blow. A newer note turns that pact into a protocol reserved for appointed inspectors.") },
  guild_kitchen: { title: l("La cuisine de la guilde", "The guild kitchen"), description: l("La soupe mijote entre des casiers de casques et de gants. Ici, les équipes échangent les blessures et les rumeurs avant de signer une journée de travail. Doro Fen, intendant des vivres, a gardé les listes de repas : elles prouvent quelles équipes furent envoyées sous les portes la nuit des essais.", "Soup simmers between lockers of helmets and gloves. Here crews exchange injuries and rumours before signing a day's work. Doro Fen, provisions steward, kept meal lists: they prove which crews were sent beneath the gates on the night of the trials.") },
  apprentice_dormitory: { title: l("Le dortoir des apprentis", "The apprentices' dormitory"), description: l("Des lits étroits longent un mur couvert de schémas. Les jeunes ouvriers dessinent les mécanismes qu'ils espèrent un jour comprendre, puis barrent les pièces qui ont blessé leurs aînés. Une fenêtre donne sur la cour : le premier lieu d'où une grève pourrait être entendue.", "Narrow beds line a wall covered in diagrams. Young workers draw mechanisms they hope one day to understand, then cross out the parts that hurt their elders. A window looks over the court: the first place from which a strike could be heard.") },
  clay_map_room: { title: l("La salle des plans d'argile", "The clay map room"), description: l("Un relief de Laelith en argile humide permet de déplacer les vannes, les ponts et les canaux d'une simple pression. Des doigts ont gravé des ruelles supplémentaires là où les cartes officielles ne voyaient que de l'eau. Celen aurait aimé cette carte : elle ne prétend pas que les quartiers bas soient vides.", "A relief of Laelith in wet clay lets one move sluices, bridges, and canals with a simple press. Fingers have carved extra lanes where official maps saw only water. Celen would have liked this map: it does not pretend the lower wards are empty.") },
  underforge: { title: l("La forge basse", "The underforge"), description: l("Une forge est installée au pied même des mécanismes. Son feu sert à réparer les gonds sans démonter les portes. Les flammes révèlent sur une barre de métal les marques d'un ordre falsifié : quelqu'un a voulu que le sabotage paraisse venir des ouvriers eux-mêmes.", "A forge stands at the foot of the mechanisms themselves. Its fire repairs hinges without dismantling the gates. Flames reveal the marks of a forged order on a metal bar: someone wanted the sabotage to seem to come from the workers themselves.") },
  handspan_bridge: { title: l("Le pont d'une paume", "The handspan bridge"), description: l("Un petit pont de maintenance ne laisse passer qu'une personne à la fois. Les équipes l'utilisaient pour vérifier les mécanismes sans se gêner; les contremaîtres l'ont fermé pour empêcher les ouvriers de comparer leurs consignes. Chaque traversée rappelle qu'une information tenue séparée devient facilement un ordre.", "A small maintenance bridge admits only one person at a time. Crews used it to inspect mechanisms without crowding; foremen closed it to stop workers comparing instructions. Every crossing recalls that information kept apart easily becomes an order.") },
  confluence_shaft: { title: l("Le puits de confluence", "The confluence shaft"), description: l("Les conduites des ateliers, de la Retenue et des signaux se rejoignent dans un puits de pierre. Les métiers de la ville ne sont pas séparés ici : une réparation peut modifier une alerte, une ration peut décider qui peut travailler, un silence peut casser une porte.", "Conduits from workshops, the Retention, and signals meet in a stone shaft. The city's trades are not separate here: a repair can alter a warning, a ration can decide who can work, a silence can break a gate.") },
  worksong_chapel: { title: l("La chapelle des chants de travail", "The work-song chapel"), description: l("Une alcôve de pierre amplifie les voix sans les transformer en prière. Les équipes y chantaient les étapes de sécurité afin qu'aucun geste ne repose sur la mémoire d'un seul contremaître. Les vers ont été grattés du mur, mais Nyma en connaît encore les premiers mots.", "A stone alcove amplifies voices without turning them into prayer. Crews sang safety steps here so no action rested on a single foreman's memory. The verses were scratched from the wall, but Nyma still knows their first words.") },
};

// The lower embassies reveal that Souleyna did not merely fund the present
// conspiracy. It profited from Laelith's old exclusions, and the player must
// decide whether to expose that compact or use its routes to save people first.
const SEVENTH_LORE_SCENES = {
  embassy_court: { title: l("La cour des ambassades basses", "The lower embassy court"), description: l("Sous les salons officiels, une cour sans drapeau sert aux délégations que personne ne veut voir arriver. Des valises attendent sous des bâches et des messagers changent de langue à chaque porte. Un vieux traité y a donné à Souleyna le droit de demander des garanties lorsque les quartiers bas deviennent dangereux.", "Beneath the official salons, a flagless court serves delegations no one wishes to see arrive. Cases wait under tarps and messengers change language at every door. An old treaty gave Souleyna the right to demand guarantees whenever lower wards became dangerous.") },
  interpreter_lodge: { title: l("Le logis des interprètes", "The interpreters' lodge"), description: l("Des glossaires de commerce et de droit couvrent les murs. Tamsin Raye, interprète qui a quitté la délégation de Souleyna, a conservé les mots que les contrats traduisent mal : garantie, évacuation, créance, famille. Elle sait qu'une clause peut devenir une frontière sans jamais employer ce nom.", "Glossaries of trade and law cover the walls. Tamsin Raye, an interpreter who left Souleyna's delegation, kept words contracts translate poorly: guarantee, evacuation, debt, family. She knows a clause can become a border without ever using that name.") },
  pledge_balcony: { title: l("Le balcon des garanties", "The guarantee balcony"), description: l("Un balcon donne sur les quais où les délégations font embarquer leurs protégés. Les garde-corps portent les emblèmes de maisons marchandes et les entailles de familles qui ont attendu une autorisation de partir. La vue est belle, ce qui rend la violence administrative plus difficile à ignorer.", "A balcony overlooks quays where delegations embark their protected people. Railings bear merchant-house emblems and scratches from families who waited for permission to leave. The view is beautiful, which makes administrative violence harder to ignore.") },
  sealed_larder: { title: l("L'office scellé", "The sealed larder"), description: l("Derrière une porte de provisions, des caisses de farine et de médicaments attendent un cachet étranger. Les réserves ont été enregistrées comme aide humanitaire, mais les étiquettes correspondent aux rues que les cartes de Vire-Basse ont effacées. La nourriture est devenue une monnaie de silence.", "Behind a provisions door, crates of flour and medicine await a foreign seal. Stores were registered as humanitarian aid, but labels match streets erased from Low Vire maps. Food has become a currency of silence.") },
  guest_cells: { title: l("Les chambres d'invités", "The guest cells"), description: l("De petites chambres donnent sur une cour fermée. Les familles y attendent des laissez-passer qu'elles ne comprennent pas, surveillées sans qu'aucune porte ne soit officiellement verrouillée. Avel Mor, passeur et ancien domestique de l'ambassade, connaît les heures où une barque peut partir sans que personne ne fasse semblant de ne rien voir.", "Small rooms open onto a closed court. Families wait for passes they do not understand, watched though no door is officially locked. Avel Mor, ferryman and former embassy servant, knows the hours when a boat can leave without anyone pretending not to see.") },
  treaty_archive: { title: l("Les archives du traité", "The treaty archive"), description: l("Des exemplaires du traité sont reliés dans des peaux de couleurs différentes selon la langue du lecteur. L'une des traductions remplace « protéger les personnes menacées » par « préserver la valeur des quais ». Tamsin dit que ce n'est pas une erreur : c'est l'endroit précis où le commerce a appris à parler comme la ville.", "Treaty copies are bound in different coloured skins according to the reader's language. One translation replaces ‘protect threatened people’ with ‘preserve the value of the quays.’ Tamsin says it is no mistake: it is the precise point where trade learned to speak like the city.") },
  quay_of_envoys: { title: l("Le quai des envoyés", "The envoys' quay"), description: l("Une embarcation de Souleyna attend sous une voile blanche. Elle peut emporter des familles vers une ville moins menacée, mais son capitaine demande en échange que le traité ne devienne jamais une affaire publique. Avel ne vous cache rien : accepter le passage, c'est sauver des personnes et laisser une structure intacte.", "A Souleyna vessel waits beneath a white sail. It can carry families to a less threatened city, but its captain asks in return that the treaty never become public. Avel hides nothing: accepting passage saves people and leaves a structure intact.") },
  shadow_post: { title: l("Le relais des ombres", "The shadow post"), description: l("Une petite poste privée conserve des doubles de messages diplomatiques. Feya Rhun, copiste des départs, a vu les mêmes noms revenir dans les listes d'évacuation et les listes de dettes. Elle ne peut pas vous donner toutes les lettres sans condamner les familles qui en dépendent, mais elle peut vous montrer la forme du piège.", "A small private post keeps copies of diplomatic messages. Feya Rhun, departure clerk, has seen the same names recur in evacuation and debt lists. She cannot give you every letter without condemning the families who depend on them, but she can show you the shape of the trap.") },
};

const OUTCOME_SCENES = {
  ending_vire_covenant: { title: l("Vire-Basse reprend la parole", "Low Vire takes the floor"), description: l("Les portes tiennent, mais l'assemblée refuse que la ville referme simplement le dossier. Les lanternes de la Retenue et les noms de Vire-Basse rejoignent la salle du Conseil. Le pacte commun n'efface pas les absences; il oblige Laelith à les compter avec celles et ceux qui les ont vécues.\n\nFIN — La sécurité n'est plus un privilège accordé d'en haut.", "The gates hold, but the assembly refuses to let the city simply close the case. Retention lanterns and Low Vire names enter the Council hall. The common pledge does not erase absences; it compels Laelith to count them with those who lived them.\n\nTHE END — Safety is no longer a privilege granted from above."), ending: true },
  ending_workers_open: { title: l("Les portes ouvertes", "The gates kept open"), description: l("Roul, Nyma et les équipes reprennent les mécanismes sous le regard des quartiers menacés. Les faux ordres sont lus à voix haute; les ouvriers ne sont plus les coupables commodes du sabotage, mais les gardiens d'une règle retrouvée.\n\nFIN — Les portes tiennent parce que celles et ceux qui les réparent peuvent enfin dire non.", "Roul, Nyma, and the crews reclaim the mechanisms under the eyes of threatened wards. Forged orders are read aloud; workers are no longer sabotage's convenient culprits, but guardians of a recovered rule.\n\nTHE END — The gates hold because those who repair them can finally say no."), ending: true },
  ending_lantern_network: { title: l("Les fenêtres restent allumées", "The windows stay lit"), description: l("Hara, Pavos et les sœurs ne célèbrent pas une victoire : ils ouvrent les portes, distribuent les fioles et font passer les listes de refuge. Lorsque la pluie revient, aucune rue ne dépend d'un seul ordre pour savoir où aller.\n\nFIN — Laelith survit par ses chemins de soin.", "Hara, Pavos, and the sisters celebrate no victory: they open doors, distribute vials, and pass along shelter lists. When rain returns, no street depends on a single order to know where to go.\n\nTHE END — Laelith survives through its routes of care."), ending: true },
  ending_civic_warrant: { title: l("Le mandat de la ville", "The city's warrant"), description: l("Othran lit le mandat devant les marches bondées. La garde protège les témoins, les archives et les ateliers au lieu de les saisir. Les puissants gardent encore des alliés, mais ils perdent l'habitude de décider seuls de ce qui mérite d'être entendu.\n\nFIN — L'autorité apprend à répondre de ses sceaux.", "Othran reads the warrant before the crowded steps. The guard protects witnesses, archives, and workshops rather than seizing them. The powerful still keep allies, but lose the habit of deciding alone what deserves to be heard.\n\nTHE END — Authority learns to answer for its seals."), ending: true },
  ending_courier_truth: { title: l("La vérité circule", "Truth travels"), description: l("Yorra et les anciens coursiers font passer les copies par des itinéraires que le réseau ne contrôle plus. Aucun document ne repose dans une seule main; aucune arrestation ne peut faire taire toute l'affaire.\n\nFIN — La preuve survit parce qu'elle voyage.", "Yorra and former couriers send copies along routes the network no longer controls. No document rests in one hand; no arrest can silence the whole case.\n\nTHE END — Proof survives because it travels."), ending: true },
  ending_common_signal: { title: l("Une aube pour chaque fenêtre", "A dawn for every window"), description: l("Les cloches, les fenêtres bleues et les relais de toit reprennent un seul rythme. La ville entend enfin ce que ses mécanismes savaient faire depuis le début : prévenir chaque rue assez tôt pour qu'elle puisse répondre.\n\nFIN — L'alerte devient une promesse commune.", "Bells, blue windows, and rooftop relays take up a single rhythm. The city finally hears what its mechanisms could do from the beginning: warn every street early enough to answer.\n\nTHE END — Warning becomes a common promise."), ending: true },
  ending_many_hands: { title: l("La ville aux mains nombreuses", "The city of many hands"), description: l("Les délégués de Vire-Basse, les équipes des portes, les soignantes, les sonneurs et les passeurs refusent de laisser une seule institution raconter le sauvetage. Laelith ne devient pas juste d'un coup; elle devient plus difficile à gouverner dans le silence.\n\nFIN — La catastrophe est évitée, et le pouvoir doit désormais composer avec ses habitants.", "Low Vire delegates, gate crews, healers, bellkeepers, and ferrymen refuse to let one institution tell the rescue. Laelith does not become just all at once; it becomes harder to govern in silence.\n\nTHE END — Disaster is averted, and power must now reckon with its residents."), ending: true },
  ending_guarded_archive: { title: l("Les preuves gardées", "The guarded evidence"), description: l("Vous ne rendez pas tout public, mais les archives ne sont plus seules. Ilyra, Tovar, Yorra et les habitants des quartiers bas conservent des copies et des clés. Le silence reste dangereux; cette fois il n'est plus une disparition.\n\nFIN — La vérité attend, protégée par plusieurs mémoires.", "You do not make everything public, but the archives are no longer alone. Ilyra, Tovar, Yorra, and lower-ward residents keep copies and keys. Silence remains dangerous; this time it is no longer a disappearance.\n\nTHE END — Truth waits, guarded by many memories."), ending: true },
  ending_broken_compact: { title: l("Le traité brisé", "The broken compact"), description: l("Le traité de Souleyna est lu dans toutes ses langues. L'ambassade nie, les maisons marchandes menacent, mais les clauses ne peuvent plus protéger leur violence derrière le vocabulaire du commerce. Les familles restent exposées un temps; la ville découvre enfin ce qu'elle avait vendu.\n\nFIN — Le prix de la vérité devient visible.", "Souleyna's treaty is read in every language. The embassy denies, merchant houses threaten, but clauses can no longer hide violence behind the vocabulary of trade. Families remain exposed for a time; the city finally discovers what it had sold.\n\nTHE END — The price of truth becomes visible."), ending: true },
  ending_exile_passage: { title: l("Le passage des familles", "The families' passage"), description: l("Les barques quittent le quai avant que les sceaux ne puissent les retenir. Vous n'obtenez pas la chute publique de Souleyna, mais des enfants, des anciens et des témoins passent vivants la frontière d'eau. Le traité survit, contesté par des copies qu'il ne contrôle plus.\n\nFIN — Certaines vies sont sauvées avant que la justice puisse les rejoindre.", "Boats leave the quay before seals can hold them. You do not win Souleyna's public downfall, but children, elders, and witnesses cross the water border alive. The treaty survives, contested by copies it no longer controls.\n\nTHE END — Some lives are saved before justice can reach them."), ending: true },
};

const RESOLVED_ENDING_SCENES = ["ending_dawn", "ending_silent", ...Object.keys(OUTCOME_SCENES)];

export const FIXED_SCENES = { ...CORE_SCENES, ...WORLD_EXPANSION_SCENES, ...ANNEX_SCENES, ...LORE_EXPANSION_SCENES, ...SECOND_LORE_SCENES, ...THIRD_LORE_SCENES, ...FOURTH_LORE_SCENES, ...FIFTH_LORE_SCENES, ...SIXTH_LORE_SCENES, ...SEVENTH_LORE_SCENES, ...OUTCOME_SCENES };

// Geographic layout is campaign data. Coordinates are deliberately separate
// from prose and rules, so another campaign can supply a wholly different map.
export const WORLD_MAP = {
  viewBox: "0 0 1810 540",
  regions: [
    { id: "city", x: 12, y: 12, width: 536, height: 118, label: l("Laelith haute", "Upper Laelith") },
    { id: "riverbed", x: 90, y: 145, width: 350, height: 82, label: l("Lit asséché", "Dry riverbed") },
    { id: "depths", x: 18, y: 242, width: 365, height: 174, label: l("Galeries et eaux basses", "Galleries and low water") },
    { id: "machinery", x: 400, y: 165, width: 148, height: 250, label: l("Portes et mécanismes", "Gates and machinery") },
    { id: "east_canals", x: 565, y: 12, width: 133, height: 403, label: l("Canaux de l'est", "Eastern canals") },
    { id: "annexes", x: 720, y: 12, width: 128, height: 403, label: l("Détours et annexes", "Annexes and detours") },
    { id: "outer_annexes", x: 870, y: 12, width: 128, height: 403, label: l("Périphérie oubliée", "Forgotten outskirts") },
    { id: "low_vire", x: 1015, y: 12, width: 133, height: 403, label: l("Vire-Basse retrouvée", "Low Vire restored") },
    { id: "retention", x: 1165, y: 12, width: 133, height: 403, label: l("Quartier de la Retenue", "The Retention Ward") },
    { id: "dawn_ward", x: 1320, y: 12, width: 133, height: 403, label: l("Quartier de l'Aube", "The Dawn Ward") },
    { id: "makers_basin", x: 1475, y: 12, width: 148, height: 403, label: l("Bassin des Faiseurs", "The Makers' Basin") },
    { id: "lower_embassies", x: 1645, y: 12, width: 148, height: 403, label: l("Ambassades basses", "Lower Embassies") },
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
    { id: "mask_exchange", x: 748, y: 44 }, { id: "water_clock", x: 815, y: 72 }, { id: "bell_foundry", x: 748, y: 105 },
    { id: "customs_annex", x: 815, y: 135 }, { id: "canal_infirmary", x: 748, y: 165 }, { id: "tide_garden", x: 815, y: 195 },
    { id: "sluice_workshop", x: 748, y: 225 }, { id: "broken_weir", x: 815, y: 252 }, { id: "submerged_theater", x: 748, y: 285 },
    { id: "whisper_stairs", x: 815, y: 310 }, { id: "drowned_oratory", x: 748, y: 345 }, { id: "signal_gallery", x: 815, y: 365 },
    { id: "chain_walkway", x: 780, y: 398 },
    { id: "lantern_hospice", x: 895, y: 45 }, { id: "alchemist_pier", x: 970, y: 74 },
    { id: "submerged_granary", x: 895, y: 116 }, { id: "salt_tunnels", x: 970, y: 150 },
    { id: "ancient_pump_room", x: 895, y: 195 }, { id: "paper_mill", x: 970, y: 230 },
    { id: "archivist_cellar", x: 895, y: 275 }, { id: "ruined_bell_tower", x: 970, y: 320 },
    { id: "votive_roof", x: 535, y: 132 }, { id: "veil_theatre", x: 782, y: 22 },
    { id: "mirror_archive", x: 418, y: 136 }, { id: "wicker_docks", x: 700, y: 235 },
    { id: "moonwell_grotto", x: 405, y: 344 }, { id: "glass_catacomb", x: 842, y: 340 },
    { id: "tide_ossuary", x: 930, y: 380 },
    { id: "copper_aviary", x: 540, y: 22 }, { id: "house_of_measures", x: 535, y: 112 },
    { id: "brass_reliquary", x: 307, y: 126 }, { id: "exile_courtyard", x: 88, y: 236 },
    { id: "silt_observatory", x: 700, y: 330 }, { id: "drowned_mailroom", x: 700, y: 210 },
    { id: "low_vire_threshold", x: 1035, y: 42 }, { id: "witness_kitchen", x: 1100, y: 74 },
    { id: "ledger_scriptorium", x: 1035, y: 116 }, { id: "flood_marks_house", x: 1100, y: 148 },
    { id: "quiet_school", x: 1035, y: 190 }, { id: "forgotten_causeway", x: 1100, y: 225 },
    { id: "echo_vault", x: 1035, y: 266 }, { id: "brass_lift", x: 1100, y: 297 },
    { id: "understreet_lift", x: 1035, y: 340 }, { id: "fifth_quarter_assembly", x: 1100, y: 382 },
    { id: "retention_gate", x: 1185, y: 42 }, { id: "waterkeepers_court", x: 1250, y: 74 },
    { id: "tally_weighbridge", x: 1185, y: 110 }, { id: "brass_garden", x: 1250, y: 142 },
    { id: "names_reservoir", x: 1185, y: 180 }, { id: "storm_registry", x: 1250, y: 214 },
    { id: "pledge_chamber", x: 1185, y: 252 }, { id: "relief_quay", x: 1250, y: 286 },
    { id: "rain_chain", x: 1185, y: 324 }, { id: "breakwater_chapel", x: 1250, y: 356 },
    { id: "overflow_gallery", x: 1185, y: 394 },
    { id: "dawn_portal", x: 1340, y: 42 }, { id: "bellkeepers_yard", x: 1405, y: 74 },
    { id: "cracked_chime_gallery", x: 1340, y: 108 }, { id: "dawn_market", x: 1405, y: 140 },
    { id: "courier_roof", x: 1340, y: 174 }, { id: "relay_conservatory", x: 1405, y: 206 },
    { id: "voices_cistern", x: 1340, y: 240 }, { id: "blue_window_workshop", x: 1405, y: 272 },
    { id: "civic_tribune", x: 1340, y: 306 }, { id: "message_bridge", x: 1405, y: 336 },
    { id: "unheard_stairs", x: 1340, y: 370 }, { id: "first_light_chamber", x: 1405, y: 398 },
    { id: "makers_gate", x: 1495, y: 42 }, { id: "tool_court", x: 1560, y: 72 },
    { id: "chain_foundry", x: 1495, y: 102 }, { id: "bellows_loft", x: 1560, y: 132 },
    { id: "waterwright_archive", x: 1495, y: 164 }, { id: "guild_kitchen", x: 1560, y: 194 },
    { id: "apprentice_dormitory", x: 1495, y: 226 }, { id: "clay_map_room", x: 1560, y: 256 },
    { id: "underforge", x: 1495, y: 288 }, { id: "handspan_bridge", x: 1560, y: 318 },
    { id: "confluence_shaft", x: 1495, y: 350 }, { id: "worksong_chapel", x: 1560, y: 380 },
    { id: "embassy_court", x: 1665, y: 42 }, { id: "interpreter_lodge", x: 1730, y: 74 },
    { id: "pledge_balcony", x: 1665, y: 110 }, { id: "sealed_larder", x: 1730, y: 144 },
    { id: "guest_cells", x: 1665, y: 180 }, { id: "treaty_archive", x: 1730, y: 214 },
    { id: "quay_of_envoys", x: 1665, y: 250 }, { id: "shadow_post", x: 1730, y: 286 },
    { id: "ending_vire_covenant", x: 150, y: 450 }, { id: "ending_workers_open", x: 330, y: 450 },
    { id: "ending_lantern_network", x: 510, y: 450 }, { id: "ending_civic_warrant", x: 690, y: 450 },
    { id: "ending_courier_truth", x: 870, y: 450 }, { id: "ending_common_signal", x: 1050, y: 450 },
    { id: "ending_many_hands", x: 1230, y: 450 }, { id: "ending_guarded_archive", x: 1410, y: 450 },
    { id: "ending_broken_compact", x: 1530, y: 500 }, { id: "ending_exile_passage", x: 1710, y: 500 },
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
  {
    id: "gate-secured-not-finished", priority: 26,
    requires: { all: [{ path: "state.flags.disabledSabotage", equals: true }, { path: "state.flags.disarmedShields", equals: false }] },
    when: { scene: ["gate_chamber", "shield_terrace", "city_steps"] },
    text: l("Le coin ne menace plus le gond, mais vous connaissez désormais la différence entre empêcher un effondrement et empêcher une inondation. Les boucliers restent le dernier geste du piège.", "The wedge no longer threatens the hinge, but you now know the difference between preventing a collapse and preventing a flood. The shields remain the trap's final gesture."),
  },
  {
    id: "threat-resolved", priority: 24,
    requires: { path: "state.flags.disarmedShields", equals: true },
    when: { scene: ["gate_chamber", "shield_terrace", "city_steps", "public_reckoning"] },
    text: l("Les mécanismes ont cessé d'obéir au complot. L'urgence a changé de forme : il ne s'agit plus de survivre à la vague, mais de décider quelle vérité survivra avec la ville.", "The mechanisms have stopped obeying the conspiracy. The urgency has changed shape: it is no longer about surviving the wave, but deciding what truth will survive with the city."),
  },
  {
    id: "neris-returns", priority: 13,
    requires: { path: "state.flags.metNeris", equals: true },
    when: { scene: ["city_steps", "public_reckoning"] },
    text: l("Néris est venue sans qu'on le lui demande, guidée par le vacarme et les voix. Sa carte des ruelles montre au sergent quels quartiers auraient reçu la vague; pour la première fois, le danger a une géographie que tous peuvent comprendre.", "Neris came without being asked, guided by the uproar and the voices. Her map of the lanes shows the sergeant which wards would have received the wave; for the first time, the danger has a geography everyone can understand."),
  },
  {
    id: "ysilde-returns", priority: 12,
    requires: { path: "state.flags.metYsilde", equals: true },
    when: { scene: ["lantern_hospice", "canal_infirmary", "city_steps", "public_reckoning"] },
    text: l("Ysilde et les sœurs ont déjà préparé des brancards, puis les ont laissés contre le mur. Leur présence ne promet pas l'absence de pertes; elle affirme seulement que personne ne sera abandonné hors du récit.", "Ysilde and the sisters have already prepared stretchers, then left them against the wall. Their presence promises no absence of loss; it only insists that no one will be abandoned outside the story."),
  },
  {
    id: "maelin-returns", priority: 11,
    requires: { path: "state.flags.metMaelin", equals: true },
    when: { scene: ["bell_foundry", "signal_gallery", "city_steps", "public_reckoning"] },
    text: l("Maëlin a fermé ses fours plutôt que de laisser le réseau emprunter encore son savoir. Elle ne se dit pas courageuse; elle demande seulement que ses apprentis puissent continuer à fabriquer des objets qui n'ordonnent rien à personne.", "Maelin shut her furnaces rather than let the network borrow her craft again. She does not call herself brave; she only asks that her apprentices may keep making objects that command no one."),
  },
  {
    id: "sava-returns", priority: 17,
    requires: { path: "state.flags.metSava", equals: true },
    when: { scene: ["votive_roof", "river_shrine", "festival_arcade"] },
    text: l("Entre les rubans et les prières, vous reconnaissez le travail silencieux de Sava : elle recueille les noms que la ville laisse tomber. Cette attention fragile devient une piste, presque une méthode.", "Among ribbons and prayers, you recognize Sava's quiet work: she gathers the names the city lets fall. That fragile attention becomes a lead, almost a method."),
  },
  {
    id: "ilyra-returns", priority: 19,
    requires: { path: "state.flags.metIlyra", equals: true },
    when: { scene: ["mirror_archive", "archive_cloister", "hidden_scriptorium", "tribunal_gallery"] },
    text: l("Les marges, les contre-signatures et les blancs ne paraissent plus innocents. Ilyra vous a appris que l'archive parle autant par ce qu'elle retire que par ce qu'elle conserve.", "Margins, countersignatures, and blanks no longer look innocent. Ilyra has taught you that an archive speaks as much through what it removes as through what it preserves."),
  },
  {
    id: "kos-returns", priority: 16,
    requires: { path: "state.flags.metKos", equals: true },
    when: { scene: ["moonwell_grotto", "echo_well", "water_chapel", "gallery_procession"] },
    text: l("À chaque vibration de pierre ou de coque, vous pensez au cinquième nom de Kos. Il ne promettait pas de dominer l'eau, seulement d'empêcher quelqu'un de la livrer à une cible.", "At every tremor of stone or hull, you think of Kos's fifth name. It promised not to master water, only to stop someone from delivering it to a target."),
  },
  {
    id: "noma-returns", priority: 15,
    requires: { path: "state.flags.metNoma", equals: true },
    when: { scene: ["wicker_docks", "black_lantern_pier", "undersluice_dock", "ropewalk"] },
    text: l("Les paniers de Noma ont changé votre regard sur les cargaisons : chacune peut être une preuve, une cachette ou une lettre que quelqu'un espère encore voir arriver.", "Noma's baskets have changed how you see cargo: each can be evidence, a hiding place, or a letter someone still hopes to see arrive."),
  },
  {
    id: "orthe-returns", priority: 13,
    requires: { path: "state.flags.metOrthe", equals: true },
    when: { scene: ["veil_theatre", "mask_exchange", "embassy_vestry", "council_antechamber"] },
    text: l("Les voix officielles ont désormais une couture visible. Orthe vous a appris à entendre, derrière une formule parfaite, la personne qui a peur de la prononcer.", "Official voices now have a visible seam. Orthe has taught you to hear, behind a perfect formula, the person afraid to speak it."),
  },
  {
    id: "theska-returns", priority: 21,
    requires: { path: "state.flags.metTheska", equals: true },
    when: { scene: ["tide_ossuary", "drowned_oratory", "water_chapel", "shield_terrace"] },
    text: l("Theska a refusé que les morts deviennent un argument abstrait. Les quartiers menacés reprennent un poids précis : des maisons, des absents, des noms inscrits dans le limon.", "Theska refused to let the dead become an abstract argument. The threatened districts regain a precise weight: homes, absences, names written in silt."),
  },
  {
    id: "nival-returns", priority: 15,
    requires: { path: "state.flags.metNival", equals: true },
    when: { scene: ["copper_aviary", "rooftop_cistern", "ember_observatory", "city_steps"] },
    text: l("Les martinets de Nival passent au-dessus de vous comme des phrases qu'on ne peut plus retenir. Leur trajet vous rappelle que l'alerte commence toujours quelque part — et qu'on peut choisir de l'y laisser mourir.", "Nival's swifts pass above you like sentences that can no longer be held back. Their route reminds you that warning always begins somewhere—and can be chosen to die there."),
  },
  {
    id: "rissa-darel-returns", priority: 20,
    requires: { any: [{ path: "state.flags.metRissa", equals: true }, { path: "state.flags.metDarel", equals: true }] },
    when: { scene: ["house_of_measures", "brass_reliquary", "river_shrine", "tribunal_gallery", "council_antechamber"] },
    text: l("Entre les poids de Rissa et le disque de Darel, le passé cesse d'être une légende commode. Quelqu'un a traduit une obligation envers les personnes menacées en droit de les classer.", "Between Rissa's weights and Darel's disc, the past stops being a convenient legend. Someone translated an obligation toward the threatened into a right to classify them."),
  },
  {
    id: "maera-oren-returns", priority: 18,
    requires: { any: [{ path: "state.flags.metMaera", equals: true }, { path: "state.flags.metOren", equals: true }] },
    when: { scene: ["exile_courtyard", "drowned_mailroom", "wicker_docks", "black_lantern_pier", "moss_orchard"] },
    text: l("Les clés de Maëra et les lettres d'Oren rendent aux quartiers bas une mémoire matérielle. Vous ne poursuivez plus seulement un sabotage : vous portez des voix que l'organisation de la ville avait séparées.", "Maera's keys and Oren's letters restore a material memory to the lower wards. You are no longer only pursuing sabotage: you carry voices the city's organization had separated."),
  },
  {
    id: "siren-returns", priority: 16,
    requires: { path: "state.flags.metSiren", equals: true },
    when: { scene: ["silt_observatory", "tide_garden", "water_chapel", "signal_gallery", "shield_terrace"] },
    text: l("Siren vous a appris à lire le limon comme un registre sans mensonge. La rivière ne demande pas quel quartier mérite l'eau; cette question appartient entièrement aux personnes qui dirigent les vannes.", "Siren taught you to read silt as a ledger without lies. The river does not ask which ward deserves water; that question belongs entirely to those directing the sluices."),
  },
  {
    id: "rite-restored-context", priority: 27,
    requires: { all: [{ path: "state.clues", includes: "fifth_name" }, { path: "state.clues", includes: "brass_concord" }] },
    when: { scene: ["gallery_procession", "water_chapel", "rite_broken", "gate_chamber", "shield_terrace"] },
    text: l("Eshra et le Concordat donnent enfin au rite toute sa cohérence : ce qui devait empêcher le pouvoir de choisir une cible a été converti en procédure pour rendre ce choix acceptable. Inverser le rite, c'est aussi défaire cette traduction.", "Eshra and the Concord finally give the rite its full coherence: what was meant to stop power from choosing a target was converted into procedure to make that choice acceptable. Reversing the rite also undoes that translation."),
  },
  {
    id: "warning-system-context", priority: 25,
    requires: { all: [{ path: "state.clues", includes: "unseen_bell" }, { any: [{ path: "state.clues", includes: "flood_schedule" }, { path: "state.clues", includes: "water_rite" }] }] },
    when: { scene: ["signal_bell", "signal_gallery", "ember_observatory", "gate_chamber", "shield_terrace"] },
    text: l("Vous voyez maintenant la chaîne entière : verre, martinets, cloche, anneaux. Le réseau n'a pas créé une vague à partir de rien; il s'est greffé sur une alerte ancienne dont certains quartiers avaient déjà été exclus.", "You now see the whole chain: glass, swifts, bell, rings. The network did not create a wave from nothing; it grafted itself onto an old warning system from which some wards had already been excluded."),
  },
  {
    id: "witnesses-and-exiles", priority: 23,
    requires: { all: [{ path: "state.flags.freedCaptives", equals: true }, { path: "state.clues", includes: "first_exiles" }] },
    when: { scene: ["city_steps", "public_reckoning", "ending_dawn", "ending_silent"] },
    text: l("Les voyageurs sauvés et les familles déplacées se répondent à travers les années : les uns peuvent dire ce qui se prépare, les autres ce qui s'est déjà produit. Ensemble, ils empêchent que l'affaire soit réduite à une anomalie technique.", "The rescued travellers and displaced families answer each other across the years: some can say what is being prepared, the others what already happened. Together, they prevent the case from being reduced to a technical anomaly."),
  },
  {
    id: "yorra-defects", priority: 22,
    requires: { path: "state.flags.yorraDefected", equals: true },
    when: { scene: ["courier_locker", "black_lantern_pier", "ropewalk", "council_antechamber", "public_reckoning"] },
    text: l("Yorra ne porte plus les messages du réseau : elle les dévie, les retarde ou les remet entre des mains qui sauront les lire. Sa peur n'a pas disparu; elle a simplement cessé de décider seule de ses gestes.", "Yorra no longer carries the network's messages: she diverts, delays, or places them in hands that will know how to read them. Her fear has not vanished; it has simply stopped deciding her actions alone."),
  },
  {
    id: "othran-commits", priority: 24,
    requires: { path: "state.flags.othranCommitted", equals: true },
    when: { scene: ["city_steps", "tribunal_gallery", "council_antechamber", "public_reckoning"] },
    text: l("Le sergent Othran ne se contente plus de contenir la foule. Il place ses gardes là où les preuves risquent d'être saisies, et apprend à ses hommes qu'obéir à un sceau n'est pas toujours servir la ville.", "Sergeant Othran no longer merely contains the crowd. He posts guards where evidence might be seized, and teaches his people that obeying a seal is not always serving the city."),
  },
  {
    id: "hara-organizes-care", priority: 20,
    requires: { path: "state.flags.haraNetwork", equals: true },
    when: { scene: ["lantern_hospice", "canal_infirmary", "city_steps", "public_reckoning", "ending_dawn", "ending_silent"] },
    text: l("Hara a transformé les réserves de l'hospice en réseau de soins : eau chaude, bandages, portes ouvertes et noms notés. Elle prépare la ville à accueillir les blessés avant même de savoir qui aura le droit de les compter.", "Hara has turned the hospice stores into a care network: warm water, bandages, open doors, and names written down. She prepares the city to receive the wounded before knowing who will be allowed to count them."),
  },
  {
    id: "vire-speaks", priority: 26,
    requires: { path: "state.flags.vireAssembly", equals: true },
    when: { scene: ["city_steps", "council_antechamber", "tribunal_gallery", "public_reckoning", "ending_dawn"] },
    text: l("Les délégués de Vire-Basse ne suivent pas votre groupe comme des témoins dociles. Ils vérifient les formulations, corrigent les raccourcis et refusent que leur histoire serve à blanchir une autre autorité.", "Low Vire's delegates do not follow your party as compliant witnesses. They check formulations, correct shortcuts, and refuse to let their story be used to absolve another authority."),
  },
  {
    id: "public-witnesses-context", priority: 31,
    requires: { path: "state.dilemmas.witnesses", equals: "public" },
    when: { scene: ["city_steps", "council_antechamber", "public_reckoning", ...RESOLVED_ENDING_SCENES] },
    text: l("Les noms de Vire-Basse sont maintenant connus de la foule. Leur force protège l'affaire contre le déni, mais chaque délégué mesure les regards qui s'attardent un peu trop longtemps.", "Low Vire's names are now known to the crowd. Their force protects the case from denial, but every delegate feels looks lingering a little too long."),
  },
  {
    id: "protected-witnesses-context", priority: 31,
    requires: { path: "state.dilemmas.witnesses", equals: "protected" },
    when: { scene: ["witness_kitchen", "council_antechamber", "public_reckoning", ...RESOLVED_ENDING_SCENES] },
    text: l("Les listes de Vire-Basse circulent par fragments, confiées à celles et ceux qu'elles nomment. Votre dossier est moins spectaculaire, mais aucune autorité ne peut plus confondre une preuve avec le droit de posséder les personnes qu'elle décrit.", "Low Vire's lists travel in fragments, entrusted to those they name. Your case is less spectacular, but no authority can now confuse evidence with a right to possess the people it describes."),
  },
  {
    id: "open-signal-context", priority: 30,
    requires: { path: "state.dilemmas.signal", equals: "open" },
    when: { scene: ["signal_gallery", "city_steps", "public_reckoning", ...RESOLVED_ENDING_SCENES] },
    text: l("Le signal ouvert se reflète déjà dans des fenêtres que vous ne connaissez pas. Il attire l'attention du réseau, mais retire à celui-ci le privilège de décider qui peut entendre le danger.", "The open signal already reflects in windows you do not know. It draws the network's attention, but takes from it the privilege of deciding who may hear danger."),
  },
  {
    id: "collective-gates-context", priority: 30,
    requires: { path: "state.dilemmas.gates", equals: "collective" },
    when: { scene: ["gate_chamber", "shield_terrace", "public_reckoning", ...RESOLVED_ENDING_SCENES] },
    text: l("Les portes ne répondent plus à une seule voix. Les équipes, les bateliers et les quartiers menacés ont des signes convenus pour arrêter la manœuvre; c'est plus lent, mais personne ne peut désormais prétendre que l'ordre est tombé du ciel.", "The gates no longer answer one voice. Crews, boatmen, and threatened wards have agreed signals to halt the manoeuvre; it is slower, but no one can now claim the order fell from the sky."),
  },
  {
    id: "compact-exposed-context", priority: 33,
    requires: { path: "state.dilemmas.embassy", equals: "expose" },
    when: { scene: ["embassy_court", "quay_of_envoys", "city_steps", "council_antechamber", "public_reckoning", ...RESOLVED_ENDING_SCENES] },
    text: l("Depuis la lecture du traité, les mots garantie et secours ont changé de poids. Les maisons marchandes doivent répondre à des phrases qu'elles pensaient pouvoir laisser dormir dans leurs archives, et les familles apprennent à regarder autour d'elles avant de donner leur nom.", "Since the treaty was read, the words guarantee and relief carry a different weight. Merchant houses must answer for phrases they thought could sleep in their archives, and families learn to look around before giving their names."),
  },
  {
    id: "family-passage-context", priority: 33,
    requires: { path: "state.dilemmas.embassy", equals: "passage" },
    when: { scene: ["guest_cells", "quay_of_envoys", "shadow_post", "city_steps", "public_reckoning", ...RESOLVED_ENDING_SCENES] },
    text: l("Des départs ont eu lieu avant que les sceaux se referment. On ne les annonce pas : une chaise vide, une valise manquante et un mot laissé sous une tasse disent assez ce que les barques ont sauvé — et ce que leur silence a coûté.", "Departures happened before the seals closed. No one announces them: an empty chair, a missing case, and a note beneath a cup say enough of what the boats saved—and what their silence cost."),
  },
  {
    id: "aldren-last-light", priority: 45,
    requires: { path: "state.flags.aldrenSacrifice", equals: true },
    when: { scene: RESOLVED_ENDING_SCENES },
    text: l("Aldren est resté sous la coupole jusqu'à ce que les fenêtres bleues se répondent. Son nom est prononcé sans transformer son geste en excuse : il a choisi, et les autres devront vivre avec ce qu'il a rendu possible.", "Aldren remained beneath the dome until blue windows answered one another. His name is spoken without turning his act into an excuse: he chose, and the others must live with what he made possible."),
  },
  {
    id: "bashkar-last-watch", priority: 45,
    requires: { path: "state.flags.bashkarSacrifice", equals: true },
    when: { scene: RESOLVED_ENDING_SCENES },
    text: l("Bashkar a tenu la herse lorsque les derniers contrepoids ont cédé. Dans les ateliers, on ne raconte pas qu'il a vaincu la machine : on raconte qu'il a refusé de lui laisser choisir une dernière victime.", "Bashkar held the portcullis when the last counterweights gave way. In the workshops, no one says he defeated the machine: they say he refused to let it choose one final victim."),
  },
  {
    id: "odran-last-passage", priority: 45,
    requires: { path: "state.flags.odranSacrifice", equals: true },
    when: { scene: RESOLVED_ENDING_SCENES },
    text: l("Odran est resté sur le quai jusqu'au départ de la dernière barque. Hara garde sa place vide dans le registre des soins, non pour la refermer, mais pour rappeler que chaque évacuation a un visage.", "Odran stayed on the quay until the last boat departed. Hara keeps his empty place in the care register, not to close it, but to recall that every evacuation has a face."),
  },
  {
    id: "eryndor-last-route", priority: 45,
    requires: { path: "state.flags.eryndorSacrifice", equals: true },
    when: { scene: RESOLVED_ENDING_SCENES },
    text: l("Eryndor a emporté les noms par la dernière route sûre. Les copies arrivent séparément, dans des mains différentes; son absence devient la raison pour laquelle aucune arrestation ne peut les faire disparaître toutes.", "Eryndor carried the names along the last safe route. Copies arrive separately, in different hands; his absence becomes why no arrest can make them all disappear."),
  },
  {
    id: "yorra-last-route", priority: 44,
    requires: { path: "state.flags.yorraFallen", equals: true },
    when: { scene: RESOLVED_ENDING_SCENES },
    text: l("Yorra a coupé la dernière chaîne de courrier au moment où le réseau tentait de la refermer sur elle. Les coursiers n'emploient pas le mot martyre; ils parlent d'une route qui ne pourra plus être achetée.", "Yorra cut the final courier chain as the network tried to close it around her. Couriers do not use the word martyr; they speak of a route that can no longer be bought."),
  },
  {
    id: "othran-last-guard", priority: 44,
    requires: { path: "state.flags.othranFallen", equals: true },
    when: { scene: RESOLVED_ENDING_SCENES },
    text: l("Othran a tenu les marches assez longtemps pour que les témoins passent. La garde garde désormais son mandat de protection affiché à l'endroit même où il est tombé.", "Othran held the steps long enough for witnesses to pass. The guard now keeps his protective warrant displayed where he fell."),
  },
  {
    id: "roul-last-forge", priority: 44,
    requires: { path: "state.flags.roulFallen", equals: true },
    when: { scene: RESOLVED_ENDING_SCENES },
    text: l("Roul a scellé la forge pour que plus aucun ordre falsifié ne sorte de son feu. Nyma garde ses outils, non comme des reliques, mais comme l'obligation de vérifier chaque signature à venir.", "Roul sealed the forge so no forged order could leave its fire again. Nyma keeps his tools, not as relics, but as an obligation to check every signature to come."),
  },
  {
    id: "public-memory-ending", priority: 40,
    requires: { all: [{ path: "state.flags.publicRecord", equals: true }, { path: "state.clues", includes: "brass_concord" }, { path: "state.clues", includes: "first_exiles" }] },
    when: { scene: "ending_dawn" },
    text: l("Le dossier public ne s'arrête pas aux mercenaires de Valdrick. Les lettres, les clés et le Concordat obligent le Conseil à rouvrir le nom de Vire-Basse. La justice reste lente et contestée, mais la ville ne peut plus faire passer son ancienne règle pour une fatalité de la rivière.", "The public case does not stop with Valdrick's mercenaries. Letters, keys, and the Concord force the Council to reopen the name of Low Vire. Justice remains slow and contested, but the city can no longer pass its old rule off as the river's fate."),
  },
  {
    id: "kept-memory-ending", priority: 40,
    requires: { all: [{ path: "state.flags.keptArchive", equals: true }, { any: [{ path: "state.clues", includes: "brass_concord" }, { path: "state.clues", includes: "first_exiles" }, { path: "state.clues", includes: "unseen_bell" }] }] },
    when: { scene: "ending_silent" },
    text: l("Vous ne livrez pas encore toute l'histoire à la ville, mais elle ne disparaît pas avec le tumulte. Ilyra, Sava, Oren et les autres conservent des copies dans des mains différentes. Le silence est un choix de survie, pas une seconde disparition.", "You do not yet give the whole story to the city, but it does not vanish in the tumult. Ilyra, Sava, Oren, and the others keep copies in different hands. Silence is a choice of survival, not a second disappearance."),
  },
];

// A campaign conclusion is only available after both the immediate danger and
// the mechanism behind it are understood. Outcomes may then differ according
// to the communities the player chose to involve.
const RESOLVED_CAMPAIGN_REQUIRES = {
  all: [
    { path: "state.flags.disabledSabotage", equals: true },
    { path: "state.flags.disarmedShields", equals: true },
    { any: [{ path: "state.flags.freedCaptives", equals: true }, { path: "state.clues", includes: "valdrick_manifest" }, { path: "state.clues", includes: "council_ledger" }] },
    { any: [{ path: "state.clues", includes: "water_rite" }, { path: "state.clues", includes: "flood_schedule" }, { path: "state.clues", includes: "old_flood_map" }] },
  ],
};

const CORE_CHOICES = {
  river_gate: [
    { id: "meet-geyma", label: l("Écouter Dame Geyma jusqu'au bout", "Hear Lady Geyma out"), effects: [{ op: "set", path: "flags.metGeyma", value: true }, { op: "set", path: "flags.readNotice", value: true }, { op: "increment", path: "relationships.geyma", value: 2 }], result: { text: l("Geyma vous raconte la disparition de Poupiquet, puis s'interrompt devant le vacarme des portes. « Si vous descendez, ne croyez personne qui porte un tablier trop propre. » Elle ne vous demande pas de promesse; elle vous regarde pour voir si vous en faites une quand même.", "Geyma tells you of Poupiquet's disappearance, then stops at the roar of the gates. “If you go down, trust no one wearing an apron that is too clean.” She does not ask for a promise; she watches to see whether you make one anyway.") } },
    { id: "read-notice", label: l("Lire l'avis de recherche ligne par ligne", "Read the missing notice line by line"), effects: [{ op: "set", path: "flags.readNotice", value: true }], result: { text: l("L'encre a bavé sous l'humidité, sauf autour du dessin de Kiki. Une annotation récente, presque invisible, ajoute : « le chien a suivi l'homme aux bottes blanches ». La piste ne commence pas sous terre : elle commence parmi les ouvriers.", "The ink has run in the damp, except around Kiki's drawing. A recent, almost invisible note adds: “the dog followed the man in white boots.” The trail does not begin underground: it begins among the workers.") } },
    { id: "descend-river", label: l("Descendre dans le lit asséché", "Descend into the dry riverbed"), to: "dry_bed" },
  ],
  dry_bed: [
    { id: "visit-workers", label: l("Approcher les ouvriers et leurs boucliers", "Approach the workers and their shields"), effects: [{ op: "set", path: "flags.metEdras", value: true }], to: "workers_bank" },
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
    { id: "press-lie", label: l("Relever l'incohérence de l'histoire d'Edras", "Point out the flaw in Edras's story"), effects: [{ op: "set", path: "flags.exposedWorkers", value: true }, { op: "addUnique", path: "clues", value: "shield_symbols" }, { op: "increment", path: "relationships.foreman", value: -2 }, { op: "increment", path: "expedition.alert", value: 1 }, { op: "increment", path: "expedition.morale", value: 1 }], to: "maintenance_map" },
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
    { id: "free-poupiquet", label: l("Passer la corde dans la rainure et tirer", "Thread the rope through the groove and pull"), effects: [{ op: "set", path: "flags.freedPoupiquet", value: true }, { op: "increment", path: "relationships.poupiquet", value: 2 }, { op: "increment", path: "expedition.fatigue", value: 2 }, { op: "increment", path: "expedition.wounds", value: 1 }, { op: "set", path: "heroConditions.bashkar", value: "hurt" }, { op: "increment", path: "expedition.morale", value: 2 }], to: "poupiquet_free" },
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
    { id: "present-proof", label: l("Porter une première alerte à la surface", "Carry an initial warning to the surface"), to: "city_steps" },
    { id: "disarm-shields", label: l("Désamorcer les boucliers grâce au rite", "Disarm the shields through the rite"), requires: { all: [{ path: "state.flags.understoodRite", equals: true }, { path: "state.flags.disabledSabotage", equals: true }] }, effects: [{ op: "set", path: "flags.disarmedShields", value: true }, { op: "increment", path: "expedition.fatigue", value: 1 }, { op: "increment", path: "expedition.morale", value: 1 }], result: { text: l("Vous ne cassez aucun bouclier. Vous inversez leur geste : la rose de métal cesse de choisir une cible et laisse la pression se répartir dans le lit ancien du fleuve.", "You break no shield. You reverse their gesture: the metal rose stops choosing a target and lets pressure spread through the river's old bed.") }, to: "public_reckoning" },
  ],
  city_steps: [
    { id: "call-guard", label: l("Mettre un dossier cohérent entre les mains du sergent", "Place a coherent case in the sergeant's hands"), requires: { all: [{ path: "state.flags.disarmedShields", equals: true }, { any: [{ path: "state.flags.freedCaptives", equals: true }, { path: "state.clues", includes: "valdrick_manifest" }, { path: "state.clues", includes: "council_ledger" }] }] }, to: "public_reckoning" },
    { id: "return-gates", label: l("Redescendre finir de neutraliser les boucliers", "Descend to finish neutralising the shields"), requires: { path: "state.flags.disabledSabotage", equals: true }, to: "shield_terrace" },
  ],
  public_reckoning: [
    { id: "save-city", label: l("Faire arrêter les saboteurs et exposer le réseau", "Have the saboteurs arrested and expose the network"), requires: RESOLVED_CAMPAIGN_REQUIRES, effects: [{ op: "set", path: "flags.publicRecord", value: true }, { op: "set", path: "flags.campaignResolved", value: true }], to: "ending_dawn" },
    { id: "save-quietly", label: l("Choisir le salut discret avant l'aube", "Choose quiet salvation before dawn"), requires: RESOLVED_CAMPAIGN_REQUIRES, effects: [{ op: "set", path: "flags.keptArchive", value: true }, { op: "set", path: "flags.campaignResolved", value: true }], to: "ending_silent" },
  ],
};

// Cross-links deliberately turn the campaign into a dense directed graph.
// They remain campaign data: the engine applies the same availability,
// history, map, condition and consequence rules to every one of them.
const WEB_CHOICES = {
  river_gate: [
    { id: "gate-to-customs", label: l("Suivre un commis inquiet jusqu'aux douanes", "Follow an anxious clerk to the customs house"), to: "old_customs" },
    { id: "gate-to-city", label: l("Monter vers les marches de la ville", "Climb to the city steps"), to: "city_steps" },
    { id: "gate-to-moonfish", label: l("Chercher les bateliers au Poisson-Lune", "Seek the boatmen at the Moonfish"), to: "moonfish_tavern" },
  ],
  festival_arcade: [
    { id: "arcade-to-paper-bridge", label: l("Suivre les vendeurs de papiers votifs jusqu'au pont", "Follow votive-paper sellers to the bridge"), to: "paper_bridge" },
    { id: "arcade-to-salt", label: l("Éviter la foule par le marché du sel bleu", "Avoid the crowd through the blue-salt market"), to: "salt_market" },
    { id: "arcade-to-city", label: l("Prendre l'escalier des terrasses vers la garde", "Take the terrace stair to the guard"), to: "city_steps" },
  ],
  secret_map_stall: [
    { id: "map-to-well", label: l("Tester sur le terrain le tracé du puits", "Test the well route shown on the map"), to: "echo_well" },
    { id: "map-to-seals", label: l("Rechercher la matrice indiquée sur le plan", "Seek the die marked on the map"), to: "seal_vault" },
    { id: "map-back-arcade", label: l("Rejoindre les lanternes avant que la cartographe parte", "Return to the lanterns before the cartographer leaves"), to: "festival_arcade" },
  ],
  canal_steps: [
    { id: "steps-to-salt", label: l("Remonter par les étals de sel", "Climb through the salt stalls"), to: "salt_market" },
    { id: "steps-to-post", label: l("Prendre la venelle qui mène au relais noyé", "Take the lane to the drowned post"), to: "drowned_post" },
    { id: "steps-to-city", label: l("Suivre les maisons hautes vers la garde", "Follow the tall houses to the guard"), to: "city_steps" },
  ],
  dry_bed: [
    { id: "dry-bed-to-baths", label: l("Passer sous les briques vers les bains effondrés", "Pass beneath the bricks to the collapsed baths"), to: "collapsed_baths" },
    { id: "dry-bed-to-dock", label: l("Longer les arches jusqu'au quai sous les vannes", "Follow the arches to the undersluice dock"), to: "undersluice_dock" },
    { id: "dry-bed-to-orchard", label: l("Suivre les racines noires vers le verger", "Follow black roots to the orchard"), to: "moss_orchard" },
  ],
  workers_bank: [
    { id: "workers-to-customs", label: l("Suivre une caisse sortie du chantier", "Follow a crate leaving the worksite"), effects: [{ op: "increment", path: "expedition.alert", value: 1 }], to: "old_customs" },
    { id: "workers-to-silt", label: l("Vous fondre dans la boue vers les jalons", "Melt into the mud toward the gauges"), to: "silt_archive" },
    { id: "workers-to-bridge", label: l("Contourner les ouvriers par le pont de papier", "Circle the workers by the paper bridge"), to: "paper_bridge" },
  ],
  narrow_fissure: [
    { id: "fissure-to-well", label: l("Suivre un filet d'air jusqu'au puits des échos", "Follow a draught to the echo well"), to: "echo_well" },
    { id: "fissure-to-silt", label: l("Reprendre pied près des archives de limon", "Regain footing near the silt archive"), to: "silt_archive" },
    { id: "fissure-to-baths", label: l("Ramper vers le bassin des bains", "Crawl toward the baths' basin"), effects: [{ op: "increment", path: "expedition.fatigue", value: 1 }], to: "collapsed_baths" },
  ],
  flooded_tunnel: [
    { id: "tunnel-to-dock", label: l("Suivre les amarres jusqu'au quai de service", "Follow the moorings to the service dock"), to: "undersluice_dock" },
    { id: "tunnel-to-gallery", label: l("Chercher les glyphes par la galerie Utruz", "Seek the glyphs through the Utruz gallery"), to: "gallery_procession" },
    { id: "tunnel-to-barge", label: l("Gagner la barge par la corniche basse", "Reach the barge by the low ledge"), to: "barge_hold" },
  ],
  lantern_landing: [
    { id: "landing-to-chapel", label: l("Suivre les serpents d'eau vers la chapelle", "Follow the water serpents to the chapel"), to: "water_chapel" },
    { id: "landing-to-well", label: l("Remonter par le boyau qui rejoint le puits", "Climb through the crawlspace to the well"), to: "echo_well" },
    { id: "landing-to-aqueduct", label: l("Prendre la corniche vers l'aqueduc oublié", "Take the ledge to the forgotten aqueduct"), to: "aqueduct_gallery" },
  ],
  city_steps: [
    { id: "city-to-salt", label: l("Descendre écouter les pêcheuses du marché", "Descend to hear the market fishers"), to: "salt_market" },
    { id: "city-to-festival", label: l("Traverser la fête par la galerie des lanternes", "Cross the festival through the lantern arcade"), to: "festival_arcade" },
    { id: "city-to-tribunal", label: l("Emprunter la coursive des magistrats", "Use the magistrates' gallery"), to: "tribunal_gallery" },
    { id: "city-to-watch", label: l("Grimper jusqu'à la plateforme des veilleurs", "Climb to the watchers' platform"), to: "watch_platform" },
  ],
  gate_chamber: [
    { id: "gates-to-underbridge", label: l("Suivre les vibrations jusqu'à la vanne sous le pont", "Follow the vibrations to the underbridge sluice"), to: "underbridge_sluice" },
    { id: "gates-to-canal", label: l("Sortir par le conduit vers les marches du canal", "Exit through the conduit to the canal steps"), to: "canal_steps" },
    { id: "gates-to-silt", label: l("Remonter par le déversoir vers les jalons", "Climb the spillway toward the gauges"), to: "silt_archive" },
    { id: "gates-to-observatory", label: l("Gagner l'observatoire pour lire les pressions", "Reach the observatory to read the pressures"), to: "ember_observatory" },
  ],
  salt_market: [
    { id: "salt-to-arcade", label: l("Rejoindre les lanternes par les étals de rubans", "Reach the lanterns through the ribbon stalls"), to: "festival_arcade" },
    { id: "salt-to-canal", label: l("Suivre un porteur d'eau jusqu'aux marches", "Follow a water-carrier to the canal steps"), to: "canal_steps" },
    { id: "salt-to-city", label: l("Monter livrer les rumeurs à la garde", "Climb to deliver the rumours to the guard"), to: "city_steps" },
  ],
  ropewalk: [
    { id: "ropewalk-to-cistern", label: l("Suivre les cordes jusqu'à la citerne des toits", "Follow the ropes to the rooftop cistern"), to: "rooftop_cistern" },
    { id: "ropewalk-to-embassy", label: l("Glisser vers la sacristie de l'ambassade", "Slip toward the embassy vestry"), effects: [{ op: "increment", path: "expedition.alert", value: 1 }], to: "embassy_vestry" },
  ],
  drowned_post: [
    { id: "post-to-canal", label: l("Rejoindre les marches par l'ancien quai postal", "Reach the steps by the old postal quay"), to: "canal_steps" },
    { id: "post-to-dock", label: l("Suivre le courrier mouillé jusqu'au quai sous les vannes", "Follow the wet mail to the undersluice dock"), to: "undersluice_dock" },
  ],
  tide_library: [
    { id: "library-to-customs", label: l("Remonter aux douanes avec les relevés", "Return to customs with the readings"), to: "old_customs" },
    { id: "library-to-archive", label: l("Comparer les rouleaux aux archives municipales", "Compare the rolls with the municipal archives"), to: "archive_cloister" },
  ],
  black_lantern_pier: [
    { id: "pier-to-shrine", label: l("Suivre les cierges flottants vers le sanctuaire", "Follow floating votives to the shrine"), to: "river_shrine" },
    { id: "pier-to-tunnel", label: l("Prendre la cale sombre vers le tunnel noyé", "Take the dark hold to the flooded tunnel"), to: "flooded_tunnel" },
  ],
  courier_locker: [
    { id: "locker-to-ropewalk", label: l("Reprendre le chemin des cordiers", "Return by the ropemakers' way"), to: "ropewalk" },
    { id: "locker-to-council", label: l("Emprunter la tournée secrète jusqu'à l'antichambre", "Take the secret route to the antechamber"), requires: { path: "state.clues", includes: "council_ledger" }, to: "council_antechamber" },
  ],
  underbridge_sluice: [
    { id: "underbridge-to-pier", label: l("Remonter par les piles jusqu'au quai noir", "Climb the piers to the black-lantern pier"), to: "black_lantern_pier" },
    { id: "underbridge-to-aqueduct", label: l("Revenir par la galerie de l'aqueduc", "Return through the aqueduct gallery"), to: "aqueduct_gallery" },
  ],
  signal_bell: [
    { id: "bell-to-chapel", label: l("Suivre le conduit de résonance jusqu'à la chapelle", "Follow the resonance conduit to the chapel"), to: "water_chapel" },
    { id: "bell-to-watch", label: l("Monter par l'échelle des veilleurs", "Climb the watchers' ladder"), to: "watch_platform" },
  ],
};

// Secondary locations are not dead ends. These authored links give each
// investigation, rescue and ritual scene several ways to rejoin the wider city.
const DENSE_WEB_CHOICES = {
  maintenance_map: [
    { id: "plan-to-workers", label: l("Revenir observer le chantier depuis les madriers", "Return to watch the worksite from the beams"), to: "workers_bank" },
    { id: "plan-to-silt", label: l("Comparer le plan aux jalons de limon", "Compare the plan with the silt gauges"), to: "silt_archive" },
    { id: "plan-to-sluice", label: l("Suivre la marge jusqu'au passage des vannes", "Follow the margin to the sluice passage"), to: "sluice_passage" },
    { id: "plan-to-customs", label: l("Porter les initiales de Poupiquet aux douanes", "Take Poupiquet's initials to customs"), to: "old_customs" },
  ],
  maintenance_crawl: [
    { id: "crawl-to-sluice", label: l("Sortir par l'embranchement des vannes", "Exit through the sluice junction"), to: "sluice_passage" },
    { id: "crawl-to-tunnel", label: l("Suivre le conduit humide jusqu'au tunnel noyé", "Follow the damp conduit to the flooded tunnel"), to: "flooded_tunnel" },
    { id: "crawl-to-silt", label: l("Revenir vers les jalons par le drain", "Return to the gauges through the drain"), to: "silt_archive" },
    { id: "crawl-to-counterweights", label: l("Grimper vers le grenier des contrepoids", "Climb toward the counterweight loft"), to: "counterweight_loft" },
  ],
  dog_scent: [
    { id: "scent-to-barge", label: l("Suivre l'odeur de résine jusqu'à la barge", "Follow the resin scent to the barge"), to: "barge_hold" },
    { id: "scent-to-well", label: l("Laisser Kiki retrouver le puits des échos", "Let Kiki find the echo well"), to: "echo_well" },
    { id: "scent-to-dock", label: l("Remonter les traces humides vers le quai", "Follow wet tracks up to the dock"), to: "undersluice_dock" },
    { id: "scent-to-shrine", label: l("Rentrer par le sanctuaire des rives", "Return by the riverside shrine"), to: "river_shrine" },
  ],
  witness_oath: [
    { id: "witnesses-to-city", label: l("Escorter les témoins jusqu'aux marches", "Escort the witnesses to the city steps"), to: "city_steps" },
    { id: "witnesses-to-moonfish", label: l("Cacher les voyageurs au Poisson-Lune", "Hide the travellers at the Moonfish"), to: "moonfish_tavern" },
    { id: "witnesses-to-dock", label: l("Les guider jusqu'au quai sous les vannes", "Guide them to the undersluice dock"), to: "undersluice_dock" },
    { id: "witnesses-to-council", label: l("Chercher une audience à l'antichambre", "Seek a hearing in the antechamber"), to: "council_antechamber" },
  ],
  poupiquet_free: [
    { id: "poupiquet-to-gallery", label: l("Laisser Poupiquet relire les glyphes", "Let Poupiquet reread the glyphs"), to: "gallery_procession" },
    { id: "poupiquet-to-gates", label: l("Suivre ses calculs jusqu'aux portes", "Follow his calculations to the gates"), to: "gate_chamber" },
    { id: "poupiquet-to-well", label: l("Prendre le raccourci du puits", "Take the well shortcut"), to: "echo_well" },
    { id: "poupiquet-to-city", label: l("Remonter chercher le sergent avec lui", "Climb to seek the sergeant with him"), to: "city_steps" },
  ],
  rite_broken: [
    { id: "broken-rite-to-chapel", label: l("Revenir vérifier l'autel apaisé", "Return to inspect the calmed altar"), to: "water_chapel" },
    { id: "broken-rite-to-terrace", label: l("Gagner la terrasse des boucliers par la brèche", "Reach the shield terrace through the breach"), to: "shield_terrace" },
    { id: "broken-rite-to-aqueduct", label: l("Suivre l'eau claire vers l'aqueduc", "Follow clear water toward the aqueduct"), to: "aqueduct_gallery" },
    { id: "broken-rite-to-well", label: l("Remonter au puits avec le courant", "Climb to the well with the current"), to: "echo_well" },
  ],
  foreman_parley: [
    { id: "parley-to-sluice", label: l("Suivre son regard vers le passage des vannes", "Follow his glance to the sluice passage"), to: "sluice_passage" },
    { id: "parley-to-customs", label: l("Comparer son jargon aux registres des douanes", "Compare his jargon with customs records"), to: "old_customs" },
    { id: "parley-to-shadow", label: l("Revenir écouter sous l'échafaudage", "Return to listen beneath the scaffolding"), to: "scaffold_shadow" },
  ],
  scaffold_shadow: [
    { id: "shadow-to-maintenance", label: l("Suivre les outils jusqu'au conduit oublié", "Follow the tools to the forgotten conduit"), to: "maintenance_map" },
    { id: "shadow-to-dock", label: l("Sortir par les arches jusqu'au quai", "Leave through the arches to the dock"), to: "undersluice_dock" },
    { id: "shadow-to-gates", label: l("Ramper sous les madriers vers les portes", "Crawl beneath the beams toward the gates"), to: "gate_chamber" },
  ],
  sluice_passage: [
    { id: "sluice-to-underbridge", label: l("Suivre le grondement jusqu'à la vanne sous le pont", "Follow the rumble to the underbridge sluice"), to: "underbridge_sluice" },
    { id: "sluice-to-counterweights", label: l("Prendre l'échelle des contrepoids", "Take the counterweight ladder"), to: "counterweight_loft" },
    { id: "sluice-to-workers", label: l("Reparaître derrière les faux ouvriers", "Reappear behind the false workers"), to: "workers_bank" },
  ],
  kiki_trust: [
    { id: "kiki-to-shrine", label: l("Faire bénir Kiki au sanctuaire", "Have Kiki blessed at the shrine"), to: "river_shrine" },
    { id: "kiki-to-well", label: l("Laisser Kiki choisir la piste du puits", "Let Kiki choose the well trail"), to: "echo_well" },
    { id: "kiki-to-market", label: l("Remonter par le marché où Kiki est connu", "Climb through the market where Kiki is known"), to: "salt_market" },
  ],
  barge_hold: [
    { id: "barge-to-gallery", label: l("Passer par l'écoutille vers les glyphes", "Pass through the hatch toward the glyphs"), to: "gallery_procession" },
    { id: "barge-to-pier", label: l("Rejoindre le quai des lanternes noires", "Reach the black-lantern pier"), to: "black_lantern_pier" },
    { id: "barge-to-cell", label: l("Suivre des griffures jusqu'à la prison de pierre", "Follow scratches to the stone prison"), to: "poupiquet_cell" },
  ],
  smuggler_ledger: [
    { id: "ledger-to-customs", label: l("Comparer le manifeste aux livres des douanes", "Compare the manifest with customs ledgers"), to: "old_customs" },
    { id: "ledger-to-locker", label: l("Chercher les noms des coursiers dans leur casier", "Seek the couriers' names in their locker"), to: "courier_locker" },
    { id: "ledger-to-city", label: l("Porter le manifeste vers la garde", "Carry the manifest to the guard"), to: "city_steps" },
  ],
  gallery_procession: [
    { id: "gallery-to-chapel", label: l("Suivre le chant gravé jusqu'à la chapelle", "Follow the engraved song to the chapel"), to: "water_chapel" },
    { id: "gallery-to-aqueduct", label: l("Prendre le couloir des pierres de pression", "Take the pressure-stone corridor"), to: "aqueduct_gallery" },
    { id: "gallery-to-barge", label: l("Revenir vers la barge par les glyphes effacés", "Return to the barge by faded glyphs"), to: "barge_hold" },
  ],
  poupiquet_cell: [
    { id: "cell-to-rite", label: l("Chercher la brèche du cinquième anneau", "Seek the fifth-ring breach"), to: "rite_broken" },
    { id: "cell-to-tunnel", label: l("Suivre l'eau vers le tunnel noyé", "Follow the water to the flooded tunnel"), to: "flooded_tunnel" },
    { id: "cell-to-gates", label: l("Forcer le passage vers les engrenages", "Force a passage toward the gears"), effects: [{ op: "increment", path: "expedition.fatigue", value: 1 }], to: "gate_chamber" },
  ],
  water_chapel: [
    { id: "chapel-to-gallery", label: l("Revenir déchiffrer les glyphes avant d'agir", "Return to decipher the glyphs before acting"), to: "gallery_procession" },
    { id: "chapel-to-bell", label: l("Suivre les vibrations jusqu'à la cloche", "Follow the vibrations to the bell"), to: "signal_bell" },
    { id: "chapel-to-dock", label: l("Sortir par le bassin vers le quai", "Leave through the basin toward the dock"), to: "undersluice_dock" },
  ],
  shield_terrace: [
    { id: "terrace-to-gates", label: l("Revenir examiner les gonds", "Return to inspect the hinges"), to: "gate_chamber" },
    { id: "terrace-to-watch", label: l("Rejoindre la plateforme des veilleurs", "Reach the watchers' platform"), to: "watch_platform" },
    { id: "terrace-to-city", label: l("Prendre le sentier des quartiers bas", "Take the lower-ward path"), to: "city_steps" },
  ],
  public_reckoning: [
    { id: "reckoning-to-council", label: l("Retourner consulter le Conseil", "Return to consult the Council"), to: "council_antechamber" },
    { id: "reckoning-to-gates", label: l("Redescendre vérifier les portes", "Descend to check the gates"), to: "gate_chamber" },
    { id: "reckoning-to-witnesses", label: l("Écouter encore le serment des voyageurs", "Hear the travellers' oath again"), to: "witness_oath" },
  ],
  glasswright_yard: [
    { id: "glass-to-pier", label: l("Suivre les sphères bleues jusqu'au quai", "Follow the blue spheres to the pier"), to: "black_lantern_pier" },
    { id: "glass-to-salt", label: l("Porter un éclat au marché du sel", "Take a shard to the salt market"), to: "salt_market" },
    { id: "glass-to-observatory", label: l("Montrer les pigments à l'astronome", "Show the pigments to the astronomer"), to: "ember_observatory" },
  ],
  seal_vault: [
    { id: "vault-to-locker", label: l("Suivre les cachets jusqu'au casier des coursiers", "Follow the seals to the courier's locker"), to: "courier_locker" },
    { id: "vault-to-scriptorium", label: l("Chercher les copies derrière le cloître", "Seek copies behind the cloister"), to: "hidden_scriptorium" },
    { id: "vault-to-market", label: l("Sortir par les entrepôts vers le marché", "Exit through the warehouses to the market"), to: "salt_market" },
  ],
  embassy_vestry: [
    { id: "vestry-to-locker", label: l("Suivre la tournée des messagers", "Follow the messengers' circuit"), to: "courier_locker" },
    { id: "vestry-to-cistern", label: l("Passer par les toits jusqu'à la citerne", "Cross the rooftops to the cistern"), to: "rooftop_cistern" },
    { id: "vestry-to-council", label: l("Gagner l'antichambre avec les rubans", "Reach the antechamber with the ribbons"), to: "council_antechamber" },
  ],
  paper_bridge: [
    { id: "bridge-to-festival", label: l("Suivre les feuilles votives vers les lanternes", "Follow votive sheets to the lanterns"), to: "festival_arcade" },
    { id: "bridge-to-ropewalk", label: l("Passer sous l'arche vers la corderie", "Pass beneath the arch to the ropewalk"), to: "ropewalk" },
    { id: "bridge-to-canal", label: l("Redescendre aux marches du canal", "Descend to the canal steps"), to: "canal_steps" },
  ],
  echo_well: [
    { id: "well-to-baths", label: l("Suivre le troisième écho jusqu'aux bains", "Follow the third echo to the baths"), to: "collapsed_baths" },
    { id: "well-to-post", label: l("Remonter par l'ancien relais postal", "Climb through the old postal relay"), to: "drowned_post" },
    { id: "well-to-chapel", label: l("Descendre avec le murmure vers la chapelle", "Descend with the murmur to the chapel"), to: "water_chapel" },
  ],
  collapsed_baths: [
    { id: "baths-to-well", label: l("Suivre les canalisations jusqu'au puits", "Follow the pipes to the well"), to: "echo_well" },
    { id: "baths-to-fissure", label: l("Gagner la fissure par les fondations", "Reach the fissure through the foundations"), to: "narrow_fissure" },
    { id: "baths-to-aqueduct", label: l("Prendre la galerie haute de l'aqueduc", "Take the high aqueduct gallery"), to: "aqueduct_gallery" },
  ],
  counterweight_loft: [
    { id: "loft-to-gates", label: l("Redescendre entre les chaînes vers les portes", "Descend between the chains to the gates"), to: "gate_chamber" },
    { id: "loft-to-sluice", label: l("Suivre le câble jusqu'aux vannes", "Follow the cable to the sluices"), to: "sluice_passage" },
    { id: "loft-to-observatory", label: l("Prendre la passerelle vers l'observatoire", "Take the catwalk to the observatory"), to: "ember_observatory" },
  ],
  ember_observatory: [
    { id: "observatory-to-watch", label: l("Rejoindre la plateforme pour vérifier la ville", "Reach the platform to check the city"), to: "watch_platform" },
    { id: "observatory-to-bell", label: l("Suivre le fil de cuivre jusqu'à la cloche", "Follow the copper wire to the bell"), to: "signal_bell" },
    { id: "observatory-to-city", label: l("Descendre alerter la garde", "Descend to warn the guard"), to: "city_steps" },
  ],
  rooftop_cistern: [
    { id: "cistern-to-ropewalk", label: l("Suivre les cordes à linge jusqu'à la corderie", "Follow clotheslines to the ropewalk"), to: "ropewalk" },
    { id: "cistern-to-locker", label: l("Descendre au casier des coursiers", "Descend to the courier's locker"), to: "courier_locker" },
    { id: "cistern-to-tribunal", label: l("Traverser les toits jusqu'au Tribunal", "Cross the roofs to the Tribunal"), to: "tribunal_gallery" },
  ],
  hidden_scriptorium: [
    { id: "scriptorium-to-seals", label: l("Comparer les copies aux matrices de plomb", "Compare copies with the lead dies"), to: "seal_vault" },
    { id: "scriptorium-to-locker", label: l("Suivre une note jusqu'au casier des coursiers", "Follow a note to the courier's locker"), to: "courier_locker" },
    { id: "scriptorium-to-city", label: l("Sortir par la fenêtre basse vers la garde", "Exit the low window toward the guard"), to: "city_steps" },
  ],
  tribunal_gallery: [
    { id: "tribunal-to-embassy", label: l("Suivre la coursive diplomatique", "Follow the diplomatic passage"), to: "embassy_vestry" },
    { id: "tribunal-to-cistern", label: l("Passer par les combles jusqu'à la citerne", "Cross the attics to the cistern"), to: "rooftop_cistern" },
    { id: "tribunal-to-watch", label: l("Gagner les hauteurs des veilleurs", "Reach the watchers' heights"), to: "watch_platform" },
  ],
  council_antechamber: [
    { id: "council-to-archive", label: l("Vérifier les preuves au cloître", "Verify the evidence at the cloister"), to: "archive_cloister" },
    { id: "council-to-city", label: l("Rejoindre le sergent sur les marches", "Join the sergeant on the steps"), to: "city_steps" },
    { id: "council-to-locker", label: l("Suivre la piste des messagers", "Follow the messengers' trail"), to: "courier_locker" },
  ],
  ferrymen_guild: [
    { id: "guild-to-shrine", label: l("Consulter la prêtresse des rives", "Consult the riverside priestess"), to: "river_shrine" },
    { id: "guild-to-post", label: l("Envoyer un appel au relais noyé", "Send a call to the drowned post"), to: "drowned_post" },
    { id: "guild-to-canal", label: l("Ressortir aux marches du canal", "Return to the canal steps"), to: "canal_steps" },
  ],
  rope_chapel: [
    { id: "chapel-rope-to-guild", label: l("Revenir demander conseil aux passeurs", "Return to seek the ferrymen's counsel"), to: "ferrymen_guild" },
    { id: "chapel-rope-to-pier", label: l("Suivre les amarres vers le quai noir", "Follow the moorings to the black pier"), to: "black_lantern_pier" },
    { id: "chapel-rope-to-well", label: l("Prendre le passage des cordes vers le puits", "Take the rope passage to the well"), to: "echo_well" },
  ],
};

const LORE_EXPANSION_CHOICES = {
  festival_arcade: [
    { id: "arcade-to-votive-roof", label: l("Suivre les prières mouillées jusqu'aux toits", "Follow the rain-soaked prayers to the rooftops"), to: "votive_roof" },
    { id: "arcade-to-veil-theatre", label: l("Passer derrière les masques vers le théâtre", "Pass behind the masks toward the theatre"), to: "veil_theatre" },
  ],
  archive_cloister: [
    { id: "cloister-to-mirror-archive", label: l("Descendre vers les encres qui rendent les noms", "Descend to the inks that return names"), to: "mirror_archive" },
  ],
  old_customs: [
    { id: "customs-to-mirror-archive", label: l("Faire lire les grattages par une restauratrice", "Have a restorer read the scraped lines"), to: "mirror_archive" },
    { id: "customs-to-wicker-docks", label: l("Suivre les cachets de plomb jusqu'aux paniers", "Follow the lead seals to the baskets"), to: "wicker_docks" },
  ],
  mask_exchange: [
    { id: "mask-to-veil-theatre", label: l("Chercher la voix qui imite les notables", "Seek the voice that imitates the notables"), to: "veil_theatre" },
  ],
  black_lantern_pier: [
    { id: "pier-to-wicker-docks", label: l("Passer entre les barges jusqu'aux paniers creux", "Pass between the barges to the hollow baskets"), to: "wicker_docks" },
  ],
  echo_well: [
    { id: "well-to-moonwell", label: l("Suivre le second écho sous la margelle", "Follow the second echo beneath the wellhead"), to: "moonwell_grotto" },
  ],
  glasswright_yard: [
    { id: "glass-to-catacomb", label: l("Descendre là où dorment les lentilles refusées", "Descend where rejected lenses sleep"), to: "glass_catacomb" },
  ],
  water_chapel: [
    { id: "chapel-to-ossuary", label: l("Suivre les jarres scellées vers les morts d'eau", "Follow the sealed jars to the water-dead"), to: "tide_ossuary" },
  ],
  votive_roof: [
    { id: "meet-sava", label: l("Aider Sava à trier les prières sans adresse", "Help Sava sort the unaddressed prayers"), effects: [{ op: "set", path: "flags.metSava", value: true }, { op: "increment", path: "relationships.sava", value: 1 }], result: { text: l("Sava vous confie trois feuilles dont les noms ont été grattés au même outil. Sous l'une d'elles apparaît une ligne : « cinquième quartier, aucune réponse exigée ». Elle ne sait pas qui a écrit cela; elle sait seulement que les prières de cette rue sont revenues pendant vingt ans.", "Sava gives you three sheets whose names were scraped by the same tool. Beneath one appears a line: “fifth district, no reply required.” She does not know who wrote it; she only knows prayers from that street returned for twenty years.") } },
    { id: "roof-to-shrine", label: l("Porter les feuilles au sanctuaire des rives", "Carry the sheets to the riverside shrine"), to: "river_shrine" },
    { id: "roof-to-steps", label: l("Suivre les gouttières jusqu'aux marches de la ville", "Follow the gutters to the city steps"), to: "city_steps" },
  ],
  veil_theatre: [
    { id: "meet-orthe", label: l("Demander à Orthe de rejouer la voix du conseiller", "Ask Orthe to replay the councillor's voice"), effects: [{ op: "set", path: "flags.metOrthe", value: true }, { op: "increment", path: "relationships.orthe", value: 1 }], result: { text: l("Orthe ne donne pas un nom. Il vous fait entendre trois fois la même formule administrative, puis s'arrête sur une respiration trop courte. « Quelqu'un a appris cette phrase par peur, pas par métier. Trouvez qui la répète quand personne ne regarde. »", "Orthe gives no name. He makes you hear the same administrative formula three times, then stops on a breath taken too soon. “Someone learned that sentence through fear, not through work. Find who repeats it when no one is looking.”") } },
    { id: "theatre-to-embassy", label: l("Suivre les coulisses jusqu'à la sacristie de l'ambassade", "Follow the backstage passage to the embassy vestry"), to: "embassy_vestry" },
    { id: "theatre-to-submerged", label: l("Descendre par la trappe vers le théâtre noyé", "Descend through the trapdoor to the submerged theatre"), to: "submerged_theater" },
  ],
  mirror_archive: [
    { id: "meet-ilyra", label: l("Laisser Ilyra interroger les blancs du registre", "Let Ilyra question the ledger's blanks"), effects: [{ op: "set", path: "flags.metIlyra", value: true }, { op: "increment", path: "relationships.ilyra", value: 1 }], result: { text: l("Ilyra pose une plaque d'étain sur le papier et l'encre oubliée remonte comme une cicatrice. Elle ne vous montre encore qu'une initiale — R. — mais vous apprend que le Conseil a payé pour que certains sinistrés disparaissent avant même que la crue ne les atteigne.", "Ilyra lays a tin plate over the paper and forgotten ink rises like a scar. She shows you only an initial—R.—but teaches you that the Council paid for some victims to disappear before the flood ever reached them.") } },
    { id: "restore-fifth-quarter", label: l("Restaurer le plan du cinquième quartier", "Restore the map of the fifth district"), effects: [{ op: "addUnique", path: "clues", value: "erased_quarters" }, { op: "increment", path: "expedition.morale", value: -1 }], result: { text: l("Le plan révèle le quartier de Vire-Basse, rayé des copies officielles après une ancienne crue. Les quatre boucliers pointent aujourd'hui vers les mêmes rues. Le complot n'invente pas une cible : il réactive une habitude que la ville a pris soin d'oublier.", "The map reveals the district of Low Vire, crossed out of official copies after an old flood. The four shields point toward the same streets today. The plot does not invent a target: it revives a habit the city took care to forget.") } },
    { id: "mirror-to-tribunal", label: l("Remonter par la gaine des dossiers jusqu'au Tribunal", "Climb the file shaft to the Tribunal"), to: "tribunal_gallery" },
  ],
  wicker_docks: [
    { id: "meet-noma", label: l("Aider Noma à tresser un double fond", "Help Noma weave a false bottom"), effects: [{ op: "set", path: "flags.metNoma", value: true }, { op: "increment", path: "relationships.noma", value: 1 }, { op: "increment", path: "expedition.supplies", value: 1 }], result: { text: l("Noma vous montre que les mêmes marques servent à guider les caisses de Souleyna et les lettres de Vire-Basse. « Un chemin n'est pas coupable, dit-elle. Celui qui décide qui a le droit de l'emprunter, oui. »", "Noma shows you that the same marks guide Souleyna crates and Low Vire letters. “A route is not guilty,” she says. “The one who decides who may use it is.”") } },
    { id: "read-basket-oath", label: l("Lire le serment caché dans les fibres de jonc", "Read the oath hidden in the rush fibres"), effects: [{ op: "addUnique", path: "clues", value: "black_oath" }, { op: "increment", path: "expedition.alert", value: 1 }], result: { text: l("Dans la fibre goudronnée, un ancien serment de transport lie les notables, les passeurs et les maisons de commerce : en cas de crue, les quais hauts passent avant les quais bas. Valdrick paie aujourd'hui ce que Laelith a jadis écrit elle-même.", "In the tarred fibre, an old transport oath binds notables, ferrymen, and trading houses: in flood, high quays come before low quays. Valdrick pays today for what Laelith once wrote for itself.") } },
    { id: "docks-to-pier", label: l("Rejoindre le quai des lanternes par les ponts de barque", "Reach the lantern pier by boat bridges"), to: "black_lantern_pier" },
  ],
  moonwell_grotto: [
    { id: "meet-kos", label: l("Écouter Kos compter les vibrations de la rivière", "Listen to Kos count the river's tremors"), effects: [{ op: "set", path: "flags.metKos", value: true }, { op: "increment", path: "relationships.kos", value: 1 }], result: { text: l("Kos compte quatre vibrations, puis une cinquième qu'il refuse d'appeler un anneau. « Celui-là n'ordonne rien, dit-il. Il oblige le porteur à nommer qui sera épargné. C'est pour cela qu'ils l'ont retiré des murs. »", "Kos counts four tremors, then a fifth he refuses to call a ring. “That one commands nothing,” he says. “It forces the bearer to name who will be spared. That is why they took it off the walls.”") } },
    { id: "name-fifth-ring", label: l("Demander le nom du cinquième anneau", "Ask for the fifth ring's name"), effects: [{ op: "addUnique", path: "clues", value: "fifth_name" }, { op: "increment", path: "expedition.morale", value: 1 }], result: { text: l("Après un long silence, Kos vous donne le nom : Eshra, « celle qui revient demander ». Le rite n'était pas un moyen de choisir une victime; il devait rendre ce choix impossible à oublier.", "After a long silence, Kos gives you the name: Eshra, “she who returns to ask.” The rite was not a way to choose a victim; it was meant to make that choice impossible to forget.") } },
    { id: "moonwell-to-aqueduct", label: l("Prendre la veine sèche vers l'aqueduc", "Take the dry vein to the aqueduct"), to: "aqueduct_gallery" },
  ],
  glass_catacomb: [
    { id: "meet-vess", label: l("Laisser Vess classer l'éclat que vous portez", "Let Vess classify the shard you carry"), effects: [{ op: "set", path: "flags.metVess", value: true }, { op: "increment", path: "relationships.vess", value: 1 }], result: { text: l("Vess reconnaît la formule d'une lentille de priorité civile. Elle ne guide pas la vague : elle signale quelles maisons doivent recevoir l'avertissement. Les quartiers bas n'ont jamais figuré dans la liste.", "Vess recognizes the formula of a civic-priority lens. It does not guide the wave: it signals which houses must receive warning. The lower wards never appeared on the list.") } },
    { id: "align-buried-lenses", label: l("Aligner les lentilles sur la lumière des boucliers", "Align the buried lenses with the shields' light"), effects: [{ op: "addUnique", path: "clues", value: "erased_quarters" }, { op: "increment", path: "expedition.fatigue", value: 1 }], result: { text: l("Les éclats recomposent le contour de Vire-Basse, puis celui de deux autres ruelles promises au débordement. La carte d'Ilyra n'était pas une exception : elle est la première couche d'un système entier.", "The shards reconstruct the outline of Low Vire, then that of two other lanes promised to overflow. Ilyra's map was not an exception: it is the first layer of an entire system.") } },
    { id: "catacomb-to-signals", label: l("Suivre les conduits de verre jusqu'à la galerie des signaux", "Follow the glass conduits to the signal gallery"), to: "signal_gallery" },
  ],
  tide_ossuary: [
    { id: "meet-theska", label: l("Aider Theska à relire les jarres de limon", "Help Theska read the silt jars"), effects: [{ op: "set", path: "flags.metTheska", value: true }, { op: "increment", path: "relationships.theska", value: 1 }], result: { text: l("Theska vous fait ouvrir une jarre dont la terre date de la crue de Vire-Basse. À l'intérieur, une bague de passeur porte le même motif que les boucliers. Les morts savaient déjà où l'eau avait été envoyée.", "Theska has you open a jar whose earth dates from the Low Vire flood. Inside, a ferryman's ring bears the same motif as the shields. The dead already knew where the water had been sent.") } },
    { id: "read-water-dead-register", label: l("Copier le registre des morts d'eau", "Copy the register of the water-dead"), effects: [{ op: "addUnique", path: "clues", value: "black_oath" }, { op: "increment", path: "expedition.morale", value: -1 }], result: { text: l("Le registre associe les morts de la vieille crue à la même clause de priorité que Noma a trouvée dans les paniers. Votre accusation gagne une profondeur terrible : il ne s'agit plus d'un seul crime, mais d'une règle que la ville a laissé survivre.", "The register links the old flood's dead to the same priority clause Noma found in the baskets. Your accusation gains terrible depth: this is no longer one crime, but a rule the city allowed to survive.") } },
    { id: "ossuary-to-oratory", label: l("Revenir vers l'oratoire noyé", "Return toward the drowned oratory"), to: "drowned_oratory" },
  ],
};

const SECOND_LORE_CHOICES = {
  rooftop_cistern: [
    { id: "cistern-to-aviary", label: l("Suivre les martinets jusqu'à la volière de cuivre", "Follow the swifts to the copper aviary"), to: "copper_aviary" },
  ],
  embassy_vestry: [
    { id: "vestry-to-aviary", label: l("Suivre un ruban diplomatique jusqu'aux martinets", "Follow a diplomatic ribbon to the swifts"), to: "copper_aviary" },
  ],
  tribunal_gallery: [
    { id: "tribunal-to-measures", label: l("Chercher l'ancienne magistrate des jauges", "Seek the former magistrate of gauges"), to: "house_of_measures" },
  ],
  council_antechamber: [
    { id: "council-to-measures", label: l("Comparer la parole du Conseil aux poids de bronze", "Compare the Council's words with bronze weights"), to: "house_of_measures" },
  ],
  river_shrine: [
    { id: "shrine-to-reliquary", label: l("Demander à voir les objets que le sanctuaire cache", "Ask to see what the shrine keeps hidden"), to: "brass_reliquary" },
  ],
  moss_orchard: [
    { id: "orchard-to-exiles", label: l("Suivre les anciennes portes jusqu'aux maisons déplacées", "Follow the old doors to the moved houses"), to: "exile_courtyard" },
  ],
  tide_garden: [
    { id: "garden-to-observatory", label: l("Porter les roseaux au laboratoire du limon", "Carry the reeds to the silt observatory"), to: "silt_observatory" },
  ],
  black_lantern_pier: [
    { id: "pier-to-mailroom", label: l("Entrer dans le bureau où sèchent les lettres noyées", "Enter the office where drowned letters dry"), to: "drowned_mailroom" },
  ],
  copper_aviary: [
    { id: "meet-nival", label: l("Aider Nival à lire les rubans de patte", "Help Nival read the leg ribbons"), effects: [{ op: "set", path: "flags.metNival", value: true }, { op: "increment", path: "relationships.nival", value: 1 }], result: { text: l("Nival déroule une chaîne de rubans d'alerte. Chaque itinéraire contourne Vire-Basse d'un geste net, comme une phrase qu'on s'interdit de finir. Elle vous donne une plume bleue : les cloches ne furent jamais le premier avertissement.", "Nival unrolls a chain of warning ribbons. Every route bypasses Low Vire with a clean gesture, like a sentence one forbids oneself to finish. She gives you a blue feather: bells were never the first warning.") } },
    { id: "trace-silent-route", label: l("Tracer les vols qui n'ont jamais atteint Vire-Basse", "Trace flights that never reached Low Vire"), effects: [{ op: "addUnique", path: "clues", value: "unseen_bell" }, { op: "increment", path: "expedition.alert", value: 1 }], result: { text: l("Les rubans dessinent une alarme en deux temps : les quartiers hauts reçoivent les martinets, puis la cloche; les quartiers bas ne reçoivent ni l'un ni l'autre. Le sabotage actuel exploite une cécité déjà inscrite dans les procédures.", "The ribbons draw a two-stage alarm: upper wards receive swifts, then the bell; lower wards receive neither. The current sabotage exploits a blindness already written into procedure.") } },
    { id: "aviary-to-cistern", label: l("Redescendre vers la citerne par les toits", "Descend to the cistern across the rooftops"), to: "rooftop_cistern" },
  ],
  house_of_measures: [
    { id: "meet-rissa", label: l("Demander à Rissa pourquoi elle a signé", "Ask Rissa why she signed"), effects: [{ op: "set", path: "flags.metRissa", value: true }, { op: "increment", path: "relationships.rissa", value: 1 }, { op: "increment", path: "expedition.morale", value: -1 }], result: { text: l("Rissa ne se défend pas. Elle dit qu'elle avait devant elle trois portes, deux quartiers et un calcul qui promettait de sauver davantage de vies. « J'ai cru qu'une bonne formule rendait un mauvais choix moins réel. »", "Rissa does not defend herself. She says she faced three gates, two wards, and a calculation that promised to save more lives. “I believed a good formula made a bad choice less real.”") } },
    { id: "unseal-brass-concord", label: l("Déplier le Concordat de laiton", "Unfold the Brass Concord"), effects: [{ op: "addUnique", path: "clues", value: "brass_concord" }], result: { text: l("Le Concordat transforme le nom d'Eshra en article de procédure : une personne doit signer la liste des rues épargnées, afin que les autres deviennent un résultat de calcul. Valdrick n'a pas forgé cette arme; il a trouvé comment la faire sonner de nouveau.", "The Concord turns Eshra's name into an article of procedure: one person must sign the list of spared streets, so the others become a calculation's result. Valdrick did not forge this weapon; he found how to make it sound again.") } },
    { id: "measures-to-tribunal", label: l("Rapporter les poids au Tribunal", "Carry the weights back to the Tribunal"), to: "tribunal_gallery" },
  ],
  brass_reliquary: [
    { id: "meet-darel", label: l("Écouter Darel raconter l'origine du disque", "Hear Darel tell the disc's origin"), effects: [{ op: "set", path: "flags.metDarel", value: true }, { op: "increment", path: "relationships.darel", value: 1 }], result: { text: l("Darel vous apprend que le premier gardien n'était pas un mage mais une veuve de Vire-Basse. Elle avait exigé qu'Eshra soit prononcée avant chaque réglage, pour que les décideurs regardent les gens derrière les chiffres.", "Darel tells you the first keeper was not a mage but a widow of Low Vire. She required Eshra to be spoken before every adjustment, so decision-makers would see the people behind the numbers.") } },
    { id: "read-scratched-disc", label: l("Lire la rayure qui a mutilé le nom d'Eshra", "Read the scratch that mutilated Eshra's name"), effects: [{ op: "addUnique", path: "clues", value: "brass_concord" }, { op: "addUnique", path: "clues", value: "fifth_name" }], result: { text: l("La rayure ne supprime pas le nom : elle le divise en chiffres. Vous comprenez comment la ville a pu garder le rite tout en retirant sa conscience.", "The scratch does not erase the name: it divides it into figures. You understand how the city kept the rite while removing its conscience.") } },
    { id: "reliquary-to-shrine", label: l("Revenir vers la statue sans visage", "Return toward the faceless statue"), to: "river_shrine" },
  ],
  exile_courtyard: [
    { id: "meet-maera", label: l("Écouter Maëra nommer les rues par leurs odeurs", "Listen as Maera names streets by their smells"), effects: [{ op: "set", path: "flags.metMaera", value: true }, { op: "increment", path: "relationships.maera", value: 1 }], result: { text: l("Maëra vous apprend trois noms que les plans ont perdus, puis vous corrige : « Ce ne sont pas des ruelles. Ce sont des cuisines, des ateliers, des gens qui savaient où frapper. » Elle refuse que Vire-Basse devienne votre meilleure pièce à conviction.", "Maera teaches you three names maps have lost, then corrects you: “They are not lanes. They are kitchens, workshops, people who knew where to knock.” She refuses to let Low Vire become your best exhibit.") } },
    { id: "copy-exile-keys", label: l("Copier la liste des clés des maisons disparues", "Copy the key list for vanished houses"), effects: [{ op: "addUnique", path: "clues", value: "first_exiles" }, { op: "increment", path: "expedition.morale", value: 1 }], result: { text: l("Les clés portent les noms des familles déplacées, pas des morts. La vieille crue n'a pas seulement tué : elle a dispersé les témoins, puis a prétendu que personne ne se souvenait du choix.", "The keys bear the names of displaced families, not the dead. The old flood did not only kill: it scattered witnesses, then pretended no one remembered the choice.") } },
    { id: "courtyard-to-orchard", label: l("Reprendre le chemin du verger sous la vase", "Return to the orchard beneath the silt"), to: "moss_orchard" },
  ],
  silt_observatory: [
    { id: "meet-siren", label: l("Aider Siren à comparer les couches de crue", "Help Siren compare the flood layers"), effects: [{ op: "set", path: "flags.metSiren", value: true }, { op: "increment", path: "relationships.siren", value: 1 }], result: { text: l("Siren vous fait toucher le grain bleu pris dans le limon de l'ancienne crue. Il est identique à celui des sphères de Maëlin. La catastrophe d'hier avait déjà besoin d'un signal; seul son langage a changé.", "Siren has you touch the blue grain trapped in the old flood's silt. It matches Maelin's spheres. Yesterday's disaster already needed a signal; only its language changed.") } },
    { id: "compare-warning-silt", label: l("Comparer le verre bleu aux couches de Vire-Basse", "Compare blue glass to Low Vire's layers"), effects: [{ op: "addUnique", path: "clues", value: "unseen_bell" }, { op: "increment", path: "expedition.supplies", value: -1 }], result: { text: l("Les particules de verre prouvent qu'une alerte avait été préparée puis coupée avant d'atteindre Vire-Basse. L'absence de cloche n'était pas une panne : elle était le dernier geste d'une décision.", "The glass particles prove a warning was prepared then cut before reaching Low Vire. The missing bell was not a failure: it was the final gesture of a decision.") } },
    { id: "observatory-to-garden", label: l("Revenir aux jardins par le canal de mesure", "Return to the gardens by the measuring canal"), to: "tide_garden" },
  ],
  drowned_mailroom: [
    { id: "meet-oren", label: l("Aider Oren à sécher les convocations de crue", "Help Oren dry the flood summons"), effects: [{ op: "set", path: "flags.metOren", value: true }, { op: "increment", path: "relationships.oren", value: 1 }], result: { text: l("Oren ne vous montre que les copies non distribuées. Il n'a jamais détruit les originaux : quelqu'un avait déjà décidé qu'ils ne sortiraient pas. Il vous demande si mettre ces lettres au jour sauvera des gens, ou seulement votre récit.", "Oren shows you only the undelivered copies. He never destroyed the originals: someone had already decided they would not leave. He asks whether bringing these letters to light will save people, or only your story.") } },
    { id: "sort-unsent-summons", label: l("Classer les convocations jamais envoyées", "Sort the summons never sent"), effects: [{ op: "addUnique", path: "clues", value: "first_exiles" }, { op: "addUnique", path: "clues", value: "unseen_bell" }], result: { text: l("Les convocations associent les familles déplacées aux rubans d'alerte arrêtés chez Nival. Les survivants de Vire-Basse n'ont pas été oubliés par accident : leur silence a été distribué avec le courrier.", "The summons link displaced families to the warning ribbons stopped at Nival's. Low Vire's survivors were not forgotten by accident: their silence was distributed with the mail.") } },
    { id: "mailroom-to-pier", label: l("Rejoindre les lanternes noires par le quai", "Rejoin the black lanterns by the quay"), to: "black_lantern_pier" },
  ],
};

const THIRD_LORE_CHOICES = {
  exile_courtyard: [
    { id: "courtyard-to-low-vire", label: l("Suivre Maëra jusqu'au seuil que les plans refusent", "Follow Maera to the threshold maps refuse"), requires: { path: "state.flags.metMaera", equals: true }, to: "low_vire_threshold" },
  ],
  mirror_archive: [
    { id: "mirror-to-low-vire", label: l("Laisser l'encre restaurée vous conduire hors des cartes", "Let restored ink lead you beyond the maps"), requires: { path: "state.clues", includes: "erased_quarters" }, to: "low_vire_threshold" },
  ],
  drowned_mailroom: [
    { id: "mailroom-to-low-vire", label: l("Porter les convocations jusqu'aux adresses retrouvées", "Carry the summons to the recovered addresses"), requires: { path: "state.clues", includes: "first_exiles" }, to: "low_vire_threshold" },
  ],
  low_vire_threshold: [
    { id: "enter-witness-kitchen", label: l("Suivre l'odeur du cumin vers la cuisine des témoins", "Follow cumin scent to the witnesses' kitchen"), to: "witness_kitchen" },
    { id: "enter-absent-scriptorium", label: l("Pousser la porte du scriptorium sans cote", "Push open the unclassified scriptorium door"), to: "ledger_scriptorium" },
    { id: "follow-flood-marks", label: l("Descendre vers la maison aux marques d'eau", "Descend to the house of water marks"), to: "flood_marks_house" },
  ],
  witness_kitchen: [
    { id: "meet-marwen", label: l("Écouter Marwen avant de lui demander un témoignage", "Listen to Marwen before asking for testimony"), effects: [{ op: "set", path: "flags.metMarwen", value: true }, { op: "increment", path: "relationships.marwen", value: 1 }, { op: "increment", path: "expedition.morale", value: 1 }], result: { text: l("Marwen vous fait servir du thé avant de parler. Elle raconte l'évacuation de sa mère, puis s'interrompt : « Ne notez pas seulement qui nous a laissés. Notez qui a décidé que notre peur ne comptait pas comme une alarme. »", "Marwen has tea served before she speaks. She recounts her mother's evacuation, then stops: “Do not write down only who left us. Write down who decided our fear did not count as an alarm.”") } },
    { id: "kitchen-to-school", label: l("Aider Letha à rejoindre l'école sans registre", "Help Letha reach the school without a register"), to: "quiet_school" },
    { id: "kitchen-to-causeway", label: l("Prendre la chaussée des portes basses", "Take the low-gates causeway"), to: "forgotten_causeway" },
  ],
  ledger_scriptorium: [
    { id: "meet-tovar", label: l("Demander à Tovar quelles lignes il a recopiées", "Ask Tovar which lines he copied"), effects: [{ op: "set", path: "flags.metTovar", value: true }, { op: "increment", path: "relationships.tovar", value: 1 }], result: { text: l("Tovar ne se disculpe pas. Il vous montre la marge où il a remplacé des noms par une somme, puis la liste secrète où il les a recopiés pour lui-même. Sa faute est réelle; sa mémoire peut encore servir.", "Tovar does not excuse himself. He shows you the margin where he replaced names with a total, then the secret list where he copied them for himself. His fault is real; his memory can still serve.") } },
    { id: "open-vire-proceedings", label: l("Ouvrir les délibérations scellées de Vire-Basse", "Open Low Vire's sealed proceedings"), requires: { path: "state.flags.metTovar", equals: true }, effects: [{ op: "addUnique", path: "clues", value: "vire_proceedings" }, { op: "increment", path: "expedition.alert", value: 1 }], result: { text: l("Les délibérations ne parlent pas d'une catastrophe mais d'un arbitrage. Une majorité a voté pour maintenir le calme dans les rues basses afin d'éviter une panique sur les quais riches. Le mot 'calme' est souligné trois fois.", "The proceedings speak not of a catastrophe but an arbitration. A majority voted to maintain calm in the lower streets to avoid panic on wealthy quays. The word ‘calm’ is underlined three times.") } },
    { id: "scriptorium-to-echo-vault", label: l("Suivre Tovar dans la chambre des essais", "Follow Tovar into the trial vault"), to: "echo_vault" },
    { id: "scriptorium-to-lift", label: l("Prendre l'escalier de service vers l'ascenseur", "Take the service stair to the lift"), to: "brass_lift" },
  ],
  flood_marks_house: [
    { id: "meet-celen", label: l("Comparer vos relevés avec ceux de Celen", "Compare your readings with Celen's"), effects: [{ op: "set", path: "flags.metCelen", value: true }, { op: "increment", path: "relationships.celen", value: 1 }], result: { text: l("Celen superpose le plan moderne aux marques du mur. Les lignes ne coïncident qu'à une condition : les vannes ont été réglées pour laisser le temps aux quartiers hauts, et non aux autres.", "Celen overlays the modern plan on the wall marks. The lines align on one condition only: sluices were set to give time to high wards, not the others.") } },
    { id: "trace-old-flood-angle", label: l("Tracer l'angle de l'ancienne vague", "Trace the old wave's angle"), requires: { path: "state.flags.metCelen", equals: true }, effects: [{ op: "addUnique", path: "clues", value: "flood_marks" }, { op: "increment", path: "expedition.fatigue", value: 1 }], result: { text: l("Le tracé rejoint la vanne sous le grand pont et l'escalier des portes basses. Les boucliers actuels n'ont pas inventé un chemin : ils remettent en marche une géométrie de sacrifice.", "The trace reaches the sluice beneath the great bridge and the low-gates stair. Today's shields did not invent a path: they restart a geometry of sacrifice.") } },
    { id: "marks-to-causeway", label: l("Rejoindre la chaussée par la porte de cave", "Reach the causeway through the cellar door"), to: "forgotten_causeway" },
    { id: "marks-to-lift", label: l("Suivre Celen vers l'ascenseur de laiton", "Follow Celen to the brass lift"), requires: { path: "state.flags.metCelen", equals: true }, to: "brass_lift" },
  ],
  quiet_school: [
    { id: "meet-letha", label: l("Lire avec Letha les adresses effacées", "Read the erased addresses with Letha"), effects: [{ op: "set", path: "flags.metLetha", value: true }, { op: "increment", path: "relationships.letha", value: 1 }, { op: "increment", path: "expedition.morale", value: 1 }], result: { text: l("Letha vous fait prononcer les adresses lentement. Certaines personnes âgées les corrigent, d'autres pleurent sans bruit. Vous comprenez que restituer une carte ne suffit pas : il faut aussi restituer le droit d'y être attendu.", "Letha has you pronounce the addresses slowly. Some elders correct them; others weep without sound. You understand restoring a map is not enough: the right to be expected there must also be restored.") } },
    { id: "copy-quiet-roll", label: l("Copier la liste des personnes jamais averties", "Copy the roll of people never warned"), requires: { path: "state.flags.metLetha", equals: true }, effects: [{ op: "addUnique", path: "clues", value: "quiet_roll" }, { op: "increment", path: "expedition.morale", value: -1 }], result: { text: l("La liste ne prouve pas seulement l'absence d'alerte : elle prouve la continuité des absences. Les mêmes familles ont été laissées hors de la procédure pendant deux générations.", "The roll proves not only an absence of warning, but a continuity of absences. The same families were left outside procedure for two generations.") } },
    { id: "school-to-assembly", label: l("Rejoindre l'assemblée avec les noms retrouvés", "Join the assembly with the recovered names"), requires: { path: "state.flags.metMarwen", equals: true }, to: "fifth_quarter_assembly" },
    { id: "school-to-kitchen", label: l("Revenir vers la cuisine par la cour", "Return to the kitchen through the yard"), to: "witness_kitchen" },
  ],
  forgotten_causeway: [
    { id: "causeway-to-understreet", label: l("Descendre sous les rues par le passage de service", "Descend beneath the streets by the service passage"), to: "understreet_lift" },
    { id: "causeway-to-ossuary", label: l("Suivre les jarres de limon jusqu'à l'ossuaire", "Follow the silt jars to the ossuary"), to: "tide_ossuary" },
    { id: "causeway-to-kitchen", label: l("Revenir porter des nouvelles à la cuisine", "Return to bring news to the kitchen"), to: "witness_kitchen" },
  ],
  echo_vault: [
    { id: "read-silent-trial", label: l("Lire le protocole des essais silencieux", "Read the silent-trial protocol"), effects: [{ op: "addUnique", path: "clues", value: "silence_trials" }, { op: "increment", path: "expedition.alert", value: 1 }], result: { text: l("Le protocole montre qu'une alerte pouvait être coupée rue par rue. Le Conseil n'a pas simplement accepté un risque : il a appris à distribuer le droit d'entendre le danger.", "The protocol shows a warning could be cut street by street. The Council did not simply accept a risk: it learned to distribute the right to hear danger.") } },
    { id: "vault-to-assembly", label: l("Porter le protocole devant l'assemblée", "Bring the protocol before the assembly"), requires: { path: "state.flags.metMarwen", equals: true }, to: "fifth_quarter_assembly" },
    { id: "vault-to-scriptorium", label: l("Revenir aux registres avant que Tovar ferme", "Return to the ledgers before Tovar closes"), to: "ledger_scriptorium" },
  ],
  brass_lift: [
    { id: "repair-brass-lift", label: l("Dégager les contrepoids et prendre l'ascenseur", "Clear the counterweights and take the lift"), requires: { path: "state.expedition.supplies", atLeast: 1 }, effects: [{ op: "increment", path: "expedition.supplies", value: -1 }, { op: "increment", path: "expedition.fatigue", value: 1 }], to: "understreet_lift" },
    { id: "lift-to-gates", label: l("Faire monter la cage jusqu'aux mécanismes des portes", "Raise the cage to the gate mechanisms"), requires: { path: "state.flags.metCelen", equals: true }, to: "gate_chamber" },
    { id: "lift-to-marks", label: l("Redescendre vérifier les marques avec Celen", "Descend to check the marks with Celen"), to: "flood_marks_house" },
  ],
  understreet_lift: [
    { id: "understreet-to-signals", label: l("Suivre le conduit de verre jusqu'aux signaux", "Follow the glass conduit to the signals"), to: "signal_gallery" },
    { id: "understreet-to-gates", label: l("Rejoindre la chambre des portes par l'arrière", "Reach the gate chamber from behind"), to: "gate_chamber" },
    { id: "understreet-to-assembly", label: l("Remonter annoncer comment la machine choisit", "Climb back to explain how the machine chooses"), requires: { path: "state.flags.metMarwen", equals: true }, to: "fifth_quarter_assembly" },
  ],
  fifth_quarter_assembly: [
    { id: "convene-vire-witnesses", label: l("Laisser l'assemblée décider de sa parole", "Let the assembly decide its own testimony"), requires: { all: [{ path: "state.flags.metMarwen", equals: true }, { path: "state.flags.metTovar", equals: true }, { any: [{ path: "state.clues", includes: "silence_trials" }, { path: "state.clues", includes: "vire_proceedings" }, { path: "state.clues", includes: "quiet_roll" }] }] }, effects: [{ op: "addUnique", path: "clues", value: "vire_witnesses" }, { op: "set", path: "flags.vireAssembly", value: true }, { op: "increment", path: "expedition.morale", value: 2 }], result: { text: l("L'assemblée refuse le récit unique. Marwen parlera des familles, Tovar des signatures, Letha des noms et Celen des lignes d'eau. Votre dossier cesse d'être une arme tenue par le groupe : il devient un engagement porté par celles et ceux qu'il concerne.", "The assembly refuses a single story. Marwen will speak of families, Tovar of signatures, Letha of names, and Celen of water lines. Your case stops being a weapon held by the party: it becomes a commitment carried by those it concerns.") } },
    { id: "assembly-to-council", label: l("Accompagner les délégués jusqu'à l'antichambre", "Accompany the delegates to the antechamber"), requires: { path: "state.flags.vireAssembly", equals: true }, to: "council_antechamber" },
    { id: "assembly-to-terrace", label: l("Envoyer les mesures vers la terrasse des boucliers", "Send the measurements to the shield terrace"), requires: { path: "state.clues", includes: "flood_marks" }, to: "shield_terrace" },
    { id: "assembly-to-kitchen", label: l("Rester encore un instant dans la cuisine", "Stay a little longer in the kitchen"), to: "witness_kitchen" },
  ],
};

const FOURTH_LORE_CHOICES = {
  forgotten_causeway: [
    { id: "causeway-to-retention", label: l("Passer la porte de retenue sous les cloches muettes", "Pass through the retention gate beneath the silent bells"), to: "retention_gate" },
  ],
  drowned_mailroom: [
    { id: "mailroom-to-relief-quay", label: l("Suivre les convocations jusqu'au quai du secours", "Follow the summons to the relief quay"), requires: { path: "state.clues", includes: "first_exiles" }, to: "relief_quay" },
  ],
  understreet_lift: [
    { id: "understreet-to-names-reservoir", label: l("Suivre les conduits jusqu'au réservoir des noms", "Follow the conduits to the reservoir of names"), requires: { path: "state.flags.metMarwen", equals: true }, to: "names_reservoir" },
  ],
  retention_gate: [
    { id: "retention-to-waterkeepers", label: l("Entrer dans la cour des gardiens d'eau", "Enter the waterkeepers' court"), to: "waterkeepers_court" },
    { id: "retention-to-weighbridge", label: l("Suivre les rails jusqu'au pont-bascule", "Follow the rails to the tally weighbridge"), to: "tally_weighbridge" },
  ],
  waterkeepers_court: [
    { id: "meet-miren", label: l("Écouter Miren compter les seaux qui manquent", "Listen as Miren counts the missing buckets"), effects: [{ op: "set", path: "flags.metMiren", value: true }, { op: "increment", path: "relationships.miren", value: 1 }], result: { text: l("Miren ne vous donne aucun chiffre avant de vous montrer les seaux vides. « Les registres commencent par des colonnes, dit-elle. La faim commence par une poignée qui ne trouve rien à soulever. » Vous comprenez qu'elle ne défend pas un système d'eau : elle défend des gens contre la manière dont ce système les mesure.", "Miren gives you no figure before showing you the empty buckets. “Ledgers begin with columns,” she says. “Hunger begins with a hand that finds nothing to lift.” You understand she does not defend a water system: she defends people against the way it measures them.") } },
    { id: "read-ration-marks", label: l("Comparer les marques de ration aux symboles de quartier", "Compare ration marks to ward symbols"), requires: { path: "state.flags.metMiren", equals: true }, effects: [{ op: "addUnique", path: "clues", value: "ration_marks" }, { op: "increment", path: "relationships.miren", value: 1 }], result: { text: l("Les encoches révèlent une règle masquée en calcul : les quartiers sans sceau recevaient moins d'eau avant même qu'une crue ne les menace. Miren vous laisse recopier les marques, mais garde l'original dans la cour. « Une preuve doit pouvoir revenir chez ceux qu'elle concerne. »", "The notches reveal a rule disguised as calculation: wards without a seal received less water before any flood threatened them. Miren lets you copy the marks, but keeps the original in the court. “Evidence must be able to return to those it concerns.”") } },
    { id: "court-to-brass-garden", label: l("Porter les plants filtrants jusqu'au jardin de laiton", "Carry filtering plants to the brass garden"), to: "brass_garden" },
  ],
  tally_weighbridge: [
    { id: "free-weighbridge-counter", label: l("Dégager le contrepoids et lire les chiffres martelés", "Free the counterweight and read the hammered figures"), effects: [{ op: "addUnique", path: "clues", value: "ration_marks" }, { op: "increment", path: "expedition.fatigue", value: 1 }], result: { text: l("Sous la poussière de plomb, vous retrouvez la même logique que dans la cour : un poids différent pour des maisons pourtant reliées à la même eau. Le privilège n'était pas une exception de crise; il était inscrit dans la machine.", "Beneath lead dust, you find the same logic as in the court: a different weight for houses connected to the same water. Privilege was not a crisis exception; it was written into the machine.") } },
    { id: "weighbridge-to-reservoir", label: l("Descendre vers le bassin où les plaquettes attendent", "Descend to the basin where plaques wait"), to: "names_reservoir" },
    { id: "weighbridge-to-overflow", label: l("Suivre le canal de dérivation vers le trop-plein", "Follow the diversion channel to the overflow"), to: "overflow_gallery" },
  ],
  brass_garden: [
    { id: "garden-to-chapel", label: l("Préparer des fioles et gagner la chapelle du brise-lame", "Prepare vials and go to the breakwater chapel"), to: "breakwater_chapel" },
    { id: "garden-to-court", label: l("Revenir vers Miren avec les racines filtrantes", "Return to Miren with filtering roots"), to: "waterkeepers_court" },
  ],
  names_reservoir: [
    { id: "turn-names-outward", label: l("Retourner les plaquettes de Vire-Basse vers la lumière", "Turn Low Vire's plaques toward the light"), requires: { path: "state.flags.metMarwen", equals: true }, effects: [{ op: "increment", path: "expedition.morale", value: 1 }, { op: "increment", path: "relationships.marwen", value: 1 }], result: { text: l("Vous ne prenez aucun nom. Vous les tournez simplement vers le passage, afin que les personnes qui vivent encore ici puissent les lire en entrant. Ce geste ne répare pas la liste; il lui retire au moins la complicité de l'ombre.", "You take no names. You simply turn them toward the passage so people still living here may read them as they enter. The gesture does not repair the list; it at least takes shadow's complicity from it.") } },
    { id: "reservoir-to-storm-registry", label: l("Chercher les délais d'alerte dans le registre des orages", "Seek warning delays in the storm registry"), to: "storm_registry" },
    { id: "reservoir-to-pledges", label: l("Descendre dans la chambre des engagements", "Descend into the pledge chamber"), to: "pledge_chamber" },
  ],
  storm_registry: [
    { id: "meet-sera", label: l("Demander à Sera pourquoi elle classe les retards", "Ask Sera why she files delays"), effects: [{ op: "set", path: "flags.metSera", value: true }, { op: "increment", path: "relationships.sera", value: 1 }], result: { text: l("Sera ne se défend pas d'avoir copié les listes. Elle vous montre la couleur d'encre utilisée pour chaque délai et murmure : « On peut faire d'un retard une fatalité si l'on ne note jamais qui l'a décidé. » Elle a gardé les preuves assez longtemps pour que quelqu'un puisse enfin les regarder.", "Sera does not defend having copied the lists. She shows you the ink colour used for each delay and whispers: “You can make a delay into fate if you never record who decided it.” She kept the evidence long enough for someone finally to look at it.") } },
    { id: "collate-delayed-roll", label: l("Recopier la liste des alertes arrivées trop tard", "Copy the roll of warnings delivered too late"), requires: { path: "state.flags.metSera", equals: true }, effects: [{ op: "addUnique", path: "clues", value: "delayed_roll" }, { op: "increment", path: "relationships.sera", value: 1 }], result: { text: l("La colonne des retards rejoint les noms de Letha et les convocations d'Oren. Ce n'est plus une succession de négligences : c'est une technique pour faire arriver la peur après la décision.", "The delay column joins Letha's names and Oren's summons. This is no longer a succession of oversights: it is a technique for making fear arrive after the decision.") } },
    { id: "registry-to-rain-chain", label: l("Suivre le conduit d'alerte jusqu'à la chaîne de pluie", "Follow the warning conduit to the rain chain"), to: "rain_chain" },
  ],
  pledge_chamber: [
    { id: "restore-common-pledge", label: l("Allumer la lanterne laissée vide et restaurer l'engagement commun", "Light the empty lantern and restore the common pledge"), requires: { all: [{ path: "state.clues", includes: "ration_marks" }, { path: "state.clues", includes: "delayed_roll" }] }, effects: [{ op: "addUnique", path: "clues", value: "mutual_oath" }, { op: "increment", path: "expedition.morale", value: 2 }], result: { text: l("La lanterne de Vire-Basse n'efface aucun contrat ancien. Elle rend simplement visible la phrase qu'ils avaient tous supprimée : aucune porte, aucune barque, aucune cloche ne peut être réservée à ceux qui possèdent déjà le droit de parler.", "Low Vire's lantern erases no old contract. It merely makes visible the sentence they had all removed: no gate, boat, or bell may be reserved for those who already possess the right to speak.") } },
    { id: "pledges-to-assembly", label: l("Porter l'engagement jusqu'à l'assemblée du cinquième quartier", "Carry the pledge to the fifth ward assembly"), requires: { path: "state.clues", includes: "mutual_oath" }, to: "fifth_quarter_assembly" },
    { id: "pledges-to-registry", label: l("Remonter vérifier les signatures dans le registre", "Go back up to verify signatures in the registry"), to: "storm_registry" },
  ],
  relief_quay: [
    { id: "meet-pavos", label: l("Aider Pavos à mettre sa barque à l'eau sans la déclarer", "Help Pavos launch his boat without declaring it"), effects: [{ op: "set", path: "flags.metPavos", value: true }, { op: "increment", path: "relationships.pavos", value: 1 }], result: { text: l("Pavos vous fait tenir l'amarre pendant qu'il vérifie les avirons. Il a livré des sacs de farine pour des gens dont les noms n'apparaissaient sur aucun ordre. « Les listes sont utiles, dit-il. Mais une barque doit parfois partir avant qu'elles aient fini de discuter. »", "Pavos has you hold the mooring while he checks the oars. He delivered flour to people whose names appeared on no order. “Lists are useful,” he says. “But a boat sometimes has to leave before they have finished arguing.”") } },
    { id: "map-relief-route", label: l("Tracer avec Pavos la route des portes ouvertes", "Map the open-door route with Pavos"), requires: { path: "state.flags.metPavos", equals: true }, effects: [{ op: "addUnique", path: "clues", value: "relief_routes" }, { op: "increment", path: "relationships.pavos", value: 1 }], result: { text: l("Sa carte ne désigne pas seulement les quais : elle note les fenêtres, les escaliers, les cuisines qui gardent une clef. Elle rejoint le plan de Hara et transforme l'après-crue en chose que les habitants peuvent préparer ensemble.", "His map marks more than quays: it notes windows, stairs, kitchens that keep a key. It joins Hara's plan and turns the aftermath of flood into something residents can prepare together.") } },
    { id: "quay-to-rain-chain", label: l("Suivre les godets jusqu'à la chaîne de pluie", "Follow the cups to the rain chain"), to: "rain_chain" },
  ],
  rain_chain: [
    { id: "chain-to-signal-gallery", label: l("Remonter le conduit jusqu'à la galerie des signaux", "Climb the conduit to the signal gallery"), to: "signal_gallery" },
    { id: "chain-to-overflow", label: l("Redescendre vers la galerie du trop-plein", "Descend to the overflow gallery"), to: "overflow_gallery" },
  ],
  breakwater_chapel: [
    { id: "chapel-to-hospice", label: l("Porter les fioles vers l'hospice des Lanternes", "Carry the vials to the Lanterns hospice"), to: "lantern_hospice" },
    { id: "chapel-to-relief-quay", label: l("Rejoindre le quai du secours par la digue", "Reach the relief quay along the breakwater"), to: "relief_quay" },
  ],
  overflow_gallery: [
    { id: "trace-overflow-pressure", label: l("Suivre les graffitis jusqu'à la pression des boucliers", "Follow the graffiti to the shields' pressure"), requires: { path: "state.clues", includes: "flood_marks" }, effects: [{ op: "increment", path: "relationships.celen", value: 1 }], result: { text: l("Les flèches des bateliers confirment les mesures de Celen : le trop-plein peut soulager les portes si quelqu'un accepte de ne plus traiter les rues basses comme un bassin de trop. Vous avez désormais une route, mais aussi les personnes qu'elle concerne.", "The boatmen's arrows confirm Celen's readings: the overflow can ease the gates if someone stops treating low streets as a surplus basin. You now have a route, but also the people it concerns.") } },
    { id: "overflow-to-gates", label: l("Rejoindre la chambre des portes par le déversoir", "Reach the gate chamber through the overflow"), to: "gate_chamber" },
    { id: "overflow-to-terrace", label: l("Monter vers la terrasse des boucliers", "Climb to the shield terrace"), to: "shield_terrace" },
  ],
};

const FIFTH_LORE_CHOICES = {
  storm_registry: [
    { id: "registry-to-dawn-portal", label: l("Suivre les anciens délais jusqu'au portail de l'aube", "Follow the old delays to the dawn portal"), requires: { path: "state.clues", includes: "delayed_roll" }, to: "dawn_portal" },
  ],
  water_clock: [
    { id: "clock-to-dawn-market", label: l("Monter vers le marché de l'aube par les toits", "Climb to the dawn market by the rooftops"), requires: { path: "state.clues", includes: "unseen_bell" }, to: "dawn_market" },
  ],
  dawn_portal: [
    { id: "portal-to-bellkeepers", label: l("Entrer dans la cour des sonneurs", "Enter the bellkeepers' yard"), to: "bellkeepers_yard" },
    { id: "portal-to-unheard-stairs", label: l("Prendre les escaliers des sans-voix", "Take the unheard stairs"), to: "unheard_stairs" },
  ],
  bellkeepers_yard: [
    { id: "meet-veyra", label: l("Écouter Veyra peser les cloches avant de parler", "Listen as Veyra weighs the bells before speaking"), effects: [{ op: "set", path: "flags.metVeyra", value: true }, { op: "increment", path: "relationships.veyra", value: 1 }], result: { text: l("Veyra pose une grosse cloche dans vos mains, puis une petite. « On ne leur demandait pas de dire la même chose, dit-elle. On leur demandait de dire qui comptait assez pour entendre. » Elle vous laisse toucher les fissures qui ont rendu ce tri possible.", "Veyra places a large bell in your hands, then a small one. “They were not asked to say the same thing,” she says. “They were asked to say who mattered enough to hear.” She lets you touch the cracks that made this sorting possible.") } },
    { id: "read-double-chime", label: l("Comparer les deux timbres interdits", "Compare the two forbidden chimes"), requires: { path: "state.flags.metVeyra", equals: true }, effects: [{ op: "addUnique", path: "clues", value: "double_chime" }, { op: "increment", path: "relationships.veyra", value: 1 }], result: { text: l("Les deux cloches ont été accordées pour partir ensemble, puis séparées par ordre. L'une appelait les quais hauts à préparer leurs portes; l'autre ne devait atteindre les rues basses qu'une fois la décision déjà prise.", "The two bells were tuned to begin together, then separated by order. One called the high quays to prepare their gates; the other was meant to reach low streets only after the decision had already been made.") } },
    { id: "yard-to-chime-gallery", label: l("Suivre les câbles vers la galerie des carillons", "Follow the cables to the chime gallery"), to: "cracked_chime_gallery" },
  ],
  cracked_chime_gallery: [
    { id: "gallery-to-relay-conservatory", label: l("Remonter les fils jusqu'au conservatoire des relais", "Follow the wires up to the relay conservatory"), to: "relay_conservatory" },
    { id: "gallery-to-blue-workshop", label: l("Chercher le verre qui relayait les sons brisés", "Seek the glass that relayed broken sounds"), to: "blue_window_workshop" },
  ],
  dawn_market: [
    { id: "meet-salma", label: l("Demander à Salma quelles lanternes furent achetées avant les crues", "Ask Salma which lanterns were bought before floods"), effects: [{ op: "set", path: "flags.metSalma", value: true }, { op: "increment", path: "relationships.salma", value: 1 }], result: { text: l("Salma ne donne pas de nom sans ouvrir d'abord une lanterne. À l'intérieur, une mèche porte une adresse enroulée. Elle vous montre les lots destinés aux quartiers hauts, puis ceux qui sont revenus intacts : personne n'avait reçu l'ordre de les allumer.", "Salma gives no name before opening a lantern. Inside, a wick bears a rolled address. She shows you lots intended for high wards, then those returned untouched: no one had received an order to light them.") } },
    { id: "market-to-courier-roof", label: l("Suivre les poulies jusqu'au toit des coursiers", "Follow the pulleys to the couriers' roof"), to: "courier_roof" },
    { id: "market-to-blue-workshop", label: l("Porter une lanterne cassée à l'atelier", "Carry a broken lantern to the workshop"), to: "blue_window_workshop" },
  ],
  courier_roof: [
    { id: "meet-iven", label: l("Aider Iven à ouvrir les boîtes de dépêches refusées", "Help Iven open the boxes of refused dispatches"), effects: [{ op: "set", path: "flags.metIven", value: true }, { op: "increment", path: "relationships.iven", value: 1 }], result: { text: l("Iven vous fait lire les avis en silence. Certains ont été pliés, d'autres brûlés sur un coin, mais tous portent l'heure à laquelle ils auraient dû quitter le toit. Il ne demande pas à être pardonné; il demande si vous saurez quoi faire d'une faute qui possède autant de dates.", "Iven has you read the notices in silence. Some were folded, others singed at one corner, but all bear the hour they should have left the roof. He does not ask forgiveness; he asks whether you will know what to do with a fault that has so many dates.") } },
    { id: "open-night-dispatch", label: l("Classer les dépêches retenues de nuit", "Sort the dispatches held through the night"), requires: { path: "state.flags.metIven", equals: true }, effects: [{ op: "addUnique", path: "clues", value: "night_dispatch" }, { op: "increment", path: "relationships.iven", value: 1 }], result: { text: l("Les messages montrent que le second timbre n'était pas un accident de mécanisme : des coureurs avaient reçu l'ordre d'attendre l'aube, assez longtemps pour que les rues basses ne puissent plus préparer leurs barques.", "The messages show the second chime was not a mechanical accident: runners were ordered to wait for dawn, long enough that low streets could no longer prepare their boats.") } },
    { id: "roof-to-message-bridge", label: l("Prendre le câble de service jusqu'au pont des messages", "Take the service cable to the message bridge"), to: "message_bridge" },
  ],
  relay_conservatory: [
    { id: "trace-relay-colors", label: l("Suivre les fils qui évitaient les quartiers bas", "Trace the threads that bypassed the lower wards"), effects: [{ op: "addUnique", path: "clues", value: "double_chime" }, { op: "increment", path: "expedition.alert", value: 1 }], result: { text: l("Les couleurs du modèle recoupent les fissures des carillons. On n'a pas supprimé l'alerte : on l'a redessinée pour que certains fils puissent faire semblant de ne jamais avoir existé.", "The model's colours match the chimes' cracks. Warning was not removed: it was redrawn so some threads could pretend never to have existed.") } },
    { id: "conservatory-to-cistern", label: l("Descendre écouter la citerne des voix", "Descend to listen to the cistern of voices"), to: "voices_cistern" },
    { id: "conservatory-to-first-light", label: l("Monter vers la chambre de première lumière", "Climb to the first-light chamber"), to: "first_light_chamber" },
  ],
  voices_cistern: [
    { id: "restore-common-signal", label: l("Faire se rejoindre les voix et restaurer le signal commun", "Bring the voices together and restore the common signal"), requires: { all: [{ path: "state.clues", includes: "double_chime" }, { path: "state.clues", includes: "night_dispatch" }] }, effects: [{ op: "addUnique", path: "clues", value: "common_signal" }, { op: "increment", path: "expedition.morale", value: 2 }], result: { text: l("Dans les niches opposées, les voix se répondent jusqu'à former un seul appel. Ce n'est pas encore une alerte en marche, mais son principe ne peut plus être nié : une ville ne prévient pas lorsqu'elle parle assez fort; elle prévient lorsqu'elle parle à tout le monde.", "From opposite niches, voices answer one another until they form a single call. It is not yet a working alarm, but its principle can no longer be denied: a city warns not when it speaks loudly enough, but when it speaks to everyone.") } },
    { id: "cistern-to-tribune", label: l("Porter le principe du signal jusqu'à la tribune", "Carry the signal's principle to the tribune"), requires: { path: "state.clues", includes: "common_signal" }, to: "civic_tribune" },
    { id: "cistern-to-workshop", label: l("Chercher une fenêtre bleue pour les jours de pluie", "Seek a blue window for rainy days"), to: "blue_window_workshop" },
  ],
  blue_window_workshop: [
    { id: "match-blue-glass", label: l("Comparer le verre aux échantillons de Siren", "Match the glass to Siren's samples"), requires: { path: "state.flags.metSiren", equals: true }, effects: [{ op: "addUnique", path: "clues", value: "common_signal" }, { op: "increment", path: "relationships.siren", value: 1 }], result: { text: l("Le bleu est identique, mais son usage était inverse : ici il rendait l'alerte visible sous la pluie; dans le limon, il prouve qu'une telle lumière avait été préparée puis refusée. Une même matière peut porter une promesse ou son abandon.", "The blue is identical, but its use was reversed: here it made warning visible in rain; in the silt, it proves such light was prepared then withheld. One material can carry a promise or its abandonment.") } },
    { id: "workshop-to-tribune", label: l("Porter une fenêtre réparée à la tribune", "Carry a repaired window to the tribune"), to: "civic_tribune" },
  ],
  civic_tribune: [
    { id: "read-names-at-tribune", label: l("Lire les rues absentes à la tribune", "Read the absent streets at the tribune"), requires: { any: [{ path: "state.clues", includes: "common_signal" }, { path: "state.flags.vireAssembly", equals: true }] }, effects: [{ op: "increment", path: "expedition.morale", value: 1 }], result: { text: l("Vous ne prononcez pas une accusation générale. Vous lisez les rues une à une, et les échos remontent des venelles. Salma, Veyra et les délégués de Vire-Basse complètent les noms là où votre dossier se tait.", "You do not pronounce a general accusation. You read the streets one by one, and echoes rise from the lanes. Salma, Veyra, and Low Vire's delegates complete the names where your case falls silent.") } },
    { id: "tribune-to-message-bridge", label: l("Rejoindre le pont des messages", "Reach the message bridge"), to: "message_bridge" },
    { id: "tribune-to-council", label: l("Gagner l'antichambre du Conseil par les toits", "Reach the Council antechamber by the rooftops"), requires: { path: "state.clues", includes: "common_signal" }, to: "council_antechamber" },
  ],
  message_bridge: [
    { id: "bridge-to-city-steps", label: l("Faire descendre les nouvelles jusqu'aux marches de la ville", "Send the news down to the city steps"), to: "city_steps" },
    { id: "bridge-to-courier-locker", label: l("Suivre les paniers vers le casier du coursier", "Follow the baskets to the courier's locker"), to: "courier_locker" },
  ],
  unheard_stairs: [
    { id: "stairs-to-first-light", label: l("Poursuivre jusqu'à la chambre de première lumière", "Continue to the first-light chamber"), to: "first_light_chamber" },
    { id: "stairs-to-market", label: l("Redescendre vers le marché de l'aube", "Descend to the dawn market"), to: "dawn_market" },
  ],
  first_light_chamber: [
    { id: "align-first-light", label: l("Orienter les miroirs vers toutes les fenêtres", "Turn the mirrors toward every window"), requires: { path: "state.clues", includes: "common_signal" }, effects: [{ op: "increment", path: "expedition.alert", value: -1 }, { op: "increment", path: "expedition.morale", value: 1 }], result: { text: l("Les miroirs ne lancent aucune alerte sans la cloche, mais ils restaurent la possibilité d'une lumière commune. En bas, les fenêtres bleues répondent une à une. Ce n'est pas encore la justice; c'est une ville qui commence à refuser de regarder ailleurs.", "The mirrors send no alert without the bell, but they restore the possibility of a common light. Below, blue windows answer one by one. It is not yet justice; it is a city beginning to refuse looking away.") } },
    { id: "first-light-to-signals", label: l("Suivre le conduit jusqu'à la galerie des signaux", "Follow the conduit to the signal gallery"), to: "signal_gallery" },
    { id: "first-light-to-tribune", label: l("Revenir vers la tribune avec les miroirs ouverts", "Return to the tribune with the mirrors open"), to: "civic_tribune" },
  ],
};

const SIXTH_LORE_CHOICES = {
  sluice_workshop: [
    { id: "workshop-to-makers-basin", label: l("Suivre les ouvriers vers la porte des Faiseurs", "Follow the workers to the Makers' gate"), requires: { path: "state.flags.exposedWorkers", equals: true }, to: "makers_gate" },
  ],
  counterweight_loft: [
    { id: "loft-to-makers-basin", label: l("Prendre l'escalier de chaîne vers les ateliers", "Take the chain stair to the workshops"), to: "makers_gate" },
  ],
  brass_garden: [
    { id: "garden-to-clay-map", label: l("Suivre les tuyaux de culture jusqu'aux plans d'argile", "Follow the cultivation pipes to the clay maps"), requires: { path: "state.flags.metCelen", equals: true }, to: "clay_map_room" },
  ],
  makers_gate: [
    { id: "makers-to-tool-court", label: l("Entrer dans la cour des outils", "Enter the tool court"), to: "tool_court" },
    { id: "makers-to-waterwright-archive", label: l("Chercher les plans dans les archives des hydrauliciens", "Seek plans in the waterwrights' archive"), to: "waterwright_archive" },
  ],
  tool_court: [
    { id: "meet-roul", label: l("Demander à Roul de reconnaître les poinçons des marteaux", "Ask Roul to identify the hammers' stamps"), effects: [{ op: "set", path: "flags.metRoul", value: true }, { op: "increment", path: "relationships.roul", value: 1 }], result: { text: l("Roul ne regarde pas les têtes de marteau, mais le bois des manches. Trois ont été changés par une équipe qui n'existait sur aucun registre. « On ne falsifie pas seulement une signature, dit-il. On falsifie les mains qui auraient dû pouvoir dire non. »", "Roul looks not at hammer heads but at the wood of their handles. Three were changed by a crew that appears in no ledger. “You do not only forge a signature,” he says. “You forge the hands that should have been able to say no.”") } },
    { id: "read-forged-stamps", label: l("Comparer les poinçons aux ordres de chantier", "Compare the stamps to work orders"), requires: { path: "state.flags.metRoul", equals: true }, effects: [{ op: "addUnique", path: "clues", value: "forged_orders" }, { op: "increment", path: "relationships.roul", value: 1 }], result: { text: l("Les poinçons prouvent que les ordres de fragiliser les chaînes ont été attribués à des ouvriers absents. Le sabotage devait produire des coupables pratiques avant de produire une catastrophe.", "The stamps prove orders to weaken the chains were attributed to workers who were absent. Sabotage was meant to produce convenient culprits before it produced catastrophe.") } },
    { id: "court-to-chain-foundry", label: l("Suivre Roul jusqu'à la fonderie des chaînes", "Follow Roul to the chain foundry"), to: "chain_foundry" },
  ],
  chain_foundry: [
    { id: "test-notched-link", label: l("Tester le maillon rainuré dans l'eau froide", "Test the grooved link in cold water"), effects: [{ op: "addUnique", path: "clues", value: "forged_orders" }, { op: "increment", path: "expedition.fatigue", value: 1 }], result: { text: l("Le maillon cède exactement là où l'ordre falsifié le promettait. La preuve est matérielle, mais elle accuse aussi une méthode : faire porter au métal et aux ouvriers la faute d'une décision prise ailleurs.", "The link gives exactly where the forged order promised it would. The proof is physical, but it also indicts a method: making metal and workers bear blame for a decision taken elsewhere.") } },
    { id: "foundry-to-underforge", label: l("Descendre porter le maillon à la forge basse", "Carry the link down to the underforge"), to: "underforge" },
    { id: "foundry-to-bellows", label: l("Monter vérifier les soufflets", "Climb to inspect the bellows"), to: "bellows_loft" },
  ],
  bellows_loft: [
    { id: "meet-nyma", label: l("Écouter Nyma réciter les consignes qu'on a effacées", "Listen as Nyma recites the erased safety rules"), effects: [{ op: "set", path: "flags.metNyma", value: true }, { op: "increment", path: "relationships.nyma", value: 1 }], result: { text: l("Nyma connaît les premières lignes du chant de travail et bute sur la dernière. Elle refuse de l'inventer. « Si l'on répare quelque chose, dit-elle, il faut aussi savoir qui doit arrêter le travail quand cela recommence à blesser. »", "Nyma knows the first lines of the work song and falters on the last. She refuses to invent it. “If we repair something,” she says, “we must also know who gets to stop work when it starts hurting again.”") } },
    { id: "recover-safety-verse", label: l("Retrouver le dernier vers dans les copies cachées", "Recover the final verse from hidden copies"), requires: { path: "state.flags.metNyma", equals: true }, effects: [{ op: "addUnique", path: "clues", value: "workers_oath" }, { op: "increment", path: "relationships.nyma", value: 1 }], result: { text: l("Le dernier vers n'est pas une prière : il ordonne de suspendre toute manœuvre si les personnes en aval ne peuvent pas être averties. Les apprentis avaient reçu le droit de refuser avant qu'un protocole ne le leur retire.", "The final verse is not a prayer: it orders every manoeuvre halted if people downstream cannot be warned. Apprentices once held a right to refuse before protocol took it away.") } },
    { id: "loft-to-dormitory", label: l("Redescendre vers le dortoir des apprentis", "Descend to the apprentices' dormitory"), to: "apprentice_dormitory" },
  ],
  waterwright_archive: [
    { id: "read-original-pact", label: l("Déplier le pacte d'origine des portes", "Unfold the gates' original pact"), effects: [{ op: "addUnique", path: "clues", value: "workers_oath" }, { op: "increment", path: "relationships.celen", value: 1 }], result: { text: l("Le pacte associe les mesures de Celen à une règle de métier : aucune pression ne doit être déplacée sans que les équipes et les quartiers concernés puissent la contester. Cette ville avait prévu une conscience dans ses mécanismes, puis l'a appelée inefficacité.", "The pact joins Celen's measures to a craft rule: no pressure may be shifted without crews and affected wards being able to challenge it. This city once placed a conscience in its mechanisms, then called it inefficiency.") } },
    { id: "archive-to-clay-map", label: l("Porter les plans à la salle d'argile", "Carry the plans to the clay map room"), to: "clay_map_room" },
    { id: "archive-to-guild-kitchen", label: l("Chercher les équipes dans la cuisine de la guilde", "Find the crews in the guild kitchen"), to: "guild_kitchen" },
  ],
  guild_kitchen: [
    { id: "meet-doro", label: l("Aider Doro à relire les listes de repas de nuit", "Help Doro reread the night meal lists"), effects: [{ op: "set", path: "flags.metDoro", value: true }, { op: "increment", path: "relationships.doro", value: 1 }], result: { text: l("Doro connaît chaque équipe par son pain préféré et par le silence qui suit son nom. Il vous montre que les ouvriers accusés du sabotage n'étaient pas sous les portes cette nuit-là. Ils étaient ici, à attendre une relève qui n'est jamais venue.", "Doro knows every crew by its preferred bread and by the silence after its name. He shows you the workers blamed for sabotage were not beneath the gates that night. They were here, waiting for a relief that never came.") } },
    { id: "kitchen-to-dormitory", label: l("Porter la soupe au dortoir des apprentis", "Carry soup to the apprentices' dormitory"), to: "apprentice_dormitory" },
    { id: "kitchen-to-worksong", label: l("Suivre les voix jusqu'à la chapelle des chants", "Follow the voices to the work-song chapel"), to: "worksong_chapel" },
  ],
  apprentice_dormitory: [
    { id: "dormitory-to-clay-map", label: l("Passer par la fenêtre vers la salle des plans", "Climb through the window to the map room"), to: "clay_map_room" },
    { id: "dormitory-to-worksong", label: l("Suivre les vers gravés jusqu'à la chapelle", "Follow the engraved verses to the chapel"), to: "worksong_chapel" },
  ],
  clay_map_room: [
    { id: "overlay-worker-routes", label: l("Superposer les routes ouvrières et les quartiers menacés", "Overlay worker routes and threatened wards"), requires: { path: "state.clues", includes: "workers_oath" }, effects: [{ op: "increment", path: "relationships.celen", value: 1 }, { op: "increment", path: "expedition.morale", value: 1 }], result: { text: l("Les équipes, les canaux et les rues de Vire-Basse forment enfin une seule carte. Les ouvriers ne sont pas un décor du complot : ils sont ceux qui peuvent empêcher la machine de recommencer, s'ils disposent de toutes les informations.", "Crews, canals, and Low Vire streets finally form one map. Workers are not scenery for the plot: they are those who can stop the machine repeating itself, if they hold all the information.") } },
    { id: "map-to-handspan", label: l("Rejoindre le pont d'une paume", "Reach the handspan bridge"), to: "handspan_bridge" },
    { id: "map-to-underforge", label: l("Descendre vérifier les gonds à la forge basse", "Descend to inspect hinges at the underforge"), to: "underforge" },
  ],
  underforge: [
    { id: "heat-false-order", label: l("Chauffer l'ordre falsifié pour révéler son métal", "Heat the forged order to reveal its metal"), requires: { path: "state.clues", includes: "forged_orders" }, effects: [{ op: "increment", path: "expedition.alert", value: 1 }], result: { text: l("Sous la chaleur, la contre-marque de Valdrick apparaît. Le faux ordre avait été conçu pour que les ouvriers se défendent entre eux pendant que les véritables responsables gagnaient du temps.", "Under heat, Valdrick's countermark appears. The false order was designed to make workers turn on one another while the real culprits gained time.") } },
    { id: "underforge-to-confluence", label: l("Suivre les conduites vers le puits de confluence", "Follow the conduits to the confluence shaft"), to: "confluence_shaft" },
    { id: "underforge-to-gates", label: l("Rejoindre les gonds de la chambre des portes", "Reach the gate-chamber hinges"), to: "gate_chamber" },
  ],
  handspan_bridge: [
    { id: "bridge-to-confluence", label: l("Traverser une personne à la fois vers la confluence", "Cross one at a time toward the confluence"), to: "confluence_shaft" },
    { id: "bridge-to-shields", label: l("Suivre la passerelle vers les boucliers", "Follow the catwalk to the shields"), to: "shield_terrace" },
  ],
  confluence_shaft: [
    { id: "confluence-to-signal-gallery", label: l("Suivre la conduite de voix jusqu'aux signaux", "Follow the voice conduit to the signals"), to: "signal_gallery" },
    { id: "confluence-to-gate-chamber", label: l("Rejoindre les portes par le puits", "Reach the gates through the shaft"), to: "gate_chamber" },
    { id: "confluence-to-worksong", label: l("Remonter porter les nouvelles à la chapelle", "Climb back to bring news to the chapel"), to: "worksong_chapel" },
  ],
  worksong_chapel: [
    { id: "renew-repair-covenant", label: l("Laisser les équipes renouveler le pacte de réparation", "Let the crews renew the repair covenant"), requires: { all: [{ path: "state.clues", includes: "workers_oath" }, { path: "state.clues", includes: "forged_orders" }] }, effects: [{ op: "addUnique", path: "clues", value: "repair_covenant" }, { op: "increment", path: "expedition.morale", value: 2 }, { op: "increment", path: "relationships.roul", value: 1 }, { op: "increment", path: "relationships.nyma", value: 1 }], result: { text: l("Roul laisse Nyma commencer le chant. Les équipes ne jurent pas d'obéir davantage : elles jurent de suspendre la machine lorsqu'une rue ne peut pas répondre. Pour la première fois, réparer les portes devient une décision partagée.", "Roul lets Nyma begin the song. The crews do not swear to obey more deeply: they swear to halt the machine when a street cannot answer. For the first time, repairing the gates becomes a shared decision.") } },
    { id: "chapel-to-gates", label: l("Accompagner les ouvriers jusqu'aux portes", "Accompany the workers to the gates"), requires: { path: "state.clues", includes: "repair_covenant" }, to: "gate_chamber" },
    { id: "chapel-to-kitchen", label: l("Revenir partager le repas avec la guilde", "Return to share a meal with the guild"), to: "guild_kitchen" },
  ],
};

const SEVENTH_LORE_CHOICES = {
  embassy_vestry: [
    { id: "vestry-to-lower-embassies", label: l("Descendre vers les ambassades qui ne figurent sur aucun plan", "Descend to the embassies absent from every map"), requires: { any: [{ path: "state.clues", includes: "council_ledger" }, { path: "state.clues", includes: "valdrick_manifest" }] }, to: "embassy_court" },
  ],
  black_lantern_pier: [
    { id: "pier-to-envoy-quay", label: l("Suivre la voile blanche jusqu'au quai des envoyés", "Follow the white sail to the envoys' quay"), requires: { path: "state.flags.metYorra", equals: true }, to: "quay_of_envoys" },
  ],
  embassy_court: [
    { id: "court-to-interpreters", label: l("Chercher les mots manquants au logis des interprètes", "Seek the missing words at the interpreters' lodge"), to: "interpreter_lodge" },
    { id: "court-to-larder", label: l("Suivre les caisses scellées jusqu'à l'office", "Follow the sealed crates to the larder"), to: "sealed_larder" },
    { id: "court-to-balcony", label: l("Monter voir les départs depuis le balcon des garanties", "Climb to watch departures from the guarantee balcony"), to: "pledge_balcony" },
  ],
  interpreter_lodge: [
    { id: "meet-tamsin", label: l("Écouter Tamsin traduire la clause qu'elle a refusée", "Listen as Tamsin translates the clause she refused"), effects: [{ op: "set", path: "flags.metTamsin", value: true }, { op: "increment", path: "relationships.tamsin", value: 1 }], result: { text: l("Tamsin pose deux versions de la même phrase côte à côte. Dans l'une, Souleyna garantit un refuge; dans l'autre, elle obtient le droit de choisir qui mérite de partir. Elle n'a pas quitté l'ambassade par courage soudain, mais parce qu'elle ne pouvait plus traduire ce mot sans entendre les personnes qu'il effaçait.", "Tamsin lays two versions of the same sentence side by side. In one, Souleyna guarantees refuge; in the other, it gains the right to choose who deserves to leave. She did not leave the embassy from sudden courage, but because she could no longer translate that word without hearing the people it erased.") } },
    { id: "lodge-to-treaty", label: l("Suivre Tamsin vers les archives du traité", "Follow Tamsin to the treaty archive"), requires: { path: "state.flags.metTamsin", equals: true }, to: "treaty_archive" },
    { id: "lodge-to-shadow-post", label: l("Chercher les doubles de dépêches au relais", "Seek duplicate dispatches at the post"), to: "shadow_post" },
  ],
  pledge_balcony: [
    { id: "balcony-to-envoy-quay", label: l("Descendre rejoindre la barque de Souleyna", "Descend to reach Souleyna's boat"), to: "quay_of_envoys" },
    { id: "balcony-to-guest-cells", label: l("Suivre les familles vers les chambres d'invités", "Follow the families to the guest cells"), to: "guest_cells" },
  ],
  sealed_larder: [
    { id: "read-larder-labels", label: l("Comparer les étiquettes de vivres aux rues disparues", "Compare the food labels to vanished streets"), effects: [{ op: "addUnique", path: "clues", value: "hostage_passage" }, { op: "increment", path: "expedition.alert", value: 1 }], result: { text: l("Les caisses ne sont pas une aide sans condition : elles sont retenues jusqu'à ce que certaines familles acceptent de quitter leurs rues. Les réserves de l'ambassade prolongent la crue par d'autres moyens.", "The crates are not unconditional aid: they are held until certain families agree to leave their streets. Embassy stores prolong the flood by other means.") } },
    { id: "larder-to-guest-cells", label: l("Porter une caisse aux chambres d'invités", "Carry a crate to the guest cells"), to: "guest_cells" },
    { id: "larder-to-court", label: l("Revenir dans la cour avec les étiquettes", "Return to the court with the labels"), to: "embassy_court" },
  ],
  guest_cells: [
    { id: "meet-avel", label: l("Demander à Avel quelles barques peuvent encore partir", "Ask Avel which boats can still leave"), effects: [{ op: "set", path: "flags.metAvel", value: true }, { op: "increment", path: "relationships.avel", value: 1 }], result: { text: l("Avel connaît les passagers par les sacs qu'ils n'ont pas le droit d'emporter. Il vous montre les horaires de marée et dit sans fard que chaque départ sauve des personnes tout en vidant une rue de ses témoins.", "Avel knows passengers by the bags they are not allowed to bring. He shows you tide times and says plainly that every departure saves people while emptying a street of its witnesses.") } },
    { id: "copy-passage-list", label: l("Copier les laissez-passer sans livrer les familles", "Copy the passes without surrendering the families"), requires: { path: "state.flags.metAvel", equals: true }, effects: [{ op: "addUnique", path: "clues", value: "hostage_passage" }, { op: "increment", path: "relationships.avel", value: 1 }], result: { text: l("Les listes prouvent que les départs étaient conditionnés par le silence, mais Avel efface les détails qui permettraient de retrouver chaque famille. Vous obtenez une preuve incomplète et une responsabilité entière.", "The lists prove departures were conditioned on silence, but Avel erases details that would locate every family. You gain incomplete proof and a complete responsibility.") } },
    { id: "cells-to-envoy-quay", label: l("Accompagner les familles vers le quai", "Accompany the families to the envoys' quay"), to: "quay_of_envoys" },
  ],
  treaty_archive: [
    { id: "open-souleyna-compact", label: l("Ouvrir la clause commerciale interdite", "Open the forbidden trade clause"), requires: { path: "state.flags.metTamsin", equals: true }, effects: [{ op: "addUnique", path: "clues", value: "souleyna_compact" }, { op: "increment", path: "relationships.tamsin", value: 1 }], result: { text: l("La clause ne parle jamais de sacrifice. Elle classe les quais par valeur, promet des compensations aux maisons marchandes et décrit les quartiers bas comme un risque à gérer. Le complot actuel n'a pas inventé son langage : il l'a seulement remis au travail.", "The clause never speaks of sacrifice. It ranks quays by value, promises compensation to merchant houses, and describes lower wards as a risk to manage. The current conspiracy did not invent its language: it merely put it back to work.") } },
    { id: "archive-to-shadow-post", label: l("Vérifier la clause dans les doubles de dépêches", "Verify the clause in duplicate dispatches"), to: "shadow_post" },
    { id: "archive-to-court", label: l("Ramener le traité dans la cour", "Bring the treaty back to the court"), to: "embassy_court" },
  ],
  quay_of_envoys: [
    { id: "quay-to-guest-cells", label: l("Revenir voir qui attend encore un passage", "Return to see who still waits for passage"), to: "guest_cells" },
    { id: "quay-to-shadow-post", label: l("Suivre les manifestes jusqu'au relais", "Follow the manifests to the post"), to: "shadow_post" },
    { id: "quay-to-court", label: l("Remonter négocier dans la cour", "Climb back to negotiate in the court"), to: "embassy_court" },
  ],
  shadow_post: [
    { id: "meet-feya", label: l("Écouter Feya relire les départs et les dettes", "Listen as Feya rereads departures and debts"), effects: [{ op: "set", path: "flags.metFeya", value: true }, { op: "increment", path: "relationships.feya", value: 1 }], result: { text: l("Feya vous montre les mêmes noms recopiés à l'encre noire pour les dettes et à l'encre blanche pour les départs. Elle ne vous demande pas de choisir entre la preuve et les personnes; elle vous prévient seulement que le traité a été conçu pour rendre ce choix inévitable.", "Feya shows you the same names copied in black ink for debts and white ink for departures. She does not ask you to choose between proof and people; she only warns the treaty was designed to make that choice inevitable.") } },
    { id: "copy-exile-clause", label: l("Copier la clause qui lie passage et silence", "Copy the clause binding passage to silence"), requires: { path: "state.flags.metFeya", equals: true }, effects: [{ op: "addUnique", path: "clues", value: "exile_clause" }, { op: "increment", path: "relationships.feya", value: 1 }], result: { text: l("La clause permet de quitter la ville à condition de renoncer à tout recours. Elle ne déplace pas seulement des personnes : elle déplace leur droit futur à raconter ce qui leur est arrivé.", "The clause permits leaving the city only on condition of waiving all recourse. It does not merely move people: it moves their future right to tell what happened to them.") } },
    { id: "post-to-court", label: l("Rapporter les doubles à la cour des ambassades", "Bring the duplicates to the embassy court"), to: "embassy_court" },
  ],
};

// Pivotal choices change the campaign's civic priorities. They are not tests
// with a correct answer: each preserves a real good while making another
// future harder, and their values are read generically by later outcomes.
const PIVOT_CHOICES = {
  fifth_quarter_assembly: [
    { id: "publish-vire-names", label: l("Faire prononcer les noms de Vire-Basse devant toute la ville", "Have Low Vire's names spoken before the whole city"), requires: { all: [{ path: "state.flags.vireAssembly", equals: true }, { path: "state.dilemmas.witnesses", equals: "undecided" }] }, effects: [{ op: "set", path: "dilemmas.witnesses", value: "public" }, { op: "addUnique", path: "clues", value: "public_testimony" }, { op: "increment", path: "expedition.alert", value: 1 }, { op: "increment", path: "relationships.marwen", value: 1 }], result: { text: l("Marwen accepte, mais exige que les délégués lisent eux-mêmes les noms. La foule entend enfin ce que les listes avaient transformé en chiffres. Vous gagnez une force publique; vous savez aussi que les familles deviennent visibles à ceux qui voudraient les faire taire.", "Marwen agrees, but demands the delegates read the names themselves. The crowd finally hears what lists had turned into figures. You gain public strength; you also know the families become visible to those who would silence them.") } },
    { id: "protect-vire-names", label: l("Garder les noms sous la garde des témoins", "Keep the names under the witnesses' protection"), requires: { all: [{ path: "state.flags.vireAssembly", equals: true }, { path: "state.dilemmas.witnesses", equals: "undecided" }] }, effects: [{ op: "set", path: "dilemmas.witnesses", value: "protected" }, { op: "addUnique", path: "clues", value: "protected_testimony" }, { op: "increment", path: "expedition.alert", value: -1 }, { op: "increment", path: "relationships.marwen", value: 2 }], result: { text: l("Vous ne remettez pas les listes au Conseil. Marwen les répartit entre plusieurs cuisines et plusieurs mémoires. Votre accusation perd une partie de sa force spectaculaire, mais aucune rafle ne pourra désormais saisir toutes les personnes qu'elle concerne.", "You do not hand the lists to the Council. Marwen divides them among kitchens and memories. Your accusation loses some dramatic force, but no raid can now seize every person it concerns.") } },
  ],
  waterkeepers_court: [
    { id: "share-retention-reserve", label: l("Ouvrir les réserves de la Retenue aux refuges de toute la ville", "Open the Retention's stores to shelters across the city"), requires: { all: [{ path: "state.flags.metMiren", equals: true }, { path: "state.dilemmas.reserve", equals: "undecided" }, { path: "state.expedition.supplies", atLeast: 2 }] }, effects: [{ op: "set", path: "dilemmas.reserve", value: "shared" }, { op: "increment", path: "expedition.supplies", value: -2 }, { op: "addUnique", path: "clues", value: "shared_reserve" }, { op: "increment", path: "relationships.hara", value: 1 }, { op: "increment", path: "expedition.morale", value: 1 }], result: { text: l("Miren fait ouvrir les cuves. Les rues qui n'ont jamais reçu assez d'eau donnent une part de leur réserve à des inconnus. C'est une victoire de solidarité, mais si la crise se prolonge, Vire-Basse aura moins de marge que personne.", "Miren has the cisterns opened. Streets that never received enough water give part of their reserve to strangers. It is a victory of solidarity, but if the crisis lasts, Low Vire will have less margin than anyone.") } },
    { id: "protect-retention-reserve", label: l("Garder la réserve pour les rues déjà sacrifiées", "Keep the reserve for streets already sacrificed"), requires: { all: [{ path: "state.flags.metMiren", equals: true }, { path: "state.dilemmas.reserve", equals: "undecided" }] }, effects: [{ op: "set", path: "dilemmas.reserve", value: "protected" }, { op: "increment", path: "expedition.supplies", value: 1 }, { op: "addUnique", path: "clues", value: "protected_reserve" }, { op: "increment", path: "relationships.miren", value: 2 }, { op: "increment", path: "expedition.morale", value: -1 }], result: { text: l("Miren scelle les cuves pour Vire-Basse et les rues basses. Vous refusez qu'elles paient une fois encore le prix d'une générosité ordonnée par d'autres. Des refuges devront se débrouiller sans cette eau, mais la ville ne pourra plus appeler ce quartier une réserve disponible.", "Miren seals the cisterns for Low Vire and the lower streets. You refuse to let them pay again for generosity ordered by others. Some shelters must manage without this water, but the city can no longer call this ward an available reserve.") } },
  ],
  first_light_chamber: [
    { id: "open-common-signal", label: l("Ouvrir les miroirs à toutes les fenêtres, malgré le risque", "Open the mirrors to every window, despite the risk"), requires: { all: [{ path: "state.clues", includes: "common_signal" }, { path: "state.dilemmas.signal", equals: "undecided" }] }, effects: [{ op: "set", path: "dilemmas.signal", value: "open" }, { op: "addUnique", path: "clues", value: "open_signal" }, { op: "increment", path: "expedition.alert", value: 2 }, { op: "increment", path: "expedition.morale", value: 1 }], result: { text: l("Les miroirs s'ouvrent sur toute la ville. Les quartiers reçoivent enfin le même signe, mais les hommes de Souleyna le voient eux aussi. Vous choisissez une alerte que nul ne peut monopoliser — et que nul ne peut plus garder secrète.", "The mirrors open onto the whole city. Wards finally receive the same sign, but Souleyna's men see it too. You choose an alarm no one can monopolize—and no one can keep secret.") } },
    { id: "mask-common-signal", label: l("Garder les miroirs masqués pour protéger les routes fragiles", "Keep the mirrors masked to protect fragile routes"), requires: { all: [{ path: "state.clues", includes: "common_signal" }, { path: "state.dilemmas.signal", equals: "undecided" }] }, effects: [{ op: "set", path: "dilemmas.signal", value: "covert" }, { op: "addUnique", path: "clues", value: "masked_signal" }, { op: "increment", path: "expedition.alert", value: -1 }, { op: "increment", path: "relationships.yorra", value: 1 }], result: { text: l("Vous n'ouvrez pas toutes les fenêtres. Le signal passe par les routes que Yorra et les passeurs savent protéger. Des personnes seront averties sans que le réseau puisse les suivre, mais la promesse reste inégale et vous en porterez la limite.", "You do not open every window. The signal travels by routes Yorra and the ferrymen know how to protect. People will be warned without the network tracking them, but the promise remains unequal and you carry that limit.") } },
  ],
  worksong_chapel: [
    { id: "share-gate-authority", label: l("Donner aux équipes et aux quartiers le droit d'arrêter les portes", "Give crews and wards the right to halt the gates"), requires: { all: [{ path: "state.clues", includes: "repair_covenant" }, { path: "state.dilemmas.gates", equals: "undecided" }] }, effects: [{ op: "set", path: "dilemmas.gates", value: "collective" }, { op: "addUnique", path: "clues", value: "collective_repair" }, { op: "increment", path: "expedition.alert", value: 1 }, { op: "increment", path: "relationships.roul", value: 1 }, { op: "increment", path: "relationships.nyma", value: 1 }], result: { text: l("Les équipes ajoutent une ligne au chant : une rue menacée peut désormais demander l'arrêt des portes. La réparation sera plus lente, plus discutée, et impossible à refermer dans le bureau d'un seul homme.", "Crews add a line to the song: a threatened street may now demand the gates be stopped. Repair will be slower, more debated, and impossible to close inside one person's office.") } },
    { id: "keep-gate-command", label: l("Garder un commandement unique pour réparer avant l'aube", "Keep a single command to repair before dawn"), requires: { all: [{ path: "state.clues", includes: "repair_covenant" }, { path: "state.dilemmas.gates", equals: "undecided" }] }, effects: [{ op: "set", path: "dilemmas.gates", value: "command" }, { op: "addUnique", path: "clues", value: "command_repair" }, { op: "increment", path: "expedition.alert", value: -1 }, { op: "increment", path: "relationships.roul", value: -1 }, { op: "increment", path: "expedition.morale", value: -1 }], result: { text: l("Vous choisissez la vitesse : un contremaître unique recevra les ordres et les portes seront réparées avant l'aube. Roul acquiesce sans approuver. La machine sera sûre cette nuit; personne ne peut encore garantir qui aura le droit de la contester demain.", "You choose speed: one foreman will receive orders and the gates will be repaired before dawn. Roul nods without approving. The machine will be safe tonight; no one can yet guarantee who will have the right to challenge it tomorrow.") } },
  ],
  embassy_court: [
    { id: "expose-souleyna-compact", label: l("Lire le traité de Souleyna devant les quais", "Read Souleyna's compact before the quays"), requires: { all: [{ path: "state.clues", includes: "souleyna_compact" }, { path: "state.dilemmas.embassy", equals: "undecided" }] }, effects: [{ op: "set", path: "dilemmas.embassy", value: "expose" }, { op: "addUnique", path: "clues", value: "public_compact" }, { op: "increment", path: "expedition.alert", value: 2 }, { op: "increment", path: "relationships.tamsin", value: 1 }], result: { text: l("Tamsin lit les deux traductions, sans choisir celle qui arrange les puissants. Les quais comprennent que la violence a été écrite avec une grammaire propre. Vous ouvrez un procès que Souleyna ne pourra plus étouffer — mais les familles inscrites sur les listes deviennent immédiatement vulnérables.", "Tamsin reads both translations without choosing the one convenient to the powerful. The quays understand that violence was written in clean grammar. You open a case Souleyna can no longer smother—but the families named on the lists become vulnerable at once.") } },
    { id: "secure-family-passage", label: l("Acheter le passage des familles avant de rendre le traité public", "Buy the families' passage before making the treaty public"), requires: { all: [{ path: "state.flags.metAvel", equals: true }, { path: "state.clues", includes: "hostage_passage" }, { path: "state.dilemmas.embassy", equals: "undecided" }, { path: "state.expedition.wealth", atLeast: 8 }] }, effects: [{ op: "set", path: "dilemmas.embassy", value: "passage" }, { op: "increment", path: "expedition.wealth", value: -8 }, { op: "addUnique", path: "clues", value: "safe_passage" }, { op: "increment", path: "relationships.avel", value: 2 }, { op: "increment", path: "relationships.feya", value: 1 }], result: { text: l("Avel paie les hommes qui font semblant de ne pas voir, et vous donnez l'argent sans savoir qui, à Souleyna, le recevra vraiment. Des familles montent dans les barques avant que les sceaux ne tombent. Les copies du traité restent cachées : vous sauvez des vies, mais abandonnez pour l'instant la force du scandale.", "Avel pays the men who pretend not to see, and you hand over the coin without knowing who in Souleyna truly receives it. Families board the boats before the seals fall. Treaty copies remain hidden: you save lives, but for now surrender the force of scandal.") } },
  ],
};

// These last-chance interventions deliberately do not end the story by
// themselves. They let the player decide whose risk is acceptable before
// choosing one of the political and civic resolutions below.
const FINAL_STAKES_CHOICES = {
  public_reckoning: [
    { id: "aldren-holds-first-light", label: l("Laisser Aldren tenir la coupole de première lumière", "Let Aldren hold the first-light dome"), requires: { all: [...RESOLVED_CAMPAIGN_REQUIRES.all, { path: "state.clues", includes: "common_signal" }, { path: "state.heroConditions.aldren", not: "fallen" }] }, effects: [{ op: "set", path: "heroConditions.aldren", value: "fallen" }, { op: "set", path: "flags.aldrenSacrifice", value: true }, { op: "addUnique", path: "casualties", value: "Aldren Varkel" }, { op: "increment", path: "expedition.morale", value: -1 }], result: { text: l("Aldren reste sous les miroirs tandis que la pression fait trembler la coupole. Lorsque les fenêtres bleues répondent enfin dans tous les quartiers, il ne ressort pas. Son geste a ouvert le signal; il vous laisse le poids de décider ce qu'il servira désormais.", "Aldren remains beneath the mirrors while pressure shakes the dome. When blue windows finally answer across every ward, he does not return. His act opened the signal; it leaves you the weight of deciding what it will serve now.") } },
    { id: "bashkar-holds-gate", label: l("Laisser Bashkar retenir la herse qui se brise", "Let Bashkar hold the failing portcullis"), requires: { all: [...RESOLVED_CAMPAIGN_REQUIRES.all, { path: "state.clues", includes: "repair_covenant" }, { path: "state.heroConditions.bashkar", not: "fallen" }] }, effects: [{ op: "set", path: "heroConditions.bashkar", value: "fallen" }, { op: "set", path: "flags.bashkarSacrifice", value: true }, { op: "addUnique", path: "casualties", value: "Bashkar Dorn" }, { op: "increment", path: "expedition.morale", value: -1 }], result: { text: l("Bashkar passe sous la herse avant que les équipes puissent la sécuriser. Il ne vous demande pas de le suivre. Quand le métal cesse enfin de hurler, les ouvriers savent que les portes tiendront — et que personne ne pourra appeler ce prix une nécessité abstraite.", "Bashkar steps beneath the portcullis before crews can secure it. He does not ask you to follow. When metal finally stops screaming, workers know the gates will hold—and that no one may call this price an abstraction.") } },
    { id: "odran-stays-at-quay", label: l("Laisser Odran rester avec la dernière évacuation", "Let Odran remain with the final evacuation"), requires: { all: [...RESOLVED_CAMPAIGN_REQUIRES.all, { path: "state.flags.haraNetwork", equals: true }, { path: "state.heroConditions.odran", not: "fallen" }] }, effects: [{ op: "set", path: "heroConditions.odran", value: "fallen" }, { op: "set", path: "flags.odranSacrifice", value: true }, { op: "addUnique", path: "casualties", value: "Odran Vael" }, { op: "increment", path: "relationships.hara", value: 1 }], result: { text: l("Odran reste lorsque la dernière barque revient chercher les personnes oubliées dans une cave basse. Hara ne peut pas le retenir sans abandonner les autres. À l'aube, les listes de refuge sont complètes, mais l'une des voix qui les appelait manque à l'appel.", "Odran stays when the last boat returns for people forgotten in a low cellar. Hara cannot hold him back without abandoning the others. At dawn, shelter lists are complete, but one of the voices calling them is missing.") } },
    { id: "eryndor-carries-names", label: l("Laisser Eryndor emporter les noms par la route fermée", "Let Eryndor carry the names along the closed route"), requires: { all: [...RESOLVED_CAMPAIGN_REQUIRES.all, { path: "state.flags.yorraDefected", equals: true }, { path: "state.heroConditions.eryndor", not: "fallen" }] }, effects: [{ op: "set", path: "heroConditions.eryndor", value: "fallen" }, { op: "set", path: "flags.eryndorSacrifice", value: true }, { op: "addUnique", path: "casualties", value: "Eryndor Vey" }, { op: "addUnique", path: "clues", value: "courier_chain" }], result: { text: l("Eryndor prend les copies que personne ne doit pouvoir saisir ensemble. La dernière route s'effondre derrière lui, mais les paquets sortent par des portes différentes. Vous ne savez pas où il est tombé; vous savez seulement que le réseau ne pourra plus rassembler son silence.", "Eryndor takes the copies no one must be able to seize together. The last route collapses behind him, but packets emerge through different doors. You do not know where he fell; you only know the network can no longer gather its silence.") } },
    { id: "yorra-cuts-last-route", label: l("Accepter que Yorra coupe la dernière route du réseau", "Accept Yorra cutting the network's last route"), requires: { all: [...RESOLVED_CAMPAIGN_REQUIRES.all, { path: "state.flags.yorraDefected", equals: true }, { path: "state.flags.yorraFallen", equals: false }] }, effects: [{ op: "set", path: "flags.yorraFallen", value: true }, { op: "addUnique", path: "casualties", value: "Yorra Vale" }, { op: "addUnique", path: "clues", value: "courier_chain" }, { op: "increment", path: "expedition.alert", value: -1 }], result: { text: l("Yorra comprend avant vous que le réseau va refermer sa dernière route sur les familles qu'il peut encore menacer. Elle reste pour couper les câbles et faire partir les copies. Vous entendez le dernier sifflet, puis plus rien — sauf des lettres qui arrivent enfin aux bonnes mains.", "Yorra understands before you do that the network will close its last route around families it can still threaten. She stays to cut the cables and send copies away. You hear the final whistle, then nothing—except letters finally reaching the right hands.") } },
    { id: "othran-holds-steps", label: l("Accepter qu'Othran tienne les marches pour les témoins", "Accept Othran holding the steps for the witnesses"), requires: { all: [...RESOLVED_CAMPAIGN_REQUIRES.all, { path: "state.flags.othranCommitted", equals: true }, { path: "state.flags.othranFallen", equals: false }] }, effects: [{ op: "set", path: "flags.othranFallen", value: true }, { op: "addUnique", path: "casualties", value: "Othran Kelm" }, { op: "increment", path: "expedition.morale", value: -1 }], result: { text: l("Othran reste avec quelques gardes loyaux lorsque les hommes de Souleyna tentent de fermer les marches. Il ne gagne pas une bataille glorieuse; il gagne le temps nécessaire pour que les témoins et leurs preuves atteignent la foule.", "Othran stays with a few loyal guards when Souleyna's men try to close the steps. He wins no glorious battle; he wins the time needed for witnesses and their evidence to reach the crowd.") } },
    { id: "roul-seals-forge", label: l("Accepter que Roul scelle la forge basse", "Accept Roul sealing the underforge"), requires: { all: [...RESOLVED_CAMPAIGN_REQUIRES.all, { path: "state.clues", includes: "repair_covenant" }, { path: "state.flags.roulFallen", equals: false }] }, effects: [{ op: "set", path: "flags.roulFallen", value: true }, { op: "addUnique", path: "casualties", value: "Roul Venn" }, { op: "increment", path: "relationships.nyma", value: 1 }], result: { text: l("Roul ferme la forge avec les barres qui auraient dû servir au sabotage. Nyma crie son nom une seule fois, puis rassemble les outils. La fumée s'éclaircit assez pour que les équipes puissent travailler sans que l'ancien feu leur dicte encore ses ordres.", "Roul seals the forge with bars meant for sabotage. Nyma calls his name once, then gathers the tools. Smoke clears enough for crews to work without the old fire dictating orders to them.") } },
  ],
};

const OUTCOME_CHOICES = {
  public_reckoning: [
    { id: "end-vire-covenant", label: l("Laisser Vire-Basse imposer le pacte commun", "Let Low Vire carry the common pledge"), requires: { all: [...RESOLVED_CAMPAIGN_REQUIRES.all, { path: "state.flags.vireAssembly", equals: true }, { path: "state.clues", includes: "mutual_oath" }, { path: "state.dilemmas.witnesses", equals: "public" }] }, effects: [{ op: "set", path: "flags.publicRecord", value: true }, { op: "set", path: "flags.campaignResolved", value: true }], to: "ending_vire_covenant" },
    { id: "end-workers-open", label: l("Confier les portes aux équipes et à leurs témoins", "Entrust the gates to crews and their witnesses"), requires: { all: [...RESOLVED_CAMPAIGN_REQUIRES.all, { path: "state.clues", includes: "repair_covenant" }, { path: "state.clues", includes: "forged_orders" }, { path: "state.dilemmas.gates", equals: "collective" }] }, effects: [{ op: "set", path: "flags.publicRecord", value: true }, { op: "set", path: "flags.campaignResolved", value: true }], to: "ending_workers_open" },
    { id: "end-lantern-network", label: l("Faire passer les refuges avant le procès", "Put the shelter network before the trial"), requires: { all: [...RESOLVED_CAMPAIGN_REQUIRES.all, { path: "state.flags.haraNetwork", equals: true }, { path: "state.clues", includes: "relief_routes" }, { path: "state.dilemmas.reserve", equals: "shared" }] }, effects: [{ op: "set", path: "flags.keptArchive", value: true }, { op: "set", path: "flags.campaignResolved", value: true }], to: "ending_lantern_network" },
    { id: "end-civic-warrant", label: l("Faire appliquer le mandat de protection d'Othran", "Enforce Othran's protective warrant"), requires: { all: [...RESOLVED_CAMPAIGN_REQUIRES.all, { path: "state.flags.othranCommitted", equals: true }, { path: "state.clues", includes: "guard_warrant" }] }, effects: [{ op: "set", path: "flags.publicRecord", value: true }, { op: "set", path: "flags.campaignResolved", value: true }], to: "ending_civic_warrant" },
    { id: "end-courier-truth", label: l("Disperser les preuves sur les routes de Yorra", "Disperse the evidence along Yorra's routes"), requires: { all: [...RESOLVED_CAMPAIGN_REQUIRES.all, { path: "state.flags.yorraDefected", equals: true }, { path: "state.clues", includes: "courier_chain" }] }, effects: [{ op: "set", path: "flags.keptArchive", value: true }, { op: "set", path: "flags.campaignResolved", value: true }], to: "ending_courier_truth" },
    { id: "end-common-signal", label: l("Rallumer le signal commun avant de juger", "Restore the common signal before judgment"), requires: { all: [...RESOLVED_CAMPAIGN_REQUIRES.all, { path: "state.clues", includes: "common_signal" }, { path: "state.clues", includes: "double_chime" }, { path: "state.dilemmas.signal", equals: "open" }] }, effects: [{ op: "set", path: "flags.publicRecord", value: true }, { op: "set", path: "flags.campaignResolved", value: true }], to: "ending_common_signal" },
    { id: "end-many-hands", label: l("Faire raconter le salut par toutes les communautés", "Let every community tell the rescue"), requires: { all: [...RESOLVED_CAMPAIGN_REQUIRES.all, { path: "state.flags.vireAssembly", equals: true }, { path: "state.clues", includes: "repair_covenant" }, { path: "state.clues", includes: "common_signal" }, { path: "state.flags.haraNetwork", equals: true }, { path: "state.dilemmas.witnesses", equals: "public" }, { path: "state.dilemmas.reserve", equals: "shared" }, { path: "state.dilemmas.signal", equals: "open" }, { path: "state.dilemmas.gates", equals: "collective" }] }, effects: [{ op: "set", path: "flags.publicRecord", value: true }, { op: "set", path: "flags.campaignResolved", value: true }], to: "ending_many_hands" },
    { id: "end-guarded-archive", label: l("Confier les copies à plusieurs gardiens", "Entrust copies to several keepers"), requires: { all: [...RESOLVED_CAMPAIGN_REQUIRES.all, { path: "state.flags.yorraDefected", equals: true }, { path: "state.flags.metTovar", equals: true }, { path: "state.flags.metIlyra", equals: true }, { path: "state.dilemmas.witnesses", equals: "protected" }, { path: "state.dilemmas.signal", equals: "covert" }] }, effects: [{ op: "set", path: "flags.keptArchive", value: true }, { op: "set", path: "flags.campaignResolved", value: true }], to: "ending_guarded_archive" },
    { id: "end-broken-compact", label: l("Briser publiquement le traité de Souleyna", "Break Souleyna's compact in public"), requires: { all: [...RESOLVED_CAMPAIGN_REQUIRES.all, { path: "state.clues", includes: "souleyna_compact" }, { path: "state.dilemmas.embassy", equals: "expose" }] }, effects: [{ op: "set", path: "flags.publicRecord", value: true }, { op: "set", path: "flags.campaignResolved", value: true }], to: "ending_broken_compact" },
    { id: "end-exile-passage", label: l("Faire partir les familles avant de réclamer justice", "Send the families away before demanding justice"), requires: { all: [...RESOLVED_CAMPAIGN_REQUIRES.all, { path: "state.flags.metAvel", equals: true }, { path: "state.clues", includes: "hostage_passage" }, { path: "state.dilemmas.embassy", equals: "passage" }] }, effects: [{ op: "set", path: "flags.keptArchive", value: true }, { op: "set", path: "flags.campaignResolved", value: true }], to: "ending_exile_passage" },
  ],
};

// Recurring-character arcs are deliberately attached to existing crossroads.
// The engine only sees authored state, requirements and effects: neither these
// characters nor their outcomes are special-cased outside the campaign data.
const NPC_ARC_CHOICES = {
  courier_locker: [
    { id: "meet-yorra", label: l("Demander à Yorra Vale pourquoi elle cache ses mains", "Ask Yorra Vale why she hides her hands"), effects: [{ op: "set", path: "flags.metYorra", value: true }, { op: "increment", path: "relationships.yorra", value: 1 }], result: { text: l("Yorra retire enfin ses gants : les paumes sont tachées d'encre bleue, le signe des courses qu'on ne doit pas pouvoir remonter. Elle ne vous donne aucun nom. Elle vous demande seulement ce que vous feriez d'une messagère qui a peur de ses employeurs autant que de la ville.", "Yorra finally removes her gloves: her palms are stained blue with the ink of errands that must not be traceable. She gives you no names. She only asks what you would do with a courier who fears her employers as much as she fears the city.") } },
    { id: "shield-yorra", label: l("Lui promettre un passage sûr hors des casiers", "Promise her safe passage away from the lockers"), requires: { path: "state.flags.metYorra", equals: true }, effects: [{ op: "set", path: "flags.yorraProtected", value: true }, { op: "increment", path: "relationships.yorra", value: 2 }, { op: "increment", path: "expedition.alert", value: 1 }], result: { text: l("Vous ne lui demandez pas de preuve immédiate. Yorra vous indique seulement le quai où les lettres changent de main, puis disparaît avant que son courage ne puisse être repris par la prudence.", "You ask her for no immediate proof. Yorra only indicates the quay where letters change hands, then disappears before caution can reclaim her courage.") } },
  ],
  black_lantern_pier: [
    { id: "yorra-breaks-chain", label: l("Retrouver Yorra sous les lanternes et recevoir les courriers détournés", "Find Yorra beneath the lanterns and take the diverted letters"), requires: { path: "state.flags.yorraProtected", equals: true }, effects: [{ op: "set", path: "flags.yorraDefected", value: true }, { op: "increment", path: "relationships.yorra", value: 2 }, { op: "addUnique", path: "clues", value: "courier_chain" }, { op: "increment", path: "expedition.morale", value: 1 }], result: { text: l("Yorra a gardé les doubles des itinéraires et rayé les noms des personnes qu'elle ne veut pas livrer. Elle ne devient pas soudain sans peur; elle choisit seulement de rompre la chaîne à l'endroit où elle tient encore une extrémité.", "Yorra kept copies of the routes and crossed out the names of people she will not surrender. She does not suddenly become fearless; she simply chooses to break the chain where she still holds one end.") } },
  ],
  city_steps: [
    { id: "meet-othran", label: l("Parler au sergent Othran avant que la foule ne le force à choisir", "Speak to Sergeant Othran before the crowd forces his hand"), effects: [{ op: "set", path: "flags.metOthran", value: true }, { op: "increment", path: "relationships.othran", value: 1 }], result: { text: l("Othran a reçu l'ordre de garder les marches, pas d'écouter les rumeurs. Pourtant il vous laisse finir. Sa question est sèche, mais honnête : « Si je vous ouvre un passage, qui protège les gens quand les puissants disent que tout va bien ? »", "Othran has been ordered to hold the steps, not to listen to rumours. Yet he lets you finish. His question is curt but honest: “If I open a way for you, who protects people when the powerful say everything is fine?”") } },
    { id: "show-othran-vire", label: l("Confier à Othran les preuves et la parole de Vire-Basse", "Entrust Othran with the evidence and Low Vire's testimony"), requires: { all: [{ path: "state.flags.metOthran", equals: true }, { path: "state.flags.vireAssembly", equals: true }] }, effects: [{ op: "set", path: "flags.othranCommitted", value: true }, { op: "increment", path: "relationships.othran", value: 2 }, { op: "addUnique", path: "clues", value: "guard_warrant" }, { op: "increment", path: "expedition.alert", value: -1 }], result: { text: l("Othran lit les signatures sans chercher à les rendre plus commodes. Il fait changer la garde des archives et signe un mandat de protection au lieu d'un ordre de saisie. Cette fois, son uniforme prend un risque avec lui.", "Othran reads the signatures without trying to make them more convenient. He changes the archive guard and signs a protective warrant instead of a seizure order. This time, his uniform takes a risk with him.") } },
  ],
  lantern_hospice: [
    { id: "meet-hara", label: l("Aider Hara Nym à répartir les blessés avant la prochaine alerte", "Help Hara Nym distribute the wounded before the next warning"), effects: [{ op: "set", path: "flags.metHara", value: true }, { op: "increment", path: "relationships.hara", value: 1 }], result: { text: l("Hara n'a ni le temps ni le goût des grands discours. En vous faisant tenir un registre et une bassine, elle vous apprend quels quais n'ont pas de porte assez large pour une civière — et lesquels ont toujours une réserve de linge propre.", "Hara has neither time nor taste for grand speeches. By making you hold a register and a basin, she teaches you which quays have no door wide enough for a stretcher—and which always keep clean linen in reserve.") } },
    { id: "organize-hara-network", label: l("Donner une part de vos provisions au réseau de soins de Hara", "Give part of your supplies to Hara's care network"), requires: { all: [{ path: "state.flags.metHara", equals: true }, { path: "state.expedition.supplies", atLeast: 1 }] }, effects: [{ op: "increment", path: "expedition.supplies", value: -1 }, { op: "set", path: "flags.haraNetwork", value: true }, { op: "increment", path: "relationships.hara", value: 2 }, { op: "increment", path: "expedition.morale", value: 1 }, { op: "addUnique", path: "clues", value: "care_routes" }], result: { text: l("Hara ne vous remercie pas tout de suite : elle répartit déjà les fioles entre les bateliers, les sœurs et les cuisines de Vire-Basse. Puis elle vous regarde enfin. « On ne sauve pas une ville avec une seule grande décision. On la sauve en laissant des gens prêts à répondre. »", "Hara does not thank you immediately: she is already distributing vials among boatmen, sisters, and Low Vire kitchens. Then she finally looks at you. “You do not save a city with one great decision. You save it by leaving people ready to answer.”") } },
  ],
};

const REST_CHOICES = {
  river_shrine: [
    { id: "rest-at-shrine", label: l("S'asseoir auprès du bol de sel et reprendre souffle", "Sit beside the salt bowl and catch your breath"), requires: { path: "state.expedition.fatigue", atLeast: 3 }, effects: [{ op: "increment", path: "expedition.fatigue", value: -3 }, { op: "increment", path: "expedition.morale", value: 1 }, { op: "set", path: "heroConditions.party", value: "steady" }, { op: "set", path: "heroConditions.odran", value: "inspired" }], result: { text: l("Personne ne vous absout, et c'est précisément ce qui repose. Vous partagez le pain laissé aux bateliers, laissez le bruit de la fête devenir lointain, puis repartez avec les mains moins lourdes.", "No one absolves you, and that is precisely what rests you. You share bread left for boatmen, let the festival noise grow distant, then leave with lighter hands.") } },
  ],
  moonfish_tavern: [
    { id: "rest-at-moonfish", label: l("Prendre une soupe chaude derrière le poêle", "Take warm soup behind the stove"), requires: { path: "state.expedition.fatigue", atLeast: 3 }, effects: [{ op: "increment", path: "expedition.fatigue", value: -3 }, { op: "increment", path: "expedition.supplies", value: -1 }, { op: "increment", path: "expedition.morale", value: 1 }, { op: "set", path: "heroConditions.eryndor", value: "steady" }], result: { text: l("La patronne ne pose aucune question. Une soupe épicée, un banc trop étroit et cinq minutes sans surveiller la porte suffisent à rendre à chacun une part de son souffle.", "The landlady asks no questions. Spiced soup, a bench too narrow, and five minutes without watching the door return a share of breath to everyone.") } },
  ],
  lantern_hospice: [
    { id: "rest-at-hospice", label: l("Accepter une couche et les soins des sœurs", "Accept a cot and the sisters' care"), requires: { any: [{ path: "state.expedition.fatigue", atLeast: 2 }, { path: "state.expedition.wounds", atLeast: 1 }] }, effects: [{ op: "increment", path: "expedition.fatigue", value: -3 }, { op: "increment", path: "expedition.wounds", value: -1 }, { op: "increment", path: "expedition.morale", value: 1 }, { op: "set", path: "heroConditions.party", value: "steady" }], result: { text: l("Les sœurs n'appellent pas cela du repos : elles parlent de rendre au corps ce qu'on lui a pris sans demander. Les bandages sont propres, l'eau chaude, et personne ne vous demande de raconter la peur.", "The sisters do not call it rest: they speak of returning to the body what was taken without asking. Bandages are clean, water is warm, and no one asks you to recount the fear.") } },
  ],
  tide_garden: [
    { id: "rest-in-garden", label: l("Faire halte parmi les roseaux filtrants", "Pause among the filtering reeds"), requires: { path: "state.expedition.fatigue", atLeast: 3 }, effects: [{ op: "increment", path: "expedition.fatigue", value: -3 }, { op: "increment", path: "expedition.supplies", value: 1 }, { op: "set", path: "heroConditions.aldren", value: "steady" }], result: { text: l("Les jardiniers vous font respirer au rythme des bassins. Les roseaux filtrent l'eau sans hâte; leur patience vous gagne assez longtemps pour remplir les gourdes et remettre les idées dans l'ordre.", "The gardeners have you breathe to the rhythm of the basins. Reeds filter water without haste; their patience reaches you long enough to fill flasks and put thoughts back in order.") } },
  ],
  ferrymen_guild: [
    { id: "rest-with-ferrymen", label: l("Dormir une heure dans le dortoir des passeurs", "Sleep an hour in the ferrymen's dormitory"), requires: { path: "state.expedition.fatigue", atLeast: 4 }, effects: [{ op: "increment", path: "expedition.fatigue", value: -4 }, { op: "increment", path: "expedition.morale", value: 1 }, { op: "set", path: "heroConditions.bashkar", value: "steady" }], result: { text: l("Les hamacs grincent au-dessus des rames et personne ne dort vraiment, mais les passeurs montent la garde à votre place. Quand vous rouvrez les yeux, le danger n'a pas diminué; votre capacité à l'affronter, si.", "Hammocks creak above the oars and no one truly sleeps, but the ferrymen keep watch in your place. When you open your eyes, danger has not lessened; your ability to face it has.") } },
  ],
};

const FINAL_DENSE_CHOICES = {
  silt_archive: [
    { id: "silt-to-workers", label: l("Suivre les traces blanches vers les ouvriers", "Follow white tracks to the workers"), to: "workers_bank" },
    { id: "silt-to-well", label: l("Tester le niveau d'eau au puits des échos", "Test the water level at the echo well"), to: "echo_well" },
  ],
  undersluice_dock: [
    { id: "dock-to-post", label: l("Longer les anneaux rouillés jusqu'au relais noyé", "Follow the rusted rings to the drowned post"), to: "drowned_post" },
    { id: "dock-to-bell", label: l("Remonter le câble jusqu'à la cloche", "Follow the cable up to the bell"), to: "signal_bell" },
  ],
  old_customs: [
    { id: "customs-to-library", label: l("Faire vérifier les chiffres à la bibliothèque des marées", "Have the tide library verify the figures"), to: "tide_library" },
    { id: "customs-to-tribunal", label: l("Porter les doubles registres au Tribunal", "Carry the duplicate ledgers to the Tribunal"), to: "tribunal_gallery" },
  ],
  river_shrine: [
    { id: "shrine-to-market", label: l("Suivre les offrandes jusqu'au marché du sel", "Follow the offerings to the salt market"), to: "salt_market" },
    { id: "shrine-to-chapel", label: l("Chercher la source sous la chapelle de l'eau", "Seek the source beneath the water chapel"), to: "water_chapel" },
  ],
  moonfish_tavern: [
    { id: "moonfish-to-pier", label: l("Prendre la sortie des bateliers vers le quai noir", "Use the boatmen's exit to the black pier"), to: "black_lantern_pier" },
    { id: "moonfish-to-customs", label: l("Suivre un receveur jusqu'aux douanes", "Follow a collector to customs"), to: "old_customs" },
  ],
  moss_orchard: [
    { id: "orchard-to-fissure", label: l("Suivre les racines jusqu'à la fissure", "Follow the roots to the fissure"), to: "narrow_fissure" },
    { id: "orchard-to-post", label: l("Remonter par l'ancien verger vers le relais", "Climb through the old orchard to the post"), to: "drowned_post" },
  ],
  watch_platform: [
    { id: "watch-to-gates", label: l("Descendre par l'escalier des mécaniciens", "Descend by the mechanics' stair"), to: "gate_chamber" },
    { id: "watch-to-tribunal", label: l("Suivre les toits jusqu'à la galerie du Tribunal", "Follow the rooftops to the Tribunal gallery"), to: "tribunal_gallery" },
  ],
  archive_cloister: [
    { id: "cloister-to-library", label: l("Comparer les copies aux rouleaux des marées", "Compare the copies with the tide rolls"), to: "tide_library" },
    { id: "cloister-to-council", label: l("Porter les feuillets directement à l'antichambre", "Carry the folios directly to the antechamber"), to: "council_antechamber" },
  ],
  tide_library: [
    { id: "library-to-pier", label: l("Suivre les relevés jusqu'au quai des lanternes", "Follow the readings to the lantern pier"), to: "black_lantern_pier" },
  ],
  courier_locker: [
    { id: "locker-to-pier", label: l("Prendre le passage de service vers le quai noir", "Take the service passage to the black pier"), to: "black_lantern_pier" },
  ],
  aqueduct_gallery: [
    { id: "aqueduct-to-tunnel", label: l("Descendre au tunnel par le regard d'eau", "Descend to the tunnel by the water-eye"), to: "flooded_tunnel" },
    { id: "aqueduct-to-gates", label: l("Suivre la pente jusqu'à la chambre des portes", "Follow the slope to the gate chamber"), to: "gate_chamber" },
  ],
  underbridge_sluice: [
    { id: "underbridge-to-rope-chapel", label: l("Prendre le passage des amarres vers la chapelle", "Take the mooring passage to the rope chapel"), to: "rope_chapel" },
  ],
  signal_bell: [
    { id: "bell-to-cistern", label: l("Monter par le conduit sec jusqu'à la citerne", "Climb the dry conduit to the cistern"), to: "rooftop_cistern" },
  ],
};

// A data-defined routing overlay keeps every return visit strategically open.
// The identifiers are made local to their origin, so using one route never
// consumes the same route at another location.
const DENSE_WORLD_REGIONS = {
  city: {
    scenes: ["river_gate", "festival_arcade", "secret_map_stall", "glasswright_yard", "moonfish_tavern", "paper_bridge", "old_customs", "seal_vault", "embassy_vestry", "city_steps", "archive_cloister", "hidden_scriptorium", "tribunal_gallery", "council_antechamber", "salt_market", "ropewalk", "courier_locker", "tide_library", "mask_exchange", "water_clock", "bell_foundry", "customs_annex"],
    routes: [
      { id: "festival", label: l("Suivre les ruelles de fête vers les lanternes", "Follow festival lanes toward the lanterns"), to: "festival_arcade" },
      { id: "canal", label: l("Prendre une venelle vers les marches du canal", "Take a lane toward the canal steps"), to: "canal_steps" },
      { id: "customs", label: l("Remonter une piste officielle jusqu'aux douanes", "Follow an official trail to customs"), to: "old_customs" },
      { id: "guard", label: l("Chercher la garde sur les marches de la ville", "Seek the guard on the city steps"), to: "city_steps" },
    ],
  },
  waterways: {
    scenes: ["canal_steps", "undersluice_dock", "river_shrine", "drowned_post", "ferrymen_guild", "rope_chapel", "black_lantern_pier", "canal_infirmary", "tide_garden"],
    routes: [
      { id: "steps", label: l("Reprendre le chemin des maisons au bord du canal", "Return by the houses along the canal"), to: "canal_steps" },
      { id: "dock", label: l("Suivre les amarres vers le quai de service", "Follow the moorings to the service dock"), to: "undersluice_dock" },
      { id: "pier", label: l("Chercher une barque au quai des lanternes noires", "Seek a boat at the black-lantern pier"), to: "black_lantern_pier" },
      { id: "shrine", label: l("Faire un détour par le sanctuaire des rives", "Make a detour through the riverside shrine"), to: "river_shrine" },
    ],
  },
  riverbed: {
    scenes: ["dry_bed", "workers_bank", "foreman_parley", "scaffold_shadow", "maintenance_map", "maintenance_crawl", "sluice_passage", "silt_archive", "moss_orchard", "collapsed_baths", "sluice_workshop", "broken_weir"],
    routes: [
      { id: "bed", label: l("Reprendre l'axe du lit asséché", "Return to the dry riverbed's main course"), to: "dry_bed" },
      { id: "workers", label: l("Surveiller de nouveau le chantier des ouvriers", "Watch the workers' site again"), to: "workers_bank" },
      { id: "gates", label: l("Suivre les vibrations jusqu'à la chambre des portes", "Follow the vibrations to the gate chamber"), to: "gate_chamber" },
      { id: "silt", label: l("Chercher une réponse parmi les jalons de limon", "Seek an answer among the silt gauges"), to: "silt_archive" },
    ],
  },
  depths: {
    scenes: ["narrow_fissure", "kiki_trust", "dog_scent", "flooded_tunnel", "lantern_landing", "barge_hold", "witness_oath", "smuggler_ledger", "gallery_procession", "poupiquet_cell", "poupiquet_free", "water_chapel", "rite_broken", "echo_well", "aqueduct_gallery", "submerged_theater", "whisper_stairs", "drowned_oratory"],
    routes: [
      { id: "well", label: l("Écouter le courant jusqu'au puits des échos", "Follow the current's sound to the echo well"), to: "echo_well" },
      { id: "landing", label: l("Revenir au seuil de l'eau noire", "Return to the threshold of black water"), to: "lantern_landing" },
      { id: "glyphs", label: l("Suivre les signes gravés vers la galerie Utruz", "Follow carved signs to the Utruz gallery"), to: "gallery_procession" },
      { id: "chapel", label: l("Chercher une issue vers la chapelle immergée", "Seek a way to the submerged chapel"), to: "water_chapel" },
    ],
  },
  machinery: {
    scenes: ["gate_chamber", "counterweight_loft", "watch_platform", "ember_observatory", "rooftop_cistern", "shield_terrace", "public_reckoning", "underbridge_sluice", "signal_bell", "signal_gallery", "chain_walkway"],
    routes: [
      { id: "gates", label: l("Rejoindre le cœur des mécanismes", "Reach the heart of the mechanisms"), to: "gate_chamber" },
      { id: "city", label: l("Remonter par un escalier de service vers la ville", "Climb a service stair toward the city"), to: "city_steps" },
      { id: "watch", label: l("Gagner les hauteurs des veilleurs", "Reach the watchers' heights"), to: "watch_platform" },
      { id: "sluice", label: l("Suivre un câble jusqu'à la vanne sous le pont", "Follow a cable to the underbridge sluice"), to: "underbridge_sluice" },
    ],
  },
};

const REGIONAL_ROUTING_CHOICES = Object.fromEntries(
  Object.values(DENSE_WORLD_REGIONS).flatMap(({ scenes, routes }) => scenes.map((sceneId) => [
    sceneId,
    routes.filter((route) => route.to !== sceneId).map((route) => ({
      id: `route-${sceneId}-${route.id}`,
      label: route.label,
      to: route.to,
    })),
  ])),
);

// Presentation remains campaign data too: regions define the atmosphere that
// accompanies their scenes without teaching the generic UI any Laelith ids.
export const SCENE_ART = {
  defaultTheme: "riverbed",
  themeByScene: {
    ...Object.fromEntries(Object.entries(DENSE_WORLD_REGIONS).flatMap(([theme, { scenes }]) => scenes.map((sceneId) => [sceneId, theme]))),
    festival_arcade: "festival", mask_exchange: "festival", moonfish_tavern: "festival", paper_bridge: "festival",
    moss_orchard: "garden", tide_garden: "garden", submerged_theater: "garden",
    river_shrine: "sanctuary", rope_chapel: "sanctuary", water_chapel: "sanctuary", drowned_oratory: "sanctuary",
    archive_cloister: "archives", hidden_scriptorium: "archives", tide_library: "archives", silt_archive: "archives", drowned_post: "archives", drowned_mailroom: "archives", tribunal_gallery: "archives", council_antechamber: "archives",
    low_vire_threshold: "city", witness_kitchen: "festival", quiet_school: "garden", ledger_scriptorium: "archives", echo_vault: "archives", flood_marks_house: "depths", forgotten_causeway: "depths", brass_lift: "machinery", understreet_lift: "machinery", fifth_quarter_assembly: "festival",
    retention_gate: "machinery", waterkeepers_court: "city", tally_weighbridge: "machinery", brass_garden: "garden", names_reservoir: "depths", storm_registry: "archives", pledge_chamber: "sanctuary", relief_quay: "city", rain_chain: "machinery", breakwater_chapel: "sanctuary", overflow_gallery: "depths",
    dawn_portal: "city", bellkeepers_yard: "sanctuary", cracked_chime_gallery: "machinery", dawn_market: "festival", courier_roof: "city", relay_conservatory: "archives", voices_cistern: "depths", blue_window_workshop: "machinery", civic_tribune: "city", message_bridge: "city", unheard_stairs: "depths", first_light_chamber: "sanctuary",
    makers_gate: "machinery", tool_court: "city", chain_foundry: "machinery", bellows_loft: "machinery", waterwright_archive: "archives", guild_kitchen: "festival", apprentice_dormitory: "city", clay_map_room: "archives", underforge: "machinery", handspan_bridge: "depths", confluence_shaft: "depths", worksong_chapel: "sanctuary",
    embassy_court: "city", interpreter_lodge: "archives", pledge_balcony: "city", sealed_larder: "festival", guest_cells: "sanctuary", treaty_archive: "archives", quay_of_envoys: "city", shadow_post: "archives",
  },
};

export const FIXED_CHOICES = Object.fromEntries(
  [...new Set([...Object.keys(CORE_CHOICES), ...Object.keys(WORLD_EXPANSION_CHOICES), ...Object.keys(ANNEX_CHOICES), ...Object.keys(ANNEX_ENTRY_CHOICES), ...Object.keys(LOCAL_RETURN_CHOICES), ...Object.keys(LORE_EXPANSION_CHOICES), ...Object.keys(SECOND_LORE_CHOICES), ...Object.keys(THIRD_LORE_CHOICES), ...Object.keys(FOURTH_LORE_CHOICES), ...Object.keys(FIFTH_LORE_CHOICES), ...Object.keys(SIXTH_LORE_CHOICES), ...Object.keys(SEVENTH_LORE_CHOICES), ...Object.keys(PIVOT_CHOICES), ...Object.keys(FINAL_STAKES_CHOICES), ...Object.keys(OUTCOME_CHOICES), ...Object.keys(NPC_ARC_CHOICES), ...Object.keys(REST_CHOICES)])]
    .map((sceneId) => [sceneId, [...(CORE_CHOICES[sceneId] ?? []), ...(WORLD_EXPANSION_CHOICES[sceneId] ?? []), ...(ANNEX_CHOICES[sceneId] ?? []), ...(ANNEX_ENTRY_CHOICES[sceneId] ?? []), ...(LOCAL_RETURN_CHOICES[sceneId] ?? []), ...(LORE_EXPANSION_CHOICES[sceneId] ?? []), ...(SECOND_LORE_CHOICES[sceneId] ?? []), ...(THIRD_LORE_CHOICES[sceneId] ?? []), ...(FOURTH_LORE_CHOICES[sceneId] ?? []), ...(FIFTH_LORE_CHOICES[sceneId] ?? []), ...(SIXTH_LORE_CHOICES[sceneId] ?? []), ...(SEVENTH_LORE_CHOICES[sceneId] ?? []), ...(PIVOT_CHOICES[sceneId] ?? []), ...(FINAL_STAKES_CHOICES[sceneId] ?? []), ...(OUTCOME_CHOICES[sceneId] ?? []), ...(NPC_ARC_CHOICES[sceneId] ?? []), ...(REST_CHOICES[sceneId] ?? [])]]),
);
