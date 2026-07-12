import Image from "next/image";
import { Button } from "../../ui/Button";

export default function SocialButton({ icon: Icon, label, accent }) {
  return (
    <Button
      className="flex w-full items-center justify-center gap-3 rounded-md border border-border_gray bg-gray-50 px-4 py-3 text-base font-semibold text-gray-800 shadow-sm transition hover:-translate-y-px hover:shadow md:text-sm hover:cursor-pointer"
      type="button"
    >
      <Image
        src={Icon}
        alt={label}
        width={20}
        height={20}
        className={`text-base ${accent ?? ""}`}
      />
      <span className="leading-[150%] font-medium capitalize">{label}</span>
    </Button>
  );
}
