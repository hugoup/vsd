<script>
import Dump from './components/Dump.vue';

export default {
  data() {
    return {
      data: []
    };
  },
  components: {
    Dump,
  },
  methods: {
    handleMessage(event) {
      this.data.unshift(JSON.parse(event.data));
    },
    clearData() {
      this.data = [];
    }
  },
  mounted() {
    window.addEventListener('message', this.handleMessage);
  },
  beforeUnmount() {
    window.removeEventListener('message', this.handleMessage);
  }
};
</script>

<template>
  <div>
  <div class="header">
    <h1>VSDump</h1>
      <button @click="clearData" class="clear-btn">Clear</button>
  </div>
  
    <Dump v-for="(item, index) in data" :key="index" :item="item" />
    <p v-if="data.length === 0">Waiting for messages...</p>
  </div>
</template>

<style>
:root {
  --border-radius: 4px;
}

body {
  background-color: var(--vscode-editor-background);
  color: var(--vscode-editor-foreground);
  font-family: var(--vscode-font-family, monospace);
  padding: 16px;
  margin: 0;
}

button {
  background-color: var(--vscode-button-background);
  color: var(--vscode-button-foreground);
  border: 1px solid var(--vscode-button-border);
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
}

.buttons {
  text-align: right;
  padding: 10px;
  border-bottom: 1px solid var(--vscode-button-border);
}

button:hover {
  background-color: var(--vscode-button-hoverBackground);
}

button:active {
  transform: scale(0.98);
}

button:focus {
  outline: 2px solid var(--vscode-focusBorder);
  outline-offset: 2px;
}


.clear-btn {
  margin: auto;
}

.header {
  display: grid;
  grid-template-columns: auto min-content;
  gap: 10px;
}
</style>
