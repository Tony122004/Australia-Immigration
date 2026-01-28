import { NavLink } from "react-router-dom";
import {
  MessageCircle,
  Calculator,
  FileCheck,
  Calendar,
  Briefcase,
  Heart,
  GraduationCap
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const { t } = useTranslation("layout"); // 👈 dùng namespace layout.json

  return (
    <div className="h-full w-64 bg-slate-900 text-white rounded-1xl p-6 flex flex-col">

      {/* Logo */}
      <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/10">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-900 rounded-xl" />
        <div className="text-lg font-bold">AU Visa AI</div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <div className="text-xs font-semibold text-white/60 mb-3 tracking-wider">
          {t("sidebar.quickActions")}
        </div>

        <SidebarItem to="/chat" icon={MessageCircle} label={t("sidebar.chatAssistant")} />
        <SidebarItem to="/points" icon={Calculator} label={t("sidebar.pointsCalculator")} />
        <SidebarItem to="/documents" icon={FileCheck} label={t("sidebar.documents")} />
        <SidebarItem to="/timeline" icon={Calendar} label={t("sidebar.timeline")} />
      </div>

      {/* Recent Topics */}
      <div className="mb-8">
        <div className="text-xs font-semibold text-white/60 mb-3 tracking-wider">
          {t("sidebar.recentTopics")}
        </div>

        <SidebarItem to="/topic/skilled" icon={Briefcase} label={t("sidebar.skilledMigration")} />
        <SidebarItem to="/topic/partner" icon={Heart} label={t("sidebar.partnerVisa")} />
        <SidebarItem to="/topic/student" icon={GraduationCap} label={t("sidebar.studentVisa")} />
      </div>

      {/* Progress Box */}
      <div className="mt-auto bg-white/5 rounded-xl p-4">
        <div className="text-xs font-semibold uppercase text-white/60 mb-3">
          {t("sidebar.progress")}
        </div>

        <ProgressItem label={t("sidebar.eligibility")} value="85%" />
        <ProgressItem label={t("sidebar.documentsProgress")} value="7/12" />
        <ProgressItem label={t("sidebar.points")} value="75" />
      </div>
    </div>
  );
}

function SidebarItem({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-xl transition
        ${isActive
          ? "bg-gradient-to-r from-purple-600 to-purple-900 text-white"
          : "text-white/80 hover:bg-white/10 hover:text-white"}`
      }
    >
      <Icon className="w-5 h-5" />
      <span className="text-sm font-medium">{label}</span>
    </NavLink>
  );
}

function ProgressItem({ label, value }) {
  return (
    <div className="flex justify-between text-sm mb-2">
      <span className="text-white/60">{label}</span>
      <span className="font-semibold text-green-400">{value}</span>
    </div>
  );
}