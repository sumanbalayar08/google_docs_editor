import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Docs() {
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/');
        setData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleOpen = () => setOpen(true);
  return (
    <div className="docs-main">
      <h1>Docs Clone</h1>

      <button className="add-docs" onClick={handleOpen}>
        Add a Document
      </button>

      <div className="grid-main">
        {data.map((dat,id)=>{
            return (
                <Link to={`/doc/${dat.iddocs}`} className="grid-single">
                    <p>{dat.title}</p>
                    <p>{dat.content}</p>
                </Link>
            )
        })}
      </div>

      <Modal open={open} setOpen={setOpen} title={title} setTitle={setTitle} />
    </div>
  );
}
