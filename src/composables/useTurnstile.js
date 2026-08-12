import {
  nextTick,
  ref,
} from 'vue';

export function useTurnstile({
  siteKey,
  action = 'contact',
  onError,
} = {}) {
  const turnstileToken = ref('');
  const turnstileWidgetId = ref(null);
  const turnstileContainer = ref(null);

  // ==========================================================
  // LOAD TURNSTILE SCRIPT
  // ==========================================================

  const loadTurnstileScript = () => {
    return new Promise(
      (resolve, reject) => {
        // Turnstile is already available.
        if (window.turnstile) {
          resolve();
          return;
        }

        // Turnstile script is already being loaded.
        const existingScript =
          document.querySelector(
            'script[src*="challenges.cloudflare.com/turnstile"]'
          );

        if (existingScript) {
          existingScript.addEventListener(
            'load',
            resolve,
            { once: true }
          );

          existingScript.addEventListener(
            'error',
            reject,
            { once: true }
          );

          return;
        }

        // Create the Turnstile script.
        const script =
          document.createElement(
            'script'
          );

        script.src =
          'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

        script.async = true;
        script.defer = true;

        script.onload = resolve;
        script.onerror = reject;

        document.head.appendChild(
          script
        );
      }
    );
  };

  // ==========================================================
  // RENDER TURNSTILE
  // ==========================================================

  const renderTurnstile = async () => {
    await loadTurnstileScript();

    await nextTick();

    if (
      !window.turnstile ||
      !turnstileContainer.value ||
      turnstileWidgetId.value !== null
    ) {
      return;
    }

    if (!siteKey) {
      const error =
        new Error(
          'VITE_TURNSTILE_SITE_KEY is not configured.'
        );

      console.error(
        'Turnstile configuration error:',
        error
      );

      onError?.(error);

      return;
    }

    turnstileWidgetId.value =
      window.turnstile.render(
        turnstileContainer.value,
        {
          sitekey: siteKey,

          action,

          callback: (token) => {
            console.log(
              'Turnstile token received.'
            );

            turnstileToken.value =
              token;
          },

          'expired-callback': () => {
            console.warn(
              'Turnstile token expired.'
            );

            turnstileToken.value = '';
          },

          'timeout-callback': () => {
            console.warn(
              'Turnstile timed out.'
            );

            turnstileToken.value = '';
          },

          'error-callback': () => {
            console.error(
              'Turnstile encountered an error.'
            );

            turnstileToken.value = '';

            onError?.(
              new Error(
                'Turnstile encountered an error.'
              )
            );
          },
        }
      );
  };

  // ==========================================================
  // INITIALIZE
  // ==========================================================

  const initializeTurnstile =
    async () => {
      try {
        await renderTurnstile();
      } catch (error) {
        console.error(
          'Failed to initialize Turnstile:',
          error
        );

        onError?.(error);

        throw error;
      }
    };

  // ==========================================================
  // RESET
  // ==========================================================

  const resetTurnstile = () => {
    turnstileToken.value = '';

    if (
      window.turnstile &&
      turnstileWidgetId.value !== null
    ) {
      window.turnstile.reset(
        turnstileWidgetId.value
      );
    }
  };

  // ==========================================================
  // REMOVE
  // ==========================================================

  const removeTurnstile = () => {
    if (
      window.turnstile &&
      turnstileWidgetId.value !== null
    ) {
      window.turnstile.remove(
        turnstileWidgetId.value
      );
    }

    turnstileWidgetId.value = null;
    turnstileToken.value = '';
  };

  return {
    turnstileToken,
    turnstileWidgetId,
    turnstileContainer,

    initializeTurnstile,
    resetTurnstile,
    removeTurnstile,
  };
}