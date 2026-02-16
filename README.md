#  Forumly — Frontend

An interactive and modern frontend for **Forumly**, a discussion platform inspired by Stack Overflow, Slack, and Reddit.  
Built for smooth UX, real-time communication, and clean UI with rich text discussions, tagging, and notifications.

---

## 🌐 Live Links

- **Frontend (Full App):** [https://forumly.vercel.app]((https://formuly-frontend-ul6i.vercel.app/)
- **Backend (API):** [https://forumly-backend.onrender.com](https://forumly-backend.onrender.comer.com)

---

## ⚙️ Tech Stack

- **Frontend:** React.js (Vite)
- **Styling:** Tailwind CSS + ShadCN/UI
- **Rich Text:** TipTap Editor
- **State Management:** Zustand
- **Routing:** React Router DOM
- **Real-time:** Socket.io Client
- **Build & Deploy:** Vercel
- **Backend:** Node.js + Express + MongoDB (Render)

---

## ✨ Features

- 🧑‍💻 User Authentication (JWT + Cookies)
- 🏠 Home feed with active discussions
- 🏷️ Tag-based filtering system
- 💬 Create, edit, and reply to discussions
- ❤️ Likes, bookmarks, and upvotes
- 🔔 Real-time notifications via WebSockets
- 🧾 Rich Text Editor (TipTap) with media uploads
- 🧑‍🎓 User profile with stats and activity history
- 📱 Fully responsive modern UI

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Orewa-Veer/forumly-frontend.git
cd forumly-frontend
```
### 2️⃣ Install Dependencies
```bash
npm install
```
### 3️⃣ Configure Environment Variables
Create a .env file in the root directory and add:
.env
```bash
VITE_BACKEND_URL=https://forumly-backend.onrender.com
VITE_SOCKET_URL=https://forumly-backend.onrender.com
```
### 4️⃣ Run the Development Server
bash
```
npm run dev
```
Your app will start on http://localhost:5173

## 📂 Project Structure
```bash
forumly-frontend/
├── src/
│   ├── api/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── store/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── public/
├── package.json
└── tailwind.config.js
```

## 🖼️ Preview

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/3983705c-3c01-4758-ab2d-73a69923623e" />


## 🤝 Contributing

Fork the repository

Create a new branch:

```bash
git checkout -b feature-name
```
Commit your changes:
```bash
git commit -m "Add feature-name"
```
Push your branch:
bash
```bash
git push origin feature-name
```
Open a Pull Request 🚀


🧑‍💻 Author
Veer — SDE

GitHub: https://github.com/Orewa-Veer

LinkedIn: [linkedin.com/in/veer](https://www.linkedin.com/in/veer-dev/)

⭐ If you like this project, consider giving it a star on GitHub!
