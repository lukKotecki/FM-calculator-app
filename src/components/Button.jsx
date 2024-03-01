import React from "react";

export default function Button({ name, className, onClick }) {
  return (
    <button value={name} className={`button ${className}`} onClick={onClick}>
      {name}
    </button>
  );
}
