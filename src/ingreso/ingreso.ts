import { EmergencyLevel } from "src/nivel-emergencia/enums/nivel-emergencia.enum";
import { Enfermera } from "src/enfermera/entities/enfermera.entity";
import { EstadoIngreso } from "src/estado-ingreso/enums/estado-ingreso.enum";
import { Patient } from "src/paciente/entities/paciente";

export class Ingreso {
  readonly paciente: Patient;
  readonly enfermera: Enfermera;
  readonly fechaIngreso: Date;
  readonly informe: string;
  readonly emergencyLevel: EmergencyLevel;
  readonly estadoIngreso: EstadoIngreso;
  readonly temperatura: number;
  readonly frecuenciaCardiaca: number;
  readonly frecuenciaRespiratoria: number;   
  readonly tensionSistolica: number;         
  readonly tensionDiastolica: number;        

  constructor(
    paciente: Patient,
    enfermera: Enfermera,
    fechaIngreso: Date,
    informe: string,
    emergencyLevel: EmergencyLevel,
    temperatura: number,
    frecuenciaCardiaca: number,
    frecuenciaRespiratoria: number,  
    tensionSistolica: number,       
    tensionDiastolica: number,      
    estadoIngreso: EstadoIngreso,
  ) {
    this.paciente = paciente;
    this.enfermera = enfermera;
    this.fechaIngreso = fechaIngreso;
    this.informe = informe;
    this.emergencyLevel = emergencyLevel;
    this.temperatura = temperatura;
    this.frecuenciaCardiaca = frecuenciaCardiaca;
    this.frecuenciaRespiratoria = frecuenciaRespiratoria;
    this.tensionSistolica = tensionSistolica;             
    this.tensionDiastolica = tensionDiastolica;           
    this.estadoIngreso = estadoIngreso;
  }
}
