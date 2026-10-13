import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReduced } from "../motion";
import { services } from "../data";

// Bande défilante : accélère et change de sens avec le scroll
export default function Band() {
  const track = useRef(null);

  useGSAP(() => {
    if (prefersReduced()) return;
    const el = track.current;
    const loop = gsap.to(el, { xPercent: -50, duration: 26, ease: "none", repeat: -1 });
    loop.totalTime(26 * 500); // marge pour pouvoir reculer
    let dir = 1;
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const v = self.getVelocity();
        if (self.direction !== dir) {
          dir = self.direction;
        }
        const boost = gsap.utils.clamp(1, 6, 1 + Math.abs(v) / 400);
        gsap.to(loop, { timeScale: dir * boost, duration: 0.2, overwrite: true });
        gsap.to(loop, { timeScale: dir, duration: 1.2, delay: 0.2, ease: "power2.out" });
      },
    });
    return () => st.kill();
  });

  const items = [...services, ...services];
  return (
    <div className="band" aria-label={services.join(", ")}>
      <div className="band-track" ref={track} aria-hidden="true">
        {[0, 1].map((half) => (
          <div key={half} style={{ display: "flex" }}>
            {items.map((s, i) => (
              <span className="band-item" key={`${half}-${i}`}>
                {s}
                <i />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
