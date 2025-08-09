# New Book AI Backend

**URL:** https://newbookai.onrender.com/

## Description

This is the frontend of my website, designed to help people find their next novel and easily pick books suited to their tastes.  
Users can describe their ideal book or even describe a book cover they remember, and the system provides multiple recommendations with detailed reasons for each choice.  
This solves the common problem of “what to read next” that many readers face after finishing a novel.

---

## Features

- **Responsive UI** — Works smoothly on desktop, tablet, and mobile devices  
- **User Authentication** — Sign up, login, and logout functionality secured with JWT tokens  
- **Book Search** — Search books by title using the Google Books API  
- **AI-Powered Recommendations** — Submit descriptions, book cover details, or use a recommendation button to get personalized book suggestions  
- **Saved Books List** — Users can save favorite books and view or edit their collection  
- **Dynamic Loading** — Asynchronous API calls provide a smooth, fast user experience without page reloads  
- **Error Handling & Validation** — User input validation with friendly error messages  
- **Modern Design** — Clean, intuitive UI using React and Reactstrap combined with custom CSS  
- **State Management** — Uses React hooks and context for efficient UI updates  
- **Routing** — Client-side routing with React Router to manage multiple views/pages  

---

## External APIs

### Google Books API

This project uses the Google Books API to fetch book data.  
Google Books was chosen because it offers a free, extensive, and well-documented library of books worldwide.  

Initially, Goodreads API was considered since it’s a personal favorite, but it’s no longer freely available.  
WorldCat was also explored but access was restricted via local library authentication.  
Google Books fulfilled the project’s needs for a reliable and comprehensive book data source.

### Gemini Through OpenRouter

The project uses Gemini 2.5 via OpenRouter for AI-powered book recommendation fetchers.  
Gemini was chosen because it was relatively new when the app was created, providing a fresh approach compared to a previous attempt using Deepseek.  
Additionally, since both Gemini and Google Books are part of the same company, it was believed that integration between them would be more accurate.

---

## Technical Stack & Key Tools

This project leverages several React features and libraries to manage state, routing, and user interactions effectively:

- **React Hooks:**  
  - `useState`: Manages component-level state like form inputs, loading, and error states  
  - `useContext`: Global state management, e.g., user authentication status  
  - `useEffect`: Handles side effects like API calls on component mount or update  
  - `useNavigate` (React Router): Programmatic navigation between routes  

- **React Router:** Enables client-side routing for multiple pages/views  
- **Axios:** Makes HTTP requests to the backend API  
- **CSS Framework / Styling:** Reactstrap (React Bootstrap) combined with custom CSS  
- **State Management Approach:**  
  - `LoginContext` ensures users are logged in to access certain features  
  - `CurrentUserContext` used throughout the app to streamline user data and maintain consistency  

---

## Technology Stack

- PostgreSQL (PSQL)  
- Node.js  
- JavaScript  
- CSS  
- HTML  
- React  

---

## Getting Started

To run the frontend locally on your machine, follow these steps:

1. **Clone the repository**

   ```bash
   git clone https://github.com/Dochi4/Springboard_Capstone2_Frontend.git
   cd Springboard_Capstone2_Frontend
2. **Install dependencies**
  - npm install
3. **Make sure the backend is running**
    - Backend repo: https://github.com/Dochi4/Springboard_Capstone2_Backend
4. **Run the frontend locally**
  - npm start
