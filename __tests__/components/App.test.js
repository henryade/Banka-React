import React from 'react';
import { shallow } from 'enzyme';
import App from '../../src/components/App/App';

describe('App component', () => {
  it('dummy test', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toStrictEqual(expect.objectContaining({}));
  });
});
