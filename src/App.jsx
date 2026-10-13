import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReduced } from "./motion";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Band from "./components/Band";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Stack from "./components/Stack";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";

export default function App() {
  // Défilement fluide, synchronisé avec les animations au scroll
  useEffect(() => {
    if (prefersReduced()) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Band />
        <About />
        <Services />
        <Projects />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
