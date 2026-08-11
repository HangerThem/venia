interface StorageAdapter {
	get(name: string): Promise<string | null>;
	set(name: string, value: string, maxAgeSeconds?: number): Promise<void>;
	delete(name: string): Promise<void>;
}

const documentCookieAdapter: StorageAdapter = {
	async get(name) {
		const match = document.cookie
			.split('; ')
			.find((row) => row.startsWith(`${name}=`));
		return match ? decodeURIComponent(match.split('=').slice(1).join('=')) : null;
	},
	async set(name, value, maxAgeSeconds = 60 * 60 * 24 * 365) {
		document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
	},
	async delete(name) {
		document.cookie = `${name}=; path=/; max-age=0`;
	},
};

const cookieStoreAdapter: StorageAdapter = {
	async get(name) {
		const item = await window.cookieStore.get(name);
		return item?.value ?? null;
	},
	async set(name, value, maxAgeSeconds = 60 * 60 * 24 * 365) {
		await window.cookieStore.set({
			name,
			value,
			path: '/',
			expires: Date.now() + maxAgeSeconds * 1000,
			sameSite: 'lax',
		});
	},
	async delete(name) {
		await window.cookieStore.delete(name);
	},
};

export function getStorageAdapter(): StorageAdapter | null {
	if (typeof window === 'undefined') return null;
	if ('cookieStore' in window) return cookieStoreAdapter;
	if (typeof document !== 'undefined') return documentCookieAdapter;
	return null;
}