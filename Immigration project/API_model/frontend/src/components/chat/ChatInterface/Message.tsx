interface Props {
    sender: "user" | "ai";
    text: string;
  }
  
  export default function Message({ sender, text }: Props) {
    const isUser = sender === "user";
  
    return (
      <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
        <div
          className={`max-w-[75%] px-4 py-2 rounded-xl text-sm ${
            isUser
              ? "bg-blue-600 text-white rounded-br-none"
              : "bg-slate-100 text-slate-800 rounded-bl-none"
          }`}
        >
          {text}
        </div>
      </div>
    );
  }
  