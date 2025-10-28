/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optional: let production builds succeed even if ESLint has errors.
  // need to remove this later and fix linting issues
  eslint: { ignoreDuringBuilds: true },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",

              // Stripe.js needs to run; 'unsafe-eval' is often required in dev.
              // You can try removing 'unsafe-eval' in production if everything still works.
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com",

              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",

              // XHR / fetch targets used by Acuity + Stripe
              "connect-src 'self' https://api.stripe.com https://checkout.stripe.com https://q.stripe.com https://app.acuityscheduling.com",

              // Allow iframes for Acuity scheduler + Stripe + (optional) Google Maps
              "frame-src https://app.acuityscheduling.com https://js.stripe.com https://checkout.stripe.com https://www.google.com https://maps.google.com https://www.google.com/maps",

              // Disallow other sites from embedding your pages
              "frame-ancestors 'self'",

              "base-uri 'self'",

              // Allow posting forms to Stripe Checkout
              "form-action 'self' https://checkout.stripe.com",
            ].join("; "),
          },
          // Optional: quiets some browser nags around Payment Request API
          { key: "Permissions-Policy", value: "payment=()" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
