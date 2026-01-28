const prompts = [
    "Check my visa eligibility",
    "Explain the points system",
    "What documents do I need?",
    "Help me choose a visa pathway"
  ];
  
  export default function SuggestedPrompts() {
    return (
      <div className="px-4 pb-3 flex gap-2 overflow-x-auto">
        {prompts.map((p) => (
          <button
            key={p}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm whitespace-nowrap"
          >
            {p}
          </button>
        ))}
      </div>
    );
  }
  