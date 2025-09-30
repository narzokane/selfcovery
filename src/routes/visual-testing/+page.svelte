<script lang="ts">
	import JournalEntryCard from '$lib/components/journal/JournalEntryCard.svelte';
	import JournalEntryForm from '$lib/components/journal/JournalEntryForm.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardHeader, CardTitle, CardContent } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { TestTube, Eye, Code } from 'lucide-svelte';
	
	let { data } = $props();
	
	let showForm = $state(false);
	let formMode = $state<'create' | 'edit'>('create');
	
	function toggleForm(mode: 'create' | 'edit' = 'create') {
		formMode = mode;
		showForm = !showForm;
	}
	
	// Mock handlers for testing
	function handleSave(entryData: any) {
		console.log('Mock save:', entryData);
		showForm = false;
		return Promise.resolve();
	}
	
	function handleCancel() {
		showForm = false;
	}
	
	function handleEdit(entry: any) {
		console.log('Mock edit:', entry);
	}
	
	function handleDelete(entryId: string) {
		console.log('Mock delete:', entryId);
	}
</script>

<svelte:head>
	<title>Visual Testing - Selfcovery</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="min-h-screen bg-background">
	<!-- Header -->
	<header class="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30">
		<div class="container mx-auto px-4 py-4">
			<div class="flex items-center gap-2">
				<TestTube class="h-6 w-6 text-primary" />
				<h1 class="text-xl font-bold">Visual Testing - Selfcovery Components</h1>
			</div>
		</div>
	</header>

	<main class="container mx-auto px-4 py-6 space-y-8">
		<!-- Introduction -->
		<Card>
			<CardHeader>
				<CardTitle class="flex items-center gap-2">
					<Eye class="h-5 w-5" />
					Component Showcase
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p class="text-muted-foreground mb-4">
					This page displays static components and mock data for visual testing and development purposes.
					All components are decoupled and testable independently.
				</p>
				<div class="flex flex-wrap gap-2">
					<span class="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary px-3 py-1 text-sm">
						<Code class="h-3 w-3" />
						Decoupled Components
					</span>
					<span class="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm">
						Static Mock Data
					</span>
					<span class="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm">
						Mobile Responsive
					</span>
				</div>
			</CardContent>
		</Card>

		<!-- Form Component Testing -->
		<section>
			<Card>
				<CardHeader>
					<CardTitle>Journal Entry Form Component</CardTitle>
				</CardHeader>
				<CardContent class="space-y-4">
					<div class="flex gap-2">
						<Button onclick={() => toggleForm('create')}>
							{showForm && formMode === 'create' ? 'Hide' : 'Show'} Create Form
						</Button>
						<Button 
							variant="outline" 
							onclick={() => toggleForm('edit')}
						>
							{showForm && formMode === 'edit' ? 'Hide' : 'Show'} Edit Form
						</Button>
					</div>
					
					{#if showForm}
						<JournalEntryForm
							entry={formMode === 'edit' ? data.mockEntries[0] : null}
							onSave={handleSave}
							onCancel={handleCancel}
						/>
					{/if}
				</CardContent>
			</Card>
		</section>

		<!-- Basic UI Components -->
		<section>
			<Card>
				<CardHeader>
					<CardTitle>Basic UI Components</CardTitle>
				</CardHeader>
				<CardContent class="space-y-6">
					<!-- Buttons -->
					<div class="space-y-2">
						<h4 class="font-medium">Button Variants</h4>
						<div class="flex flex-wrap gap-2">
							<Button>Default</Button>
							<Button variant="secondary">Secondary</Button>
							<Button variant="outline">Outline</Button>
							<Button variant="ghost">Ghost</Button>
							<Button variant="destructive">Destructive</Button>
							<Button variant="link">Link</Button>
						</div>
					</div>

					<!-- Input Components -->
					<div class="space-y-2">
						<h4 class="font-medium">Input Components</h4>
						<div class="max-w-md space-y-2">
							<Input placeholder="Text input example" />
							<Textarea placeholder="Textarea example" rows={3} />
						</div>
					</div>

					<!-- Mood Selection -->
					<div class="space-y-2">
						<h4 class="font-medium">Mood Selection</h4>
						<div class="flex flex-wrap gap-2">
							{#each ['😊 Happy', '😢 Sad', '🤩 Excited', '😰 Anxious', '🙏 Grateful', '😠 Angry', '😌 Peaceful'] as mood}
								<Button variant="outline" size="sm">{mood}</Button>
							{/each}
						</div>
					</div>
				</CardContent>
			</Card>
		</section>

		<!-- Journal Entry Cards -->
		<section>
			<Card>
				<CardHeader>
					<CardTitle>Journal Entry Cards</CardTitle>
				</CardHeader>
				<CardContent>
					<p class="text-muted-foreground mb-4">
						Different moods and content lengths to test component flexibility.
					</p>
				</CardContent>
			</Card>

			<div class="space-y-4">
				{#each data.mockEntries as entry (entry.id)}
					<JournalEntryCard
						{entry}
						onEdit={handleEdit}
						onDelete={handleDelete}
						class="max-w-2xl mx-auto"
					/>
				{/each}
			</div>
		</section>

		<!-- Mobile Responsive Testing -->
		<section>
			<Card>
				<CardHeader>
					<CardTitle>Mobile Responsive Testing</CardTitle>
				</CardHeader>
				<CardContent>
					<p class="text-muted-foreground mb-4">
						Test this page at different viewport sizes to verify mobile responsiveness:
					</p>
					<ul class="text-sm text-muted-foreground space-y-1">
						<li>• Mobile: 375px - 768px</li>
						<li>• Tablet: 768px - 1024px</li>
						<li>• Desktop: 1024px+</li>
					</ul>
				</CardContent>
			</Card>
		</section>
	</main>
</div>