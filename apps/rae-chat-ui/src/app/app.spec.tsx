import { render } from '@testing-library/react';

import App from './app';

describe('Rae Chat UI', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<App />);
        expect(baseElement).toBeTruthy();
    });

    it('should match last snapshot', () => {
        const { container } = render(<App />);
        expect(container).toMatchSnapshot();
    });
});
