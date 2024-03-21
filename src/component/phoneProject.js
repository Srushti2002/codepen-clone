import React from 'react'
import styles from '../styles/phoneProject.module.css';
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from '@codemirror/lang-javascript';
import useLocalStorage from '../hooks/useLocalStorage';
import { useState, useEffect, useRef } from 'react';
import { tokyoNight  } from '@uiw/codemirror-theme-tokyo-night';
import { tokyoNightDay } from '@uiw/codemirror-theme-tokyo-night-day';
import {  FaCss3, FaHtml5, FaJs, FaSun, FaMoon } from "react-icons/fa6";

export default function PhoneProject({ isDarkMode, toggleTheme }) {
    const [html, setHtml] = useLocalStorage("html", "");
    const [css, setCss] = useLocalStorage("css", "");
    const [js, setJs] = useLocalStorage("js", "");
    const [activeTab, setActiveTab] = useState("html");
    
    const [output, setOutput] = useState("");
    

    const updatedOutput = () => {
        const combinedOutput = `
        <html>
            <head>
                <style>
                    ${css}
                </style>
            </head>
            <body>
                ${html}
                <script>
                    ${js}
                </script>
            </body>
        </html>`;
        setOutput(combinedOutput) ; 
    }

    useEffect(() => {
        updatedOutput();
    })

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const getModeAndValue = () => {
        switch (activeTab) {
          case "html":
            return { mode: "htmlmixed", value: html, setValue: setHtml };
          case "css":
            return { mode: "css", value: css, setValue: setCss };
          case "js":
            return { mode: "javascript", value: js, setValue: setJs };
          default:
            return {};
        }
      };

      const { mode, value, setValue } = getModeAndValue();
  return (
    <div className={styles.phProjectWrapper}>
            <div className={isDarkMode ? styles.phProjectCodingBlockLight : styles.phProjectCodingBlockDark}>
                <div className={isDarkMode ? styles.phProjectButtonLight : styles.phProjectButtonDark}>
                    <button className={isDarkMode ? styles.ButtonLight : styles.ButtonDark} onClick={() => handleTabChange("html")}><FaHtml5 className={styles.htmlIcon} />HTML</button>
                    <button className={isDarkMode ? styles.ButtonLight : styles.ButtonDark} onClick={()=> handleTabChange("css")}><FaCss3 className={styles.cssIcon}/>CSS</button>
                    <button className={isDarkMode ? styles.ButtonLight : styles.ButtonDark}onClick={()=> handleTabChange("js")}><FaJs className={styles.jsIcon} />JS</button>
                </div>
                <div className= { isDarkMode ? styles.codeContainerLight : styles.codeContainerDark }>
                <CodeMirror 
                    className={styles.codeMirror}
                    value={value} 
                    height="250px"
                    theme={isDarkMode ? tokyoNightDay : tokyoNight } 
                    options={{mode}}
                    extensions={[javascript({ jsx: true })]} 
                    onChange={(value, viewUpdate)=>{setValue(value)}} />
                       
                </div>
            </div>
            <div className={styles.divider}
            style={{ backgroundColor: isDarkMode ? '#fff' : '#111219' }}></div>
            <div className={styles.phProjectOutputBlock}
                style={{ backgroundColor: isDarkMode ? '#fff' : '#111219' }}>
                <iframe
                className={styles.phProjectOutputIframe}
                title="Result"
                srcDoc={output}
                />
            </div> 
    </div>
  )
}
