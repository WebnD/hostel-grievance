import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">IIT Bhubaneswar</h3>
            <p className="text-sm text-gray-300">
              Argul, Jatni<br />
              Khordha, Odisha<br />
              PIN: 752050
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-300 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-sm text-gray-300 hover:text-white">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/guidelines" className="text-sm text-gray-300 hover:text-white">
                  Guidelines
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-sm text-gray-300 hover:text-white">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm text-gray-300 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-300">
                Email: grievance@iitbbs.ac.in
              </li>
              <li className="text-sm text-gray-300">
                Phone: +91 674 713 6XXX
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-sm text-center text-gray-400">
            © {new Date().getFullYear()} IIT Bhubaneswar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

