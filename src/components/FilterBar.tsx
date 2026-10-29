import { categoryLabels } from "../labels"
import type { Category } from "../types"


type Props = {
  value: Category | ''
  onChange: (category: Category | '') => void
}

export default function CategoryFilter({ value, onChange}:Props){
  return (
    <div>
      <label>קטגוריה: </label>
      <select value={value} onChange={(e) =>  onChange(e.target.value as Category | '')}>
        <option value="">הכל</option>
        {Object.entries(categoryLabels).map(([key, label]) => (
          <option key={key} value={key}>{label}</option>
        ))}
      </select>
    </div>
  )
}