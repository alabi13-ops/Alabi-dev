import { useRef } from "react";
import { gsap, useGSAP } from "../motion";
import { projects } from "../data";
import { BrandIcon } from "../icons.jsx";

export default function Projects() {
  const root = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Grand écran, mouvement autorisé : les projets défilent à l'horizontale
      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        root.current.classList.replace("is-static", "is-pinned");
        const distance = () => track.current.scrollWidth - window.innerWidth;

        const slide = gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => gsap.set(bar.current, { scaleX: self.progress }),
          },
        });

        // Parallaxe des captures pendant le glissement
        gsap.utils.toArray(".browser-view img").forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -6 },
            {
              xPercent: 6,
              ease: "none",
              scrollTrigger: { trigger: img, containerAnimation: slide, start: "left right", end: "right left", scrub: true },
            }
          );
        });

        // Les titres se resserrent en entrant dans l'écran
        gsap.utils.toArray(".project-title").forEach((t) => {
          gsap.fromTo(
            t,
            { fontVariationSettings: '"wdth" 62, "wght" 900' },
            {
              fontVariationSettings: '"wdth" 125, "wght" 900',
              ease: "power2.out",
              scrollTrigger: { trigger: t, containerAnimation: slide, start: "left 95%", end: "left 45%", scrub: true },
            }
          );
        });

        return () => root.current?.classList.replace("is-pinned", "is-static");
      });

      // Mobile : pile de cartes, chaque projet vient recouvrir le précédent
      mm.add("(max-width: 899px) and (prefers-reduced-motion: no-preference)", () => {
        root.current.classList.replace("is-static", "is-deck");
        const cards = gsap.utils.toArray(".project", root.current);
        const imgs = cards.map((c) => c.querySelector(".browser-view img"));
        const titles = cards.map((c) => c.querySelector(".project-title"));

        gsap.set(cards, { zIndex: (i) => i + 1, transformOrigin: "50% 100%" });
        gsap.set(cards.slice(1), { yPercent: 125, rotate: 9 });
        gsap.set(titles.slice(1), { fontVariationSettings: '"wdth" 62, "wght" 900' });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ".projects-pin",
            start: "top top",
            end: () => `+=${window.innerHeight * (cards.length - 1) * 0.9}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            snap: { snapTo: 1 / (cards.length - 1), duration: 0.35, ease: "power2.out" },
            onUpdate: (self) => gsap.set(bar.current, { scaleX: self.progress }),
          },
        });

        cards.forEach((card, i) => {
          if (i === 0) return;
          const at = i - 1;
          tl.to(card, { yPercent: 0, rotate: 0, duration: 1, ease: "power2.out" }, at)
            .fromTo(imgs[i], { scale: 1.45 }, { scale: 1.08, duration: 1 }, at)
            .to(titles[i], { fontVariationSettings: '"wdth" 125, "wght" 900', duration: 0.7 }, at + 0.3)
            .to(
              cards[i - 1],
              { scale: 0.86, yPercent: -7, rotate: i % 2 ? -5 : 5, filter: "brightness(0.4)", duration: 1 },
              at
            );
        });

        return () => root.current?.classList.replace("is-deck", "is-static");
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="projects" className="projects is-static" ref={root}>
      <div className="wrap projects-head">
        <h2>Projets</h2>
        <p>
          Des sites WordPress en ligne pour des organisations et des entreprises au Bénin, et des
          applications codées de A à Z pendant ma formation.
        </p>
      </div>

      <div className="projects-pin">
        <div className="projects-track" ref={track}>
          {projects.map((p) => {
            const main = p.demo || p.github;
            const Frame = main ? "a" : "div";
            return (
              <article className="project" key={p.slug}>
                <Frame
                  className="browser"
                  href={main || undefined}
                  target={main ? "_blank" : undefined}
                  rel={main ? "noopener noreferrer" : undefined}
                  data-cursor={main ? (p.demo ? "Voir le site" : "Voir le code") : undefined}
                  aria-label={main ? `${p.title} : ${p.demo ? "voir le site" : "voir le code"}` : undefined}
                >
                  <div className="browser-bar" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <code>{p.demo ? p.demo.replace("https://", "").replace(/\/$/, "") : p.github ? p.github.replace("https://", "") : "bientôt en ligne"}</code>
                  </div>
                  <div className="browser-view">
                    <img src={p.image} alt={`Capture d'écran du projet ${p.title}`} loading="lazy" width="1600" height="936" />
                    {p.platform && (
                      <span className="wp-flag">
                        <BrandIcon name="WordPress" size={16} color="currentColor" />
                        Fait avec {p.platform}
                      </span>
                    )}
                  </div>
                </Frame>

                <div className="project-info">
                  <p className="project-kind">
                    {p.platform && <span className="wp-badge">{p.platform}</span>}
                    {p.kind}
                  </p>
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-desc">{p.description}</p>
                  <ul className="chips" aria-label="Technologies">
                    {p.tech.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <div className="project-links">
                    {p.demo && (
                      <a className="link-main" href={p.demo} target="_blank" rel="noopener noreferrer">
                        Voir le site
                      </a>
                    )}
                    {p.github && (
                      <a
                        className={p.demo ? "link-ghost" : "link-main"}
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Code sur GitHub
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="projects-progress" aria-hidden="true">
          <span ref={bar} />
        </div>
      </div>
    </section>
  );
}
