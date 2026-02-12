# vostok-28

Монорепозиторий стартового стенда “РДЦ Восток-28”.

## Структура
- `apps/web` — Next.js + TypeScript
- `apps/api` — NestJS + Prisma + BullMQ
- `infra/mock-1c` — Express mock 1C OData

## Запуск
1. Скопируйте env: `cp .env.example .env`
2. Запуск: `docker compose up --build`

## URL
- Web: http://localhost:3000
- API: http://localhost:3001
- Swagger: http://localhost:3001/docs
- MinIO API: http://localhost:9000
- MinIO Console: http://localhost:9001
- Mock 1C: http://localhost:3100/health

## База данных
Внутри контейнера API:
- `npm run db:migrate`
- `npm run db:seed`

## Тестовый пользователь
- `parent@vostok28.local` / `password123`

## Симуляция оплаты
1. Создайте платеж: `POST /payments/create`
2. Успех dev: `POST /payments/test/succeed` с `{ "paymentId": "..." }`
3. Ручной sync 1C: `POST /integrations/onec/sync/payment/:paymentId`
