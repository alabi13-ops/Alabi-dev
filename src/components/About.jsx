import { useRef } from "react";
import { gsap, useGSAP, prefersReduced } from "../motion";
import { identity, projects } from "../data";
import photo from "../assets/moi.webp";

const STATEMENT =
  "Je suis Alabi, développeur web en fin de formation à EIG Bénin. Je m'occupe de tout le trajet d'une idée : l'interface que l'on touche, le code qui la fait tourner et la base de données qui garde tout en ordre. J'apprends vite, je travaille en autonomie et je tiens à ce qu'un site soit aussi rapide qu'il est beau.";

export default function About() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReduced()) return;
      // Les mots s'allument au fil du scroll
      gsap.fromTo(
        ".statement .w",
        { opacity: 0.18 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: ".statement", start: "top 78%", end: "bottom 45%", scrub: true },
        }
      );
      // La photo se dévoile comme une touche qu'on relâche
      gsap.fromTo(
        ".about-photo",
        { clipPath: "inset(16% 14% 16% 14% round 22px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 22px)",
          ease: "none",
          scrollTrigger: { trigger: ".about-photo", start: "top 92%", end: "top 40%", scrub: true },
        }
      );
      gsap.fromTo(
        ".about-photo img",
        { scale: 1.3 },
        { scale: 1, ease: "none", scrollTrigger: { trigger: ".about-photo", start: "top bottom", end: "bottom top", scrub: true } }
      );
      // Le code s'écrit ligne par ligne
      gsap.from(".code-card .ln", {
        autoAlpha: 0,
        x: -16,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: ".code-card", start: "top 85%", end: "top 40%", scrub: true },
      });
    },
    { scope: root }
  );

  return (
    <section id="about" className="about" ref={root}>
      <div className="wrap about-grid">
        <div>
          <h2 className="section-title">À propos</h2>
          <p className="statement">
            {STATEMENT.split(" ").map((w, i) => (
              <span key={i} className="w">
                {w}{" "}
              </span>
            ))}
          </p>
          <dl className="facts">
            <div>
              <dt>Formation</dt>
              <dd>Développement web, EIG Bénin</dd>
            </div>
            <div>
              <dt>Basé à</dt>
              <dd>{identity.city}</dd>
            </div>
            <div>
              <dt>Projets réalisés</dt>
              <dd>{projects.length}, dont {projects.filter((p) => p.demo).length} sites en ligne</dd>
            </div>
          </dl>
        </div>

        <div className="about-side">
          <figure className="about-photo">
            <img src={photo} alt="Alabi Akinotcho, chemise blanche, bras croisés" width="720" height="900" loading="lazy" />
          </figure>
          <pre className="code-card" aria-label="Résumé du profil sous forme de code">
            <code>
              <span className="ln"><i>const</i> <b>alabi</b> = {"{"}</span>
              <span className="ln">  role: <s>"Développeur full-stack"</s>,</span>
              <span className="ln">  base: <s>"Calavi, Bénin"</s>,</span>
              <span className="ln">  front: [<s>"React"</s>, <s>"Tailwind"</s>],</span>
              <span className="ln">  back: [<s>"Laravel"</s>, <s>"PHP"</s>, <s>"MySQL"</s>],</span>
              <span className="ln">  projets: <u>{projects.length}</u>,</span>
              <span className="ln">  disponible: <u>true</u>,</span>
              <span className="ln">{"}"};</span>
            </code>
          </pre>
          <a href={identity.cv} download="CV-Alabi-Akinotcho.pdf" className="btn btn-ink">
            Télécharger mon CV
          </a>
        </div>
      </div>
    </section>
  );
}
