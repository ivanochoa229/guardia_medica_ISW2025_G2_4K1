import { NotAcceptableException } from '@nestjs/common';
import { EmergencyLevel } from '../../nivel-emergencia/enums/nivel-emergencia.enum';

export class UrgencyValidator {
  static validate(
    informe: string,
    emergencyLevel: EmergencyLevel,
    frecuenciaCardiaca: number,
    frecuenciaRespiratoria: number,
    tensionArterial: number[],
  ) {
    this.required(informe, 'informe');
    this.required(emergencyLevel, 'nivel de emergencia');
    this.nonNegativeNumber(frecuenciaCardiaca, 'frecuencia cardiaca');
    this.nonNegativeNumber(frecuenciaRespiratoria, 'frecuencia respiratoria');
    this.validTension(tensionArterial);
  }

  // requerido
  private static required(value: any, field: string) {
    if (value === undefined || value === null || value === '') {
      throw new NotAcceptableException(`falta el campo mandatorio "${field}"`);
    }
  }

  // requerido + numérico + no negativo
  private static nonNegativeNumber(value: any, field: string) {
    if (value === undefined || value === null || value === '') {
      throw new NotAcceptableException(`falta el campo mandatorio "${field}"`);
    }
    const n = Number(value);
    if (!Number.isFinite(n)) {
      throw new NotAcceptableException(`${field} inválida: debe ser numérica`);
    }
    if (n < 0) {
      throw new NotAcceptableException(`${field} no puede ser negativo`);
    }
  }

  // validador de tensión arterial para
  private static validTension(tensionArterial: number[]) {
    if (!Array.isArray(tensionArterial) || tensionArterial.length !== 2) {
      throw new NotAcceptableException('tensión arterial inválida: se esperan dos valores');
    }
    const [sistolica, diastolica] = tensionArterial.map(Number);
    if (!Number.isFinite(sistolica) || !Number.isFinite(diastolica)) {
      throw new NotAcceptableException('tensión arterial inválida: valores no numéricos');
    }
    if (sistolica <= 0 || diastolica <= 0) {
      throw new NotAcceptableException('tensión arterial inválida: valores deben ser positivos');
    }
    if (sistolica < diastolica) {
      throw new NotAcceptableException('tensión arterial inválida: sistólica no puede ser menor que diastólica');
    }
  }
}
