import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, prefersReduced } from "../motion";
import { skills } from "../data";
import { BrandIcon } from "../icons.jsx";

export default function Stack() {
  const root = useRef(null);
  const keyRefs = useRef({});
  const [current, setCurrent] = useState(skills.find((s) => s.name === "React"));
  const [printed, setPrinted] = useState(current.note);

  const press = (skill) => {
    const el = keyRefs.current[skill.key];
    if (el) {
      el.classList.add("is-down");
      setTimeout(() => el.classList.remove("is-down"), 150);
    }
    setCurrent(skill);
  };

  // La description s'affiche comme si elle était tapée
  useEffect(() => {
    if (prefersReduced()) {
      setPrinted(current.note);
      return;
    }
    let i = 0;
    setPrinted("");
    const id = setInterval(() => {
      i += 2;
      setPrinted(current.note.slice(0, i));
      if (i >= current.note.length) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [current]);

  // Raccourcis clavier, actifs quand la section est à l'écran
  useEffect(() => {
    let visible = false;
    const obs = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.25 });
    obs.observe(root.current);
    const onKey = (e) => {
      if (!visible || e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const s = skills.find((sk) => sk.key === e.key.toUpperCase());
      if (s) press(s);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      obs.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // Les touches tombent en place, une rangée après l'autre
  useGSAP(
    () => {
      if (prefersReduced()) return;
      gsap.from(".keyboard .key", {
        y: -60,
        autoAlpha: 0,
        rotate: () => gsap.utils.random(-8, 8),
        duration: 0.7,
        ease: "bounce.out",
        stagger: { each: 0.045, from: "random" },
        scrollTrigger: { trigger: ".keyboard", start: "top 80%", once: true },
        clearProps: "transform,opacity,visibility",
      });
    },
    { scope: root }
  );

  return (
    <section id="stack" className="stack" ref={root}>
      <div className="wrap">
        <div className="stack-head">
          <h2 className="stack-title">Stack</h2>
          <div className="screen" aria-live="polite">
            <span className="cmd">
              <BrandIcon name={current.name} size={18} className="screen-logo" color={current.name === "IA" ? "#F2B416" : undefined} />
              &gt; {current.name.toLowerCase()}
            </span>
            <span className="out">{printed}</span>
          </div>
        </div>

        <div className="keyboard" role="group" aria-label="Technologies maîtrisées">
          <div className="keyboard-grid">
            {skills.map((s) => (
              <button
                key={s.key}
                ref={(el) => (keyRefs.current[s.key] = el)}
                className={`key ${current.key === s.key ? "key-accent" : ""}`}
                onClick={() => press(s)}
                aria-pressed={current.key === s.key}
              >
                <span className="k-top">
                  <BrandIcon name={s.name} className="k-logo" />
                  <span className="k-letter">{s.key}</span>
                </span>
                <span className="k-name">{s.name}</span>
              </button>
            ))}
          </div>
        </div>
        <p className="stack-hint">Touchez une touche, ou appuyez sur la lettre correspondante de votre clavier.</p>
      </div>
    </section>
  );
}
