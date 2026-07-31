import { useRef, useEffect, useCallback } from 'react';

export function useDebounceCallback(
  callback: (...args: any[]) => void,
  delaySeconds: number | .5 | 1 | 1.5 | 2
) {
  // Guardamos la función en una referencia 
  const callbackRef = useRef(callback);
  const delaySecondsT = delaySeconds * 1000;

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Guardamos el ID del temporizador
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Creamos la función para ejecutar las acciones
  const debouncedFunction = useCallback(
    (...args: any[]) => {
      // Si el usuario vuelve a disparar la función, cancelamos el temporizador anterior
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Iniciamos un nuevo temporizador
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, (delaySecondsT));
    },
    [delaySecondsT]
  );

  // Limpieza del time out al terminar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedFunction;
}