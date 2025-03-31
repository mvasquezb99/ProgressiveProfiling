import { fireEvent, render, waitFor } from "@testing-library/react";

import SwipeArrows from "./SwipeArrows";

import React from "react";
import axios from "axios";



describe(SwipeArrows, () => {

    const handleDislike = jest.fn();
    const handleLike = jest.fn();
    const handleSuperlike = jest.fn();

    it('The arrows invoke the onClick function correctly', () => {

        const { container } = render(<SwipeArrows handleDislike={handleDislike} handleLike={handleLike} handleSuperlike={handleSuperlike} />);

        const arrowLeft = container.querySelector('#arrowLeft');
        const arrowRight = container.querySelector('#arrowRight');
        const arrowUp = container.querySelector('#arrowUp');

        fireEvent.click(arrowLeft)
        expect(handleDislike).toHaveBeenCalled();
        fireEvent.click(arrowRight)
        expect(handleLike).toHaveBeenCalled();
        fireEvent.click(arrowUp)
        expect(handleSuperlike).toHaveBeenCalled();

    })

    it('The icons are rendered correctly', () => {

        const { container } = render(<SwipeArrows handleDislike={handleDislike} handleLike={handleLike} handleSuperlike={handleSuperlike} />);

        const arrowLeftIcon = container.querySelector('.fa-arrow-left');
        expect(arrowLeftIcon).toBeInTheDocument();
        const arrowRightIcon = container.querySelector('.fa-arrow-right');
        expect(arrowRightIcon).toBeInTheDocument();
        const arrowUpIcon = container.querySelector('.fa-star');
        expect(arrowUpIcon).toBeInTheDocument();
        
    })
})