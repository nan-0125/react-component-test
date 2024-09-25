import { PropsWithChildren, ForwardRefRenderFunction, useMemo, useEffect, useImperativeHandle, forwardRef } from "react";
import { createPortal } from "react-dom";

export interface PortalProps extends PropsWithChildren {
    attach?: HTMLElement | string;
}

export interface PortalRef {
    container: HTMLDivElement
}

export const getAttach = (attach: PortalProps['attach']) => {
    if (typeof attach === 'string') {
        return document.querySelector(attach)
    }
    if (typeof attach === 'object' && attach instanceof window.HTMLElement) {
        return attach
    }
}

const Portal: ForwardRefRenderFunction<PortalRef, PortalProps> = (props, ref) => {
    const {
        attach = document.body,
        children
    } = props;

    const container = useMemo(() => {
        const el = document.createElement('div')
        el.className = `portal-wrapper`
        return el
    }, [])

    useEffect(() => {
        const parentElement = getAttach(attach)
        parentElement?.appendChild?.(container)
        return () => {
            parentElement?.removeChild?.(container)
        }
    }, [container, attach])

    useImperativeHandle(ref, () => ({
        container
    }))

    return createPortal(children, container)
}

export default forwardRef(Portal)