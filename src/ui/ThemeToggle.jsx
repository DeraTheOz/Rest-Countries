import { useEffect, useState } from "react";
import { HiMoon, HiOutlineMoon } from "react-icons/hi";

function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );

  useEffect(
    function () {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
    },
    [theme],
  );

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <div
      className="flex cursor-pointer items-center gap-2"
      onClick={toggleTheme}
    >
      {theme === "dark" ? <HiMoon /> : <HiOutlineMoon />}
      <span className="text-xs font-semibold sm:text-sm">Dark Mode</span>
    </div>
  );
}

export default ThemeToggle;
