import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Search, MessageCircle } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  const searchFilteredUsers = filteredUsers.filter((user) =>
    user.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-base-300/50 flex flex-col transition-all duration-300 bg-base-100/50 backdrop-blur-sm">
      <div className="border-b border-base-300/50 w-full p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
            <Users className="size-5 text-primary" />
          </div>
          <span className="font-semibold text-lg hidden lg:block">Contacts</span>
        </div>
        
        {/* Search Bar */}
        <div className="relative hidden lg:block mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-base-content/40" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered input-sm w-full pl-10 rounded-xl bg-base-200/50 focus:bg-base-100 transition-all input-modern"
          />
        </div>
        
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2 hover:bg-base-200/50 p-2 rounded-lg transition-colors">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm checkbox-primary"
            />
            <span className="text-sm font-medium">Online only</span>
          </label>
          <span className="text-xs px-2 py-1 rounded-full bg-success/10 text-success font-medium">
            {onlineUsers.length - 1} online
          </span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-2 flex-1">
        {searchFilteredUsers.map((user, index) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-200/70 transition-all duration-200
              ${selectedUser?._id === user._id 
                ? "bg-gradient-to-r from-primary/10 to-secondary/5 border-l-4 border-primary" 
                : "border-l-4 border-transparent"
              }
            `}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="relative mx-auto lg:mx-0">
              <div className={`size-12 rounded-full overflow-hidden ring-2 ring-offset-2 ring-offset-base-100 transition-all duration-300 ${
                selectedUser?._id === user._id ? "ring-primary" : "ring-base-300"
              } ${onlineUsers.includes(user._id) ? "avatar-online" : ""}`}>
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className="size-12 object-cover"
                />
              </div>
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-success 
                  rounded-full ring-2 ring-base-100 animate-pulse"
                />
              )}
            </div>

            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className={`text-sm flex items-center gap-1 ${
                onlineUsers.includes(user._id) ? "text-success" : "text-base-content/50"
              }`}>
                {onlineUsers.includes(user._id) ? (
                  <>
                    <span className="size-1.5 rounded-full bg-success" />
                    Online
                  </>
                ) : (
                  <>
                    <span className="size-1.5 rounded-full bg-base-content/30" />
                    Offline
                  </>
                )}
              </div>
            </div>
            
            {selectedUser?._id === user._id && (
              <MessageCircle className="hidden lg:block size-4 text-primary" />
            )}
          </button>
        ))}

        {searchFilteredUsers.length === 0 && (
          <div className="text-center text-base-content/50 py-8 px-4">
            <Users className="size-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No users found</p>
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;