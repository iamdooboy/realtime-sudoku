import { StartGameForm } from "@/_components/start-game-form"
export default function Home() {
  return (
    <main className="h-svh w-full">
      <div className="w-full lg:grid lg:min-h-[600px] xl:min-h-[800px] flex items-center justify-center py-12">
        <StartGameForm />
      </div>
    </main>
  )
}
