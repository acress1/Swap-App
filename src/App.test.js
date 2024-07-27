import App from "App";
import useGetSwapData from "hooks/useGetSwapData";

import { render } from "@testing-library/react";

jest.mock('hooks/useGetSwapData');

describe('App.js', () => {
    beforeEach(() => {
        useGetSwapData.mockReturnValue({
            loading: true,
            swapData: null,
            daysWithData: null,
            daySwapData: null,
            getDaySwapData: jest.fn(),
        });

        jest.clearAllMocks();
    });

    it('Should display Greetings', () => {
        const { container } = render(<App />);

        const greetings = container.querySelector('.greetings');

        expect(greetings).toBeInTheDocument();
    });

    it('Should display InlineForm', () => {
        const { container } = render(<App />);

        const inlineForm = container.querySelector('.inlineForm');

        expect(inlineForm).toBeInTheDocument();
    });

    it('Should display Version', () => {
        const { container } = render(<App />);

        const version = container.querySelector('.version');

        expect(version).toBeInTheDocument();
    });

    describe('When useGetSwapData is loading', () => {
        it('Should render Loader', () => {
            useGetSwapData.mockReturnValue({
                loading: true,
                swapData: null,
                daysWithData: null,
                daySwapData: null,
                getDaySwapData: jest.fn(),
            });

            const { container } = render(<App />);

            const loader = container.querySelector('.loading-spinner');

            expect(loader).toBeInTheDocument();
        });
    });

    describe('When SWAPDATA fetched', () => {
        it('Should NOT render Loader', () => {
            useGetSwapData.mockReturnValue({
                loading: false,
                swapData: [],
                daysWithData: [],
                daySwapData: [],
                getDaySwapData: jest.fn(),
            });

            const { container } = render(<App />);

            const loader = container.querySelector('.loading-spinner');

            expect(loader).not.toBeInTheDocument();
        });

        it('BUT should render Calendar', () => {
            useGetSwapData.mockReturnValue({
                loading: false,
                swapData: [],
                daysWithData: [],
                daySwapData: [],
                getDaySwapData: jest.fn(),
            });

            const { container } = render(<App />);

            const calendar = container.querySelector('.calendar');

            expect(calendar).toBeInTheDocument();
        });
    });
});