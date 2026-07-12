import { LinkButton } from "@/components/ui/LinkButton";

export const metadata = {
  title: `404 - Page Not Found | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  description:
    "Sorry, the page you are looking for does not exist. Please return to homepage or browse products.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/404`,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-xl text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-3">Page Not Found</h2>

        <LinkButton href="/" variant="primary">
          Go Home
        </LinkButton>
      </div>
    </main>
  );
}
