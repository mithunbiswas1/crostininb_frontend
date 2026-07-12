export default function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50 z-50">
      {/* Dual-color Spinner */}
      <div className="animate-spin h-16 w-16 rounded-full border-4 border-t-primary border-b-primary"></div>
    </div>
  );
}
