interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export const GameBanner = ({ bannerUrl, title, adsCount }: GameBannerProps) => {
  return (
    <a href="#" className="relative rounded-lg overflow-hidden hover:translate-y-[-12px] transition-all duration-300">
      <img src={bannerUrl} alt={title} className="w-full" />

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0">
        <strong className="font-bold text-white block">{title}</strong>
        <span className="text-zinc-300 text-sm mt-1 block">
          {adsCount === 0 ? "Nenhum anúncio" : `${adsCount} anúncio${adsCount > 1 ? "s" : ""}`}
        </span>
      </div>
    </a>
  );
};
