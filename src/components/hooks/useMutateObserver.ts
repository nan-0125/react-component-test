import { useEffect, useLayoutEffect, useState } from "react";

const defaultOptions: MutationObserverInit = {
    subtree: true,
    childList: true,
    attributeFilter: ['style', 'class'],
};

export default function useMutateObserver(
    targetProp: HTMLElement | HTMLElement[],
    callback: MutationCallback,
    options: MutationObserverInit = defaultOptions
) {
    const [target, setTarget] = useState<HTMLElement | HTMLElement[]>()

    useLayoutEffect(() => {
        setTarget(targetProp)
    })

    useEffect(() => {
        if (!target) return
        let instance: MutationObserver
        try {
            if (!('MutationObserver' in window)) 
                throw new Error('浏览器不支持mutationObserver, 因此无法使用该api监控DOM变化')
            instance = new MutationObserver(callback)
            const nodeList = Array.isArray(target) ? target : [target]
            nodeList.forEach((node) => {
                instance.observe(node, options)
            })
        } catch (error) {
            console.error(error)
        }

        return () => {
            instance?.takeRecords()
            instance?.disconnect()
        }
    }, [options, target])
}