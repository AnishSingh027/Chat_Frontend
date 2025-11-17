import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";

const Home = () => {
  const [num, setNum] = useState(0);
  // useEffect(() => {
  //   console.log("userData: ", userData);
  //   console.log("loggedIn status: ", isUserLoggedIn);
  // }, []);

  return (
    <>
      <h1>{num}</h1>
      <button onClick={() => setNum((prev) => prev + 1)}>Add</button>
    </>
  );
};

export default Home;
