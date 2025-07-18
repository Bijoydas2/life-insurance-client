import { FaFacebookF, FaLinkedinIn, FaTwitter, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-10 pb-6">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">

        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">LifeSecure</h2>
          <p className="text-sm leading-6">
            Your trusted partner in securing your family's future. We make insurance simple, accessible, and transparent.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-secondary transition">Home</a></li>
            <li><a href="/policies" className="hover:text-secondary transition">All Policies</a></li>
            <li><a href="/blogs" className="hover:text-secondary transition">Articles</a></li>
            <li><a href="/login" className="hover:text-secondary transition">Login</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-secondary" /> support@lifesecure.com
            </li>
            <li className="flex items-center gap-2">
              <FaPhone className="text-secondary" /> +880 1234 567 890
            </li>
            <li className="text-sm">Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 text-white">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="bg-secondary p-2 rounded-full hover:opacity-90">
              <FaFacebookF />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="bg-secondary p-2 rounded-full hover:opacity-90">
              <FaLinkedinIn />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="bg-secondary p-2 rounded-full hover:opacity-90">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/30 mt-10 pt-4 text-center text-sm text-white">
        &copy; {new Date().getFullYear()} LifeSecure. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
