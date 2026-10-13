import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, prefersReduced, finePointer } from "../motion";
import { identity } from "../data";
import { scrollToId } from "../scroll";
import useClock from "../useClock";
import heroBg from "../assets/hero-bg.webp";

const FIRST = "ALABI";
const LAST = "AKINOTCHO";

export default function Hero() {
  const root = useRef(null);
  const keyRefs = useRef([]);
  const lastRef = useRef(null);
  const [typed, setTyped] = useState("");
  const time = useClock();

  // Appuie visuellement sur une touche (et ses jumelles : il y a deux A)
  const press = (letter) => {
    keyRefs.current.forEach((k) => {
      if (k && k.dataset.letter === letter) {
        k.classList.add("is-down");
        setTimeout(() => k.classList.remove("is-down"), 140);
      }
    });
    if (prefersReduced()) return;
    root.current
      ?.querySelectorAll(`.hl[data-letter="${letter}"]`)
      .forEach((el) =>
        gsap.fromTo(
          el,
          { scaleY: 0.82, y: "0.04em" },
          { scaleY: 1, y: 0, duration: 0.5, ease: "elastic.out(1.1, 0.4)", transformOrigin: "50% 100%" }
        )
      );
  };

  // Séquence d'ouverture : les touches tapent le prénom, puis le nom s'écrit
  useGSAP(
    () => {
      if (prefersReduced()) return;
      const letters = gsap.utils.toArray(".hl");
      const tl = gsap.timeline({ delay: 0.35 });
      gsap.set(letters, { autoAlpha: 0 });
      lastRef.current.textContent = "";

      letters.forEach((el, i) => {
        tl.call(() => press(FIRST[i]), null, i * 0.16)
          .fromTo(
            el,
            { autoAlpha: 0, yPercent: -40, scaleY: 1.3 },
            { autoAlpha: 1, yPercent: 0, scaleY: 1, duration: 0.55, ease: "back.out(2)", transformOrigin: "50% 100%" },
            i * 0.16
          );
      });

      const counter = { n: 0 };
      tl.to(
        counter,
        {
          n: LAST.length,
          duration: 0.7,
          ease: "none",
          onUpdate: () => {
            lastRef.current.textContent = LAST.slice(0, Math.round(counter.n));
          },
        },
        ">-0.1"
      );
      // Fond : zoom lent à l'ouverture puis parallaxe au scroll
      gsap.fromTo(".hero-bg img", { scale: 1.35 }, { scale: 1.12, duration: 2.6, ease: "power3.out" });
      gsap.to(".hero-bg", {
        yPercent: 22,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      tl.from(".hero-reveal", { autoAlpha: 0, y: 24, duration: 0.7, stagger: 0.08, ease: "power3.out" }, "<0.2");
    },
    { scope: root }
  );

  // Les lettres du prénom s'élargissent à l'approche du curseur
  useEffect(() => {
    if (prefersReduced() || !finePointer()) return;
    const letters = [...root.current.querySelectorAll(".hl")];
    let mx = -9999;
    let my = -9999;
    let raf;
    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const loop = () => {
      letters.forEach((el) => {
        const r = el.getBoundingClientRect();
        const d = Math.hypot(mx - (r.left + r.width / 2), my - (r.top + r.height / 2));
        const t = Math.max(0, 1 - d / 420);
        const e = t * t * (3 - 2 * t);
        el.style.fontVariationSettings = `"wdth" ${100 + 25 * e}, "wght" ${880 + 20 * e}`;
      });
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  // Le visiteur peut taper sur son propre clavier
  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key;
      if (k === "Backspace") {
        setTyped((s) => s.slice(0, -1));
        return;
      }
      if (k.length !== 1 || !/[\p{L}\d .,!?'-]/u.test(k)) return;
      const up = k.toUpperCase();
      if (FIRST.includes(up)) press(up);
      setTyped((s) => (s + k).slice(-28));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const clickKey = (letter) => {
    press(letter);
    setTyped((s) => (s + letter.toLowerCase()).slice(-28));
  };

  const go = (id) => (e) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <section id="home" className="hero" ref={root}>
      <div className="hero-bg" aria-hidden="true">
        <img src={heroBg} alt="" />
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="wrap hero-content">
        <div className="hero-grid">
          <h1 className="hero-name" aria-label={`${identity.firstName} ${identity.lastName}`}>
            <span className="hero-first" aria-hidden="true">
              {FIRST.split("").map((l, i) => (
                <span key={i} className="hl" data-letter={l}>
                  {l}
                </span>
              ))}
            </span>
            <span className="hero-last" aria-hidden="true">
              <span ref={lastRef}>{LAST}</span>
              <span className="caret" />
            </span>
          </h1>

        </div>

        <div className="hero-bottom">
          <div>
            <p className="hero-lead hero-reveal">
              {identity.role}. Je conçois et je code des sites et des applications web rapides, de
              l'interface jusqu'à la base de données.
            </p>
            <div className="hero-actions hero-reveal">
              <a href="#projects" className="btn btn-saffron" onClick={go("projects")}>
                Voir mes projets
              </a>
              <a href={identity.cv} target="_blank" rel="noopener noreferrer" className="btn btn-line-light">
                Ouvrir mon CV
              </a>
            </div>
            <p className="hero-clock hero-reveal">
              <span className="pulse" aria-hidden="true" />
              {identity.city}, il est {time}. Disponible pour de nouveaux projets.
            </p>
          </div>

          <div className="typer hero-reveal">
            <div className="typer-keys">
              {FIRST.split("").map((l, i) => (
                <button
                  key={i}
                  ref={(el) => (keyRefs.current[i] = el)}
                  data-letter={l}
                  className={`key ${i === 4 ? "key-accent" : ""}`}
                  onClick={() => clickKey(l)}
                  aria-label={`Touche ${l}`}
                >
                  {l}
                </button>
              ))}
            </div>
            <p className="typer-line" aria-live="polite">
              <span>&gt;</span>
              {typed ? <b>{typed}</b> : <span>Tapez sur votre clavier, ou touchez les touches</span>}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
