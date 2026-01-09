import React, { useState } from 'react';
import { MapPin, Calendar, Search, Tag, Compass, NotebookTabs, Facebook, Twitter, X, Star } from 'lucide-react';
import { useNavigate ,} from 'react-router-dom';
import { useRef } from "react"
import heroImage from "../asserts/img2.png"
import NavBar from '../components/Navbar';
import { COLORS } from '../constants/colorConstants'

// --- Helper Components ---

// Component for the hero image (using a simple div with background image)
const HeroImage = ({ src, alt }) => (
  <div
    className="w-full h-auto aspect-square rounded-xl shadow-xl overflow-hidden hover:scale-101 transition-transform ease-in "
    
  >
    <div className='object-cover '> <img  src={heroImage} alt='image'></img>
    </div>
  
  
  </div>
);

// --- Search Bar Component with Tabs ---
const SearchBar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Flights');
  const tabs = ['Flights', 'Hotels', 'Itineraries'];  
   
  const InputField = ({ icon: Icon, placeholder }) => (
   
    <label className="flex flex-col w-full">
      <div className="flex w-full flex-1 items-stretch rounded-lg h-12 bg-gray-50 border border-gray-200 focus-within:ring-2 focus-within:ring-gray-900 transition hover:scale-103 transition-transform ease-in  ">
        <div className="text-gray-500 flex items-center justify-center pl-4 pr-2">
          <Icon size={20} />
        </div>
        <input 
        
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-gray-800 focus:outline-0 border-none bg-transparent h-full placeholder:text-gray-400 pl-0 text-base font-normal" 
          placeholder={placeholder}
        />
      </div>
    </label>
  );

  const handleSubmit = () => {
    navigate("/signup");
  }

  return (
    <section className="py-8">
      <div className="w-full bg-white p-6 rounded-xl shadow-2xl border border-gray-100 hover:scale-101 transition-transform ease-in-out">
        {/* Tabs for Flights, Hotels, Itineraries */}
        <div className="flex items-center gap-6 mb-6 border-b border-gray-200">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-1 text-sm font-semibold transition duration-200 ${
                activeTab === tab
                  ? `border-b-2 border-gray-900 text-gray-900`
                  : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        {/* Input Grid for Search */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] gap-4">
          <InputField icon={MapPin} placeholder="From" />
          <InputField icon={MapPin} placeholder="where" />
          <InputField icon={Calendar} placeholder="date" />
          
          <button  onClick={()=>navigate("/signup")}  className={`flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-transparent text-gray-900 border border-gray-400 hover:border-gray-900 text-sm font-bold transition duration-200`}    style={{ backgroundColor: COLORS.primary }} 
          >
            <Search size={20} className="mr-2  rounded-xl shadow-2xl  hover:scale-102" />
            <span onClick={handleSubmit} >   Search</span>
          
          </button>
        </div>
      </div>
    </section>
  );
};

// --- Feature Card Component ---
const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="flex flex-1 flex-col gap-4 rounded-xl bg-white p-6 shadow-md border border-gray-100 hover:shadow-lg transition duration-300">
    <div style={{ color: COLORS.secondary }} className="text-4xl">
      <Icon size={36} strokeWidth={1.5} />
    </div>
    <div className="flex flex-col gap-2">
      <h2 className={`text-lg font-bold leading-tight`} style={{ color: COLORS.textDark }}>{title}</h2>
      <p className="text-sm font-normal leading-relaxed text-gray-600">{description}</p>
    </div>
  </div>
);

// --- NEW Testimonials Component ---
const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Wanderlust completely changed how I plan trips. The itinerary builder saved me hours, and the flight deals were unbeatable. Highly recommend!",
      name: "Alex P.",
      location: "San Francisco, CA",
      rating: 5,
    },
    {
      quote: "Seamless booking and brilliant local recommendations. Our European vacation felt perfectly tailored to our interests. Five stars!",
      name: "Maria G.",
      location: "New York, NY",
      rating: 5,
    },
    {
      quote: "The smart search feature found a hidden gem hotel that I never would have discovered otherwise. Best travel platform I've used.",
      name: "David K.",
      location: "London, UK",
      rating: 4,
    },
  ];

  const StarRating = ({ rating }) => (
    <div className="flex items-center space-x-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? `fill-yellow-500 text-yellow-500` : 'text-gray-300'}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );

  
};


// --- Main App Component ---
const App = () => {
 const bottomRef = useRef(null); // STEP 1: Reference bana lo

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" }); // STEP 2
  };

