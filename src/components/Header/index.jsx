import Moon from "../icons/Moon";
import IconSun from "../icons/IconSun";
import { useState, useEffect } from "react";

const inicialDarkMode = () => {
  if (localStorage.getItem("theme") === "dark") {
    return true;
  }
};
export default function Header() {
  const [darkMode, setDarkMode] = useState(inicialDarkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="container mx-auto px-4 pt-8 md:max-w-xl">
      <div className="flex justify-between">
        <h1 className="uppercase text-white text-3xl font-semibold tracking-[10px]">
          Todo
        </h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <IconSun /> : <Moon />}
        </button>
      </div>
    </header>
  );
}
