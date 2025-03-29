import { screen, render, fireEvent } from "@testing-library/react";

import ProfessionItem from './ProfessionItem';
import React from "react";

describe(ProfessionItem, () => {
    const mockHandleClick = jest.fn();
    const mockProfession = {name:'Test'};

    
    it('Trigger on click actions correctly', () => {
        const { getByTestId } = render(<ProfessionItem profession={mockProfession} handleClick={mockHandleClick} />)
        const clickableProfession = getByTestId('profession');
        fireEvent.click(clickableProfession);
        expect(mockHandleClick).toHaveBeenCalled();
        expect(clickableProfession).not.toHaveClass('bg-white')
    })
    
    it('Renders the profession correctly', () => {
        const { getByTestId } = render(<ProfessionItem profession={mockProfession} handleClick={mockHandleClick} />)
        const professionName = screen.getByText(mockProfession.name)
        expect(professionName).toBeInTheDocument();
    })
})