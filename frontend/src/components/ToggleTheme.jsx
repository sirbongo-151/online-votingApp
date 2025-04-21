import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ToggleTheme = () => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleThme = ()=>{
        setTheme (theme === "light" ? "dark" : "light")
    }

    return(
        <button onClick={toggleThme} className="flex gap-2">
            {theme === "light"? <Moon/> : <Sun/>}
            Change Theme mode
        </button>
    )
}

export default ToggleTheme