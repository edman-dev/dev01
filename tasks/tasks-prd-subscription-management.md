## Relevant Files

- `src/features/billing/components/PricingPage.tsx` - Pricing page with tier comparison
- `src/features/billing/components/PricingPage.test.tsx` - Unit tests for PricingPage component
- `src/features/billing/components/UsageDashboard.tsx` - Dashboard showing current usage vs limits
- `src/features/billing/components/UsageDashboard.test.tsx` - Unit tests for UsageDashboard component
- `src/features/billing/components/BillingPortal.tsx` - Self-service billing management interface
- `src/features/billing/components/BillingPortal.test.tsx` - Unit tests for BillingPortal component
- `src/features/billing/components/UpgradeModal.tsx` - Modal for subscription upgrades
- `src/features/billing/components/UpgradeModal.test.tsx` - Unit tests for UpgradeModal component
- `src/features/billing/components/PaymentMethodForm.tsx` - Form for managing payment methods
- `src/features/billing/components/PaymentMethodForm.test.tsx` - Unit tests for PaymentMethodForm
- `src/models/Schema.ts` - Database schema extensions for subscriptions and usage tracking
- `src/utils/usageLimits.ts` - Utilities for checking and enforcing tier limits
- `src/utils/usageLimits.test.ts` - Unit tests for usage limit utilities
- `src/utils/stripeHelpers.ts` - Helper functions for Stripe integration
- `src/utils/stripeHelpers.test.ts` - Unit tests for Stripe helpers
- `src/app/api/billing/subscription/route.ts` - API endpoints for subscription management
- `src/app/api/billing/subscription/route.test.ts` - Unit tests for subscription API
- `src/app/api/stripe/webhook/route.ts` - Stripe webhook handler
- `src/app/api/stripe/webhook/route.test.ts` - Unit tests for webhook handler
- `src/app/api/billing/usage/route.ts` - API endpoints for usage tracking
- `src/app/api/billing/usage/route.test.ts` - Unit tests for usage API

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [ ] 1.0 Set Up Database Schema and Stripe Integration
  - [ ] 1.1 Create subscriptions table with tier information
  - [ ] 1.2 Add usage_tracking table for real-time metrics
  - [ ] 1.3 Create billing_history table for invoices and payments
  - [ ] 1.4 Add promotional_codes table with usage tracking
  - [ ] 1.5 Configure Stripe SDK and environment variables
  - [ ] 1.6 Set up Stripe products and price IDs for each tier
  - [ ] 1.7 Create webhook endpoint configuration in Stripe
  - [ ] 1.8 Add database indexes for efficient usage queries

- [ ] 2.0 Implement Usage Tracking System
  - [ ] 2.1 Create real-time usage calculation functions
  - [ ] 2.2 Build church count tracking with tier limits
  - [ ] 2.3 Implement ministry count tracking per church
  - [ ] 2.4 Add collaborator count tracking system
  - [ ] 2.5 Create storage usage calculation for audio files
  - [ ] 2.6 Build API call tracking for Pro tier
  - [ ] 2.7 Implement usage trend analysis functions
  - [ ] 2.8 Add usage limit enforcement middleware

- [ ] 3.0 Build Subscription Management Features
  - [ ] 3.1 Create subscription upgrade flow with Stripe
  - [ ] 3.2 Implement downgrade logic with data retention
  - [ ] 3.3 Build subscription cancellation process
  - [ ] 3.4 Add prorated billing calculations
  - [ ] 3.5 Create grace period handling for overages
  - [ ] 3.6 Implement grandfathering logic for legacy accounts
  - [ ] 3.7 Build subscription reactivation flow
  - [ ] 3.8 Add subscription change confirmation emails

- [ ] 4.0 Create Billing Portal and Payment Processing
  - [ ] 4.1 Build BillingPortal component with subscription details
  - [ ] 4.2 Create payment method management interface
  - [ ] 4.3 Implement invoice history with PDF downloads
  - [ ] 4.4 Add billing contact management
  - [ ] 4.5 Build payment failure handling and retry logic
  - [ ] 4.6 Create tax calculation and display
  - [ ] 4.7 Implement 3D Secure authentication flow
  - [ ] 4.8 Add ACH payment support for annual plans

- [ ] 5.0 Develop Trial and Promotional Features
  - [ ] 5.1 Implement trial period activation without payment
  - [ ] 5.2 Create trial expiration notifications
  - [ ] 5.3 Build trial-to-paid conversion flow
  - [ ] 5.4 Add promotional code validation system
  - [ ] 5.5 Implement discount application logic
  - [ ] 5.6 Create promotional code usage limits
  - [ ] 5.7 Build non-profit special pricing flow
  - [ ] 5.8 Add promotional analytics tracking

- [ ] 6.0 Build Pricing Page and Upgrade Flows
  - [ ] 6.1 Create responsive PricingPage with tier comparison
  - [ ] 6.2 Build UsageDashboard with visual progress bars
  - [ ] 6.3 Implement contextual upgrade prompts
  - [ ] 6.4 Add limit warning notifications
  - [ ] 6.5 Create one-click upgrade from limit errors
  - [ ] 6.6 Build annual vs monthly pricing toggle
  - [ ] 6.7 Implement feature comparison matrix
  - [ ] 6.8 Add upgrade success confirmation flow