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
      aria-label={`Select ${variant.variant_label}`}
      aria-pressed={isSelected}
      className={`w-9 h-9 rounded-full border-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent ${
        isSelected ? 'border-ink scale-110' : 'border-line'
      }`}
      style={{ backgroundColor: swatchColor }}
    />
  )
}