const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl } = user;
  return (
    <div className="shadow-2xl rounded p-5 px-3 w-64 flex justify-between gap-3 flex-col ">
      <div className="relative min-h-7">
        <h1 className="text-black text-sm px-3 py-1 rounded absolute right-3 top-0 bg-red-700 font-bold">
          Pending
        </h1>
      </div>
      <div className="w-full">
        <img
          src={`${photoUrl ? photoUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9_37zFa60ASp-MZMKp1f7tUJP1138aNnww&s"}`}
          className="w-full h-60 m-auto object-fill"
        />
      </div>
      <h1 className="font-bold text-xl">{firstName + " " + lastName}</h1>
      <div className="flex items-center justify-between">
        <h2>Age: 20</h2>
        <h2>Gender: male</h2>
      </div>
    </div>
  );
};

export default UserCard;
