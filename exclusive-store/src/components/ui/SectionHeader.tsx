interface SectionHeaderProps {
  tag: string;
  title: string;
  showArrows?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  actionLabel?: string;
  onAction?: () => void;
}

export default function SectionHeader({
  tag,
  title,
  showArrows,
  onPrev,
  onNext,
  actionLabel,
  onAction,
}: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-4 h-8 bg-[#4EA674] rounded-sm inline-block" />
        <span className="text-[#4EA674] text-sm font-semibold">{tag}</span>
      </div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        <div className="flex items-center gap-3">
          {showArrows && (
            <div className="flex gap-2">
              <button
                onClick={onPrev}
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors text-lg"
              >
                ←
              </button>
              <button
                onClick={onNext}
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors text-lg"
              >
                →
              </button>
            </div>
          )}
          {actionLabel && (
            <button
              onClick={onAction}
              className="bg-[#4EA674] text-white text-sm px-6 py-2 rounded hover:bg-[#3d8f63] transition-colors"
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
