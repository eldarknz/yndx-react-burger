import React from "react";
import renderer from "react-test-renderer";
import { shallow } from 'enzyme';

import FancyLink from "./Link";

/*it("The link is rendering without errors", () => {
    const component = renderer.create(<FancyLink>Ссылка</FancyLink>).toJSON();
    expect(component).toMatchSnapshot();
});*/

/*it('Нажатие на кнопку вызывает корректный alert', () => {
    window.alert = jest.fn();

        // Рендерим ссылку в переменную
    const output = shallow(
        <FancyLink onClick={() => alert('Ссылка')}>Ссылка</FancyLink>
    );
        // Имитируем нажатие на ссылку
    output.simulate('click');
        
        // Проверяем, что alert сработал с правильным текстом предупреждения
    expect(window.alert).toHaveBeenCalledWith('Ссылка');
});*/