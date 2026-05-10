const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const { name, email, storage_needed, timeline } = JSON.parse(event.body)

  const { data, error } = await supabase
    .from('glacier_leads')
    .insert([{ name, email, storage_needed, timeline }])

  if (error) {
    return { statusCode: 500, body: JSON.stringify(error) }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Lead submitted successfully' })
  }
}