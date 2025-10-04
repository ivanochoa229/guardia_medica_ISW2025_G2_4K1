import { Inject, Injectable, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { EmergencyLevel } from '../../src/emergency-level/emergency.level';
import { Enfermera } from 'src/enfermera/enfermera';
import { Ingreso } from '../../src/ingreso/ingreso';
import { PATIENT_REPOSITORY } from '../../src/patient/patient.constant';
import type { PatientRepository } from 'src/patient/repository/patient.repository';
import { EstadoIngreso } from '../../src/estado-ingreso/estado.ingreso';

@Injectable()
export class UrgencyService {

    constructor(
    @Inject(PATIENT_REPOSITORY)
        private readonly repository: PatientRepository, 
        private listaDeEspera: Ingreso[]
    ) {}

    registerUrgency(cuil: string, 
                    enfermera: Enfermera, 
                    informe: string,
                    emergencyLevel: EmergencyLevel,
                    temperatura: number,
                    frecuenciaCardiaca: number,
                    frecuenciaRespiratorio: number,
                    tensionArterial: number[]
                ): void{
        const patient = this.repository.buscarPacientePorCuil(cuil);
        if(!patient){
            throw new NotFoundException("Paciente no encontrado");
        }

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
        console.log("ANTES");
        this.listaDeEspera.forEach( l =>  console.log(l));
        this.ordenarListaDeEspera();
        console.log("DESPUES");
        this.listaDeEspera.forEach( l =>  console.log(l));
    }

    
    obtenerIngresosPendientes(): Ingreso[] {
        return this.listaDeEspera;
    }

    private ordenarListaDeEspera(): void {
    // Definir el orden de prioridad de las emergencias
    const ordenPrioridad = {
        [EmergencyLevel.CRITICA]: 1,
        [EmergencyLevel.EMERGENCIA]: 2,
        [EmergencyLevel.URGENCIA_MENOR]: 3,
        [EmergencyLevel.SIN_URGENCIA]: 4
    };

    this.listaDeEspera.sort((a, b) => {
        const prioridadA = ordenPrioridad[a.emergencyLevel];
        const prioridadB = ordenPrioridad[b.emergencyLevel];
        
        if (prioridadA !== prioridadB) {
            return prioridadA - prioridadB; 
        }
        
        return a.fechaIngreso.getTime() - b.fechaIngreso.getTime();
    });
}

}
