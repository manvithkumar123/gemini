import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const Contextprovider = (props) => {
    const [input, setinput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousPrompt, setPreviousPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const delaypara = (words) => {
        let index = 0;
        setResultData("");
        const interval = setInterval(() => {
            if (index < words.length) {
                const word = words[index];
                if (word !== undefined && word.toLowerCase() !== "undefined") {
                    setResultData(prev => prev + word + " ");
                }
                index++;
            } else {
                clearInterval(interval);
            }
        }, 100); // Adjust speed here
    }

    const onSent = async (prompt) => {
        const finalPrompt = prompt || input;
        if (!finalPrompt) return;

        setLoading(true);
        try {
            const res = await runChat(finalPrompt);
            let responseArray = res.split("**");
            let newArray = "";
            for (let i = 0; i < responseArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newArray += responseArray[i];
                } else {
                    newArray += "<b>" + responseArray[i] + "</b>";
                }
            }
            let formattedResponse = newArray.split("*").join("<br>");
            formattedResponse = formattedResponse.replace(/undefined\s*$/, '').trim();
            let formattedResponsearray = formattedResponse.split(" ");
            delaypara(formattedResponsearray);
            setShowResult(true);
            setRecentPrompt(finalPrompt);
            setPreviousPrompt(prev => [...prev, finalPrompt]);
        } catch (error) {
            console.error("Error in onSent:", error);
        } finally {
            setLoading(false);
        }
    };
    const addPreviousPrompt = () => setPreviousPrompt(prev => [...prev, input]);

    const contextValue = {
        previousPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        Loading,
        resultData,
        input,
        setinput,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default Contextprovider;