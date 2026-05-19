import { SignUp } from '@clerk/nextjs'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <SignUp 
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
