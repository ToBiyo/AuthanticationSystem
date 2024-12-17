import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "../layout/Navigation";
import { ProfileContent } from "../components/ProfileContent";
import { refreshAuth } from "../lib/refreshAuth";

export const Profile = () => {
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const getUserData = async () => {
    const response = await fetch(import.meta.env.VITE_SERVER_URI + "user", {
      credentials: "include",
    });

    const result = await response.json();

    if (result.message === "jwt expired") {
      return await refreshAuth(getUserData, navigate);
    }

    const { user } = result;

    if (!user) {
      navigate("/login");
    }

    const profileData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    setUserData(profileData);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className=" h-screen flex flex-col justify-center items-center">
      <Navigation />
      {userData && <ProfileContent user={userData} />}
      {!userData && <h1>Loading...</h1>}
    </div>
  );
};
