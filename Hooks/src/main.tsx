import { createRoot } from "react-dom/client";
import "./index.css";

// import Useeffect from "./components/useeffect";
// import UseRef from "./components/useRef";
import Media from "./components/Media";
import TailwindReference from "./components/TailwindRefference";
createRoot(document.getElementById("root")!).render(
  // {/* <Usestate /> */}

  <>
  <Media />
  
    {/* <Useeffect /> */}
    {/* <UseRef /> */}
    <TailwindReference />
  </>,
);
