import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [error, setError] = useState(null);
  const userEmail = useRef();
  const userPassword = useRef();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const user = {
      email: userEmail.current.value,
      password: userPassword.current.value,
    };

    if (!user.email || !user.password) {
      setError("All the fields are required");
      return;
    }

    try {
      const response = await fetch(import.meta.env.VITE_SERVER_URI + "signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
      });

      const result = await response.json();

      if (
        result.message === "User not found" ||
        result.message === "Invalid Password" ||
        result.message ===
          "Please check your eamil and confirm your registration"
      ) {
        setError(result.message);
        return;
      }
      console.log("redirect to home page");

      setError(null);
      navigate("/");
    } catch (error) {
      console.log({ message: error });
    }
  };
  return (
    <form
      action="#"
      onSubmit={submitHandler}
      className="flex flex-col w-2/4 min-h-max py-16 bg-blue-700 items-center justify-center rounded-2xl gap-4 "
    >
      <input
        type="email"
        className="bg-slate-100 w-96 p-2 rounded-3xl text-black"
        placeholder="email@example.com"
        ref={userEmail}
      />
      <input
        type="password"
        className="bg-slate-100 w-96 p-2 rounded-3xl text-black"
        placeholder="password"
        ref={userPassword}
      />
      {error && <span className="p-2 text-red-500">{error}</span>}
      <button className="bg-purple-700 p-3 rounded-2xl min-w-44 text-lg">
        Sign Up
      </button>
    </form>
  );
};
