import ChatHeader from "./ChatHeader";
import MessageList from "../ChatInterface/MessageList";
import MessageInput from "../ChatInterface/MessageInput";
import SuggestedPrompts from "../ChatInterface/SuggestedPrompts";

export default function ChatLayout() {
  return (
    <div className="flex flex-col h-full border rounded-xl bg-white shadow-sm">
      <ChatHeader />
      <MessageList />
      <SuggestedPrompts />
      <MessageInput />
    </div>
  );
}
