import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { gsap, useGSAP, prefersReduced, finePointer } from "../motion";
import { identity } from "../data";

// Identifiants EmailJS repris de la version précédente du site
const EMAILJS = {
  service: "service_qm7luyd",
  template: "template_bdltkwf",
  publicKey: "cycXKibEZbFx3L7VO",
};

export default function Contact() {
  const root = useRef(null);
  const form = useRef(null);
  const sendBtn = useRef(null);
  const [status, setStatus] = useState({ state: "idle", text: "" });
  const [copied, setCopied] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ state: "sending", text: "Envoi en cours…" });
    try {
      await emailjs.sendForm(EMAILJS.service, EMAILJS.template, form.current, { publicKey: EMAILJS.publicKey });
      setStatus({ state: "ok", text: "Message envoyé. Merci, je vous réponds rapidement." });
      form.current.reset();
    } catch {
      setStatus({
        state: "error",
        text: `Le message n'est pas parti. Réessayez, ou écrivez directement à ${identity.email}.`,
      });
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const r = document.createRange();
      r.selectNodeContents(document.getElementById("contact-email"));
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(r);
    }
  };

  useGSAP(
    () => {
      if (prefersReduced()) return;
      // Le titre se tasse comme une touche enfoncée en arrivant
      gsap.from(".contact h2 .cl", {
        yPercent: 110,
        stagger: 0.08,
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: { trigger: ".contact h2", start: "top 82%", once: true },
      });

      // Bouton magnétique
      if (!finePointer()) return;
      const btn = sendBtn.current;
      const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3.out" });
      const move = (e) => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        if (Math.hypot(dx, dy) < 160) {
          xTo(dx * 0.35);
          yTo(dy * 0.35);
        } else {
          xTo(0);
          yTo(0);
        }
      };
      window.addEventListener("pointermove", move, { passive: true });
      return () => window.removeEventListener("pointermove", move);
    },
    { scope: root }
  );

  return (
    <section id="contact" className="contact" ref={root}>
      <div className="wrap">
        <h2>
          {["Un projet", "en tête ?", "Parlons-en."].map((l) => (
            <span key={l} style={{ display: "block", overflow: "hidden" }}>
              <span className="cl" style={{ display: "block" }}>
                {l}
              </span>
            </span>
          ))}
        </h2>

        <div className="contact-grid">
          <dl className="contact-list">
            <div>
              <dt>E-mail</dt>
              <dd>
                <a id="contact-email" href={`mailto:${identity.email}`}>
                  {identity.email}
                </a>
                <button type="button" className="copy-btn" onClick={copyEmail}>
                  {copied ? "Copié" : "Copier"}
                </button>
              </dd>
            </div>
            <div>
              <dt>Téléphone</dt>
              <dd>
                <a href={identity.phoneHref}>{identity.phone}</a>
              </dd>
            </div>
            <div>
              <dt>Adresse</dt>
              <dd>{identity.city}, Bénin</dd>
            </div>
            <div>
              <dt>Ailleurs</dt>
              <dd className="socials">
                <a href={identity.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                <a href={identity.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href={identity.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
              </dd>
            </div>
          </dl>

          <form ref={form} className="form" onSubmit={submit}>
            <div className="field">
              <label htmlFor="name">Votre nom</label>
              <input id="name" name="name" type="text" placeholder="Prénom et nom" required autoComplete="name" />
            </div>
            <div className="field">
              <label htmlFor="email">Votre e-mail</label>
              <input id="email" name="email" type="email" placeholder="vous@exemple.com" required autoComplete="email" />
            </div>
            <div className="field">
              <label htmlFor="message">Votre projet</label>
              <textarea id="message" name="message" rows="4" placeholder="Un site, une application, une idée…" required />
            </div>
            <div className="form-foot">
              <button ref={sendBtn} type="submit" className="send" disabled={status.state === "sending"}>
                Envoyer
              </button>
              {status.text && (
                <p className="form-status" role="status">
                  {status.text}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
