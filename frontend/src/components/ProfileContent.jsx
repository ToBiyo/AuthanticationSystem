import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

export const ProfileContent = ({ user }) => {
  const [userData, setUserData] = useState(user);
  const [firstNameDisabled, setFirstNameDisabled] = useState(true);
  const [lastNameDisabled, setLastNameDisabled] = useState(true);
  const [emailDisabled, setEmailDisabled] = useState(true);
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();

  const enableInput = (setState) => {
    setState((prev) => !prev);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const first_name = firstName.current.value;
    const last_name = lastName.current.value;
    const userEmail = email.current.value;

    if (!first_name || !last_name || !email) {
      console.log("All filed are required");
      return;
    }

    const newUserData = {
      first_name: first_name,
      last_name: last_name,
      email: userEmail,
    };

    const response = await fetch(
      import.meta.env.VITE_SERVER_URI + "updateData",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserData),
        credentials: "include",
      }
    );

    const result = await response.json();

    console.log(result);
  };

  return (
    <div className=" flex flex-col w-1/3 p-6 bg-cyan-500">
      <form action="#" className="flex flex-col gap-2" onSubmit={submitHandler}>
        <label htmlFor="first_name">First Name</label>
        <div className="flex gap-3 w-full justify-between">
          <input
            type="text"
            name="first_name"
            id="first_name"
            className="p-1 bg-slate-50 rounded-3xl text-black w-5/6"
            defaultValue={userData.firstName}
            disabled={firstNameDisabled}
            ref={firstName}
          />
          <button
            className="w-10"
            onClick={(e) => {
              e.preventDefault();
              enableInput(setFirstNameDisabled);
              setTimeout(() => {
                firstName.current.focus();
              }, 200);
            }}
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>
        <label htmlFor="last_name">Last Name</label>
        <div className="flex gap-3 w-full justify-between">
          <input
            type="text"
            name="last_name"
            id="last_name"
            defaultValue={userData.lastName}
            className="p-1 bg-slate-50 rounded-3xl text-black w-5/6"
            disabled={lastNameDisabled}
            ref={lastName}
          />
          <button
            className="w-10"
            onClick={(e) => {
              e.preventDefault();
              enableInput(setLastNameDisabled);
              setTimeout(() => {
                lastName.current.focus();
              }, 200);
            }}
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>
        <label htmlFor="email">Email</label>
        <div className="flex gap-3 w-full justify-between">
          <input
            type="email"
            name="email"
            id="email"
            defaultValue={userData.email}
            className="p-1 bg-slate-50 rounded-3xl text-black w-5/6"
            disabled={emailDisabled}
            ref={email}
          />
          <button
            className="w-10"
            onClick={(e) => {
              e.preventDefault();
              enableInput(setEmailDisabled);
              setTimeout(() => {
                email.current.focus();
              }, 200);
            }}
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>
        <button className="m-3 p-1 bg-cyan-700">Save</button>
      </form>
      <div className="flex justify-around">
        <button className="bg-cyan-700 p-2 rounded-3xl my-2">
          <Link to="/changePassword">Change Password</Link>
        </button>
        <button>
          <Link to={"/deleteAccount"}>Delete Account</Link>
        </button>
      </div>
    </div>
  );
};
