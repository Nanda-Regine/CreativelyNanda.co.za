/**
 * 📱 The App Studio — the screens.
 *
 * One hundred real screenshots, taken on a phone in a browser on 30 August
 * 2026, of three live products. Each was looked at before it was listed here:
 * the manifest is written by hand from a contact-sheet review, not generated
 * from the folder. Screens arrive on Cloudinary via
 * `node scripts/upload-app-screens.mjs`, which reads this file, so nothing is
 * uploaded that is not listed here.
 *
 * Privacy (decided with Nanda, 2026-09-28): the VarsityOS screens are from her
 * own account and are shown as they are, at her choice. One screen was left
 * out because it shows what appears to be a home address (20260830_175638).
 *
 * `id` is the capture time from the filename, HHMMSS, which is also the order
 * the screens were taken in.
 */

export type AppKey = 'k53' | 'varsityos' | 'sanyu';

export interface StudioApp {
  key: AppKey;
  name: string;
  line: string;
  /** Source folder under /public. The files are not deployed; Cloudinary serves them. */
  folder: string;
  accent: string;
  live: string;
  /** Links to /forge/floor/[dossier]. */
  dossier: string;
  /** The screen that stands for this app in the hero. */
  cover: string;
}

export interface Screen {
  id: string;
  app: AppKey;
  chapter: string;
  caption: string;
}

export const STUDIO_APPS: StudioApp[] = [
  {
    key: 'varsityos',
    name: 'VarsityOS',
    line: 'The operating system for South African student life. Study, money, career, safety, food and community, with Nova in the middle of it.',
    folder: 'varsiyos_app_screenshots',
    accent: '#2EC4B6',
    live: 'https://varsityos.co.za',
    dossier: 'varsityos',
    cover: '174632',
  },
  {
    key: 'k53',
    name: 'K53 Drill Master',
    line: 'Learner’s licence drills for the phone people actually own. Real signs from the national manual, drilled until they stick.',
    folder: 'k53_and_sanyu_app_screenshots',
    accent: '#FFB81C',
    live: 'https://k53drillmaster.co.za',
    dossier: 'k53-drill-master',
    cover: '173050',
  },
  {
    key: 'sanyu',
    name: 'Sanyu Botanicals',
    line: 'The storefront for a hand-made hair and scalp care line. Heritage copy, real product photography, ZAR checkout.',
    folder: 'k53_and_sanyu_app_screenshots',
    accent: '#C9943A',
    live: 'https://sanyubotanicals.co.za',
    dossier: 'sanyu',
    cover: '174028',
  },
];

export const APP_BY_KEY = Object.fromEntries(STUDIO_APPS.map((a) => [a.key, a])) as Record<AppKey, StudioApp>;

const s = (app: AppKey, chapter: string, rows: [string, string][]): Screen[] =>
  rows.map(([id, caption]) => ({ id, app, chapter, caption }));

