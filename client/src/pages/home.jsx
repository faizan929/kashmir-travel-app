

import SearchBar from "../components/SearchBar";
import CardList from "../components/CardList";

import './Home.css'

function Home(){
   
    return(
        <> 
            
            <div className="hero-section">
                <img src="./images/dal-lake.jpg" alt="Dal Lake" className="hero-image" />            
                <div className="hero-text">
                    {/* <h1 className="first-heading">Asi ti Lassi</h1> */}
                   
                    <p className="info">Explore beautiful places, book cabs and hotels, travel stress-free.</p>
                        <button className="explore-btn" onClick={()=>{
                            const el = document.getElementById("search-bar");
                            if (el) {
                            el.scrollIntoView({behavior:"smooth"});
                            }
                        }}>Explore Now </button>
                 </div>
            </div>

            <div className="explore">  
                <SearchBar />            
                < CardList />
            </div>

           


        </>
         
    );
}

export default Home;