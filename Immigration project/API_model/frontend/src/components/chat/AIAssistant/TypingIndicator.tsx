export default function TypingIndicator() {
    return (
      <div className="flex items-center gap-1 text-slate-500 text-sm px-4 py-2">
        <span className="animate-bounce">•</span>
        <span className="animate-bounce delay-150">•</span>
        <span className="animate-bounce delay-300">•</span>
      </div>
    );
  }
  