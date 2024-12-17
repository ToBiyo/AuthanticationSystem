import { useRef, useState } from "react";
export const RegistrationForm = ({ onRegistration }) => {
  const userFirstName = useRef();
  const userLastName = useRef();
  const userEmail = useRef();
  const userPassword = useRef();
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    const user = {
      firstName: userFirstName.current.value,
      lastName: userLastName.current.value,
      email: userEmail.current.value,
      password: userPassword.current.value,
    };

    if (!user.firstName || !user.lastName || !user.email || !user.password) {
      setError("All the fields are required");
      return;
    }

    try {
      const response = await fetch(import.meta.env.VITE_SERVER_URI + "signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
      });

      const result = await response.json();

      if (result.error) {
        setError(result.error);
        return;
      }

      onRegistration(true);
    } catch (error) {
      console.log({ error: error });
    }
  };

  return (
    <form
      action="#"
      onSubmit={submitHandler}
      className="flex flex-col w-2/3 min-h-max py-16 bg-blue-600 items-center justify-center rounded-2xl gap-4"
    >
      <input
        type="text"
        className="bg-slate-100 w-96 p-2 rounded-3xl text-black"
        placeholder="First Name"
        ref={userFirstName}
      />
      <input
        type="text"
        className="bg-slate-100 w-96 p-2 rounded-3xl text-black"
        placeholder="Last Name"
        ref={userLastName}
      />
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
      {error && <span className="text-red-500 p-2">{error}</span>}
      <button className="bg-purple-700 p-3 rounded-2xl min-w-44 text-lg">
        Sign Up
      </button>
    </form>
  );
};
