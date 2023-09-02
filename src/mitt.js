import mitt from 'mitt';

// Export that emitter
export const emitter = mitt();
export const useEmitter = () => ({ emitter: emitter })