const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { 
    usernamesArr, 
    emailsArr, 
    getRandomFriends, 
    getRandomThoughts, 
} = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // Drop existing users
    await User.deleteMany({});
    console.log('------- USERS DELETED -------');

    // Drop existing thoughts
    await Thought.deleteMany({});
    console.log('------- THOUGHTS DELETED -------');

    // Random number function
    const randomNum = (int) => {
        return Math.floor(Math.random() * int);
    };

    // create empty array to hold thoughts
    const thoughts = [];

    // loop through all users, generating thoughts and reactions for each
    for (let i = 0; i < usernamesArr.length; i++) {

        const user = usernamesArr[i];
        const numThoughts = randomNum(4);
        const numReactions = randomNum(4);

        const userThoughts = getRandomThoughts(numThoughts, numReactions, user);

        thoughts.push(...userThoughts)
    };

    await Thought.collection.insertMany(thoughts);
    console.log('------- THOUGHTS SEEDED -------');

    const users = [];

    for (let i = 0; i < usernamesArr.length; i++) {
        const mail = emailsArr[i];
        const user = usernamesArr[i];
        const userThoughts = [];

        const thoughtData = await Thought.collection
        .find({ username: user })
        .project({ _id: 1 }).toArray();

        thoughtData.forEach((el) => {
            userThoughts.push(el._id);
        });

        users.push({
            username: user,
            email: mail,
            thoughts: userThoughts,
        });
    };

    await User.collection.insertMany(users);
    console.log('------- USERS SEEDED -------');

    for (let i = 0; i < usernamesArr.length; i++) {
        const user = usernamesArr[i];
        const numFriends = randomNum(4);
        const friendList = [];

        const friends = getRandomFriends(numFriends, user);

        for (let j = 0; j < friends.length; j++) {
            const friendData = await User.collection
            .find({ username: friends[j] })
            .project({ _id: 1 }).toArray();

            friendList.push(friendData[0]._id);
            console.log(friendList);
        }

        await User.collection
        .updateOne(
            { username: user },
            { $set: { friends: friendList }}
        );
    };
    console.log('------- USERS UPDATED -------');

  console.info('Seeding complete! 🌱');
  process.exit(0);
});

