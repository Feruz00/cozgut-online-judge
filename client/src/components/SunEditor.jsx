import React from 'react'
import katex from "katex";
import SunEditor from 'suneditor-react';
import "suneditor/dist/css/suneditor.min.css";
import "katex/dist/katex.min.css";
import {
    align,
    
    fontColor,
    fontSize,
    formatBlock,
    hiliteColor,
    horizontalRule,
    lineHeight,
    list,
    paragraphStyle,
    table,
    template,
    textStyle,
    image,
    link,
    math,
    blockquote,
    
} from 'suneditor/src/plugins'
import axios from 'axios';
const server = process.env.REACT_APP_SERVER
function onImageUploadBefore() {
    return (files, _info, _core, uploadHandler) => {
      (async () => {
        const formData = new FormData();
        formData.append("file", files[0]);

        const { data } = await axios.post(
          `${server}/upload`,
          formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
          }
        );
          console.log(data)
        const res = {
          result: [
            {
              url: data?.url,
              name: "thumbnail",
            },
          ],
        };

        uploadHandler(res);
      })();

      // called here for stop double image
      uploadHandler();
    };
  }
const Editor =  ({ value, onChange, ref, big=false})=>{
    
    
 
    return <SunEditor 
    setDefaultStyle='bg-dark text-base'
    
    // {...props}
    ref={ref}
    onChange={onChange}
    defaultValue={value}
    onImageUploadBefore={onImageUploadBefore}
    setOptions={{
        fontSize: '13px',
        katex: katex,
        plugins:[
            math,
            blockquote,
            align,
            fontColor,
            fontSize,
            formatBlock,
            hiliteColor,
            horizontalRule,
            lineHeight,
            list,
            paragraphStyle,
            table,
            template,
            textStyle,
            image,
            link
        ],
        buttonList: [
            ["formatBlock"],
            [
              "bold",
              "underline",
              "italic"
            ],
            ["fontColor", "hiliteColor", 'blockquote'],
            ["outdent", "indent"],
            ["align", "horizontalRule", "list"],
            ["table", "link", "image"],
            ['math']
            // ['katex']
          ],
          formats: ["p", "div", "h1", "h2", "h3", "h4", "h5", "h6"],
          font: [
            "Arial",
            "Calibri",
            "Comic Sans",
            "Courier",
            "Garamond",
            "Georgia",
            "Impact",
            "Lucida Console",
            "Palatino Linotype",
            "Segoe UI",
            "Tahoma",
            "Times New Roman",
            "Trebuchet MS"  
        ],
        
    }}
/>
} 

export default Editor