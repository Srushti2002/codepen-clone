import React from 'react'
import { useState, useEffect } from 'react';
import { tokyoNight  } from '@uiw/codemirror-theme-tokyo-night';
import { tokyoNightDay } from '@uiw/codemirror-theme-tokyo-night-day';
import styles from '../styles/project.module.css';
import {  FaCss3, FaHtml5, FaJs, FaSun, FaMoon } from "react-icons/fa6";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from '@codemirror/lang-javascript';
import img from '../images/codepen.png';
import SplitPane from 'split-pane-react';
import '../styles/splitpane.css';
import img2 from '../images/codepenlight.png';
import useLocalStorage from '../hooks/useLocalStorage'
import 'split-pane-react/esm/themes/default.css';

export default function Project({ isDarkMode, toggleTheme }) {
    const [sizes, setSizes] = useState([100, 100, 'auto']);
    const [sizes1, setSizes1] = useState([50, 100, 'auto']);
    const [sizes2, setSizes2] = useState([100, 100, 'auto']);

    const [html, setHtml] = useLocalStorage("html", "");
    const [css, setCss] = useLocalStorage("css", "");
    const [js, setJs] = useLocalStorage("js", "");
    
    const [output, setOutput] = useState("");

    useEffect(() => {
        const styleTag = document.createElement('style');
        styleTag.id = 'custom-split-pane-style';
        styleTag.innerHTML = `
            .react-split__sash {
                background-color: ${isDarkMode ? '#C1C1C1' : '#000000'} !important;
            }
            .react-split__sash--vertical {
                border-right-color: ${isDarkMode ? '#a5a5a5' : '#2c2b2b'} !important;
            }

            .react-split__sash--horizontal {
                border-color: ${isDarkMode ? '#a5a5a5' : '#2c2b2b'} !important;
            }            
        `;
        document.head.appendChild(styleTag);

        return () => {
            const existingStyleTag = document.getElementById('custom-split-pane-style');
            if (existingStyleTag) {
                existingStyleTag.parentNode.removeChild(existingStyleTag);
            }
        };
    }, [isDarkMode]);

    useEffect(() => {
        updateOutput();
    },
    [html , css, js]);

    const updateOutput = () => {
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
        </html>
        `;
       setOutput(combinedOutput) ; 
    }

  return (
    <div className={styles.projectWrapper}>
        {/* {header section} */}
        <div className= {isDarkMode ? styles.projectHeaderLight : styles.projectHeaderDark}>
            <img src={isDarkMode ? img2 : img } />
            <button onClick={toggleTheme}>
            {isDarkMode ? <FaSun className={styles.sun} />: <FaMoon className={styles.moon} /> }
                </button>
        </div>
        
        {/* {working section} */}
        <div className={styles.projectBody}>
            
            <SplitPane
                split="horizontal"
                sizes={sizes}
                onChange={setSizes}
                className={styles.projectContent} 
            >    
             {/* {code section} */}
                <SplitPane className={styles.projectCode} 
                style={{ borderLeft : isDarkMode ? " #c1c1c1 15px solid" : " #060606 15px solid" ,
                borderTop : isDarkMode ? "#8b8989 1px solid" : "#2c2b2b 1px solid" }} 
                sizes={sizes1} 
                onChange={setSizes1}
                 
                >
                    {/* {HTML code} */}
                    <div className={isDarkMode ? styles.codeHtmlLight : styles.codeHtmlDark }>
                        <div className={isDarkMode ? styles.htmlTitleLight : styles.htmlTitleDark}>
                            <FaHtml5 className={styles.htmlIcon}/>
                            <div className={styles.htmlTitleText}>HTML</div>
                        </div>
                        <div className={isDarkMode ? styles.htmlActCodeLight : styles.htmlActCodeDark }>
                            <CodeMirror 
                            className={styles.codeMirrorHtml}
                            value={html} 
                            height="100vh"
                            theme={isDarkMode ? tokyoNightDay : tokyoNight } 
                            extensions={[javascript({ jsx: true })]} 
                            onChange={(value, viewUpdate)=>{setHtml(value)}} />
                        </div>
                    </div>
                    <SplitPane  className={styles.projectCodeCssJs} sizes={sizes2} onChange={setSizes2}>
                        {/* {CSS code} */}
                        <div className={isDarkMode ? styles.codeCssLight : styles.codeCssDark }>
                            <div className={isDarkMode ? styles.cssTitleLight : styles.cssTitleDark }>
                                <FaCss3 className={styles.cssIcon} />   
                                <div className={styles.cssTitleText}>CSS</div>
                                
                            </div>
                            <div className={isDarkMode ? styles.cssActCodeLight : styles.cssActCodeDark }>
                                <CodeMirror 
                                className={styles.codeMirrorCss}
                                value={css}
                                height="100vh"
                                extensions={[javascript({ jsx: true })]}
                                theme={isDarkMode ? tokyoNightDay : tokyoNight } 
                                onChange={(value, viewUpdate)=>{setCss(value)}}
                                />
                            </div>
                        </div>
                        {/* {JS code} */}
                        <div className={isDarkMode ? styles.codeJsLight : styles.codeJsDark }>
                            <div className={isDarkMode ? styles.jsTitleLight : styles.jsTitleDark }>
                                <FaJs className={styles.jsIcon} />
                                <div className={styles.jsTitleText}>JS</div> 
                                      
                            </div>
                            <div className={isDarkMode ? styles.jsActCodeLight : styles.jsActCodeDark }>
                                <CodeMirror 
                                className={styles.codeMirrorJs}
                                value={js}
                                height="100vh"
                                theme={isDarkMode ? tokyoNightDay : tokyoNight } extensions={[javascript({ jsx: true })]}
                                onChange={(value, viewUpdate)=>{setJs(value)}}
                                />
                            </div>
                        </div> 
                    </SplitPane>
                    
                </SplitPane>
                    {/* {output section} */}
                    <div  className={styles.outputScreen}
                    style={{ backgroundColor: isDarkMode ? '#E1E2E7' : '#111219' }}
                    >
                        <iframe 
                        className={styles.outputIframeScreen}
                        title="Result"
                        srcDoc={output}
                        />   
                         
                    </div>
            </SplitPane>
        </div>


    </div>
  )
}
