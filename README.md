🧪 Polaris SDET Coding Challenge – Playwright Test Suite
📌 Overview

This project implements an automated UI test suite for:

Main site: https://practicesoftwaretesting.com
Buggy site: https://with-bugs.practicesoftwaretesting.com

The objective is to:

Automate all provided user stories
Validate expected behaviour on the main site
Identify and document defects on the buggy site

⚙️ Tech Stack
Playwright
TypeScript
Node.js
dotenv (environment configuration)

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

.env
playwright.config.ts


✅ Test Coverage

All 10 user stories are covered.

Each includes:

✅ Positive test (happy path)
✅ Negative or Edge test
User Story	Coverage
US1 Product List	Positive + Edge
US2 Product Details	Positive + Edge
US3 Search	Positive + Negative
US4 Category Filter	Positive + Edge
US5 Login	Positive + Negative
US6 Add to Cart	Positive + Edge
US7 Cart Update/Remove	Positive + Edge
US8 Checkout	Positive + Negative
US9 Order History (Invoices)	Positive + Negative
US10 Search + Filter	Positive + Edge


🧪 Test Design
Page Object Model (POM) used
Reusable methods across pages
Clear naming conventions for tests and selectors
Separation of concerns (UI logic vs test logic)

📊 Test Data
Only demo users are used:
customer@practicesoftwaretesting.com
customer2@practicesoftwaretesting.com
No real data used
Environment-based configuration via .env

🚀 Installation
npm install
npx playwright install

▶️ Running Tests
Run all UI tests
npx playwright test tests/ui --project=chromium-ui --headed

🔄 Environment Switching

Controlled via .env:
RUN_ENV=main
Available values:
Environment	UI URL
main	https://practicesoftwaretesting.com

buggy	https://with-bugs.practicesoftwaretesting.com
To switch:
RUN_ENV=buggy

📈 Reporting
Playwright HTML report supported
npx playwright show-report
CLI execution summary used for submission

🐞 Buggy Environment Test Results
Execution Summary
Total tests: 20
Passed: 4
Failed: 16
✅ Passed
US1 Positive
US2 Positive
US2 Edge (direct URL)
US3 Positive

❌ Failed (Key Issues Identified)
1. Pagination Issue (US1 Edge)
Expected: Next button visible
Actual: Not visible
2. Missing “No Results” Message (US3 Negative)
Expected: No results message displayed
Actual: Message not shown
3. Category Filter Missing (US4, US10)
Expected: Screwdriver filter visible
Actual: Filter not present
4. Login Page Broken (US5, US6, US7)
Expected: Email input visible
Actual: Email field not rendered
5. Checkout Flow Broken (US8)
Expected: Billing Address page loads
Actual: Page does not load
6. Invoice List Hidden (US9 Positive)
Expected: Invoice rows visible
Actual: Rows exist but hidden
7. Security Issue – Unauthorized Access (US9 Negative)
Expected: Redirect to login
Actual: Page accessible without authentication

⚠️ Known Issues / Limitations
Buggy environment contains intentional defects
Some flows blocked due to login issues
API testing was optional and not included

🧠 Summary

This test suite:
Covers all user stories
Uses maintainable POM structure
Validates both UI behaviour and defect scenarios
Clearly highlights system failures in buggy environment


📊 Test Execution Results
🟢 Main Environment (Expected Behaviour)
20 tests, 20 passed

✔ All user stories passed successfully
✔ Application behaves as expected

Running tests against: main
UI Base URL: https://practicesoftwaretesting.com
API Base URL: https://api.practicesoftwaretesting.com
◇ injected env (0) from .env // tip: ⌘ suppress logs { quiet: true }
Running tests against: main
UI Base URL: https://practicesoftwaretesting.com
API Base URL: https://api.practicesoftwaretesting.com
  ✓   1 …r Combination › US10 - Edge: should still display products after clearing the search term (7.5s)
  ✓   2 …Filter Combination › US10 - Positive: should allow search within the Screwdriver category (7.4s)
  ✓   3 …st › US1 - Edge: should show a different set of products when navigating to the next page (7.9s)
◇ injected env (0) from .env // tip: ⌘ multiple files { path: ['.env.local', '.env'] }
Running tests against: main
UI Base URL: https://practicesoftwaretesting.com
API Base URL: https://api.practicesoftwaretesting.com
  ✓   4 …ould display product cards with name, image, and price, and open product details on click (8.5s)
  ✓   5 …t Details › US2 - Positive: should display product details and enabled Add to Cart button (5.5s)
  ✓   6 …tory 2: View Product Details › US2 - Edge: should load product detail page via direct URL (6.4s)
  ✓   7 …Product › US3 - Positive: should show matching results when searching for a valid product (6.3s)
  ✓   8 …r a Product › US3 - Negative: should show a no-results message for a non-existing product (5.6s)
  ✓   9 …ter Products by Category › US4 - Positive: should filter products by Screwdriver category (4.3s)
  ✓  10 …er Story 4: Filter Products by Category › US4 - Edge: should remove filter when unchecked (7.2s)
  ✓  11 …› User Story 5: Login › US5 - Positive: should log in successfully with valid credentials (5.2s)
  ✓  12 …ser Story 5: Login › US5 - Negative: should show an error message for invalid credentials (4.8s)
  ✓  13 … Cart › US6 - Positive: should add a product to the cart and show it in the cart summary (12.1s)
  ✓  14 …› US6 - Edge: should keep the added product in the cart after navigating to the cart page (9.8s)
  ✓  15 …Cart › US7 - Positive: should update product quantity in the cart and reflect the change (12.9s)
  ✓  16 …er Story 7: Update or Remove from Cart › US7 - Edge: should remove product from the cart (10.5s)
  ✓  17 …ckout › US8 - Positive: should complete checkout with valid shipping and payment details (10.8s)
  ✓  18 …egative: should not allow checkout to continue when required billing details are missing (10.5s)
  ✓  19 …istory (Invoices) › US9 - Positive: should display invoice history and open order details (8.9s)
  ✓  20 …voices) › US9 - Negative: should not allow unauthenticated user to access invoice history (5.4s)

  20 passed (1.0m)

To open last HTML report run:

  npx playwright show-report