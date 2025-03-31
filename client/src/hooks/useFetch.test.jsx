import { renderHook, waitFor } from '@testing-library/react';
import { useFetch } from './useFetch';
import axios from 'axios';

jest.mock('axios');


describe('useFetch', () => {
    it('It must return the fetched data correctly', async () => {
        const mockData = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
        axios.get.mockResolvedValueOnce({ data: mockData });

        const { result } = renderHook(() => useFetch('http://localhost:3000/users/categories?category=Tecnología de la Información'));

        expect(result.current.data).toBe(null);
        expect(result.current.isLoading).toBe(true);
        expect(result.current.error).toBe(null);

        await waitFor(() => {
            expect(result.current.data).not.toBe(null);
        });

        expect(result.current.data).toEqual(mockData);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBe(null);
    })
})