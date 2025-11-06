import ThemeToggle from "./ThemeToggle";

function Header() {
  return (
    <header className="mb-6 bg-white shadow-sm sm:mb-8 dark:bg-blue-900">
      <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between px-4 sm:px-10">
        <h1 className="font-extrabold sm:text-2xl">Where in the world?</h1>

        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;
