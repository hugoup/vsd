<script>
import Sfdump from '../lib/dump.js';
import Context from './Context.vue';
import Backtrace from './Backtrace.vue';

export default {
  name: 'Dump',
  props: {
    item: Object
  },
  components: {
    Context,
    Backtrace,
  },
  mounted() {
    Sfdump(this.item.id);
  }
}
</script>

<template>
  <div class="dump-wrapper">
    <div class="dump-header">
      <span class="dump-name">🧩 <strong>{{ item.name }}</strong></span>
      <span class="dump-timestamp">📅 {{ item.timestamp }}</span>
    </div>

    <div class="dump-output" v-html="item.output"></div>

    <div class="extra">
      <Context title="Headers" :data="item.headers" v-if="Object.values(item.headers).length"></Context>
      <Context title="Request" :data="item.request" v-if="Object.values(item.request).length"></Context>
      <Backtrace :data="item.backtrace"></Backtrace>
    </div>

    
    
  </div>
</template>

<style>
.dump-wrapper {
  background: var(--vscode-panel-background);
  border: 1px solid var(--vscode-panel-border);
  padding: 10px;
  margin-bottom: 10px;
  border-radius: var(--border-radius);
}

.dump-header {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 10px;
  margin-bottom: 12px;
}

.dump-header .dump-name {
  font-weight: bold;
  color: var(--vscode-editor-foreground);
}

.dump-header .dump-id,
.dump-header .dump-timestamp {
  font-size: 0.85em;
  color: var(--vscode-descriptionForeground);
  place-self: end;
}

.dump-output {
  background: var(--vscode-editor-background);
  color: var(--vscode-editor-foreground);
  overflow-x: auto;
  font-size: 0.9em;
  line-height: 1.5;
  border-radius: var(--border-radius);
}

.extra {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.dump-section {
  background: var(--vscode-input-background);
  color: var(--vscode-input-foreground);
  padding: 4px 10px;
  border-radius: var(--border-radius);
  font-size: 1em;
}
</style>
