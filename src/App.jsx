import {
  useCallback,
  useEffect,
  useState,
} from "react";
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

const logout = useCallback(() => {
  localStorage.removeItem("prodtrackToken");
  localStorage.removeItem("prodtrackUser");

  sessionStorage.removeItem("prodtrackToken");
  sessionStorage.removeItem("prodtrackUser");

  localStorage.removeItem(
    "prodtrackSessionTimeout"
  );

  sessionStorage.removeItem(
    "prodtrackSessionTimeout"
  );

  setUser(null);
  setPage("dashboard");
  setGuideOpen(false);
}, []);



  useEffect(() => {
  if (!user) {
    return undefined;
  }

  const storage =
    localStorage.getItem("prodtrackUser")
      ? localStorage
      : sessionStorage;

  const configuredMinutes = Number(
    storage.getItem(
      "prodtrackSessionTimeout"
    )
  );

  const timeoutMinutes =
    [15, 30, 60].includes(
      configuredMinutes
    )
      ? configuredMinutes
      : 30;

  let timeoutId;

  const handleIdleLogout = () => {
    window.alert(
      "Your session ended because of inactivity."
    );

    logout();
  };

  const resetIdleTimer = () => {
    window.clearTimeout(timeoutId);

    timeoutId = window.setTimeout(
      handleIdleLogout,
      timeoutMinutes * 60 * 1000
    );
  };

  const activityEvents = [
    "mousedown",
    "mousemove",
    "keydown",
    "scroll",
    "touchstart",
  ];

  activityEvents.forEach((eventName) => {
    window.addEventListener(
      eventName,
      resetIdleTimer,
      { passive: true }
    );
  });

  resetIdleTimer();

  return () => {
    window.clearTimeout(timeoutId);

    activityEvents.forEach(
      (eventName) => {
        window.removeEventListener(
          eventName,
          resetIdleTimer
        );
      }
    );
  };
}, [user, logout]);

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
