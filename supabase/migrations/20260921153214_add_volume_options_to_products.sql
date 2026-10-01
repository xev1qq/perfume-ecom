/*
# Add volume_options column to products

1. Changes
- Add `volume_options` (jsonb, nullable) to `products` table.
  Stores an array of { volume_ml: number, price: number } objects,
  e.g. [{"volume_ml":10,"price":15},{"volume_ml":30,"price":35},{"volume_ml":50,"price":55},{"volume_ml":100,"price":90}].
- The existing `price` and `volume_ml` columns are kept for backward compatibility
  and represent the default (first / middle) volume.
2. Security
- No policy changes. Existing RLS policies remain intact.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'volume_options'
  ) THEN
    ALTER TABLE products ADD COLUMN volume_options jsonb;
  END IF;
END $$;
