/* ============================================================
   SITE CONFIG — single source of truth for editable business
   details. Change a value here and it updates everywhere the
   site reads it (nav, footer, WhatsApp links, contact page,
   experience cards). No pricing lives here or anywhere else on
   the site — see README.md.
   ============================================================ */
window.CONFIG = {
  business: {
    name: "The Golden Sun Travel",
    location: "Marrakech — Agafay Desert, Morocco",
  },
  contact: {
    whatsapp: "212600000000",       // digits only, country code, no + or spaces — e.g. Moroccan mobile: 2126XXXXXXXX
    phoneDisplay: "+212 6XX-XXX-XXX",
    email: "hello@goldensuntravel.com",
    instagram: "https://instagram.com/goldensuntravel",
    facebook: "https://facebook.com/goldensuntravel",
  },
  experiences: {
    quad: {
      name: "Quad Adventure",
      slug: "quad-adventure",
      duration: "≈ 1.5 hours",
      tags: ["Scenic desert routes", "Marrakech pickup available"],
      desc: "Feel the freedom of the Agafay Desert as you ride across its dramatic landscapes on a powerful quad.",
      shortDesc: "Ride across dramatic desert terrain on a powerful quad.",
      included: ["Guided quad ride", "Safety briefing & equipment"],
      notIncluded: ["Hotel pickup (unless selected)", "Personal expenses"],
    },
    camel: {
      name: "Camel Ride",
      slug: "camel-ride",
      duration: "≈ 1 hour",
      tags: ["Traditional experience", "Sunset option available"],
      desc: "Slow down and experience the Agafay Desert the traditional way — ride through the landscape and enjoy the peaceful rhythm of Morocco.",
      shortDesc: "The traditional, unhurried way to take in the Agafay landscape.",
      included: ["Guided camel ride", "Photo moments"],
      notIncluded: ["Hotel pickup (unless selected)", "Personal expenses"],
    },
    pool: {
      name: "Day Pool with Lunch or Dinner",
      slug: "day-pool",
      duration: "≈ 3 hours",
      tags: ["Poolside relaxation", "Lunch or dinner included", "Desert views"],
      desc: "Spend a relaxed day beside the pool in the Agafay Desert — swim, unwind and take in sweeping desert views, paired with your choice of a Moroccan lunch or dinner.",
      shortDesc: "A relaxed day beside the pool with sweeping desert views, plus your choice of lunch or dinner.",
      included: ["Pool access & sun loungers", "Moroccan lunch or dinner (your choice)"],
      notIncluded: ["Hotel pickup (unless selected)", "Alcoholic drinks"],
    },
    fire: {
      name: "Moroccan Dinner, Traditional Music & Fire Show",
      slug: "dinner-fire-show",
      duration: "≈ 3 hours",
      tags: ["Fire performance", "Live traditional music", "Most dramatic evening"],
      desc: "Enjoy an unforgettable Moroccan evening in the Agafay Desert with traditional dinner, live traditional music and an exciting fire performance under the stars.",
      shortDesc: "Dinner, traditional music and a fire performance under the stars.",
      included: ["Moroccan dinner & tea", "Live traditional music", "Fire performance"],
      notIncluded: ["Hotel pickup (unless selected)", "Alcoholic drinks"],
    },
  },
  package: {
    name: "The Golden Sun Experience (Complete Package)",
    note: "Presented as the complete Golden Sun evening — every experience, one unforgettable night.",
  },
};
