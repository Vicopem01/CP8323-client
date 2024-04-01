import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import SendMessage from "@/public/send-message.svg";
import Image from "next/image";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setNewChats } from "@/store/reducers/chat.reducer";
import CircleLoader from "@/components/loader";
import ErrorHandler from "@/components/errorHandler";
import Blobs from "@/components/blobs";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const chats = useSelector((el) => el.chats);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea.scrollHeight > textarea.clientHeight) {
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, []);

  const handleInput = (e) => {
    const textarea = textareaRef.current;
    if (textarea.scrollHeight > textarea.clientHeight) {
      textarea.style.height = textarea.scrollHeight + "px";
    }
    setInputValue(e.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submit action
    handleServerSubmit();
  };

  const handleServerSubmit = async () => {
    setLoading(true);
    let query = inputValue;
    try {
      const response = await axios.post(
        "https://cp8323-server.onrender.com/query",
        { userString: inputValue }
      );
      dispatch(setNewChats({ question: query, answer: response.data }));
      setInputValue("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      ErrorHandler(null, "Failed to receive response from the server.");
    }
  };

  const handleKeyDown = (event) => {
    // Check if the Enter key was pressed along with the Command or Control key
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      handleServerSubmit();
    }
  };

  return (
    <>
      <Head>
        <title>CP8323 - Advanced Natural Language Processing</title>
      </Head>
      <main
        className={`min-h-screen h-screen min-w-screen flex items-center justify-center flex-col pt-24 px-10 md:px-24 ${inter.className}`}
      >
        <Blobs />
        <h2 className="text-center text-2xl font-bold">
          CP8323 - Advanced Natural Language Processing
        </h2>
        <div className="overflow-auto w-[65%]">
          {chats.map((data, idx) => (
            <div key={idx}>
              <div>
                <span className="bg-[#575a7b] text-sm px-2 py-1 rounded-md">
                  User
                </span>
                <p className="mt-1">{data.question}</p>
              </div>
              <div className="mt-4 mb-10">
                <span className="bg-[#6658ea] text-sm px-2 py-1 rounded-md">
                  Model
                </span>
                <p className="mt-1">{data.answer.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-5xl w-full text-md mt-10">
          <form
            onSubmit={handleFormSubmit}
            className="flex items-center justify-center"
          >
            <div
              className={`gradient-1 rounded-[5px] inline-block w-full relative max-w-full md:max-w-md`}
            >
              <textarea
                ref={textareaRef}
                placeholder="Type question..."
                className={`peer border block max-h-60 h-10 w-full rounded-md p-2 focus:outline-none bg-black text-white resize-none text-lg`}
                onChange={handleInput}
                value={inputValue}
                spellCheck={true}
                onKeyDown={handleKeyDown}
              ></textarea>
              <div
                className={`gradient-1 transition-300 absolute inset-0 -z-10 h-[calc(100%+3px)] w-[calc(100%+3px)] rounded-2xl opacity-0 blur-lg peer-focus:opacity-80`}
              ></div>
            </div>
            <div className="ml-4">
              {loading ? (
                <CircleLoader />
              ) : (
                <button type="submit" className="bg-transparent">
                  <Image src={SendMessage} alt="Send Message" />
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Home;
