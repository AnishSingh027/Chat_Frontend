import { useContext } from "react";
import OnlineUserContext from "../../contexts/OnlineUserContext.jsx";

const UserCard = ({ user, button }) => {
  const { _id, firstName, lastName, age, gender, photoUrl } = user || {};
  const { isPresent, buttonFeatures } = button || {};
  const { onlineUsers } = useContext(OnlineUserContext);

  const isOnline = onlineUsers?.includes(_id);

  return (
    <div className="group relative w-72 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Online badge */}
      {isOnline && (
        <div
          className="absolute top-4 right-4 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-900 shadow-[0_0_8px_rgba(34,197,94,0.6)] z-10"
          title="Online"
        />
      )}
      {/* Image */}
      <div className="w-full h-64 overflow-hidden">
        <img
          src={`${
            photoUrl
              ? photoUrl
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF9_37zFa60ASp-MZMKp1f7tUJP1138aNnww&s"
          }`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <h1 className="font-semibold text-lg text-white tracking-wide">
          {firstName + " " + lastName}
        </h1>

        {age && (
          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>Age: {age}</span>
            <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs">
              {gender == "male" ? "M" : "F"}
            </span>
          </div>
        )}

        {/* Buttons */}
        {isPresent && (
          <div className="flex items-center gap-2 mt-2">
            {buttonFeatures.map((item, id) => {
              return (
                <button
                  key={id}
                  onClick={item?.method}
                  className={`flex-1 py-2 text-sm font-medium rounded-xl ${item.color} text-white shadow-md hover:shadow-lg active:scale-95 ${item.hover} transition-all duration-200`}
                >
                  {item.function}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Subtle Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none bg-gradient-to-br from-blue-500/10 to-indigo-500/10" />
    </div>
  );
};

export default UserCard;
