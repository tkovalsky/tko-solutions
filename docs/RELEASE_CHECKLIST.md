# Release Checklist

## Before Merge

- Work Package complete
- Acceptance criteria met
- Tests passing
- Lint passing
- Build passing

## Database

If migrations exist:

```
npx prisma migrate deploy
```

Otherwise:

No migration required

## Deploy

```
git push origin main
```

Vercel deploys automatically.

## Verify

- Homepage
- POIS routes
- Authentication
- Console
- Server logs

## Close

- Mark WP complete
- Begin next WP
