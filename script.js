const skills = [
  "UI / UX 規劃",
  "前端開發",
  "資訊架構",
  "視覺設計",
  "內容整理",
  "專案協作",
];

const projects = [
  {
    title: "作品集網站",
    desc: "以單頁式結構呈現個人背景、技能與作品摘要。",
  },
  {
    title: "產品頁優化",
    desc: "調整資訊層級與 CTA，提升閱讀效率與轉換動線。",
  },
  {
    title: "設計系統整理",
    desc: "將重複元件抽象成可維護的元件與設計規則。",
  },
];

const skillsList = document.getElementById("skillsList");
const projectsList = document.getElementById("projectsList");
const themeSwitch = document.getElementById("themeSwitch");
const themeKey = "personal-website-theme";
const themeTransitionMs = 220;
const themeCopy = {
  resume: {
    eyebrow: "Resume / LinkedIn Style",
    title: "eric yeh",
    role: "產品思維、視覺設計、前端開發",
    lead:
      "我專注把產品需求整理成清楚、可靠且有質感的網站與介面，擅長介面設計、前端實作與內容架構。",
    primaryCta: "查看作品",
    secondaryCta: "聯絡我",
    summaryTitle: "Professional Summary",
    summaryBody: "把設計、內容與技術整合成清楚好用的產品頁面。",
    tag1: "UI Design",
    tag2: "Front-end",
    tag3: "Content Structure",
    aboutEyebrow: "About",
    aboutTitle: "關於我",
    aboutBody1:
      "我習慣從資訊架構開始規劃頁面，先讓內容變得好懂，再把視覺做好看。這種做法適合履歷頁、作品集、產品官網與合作提案頁。",
    aboutBody2:
      "我重視可讀性、層級和留白，不做過度裝飾，讓重點資訊更容易被看見。若你要的是專業、穩定、適合求職或合作的個人頁，這版會更合適。",
    skillsEyebrow: "Skills",
    skillsTitle: "核心技能",
    projectsEyebrow: "Projects",
    projectsTitle: "近期作品",
    timelineEyebrow: "Timeline",
    timelineTitle: "經歷摘要",
    timeline1Title: "建立個人品牌網站",
    timeline1Body: "把作品、經歷與聯絡方式整合成單頁網站。",
    timeline2Title: "參與產品與介面設計",
    timeline2Body: "協助優化使用流程與設計系統。",
    timeline3Title: "開始專注前端與內容呈現",
    timeline3Body: "累積網站開發與視覺表達經驗。",
    contactEyebrow: "Contact",
    contactTitle: "聯絡我",
    contactBody: "如果你想合作、詢問專案，或想交換作品集觀點，歡迎直接寄信給我。",
    contactCta: "寄信給我",
  },
  brand: {
    eyebrow: "Personal Brand Mode",
    title: "Eric Yeh",
    role: "Designing clear, elegant digital experiences",
    lead:
      "我把產品、設計與內容整合成有辨識度的個人網站，讓頁面同時保有專業感與品牌記憶點。",
    primaryCta: "Explore Work",
    secondaryCta: "Get in Touch",
    summaryTitle: "Brand Focus",
    summaryBody: "為個人形象、合作提案與作品展示打造清楚有力的第一印象。",
    tag1: "Brand Design",
    tag2: "Creative Direction",
    tag3: "Web Experience",
    aboutEyebrow: "Brand Story",
    aboutTitle: "我在做什麼",
    aboutBody1:
      "我把個人品牌、視覺語言與內容敘事放進同一個頁面，讓訪客一眼就理解你是誰、你擅長什麼、你能帶來什麼價值。",
    aboutBody2:
      "這個模式適合需要印象感的個人首頁、合作提案、創作者頁面與接案展示。我希望它不只是資料表，而是能留下記憶點的入口。",
    skillsEyebrow: "Capabilities",
    skillsTitle: "我能提供的能力",
    projectsEyebrow: "Selected Work",
    projectsTitle: "精選內容",
    timelineEyebrow: "Journey",
    timelineTitle: "成長軌跡",
    timeline1Title: "建立有辨識度的網站風格",
    timeline1Body: "從視覺、語氣到互動細節，統一個人品牌印象。",
    timeline2Title: "把設計與內容結合",
    timeline2Body: "讓頁面不只好看，也能清楚傳遞重點。",
    timeline3Title: "持續打磨數位形象",
    timeline3Body: "把每個接觸點都做得更一致、更有記憶點。",
    contactEyebrow: "Say Hello",
    contactTitle: "一起合作",
    contactBody: "如果你想做一個更有記憶點的個人頁，或需要人幫你整理網站內容，歡迎聯絡我。",
    contactCta: "聯絡我",
  },
};

skillsList.innerHTML = skills
  .map((skill) => `<article class="chip"><h3>${skill}</h3><p>適合個人網站、品牌頁與產品介面。</p></article>`)
  .join("");

projectsList.innerHTML = projects
  .map(
    (project) =>
      `<article class="project"><h3>${project.title}</h3><p>${project.desc}</p></article>`
  )
  .join("");

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => observer.observe(item));

const applyTheme = (theme) => {
  document.body.dataset.theme = theme;
  themeSwitch.setAttribute("aria-pressed", String(theme === "brand"));
  document.querySelectorAll("[data-copy]").forEach((node) => {
    const key = node.getAttribute("data-copy");
    node.textContent = themeCopy[theme][key];
  });
};

const savedTheme = localStorage.getItem(themeKey) || "resume";
applyTheme(savedTheme);

themeSwitch.addEventListener("click", () => {
  if (document.body.classList.contains("theme-fading")) return;
  const nextTheme = document.body.dataset.theme === "brand" ? "resume" : "brand";
  document.body.classList.add("theme-fading");
  window.setTimeout(() => {
    applyTheme(nextTheme);
    localStorage.setItem(themeKey, nextTheme);
    document.body.classList.remove("theme-fading");
  }, themeTransitionMs);
});
