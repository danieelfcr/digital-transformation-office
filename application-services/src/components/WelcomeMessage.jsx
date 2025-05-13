import { useEffect, useState } from "react"
import "./WelcomeMessage.css"

export const WelcomeMessage = () => {

    const text = sessionStorage.getItem('message');

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">
        {text}
      </h1>
    </div>
  )
}
