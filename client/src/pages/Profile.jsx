import { useQuery } from "@apollo/client";
import { Navigate, useParams } from "react-router-dom";
import Auth from "../utils/auth";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import QuizList from "../components/QuizList/QuizList";

const Profile = () => {
  const { username: userParam } = useParams();
  console.log("UserParam: ", userParam);

  const { loading, data, error } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  console.log(QUERY_USER);
  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user?.username) {
    return <h4>You need to be logged in to see this!</h4>;
  }

  return (
    <>
      <h1>Viewing {userParam ? `${user.username}'s` : "your"} profile.</h1>

      <section>
        <QuizList quizzes={user.quizzes} />
      </section>
    </>
  );
};

export default Profile;
