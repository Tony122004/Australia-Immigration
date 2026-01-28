import Sidebar from "../../components/layout/Sidebar/Sidebar";
import Header from "../../components/layout/Header/Header";
import GoogleSearchBox from "../../components/searchEngine/GoogleSearchBox";

export default function PageLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full bg-slate-100">

      {/* Sidebar */}
      <aside className="w-64">
        <Sidebar />
      </aside>

      {/* Right side */}
      <div className="flex flex-col flex-1">

        {/* Header */}
        <div className="sticky top-0 z-20">
          <Header />
          <GoogleSearchBox />
        </div>

        {/* Main content */}
        <main className="flex-1 p-8">
          <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">
            {children}
          </div>
        </main>

        {/* Footer */}
        <div className="bg-white border-t p-4 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} AusChain. All rights reserved.
        </div>

      </div>
    </div>
  );
}