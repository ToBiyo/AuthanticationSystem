import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "../layout/Navigation";
import { refreshAuth } from "../lib/refreshAuth";

export function Home() {
  const navigate = useNavigate();

  const [user, setUser] = useState("");

  async function authRequest() {
    const response = await fetch(
      import.meta.env.VITE_SERVER_URI + "greetings",
      {
        credentials: "include",
      }
    );

    const result = await response.json();

    if (result.message === "jwt expired") {
      return await refreshAuth(authRequest, navigate);
    }

    const { user } = result;

    console.log(user);

    if (!user) {
      navigate("/login");
      return;
    }
    setUser(user);
  }

  useEffect(() => {
    authRequest();
  }, []);

  return (
    <div className="min-h-screen min-w-full bg-slate-900 flex flex-col justify-center items-center">
      <Navigation />
      <h1 className="text-white">Welcome {user}</h1>
    </div>
  );
}
