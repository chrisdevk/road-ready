/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Dev only: keep 'unsafe-eval'; remove in prod if possible
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              // Stripe API/Checkout/telemetry + Acuity (embed may XHR)
              "connect-src 'self' https://api.stripe.com https://checkout.stripe.com https://q.stripe.com https://app.acuityscheduling.com",
              // Allow iframes: Acuity, Stripe (Stripe.js iframes), Checkout (optional), Google Maps
              "frame-src https://app.acuityscheduling.com https://checkout.stripe.com https://www.google.com https://maps.google.com https://www.google.com/maps",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              // Allow form posts to Stripe Checkout
              "form-action 'self' https://checkout.stripe.com",
            ].join("; "),
          },
          // Optional: silence browser warning about Payment Request API
          { key: "Permissions-Policy", value: "payment=()" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;