<script lang="ts">
	import { Card, CardHeader, CardTitle, CardContent } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Calendar, Edit, Trash2, Tag } from 'lucide-svelte';
	import type { JournalEntry } from '$lib/server/db/schema';
	import { parseTags } from '$lib/utils';

	interface $$Props {
		entry: JournalEntry;
		onEdit?: (entry: JournalEntry) => void;
		onDelete?: (entryId: string) => void;
		class?: string;
	}

	export let entry: $$Props['entry'];
	export let onEdit: $$Props['onEdit'] = undefined;
	export let onDelete: $$Props['onDelete'] = undefined;
	export let className: $$Props['class'] = undefined;

	$: tags = parseTags(entry.tags);
	$: formattedDate = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	}).format(entry.createdAt);

	$: moodEmoji = getMoodEmoji(entry.mood);

	function getMoodEmoji(mood: string | null): string {
		switch (mood) {
			case 'happy':
				return '😊';
			case 'sad':
				return '😢';
			case 'excited':
				return '🤩';
			case 'anxious':
				return '😰';
			case 'grateful':
				return '🙏';
			case 'angry':
				return '😠';
			case 'peaceful':
				return '😌';
			default:
				return '📝';
		}
	}
</script>

<Card class="w-full {className}">
	<CardHeader class="pb-3">
		<div class="flex items-start justify-between">
			<div class="flex items-center gap-2">
				<span class="text-lg">{moodEmoji}</span>
				<CardTitle class="text-lg">{entry.title}</CardTitle>
			</div>
			<div class="flex gap-1">
				{#if onEdit}
					<Button
						variant="ghost"
						size="icon"
						class="h-8 w-8"
						onclick={() => onEdit?.(entry)}
						aria-label="Edit entry"
					>
						<Edit class="h-4 w-4" />
					</Button>
				{/if}
				{#if onDelete}
					<Button
						variant="ghost"
						size="icon"
						class="h-8 w-8 text-destructive hover:text-destructive"
						onclick={() => onDelete?.(entry.id)}
						aria-label="Delete entry"
					>
						<Trash2 class="h-4 w-4" />
					</Button>
				{/if}
			</div>
		</div>
		
		<div class="flex items-center gap-2 text-sm text-muted-foreground">
			<Calendar class="h-4 w-4" />
			<span>{formattedDate}</span>
		</div>
	</CardHeader>
	
	<CardContent class="pt-0">
		<div class="prose prose-sm max-w-none">
			<p class="whitespace-pre-wrap text-sm leading-relaxed">{entry.content}</p>
		</div>
		
		{#if tags.length > 0}
			<div class="mt-4 flex flex-wrap gap-1">
				{#each tags as tag}
					<span class="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-xs">
						<Tag class="h-3 w-3" />
						{tag}
					</span>
				{/each}
			</div>
		{/if}
	</CardContent>
</Card>