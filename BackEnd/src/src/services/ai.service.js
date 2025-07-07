const { GoogleGenerativeAI } = require("@google/generative-ai");

// Verify key is loaded
if (!process.env.GOOGLE_GEMINI_KEY) {
  throw new Error("Missing API key in .env");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

async function generateContent(prompt) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      // SYSTEM INSTRUCTION GOES HERE:
      systemInstruction: {
        parts: [{
          text: `You are a Senior Principal Engineer with 20+ years of experience conducting code reviews at top tech companies. 

          # Code Review Guidelines

          #give the review in 40 lines at max 
          also give me text on how can i properly fix my code and also give me examples

          ## Required Output Format
          1. 🚨 **Critical Issues** (Security/Breaking Changes)
          2. 🛠 **Optimizations** (Performance/Memory)
          3. 🧹 **Code Quality** (Readability/Maintainability)
          4. ✅ **Best Practices** (Language/Framework-Specific)
          5. 📚 **Learning Resources** (For Deep Dives)

          ## Review Standards
          - For EVERY issue:
            🔹 **Impact**: Low/Medium/High
            🔹 **Evidence**: Concrete examples
            🔹 **Fix**: Complete before/after code
            🔹 **Why**: Technical rationale

          ## Special Focus Areas:
          • Security vulnerabilities (OWASP Top 10)
          • Anti-pattern detection
          • Resource management
          • Error handling robustness
          • API design principles
          • Testing gaps

          ## Response Style:
          - Use markdown formatting
          - Include code snippets with syntax highlighting
          - Provide alternative implementations
          - Reference authoritative sources when applicable
          - Flag tech debt separately

          Example Output Format:

          ### 1. 🚨 Critical Issue: SQL Injection Risk
          **Impact**: High (Security)  
          **Location**: UserService.js, line 42  
          **Before**:
          \`\`\`javascript
          const query = \`SELECT * FROM users WHERE id = \${userId}\`;
          \`\`\`

          **After**:
          \`\`\`javascript
          const query = 'SELECT * FROM users WHERE id = ?';
          db.execute(query, [userId]);
          \`\`\`

          **Why**: Direct string interpolation enables injection attacks. Parameterized queries prevent this.  
          **Resource**: [OWASP SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)`
        }]
      }
    });

    const result = await model.generateContent({
      contents: [{
        parts: [{ text: prompt }]
      }]
    });

    return result.response.text();
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to generate content");
  }
}

module.exports = generateContent;




//-------------------------------------------------------


// const { GoogleGenerativeAI } = require("@google/generative-ai");

// // Initialize the API
// // const genAI = new GoogleGenerativeAI({ 
// //   apiKey: process.env.GOOGLE_GEMINI_KEY 
// // });

// const genAI = new GoogleGenerativeAI({
//   apiKey: "AIzaSyCRLdUndWZQO585yHIYUpaEFO7Wt0PE-1I"
// });

// async function generateContent(prompt) {
//   try {
//     // Get the model instance
//     const model = genAI.getGenerativeModel({ 
//       model: "gemini-2.0-flash"  // Updated model name
//     });

//     // Format the prompt correctly for the API
//     const request = {
//       contents: [
//         {
//           parts: [
//             { text: prompt }
//           ]
//         }
//       ],
//       systemInstruction: {
//         parts: [
//           { 
//             text: "You are an expert code reviewer. Analyze the provided code for bugs, optimizations, and best practices. Provide clear, actionable feedback." 
//           }
//         ]
//       }
//     };

//     // Call the model
//     const result = await model.generateContent(request);
//     const response = result.response;
//     const text = response.text();

//     console.log("Gemini Output:", text);
//     return text;

//   } catch (error) {
//     console.error("Error in generateContent():", error);
//     throw error; // Rethrow to handle in controller
//   }
// }

// module.exports = generateContent;











//------------------------------------------------------
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// // Initialize the API
// const ai = new GoogleGenerativeAI({ apiKey: process.env.GOOGLE_GEMINI_KEY });

// async function generateContent(prompt) {
//   try {
//     const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

//     // Call the model with text-only prompt
//     const result = await model.generateContent(prompt);

//     // `result` has a `response` property
//     const response = await result.response;

//     // Get the actual text
//     const text = await response.text();

//     console.log("Gemini Output:", text);

//     return text;

//   } catch (error) {
//     console.error("Error in generateContent():", error);
//     return "Failed to generate content.";
//   }
// }

// module.exports = generateContent;



//------------------------------------------------------------------------------------

// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_KEY });



// async function generateContent(prompt){
//     const model =  await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     systemInstruction:`
//     You are an code reviewer, who have an expertise in development. 
//     You look for the code and find the problems and then suggest the solution to the developer.

//     you always try too find the best solution for the developer and also try to make the code more efficient and clean.
//     `,
//     contents: prompt
//     });
//     const result = await model.generateContent(prompt);


//     return result.response.text();
// }

// // module.exports = genrateContent
// export default generateContent;