# Serdarcivak Admin Panel Specification

Operator control surface for the Serdarcivak casino and sportsbook platform.
Prepared by Anointed Coder.

## Design principle: total control with accountability
Two layers of control:
1. A god-mode Super Admin that can do everything.
2. Granular role delegation so staff and agents get only the slice you grant them.

Total power and accountability must ship together. The sensitive controls (manual balance edits, game RTP and outcome settings, withdrawal approvals, role changes) must be paired with mandatory reason codes, an immutable audit trail, and optional maker-checker dual approval. This protects the operator from staff fraud and from disputes.

---

## 1. Access, roles and staff
- Create, edit, suspend, and delete staff accounts.
- Role builder with granular permissions per module and per action (view, create, edit, approve, delete, export).
- Predefined roles: Super Admin, Finance, Support, Risk/Fraud, KYC officer, Content/CMS, Marketing, Agent/Affiliate manager, plus custom roles.
- Per-permission scoping: limit a role to certain brands, currencies, deposit methods, bet ranges, or user segments.
- Approval limits per role (a cashier approves withdrawals up to a cap, above which it escalates).
- Maker-checker / dual approval toggle for sensitive actions.
- Force 2FA for staff, IP allowlist per staff account, session timeout, force logout, device and login history.
- Staff activity log and per-staff performance stats.
- Impersonate / login as a staff member or a player for troubleshooting (logged).

## 2. Dashboard and analytics
- Live KPIs: deposits, withdrawals, net cash flow, GGR, active users, online now, registrations, bets placed, pending queues.
- Time filters and comparison (today, yesterday, week, month, custom).
- Real-time feed of deposits, withdrawals, big wins, new signups, and alerts.
- Breakdown per vertical, provider, game, payment method, country, and agent.
- Cohort and retention charts, conversion funnel, churn.
- Customizable widgets and saved views per admin.

## 3. Player / user management
- Searchable, filterable user list (status, balance, KYC, country, agent, tag, last login, lifetime value).
- Full player profile: personal data, contact, registration source, IP and device history, GeoIP, referral chain.
- Edit player details, username, email, phone, password reset.
- Account status: activate, suspend, ban, freeze, close, self-exclude, mark as test.
- Tags and segments (VIP, suspicious, bonus abuser, high roller) for targeting and rules.
- Internal notes and a per-user timeline of every action and ticket.
- Per-user overrides: deposit and withdrawal limits, max bet, bonus eligibility, withdrawal lock, odds or RTP profile, manual VIP tier.
- View per-user wallet, bet history, transaction history, bonuses, sessions, messages, documents.
- Merge or flag duplicate / linked accounts (same IP, device, payment instrument).
- Bulk actions: message, tag, bonus grant, ban, export.

## 4. Wallet, balances and cash management
- View every player balance: real, bonus, locked, withdrawable, and pending.
- Manually credit or debit a player balance with a reason code, maker-checker, and full audit.
- Adjust or clear bonus balance, convert bonus to real, lock or unlock funds.
- Multi-wallet and multi-currency support, exchange rates, rounding rules.
- Full double-entry ledger, immutable, with running balance and source of every entry.
- Reconciliation tools: match payment-provider records to the internal ledger, flag mismatches.
- Operator cash position: total liabilities, float per method, agent balances.
- Reverse, void, or correct a transaction (logged, reason required).
- System-wide and per-tier deposit, withdrawal, and bet limits and currency floors and ceilings.

## 5. Deposits and withdrawals (approval engine)
- Deposit queue: pending, approved, rejected, with proof of payment, method, amount, user, risk score.
- Withdrawal queue: same, with KYC status, bonus-wagering check, and risk flags inline.
- Approve, partially approve, reject (with reason), hold, or request more info.
- Create a deposit or withdrawal on behalf of a player.
- Auto-rules: auto-approve deposits under X, auto-hold withdrawals over Y, route by method or risk.
- SLA timers, assignment to a cashier, escalation, and bulk processing.
- Per-transaction notes, attached receipts, and a full status history.
- Chargeback and refund handling, failed-payment retry, manual settlement.

