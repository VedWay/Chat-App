import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User, Sparkles } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="fixed w-full top-0 z-40 backdrop-blur-xl bg-base-100/70 border-b border-base-300/50"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 group">
              <div className="relative">
                <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-105">
                  <MessageSquare className="w-5 h-5 text-primary-content" />
                </div>
                <Sparkles className="w-3 h-3 text-accent absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-bold gradient-text">Chatter</h1>
                <span className="text-[10px] text-base-content/50 -mt-1">Connect. Chat. Create.</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className="btn btn-ghost btn-sm gap-2 hover:bg-base-200/80 transition-all duration-300"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link 
                  to={"/profile"} 
                  className="btn btn-ghost btn-sm gap-2 hover:bg-base-200/80 transition-all duration-300"
                >
                  <User className="size-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button 
                  className="btn btn-ghost btn-sm gap-2 hover:bg-error/10 hover:text-error transition-all duration-300" 
                  onClick={logout}
                >
                  <LogOut className="size-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;