import RamChecker from './RamChecker'

export const metadata = {
  title: 'RAM Checker',
  description: 'Check if your system RAM meets the requirements for popular dev tools.',
}

export default function CheckerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-3">RAM Checker</h1>
      <p className="text-gray-500 text-lg mb-10">
        Select how much RAM your machine has and see which tools & frameworks you can run comfortably.
      </p>
      <RamChecker />
    </div>
  )
}
