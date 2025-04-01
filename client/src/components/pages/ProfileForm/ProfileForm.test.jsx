import React from "react";
import ProfileFrom from "./ProfileForm";
import { fireEvent, render } from '@testing-library/react';
import { useFetch } from '../../../hooks/useFetch';
import { profiles } from "../../../constants/profiles";
import { FormContext } from "../../../context/context";
import { getRandomInt } from "../../../utils/getRandom";

jest.mock('axios');

jest.mock('../../../hooks/useFetch', () => ({
    useFetch: jest.fn(),
}))
jest.mock('../../../utils/getRandom', () => ({
    getRandomInt: jest.fn(),
}))

describe(ProfileFrom, () => {
    const mockNextStep = jest.fn();
    const setMockUserData = jest.fn();
    const setMockCategoryProfiles = jest.fn();
    let mockCategoryProfiles = profiles
    const mockUserData = {
        name: '',
        birthdate: '',
        category: { name: 'test_category' },
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

    beforeEach(() => {
        useFetch.mockReturnValue({
            data: mockCategoryProfiles,
            isLoading: false,
            error: null,
            setData: setMockCategoryProfiles,
        })
        getRandomInt.mockReturnValueOnce(0)
        getRandomInt.mockReturnValueOnce(1)
        getRandomInt.mockReturnValueOnce(2)
        getRandomInt.mockReturnValueOnce(3)
    })

    it('When a user clicks the right arrow, the star or the left arrow the profile is removed from categoryProfiles', () => {
        const { container } = render(
            <FormContext.Provider value={[mockUserData, setMockUserData]}>
                <ProfileFrom nextStep={mockNextStep} />
            </FormContext.Provider>
        );

        /**
         * Right arrow test
         */
        const arrowRight = container.querySelector('#arrowRight');
        fireEvent.click(arrowRight);
        expect(setMockCategoryProfiles).toHaveBeenCalled();

        let lastCallIndex = setMockCategoryProfiles.mock.calls.length - 1;
        let filterFunction = setMockCategoryProfiles.mock.calls[lastCallIndex][0];
        let filtered = filterFunction(mockCategoryProfiles);

        expect(filtered.length).toBe(mockCategoryProfiles.length - 1);

        mockCategoryProfiles = filtered;

        /**
         * Star icon test 
         */
        const arrowUp = container.querySelector('#arrowUp');
        fireEvent.click(arrowUp);
        expect(setMockCategoryProfiles).toHaveBeenCalled();
        
        lastCallIndex = setMockCategoryProfiles.mock.calls.length - 1;
        filterFunction = setMockCategoryProfiles.mock.calls[lastCallIndex][0];
        filtered = filterFunction(mockCategoryProfiles);
        
        expect(filtered.length).toBe(mockCategoryProfiles.length - 1);
        
        mockCategoryProfiles = filtered;

        /**
         * Left arrow test
         */
        const arrowLeft = container.querySelector('#arrowLeft');
        fireEvent.click(arrowLeft);
        expect(setMockCategoryProfiles).toHaveBeenCalled();

        lastCallIndex = setMockCategoryProfiles.mock.calls.length - 1;
        filterFunction = setMockCategoryProfiles.mock.calls[lastCallIndex][0];
        filtered = filterFunction(mockCategoryProfiles);

        expect(filtered.length).toBe(mockCategoryProfiles.length - 1);
    })
})