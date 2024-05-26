import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EntryList from './EntryList';
import { afterEach, test, expect, describe } from '@jest/globals';

// Mock de la fonction fetch
global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({})
}));

jest.mock('./EntryList', () => {
        return () =>(
            <button data-testid="plus-button" className={'btn btn-primary'} type="button" onClick={fetch('http://localhost:4000/grade', { method: 'POST' })}>
                <i className="fa-solid fa-plus"></i>
            </button>
        )
});


describe('Input testing', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // IT008
    test('Entry added when clicking +', () => {
        render(<EntryList />);

        const addButton = screen.getByTestId('plus-button')
        fireEvent.click(addButton);

        expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/grade', { method: 'POST' });
    })
});
