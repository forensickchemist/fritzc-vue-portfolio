const FORMTORCH_ENDPOINT =
  process.env.FORMTORCH_ENDPOINT;

export default async function handler(req, res) {
  // ------------------------------------------------------------
  // Method check
  // ------------------------------------------------------------

  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Method not allowed.',
    });
  }

  // ------------------------------------------------------------
  // Formtorch configuration
  // ------------------------------------------------------------

  if (!FORMTORCH_ENDPOINT) {
    console.error(
      'FORMTORCH_ENDPOINT is not configured.'
    );

    return res.status(500).json({
      message:
        'Contact form is temporarily unavailable.',
    });
  }

  // ------------------------------------------------------------
  // Request body
  // ------------------------------------------------------------

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
      message:
        'Please complete all required fields.',
    });
  }

  // ------------------------------------------------------------
  // Validate Turnstile token exists
  //
  // We DO NOT call Cloudflare Siteverify here.
  //
  // Formtorch is responsible for validating the token.
  // ------------------------------------------------------------

  if (
    typeof turnstileToken !== 'string' ||
    turnstileToken.length === 0
  ) {
    return res.status(400).json({
      message:
        'Captcha verification is required.',
    });
  }

  // ------------------------------------------------------------
  // Forward submission to Formtorch
  // ------------------------------------------------------------

  try {
    const formData =
      new URLSearchParams();

    formData.append(
      'fullName',
      fullName.trim()
    );

    formData.append(
      'email',
      email.trim()
    );

    formData.append(
      'inquiryType',
      inquiryType
    );

    formData.append(
      'message',
      message.trim()
    );

    /*
     * IMPORTANT:
     *
     * Formtorch expects the Cloudflare Turnstile
     * token under this field name.
     *
     * We forward the token exactly as generated
     * by Turnstile.
     *
     * We do NOT call Siteverify ourselves because
     * Formtorch performs that verification.
     */
    formData.append(
      'cf-turnstile-response',
      turnstileToken
    );

    const formtorchResponse =
      await fetch(
        FORMTORCH_ENDPOINT,
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

    console.log(
      'Formtorch status:',
      formtorchResponse.status
    );

    console.log(
      'Formtorch response:',
      result || responseText
    );

    // ----------------------------------------------------------
    // HTTP error
    // ----------------------------------------------------------

    if (!formtorchResponse.ok) {
      return res.status(
        formtorchResponse.status
      ).json({
        message:
          result?.message ||
          'Failed to send message.',
      });
    }

    // ----------------------------------------------------------
    // Formtorch application-level error
    // ----------------------------------------------------------

    if (
      result &&
      result.success === false
    ) {
      return res.status(400).json({
        message:
          result.message ||
          'Failed to send message.',
      });
    }

    // ----------------------------------------------------------
    // Success
    // ----------------------------------------------------------

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