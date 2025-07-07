// import { useState, useEffect } from 'react';
// import "prismjs/themes/prism-tomorrow.css";
// import Editor from "react-simple-code-editor";
// import prism from "prismjs";
// import Markdown from "react-markdown";
// import axios from 'axios';
// import './App.css';
// import remarkGfm from 'remark-gfm';
// import rehypeHighlight from 'rehype-highlight';
// import 'highlight.js/styles/github-dark.css';

// function App() {
//   const [code, setCode] = useState(`function sum(a, b) {\n  return a + b;\n}`);
//   const [review, setReview] = useState('### Your code review will appear here\nSubmit your code for analysis');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     prism.highlightAll();
//   }, [code]);

//   async function reviewCode() {
//     if (!code.trim()) {
//       setError('Please enter some code to review');
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
    
//     try {
//       const response = await axios.post('http://localhost:3000/ai/get-review', {
//         code: code
//       }, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
      
//       setReview(response.data.review || response.data);
//     } catch (err) {
//       console.error('Review error:', err);
//       setError(err.response?.data?.error || err.message || 'Failed to review code');
//       setReview('## ❌ Review Failed\n' + (err.response?.data?.error || err.message));
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <main>
//       <div className="left">
//         <div className="code">
//           <Editor
//             value={code}
//             onValueChange={code => setCode(code)}
//             highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
//             padding={16}
//             style={{
//               fontFamily: '"Fira Code", "Fira Mono", monospace',
//               fontSize: 14,
//               backgroundColor: '#1e1e1e',
//               color: '#d4d4d4',
//               minHeight: '100%',
//               borderRadius: '8px',
//               lineHeight: 1.5
//             }}
//           />
//         </div>
//         <button 
//           onClick={reviewCode} 
//           className="review"
//           disabled={isLoading}
//         >
//           {isLoading ? 'Analyzing...' : 'Review Code'}
//         </button>
//         {error && <div className="error-message">{error}</div>}
//       </div>

//       <div className="right">
//         <Markdown
//           remarkPlugins={[remarkGfm]}
//           rehypePlugins={[rehypeHighlight]}
//           components={{
//             code({node, inline, className, children, ...props}) {
//               const match = /language-(\w+)/.exec(className || '');
//               return !inline && match ? (
//                 <pre className={className}>
//                   <code {...props}>
//                     {String(children).replace(/\n$/, '')}
//                   </code>
//                 </pre>
//               ) : (
//                 <code className={className} {...props}>
//                   {children}
//                 </code>
//               );
//             }
//           }}
//         >
//           {review}
//         </Markdown>
//       </div>
//     </main>
//   );
// }

// export default App;


















//-------------------------------------------------------------------

import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [code, setcode] = useState(`function sum(){
  return 1+1
}`)


    const [review, setReview] = useState(``)

  useEffect(() => {
    prism.highlightAll()
  })
  
  async function reviewCode() {
      const response = await axios.post('http://localhost:3000/ai/get-review', {code})

      setReview(response.data)
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
                value ={code}
                onValueChange={code => setcode(code)}
                highlight = {code => prism.highlight(code, prism.languages.javascript, "javascript")}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 16,
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  height: "100%",
                  width: "100%"
                }}
            />
          </div>
          <div
            onClick={reviewCode} 
            className="review">Review</div>
        </div>

        <div className="right">
          <Markdown

            rehypePlugins={[ rehypeHighlight]}
          >{review}
          
          </Markdown>

        </div>
      </main>
    </>
  )
}



export default App
