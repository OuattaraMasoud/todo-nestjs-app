import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ToDo } from '@prisma/client';


@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) { }
 
}