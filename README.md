# 🚀 E-commerce/Blog REST API Backend

This is a robust, modular backend built with **Node.js, Express, and MongoDB**, leveraging **TypeScript** for type safety and scalability. It is configured for modern ES Modules (`"type": "module"`) and includes features for user authentication, post management, category handling, and file uploads.

---

## ✨ Features

* **User Authentication (JWT Ready):** Secure user registration and login using `bcrypt` for password hashing.
* **CRUD Operations:** Full C.R.U.D. functionality for **Posts** and **Categories**.
* **MongoDB/Mongoose:** Data persistence via Mongoose, with best practices like `select: false` for password security.
* **File Uploads:** Endpoint configured for single file uploads using `multer`.
* **Modern Tooling:** Built with TypeScript, `ts-node`, and configured for modern ES Modules.

---

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express
* **Language:** TypeScript
* **Database:** MongoDB (via Mongoose)
* **Authentication:** `bcrypt` (Password Hashing)
* **Utility:** `dotenv`, `multer`

---

## ⚙️ Setup and Installation

Follow these steps to get the project running locally.

### 1. Prerequisites

* **Node.js** (v18 or higher recommended)
* **MongoDB Instance** (Local or cloud-hosted, e.g., MongoDB Atlas)

### 2. Clone the Repository

```bash
git clone [YOUR_REPOSITORY_URL]
cd E-commerce
