import { Routes, Route } from "react-router-dom";
import ChatPage from "../pages/Chat/ChatPage";
import DocumentsPage from "../pages/Documents/DocumentsPage";
import PointsPage from "../pages/Points/PointsPage";
import TimelinePage from "../pages/Timeline/TimelinePage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ChatPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/documents" element={<DocumentsPage />} />
      <Route path="/points" element={<PointsPage />} />
      <Route path="/timeline" element={<TimelinePage />} />
    </Routes>
  );
}