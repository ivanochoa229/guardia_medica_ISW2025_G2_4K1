import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientRepositoryImpl } from './repository/patient.repository.impl';
import { PATIENT_REPOSITORY } from './patient.constant';

@Module({
  providers: [PatientService,
  {
      provide: PATIENT_REPOSITORY,
      useClass: PatientRepositoryImpl,
  }
  ],
   exports: [PATIENT_REPOSITORY],
})
export class PatientModule {}
