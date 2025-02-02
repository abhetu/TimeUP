import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Howl } from "howler";
import alarmSound from "../assets/alarm.mp3";
import chimeSound from "../assets/chime.mp3";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";

const Timer = ({ duration, label }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [running, setRunning] = useState(false);
  
  const alarm = new Howl({ src: [alarmSound] });
  const chime = new Howl({ src: [chimeSound] });

  useEffect(() => {
    if (running && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timeLeft === 0) {
      alarm.play();
      chime.play();
    }
  }, [running, timeLeft]);

  return (
    <motion.div
      className="p-4 bg-backgroundLight dark:bg-backgroundDark text-black dark:text-white rounded-xl shadow-lg text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-lg font-bold mb-2">{label}</h2>
      <motion.p 
        className="text-3xl font-mono"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
      </motion.p>
      <div className="mt-4 flex justify-center gap-4">
        <motion.button 
          className="p-2 bg-primary text-white rounded-full"
          onClick={() => setRunning(!running)}
          whileTap={{ scale: 0.8 }}
        >
          {running ? <FaPause /> : <FaPlay />}
        </motion.button>
        <motion.button 
          className="p-2 bg-secondary text-white rounded-full"
          onClick={() => setTimeLeft(duration)}
          whileTap={{ scale: 0.8 }}
        >
          <FaRedo />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Timer;
