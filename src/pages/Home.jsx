import { useContext } from "react";
import UserContext from "../contexts/UserContext";

const Home = () => {
  const { userData } = useContext(UserContext);
  console.log(userData);
  return <h1>Home</h1>;
};

export default Home;
