// Demo-kodeord til admin (kan ændres)
const ADMIN_PASSWORD = "nord9990";

// Default værktøj
const defaultTools = [
  { name: "Pladevibrator", desc: "Til fliser og komprimering", price: 350, image: null },
  { name: "Slagboremaskine / borehammer", desc: "Til beton og murværk", price: 150, image: null },
  { name: "Højtryksrenser", desc: "Til terrasser og facader", price: 200, image: null },
  { name: "Flise-/betonskærer", desc: "Til sten og beton", price: 300, image: null },
  { name: "Vinkelsliber", desc: "Til metal og sten", price: 120, image: null },
  { name: "Stiksav / rundsav", desc: "Til træ og plader", price: 120, image: null },
  { name: "Multicutter", desc: "Til præcisionsarbejde", price: 100, image: null },
  { name: "Hækkeklipper", desc: "Til hække", price: 150, image: null },
  { name: "Kædesav", desc: "Til træfældning", price: 200, image: null },
  { name: "Græstrimmer", desc: "Til kanter", price: 120, image: null },
  { name: "Løvblæser", desc: "Til blade", price: 120, image: null },
  { name: "Trailer", desc: "Åben trailer", price: 250, image: null },
  { name: "Sækkevogn", desc: "Til tunge ting", price: 80, image: null },
  { name: "Stillads / murerbukke", desc: "Til facadearbejde", price: 300, image: null },
];

let tools = JSON.parse(localStorage.getItem("tools")) || defaultTools;
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
let loggedIn = false;

// Helpers
function saveTools() {
  localStorage.setItem("tools", JSON.stringify(tools));
  renderTools();
  renderBookingToolOptions();
}

function saveBookings() {
  localStorage.setItem("bookings", JSON.stringify(bookings));
  renderBookings();
}

function renderTools() {
  const list = document.getElementById("toolList");
  list.innerHTML = "";

  tools.forEach((t) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
            ${t.image ? `<img src="${t.image}" alt="${t.name}">` : ""}
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
  if (!adminList) return;
  adminList.innerHTML = "";

  tools.forEach((t, i) => {
    const row = document.createElement("div");
    row.className = "admin-item";
    row.innerHTML = `
            <span>${t.name} – ${t.price} kr/dag</span>
            <div class="admin-buttons">
                <button type="button" onclick="editTool(${i})">Rediger</button>
                <button type="button" onclick="deleteTool(${i})">Slet</button>
            </div>
        `;
    adminList.appendChild(row);
  });
}

function renderBookingToolOptions() {
  const select = document.getElementById("bookingTool");
  if (!select) return;
  select.innerHTML = `<option value="">Vælg værktøj</option>`;
  tools.forEach((t, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `${t.name} (${t.price} kr/dag)`;
    select.appendChild(opt);
  });
}

function renderBookings() {
  const list = document.getElementById("bookingList");
  if (!list) return;
  list.innerHTML = "";

  if (bookings.length === 0) {
    list.textContent = "Ingen bookinger endnu.";
    return;
  }

  bookings.forEach((b, i) => {
    const div = document.createElement("div");
    div.className = "booking-item";

    div.innerHTML = `
            <span>${b.name} – ${b.toolName} – ${b.from} til ${b.to} – ${b.total} kr</span>
            <div>
                <button type="button" onclick="generateContract(${i})">Kontrakt (PDF)</button>
                <button type="button" onclick="deleteBooking(${i})">Slet</button>
            </div>
        `;

    list.appendChild(div);
  });
}

// Admin login
const loginForm = document.getElementById("loginForm");
const loginStatus = document.getElementById("loginStatus");
const adminPanel = document.getElementById("adminPanel");
const loginBox = document.getElementById("loginBox");
const logoutBtn = document.getElementById("logoutBtn");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const pw = document.getElementById("adminPassword").value;
    if (pw === ADMIN_PASSWORD) {
      loggedIn = true;
      adminPanel.classList.remove("hidden");
      loginBox.classList.add("hidden");
      loginStatus.textContent = "";
    } else {
      loginStatus.textContent = "Forkert kodeord.";
    }
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    loggedIn = false;
    adminPanel.classList.add("hidden");
    loginBox.classList.remove("hidden");
  });
}

