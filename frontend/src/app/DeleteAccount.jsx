import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { refreshAuth } from "../lib/refreshAuth";

export const DeleteAccount = () => {
  const password = useRef();
  const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState();

  const deleteAccountHandler = async (e) => {
    e.preventDefault();
    const userPassword = password.current.value;
    console.log(userPassword);

    const response = await fetch(
      import.meta.env.VITE_SERVER_URI + "deleteAccount",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ password: userPassword }),
      }
    );

    const result = await response.json();
    if (result.message === "jwt expired") {
      return refreshAuth(deleteAccountHandler, navigate);
    }

    if (result.message === "Account deleted") {
      setDeleted(true);
      return;
    }

    setError(result.message);
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h2 className="text-3xl m-5">Delete Your Account</h2>
      {!deleted && (
        <form
          action=""
          className="flex flex-col gap-6 items-center"
          onSubmit={deleteAccountHandler}
        >
          <input
            type="password"
            ref={password}
            className="bg-slate-100 p-1 rounded-3xl text-black"
            placeholder="Your password"
          />
          <button className="bg-rose-500 p-1 rounded-xl">
            Delete your account
          </button>
          {error && <span className="text-red-600">{error}</span>}
        </form>
      )}
      {deleted && (
        <h2 className="text-emerald-500 text-2xl">
          Your account was successfully deleted
        </h2>
      )}
    </div>
  );
};
