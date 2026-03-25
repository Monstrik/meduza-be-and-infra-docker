#!/bin/sh

echo "Running database migrations..."
pnpm medusa db:migrate

cd .medusa/server || exit

# Seed only on first run
SEED_MARKER=".seeded"
if [ ! -f "$SEED_MARKER" ]; then
  echo "Seeding database..."
  pnpm seed && touch "$SEED_MARKER" || echo "Seeding failed, continuing..."
else
  echo "Database already seeded, skipping..."
fi

echo "Starting Medusa server..."
pnpm start
