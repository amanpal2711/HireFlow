import { auth, currentUser } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(): Promise<NextResponse> {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://wyayswgiivpuwyeazdsl.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
  )

  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      email: user.emailAddresses[0]?.emailAddress,
      full_name: `${user.firstName} ${user.lastName}`.trim(),
      avatar_url: user.imageUrl,
      role: 'candidate'
    })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
