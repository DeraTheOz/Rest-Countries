import Filter from "../ui/Filter";
import SearchBar from "../ui/SearchBar";

function HomePage() {
  return (
    <section className="flex flex-col justify-between gap-8 px-4 sm:flex-row sm:px-10">
      <SearchBar />
      <Filter />
    </section>
  );
}

export default HomePage;
