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
        const response = await axios.get("http://localhost:4000/");
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpen = () => setOpen(true);
  return (
    <div className="docs-main">
      <div className="docs-single-1">
        <div>Start a New Document</div>
        <button className="add-docs" onClick={handleOpen}>
          Add a Document
        </button>
      </div>

      <div className="docs-single-2">
        <div>Recent Documents</div>
        <div className="grid-main">
          {data.map((dat, id) => {
            return (
              <Link to={`/doc/${dat.iddocs}`} className="grid-single">
                <p>{dat.title}</p>
                <p>{dat.content}</p>
              </Link>
            );
          })}
        </div>
      </div>

      <Modal open={open} setOpen={setOpen} title={title} setTitle={setTitle} />
    </div>
  );
}
