import { useState } from "react";

export const RequestConfirmationLink = ({ name, token }) => {
  const [linkSent, setLinkSent] = useState(false);
  const requestHandler = async (e) => {
    const response = await fetch(
      import.meta.env.VITE_SERVER_URI + "refreshConfirmation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, token }),
        credentials: "include",
      }
    );

    const result = await response.json();

    if (result.message !== "New link sent") {
      setLinkSent(false);
      return;
    }

    setLinkSent(true);
  };
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-3">
      {!linkSent && (
        <h2 className="text-2xl text-rose-600">
          Your confirmation link has expired. Please request a new one
        </h2>
      )}

      {linkSent && (
        <h2 className="text-2xl text-emerald-500">
          A new link was sent to your email
        </h2>
      )}
      <button onClick={requestHandler} className="bg-cyan-500 p-3 rounded-xl">
        New Link
      </button>
    </div>
  );
};
