import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

window.vscode = acquireVsCodeApi();

createApp(App).mount("#app");
