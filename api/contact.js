const SITEVERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify';

const EXPECTED_ACTION = 'contact';

export default async function handler(req, res) {
  // ------------------------------------------------------------
  // Method check
  // ------------------------------------------------------------

  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Method not allowed.',
    });
  }

  const {
    fullName,
    email,
    inquiryType,
    message,
    turnstileToken,
  } = req.body ?? {};

  // ------------------------------------------------------------
  // Validate form fields
  // ------------------------------------------------------------

  if (
    typeof fullName !== 'string' ||
    typeof email !== 'string' ||
    typeof inquiryType !== 'string' ||
    typeof message !== 'string'
  ) {
    return res.status(400).json({
      message: 'Please complete all required fields.',
    });
  }

  // ------------------------------------------------------------
  // Validate Turnstile token
  // ------------------------------------------------------------

  if (
    typeof turnstileToken !== 'string' ||
    turnstileToken.length === 0 ||
    turnstileToken.length > 2048
  ) {
    return res.status(403).json({
      message: 'Captcha verification is required.',
    });
  }

  // ------------------------------------------------------------
  // Server configuration
  // ------------------------------------------------------------

  const secret = process.env.TURNSTILE_SECRET;

  const expectedHostnames = new Set(
    (process.env.TURNSTILE_HOSTNAMES ?? '')
      .split(',')
      .map((hostname) => hostname.trim())
      .filter(Boolean)
  );

  const formtorchEndpoint =
    process.env.FORMTORCH_ENDPOINT;

  if (!secret || expectedHostnames.size === 0) {
    console.error(
      'Turnstile server configuration is incomplete.'
    );

    return res.status(500).json({
      message: 'Contact form is temporarily unavailable.',
    });
  }

  if (!formtorchEndpoint) {
    console.error(
      'FORMTORCH_ENDPOINT is not configured.'
    );

    return res.status(500).json({
      message: 'Contact form is temporarily unavailable.',
    });
  }

  // ------------------------------------------------------------
  // Get visitor IP
  // ------------------------------------------------------------

  const forwardedFor =
    req.headers['x-forwarded-for'];

  const remoteIp =
    typeof forwardedFor === 'string'
      ? forwardedFor.split(',')[0].trim()
      : req.socket?.remoteAddress ?? '';

  // ------------------------------------------------------------
  // Cloudflare Turnstile Siteverify
  // ------------------------------------------------------------

  let verification;

  try {
    const siteverifyData = new URLSearchParams();

    siteverifyData.append('secret', secret);
    siteverifyData.append(
      'response',
      turnstileToken
    );

    if (remoteIp) {
      siteverifyData.append(
        'remoteip',
        remoteIp
      );
    }

    const response = await fetch(
      SITEVERIFY_URL,
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/x-www-form-urlencoded',
        },

        body: siteverifyData,
      }
    );

    const responseText =
      await response.text();

    console.log(
      'Turnstile Siteverify status:',
      response.status
    );

    console.log(
      'Turnstile Siteverify response:',
      responseText
    );

    if (!response.ok) {
      throw new Error(
        `Siteverify returned HTTP ${response.status}: ${responseText}`
      );
    }

    verification =
      JSON.parse(responseText);
  } catch (error) {
    console.error(
      'Turnstile Siteverify request failed:',
      error
    );

    return res.status(502).json({
      message:
        'Captcha verification could not be completed. Please try again.',
    });
  }

  // ------------------------------------------------------------
  // Validate Siteverify response
  // ------------------------------------------------------------

  if (
    !verification.success ||
    verification.action !== EXPECTED_ACTION ||
    !expectedHostnames.has(
      verification.hostname
    )
  ) {
    console.error(
      'Turnstile verification rejected:',
      {
        success: verification.success,
        action: verification.action,
        hostname: verification.hostname,
        errors:
          verification['error-codes'],
      }
    );

    return res.status(403).json({
      message:
        'Captcha verification failed. Please try again.',
    });
  }

  // ------------------------------------------------------------
  // Forward verified form to Formtorch
  // ------------------------------------------------------------

  try {
    const formData =
      new URLSearchParams();

    formData.append(
      'fullName',
      fullName
    );

    formData.append(
      'email',
      email
    );

    formData.append(
      'inquiryType',
      inquiryType
    );

    formData.append(
      'message',
      message
    );

    /*
     * Formtorch requires the Turnstile token.
     *
     * The token has already been verified server-side
     * by Cloudflare above.
     */
    formData.append(
      'cf-turnstile-response',
      turnstileToken
    );

    const formtorchResponse =
      await fetch(
        formtorchEndpoint,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/x-www-form-urlencoded',

            'X-Requested-With':
              'XMLHttpRequest',
          },

          body: formData,
        }
      );

    const responseText =
      await formtorchResponse.text();

    let result = null;

    try {
      result =
        JSON.parse(responseText);
    } catch {
      result = null;
    }

    if (!formtorchResponse.ok) {
      console.error(
        'Formtorch submission failed:',
        result || responseText
      );

      return res.status(
        formtorchResponse.status
      ).json({
        message:
          result?.message ||
          'Failed to send message.',
      });
    }

    /*
     * Formtorch may return HTTP 200 while still
     * indicating an application-level failure.
     */
    if (
      result &&
      result.success === false
    ) {
      console.error(
        'Formtorch rejected submission:',
        result
      );

      return res.status(400).json({
        message:
          result.message ||
          'Failed to send message.',
      });
    }

    return res.status(200).json({
      message:
        'Message sent successfully.',
    });
  } catch (error) {
    console.error(
      'Formtorch request failed:',
      error
    );

    return res.status(502).json({
      message:
        'Unable to send your message right now. Please try again later.',
    });
  }
}