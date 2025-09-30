<script lang="ts">
	import { Card, CardHeader, CardTitle, CardContent } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Save, X } from 'lucide-svelte';
	import type { JournalEntry } from '$lib/server/db/schema';

	interface $$Props {
		entry?: JournalEntry | null;
		onSave: (data: {
			title: string;
			content: string;
			mood: string;
			tags: string[];
		}) => Promise<void>;
		onCancel: () => void;
		class?: string;
	}

	export let entry: $$Props['entry'] = null;
	export let onSave: $$Props['onSave'];
	export let onCancel: $$Props['onCancel'];
	export let className: $$Props['class'] = undefined;

	let title = entry?.title || '';
	let content = entry?.content || '';
	let mood = entry?.mood || '';
	let tagsInput = '';

	$: if (entry) {
		title = entry.title;
		content = entry.content;
		mood = entry.mood || '';
		const parsedTags = entry.tags ? JSON.parse(entry.tags) : [];
		tagsInput = parsedTags.join(', ');
	}

	const moods = [
		{ value: '', label: 'Select mood', emoji: '📝' },
		{ value: 'happy', label: 'Happy', emoji: '😊' },
		{ value: 'sad', label: 'Sad', emoji: '😢' },
		{ value: 'excited', label: 'Excited', emoji: '🤩' },
		{ value: 'anxious', label: 'Anxious', emoji: '😰' },
		{ value: 'grateful', label: 'Grateful', emoji: '🙏' },
		{ value: 'angry', label: 'Angry', emoji: '😠' },
		{ value: 'peaceful', label: 'Peaceful', emoji: '😌' }
	];

	let saving = false;

	async function handleSubmit() {
		if (!title.trim() || !content.trim()) return;

		saving = true;
		try {
			const tags = tagsInput
				.split(',')
				.map(tag => tag.trim())
				.filter(tag => tag.length > 0);

			await onSave({
				title: title.trim(),
				content: content.trim(),
				mood: mood || '',
				tags
			});
		} finally {
			saving = false;
		}
	}
</script>

<Card class="w-full {className}">
	<CardHeader>
		<div class="flex items-center justify-between">
			<CardTitle>{entry ? 'Edit Entry' : 'New Journal Entry'}</CardTitle>
			<Button variant="ghost" size="icon" onclick={onCancel} aria-label="Cancel">
				<X class="h-4 w-4" />
			</Button>
		</div>
	</CardHeader>
	
	<CardContent class="space-y-4">
		<form on:submit|preventDefault={handleSubmit} class="space-y-4">
			<!-- Title -->
			<div class="space-y-2">
				<label for="title" class="text-sm font-medium">Title</label>
				<Input
					id="title"
					bind:value={title}
					placeholder="What's on your mind?"
					required
				/>
			</div>

			<!-- Mood -->
			<div class="space-y-2">
				<label for="mood" class="text-sm font-medium">Mood</label>
				<select
					id="mood"
					bind:value={mood}
					class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
				>
					{#each moods as moodOption}
						<option value={moodOption.value}>
							{moodOption.emoji} {moodOption.label}
						</option>
					{/each}
				</select>
			</div>

			<!-- Content -->
			<div class="space-y-2">
				<label for="content" class="text-sm font-medium">Content</label>
				<Textarea
					id="content"
					bind:value={content}
					placeholder="Share your thoughts..."
					rows={6}
					required
				/>
			</div>

			<!-- Tags -->
			<div class="space-y-2">
				<label for="tags" class="text-sm font-medium">Tags</label>
				<Input
					id="tags"
					bind:value={tagsInput}
					placeholder="personal, goals, reflection (comma separated)"
				/>
				<p class="text-xs text-muted-foreground">
					Separate tags with commas
				</p>
			</div>

			<!-- Actions -->
			<div class="flex gap-2 pt-4">
				<Button
					type="submit"
					disabled={!title.trim() || !content.trim() || saving}
					class="flex-1"
				>
					<Save class="mr-2 h-4 w-4" />
					{saving ? 'Saving...' : 'Save Entry'}
				</Button>
				<Button type="button" variant="outline" onclick={onCancel}>
					Cancel
				</Button>
			</div>
		</form>
	</CardContent>
</Card>