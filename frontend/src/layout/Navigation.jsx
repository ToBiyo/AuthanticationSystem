import { useState } from "react";
import user from "../assets/user.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Navigation = ({ isLoggedIn }) => {
  const hidden = "hidden bg-cyan-500";
  const visible = "flex flex-col items-center jusitfy-center bg-cyan-500 gap-2";
  const [menuClass, setMenuClass] = useState(hidden);
  const navigate = useNavigate();

  const logoutHandler = async (e) => {
    const response = await fetch(import.meta.env.VITE_SERVER_URI + "logout", {
      method: "POST",
      headers: {
        "Content-Type": "application-json",
      },
      credentials: "include",
    });

    const result = await response.json();
    const { message } = result;

    console.log(message);

    if (message === "success") {
      navigate("/login");
    }

    return;
  };

  const userBtnHandler = () => {
    if (menuClass === hidden) {
      setMenuClass(visible);
      return;
    }

    setMenuClass(hidden);
  };

  return (
    <div className="flex flex-col w-2/3 items-end absolute top-0 ">
      <div onClick={userBtnHandler}>
        <img src={user} alt="user image" className="max-w-10 cursor-pointer" />
      </div>
      <div className={menuClass}>
        <button className="px-8 ">
          <Link to={"/profile"}>Profile</Link>
        </button>
        <button className="px-8 " onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </div>
  );
};
