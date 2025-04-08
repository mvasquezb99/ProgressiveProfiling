import React from "react";

export default function ErrorMessage({ message }) {
  return <p className="text-red-400 text-xs mb-3" data-testid="errorMessage" >{message}</p>;
}
