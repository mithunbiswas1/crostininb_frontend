export default function DropdownArrow() {
  return (
    <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="translate-x-[-2px] transform"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}
