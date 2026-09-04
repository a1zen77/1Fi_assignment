const COLOR_SWATCH_MAP = {
  'Cosmic Orange': '#d97b3f',
  'Silver': '#e4e4e4',
  'Deep Blue': '#3b4a6b',
  'Titanium Black': '#2b2b2b',
  'Titanium Gray': '#8a8a8a',
  'Obsidian': '#1a1a1a',
  'Porcelain': '#f2ede4',
}

export default function VariantSwatch({ variant, isSelected, onSelect }) {
  const swatchColor = COLOR_SWATCH_MAP[variant.color] || '#cccccc'
  return (
    <button
      type="button"
      onClick={() => onSelect(variant)}
      title={variant.variant_label}
      className={`w-8 h-8 rounded-full border-2 transition-all ${
        isSelected ? 'border-gray-800 scale-110' : 'border-gray-200'
      }`}
      style={{ backgroundColor: swatchColor }}
    />
  )
}