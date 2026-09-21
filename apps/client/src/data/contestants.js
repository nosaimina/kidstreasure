export const INITIAL_CONTESTANTS = [
  {
    id: "FK-101",
    contestantNumber: "001",
    name: "Leo Vance",
    category: "BEAUTY",
    categoryLabel: "Beauty",
    badge: "Beauty",
    ribbonColor: "blue",
    ribbonText: "FASHION",
    ribbonSide: "left",
    image: "/images/contestant_singing.jpg",
    votes: 112
  },
  {
    id: "FK-102",
    contestantNumber: "002",
    name: "Maya Lin",
    category: "BEAUTY",
    categoryLabel: "Beauty",
    badge: "Beauty",
    ribbonColor: "pink",
    ribbonText: "PERSONALITY",
    ribbonSide: "left",
    image: "/images/contestant_personality.jpg",
    votes: 123
  },
  {
    id: "FK-103",
    contestantNumber: "003",
    name: "Chloe Bennett",
    category: "BEAUTY",
    categoryLabel: "Beauty",
    badge: "Beauty",
    ribbonColor: "gold",
    ribbonText: "ENTERTAINMENT",
    ribbonSide: "left",
    image: "/images/contestant_entertainment.jpg",
    votes: 90
  },
  {
    id: "FK-104",
    contestantNumber: "004",
    name: "Sofia Elena",
    category: "BEAUTY",
    categoryLabel: "Beauty",
    badge: "Beauty",
    ribbonColor: "blue",
    ribbonText: "BEAUTY",
    ribbonSide: "left",
    image: "/images/contestant_fashion.jpg",
    votes: 58
  },
  {
    id: "FK-105",
    contestantNumber: "005",
    name: "Aryan Patel",
    category: "BEAUTY",
    categoryLabel: "Beauty",
    badge: "Beauty",
    ribbonColor: "pink",
    ribbonText: "STYLE",
    ribbonSide: "left",
    image: "/images/contestant_dance.jpg",
    votes: 100
  },
  {
    id: "FK-106",
    contestantNumber: "006",
    name: "Emily Rose",
    category: "BEAUTY",
    categoryLabel: "Beauty",
    badge: "Beauty",
    ribbonColor: "gold",
    ribbonText: "CHARM",
    ribbonSide: "left",
    image: "/images/contestant_music.jpg",
    votes: 75
  }
];

export const PRIZES = [
  {
    rank: "1st Place",
    title: "Grand Champion & Kiddies Vogue Crown",
    reward: "$5,000 Cash Prize",
    perks: [
      "1-Year Elite Junior Modeling & Talent Agency Contract",
      "Cover Feature in Kiddies Vogue Magazine 2026 Issue",
      "VIP Appearance at National Junior Fashion Gala",
      "Official 24k Gold-Plated Star Trophy"
    ],
    gradient: "linear-gradient(135deg, #7c3aed 0%, #c026d3 100%)",
    ribbonBadge: "GRAND CHAMPION",
    badgeColor: "#7c3aed"
  },
  {
    rank: "2nd Place",
    title: "Star Performer Award",
    reward: "$2,500 Cash Grant",
    perks: [
      "Full 1-Year Scholarship to Premier Performing Arts Academy",
      "Brand Ambassador for KidStyle Apparel Spring Campaign",
      "Silver Star Laurels & Commemorative Plaque",
      "Professional Studio Portfolio Package"
    ],
    gradient: "linear-gradient(135deg, #0288d1 0%, #00b4d8 100%)",
    ribbonBadge: "RUNNER UP",
    badgeColor: "#0288d1"
  },
  {
    rank: "3rd Place",
    title: "Creative Prodigy Award",
    reward: "$1,500 Cash Grant",
    perks: [
      "Creative Tech Super-Bundle (iPad Pro + Creator Kit)",
      "Featured Interview on Kiddies Spotlight TV",
      "Bronze Star Laurels Trophy",
      "VIP Masterclass Access with Celebrity Mentors"
    ],
    gradient: "linear-gradient(135deg, #d81b60 0%, #f43f5e 100%)",
    ribbonBadge: "3RD PLACE",
    badgeColor: "#d81b60"
  },
  {
    rank: "People's Choice",
    title: "Fan Favorite Supernova",
    reward: "$1,000 Cash Prize",
    perks: [
      "Awarded to Contestant with the Highest Public Votes",
      "Special Segment on Grand Finale Broadcast",
      "Exclusive Custom Trophy & Gift Hamper",
      "Fan Club Meet & Greet Feature"
    ],
    gradient: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
    ribbonBadge: "PUBLIC CHOICE",
    badgeColor: "#f59e0b"
  }
];

