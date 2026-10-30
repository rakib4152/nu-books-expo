import { Book, Chapter, UserProgress } from '@/types/api';

export const BOOKS_DATA: Book[] = [
  {
    id: 'book-clean-arch',
    title: 'Clean Architecture & Microservices',
    author: 'Robert C. Martin & Distributed Systems Guild',
    coverUrl: '/images/book_clean_architecture_1793353156776.jpg',
    description: 'A comprehensive handbook on decoupling business rules from delivery mechanisms, independent testability, boundary crossings, and resilient hexagonal architectures.',
    category: 'Engineering',
    totalPages: 342,
    fileSizeBytes: 14850000,
    downloadUrl: '/api/v1/books/book-clean-arch/pdf-stream',
    publishedYear: 2024,
    language: 'English',
    rating: 4.9,
    chaptersCount: 6,
    chapters: [
      {
        id: 'ca-ch-1',
        bookId: 'book-clean-arch',
        chapterIndex: 1,
        title: '01. The Nature of Software Architecture',
        subtitle: 'Why Good Architecture Saves Decaying Systems',
        startPage: 1,
        endPage: 28,
        estimatedReadTimeMinutes: 18,
        summary: 'Explore the fundamental difference between making a program run versus keeping it malleable, cost-effective, and adaptable over decades.',
        pagesCount: 28,
        pages: [
          {
            pageNumber: 1,
            heading: 'The Cost of Premature Complexity',
            paragraphs: [
              'Getting software to run once is easy. Keeping it cost-effective to modify, test, and deploy as business requirements pivot is the supreme test of engineering craftsmanship.',
              'Every software system provides two values to the stakeholders: behavior and structure. Software developers are hired to make machines behave in ways that generate or save money.',
              'However, when developers prioritize urgent behavioral tweaks over structural integrity, each successive feature becomes more expensive than the last, until development grinds to a halt.'
            ],
            callout: 'Architecture represents the significant decisions where cost of change escalates quadratically if made hastily.',
            keyTakeaways: [
              'Behavior satisfies immediate user demands; structure enables future existence.',
              'The word "software" contains "soft"—it must be pliable and easy to change.',
              'Cost of change must remain flat across the entire product lifecycle.'
            ]
          },
          {
            pageNumber: 2,
            heading: 'The Fight for Architectural Integrity',
            paragraphs: [
              'Business managers frequently argue that features are urgent and architecture can wait. The software engineer is the designated custodian of structure.',
              'If you surrender structural discipline to meet an arbitrary deadline, you ultimately harm the business by building an unmaintainable legacy quagmire.',
              'True professionalism means articulating trade-offs honestly and designing boundaries that decouple policy from detail.'
            ],
            callout: 'It is a fatal mistake to believe that messy code gets you to market faster. Messy code slows you down on day two.',
            keyTakeaways: [
              'Speed comes from clean separation of concerns.',
              'Never allow UI frameworks or database drivers to dictate domain models.'
            ]
          },
          {
            pageNumber: 3,
            heading: 'Independent Deployability & Testability',
            paragraphs: [
              'An architecture is considered "clean" if you can test business logic without spinning up an HTTP server, a relational database, or a web browser.',
              'When domain entities run in pure isolation, test suites execute in milliseconds instead of minutes. Rapid feedback loops foster fearless refactoring.',
              'By establishing strict inward dependency arrows, outer technological shifts (e.g. migrating from PostgreSQL to DynamoDB) produce zero ripple effects in core business models.'
            ],
            keyTakeaways: [
              'Dependency Rule: source code dependencies must point only inward toward higher-level policies.',
              'High-level policies know nothing of lower-level delivery mechanisms.'
            ]
          }
        ]
      },
      {
        id: 'ca-ch-2',
        bookId: 'book-clean-arch',
        chapterIndex: 2,
        title: '02. SOLID Principles in Distributed Systems',
        subtitle: 'Single Responsibility to Dependency Inversion',
        startPage: 29,
        endPage: 74,
        estimatedReadTimeMinutes: 24,
        summary: 'Applying SOLID at service boundaries to eliminate coupling traps and prevent distributed monoliths.',
        pagesCount: 46,
        pages: [
          {
            pageNumber: 29,
            heading: 'The Single Responsibility Principle at Scale',
            paragraphs: [
              'SRP does not mean a function should do one thing. It states: a module should have one, and only one, reason to change.',
              'In architectural terms, an actor is a single person or group with cohesive business interests. A module should be answerable to only one actor.',
              'When accounting teams and inventory teams share the same calculation class, an innocent change requested by accounting will silently compromise inventory ledgers.'
            ],
            callout: 'Gather together the things that change for the same reasons. Separate those things that change for different reasons.'
          },
          {
            pageNumber: 30,
            heading: 'The Open-Closed Principle (OCP)',
            paragraphs: [
              'A software artifact should be open for extension but closed for modification. If component A must be protected from changes in component B, then B must depend on A.',
              'Information hiding is at the heart of OCP. We protect higher-level components by partitioning the system into components and arranging them into an acyclic dependency graph.'
            ]
          }
        ]
      },
      {
        id: 'ca-ch-3',
        bookId: 'book-clean-arch',
        chapterIndex: 3,
        title: '03. Component Cohesion & Packaging',
        subtitle: 'Rep-Reuse Equivalence and Common Closure',
        startPage: 75,
        endPage: 120,
        estimatedReadTimeMinutes: 22,
        summary: 'How to cluster classes into deployable modules, microservices, and npm packages without cyclic dependency knots.',
        pagesCount: 46
      },
      {
        id: 'ca-ch-4',
        bookId: 'book-clean-arch',
        chapterIndex: 4,
        title: '04. The Clean Architecture Concentric Rings',
        subtitle: 'Entities, Use Cases, Interface Adapters & Frameworks',
        startPage: 121,
        endPage: 180,
        estimatedReadTimeMinutes: 28,
        summary: 'Deconstruct the iconic four concentric rings: innermost Enterprise Business Rules out to external Frameworks & Drivers.',
        pagesCount: 60
      },
      {
        id: 'ca-ch-5',
        bookId: 'book-clean-arch',
        chapterIndex: 5,
        title: '05. Boundary Crossings & Presenters',
        subtitle: 'Crossing the Chasm Without Leaking Abstractions',
        startPage: 181,
        endPage: 254,
        estimatedReadTimeMinutes: 26,
        summary: 'Translating rich domain models into lightweight ViewModels using Input/Output Ports and humble presenters.',
        pagesCount: 74
      },
      {
        id: 'ca-ch-6',
        bookId: 'book-clean-arch',
        chapterIndex: 6,
        title: '06. The Database is an Implementation Detail',
        subtitle: 'Why SQL, NoSQL, and ORMs are Delivery Mechanisms',
        startPage: 255,
        endPage: 342,
        estimatedReadTimeMinutes: 30,
        summary: 'Treating storage engines as IO devices at the perimeter of your system rather than the center of your architecture.',
        pagesCount: 88
      }
    ]
  },
  {
    id: 'book-the-odyssey',
    title: 'The Odyssey: Annotated Study Edition',
    author: 'Homer (Translated by Robert Fagles)',
    coverUrl: '/images/book_odyssey_epic_1793353157134.jpg',
    description: 'The monumental Greek epic recounting Odysseus’s ten-year perilous voyage home from Troy to Ithaca, annotated with historical, geographic, and nautical commentary.',
    category: 'Classics',
    totalPages: 540,
    fileSizeBytes: 21300000,
    downloadUrl: '/api/v1/books/book-the-odyssey/pdf-stream',
    publishedYear: 2021,
    language: 'Ancient Greek / English',
    rating: 4.8,
    chaptersCount: 5,
    chapters: [
      {
        id: 'ody-ch-1',
        bookId: 'book-the-odyssey',
        chapterIndex: 1,
        title: 'Book I: Athena Inspires the Prince',
        subtitle: 'Council on Olympus and Telemachus in Ithaca',
        startPage: 1,
        endPage: 45,
        estimatedReadTimeMinutes: 25,
        summary: 'The gods convene on Mount Olympus while Poseidon feasts with Ethiopians. Athena visits Telemachus disguised as Mentes.',
        pagesCount: 45,
        pages: [
          {
            pageNumber: 1,
            heading: 'The Invocation of the Muse',
            paragraphs: [
              'Sing to me of the man, Muse, the man of twists and turns driven time and again off course, once he had plundered the hallowed heights of Troy.',
              'Many cities of men he saw and learned their minds, many pains he suffered, heartsick on the open sea, fighting to save his life and bring his comrades home.',
              'But he could not save them, hard as he strove—the recklessness of their own ways destroyed them all, the blind fools, they devoured the cattle of the Sun and the Sungod wiped from sight the day of their return.'
            ],
            callout: 'Launch out on his story, Muse, daughter of Zeus, start from where you will—sing for our time too.',
            keyTakeaways: [
              'The epic begins in media res, ten years after the fall of Troy.',
              'Odysseus is detained on the island of Ogygia by the nymph Calypso.',
              'Telemachus is powerless against the insolent suitors devouring his estate.'
            ]
          },
          {
            pageNumber: 2,
            heading: 'The Council on Olympus',
            paragraphs: [
              'Now, all the rest who had escaped the clear sheer pit of death were at home, clear of the war and open seas. But Odysseus alone, longing for his wife and his return, held fast in her hollow caverns by that queenly nymph Calypso.',
              'Yet as the seasons rolled on and year arrived when the gods decreed he should return to Ithaca, even there among his loved ones he had not escaped his ordeal.',
              'Poseidon alone raged on, relentless against great Odysseus till he reached his native land.'
            ]
          }
        ]
      },
      {
        id: 'ody-ch-2',
        bookId: 'book-the-odyssey',
        chapterIndex: 2,
        title: 'Book II: A Hero’s Son Takes Hand',
        subtitle: 'The Assembly at Ithaca and the Secret Voyage',
        startPage: 46,
        endPage: 92,
        estimatedReadTimeMinutes: 22,
        summary: 'Telemachus calls an assembly for the first time since Odysseus departed, rebuking the suitors before embarking by sea to Pylos.',
        pagesCount: 47
      },
      {
        id: 'ody-ch-3',
        bookId: 'book-the-odyssey',
        chapterIndex: 3,
        title: 'Book IX: In the One-Eyed Giant’s Cave',
        subtitle: 'The Land of the Lotus-Eaters and Polyphemus',
        startPage: 93,
        endPage: 150,
        estimatedReadTimeMinutes: 32,
        summary: 'Odysseus reveals his identity to King Alcinous and recounts his harrowing ordeal blinding the Cyclops Polyphemus.',
        pagesCount: 58
      },
      {
        id: 'ody-ch-4',
        bookId: 'book-the-odyssey',
        chapterIndex: 4,
        title: 'Book XII: The Sirens, Scylla and Charybdis',
        subtitle: 'The Strait of Terrors and the Cattle of the Sun',
        startPage: 151,
        endPage: 215,
        estimatedReadTimeMinutes: 30,
        summary: 'Odysseus lashes himself to the ship mast to endure the honeyed song of the Sirens, navigating the narrow strait between monster and whirlpool.',
        pagesCount: 65
      },
      {
        id: 'ody-ch-5',
        bookId: 'book-the-odyssey',
        chapterIndex: 5,
        title: 'Book XXII: Slaughter in the Hall',
        subtitle: 'Odysseus Strings the Great Bow and Reclaims Ithaca',
        startPage: 216,
        endPage: 280,
        estimatedReadTimeMinutes: 35,
        summary: 'Discarding his beggar disguise, Odysseus shoots an arrow clean through twelve axeheads and unleashes justice upon the suitors.',
        pagesCount: 65
      }
    ]
  },
  {
    id: 'book-art-of-war',
    title: 'The Art of War: Strategic Analysis',
    author: 'Sun Tzu (Translated with Commentary by Lionel Giles)',
    coverUrl: '/images/book_art_of_war_1793353157060.jpg',
    description: 'The definitive treatise on military philosophy, psychological warfare, organizational readiness, and tactical deception distilled into thirteen master principles.',
    category: 'Philosophy',
    totalPages: 180,
    fileSizeBytes: 8900000,
    downloadUrl: '/api/v1/books/book-art-of-war/pdf-stream',
    publishedYear: 2020,
    language: 'Classical Chinese / English',
    rating: 4.95,
    chaptersCount: 5,
    chapters: [
      {
        id: 'aow-ch-1',
        bookId: 'book-art-of-war',
        chapterIndex: 1,
        title: 'I. Laying Plans & Calculations',
        subtitle: 'The Five Constant Factors and the Seven Deliberations',
        startPage: 1,
        endPage: 24,
        estimatedReadTimeMinutes: 15,
        summary: 'The moral law, heaven, earth, the commander, and method/discipline determine victory before blood is ever drawn.',
        pagesCount: 24,
        pages: [
          {
            pageNumber: 1,
            heading: 'The Supreme Importance of Strategy',
            paragraphs: [
              'Sun Tzu said: The art of war is of vital importance to the State. It is a matter of life and death, a road either to safety or to ruin. Hence it is a subject of inquiry which can on no account be neglected.',
              'The moral law causes the people to be in complete accord with their ruler, so that they will follow him regardless of their lives, undismayed by any danger.',
              'Heaven signifies night and day, cold and heat, times and seasons. Earth comprises distances, great and small; danger and security; open ground and narrow passes; the chances of life and death.'
            ],
            callout: 'All warfare is based on deception. Hence, when able to attack, we must seem unable; when using our forces, we must seem inactive.',
            keyTakeaways: [
              'Assess five fundamental factors before committing assets.',
              'He will win who knows when to fight and when not to fight.',
              'Conceal your disposition; appear where you are least expected.'
            ]
          },
          {
            pageNumber: 2,
            heading: 'The Commander and Discipline',
            paragraphs: [
              'The Commander stands for the virtues of wisdom, sincerity, benevolence, strictness and courage.',
              'By method and discipline are to be understood the marshaling of the army in its proper subdivisions, the graduations of rank among the officers, and the maintenance of roads by which supplies may reach the army.',
              'Now the general who wins a battle makes many calculations in his temple ere the battle is fought. The general who loses a battle makes but few calculations beforehand.'
            ]
          }
        ]
      },
      {
        id: 'aow-ch-2',
        bookId: 'book-art-of-war',
        chapterIndex: 2,
        title: 'II. Waging War & Logistics',
        subtitle: 'Speed, Provisioning, and the Price of Prolonged Campaigns',
        startPage: 25,
        endPage: 48,
        estimatedReadTimeMinutes: 14,
        summary: 'There is no instance of a nation benefiting from prolonged warfare. Forage upon the enemy and conserve critical resources.',
        pagesCount: 24
      },
      {
        id: 'aow-ch-3',
        bookId: 'book-art-of-war',
        chapterIndex: 3,
        title: 'III. Attack by Stratagem',
        subtitle: 'Subduing the Enemy Without Fighting',
        startPage: 49,
        endPage: 78,
        estimatedReadTimeMinutes: 16,
        summary: 'To fight and conquer in all your battles is not supreme excellence; supreme excellence consists in breaking the enemy’s resistance without fighting.',
        pagesCount: 30
      },
      {
        id: 'aow-ch-4',
        bookId: 'book-art-of-war',
        chapterIndex: 4,
        title: 'IV. Tactical Dispositions',
        subtitle: 'Invulnerability in Defense and Suddenness in Attack',
        startPage: 79,
        endPage: 110,
        estimatedReadTimeMinutes: 18,
        summary: 'Security against defeat implies defensive tactics; ability to defeat the enemy means taking the offensive at the opportune juncture.',
        pagesCount: 32
      },
      {
        id: 'aow-ch-5',
        bookId: 'book-art-of-war',
        chapterIndex: 5,
        title: 'XIII. The Use of Intelligence & Spies',
        subtitle: 'Five Classes of Espionage and Anticipating the Unknown',
        startPage: 111,
        endPage: 180,
        estimatedReadTimeMinutes: 20,
        summary: 'What enables the wise sovereign and the good general to strike and conquer, and achieve things beyond the reach of ordinary men, is foreknowledge.',
        pagesCount: 70
      }
    ]
  },
  {
    id: 'book-frankenstein',
    title: 'Frankenstein; Or, The Modern Prometheus',
    author: 'Mary Wollstonecraft Shelley',
    coverUrl: '/images/book_frankenstein_1793353158018.jpg',
    description: 'The pioneering masterpiece of gothic science fiction exploring the ethical abyss of unchecked scientific ambition, alienation, and paternal abandonment.',
    category: 'Literature',
    totalPages: 280,
    fileSizeBytes: 12400000,
    downloadUrl: '/api/v1/books/book-frankenstein/pdf-stream',
    publishedYear: 2023,
    language: 'English',
    rating: 4.88,
    chaptersCount: 5,
    chapters: [
      {
        id: 'frk-ch-1',
        bookId: 'book-frankenstein',
        chapterIndex: 1,
        title: 'Letters I–IV: Robert Walton at Sea',
        subtitle: 'The Arctic Expedition and the Ghostly Sledge',
        startPage: 1,
        endPage: 38,
        estimatedReadTimeMinutes: 19,
        summary: 'Captain Walton writes to his sister from the icy wastes of St. Petersburgh and Archangel as his crew pulls an emaciated Victor Frankenstein from floating ice.',
        pagesCount: 38,
        pages: [
          {
            pageNumber: 1,
            heading: 'To Mrs. Saville, England',
            paragraphs: [
              'You will rejoice to hear that no disaster has accompanied the commencement of an enterprise which you have regarded with such evil forebodings.',
              'I arrived here yesterday, and my first task is to assure my dear sister of my welfare and increasing confidence in the success of my undertaking.',
              'I am already far north of London, and as I walk through the streets of Petersburgh, I feel a cold northern breeze play upon my cheeks, which braces my nerves and fills me with delight.'
            ],
            callout: 'There is something at work in my soul which I do not understand. I am practically industrious—painstaking, a workman to execute with perseverance and labour.',
            keyTakeaways: [
              'Walton’s quest for the Northwest Passage mirrors Victor’s obsessive pursuit of forbidden natural science.',
              'A stranger of gigantic stature is sighted driving a dogsled across the ice.',
              'Victor warns Walton: "Do you share my madness? Have you drunk also of the intoxicating draught?"'
            ]
          },
          {
            pageNumber: 2,
            heading: 'The Rescued Stranger',
            paragraphs: [
              'His limbs were nearly frozen, and his body dreadfully emaciated by fatigue and suffering. I never saw a man in so wretched a condition.',
              'We attempted to carry him into the cabin, but as soon as he had got into the fresh air he fainted. We brought him back to the deck and restored him to animation by rubbing him with brandy.',
              'As soon as he showed signs of life we wrapped him up in blankets and placed him near the chimney of the kitchen stove.'
            ]
          }
        ]
      },
      {
        id: 'frk-ch-2',
        bookId: 'book-frankenstein',
        chapterIndex: 2,
        title: 'Chapter IV: The Secret of Animation',
        subtitle: 'Natural Philosophy and Midnight Dissections',
        startPage: 39,
        endPage: 72,
        estimatedReadTimeMinutes: 20,
        summary: 'Victor uncovers the spark of life after two years of ceaseless laboratory labor in Ingolstadt, neglecting family and health.',
        pagesCount: 34
      },
      {
        id: 'frk-ch-3',
        bookId: 'book-frankenstein',
        chapterIndex: 3,
        title: 'Chapter V: The Awful Night of Creation',
        subtitle: 'A Dreary Night in November and the Yellow Eye',
        startPage: 73,
        endPage: 110,
        estimatedReadTimeMinutes: 22,
        summary: 'The creature draws breath by the dim yellow glimmer of candle. Overwhelmed by horror, Victor flees his apartment in terror.',
        pagesCount: 38
      },
      {
        id: 'frk-ch-4',
        bookId: 'book-frankenstein',
        chapterIndex: 4,
        title: 'Chapter X: Meeting on the Mer de Glace',
        subtitle: 'The Glacier Ascent and the Creature’s Plea',
        startPage: 111,
        endPage: 175,
        estimatedReadTimeMinutes: 28,
        summary: 'Victor encounters his creation amidst the alpine crevasses of Montanvert. The creature demands his creator listen to his tale of suffering.',
        pagesCount: 65
      },
      {
        id: 'frk-ch-5',
        bookId: 'book-frankenstein',
        chapterIndex: 5,
        title: 'Chapter XXIV: The Arctic Pursuit and Walton’s Conclusion',
        subtitle: 'The Vow of Vengeance and the Creature’s Farewell',
        startPage: 176,
        endPage: 280,
        estimatedReadTimeMinutes: 35,
        summary: 'The final relentless chase through the frozen wastes; Victor succumbs to exhaustion, and the weeping creature leaps onto an ice-raft.',
        pagesCount: 105
      }
    ]
  }
];

export const INITIAL_USER_PROGRESS: UserProgress = {
  userId: 'usr_mobile_demo_982',
  lastReadBookId: 'book-clean-arch',
  lastReadChapterId: 'ca-ch-1',
  lastReadPage: 1,
  percentCompleted: 12,
  lastSyncedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  bookProgress: {
    'book-clean-arch': {
      bookId: 'book-clean-arch',
      currentChapterId: 'ca-ch-1',
      currentPage: 1,
      percent: 12,
      bookmarks: [1, 3],
      lastReadAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      totalMinutesRead: 45
    },
    'book-art-of-war': {
      bookId: 'book-art-of-war',
      currentChapterId: 'aow-ch-1',
      currentPage: 1,
      percent: 4,
      bookmarks: [1],
      lastReadAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      totalMinutesRead: 18
    }
  }
};