const navigate=useNavigate();


  const features = [
    {
      icon: Tag,
      title: 'Best Deals',
      description: 'Find exclusive offers and curated travel packages tailored to your preferences.',
    },
    {
      icon: Compass,
      title: 'Smart Search',
      description: "Benefit from intelligent filtering and personalized results to find exactly what you're looking for.",
    },
    {
      icon: NotebookTabs,
      title: 'Travel Planner',
      description: 'Use our intuitive itinerary builder and management tools to organize your perfect trip.',
    },
  ];





  return (
    <div style={{ backgroundColor: COLORS.backgroundLight }} className="font-sans text-gray-800 min-h-screen">
      <div className="flex flex-1 justify-center">
        <div className="layout-content-container flex flex-col w-full max-w-6xl flex-1 px-4 sm:px-8">
          
          <NavBar />
          
          <main className="flex-grow">
            {/* Hero Section */}
            <section className="py-16 sm:py-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col gap-8 text-center lg:text-left">
                  <div className="flex flex-col gap-4">
                    <h1 className={`text-5xl font-extrabold leading-tight tracking-tighter md:text-6xl hover:scale-103 transition-transform ease-in `} style={{ color: COLORS.textDark }}>
                      Your Journey, Reimagined.
                    </h1>
                    <h2 className="text-lg font-normal leading-normal text-gray-600 hover:scale-103 transition-transform ease-in ">
                      Discover, plan, and book your perfect trip with our intelligent travel platform.
                    </h2>
                  </div>
                  <a>
                  <div className="flex justify-center lg:justify-start">
                    <button   className={`flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-8 text-gray-900 text-base font-bold transition duration-200  hover:scale-103 transition-transform ease-in `} style={{ backgroundColor: COLORS.primary }}    >
                      <span onClick={()=>navigate("#bottombutton")}  className="truncate hover:scale-103 transition-transform ease-in " >Explore Deals</span> 
                    </button>
                  </div>
                </a>
                </div>
               <HeroImage
               alt='image'/>
                
              </div>
            </section>
            
            {/* Search Bar Section */}
            <SearchBar />
            
            {/* Feature Section */}
            <section className="py-16 sm:py-24">
              <div className="flex flex-col gap-12">
                <div className="flex flex-col gap-4 text-center">
                  <h1 className={`text-3xl font-bold leading-tight tracking-tighter sm:text-4xl`} style={{ color: COLORS.textDark }}>
                    Everything You Need to Travel Smarter
                  </h1>
                  <p className="text-base font-normal leading-normal text-gray-600 max-w-3xl mx-auto sm:text-lg">
                    Our platform is designed to make your travel planning seamless and enjoyable from start to finish.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {features.map((feature, index) => (
                    <FeatureCard 
                      key={index}
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* NEW TESTIMONIALS COMPONENT ADDED HERE */}
            <TestimonialsSection />
            
            {/* CTA Section */}
            <section className="py-16 sm:py-24">
              <div 
                style={{ backgroundColor: `${COLORS.primary}30` }} 
                className="rounded-xl p-8 sm:p-16 shadow-xl/10"
              >
                <div className="flex flex-col items-center justify-center gap-6 text-center">
                  <div className="flex flex-col gap-2">
                    <h1 className={`text-3xl font-black leading-tight tracking-tighter sm:text-4xl`} style={{ color: COLORS.textDark }}>
                      Ready to Plan Your Next Adventure?
                    </h1>
                    <p className="text-base font-normal leading-normal text-gray-600 max-w-xl mx-auto sm:text-lg">Sign up today and start exploring a world of possibilities.</p>
                  </div>
                  <div className="flex justify-center"  id='bottombutton'>
                    <button onClick={()=>navigate("/signup")} className={`flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-8 text-gray-900 text-base font-bold transition duration-200 hover:opacity-90`} style={{ backgroundColor: COLORS.primary }}>
                      <span  onClick={()=>navigate("/signup")}className="truncate">Sign Up Now</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </main>
          
          {/* Footer */}
          <footer className="py-12 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500">© 2024 Wanderlust. All rights reserved.</p>
              
              <div className="flex items-center gap-6">
                {['About', 'Contact', 'FAQ', 'Terms of Service'].map(link => (
                  <a key={link} className="text-sm text-gray-500 hover:text-gray-900 transition duration-200" href="#">{link}</a>
                ))}
              </div>
              
              <div className="flex items-center gap-4">
                {/* Social Icons (using lucide-react) */}
                <a className="text-gray-500 hover:text-gray-900 transition duration-200" href="#"><Facebook size={20} /></a>
                <a className="text-gray-500 hover:text-gray-900 transition duration-200" href="#"><Twitter size={20} /></a>
                <a className="text-gray-500 hover:text-gray-900 transition duration-200" href="#"><X size={20} /></a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;