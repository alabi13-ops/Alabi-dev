import portfolio from "./assets/projects/portfolio.webp";
import seguro from "./assets/projects/seguro.webp";
import depenses from "./assets/projects/gestion-depense.webp";
import gjb from "./assets/projects/gjb.webp";
import apai from "./assets/projects/apai.webp";
import cerma from "./assets/projects/cerma.webp";
import tchaibou from "./assets/projects/tchaibou.webp";

export const identity = {
  firstName: "Alabi",
  lastName: "Akinotcho",
  role: "Développeur web full-stack",
  city: "Calavi, Tankpè",
  email: "akinotchoalabi34@email.com",
  phone: "+229 01 51 16 72 61",
  phoneHref: "tel:+2290151167261",
  whatsapp: "https://wa.me/22951167261",
  github: "https://github.com/alabi13-ops",
  instagram: "https://www.instagram.com/akinotchoalabi",
  cv: "./cv-alabi.pdf",
};

// platform: "WordPress" affiche le badge WordPress sur la carte
// demo: URL publique (null = bouton masqué) ; github: dépôt public (null = bouton masqué)
export const projects = [
  {
    slug: "gjb",
    title: "GJB",
    kind: "Gouvernement des Jeunes du Bénin",
    platform: "WordPress",
    image: gjb,
    description:
      "Site de l'organisation : présentation, démembrements, camp régional, espace membre et inscription en ligne au CRJD3.",
    tech: ["WordPress", "Inscription en ligne"],
    github: null,
    demo: "https://gouvernementdesjeunesdubenin.org/",
  },
  {
    slug: "apai-benin",
    title: "APAI-Bénin",
    kind: "Association des agents immobiliers",
    platform: "WordPress",
    image: apai,
    description:
      "Site de l'Association professionnelle des agents immobiliers du Bénin : présentation, blog et adhésion des membres.",
    tech: ["WordPress", "Blog"],
    github: null,
    demo: "https://apai-benin.org/",
  },
  {
    slug: "cerma-microfinance",
    title: "CERMA",
    kind: "Institution de microfinance",
    platform: "WordPress",
    image: cerma,
    description:
      "Site d'une microfinance : services, chiffres clés, blog et demande de crédit en ligne.",
    tech: ["WordPress", "Blog"],
    github: null,
    demo: "https://cermamicrofinance.com/",
  },
  {
    slug: "tchaibou-textiles",
    title: "Tchaïbou",
    kind: "Boutique de tissus en ligne",
    platform: "WordPress",
    image: tchaibou,
    description:
      "Boutique d'un vendeur de tissus (bazin, lin, velours, brocard) : catalogue, compte client et panier.",
    tech: ["WordPress", "Boutique en ligne"],
    github: null,
    demo: "https://hyacinthe.sacomdigitalagency.com/",
  },
  {
    slug: "seguro",
    title: "Seguro",
    kind: "Réservation d'hôtel",
    image: seguro,
    description:
      "Plateforme de réservation d'hôtels : recherche, réservation des chambres et gestion des comptes utilisateurs.",
    tech: ["React", "PHP", "MySQL", "Tailwind"],
    github: "https://github.com/alabi13-ops/seguro",
    demo: null,
  },
  {
    slug: "gestion-des-depenses",
    title: "Dépenses",
    kind: "Application de gestion",
    image: depenses,
    description:
      "Suivi des finances personnelles : ajout de transactions, catégories et statistiques visuelles.",
    tech: ["Laravel", "MySQL"],
    github: "https://github.com/alabi13-ops/gestion-des-d-penses",
    demo: null,
  },
  {
    slug: "portfolio-alabi",
    title: "Portfolio",
    kind: "Le site que vous visitez",
    image: portfolio,
    description:
      "Ce portfolio : nom tapé touche par touche, projets animés au scroll, stack en clavier interactif.",
    tech: ["React", "Tailwind", "GSAP"],
    github: "https://github.com/alabi13-ops/Alabi-dev.git",
    demo: "https://alabi-dev.vercel.app/",
  },
];

// key = touche du clavier physique qui active la compétence
export const skills = [
  { key: "H", name: "HTML", note: "La structure de chaque page, propre et accessible." },
  { key: "C", name: "CSS", note: "Des mises en page sur mesure, animations comprises." },
  { key: "J", name: "JavaScript", note: "L'interactivité dans le navigateur, sans détour." },
  { key: "R", name: "React", note: "Des interfaces en composants, comme Seguro et ce portfolio." },
  { key: "T", name: "Tailwind", note: "Des styles rapides et cohérents d'une page à l'autre." },
  { key: "B", name: "Bootstrap", note: "Des interfaces responsives montées rapidement." },
  { key: "P", name: "PHP", note: "Le back-end de l'agence de voyage et de Seguro." },
  { key: "L", name: "Laravel", note: "L'application de gestion des dépenses, de bout en bout." },
  { key: "M", name: "MySQL", note: "Les données des réservations, des voyages et des dépenses." },
  { key: "G", name: "Git", note: "Chaque projet versionné et publié sur GitHub." },
  { key: "W", name: "WordPress", note: "Les sites du GJB, de l'APAI-Bénin, de CERMA et de Tchaïbou Textiles." },
  { key: "I", name: "IA", note: "Des outils d'IA pour coder, tester et documenter plus vite." },
];

export const services = [
  "Sites vitrines",
  "Applications web",
  "API et bases de données",
  "Intégration React",
  "Sites WordPress",
];

// example = slug du projet affiché en aperçu au survol
export const offers = [
  {
    title: "Sites vitrines",
    text: "Un site clair qui présente votre activité, s'affiche bien sur téléphone et donne envie de vous contacter.",
    tags: ["WordPress", "HTML", "CSS"],
    example: "apai-benin",
  },
  {
    title: "Applications web",
    text: "Réservations, comptes clients, tableaux de bord : des outils sur mesure pour votre activité.",
    tags: ["React", "Laravel", "PHP"],
    example: "seguro",
  },
  {
    title: "Sites WordPress",
    text: "Des sites d'organisation, de microfinance ou de boutique, que vous pouvez ensuite modifier vous-même.",
    tags: ["WordPress", "Boutique", "Formulaires"],
    example: "gjb",
  },
  {
    title: "Bases de données",
    text: "Des données bien rangées et des API fiables, pour que votre application reste rapide quand elle grandit.",
    tags: ["MySQL", "Laravel", "API"],
    example: "gestion-des-depenses",
  },
  {
    title: "Refonte de site",
    text: "Moderniser un site existant : plus rapide, adapté au mobile et plus simple à faire évoluer.",
    tags: ["React", "Tailwind", "Git"],
    example: "portfolio-alabi",
  },
];

export const steps = [
  { title: "On échange", text: "Je comprends votre besoin, vos objectifs, vos délais et votre budget." },
  { title: "Maquette", text: "Je vous montre une première version visuelle, à valider avant de coder." },
  { title: "Développement", text: "Je code le site et vous suivez l'avancement à chaque étape." },
  { title: "Mise en ligne", text: "Je publie, je vérifie tout et je vous montre comment le gérer." },
];
