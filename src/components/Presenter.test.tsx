import { render } from '@testing-library/react';
import React from 'react';
import { Presenter } from './Presenter';
import { AnyWordT } from './displays/types';

describe('WordPresenter', () => {
    test('renders', () => {
        const { container } = render(
            <Presenter word={({ type: 'bogus' } as unknown) as AnyWordT} />,
        );
        expect(container).toMatchSnapshot();
    });
});