export const TIMELINE_STEPS = [
  {
    phase: "Phase 01",
    date: "August 1 - August 31",
    title: "Nationwide Open Submissions",
    desc: "Talented kids submitted their entries across fashion, singing, dance, and personality.",
    status: "Completed",
    color: "#10b981"
  },
  {
    phase: "Phase 02",
    date: "September 1 - October 10",
    title: "Live Public Voting & Vogue Showcase",
    desc: "The Top 20 finalists are presented to the nation. Daily public voting is open to determine the Top 5!",
    status: "Active Now",
    color: "#7c3aed"
  },
  {
    phase: "Phase 03",
    date: "October 15, 2026",
    title: "Celebrity Mentors Masterclass",
    desc: "The top finalists work one-on-one with Broadway stars and fashion directors for the grand stage.",
    status: "Upcoming",
    color: "#0288d1"
  },
  {
    phase: "Phase 04",
    date: "October 24, 2026",
    title: "Grand Gala Finale & Crowning Ceremony",
    desc: "Broadcast live from the Grand Regency Hall. Public votes combine with judges scores to crown the 5.0 winner!",
    status: "Grand Finale",
    color: "#f59e0b"
  }
];

export const JUDGES = [
  {
    name: "Simone Vance",
    role: "Lead Fashion Director & Stylist",
    category: "FASHION & RUNWAY",
    image: "/images/judge_fashion.jpg",
    ribbonColor: "blue",
    credits: "Former Vogue Kids curator & Paris Junior Runway Coordinator",
    quote: "We are looking for originality, authentic confidence, and that magical spark that commands the catwalk."
  },
  {
    name: "Julian Rivera",
    role: "Choreographer & Broadway Performer",
    category: "DANCE & PERFORMANCE",
    image: "/images/judge_dance.jpg",
    ribbonColor: "pink",
    credits: "2x Tony Award Performer & Junior Arts Academy Director",
    quote: "Passion translates through movement. Every child brings a unique rhythm to celebrate on the grand stage."
  },
  {
    name: "Dr. Alisha Morgan",
    role: "Vocal Coach & Music Producer",
    category: "VOCALS & MUSIC",
    image: "/images/judge_vocal.jpg",
    ribbonColor: "gold",
    credits: "Grammy-nominated youth choir mentor & studio director",
    quote: "True talent shines when kids feel empowered to sing freely and be completely themselves."
  }
];

export const FAQS = [
  {
    q: "How many times can I vote for my favorite contestant?",
    a: "Every supporter gets 1 free vote per day for each contestant. You can also share your vote on social media to unlock an additional daily bonus vote!"
  },
  {
    q: "What age range is eligible for Fabulous Kiddies 5.0?",
    a: "Contestants must be between 4 and 13 years old at the time of entry. All entries require verified parental or legal guardian consent."
  },
  {
    q: "How are the final winners decided?",
    a: "Final winners are determined through a balanced score: 50% comes directly from verified public online voting, and 50% comes from our celebrity judges' panel evaluation."
  },
  {
    q: "Is there any entry fee to submit our child's talent?",
    a: "No! Fabulous Kiddies 5.0 is 100% free to enter. We believe every child deserves an equal opportunity to showcase their gifts."
  },
  {
    q: "Can international contestants participate?",
    a: "The online voting round and virtual showcase is open worldwide. Grand Finale travel expenses for the Top 5 finalists are fully covered by our sponsors."
  }
];
