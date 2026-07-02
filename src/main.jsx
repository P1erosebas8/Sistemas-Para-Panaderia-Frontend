import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const customAlert = (msg) => {
  const toast = document.createElement('div');
  toast.innerText = msg;
  toast.style.position = 'fixed';
  toast.style.top = '20px';
  toast.style.left = '20px'; // Arriba a la izquierda como pidió el usuario
  toast.style.backgroundColor = '#6f4014';
  toast.style.color = '#fff';
  toast.style.padding = '16px 24px';
  toast.style.borderRadius = '12px';
  toast.style.boxShadow = '0 8px 24px rgba(111,64,20,0.25)';
  toast.style.zIndex = '99999';
  toast.style.fontWeight = 'bold';
  toast.style.fontSize = '14px';
  toast.style.fontFamily = '"Inter", sans-serif';
  
  if(!document.getElementById('briselli-toast-styles')) {
    const style = document.createElement('style');
    style.id = 'briselli-toast-styles';
    style.innerHTML = `
      @keyframes slideInLeftToast {
        from { transform: translateX(-100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes fadeOutLeftToast {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(-100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
  
  toast.style.animation = 'slideInLeftToast 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'fadeOutLeftToast 0.4s ease-out forwards';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
};

window.alert = customAlert;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);