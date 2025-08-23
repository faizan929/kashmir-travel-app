
function SearchBar() {
    return (
        <div 
            className="w-full max-w-2xl mx-auto mb-8 px-4" 
            id="search-bar"
        >
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search places, hotels, cabs..."
                    className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-lg transition duration-200 pl-12"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;