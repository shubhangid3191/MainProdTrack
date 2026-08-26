import { useState } from "react";
import SignIn from "./components/SignIn.jsx";
import GuideUpdateModal from "./components/GuideUpdateModal.jsx";
import DashboardLayout from "./Layouts/DashboardLayout.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [guideOpen, setGuideOpen] = useState(false);

  const login = (authenticatedUser) => {
    setUser(authenticatedUser);
    setPage("dashboard");
    setGuideOpen(authenticatedUser?.roleKey === "indexer");
  };

  const logout = () => {
    setUser(null);
    setPage("dashboard");
    setGuideOpen(false);
  };

  if (!user) return <SignIn onLogin={login} />;

  return (
    <>
      <DashboardLayout
        user={user}
        currentPage={page}
        onNavigate={setPage}
        onLogout={logout}
      >
        <AppRoutes user={user} currentPage={page} onNavigate={setPage} />
      </DashboardLayout>

      {user.roleKey === "indexer" && (
        <GuideUpdateModal
          open={guideOpen}
          onClose={() => setGuideOpen(false)}
        />
      )}
    </>
  );
}
