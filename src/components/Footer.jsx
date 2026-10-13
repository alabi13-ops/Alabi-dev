import { identity } from "../data";
import { scrollToId } from "../scroll";
import useClock from "../useClock";

export default function Footer() {
  const time = useClock();
  return (
    <footer className="footer">
      <div className="wrap lockup">
        <img
          src="./logo-officiel.svg"
          alt="Logo Alabi, développeur web : créer, développer, optimiser"
          width="1000"
          height="1000"
          loading="lazy"
        />
      </div>
      <div className="wrap footer-row">
        <span>© 2026 {identity.firstName} {identity.lastName}</span>
        <span>Calavi, {time}</span>
        <button type="button" onClick={() => scrollToId("home")}>
          Remonter
        </button>
      </div>
      <div className="footer-word" aria-hidden="true">
        {"alabi".split("").map((l, i) => (
          <span key={i}>{l}</span>
        ))}
      </div>
    </footer>
  );
}
