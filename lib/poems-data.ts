// Inside Her Roses - Complete Poetry Collection
// Copyright © 2021 by Nandawula Regine Kabali-Kagwa

export interface Poem {
  id: string;
  slug: string;
  title: string;
  content: string;
  category: 'Romance' | 'Sensual' | 'Life' | 'Personal' | 'Depth' | 'Empowering';
  excerpt: string;
}

export const CATEGORIES = [
  { name: 'All', icon: '🌹', color: 'cherry' },
  { name: 'Romance', icon: '💕', color: 'pink-500' },
  { name: 'Sensual', icon: '🔥', color: 'red-400' },
  { name: 'Life', icon: '🌿', color: 'green-500' },
  { name: 'Personal', icon: '💭', color: 'purple-500' },
  { name: 'Depth', icon: '🌊', color: 'blue-500' },
  { name: 'Empowering', icon: '👑', color: 'gold' },
] as const;

export const POEMS: Poem[] = [
  // ========== ROMANCE ==========
  {
    id: '1',
    slug: 'you',
    title: 'Y O U',
    category: 'Romance',
    excerpt: 'It is late, my eyelids should be taking camp...',
    content: `It is late
My eyelids should be taking camp
My breathing should be on low tide
I can't, I know it is late
But these thoughts I cannot hide

It is late
I am slowly approaching rest
But then I feel the caress of your scent
A promise for another day
"I'm still here" is what it is trying to say

I know it is late
But your eyes are like sunrise
Elevating light into my mind
Darkness decomposed, happiness regenerating
It is always you and that is frightening
I accept that it is late

Although the night has grown old
Fading like the fear inside me
"You entice me" is what I finally know
Scary maybe, but exciting... Definitely

My sleep is late, and the day is born
But now I see two beautiful views
Sun rising behind me and your...
Your eyes
You are next to me, my fellow muse

My heartbeat is never late
To speed through every moment with you
My breathing will always rush in currents
Just in time to crash with yours
This... I can never be late for this
With you`,
  },
  {
    id: '2',
    slug: 'criminal-of-the-night',
    title: 'Criminal Of The Night',
    category: 'Romance',
    excerpt: 'Criminal of the night, broke into her thoughts...',
    content: `Criminal of the night
Broke into her thoughts
Robbed her dreams
Made them his

It was a shadow at first
Slick moves into her chambers
Silence, heavy breathing
Her arousal was in danger

For the walls leaked out evidence
Erotic thoughts lay bare
Like her silhouette
To the fortunate witness

Criminal of the night
Found his prized possession
In the nude... For the taking
Hands ready for trespassing

Criminal of the night
Broke into her thoughts
Robbed her dreams
Made them his
But it became their own

Bliss filled veins
Turned nude into pink
Wet rewards left her remote
And he controlled

Pressed buttons
Evidence now a crime scene
Again and again, then no more
A sigh from tender chest

Breeze from empty sheets
Gone is the culprit
Left her nude and pleased

Criminal of the night
Broke into her thoughts
Robbed her dreams
Made them theirs`,
  },
  {
    id: '3',
    slug: 'court-date',
    title: 'Court Date',
    category: 'Romance',
    excerpt: 'He wanted to write her a letter, telling her how he feels...',
    content: `He wanted to write her a letter
Telling her how he feels
But there is no amount of ink that could align the maze of words
Paper will cease to exist if he were to invade it with all his feelings

But
She can feel the current of his static infatuation
She can see the array of emotion scattered through his eyes
She can... See all the evidence to this case

Will he win?
Or will he be sentenced to life apart from her?
Being a criminal for the raw art his heart possessed
Art that made her feel like a masterpiece`,
  },
  {
    id: '4',
    slug: 'ms-universe',
    title: 'Ms Universe',
    category: 'Romance',
    excerpt: 'He was weakened by the universe she possessed in her orbs...',
    content: `He was weakened by the universe she possessed in her orbs
Her emotions in different worlds
Hoping to be seen through the constellations of facade

Reality's grip on him withered
His mind went out of space and
His sanity became a curious astronaut
Seeking a hypothesis to heal her soul

Then he saw her helplessly reaching out
From deep within her milky ways
So, he fought and fought
Through every starry tear that shot at him
Tears that he only saw as Shooting Stars
Then he made a wish to set her free
Free from the gravities of her lonely worlds`,
  },
  {
    id: '5',
    slug: 'maybe',
    title: 'M A Y B E',
    category: 'Romance',
    excerpt: 'Maybe it was how his eyes were her spotlight...',
    content: `Maybe it was how
His eyes were
Her spotlight

Solely focused... Desire specified
Her silhouette equivalent to the night
A night filled with protesting instruments
Voluminous tunes
Slithering Her hips into harmony

Maybe it was a transcript
A secret note that only
The floor and Her heels will ever write
It being a love letter
Written exclusively for Him because
There She was

Only a pitch away and
His respirations proceeded to compete
With the drums

Or maybe it was Her hips
Draped in dangerous red
A duplicate shade of Her lips
Lips that rose up
Solely focused... Desire specified
To seal the letter`,
  },
  {
    id: '6',
    slug: 'for-you',
    title: 'For You',
    category: 'Romance',
    excerpt: "I'd rob the heavens of its serenity...",
    content: `I'd rob the heavens of its serenity
Only to have it set into gentle hues of pink
Shades that grace your lips so perfectly
To become prisoner for intruding on such beauty
Beauty that's beyond my reach
But you capture ever so effortlessly

For You, I'd lay myself on cactus thorns
To divert any pain away from your delicacy
That way... No tear will trek your cheeks I adore

Your authenticity will always be above all
On a throne equivalent to the distance of galaxies
Where you belong`,
  },
  {
    id: '7',
    slug: 'harmonies-misunderstood',
    title: 'Harmonies Misunderstood',
    category: 'Romance',
    excerpt: 'He had the grace of a grand piano...',
    content: `He had the grace of a grand piano
His melodies going in harmony with her playful mind
But she thought she knew the song that his intentions played
As she went along, dancing to false prophets... Utter lies

The mind games proceeded, and the more she danced along
The music got to her heart and down she fell when the bass dropped
His melodies got deeper and serenaded was she
Volumes pounded and pounded... It just did not stop

The slow tempo began
Her shield began to crumble, and her clothes disappeared
Her voice became his chorus, her plea became his ending
Oh, sweet melodies got distant, fading into silence

The song ended and she has been played
But he... Turned the next page`,
  },
  {
    id: '8',
    slug: 'willing',
    title: 'Willing',
    category: 'Romance',
    excerpt: 'I will hold you until your storms subside into sunny times...',
    content: `I will hold you until your storms subside into sunny times
So, we can indulge in the happiness of our rainbow smiles
The sweet rain that left gentle trails down your chubby cheeks
Has watered my heart that has fonder fruits of love,
OH, so sweet

I will tickle you until your laughter melts your cold grudges from your past
Forgiveness will start to snow, and you will be free at last
I will be there like a tic and suck negativity off your chin
So, you can be light-hearted, like a feather and not so grim

I will and I would
I can and I could
Do all these things and more
Because you are my muse!`,
  },
  {
    id: '9',
    slug: 'home',
    title: 'H o m e',
    category: 'Romance',
    excerpt: 'Home is beyond the four walls that secure me...',
    content: `Home is beyond the four walls that secure me
It is between the melodies of your heartbeat in synchronized with mine
Home is the letters that your kisses send to my skin
Waking up tasty pleasures, oh so divine

Safety is within the gaze that we share and every time, time itself goes immobile
Safety is your presence that barricades all fears away from me
Holding me captive behind your bricks of love in a pile

Home is with you, within our confinements of mutuality, maturity, and humble beginnings
Home... Is our gallery of raw emotions that splatter our walls
An enjambment, forming a masterpiece of who we are becoming
Together`,
  },
  {
    id: '10',
    slug: 'need',
    title: 'Need',
    category: 'Romance',
    excerpt: 'My eyes never needed to lock with yours...',
    content: `My eyes never needed to lock with yours
To see through the reflection of the fire inside you
My skin never needed to be a breath away from yours
To feel the tickles of our intimacy

But
Time needed to be held captive
From running away with our moments
Leaving the memories and The Past Tense behind
Time needed to tire out and slow down
So that when we lock eyes
Words will no longer need to disturb the silence

It needed to rest and stop completely
So that when our bodies carve together like art
We can laugh wholeheartedly in euphoric bliss`,
  },
  {
    id: '11',
    slug: 'font-of-her',
    title: 'FONT OF HER',
    category: 'Romance',
    excerpt: 'He focused on her like a complex scenario...',
    content: `He focused on her like a complex scenario
One that required patience
Effort and more patience again
Like... Learning cursive

She could only be written softly
Strokes feather light and thread thin
An error would ruin her detail
Bruising her beauty... Just bruising!

He cannot adapt to such delicacy
To such supreme standards
He is too bold and too CAPITAL
Nothing italics can fix

So, for her
He lost his title
Minimized and became less bold
No longer commanding and dark

She noticed him then
Now that he is a
Calibri Boy`,
  },
  {
    id: '12',
    slug: 'letter-to-my-lover',
    title: 'Letter to my lover',
    category: 'Romance',
    excerpt: 'Our infatuation was as radiant and plush like fertile soil...',
    content: `Our infatuation was as radiant and plush like fertile soil
Bearing a rose seed of our undiscovered love
But we were never ready for the uncalculated seasons of mixed emotions
Because our growth was rather harsh like the stormy nights we sat through waiting
Waiting for our rose petals to bloom

Oh, but they did, my love
A petal opened when your eyes sung in silence with unspoken feelings
Another opened when my breath got tangled in my throat,
Every time a whisper of your presence kissed my skin
Like a tidal wave... We collided

Your waters of affection clung onto my soil of need
That is when our rose bloomed, my love
As our petals bled redder and our seasons began to change
The more protruding our rose bud became`,
  },
  {
    id: '13',
    slug: 'you-know',
    title: 'You Know',
    category: 'Romance',
    excerpt: 'You know it is Spring when the air alone dances towards the trees...',
    content: `You know it is Spring
When the air alone dances towards the trees
Joining hands with its leaves
Bringing its flowers into glee

You know New Beginnings has awakened from its slumber
Now that opportunity lays ready to be harvested
To be consumed by the deserving
And the willing

Well
I have always known you are the one for me
For every seed you have planted within me
One of love
From the moment your smile put all doubts into a drought
Negativity rotting rapidly

And "I'm worth it", blossoming beautifully
One of respect
For all the times you gave me space
When I was feeling small and insecurities lurking
You were there to water me
Soaking me up and now I am a masterpiece

You just know
And I did
You love me through all my seasons
Not once have I died down
Months have now stumbled into years
Years shall now cascade into a century
Gently, ever so slowly
Because...

I want every moment
To matter like every pulse, we both possess
From our hot summers where irritation reeks from us
To the sombre autumn times where hardship repeats and...
Repeats
It is okay because I already know
That we will make it
We will see more seasons and maybe make our own
As long as I will sing along with the time
Beside you`,
  },
  {
    id: '14',
    slug: 'unspoken',
    title: 'Unspoken',
    category: 'Romance',
    excerpt: 'His words were at the tip of his tongue...',
    content: `His words were at the tip of his tongue
Stumbling and tripping every time they tried to departure
His feelings were causing chaos every time that she smiled at him
Then his heart came running into her hands, she captured

But... He just could not say it
His pride caged in those three words he was feeling
But... His eyes were enough
They screamed those three words like a roar of a volcano
Hoping to burn her with the heat of its passion

But... She remained clueless
Like a dormant seed that is oblivious to its capabilities...
Her capability to love him`,
  },
  {
    id: '15',
    slug: 'every-time',
    title: 'Every Time',
    category: 'Romance',
    excerpt: "She cannot just wake up to the sunrise's kiss...",
    content: `She cannot just wake up to the sunrise's kiss
Without the burden of his absence next to her
She cannot stare in the eyes of the mirror
Without it reminding her of the flaws he always loved
She cannot move on
When all roads leading forward, have street signs with his name on them

She just cannot entangle the web of emotions he has woven into her
When his touch alone seems to detangle them,
Like Rapunzel's brush to her untamed mane

She just cannot seem to grasp sensible thoughts
When his presence holds her prisoner and a slave to all his wishes
She cannot help but feel okay with This, Him, Them`,
  },
  {
    id: '16',
    slug: 'closely-apart',
    title: 'Closely Apart',
    category: 'Romance',
    excerpt: 'We. Almost. Had. It.',
    content: `We. Almost. Had. It.
We were close, like how the river sweeps through the valleys
We were as delicate as the rude awakening of snowflakes on the windowpanes and leaves
But like seasons, Time kept dancing with the watch
To an eternal tune, a theme of consistency

But us...
We could not dance along with them
As if we were a museum, 'You can see but not touch'
But it will always be your river that will flow over my valleys
Even if your snowflakes melt, they will be sliding down my windowpanes anyway

The hand of my feelings will always touch yours
But I hope that the time we do not have, does not loosen your grip`,
  },
  {
    id: '17',
    slug: 'love-war',
    title: 'Love War',
    category: 'Romance',
    excerpt: 'Her heart tore from the strings of suspicion...',
    content: `Her heart tore from the strings of suspicion
As his fingers sent love telegrams to her skin
Her body froze from the danger of his lips
As his voice shot cannons of blissful diction

But as their lips fought war
A battle against trespassing feelings
Selfishness was their victory`,
  },
  {
    id: '18',
    slug: 'still-here',
    title: 'Still Here',
    category: 'Romance',
    excerpt: 'My eyes are not there, to look at yours...',
    content: `My eyes are not there, to look at yours
To have a conversation and make your orbs smile
But the distance that you see
Is how far my heart going fonder... For miles

My lips are not there, to share a dance with yours
To waltz to the music of how we feel
But as long as our music still plays
My heart will always two-step to your heartbeat

My hands are not there, to elevate the hairs on your skin
To swell those goose bumps
But as long as I'm still here
My presence remains through my absence, from our fire within

I am not there, but I am here within the chambers of your soul
Safely tucked in your linen of romance
Always`,
  },
  {
    id: '19',
    slug: 'it-took-one-day',
    title: 'It took one day',
    category: 'Romance',
    excerpt: 'One day for the stars to fall when your glassy eyes caught mine...',
    content: `One day for the stars to fall when your glassy eyes caught mine
For gravity to stop my stormy seas from going angry
It took one day
A time lapse that froze, that became non-existent
Perished into the distance
Distance that became small when you sat next to me

It took one moment
One moment for my pulse to hush
For my heart to rumble in hunger the moment you acknowledged my presence
Then... I knew

I knew that, at that point
I will happily get sliced by your glassy eyes
If it meant bleeding a part of me, because of you
Although distance will put us in the ring
Being a mocking referee.... A spiteful tester
We shall fight for each other and not against

When you touch me
Oh, when touch me
My skin happily starts to waltz with yours
Dancing to the rhythm of our euphoria over and over again
A dance I will happily relive when we meet again
And we shall meet again
Whether it is after many full moons and dozens of sunsets
We shall meet again

Because it is you that turned my little hills into sturdy mountains in a matter of days
It has always been you`,
  },
  {
    id: '20',
    slug: 'art',
    title: 'A R T',
    category: 'Romance',
    excerpt: 'She was so devoid of colour...',
    content: `She was so devoid of colour
She had no idea what it meant
Her contours lay contradicted
To her prim and proper polished demeanour

He fought to be the paintbrush
That defined her rigid flaws
His signature strokes like a lover's touch
That she was never ready for

But her canvas saddened day by day
From his scarring bristle brush
Her curves of shame dropped tears of bitter ink
As it covered the marks he left on display`,
  },
  {
    id: '21',
    slug: 'timeline',
    title: 'Timeline',
    category: 'Romance',
    excerpt: 'It is 11 PM and my body is dressed up in fatigue...',
    content: `It is 11 PM and my body is dressed up in fatigue
My eyes are setting into the horizons of my bottom lashes

12 AM lands in time for the 'Rush Hour' of my thoughts
Anger trying to overtake today's memories
Only to have an accident with guilt

1 AM approaches at the STOP sign
In a neighbourhood where the thought
Of my significant other is present
So, I stay there
And think some more`,
  },
  {
    id: '22',
    slug: 'distant-memory',
    title: 'Distant memory',
    category: 'Romance',
    excerpt: 'Do you remember the days when our adrenaline ran like racehorses?',
    content: `Do you remember the days when our adrenaline ran like racehorses?
While we escaped hand in hand, far away from negative forces
Do you remember the tales that the stars whispered to us?
Every night when we slept side by side, with the breeze hugging us

I remember those days
When your touch sent heaven in one kiss
When your smile blew peace into my veins
When your lips arrested my tears to a joyful place
But you do not remember

Your eyes hold a stare as strong as the ancient statues
Your walls have grown immune to me,
As my waves of sincerity that once cloaked you,
Now crashed back at me in mockery

I hope you will be reminded
When you look up at the stars, that the same old tales, will bring a smile to your face
That the breeze will tug you like welcoming hands, back into my arms
I hope then, that you will remember me`,
  },
  {
    id: '23',
    slug: 'unrest',
    title: 'Unrest',
    category: 'Romance',
    excerpt: 'Our skies were once blue...',
    content: `Our skies were once blue
Our happiness as fat as the clouds that surrounded us
But then, we kept getting darker
Our clouds were no longer blushing white
Instead, they were heavily Grey with anger
The anger that has risen between us

Everything appeared foggy,
From the tears that this unrest has caused
Then we rained
Our pain and tension hurried away like thunder showers
That left our clouds

Only then, did we realise
That we will always be each other's rainbow after every storm`,
  },
  {
    id: '24',
    slug: 'infinity',
    title: 'Infinity',
    category: 'Romance',
    excerpt: 'He is the silence that disciplines my rowdy mind...',
    content: `He is the silence that disciplines my rowdy mind
Putting my thoughts into order
And my feelings into overdrive
He is the sedative to how I feel inside
He holds me down
When my dark days makes us divide

His caress like a written script
That is pledging our intertwine
He is the red that my blood bleeds
Significantly I am His
Together
We are bound like infinity`,
  },
  {
    id: '25',
    slug: 'feelings',
    title: 'F E E L I N G S',
    category: 'Romance',
    excerpt: 'They were trapped in a box...',
    content: `They were trapped in a box
A box that I thought I sealed heavily
With a monstrosity of reassurance bolted in
"I've moved on", boldly labelled at the rear
Then you called my name
Suddenly awakening the criminals inside the box
They grew more rogue and more anxious
Clawing to be within your reach

I had to restrain the breaking box
Immediately applying a layer of certainty
Only for it to weaken and weaken
Because you...

You came closer
The hairs on my skin erected from danger
You said my name again
Then you smiled and suddenly orb against orb
We held gazes
The unforgivable proceeded
The acceleration of my heartbeat blew the box off its hinges
All the criminals sprung free and scattered all over you
To a place where they found peace in
To a place where they felt... Civil
With you`,
  },
  {
    id: '26',
    slug: 'them-us',
    title: 'Them. Us.',
    category: 'Romance',
    excerpt: 'Two paths. Two destinations... Different outcomes',
    content: `Two paths. Two destinations... Different outcomes
But navigation overcame the odds
Suddenly forming a T junction in between
Now it's an "ours" type of journey

A journey that is bluntly intrusive
An error to our intimacy
Our privacy stuck in traffic because there is too much of "them"
And less of..."us"
Accidents frequent because our speed limit is over exceeded
At the expense of "them"
Thee who found control of our gears
Mmmmh, a 'Convoy' is what they call this

So "we" proceeded along this unwanted path
But I wanted you, I clearly indicated towards our own way
Flashed my hazards to steer "them" away
And you. Did. Not. Follow...you stayed

So, I accelerated
My soul being my only fuel because...
You got yours and two hearts beating within you
One being mine trying to jump start yours
Hoping to awaken any feelings for me

It is not a worry though, anymore
I'll clutch and gear 5 straight into my future
A future that has always been my main road
While I have finally left the STOP sign on yours`,
  },
  {
    id: '27',
    slug: 'queen-of-hearts',
    title: 'Queen Of Hearts',
    category: 'Romance',
    excerpt: 'Hearts can play games too...',
    content: `Hearts can play games too
They are stubborn like a soldier seasoned to withstand "a losing battle"
Because he loved her, and she loved him
But denial was too good to be true

He was caged by his past
Fear chained him down and provoked him
"you'll hurt her" like a daily reminder
Hence his heart believed that "she's just another girl"

She was radiant but so cold
Like the reflection on a lone mirror
Her heart weary, her soul famished
Craving the indulgence of loves hunger
Then

Their eyes interlocked and their hearts threw a tantrum
It screamed as they grew closer
Then it cried at the torturous distance
Distance so small, so easy to fix

Silence
Sound grew hollow, space felt micro
But their souls blossomed from their intertwine
The mending of their lips revealed their secret
Passion dripped from their tongue... So abundant

He wanted to capture her entirely
Soul, mind, and body
So fragile, so pristine in his hands
Hands that pledge wonders across her skin
She no longer felt weary, rather quenched
Desire rising over untouched territory
Territory that lays ripe to be harvested
By him`,
  },

  // ========== SENSUAL ==========
  {
    id: '28',
    slug: 'hues-of-romance',
    title: 'Hues of Romance',
    category: 'Sensual',
    excerpt: 'The room lay still and dim, scented candles a scattered crowd...',
    content: `The room lay still and dim
Scented candles a scattered crowd that granted
The Creamy walls with dancers of hues of gold
Who seductively swayed across the walls

Static
Is how she felt as the
Gravitational pull between
Her slickly shaven thighs and
The cashmere lace adorned with
Patterns of lines running in diagonals

Her skin blossomed in shimmering
Sparkles that was crowned by her body butter
Specifically chosen for this occasion
She glanced back at the mirror
Misty eyed in anticipation
Lips as dark as blood

Her breath halted
'He's here'
Her nerves in a pretty mess
Trimmed toes adorned with cherry red
Sunk in step after step in the lustrous carpet
Finding herself on silk sheets pressed to perfection

Anxious he was on the opposite end of the door
His heart a circus entertainer
Performing obtuse flips across his ribcage

He entered and was immediately sunken
Into the clouds of her scent
That wrapped around him like a cloak
And drew him forward into the chambers
Laden with florals and berries

The connection between eye contact
Tangible and elastic tight
Snapped to pieces as soon as his
Orbs patrolled along the cashmere lace

His favourite colour
Her erratic breathing summoned her breasts
To heave deeply like the fore coming of waves
Against the shore that was her bralette
Her barely covered temple
Revealed her garden that lay groomed
In display on the golden platter
That was his eyes

The hues of gold
Teasingly strolled against her skin
Creating trails that his lips wish to follow
He came closer

The tension
From the two seconds between a touch
And a kiss
Made time itself cease to beat`,
  },
  {
    id: '29',
    slug: 'mysterious-tales',
    title: 'Mysterious Tales',
    category: 'Sensual',
    excerpt: 'Mystery took over the atmosphere...',
    content: `Mystery took over the atmosphere
Coats of black shielded her eyes
Yet the scent of cedar wood and citrus
Landed softly on her nose

A gust of steam strobed her neck
Upon the arrival of succulent skin
That graced a pair of lips
Desire out ruled this mystery

Her trail of thought wondering off
To locations only her
Freaky side has ever known

Lips proceeded their stroll along
Petals of ebony plains
Determined to reach the milestone
That was her bosom

To breathe during a war with a moan
Was a battle he knew he could
Finalize and to
Conquer her erotic wave

Her gentle hands draped in innocence
Tantalizingly danced along the miniscule hairs
That stretched their spines along his neck
Down to the fortress of his back

He held his breath
Hoping that the universe could
Grant him with force fields
Worth holding solar systems

In order to
Not break before he sunk into
Her milky ways
Just yet

Her freaky side resided comfortably
In her domain
Her eyes swirling with erotic cosmos
That sucked him in
And in

What is a man to do
When the woman knows exactly
What she wants`,
  },
  {
    id: '30',
    slug: 'hot-cocoa',
    title: 'Hot Cocoa',
    category: 'Sensual',
    excerpt: "Glassy eyes stare at him, lust subtly shielded...",
    content: `Glassy eyes stare at him
Lust subtly shielded by the roof of her lashes
Hues of cocoa glisten under the midnight moon's smile
Rays bowing down to cast her silhouette
Into...perfection

Exhales pushing through aching lungs
Barely escaping the throat that still remains restrained
Imprisoned by the lock of a bicep
Back pasted against masculine pastures
Pastures with consistent hard plains
Ones that soften hastily
From the landing of her touch... So soft
Like whispers of innocence submitting to him

Hungry eyes stare back at her
Where their reflection showcased two bodies,
Morphed into one
Like the intimacy between pen and paper

Then they connected
Like how precision fell in love with cursive
Letters stumbling into letters
Kisses fading into gruesome,
Into brutal,
Into bruising intertwine

Until
Contentment revealed itself from her orbs and
Hues of cocoa glistening gold from the sunny glow`,
  },
  {
    id: '31',
    slug: 'nights-like-this',
    title: 'Nights Like This',
    category: 'Sensual',
    excerpt: 'The taste of her lust lingers sweetly on her tongue...',
    content: `The taste of her lust lingers sweetly on her tongue
Her craving for him swells into an aching need
A need to indulge into her hungry appetite
For... Him

Nights like this
Goosebumps go alert and breathing begins to pause
At the memory of his eyes speaking for his soul
Soul that was pleading to be claimed

Nights like this
She lay under the blanket of reminisce
On the bed that was a witness, with the walls a spectator to their... Crimes
Crimes that never leave beyond the doors

Nights like this
She feels him and she does not mean figuratively,
She feels him as much as she feels reality's burden
Burden that she needs to accept
The burden being that... he is not here
To make another night like That again`,
  },
  {
    id: '32',
    slug: 'a-maidens-touch',
    title: "A Maiden's Touch",
    category: 'Sensual',
    excerpt: 'Silent promises challenged Him through Her eyes...',
    content: `Silent promises challenged Him through Her eyes
Lace petite... Revealing a banquet of delicacies
Godly!
As she led the procession of His curious irises
She sauntered like the feline that ran a kingdom
It being in a curvy form
With waves hovering over an arch that is yet to be...
Moulded, palmed, and moulded over again

Feminine
An adjective of power
From the command she had over Her own body
To Her breath that condensed into due on his lips
His gaze interlocked with the valley she possessed
Heart stuttering, ceasing to count the seconds
Only to gently wilt into a descending melody
At the expense of Her touch

Such soft skin
Sweetened by the luxuries of pampering
But are yet to be tender
To be sculpted
To be romanced beyond what she can give Herself

Then
The monotonous surroundings grew dim
The ceiling swirled like it indulged in too much white wine
Pheromones rippled through Her
As her cries evaporated through the air
In the Hands of masculinity
A foreign tourist seeking the depths of Her land
Uprooting gems She could never dig
Alone`,
  },
  {
    id: '33',
    slug: 'what-babygirl',
    title: 'What Babygirl?...',
    category: 'Sensual',
    excerpt: '"What is it that you want babygirl?"',
    content: `"What is it that you want babygirl?"
The question transported by the wind
Abruptly landing on her core
She clenched
Walls protesting from such restraint

"I want to be dismantled,
Contorted into asymmetrical forms,
Ploughed, dug, and devoured...
Dismantled," she whispered.

Such ravenous verbs escaping innocent lips
Scarce evidence of any harm witnessed
Of any passion pursued
Onto those lips

"Treading dangerous territory calls for a trap,
Webs that will imprison your freedom,
But to set mine free to...
Punish the trespassing," he warned.

She clenched again
Failing to clog up all leakage,
Desire's scent blossoming
Exposing her needs completely

"But...
I feel this calls for a feast,
For my kill that lays ripe and ready,
For my kill that will be served tonight...
In my chambers," he finalized.

"That's what I want,
To be feasted upon,
Dug and devoured."`,
  },
  {
    id: '34',
    slug: 'i-did',
    title: 'I did',
    category: 'Sensual',
    excerpt: 'Have you ever heard the whispers of lust...',
    content: `Have you ever heard the whispers of lust,
Every time he came near?
Predatory eyes, screaming a thousand signs,
Knowing that you will hear.

Have you ever smelt the scent of desire,
That has been roasting in his heart?
Lip biting and tongue Tango,
Many ways he claimed and ripped you apart.

I did
I sang with the whispers that dripped from his lips,
The same lips that recited heaven's secrets.
Like the predator that he is, eyes focused and paws steady,
Dug in to devour me entirely.

I was bathed in that scent, like smoked cuisine.
It's blazing passion putting hell's pits to shame,
Could be felt when our Tango became more provocative.
Yes, he made me feel all that... He made me feel complete.`,
  },
  {
    id: '35',
    slug: 'unravelled',
    title: 'Unravelled',
    category: 'Sensual',
    excerpt: 'Such skin, with scarce blemishes...',
    content: `Such skin, with scarce blemishes
Flawlessness in abundance
Crown Her body like the Queen that she is
Her curves sketch the shadows into perfection
As the dim lights illuminate the royalty of Her body

Her need cries out of her blossom
Winking like the jewels around Her neck
Her breasts stand powerful, like the leader to his following eyes
As his lips bow down to lay his Highness into bliss

He sucked the fantasies out of Her
As Her screams painted fairy tales for the castle to hear`,
  },
  {
    id: '36',
    slug: 'euphoria',
    title: 'Euphoria',
    category: 'Sensual',
    excerpt: 'Him. It has always been him...',
    content: `Him
It has always been him
A tourist that became a citizen in her wetlands
Like a keen scientist, he discovered her
Her waterfalls, a consequence for his testing hypothesis

His lost journeys go deep into her swamp
Opening up clogged pathways,
Untouched corners that have never been sought before
It has always been him
To have found her Forbidden Berry Tree
Ripe and ready for him to harvest

He dug into her like he was searching for a theory
As he quenched his thirst with the endless supply of her juices

His tongue transcribed every bit of his infatuation
Therefore, he made her berries leak
When they leak, her tree flourishes
Now her wetlands are wetter than before`,
  },

  // ========== LIFE ==========
  {
    id: '37',
    slug: 'stardust',
    title: 'Stardust',
    category: 'Life',
    excerpt: 'He wished he knew sooner...',
    content: `He wished he knew sooner
To have noticed the stubborn intensity of denial
That effortlessly ran from his lips
Dedicated to catch up to the "wishful thinker"
Her

Guilt will forever stay rooted within him
Guilt that endured a growth spurt every time
Only to be uprooted by refusal
He simply refused to accept that he was wrong

He wished he were never too late
Late to notice that time has weathered away her patience
It now lay brittle, like the theme of autumn
Broken down further by her "wishes lost"

For she wanted "everlasting"
And he only had "temporary" to give
As the time ran low from dusk until dawn
Their Golden Hourglass chimed their finale

He wished he knew sooner
Now he understood the brutality of "wishes unreceived"
As she had mistaken him for a Shooting Star
When he was just... His Own Light`,
  },
  {
    id: '38',
    slug: 'lost-not-forgotten',
    title: 'Lost, Not Forgotten',
    category: 'Life',
    excerpt: 'I remember the freedom that used to dance along with your smile...',
    content: `I remember the freedom that used to dance along with your smile
The sweet cacophony of your laughter speeding through the air
In hopes of being heard by the stars

I remember how you made many hearts explode with fireworks
As they rumbled like drums and celebrated your presence
In hopes of reciprocating the joy you used to bring

Now the exuberance swung heavily to the tune of lonely silence
The playground as grim as your extended absence
Angry storms of your neglect fought against the fire in our hearts
Eliminating any elated noise, with the thunder of your silence

We still feel the subtle taste of your character within you
It still hangs onto the ice of your shoulder
In hopes of not slipping away
Completely`,
  },
  {
    id: '39',
    slug: 'pick-your-own-poison',
    title: 'Pick Your Own Poison',
    category: 'Life',
    excerpt: 'I would rather float through the Irie Lands on my Ninth Cloud...',
    content: `I would rather float through the Irie Lands on my Ninth Cloud of High Wonders
Than to face the punches from anxiety and reality's daily banter
I would rather take my feelings to an evening dive in the Cognac Seas and Tequila Islands
Than to suffer heavy gazes of disappointment and the stress I cannot withstand

I would rather mix my medicine with some soda,
Just to lean back and have a break
Than to lay down with all these thoughts and have my sanity at stake

Pick your own poison`,
  },
  {
    id: '40',
    slug: 'advice',
    title: 'Advice',
    category: 'Life',
    excerpt: 'We were advised to give our all...',
    content: `We were advised to give our all
To go into a battle, we were not ready for
But...
No warning signs alerted our ears
No
Heart wandering, soul hungry, heart astray
We fought with passion, our shield being the love we abundantly have
Only to have a replenished soul
Damaged, distorted and deranged in all forms

We were advised to move on
As if we conquered this war victoriously
Or...
As if we were hung by defeat around our necks
No
We are tired, our wounds are as fresh as the truth
We are tired from running laps around this cycle
Love and games on repeat, feelings on shuffle
This battle... We were never ready for, we cannot deny

However, we took our own advice
We made the battlefield our home
We turned our pain into therapeutic satisfaction
At the expense of the love, we try to receive`,
  },
  {
    id: '41',
    slug: 'drunken-nights',
    title: 'Drunken Nights',
    category: 'Life',
    excerpt: 'I sway to the chatter of trees and whispers of the breeze...',
    content: `I sway to the chatter of trees and whispers of the breeze
Drowning my therapy as it counselled my nerves of distress
I trip into the embrace of the ground and hover painfully near a puddle
As I look at my reflection, a total drunk mess

As the lightning snapped the silence and the rain swam laps in my hair
I hold my bottle like a trophy towards the sky
Now my body feels more free as the Boulder of burdens go a flee
My nerves make love to the poison as I cry

The bottle goes empty, and it lays shattered like my dreams
I close my eyes and sing along with the breeze
Then my mind stops running to Hell and gets pampered by tales of fantasy
I look again at the puddle to see that I am wasted and free`,
  },
  {
    id: '42',
    slug: 'unseen',
    title: 'Unseen',
    category: 'Life',
    excerpt: 'When I look into your eyes, I see an endless road to fatigue...',
    content: `When I look into your eyes, I see an endless road to fatigue
Heavy storms of tears, waiting to caress your cheeks
I see the broken bridges of the regret that you carry everyday
But oh, your beautiful eyes, lack the shining ray

Worry not, my little angel
For I will dim my light, just to brighten yours
Because such beauty in those emerald orbs
Deserve fine adventures to explore
To explore the lost lands of your happiness and
To find the feelings you have always wanted to confess`,
  },
  {
    id: '43',
    slug: 'rolling-dice',
    title: 'Rolling Dice',
    category: 'Life',
    excerpt: 'What are the chances that you are the most beautiful?',
    content: `What are the chances that you are the most beautiful?
Your focal point only being a #6
What's beauty when your character itself is below that?
An improper ratio, just so your cover speaks a little louder

Why would you be read if your story does not speak?
Your expensive cover, a foggy dream disguising your hidden chapters
When your book is opened, your prologue is already shutting eyes
Then the dice falls and falls
To suddenly land on a sad #1

So, you will begin to see yourself in another angle
In another way
You will roll your dice and humbly smile at your #4 in the mirror
But more hearts will admire the chapters of your soul
More eyes will tremble from the climaxes of your journey

So, the dice turns and turns,
Then lands on a winking #9
A high score for true beauty deserved`,
  },

  // ========== PERSONAL ==========
  {
    id: '44',
    slug: 'pillow-talk',
    title: 'Pillow Talk',
    category: 'Personal',
    excerpt: 'Sleep is that gentle sailing down a stream of nothingness...',
    content: `Sleep is that gentle sailing down a stream of nothingness
No dreams need to butt in
To make thee a pleasant journey
Sleep is that breath of fresh air
Body taking a timeout, mind going overtime however

Overtime
Thoughts are constantly knocking
Then aggressively banging to gain my conscious affection
But I'm tired
I'm worn out already

Not even a caress from my mind
Acknowledging the restless beings
Can tamper their need to be...
Felt
Heard
Experienced again
Experienced again...

I sigh the heaviness out of my lungs
And open the door
I'm sleep deprived and their hungry
So, they cornered me
I looked up at each memory,
Each thought pressing me to...
Inhale the emotions I chose to disguise
To pick up the feelings I shoved under my shoe and...
To live through it, entirely.

Sleep is that heavy weight you feel on your back
Gravity grounding you when your mind won't let you
Won't let you.`,
  },
  {
    id: '45',
    slug: 'note-to-self',
    title: 'Note to self',
    category: 'Personal',
    excerpt: 'Illusion is found in the most obvious of places...',
    content: `Illusion is found in the most obvious of places
It's how our mind is sketched to the concrete conclusion
That its chaos is dark
Gloomy and freakishly lonely
A world that is dreaded to be explored
In the wake of night

Although it is the only destination available for travel
To reach the waiting hand of slumber and dreams
Dear Self, the artistry of the stream lines of thoughts
Are scattered like a museum so big
Cosmos themselves scorn in envy

The vast beauty of memories paint our experiences
In colourful attire, some brighter than others
In show-off allure and vibrancy in abundance
You see... those ones hold the pedestal of desire

We've dragged those with depths of deep colour
Inked them with rudimentary titles and
Perspectives that stay afloat on the surface

Dear Self, the conclusion should be
That your mind is a Runway of fierce art
Tailor made for the figure of your character
That struts in confidence and power

So, fellow mate
The journey to the waiting hand of slumber and dreams
Has always been first class certified
When you admire your art through the eye of adoration
For how far you've come`,
  },
  {
    id: '46',
    slug: 'wild-ones',
    title: 'Wild Ones',
    category: 'Personal',
    excerpt: 'I try to gather my thoughts in a single file...',
    content: `I try to gather my thoughts in a single file
To safely land on paper
But they are not meant for such discipline
They are not meant to be sugar-coated
Only to disguise the fact that they are...
A mess

An eruption of flavours that could leave your tongue feeling bitter...
But satisfied
So, I let them run wild like scavengers
To purge on the blank piece of paper,
On the eyes that will bleed from reading them and
On the soul that has the same madness hidden within their mind
Clawing anxiously to be set free`,
  },
  {
    id: '47',
    slug: 'wonderland',
    title: 'Wonderland',
    category: 'Personal',
    excerpt: 'I wonder when sleep will crawl up on me...',
    content: `I wonder when sleep will crawl up on me
Just to leave the promise of seduction
To ease tensions distorted by stress
I wonder again
When will rest take camp in my mind?
Settling in... only to be eliminated
Eliminated by the wars of my conscience

Then I realized
Sleep refused to tread on predatory premises
Ground that screamed "danger"
Me
If rest ceases to exist within my soul,
Fatigue being the conqueror as I fight
The skeletons in my closet will take over

No
They cannot win
They've held me captive for too long
It's them
Who have overdosed me with restlessness
It's them

So, I retired from the wonders
And settled for the reality that...
I can't sleep`,
  },
  {
    id: '48',
    slug: 'sometimes',
    title: 'Sometimes',
    category: 'Personal',
    excerpt: 'Sometimes I feel like my clock is growing tired...',
    content: `Sometimes I feel like my clock is growing tired
Once healthy hands now trudge through the seconds
Barely making it through the hour
Just... Tired

Sometimes
Sometimes I feel like it's my fault
But how? When destiny is what made the clock... Mine
A determined one, always ready to march forward
But it's now unkempt, beyond dysfunctional

Although the clock was always mine
I feel separate from time itself
As if my purpose is quaking away in fear
In fear of... The Future

The inevitable will forever be lurking behind the shadows of reason
Patiently waiting for "The Moment"
To catch me off guard
Hinging its Jaws to make defeat bleed out of me

But I stay rooted
Consistently like the nodding of the hour hand
As sturdy as the alignment of the 12 soldiers
That remain in their respectful position... Waiting`,
  },
  {
    id: '49',
    slug: 'small-spaces',
    title: 'Small Spaces',
    category: 'Personal',
    excerpt: 'He had a tunnel. A safety cocoon...',
    content: `He had a tunnel.
A safety cocoon highly not recommended for hibernating and,
For masking oneself.
Stripped naked he found comfort
In the cylindrical steel of darkness.
The warmth was evidence to stay and,
'unreachable' was his greatest asset when freedom felt not.

He had a tunnel.
But his residence is overdue and,
Disturbed sensibility permitted this breach.
The tunnel shrunk.
The only light that brought consistent faith,
Of it never diminishing,
Left in silence to be bigger on its own.

Constricted by false fate and acceptance from a heaving soul,
He stayed.
He resided for less.
Then...
Beams of heat licked his back, like a caress of sunrise.
Engulfed his form and for the first time.
He saw cosmos ahead of the solar system,
That felt like "onlys" and "forevers".

Darkness became a retired catalyst,
And morphed into unrecognizable matter.
It's revolting form shredded into blooming colours... into substance
One with a purpose and a name
Life

He has a dream driven by delightful confidence,
And she's awake with her feet sturdy,
To wander the cosmos with him.
A blueprint to infinity and evermore.
They soared
Through S P A C E`,
  },
  {
    id: '50',
    slug: 'deep-dive',
    title: 'Deep Dive',
    category: 'Personal',
    excerpt: 'I am the under bellies of the sea...',
    content: `I am the under bellies of the sea
Where shipwrecks and dead corpses lay
That's how deep I am

You cannot seek these depths
With shallow visions and weak anchors
You cannot expect to touch my sea bed
When you fail to swim to my level of deep
Like I said... That's how deep I am

But be warned
When you reach these depths and the temperature starts to drop
Make room for the strong hugs of my burdens
Brace yourself for the shivers from my suffering

You chose to venture My Deep Sea
So come along
Swim through my shipwrecks of experiences and
The corpses of the feelings I lost
Because that's how deep I am`,
  },
  {
    id: '51',
    slug: 'wronged',
    title: 'Wronged',
    category: 'Personal',
    excerpt: 'He thought he listened to the music of her desire for him...',
    content: `He thought he listened to the music of her desire for him
But he missed the lyrical content that said that she doesn't
He thought he saw the signs that stated that they could be more
But those were not intended to speak to him at all

She was a map he read upside down
He cannot say she's wrong,
Because she wasn't His to read

So he headed back home to his lane in defeat
Separate ways, like her signs have told him`,
  },
  {
    id: '52',
    slug: 'polished-thoughts',
    title: 'Polished Thoughts',
    category: 'Personal',
    excerpt: 'It was dark, but she had light...',
    content: `It was dark, but she had light
But not tangible light, to see in the darkness
It was not a dark room, nor was it lit
So she had her light within her darkness

The light got blinding and the darkness fled
Then peace came rushing to her instead
Her mind shined like Fine China from the light
The peace fought inner wars with all its might

She closed her eyes and it was dark
But her mind still had the blinding light
She laid content
In her little bed
Her polished thoughts
Remained sustained`,
  },
  {
    id: '53',
    slug: 'at-ease',
    title: 'At Ease',
    category: 'Personal',
    excerpt: "I'm at ease knowing that I got myself to fight for...",
    content: `I'm at ease knowing that I got myself to fight for
My dreams a high branch I'm trying to reach for
To climb up to the fruitful blessings to devour

I'm at ease knowing that I know myself completely
My character is no longer a defensive Armour
But a golden sculpture that I display openly

I'm at ease knowing that my soul is devoid of negative thorns and inner wars
I'm no longer pierced by my failures
Instead, I'm crowned by the Diamante sparkles of my worth

As I sit here, on my fortress of discovered confidence
I'm at Ease`,
  },
  {
    id: '54',
    slug: 'out-of-place',
    title: 'Out of place',
    category: 'Personal',
    excerpt: 'These four walls cave in the echoes of my thoughts...',
    content: `These four walls cave in the echoes of my thoughts
Cocooning me in a bubble of self-conflict
I need to escape

I need something to pop this bubble into drops of acceptance
Because I crave to breathe fresh air of self confidence
I need to escape

But my strength is the weapon to set me free
The courage to overcome my downfalls
Is a shield that my strength will need

To pop this bubble
To breathe that fresh air
It all starts with me`,
  },

  // ========== DEPTH ==========
  {
    id: '55',
    slug: 'verbal-murder',
    title: 'Verbal murder',
    category: 'Depth',
    excerpt: 'She was alone and abused...',
    content: `She was alone and abused
However, it was no bruise that tainted her skin like charcoal kisses
She did not live with the pregnant pause of silence in a dark room
Instead, she was within the gazes of accuse

Words shot at her
Bullets poisoned by hatred
Closed companions were behind the trigger
No mercy dripped from their lips
As they awarded their efforts with her tears

But alas her sanity,
Exhausted and bemused,
It gave into them...surrendered

With her heart in tattered rags
Her soul bleached by defeat
Her wounds pleaded mercy to the enemies behind the triggers
Then they left

She continued on
Alone and abused
In a dark room`,
  },
  {
    id: '56',
    slug: 'a-cold-case',
    title: 'A cold case',
    category: 'Depth',
    excerpt: 'Tears hover below my eyelashes in comfort...',
    content: `Tears hover below my eyelashes in comfort
My breathing uneven like a rusted chords tune
I just couldn't comprehend
The darkness in your eyes... Darkness coming from you

My iron tongue turns to rust
Lacking bullets to protect myself from you
My voice goes astray as my tears flee my lashes
You laid your hands on me... Not a dream, it's true

Countless times my body interrupts the floors silence
Even more times the rude departure of my blood invade the tiles
The louder my cries become, the louder the echo of your torment sang back to me
I can't breathe, I can't feel, I'm becoming fragile

I'm now a prisoner to my insecurities
My scars electrify my eyes
Every. Time. I look at myself
I am strong and I won't deny

As I cry
The feeling of your hate will forever grant me with fear
The fear that you...
Loved`,
  },
  {
    id: '57',
    slug: 'baby-steps',
    title: 'Baby Steps',
    category: 'Depth',
    excerpt: '"Hush little baby don\'t you cry..."',
    content: `"Hush little baby don't you cry,
Everything is going to be alright."
Those were supposed to be my words
That gently slept with you as you closed your eyes

But it's your soul that's always with me
That's hushing these thoughts I weep
And I'm sorry
I'm sore
I'm triggered

I didn't understand trigger warnings
Until the moment your angels came
Encouraging you that its okay... Mommy loves you
It's okay

I didn't understand until I felt only my heart beat
Yours outrun by pain
Then suddenly just... Just space

But you still whispered,
"Hush little mommy don't you cry,
Everything is going to be alright."
Just like how I wanted to baby
It's not alright and I'm still crying

Because you're a part of me
That is apart from me
Me

"But mommy I want you to remember that...
When you're alone and missing me
And you can't cross your dark hole
Put a smile on your lips and remember
It's the body that dies and not the soul"

"I'm with you
You with me
Don't you worry
I'm snuggled up in angel wings"`,
  },
  {
    id: '58',
    slug: 'chaos',
    title: 'C h a o s',
    category: 'Depth',
    excerpt: "I can't explain the black and white seas of my soul...",
    content: `I can't explain the black and white seas of my soul
So you won't understand why your colourful skies doesn't change them
I can't explain my mind of heavy storms and wild chaos
So you won't understand why your sunny climates never tingle them a little bit

But I can tell you...
That I believe I am colour blind
Because my rainbows have been swallowed by my angry seas
That I believe I am winter
Because my brightness has been destroyed by my destructive thoughts
I lost them`,
  },
  {
    id: '59',
    slug: 'drained',
    title: 'Drained',
    category: 'Depth',
    excerpt: 'My patience is clinging onto hopeful wonders...',
    content: `My patience is clinging onto hopeful wonders
Closely sealed adhesive-tight
To the illusive mind-set being that...
It will get better

Fatigued
From keeping pace with the hour glass
Watching aimlessly as time streams by
Cascading more flawlessly than my tears
Pooling into pregnant waste
Wasted time

Tired
The emotions felt still lingers in the atmosphere
Forbidding to evacuate with the stream
Branding me further with the reminder that
Better times are still buffering

As the pits swelled ever so hastily
The streams current fluctuating
Emptiness remains consistent on the flip side
Loyal to the pending doom that...
It may never get better

Suspense will always work overtime
Pleased by the results of leaving me feeling
Static
Beyond charged for my faults being that...
I will always have hope
Period`,
  },
  {
    id: '60',
    slug: 'bridges',
    title: 'Bridges',
    category: 'Depth',
    excerpt: "I can't seem to cross the bridge of loathing...",
    content: `I can't seem to cross the bridge of loathing
Looking ahead
I can see the lengths of it being too tedious
An unnecessary distance thus leading to an unwanted place
A place where anger employed us
Our job being the fulfilment of resent for one another
Hatred protruding in our hearts
Just waiting... Waiting for our sanity to combust

When it does
The outcome clings to suspense
One that is dangerously leaning into the bad side
So I settled for the waters beneath the bridge
Diving straight into the unknown dimension
Finding comfort in the difficulty it brings
The challenges of understanding one another

Instead of settling for war cries and belittling behaviour
Let's rather swim through the awkward currents
Common sense giving us a boost to a better mannerism
Only then will we arrive to wanted places`,
  },
  {
    id: '61',
    slug: 'words',
    title: 'W o r d s',
    category: 'Depth',
    excerpt: 'Words got stuck and my breath lost balance...',
    content: `Words got stuck and my breath lost balance
My eyelids grew tired and my heart felt tender
It got difficult to calculate the emotions that I feel
So I compensated my debt with my dwarf-like temper

Words tried to climb up my throat,
My breathing tried to gain focus
Only to be washed away by silence,
So I played a little tune

The beat took hold of my words
Like a couple hand in hand
They started talking
Then they were dancing like crazed romantic fools

My reflection in the mirror saw a thousand words spill through my movements
As I danced along to the music
My breathing finally grew heavy, heart went athlete
All emotions went running young, wild and free`,
  },
  {
    id: '62',
    slug: 'freezing-point',
    title: 'Freezing Point',
    category: 'Depth',
    excerpt: "I've reached far beyond the extremities of hypothermia...",
    content: `I've reached far beyond the extremities of hypothermia
With an ice land for a soul
Warmth will never indulge with my heart
Those were the tales you have been told

But I yearn for the summer sun
To melt what's left of my iceberg smile
When will the snowy residue cease to escape my eyes?
When will the storm settle within my mind?

My thoughts lay like rubble
Scattered and confused in a pile
Well the tales are true
My cold front will confirm your suspicions
They will freeze every acre of hope you had for me

But deep down... I'm a snowflake
Intricate to the eye and delicate to the touch`,
  },
  {
    id: '63',
    slug: 'i-am-an-addict',
    title: 'I am an Addict',
    category: 'Depth',
    excerpt: "I am addicted to the reassurance I never had as a kid...",
    content: `I am addicted to the reassurance I never had as a kid
The security of a home,
Something that was never guaranteed
I am addicted to the freedom that was never targeted at me
Now its arrow is aimed at Mom and I
Something I thought I'd never see

But my mind
My mind is in rehab for my drug, I call it Pain
When danger was roaming free
Pain stayed with me and I went insane
Mom cried and my drug remained, the future was hard to see

Realisation dawned on me, like the sun chasing the night
My cure was right in front of me
My mother, my only light`,
  },
  {
    id: '64',
    slug: 'im-sorry',
    title: "I'm Sorry",
    category: 'Depth',
    excerpt: "I'm sorry for seeing this beautiful bird...",
    content: `I'm sorry
I'm sorry for seeing this beautiful bird
Not looking long enough to notice the clipped wings

I'm sorry
I'm sorry for looking at this beautiful tree
Not looking long enough to see no flowers blooming

I'm sorry
For being a staircase with no altitude
Leading to nowhere but...
Lost ventures
Hollow destinies

Ultimately
It was just the wrong time
The wrong way
If only we could just meet again
In another way,
On another day`,
  },
  {
    id: '65',
    slug: 'know-me',
    title: 'Know Me',
    category: 'Depth',
    excerpt: 'There is something about me, that you probably should know...',
    content: `There is something about me, that you probably should know
Something about my crazy
Immediate and unhinged
Something like a crowbar

But you think that you know me
From the sweet smiles and laughter in my eyes
Although the subtle sighs and emotions disguised
You thought that you knew me

There is something else about me, that you probably should know
That every jewel that sparkles on my crown
Earned by my character undefeated
Will humble all my failures
They will shine
That's when you will know me`,
  },
  {
    id: '66',
    slug: 'murder-scene',
    title: 'Murder Scene',
    category: 'Depth',
    excerpt: 'She was alone in a room full of friendly murderers...',
    content: `She was alone
In a room full of friendly murderers
Laughter reeking of mockery and...
Bleeding betrayal

She was abused
Far beyond mechanical repair
However, there was no bruise
That tainted her skin like charcoal kisses

She did not live
With the pregnant pause of silence in a dark room
Instead, she was confined by Their lies
Cuffed down by soulless beings

Words shot at her, bullets poisoned by hatred
Of what she "should be"
But she's not Them
Them who stand holding the trigger so boldly

No mercy ran from Their lips
Lips chapped from too much harsh labour
As They awarded Their efforts with her tears
Content is how it felt for Them

But alas her sanity
Stood back and watched Them
Exhausted from the cuffs
Defeated from the rounds fired

If one were to look at her now
Eyes more distant
Like a breath to a choke hold
She carried on
Alone`,
  },
  {
    id: '67',
    slug: 'no-choice',
    title: 'No Choice',
    category: 'Depth',
    excerpt: "I didn't choose to be the storm and silence...",
    content: `I didn't choose to be the storm and silence
A sombre catastrophe to some lives
My darkness dominated
Taking over the broken pieces of me
Pieces that lie defenceless to the wandering eyes of karma,
To the souls that are itching to take those pieces away from me

So my storms got stronger
But He didn't take shelter
My silence spoke for me
But He didn't take offense

Instead
He made me rain
Rain that screamed on behalf of my broken pieces
Only to heal everything that it touched
He made my silence music
A cacophony of melodies that made the eyes sing

He did that
God did that`,
  },
  {
    id: '68',
    slug: 'tired',
    title: 'Tired',
    category: 'Depth',
    excerpt: 'Tired of sailing through waters that were not meant for me...',
    content: `Tired of sailing through waters that were not meant for me.
Waters that failed to challenge my fear,
To disrupt the waves hidden within me.

Tired of treading lightly when I was born a fighter.
The taste of triumph being a longing feeling,
That is never satisfied.

I sense the presence of excitement somewhere in the horizon,
But I'm tired of the disappointment that these waters bring.
Maybe I was never meant to sail above them.
Maybe I was meant to be... Deeper`,
  },
  {
    id: '69',
    slug: 'told',
    title: 'TOLD',
    category: 'Depth',
    excerpt: 'You told me I was beautiful...',
    content: `You told me I was beautiful
When I was locked within my confinements of insecurities
But the river of your speech never correlated with your actions
An intention to break me... Entirely

You told me I was strong
A warrior when I conquered wars of my mind
But you alone were an opposition undefeated
Cold, heartless and furiously out of line

Bitter nights that you held me within the furnace of your embrace
Go by leaving its fading trail into the distance
Hoping to be forgotten and replaced

I cringe at the force of failure
To pull me up and be more of a slave than I already was
But I am broken puppet
The strings to control me have retired in defeat it couldn't endure

No freedom will ever greet me with open arms
Because I neglected it the moment I chose you
I chose you because I thought you were the way and I stayed
But you were a false compass leading me to dark ventures
And you watched... Un-phased

There is no hope left to be served
Just a huge daily feast of regret and despair
But every dose became my drug and that made him unnerved
But still his tales proceeded and he repeated...
You are beautiful
You are strong`,
  },
  {
    id: '70',
    slug: 'winter-heart',
    title: 'Winter Heart',
    category: 'Depth',
    excerpt: 'I feel cold, not from the biting breeze...',
    content: `I feel cold
Not from the biting breeze, nor the slicing waters of my tears
But from you
My mind remains a dark wonderland of the ghosts you awakened
The ghosts that arose from my soul that was once alive
You did that

My eyes mourn over the sad truths that my heart cannot leap over
My body shivers from the memories of each stab, scratch and sting

From the river of your speeches
From the thunder of your violence
Lastly, from the crisp shine of the aftermath

You
Are the reason, for the winters of my Heart`,
  },

  // ========== EMPOWERING ==========
  {
    id: '71',
    slug: 'a-woman',
    title: 'A woman',
    category: 'Empowering',
    excerpt: 'Her presence, ever so demanding like the sudden awakening of Spring...',
    content: `Her presence, ever so demanding like the sudden awakening of Spring
Leave others with the thirst for Her morning dew
Her touch brings withering roses to life and dead seas into high tide
Like a cloud, Her character spreads in a magnificent view

Oh her voice... Cascades like the veil of a waterfall
Drenching souls with Her purity, kindness prominent
She's a woman
An anchor for man she grounds as he conquers all

Vile roots are absent in Her eyes
Eyes that are vast with gentleness, a forestry of good intentions
Blooming nothing less than...
Motherly upbringings, love and nurturing vines

She is powerful
Stronger than the outbursts of thunder's calling
Precision as sleek as the aim of lightning
Strikes those who wishes violence upon her

Her mind
A bouquet full of experience and wisdom
Leaves a trail in another's
Petals of guidance, thorns spiteful for the danger that lurks ahead

She's serene, a redeemer and a...
Queen
Royal Highness you are appreciated
Your love will forever pamper what's broken
Your patience will forever harvest the strength you've given others
You... Will forever be the Epitome of Power`,
  },
  {
    id: '72',
    slug: 'divine-energy',
    title: 'Divine Energy',
    category: 'Empowering',
    excerpt: 'An earthy, damp scent heavily weighed by the wake of the morning...',
    content: `An earthy, damp scent heavily weighed
By the wake of the morning
Sunrise bleeding lightly onto the coats
Of the sea
With the waves seductively subtle
with the grains of pebble sand

Smoke danced slowly, expanding its form
Into grotesque features
Escaping the crimson heat from the famous
"Wake & Bake"
That lays in the hands of a lady

Pebble sand hugged toes
Locks lay thick and free
She smiled and breathed in
Heaps of wonder and divine energy

Eye-to-eye with the world
Her head held high like the chest of a sunflower
She claimed her full glory
Mind spread into networks of infinite
Powerful
And mighty lengths of self-love
Self-appreciation
And a heart soaring with pride

The sun continued ascending
Its rays of light sunk into the lady
Bearing the gold of her skin
On its shoulders

She feels...
Ready.
For the untold ventures of her day`,
  },
  {
    id: '73',
    slug: 'paradise',
    title: 'Paradise',
    category: 'Empowering',
    excerpt: 'The lands of paradise got shaded...',
    content: `The lands of paradise got shaded
Colourful floral hues spread far and wide
Fell graciously fast
And withered back to the ground to hide
For the cold season will soon be marching in
After the dawn of autumn escaping

Brown orbs stare at the ceiling
Flashbacks of history soaring through her eyes
Folk with streams on their cheeks, stayed to watch
Their fellow kin slowly wilting and she said, 'don't cry'

They were never ready for this season
To be so harsh to their tender hearts
Hearts that has to learn to let go
To fly and leave what needs to be left behind

That's where flowers grow
Rebirth dominant and life goes on
Beautifully like how the sun bids the day
Farwell`,
  },
  {
    id: '74',
    slug: 'wild-wild-girl',
    title: 'Wild Wild Girl',
    category: 'Empowering',
    excerpt: 'Wild wild girl do not fear the intensified rumble of your power...',
    content: `Wild wild girl do not fear the intensified rumble of your power
A force greater than the shields of their egos
Shields that never tuned down your echo
Shields that will never outrun you

Wild wild girl do not bathe in overthinking waters
To mask away your flaws
Flaws that will elevate the choirs of your confidence
Getting louder, all the way up to ceilings of content

Wild wild girl do not fear the stretch of your smile
Let its contagiousness become a disease
Contaminating those who's power lies dormant within themselves
And spread love, then we shall all be free

Wild wild girl
Do not`,
  },
  {
    id: '75',
    slug: 'mama-knows',
    title: 'Mama Knows',
    category: 'Empowering',
    excerpt: 'My mama told me that I could soar through great skies...',
    content: `My mama told me
That I could soar through great skies
Above all the suffering that caged me in
But mama didn't know
That my wings are cut
Cut by my demons I chose to feed

My mama told me
That I am strong and I can defeat all of my battle
But mama didn't know
That I have allowed weakness to bury me
Bury me deep down the pits of my battlefield

So I told my mama
That her babygirl is a host for a corpse inside
A corpse that wanted to fly just like she said
A corpse that was... Fierce and Free

Then mama told me
Even the dead is still living because the spirit forever breathes
You can't fly but you can walk
Walk through the pain and redemption shall be seen`,
  },
  {
    id: '76',
    slug: 'fly-angel-fly',
    title: 'Fly Angel, Fly',
    category: 'Empowering',
    excerpt: "Your mistakes don't define the finality of your journey...",
    content: `Your mistakes don't define the finality of your journey
Don't let guilt lock your wings shut
Keeping you from flying to pastures way more rewarding than your faults

The darkness within you is just a corner shadow,
Compared to your light that makes the shadows run away
That's right
You sprinkled showers of hope within yourself
Now you're blooming with radiance that only you can dim

So Fly Angel, Fly
Perfection was never meant for an authentic you`,
  },
  {
    id: '77',
    slug: 'why',
    title: 'Why?',
    category: 'Empowering',
    excerpt: 'Have we lost our minds?',
    content: `Have we lost our minds?
Have we lost control of the reigns of sanity?
Our chariot of Free Will has fallen
Fallen onto the grounds of disrespect

Why?
Have we lost our senses?
They lay frightened in dark corners, dominance being the light
Dominance much lower than the dip of our bras
Power way less than the strength of our heels

Why did we lose our confidence?
Confidence that could ride our chariots into victory
Confidence in ourselves, in our bodies and in our beauty
Beauty that could switch off that light
Only to shine alone

No being will overthrow our title
With our broken pieces, we will mend and mould
Like a critically standing mess we shall continue
To do what women do best... Tenderize the soul`,
  },
  {
    id: '78',
    slug: 'rose-garden',
    title: 'Rose Garden',
    category: 'Empowering',
    excerpt: 'Rose was wilting...',
    content: `Rose was wilting
Rot tainted Her skin like a violent bruise
A pure sign of violence inflicted
But it wasn't from the consequences of a physical form
She didn't suffer brutality of that kind
Oh no

Her roots lie in a disarray like a disorientated tear streak
Stem weary, a replica of poor posture... No confidence
All at the expense of vile resentment
And... Grudges that poison thy delicate Rose
Now she's flawed, radiance waning like the moon
Oh no

But worry not because She set herself free
As if her soul is transitioning into spring... New beginnings
Because she... Forgave
She set herself free
Oh yes

Redemption dripped from Her Bud
Uncalculated happiness burst and burnt what's left of her flaws
She now stands beautiful and proper
Like a Rose... A ravishing Rose`,
  },
  {
    id: '79',
    slug: 'revealed',
    title: 'Revealed',
    category: 'Empowering',
    excerpt: 'What is seen when the mask is put to the side?',
    content: `What is seen when the mask is put to the side?
What lays beneath the cape, when you're not the hero anymore?
What does the crown cover, when you're no longer praised?
What?

Beneath the mask, reveals every spectrum of raw emotion
Like a butchery of hanging stories behind these misty eyes
My cape covers the scars, that trample my skin like footprints of my journey
And my crown?
Is just a reflection of my golden mind,
That sparkles every time that I think about you`,
  },
  {
    id: '80',
    slug: 'stop',
    title: 'Stop',
    category: 'Empowering',
    excerpt: 'You need to stop...',
    content: `You need to stop
You need to take a moment to stop in your tracks
Because time itself will not do the job for you

You need to take a deep breath
Reflect more than what your mirror can
You need to stop
To stop allowing your baggage to weigh down others who are also trying
Trying to hold their own as they hike over their own faults
Their own circumstances

You need that moment to recognize that every breath of pain that flows through you
Is capable of mending the wounds you bleed inside

So you should start
Start seeing your railway of scars as a guide
To the person you're destined to be
Every trip may not lead to the same location
But it does lead somewhere anyway

Your failures don't mark the end of you,
They just leave a benchmark for a better trial
A better success`,
  },
  {
    id: '81',
    slug: 'to-all-my-women',
    title: 'To All My Women',
    category: 'Empowering',
    excerpt: 'Sunshine has gone dim in Our eyes...',
    content: `Sunshine has gone dim in Our eyes
Like an echo desperately escaping it's source
Rivulets trickling down from those eyes
Because...
The fear that succeeded to replace gravity
Rooting Us down effortlessly
Subconsciously became Our only conscience
A dominate emotion

And when it withers away...
Dread backs it up
Not even the darkest of nights
Can ever replicate the severity of our pain
Our suffering
Or just... Us having a pulse

To All My Women
Our worth has weakened
In Their eyes
Like We are a currency of the poorest
We are targets
We are victims
They hungrily feast on their greed
Only getting pure satisfaction
From scavenging us until We are bare emotionally
Until We are left with the remains of trauma

To All My Women
We are in an arena
Where cruelty lurks freely
Our Trust extinct because even Our close ones
Or the ones that barely knew of Our identity

Will not hesitate
To hunt for the victory to...
Overpower Us
Ruin Us
And to make us feel Less Of A Woman`,
  },
  {
    id: '82',
    slug: 'you-are-not-alone',
    title: 'You are not alone',
    category: 'Empowering',
    excerpt: 'You trekked your path with your eyes locked in one direction...',
    content: `You trekked your path
With your eyes locked in one direction
Failing to notice the candles that guide you

You hold your baggage
Like the skies dropped dead onto you
But you failed to see the hands that hold it up for you

You are not alone
Take a moment to look up
To see that it was Him, who lit up your dark alleyways
It was Him, who bared your burdens
So you could walk at ease
It was Him, who has never failed you when you failed to see for yourself
That's the power of God`,
  },
];

// Get poems by category
export function getPoemsByCategory(category: string): Poem[] {
  if (category === 'All') return POEMS;
  return POEMS.filter(p => p.category === category);
}

// Get poem by slug
export function getPoemBySlug(slug: string): Poem | undefined {
  return POEMS.find(p => p.slug === slug);
}

// Get related poems (same category, excluding current)
export function getRelatedPoems(slug: string, limit = 3): Poem[] {
  const current = getPoemBySlug(slug);
  if (!current) return [];
  return POEMS
    .filter(p => p.category === current.category && p.slug !== slug)
    .slice(0, limit);
}
