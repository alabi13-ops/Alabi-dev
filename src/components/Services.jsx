import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReduced, finePointer } from "../motion";
import { offers, steps, projects } from "../data";
import { scrollToId } from "../scroll";

const imageOf = (slug) => projects.find((p) => p.slug === slug)?.image;

export default function Services() {
  const root = useRef(null);
  const preview = useRef(null);
  const [hovered, setHovered] = useState(null);

  useGSAP(
    () => {
      if (prefersReduced()) return;

      // Les titres de services s'étirent en entrant dans l'écran
      gsap.utils.toArray(".offer-title").forEach((t) => {
        gsap.fromTo(
          t,
          { fontVariationSettings: '"wdth" 62, "wght" 900', x: -30 },
          {
            fontVariationSettings: '"wdth" 125, "wght" 900',
            x: 0,
            ease: "none",
            scrollTrigger: { trigger: t, start: "top 95%", end: "top 55%", scrub: true },
          }
        );
      });

      // La ligne de la méthode se trace au fil du scroll, les étapes s'allument
      const vertical = window.matchMedia("(max-width: 860px)").matches;
      gsap.fromTo(
        ".steps-line span",
        vertical ? { scaleY: 0 } : { scaleX: 0 },
        {
          ...(vertical ? { scaleY: 1 } : { scaleX: 1 }),
          ease: "none",
          scrollTrigger: { trigger: ".steps", start: "top 75%", end: "bottom 60%", scrub: true },
        }
      );
      gsap.utils.toArray(".step").forEach((s) => {
        gsap.fromTo(
          s,
          { autoAlpha: 0.25, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: { trigger: s, start: "top 85%", end: "top 60%", scrub: true },
          }
        );
      });

      // Aperçu flottant qui suit le curseur sur les services
      if (!finePointer()) return;
      const xTo = gsap.quickTo(preview.current, "x", { duration: 0.6, ease: "power3.out" });
      const yTo = gsap.quickTo(preview.current, "y", { duration: 0.6, ease: "power3.out" });
      const list = root.current.querySelector(".offers");
      const move = (e) => {
        const r = list.getBoundingClientRect();
        xTo(e.clientX - r.left);
        yTo(e.clientY - r.top);
      };
      list.addEventListener("pointermove", move);
      return () => list.removeEventListener("pointermove", move);
    },
    { scope: root }
  );

  return (
    <section id="services" className="services" ref={root}>
      <div className="wrap">
        <div className="services-head">
          <h2 className="services-title">Services</h2>
          <p>
            Ce que je peux construire pour vous, d'une page de présentation à une application
            complète avec comptes utilisateurs et base de données.
          </p>
        </div>

        <div className="offers" onPointerLeave={() => setHovered(null)}>
          <ul className="offers-list">
          {offers.map((o) => (
            <li
              key={o.title}
              className={`offer ${hovered === o.title ? "is-hover" : ""}`}
              onPointerEnter={() => setHovered(o.title)}
            >
              <h3 className="offer-title">{o.title}</h3>
              <p className="offer-text">{o.text}</p>
              <ul className="offer-tags" aria-label="Outils utilisés">
                {o.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </li>
          ))}
          </ul>
          <div className={`offer-preview ${hovered ? "is-on" : ""}`} ref={preview} aria-hidden="true">
            {offers.map((o) => (
              <img
                key={o.title}
                src={imageOf(o.example)}
                alt=""
                className={hovered === o.title ? "is-current" : ""}
              />
            ))}
          </div>
        </div>

        <div className="method">
          <h3 className="method-title">Comment je travaille</h3>
          <div className="steps">
            <div className="steps-line" aria-hidden="true">
              <span />
            </div>
            <ol className="steps-list">
              {steps.map((s, i) => (
                <li className="step" key={s.title}>
                  <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
                  <h4>{s.title}</h4>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <a
            href="#contact"
            className="btn btn-ink"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("contact");
            }}
          >
            Démarrer un projet
          </a>
        </div>
      </div>
    </section>
  );
}
