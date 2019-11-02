export const w = (_: string) => _.split(' ');

// dispatch
// creates a CustomEvent,
// takes it and initilizes it with the init Object
// uses init.on as target
// also returns a preventMock to check if preventDefault was called
export function dispatch(
    eventType: string,
    init: { on?: HTMLElement | Document | SVGElement; [_: string]: any } = {},
) {
    const target = init.on || document;
    delete init.on;
    const customEvent = new CustomEvent(eventType);

    const preventMock = jest.fn();
    customEvent.preventDefault = preventMock;

    Object.entries(init).forEach(([key, value]) => {
        (customEvent as any)[key] = value;
    });

    target.dispatchEvent(customEvent);
    return { preventMock };
}
