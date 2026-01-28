import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "EN" },
  { code: "vi", label: "VI" },
  { code: "zh", label: "中文" },
  { code: "hi", label: "हिन्दी" },
  { code: "es", label: "ES" }
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  return (
    <select
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      className="border rounded-lg px-2 py-1 bg-white text-sm"
    >
      {languages.map((l) => (
        <option key={l.code} value={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  );
}