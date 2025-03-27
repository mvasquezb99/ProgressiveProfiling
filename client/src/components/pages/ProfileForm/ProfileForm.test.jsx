import { fireEvent, render, waitFor } from "@testing-library/react";
import { FormContext } from "../../../context/context";

import ProfileFrom from "./ProfileForm";
import React from "react";
import axios from "axios";

const fakeUserData = {
    name: '',
    birthdate: '',
    category: { name: 'Tecnología de la Información' },
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
    it('The right arrow works correctly and the user can go to the next form', async () => {
        axios.get.mockResolvedValue({
            data: [
                { name: 'Miguel' },
                { name: 'Samuel' },
                { name: 'Tomas' },
                { name: 'Mateo' },
                { name: 'Isaias' },
                { name: 'Thomas' },
                { name: 'Andre' },
            ]
        });
        axios.post.mockResolvedValue({
            response: {
                data: [
                    {},
                    {},
                    {},
                ]
            },
        });

        const { getByText, container } = render(
            <FormContext.Provider value={[fakeUserData, setFakeUserData]}>
                <ProfileFrom nextStep={3} />
            </FormContext.Provider>
        );

        const rightArrow = container.querySelector('#arrowRight')

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledTimes(1);
        });

        for (let _ = 0; _ < 7; _++) {
            fireEvent.click(rightArrow);
        }
        const continueButton = getByText('Continuar');
        expect(continueButton).toBeInTheDocument()
    })
})


