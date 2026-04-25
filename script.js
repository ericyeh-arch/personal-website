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
  const nextTheme = document.body.dataset.theme === "brand" ? "resume" : "brand";
  applyTheme(nextTheme);
  localStorage.setItem(themeKey, nextTheme);
});
