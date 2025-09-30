<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	// Redirect to appropriate page based on auth status
	onMount(() => {
		// Check if user data is available in page data
		const user = $page.data?.user;
		
		if (user) {
			// User is authenticated, redirect to journal
			goto('/journal');
		} else {
			// User is not authenticated, redirect to login
			goto('/demo/lucia/login');
		}
	});
</script>

<div class="flex min-h-screen items-center justify-center">
	<div class="text-center">
		<h1 class="text-2xl font-bold mb-4">📝 Selfcovery</h1>
		<p class="text-muted-foreground">Personal Journaling App</p>
		<p class="text-sm text-muted-foreground mt-2">Redirecting...</p>
	</div>
</div>
