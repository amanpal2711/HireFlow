import { SignIn } from '@clerk/nextjs'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <SignIn 
        routing="hash"
        forceRedirectUrl="/candidate"
        appearance={{
          elements: {
            rootBox: 'mx-auto',
            card: 'shadow-none border border-border rounded-xl'
          }
        }}
      />
    </div>
  )
}
