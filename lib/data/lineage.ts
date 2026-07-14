// ─────────────────────────────────────────────────────────────────────────────
// Nanda's lineage — her own words, as already published on /about, plus the
// authentic Kiganda introduction and Nsenene clan motto from her family record
// (public/assets/Nsenene Lineage..pdf). Nothing here is invented; it is sourced
// from Nanda's documents. Shared so the About page and the poetry Lineage Room
// can draw from one source of truth.
// ─────────────────────────────────────────────────────────────────────────────

export interface Lineage {
  id: string;
  bg: string;
  accent: string;
  icon: string;
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
    bg: '/assets/art/jewel.jpg',
    accent: '#C9943A',
    icon: '🦗',
    title: 'Nseenene Clan · Buganda Kingdom',
    subtitle: 'Uganda · Nine Generations',
    body:
      'My father is Timothy Nkata Kabali-Kagwa. His father was Frobisher. Before him: Temuteo Mwebe Kaggwa, Mafumu, Muwemba, Lubinga, Sekalongo, Kanyala. Nine generations I can name. We are of the Nseenene Clan — the grasshopper — one of 52 clans of the Buganda Kingdom. Our role in the palace was to milk the Kabaka’s cows. My great-grandmother was Nandawula. A doctor of great means. I carry her name.',
    details: [
      ['Totem', 'Nseenene (Grasshopper)'],
      ['Clan head', 'Omutaka Kalibbala'],
      ['Ancestral seat', 'Nsiisi, Busujju County'],
      ['Omubala (motto)', '“Ggwe Mpagi, ggwe Luwaga; Nakimera muka Ssuuna.”'],
    ],
  },
  {
    id: 'amatshawe',
    bg: '/assets/art/bloom.jpg',
    accent: '#C1292E',
    icon: '👑',
    title: 'AmaTshawe · Xhosa Nation',
    subtitle: 'Eastern Cape · Oldest Royal House in South Africa',
    body:
      'On my mother’s side flows AmaTshawe — the founding dynasty of the Xhosa nation, established before 1600 CE. Tshawe defeated his brother Cirha to unify the Xhosa clans. Every Xhosa king descends from him. His kingdom stretched from the Mbhashe River to the Gamtoos River. The royal bloodline: Tshawe → Ngcwangu → Sikhomo → Togu → Ngconde → Tshiwo → Phalo → to Hintsa, murdered by British colonial forces in 1835.',
    details: [
      ['Nation', 'amaXhosa'],
      ['Isiduko', 'AmaTshawe'],
      ['Territory', 'Eastern Cape'],
    ],
  },
  {
    id: 'amahlubi',
    bg: '/assets/art/navy-floral.jpg',
    accent: '#7A9E7E',
    icon: '🏔',
    title: 'AmaHlubi · The Ancient Nation',
    subtitle: 'Traced to Kenya · 900–1300 CE',
    body:
      'I am also amaHlubi — one of the oldest Bantu nations on the continent, traced to the Samburu people of present-day Kenya. Settled in the Drakensberg mountains, they were so formidable that Shaka’s amaZulu kept peace treaties with them. The Mfecane shattered the nation like glass. The fragments landed in the Eastern Cape. My people were among them — absorbed into Xhosa language and custom, but never fully erased. The amaHlubi do not disappear. They migrate. They endure. They rebuild.',
    details: [
      ['Language', 'IsiHlubi (Tekela, endangered)'],
      ['Dynasty founded', '~1300 CE (King Chibi)'],
      ['Lineage note', 'Moshoeshoe I had a Hlubi great-grandfather'],
    ],
  },
  {
    id: 'msimango',
    bg: '/assets/art/water.jpg',
    accent: '#C9943A',
    icon: '⚡',
    title: 'Msimango · oThabizolo',
    subtitle: 'AmaHlubi Royal Branch · Drakensberg',
    body:
      'And I am Msimango. oThabizolo. The praise name means: the ones who were happy the day before. My ancestor Msimango, son of King Busobengwe of the amaHlubi, celebrated the night before the throne was to be named — certain of being chosen. His father named Mthimkhulu I instead. Msimango built AmaShwabada from that moment. He became the Establisher. The name Msimango itself means: to confirm, to strengthen, to make firm. I understand this story. I build before the world confirms it is possible. I celebrate what I am building. And then I build it anyway.',
    praises:
      'Msimango · Thabizolo · Nonkosi · Mlotshwa · Ngelengele · Wena owehla ngesilulu abafokazane behla ngezinyawo',
    praisesTranslation: 'You descended by ladder while the commoners descended on foot',
  },
];

// The Kiganda self-introduction (Okwʼeyanjula) — how a Muganda names their line.
// Verbatim from Nanda's family record.
export const KIGANDA_INTRODUCTION = [
  'I am Nandawula Nkata Kabali-Kagwa.',
  'Muwala of Timothy Nkata Kabali-Kagwa, of Johannesburg.',
  'Grandchild of Frobisher Kabali-Kagwa, of Makindye Ssabaggabo, Wakiso.',
  'Great-grandchild of Temuteo Mwebe Kaggwa, resting in Kira – Namugongo.',
  'Of Mafumu, of Muwemba, of Lubinga, of Sekalongo, of Kanyala.',
  'My line (Olunyiriri) is of Kabombola, from Kyakasuku – Lwamagwa, Kooki.',
  'My stem (Omutuba) is of Segoma, in Kayenje – Butambala.',
  'My sub-lineage (Ssiga) is of Kajubi, in Bujubi.',
  'My totem is Nsenene. My segment (Akabbiro) is Nabangogoma.',
  'Our clan leader is Kalibbala, who reigns from Nsiisi in Busujju.',
];