## 6. Payment methods configuration
- Enable, disable, and order deposit and withdrawal methods.
- Per-method config: min, max, fees, processing time, currencies, countries, eligible user tiers.
- Rotate and manage receiving accounts (bank accounts, Papara numbers, crypto addresses) and assign them to deposits.
- Maintenance toggle per method with a player-facing message.
- PSP integration keys, webhook status, and health.

## 7. Bonuses and promotions engine
- Bonus types: welcome, deposit match, no-deposit/trial, reload, cashback/loss-back, freespins, free bet, referral, birthday, VIP, tournament.
- Per-bonus config: percentage and caps, min deposit, wagering multiplier, game contribution percentages, eligible games and verticals, max bet while active, max conversion/cashout, expiry, eligible countries, methods, and segments.
- Bonus codes: usage limits, expiry, single or multi-use, per-user limits.
- Manual grant or revoke, force-complete or cancel wagering.
- Active-bonus monitoring with wagering progress and abuse flags.
- Promotion CMS entries linked to the rules, with scheduling and A/B variants.
- Bonus abuse detection rules and a blocklist.

## 8. Bonus wheel and gamification
- Configure wheel segments, prizes, and exact win probabilities per segment.
- Eligibility rules, spin cooldown, and daily limits.
- Prize pool budget caps and per-day payout limits.
- Per-user or per-segment spin grants and a log of every spin and outcome.
- Missions, daily rewards, leaderboards, tournaments with prize tables.

## 9. VIP and loyalty
- Define tiers, names, and climb criteria (deposit volume, turnover, points).
- Per-tier benefits: cashback, limits, dedicated manager, gifts, withdrawal priority.
- Manual tier assignment and override, points adjustment, manual rewards.
- Loyalty points engine: earn rates, redemption catalog, expiry.

## 10. Referrals and affiliates
- Referral program config: reward type and amount, qualification, caps.
- Affiliate accounts with tracking links, commission models (revenue share, CPA, hybrid), and tiers.
- View referral chains, attributed signups and deposits, and payouts.
- Approve and pay commissions; adjust or claw back.
- Sub-affiliate / agent hierarchy support.

## 11. Earnings distribution (revenue split)
- Define partners, agents, and shareholders and their split percentages.
- Allocate GGR or NGR across partners by brand, vertical, or segment.
- Agent hierarchy with per-level commission and rollups.
- Period close, statements per partner, and payout processing.
- Adjustments, deductions (chargebacks, bonuses), and carry-over balances.
- Exportable settlement reports.

## 12. Games management (casino: slots and live)
- Full catalog: add, edit, enable, disable, feature, and reorder games.
- Per-game metadata: name, provider, category, tags, thumbnail, device support.
- Provider management: enable or disable a provider, integration keys, sort order.
- Merchandising: home rails, featured rows, per-category ordering, scheduled placements.
- Per-game and per-segment availability (country, currency, tier), maintenance toggles.
- Bet limits per game, demo-mode toggle (off for live), launch settings.
- Import and validation tools for catalog feeds.

## 13. Crash and in-house game control
- House edge / target RTP, min and max bet, max win cap, auto-cashout rules.
- Round engine controls: pause, resume, view live rounds, provably-fair seed and history.
- Per-game payout caps and exposure limits.
- Live bets monitor and manual round void with reason (logged).
- Outcome and RTP configuration must be audit-logged and access-restricted (most sensitive control).

## 14. Sportsbook and betting management
- Iframe vendor: manage integration, enabled markets, and limits.
- In-house coupons: create and edit events, leagues, markets, and odds; open, suspend, and settle markets.
- Bet management: view single and combo coupons, accept or reject, cash-out rules, void or resettle.
- Risk limits per market, event, and user, with liability and exposure dashboards.
- Manual odds editing and margin (overround) configuration.
- Results entry and automatic settlement with a manual override.

