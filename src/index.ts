// Based on https://developers.cloudflare.com/workers/examples/bulk-redirects/

export default {
	async fetch(request): Promise<Response> {
		if (request.method === 'OPTIONS') {
      // Handle OPTIONS directly, even if the resource has "moved", browsers don't follow redirects for OPTIONS
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

		const targetApiBaseUrl = 'https://xblvulfnrlbhmjenqysx.supabase.co';

		const requestURL = new URL(request.url);

		const targetUrl = new URL('functions/v1' + requestURL.pathname + requestURL.search, targetApiBaseUrl).toString();
		console.log(`Redirected to targetUrl ${targetUrl}`);

		const headers = new Headers();
		headers.set('Cache-Control', 'max-age=3600');
		const res = new Response(null, {
			status: 307,
			headers: {
				// 'Cache-Control': 'max-age=3600',
				'access-control-allow-origin': '*',
				Location: targetUrl,
			},
		});

		return res;
	},
} satisfies ExportedHandler;
