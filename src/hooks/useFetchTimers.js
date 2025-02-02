import { useState, useEffect } from "react";
import axios from "axios";

const useFetchTimers = () => {
  const [timers, setTimers] = useState([]);

  useEffect(() => {
    axios.get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => {
        const fetchedTimers = response.data.categories.map((category) => ({
          name: category.strCategory,
          duration: Math.floor(Math.random() * 600) + 180,
        }));
        setTimers(fetchedTimers);
      })
      .catch((error) => console.error("Error fetching timers:", error));
  }, []);

  return timers;
};

export default useFetchTimers;
