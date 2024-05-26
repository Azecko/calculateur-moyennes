import React from 'react';
import { render, fireEvent, screen, queryByAttribute } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';
import Entry from './Entry';

// Mock de la fonction fetch
global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({})
}));

jest.doMock('./Entry', () => {
    return () =>(
        <div className={'row w-100'}>
            <div className={'col-6'}>
                <input id={'name_1'} data-testid="name_1" className={'form-control'} type="text" />
            </div>
            <div className={'col-6'}>
                <input id={'grade_1'} data-testid="grade_1" className={'form-control'} type="text" />
            </div>
        </div>
    )
});

describe('Entry testing', () => {


    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Typing in the name input', () => {
        render(<Entry />)

        userEvent.type(screen.getByTestId("name_1"), 'testTyping');

        expect(screen.getByTestId("name_1")).toHaveValue("testTyping");
    })

    test('Typing in the grade input', () => {
        render(<Entry />)

        userEvent.type(screen.getByTestId("grade_1"), '2');

        expect(screen.getByTestId("grade_1")).toHaveValue("2");
    })
});
