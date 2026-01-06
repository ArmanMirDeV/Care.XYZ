import Link from 'next/link';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Care.xyz</h3>
            <p className="text-sm">
              Providing reliable and trusted care services for children, elderly, and family members. 
              Making caregiving easy, secure, and accessible for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/baby-care" className="hover:text-white transition-colors">
                  Baby Care
                </Link>
              </li>
              <li>
                <Link href="/services/elderly-care" className="hover:text-white transition-colors">
                  Elderly Care
                </Link>
              </li>
              <li>
                <Link href="/services/sick-care" className="hover:text-white transition-colors">
                  Sick People Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <FaPhone className="w-4 h-4" />
                <span>+880 1234 567890</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope className="w-4 h-4" />
                <span>info@care.xyz</span>
              </li>
              <li className="flex items-start space-x-2">
                <FaMapMarkerAlt className="w-4 h-4 mt-1" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-white transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Care.xyz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

