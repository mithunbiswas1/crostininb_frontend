import SocialButton from "./SocialButton";

export default function SocialAuthButtons() {
  return (
    <>
      <div className="flex items-center gap-3 text-sm text-gray-500 mb-10">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-gray_accent">Or</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>
      <div className="mt-4 space-y-3">
        <SocialButton
          accent="text-[#d93025]"
          icon="/svg/Google.svg"
          label="Sign in with Google"
        />
        <SocialButton
          accent="text-[#1977f3]"
          icon="/svg/Facebook.svg"
          label="Sign in with Facebook"
        />
        <SocialButton
          accent="text-gray_deep"
          icon="/svg/Microsoft.svg"
          label="Sign in with Microsoft"
        />
        <SocialButton icon="/svg/Apple.svg" label="Sign in with Apple" />
      </div>
    </>
  );
}
