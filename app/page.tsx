import { StartGameDialog } from "./_components/start-game-dialog"
export default function Home() {
  return (
    <main className="h-svh w-full">
      <div className="flex w-full items-center justify-center py-12 lg:grid lg:min-h-[600px] xl:min-h-[800px]">
        <StartGameDialog />
      </div>
    </main>
  )
}
