// Next.js runs this before the app hydrates (Next 15.3+): the earliest point to start analytics.
import { initAnalytics } from "@/lib/analytics/client";

initAnalytics();
