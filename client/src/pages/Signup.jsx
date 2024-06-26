import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.log("error");
      console.error(e);
    }
  };

  return (
    <main>
      <h1>Sign Up</h1>
      <div className="card-body">
        {data ? (
          <p>
            Success! You may now head <Link to="/">back to the homepage.</Link>
          </p>
        ) : (
          <form style={{ padding: "20px" }} onSubmit={handleFormSubmit}>
            <input
              style={{ margin: "10px" }}
              className="form-input"
              placeholder="Your username"
              name="username"
              type="text"
              value={formState.name}
              onChange={handleChange}
            />
            <input
              style={{ margin: "10px" }}
              className="form-input"
              placeholder="Your email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
            />
            <input
              style={{ margin: "10px" }}
              className="form-input"
              placeholder="********"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />
            <button
              className="btn btn-block btn-primary"
              style={{ cursor: "pointer", margin: "10px" }}
              type="submit"
            >
              Submit
            </button>
          </form>
        )}

        {error && <div>{error.message}</div>}
      </div>
    </main>
  );
};

export default Signup;
