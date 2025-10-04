import { Module } from '@nestjs/common';
import { UrgencyModule } from './urgency/urgency.module';
import { PatientModule } from './patient/patient.module';
import { EmergencyLevelModule } from './emergency-level/emergency-level.module';
import { IngresoModule } from './admission-status/ingreso.module';
import { EstadoIngresoModule } from './estado-ingreso/estado-ingreso.module';

@Module({
  imports: [UrgencyModule, PatientModule, EmergencyLevelModule, IngresoModule, EstadoIngresoModule],
})
export class AppModule {}
