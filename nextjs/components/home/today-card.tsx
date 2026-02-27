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
      
      {/* SVG 图标 - 默认显示，带旋转动画 */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[3] pointer-events-none animate-spin-slow">
        <div className="text-[6rem] md:text-[8rem] leading-none" style={{ width: '8rem', height: '8rem' }}>
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', contentVisibility: 'visible' }}>
            <defs>
              <clipPath id="__lottie_element_2"><rect width="500" height="500" x="0" y="0"></rect></clipPath>
              <linearGradient id="__lottie_element_6" spreadMethod="pad" gradientUnits="userSpaceOnUse" x1="-135" y1="19" x2="134.5" y2="-3">
                <stop offset="0%" stopColor="rgb(0,145,150)"></stop><stop offset="5%" stopColor="rgb(47,157,173)"></stop><stop offset="11%" stopColor="rgb(94,169,197)"></stop><stop offset="17%" stopColor="rgb(142,205,130)"></stop><stop offset="23%" stopColor="rgb(189,241,63)"></stop><stop offset="30%" stopColor="rgb(222,227,40)"></stop><stop offset="37%" stopColor="rgb(255,213,16)"></stop><stop offset="42%" stopColor="rgb(255,197,28)"></stop><stop offset="48%" stopColor="rgb(255,182,40)"></stop><stop offset="54%" stopColor="rgb(255,136,37)"></stop><stop offset="61%" stopColor="rgb(255,91,34)"></stop><stop offset="67%" stopColor="rgb(255,68,129)"></stop><stop offset="74%" stopColor="rgb(255,45,223)"></stop><stop offset="81%" stopColor="rgb(164,115,233)"></stop><stop offset="88%" stopColor="rgb(73,185,243)"></stop><stop offset="94%" stopColor="rgb(57,189,247)"></stop><stop offset="100%" stopColor="rgb(40,193,250)"></stop>
              </linearGradient>
            </defs>
            <g clipPath="url(#__lottie_element_2)">
              <g transform="matrix(1.6770009994506836,0,0,1.6770009994506836,-168.750244140625,-165.7444610595703)" opacity="1" style={{ display: 'block' }}>
                <g opacity="1" transform="matrix(1,0,0,1,252,245.91799926757812)">
                  <path stroke="url(#__lottie_element_6)" strokeLinecap="round" strokeLinejoin="round" fillOpacity="0" strokeOpacity="1" strokeWidth="9.000009955208622" d=" M-136.5659942626953,38.12799835205078 C-119.71700286865234,27.10300064086914 -85.06099700927734,1.3079999685287476 -81.85099792480469,-26.16200065612793 C-79.42400360107422,-46.94300079345703 -98.572998046875,-44.137001037597656 -101.4260025024414,-23.01300048828125 C-103.75700378417969,-5.755000114440918 -109.59600067138672,40.56100082397461 -109.59600067138672,40.56100082397461 C-109.59600067138672,40.56100082397461 -103.97899627685547,-0.03400000184774399 -85.85099792480469,1.753000020980835 C-65.93599700927734,4.083000183105469 -91.97803497314453,40.04999923706055 -68.99903106689453,40.30500030517578 C-48.5720329284668,40.53200149536133 -27.638999938964844,22.687999725341797 -26.87299919128418,10.942999839782715 C-25.989999771118164,-2.5989999771118164 -44.36199951171875,-4.886000156402588 -50.02199935913086,11.965999603271484 C-55.22600173950195,27.461000442504883 -43.58399963378906,44.902000427246094 -23.540000915527344,40.58100128173828 C7.341000080108643,33.922000885009766 22.482999801635742,-10.82699966430664 23.93600082397461,-26.07699966430664 C25.466999053955078,-42.1619987487793 13.722999572753906,-43.694000244140625 6.573999881744385,-29.39699935913086 C-0.10400000214576721,-16.040000915527344 -11.244999885559082,37.084999084472656 12.958000183105469,41.58300018310547 C41.808998107910156,46.944000244140625 64.2770004272461,-5.906000137329102 67.08599853515625,-23.77899932861328 C69.802001953125,-41.066001892089844 58.65599822998047,-45.95199966430664 50.23400115966797,-30.67300033569336 C41.16600036621094,-14.222999572753906 27.843000411987305,44.07699966430664 59.9370002746582,41.32600021362305 C86.74600219726562,39.02799987792969 76.91600036621094,2.2639999389648438 102.89800262451172,-0.05000000074505806 C114.56199645996094,-1.0880000591278076 119.38600158691406,9.920000076293945 118.53199768066406,21.02899932861328 C117.63800048828125,32.645999908447266 106.66000366210938,42.474998474121094 95.80899810791016,40.94300079345703 C85.89800262451172,39.54399871826172 80.83799743652344,25.972999572753906 83.42500305175781,17.07200050354004 C86.61699676513672,6.093999862670898 96.66200256347656,0.11999999731779099 102.89800262451172,-0.05000000074505806 C111.76599884033203,-0.28999999165534973 116.23400115966797,5.327000141143799 124.14900207519531,5.198999881744385 C131.1790008544922,5.085999965667725 136.71173095703125,-1.3627643585205078 136.71173095703125,-1.3627643585205078"></path>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
