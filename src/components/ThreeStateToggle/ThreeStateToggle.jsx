import React, { useContext } from "react";
import "./ThreeStateToggle.css";
import { ThemeSelectorContext } from "../../App";
import Input from "./Input";

export default function ThreeStateToggle() {
  const { themeName, setTheme } = useContext(ThemeSelectorContext);
  const [style, setStyle] = React.useState(themeName);

  const dark = React.useRef(null);
  const light = React.useRef(null);
  const violet = React.useRef(null);

  React.useEffect(() => {
    dark.current.style.opacity = 0;
    light.current.style.opacity = 0;
    violet.current.style.opacity = 0;
    setTheme(style);

    switch (style) {
      case "dark":
        dark.current.style.opacity = 1;
        break;
      case "light":
        light.current.style.opacity = 1;
        break;
      case "violet":
        violet.current.style.opacity = 1;
        break;
      default:
        console.log("unknown option");
    }
  }, [style]);

  function handleClick(e) {
    setStyle(e.target.id);
  }
  const themeSwitchInputs = [
    { number: 1, id: "dark", ref: dark },
    { number: 2, id: "light", ref: light },
    { number: 3, id: "violet", ref: violet },
  ];

  return (
    <div className="toggle">
      <div className="tri-state-toggle">
        {themeSwitchInputs.map((input) => (
          <Input
            number={input.number}
            id={input.id}
            handleClick={handleClick}
            ref={input.ref}
            key={input.number}
          />
        ))}
      </div>
    </div>
  );
}
