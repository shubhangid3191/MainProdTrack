import { useState } from "react";
import SignIn from "./components/SignIn.jsx";
import GuideUpdateModal from "./components/GuideUpdateModal.jsx";
import DashboardLayout from "./Layouts/DashboardLayout.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";

const getStoredUser = () => {
  const storedUser =
    localStorage.getItem("prodtrackUser") ||
    sessionStorage.getItem("prodtrackUser");

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
};

export default function App() {
  const [user, setUser] = useState(getStoredUser);
  const [page, setPage] = useState("dashboard");
  const [guideOpen, setGuideOpen] = useState(false);

  const login = (authenticatedUser) => {
    setUser(authenticatedUser);
    setPage("dashboard");
    setGuideOpen(authenticatedUser?.roleKey === "indexer");
  };

const logout = () => {
  localStorage.removeItem("prodtrackToken");
  localStorage.removeItem("prodtrackUser");

  sessionStorage.removeItem("prodtrackToken");
  sessionStorage.removeItem("prodtrackUser");

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
