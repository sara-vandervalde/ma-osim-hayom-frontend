import { Compass } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="max-w-lg mx-auto mt-10 flex flex-col items-center gap-5 bg-white rounded-3xl shadow-lg p-10 text-center">
      <span className="grid place-items-center w-20 h-20 rounded-full bg-mint" aria-hidden="true">
        <Compass className="w-10 h-10 text-brand" />
      </span>
      <h1 className="text-3xl md:text-4xl font-extrabold text-ink">העמוד לא נמצא</h1>
    </div>
  )
}
