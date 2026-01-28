import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
    { code: "zh", label: "中文", flag: "🇨🇳" },
    { code: "hi", label: "हिंदी", flag: "🇮🇳" },
    { code: "es", label: "Español", flag: "🇪🇸" },
  ];

  return (
    <select
      className="border rounded-lg px-3 py-2 text-sm"
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
    >
      {languages.map((lng) => (
        <option key={lng.code} value={lng.code}>
          {lng.flag} {lng.label}
        </option>
      ))}
    </select>
  );
}