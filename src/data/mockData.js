export const facts = [
  "India has over 969M registered voters — the world's largest electorate",
  "ECI was established on 25 January 1950",
  "Lok Sabha has 543 elected seats across India",
  "Voting age was lowered from 21 to 18 in 1989",
  "NOTA was introduced in 2013 by Supreme Court order",
  "The 2024 general election spanned 7 phases",
]

export const stats = [
  { label: 'Registered Voters', value: '969M',
    sub: 'As of 2024',       color: 'saffron' },
  { label: 'Lok Sabha Seats', value: '543',
    sub: 'Directly elected', color: 'ashoka'  },
  { label: 'Polling Stations', value: '1M+',
    sub: 'Across India',     color: 'success' },
  { label: 'Election Phases', value: '7',
    sub: 'In 2024 election', color: 'warning' },
]

export const features = [
  {
    id: 1,
    icon: 'Brain',
    title: 'Election Quiz',
    description: 
      'Test your knowledge of Indian elections across 10 carefully crafted questions.',
    tag: '10 Questions',
    href: '/quiz',
    color: 'saffron',
  },
  {
    id: 2,
    icon: 'MessageCircle',
    title: 'Ask the Expert',
    description: 
      'Chat with an AI trained deeply on Indian politics, elections, and the Constitution.',
    tag: 'AI Powered',
    href: '/chat',
    color: 'ashoka',
  },
]

export const quizQuestions = [
  {
    id: 1,
    question: 
      'How many seats are there in the Lok Sabha?',
    options: ['552', '543', '500', '545'],
    correct: 1,
    explanation:
      '543 members are directly elected by citizens. The 2 nominated Anglo-Indian seats were discontinued in 2020.',
  },
  {
    id: 2,
    question: 'What does NOTA stand for?',
    options: [
      'No One To Accept',
      'Not One True Answer',
      'None Of The Above',
      'No Official Tally Allowed',
    ],
    correct: 2,
    explanation:
      'NOTA was introduced in 2013 following a Supreme Court directive, giving voters a way to formally reject all candidates.',
  },
  {
    id: 3,
    question:
      'When was the Election Commission of India established?',
    options: ['1947', '1950', '1952', '1948'],
    correct: 1,
    explanation:
      'ECI was established on 25 January 1950 — one day before India became a Republic on 26 January.',
  },
  {
    id: 4,
    question: 
      'Minimum age to vote in India?',
    options: ['21', '25', '16', '18'],
    correct: 3,
    explanation:
      'Voting age was reduced from 21 to 18 by the 61st Constitutional Amendment Act in 1988, effective 1989.',
  },
  {
    id: 5,
    question:
      'Security deposit for a Lok Sabha candidate?',
    options: ['₹10,000', '₹50,000', '₹25,000', '₹15,000'],
    correct: 2,
    explanation:
      'SC/ST candidates pay ₹12,500. The deposit is forfeited if the candidate receives less than one-sixth of total valid votes.',
  },
  {
    id: 6,
    question:
      'How many phases did the 2024 Lok Sabha election have?',
    options: ['5', '6', '7', '4'],
    correct: 2,
    explanation:
      'The 2024 general election ran from April 19 to June 1 across 7 phases — the longest in India\'s electoral history.',
  },
  {
    id: 7,
    question: 'What is the full form of VVPAT?',
    options: [
      'Voter Verified Paper Audit Trail',
      'Verified Voting Paper and Tally',
      'Valid Voter Paper Audit Track',
      'Voter Validated Poll Audit Trail',
    ],
    correct: 0,
    explanation:
      'VVPAT prints a paper slip visible to the voter for 7 seconds confirming their choice before it drops into a sealed box.',
  },
  {
    id: 8,
    question: 
      'Which body conducts elections in India?',
    options: [
      'Supreme Court',
      'Parliament',
      'Election Commission of India',
      'Home Ministry',
    ],
    correct: 2,
    explanation:
      'ECI is a constitutional body under Article 324, fully independent of the executive government.',
  },
  {
    id: 9,
    question:
      'How long before polling must campaigning stop?',
    options: [
      '24 hours', '48 hours', '72 hours', '12 hours'
    ],
    correct: 1,
    explanation:
      'The 48-hour window before polling is called the "election silence period." No public meetings, rallies, or advertisements are allowed.',
  },
  {
    id: 10,
    question:
      'The "magic number" for a Lok Sabha majority?',
    options: ['250', '282', '272', '300'],
    correct: 2,
    explanation:
      '272 is the simple majority mark — half of 543 plus 1. A party or coalition needs at least this many seats to form a government.',
  },
]

export const chatSeedMessages = [
  {
    id: 1,
    role: 'user',
    content: 'What is the Model Code of Conduct?',
    timestamp: '10:24 AM',
  },
  {
    id: 2,
    role: 'assistant',
    content:
      'The Model Code of Conduct (MCC) is a set of guidelines issued by the Election Commission of India the moment elections are announced. It prevents the ruling party from using government resources for campaigns, announcing new schemes, or transferring key officials — and stays in effect until results are declared.',
    timestamp: '10:24 AM',
  },
]
