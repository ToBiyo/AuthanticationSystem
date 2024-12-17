import { useState } from "react";
import { Link } from "react-router-dom";
import { RegistrationForm } from "../components/RegistrationForm";

export const Registration = () => {
  const [registered, setRegistered] = useState(false);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h2 className="text-4xl p-6">Register your account</h2>
      {!registered && (
        <>
          <RegistrationForm onRegistration={setRegistered} />
          <span className="p-3">
            If you already have an account please sign up{" "}
            <Link to={"/login"} className="text-cyan-500">
              here
            </Link>
          </span>
        </>
      )}
      {registered && (
        <h2>
          Account registered. Please check your mail box and confirm your email
        </h2>
      )}
    </div>
  );
};
