import { screen, render } from "@testing-library/react";

import ProfileCard from './ProfileCard';
import { profiles } from "../../../constants/profiles";
import React from "react";
import axios from "axios";

describe(ProfileCard, () => {

    const profile = profiles[0];

    it('Information inside the profile is displayed correctly', () => {
        const { getByTestId } = render(<ProfileCard profile={profile} />);

        const name = getByTestId('name').textContent;
        expect(name).toEqual(profile['name']);

        const category = getByTestId('category').textContent;
        expect(category).toEqual("📕 " + profile['categories'][0].name);

        const area = getByTestId('area').textContent;
        expect(area).toEqual("🎓 " + profile['education']['area']);

        const languages = getByTestId('languages').textContent;
        expect(languages).toEqual("🗣️ " + profile['languages']);

        const occupations = screen.getAllByRole('listitem');
        expect(occupations).toHaveLength(profile['occupations'].length)

    })
})