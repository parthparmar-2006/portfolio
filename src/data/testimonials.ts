/**
 * Recommendations, shown on the home page.
 *
 * Empty until real quotes are supplied — the section renders nothing rather
 * than showing placeholders, so shipping with an empty array is safe.
 */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** Where the quote came from, e.g. "LinkedIn recommendation". */
  source?: string;
};

export const testimonials: Testimonial[] = [];
