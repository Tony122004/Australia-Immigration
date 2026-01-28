import { useState } from "react";

export default function MessageInput() {
  const [text, setText] = useState("");

  return (
    <div className="border-t p-4">
      <textarea
        className="w-full border rounded-lg p-3 bg-slate-100 focus:bg-white resize-none"
        rows={1}
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}
