import { Controller, Get, Inject, Query } from '@nestjs/common';
import { Policies } from '@tractr/nestjs-core';

import { Permission } from '@cali/common-casl';
import { AlertWithCurrentFeedbackFindManyQueryDto } from '@cali/common-rest-dtos';
import { ALERT_SERVICE, AlertService } from '@cali/nestjs-common';

@Controller('alert/with-current-feedback')
export class AlertWithCurrentFeedbackController {
  constructor(
    @Inject(ALERT_SERVICE) private readonly alertService: AlertService,
  ) {}

  /**
   * Find zero or more AlertPopulated entities that matches the filter
   *
   * @param queryDto - Dto of the request query
   * @returns an array of AlertWithCurrentFeedback entities
   */
  @Get()
  @Policies(Permission.SEARCH_ALERT)
  public async findMany(
    @Query()
    {
      id,
      createdAt,
      createdAtMin,
      createdAtMax,
      alertType,
      alertFeedbackType,
      qualification,
      isArchived,
      isPertinent,
      camera,
      sort,
      order,
      take,
      skip,
    }: AlertWithCurrentFeedbackFindManyQueryDto,
  ) {
    // Find matching alerts and get their current feedback
    const matchingAlerts = await this.alertService.findMany({
      where: {
        id,
        createdAt: { equals: createdAt, lte: createdAtMax, gte: createdAtMin },
        type: alertType,
        camera: { id: camera },
      },
      select: {
        id: true,
        alertFeedbacks: {
          select: { id: true },
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    });

    // Find alerts that also respect the feedbacks criteria
    return this.alertService.findMany({
      where: {
        id: { in: matchingAlerts.map((alert) => alert.id) },
        alertFeedbacks: {
          some: {
            id: {
              in: matchingAlerts.map((alert) => alert.alertFeedbacks[0].id),
            },
            type: alertFeedbackType,
            qualification,
            isArchived,
            isPertinent,
          },
        },
      },
      include: {
        camera: {
          include: {
            shopSection: {
              include: {
                shopDepartment: {
                  include: {
                    shop: true,
                  },
                },
              },
            },
          },
        },
        alertFeedbacks: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
      orderBy: {
        [sort]: order,
      },
      take,
      skip,
    });
  }
}
