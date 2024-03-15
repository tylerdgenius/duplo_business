import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { constants } from 'src/helpers';
import { Repository } from 'typeorm';
import { Organization } from './organization.entity';
import { CreateOrganizationDto } from 'src/dtos';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrganizationService {
  constructor(
    @Inject(constants.REPOSITORY.ORGANIZATION_REPOSITORY)
    private organizationRepository: Repository<Organization>,
  ) {}

  async findOrganizationByReference(reference: string) {
    return this.organizationRepository.findOne({
      where: {
        reference,
      },
    });
  }

  async findOrganizationByName(organizationName: string) {
    return this.organizationRepository.findOne({
      where: {
        name: organizationName,
      },
    });
  }

  createOrganization(organizationData: CreateOrganizationDto) {
    if (!organizationData) {
      throw new HttpException(
        'The given data is invalid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const organization = new Organization();

    organization.name = organizationData.name;
    organization.ownerId = organizationData.ownerId;
    organization.publicId = uuidv4();
    organization.reference = uuidv4().split('-')[0];
    organization.createdAt = new Date();
    organization.updatedAt = new Date();

    return this.organizationRepository.save(organization);
  }
}
