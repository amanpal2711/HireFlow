const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables.')
  console.error('Create .env.local with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  console.log('Testing Supabase connection...')
  console.log('URL:', supabaseUrl)
  console.log('Key exists:', Boolean(supabaseAnonKey))

  try {
    const { error } = await supabase.from('jobs').select('count').limit(1)

    if (error) {
      console.error('Connection failed:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      return
    }

    console.log('Connection successful.')

    const { data: jobsData, error: jobsError } = await supabase.from('jobs').select('*').limit(5)

    if (jobsError) {
      console.error('Jobs table error:', jobsError)
      return
    }

    console.log(`Jobs table exists with ${jobsData.length} sample records.`)

    const tables = ['applications', 'profiles', 'notifications']
    for (const table of tables) {
      const { error: tableError } = await supabase.from(table).select('count').limit(1)
      console.log(tableError ? `${table}: ${tableError.message}` : `${table}: found`)
    }
  } catch (err) {
    console.error('Unexpected error:', err)
  }
}

testConnection()
