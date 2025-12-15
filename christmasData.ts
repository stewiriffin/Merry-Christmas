export interface TriviaQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export const familyTriviaQuestions: TriviaQuestion[] = [
  {
    question: "Who makes the best chapati in the family?",
    options: ["Sarah (Mom)", "John (Dad)", "Dominic", "We order from Mama Njeri's"],
    correctAnswer: 0,
  },
  {
    question: "Who is always caught on their phone during family time?",
    options: ["Martin", "Peter", "Ian", "The twins - both of them!"],
    correctAnswer: 3,
  },
  {
    question: "Who's the firstborn (mtoto wa kwanza)?",
    options: ["Ian", "Dominic", "Martin", "Peter"],
    correctAnswer: 1,
  },
  {
    question: "Which two are the troublesome twins?",
    options: ["Dominic & Ian", "Martin & Peter", "John & Dominic", "Ian & Peter"],
    correctAnswer: 1,
  },
  {
    question: "Who's the lastborn (mtoto wa mwisho)?",
    options: ["Peter", "Martin", "Ian", "Dominic"],
    correctAnswer: 2,
  },
  {
    question: "Who ate the last mandazi without asking?",
    options: ["John (Dad)", "The twins", "Ian", "Everyone blames each other!"],
    correctAnswer: 3,
  },
  {
    question: "Who takes the longest to get ready for church?",
    options: ["Sarah", "Dominic", "The twins", "Everyone is late anyway!"],
    correctAnswer: 3,
  },
  {
    question: "Who's most likely to say 'Tutaenda kesho' (We'll go tomorrow)?",
    options: ["John", "Sarah", "Ian", "All of us!"],
    correctAnswer: 3,
  },
];

export const yearInReviewMessage = `
  Asante Mungu! What an incredible year 2025 has been for the Mbae family! 🇰🇪

  From Baba John and Mama Sarah's endless patience with us watoto, to Dominic leading the way as the
  responsible mtoto wa kwanza, the twins Martin and Peter keeping everyone entertained with their mchezo,
  and Ian growing up so fast as the lastborn - every moment has been precious.

  We've shared countless laughs over chapati and chai, Sunday family dinners with ugali na sukuma,
  late night conversations, and memories that will last forever. From church services to family gatherings,
  from homework struggles to celebration victories - we've been there for each other.

  Through every challenge, tutashinda pamoja (we overcome together)!

  This Christmas, tunashukuru Mungu for the love, joy, and togetherness that makes the Mbae family special.
  May God continue to bless our family with health, happiness, and unity.

  Here's to more beautiful moments in 2026! Mungu Abariki! 🙏🏾

  With all our love,
  John, Sarah, Dominic, Martin, Peter & Ian ❤️
  The Mbae Family - Stronger Together! 💪🏾
`;

export const naughtyReasons = [
  "Didn't wash the sufurias... for a whole week",
  "Ate all the mandazi before anyone else woke up",
  "Too much FIFA on PlayStation, not enough homework",
  "Left the lights on in EVERY room (Kenya Power bill skyrocketed!)",
  "Said 'Natoka saa hii' (I'm leaving now) but stayed for 2 more hours",
  "Pretended not to hear when called to help in the kitchen",
  "Blamed the house help for that mysterious smell",
  "Scrolled TikTok during family devotion time",
  "Finished the maziwa and put the empty packet back in the fridge",
  "Used 'Nimesahau' (I forgot) as a life strategy",
  "Left wet towels on the bed... tena na tena (again and again)",
  "Too full for sukuma wiki but had room for nyama choma",
  "Said 'Kesho' (tomorrow) for 3 weeks about cleaning their room",
  "Took the last piece of chicken without asking - very rude!",
  "Practiced selective hearing during 'fanya kazi' (work) assignments",
  "Asked for lift to town then came back with new sneakers instead of groceries",
  "Said 'Iko sawa' (it's fine) when it was NOT sawa",
  "Claimed WiFi wasn't working just to avoid online classes"
];
