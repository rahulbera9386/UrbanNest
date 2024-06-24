import React from 'react'
import { Footer } from "flowbite-react";


const FooterDiv = () => {
  return (
    
        <Footer container className='bg-gray-400 text-xl font-semibold flex justify-between'>
          <p>Made with ❤️ By Rahul Bera</p>
          <Footer.LinkGroup className='flex gap-6'>
            <Footer.Link>About</Footer.Link>
            <Footer.Link>Privacy Policy</Footer.Link>
            <Footer.Link>Licensing</Footer.Link>
            <Footer.Link>Contact</Footer.Link>
          </Footer.LinkGroup>
        </Footer>
  )
}

export default FooterDiv