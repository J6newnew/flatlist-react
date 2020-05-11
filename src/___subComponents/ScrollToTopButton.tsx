import {element, func, node, number, oneOf, oneOfType} from 'prop-types';
import React, {createRef, Ref, useEffect, useState} from 'react';
import {isFunction} from '../___utils/isType';
import {btnPosition} from './uiFunctions';

const ScrollToTopButton = (props: any) => {
    const anchor: Ref<HTMLElement> = createRef();
    const {button, position, padding, offset} = props;
    const btn = isFunction(button) ? button() : button;
    const [mounted, setMounted] = useState(false);

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        const buttonElement = (anchor as any).current.nextElementSibling;
        const container = (anchor as any).current.parentNode;
        const positionBtn = btnPosition(container, buttonElement);
        const pos = position.split(' ');
        const updateBtnPosition = () => positionBtn(pos[0], pos[1], padding, offset);

        window.addEventListener('resize', updateBtnPosition);

        container.addEventListener('scroll', updateBtnPosition);

        buttonElement.addEventListener('click', () => {
            container.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        setTimeout(() => updateBtnPosition(), 250);

        setMounted(true);
        return () => {
            window.removeEventListener('resize', updateBtnPosition);
        };
    }, []);

    return (
        <>
            {!mounted && <span ref={anchor} style={{display: 'none'}}/>}
            {button ? btn : <button type="button">To Top</button>}
        </>
    );
};

ScrollToTopButton.propTypes = {
    button: oneOfType([node, element, func]),
    position: oneOf(['top right', 'top left', 'bottom right', 'bottom left']),
    padding: number,
    offset: number
};

ScrollToTopButton.defaultProps = {
    button: null,
    padding: 20,
    offset: 50,
    position: 'bottom right'
};

export default ScrollToTopButton;
