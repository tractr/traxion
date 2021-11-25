import { Prisma, PrismaClient } from '@prisma/client';

import { mockNumFrame } from '@cali/common-business';
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
     * Add alerts
     */
    const firstAlertTypeSuspectBehavior = mockAlertFactory({
      createdAt: now,
      type: AlertType.suspectBehaviour,
      cameraId: camera.id,
      externalFrameId: mockNumFrame(camera.externalId),
      externalModelDecisionId: '1',
      externalModelPredictionId: '1',
    });
    delete firstAlertTypeSuspectBehavior.camera;

    await prisma.alert.create({
      data: firstAlertTypeSuspectBehavior as Prisma.AlertUncheckedCreateInput,
    });

    const firstAlertTypeThief = mockAlertFactory({
      createdAt: now,
      type: AlertType.thief,
      cameraId: camera.id,
      externalFrameId: mockNumFrame(camera.externalId),
      externalModelDecisionId: '2',
      externalModelPredictionId: '2',
    });
    delete firstAlertTypeThief.camera;

    await prisma.alert.create({
      data: firstAlertTypeThief as Prisma.AlertUncheckedCreateInput,
    });

    const secondAlertTypeThief = mockAlertFactory({
      createdAt: now,
      type: AlertType.thief,
      cameraId: camera.id,
      externalFrameId: mockNumFrame(camera.externalId),
      externalModelDecisionId: '3',
      externalModelPredictionId: '3',
    });
    delete secondAlertTypeThief.camera;

    await prisma.alert.create({
      data: secondAlertTypeThief as Prisma.AlertUncheckedCreateInput,
    });

    const inProgressAlertTypeThief = mockAlertFactory({
      createdAt: now,
      type: AlertType.thief,
      cameraId: camera.id,
      externalFrameId: mockNumFrame(camera.externalId),
      externalModelDecisionId: '3',
      externalModelPredictionId: '3',
    });
    delete inProgressAlertTypeThief.camera;

    await prisma.alert.create({
      data: inProgressAlertTypeThief as Prisma.AlertUncheckedCreateInput,
    });

    /**
     * Add alerts feedback
     */
    const alertNotArchivedFeedbackEmpty = mockAlertFeedbackFactory({
      createdAt: now,
      alertId: inProgressAlertTypeThief.id,
      isArchived: false,
      isPertinent: true,
      qualification: null,
      rate: null,
      rateAnnotation: null,
      type: null,
      userId: null,
    });
    delete alertNotArchivedFeedbackEmpty.user;

    await prisma.alertFeedback.create({
      data: alertNotArchivedFeedbackEmpty as Prisma.AlertFeedbackUncheckedCreateInput,
    });

    const alertFeedbackTypeFalseAlert = mockAlertFeedbackFactory({
      createdAt: now,
      alertId: firstAlertTypeSuspectBehavior.id,
      isArchived: true,
      isPertinent: true,
      qualification: AlertFeedbackQualification.stopped,
      rate: 5,
      rateAnnotation: 'RAS',
      type: AlertFeedbackType.falseAlert,
      userId: user.id,
    });
    delete alertFeedbackTypeFalseAlert.user;

    await prisma.alertFeedback.create({
      data: alertFeedbackTypeFalseAlert as Prisma.AlertFeedbackUncheckedCreateInput,
    });

    const alertFeedbackTypeSuspectBehaviour = mockAlertFeedbackFactory({
      createdAt: now,
      alertId: firstAlertTypeThief.id,
      isArchived: true,
      isPertinent: true,
      qualification: AlertFeedbackQualification.stopped,
      rate: 5,
      rateAnnotation: 'Suspect relaché',
      type: AlertFeedbackType.suspectBehaviour,
      userId: user.id,
    });
    delete alertFeedbackTypeSuspectBehaviour.user;

    await prisma.alertFeedback.create({
      data: alertFeedbackTypeSuspectBehaviour as Prisma.AlertFeedbackUncheckedCreateInput,
    });

    const alertFeedbackTypeThief = mockAlertFeedbackFactory({
      createdAt: now,
      alertId: secondAlertTypeThief.id,
      isArchived: true,
      isPertinent: true,
      qualification: AlertFeedbackQualification.stopped,
      rate: 5,
      rateAnnotation: 'Le voleur a été arrêté',
      type: AlertFeedbackType.thief,
      userId: user.id,
    });
    delete alertFeedbackTypeThief.user;

    await prisma.alertFeedback.create({
      data: alertFeedbackTypeThief as Prisma.AlertFeedbackUncheckedCreateInput,
    });
  } catch (error) {
    console.error('Something went wrong while seeding the database', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};
