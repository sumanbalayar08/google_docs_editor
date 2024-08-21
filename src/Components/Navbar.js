import React, { useEffect, useState } from "react";
import { IoExtensionPuzzleSharp, IoSearchSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value); // Corrected line to use event.target.value
  };

  useEffect(() => {
    if (searchTerm && searchTerm.length > 0) {
        axios
          .get(`http://localhost:4000/search?term=${encodeURIComponent(searchTerm)}`)
          .then((response) => {
            setResults(response.data);
          })
          .catch((error) => {
            console.error("Error fetching the data", error);
          });
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  console.log(searchTerm);

  return (
    <div className="navbar-main">
      <Link to="/" className="home-title">
        <h2>Docs Clone</h2>
      </Link>
      <div className="input-align">
        <div className="icon-container">
          <IoSearchSharp size={20} />
        </div>
        <input
          placeholder="Search the Document"
          className="input-box"
          value={searchTerm}
          onChange={handleSearch}
        />
        {searchTerm && (
          <ul className="dropdown-list">
            {results.map((result) => (
              <li key={result.id} className="dropdown-item">
                <Link to={`/doc/${result.iddocs}`}>{result.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <IoExtensionPuzzleSharp size={30} />
      </div>
    </div>
  );
};

export default Navbar;
