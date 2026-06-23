const flow = [
  {
    title: "Shorten",
    description: "Drop in a long URL. Spur returns a short code you can share in seconds."
  },
  {
    title: "Share",
    description: "Put your link in a post, an email, an ad, or a doc. It works everywhere."
  },
  {
    title: "Track",
    description: "Open the stats for any link to see clicks, and timings as they happen."
  }
];

export default function Flow() {
  return (
    <section id="how-it-works" className="flex items-center lg:gap-20 lg:px-20 lg:pt-20">
      <div className="flex flex-1 lg:gap-10 flex-col">
        <div className="flex flex-col lg:gap-3">
          <h4 className="lg:text-lg text-amber-600/80 tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>HOW IT WORKS</h4>
          <h2 className="lg:text-5xl">Three simple steps</h2>
        </div>

        <div className="flex flex-col lg:gap-8 lg:max-w-2xl">
          {flow.map((step, idx) => (
            <div key={step.title} className="relative flex lg:gap-6 group">
              {/* Vertical line connector */}
              {idx !== flow.length - 1 && (
                <div className="absolute left-5 top-12 lg:w-0.5 lg:h-16 bg-linear-to-b from-amber-600/50 to-transparent"></div>
              )}
              
              {/* Number circle */}
              <div className="lg:w-10 lg:h-10 lg:rounded-full lg:border-2 border-amber-600 bg-black flex items-center justify-center text-amber-600 font-bold shrink-0 group-hover:bg-amber-600 group-hover:text-black group-hover:shadow-lg group-hover:shadow-amber-600/50 transition-all duration-300 relative z-10">
                {idx + 1}
              </div>
              
              {/* Content */}
              <div className="lg:pb-4 group-hover:translate-x-2 transition-transform duration-300">
                <h3 className="font-semibold lg:text-lg text-white group-hover:text-amber-600 transition-colors">{step.title}</h3>
                <p className="text-muted-foreground lg:text-base lg:mt-2">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex-1 aspect-video lg:rounded-lg border border-amber-600/20 overflow-hidden bg-black/50 max-w-2xl">
        <video
          className="w-full h-full object-cover"
          controls
          muted
          loop
        >
          <source src="/tut.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  )
}