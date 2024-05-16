const db = require("../config/connection");
const cleanDB = require("./cleanDB");
const { User, Quiz } = require("../models");

db.once("open", async () => {
  await cleanDB("User", "users");
  await cleanDB("Quiz", "quizzes");

  const user1 = await User.create({
    username: "anthony",
    email: "anth@gmail.com",
    password: "password",
  });

  await Quiz.create(
    {
      name: "EDM Quiz",
      description: "Features Madeon and Porter Robinson",
      userId: user1._id,
      questions: [
        {
          name: "What's the name of this song?",
          lyric: "And I need room to breathe...",
          choices: [
            {
              name: "Language",
              correctAnswer: true,
            },
            {
              name: "Goodbye to a World",
              correctAnswer: false,
            },
            {
              name: "Technicolor",
              correctAnswer: false,
            },
            {
              name: "Hear the Bells",
              correctAnswer: false,
            },
          ],
          hint: "English is a...",
        },
        {
          name: "What's the correct lyric?",
          lyric: "Grey waves.",
          choices: [
            {
              name: "choice1",
              correctAnswer: true,
            },
            {
              name: "choice2",
              correctAnswer: false,
            },
            {
              name: "choice3",
              correctAnswer: false,
            },
            {
              name: "choice4",
              correctAnswer: false,
            },
          ],
          hint: "something something",
        },
        {
          name: "what's the name of this song with this lyric?",
          lyric: "staring out the window...",
          choices: [
            {
              name: "Jet Aeroplane",
              correctAnswer: "false",
            },
            {
              name: "Shooting Stars",
              correctAnswer: true,
            },
            {
              name: "Tongue Tied",
              correctAnswer: false,
            },
            {
              name: "Layers",
              correctAnswer: false,
            },
          ],
          hint: "A rare night sky phenonmenon",
        },
      ],
    },
    {
      name: "Friends Quiz",
      description: "Quiz on the band Laundry Day",
      userId: user1._id,
    }
  );

  console.error("database seeded");
  process.exit();
});
