import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq, desc, and } from 'drizzle-orm';
import { generateId } from 'lucia';

export interface CreateJournalEntryData {
	title: string;
	content: string;
	mood?: string;
	tags?: string[];
}

export interface UpdateJournalEntryData {
	title?: string;
	content?: string;
	mood?: string;
	tags?: string[];
}

export class JournalService {
	static async createEntry(userId: string, data: CreateJournalEntryData) {
		const id = generateId(15);
		const now = new Date();
		
		const entry: table.JournalEntry = {
			id,
			userId,
			title: data.title,
			content: data.content,
			mood: data.mood || null,
			tags: data.tags ? JSON.stringify(data.tags) : null,
			createdAt: now,
			updatedAt: now
		};

		await db.insert(table.journalEntry).values(entry);
		return entry;
	}

	static async getUserEntries(userId: string, limit = 20) {
		return db
			.select()
			.from(table.journalEntry)
			.where(eq(table.journalEntry.userId, userId))
			.orderBy(desc(table.journalEntry.createdAt))
			.limit(limit);
	}

	static async getEntry(entryId: string, userId: string) {
		const [entry] = await db
			.select()
			.from(table.journalEntry)
			.where(
				and(
					eq(table.journalEntry.id, entryId),
					eq(table.journalEntry.userId, userId)
				)
			);
		return entry || null;
	}

	static async updateEntry(entryId: string, userId: string, data: UpdateJournalEntryData) {
		const updates: Partial<table.JournalEntry> = {
			updatedAt: new Date()
		};

		if (data.title !== undefined) updates.title = data.title;
		if (data.content !== undefined) updates.content = data.content;
		if (data.mood !== undefined) updates.mood = data.mood || null;
		if (data.tags !== undefined) updates.tags = data.tags ? JSON.stringify(data.tags) : null;

		await db
			.update(table.journalEntry)
			.set(updates)
			.where(
				and(
					eq(table.journalEntry.id, entryId),
					eq(table.journalEntry.userId, userId)
				)
			);

		return this.getEntry(entryId, userId);
	}

	static async deleteEntry(entryId: string, userId: string) {
		await db
			.delete(table.journalEntry)
			.where(
				and(
					eq(table.journalEntry.id, entryId),
					eq(table.journalEntry.userId, userId)
				)
			);
	}

	static parseTags(tagsJson: string | null): string[] {
		if (!tagsJson) return [];
		try {
			return JSON.parse(tagsJson);
		} catch {
			return [];
		}
	}
}