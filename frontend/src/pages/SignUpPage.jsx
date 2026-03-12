import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";


const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {

     if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if(success === true) signup(formData);
  };

   return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-base-100 via-base-200 to-base-100">
      
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 via-transparent to-primary/5 pointer-events-none" />
        
        <div className="w-full max-w-md space-y-8 relative z-10 animate-slide-up">
         
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-3 group">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary via-primary to-accent flex items-center justify-center shadow-xl shadow-primary/30 group-hover:shadow-primary/50 transition-all duration-500 group-hover:scale-110">
                  <MessageSquare className="w-8 h-8 text-primary-content" />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary to-accent opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
                <Sparkles className="w-4 h-4 text-accent absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl font-bold gradient-text">Create Account</h1>
                <p className="text-base-content/60 text-sm">Start your journey with us</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-control space-y-2">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Full Name
                </span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-12 h-12 rounded-xl bg-base-100/50 backdrop-blur-sm focus:bg-base-100 transition-all duration-300 input-modern"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control space-y-2">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  Email Address
                </span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-12 h-12 rounded-xl bg-base-100/50 backdrop-blur-sm focus:bg-base-100 transition-all duration-300 input-modern"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control space-y-2">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-2">
                  <Lock className="w-4 h-4 text-primary" />
                  Password
                </span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-12 pr-12 h-12 rounded-xl bg-base-100/50 backdrop-blur-sm focus:bg-base-100 transition-all duration-300 input-modern"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-primary transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full h-12 rounded-xl text-base font-medium shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:translate-y-[-2px] transition-all duration-300 disabled:opacity-70 mt-6" 
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary font-medium hover:underline decoration-2 underline-offset-4">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>


      <AuthImagePattern
      title="Join our community"
      subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
/>

    </div>
  );

};

export default SignUpPage;
