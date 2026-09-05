import LoginClient from './login-client'

export const metadata = {
  title: 'Sign in',
  description: 'Secure access to your GTA LORE archive identity.',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return <LoginClient />
}
