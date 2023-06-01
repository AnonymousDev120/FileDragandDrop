import React, { useEffect, useRef, useState } from "react";
import "./CreateRabbitHoles.css";
import { useCreateContext } from "../Context/CreateContext";

const CreateRabbitHoles = () => {
  const { bookData, setBookData, createBookList, setCreateBookList } =
    useCreateContext();
  const inputRef = useRef(null);
  const dragItemRef = useRef([]);
  const [bookArray, setBookArray] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  function deleteFromList(deleteData, orgArray, setFun, i) {
    if (setFun === "book") {
      const filteredArray = orgArray.filter((item) => item !== deleteData);
      console.log(filteredArray);
      setBookData(filteredArray);
    } else if (setFun === "create") {
      const filteredArray = orgArray.filter((item, index) => index !== i);

      setCreateBookList(filteredArray);
    }
  }

  function divideArray(array, size) {
    var arr = [];
    for (let i = 0; i < array.length; i += size) {
      arr.push(array.slice(i, i + size));
    }
    return arr;
  }

  const handleDragStart = (e, b) => {
    const checkbox = e.target.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      //   dragItemRef.current = b;
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", ""); // Required for Firefox compatibility
    } else {
      e.preventDefault();
    }
  };

  const handleCreateDrop = () => {
    try {
      const b = dragItemRef.current;
      console.log("Dropped book:", b);
      //   dragItemRef.current = [];
      setCreateBookList([...createBookList, ...b]);
    } catch {}
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    // Do something with the dropped files, such as uploading them
    console.log("Dropped files:", files);
    setBookData([...bookData, ...files]);
  };
  const handleButtonClick = () => {
    console.log(inputRef.current.value);
    console.log(bookData);
    console.log(dragItemRef.current);
  };
  useEffect(() => {
    console.log(divideArray(bookData, 5));
    setBookArray(divideArray(bookData, 5));
  }, [bookData]);
  return (
    <div className="createRh">
      <h4>Drag File Upload</h4>
      <div className="createRh__container">
        <div className="createRh__FileUpload">
          <form>
            <input type="text" ref={inputRef} />
            <button type="button" onClick={handleButtonClick}>
              OK
            </button>
          </form>
          <div
            className="createRh__FileUpload__dragBox"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <h2>Drag And Drop the file here to upload</h2>
          </div>
        </div>
        <div className="createRh__Uploaded">
          {bookArray.map((a, index) => {
            if (pageNumber === index + 1) {
              return (
                <div id={index + 1} className="bookList__cont">
                  {a.map((b) => (
                    <div
                      key={b.name}
                      draggable
                      className="createRh__bookList"
                      onDragStart={(e) => handleDragStart(e, b)}
                    >
                      <input
                        onChange={(e) => {
                          if (e.target.checked) {
                            console.log("OK");
                            dragItemRef.current.push(b);
                          } else {
                            console.log("Not OK");
                            dragItemRef.current = dragItemRef.current.filter(
                              (item) => item !== b
                            );
                          }
                        }}
                        type="checkbox"
                        value={b.name}
                      />
                      <p>{b.name}</p>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          deleteFromList(b, bookData, "book");
                        }}
                        className="deleteFromBookList"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              );
            }
          })}
          {bookArray.map((b, index) => {
            return (
              <button
                onClick={() => {
                  dragItemRef.current = [];
                  setPageNumber(index + 1);
                }}
                className={`PaginationBtn ${
                  pageNumber == index + 1 && "active"
                }`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
        <div className="createRh__CreateNew">
          <input type="text" />
          <div
            className="createRh__createBookList"
            onDragOver={handleDragOver}
            onDrop={handleCreateDrop}
          >
            {createBookList.map((c, index) => {
              return (
                <>
                  <h1>{c.name}</h1>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      deleteFromList(c, createBookList, "create", index);
                    }}
                    className="deleteFromCreateBookList"
                  >
                    X
                  </button>
                </>
              );
            })}
          </div>
          <button>OK</button>
        </div>
      </div>
    </div>
  );
};

export default CreateRabbitHoles;
