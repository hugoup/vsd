const vscode = require("vscode");
const net = require("net");

const panel = require("./src/Panel");
let server = null;

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
        panel.add(data);
      });
    });

    server.listen(9913, () => {
      vscode.window.showInformationMessage("VSD started on port 9913");
    });

    panel.init(context.extensionUri);

    panel.panel.onDidDispose(() => {
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

function deactivate() {
  if (server) server.close();
}

module.exports = {
  activate,
  deactivate,
};
