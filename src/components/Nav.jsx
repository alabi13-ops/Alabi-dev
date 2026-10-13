import { useEffect, useState } from "react";
import { scrollToId } from "../scroll";
import Logo from "./Logo";

const links = [
  { id: "about", label: "À propos" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projets" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Section visible = lien actif
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["home", ...links.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <header className="nav">
        <a href="#home" className="brand" onClick={go("home")} aria-label="Alabi, développeur web : retour à l'accueil">
          <Logo size={38} className="brand-mark" title="" />
          <span className="brand-text">
            Développeur <b>web</b>
          </span>
        </a>

        <nav className="nav-links" aria-label="Navigation principale">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={go(l.id)} className={active === l.id ? "is-active" : ""}>
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="nav-status" onClick={go("contact")}>
          <span className="pulse" aria-hidden="true" />
          Disponible pour un projet
        </a>

        <button
          className="menu-btn"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="menu-overlay"
        >
          {open ? "Fermer" : "Menu"}
        </button>
      </header>

      <div id="menu-overlay" className={`menu-overlay ${open ? "is-open" : ""}`} aria-hidden={!open}>
        {links.map((l) => (
          <a key={l.id} href={`#${l.id}`} onClick={go(l.id)} tabIndex={open ? 0 : -1}>
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}
