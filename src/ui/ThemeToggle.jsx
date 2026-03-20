import { useEffect } from "react";
import { HiMoon, HiOutlineMoon } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";

import { toggleTheme } from "../features/theme/themeSlice";

function ThemeToggle() {
  const dispatch = useDispatch();
  const { theme } = useSelector((store) => store.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  function handleToggleTheme() {
    dispatch(toggleTheme());
  }

  return (
    <button
      type="button"
      onClick={handleToggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-pressed={theme === "dark"}
      className="flex items-center gap-2"
    >
      {theme === "dark" ? <HiMoon /> : <HiOutlineMoon />}
      <span className="text-xs font-semibold sm:text-sm">Dark Mode</span>
    </button>
  );
}

export default ThemeToggle;
