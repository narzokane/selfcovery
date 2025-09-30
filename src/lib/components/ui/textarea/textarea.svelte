<script lang="ts">
	import { cn } from '$lib/utils.js';

	type $$Props = {
		class?: string;
		value?: string;
		placeholder?: string;
		rows?: number;
		disabled?: boolean;
	};

	export let className: $$Props['class'] = undefined;
	export let value: $$Props['value'] = '';
	export let rows: $$Props['rows'] = 3;
</script>

<textarea
	bind:value
	{rows}
	class={cn(
		'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	{...$$restProps}
></textarea>