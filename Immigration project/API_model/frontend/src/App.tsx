import { BrowserRouter } from "react-router-dom";
import PageLayout from "./layouts/PageLayout/PageLayout";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <AppRoutes />
      </PageLayout>
    </BrowserRouter>
  );
}