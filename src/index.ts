// Based on https://developers.cloudflare.com/workers/examples/bulk-redirects/

export default {
  async fetch(request): Promise<Response> {
    const targetApiBaseUrl = "https://xblvulfnrlbhmjenqysx.supabase.co/functions/v1/scores";

    const requestURL = new URL(request.url);

		const targetUrl = new URL(requestURL.pathname + requestURL.search, targetApiBaseUrl).toString()
		console.log(`Redirected to targetUrl ${targetUrl}`)
		
		return Response.redirect(targetUrl, 302);
  },
} satisfies ExportedHandler;
