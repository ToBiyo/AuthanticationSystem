import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RegistrationConfirmed } from "../layout/RegistrationConfirmed";
import { RequestConfirmationLink } from "../layout/RequestConfirmationLink";

export const VerifyEmail = () => {
  let params = useParams();
  const { name, token } = params;
  const [confirmed, setConfirmed] = useState(false);

  const confirmMail = async () => {
    const response = await fetch(
      import.meta.env.VITE_SERVER_URI + "confirmRegistration",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),

        credentials: "include",
      }
    );

    const data = await response.json();

    if (data.message === "ok") {
      setConfirmed(true);
    }
    return;
  };

  useEffect(() => {
    confirmMail();
  }, []);

  return (
    <div>
      {confirmed && <RegistrationConfirmed />}
      {!confirmed && <RequestConfirmationLink token={token} name={name} />}
    </div>
  );
};
