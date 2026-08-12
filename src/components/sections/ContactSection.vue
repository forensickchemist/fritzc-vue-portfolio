<script setup>
import {
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue';

import { socialLinks } from '../../data/portfolio';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();

const TURNSTILE_SITE_KEY =
  import.meta.env.VITE_TURNSTILE_SITE_KEY;

const fullName = ref('');
const email = ref('');
const inquiryType = ref('');
const message = ref('');

const isLoading = ref(false);

const turnstileToken = ref('');
const turnstileWidgetId = ref(null);
const turnstileContainer = ref(null);

let turnstileScript = null;

// ============================================================
// LOAD TURNSTILE
// ============================================================

const loadTurnstileScript = () => {
  return new Promise((resolve, reject) => {
    // Turnstile already loaded
    if (window.turnstile) {
      resolve();
      return;
    }

    // Script is already being loaded
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

    // Create Turnstile script
    turnstileScript =
      document.createElement('script');

    turnstileScript.src =
      'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

    turnstileScript.async = true;
    turnstileScript.defer = true;

    turnstileScript.onload = resolve;
    turnstileScript.onerror = reject;

    document.head.appendChild(
      turnstileScript
    );
  });
};

// ============================================================
// RENDER TURNSTILE
// ============================================================

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

  turnstileWidgetId.value =
    window.turnstile.render(
      turnstileContainer.value,
      {
        sitekey: TURNSTILE_SITE_KEY,

        action: 'contact',

        callback: (token) => {
          turnstileToken.value =
            token;
        },

        'expired-callback': () => {
          turnstileToken.value = '';
        },

        'timeout-callback': () => {
          turnstileToken.value = '';
        },

        'error-callback': () => {
          turnstileToken.value = '';

          notyf.error(
            'Captcha could not be loaded. Please refresh the page and try again.'
          );
        },
      }
    );
};

// ============================================================
// RESET TURNSTILE
// ============================================================

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

// ============================================================
// SUBMIT FORM
// ============================================================

const submitForm = async () => {
  if (isLoading.value) {
    return;
  }

  // Make sure Turnstile has been completed
  if (!turnstileToken.value) {
    notyf.error(
      'Please complete the captcha verification.'
    );

    return;
  }

  isLoading.value = true;

  try {
    const response = await fetch(
      '/api/contact',
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify({
          fullName:
            fullName.value.trim(),

          email:
            email.value.trim(),

          inquiryType:
            inquiryType.value,

          message:
            message.value.trim(),

          turnstileToken:
            turnstileToken.value,
        }),
      }
    );

    let result = null;

    try {
      result =
        await response.json();
    } catch {
      result = null;
    }

    if (!response.ok) {
      throw new Error(
        result?.message ||
          'Failed to send message.'
      );
    }

    notyf.success(
      'Message Sent!'
    );

    // Clear form
    fullName.value = '';
    email.value = '';
    inquiryType.value = '';
    message.value = '';

  } catch (error) {
    console.error(
      'Contact form submission error:',
      error
    );

    notyf.error(
      error.message ||
        'Failed to send message.'
    );
  } finally {
    /*
     * Turnstile tokens are single-use.
     * Always reset the widget after submission.
     */
    resetTurnstile();

    isLoading.value = false;
  }
};

// ============================================================
// MOUNT
// ============================================================

onMounted(() => {
  renderTurnstile().catch(
    (error) => {
      console.error(
        'Failed to initialize Turnstile:',
        error
      );

      notyf.error(
        'Captcha could not be loaded. Please refresh the page and try again.'
      );
    }
  );
});

// ============================================================
// UNMOUNT
// ============================================================

onBeforeUnmount(() => {
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

  /*
   * Don't remove the global Turnstile script here.
   *
   * Other components/pages may still use it.
   */
});
</script>

