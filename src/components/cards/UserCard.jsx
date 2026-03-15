const UserCard = ({ user, button }) => {
  const { _id, firstName, lastName, age, gender, photoUrl } = user || {};
  const { isPresent, buttonFeatures } = button || {};
  // const { sendRequestToSpecificUser } = useUserRequest();

  // const sendRequest = (userId) => {
  //   sendRequestToSpecificUser(userId);
  // };

  return (
    <div className="shadow-2xl rounded p-5 px-3 w-64 flex justify-between gap-3 flex-col">
      <div className="w-full">
        <img
          src={`${photoUrl ? photoUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9_37zFa60ASp-MZMKp1f7tUJP1138aNnww&s"}`}
          className="w-full h-60 m-auto object-fill"
        />
      </div>
      <h1 className="font-bold text-xl">{firstName + " " + lastName}</h1>
      {age && (
        <div className="flex items-center justify-between">
          <h2>Age: {age}</h2>
          <h2>Gender: {gender == "male" ? "M" : "F"}</h2>
        </div>
      )}
      {isPresent && (
        <div className="flex items-center justify-between gap-2">
          {buttonFeatures.map((item, id) => {
            return (
              <button
                key={id}
                onClick={item?.method}
                className={`py-2 px-4 w-full ${item.color} text-white font-bold rounded cursor-pointer ${item.hover} transition duration-100`}
              >
                {item.function}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserCard;
