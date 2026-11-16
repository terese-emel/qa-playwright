/**
 * Zod contracts for API responses.
 *
 * Each schema mirrors the shape of a real API response. Extend these as endpoints
 * are added to the test suite. Import `validate` to assert at runtime that a
 * Playwright APIResponse body conforms to a contract before making assertions on
 * individual fields.
 *
 * Usage in a test:
 *
 *   import { HealthSchema, validate } from "../contracts";
 *   const body = await response.json();
 *   const health = validate(HealthSchema, body); // throws ZodError on mismatch
 */

import { z } from "zod";

// ---------------------------------------------------------------------------
// Primitives
// ---------------------------------------------------------------------------

/** ISO-8601 timestamp string. */
export const ISODateString = z.string().datetime({ offset: true });

// ---------------------------------------------------------------------------
// Health endpoint
// ---------------------------------------------------------------------------

export const HealthSchema = z.object({
  status: z.enum(["ok", "degraded", "down"]),
  version: z.string().optional(),
  timestamp: ISODateString.optional(),
});
export type Health = z.infer<typeof HealthSchema>;

// ---------------------------------------------------------------------------
// Generic paginated list
// ---------------------------------------------------------------------------

export function PaginatedSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    items: z.array(itemSchema),
    total: z.number().int().nonnegative(),
    page: z.number().int().positive(),
    pageSize: z.number().int().positive(),
  });
}

// ---------------------------------------------------------------------------
// Error response
// ---------------------------------------------------------------------------

export const ApiErrorSchema = z.object({
  error: z.string(),
  message: z.string().optional(),
  statusCode: z.number().int().optional(),
});
export type ApiError = z.infer<typeof ApiErrorSchema>;

// ---------------------------------------------------------------------------
// Validation helper
// ---------------------------------------------------------------------------

/**
 * Parse `data` against `schema` and return the typed result.
 * Throws a `ZodError` with a readable message when validation fails.
 */
export function validate<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown,
): z.infer<T> {
  return schema.parse(data);
}
