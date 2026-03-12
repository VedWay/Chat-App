import { X, Phone, Video, MoreVertical } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-4 border-b border-base-300/50 bg-base-100/80 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className={`avatar ${onlineUsers.includes(selectedUser._id) ? 'avatar-online' : ''}`}>
              <div className="size-12 rounded-full ring-2 ring-primary/20 ring-offset-2 ring-offset-base-100 overflow-hidden">
                <img 
                  src={selectedUser.profilePic || "/avatar.png"} 
                  alt={selectedUser.fullName}
                  className="size-12 object-cover"
                />
              </div>
            </div>
            {onlineUsers.includes(selectedUser._id) && (
              <span className="absolute bottom-0 right-0 size-3 bg-success rounded-full ring-2 ring-base-100 animate-pulse" />
            )}
          </div>

          <div>
            <h3 className="font-semibold text-lg">{selectedUser.fullName}</h3>
            <p className={`text-sm flex items-center gap-1.5 ${
              onlineUsers.includes(selectedUser._id) ? "text-success" : "text-base-content/50"
            }`}>
              {onlineUsers.includes(selectedUser._id) ? (
                <>
                  <span className="size-1.5 rounded-full bg-success animate-pulse" />
                  Active now
                </>
              ) : (
                <>
                  <span className="size-1.5 rounded-full bg-base-content/30" />
                  Offline
                </>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="btn btn-ghost btn-circle btn-sm hover:bg-primary/10 hover:text-primary transition-colors">
            <Phone className="size-4" />
          </button>
          <button className="btn btn-ghost btn-circle btn-sm hover:bg-primary/10 hover:text-primary transition-colors">
            <Video className="size-4" />
          </button>
          <button className="btn btn-ghost btn-circle btn-sm hover:bg-primary/10 hover:text-primary transition-colors">
            <MoreVertical className="size-4" />
          </button>
          <button 
            onClick={() => setSelectedUser(null)}
            className="btn btn-ghost btn-circle btn-sm hover:bg-error/10 hover:text-error transition-colors ml-2"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChatHeader;