import { screen, render, fireEvent } from "@testing-library/react";

import ProfessionForm from './ProfessionForm'
import React from "react";
import { FormContext } from "../../../context/context";

describe(ProfessionForm, () => {
    const mockNextStep = jest.fn();
    const setMockUserData = jest.fn();
    const mockUserData = {
        name: '',
        birthdate: '',
        category: { name: '' },
        location: {
            city: '',
            country: '',
            postalCode: '',
            region: '',
        },
        education: [],
        languages: [],
        occupations: ['test', 'test_1', 'test_2'],
        work: [],
    }

    it('Check if all the <ProfessionItems> are rendered correctly', () => {
        const { getAllByTestId } = render(
            <FormContext.Provider value={[mockUserData, setMockUserData]}>
                <ProfessionForm nextStep={mockNextStep} />
            </FormContext.Provider>
        );
        const clickableProfessions = getAllByTestId('profession');
        expect(clickableProfessions).toHaveLength(mockUserData['occupations'].length);
    })

    it('Check if when no professions have been selected, the finalizar button triggers an error correctly', () => {
        const { getAllByTestId, getByRole } = render(
            <FormContext.Provider value={[mockUserData, setMockUserData]}>
                <ProfessionForm nextStep={mockNextStep} />
            </FormContext.Provider>
        );

        const endButton = getByRole('button', { name: /finalizar/i })
        fireEvent.click(endButton);

        const errorMessage = screen.getByText(/Debes seleccionar al menos una ocupación/i);
        expect(errorMessage).toBeInTheDocument();

        expect(setMockUserData).not.toHaveBeenCalled()
        expect(mockNextStep).not.toHaveBeenCalledWith(5)
    })

    it('Check if when at least one profession has been selected, the finalizar button triggers the actions correctly', () => {
        const { getAllByTestId, getByRole } = render(
            <FormContext.Provider value={[mockUserData, setMockUserData]}>
                <ProfessionForm nextStep={mockNextStep} />
            </FormContext.Provider>
        );
        const clickableProfessions = getAllByTestId('profession');
        fireEvent.click(clickableProfessions[0])

        const endButton = getByRole('button', { name: /finalizar/i })
        fireEvent.click(endButton);

        expect(setMockUserData).toHaveBeenCalled()
        expect(mockNextStep).toHaveBeenCalledWith(5)

        const callArg = setMockUserData.mock.calls[0][0];

        const result = callArg({});
        expect(result).toEqual({
            occupations: ['test'],
        });
    })
})