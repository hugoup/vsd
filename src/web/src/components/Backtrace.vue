<script>
export default {
	name: 'Backtrace',
	props: {
		data: Array
	},
	computed: {
		getTrace() {
			return Object.values(this.data)
				.map((row) => {
					const args = JSON.stringify(row.args);
					const argsStripped = args.substring(1, args.length - 1);
					return `${row.file} (${row.line}) :: ${row.class || ''}${row.type || ''}${row.function || ''}(${argsStripped})`;
				})
				.join('<br>');
		},
	},

}
</script>

<template>
      <div class="dump-section wide" v-html="getTrace"></div>
</template>

<style>
.wide {
	grid-column: span 2;
}
</style>
