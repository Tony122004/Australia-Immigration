import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { Settings } from "lucide-react";

export default function Header({ onMenuClick }) {
  const { t } = useTranslation("layout");

  return (
    <header className="w-full bg-white border-b shadow-sm px-6 py-3 flex items-center justify-between">
      
      {/* Left: Brand */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-purple-900" />
        <div className="flex flex-col leading-tight">
          <span className="text-lg font-semibold text-gray-900">
            {t("header.title")}
          </span>
          <span className="text-xs text-gray-500">
            {t("header.subtitle")}
          </span>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-4">

        {/* Language */}
        <LanguageSelector />

        {/* Settings */}
        <button className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
          <Settings className="w-4 h-4 text-gray-700" />
        </button>

        {/* Mobile Menu */}
        <button
          className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
          onClick={onMenuClick}
        >
          ☰
        </button>
      </div>
    </header>
  );
}