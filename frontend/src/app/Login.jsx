import React from "react";
import { Link } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
export const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h2 className="text-4xl p-6">Login into your account</h2>
      <LoginForm />
      <span className="p-3">
        If you don't have an coount please sign up{" "}
        <Link to={"/registration"} className="text-cyan-500">
          here
        </Link>
      </span>
    </div>
  );
};
