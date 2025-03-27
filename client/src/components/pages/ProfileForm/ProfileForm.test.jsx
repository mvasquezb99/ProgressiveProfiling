import { fireEvent, render } from "@testing-library/react";
import { FormContext } from "../../../context/context";

import ProfileFrom from "./ProfileForm";
import React from "react";
import axios from "axios";

const fakeUserData = {
    name: '',
    birthdate: '',
    category: { name: '' },
    location: {
        city: '',
        country: '',
        postcode: '',
        region: '',
    },
    education: [],
    languages: [],
    occupations: [],
    work: [],
};

const setFakeUserData = jest.fn();

jest.mock('axios')

describe(ProfileFrom, () => {
    it('The right arrow works correctly and the user can go to the next form', async() => {
        axios.get.mockResolvedValue({
            data: [
                { id: 1, name: 'Alice' },
                { id: 2, name: 'Bob' },
            ],
        });

        const { getByText, container } = render(
            <FormContext.Provider value={[fakeUserData, setFakeUserData]}>
                <ProfileFrom nextStep={3} />
            </FormContext.Provider>
        );
        const rightArrow = container.querySelector('#arrowRight')
        for (let _ = 0; _ < 7; _++) {
            fireEvent.click(rightArrow);
        }

        const continueButton = getByText('Continuar');
        fireEvent.click(continueButton);
        expect(nextStep).toEqual(4);
    })
})


