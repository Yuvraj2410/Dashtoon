import './App.css';
import { useEffect, useState, useSyncExternalStore } from "react";
import Pagination from './Pagination'

function App() {

  const [inputText, setInputText] = useState('');
  const [imageArray, setImageArray] = useState([]);

  // for Pagination
  const [currentPage, setCurrentPage] = useState(1)

  async function query(data) {
    const response = await fetch(
      "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
      {
        headers: {
          "Accept": "image/png",
          "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    return result;
  }

  // useEffect(() => {
  //   searchPanel('');
  // })

  const handleQuery = async () => {
    const response = await query({ "inputs": inputText });
    const imageUrl = URL.createObjectURL(response);

    setImageArray((prevImages) => [...prevImages, imageUrl]);
    // setInputText('');
  };

  // console.log(imageArray);

  return (
    <div>
      {/* for Pagination */}
      <div className='container'>
        <Pagination
          currentPage={currentPage}
          total={10}
          limit={1}
          onPageChange={(page) => setCurrentPage(page)}
          imageArray={imageArray}
        />

      </div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={handleQuery}>Fetch Image</button>
      {/* {imageArray.map((imageSrc, index) => (
        <img key={index} src={imageSrc} alt={`Fetched Image ${index + 1}`} />
      ))} */}
    </div>
  );
}


export default App;
