export default function TableSkeleton() {
  return (
      <button
        type="button"
        className="py-2 btn-xs rounded-full border-transparent text-xs font-bold  flex justify-between items-center gap-2 btn-disabled"
      >
        <span className="loading loading-dots md:loading-md text-cyan-700"></span>
      </button>
  );
}