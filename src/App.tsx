import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import IntroScreen from "./components/IntroScreen";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Process from "./pages/Process";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  // Always false on mount — intro plays on every page load / refresh
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatePresence>
        {!introComplete && (
          <IntroScreen key="intro" onComplete={() => {
            (window as any).__kmIntroDone = true;
            window.dispatchEvent(new CustomEvent("km-intro-complete"));
            setIntroComplete(true);
          }} />
        )}
      </AnimatePresence>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/ueber-uns" element={<AboutUs />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/prozess" element={<Process />} />
          <Route path="/projekte" element={<Projects />} />
          <Route path="/leistungen" element={<Services />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
