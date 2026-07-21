"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  conversionEventNames,
  trackConversion,
  type ConversionEventName,
} from "@/lib/conversion-events";

export function ConversionTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/services/") && pathname.split("/").filter(Boolean).length === 2) {
      trackConversion("service_view", { referencedService: pathname.split("/").pop() });
    }
    if (pathname.startsWith("/selected-work/") && pathname.split("/").filter(Boolean).length === 2) {
      trackConversion("case_study_view", { caseStudy: pathname.split("/").pop() });
    }
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element
        ? event.target.closest<HTMLElement>("[data-conversion-event]")
        : null;
      if (!target) return;

      const eventName = target.dataset.conversionEvent;
      if (!conversionEventNames.includes(eventName as ConversionEventName)) return;

      trackConversion(eventName as ConversionEventName, {
        ctaLocation: target.dataset.ctaLocation,
        ctaLabel: target.dataset.ctaLabel,
        referencedService: target.dataset.referencedService,
        caseStudy: target.dataset.caseStudy,
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
