const vscode = acquireVsCodeApi();

document.getElementById("clear-log-button").addEventListener("click", function () {
  document.getElementById("dump-container").innerHTML = "";
});

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

function renderBacktrace(backtrace) {
  if (!Array.isArray(backtrace) || backtrace.length === 0) return "";

  return `<ol class='backtrace-list'>${backtrace
    .map(
      (trace, index) => `
		<li class='backtrace-item'>
			<div><strong>#${index}</strong> ${trace.file || "N/A"} -> (${trace.line || "N/A"}) -> ${trace.class || "N/A"} -> ${trace.function || "N/A"}</div>
		</li>`
    )
    .join("")}</ol>`;
}

function renderDump(dump) {
  const renderSection = (title, content) =>
    content
      ? `
    <div class="dump-section">
      <details>
        <summary>${title} (${content.length || 0})</summary>
        <div class="section-content">${content}</div>
      </details>
    </div>`
      : "";

  return `
    <div class="dump-wrapper">
      <div class="dump-header">
        <span class="dump-name">🧩 <strong>${dump.name}</strong></span>
        <span class="dump-id">🆔 ${dump.id}</span>
        <span class="dump-timestamp">📅 ${dump.timestamp}</span>
      </div>
			<div class="dump-output">${dump.output}</div>
      <div class="dump-context">
        ${renderSection("Request", renderKeyValueSection(dump.request))}
        ${renderSection("Headers", renderKeyValueSection(dump.headers))}
        ${renderSection("Backtrace", renderBacktrace(dump.backtrace))}
      </div>
    </div>`;
}
