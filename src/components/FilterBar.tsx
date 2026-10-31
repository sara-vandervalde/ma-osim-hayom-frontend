import { categoryLabels } from "../labels"
import type { Category } from "../types"
import { SlidersHorizontal, ChevronDown } from "lucide-react"


type Props = {
  value: Category | ''
  onChange: (category: Category | '') => void
}

export default function CategoryFilter({ value, onChange}:Props){
  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl shadow-sm px-4 py-2.5">
      <label className="flex items-center gap-2 font-bold text-ink"><SlidersHorizontal className="w-5 h-5 text-brand" aria-hidden="true" />קטגוריה: </label>
      <div className="relative">
        <select value={value} onChange={(e) =>  onChange(e.target.value as Category | '')} className="appearance-none cursor-pointer rounded-xl border-2 border-line bg-mint/40 ps-4 pe-10 py-2 text-base font-medium transition focus:outline-none focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15">
          <option value="">הכל</option>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        <ChevronDown className="absolute top-1/2 -translate-y-1/2 end-3 w-4 h-4 text-ink-soft pointer-events-none" aria-hidden="true" />
      </div>
    </div>
  )
}
