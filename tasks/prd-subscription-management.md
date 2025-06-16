# Product Requirements Document: Subscription Management

## Introduction/Overview

The Subscription Management module handles the monetization aspect of the Worship Team Planning Service through a tiered SaaS model. This system enforces usage limits based on subscription levels, provides upgrade paths when limits are reached, and integrates with Stripe for payment processing. The module ensures fair usage while encouraging growth from free tier to paid subscriptions as churches expand their usage of the platform.

## Goals

1. **Enable Sustainable Business Model:** Implement tiered pricing that aligns value with customer needs and ability to pay.

2. **Encourage Platform Adoption:** Provide generous free tier to enable churches to experience value before paying.

3. **Support Growth:** Create natural upgrade paths as churches expand their usage.

4. **Ensure Fair Usage:** Enforce limits that prevent abuse while being generous enough for legitimate use.

5. **Simplify Billing:** Provide self-service subscription management to reduce support burden.

## User Stories

**As a Church Administrator:**
- I want to start with a free account so that I can evaluate the platform.
- I want to see my current usage vs limits so that I know when to upgrade.
- I want to upgrade my subscription easily so that I can add more ministries or collaborators.
- I want to manage my billing information so that payments process smoothly.
- I want to view billing history so that I can track expenses.

**As an Account Owner:**
- I want to add multiple churches to my account so that I can manage our network (Pro tier).
- I want to see usage across all churches so that I can optimize our subscription.
- I want to receive alerts before hitting limits so that I can plan upgrades.

**As a Finance Manager:**
- I want to download invoices so that I can process them through our accounting system.
- I want to update payment methods so that we maintain uninterrupted service.
- I want to set billing contacts so that invoices go to the right person.

**As a Free Tier User:**
- I want to understand what features I'm missing so that I can evaluate upgrading.
- I want to see pricing clearly so that I can budget for paid features.
- I want upgrade prompts to be helpful, not intrusive.

## Functional Requirements

### 1. Subscription Tiers

1.1. The system must enforce three subscription tiers:

**Tier 1 - Free**
- 1 church maximum
- 5 ministries maximum
- 5 collaborators maximum
- All core features included
- Community support

**Tier 2 - Team ($X/month)**
- 1 church maximum
- 25 ministries maximum
- Unlimited collaborators
- All core features
- Priority support
- Advanced analytics

**Tier 3 - Pro ($Y/month)**
- 100 churches maximum
- Unlimited ministries
- Unlimited collaborators
- All features
- Dedicated support
- API access
- Custom branding options

1.2. The system must clearly display tier benefits on pricing page.

1.3. The system must allow monthly or annual billing (with discount for annual).

### 2. Usage Tracking

2.1. The system must track real-time usage of:
   - Number of churches
   - Number of ministries per church
   - Number of active collaborators
   - Storage usage (hymn audio files)
   - API calls (Pro tier)

2.2. The system must display usage metrics in dashboard:
   - Current usage vs limits
   - Usage trends over time
   - Projected limit reaching
   - Visual indicators (progress bars)

2.3. The system must update usage counts immediately when entities are added/removed.

### 3. Limit Enforcement

3.1. The system must prevent exceeding limits:
   - Block creation of new entities at limit
   - Show clear error messages
   - Provide upgrade call-to-action

3.2. The system must handle edge cases:
   - Downgrading with existing data over new limit
   - Grace period for accidental overages
   - Grandfathering of legacy accounts

3.3. The system must not delete data when limits are exceeded.

### 4. Upgrade/Downgrade Flow

4.1. The system must provide seamless upgrade process:
   - One-click upgrade from any screen where limits are hit
   - Clear pricing display
   - Immediate access to new limits upon payment
   - Prorated billing for mid-cycle upgrades

4.2. The system must handle downgrades carefully:
   - Warn about feature/limit loss
   - Prevent downgrade if current usage exceeds new limits
   - Process at end of billing cycle
   - Retain data even if over new limits (read-only)

4.3. The system must send confirmation emails for all subscription changes.

