# Portfolio Alabi Akinotcho — refonte

React + Vite + Tailwind, animations GSAP (ScrollTrigger) et défilement fluide Lenis.

## Lancer en local
npm install
npm run dev

## Mettre en ligne (Vercel)
npm run build   → le dossier dist/ est prêt à être déployé

## Où modifier le contenu
- src/data.js : identité, projets (ajouter `demo` quand un projet est en ligne), compétences, services
- src/index.css : couleurs et typographie (variables en haut du fichier)
- src/components/ : une section par fichier (Hero, Band, About, Services, Projects, Stack, Contact, Footer, Cursor, Nav)
- src/icons.jsx : logos officiels des technos (paquet simple-icons)
- src/assets/hero-bg.webp : image de fond du hero (remplace-la par une image plus grande si tu en as une)

Le formulaire de contact reprend les identifiants EmailJS de l'ancien site (src/components/Contact.jsx).
Toutes les animations se coupent si le visiteur a activé « réduire les animations » sur son appareil.
