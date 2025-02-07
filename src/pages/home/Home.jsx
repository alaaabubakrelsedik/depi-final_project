import { useState, useEffect } from "react";  
import { Card, Button } from 'react-bootstrap'; 
import "./home.css"

import img1 from "../../assets/Img/1ccb97a0e0ede31b7b647b5c9ff9a704.jpg"
import img2 from "../../assets/Img/69c2800fc1f2de6801b309783e07a6be.jpg"
import img3 from "../../assets/Img/1e483f98534240f240ce82abf1b4fa83.jpg"
const Home = () => {
//////////////// carousel
  const images = [ img1, img2, img3  ]
      const [currentIndex, setCurrentIndex] = useState(0);
    const nextimg =()=>{
      setCurrentIndex((currentIndex+1)%images.length)
    }
    const previmg =()=>{
      setCurrentIndex((currentIndex)===0? images.length-1: currentIndex-1)
    }

    const getThreeImages = (index) => {
      const nextIndex = (index + 1) % images.length;
      const nextNextIndex = (index + 2) % images.length;
  
      return [images[index], images[nextIndex], images[nextNextIndex]];
    };
  
    const [image1, image2, image3] = getThreeImages(currentIndex); 

//////////////// carouselend
/////////fetch data

  const [data, setData] = useState([]); // State for fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [query, setQuery] = useState("");

  useEffect(() => {

     fetch("/data/db.json")
     .then(response=>response.json())
     .then((data) => {
      setData(data.blogs); // Extract the "posts" array
      setLoading(false); // Set loading to false (data is ready)
    })
    .catch((error) => {
      setError(error.message); // Store error message in state
      setLoading(false); // Stop loading (even if there's an error)
    });

  }, []); 

const getfiltereditems =(query,data)=>{
  if (!query) {
    return data;
  }
  return data.filter(posts=>posts.title.toLowerCase().includes(query.toLowerCase()))
}

const filtereditems =getfiltereditems(query,data || [])
 

  
    

  return (
    <>  
      <h1>Your Journey,Your Way</h1>
      <p>Discover the World's Treasures with Travila  </p>
      
        <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
        />
      </div>

      {/* Show Loading/Error Messages */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Display Filtered Items */}
      <div className="results  ">
        {filtereditems.length > 0 ? (
          filtereditems.map((data) => (
            <Card   key={data.id} className="result-card d-flex flex-wrap ">
              <Card.Body className="result-card-body m-2 col-3 d-flex">
                <Card.Title>{data.title}</Card.Title>
                <Card.Text>{data.content.text}</Card.Text>
                <img
                  src={data.content.image}
                  alt="Author"
                  className="img-fluid "
                />
               <Card.Text>{data.author.name}</Card.Text>
               <img
                  src={data.author.profilePicture}
                  alt="Author"
                  className="img-fluid rounded-circle"
                  style={{ width: "50px", height: "50px" }}
                />

                
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>



      
      <div className="text-center mb-4">
      <button onClick={previmg} className="btn btn-secondary mx-2">Prev</button>
      <button onClick={nextimg} className="btn btn-primary mx-2">Next</button>
      </div>

      <div className=" d-flex justify-content-around height: '150px'">

        {/* Display 3 images side by side */}
        <Card style={{ width: '25rem',position: 'relative'  }} className="m-2 ">
            <Card.Img className="cardimg "variant="top" src={image1} alt="Image 1"  />
            
            <Card.Text className="p-3 cardtxt position-absolute bottom-0 w-100  ">
                  <Card.Title>Grand Canyon Horseshoe </Card.Title>
                  <Card.Text >7days 6nights - smallgroup    </Card.Text>
                  <div className=" p-3 d-flex position-relative"> 
                      <Card.Text>$ 15.63 /person    </Card.Text>
                      <Button variant="primary" className="ms-auto" >Book Now</Button>
                  </div>
                  </Card.Text>
        </Card>
        <Card style={{ width: '25rem',position: 'relative'  }} className="m-2 ">
            <Card.Img className="cardimg "variant="top" src={image2} alt="Image 1"  />
            
            <Card.Text className="p-3 cardtxt position-absolute bottom-0 w-100  ">
                  <Card.Title>Grand Canyon Horseshoe </Card.Title>
                  <Card.Text >7days 6nights - smallgroup    </Card.Text>
                  <div className=" p-3 d-flex position-relative"> 
                      <Card.Text>$ 15.63 /person    </Card.Text>
                      <Button variant="primary" className="ms-auto" >Book Now</Button>
                  </div>
                  </Card.Text>
        </Card>
        <Card style={{ width: '25rem',position: 'relative'  }} className="m-2 ">
            <Card.Img className="cardimg "variant="top" src={image3} alt="Image 1"  />
            
            <Card.Text className="p-3 cardtxt position-absolute bottom-0 w-100  ">
                  <Card.Title>Grand Canyon Horseshoe </Card.Title>
                  <Card.Text >7days 6nights - smallgroup    </Card.Text>
                  <div className=" p-3 d-flex position-relative"> 
                      <Card.Text>$ 15.63 /person    </Card.Text>
                      <Button variant="primary" className="ms-auto" >Book Now</Button>
                  </div>
                  </Card.Text>
        </Card>
       

      </div>



     






    </>
  );
};

export default Home;
