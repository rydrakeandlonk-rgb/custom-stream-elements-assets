/* SPECTRUM STREAM OVERLAY - BASE JS
   StreamElements Custom Widget JavaScript tab.
*/
const CONFIG = {
  gameTitle: "YOUR GAME",
  streamerName: "RYDRAKE",
  backgroundType: "image", // "image" or "video"
  backgroundUrl: "",       // HTTPS URL to JPG/PNG/GIF/WebP or MP4/WebM
  chatEnabled: true,
  goals: [
    { text: "Add your first goal", complete: false },
    { text: "Add another goal", complete: false }
  ],
  activitySeconds: 5,
  maxChatMessages: 7,
  maxActivities: 12
};

const $ = (id) => document.getElementById(id);

const chatMessages = [];
const activities = [];
let activityIndex = 0;
let activityTimer = null;

function setText(id, value) {
  const el = $(id);
  if (el) el.textContent = value == null ? "" : String(value);
}

function setupBackground() {
  const image = $("background-image");
  const video = $("background-video");
  if (!CONFIG.backgroundUrl) return;

  if (CONFIG.backgroundType === "video") {
    video.src = CONFIG.backgroundUrl;
    video.style.display = "block";
    video.play().catch(() => {});
  } else {
    image.src = CONFIG.backgroundUrl;
    image.style.display = "block";
  }
}

function renderGoals() {
  const list = $("goal-list");
  if (!list) return;
  list.replaceChildren();

  CONFIG.goals.forEach((goal) => {
    const row = document.createElement("div");
    row.className = "goal-row" + (goal.complete ? " is-complete" : "");

    const check = document.createElement("span");
    check.className = "goal-check";
    check.setAttribute("aria-hidden", "true");

    const label = document.createElement("span");
    label.className = "goal-label";
    label.textContent = goal.text;

    row.append(check, label);
    list.appendChild(row);
  });
}

function addChatMessage(data) {
  if (!CONFIG.chatEnabled || !data) return;

  const name = data.displayName || data.nick || data.username || data.name || "Viewer";
  const message = data.text || data.message || data.body || "";
  if (!message) return;

  chatMessages.push({ name: String(name), message: String(message) });
  while (chatMessages.length > CONFIG.maxChatMessages) chatMessages.shift();
  renderChat();
}

function renderChat() {
  const root = $("chat-messages");
  if (!root) return;
  root.replaceChildren();

  chatMessages.forEach((item) => {
    const row = document.createElement("div");
    row.className = "chat-message";

    const author = document.createElement("span");
    author.className = "chat-author";
    author.textContent = item.name + ":";

    const message = document.createElement("span");
    message.className = "chat-text";
    message.textContent = item.message;

    row.append(author, message);
    root.appendChild(row);
  });
}

function normaliseActivity(listener, event) {
  const data = event || {};
  const name = data.name || data.username || data.displayName || data.sender || "A viewer";
  const amount = data.amount || data.quantity || data.count || "";
  const message = data.message || data.text || "";

  const types = {
    "follower-latest": ["NEW FOLLOWER", "✦"],
    "subscriber-latest": ["NEW SUBSCRIBER", "★"],
    "tip-latest": ["NEW TIP", "♥"],
    "cheer-latest": ["BITS CHEERED", "◆"],
    "raid-latest": ["RAID ARRIVED", "⚑"],
    "host-latest": ["HOST", "⌂"]
  };

  let type = types[listener];
  if (listener === "subscriber-latest" && (data.gifted === true || data.isGift === true || data.bulkGifted === true)) {
    type = ["GIFTED SUBS", "🎁"];
  }
  if (!type) return null;

  let detail = message;
  if (!detail && amount !== "") {
    if (listener === "cheer-latest") detail = String(amount) + " bits";
    else if (listener === "raid-latest") detail = String(amount) + " viewers";
    else if (listener === "tip-latest") detail = String(amount);
    else if (listener === "subscriber-latest" && type[0] === "GIFTED SUBS") detail = String(amount) + " gifted";
    else if (listener === "subscriber-latest") detail = "Subscription";
  }

  return { type: type[0], icon: type[1], name: String(name), message: String(detail || "") };
}

function addActivity(item) {
  if (!item) return;
  activities.push(item);
  while (activities.length > CONFIG.maxActivities) activities.shift();
  if (activities.length === 1) activityIndex = 0;
  renderActivity();
}

function renderActivity() {
  if (!activities.length) {
    setText("activity-icon", "✦");
    setText("activity-type", "THE COMMUNITY");
    setText("activity-name", "Your next adventure starts here");
    setText("activity-message", "");
    return;
  }

  const item = activities[activityIndex % activities.length];
  setText("activity-icon", item.icon);
  setText("activity-type", item.type);
  setText("activity-name", item.name);
  setText("activity-message", item.message);
}

function startActivityRotation() {
  if (activityTimer) clearInterval(activityTimer);
  activityTimer = setInterval(() => {
    if (activities.length > 1) {
      activityIndex = (activityIndex + 1) % activities.length;
      renderActivity();
    }
  }, Math.max(2, CONFIG.activitySeconds) * 1000);
}

function getEventPayload(detail) {
  if (!detail) return {};
  const event = detail.event || {};
  return event.data || event;
}

function handleStreamElementsEvent(detail) {
  if (!detail) return;
  const listener = String(detail.listener || "");
  const payload = getEventPayload(detail);

  if (listener === "message" || listener === "message-received") {
    addChatMessage(payload);
    return;
  }

  const activity = normaliseActivity(listener, payload);
  if (activity) addActivity(activity);
}

function initWidget() {
  setText("streamer-name", CONFIG.streamerName);
  setText("gameplay-label", CONFIG.gameTitle + " GAMEPLAY");
  setupBackground();
  renderGoals();
  renderActivity();
  startActivityRotation();
}

window.addEventListener("onWidgetLoad", initWidget);
window.addEventListener("onEventReceived", (obj) => {
  handleStreamElementsEvent(obj && obj.detail);
});

/* Initialise immediately as a fallback for preview environments. */
initWidget();
