import { Profile, Movie, TimelineEvent, InsideJoke } from './types';

import profileQueen from './assets/images/profile_avatar_queen_1780875124725.png';
import profileKing from './assets/images/profile_avatar_king_1781496905421.jpg';
import kidsAvatar from './assets/images/kids_avatar_1781497011070.jpg';
import homePic from './assets/images/Homepic.png';
import memoriesPic from './assets/images/memories.jpg';
import recommendationPic from './assets/images/Recommendation.png';
import roadmapPic from './assets/images/roadmap.jpg';

export const PROFILES: Profile[] = [
  {
    id: 'queen',
    name: 'Anjali 👑',
    avatarUrl: profileQueen,
    isGirlfriend: true,
    tagline: 'Officially entering Season 22! Always matches 100% with boyfriend Brijesh ❤️'
  },
  {
    id: 'bf',
    name: 'Brijesh 😎',
    avatarUrl: profileKing,
    isGirlfriend: false,
    tagline: 'The director, producer, and chief fan of Anjali\'s smile'
  },
  {
    id: 'future',
    name: 'Our Future Kids 👶',
    avatarUrl: kidsAvatar,
    isGirlfriend: false,
    tagline: 'Future viewers of our legendary love story'
  }
];

export const HERO_MOVIE: Movie = {
  id: 'loveflix-special',
  title: 'Our Beautiful Love Story',
  backdropUrl: homePic,
  posterUrl: homePic,
  description: 'An unforgettable story of two hearts connected across miles, turning every distance into a reason to love harder. Filled with endless video calls, late night conversations that lasted until sunrise, countless "I miss you" moments, and memories created through screens and dreams. Through every laugh, every tear, every good morning and good night, our bond has only grown stronger. Today, we celebrate her brilliant entry into Season 22 of life, embarking on the most incredible co-authored chapters together. ❤️',
  shortDescription: 'The award-winning real life romance starring You & Me.',
  matchScore: 100,
  year: 2026,
  rating: 'Season 22 • 110% Match',
  duration: 'Infinity Seasons',
  genres: ['Romance', 'Comedy', 'Beautiful Memories', 'Endless Hugs'],
  playContentKey: 'love_letter',
  boyfriendReview: {
    score: 110,
    reviewText: "The absolute best part of my daily life. Extremely charismatic, highly talented at making me happy, possesses the world's most stunning smile. Warning: highly addictive personality. A masterpiece of a human being.",
    attributes: [
      { label: 'Cuteness Level', value: 100 },
      { label: 'Silliness/Laughs', value: 95 },
      { label: 'Warmth and Hugs', value: 100 },
      { label: 'Intelligence & Wisdom', value: 98 },
      { label: 'Loving Heart', value: 100 }
    ]
  }
};

