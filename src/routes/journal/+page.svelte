<script lang="ts">
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import JournalEntryCard from '$lib/components/journal/JournalEntryCard.svelte';
	import JournalEntryForm from '$lib/components/journal/JournalEntryForm.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Plus, LogOut, BookOpen } from 'lucide-svelte';
	import type { JournalEntry } from '$lib/server/db/schema';

	let { data } = $props();
	
	let showForm = $state(false);
	let editingEntry: JournalEntry | null = $state(null);

	function handleNewEntry() {
		editingEntry = null;
		showForm = true;
	}

	function handleEditEntry(entry: JournalEntry) {
		editingEntry = entry;
		showForm = true;
	}

	function handleCancelForm() {
		showForm = false;
		editingEntry = null;
	}

	async function handleSaveEntry(entryData: {
		title: string;
		content: string;
		mood: string;
		tags: string[];
	}) {
		try {
			const formData = new FormData();
			formData.append('title', entryData.title);
			formData.append('content', entryData.content);
			formData.append('mood', entryData.mood);
			formData.append('tags', JSON.stringify(entryData.tags));
			
			if (editingEntry) {
				formData.append('action', 'update');
				formData.append('id', editingEntry.id);
			} else {
				formData.append('action', 'create');
			}

			const response = await fetch('/journal', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				showForm = false;
				editingEntry = null;
				await invalidateAll();
			}
		} catch (error) {
			console.error('Error saving entry:', error);
		}
	}

	async function handleDeleteEntry(entryId: string) {
		if (!confirm('Are you sure you want to delete this entry?')) return;

		try {
			const formData = new FormData();
			formData.append('action', 'delete');
			formData.append('id', entryId);

			const response = await fetch('/journal', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				await invalidateAll();
			}
		} catch (error) {
			console.error('Error deleting entry:', error);
		}
	}

	async function handleLogout() {
		await fetch('/demo/lucia/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: 'action=logout'
		});
		window.location.href = '/demo/lucia/login';
	}
</script>

<svelte:head>
	<title>Journal - Selfcovery</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="min-h-screen bg-background">
	<!-- Header -->
	<header class="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30">
		<div class="container mx-auto px-4 py-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<BookOpen class="h-6 w-6 text-primary" />
					<h1 class="text-xl font-bold">Selfcovery</h1>
				</div>
				
				<div class="flex items-center gap-2">
					<span class="text-sm text-muted-foreground">
						Welcome, {data.user?.username}
					</span>
					<Button variant="ghost" size="icon" onclick={handleLogout}>
						<LogOut class="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="container mx-auto px-4 py-6">
		{#if showForm}
			<div class="mb-6">
				<JournalEntryForm
					entry={editingEntry}
					onSave={handleSaveEntry}
					onCancel={handleCancelForm}
				/>
			</div>
		{:else}
			<!-- New Entry Button -->
			<div class="mb-6">
				<Button onclick={handleNewEntry} class="w-full sm:w-auto">
					<Plus class="mr-2 h-4 w-4" />
					New Entry
				</Button>
			</div>
		{/if}

		<!-- Journal Entries -->
		<div class="space-y-4">
			{#if data.entries && data.entries.length > 0}
				{#each data.entries as entry (entry.id)}
					<JournalEntryCard
						{entry}
						onEdit={handleEditEntry}
						onDelete={handleDeleteEntry}
						class="max-w-2xl mx-auto"
					/>
				{/each}
			{:else if !showForm}
				<div class="text-center py-12">
					<BookOpen class="mx-auto h-12 w-12 text-muted-foreground mb-4" />
					<h3 class="text-lg font-medium mb-2">No entries yet</h3>
					<p class="text-muted-foreground mb-4">
						Start your journaling journey by creating your first entry.
					</p>
					<Button onclick={handleNewEntry}>
						<Plus class="mr-2 h-4 w-4" />
						Create your first entry
					</Button>
				</div>
			{/if}
		</div>
	</main>
</div>