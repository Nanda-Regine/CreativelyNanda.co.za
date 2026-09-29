// ─────────────────────────────────────────────────────────────────────────────
// Nanda's lineage — her own words, as already published on /about, plus the
// authentic Kiganda introduction and Nsenene clan motto from her family record
// (public/assets/Nsenene Lineage..pdf). Nothing here is invented; it is sourced
// from Nanda's documents. Shared so the About page and the poetry Lineage Room
// can draw from one source of truth.
// ─────────────────────────────────────────────────────────────────────────────

// Each house is dressed in a cloth of its own people, photographed on
// Wikimedia Commons and served from Cloudinary (cropped at delivery). The CC
// BY-SA licences need a visible credit, which the Lineage Room prints on the
// image.
const CLD = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

export interface ClothCredit {
  cloth: string;   // what the cloth is
  author: string;
  licence: string;
  source: string;  // the Commons file page
}

export interface Lineage {
  id: string;
  bg: string;
  cloth: ClothCredit;
  accent: string;
  title: string;
  subtitle: string;
  body: string;
  details?: [string, string][];
  praises?: string;
  praisesTranslation?: string;
}

export const LINEAGES: Lineage[] = [
  {
    id: 'nseenene',
    bg: `${CLD}/c_crop,x_300,y_950,w_2500,h_1700/f_auto,q_auto,w_1400,c_limit/creativelynanda/lineage/cloth-barkcloth`,
    cloth: {
      cloth: 'Olubugo, Kiganda barkcloth beaten from the mutuba tree',
      author: 'Rtr PK',
      licence: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Olubugo_(back_cloth).jpg',
    },
    accent: '#C9943A',
    title: 'Nseenene Clan · Buganda Kingdom',
    subtitle: 'Uganda · Nine Generations',
    body:
      'My father is Timothy Nkata Kabali-Kagwa. His father was Frobisher. Before him: Temuteo Mwebe Kaggwa, Mafumu, Muwemba, Lubinga, Sekalongo, Kanyala. Nine generations I can name. We are of the Nseenene Clan, the grasshopper, one of 52 clans of the Buganda Kingdom. Our role in the palace was to milk the Kabaka’s cows. My great-grandmother was Nandawula. A doctor of great means. I carry her name.',
    details: [
      ['Totem', 'Nseenene (Grasshopper)'],
      ['Clan head', 'Omutaka Kalibbala'],
      ['Ancestral seat', 'Nsiisi, Busujju County'],
      ['Omubala (motto)', '“Ggwe Mpagi, ggwe Luwaga; Nakimera muka Ssuuna.”'],
    ],
  },
  {
    id: 'amatshawe',
    bg: `${CLD}/c_crop,x_0,y_1500,w_4480,h_3000/f_auto,q_auto,w_1400,c_limit/creativelynanda/lineage/cloth-umbhaco`,
    cloth: {
      cloth: 'Umbhaco, Xhosa ochre cloth with black braid and buttons',
      author: 'Rhodapenmarck',
      licence: 'CC0',
      source: 'https://commons.wikimedia.org/wiki/File:D%C3%A9tail_de_costume_Umbhaco,_Afrique_du_Sud,_collection_priv%C3%A9e_de_Ariane_Mawaffo.jpg',
    },
    accent: '#C1292E',
    title: 'AmaTshawe · Xhosa Nation',
    subtitle: 'Eastern Cape · Oldest Royal House in South Africa',
    body:
      'On my mother’s side flows AmaTshawe, the founding dynasty of the Xhosa nation, established before 1600 CE. Tshawe defeated his brother Cirha to unify the Xhosa clans. Every Xhosa king descends from him. His kingdom stretched from the Mbhashe River to the Gamtoos River. The royal bloodline: Tshawe → Ngcwangu → Sikhomo → Togu → Ngconde → Tshiwo → Phalo → to Hintsa, murdered by British colonial forces in 1835.',
    details: [
      ['Nation', 'amaXhosa'],
      ['Isiduko', 'AmaTshawe'],
      ['Territory', 'Eastern Cape'],
    ],
  },
  {
    id: 'amahlubi',
    bg: `${CLD}/f_auto,q_auto,w_1400,c_limit/creativelynanda/lineage/cloth-shweshwe-brown`,
    cloth: {
      cloth: 'Isishweshwe, the printed cotton of the southern highlands',
      author: 'HelenOnline',
      licence: 'CC BY-SA 3.0',
      source: 'https://commons.wikimedia.org/wiki/File:Brown_shweshwe.jpg',
    },
    accent: '#7A9E7E',
    title: 'AmaHlubi · The Ancient Nation',
    subtitle: 'Traced to Kenya · 900–1300 CE',
    body:
      'I am also amaHlubi, one of the oldest Bantu nations on the continent, traced to the Samburu people of present-day Kenya. Settled in the Drakensberg mountains, they were so formidable that Shaka’s amaZulu kept peace treaties with them. The Mfecane shattered the nation like glass. The fragments landed in the Eastern Cape. My people were among them, absorbed into Xhosa language and custom, but never fully erased. The amaHlubi do not disappear. They migrate. They endure. They rebuild.',
    details: [
      ['Language', 'IsiHlubi (Tekela, endangered)'],
      ['Dynasty founded', '~1300 CE (King Chibi)'],
      ['Lineage note', 'Moshoeshoe I had a Hlubi great-grandfather'],
    ],
  },
  {
    id: 'msimango',
    bg: `${CLD}/f_auto,q_auto,w_1400,c_limit/creativelynanda/lineage/cloth-shweshwe-blue`,
    cloth: {
      cloth: 'Isishweshwe in indigo, the original colour of the cloth',
      author: 'HelenOnline',
      licence: 'CC BY-SA 3.0',
      source: 'https://commons.wikimedia.org/wiki/File:Blue_shweshwe.jpg',
    },
    accent: '#C9943A',
    title: 'Msimanga · oThabizolo',
    subtitle: 'AmaHlubi Royal Branch · Drakensberg',
    body:
      'And I am Msimanga. oThabizolo. The praise name means: the ones who were happy the day before. My ancestor Msimanga, son of King Busobengwe of the amaHlubi, celebrated the night before the throne was to be named, certain of being chosen. His father named Mthimkhulu I instead. Msimanga built AmaShwabada from that moment. He became the Establisher. The name Msimanga itself means: to confirm, to strengthen, to make firm. I understand this story. I build before the world confirms it is possible. I celebrate what I am building. And then I build it anyway.',
    praises:
      'Msimanga · Thabizolo · Nonkosi · Mlotshwa · Ngelengele · Wena owehla ngesilulu abafokazane behla ngezinyawo',
    praisesTranslation: 'You descended by ladder while the commoners descended on foot',
  },
];

// The Kiganda self-introduction (Okwʼeyanjula) — how a Muganda names their line.
// Verbatim from Nanda's family record.
export const KIGANDA_INTRODUCTION = [
  'I am Nandawula Nkata Kabali-Kagwa.',
  'Muwala of Timothy Nkata Kabali-Kagwa, of Johannesburg.',
  'Grandchild of Frobisher Kabali-Kagwa, of Makindye Ssabaggabo, Wakiso.',
  'Great-grandchild of Temuteo Mwebe Kaggwa, resting in Kira, Namugongo.',
  'Of Mafumu, of Muwemba, of Lubinga, of Sekalongo, of Kanyala.',
  'My line (Olunyiriri) is of Kabombola, from Kyakasuku, Lwamagwa, Kooki.',
  'My stem (Omutuba) is of Segoma, in Kayenje, Butambala.',
  'My sub-lineage (Ssiga) is of Kajubi, in Bujubi.',
  'My totem is Nsenene. My segment (Akabbiro) is Nabangogoma.',
  'Our clan leader is Kalibbala, who reigns from Nsiisi in Busujju.',
];
