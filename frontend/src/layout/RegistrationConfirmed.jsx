import { Link } from "react-router-dom";

export const RegistrationConfirmed = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-5">
      <h2 className="text-3xl text-emerald-500">
        You have successfully confirmed your email.
      </h2>
      <p className="text-xl">
        Plaese{" "}
        <span className="text-cyan-500">
          <Link to={"/login"}>login</Link>
        </span>{" "}
        in yo your account
      </p>
    </div>
  );
};
