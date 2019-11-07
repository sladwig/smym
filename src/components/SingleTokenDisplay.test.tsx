import { render } from '@testing-library/react';
import React from 'react';
import { SingleTokenDisplay } from './SingleTokenDisplay';

describe('SingleTokenDisplay', () => {
    test('renders', () => {
        const { container } = render(<SingleTokenDisplay />);
        expect(container).toMatchSnapshot();
    });

    test('displays with value', () => {
        const { container } = render(<SingleTokenDisplay value="abc" />);
        expect(container.firstChild.innerHtml).toEqual('abc');
    });

    test('can use mappper', () => {
        const mapper = jest.fn().mockReturnValue('333');
        render(<SingleTokenDisplay value="abc" mapper={[mapper, mapper]} />);
        expect(mapper.mock.calls).toEqual([['abc'], ['333']]);
    });
});
