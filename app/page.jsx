'use client'

import React from 'react'
import Feed from '@Components/Feed'

function Home() {
    return (
        <>
        <section className='w-full flex-center flex-col'>
           <h1 className='head_text text-center'>
            Discover & Share
            <br className='max md:hidden' />
            <span className = "orange_gradient text-center">AI-Powered Prompts</span>
           </h1>
           <p className='desc text-center'>
            Explore a vast library of AI-powered prompts, curated to inspire creativity and spark new ideas.
           </p>

            <Feed />

        </section>
        
        </>
    )
}

export default Home
