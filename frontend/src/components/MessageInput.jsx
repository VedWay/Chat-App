import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Mic, Smile } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 bg-base-100/80 backdrop-blur-sm border-t border-base-300/50">
      {imagePreview && (
        <div className="mb-4 flex items-center gap-3">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-xl border-2 border-base-300/50 shadow-lg"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-error text-error-content
              flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              type="button"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-2xl h-12 px-5 bg-base-200/50 backdrop-blur-sm focus:bg-base-100 transition-all duration-300 input-modern shadow-inner"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`btn btn-circle btn-ghost h-12 w-12 rounded-2xl transition-all duration-300 ${
              imagePreview ? "bg-success/10 text-success" : "hover:bg-base-200"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={22} />
          </button>
          
          <button
            type="button"
            className="hidden sm:flex btn btn-circle btn-ghost h-12 w-12 rounded-2xl hover:bg-base-200 transition-all duration-300"
          >
            <Smile size={22} />
          </button>
        </div>
        
        <button
          type="submit"
          className={`btn btn-circle h-12 w-12 rounded-2xl transition-all duration-300 ${
            text.trim() || imagePreview
              ? "btn-primary shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105"
              : "btn-ghost bg-base-200"
          }`}
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} className={text.trim() || imagePreview ? "animate-pulse" : ""} />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;