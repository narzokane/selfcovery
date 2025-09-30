<script lang="ts">
	import { cn } from '$lib/utils.js';

	type $$Props = {
		class?: string;
	};

	export let className: $$Props['class'] = undefined;
</script>

<h3 class={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...$$restProps}>
	<slot />
</h3>