### 5. Payment Processing

5.1. The system must integrate with Stripe for:
   - Credit/debit card processing
   - ACH/bank transfers (for annual plans)
   - International payments
   - 3D Secure authentication

5.2. The system must handle payment failures:
   - Retry failed payments automatically
   - Send payment failure notifications
   - Provide grace period before service suspension
   - Clear instructions for updating payment method

5.3. The system must support payment method management:
   - Add/remove payment methods
   - Set default payment method
   - Update billing address
   - Tax ID information

### 6. Billing Portal

6.1. The system must provide self-service billing portal:
   - Current subscription status
   - Next billing date and amount
   - Payment method management
   - Billing history and invoices
   - Update billing contact information

6.2. The system must generate proper invoices:
   - Organization details
   - Service period
   - Tax calculation (where applicable)
   - Payment method used
   - PDF download option

6.3. The system must support billing contacts separate from account owner.

### 7. Trial Period

7.1. The system must offer trial period for paid tiers:
   - 14-day free trial for Team tier
   - 30-day free trial for Pro tier
   - No credit card required to start trial
   - Clear trial expiration notifications

7.2. The system must convert trials smoothly:
   - Reminder emails before trial ends
   - Easy conversion to paid
   - Graceful degradation to free tier if not converted

### 8. Promotional Features

8.1. The system must support promotional codes:
   - Percentage discounts
   - Fixed amount discounts
   - Extended trial periods
   - Special pricing for non-profits

8.2. The system must track promotional usage:
   - Limit uses per code
   - Expiration dates
   - Restrict to new customers only
   - Track conversion rates

## Non-Goals (Out of Scope)

1. **Custom Enterprise Pricing:** Individual negotiated contracts not supported initially.

2. **Reseller Program:** No support for resellers or affiliate programs.

3. **Feature-Based Pricing:** All features available at each tier (no add-ons).

4. **Usage-Based Billing:** No charging based on API calls, storage, etc.

5. **Multiple Currencies:** Initially USD only, Stripe handles conversion.

6. **Offline Payments:** No support for check or cash payments.

## Design Considerations

1. **Pricing Page:** Clear, compelling presentation of tier benefits and pricing.

2. **Usage Dashboard:** Visual representation of usage with actionable insights.

3. **Upgrade Prompts:** Contextual, helpful upgrade suggestions without being pushy.

4. **Billing Security:** PCI compliance through Stripe, no sensitive data stored.

5. **Mobile Optimization:** Full billing management capabilities on mobile devices.

## Technical Considerations

1. **Stripe Webhooks:** Reliable webhook processing for subscription events.

2. **Usage Calculation:** Efficient queries for real-time usage tracking.

3. **Rate Limiting:** Implement rate limiting for API access (Pro tier).

4. **Data Retention:** Clear policies for data handling after subscription ends.

5. **Audit Trail:** Complete logging of all billing-related actions.

6. **Idempotency:** Ensure billing operations are idempotent to prevent double-charging.

## Success Metrics

1. **Conversion Rate:** 10% of free users upgrade to paid within 90 days.

2. **Trial Conversion:** 40% of trial users convert to paid subscriptions.

3. **Payment Success:** 95%+ successful payment processing rate.

4. **Self-Service Rate:** 80% of billing issues resolved without support contact.

5. **Churn Rate:** Less than 5% monthly churn for paid tiers.

6. **Upgrade Path:** 30% of Team tier customers upgrade to Pro within 1 year.

## Open Questions

1. **Non-Profit Pricing:** Should we offer special pricing for registered non-profits?

2. **Currency Support:** When should we add support for other currencies?

3. **Grandfathering:** How do we handle pricing changes for existing customers?

4. **Pause Subscription:** Should we allow temporarily pausing subscriptions?

5. **Family Plans:** Should multiple churches under one organization get discounts?

6. **Seasonal Pricing:** Should we consider seasonal adjustments for church budgets?

7. **Free Tier Limits:** Are the proposed limits appropriate for small churches?
