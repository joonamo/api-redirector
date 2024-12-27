// Based on https://developers.cloudflare.com/workers/examples/bulk-redirects/

export default {
	async fetch(request): Promise<Response> {
		const targetApiBaseUrl = 'https://xblvulfnrlbhmjenqysx.supabase.co/functions/v1/scores';

		const requestURL = new URL(request.url);

		const targetUrl = new URL(requestURL.pathname + requestURL.search, targetApiBaseUrl).toString();
		console.log(`Redirected to targetUrl ${targetUrl}`);

		const headers = new Headers();
		headers.set('Cache-Control', 'max-age=3600');
		const res = new Response(null, {
			status: 301,
			headers: {
				'Cache-Control': 'max-age=3600',
				Location: targetUrl,
			},
		});

		return res;
	},
} satisfies ExportedHandler;