export const SCREENS: Screen[] = [
  // ── K53 Drill Master ─────────────────────────────────────────────────────
  ...s('k53', 'Home', [
    ['173050', 'Today’s session, and a nervous-system radar of the areas that need work.'],
    ['173100', 'The drill catalogue. Twenty modes, filtered by vehicle code.'],
  ]),
  ...s('k53', 'Gauntlets', [
    ['173112', 'The Heavy Vehicle Gauntlet for Codes 10 and 14, with an exam simulator.'],
    ['173127', 'The Road Rules Gauntlet. Ten rounds, each with its own score.'],
    ['173140', 'The Vehicle Controls Test. 102 questions across twenty categories.'],
    ['173153', 'Scenario Drill. Fifty-six modules of situational questions.'],
  ]),
  ...s('k53', 'Road signs', [
    ['173147', 'The Sign Shape Trainer. Shape first, then colour, then the full sign.'],
    ['173323', 'The Road Signs Quiz. An exam mode, or drill one category at a time.'],
    ['173330', 'A stop sign, answered, with the rule explained.'],
    ['173334', 'A warning sign read correctly, and why.'],
    ['173340', 'Study mode. The sign, its name and its rule, one card at a time.'],
    ['173410', 'A wrong answer, corrected on the spot.'],
    ['173418', 'Wrong, then right. The explanation stays on the screen.'],
    ['173429', 'Most easily confused with: a sign set against its look-alikes.'],
  ]),
  ...s('k53', 'Numbers', [
    ['173445', 'Know Your Numbers. Distances, speeds, times, ages and masses.'],
    ['173450', 'The Pattern Map. Every value the test asks about, grouped by family.'],
    ['173509', 'Weak Spots Review. Drills built from your lowest scores.'],
  ]),

  // ── Sanyu Botanicals ─────────────────────────────────────────────────────
  ...s('sanyu', 'The shop', [
    ['174018', 'The Signature Oil. Black cumin, castor, hemp seed and olive, cold-infused for weeks.'],
    ['174024', 'The Hair Growth Balm, written as an inheritance rather than a trend.'],
    ['174028', 'The Ritual Duo. Oil opens the way, balm closes it.'],
    ['174136', 'The shop, as a customer meets it in the browser.'],
    ['174141', 'The Oil Duo. One for your shelf, one for someone you love.'],
    ['174150', 'The balm, held in a hand, with its batch number.'],
    ['174154', 'The Signature Oil, photographed where it was made.'],
    ['174201', 'Cold-pressed. Infused over weeks. Nothing synthetic.'],
  ]),

  // ── VarsityOS ────────────────────────────────────────────────────────────
  ...s('varsityos', 'Home', [
    ['174556', 'A critical budget alert, and a recovery protocol for a week that slipped.'],
    ['174614', 'Today at a glance. Budget left, days to the exam, what is overdue.'],
    ['174624', 'Weather-aware planning, and the daily wellbeing check-in.'],
    ['174632', 'The burnout radar and money health, side by side.'],
    ['174640', 'Today’s brief from Nova, with one focus and three steps.'],
    ['174647', 'The week in numbers, and Nova’s reflection on it.'],
    ['174655', 'The budget coach, on the dashboard where it will be seen.'],
  ]),
  ...s('varsityos', 'Study', [
    ['174719', 'The Study Planner. Every task can be broken down by Nova.'],
    ['174732', 'The week’s schedule.'],
    ['174738', 'The timetable, with calendar import.'],
    ['174745', 'Exams, past and upcoming.'],
    ['174752', 'The pass calculator. What you need on the work that is left.'],
    ['174759', 'A flashcard deck, built by hand or from a document.'],
    ['174818', 'The wellness check-in: sleep, stress, connection, energy.'],
    ['174830', 'The science of sleep, in plain language.'],
    ['174836', 'A chronotype quiz, to plan study around the body.'],
    ['174840', 'Modules, linked to tasks, exams and the timetable.'],
    ['174844', 'A focus timer.'],
    ['174856', 'The habit builder. Small habits, compound results.'],
    ['174904', 'Habit packs, from Morning Launch to Money Smart.'],
    ['174912', 'The graduation audit. Can I graduate on time?'],
    ['174916', 'Understanding the gaps: failed core modules, credit shortfalls, the NSFAS N+ rule.'],
    ['174932', 'Attendance, measured against the 80% rule.'],
    ['174959', 'Study velocity. Which modules are falling behind.'],
    ['175016', 'Past papers. Paste one in and Nova estimates the topics.'],
    ['175026', 'The grade forecast for a module.'],
  ]),
  ...s('varsityos', 'Money', [
    ['175050', 'The month’s budget, in rand.'],
    ['175103', 'Expenses, with a receipt scanner.'],
    ['175109', 'Income and savings goals.'],
    ['175114', 'The fees tracker. What is owed to the university, and when.'],
    ['175122', 'A monthly data budget, because data costs money here.'],
    ['175131', 'A financial health score, with Nova’s advice on food and transport.'],
    ['175138', 'The NSFAS appeal letter generator.'],
    ['175142', 'Credit education. The five factors that build a score.'],
    ['175146', 'The South African credit score bands.'],
    ['175150', 'How to build credit from zero, as a student.'],
    ['175158', 'Your rights under the National Credit Act.'],
    ['175204', 'The money health calculator.'],
  ]),
  ...s('varsityos', 'Career', [
    ['175220', 'Career OS. A CV that fills itself from your modules.'],
    ['175224', 'Mock interviews, by role.'],
    ['175228', 'The skills gap for a chosen career.'],
    ['175235', 'The application tracker.'],
    ['175241', 'LinkedIn profile strength, with a headline formula.'],
    ['175252', 'A job board of NSFAS-safe part-time work.'],
  ]),
  ...s('varsityos', 'Life', [
    ['175308', 'A fitness tracker, measured against the WHO’s 150 minutes.'],
    ['175311', 'The science of moving, and the case for the campus gym.'],
    ['175319', 'Meal Prep. An AI meal plan, and “what can I cook?”.'],
    ['175323', 'A week of meals.'],
    ['175327', 'The grocery cart, priced.'],
    ['175331', 'Twenty South African student recipes, costed.'],
    ['175338', 'Today’s nutrition.'],
    ['175343', 'A starter basket that feeds you for a week.'],
    ['175347', 'The food budget, and one-tap meal logging.'],
  ]),
  ...s('varsityos', 'Community', [
    ['175404', 'The campus feed.'],
    ['175409', 'Around. Let classmates know where you are, for an hour or two.'],
    ['175415', 'Focus rooms. Study together, apart.'],
    ['175421', 'Clubs and societies.'],
    ['175425', 'Study twins.'],
    ['175430', 'An accountability partner, for one goal.'],
    ['175434', 'Aid. Umuntu ngumuntu ngabantu: offer help, or ask for it.'],
    ['175438', 'The student wisdom archive.'],
  ]),
  ...s('varsityos', 'Safety', [
    ['175449', 'Safety OS. Safe Walk, and GBV and sexual health support.'],
    ['175457', 'Press and hold for SOS, with South Africa’s emergency numbers.'],
    ['175500', 'Walk Me Home. A timer that alerts your contacts if you don’t arrive.'],
    ['175548', 'The campus safety map.'],
    ['175552', 'Self-defence basics.'],
    ['175556', 'Emergency contacts.'],
    ['175604', 'An anonymous incident report.'],
    ['175615', 'Legal rights: when stopped by SAPS, as a tenant, at work.'],
  ]),
  ...s('varsityos', 'Getting around', [
    ['175626', 'Movement OS. A route planner that knows about minibus taxis.'],
    ['175644', 'Minibus taxi tips, Uber safety, lift club etiquette.'],
    ['175648', 'A default route, with a buffer for load shedding.'],
  ]),
  ...s('varsityos', 'Civic', [
    ['175703', 'Civic education. Know your rights, use your power.'],
    ['175711', 'Rights, by topic: SAPS, tenancy, consumer law, labour.'],
    ['175718', 'Voting. Who can vote, how to register, and why it matters.'],
  ]),
];

