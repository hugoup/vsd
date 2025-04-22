const vscode = require("vscode");
const net = require("net");
const path = require("path");
const fs = require("fs");

let server = null;
let panel = null;

function activate(context) {
  const startCommand = vscode.commands.registerCommand("vsd.startDumpServer", () => {
    if (server) {
      vscode.window.showInformationMessage("VSD server already running.");
      return;
    }

    server = net.createServer((socket) => {
      let data = "";

      socket.on("data", (chunk) => (data += chunk.toString()));
      socket.on("end", () => {
        panel.webview.postMessage(data);
        data = "";
      });
    });

    server.listen(9913, () => {
      vscode.window.showInformationMessage("VSD started on port 9913");
    });

    panel = vscode.window.createWebviewPanel("vsd", "Vsd", vscode.ViewColumn.Two, {
      enableScripts: true,
    });

    panel.webview.html = getWebviewContent(context, panel);

    panel.onDidDispose(() => {
      vscode.window.showInformationMessage("Closing VSD server");
      if (server) {
        server.close();
        server = null;
      }
    });
  });

  context.subscriptions.push(startCommand);
  context.subscriptions.push({
    dispose() {
      if (server) server.close();
    },
  });
}

function getWebviewContent(context, panel) {
  const indexPath = path.join(context.extensionUri.fsPath, "media", "index.html");
  let html = fs.readFileSync(indexPath, "utf8");

  html = html.replace(/(src|href)="([^"]+)"/g, (_, attr, src) => {
    const uri = panel.webview.asWebviewUri(vscode.Uri.file(path.join(context.extensionUri.fsPath, "media", src)));
    return `${attr}="${uri}"`;
  });

  html = html.replace(/%CSP_SOURCE%/g, panel.webview.cspSource);

  return html;
}

function deactivate() {
  if (server) server.close();
}

module.exports = {
  activate,
  deactivate,
};
