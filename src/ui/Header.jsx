import ThemeSwitcher from "./ThemeSwitcher";

function Header() {
  return (
    <header className="dark:shadow-[ 0 2px 4px 0 rgba(0, 0, 0, 0.06)] mb-10 flex h-20 items-center justify-between bg-white px-4 shadow-sm md:px-10 dark:bg-blue-900">
      <h1 className="font-extrabold md:text-2xl">Where in the world?</h1>

      <ThemeSwitcher />
    </header>
  );
}

export default Header;
