const vscode = require("vscode");
const path = require("path");
// const state = require("./State");

const panel = {
  panel: null,
  extensionUri: null,

  init(extensionUri) {
    this.extensionUri = extensionUri;

    this.panel = vscode.window.createWebviewPanel("vsd", "Vsd", vscode.ViewColumn.Two, {
      enableScripts: true,
    });

    const dumpScriptUri = this.panel.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "assets", "dump.js"));
    const mainScriptUri = this.panel.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "assets", "main.js"));
    const styleUri = this.panel.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "assets", "style.css"));

    this.panel.webview.html = `
      <!DOCTYPE html>
      <html>
        <head>
          <link href="${styleUri}" rel="stylesheet" />
        </head>
        <body>
				<div class="buttons">
					<button id="clear-log-button">Clear log</button>
				</div>
          <div id="dump-container"></div>
         
          <script src="${dumpScriptUri}"></script>
          <script src="${mainScriptUri}"></script>
        </body>
      </html>`;
  },

  add(data) {
    if (!this.panel) this.init();

    this.panel.webview.postMessage({
      command: "addDump",
      payload: data,
    });
  },
};
module.exports = panel;
