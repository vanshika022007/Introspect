# Introspect

A React-based conversational interface for dynamic, state-driven assessment flows.

---

## 🚀 Overview
Introspect is a React-based web application that provides a conversational, step-by-step assessment experience.

The app focuses on building a smooth, interactive frontend where prompts are presented dynamically and user responses influence the flow of the session.

---

## 💡 Objective
To design and implement an interactive frontend system that demonstrates dynamic state management, real-time user interaction, and a continuous conversational flow using React.

---

## 🔧 Key Features

### 🔄 Dynamic Interaction Flow
- Prompts are shown one at a time
- Follow-up prompts adapt based on user responses
- Maintains a continuous session instead of static Q&A

### ⏱️ Timed Response Handling
- Each prompt can have a time limit
- Visual indicators for remaining time
- Helps simulate a responsive environment

### 🎙️ Voice Support (Optional)
- Text-to-Speech for prompts
- Speech-to-Text for user input
- Fallback to manual text input

### 🧠 Context Management
- Tracks user responses across the session
- Uses stored context to influence next prompts
- Demonstrates state handling in React

### 📊 End-of-Session Summary
- Displays a structured report after completion
- Highlights:
  - clarity
  - consistency
  - response patterns

---

## ⚙️ Tech Stack

Frontend:
- React.js
- JavaScript (ES6+)
- CSS / Tailwind CSS (if used)

Browser APIs:
- Web Speech API (Speech Recognition)
- Speech Synthesis API (Text-to-Speech)

Optional Integration:
- External API (for prompt generation or summary)

---

## 🧩 System Workflow

1. User selects a topic or category  
2. Application displays the first prompt  
3. Prompt is optionally read aloud  
4. User responds via text or voice  
5. Response is stored and processed in state  
6. Next prompt is generated based on previous input  
7. Flow continues for multiple steps  
8. Final summary is generated at the end  

---

## 🎯 Scope of the Project
This project focuses on:
- Building a responsive React-based interface  
- Managing dynamic data and interaction flow  
- Demonstrating conversational UI patterns  

It is intended as a frontend-focused implementation demonstrating interaction design rather than a full-scale evaluation system.

---

## 🚧 Future Improvements
- Improved response analysis logic  
- Better UI transitions and animations  
- More refined scoring system  
- Expanded topic categories  

---

## ▶️ How to Run

1. Clone the repository  
2. Navigate to the project folder  
3. Install dependencies:  
   npm install  
4. Start the development server:  
   npm start  
5. Open http://localhost:3000 in your browser  

---

## 👥 Team Members
- Member 1: Vanshika  
- Member 2: Ojal Akash  
- Member 3: Komal  

---

## 📌 Note
The project emphasizes frontend interaction and state-driven logic. External APIs, if used, are limited to supporting prompt generation and summarization.