export const cldScreenId = (sc: Pick<Screen, 'app' | 'id'>) => `creativelynanda/app-screens/${sc.app}/${sc.id}`;

export const chaptersOf = (app: AppKey) => Array.from(new Set(SCREENS.filter((x) => x.app === app).map((x) => x.chapter)));

export const SCREEN_BY_ID = Object.fromEntries(SCREENS.map((x) => [x.id, x])) as Record<string, Screen>;

// ─────────────────────────────────────────────────────────────────────────────
// Going deeper: journeys and anatomy
// ─────────────────────────────────────────────────────────────────────────────

/**
 * A journey is a real flow through a product, told in the order a person would
 * move through it. The narration describes what each screen does; it does not
 * invent a user or claim an outcome.
 */
export interface Journey {
  slug: string;
  app: AppKey;
  title: string;
  line: string;
  steps: { id: string; say: string }[];
}

export const JOURNEYS: Journey[] = [
  {
    slug: 'five-days-of-money',
    app: 'varsityos',
    title: 'Five days of money left',
    line: 'A budget alert, and everything the app does next.',
    steps: [
      { id: '174556', say: 'The alert arrives in plain words, with the arithmetic behind it, and a way out.' },
      { id: '175131', say: 'Nova reads the spending and speaks to it: food is the anchor, transport is tight.' },
      { id: '175343', say: 'A starter basket that feeds you for a week, priced item by item.' },
      { id: '175347', say: 'The food budget becomes a daily allowance, and meals are logged in one tap.' },
      { id: '175138', say: 'If the money problem is NSFAS, the appeal letter can be drafted here.' },
      { id: '174640', say: 'The next brief from Nova leads with the money, then gives one focus for study.' },
    ],
  },
  {
    slug: 'the-walk-home',
    app: 'varsityos',
    title: 'The walk home',
    line: 'Safety, designed for the moment you need it.',
    steps: [
      { id: '175449', say: 'Safety OS opens on the two things people reach for first: a safe walk, and support.' },
      { id: '175500', say: 'Walk Me Home. Choose how long the walk should take. If you don’t arrive, your contacts are told.' },
      { id: '175457', say: 'SOS is press and hold. The emergency numbers are on the same screen.' },
      { id: '175548', say: 'The campus safety map, built from reports by students.' },
      { id: '175604', say: 'If something happens, it can be reported anonymously.' },
      { id: '175615', say: 'And your rights: when stopped by SAPS, as a tenant, at work.' },
    ],
  },
  {
    slug: 'will-i-graduate',
    app: 'varsityos',
    title: 'Will I graduate on time?',
    line: 'The question nobody asks out loud, answered with numbers.',
    steps: [
      { id: '174912', say: 'The graduation audit starts with the question itself.' },
      { id: '174916', say: 'Then it explains the rules that decide it: failed core modules, credit shortfalls, the N+ rule.' },
      { id: '174932', say: 'Attendance, measured against the 80% most universities require.' },
      { id: '174959', say: 'Which modules are falling behind this week, in hours.' },
      { id: '175026', say: 'What you need on the work that is left.' },
      { id: '175016', say: 'And past papers, pasted in, so Nova can estimate the topics.' },
    ],
  },
  {
    slug: 'wrong-to-right',
    app: 'k53',
    title: 'From wrong to right',
    line: 'How a road sign goes from a guess to a reflex.',
    steps: [
      { id: '173050', say: 'Today’s session is chosen for you, from the areas you are weakest in.' },
      { id: '173323', say: 'Road signs: an exam mode, or one category at a time.' },
      { id: '173410', say: 'A wrong answer. The right one fills green beside it, and the reason appears underneath.' },
      { id: '173418', say: 'The explanation stays on screen until you choose to move on.' },
      { id: '173429', say: 'Signs that look alike are drilled against each other.' },
      { id: '173509', say: 'And your weakest areas become a drill of their own.' },
    ],
  },
  {
    slug: 'jar-to-cart',
    app: 'sanyu',
    title: 'From the jar to the cart',
    line: 'A hand-made product, sold in its own voice.',
    steps: [
      { id: '174201', say: 'The brand opens on the making: cold-pressed, infused over weeks, nothing synthetic.' },
      { id: '174018', say: 'The Signature Oil, photographed outdoors, with its botanicals named.' },
      { id: '174024', say: 'The balm, written as an inheritance rather than a trend.' },
      { id: '174028', say: 'The two together, as a ritual: oil opens the way, balm closes it.' },
      { id: '174136', say: 'And the shop, priced in rand, one tap from the cart.' },
    ],
  },
];

