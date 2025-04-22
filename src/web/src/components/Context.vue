<script>
export default {
	name: 'Context',
	props: {
		title: String,
		data: Array
	},
}
</script>

<template>
	<div class="dump-section">
		<details>
			<summary class="section-title">{{ title }} ({{ Object.values(data).length }})</summary>
			<pre>{{ data }}</pre>
		</details>
	</div>
</template>

<style>
.section-title {
	font-weight: bold;
	color: var(--vscode-editor-foreground);
}
</style>
