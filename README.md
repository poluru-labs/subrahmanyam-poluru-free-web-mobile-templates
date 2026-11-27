# Free Web & Mobile Templates

Responsive templates for marketing sites, dashboards, and AI workspace shells. Stacks live under `web/` — pick Bootstrap, Tailwind, React, Vue, or Angular, then open a template folder.

Maintained by [Subrahmanyam Poluru](https://polurus.com) · Poluru Labs. Source: [github.com/poluru-labs/subrahmanyam-poluru-free-web-mobile-templates](https://github.com/poluru-labs/subrahmanyam-poluru-free-web-mobile-templates).

## Stacks

| Folder | Stack | Templates | Notes |
| --- | --- | ---: | --- |
| [`web/bootstrap/`](web/bootstrap/) | HTML, Bootstrap 5, Chart.js | 50 | No build step; gallery at [web/bootstrap/index.html](web/bootstrap/index.html) |
| [`web/tailwind/`](web/tailwind/) | HTML, Tailwind v4 browser build | 49 | Mostly static; `school-parent-dashboard` is React + Vite |
| [`web/react/`](web/react/) | React, Vite | 41 | AI and enterprise apps; many include `mock-data/` |
| [`web/vue/`](web/vue/) | Vue 3, Vite | 50 | `ai-*` product workspace shells |
| [`web/angular/`](web/angular/) | Angular | 50 | AI-focused standalone apps |

**240** templates across five stacks.

## Getting started

Bootstrap / most Tailwind (static):

```bash
git clone https://github.com/poluru-labs/subrahmanyam-poluru-free-web-mobile-templates.git
cd subrahmanyam-poluru-free-web-mobile-templates
python3 -m http.server 8000
# Gallery: http://localhost:8000/web/bootstrap/
# One template: http://localhost:8000/web/bootstrap/travel-tour-agency/
```

React / Vue / Angular / Vite Tailwind apps:

```bash
cd web/react/ai-course-creator   # or any folder with package.json
npm install
npm run dev
```

Each template folder has HTML/assets and often its own README (features, brand colors, CSS prefix).

## Bootstrap (50)

| Folder | Template |
| --- | --- |
| [`auto-repair-service`](web/bootstrap/auto-repair-service/) | Auto Repair Service |
| [`beauty-salon-booking`](web/bootstrap/beauty-salon-booking/) | Beauty Salon Booking |
| [`construction-contractor`](web/bootstrap/construction-contractor/) | Construction Contractor |
| [`creative-portfolio`](web/bootstrap/creative-portfolio/) | Creative Portfolio |
| [`crm-sales-dashboard`](web/bootstrap/crm-sales-dashboard/) | CRM Sales Dashboard |
| [`crypto-portfolio-dashboard`](web/bootstrap/crypto-portfolio-dashboard/) | Crypto Portfolio Dashboard |
| [`doctors-classifieds`](web/bootstrap/doctors-classifieds/) | Doctors Classifieds |
| [`elevate-awards`](web/bootstrap/elevate-awards/) | Elevate Awards |
| [`event-conference`](web/bootstrap/event-conference/) | Event Conference |
| [`farmer-marketplace`](web/bootstrap/farmer-marketplace/) | Farmer Marketplace |
| [`financial-advisor`](web/bootstrap/financial-advisor/) | Financial Advisor |
| [`flights-app`](web/bootstrap/flights-app/) | Flights App |
| [`founder-metrics-dashboard-app`](web/bootstrap/founder-metrics-dashboard-app/) | Founder Metrics Dashboard App |
| [`gym-dashboard`](web/bootstrap/gym-dashboard/) | Gym Dashboard |
| [`helpdesk-support`](web/bootstrap/helpdesk-support/) | Helpdesk Support |
| [`home-cleaning-services`](web/bootstrap/home-cleaning-services/) | Home Cleaning Services |
| [`hotel-booking`](web/bootstrap/hotel-booking/) | Hotel Booking |
| [`hr-employee-portal`](web/bootstrap/hr-employee-portal/) | HR Employee Portal |
| [`insurance-portal`](web/bootstrap/insurance-portal/) | Insurance Portal |
| [`interior-design-studio`](web/bootstrap/interior-design-studio/) | Interior Design Studio |
| [`inventory-management`](web/bootstrap/inventory-management/) | Inventory Management |
| [`it-consulting`](web/bootstrap/it-consulting/) | IT Consulting |
| [`laundry-delivery-service`](web/bootstrap/laundry-delivery-service/) | Laundry Delivery Service |
| [`legal-services`](web/bootstrap/legal-services/) | Legal Services |
| [`local-community-forum`](web/bootstrap/local-community-forum/) | Local Community Forum |
| [`logistics-tracking`](web/bootstrap/logistics-tracking/) | Logistics Tracking |
| [`mentorloop`](web/bootstrap/mentorloop/) | Mentorloop |
| [`modern-admin-dashboard`](web/bootstrap/modern-admin-dashboard/) | Modern Admin Dashboard |
| [`modern-admin-network-dashboard`](web/bootstrap/modern-admin-network-dashboard/) | Modern Admin Network Dashboard |
| [`news-magazine`](web/bootstrap/news-magazine/) | News Magazine |
| [`non-profit-impact-dashboard`](web/bootstrap/non-profit-impact-dashboard/) | Non Profit Impact Dashboard |
| [`online-course-platform`](web/bootstrap/online-course-platform/) | Online Course Platform |
| [`personal-finance`](web/bootstrap/personal-finance/) | Personal Finance |
| [`pet-care-veterinary`](web/bootstrap/pet-care-veterinary/) | Pet Care Veterinary |
| [`pharmacy-ecommerce`](web/bootstrap/pharmacy-ecommerce/) | Pharmacy Ecommerce |
| [`podcast-platform`](web/bootstrap/podcast-platform/) | Podcast Platform |
| [`project-management`](web/bootstrap/project-management/) | Project Management |
| [`real-estate-platform`](web/bootstrap/real-estate-platform/) | Real Estate Platform |
| [`recruitment-platform`](web/bootstrap/recruitment-platform/) | Recruitment Platform |
| [`researcher-portfolio`](web/bootstrap/researcher-portfolio/) | Researcher Portfolio |
| [`restaurant-reservation`](web/bootstrap/restaurant-reservation/) | Restaurant Reservation |
| [`school-administration`](web/bootstrap/school-administration/) | School Administration |
| [`self-storage-management`](web/bootstrap/self-storage-management/) | Self Storage Management |
| [`startup-kpi-board`](web/bootstrap/startup-kpi-board/) | Startup KPI Board |
| [`sustainable-energy`](web/bootstrap/sustainable-energy/) | Sustainable Energy |
| [`teams-chat`](web/bootstrap/teams-chat/) | Teams Chat |
| [`telehealth-clinic`](web/bootstrap/telehealth-clinic/) | Telehealth Clinic |
| [`travel-tour-agency`](web/bootstrap/travel-tour-agency/) | Travel Tour Agency |
| [`webdesign`](web/bootstrap/webdesign/) | Webdesign |
| [`wedding-planner-website`](web/bootstrap/wedding-planner-website/) | Wedding Planner Website |

**Technologies:** HTML5, CSS3, Bootstrap 5, JavaScript, Bootstrap Icons, Google Fonts (Inter on older demos; Roboto, Lato, Open Sans on many newer pages). Chart.js on selected admin templates.

## Tailwind (49)

| Folder | Template |
| --- | --- |
| [`ai-chat-workspace`](web/tailwind/ai-chat-workspace/) | AI Chat Workspace |
| [`analytics-saas-dashboard`](web/tailwind/analytics-saas-dashboard/) | Analytics SaaS Dashboard |
| [`budget-planner-dashboard`](web/tailwind/budget-planner-dashboard/) | Budget Planner Dashboard |
| [`car-rental-marketplace`](web/tailwind/car-rental-marketplace/) | Car Rental Marketplace |
| [`coding-bootcamp-landing`](web/tailwind/coding-bootcamp-landing/) | Coding Bootcamp Landing |
| [`community-discussion-forum`](web/tailwind/community-discussion-forum/) | Community Discussion Forum |
| [`coworking-space-booking`](web/tailwind/coworking-space-booking/) | Coworking Space Booking |
| [`customer-feedback-board`](web/tailwind/customer-feedback-board/) | Customer Feedback Board |
| [`customer-support-helpdesk`](web/tailwind/customer-support-helpdesk/) | Customer Support Helpdesk |
| [`developer-documentation-portal`](web/tailwind/developer-documentation-portal/) | Developer Documentation Portal |
| [`digital-asset-marketplace`](web/tailwind/digital-asset-marketplace/) | Digital Asset Marketplace |
| [`ecommerce-seller-dashboard`](web/tailwind/ecommerce-seller-dashboard/) | Ecommerce Seller Dashboard |
| [`employee-onboarding-portal`](web/tailwind/employee-onboarding-portal/) | Employee Onboarding Portal |
| [`event-ticketing-platform`](web/tailwind/event-ticketing-platform/) | Event Ticketing Platform |
| [`fitness-coach-dashboard`](web/tailwind/fitness-coach-dashboard/) | Fitness Coach Dashboard |
| [`food-delivery-app-ui`](web/tailwind/food-delivery-app-ui/) | Food Delivery App UI |
| [`freelancer-invoicing`](web/tailwind/freelancer-invoicing/) | Freelancer Invoicing |
| [`habit-tracker-app`](web/tailwind/habit-tracker-app/) | Habit Tracker App |
| [`healthcare-appointment-portal`](web/tailwind/healthcare-appointment-portal/) | Healthcare Appointment Portal |
| [`home-services-marketplace`](web/tailwind/home-services-marketplace/) | Home Services Marketplace |
| [`insurance-claims-portal`](web/tailwind/insurance-claims-portal/) | Insurance Claims Portal |
| [`inventory-management-dashboard`](web/tailwind/inventory-management-dashboard/) | Inventory Management Dashboard |
| [`invoice-generator-saas`](web/tailwind/invoice-generator-saas/) | Invoice Generator SaaS |
| [`job-application-tracker`](web/tailwind/job-application-tracker/) | Job Application Tracker |
| [`legal-case-management`](web/tailwind/legal-case-management/) | Legal Case Management |
| [`logistics-shipment-tracker`](web/tailwind/logistics-shipment-tracker/) | Logistics Shipment Tracker |
| [`meal-planner-dashboard`](web/tailwind/meal-planner-dashboard/) | Meal Planner Dashboard |
| [`music-streaming-ui`](web/tailwind/music-streaming-ui/) | Music Streaming UI |
| [`nonprofit-donation-platform`](web/tailwind/nonprofit-donation-platform/) | Nonprofit Donation Platform |
| [`online-bookstore`](web/tailwind/online-bookstore/) | Online Bookstore |
| [`personal-trainer-booking`](web/tailwind/personal-trainer-booking/) | Personal Trainer Booking |
| [`pet-adoption-platform`](web/tailwind/pet-adoption-platform/) | Pet Adoption Platform |
| [`podcast-discovery-app`](web/tailwind/podcast-discovery-app/) | Podcast Discovery App |
| [`property-management-portal`](web/tailwind/property-management-portal/) | Property Management Portal |
| [`real-estate-listings`](web/tailwind/real-estate-listings/) | Real Estate Listings |
| [`recipe-sharing-community`](web/tailwind/recipe-sharing-community/) | Recipe Sharing Community |
| [`restaurant-reservation-app`](web/tailwind/restaurant-reservation-app/) | Restaurant Reservation App |
| [`school-parent-dashboard`](web/tailwind/school-parent-dashboard/) | School Parent Dashboard |
| [`social-media-content-calendar`](web/tailwind/social-media-content-calendar/) | Social Media Content Calendar |
| [`student-lms-portal`](web/tailwind/student-lms-portal/) | Student LMS Portal |
| [`subscription-box-storefront`](web/tailwind/subscription-box-storefront/) | Subscription Box Storefront |
| [`survey-form-builder`](web/tailwind/survey-form-builder/) | Survey Form Builder |
| [`teacher-gradebook`](web/tailwind/teacher-gradebook/) | Teacher Gradebook |
| [`travel-itinerary-planner`](web/tailwind/travel-itinerary-planner/) | Travel Itinerary Planner |
| [`university-admissions`](web/tailwind/university-admissions/) | University Admissions |
| [`video-course-marketplace`](web/tailwind/video-course-marketplace/) | Video Course Marketplace |
| [`volunteer-coordination-platform`](web/tailwind/volunteer-coordination-platform/) | Volunteer Coordination Platform |
| [`warehouse-operations-dashboard`](web/tailwind/warehouse-operations-dashboard/) | Warehouse Operations Dashboard |
| [`wedding-planner-website`](web/tailwind/wedding-planner-website/) | Wedding Planner Website |

Most folders are static HTML using the Tailwind v4 browser build, Bootstrap Icons, and Google Fonts. **Whitmore Academy** (`school-parent-dashboard`) is a React + Vite app.

## React (41)

| Folder | Template |
| --- | --- |
| [`ai-contract-review-workspace`](web/react/ai-contract-review-workspace/) | AI Contract Review Workspace |
| [`ai-course-creator`](web/react/ai-course-creator/) | AI Course Creator |
| [`ai-customer-support-console`](web/react/ai-customer-support-console/) | AI Customer Support Console |
| [`ai-data-analysis-workbench`](web/react/ai-data-analysis-workbench/) | AI Data Analysis Workbench |
| [`ai-dataset-labeling-platform`](web/react/ai-dataset-labeling-platform/) | AI Dataset Labeling Platform |
| [`ai-email-assistant`](web/react/ai-email-assistant/) | AI Email Assistant |
| [`ai-evaluation-dashboard`](web/react/ai-evaluation-dashboard/) | AI Evaluation Dashboard |
| [`ai-image-generation-gallery`](web/react/ai-image-generation-gallery/) | AI Image Generation Gallery |
| [`ai-interior-design-studio`](web/react/ai-interior-design-studio/) | AI Interior Design Studio |
| [`ai-interview-coach`](web/react/ai-interview-coach/) | AI Interview Coach |
| [`ai-invoice-processing`](web/react/ai-invoice-processing/) | AI Invoice Processing |
| [`ai-language-tutor`](web/react/ai-language-tutor/) | AI Language Tutor |
| [`ai-marketing-campaign-studio`](web/react/ai-marketing-campaign-studio/) | AI Marketing Campaign Studio |
| [`ai-meal-planner`](web/react/ai-meal-planner/) | AI Meal Planner |
| [`ai-meeting-notes`](web/react/ai-meeting-notes/) | AI Meeting Notes |
| [`ai-model-comparison`](web/react/ai-model-comparison/) | AI Model Comparison |
| [`ai-photo-editing-studio`](web/react/ai-photo-editing-studio/) | AI Photo Editing Studio |
| [`ai-podcast-production`](web/react/ai-podcast-production/) | AI Podcast Production |
| [`ai-presentation-builder`](web/react/ai-presentation-builder/) | AI Presentation Builder |
| [`ai-prompt-playground`](web/react/ai-prompt-playground/) | AI Prompt Playground |
| [`ai-quiz-generator`](web/react/ai-quiz-generator/) | AI Quiz Generator |
| [`ai-receipt-organizer`](web/react/ai-receipt-organizer/) | AI Receipt Organizer |
| [`ai-research-assistant`](web/react/ai-research-assistant/) | AI Research Assistant |
| [`ai-resume-builder`](web/react/ai-resume-builder/) | AI Resume Builder |
| [`ai-seo-content-optimizer`](web/react/ai-seo-content-optimizer/) | AI SEO Content Optimizer |
| [`ai-social-content-planner`](web/react/ai-social-content-planner/) | AI Social Content Planner |
| [`ai-spreadsheet-assistant`](web/react/ai-spreadsheet-assistant/) | AI Spreadsheet Assistant |
| [`ai-study-companion`](web/react/ai-study-companion/) | AI Study Companion |
| [`ai-transcription-workspace`](web/react/ai-transcription-workspace/) | AI Transcription Workspace |
| [`ai-travel-planner`](web/react/ai-travel-planner/) | AI Travel Planner |
| [`ai-video-creation-studio`](web/react/ai-video-creation-studio/) | AI Video Creation Studio |
| [`ai-voiceover-studio`](web/react/ai-voiceover-studio/) | AI Voiceover Studio |
| [`ai-workflow-automation`](web/react/ai-workflow-automation/) | AI Workflow Automation |
| [`ai-writing-studio`](web/react/ai-writing-studio/) | AI Writing Studio |
| [`enterprise-dashboard`](web/react/enterprise-dashboard/) | Enterprise Dashboard |
| [`enterprise-ecommerce`](web/react/enterprise-ecommerce/) | Enterprise Ecommerce |
| [`enterprise-jobboard`](web/react/enterprise-jobboard/) | Enterprise Jobboard |
| [`enterprise-jobportal-dashboard`](web/react/enterprise-jobportal-dashboard/) | Enterprise Jobportal Dashboard |
| [`github-contribution-tracker`](web/react/github-contribution-tracker/) | Github Contribution Tracker |
| [`online-jewellery-dashboard`](web/react/online-jewellery-dashboard/) | Online Jewellery Dashboard |
| [`wealthtrack-dashboard`](web/react/wealthtrack-dashboard/) | Wealthtrack Dashboard |

## Vue (50)

| Folder | Template |
| --- | --- |
| [`ai-accessibility-auditor`](web/vue/ai-accessibility-auditor/) | AI Accessibility Auditor |
| [`ai-adaptive-learning-platform`](web/vue/ai-adaptive-learning-platform/) | AI Adaptive Learning Platform |
| [`ai-agent-observability-console`](web/vue/ai-agent-observability-console/) | AI Agent Observability Console |
| [`ai-air-quality-explorer`](web/vue/ai-air-quality-explorer/) | AI Air Quality Explorer |
| [`ai-api-contract-analyzer`](web/vue/ai-api-contract-analyzer/) | AI Api Contract Analyzer |
| [`ai-citation-verification-console`](web/vue/ai-citation-verification-console/) | AI Citation Verification Console |
| [`ai-cloud-resource-optimizer`](web/vue/ai-cloud-resource-optimizer/) | AI Cloud Resource Optimizer |
| [`ai-code-review-assistant`](web/vue/ai-code-review-assistant/) | AI Code Review Assistant |
| [`ai-community-resource-matcher`](web/vue/ai-community-resource-matcher/) | AI Community Resource Matcher |
| [`ai-consent-management-portal`](web/vue/ai-consent-management-portal/) | AI Consent Management Portal |
| [`ai-data-annotation-workspace`](web/vue/ai-data-annotation-workspace/) | AI Data Annotation Workspace |
| [`ai-data-lineage-explorer`](web/vue/ai-data-lineage-explorer/) | AI Data Lineage Explorer |
| [`ai-dataset-quality-inspector`](web/vue/ai-dataset-quality-inspector/) | AI Dataset Quality Inspector |
| [`ai-dependency-risk-dashboard`](web/vue/ai-dependency-risk-dashboard/) | AI Dependency Risk Dashboard |
| [`ai-disaster-information-hub`](web/vue/ai-disaster-information-hub/) | AI Disaster Information Hub |
| [`ai-document-accessibility-checker`](web/vue/ai-document-accessibility-checker/) | AI Document Accessibility Checker |
| [`ai-energy-consumption-analyzer`](web/vue/ai-energy-consumption-analyzer/) | AI Energy Consumption Analyzer |
| [`ai-food-waste-reduction-dashboard`](web/vue/ai-food-waste-reduction-dashboard/) | AI Food Waste Reduction Dashboard |
| [`ai-hallucination-review-console`](web/vue/ai-hallucination-review-console/) | AI Hallucination Review Console |
| [`ai-incident-investigation-workspace`](web/vue/ai-incident-investigation-workspace/) | AI Incident Investigation Workspace |
| [`ai-inclusive-design-reviewer`](web/vue/ai-inclusive-design-reviewer/) | AI Inclusive Design Reviewer |
| [`ai-inference-performance-monitor`](web/vue/ai-inference-performance-monitor/) | AI Inference Performance Monitor |
| [`ai-learning-accessibility-portal`](web/vue/ai-learning-accessibility-portal/) | AI Learning Accessibility Portal |
| [`ai-legacy-code-migration-planner`](web/vue/ai-legacy-code-migration-planner/) | AI Legacy Code Migration Planner |
| [`ai-literature-review-workspace`](web/vue/ai-literature-review-workspace/) | AI Literature Review Workspace |
| [`ai-model-bias-auditor`](web/vue/ai-model-bias-auditor/) | AI Model Bias Auditor |
| [`ai-model-cost-optimizer`](web/vue/ai-model-cost-optimizer/) | AI Model Cost Optimizer |
| [`ai-model-evaluation-workbench`](web/vue/ai-model-evaluation-workbench/) | AI Model Evaluation Workbench |
| [`ai-multilingual-service-assistant`](web/vue/ai-multilingual-service-assistant/) | AI Multilingual Service Assistant |
| [`ai-nonprofit-impact-analyzer`](web/vue/ai-nonprofit-impact-analyzer/) | AI Nonprofit Impact Analyzer |
| [`ai-open-source-maintainer-console`](web/vue/ai-open-source-maintainer-console/) | AI Open Source Maintainer Console |
| [`ai-plain-language-editor`](web/vue/ai-plain-language-editor/) | AI Plain Language Editor |
| [`ai-privacy-review-console`](web/vue/ai-privacy-review-console/) | AI Privacy Review Console |
| [`ai-prompt-security-testing`](web/vue/ai-prompt-security-testing/) | AI Prompt Security Testing |
| [`ai-public-benefits-navigator`](web/vue/ai-public-benefits-navigator/) | AI Public Benefits Navigator |
| [`ai-public-data-explorer`](web/vue/ai-public-data-explorer/) | AI Public Data Explorer |
| [`ai-rag-evaluation-dashboard`](web/vue/ai-rag-evaluation-dashboard/) | AI Rag Evaluation Dashboard |
| [`ai-research-discovery-portal`](web/vue/ai-research-discovery-portal/) | AI Research Discovery Portal |
| [`ai-research-reproducibility-dashboard`](web/vue/ai-research-reproducibility-dashboard/) | AI Research Reproducibility Dashboard |
| [`ai-retrieval-quality-analyzer`](web/vue/ai-retrieval-quality-analyzer/) | AI Retrieval Quality Analyzer |
| [`ai-scientific-peer-review-workspace`](web/vue/ai-scientific-peer-review-workspace/) | AI Scientific Peer Review Workspace |
| [`ai-skills-assessment-workbench`](web/vue/ai-skills-assessment-workbench/) | AI Skills Assessment Workbench |
| [`ai-student-feedback-assistant`](web/vue/ai-student-feedback-assistant/) | AI Student Feedback Assistant |
| [`ai-synthetic-data-validator`](web/vue/ai-synthetic-data-validator/) | AI Synthetic Data Validator |
| [`ai-systematic-review-manager`](web/vue/ai-systematic-review-manager/) | AI Systematic Review Manager |
| [`ai-teacher-lesson-planner`](web/vue/ai-teacher-lesson-planner/) | AI Teacher Lesson Planner |
| [`ai-technical-documentation-studio`](web/vue/ai-technical-documentation-studio/) | AI Technical Documentation Studio |
| [`ai-test-generation-workspace`](web/vue/ai-test-generation-workspace/) | AI Test Generation Workspace |
| [`ai-volunteer-skills-matcher`](web/vue/ai-volunteer-skills-matcher/) | AI Volunteer Skills Matcher |
| [`ai-water-usage-insights`](web/vue/ai-water-usage-insights/) | AI Water Usage Insights |

## Angular (50)

| Folder | Template |
| --- | --- |
| [`ai-accessibility-auditor`](web/angular/ai-accessibility-auditor/) | AI Accessibility Auditor |
| [`ai-agent-builder`](web/angular/ai-agent-builder/) | AI Agent Builder |
| [`ai-brand-studio`](web/angular/ai-brand-studio/) | AI Brand Studio |
| [`ai-chart-builder`](web/angular/ai-chart-builder/) | AI Chart Builder |
| [`ai-chat-workspace`](web/angular/ai-chat-workspace/) | AI Chat Workspace |
| [`ai-code-review-console`](web/angular/ai-code-review-console/) | AI Code Review Console |
| [`ai-contract-review-portal`](web/angular/ai-contract-review-portal/) | AI Contract Review Portal |
| [`ai-course-authoring`](web/angular/ai-course-authoring/) | AI Course Authoring |
| [`ai-customer-support-console`](web/angular/ai-customer-support-console/) | AI Customer Support Console |
| [`ai-data-analysis-workbench`](web/angular/ai-data-analysis-workbench/) | AI Data Analysis Workbench |
| [`ai-dataset-labeling-platform`](web/angular/ai-dataset-labeling-platform/) | AI Dataset Labeling Platform |
| [`ai-demand-forecasting`](web/angular/ai-demand-forecasting/) | AI Demand Forecasting |
| [`ai-document-assistant`](web/angular/ai-document-assistant/) | AI Document Assistant |
| [`ai-email-composer`](web/angular/ai-email-composer/) | AI Email Composer |
| [`ai-expense-categorization`](web/angular/ai-expense-categorization/) | AI Expense Categorization |
| [`ai-fraud-investigation-console`](web/angular/ai-fraud-investigation-console/) | AI Fraud Investigation Console |
| [`ai-image-generation-gallery`](web/angular/ai-image-generation-gallery/) | AI Image Generation Gallery |
| [`ai-incident-triage-console`](web/angular/ai-incident-triage-console/) | AI Incident Triage Console |
| [`ai-interior-design-studio`](web/angular/ai-interior-design-studio/) | AI Interior Design Studio |
| [`ai-interview-coach`](web/angular/ai-interview-coach/) | AI Interview Coach |
| [`ai-inventory-optimization`](web/angular/ai-inventory-optimization/) | AI Inventory Optimization |
| [`ai-invoice-processing`](web/angular/ai-invoice-processing/) | AI Invoice Processing |
| [`ai-knowledge-base`](web/angular/ai-knowledge-base/) | AI Knowledge Base |
| [`ai-language-tutor`](web/angular/ai-language-tutor/) | AI Language Tutor |
| [`ai-marketing-campaign-manager`](web/angular/ai-marketing-campaign-manager/) | AI Marketing Campaign Manager |
| [`ai-meal-planner`](web/angular/ai-meal-planner/) | AI Meal Planner |
| [`ai-meeting-assistant`](web/angular/ai-meeting-assistant/) | AI Meeting Assistant |
| [`ai-model-comparison`](web/angular/ai-model-comparison/) | AI Model Comparison |
| [`ai-model-evaluation-dashboard`](web/angular/ai-model-evaluation-dashboard/) | AI Model Evaluation Dashboard |
| [`ai-photo-editing-workspace`](web/angular/ai-photo-editing-workspace/) | AI Photo Editing Workspace |
| [`ai-podcast-production`](web/angular/ai-podcast-production/) | AI Podcast Production |
| [`ai-presentation-builder`](web/angular/ai-presentation-builder/) | AI Presentation Builder |
| [`ai-product-feedback-analyzer`](web/angular/ai-product-feedback-analyzer/) | AI Product Feedback Analyzer |
| [`ai-prompt-playground`](web/angular/ai-prompt-playground/) | AI Prompt Playground |
| [`ai-quiz-generator`](web/angular/ai-quiz-generator/) | AI Quiz Generator |
| [`ai-recruitment-screening`](web/angular/ai-recruitment-screening/) | AI Recruitment Screening |
| [`ai-research-assistant`](web/angular/ai-research-assistant/) | AI Research Assistant |
| [`ai-resume-builder`](web/angular/ai-resume-builder/) | AI Resume Builder |
| [`ai-semantic-search`](web/angular/ai-semantic-search/) | AI Semantic Search |
| [`ai-seo-content-optimizer`](web/angular/ai-seo-content-optimizer/) | AI SEO Content Optimizer |
| [`ai-social-media-planner`](web/angular/ai-social-media-planner/) | AI Social Media Planner |
| [`ai-spreadsheet-assistant`](web/angular/ai-spreadsheet-assistant/) | AI Spreadsheet Assistant |
| [`ai-study-planner`](web/angular/ai-study-planner/) | AI Study Planner |
| [`ai-transcription-editor`](web/angular/ai-transcription-editor/) | AI Transcription Editor |
| [`ai-travel-itinerary-planner`](web/angular/ai-travel-itinerary-planner/) | AI Travel Itinerary Planner |
| [`ai-video-production-studio`](web/angular/ai-video-production-studio/) | AI Video Production Studio |
| [`ai-voiceover-studio`](web/angular/ai-voiceover-studio/) | AI Voiceover Studio |
| [`ai-workflow-designer`](web/angular/ai-workflow-designer/) | AI Workflow Designer |
| [`ai-writing-studio`](web/angular/ai-writing-studio/) | AI Writing Studio |
| [`gym-dashboard`](web/angular/gym-dashboard/) | Gym Dashboard |

## Author

**Subrahmanyam Poluru**

Website: https://polurus.com  
Email: mail.polurus@gmail.com
