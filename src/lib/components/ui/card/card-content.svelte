<script lang="ts">
	import { cn } from '$lib/utils.js';

	type $$Props = {
		class?: string;
	};

	export let className: $$Props['class'] = undefined;
</script>

<div class={cn('p-6 pt-0', className)} {...$$restProps}>
	<slot />
</div>