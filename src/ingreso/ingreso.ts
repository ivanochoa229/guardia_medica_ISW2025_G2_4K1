import e from "express";
import { EmergencyLevel } from "src/emergency-level/emergency.level";
import { Enfermera } from "src/enfermera/enfermera";
import { EstadoIngreso } from "src/estado-ingreso/estado.ingreso";
import { Patient } from "src/patient/patient";

export class Ingreso {
    paciente: Patient;
    enfermera: Enfermera;
    fechaIngreso: Date;
    informe: string;
    emergencyLevel: EmergencyLevel;
    estadoIngreso: EstadoIngreso;
    temperatura: number;
    frecuenciaCardiaca: number;
    frecuenciaRespiratorio: number;
    frecuenciaDiastolica: number;
    frecuenciaSistolica: number;

    constructor(
        paciente: Patient,
        enfermera: Enfermera,
        fechaIngreso: Date,
        informe: string,
        emergencyLevel: EmergencyLevel,
        temperatura: number,
        frecuenciaCardiaca: number,
        frecuenciaRespiratorio: number,
        frecuenciaSistolica: number,
        frecuenciaDiastolica: number,
        estadoIngreso: EstadoIngreso
      ) {
        this.paciente = paciente;
        this.enfermera = enfermera;
        this.fechaIngreso = fechaIngreso;
        this.informe = informe;
        this.emergencyLevel = emergencyLevel;
        this.temperatura = temperatura;
        this.frecuenciaCardiaca = frecuenciaCardiaca;
        this.frecuenciaRespiratorio = frecuenciaRespiratorio;
        this.frecuenciaSistolica = frecuenciaSistolica;
        this.frecuenciaDiastolica = frecuenciaDiastolica;
        this.estadoIngreso = estadoIngreso;
  }

}
