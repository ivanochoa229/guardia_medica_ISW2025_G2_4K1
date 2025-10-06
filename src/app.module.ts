import { Module } from '@nestjs/common';
import { UrgencyModule } from './urgencia/urgencia.module';
import { PatientModule } from './paciente/patient.module';
import { EmergencyLevelModule } from './nivel-emergencia/nivel-emergencia.module';
import { IngresoModule } from './ingreso/enums/admission-status.enum';
import { EstadoIngresoModule } from './estado-ingreso/estado-ingreso.module';

@Module({
  imports: [UrgencyModule, PatientModule, EmergencyLevelModule, IngresoModule, EstadoIngresoModule],
})
export class AppModule {}
