import Title from "./Title";
import Nav from "./Nav";
import Clock from "./Clock";

export default function Header() {
  return (
    <header className="bg-gray-950 p-2 flex justify-between items-center">
      <Title />
      <Nav />
      <Clock />
    </header>
  );
}
