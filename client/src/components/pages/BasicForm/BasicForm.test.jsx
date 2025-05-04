import { screen, render, fireEvent, getByTestId } from "@testing-library/react";
import { FormContext } from "../../../context/context";

import BasicForm from './BasicForm'
import React from "react";
import axios from "axios";

jest.mock('axios');

describe(BasicForm, () => {
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
    const testErrorScenarios = [
        {
            description: 'nothing is filled.',
            userData: {
                name: '', birthdate: '', email: '', category: { name: '' }
            },
            expectedErrors: 5,
        },
        {
            description: 'only the name is filled.',
            userData: {
                name: 'test_name', birthdate: '', email: '', category: { name: '' }
            },
            expectedErrors: 4,
        },
        {
            description: 'only the birthday is filled.',
            userData: {
                name: '', birthdate: 'test_birthday', email: '', category: { name: '' }
            },
            expectedErrors: 4,
        },
        {
            description: 'only the category is filled.',
            userData: { 
                name: '', birthdate: '', email: '', category: { name: 'test_category' }
            },
            expectedErrors: 4,
        },
        {
            description: 'only the email is filled.',
            userData: {
                name: '', birthdate: '', email: 'test@profilers.com', category: { name: '' }
            },
            expectedErrors: 4,
        },
    ]
    const testSuccessScenario = {
        userData: {
            name: 'test_name', birthdate: '03/04/2004', email: 'test@profilers.com', category: { name: 'test_category' }
        },
    }

    beforeAll(() => {
        Object.defineProperty(global.navigator, 'geolocation', {
            value: {
                getCurrentPosition: jest.fn().mockImplementation((successCallback, errorCallback) => {
                    successCallback({
                        coords: {
                            latitude: 42,
                            longitude: -3
                        }
                    });
                }),
            },
            writable: true,
        });

        axios.get.mockResolvedValue({
            data: {
                address: {
                    city: 'test_city',
                    country: 'test_country',
                    postalCode: '12132',
                    region: 'test_region',
                }
            },
        });

    });

    testErrorScenarios.forEach(scenario => {

        it(`Check that the form wont let the user advance if ${scenario['description']}`, () => {
            const userData = { ...mockUserData, ...scenario.userData, }
            const { getByRole, getAllByTestId } = render(
                <FormContext.Provider value={[userData, setMockUserData]}>
                    <BasicForm nextStep={mockNextStep} />
                </FormContext.Provider>
            );

            const endButton = getByRole('button', { name: /Continuar/i });
            fireEvent.click(endButton);

            const errorMessages = getAllByTestId('errorMessage');
            expect(errorMessages.length).toBe(scenario['expectedErrors']);

        });
    });

    it('Check that the form let the user advance if everything is filled correctly', () => {
        const userData = { ...mockUserData, ...testSuccessScenario.userData }
        const { getByRole, getByTestId } = render(
            <FormContext.Provider value={[userData, setMockUserData]}>
                <BasicForm nextStep={mockNextStep} />
            </FormContext.Provider>
        );

        const termsButton = getByTestId('policyTerms');
        fireEvent.click(termsButton);

        const endButton = getByRole('button', { name: /Continuar/i });
        fireEvent.click(endButton);
        
        expect(mockNextStep).toHaveBeenCalled();
    })
})


