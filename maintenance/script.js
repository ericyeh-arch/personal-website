import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  addDoc,
  collection,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC0uhEzc7ltB2a2xZdfWVrv9QQ1wc_8PPw",
  authDomain: "test-a1db4.firebaseapp.com",
  projectId: "test-a1db4",
  storageBucket: "test-a1db4.firebasestorage.app",
  messagingSenderId: "1087465474192",
  appId: "1:1087465474192:web:0bfdfc8a2b48345c0af015",
  measurementId: "G-QD3JN8S50C"
};

const assets = [
  { name: "冰水主機 CH-01", status: "正常", owner: "空調組", next: "2026-04-29" },
  { name: "核心交換器 SW-CORE-2", status: "注意", owner: "網管組", next: "2026-04-27" },
  { name: "柴油發電機 DG-05", status: "正常", owner: "機電組", next: "2026-05-02" },
  { name: "監視主機 NVR-07", status: "維修中", owner: "弱電組", next: "2026-04-25" }
];

const schedule = [
  { time: "09:30", task: "A 棟 3F 冷氣檢修", engineer: "王建宏", level: "緊急" },
  { time: "11:00", task: "B 棟入口監視器排障", engineer: "陳雅婷", level: "高" },
  { time: "14:30", task: "機房 UPS 月檢", engineer: "林志遠", level: "一般" }
];

const ticketTable = document.querySelector("#ticket-table");
const assetList = document.querySelector("#asset-list");
const scheduleList = document.querySelector("#schedule-list");
const activeCount = document.querySelector("#active-count");
const doneCount = document.querySelector("#done-count");
const priorityCount = document.querySelector("#priority-count");
const healthRate = document.querySelector("#health-rate");
const ticketForm = document.querySelector("#ticket-form");
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const ticketsRef = collection(db, "maintenanceTickets");
let tickets = [];

const statusClass = (status) => {
  if (status === "已完成") return "status-done";
  if (status === "處理中") return "status-progress";
  return "status-open";
};

const priorityClass = (priority) => {
  if (priority === "緊急") return "priority-urgent";
  if (priority === "高") return "priority-high";
  return "priority-normal";
};

const renderTickets = () => {
  if (!tickets.length) {
    ticketTable.innerHTML = `
      <tr>
        <td colspan="7">目前還沒有工單，先建立第一筆維修紀錄。</td>
      </tr>
    `;
    return;
  }

  ticketTable.innerHTML = tickets.map((ticket) => `
    <tr>
      <td>${ticket.code}</td>
      <td>
        <strong>${ticket.title}</strong>
        <div class="asset-meta">${ticket.description}</div>
      </td>
      <td>${ticket.location}</td>
      <td>${ticket.asset}</td>
      <td><span class="priority-pill ${priorityClass(ticket.priority)}">${ticket.priority}</span></td>
      <td><span class="status-pill ${statusClass(ticket.status)}">${ticket.status}</span></td>
      <td>${ticket.owner || "未指派"}</td>
    </tr>
  `).join("");
};

const renderAssets = () => {
  assetList.innerHTML = assets.map((asset) => `
    <article class="asset-item">
      <h4>${asset.name}</h4>
      <p class="asset-meta">負責單位：${asset.owner}</p>
      <div class="asset-tags">
        <span class="tag">狀態：${asset.status}</span>
        <span class="tag">下次保養：${asset.next}</span>
      </div>
    </article>
  `).join("");
};

const renderSchedule = () => {
  scheduleList.innerHTML = schedule.map((item) => `
    <article class="schedule-item">
      <h4>${item.time} ${item.task}</h4>
      <p class="schedule-meta">技師：${item.engineer}</p>
      <div class="schedule-tags">
        <span class="tag">優先：${item.level}</span>
      </div>
    </article>
  `).join("");
};

const updateStats = () => {
  const active = tickets.filter((ticket) => ticket.status !== "已完成").length;
  const done = tickets.filter((ticket) => ticket.status === "已完成").length;
  const priority = tickets.filter((ticket) => ticket.priority === "高" || ticket.priority === "緊急").length;
  const healthy = Math.round((assets.filter((asset) => asset.status === "正常").length / assets.length) * 100);

  activeCount.textContent = active;
  doneCount.textContent = done;
  priorityCount.textContent = priority;
  healthRate.textContent = `${healthy}%`;
};

ticketForm.addEventListener("submit", (event) => {
ticketForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.querySelector("#ticket-title").value.trim();
  const location = document.querySelector("#ticket-location").value.trim();
  const asset = document.querySelector("#ticket-asset").value;
  const priority = document.querySelector("#ticket-priority").value;
  const owner = document.querySelector("#ticket-owner").value.trim();
  const description = document.querySelector("#ticket-description").value.trim();

  try {
    await addDoc(ticketsRef, {
      code: `MT-${String(Date.now()).slice(-6)}`,
      title,
      location,
      asset,
      priority,
      status: "待派工",
      owner,
      description: description || "尚未補充問題描述。",
      createdAt: serverTimestamp()
    });

    ticketForm.reset();
  } catch (error) {
    console.error(error);
    window.alert("工單寫入 Firestore 失敗，請確認資料庫權限設定。");
  }
});

document.querySelectorAll("[data-open-ticket]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("#ticket-title").focus();
    document.querySelector("#tickets").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelector("[data-scroll-assets]").addEventListener("click", () => {
  document.querySelector("#assets").scrollIntoView({ behavior: "smooth", block: "start" });
});

renderAssets();
renderSchedule();

onSnapshot(
  query(ticketsRef, orderBy("createdAt", "desc"), limit(50)),
  (snapshot) => {
    tickets = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        code: data.code || `MT-${doc.id.slice(0, 6).toUpperCase()}`,
        title: data.title || "未命名工單",
        location: data.location || "-",
        asset: data.asset || "-",
        priority: data.priority || "一般",
        status: data.status || "待派工",
        owner: data.owner || "",
        description: data.description || "尚未補充問題描述。"
      };
    });

    renderTickets();
    updateStats();
  },
  (error) => {
    console.error(error);
    ticketTable.innerHTML = `
      <tr>
        <td colspan="7">讀取 Firestore 失敗，請確認資料庫已啟用且規則允許存取。</td>
      </tr>
    `;
  }
);
