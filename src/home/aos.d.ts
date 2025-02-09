declare module 'aos' {
    interface AosOptions {
        duration?: number;
        easing?: string;
        offset?: number;
        delay?: number;
        once?: boolean;
        mirror?: boolean;
        anchorPlacement?: string;
    }

    interface Aos {
        init(options?: AosOptions): void;
        refresh(): void;
        refreshHard(): void;
    }

    const AOS: Aos;
    export default AOS;
}