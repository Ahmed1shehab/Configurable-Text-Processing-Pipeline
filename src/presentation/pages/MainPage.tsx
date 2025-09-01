import React from 'react'
import TextProcessingPipeline from '../components/TextProcessingPipeline'
import Footer from '../components/layouts/Footer'
import { Header } from '../components/layouts/Header'

export const MainPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <Header />

            <main className="flex-grow space-y-8 pt-20">
                <TextProcessingPipeline />
            </main>

            <Footer />
        </div>
    )
}
