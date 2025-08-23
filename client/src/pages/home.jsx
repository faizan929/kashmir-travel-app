

import SearchBar from "../components/SearchBar";
import CardList from "../components/CardList";



function Home(){
   
    return(
        <> 
            
            <div className="relative h-screen flex items-center justify-center overflow-hidden">
                <img 
                    src="./images/dal-lake.jpg" 
                    alt="Dal Lake" 
                    className="absolute inset-0 w-full h-full object-cover"
                 />    

                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                

                <div className="relative z-10 text-center text-white px-4 max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                        KashmirTravel
                    </h1>

                    <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                        Explore beautiful places, book cabs and hotels, travel stress-free.
                    </p>
                    <button 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-lg" 
                        onClick={()=>{
                            const el = document.getElementById("search-bar");
                            if (el) {
                            el.scrollIntoView({behavior:"smooth"});
                            }
                        }}
                    >
                        Explore Now 
                    </button>
                 </div>
                 <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>

            <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <SearchBar />            
                    < CardList />
                </div>
            </div>
        </>
         
    );
}

export default Home;