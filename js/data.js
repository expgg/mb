// Main data file containing information about all manhwas

// Import chapter data
const manhwas = [
    {
        id: 'solo-leveling',
        title: 'Solo Leveling',
        cover: 'https://mangadex.org/covers/32d76d19-8a05-4db0-9fc2-e0b0648fe9d0/e90bdc47-c8b9-4df7-b2c0-17641b645ee1.jpg',
        description: 'In a world where hunters — humans who possess magical abilities — must battle deadly monsters to protect humanity, Sung Jinwoo, the weakest hunter of all mankind, finds himself in a mysterious dungeon where he acquires an unlikely power.',
        genres: ['Action', 'Adventure', 'Fantasy', 'Supernatural'],
        author: 'Chugong',
        artist: 'DUBU(REDICE Studio)',
        status: 'Completed',
        releaseYear: 2018,
        // This will be linked to the solo-leveling-chapters.js file
        chaptersData: soloLevelingChapters
    },
    {
        id: 'tower-of-god',
        title: 'Tower of God',
        cover: 'https://preview.redd.it/tower-of-god-hey-i-just-wondering-is-this-manhwa-worth-to-v0-ekms8587epfb1.jpg?auto=webp&s=f851addb9177ae780db898e85fa14d5726f7a36a',
        description: 'The story centers around a boy called Twenty-Fifth Bam, who has spent most of his life trapped beneath a vast and mysterious Tower, with only his close friend, Rachel, to keep him company. When Rachel enters the Tower, Bam manages to open the door into it as well, and faces challenges at each floor of this tower as he tries to find his closest companion.',
        genres: ['Action', 'Adventure', 'Fantasy', 'Mystery', 'Drama'],
        author: 'SIU',
        artist: 'SIU',
        status: 'Ongoing',
        releaseYear: 2010,
        // This will be linked to the tower-of-god-chapters.js file
        chaptersData: towerOfGodChapters
    },
    {
        id: 'true-education',
        title: 'True Education',
        cover: 'https://preview.redd.it/true-education-hey-is-this-manhwa-worth-the-read-or-not-v0-ujllx5914qfb1.jpg?auto=webp&s=7ad96b7f9936465a2cc887a3b8a880e4eeae9355',
        description: 'Na Hwa-jin, a teacher with a mysterious past, transfers to a troubled school and uses unconventional methods to reform both students and corrupt faculty.',
        genres: ['Action', 'Drama', 'School Life', 'Psychological'],
        author: 'Ryun Ryong',
        artist: 'AOKI Mitsuhisa',
        status: 'Ongoing',
        releaseYear: 2020,
        chaptersData: trueEducationChapters
    },
    {
        id: 'guard-pass',
        title: 'Guard Pass',
        cover: 'https://i.pinimg.com/736x/46/3f/4c/463f4cba033acd36d9011b27c4f498b2.jpg',
        description: 'A story about a young man who enters the world of Brazilian Jiu-Jitsu and mixed martial arts, facing challenges both in and out of the ring.',
        genres: ['Action', 'Sports', 'Drama'],
        author: 'Park Tae-jun',
        artist: 'Yansae',
        status: 'Ongoing',
        releaseYear: 2022,
        chaptersData: guardPassChapters
    },
    {
        id: 'lookism',
        title: 'Lookism',
        cover: 'https://www.harum.io/cdn/shop/products/17_86ab3e42-09d2-46b3-a9bd-786d51fa1c30.jpg?v=1620741330',
        description: 'Park Hyung Suk, a victim of severe bullying, wakes up one day with a new body that is tall, handsome, and fit. He can switch between his two bodies, and he uses his new body to navigate the complex social hierarchies at his new high school.',
        genres: ['Drama', 'School Life', 'Action', 'Comedy'],
        author: 'Park Tae-jun',
        artist: 'Park Tae-jun',
        status: 'Ongoing',
        releaseYear: 2014,
        chaptersData: lookismChapters
    },
    {
        id: 'mercenary-enrollment',
        title: 'Mercenary Enrollment',
        cover: 'https://i.pinimg.com/474x/1c/9a/56/1c9a56fdb82c377ec3b966ccb1ca4587.jpg',
        description: 'After surviving a plane crash that killed his parents, Yu Ijin spent 10 years as a child mercenary. Now he must navigate high school life while protecting his sister and dealing with threats from his past.',
        genres: ['Action', 'School Life', 'Drama'],
        author: 'YC',
        artist: 'Rak Hyun',
        status: 'Ongoing',
        releaseYear: 2020,
        chaptersData: mercenaryEnrollmentChapters
    },
    {
        id: 'the-beginning-after-the-end',
        title: 'The Beginning After the End',
        cover: 'https://m.media-amazon.com/images/M/MV5BMTIzNDFjY2QtZTY3NC00NzY0LWE5NjQtOGY1NjliMDY0YmE0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
        description: 'King Grey has unrivaled strength, wealth, and prestige in a world governed by martial ability. However, solitude lingers closely behind those with great power. Beneath the glamorous exterior of a powerful king lurks the shell of man, devoid of purpose and will. Reincarnated into a new world filled with magic and monsters, the king has a second chance to relive his life.',
        genres: ['Fantasy', 'Action', 'Adventure', 'Romance'],
        author: 'TurtleMe',
        artist: 'Fuyuki23',
        status: 'Ongoing',
        releaseYear: 2018,
        chaptersData: theBeginningAfterTheEndChapters
    },
    {
        id: 'leveling-up-by-only-eating',
        title: 'Leveling Up by Only Eating',
        cover: 'https://nemoitstore.com/cdn/shop/products/2_32ff921b-9021-48c9-9f02-9ab32e558d98.jpg?v=1665381016&width=1445',
        description: 'In a world where people can level up through various means, Kim Hyun discovers a unique ability to gain power by eating. As he consumes different foods, he grows stronger and faces increasingly powerful adversaries.',
        genres: ['Fantasy', 'Action', 'Comedy', 'Adventure'],
        author: 'PARK Taeman',
        artist: 'Moto',
        status: 'Ongoing',
        releaseYear: 2021,
        chaptersData: levelingUpByOnlyEatingChapters
    },
    {
        id: 'wind-breaker',
        title: 'Wind Breaker',
        cover: 'https://70eastbooks.com/cdn/shop/products/9_e1b46560-a44c-4585-8bc6-64366fc0b962.jpg?v=1676876781&width=1445',
        description: 'Follows the story of Jo Ja-Hyun, the president of the student council at a prestigious high school, who is also secretly a member of a powerful biking crew. The series explores themes of friendship, rivalry, and personal growth through the world of street biking.',
        genres: ['Sports', 'Action', 'School Life', 'Drama'],
        author: 'Yongseok Jo',
        artist: 'Yongseok Jo',
        status: 'Ongoing',
        releaseYear: 2013,
        chaptersData: windBreakerChapters
    }
];