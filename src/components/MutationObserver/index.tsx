import { cloneElement, ReactElement, useRef, type FC, type PropsWithChildren } from "react"
import useMutateObserver from "../hooks/useMutateObserver";

export interface MutateObserverProps extends PropsWithChildren {
    options?: MutationObserverInit,
    onMutate?: MutationCallback;
}

const MutateObserver: FC<MutateObserverProps> = (props) => {
    const {
        options,
        onMutate = () => {},
        children
    } = props;

    const elementRef = useRef<HTMLElement>(null)
    useMutateObserver(elementRef.current!, onMutate, options)
    if (!children) {
        return null;
      }
    
    return cloneElement(children as ReactElement, { ref: elementRef })
}

export default MutateObserver