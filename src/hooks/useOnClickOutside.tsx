import { useEffect, type RefObject } from 'react';

type Event = MouseEvent | TouchEvent;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref.current;
      
      // Si no hay referencia o si el clic fue DENTRO del elemento, no hacemos nada
      if (!el || el.contains((event.target as Node))) {
        return;
      }

      // Si el clic fue FUERA, ejecutamos la función
      handler(event);
    };

    // Escuchamos mousedown (ratón) y touchstart (móvil)
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      // Limpiamos los eventos al desmontar
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]); // Se re-ejecuta si cambia la ref o el handler
};