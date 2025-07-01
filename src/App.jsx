import { useState } from "react";
import APIForm from "./components/APIForm";
import Gallery from "./components/Gallery";
import "./App.css";

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

const inputsInfo = [
  "Input a link to any website you would like to take a screenshot of. Do not include https or any protocol in the URL",
  "Input which image format you would prefer for your screenshot: jpeg, png, or webp",
  "Input true or false if you would like your website screenshot to not contain any ads",
  "Input true or false if you would like your website screenshot to not contain those annoying 'allow cookies' banners",
  "Choose the width of your screenshot (in pixels)",
  "Choose the height of your screenshot (in pixels)",
];

function App() {
  const [inputs, setInputs] = useState({
    url: "",
    format: "",
    no_ads: "",
    no_cookie_banners: "",
    width: "",
    height: "",
  });
  const [currentImage, setCurrentImage] = useState(null);
  const [prevImages, setPrevImages] = useState([]);
  const [quota, setQuota] = useState(null);

  const reset = () => {
    setInputs({
      url: "",
      format: "",
      no_ads: "",
      no_cookie_banners: "",
      width: "",
      height: "",
    });
  };

  const getQuota = async () => {
    const quotaUrl = `https://api.apiflash.com/v1/urltoimage/quota?access_key=${ACCESS_KEY}`;
    try {
      const response = await fetch(quotaUrl);
      const json = await response.json();
      setQuota(json);
    } catch (err) {
      setQuota(null);
    }
  };

  const callAPI = async (query) => {
    try {
      const response = await fetch(query);
      const json = await response.json();
      if (!json.url) {
        alert("Could not take screenshot. Please check your URL and try again.");
      } else {
        setCurrentImage(json.url);
        setPrevImages((images) => [...images, json.url]);
        reset();
        getQuota();
      }
    } catch (err) {
      alert("An error occurred. Please try again.");
    }
  };

  const makeQuery = () => {
    let wait_until = "network_idle";
    let response_type = "json";
    let fail_on_status = "400%2C404%2C500-511";
    let url_starter = "https://";
    let fullURL = url_starter + inputs.url;
    let query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${fullURL}&format=${inputs.format}&width=${inputs.width}&height=${inputs.height}&no_cookie_banners=${inputs.no_cookie_banners}&no_ads=${inputs.no_ads}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;
    callAPI(query).catch(console.error);
  };

  const submitForm = (e) => {
    if (e) e.preventDefault();
    let defaultValues = {
      format: "jpeg",
      no_ads: "true",
      no_cookie_banners: "true",
      width: "1920",
      height: "1080",
    };
    if (!inputs.url) {
      alert("Please enter a URL!");
      return;
    } else {
      for (const [key, value] of Object.entries(inputs)) {
        if (value === "") {
          inputs[key] = defaultValues[key];
        }
      }
      makeQuery();
    }
  };

  return (
    <div className="whole-page">
      <h1>Build Your Own Screenshot! 📸</h1>
      {quota && (
        <div className="quota">
          <strong>Quota:</strong> {quota.remaining} / {quota.limit} left
        </div>
      )}
      <APIForm
        inputs={inputs}
        handleChange={(e) =>
          setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value.trim(),
          }))
        }
        onSubmit={submitForm}
        inputsInfo={inputsInfo}
      />
      <br />
      {currentImage ? (
        <img className="screenshot" src={currentImage} alt="Screenshot returned" />
      ) : (
        <div> </div>
      )}
      <div className="container">
        <h3> Current Query Status: </h3>
        <p>
          https://api.apiflash.com/v1/urltoimage?access_key=ACCESS_KEY
          <br />
          &url={inputs.url} <br />
          &format={inputs.format} <br />
          &width={inputs.width}
          <br />
          &height={inputs.height}
          <br />
          &no_cookie_banners={inputs.no_cookie_banners}
          <br />
          &no_ads={inputs.no_ads}
          <br />
        </p>
      </div>
      <br />
      <div className="container">
        <h2>Your Screenshot Gallery!</h2>
        <Gallery images={prevImages} />
      </div>
    </div>
  );
}

export default App;