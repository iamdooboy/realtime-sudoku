export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full w-full max-w-screen-lg sm:h-fit">{children}</div>
  )
}