<template>
  <section
    id="contact"
    class="section contact-section"
  >
    <div class="container">

      <!-- ==================================================
           HEADER
           ================================================== -->

      <header class="contact-header">
        <h2>
          LET'S
          <span class="highlight-word">
            BUILD
          </span>
          SOMETHING
          <span class="highlight-word">
            GREAT
          </span>
        </h2>

        <p>
          Have a project in mind?
          Send a message and let's connect.
        </p>
      </header>

      <!-- ==================================================
           CONTACT GRID
           ================================================== -->

      <div class="contact-grid">

        <!-- ==================================================
             MAP
             ================================================== -->

        <div class="map-card">
          <iframe
            src="https://maps.google.com/maps?q=Quezon%20City&t=&z=13&ie=UTF8&iwloc=&output=embed"
            class="map-frame"
            title="Map of Quezon City"
            allowfullscreen
            loading="lazy"
          ></iframe>
        </div>

        <!-- ==================================================
             FORM
             ================================================== -->

        <div class="form-card">
          <form
            class="contact-form"
            @submit.prevent="submitForm"
          >

            <h3>
              Send a Message
            </h3>

            <!-- Full Name -->

            <div class="field">
              <label
                for="full-name"
              >
                Full Name
              </label>

              <input
                id="full-name"
                v-model="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your name"
                autocomplete="name"
                required
              />
            </div>

            <!-- Email -->

            <div class="field">
              <label
                for="email"
              >
                Email Address
              </label>

              <input
                id="email"
                v-model="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                autocomplete="email"
                required
              />
            </div>

            <!-- Inquiry Type -->

            <div class="field">
              <label
                for="inquiry-type"
              >
                Inquiry Type
              </label>

              <select
                id="inquiry-type"
                v-model="inquiryType"
                name="inquiryType"
                required
              >
                <option
                  value=""
                  disabled
                >
                  Select an option
                </option>

                <option
                  value="Web Development"
                >
                  Web Development
                </option>

                <option
                  value="Data Analytics"
                >
                  Data Analytics
                </option>

                <option
                  value="UI/UX Design"
                >
                  UI/UX Design
                </option>

                <option
                  value="Collaboration"
                >
                  Collaboration
                </option>

                <option
                  value="Other"
                >
                  Other
                </option>
              </select>
            </div>

            <!-- Message -->

            <div class="field">
              <label
                for="message"
              >
                Message
              </label>

              <textarea
                id="message"
                v-model="message"
                name="message"
                rows="5"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>

            <!-- ==================================================
                 CLOUDFLARE TURNSTILE
                 ================================================== -->

            <div
              class="turnstile-wrapper"
            >
              <div
                ref="turnstileContainer"
                class="cf-turnstile"
              ></div>
            </div>

            <!-- Submit -->

            <button
              type="submit"
              class="submit-button"
              :disabled="isLoading"
            >
              {{
                isLoading
                  ? 'Sending...'
                  : 'Send Message'
              }}
            </button>

          </form>
        </div>
      </div>

      <!-- ==================================================
           SOCIAL LINKS
           ================================================== -->

      <div class="social-row">

        <h3>
          Connect With Me
        </h3>

        <div class="social-container">
          <a
            v-for="[name, href, image] in socialLinks"
            :key="name"
            :href="href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="name"
          >
            <img
              :src="image"
              :alt="name"
              class="social-icon-img"
              loading="lazy"
            />
          </a>
        </div>

      </div>

    </div>
  </section>
</template>

<style scoped>
/* ============================================================
   CONTACT SECTION
   ============================================================ */

.contact-section {
  padding-block: clamp(4rem, 8vw, 5rem);
  background: var(--color-bg);
}

.contact-header {
  text-align: center;
  margin-bottom: clamp(2rem, 5vw, 3rem);
}

.contact-header h2 {
  margin: 0;
  font-family: var(--font-heading);
  font-size: var(--text-heading-xl);
  font-weight: 700;
  letter-spacing: -0.018em;
  color: var(--color-text-h);
}

.contact-header p {
  margin: 0.4rem 0 0;
  font-family: var(--font-body);
  font-size: var(--text-body-md);
  color: var(--color-text-muted);
}

