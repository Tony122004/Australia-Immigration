import Message from "./Message";

export default function MessageList() {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {/* Example messages */}
      <Message sender="ai" text="Hello, how can I help you today?" />
      <Message sender="user" text="I want to check my visa eligibility." />
    </div>
  );
}
