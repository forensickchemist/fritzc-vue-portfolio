<script setup>
import { socialLinks } from '../../data/portfolio';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();

const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const SITE_KEY =
  import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const subject = 'New message from Portfolio Contact Form';

const fullName = ref('');
const email = ref('');
const inquiryType = ref('');
const message = ref('');
const isLoading = ref(false);

const recaptchaContainer = ref(null);
const recaptchaWidgetId = ref(null);
const recaptchaToken = ref('');

let recaptchaInterval = null;

/* ============================================================
   RECAPTCHA
   ============================================================ */

const onRecaptchaSuccess = (token) => {
  recaptchaToken.value = token;
};

const onRecaptchaExpired = () => {
  recaptchaToken.value = '';
};

const renderRecaptcha = () => {
  if (!window.grecaptcha || !recaptchaContainer.value) {
    console.error('reCAPTCHA not loaded.');
    return;
  }

  recaptchaWidgetId.value = window.grecaptcha.render(
    recaptchaContainer.value,
    {
      sitekey: SITE_KEY,
      size: 'normal',
      callback: onRecaptchaSuccess,
      'expired-callback': onRecaptchaExpired,
    }
  );
};

const resetRecaptcha = () => {
  if (
    recaptchaWidgetId.value !== null &&
    window.grecaptcha
  ) {
    window.grecaptcha.reset(recaptchaWidgetId.value);
    recaptchaToken.value = '';
  }
};

/* ============================================================
   FORM SUBMISSION
   ============================================================ */

const submitForm = async () => {
  if (!recaptchaToken.value) {
    notyf.error('Please verify that you are not a robot.');
    return;
  }

  isLoading.value = true;

  try {
    const response = await fetch(
      'https://api.web3forms.com/submit',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject,
          fullName: fullName.value,
          email: email.value,
          inquiryType: inquiryType.value,
          message: message.value,
          'g-recaptcha-response': recaptchaToken.value,
        }),
      }
    );

    const result = await response.json();

    if (result.success) {
      notyf.success('Message Sent!');

      fullName.value = '';
      email.value = '';
      inquiryType.value = '';
      message.value = '';
    } else {
      console.error('Web3Forms response:', result);

      notyf.error(
        result.message || 'Failed to send message.'
      );


      // notyf.error(
      //   result.message || 'Failed to send message.'
      // );
    }
  } catch (error) {
    console.error(error);
    notyf.error('Failed to send message.');
  } finally {
    isLoading.value = false;
    resetRecaptcha();
  }
};

/* ============================================================
   LIFECYCLE
   ============================================================ */

onMounted(() => {
  recaptchaInterval = setInterval(() => {
    if (
      window.grecaptcha &&
      window.grecaptcha.render &&
      recaptchaContainer.value
    ) {
      renderRecaptcha();

      clearInterval(recaptchaInterval);
      recaptchaInterval = null;
    }
  }, 100);
});

onBeforeUnmount(() => {
  if (recaptchaInterval) {
    clearInterval(recaptchaInterval);
    recaptchaInterval = null;
  }
});
</script>

<template>
  <section id="contact" class="section contact-section">
    <div class="container">

      <!-- Contact Header -->
      <header class="contact-header">
        <h2>
          LET'S
          <span class="highlight-word">BUILD</span>
          SOMETHING
          <span class="highlight-word">GREAT</span>
        </h2>

        <p>
          Have a project in mind? Send a message and let's connect.
        </p>
      </header>

      <!-- Contact Grid -->
      <div class="contact-grid">

        <!-- Map -->
        <div class="map-card">
          <iframe
            src="https://maps.google.com/maps?q=Quezon%20City&t=&z=13&ie=UTF8&iwloc=&output=embed"
            class="map-frame"
            title="Map of Quezon City"
            allowfullscreen
            loading="lazy"
          ></iframe>
        </div>

        <!-- Contact Form -->
        <div class="form-card">
          <form
            class="contact-form"
            @submit.prevent="submitForm"
          >
            <h3>Send a Message</h3>

            <!-- Full Name -->
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

            <!-- Email -->
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

            <!-- Inquiry Type -->
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

            <!-- Message -->
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

            <!-- reCAPTCHA -->
            <div
              ref="recaptchaContainer"
              class="recaptcha-container"
            ></div>

            <!-- Submit -->
            <button
              type="submit"
              class="submit-button"
              :disabled="isLoading"
            >
              {{ isLoading ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
        </div>
      </div>

      <!-- Social Links -->
      <div class="social-row">
        <h3>Connect With Me</h3>

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
  grid-template-columns: repeat(2, minmax(0, 1fr));
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
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.08);
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

/* ============================================================
   SELECT OPTIONS
   ============================================================ */

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

/* ============================================================
   TEXTAREA
   ============================================================ */

.field textarea {
  resize: vertical;
  min-height: 130px;
}

/* ============================================================
   FORM FOCUS STATES
   ============================================================ */

.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: 2px solid var(--color-teal);
  outline-offset: 1px;
}

/* ============================================================
   RECAPTCHA
   ============================================================ */

.recaptcha-container {
  margin-bottom: 1rem;
  min-height: 78px;
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
    transform 0.2s ease;
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
   SOCIAL SECTION
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
  transition: transform 0.3s ease;
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

  .recaptcha-container {
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