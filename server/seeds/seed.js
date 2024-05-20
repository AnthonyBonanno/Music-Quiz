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

  const user2 = await User.create({
    username: "esdeath",
    email: "esdeath@gmail.com",
    password: "password",
  });

  await Quiz.create(
    {
      name: "Porter Robinson and Madeon Quiz",
      description: "Focused only Madeon and Porter Robinson's songs.",
      quizCreator: user1.username,
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
          name: "Which song has this lyric?",
          lyric: "There is a place in the distance. A place that I've been dreaming of.",
          choices: [
            {
              name: "Finale",
              correctAnswer: false,
            },
            {
              name: "Shuriken",
              correctAnswer: false,
            },
            {
              name: "The City",
              correctAnswer: true,
            },
            {
              name: "Shelter",
              correctAnswer: false,
            },
          ],
          hint: "Think about people. A lot of people.",
        },
        {
          name: "what's the name of this song with this lyric?",
          lyric: "Staring out the window...",
          choices: [
            {
              name: "Jet Aeroplane",
              correctAnswer: false,
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
          hint: "A rare night sky phenonmenon.",
        },
      ],
    },
    {
      name: "Friends Quiz",
      description: "A quiz on the artist 'The Bagraiders'",
      quizCreator: user2.username,
      questions: [
        
      ]
    },
    {
      name: "Random Quiz",
      description: "A quiz with no particular artist in mind. Good luck!",
      quizCreator: user2.username,
      questions: [
        {
          name: "what's the name of this song with this lyric?",
          lyric: "Staring out the window...",
          choices: [
            {
              name: "Jet Aeroplane",
              correctAnswer: false,
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
          hint: "A rare night sky phenonmenon.",
        },
        {
          name: "Which Daft Punk song has this lyric?",
          lyric: "Around the world, around the world. Around the world, around the world. Around the world, around the world. Around the world, around the world. Around the world, around the world.",
          choices: [
            {
              name: "Around the Globe",
              correctAnswer: false,
            },
            {
              name: "Around the Globe (Official Audio)",
              correctAnswer: false,
            },
            {
              name: "World the Around",
              correctAnswer: false,
            },
            {
              name: "Around the World",
              correctAnswer: true,
            },
          ],
          hint: "Around the World.",
        }
      ]
    }
  );

  console.error("database seeded");
  process.exit();
});
