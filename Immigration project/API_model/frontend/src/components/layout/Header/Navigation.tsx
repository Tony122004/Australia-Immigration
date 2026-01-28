export default function Navigation() {
    return (
      <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
        <a href="/dashboard" className="hover:text-slate-900">Dashboard</a>
        <a href="/assessment" className="hover:text-slate-900">Assessment</a>
        <a href="/documents" className="hover:text-slate-900">Documents</a>
        <a href="/reports" className="hover:text-slate-900">Reports</a>
      </nav>
    );
  }
  