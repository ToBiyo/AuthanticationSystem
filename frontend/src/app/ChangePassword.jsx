import { useRef } from "react";

export const ChangePassword = () => {
  const oldPassword = useRef();
  const newPassword = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    const oldPsw = oldPassword.current.value;
    const newPsw = newPassword.current.value;

    if (!oldPsw || !newPsw) {
      console.log("both field are required");
      return;
    }

    const passwords = {
      oldPassword: oldPsw,
      newPassword: newPsw,
    };

    const response = await fetch(
      import.meta.env.VITE_SEREVR_URI + "changePassword",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwords),
        credentials: "include",
      }
    );

    const result = await response.json();

    console.log(result);
  };

  return (
    <div className="flex justify-center w-full h-screen">
      <form
        action="#"
        className="flex flex-col gap-3 self-center bg-cyan-500 w-1/3 max-h-72 p-3 rounded-3xl"
        onSubmit={submitHandler}
      >
        <label htmlFor="password">Your password</label>
        <input
          type="password"
          className="bg-slate-50 rounded-xl p-1 text-black"
          ref={oldPassword}
        />
        <label htmlFor="new_password">Your new password</label>
        <input
          type="password"
          className="bg-slate-50 rounded-xl p-1 text-black"
          ref={newPassword}
        />
        <input
          type="submit"
          value={"Send"}
          className="bg-cyan-700 w-20 self-center p-2 rounded-xl text-lg"
        />
      </form>
    </div>
  );
};
