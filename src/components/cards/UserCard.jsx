import { useUserRequest } from "./useUserCard";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, photoUrl } = user;
  const { sendRequestToSpecificUser } = useUserRequest();

  const sendRequest = (userId) => {
    sendRequestToSpecificUser(userId);
  };

  return (
    <div className="shadow-2xl rounded p-5 px-3 w-64 flex justify-between gap-3 flex-col">
      <div className="w-full">
        <img
          src={`${photoUrl ? photoUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9_37zFa60ASp-MZMKp1f7tUJP1138aNnww&s"}`}
          className="w-full h-60 m-auto object-fill"
        />
      </div>
      <h1 className="font-bold text-xl">{firstName + " " + lastName}</h1>
      <div className="flex items-center justify-between">
        <h2>Age: {age}</h2>
        <h2>Gender: {gender == "male" ? "M" : "F"}</h2>
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={() => sendRequest(_id)}
          className="py-2 px-4 bg-blue-500 text-white font-bold rounded cursor-pointer hover:bg-blue-700 transition duration-100"
        >
          Send
        </button>
        <button className="py-2 px-4 bg-red-500 text-white font-bold rounded cursor-pointer hover:bg-red-700 transition duration-100">
          Reject
        </button>
      </div>
    </div>
  );
};

export default UserCard;
