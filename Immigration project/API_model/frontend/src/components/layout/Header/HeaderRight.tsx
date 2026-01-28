import LanguageSelector from "./LanguageSelector";

export default function HeaderRight() {
  return (
    <div className="flex items-center gap-4">
      <LanguageSelector />

      <button className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-sm font-medium">
        Login
      </button>
    </div>
  );
}
