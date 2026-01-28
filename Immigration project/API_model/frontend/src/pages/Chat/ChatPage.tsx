import React, { useState, useEffect, useRef } from "react";
import {
  Calculator,
  FileCheck,
  Briefcase,
  Sparkles,
  Bot,
  User,
  Send,
  Paperclip,
} from "lucide-react";
import { useTranslation } from "react-i18next";

// ----------------------
// TRANSLATIONS (nếu chưa đưa vào i18n JSON, vẫn có thể dùng object này)
// ----------------------
const translations: Record<string, any> = {
  en: {
    welcomeTitle: "Welcome to Australia Immigration AI",
    welcomeSubtitle:
      "Ask me anything about Australian visas, points, documents, or processes.",
    inputPlaceholder: "Ask about visas, points, documents...",
    quickQuestions: [
      { title: "Check Eligibility", icon: Briefcase, question: "Am I eligible for skilled migration?" },
      { title: "Points Calculator", icon: Calculator, question: "How many points do I need for 189?" },
      { title: "Documents Needed", icon: FileCheck, question: "What documents for partner visa?" },
      { title: "Latest Updates", icon: Sparkles, question: "What changed in 2026?" },
    ],
  },
  vi: {
    welcomeTitle: "Chào mừng đến với AI Định Cư Úc",
    welcomeSubtitle: "Hỏi tôi về visa, điểm số, tài liệu Úc",
    inputPlaceholder: "Hỏi về visa, điểm số, tài liệu...",
    quickQuestions: [
      { title: "Kiểm Tra Điều Kiện", icon: Briefcase, question: "Tôi có đủ điều kiện định cư?" },
      { title: "Tính Điểm", icon: Calculator, question: "Cần bao nhiêu điểm cho 189?" },
      { title: "Tài Liệu Cần", icon: FileCheck, question: "Cần tài liệu gì cho visa bạn đời?" },
      { title: "Cập Nhật Mới", icon: Sparkles, question: "Có gì mới năm 2026?" },
    ],
  },
  zh: {
    welcomeTitle: "欢迎使用澳洲移民AI",
    welcomeSubtitle: "询问关于澳洲签证、积分、文件",
    inputPlaceholder: "询问签证、积分、文件...",
    quickQuestions: [
      { title: "检查资格", icon: Briefcase, question: "我符合技术移民吗?" },
      { title: "积分计算", icon: Calculator, question: "189需要多少分?" },
      { title: "所需文件", icon: FileCheck, question: "配偶签证需要什么?" },
      { title: "最新更新", icon: Sparkles, question: "2026有什么变化?" },
    ],
  },
};

// ----------------------
// MAIN COMPONENT
// ----------------------
export default function ChatPage() {
  const { i18n } = useTranslation();
  const lang = i18n.language; // đọc ngôn ngữ từ i18n
  const t = translations[lang] || translations["en"];

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = async (text = input) => {
    if (!text.trim() || typing) return;

    setShowWelcome(false);
    const userMsg = { text, sender: "user", time: new Date() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);

    // Create a placeholder AI message that we'll update as we receive chunks
    const aiMsgIndex = messages.length + 1;
    setMessages((m) => [
      ...m,
      {
        text: "",
        sender: "ai",
        time: new Date(),
      },
    ]);

    // In dev, use relative /api so Vite proxies to backend; otherwise use VITE_API_URL or localhost:4000
    const apiBase =
      import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? "" : "http://localhost:4000");
    const chatUrl = apiBase ? `${apiBase.replace(/\/$/, "")}/api/chat` : "/api/chat";

    try {
      const res = await fetch(chatUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text, lang }),
      });

      if (!res.ok || !res.body) {
        setMessages((m) => {
          const newMessages = [...m];
          newMessages[aiMsgIndex] = {
            text:
              lang === "vi"
                ? "Máy chủ đang tắt hoặc phản hồi không hợp lệ."
                : "Server offline or invalid response.",
            sender: "ai",
            time: new Date(),
          };
          return newMessages;
        });
        setTyping(false);
        return;
      }

      // Handle Server-Sent Events (SSE) streaming
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const dataStr = line.slice(6); // Remove "data: " prefix
            try {
              const data = JSON.parse(dataStr);
              if (data.text) {
                accumulatedText += data.text;
                // Update the AI message with accumulated text
                setMessages((m) => {
                  const newMessages = [...m];
                  newMessages[aiMsgIndex] = {
                    text: accumulatedText,
                    sender: "ai",
                    time: new Date(),
                  };
                  return newMessages;
                });
              }
              if (data.done) {
                break;
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (err) {
      // Lỗi fetch (backend tắt)
      setMessages((m) => {
        const newMessages = [...m];
        newMessages[aiMsgIndex] = {
          text:
            lang === "vi"
              ? "Không thể kết nối tới máy chủ."
              : "Cannot connect to server.",
          sender: "ai",
          time: new Date(),
        };
        return newMessages;
      });
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Welcome Section */}
      {showWelcome && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">{t.welcomeTitle}</h1>
          <p className="text-slate-500 mb-6">{t.welcomeSubtitle}</p>

          <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {t.quickQuestions.map((q: any, i: number) => (
              <div
                key={i}
                onClick={() => send(q.question)}
                className="bg-white p-4 rounded-xl border-2 border-slate-200 hover:border-purple-600 hover:-translate-y-1 transition cursor-pointer text-left"
              >
                <q.icon className="w-8 h-8 text-purple-600 mb-2" />
                <div className="font-semibold text-sm">{q.title}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : ""}`}>
            {msg.sender === "ai" && (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}

            <div
              className={`rounded-2xl p-3 max-w-[80%] ${msg.sender === "user"
                ? "bg-gradient-to-br from-purple-600 to-purple-900 text-white"
                : "bg-white"
                }`}
            >
              <div className="text-sm whitespace-pre-line">{msg.text}</div>
              <div
                className={`text-xs mt-1 ${msg.sender === "user" ? "text-white/70" : "text-slate-400"
                  }`}
              >
                {msg.time.toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" })}
              </div>

              {/* Sources */}
              {msg.sender === "ai" && msg.sources && (
                <div className="text-xs text-slate-400 mt-1">
                  Sources:{" "}
                  {msg.sources.map((s: any, idx: number) => (
                    <a
                      key={idx}
                      href={s.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline mr-2"
                    >
                      {s.sourceId || s.id}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {msg.sender === "user" && (
              <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center">
                <User className="w-4 h-4 text-slate-600" />
              </div>
            )}
          </div>
        ))}

        {typing && (
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white rounded-2xl p-3">
              <div className="flex gap-1">
                {[0, 200, 400].map((delay) => (
                  <div
                    key={delay}
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="bg-white p-4 border-t">
        <div className="flex gap-2">
          <button className="w-10 h-10 bg-slate-100 rounded-xl hover:bg-slate-200">
            <Paperclip className="w-5 h-5 mx-auto" />
          </button>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder={t.inputPlaceholder}
            className="flex-1 bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-2 focus:outline-none focus:border-purple-600"
          />

          <button
            onClick={() => send()}
            disabled={!input.trim()}
            className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-900 text-white rounded-xl hover:shadow-lg disabled:opacity-50"
          >
            <Send className="w-5 h-5 mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
}