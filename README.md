# Frontend Dev Task  

## Live Demo  
You can access the deployed application here:  
[Frontend Dev Task](https://frontend-dev-task-mu.vercel.app/)  

## Running the Project Locally  

To run this project on your local machine, follow these steps:  

### **Prerequisites**  
- Install [Node.js](https://nodejs.org/) (LTS version recommended)  
- Install **npm** (comes with Node.js)  
- Clone this repository:  

  ```sh
  git clone https://github.com/layan-ar/frontend-dev-task.git
  cd frontend-dev-task

  Step 2: Install Dependencies
  - In the terminal paste: npm install

  Step 3: Start the API
  - In the terminal paste: npm run start-api

  Step 4: Start the Frontend
  - In the terminal paste: npm run dev

  Step 5: Access the project:
  - Once both the API and frontend are running, you can click on link provided after you pasted "npm run dev"




# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