/* ============================================================
   CONTACT GRID
   ============================================================ */

.contact-grid {
  display: grid;
  grid-template-columns:
    repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
}

/* ============================================================
   CARDS
   ============================================================ */

.map-card,
.form-card {
  min-height: 540px;
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow:
    0 0.125rem 0.5rem
    rgba(0, 0, 0, 0.08);
}

.map-frame {
  width: 100%;
  height: 100%;
  min-height: 540px;
  border: 0;
  display: block;
}

/* ============================================================
   CONTACT FORM
   ============================================================ */

.contact-form {
  height: 100%;
  padding: 1.5rem;
}

.contact-form h3 {
  margin: 0 0 1.5rem;
  font-family: var(--font-heading);
  font-size: var(--text-heading-md);
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--color-text-h);
}

/* ============================================================
   FORM FIELDS
   ============================================================ */

.field {
  margin-bottom: 1rem;
}

.field label {
  display: block;
  margin-bottom: 0.4rem;
  font-family: var(--font-label);
  font-size: var(--text-label-md);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-label);
}

.field input,
.field select,
.field textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-deep-teal);
  border-radius: 10px;
  background: var(--color-input-bg);
  color: var(--color-text-body);
  font-family: var(--font-body);
  font-size: var(--text-body-md);
}

.field input::placeholder,
.field textarea::placeholder {
  color: var(--color-text-muted);
}

.field select option {
  background: var(--color-surface);
  color: var(--color-text-body);
}

.field select option:disabled {
  color: var(--color-text-muted);
}

.field select:invalid {
  color: var(--color-text-muted);
}

.field select:valid {
  color: var(--color-text-body);
}

.field textarea {
  resize: vertical;
  min-height: 130px;
}

/* ============================================================
   FORM FOCUS
   ============================================================ */

.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: 2px solid var(--color-teal);
  outline-offset: 1px;
}

/* ============================================================
   TURNSTILE
   ============================================================ */

.turnstile-wrapper {
  display: flex;
  justify-content: flex-start;
  margin: 0.25rem 0 1rem;
  min-height: 65px;
}

.cf-turnstile {
  min-height: 65px;
}

/* ============================================================
   SUBMIT BUTTON
   ============================================================ */

.submit-button {
  padding: 0.7rem 1.25rem;
  border: 1px solid var(--color-deep-teal);
  border-radius: 10px;
  background: var(--color-deep-teal);
  color: #fff;
  font-family: var(--font-body);
  font-size: var(--text-ui-md);
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease,
    opacity 0.2s ease;
}

.submit-button:hover:not(:disabled) {
  background: var(--color-teal);
  border-color: var(--color-teal);
}

.submit-button:focus-visible {
  outline: 2px solid var(--color-teal);
  outline-offset: 2px;
}

.submit-button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

/* ============================================================
   SOCIAL
   ============================================================ */

.social-row {
  margin-top: 2.5rem;
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  text-align: center;
}

.social-row h3 {
  margin: 0 0 1.5rem;
  font-family: var(--font-label);
  font-size: var(--text-label-lg);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-label);
}

.social-container {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  background: var(--color-social-bg);
  padding: 1.5rem;
  border-radius: 8px;
}

.social-container a {
  display: inline-flex;
}

.social-icon-img {
  width: 50px;
  height: 50px;
  object-fit: contain;
  transition:
    transform 0.3s ease;
}

.social-icon-img:hover {
  transform: scale(1.2);
}

/* ============================================================
   TABLET
   ============================================================ */

@media (max-width: 991.98px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .map-card,
  .form-card,
  .map-frame {
    min-height: 420px;
  }
}

/* ============================================================
   MOBILE
   ============================================================ */

@media (max-width: 575.98px) {
  .contact-form {
    padding: 1.25rem;
  }

  .turnstile-wrapper {
    overflow-x: auto;
  }

  .social-container {
    gap: 1rem;
  }

  .social-icon-img {
    width: 44px;
    height: 44px;
  }
}
</style>