/**
 * Anatomy: a screen read closely. Pins are placed as percentages of the
 * screenshot. Where the reason for a design is recorded in a build journal,
 * `source` names it; otherwise the note describes what the design does.
 */
export interface Pin {
  x: number;
  y: number;
  title: string;
  note: string;
  source?: string;
}

export interface Anatomy {
  id: string;
  title: string;
  pins: Pin[];
}

export const ANATOMY: Anatomy[] = [
  {
    id: '173410',
    title: 'A wrong answer, read closely',
    pins: [
      { x: 50, y: 9, title: 'Where you are', note: 'Question and score at the top, before anything else.' },
      { x: 32, y: 54.5, title: 'The right answer, filled green', note: 'The whole button fills, not just its border. On budget displays with weak colour accuracy a thin border change is easy to miss. A filled button is not.', source: 'K53 build log, phase 14' },
      { x: 42, y: 68.5, title: 'Your answer, filled red', note: 'Right beside the correct one, so the comparison takes no effort.' },
      { x: 50, y: 84, title: 'The reason, straight away', note: 'The explanation appears under the answer, not on a results page at the end, when the question is already forgotten.' },
      { x: 42, y: 94, title: 'One next step', note: 'A single, full-width button. There is nothing else to decide.' },
    ],
  },
  {
    id: '173050',
    title: 'The home screen',
    pins: [
      { x: 50, y: 19, title: 'One tap to start', note: 'Today’s session picks a short set for you. The hardest part of revising is choosing what to revise.' },
      { x: 26, y: 36, title: 'Weakest area first', note: 'The Improve card leads with the area you know least, and shows the percentage.' },
      { x: 50, y: 64, title: 'The test, as a map', note: 'The radar shows which parts of the test are trained and which are not, in one glance.' },
      { x: 50, y: 87, title: 'One question bank, filtered by code', note: 'Every question is tagged with the vehicle codes it applies to, so a motorbike learner never sees truck braking distances.', source: 'K53 build log, phase 2' },
      { x: 50, y: 96, title: 'Icons, not emoji', note: 'The navigation icons are SVG. Emoji render differently on Samsung, Tecno and Xiaomi skins; an SVG looks the same on all of them.', source: 'K53 build log, phase 11' },
    ],
  },
  {
    id: '174556',
    title: 'A bad week, handled',
    pins: [
      { x: 50, y: 23, title: 'Critical, in plain words', note: '“Money runs out in less than 5 days”, with the arithmetic that got there.' },
      { x: 34, y: 32, title: 'A way out, not just a warning', note: 'The alert carries its own action: emergency mode for the budget.' },
      { x: 80, y: 32, title: 'Snooze for four hours', note: 'The student decides when to deal with it. An alert you cannot put down is one you learn to ignore.' },
      { x: 50, y: 47, title: 'No shame in the copy', note: '“That’s okay, every student hits this.” The app expects bad weeks and says so.' },
      { x: 35, y: 55, title: 'Recovery in ten minutes', note: 'A four-step protocol to get back on track, offered as a button, not a lecture.' },
    ],
  },
  {
    id: '174632',
    title: 'Money and mood on one screen',
    pins: [
      { x: 50, y: 28, title: 'How are you feeling?', note: 'Five faces, one tap, from Tough to On fire. A check-in that costs nothing to answer.' },
      { x: 32, y: 45, title: 'The burnout radar', note: 'A score out of a hundred, with its trend beside it.' },
      { x: 32, y: 65, title: 'Money health, right below', note: 'The argument of the whole app: money stress and study stress are the same stress, so they belong on the same screen.' },
    ],
  },
  {
    id: '175457',
    title: 'The SOS screen',
    pins: [
      { x: 50, y: 37, title: 'Press and hold', note: 'A tap can happen in a pocket. A hold cannot. An alarm people trust has to be hard to set off by accident.' },
      { x: 50, y: 47, title: 'It says what will happen', note: 'Your location, sent to your saved contacts. Spelled out before you ever need it.' },
      { x: 50, y: 72, title: 'The numbers, always there', note: 'Police, ambulance, fire, SMS emergency and the GBV helpline, readable with no signal at all.' },
      { x: 11, y: 30, title: 'Safety as one system', note: 'SOS, Walk Me Home, the safety map, self-defence, contacts, reporting and legal rights share one rail.' },
    ],
  },
  {
    id: '174018',
    title: 'A product page',
    pins: [
      { x: 50, y: 33, title: 'Real product, real light', note: 'Photographed outdoors among leaves, not on a white sweep. It looks made by hand, because it was.' },
      { x: 38, y: 51, title: 'The object, named', note: '50ml, amber dropper. What will arrive in your hand.' },
      { x: 50, y: 65, title: 'Heritage before ingredients', note: 'The copy opens with a story and names the botanicals after it.' },
      { x: 20, y: 88, title: 'Rand, up front', note: 'The price in ZAR beside the button. No conversion, no surprise at checkout.' },
      { x: 70, y: 88, title: '“Enter the ritual”', note: 'The call to action speaks in the brand’s voice instead of “Buy now”.' },
    ],
  },
];
