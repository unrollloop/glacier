exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const siteKey = process.env.CLOUDFLARE_TURNSTILE_SITE_KEY

  if (!siteKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Cloudflare Turnstile site key is not configured.' })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ siteKey })
  }
}
