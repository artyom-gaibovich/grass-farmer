import { Module } from '@nestjs/common';
import { YMarkerRepository } from '../../../application/y-science/ports/y-marker/y-marker-repository';
import { PrismaService } from './prisma.service';
import { PrismaYMarkerRepository } from './y-science/repostiroies/prisma-y-marker.repository';
import { PrismaBuffMigrator } from './migrator/prisma-buff-migrator';
import { YBuffManager } from '../../../application/y-science/ports/y-buff/y-buff-manager';
import { PrismaYBuffManager } from './y-science/managers/prisma-y-buff.manager';
import { YBuffRepository } from '../../../application/y-science/ports/y-buff/y-buff-repository';
import { PrismaYBuffRepository } from './y-science/repostiroies/prisma-y-buff.repository';
import { YBuffToMarkerManager } from '../../../application/y-science/ports/y-buff-to-marker/y-buff-to-marker.manager';
import { PrismaYBuffToMarkerManager } from './y-science/managers/prisma-y-buff-to-marker.manager';
import { MtBuffManager } from '../../../application/mt-science/ports/mt-buff.manager';
import { PrismaMtBuffManager } from './mt-scinece/manager/primsa-mt-buff.manager';
import { MtBuffVarManager } from '../../../application/mt-science/ports/mt-buff-var.manager';
import { PrismaMtBuffVarManager } from './mt-scinece/manager/prisma-mt-buff-var.manager';
import { PrismaFtdnaProjectManager } from './ftdna/manager/prisma.ftdna-project.manager';
import { FTDnaProjectManager } from '../../../application/ftdna/ports/ftdna-project.manager';
@Module({
	providers: [
		PrismaService,
		{
			provide: YMarkerRepository,
			useClass: PrismaYMarkerRepository,
		},
		{
			provide: PrismaBuffMigrator,
			useClass: PrismaBuffMigrator,
		},
		{
			provide: YBuffManager,
			useClass: PrismaYBuffManager,
		},
		{
			provide: YBuffRepository,
			useClass: PrismaYBuffRepository,
		},
		{
			provide: YBuffToMarkerManager,
			useClass: PrismaYBuffToMarkerManager,
		},
		{
			provide: MtBuffManager,
			useClass: PrismaMtBuffManager,
		},
		{
			provide: MtBuffVarManager,
			useClass: PrismaMtBuffVarManager,
		},
    {
      provide: FTDnaProjectManager,
      useClass: PrismaFtdnaProjectManager,
    },
	],
	exports: [
		PrismaService,
		YMarkerRepository,
		PrismaBuffMigrator,
		YBuffManager,
		YBuffRepository,
		YBuffToMarkerManager,
		MtBuffManager,
		MtBuffVarManager,
    FTDnaProjectManager
	],
})
export class PrismaModule {}
