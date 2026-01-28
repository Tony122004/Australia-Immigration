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


// ----------------------
// TRANSLATIONS
// ----------------------
const translations = {
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
// AI RESPONSES
// ----------------------
const aiResponses = {
  en: {
    eligibility:
      "For skilled migration:\n\n✓ Age under 45\n✓ English: IELTS/PTE\n✓ Skilled occupation list\n✓ 3+ years experience\n✓ Skills assessment\n\nNeed detailed assessment?",
    points:
      "Visa 189 needs:\n\n• Minimum: 65 points\n• Competitive: 75-85 points\n• Age 25-32: 30 pts\n• Superior English: 20 pts\n• 8+ years work: 20 pts\n\nCalculate your points?",
    documents:
      "Partner Visa needs:\n\n• Passport copies\n• Birth certificate\n• Police clearance\n• Medical exam\n• Joint bank statements (12+ months)\n• Photos together\n\nGet full checklist?",
    updates:
      "2026 Updates:\n\n• New occupation list\n• Healthcare workers priority\n• Student visa: $29,710/year required\n• Processing: Partners 18-24 months\n\nMore details?",
    default:
      "I can help with:\n\n• Visa eligibility\n• Points calculation\n• Documents needed\n• Latest updates\n\nWhat do you need?",
  },
  vi: {
    eligibility:
      "Định cư tay nghề cần:\n\n✓ Dưới 45 tuổi\n✓ IELTS/PTE\n✓ Nghề trong danh sách\n✓ 3+ năm kinh nghiệm\n✓ Đánh giá kỹ năng\n\nCần đánh giá chi tiết?",
    points:
      "Visa 189 cần:\n\n• Tối thiểu: 65 điểm\n• Cạnh tranh: 75-85 điểm\n• Tuổi 25-32: 30 điểm\n• Tiếng Anh giỏi: 20 điểm\n• 8+ năm làm việc: 20 điểm\n\nTính điểm cho bạn?",
    documents:
      "Visa bạn đời cần:\n\n• Hộ chiếu\n• Giấy khai sinh\n• Xác nhận không án tích\n• Khám sức khỏe\n• Sao kê chung (12+ tháng)\n• Ảnh chung\n\nLấy danh sách đầy đủ?",
    updates:
      "Cập nhật 2026:\n\n• Danh sách nghề mới\n• Y tế ưu tiên\n• Du học: $29,710/năm\n• Xử lý: Bạn đời 18-24 tháng\n\nChi tiết hơn?",
    default:
      "Tôi giúp được:\n\n• Kiểm tra điều kiện\n• Tính điểm\n• Tài liệu cần thiết\n• Cập nhật mới\n\nBạn cần gì?",
  },
  zh: {
    eligibility:
      "技术移民需要:\n\n✓ 45岁以下\n✓ 雅思/PTE\n✓ 职业清单上\n✓ 3+年经验\n✓ 技能评估\n\n需要详细评估?",
    points:
      "189签证需要:\n\n• 最低: 65分\n• 竞争: 75-85分\n• 年龄25-32: 30分\n• 优秀英语: 20分\n• 8+年工作: 20分\n\n计算您的分数?",
    documents:
      "配偶签证需要:\n\n• 护照复印\n• 出生证明\n• 无犯罪记录\n• 体检\n• 联名账单(12+月)\n• 合照\n\n获取完整清单?",
    updates:
      "2026更新:\n\n• 新职业清单\n• 医疗优先\n• 学生签: $29,710/年\n• 处理: 配偶18-24月\n\n更多详情?",
    default:
      "我可以帮助:\n\n• 资格检查\n• 积分计算\n• 所需文件\n• 最新更新\n\n需要什么?",
  },
};

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
];

// ----------------------
// MAIN COMPONENT
// ----------------------
export default function ChatPageDemo() {
  const [lang, setLang] = useState("en");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const endRef = useRef(null);

  const t = translations[lang];
  const r = aiResponses[lang];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const getResponse = (msg) => {
    const m = msg.toLowerCase();
    if (m.includes("eligib") || m.includes("điều kiện") || m.includes("资格")) return r.eligibility;
    if (m.includes("point") || m.includes("189") || m.includes("điểm") || m.includes("积分")) return r.points;
    if (m.includes("document") || m.includes("tài liệu") || m.includes("文件")) return r.documents;
    if (m.includes("update") || m.includes("2026") || m.includes("cập nhật") || m.includes("更新")) return r.updates;
    return r.default;
  };

  const send = (text = input) => {
    if (!text.trim()) return;
    setShowWelcome(false);
    setMessages((m) => [...m, { text, sender: "user", time: new Date() }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setMessages((m) => [...m, { text: getResponse(text), sender: "ai", time: new Date() }]);
      setTyping(false);
    }, 1200);
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
            {t.quickQuestions.map((q, i) => (
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
              className={`rounded-2xl p-3 max-w-[80%] ${
                msg.sender === "user"
                  ? "bg-gradient-to-br from-purple-600 to-purple-900 text-white"
                  : "bg-white"
              }`}
            >
              <div className="text-sm whitespace-pre-line">{msg.text}</div>
              <div
                className={`text-xs mt-1 ${
                  msg.sender === "user" ? "text-white/70" : "text-slate-400"
                }`}
              >
                {msg.time.toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" })}
              </div>
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