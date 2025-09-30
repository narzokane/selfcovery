import type { PageServerLoad } from './$types';
import type { JournalEntry } from '$lib/server/db/schema';

export const load: PageServerLoad = async () => {
	// Mock data for visual testing
	const mockEntries: JournalEntry[] = [
		{
			id: 'mock-1',
			userId: 'mock-user',
			title: 'My First Day at the New Job',
			content: `Today was incredible! I started my new position as a Software Developer at TechCorp. The team was so welcoming, and I'm excited about the projects ahead.

The office has a great atmosphere, and my manager gave me a comprehensive overview of what I'll be working on. I feel like this is going to be a great opportunity for growth.

I'm nervous but excited about the challenges ahead. Tomorrow we're diving into the codebase, and I can't wait to contribute!`,
			mood: 'excited',
			tags: '["career", "new-beginnings", "excited"]',
			createdAt: new Date('2024-01-15T09:30:00'),
			updatedAt: new Date('2024-01-15T09:30:00')
		},
		{
			id: 'mock-2',
			userId: 'mock-user',
			title: 'Reflections on Mindfulness',
			content: `Spent some time this morning practicing mindfulness meditation. It's amazing how just 10 minutes of focused breathing can center my entire day.

I've been trying to be more present in my daily activities - really tasting my coffee, feeling the warmth of the sun, listening deeply in conversations.

The anxiety I've been feeling about upcoming deadlines seems more manageable when I approach it from this centered place.`,
			mood: 'peaceful',
			tags: '["mindfulness", "meditation", "personal-growth"]',
			createdAt: new Date('2024-01-14T07:15:00'),
			updatedAt: new Date('2024-01-14T07:15:00')
		},
		{
			id: 'mock-3',
			userId: 'mock-user',
			title: 'Feeling Overwhelmed',
			content: `Today was one of those days where everything felt like too much. The project deadlines are piling up, and I'm struggling to keep up with all the meetings and requirements.

I know this feeling will pass, but right now it's hard to see through the fog. Maybe I need to take a step back and prioritize what's really important.

Talking to my sister helped a bit. She reminded me that it's okay to ask for help and that I don't have to carry everything alone.`,
			mood: 'anxious',
			tags: '["stress", "work", "support"]',
			createdAt: new Date('2024-01-13T18:45:00'),
			updatedAt: new Date('2024-01-13T18:45:00')
		},
		{
			id: 'mock-4',
			userId: 'mock-user',
			title: 'Gratitude for Simple Moments',
			content: `Had a wonderful evening walk in the park today. The autumn leaves were beautiful, and I felt so grateful for these simple moments of peace.

Sometimes the best parts of life are the quiet ones - no agenda, no pressure, just being present with nature and my thoughts.

I'm grateful for:
- Good health
- Family who loves me
- A roof over my head
- The ability to enjoy these small pleasures`,
			mood: 'grateful',
			tags: '["gratitude", "nature", "simple-pleasures"]',
			createdAt: new Date('2024-01-12T19:20:00'),
			updatedAt: new Date('2024-01-12T19:20:00')
		}
	];

	return {
		mockEntries
	};
};