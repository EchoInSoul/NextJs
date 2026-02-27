"use client";

export default function TodayCard() {
  const handleClick = () => {
    window.open("https://zeropoint.js.org", "_blank");
  };

  return (
    <div 
      className="today-card relative w-full h-full min-h-[160px] bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden cursor-pointer group"
      onClick={handleClick}
    >
      <div className="today-card-info absolute top-0 left-0 w-full h-full z-[2] p-6 flex flex-col justify-between pointer-events-none">
        <div className="today-card-tips w-fit px-2 py-1 text-xs text-white bg-[rgba(0,0,0,0.5)] rounded-[8px] backdrop-blur-[10px]">
          置顶
        </div>
        <div className="today-card-title text-2xl font-bold text-white leading-tight">
          ZEROPOINT 官方文档
        </div>
      </div>
      <div 
        className="today-card-cover absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('https://upload-bbs.mihoyo.com/upload/2022/10/22/197021670/e727e2a4066263e8df749772d24e776e_2274636367732297640.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/10"></div>
      </div>
    </div>
  );
}
