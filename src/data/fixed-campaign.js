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

export const FIXED_SCENES = { ...CORE_SCENES, ...WORLD_EXPANSION_SCENES, ...ANNEX_SCENES, ...LORE_EXPANSION_SCENES, ...SECOND_LORE_SCENES };

// Geographic layout is campaign data. Coordinates are deliberately separate
// from prose and rules, so another campaign can supply a wholly different map.
export const WORLD_MAP = {
  viewBox: "0 0 1010 430",
  regions: [
    { id: "city", x: 12, y: 12, width: 536, height: 118, label: l("Laelith haute", "Upper Laelith") },
    { id: "riverbed", x: 90, y: 145, width: 350, height: 82, label: l("Lit asséché", "Dry riverbed") },
    { id: "depths", x: 18, y: 242, width: 365, height: 174, label: l("Galeries et eaux basses", "Galleries and low water") },
    { id: "machinery", x: 400, y: 165, width: 148, height: 250, label: l("Portes et mécanismes", "Gates and machinery") },
    { id: "east_canals", x: 565, y: 12, width: 133, height: 403, label: l("Canaux de l'est", "Eastern canals") },
    { id: "annexes", x: 720, y: 12, width: 128, height: 403, label: l("Détours et annexes", "Annexes and detours") },
    { id: "outer_annexes", x: 870, y: 12, width: 128, height: 403, label: l("Périphérie oubliée", "Forgotten outskirts") },
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
    { id: "save-city", label: l("Faire arrêter les saboteurs et exposer le réseau", "Have the saboteurs arrested and expose the network"), requires: { all: [{ path: "state.flags.disarmedShields", equals: true }, { any: [{ path: "state.flags.freedCaptives", equals: true }, { path: "state.clues", includes: "valdrick_manifest" }, { path: "state.clues", includes: "council_ledger" }] }, { any: [{ path: "state.clues", includes: "water_rite" }, { path: "state.clues", includes: "flood_schedule" }, { path: "state.clues", includes: "old_flood_map" }] }] }, effects: [{ op: "set", path: "flags.publicRecord", value: true }], to: "ending_dawn" },
    { id: "save-quietly", label: l("Choisir le salut discret avant l'aube", "Choose quiet salvation before dawn"), requires: { path: "state.flags.disarmedShields", equals: true }, effects: [{ op: "set", path: "flags.keptArchive", value: true }], to: "ending_silent" },
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

export const FIXED_CHOICES = Object.fromEntries(
  [...new Set([...Object.keys(CORE_CHOICES), ...Object.keys(WORLD_EXPANSION_CHOICES), ...Object.keys(ANNEX_CHOICES), ...Object.keys(ANNEX_ENTRY_CHOICES), ...Object.keys(LOCAL_RETURN_CHOICES), ...Object.keys(LORE_EXPANSION_CHOICES), ...Object.keys(SECOND_LORE_CHOICES)])]
    .map((sceneId) => [sceneId, [...(CORE_CHOICES[sceneId] ?? []), ...(WORLD_EXPANSION_CHOICES[sceneId] ?? []), ...(ANNEX_CHOICES[sceneId] ?? []), ...(ANNEX_ENTRY_CHOICES[sceneId] ?? []), ...(LOCAL_RETURN_CHOICES[sceneId] ?? []), ...(LORE_EXPANSION_CHOICES[sceneId] ?? []), ...(SECOND_LORE_CHOICES[sceneId] ?? [])]]),
);
