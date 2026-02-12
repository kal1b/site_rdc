# vostok-28

Монорепозиторий стартового стенда “РДЦ Восток-28”.

## Структура
- `apps/web` — Next.js + TypeScript
- `apps/api` — NestJS + Prisma + BullMQ
- `infra/mock-1c` — Express mock 1C OData

## Запуск
1. Скопируйте env: `cp .env.example .env`
2. Выполните preflight: `npm run preflight`
3. Запуск полного стенда в Docker: `npm run compose:up`

### Альтернативные режимы запуска
- Только инфраструктура (postgres/redis/minio/mock1c): `npm run compose:infra`
- Только приложения локально без Docker: `npm run dev`
- Остановить контейнеры: `npm run compose:down`

## Если npm install даёт 403
Проверьте и поправьте npm registry:

```bash
npm config get registry
npm config set registry https://registry.npmjs.org/
cat ~/.npmrc
cat .npmrc
```

## URL
- Web: http://localhost:3000
- API: http://localhost:3001
- Swagger: http://localhost:3001/docs
- MinIO API: http://localhost:9000
- MinIO Console: http://localhost:9001
- Mock 1C: http://localhost:3100/health

## База данных
Из корня репозитория:
- `npm run db:migrate`
- `npm run db:seed`

## Тестовый пользователь
- `parent@vostok28.local` / `password123`

## Симуляция оплаты
1. Создайте платеж: `POST /payments/create`
2. Успех dev: `POST /payments/test/succeed` с `{ "paymentId": "..." }`
3. Ручной sync 1C: `POST /integrations/onec/sync/payment/:paymentId`