## 15. Risk, fraud and AML
- Rules engine: flag by velocity, multi-accounting, bonus abuse, arbitrage, unusual win patterns.
- Risk scoring per user and per transaction.
- Watchlists and blocklists (IP, email, card BIN, device fingerprint, crypto address).
- AML monitoring: thresholds, structuring detection, suspicious activity flags, case management.
- Sanctions and PEP screening hooks.
- Freeze funds or account pending investigation.

## 16. KYC and verification
- Document queue: review ID, proof of address, payment proof, and selfies.
- Approve, reject (with reason), or request resubmission; set verification levels.
- Per-user KYC status and history, expiry and re-verification triggers.
- Configure KYC triggers (first withdrawal, amount thresholds, risk) and required documents.
- Document retention and secure storage controls.

## 17. Responsible gaming
- Configure player tools: deposit, loss, wager, and session limits, reality checks, cooldown, self-exclusion durations.
- View and override player limits, process self-exclusion and reactivation requests.
- Platform-wide responsible-gaming defaults and minimum-age enforcement.
- Intervention flags for at-risk behavior.

## 18. CMS, content and appearance
- Manage homepage slider, promo banners, big-wins strip (image, multiplier, link), and featured rails.
- Edit the announcement popup (image, version, schedule) and the top ticker text and styling.
- Manage all legal and info pages.
- Menu and footer editor, payment-logo and provider-logo management.
- SEO controls: titles, meta, sitemap, robots, Open Graph.
- Multi-language content editing tied to the i18n keys in the build.

## 19. Communications
- In-app notifications and toasts, targeted by segment.
- Email and SMS campaigns and transactional templates.
- Bulk messaging and scheduled campaigns with delivery and open stats.
- Live chat configuration and a support inbox with ticketing.
- Player-to-admin message threads and broadcast announcements.

## 20. Short links and marketing
- Create and manage short campaign links with custom slugs.
- Per-link tracking: clicks, signups, deposits, attribution to source and agent.
- UTM and landing-page targeting, QR codes, expiry, redirect rules.
- Campaign manager grouping links, bonuses, and banners.

## 21. Reports and finance
- Financial reports: deposits, withdrawals, GGR, NGR, bonus cost, taxes, per period and vertical.
- Player reports: registrations, actives, LTV, retention, top depositors and losers.
- Game and provider performance, bet volume, RTP actuals, hold.
- Payment-method performance and reconciliation reports.
- Agent and affiliate settlement reports.
- Scheduled and exportable reports (CSV, Excel, PDF) and an accounting export.

## 22. System settings and white-label
- Brand config: site name, logo, theme colors, fonts, default language.
- Feature flags: turn whole modules on or off (sportsbook, crash, wheel, referrals).
- Currency, timezone, locale, and number formatting.
- Registration field configuration and required consents.
- Maintenance mode (whole site or per section) with a custom message.
- Multi-brand support from one backend.

## 23. Domains, mirrors and infrastructure
- Manage active and mirror domains and the rotation schedule.
- Update the in-site next-address ticker automatically when a mirror changes.
- DNS and redirect management, SSL status.
- CDN and asset management, cache purge.
- Backups, restore points, and system health and uptime monitoring.

## 24. Security, audit and accountability
- Immutable audit log of every admin and money action: who, what, before and after value, when, IP.
- Searchable and exportable logs, with alerts on sensitive actions.
- 2FA enforcement, IP allowlisting, session management, API key and webhook management.
- Data export and account-deletion handling for privacy requests.

## 25. Integrations and API
- API keys and webhooks for payment providers, game aggregators, sportsbook vendor, KYC provider, SMS and email, and analytics.
- Integration health dashboard and retry controls.
- Outbound webhooks for events (deposit, withdrawal, signup) to external tools.
