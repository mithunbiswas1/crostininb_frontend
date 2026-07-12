// src/app/(home)/_components/BannerVideoBack.jsx

export const BannerVideoBack = () => {
  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ objectPosition: "center" }}
      >
        <source
          src="https://static-content.owner.com/09294816-03af-4332-96de-91c6a9722d7e.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" />
    </div>
  );
};
