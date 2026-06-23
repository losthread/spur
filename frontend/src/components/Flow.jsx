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
    <section id="how-it-works" className="grid grid-cols-1 lg:grid-cols-2 items-center px-6 pt-10 gap-10 lg:gap-20 lg:px-20 lg:pt-20">
      <div className="flex flex-1 lg:gap-10 flex-col">
        <div className="flex flex-col lg:gap-3">
          <h4 className="lg:text-lg text-amber-600/80 tracking-widest" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>HOW IT WORKS</h4>
          <h2 className="text-xl lg:text-5xl">Three simple steps</h2>
        </div>

        <div className="flex flex-col md:gap-6 lg:gap-8 lg:max-w-2xl">
          {flow.map((step, idx) => (
            <div key={step.title} className="relative flex items-center gap-4 lg:gap-6 group">
              {/* Vertical line connector */}
              {idx !== flow.length - 1 && (
                <div className="absolute left-6 top-15 lg:left-5 lg:top-12 w-0.5 h-16 lg:h-16 bg-linear-to-b from-amber-600/50 to-transparent"></div>
              )}
              
              {/* Number circle */}
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-4xl border lg:w-10 lg:h-10 lg:rounded-full lg:border-2 border-amber-600 bg-black flex items-center justify-center text-amber-600 font-bold shrink-0 group-hover:bg-amber-600 group-hover:text-black group-hover:shadow-lg group-hover:shadow-amber-600/50 transition-all duration-300 relative z-10">
                {idx + 1}
              </div>
              
              {/* Content */}
              <div className="flex flex-col gap-2 md:gap-1 mt-5 lg:gap-0 group-hover:translate-x-2 transition-transform duration-300">
                <h3 className="font-semibold md:text-lg lg:text-lg text-white group-hover:text-amber-600 transition-colors">{step.title}</h3>
                <p className="text-muted-foreground text-sm md:text-base lg:text-base">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex md:ml-10 items-center flex-1 aspect-video lg:rounded-lg border border-amber-600/20 overflow-hidden bg-black/50 max-w-2xl">
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