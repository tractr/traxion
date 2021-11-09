import { Prisma, PrismaClient } from '@prisma/client';

import {
  AlertFeedbackQualification,
  AlertFeedbackType,
  AlertType,
  CameraStatusStatus,
  mockAlertFactory,
  mockAlertFeedbackFactory,
  mockCameraFactory,
  mockCameraStatusFactory,
  mockClientFactory,
  mockItemCategoryFactory,
  mockShopDepartmentFactory,
  mockShopFactory,
  mockShopSectionFactory,
  mockUserFactory,
  ShopKpis,
  UserRoles,
} from '@cali/common-models';

const prisma = new PrismaClient();

export const seed = async () => {
  try {
    const now = new Date();

    /**
     * Add a user
     */
    const user = mockUserFactory({
      createdAt: now,
      name: 'admin',
      email: 'admin@cali-monitor.com',
      password: 'password',
      roles: [UserRoles.admin],
    });

    await prisma.user.create({ data: user });

    /**
     * Add a client
     */
    const client = mockClientFactory({
      createdAt: now,
      name: 'Carrefour',
      businessName: 'Carrefour',
      businessId: '123',
      address: '13 rue de la pomme de terre',
    });

    await prisma.client.create({ data: client });

    /**
     * Add a shop
     */
    const shop = mockShopFactory({
      createdAt: now,
      name: 'Petit carrefour',
      clientId: client.id,
      kpis: [ShopKpis.kpi1, ShopKpis.kpi2],
    });
    delete shop.client;

    await prisma.shop.create({
      data: shop as Prisma.ShopUncheckedCreateInput,
    });

    /**
     * Add a shop department
     */
    const shopDepartment = mockShopDepartmentFactory({
      createdAt: now,
      name: 'Alimentaire',
      shopId: shop.id,
    });
    delete shopDepartment.shop;

    await prisma.shopDepartment.create({
      data: shopDepartment as Prisma.ShopDepartmentUncheckedCreateInput,
    });

    /**
     * Add an item category
     */
    const itemCategory = mockItemCategoryFactory({
      createdAt: now,
      name: 'Fruits et légumes',
      averagePrice: 100,
    });

    await prisma.itemCategory.create({
      data: itemCategory,
    });

    /**
     * Add a shop section
     */
    const shopSection = mockShopSectionFactory({
      createdAt: now,
      name: 'Fruits et légumes',
      thiefAveragePrice: 100,
      itemCategoryId: itemCategory.id,
      shopDepartmentId: shopDepartment.id,
    });
    delete shopSection.shopDepartment;
    delete shopSection.itemCategory;

    await prisma.shopSection.create({
      data: shopSection as Prisma.ShopSectionUncheckedCreateInput,
    });

    /**
     * Add a camera
     */
    const camera = mockCameraFactory({
      createdAt: now,
      externalId: '1',
      shopSectionId: shopSection.id,
    });
    delete camera.shopSection;

    await prisma.camera.create({
      data: camera as Prisma.CameraUncheckedCreateInput,
    });

    /**
     * Add a camera status
     */
    const cameraStatus = mockCameraStatusFactory({
      createdAt: now,
      cameraId: camera.id,
      status: CameraStatusStatus.ok,
    });
    delete cameraStatus.camera;

    await prisma.cameraStatus.create({
      data: cameraStatus as Prisma.CameraStatusUncheckedCreateInput,
    });

    /**
     * Add an alert
     */
    const alert = mockAlertFactory({
      createdAt: now,
      type: AlertType.thief,
      cameraId: camera.id,
      externalFrameId: '1',
      externalModelDecisionId: '1',
      externalModelPredictionId: '1',
    });
    delete alert.camera;

    await prisma.alert.create({
      data: alert as Prisma.AlertUncheckedCreateInput,
    });

    /**
     * Add an alert feedback
     */
    const alertFeedback = mockAlertFeedbackFactory({
      createdAt: now,
      alertId: alert.id,
      isArchived: true,
      isPertinent: true,
      qualification: AlertFeedbackQualification.stopped,
      rate: 5,
      rateAnnotation: 'Le voleur a été arrêté',
      type: AlertFeedbackType.thief,
      userId: user.id,
    });
    delete alertFeedback.user;

    await prisma.alertFeedback.create({
      data: alertFeedback as Prisma.AlertFeedbackUncheckedCreateInput,
    });
  } catch (error) {
    console.error('Something went wrong while seeding the database', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};
