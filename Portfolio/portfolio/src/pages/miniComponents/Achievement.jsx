
import axios from "axios";
import React, { useEffect, useState } from "react";

const Achievement = () => {
  const [acheivement, setacheivement] = useState([]);
  useEffect(() => {
    const getMyacheivement = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/acheivement/getall",
        { withCredentials: true }
      );
      console.log(data);
      setacheivement(data.Acheivements);
    };
    getMyacheivement();
  }, []);
  return (
    <div>
    <h1 className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
      lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit">Achievements</h1>
      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {acheivement &&
          acheivement.map((element) => {
            return (
              <li className="mb-10 ms-6" key={element._id}>
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <svg
                    className="w-2.5 h-2.5 text-black dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    >
                    <circle cx="8" cy="8" r="3" />
                    </svg>

                </span>
                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {element.title}
                </h3>
              </li>
            );
          })}
      </ol>
    </div>
  );
};

export default Achievement;