// Admin form
const adminForm = document.getElementById("adminForm");
if (adminForm) {
  adminForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!loggedIn) return;

    const name = document.getElementById("toolName").value;
    const desc = document.getElementById("toolDesc").value;
    const price = parseInt(document.getElementById("toolPrice").value, 10);
    const index = document.getElementById("editIndex").value;
    const fileInput = document.getElementById("toolImage");
    const file = fileInput.files[0];

    const saveTool = (imageData) => {
      const toolObj = { name, desc, price, image: imageData || null };
      if (index !== "") {
        tools[index] = toolObj;
      } else {
        tools.push(toolObj);
      }
      saveTools();
      adminForm.reset();
      document.getElementById("editIndex").value = "";
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = () => saveTool(reader.result);
      reader.readAsDataURL(file);
    } else {
      saveTool(index !== "" ? tools[index].image : null);
    }
  });
}

// Globale funktioner til knapper
window.editTool = function (i) {
  if (!loggedIn) return;
  const t = tools[i];
  document.getElementById("toolName").value = t.name;
  document.getElementById("toolDesc").value = t.desc;
  document.getElementById("toolPrice").value = t.price;
  document.getElementById("editIndex").value = i;
};

window.deleteTool = function (i) {
  if (!loggedIn) return;
  tools.splice(i, 1);
  saveTools();
};

// Booking & prisberegner
const bookingForm = document.getElementById("bookingForm");
const bookingPrice = document.getElementById("bookingPrice");
const bookingStatus = document.getElementById("bookingStatus");

function calcDays(from, to) {
  const d1 = new Date(from);
  const d2 = new Date(to);
  const diff = (d2 - d1) / (1000 * 60 * 60 * 24);
  return diff >= 0 ? diff + 1 : 0;
}

if (bookingForm) {
  const toolSelect = document.getElementById("bookingTool");
  const fromInput = document.getElementById("bookingFrom");
  const toInput = document.getElementById("bookingTo");

  function updatePrice() {
    const idx = toolSelect.value;
    const from = fromInput.value;
    const to = toInput.value;
    if (idx === "" || !from || !to) {
      bookingPrice.textContent = "";
      return;
    }
    const tool = tools[idx];
    const days = calcDays(from, to);
    if (days <= 0) {
      bookingPrice.textContent = "Datoer er ugyldige.";
      return;
    }
    const total = days * tool.price;
    bookingPrice.textContent = `Pris for ${days} dag(e): ${total} kr`;
  }

  toolSelect.addEventListener("change", updatePrice);
  fromInput.addEventListener("change", updatePrice);
  toInput.addEventListener("change", updatePrice);

  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const idx = toolSelect.value;
    const name = document.getElementById("bookingName").value;
    const from = fromInput.value;
    const to = toInput.value;

    if (idx === "" || !from || !to) return;

    const tool = tools[idx];
    const days = calcDays(from, to);
    if (days <= 0) {
      bookingStatus.textContent = "Datoer er ugyldige.";
      return;
    }
    const total = days * tool.price;

    bookings.push({
      toolIndex: idx,
      toolName: tool.name,
      name,
      from,
      to,
      days,
      total,
    });

    saveBookings();
    bookingStatus.textContent = "Booking gemt.";
    bookingForm.reset();
    bookingPrice.textContent = "";
    setTimeout(() => (bookingStatus.textContent = ""), 4000);
  });
}

window.deleteBooking = function (i) {
  bookings.splice(i, 1);
  saveBookings();
};

window.generateContract = function (i) {
  const b = bookings[i];
  const win = window.open("", "_blank");
  const html = `
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Lejekontrakt – ${b.toolName}</title>
        </head>
        <body>
            <h1>Lejekontrakt – NordVærktøj Udlejning</h1>
            <p><strong>Kunde:</strong> ${b.name}</p>
            <p><strong>Værktøj:</strong> ${b.toolName}</p>
            <p><strong>Periode:</strong> ${b.from} til ${b.to} (${b.days} dag(e))</p>
            <p><strong>Total pris:</strong> ${b.total} kr</p>
            <p><strong>Adresse udlejer:</strong> Skagen 9990, Nordjylland</p>
            <p>Underskrift kunde: ____________________________</p>
            <p>Underskrift udlejer: __________________________</p>
            <script>
                window.print();
            <\/script>
        </body>
        </html>
    `;
  win.document.write(html);
  win.document.close();
};

// Kontaktform (simpel)
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value || "Tak";
    formStatus.textContent = `Tak for din besked, ${name}. Vi vender tilbage hurtigst muligt.`;
    contactForm.reset();
    setTimeout(() => (formStatus.textContent = ""), 5000);
  });
}

// Footer år
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// Init
renderTools();
renderBookingToolOptions();
renderBookings();
