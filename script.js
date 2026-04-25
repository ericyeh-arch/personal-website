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
};

const savedTheme = localStorage.getItem(themeKey) || "resume";
applyTheme(savedTheme);

themeSwitch.addEventListener("click", () => {
  const nextTheme = document.body.dataset.theme === "brand" ? "resume" : "brand";
  applyTheme(nextTheme);
  localStorage.setItem(themeKey, nextTheme);
});
