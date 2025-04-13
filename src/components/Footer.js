// Footer.js

import React from 'react';
import { FaTwitter, FaInstagram, FaWhatsapp, FaPhone, FaThreads } from 'react-icons/fa6';
import './styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
        <FaTwitter />
      </a>
      <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
        <FaInstagram />
      </a>
      <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer">
        <FaWhatsapp />
      </a>
      <a href="tel:0712345678">
        <FaPhone />
      </a>
      <a href="https://www.threads.net/" target="_blank" rel="noopener noreferrer">
        <FaThreads />
      </a>
    </footer>
  );
}
