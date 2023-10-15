import { useState, createContext, useContext } from 'react'
const DarkModeContext = createContext();
export const useDarkModeContext = () => useContext(DarkModeContext);

export const DarkModeProvider = (props) => {

    const [DarkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!DarkMode)
        if (!DarkMode)
            document.body.classList.add("darkMode");
        else
            document.body.classList.remove("darkMode");
    };

    return (
        <DarkModeContext.Provider value={{ DarkMode, toggleDarkMode }}>
            {props.children}
        </DarkModeContext.Provider>
    );
}