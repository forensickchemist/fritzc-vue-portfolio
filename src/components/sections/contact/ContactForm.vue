<script setup>
import { onMounted, onUnmounted, ref, } from 'vue';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import { useTurnstile } from '../../../composables/useTurnstile';

const notyf = new Notyf();

const fullName = ref('');
const email = ref('');
const inquiryType = ref('');
const message = ref('');

const isLoading = ref(false);

// ============================================================
// TURNSTILE
// ============================================================

const {
  turnstileToken,
  turnstileContainer,
  initializeTurnstile,
  resetTurnstile,
  removeTurnstile,
} = useTurnstile({
  siteKey:
    import.meta.env.VITE_TURNSTILE_SITE_KEY,

  action: 'contact',

  onError: () => {
    notyf.error(
      'Captcha could not be loaded. Please refresh the page and try again.'
    );
  },
});

// ============================================================
// SUBMIT FORM
// ============================================================

const submitForm = async () => {
  if (isLoading.value) {
    return;
  }

  // ----------------------------------------------------------
  // CAPTCHA CHECK
  // ----------------------------------------------------------

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

    // --------------------------------------------------------
    // SUCCESS
    // --------------------------------------------------------

    notyf.success(
      'Message Sent!'
    );

    fullName.value = '';
    email.value = '';
    inquiryType.value = '';
    message.value = '';

    /*
     * Turnstile tokens are single-use.
     * Reset after successful submission so the
     * next submission receives a fresh token.
     */
    resetTurnstile();

  } catch (error) {
    console.error(
      'Contact form submission error:',
      error
    );

    notyf.error(
      error.message ||
        'Failed to send message.'
    );

    /*
     * Reset after an error as well because the token
     * may already have been consumed by Formtorch.
     */
    resetTurnstile();

  } finally {
    isLoading.value = false;
  }
};

// ============================================================
// MOUNT
// ============================================================

onMounted(() => {
  initializeTurnstile().catch(
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

onUnmounted(() => {
  removeTurnstile();
});
</script>

<template>
  <div class="form-card">

    <form
      class="contact-form"
      @submit.prevent="submitForm"
    >

      <h3>
        Send a Message
      </h3>

      <!-- ==================================================
           FULL NAME
           ================================================== -->

      <div class="field">
        <label for="full-name">
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

      <!-- ==================================================
           EMAIL
           ================================================== -->

      <div class="field">
        <label for="email">
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

      <!-- ==================================================
           INQUIRY TYPE
           ================================================== -->

      <div class="field">
        <label for="inquiry-type">
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

          <option value="Web Development">
            Web Development
          </option>

          <option value="Data Analytics">
            Data Analytics
          </option>

          <option value="UI/UX Design">
            UI/UX Design
          </option>

          <option value="Collaboration">
            Collaboration
          </option>

          <option value="Other">
            Other
          </option>
        </select>
      </div>

      <!-- ==================================================
           MESSAGE
           ================================================== -->

      <div class="field">
        <label for="message">
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

      <!-- ==================================================
           SUBMIT
           ================================================== -->

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
</template>

<style scoped>
/* ============================================================
   FORM CARD
   ============================================================ */

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
   RESPONSIVE
   ============================================================ */

@media (max-width: 991.98px) {
  .form-card {
    min-height: 420px;
  }
}

@media (max-width: 575.98px) {
  .contact-form {
    padding: 1.25rem;
  }

  .turnstile-wrapper {
    overflow-x: auto;
  }
}
</style>