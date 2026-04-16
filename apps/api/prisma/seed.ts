import { PrismaClient, CampType, ShiftStatus } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const pass = await bcrypt.hash('password123', 10);
  await prisma.user.upsert({
    where: { email: 'parent@vostok28.local' },
    update: {},
    create: { email: 'parent@vostok28.local', passwordHash: pass }
  });

  const camps = [
    { slug: 'kolosok', name: 'Колосок', type: CampType.CAMP },
    { slug: 'vega', name: 'Вега', type: CampType.CAMP },
    { slug: 'profilaktoriy', name: 'Профилакторий', type: CampType.SANATORIUM },
    { slug: 'mayak', name: 'Маяк', type: CampType.CENTER }
  ];

  for (const c of camps) {
    const camp = await prisma.camp.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        ...c,
        shortDescription: `Площадка ${c.name}`,
        contactsJson: { phone: '+7 (4162) 00-00-00' },
        locationJson: { city: 'Благовещенск' },
        isActive: true
      }
    });

    await prisma.shift.create({
      data: {
        campId: camp.id,
        title: `Смена ${c.name}`,
        dateStart: new Date('2026-06-10'),
        dateEnd: new Date('2026-06-25'),
        ageMin: 8,
        ageMax: 16,
        themeTags: ['спорт', 'творчество'],
        price: 30000,
        quotaTotal: 100,
        quotaAvailable: 40,
        status: ShiftStatus.PUBLISHED
      }
    });
  }
}

main().finally(() => prisma.$disconnect());
