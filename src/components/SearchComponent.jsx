import React, { useState } from 'react';
import { Search, Calendar, Users } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const cities = [
  "Mumbai", "Delhi", "Bangalore", "Kolkata", "Chennai", "Hyderabad",
  "Ahmedabad", "Pune", "Jaipur", "Lucknow", "Kanpur", "Nagpur",
  "Surat", "Vadodara", "Indore", "Thane", "Bhopal", "Coimbatore",
  // Add more cities as needed
];

const SearchComponent = () => {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(null);
  const [persons, setPersons] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);

  const handleCityChange = (e) => {
    const value = e.target.value;
    setDestination(value);
    
    if (value) {
      const filtered = cities.filter(city => 
        city.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  };

  const handleCitySelect = (city) => {
    setDestination(city);
    setFilteredCities([]);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search:', { destination, date, persons });
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col md:flex-row items-center justify-center bg-white rounded-lg shadow-md overflow-hidden mt-40 p-4 z-20"
    >
      <div className="relative flex items-center border-b md:border-b-0 md:border-r p-2 w-full md:w-1/4">
        <Search className="text-black-400 mr-2" />
        <input
          type="text"
          placeholder="City of Destination"
          value={destination}
          onChange={handleCityChange}
          className="w-full focus:outline-none p-1 text-black bg-white"
        />
        {filteredCities.length > 0 && (
          <ul className="absolute bg-white border border-gray-300 rounded-lg w-full mt-1 max-h-48 overflow-y-auto shadow-lg z-10">
            {filteredCities.map((city) => (
              <li
                key={city}
                onClick={() => handleCitySelect(city)}
                className="p-2 text-black hover:bg-blue-200 cursor-pointer" // Set text color to black
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex items-center border-b md:border-b-0 md:border-r p-2 w-full md:w-1/4">
        <Calendar className="text-gray-400 mr-2" />
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          placeholderText="Select Date"
          className="w-full focus:outline-none p-1 text-black"
          minDate={new Date()} // Disable past dates
        />
      </div>
      <div className="flex items-center p-2 w-full md:w-1/4">
        <Users className="text-gray-400 mr-2" />
        <input
          type="number"
          placeholder="No. of Persons"
          value={persons}
          onChange={(e) => setPersons(e.target.value)}
          className="w-full focus:outline-none p-1 text-black"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 flex items-center justify-center hover:bg-blue-500 transition-colors duration-300 w-full md:w-auto"
      >
        <Search className="mr-2" />
        Find Trip Now
      </button>
    </form>
  );
};

export default SearchComponent;



