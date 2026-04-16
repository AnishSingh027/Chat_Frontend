const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl } = user;

  return (
    <div className="group relative w-72 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Status Badge */}
      <div className="absolute top-3 right-3 z-10">
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
          Pending
        </span>
      </div>

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

        <div className="flex items-center justify-between text-sm text-slate-400">
          <span>Age: 20</span>
          <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs">
            male
          </span>
        </div>
      </div>

      {/* Hover Glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none bg-gradient-to-br from-blue-500/10 to-indigo-500/10" />
    </div>
  );
};

export default UserCard;
