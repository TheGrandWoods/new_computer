// Default værktøj
const defaultTools = [
  { name: "Pladevibrator", desc: "Til fliser og komprimering", price: 350 },
  { name: "Slagboremaskine", desc: "Til beton og murværk", price: 150 },
  { name: "Højtryksrenser", desc: "Til terrasser og facader", price: 200 },
  { name: "Fliseskærer", desc: "Til sten og beton", price: 300 },
  { name: "Vinkelsliber", desc: "Til metal og sten", price: 120 },
  { name: "Stiksav", desc: "Til træ og plader", price: 120 },
  { name: "Multicutter", desc: "Til præcisionsarbejde", price: 100 },
  { name: "Hækkeklipper", desc: "Til hække", price: 150 },
  { name: "Kædesav", desc: "Til træfældning", price: 200 },
  { name: "Græstrimmer", desc: "Til kanter", price: 120 },
  { name: "Løvblæser", desc: "Til blade", price: 120 },
  { name: "Trailer", desc: "Åben trailer", price: 250 },
  { name: "Sækkevogn", desc: "Til tunge ting", price: 80 },
  { name: "Stillads", desc: "Til facadearbejde", price: 300 },
];

// Load tools
let tools = JSON.parse(localStorage.getItem("tools")) || defaultTools;

// Render tools
function renderTools() {
  const list = document.getElementById("toolList");
  list.innerHTML = "";

  tools.forEach((t) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
            <h4>${t.name}</h4>
            <p>${t.desc}</p>
            <p class="price">${t.price} kr/dag</p>
        `;
    list.appendChild(card);
  });

  renderAdminList();
}

function renderAdminList() {
  const adminList = document.getElementById("adminToolList");
  adminList.innerHTML = "";

  tools.forEach((t, i) => {
    const row = document.createElement("div");
    row.className = "admin-item";
    row.innerHTML = `
            <span>${t.name} – ${t.price} kr</span>
            <div class="admin-buttons">
                <button onclick="editTool(${i})">Rediger</button>
                <button onclick="deleteTool(${i})">Slet</button>
            </div>
        `;
    adminList.appendChild(row);
  });
}

function saveTools() {
  localStorage.setItem("tools", JSON.stringify(tools));
  renderTools();
}

document.getElementById("adminForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("toolName").value;
  const desc = document.getElementById("toolDesc").value;
  const price = parseInt(document.getElementById("toolPrice").value);
  const index = document.getElementById("editIndex").value;

  if (index) {
    tools[index] = { name, desc, price };
  } else {
    tools.push({ name, desc, price });
  }

  saveTools();
  e.target.reset();
  document.getElementById("editIndex").value = "";
});

function editTool(i) {
  const t = tools[i];
  document.getElementById("toolName").value = t.name;
  document.getElementById("toolDesc").value = t.desc;
  document.getElementById("toolPrice").value = t.price;
  document.getElementById("editIndex").value = i;
}

function deleteTool(i) {
  tools.splice(i, 1);
  saveTools();
}

document.getElementById("toggleAdmin").addEventListener("click", () => {
  document.getElementById("adminPanel").classList.toggle("hidden");
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Init
renderTools();
