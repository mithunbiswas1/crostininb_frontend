import PageBanner from "@/components/shared/PageBanner";
import FavoriteList from "./_components/FavoriteList";

export default function DiningRoomPage() {
  return (
    <main>
      <PageBanner
        title="Our Dining Room"
        subtitle="Experience elegance and comfort in our beautifully designed dining space, where every meal becomes a memorable occasion."
        backgroundImage="/menu/menu_banner.jpg"
      />

      <FavoriteList />
    </main>
  );
}
