import '@/styles/app.css'

export const metadata = {
  title: 'Chicken29',
  description: 'Chicken29',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>{children}</>
  )
}
