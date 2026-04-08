🧪 Polaris SDET Coding Challenge – Playwright Test Suite
📌 Overview

This project implements an automated UI test suite using Playwright + TypeScript for:

Main application
Buggy application (defect validation)

The framework covers all 10 user stories, validates expected behaviour, and identifies defects in the buggy environment.

⚙️ Tech Stack
Playwright
TypeScript
Node.js
dotenv
📂 Project Structure
tests/ui/
  us1_product-list.spec.ts
  us2_product-details.spec.ts
  us3_search.spec.ts
  us4_category-filter.spec.ts
  us5_login.spec.ts
  us6_add-to-cart.spec.ts
  us7_update-remove-cart.spec.ts
  us8_checkout.spec.ts
  us9_order-history.spec.ts
  us10_search-and-filter.spec.ts

page-objects/
  BasePage.ts
  HomePage.ts
  LoginPage.ts
  ProductDetailPage.ts
  CartPage.ts
  CheckoutPage.ts
  AccountPage.ts
  OrderDetailsPage.ts
  ProductCatalogPage.ts

playwright.config.ts
.env.example
🚀 Installation
npm install

▶️ Run Tests
Run all UI tests
npx playwright test tests/ui --project=chromium-ui --headed

View report
npx playwright show-report

🔄 Environment Switching
Controlled via .env
Main environment
RUN_ENV=main
Buggy environment
RUN_ENV=buggy

📊 Test Coverage
All user stories are covered with positive + edge/negative tests
User Story	Description
US1	Product List
US2	Product Details
US3	Search
US4	Category Filter
US5	Login
US6	Add to Cart
US7	Update/Remove Cart
US8	Checkout
US9	Order History (Invoices)
US10	Search + Filter

📊 Test Results
🟢 Main Environment
✔ 20 / 20 tests passed

🔴 Buggy Environment

✔ 4 passed
❌ 16 failed

🐞 Defects Identified (Buggy Environment)
User Story	Issue
US1	Pagination “Next” button not visible
US3	No-results message missing
US4 / US10	Category filter not visible
US5 / US6 / US7	Login page fields not rendered
US8	Checkout flow broken (Billing step not loading)
US9 (Positive)	Invoice rows hidden
US9 (Negative)	Unauthorized access allowed

🧪 Test Design
Page Object Model (POM)
Reusable methods
Clean separation of UI and test logic
Environment-based configuration

📌 Test Data
customer@practicesoftwaretesting.com
customer2@practicesoftwaretesting.com
No real or sensitive data used.

⚠️ Notes
Buggy environment contains intentional defects
Some flows fail due to broken login and UI rendering
API testing was optional and not included

✅ Summary
This framework:
Covers all user stories
Supports environment switching
Identifies real defects
Follows maintainable automation practices