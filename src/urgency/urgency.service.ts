import { Inject, Injectable, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { EmergencyLevel } from '../emergency-level/enums/emergency-level.enum';
import { Enfermera } from 'src/nurse/entities/nurse.entity';
import { Ingreso } from '../admission-status/admission.status';
import { PATIENT_REPOSITORY } from '../../src/patient/patient.constant';
import type { PatientRepository } from 'src/patient/repository/patient.repository';
import { EstadoIngreso } from '../../src/estado-ingreso/estado.ingreso';
import { UrgencyValidator } from './validators/urgency.validator';

@Injectable()
export class UrgencyService {

  constructor(
  @Inject(PATIENT_REPOSITORY)
      private readonly repository: PatientRepository, 
      private readonly listaDeEspera: Ingreso[] = []
  ) {}
  private static readonly PRIORIDAD: Record<EmergencyLevel, number> = {
    [EmergencyLevel.CRITICA]: 1,
    [EmergencyLevel.EMERGENCIA]: 2,
    [EmergencyLevel.URGENCIA]: 3,
    [EmergencyLevel.URGENCIA_MENOR]: 4,
    [EmergencyLevel.SIN_URGENCIA]: 5,
  };
  registerUrgency(cuil: string, 
                  enfermera: Enfermera, 
                  informe: string,
                  emergencyLevel: EmergencyLevel,
                  temperatura: number,
                  frecuenciaCardiaca: number,
                  frecuenciaRespiratorio: number,
                  tensionArterial: number[]
              ): void{
    const patient = this.repository.findByCuil(cuil);
    if(!patient){
        throw new NotFoundException("Patient not found");
    }
    //validamos antes del push
    UrgencyValidator.validate(
        informe,
        emergencyLevel,
        frecuenciaCardiaca,
        frecuenciaRespiratorio,
        tensionArterial
    );
    //pasa y agregamos
    this.listaDeEspera.push(new Ingreso(patient, 
                                enfermera, 
                                new Date(), 
                                informe, 
                                emergencyLevel, 
                                temperatura, 
                                frecuenciaCardiaca, 
                                frecuenciaRespiratorio, 
                                tensionArterial[0], 
                                tensionArterial[1],
                                EstadoIngreso.PENDIENTE
                            ));
    this.ordenarListaDeEspera();
  }

  
  obtenerIngresosPendientes(): Ingreso[] {
    return this.listaDeEspera;
  }
  private ordenarListaDeEspera():void{
    this.listaDeEspera.sort((a,b)=>this.compararIngresos(a,b));
    
  }
  compararIngresos(a: Ingreso, b: Ingreso): number {
    const prioridadA = UrgencyService.PRIORIDAD[a.emergencyLevel];
    const prioridadB = UrgencyService.PRIORIDAD[b.emergencyLevel];
    if(prioridadA!==prioridadB){
      return prioridadA - prioridadB;
    }
    return a.fechaIngreso.getTime() -b.fechaIngreso.getTime();
  }
  


}
