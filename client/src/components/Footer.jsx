import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-900 py-4 px-6">
        <div className="text-center">
          <p className='text-white font-serif'>&copy; {new Date().getFullYear()} Share Gizz. All rights reserved.</p>
          <p className='text-white'>
            <a href="/terms" className="text-blue-400 hover:text-white transition-colors duration-200 font-serif">Terms of Service</a> |
            <a href="/contact" className="text-blue-400 hover:text-white transition-colors duration-200 font-serif"> Contact Us</a>
          </p>
        </div>
      </footer>
  )
}

export default Footer
