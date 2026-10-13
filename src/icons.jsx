import {
  siHtml5,
  siCss,
  siJavascript,
  siReact,
  siTailwindcss,
  siBootstrap,
  siPhp,
  siLaravel,
  siMysql,
  siGit,
  siWordpress,
} from "simple-icons";

// Logos officiels (Simple Icons, licence CC0). L'IA n'a pas de logo unique : étincelle générique.
export const brandIcons = {
  HTML: siHtml5,
  CSS: siCss,
  JavaScript: siJavascript,
  React: siReact,
  Tailwind: siTailwindcss,
  Bootstrap: siBootstrap,
  PHP: siPhp,
  Laravel: siLaravel,
  MySQL: siMysql,
  Git: siGit,
  WordPress: siWordpress,
  IA: {
    title: "Intelligence artificielle",
    hex: "16181D",
    path: "M12 0c.6 5.9 2.3 8.6 6.2 10.3L24 12l-5.8 1.7C14.3 15.4 12.6 18.1 12 24c-.6-5.9-2.3-8.6-6.2-10.3L0 12l5.8-1.7C9.7 8.6 11.4 5.9 12 0zm7.5 17.2c.2 2 .8 2.9 2.1 3.5l1.9.6-1.9.6c-1.3.6-1.9 1.5-2.1 3.5-.2-2-.8-2.9-2.1-3.5l-1.9-.6 1.9-.6c1.3-.6 1.9-1.5 2.1-3.5z",
  },
};

export function BrandIcon({ name, size = 34, className = "", color }) {
  const icon = brandIcons[name];
  if (!icon) return null;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      role="img"
      aria-label={`Logo ${icon.title}`}
      style={{ "--brand": color || `#${icon.hex}` }}
    >
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}
