const usernamesArr = [
    'Haley',
    'John',
    'Carl',
    'Roger',
    'Lily',
    'Pearl',
    'Cameron',
    'Shane',
    'Patrick',
    'Bob'
];

const emailsArr = [
    'Haley@mail.com',
    'John@mail.com',
    'Carl@mail.com',
    'Roger@mail.com',
    'Lily@mail.com',
    'Pearl@mail.com',
    'Cameron@mail.com',
    'Shane@mail.com',
    'Patrick@mail.com',
    'Bob@mail.com'
];

const thoughtsArr = [
    'What is life all about?',
    'It is so crazy that everything is made of things we cannot even see',
    'Everything is amazing',
    'I think Avatar is a cartoon not an anime',
    'Game of Thrones had a good ending',
    'I could really go for a nice game of chess right now',
    'Elphants are the greatest animal',
    'Anyone can be anything',
    'I will be the president one day',
    'I found a pretty strone on the beach today',
    'The sun is just a big ball of fire',
    'Coding is kicking my butt',
    'I need more sleep',
    'Flowers are so nice',
    'Dark chocolate is the best',
    'I wonder what it would feel like to be able to fly',
    'The healthcare system needs to be improved',
    'We should make Monday a weekend day',
    'Is the moon made of cheese?',
    'Cats are better than dogs'
]

const reactionsArr = [
    'Awesome!',
    '👀👀👀',
    'Whoa',
    'What, really???',
    'No way!',
    'Yawn',
    'Same',
    '👏👏👏',
    'Upvote',
    'Downvote',
    'LOL',
    'Yes',
    'No',
    'Funny!',
    'Sad',
    '❤️❤️❤️',
    '❓❓❓',
    'Meh',
    'Cool',
    '🔥🔥🔥'
];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomFriends = (numFriends, user) => {
    let results = new Set();
    for (let i = 0; i < numFriends; i++) {
        const retrievedFriend = getRandomArrItem(usernamesArr);
        if (!(retrievedFriend === user)) results.add(retrievedFriend);
    }
    results = Array.from(results);
    return results;
}

const getRandomReactions = (numReactions) => {
    const results = [];
    for (let i = 0; i < numReactions; i++) {
        results.push({
            reactionBody: getRandomArrItem(reactionsArr),
            username: getRandomArrItem(usernamesArr)
        });
    }
    return results;
};

const getRandomThoughts = (numThoughts, numReactions, user) => {
    const results = [];
    for (let i = 0; i < numThoughts; i++) {
        results.push({
            thoughtText: getRandomArrItem(thoughtsArr),
            username: user,
            reactions: getRandomReactions(numReactions)
        });
    }
    return results;
};

module.exports = {
    usernamesArr,
    emailsArr,
    getRandomFriends,
    getRandomThoughts
}