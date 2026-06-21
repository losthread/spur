export default function Footer() {
  return (
    <footer className="border-t border-amber-600/20 bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col lg:px-20 lg:pt-12">
        {/* Top section */}
        <div className="grid lg:grid-cols-4 lg:gap-8 lg:mb-12">
          {/* Brand */}
          <div>
            <p className="font-semibold text-white lg:mb-3">Spur</p>
            <p className="text-muted-foreground lg:text-sm">Simple URL shortener with powerful analytics.</p>
          </div>

          {/* Product */}
          <div>
            <p className="font-semibold text-white lg:mb-4">Product</p>
            <ul className="lg:space-y-2 lg:text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-amber-600 transition">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-amber-600 transition">How it Works</a></li>
              <li><a href="#analytics" className="hover:text-amber-600 transition">Analytics</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="font-semibold text-white lg:mb-4">Company</p>
            <ul className="lg:space-y-2 lg:text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-amber-600 transition">About</a></li>
              <li><a href="#" className="hover:text-amber-600 transition">Blog</a></li>
              <li><a href="#" className="hover:text-amber-600 transition">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="font-semibold text-white lg:mb-4">Legal</p>
            <ul className="lg:space-y-2 lg:text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-amber-600 transition">Privacy</a></li>
              <li><a href="#" className="hover:text-amber-600 transition">Terms</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="lg:pt-4 flex items-center justify-between">
          <p className="text-muted-foreground lg:text-sm">© 2026 Spur. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}