export const MOVIE_ROWS = [
  {
    categoryTitle: 'Trending in Your Heart',
    movies: [
      {
        id: 'love_letter_card',
        title: 'Happy Birthday, Anjali!',
        backdropUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
        posterUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&h=600&q=80',
        description: 'Open the envelope for a deep, handwritten-style letter celebrating your spectacular entry into Season 22! Discover how you changed my entire world, how much I cherish your special day on June 15th, and what makes you the most beautiful 22-year-old in the universe.',
        shortDescription: 'A heartfelt romantic letter celebrating Anjali turning 22.',
        matchScore: 110,
        year: 2026,
        rating: 'Season 22 🎂',
        duration: '22 Years Young',
        genres: ['Emotional', 'Poetic', 'Pure Love'],
        playContentKey: 'love_letter'
      },
      {
        id: 'memory_lane_card',
        title: 'Our Memory Lane',
        backdropUrl: memoriesPic,
        posterUrl: memoriesPic,
        description: 'A collection of moments that prove distance was never strong enough to keep two hearts apart. Late night calls. Endless messages. Random laughs. Countless "I miss you"s. Every memory brought us closer, and every day with you became my favorite chapter. To many more memories, adventures, and birthdays together. ❤️',
        shortDescription: 'Scroll through interactive milestones of our journey.',
        matchScore: 100,
        year: 2026,
        rating: 'Beautiful Journey',
        duration: '10+ Episodes',
        genres: ['Nostalgic', 'Adventure', 'Chronicle'],
        playContentKey: 'memory_lane'
      },
      {
        id: 'compliment_card',
        title: 'The Compliment Shower',
        backdropUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
        posterUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=400&h=600&q=80',
        description: 'Feeling down, or just want to feel incredibly loved? Step into the Infinite Compliment Machine. Pop bubbles of love to unlock endless genuine compliments crafted by yours truly about your eyes, your laugh, your brains, and your touch.',
        shortDescription: 'An interactive generator of pure loving compliments.',
        matchScore: 100,
        year: 2026,
        rating: '9.9/10 Cuteness',
        duration: 'Infinite',
        genres: ['Interactive', 'Feel Good', 'Confidence Booster'],
        playContentKey: 'compliment_machine'
      }
    ] as Movie[]
  },
  {
    categoryTitle: 'Highly Recommended',
    movies: [
      {
        id: 'boyfriend_stats_card',
        title: 'Boyfriend Recommendation & Review',
        backdropUrl: recommendationPic,
        posterUrl: recommendationPic,
        description: 'Read the official, indepth evaluation and certified 22/22 review score of Anjali by her boyfriend Brijesh. Features high impact radial stats showing her outstanding traits as she turns 22, visual ratings, and a special review text that proves why she remains #1 in the cosmos.',
        shortDescription: 'Full breakdown of why Anjali is the absolute best 22-year-old on earth.',
        matchScore: 100,
        year: 2026,
        rating: 'Age 22 Rated: Perfect 🌟',
        duration: 'Season 22',
        genres: ['Documentary', 'Critical Acclaim', 'Award Winner'],
        playContentKey: 'boyfriend_stats'
      },
      {
        id: 'future_together_card',
        title: 'Our Next Season: Co-authored Future',
        backdropUrl: roadmapPic,
        posterUrl: roadmapPic,
        description: 'An exclusive sneak peek into the upcoming seasons in our lives together, where distance finally ends and we step into real life moments we’ve only imagined until now. From our long awaited first meeting and scenic mountain rides to fun street food challenges, every experience becomes a shared adventure. We’ll cook together, laugh through the chaos, and turn simple moments into lasting memories. And finally, our first movie date side by side marks just the beginning of countless nights together. ❤️',
        shortDescription: 'Write our shared roadmap and next vacation plans.',
        matchScore: 98,
        year: 2027,
        rating: 'Coming Soon',
        duration: 'Seasons 2+',
        genres: ['Future Vision', 'Adventure', 'Co-authored'],
        playContentKey: 'future_together'
      }
    ] as Movie[]
  }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'first_meet',
    date: 'THE WAY IT BEGAN',
    title: 'A Coincidence That Changed Everything ✨',
    description: 'I accidentally sent you an Instagram request by mistake and somehow, you accepted it. We started talking on the very same day, your birthday. What seemed like a random mistake became the most beautiful thing that ever happened to me. Sometimes fate works in the strangest ways.',
    icon: '✨'
  },
  {
    id: 'first_date',
    date: 'OUR FIRST "DATE"',
    title: 'Food, Laughter & Video Calls 📱',
    description: "Distance kept us apart, but it never stopped us from sharing moments together. Our first meal wasn't at a restaurant, it was through a video call. Just two people, eating food, talking for hours, and slowly becoming each other's favorite person.",
    icon: '🍜'
  },
  {
    id: 'inside_milestone',
    date: "FIRST TIME I REALIZED I'M IN LOVE",
    title: 'The Unmistakable Shift 💛',
    description: "Looking at your genuine smile or hearing you laugh at one of my silly jokes, it hit me right in the chest. I knew I never wanted to spend a day without you.",
    icon: '💛'
  },
  {
    id: 'adventure_milestone',
    date: 'OUR FIRST SPECIAL MOMENT',
    title: "The Night We Couldn't Stop Talking 🌙",
    description: 'No plane tickets, no meeting in person, just two hearts connected through a screen. What started as a simple conversation turned into hours of sharing dreams, stories, secrets, and endless laughter. That was the moment I realized this connection was something truly special.',
    icon: '🌙'
  },
  {
    id: 'birthday_countdown',
    date: 'JUNE 15TH • AGED TO PERFECTION',
    title: 'Season 22 of Anjali: Breathtaking & Beautiful 🎂',
    description: 'Happy Birthday, Anjali! Today marks your 22nd majestic orbit around the sun. From an accidental Instagram request to becoming the absolute centerpiece of my life, every moment with you has been an unforgettable treasure. As you turn 22, we celebrate your gorgeous smile, your limitless kindness, and the boundless joy you bring into my world. Here\'s to entering Season 22 together, where miles finally fade is the ultimate season premiere!\n\nHappy 22nd Birthday, Sweetu ❤️',
    icon: '🎂'
  }
];

export const INSIDE_JOKES: InsideJoke[] = [
  {
    id: 'joke_1',
    setup: 'Who spends more time choosing what to eat but always orders the exact same pasta/sushi?',
    punchline: 'You! But that just means you possess absolute, unwavering loyalty to your favorites. (And yes, pasta is life!)',
    reaction: '🤭 Guilty as charged!'
  },
  {
    id: 'joke_2',
    setup: 'What is my official rating as a pillow?',
    punchline: 'Five-star rating! Excellent heating system, very comfy shoulder padding, but prone to shifting to reach the water bottle.',
    reaction: '⭐ Best pillow in the world!'
  },
  {
    id: 'joke_3',
    setup: 'How fast do you fall asleep when we turn on a movie we both was super hyped to watch?',
    punchline: 'Record-shattering 4.5 minutes flat! Usually by the end of the intro theme. But sleeping on my shoulder is the best part anyway.',
    reaction: '😴 Hey! The intro was too soothing!'
  },
  {
    id: 'joke_4',
    setup: 'Who is the bossiest but also the most incredibly cute when they don\'t get their way?',
    punchline: 'Our gorgeous Birthday Queen! Your little puppy eyes are completely unfair and should be banned by the Geneva Convention.',
    reaction: '😈 I deserve everything!'
  }
];

export const COMPLIMENTS = [
  "You make the most boring days feel like absolute movies of infinite laughter.",
  "Your smile is my morning coffee, it lights up my entire day.",
  "You have the warmest, kindest eyes that feel like a loving home.",
  "I adore your gorgeous sense of humor and how hard we laugh at silly things together.",
  "You are so intelligent and sharp, yet you stay incredibly gentle and sweet.",
  "The sound of your voice instantly calms my racing mind and puts me at peace.",
  "You look breathtakingly beautiful, whether in a gorgeous party dress or messy pajama buns.",
  "Your pure heart and empathy toward everyone make me want to be a much better person to match you.",
  "The gentle way you hold my hand makes me feel like the strongest person alive.",
  "You possess the absolute best giggles in the entire universe, period.",
  "Your determination to succeed is inspiring, there’s nothing you can’t achieve!",
  "I am so exceptionally proud of you and all the effort you put into everything you do."
];
