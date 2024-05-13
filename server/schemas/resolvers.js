const { User, Quiz, Question } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, { username }) => {
      try {
        return User.findOne({ username }).populate("quizzes");

      } catch (error) {
        console.error("Error: ", error);
      }
    },
    quizzes: async () => {
      return Quiz.find();
    },
    quiz: async (parent, { quizId }) => {
      return Quiz.findOne({ _id: quizId })
        .populate("questions")
        .populate({ path: "questions", populate: { path: "choices" } })
        .populate({ path: "questions", populate: { path: "hint" } });
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      try {
        console.log("add user mutation args: ", args);
        const user = await User.create(args);
        console.log("This is the user made: ", user);
        const token = signToken(user);
        console.log("TOKEN HERE: ", token);

        return { token, user };
      } catch (error) {
        console.error("Error: ", error);
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      console.log("RESOLVER", user);
      return { token, user };
    },
    addQuiz: async (parent, {createQuiz}, context) => {
      if (context.user) {
        const quiz = await Quiz.create(createQuiz);

        await User.findByIdAndUpdate(context.user._id, {
          $push: { quizzes: quiz },
        });

        return quiz;
      }
      throw AuthenticationError;
    },
    addQuestion: async (parent, args, context) => {
      if (context.user) {
        const question = await Question.create(args);
        return question;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
