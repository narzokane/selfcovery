import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

/**
 * Validates that a user is authenticated. Redirects to login if not.
 * This function should be called in every page load function that requires authentication.
 */
export function requireAuth(event: RequestEvent) {
	if (!event.locals.user || !event.locals.session) {
		throw redirect(302, '/login');
	}
	return { user: event.locals.user, session: event.locals.session };
}

/**
 * Gets the current user and session if authenticated, otherwise returns null.
 * Use this for optional authentication.
 */
export function getAuth(event: RequestEvent) {
	return {
		user: event.locals.user,
		session: event.locals.session
	};
}