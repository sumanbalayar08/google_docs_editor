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
        <div className="add-docs-main">
          <button className="add-docs" onClick={handleOpen}>
            <img src="/images/add.png"/>
          </button>
          <span id="blank">Blank Document</span>
        </div>
      </div>

      <div className="docs-single-2">
        <div className="recent-title">Recent Documents</div>
        <div className="grid-main">
          {data && data.length > 0 ? (
            data.map((dat, id) => {
              return (
                <Link to={`/doc/${dat.iddocs}`} className="grid-single">
                  <p>{dat.title}</p>
                  <p>{dat.content}</p>
                </Link>
              );
            })
          ) : (
            <p>No documents Available Right Now</p>
          )}
        </div>
      </div>

      <Modal open={open} setOpen={setOpen} title={title} setTitle={setTitle} />
    </div>
  );
}
