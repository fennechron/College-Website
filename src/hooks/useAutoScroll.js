import { useCallback, useEffect, useRef } from 'react';

export function observeActivity(element, onChange) {
    let visible = false;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => onChange(visible && !document.hidden && !motion.matches);
    const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        update();
    });
    observer.observe(element);
    document.addEventListener('visibilitychange', update);
    motion.addEventListener('change', update);
    return () => {
        observer.disconnect();
        document.removeEventListener('visibilitychange', update);
        motion.removeEventListener('change', update);
    };
}

export default function useAutoScroll({ axis = 'x', copies = 2, speed = 48, enabled = true, contentKey }) {
    const containerRef = useRef(null);
    const paused = useRef(false);
    const syncRef = useRef(null);
    const pause = useCallback(() => { paused.current = true; syncRef.current?.(); }, []);
    const resume = useCallback(() => { paused.current = false; syncRef.current?.(); }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !enabled) return;
        const positionKey = axis === 'y' ? 'scrollTop' : 'scrollLeft';
        const sizeKey = axis === 'y' ? 'scrollHeight' : 'scrollWidth';
        const viewportKey = axis === 'y' ? 'clientHeight' : 'clientWidth';
        const offsetKey = axis === 'y' ? 'offsetTop' : 'offsetLeft';
        let active = false;
        let frameId = null;
        let previousTime = null;
        let position = container[positionKey];
        let loopSize = 0;
        let canLoop = false;

        const stop = () => {
            if (frameId !== null) cancelAnimationFrame(frameId);
            frameId = null;
            previousTime = null;
        };
        const tick = time => {
            if (previousTime !== null) {
                position = (position + speed * Math.min(time - previousTime, 50) / 1000) % loopSize;
                container[positionKey] = position;
            }
            previousTime = time;
            frameId = requestAnimationFrame(tick);
        };
        const sync = () => {
            const shouldRun = active && !paused.current && canLoop;
            container.dataset.autoscroll = shouldRun ? 'active' : 'paused';
            if (!shouldRun) { stop(); return; }
            if (frameId === null) {
                position = container[positionKey] % loopSize;
                frameId = requestAnimationFrame(tick);
            }
        };
        const measure = () => {
            // Offset between duplicate sets includes the flex gap exactly.
            // Reading it on resize avoids layout reads in every animation frame.
            const setLength = axis === 'y' ? 1 : container.children.length / copies;
            const first = container.children[0];
            const next = container.children[setLength];
            loopSize = first && next ? next[offsetKey] - first[offsetKey] : 0;
            canLoop = loopSize > 0 && container[sizeKey] - container[viewportKey] >= loopSize;
            sync();
        };
        const resize = new ResizeObserver(measure);
        resize.observe(container);
        Array.from(container.children).forEach(child => resize.observe(child));
        measure();
        const disconnectActivity = observeActivity(container, value => { active = value; sync(); });
        syncRef.current = sync;
        return () => {
            stop();
            resize.disconnect();
            disconnectActivity();
            syncRef.current = null;
            delete container.dataset.autoscroll;
        };
    }, [axis, copies, speed, enabled, contentKey]);

    return {
        containerRef, pause, resume,
        pauseHandlers: {
            onMouseEnter: pause,
            onMouseLeave: resume,
            onTouchStart: pause,
            onTouchEnd: resume,
            onTouchCancel: resume,
            onFocusCapture: pause,
            onBlurCapture: event => { if (!event.currentTarget.contains(event.relatedTarget)) resume(); }
        }
    };
}

export function useAutoplay(itemCount, advance, delay, resetKey) {
    const elementRef = useRef(null);
    const advanceRef = useRef(advance);
    advanceRef.current = advance;
    useEffect(() => {
        if (itemCount < 2 || !elementRef.current) return;
        let timer = null;
        const stop = () => { if (timer !== null) clearInterval(timer); timer = null; };
        const disconnect = observeActivity(elementRef.current, active => {
            stop();
            if (active) timer = setInterval(() => advanceRef.current(), delay);
        });
        return () => { stop(); disconnect(); };
    }, [itemCount, delay, resetKey]);
    return elementRef;
}
