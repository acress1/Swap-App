import { renderHook, act } from '@testing-library/react';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import useGetSwapData from 'hooks/useGetSwapData';

beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: [{ Date: '01/01/2021' }] }),
    }));
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('useGetSwapData.js', () => {
    const BASEURL = 'http://example.com';

    describe('When data are NOT fetched yet', () => {
        it('Loading should be true', () => {
            const { result } = renderHook(() => useGetSwapData(BASEURL));

            expect(result.current.swapData).toBeUndefined();
            expect(result.current.daysWithData).toBeUndefined();
            expect(result.current.daySwapData).toBeUndefined();

            expect(result.current.loading).toBe(true);
        });
    });

    describe('When data are fetched', () => {
        it('Loading should be false', () => {
            
        });

        it('Should set states correctly', () => {
            
        });
    });
});