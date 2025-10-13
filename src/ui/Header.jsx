import ThemeToggle from "./ThemeToggle";

function Header() {
  return (
    <header className="mb-6 flex h-16 items-center justify-between bg-white px-4 shadow-sm sm:mb-20 sm:px-10 dark:bg-blue-900">
      <h1 className="font-extrabold sm:text-2xl">Where in the world?</h1>

      <ThemeToggle />
    </header>
  );
}

export default Header;
