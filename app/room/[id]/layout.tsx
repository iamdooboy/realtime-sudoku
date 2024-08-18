export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='max-w-screen-lg w-full h-full sm:h-fit'>
      {children}
    </div>
  )
}
