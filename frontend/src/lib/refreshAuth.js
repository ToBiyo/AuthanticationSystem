export const refreshAuth = async (callback, redirect) => {
  const response = await fetch(
    import.meta.env.VITE_SERVER_URI + "refreshAuth",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  const result = await response.json();

  if (result.message !== "Token succesfully refreshed") {
    redirect("/login");
  }
  console.log("token refreshed");

  await callback();
  return;
};
