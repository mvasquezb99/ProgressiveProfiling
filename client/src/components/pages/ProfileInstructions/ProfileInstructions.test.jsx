import { render, screen } from "@testing-library/react";
import ProfileInstructions from "./ProfileInstructions";
import React from "react";

// Test test, please change in the future!!!
test('Renders ProfileInstructions component', () => {
    render(<ProfileInstructions nextStep={4}/>);
    const heading = screen.getByText('¡Descubre tu perfil ideal! 🎯');
    expect(heading).toBeInTheDocument();
})