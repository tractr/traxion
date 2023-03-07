import { Inject, Injectable } from "@nestjs/common";
import { DATABASE_SERVICE } from "@trxn/nestjs-database";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable()
export class EnterpriseService {
    constructor(@Inject(DATABASE_SERVICE) private readonly prismaClient: PrismaClient) {
    }

    /**
     *     Find zero or one Enterprise that matches the filter.
     *     @param {EnterpriseFindUniqueArgs} args - Arguments to find a Enterprise
     *     @example
     *     // Get one Enterprise
     *     const enterprise = await this.enterpriseService.findUnique({
     *       where: {
     *         // ... provide filter here
     *       }
     *     })
     *     
     */
    findUnique<T extends Prisma.EnterpriseFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.EnterpriseFindUniqueArgs>, prisma: Prisma.EnterpriseDelegate<any> = this.prismaClient.enterprise) {
        return prisma.findUnique<T>(args);
    }

    /**
     *        Find the first Enterprise that matches the filter.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {EnterpriseFindFirstArgs} args - Arguments to find a Enterprise
     *        @example
     *        // Get one Enterprise
     *        const enterprise = await this.enterpriseService.findFirst({
     *          where: {
     *            // ... provide filter here
     *          }
     *        })
     *     
     */
    findFirst<T extends Prisma.EnterpriseFindFirstArgs>(args: Prisma.SelectSubset<T, Prisma.EnterpriseFindFirstArgs>, prisma: Prisma.EnterpriseDelegate<any> = this.prismaClient.enterprise) {
        return prisma.findFirst<T>(args);
    }

    /**
     *        Find zero or more Enterprises that matches the filter.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {EnterpriseFindManyArgs=} args - Arguments to filter and select certain fields only.
     *        @example
     *        // Get all Enterprises
     *        const enterprises = await this.enterpriseService.findMany()
     *       
     *        // Get first 10 Enterprises
     *        const Enterprises = await this.EnterpriseService.findMany({ take: 10 })
     *       
     *        // Only select the 'id'
     *        const enterpriseWithIdOnly = await this.EnterpriseService.findMany({ select: { id: true } })
     *       
     *     
     */
    FindMany<T extends Prisma.EnterpriseFindManyArgs>(args: Prisma.SelectSubset<T, Prisma.EnterpriseFindManyArgs>, prisma: Prisma.EnterpriseDelegate<any> = this.prismaClient.enterprise) {
        return prisma.findMany<T>(args);
    }

    /**
     *       Create a Enterprise.
     *       @param {EnterpriseCreateArgs} args - Arguments to create a Enterprise.
     *       @example
     *       // Create one Enterprise
     *       const Enterprise = await this.enterpriseService.create({
     *         data: {
     *           // ... data to create a Enterprise
     *         }
     *       })
     *     
     *     
     */
    create<T extends Prisma.EnterpriseCreateArgs>(args: Prisma.SelectSubset<T, Prisma.EnterpriseCreateArgs>, prisma: Prisma.EnterpriseDelegate<any> = this.prismaClient.enterprise) {
        return prisma.create<T>(args);
    }

    /**
     *         Create many Enterprises.
     *         @param {EnterpriseCreateManyArgs} args - Arguments to create many a 
     *         Enterprises.
     *         @example
     *         // Create many Enterprises
     *         const Enterprises = await this.enterpriseService.createMany({
     *           data: {
     *             *     // ... provide data here
     *           }
     *         })
     */
    createMany<T extends Prisma.EnterpriseCreateManyArgs>(args: Prisma.SelectSubset<T, Prisma.EnterpriseCreateManyArgs>, prisma: Prisma.EnterpriseDelegate<any> = this.prismaClient.enterprise) {
        return prisma.createMany<T>(args);
    }

    /**
     *        Update a Enterprise.
     *        @param {EnterpriseUpdateArgs} args - Arguments to update a Enterprise.
     *        @example
     *        // Update one Enterprise
     *        const enterprise = await this.enterpriseService.update({
     *          where: {
     *            // ... provide filter here
     *          },
     *          data: {
     *            // ... provide data here
     *          }
     *        })
     *     
     */
    update<T extends Prisma.EnterpriseUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.EnterpriseUpdateArgs>, prisma: Prisma.EnterpriseDelegate<any> = this.prismaClient.enterprise) {
        return prisma.update<T>(args);
    }

    /**
     *        Update 0 or more Enterprises.
     *        Note, that providing 'undefined' is treated as the value not being there.
     *        Read more here: https://pris.ly/d/null-undefined
     *        @param {EnterpriseUpdateManyArgs} args - Arguments to update one or more Enterprises.
     *        @example
     *        // Update many Enterprises
     *        const enterprises = await this.enterpriseService.updateMany({
     *          where: {
     *            // ... provide filter here
     *          },
     *          data: {
     *            // ... provide data here
     *          }
     *        })
     *     
     */
    updateMAny<T extends Prisma.EnterpriseUpdateManyArgs>(args: Prisma.SelectSubset<T, Prisma.EnterpriseUpdateManyArgs>, prisma: Prisma.EnterpriseDelegate<any> = this.prismaClient.enterprise) {
        return prisma.updateMany<T>(args);
    }

    /**
     *       Create or update one Enterprise.
     *        @param {EnterpriseUpsertArgs} args - Arguments to update or create a Enterprise.
     *        @example
     *        // Upsert one Enterprise
     *        const enterprise = await this.enterpriseService.upsert({
     *          create: {
     *            // ... data to create a Enterprise
     *          },
     *          update: {
     *            // ... in case it already exists, update
     *          },
     *          where: {
     *            // ... the filter for the Enterprise we want to update
     *          }
     *        })
     *     
     */
    upsert<T extends Prisma.EnterpriseUpsertArgs>(args: Prisma.SelectSubset<T, Prisma.EnterpriseUpsertArgs>, prisma: Prisma.EnterpriseDelegate<any> = this.prismaClient.enterprise) {
        return prisma.upsert<T>(args);
    }

    /**
     *     Delete a Enterprise.
     *     @param {EnterpriseDeleteArgs} args - Arguments to delete a Enterprise
     *     @example
     *     // Delete one Enterprise
     *     const enterprise = await this.enterpriseService.delete({
     *       where: {
     *         // ... filter to delete one Enterprise
     *       }
     *     })
     *     
     */
    delete<T extends Prisma.EnterpriseDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.EnterpriseDeleteArgs>, prisma: Prisma.EnterpriseDelegate<any> = this.prismaClient.enterprise) {
        return prisma.delete<T>(args);
    }

    /**
     *     Delete 0 or more Enterprises.
     *     @param {EnterpriseDeleteArgs} args - Arguments to filter  Enterprises to delete.
     *     @example
     *     // Delete a few Enterprises
     *     const enterprises = await this.enterpriseService.deleteMany({
     *       where: {
     *         // ... provide filter here
     *       }
     *     })
     *     
     */
    deleteMany<T extends Prisma.EnterpriseDeleteArgs>(args: Prisma.SelectSubset<T, Prisma.EnterpriseDeleteManyArgs>, prisma: Prisma.EnterpriseDelegate<any> = this.prismaClient.enterprise) {
        return prisma.deleteMany<T>(args);
    }

    /**
     *       Count the number of Enterprise.
     *       Note, that providing 'undefined' is treated as the value not being there.
     *       Read more here: https://pris.ly/d/null-undefined
     *       @param {EnterpriseCountArgs} args - Arguments to filter Enterprises to count.
     *       @example
     *       // Count one Enterprise
     *       const Enterprise = await this.enterpriseService.count({
     *         data: {
     *           // ... data to count a Enterprise
     *         }
     *       })
     *     
     *     
     */
    count<T extends Prisma.EnterpriseCountArgs>(args: Prisma.SelectSubset<T, Prisma.EnterpriseCountArgs>, prisma: Prisma.EnterpriseDelegate<any> = this.prismaClient.enterprise) {
        return prisma.count<T>(args);
    }

    /**
     *         Allows you to perform aggregations operations on a Enterprise.
     *         Note, that providing 'undefined' is treated as the value not being there.
     *         Read more here: https://pris.ly/d/null-undefined
     *         @param {EnterpriseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     *         @example
     *         // Ordered by age ascending
     *         // Where email contains prisma.io
     *         // Limited to the 10 enterprises
     *         const aggregations = await this.enterpriseService.aggregate({
     *           avg: {
     *             age: true,
     *           },
     *           where: {
     *             email: {
     *               contains: "prisma.io",
     *             },
     *           },
     *           orderBy: {
     *             age: "asc",
     *           },
     *           take: 10,
     *         })
     *     
     */
    aggregate<T extends Prisma.EnterpriseAggregateArgs>(args: Prisma.SelectSubset<T, Prisma.EnterpriseAggregateArgs>, prisma: Prisma.EnterpriseDelegate<any> = this.prismaClient.enterprise) {
        return prisma.aggregate<T>(args);
    }
}
