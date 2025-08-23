

function About() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                        <div className="mb-8">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                                About <span className="text-blue-600">SafarKashmir</span>
                            </h2>
                            <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
                        </div>
                        
                        <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">
                            This app helps you to explore Kashmir - find places, book hotels, and cabs!
                        </p>
                        
                        <div className="grid md:grid-cols-3 gap-8 mt-12">
                            <div className="text-center p-6 rounded-lg bg-blue-50">
                                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Explore Places</h3>
                                <p className="text-gray-600">Discover beautiful destinations in Kashmir</p>
                            </div>
                            
                            <div className="text-center p-6 rounded-lg bg-green-50">
                                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Book Hotels</h3>
                                <p className="text-gray-600">Find comfortable accommodations</p>
                            </div>
                            
                            <div className="text-center p-6 rounded-lg bg-purple-50">
                                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Book Cabs</h3>
                                <p className="text-gray-600">Reliable transportation services</p>
                            </div>
                        </div>
                        
                        <div className="mt-12 text-center">
                            <p className="text-gray-500 italic">
                                "Travel stress-free and explore the paradise on earth"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;