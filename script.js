const skills = [
  "網站設計",
  "前端開發",
  "UI/UX 思考",
  "內容策略",
  "品牌視覺",
  "專案整理",
];

const projects = [
  {
    title: "作品集網站",
    desc: "用單頁式結構呈現自我介紹與代表作品。",
  },
  {
    title: "產品頁優化",
    desc: "調整資訊層級與 CTA，提升整體轉換效率。",
  },
  {
    title: "設計系統整理",
    desc: "將重複元件抽象成可維護的設計規則。",
  },
];

const skillsList = document.getElementById("skillsList");
const projectsList = document.getElementById("projectsList");

skillsList.innerHTML = skills
  .map((skill) => `<article class="chip"><h3>${skill}</h3><p>可直接應用在網站與產品中。</p></article>`)
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
