import  { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const onHandleSubmit = (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('searchTerm', searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
    };
    

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
          setSearchTerm(searchTermFromUrl);
        }
      }, [location.search]);

    return (
        <header className='top-0 left-0 w-full py-3 px-0 text-left bg-pink-500 font-normal leading-6 text-red-500 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto'>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className="text-white">Real estate</span>
                    <span className="text-neutral-500">. MarketPlace</span>
                </h1>

                <form onSubmit={onHandleSubmit} className='bg-white p-3 rounded-lg flex items-center'>
                    <input type="text"
                     placeholder='Search...' 
                     className='bg-transparent focus:outline-none w-24 sm:w-64'
                    
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}

                     />
                     <button>
                     <FaSearch className='text-gray-600 ml-2' />
                     </button>
                  
                </form>

                <ul className='flex gap-4'>
                    <Link to="/">
                        <li className='hidden sm:inline text-white hover:underline'>Home</li>
                    </Link>
                    <Link to="/about">
                        <li className='hidden sm:inline text-white hover:underline'>About</li>
                    </Link>
                    <Link to="/profile">
                    {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className=' text-white hover:underline'> Signin</li>
            )}
                    </Link>
                   
                </ul>
            </div>
        </header>
    );
};

export default Header;
