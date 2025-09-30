<script lang="ts">
	import { Button as ButtonPrimitive } from 'bits-ui';
	import { buttonVariants, type Variant, type Size } from './index.js';
	import { cn } from '$lib/utils.js';

	type $$Props = ButtonPrimitive.Props & {
		variant?: Variant;
		size?: Size;
	};

	export let className: $$Props['class'] = undefined;
	export let variant: $$Props['variant'] = 'default';
	export let size: $$Props['size'] = 'default';
	export let builders: $$Props['builders'] = [];
</script>

<ButtonPrimitive.Root
	{builders}
	class={cn(buttonVariants({ variant, size, className }))}
	type="button"
	{...$$restProps}
>
	<slot />
</ButtonPrimitive.Root>