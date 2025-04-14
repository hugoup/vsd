const vscode = acquireVsCodeApi();

window.addEventListener("message", (event) => {
  const message = event.data;

  if (message.command === "addDump") {
    const payload = JSON.parse(message.payload);
    const html = renderDump(payload);
    const container = document.getElementById("dump-container");

    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = html;
    container.prepend(div);

    Sfdump(payload.id);
  }
});

function renderKeyValueSection(title, obj) {
  if (!obj || (Array.isArray(obj) && obj.length === 0)) return "";

  function renderEntries(entriesObj, level = 0) {
    let entries = "";

    for (const [key, value] of Object.entries(entriesObj)) {
      if (typeof value === "object" && value !== null) {
        entries += `<div class="meta-row nested-level-${level}">
                      <span class="meta-key">${key}</span>: 
                      <div class="meta-value nested-object">
                        ${renderEntries(value, level + 1)}
                      </div>
                    </div>`;
      } else {
        entries += `<div class="meta-row nested-level-${level}">
                      <span class="meta-key">${key}</span>: <span class="meta-value">${value}</span>
                    </div>`;
      }
    }

    return entries;
  }

  const entries = renderEntries(obj);

  return `
    <div class="dump-section">
      <div class="section-title">${title}</div>
      <div class="section-content">
        ${entries}
      </div>
    </div>
  `;
}

function renderDump(dump) {
  return `
    <div class="dump-wrapper">
      <div class="dump-header">
        <span class="dump-name">🧩 <strong>${dump.name}</strong></span>
        <span class="dump-id">🆔 ${dump.id}</span>
        <span class="dump-timestamp">📅 ${dump.timestamp}</span>
      </div>
      <div class="dump-context">
        ${renderKeyValueSection("Request", dump.request)}
        ${renderKeyValueSection("Headers", dump.headers)}
        ${renderKeyValueSection("Backtrace", dump.backtrace)}
      </div>

      <div class="dump-output">
        ${dump.output}
      </div>
    </div>
  `;
}
