import type { PageServerLoad, Actions } from './$types';
import { requireAuth } from '$lib/auth';
import { JournalService } from '$lib/server/journal';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	const { user } = requireAuth(event);
	
	const entries = await JournalService.getUserEntries(user.id);
	
	return {
		entries
	};
};

export const actions: Actions = {
	default: async (event) => {
		const { user } = requireAuth(event);
		const formData = await event.request.formData();
		const action = formData.get('action') as string;

		try {
			if (action === 'create') {
				const title = formData.get('title') as string;
				const content = formData.get('content') as string;
				const mood = formData.get('mood') as string;
				const tagsJson = formData.get('tags') as string;
				
				if (!title || !content) {
					return fail(400, { error: 'Title and content are required' });
				}

				const tags = tagsJson ? JSON.parse(tagsJson) : [];
				
				await JournalService.createEntry(user.id, {
					title,
					content,
					mood: mood || undefined,
					tags
				});

				return { success: true };
			}

			if (action === 'update') {
				const id = formData.get('id') as string;
				const title = formData.get('title') as string;
				const content = formData.get('content') as string;
				const mood = formData.get('mood') as string;
				const tagsJson = formData.get('tags') as string;
				
				if (!id || !title || !content) {
					return fail(400, { error: 'ID, title and content are required' });
				}

				const tags = tagsJson ? JSON.parse(tagsJson) : [];
				
				await JournalService.updateEntry(id, user.id, {
					title,
					content,
					mood: mood || undefined,
					tags
				});

				return { success: true };
			}

			if (action === 'delete') {
				const id = formData.get('id') as string;
				
				if (!id) {
					return fail(400, { error: 'Entry ID is required' });
				}
				
				await JournalService.deleteEntry(id, user.id);
				return { success: true };
			}

			return fail(400, { error: 'Invalid action' });
		} catch (error) {
			console.error('Journal action error:', error);
			return fail(500, { error: 'Internal server error' });
		}
	}
};