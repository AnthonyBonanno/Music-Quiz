const { User, Quiz } = require("../models");
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
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("quizzes");
      }
      throw AuthenticationError;
    },
    quizzes: async () => {
      return Quiz.find();
    },
    quiz: async (parent, { quizId }) => {
      return Quiz.findOne({ _id: quizId })
        .populate("questions")
        .populate({ path: "questions", populate: { path: "choices" } });
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);
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
      return { token, user };
    },
    addQuiz: async (parent, { createQuiz }, context) => {
      if (context.user) {
        const quiz = await Quiz.create(createQuiz);
        await User.findByIdAndUpdate(context.user._id, {
          $push: { quizzes: quiz },
        });
        return quiz;
      }
      throw AuthenticationError;
    },
    addQuestion: async (parent, { createQuestion }, context) => {
      if (context.user) {
        const { quizId, name, lyric, choices, hint } = createQuestion;

        const newQuestion = {
          name,
          lyric,
          choices,
          hint,
        };

        const updatedQuiz = await Quiz.findOneAndUpdate(
          { _id: quizId },
          {
            $addToSet: {
              questions: newQuestion,
            },
          },
          { new: true }
        );

        if (!updatedQuiz) {
          throw Error("Quiz not found");
        }

        const addedQuestion = updatedQuiz.questions.find(
          (question) => question.lyric === lyric
        );
        return addedQuestion;
      }
      throw AuthenticationError;
    },
    updateQuestion: async (parent, { updateQuestion }, context) => {
      if (context.user) {
        const { id, quizId, name, lyric, choices, hint } = updateQuestion;

        const updatedQuiz = await Quiz.findOneAndUpdate(
          { _id: quizId, "questions._id": id },
          {
            $set: {
              "questions.$.name": name,
              "questions.$.lyric": lyric,
              "questions.$.choices": choices,
              "questions.$.hint": hint,
            },
          },
          { new: true }
        );

        if (!updatedQuiz) {
          throw Error("Quiz not found");
        }

        const updatedQuestion = updatedQuiz.questions.id(id);
        return updatedQuestion;
      }
      throw AuthenticationError;
    },
    removeQuiz: async (parent, { quizId }, context) => {
      if (context.user) {
        const quiz = await Quiz.findOneAndDelete({ _id: quizId });

        if (!quiz) {
          throw Error('Quiz not found');
        }

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { quizzes: quiz._id } }
        );

        return quiz;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
