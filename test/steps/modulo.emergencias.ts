import { Before, DataTable, Given, Then, When } from '@cucumber/cucumber';
import { NotAcceptableException } from '@nestjs/common';
import assert from 'assert';
import { EmergencyLevel } from '../../src/emergency-level/enums/emergency-level.enum';
import { Patient } from '../../src/patient/entities/patient';
import { UrgencyService } from '../../src/urgency/urgency.service';
import { DataBaseInMemory } from '../../test/mock/database.memory';
import { Enfermera } from '../../src/nurse/entities/nurse.entity';
import { Ingreso } from 'src/admission-status/admission.status';

let enfermera: Enfermera;
let mockDb: DataBaseInMemory;
let listaDeEspera: Ingreso[];
let urgencyService: UrgencyService;
let lastError: unknown;

function registrarPacientes(dataTable) {
  const data = dataTable.hashes();
  data.forEach(row => {
    const patient = new Patient(
      row['cuil'],
      row['nombre'],
      row['apellido'],
      row['obra social'],
    );
    mockDb.savePatient(patient);
  });
}

Before(function () {
  mockDb = new DataBaseInMemory();
  listaDeEspera = [];
  lastError ;
  urgencyService = new UrgencyService(mockDb, listaDeEspera);
  console.log('=== NUEVO ESCENARIO ===');
});

Given('que la siguiente enfermera está registrada:', (dataTable) => {
  const data = dataTable.hashes();
  const row = data[0];
  enfermera = new Enfermera(row['Nombre'], row['Apellido']);
});

Given('estan registrados los siguientes pacientes:', (dataTable)=>{
  registrarPacientes(dataTable);
});
Given('esta registrado el siguiente paciente:', (dataTable)=>{
  registrarPacientes(dataTable);
});

When('ingresa a urgencias el siguiente paciente:', (dataTable)=> {
  const data = dataTable.hashes();
  data.forEach((row) => {
    try {
      const tensionArterial = row['tension arterial']?.split('/').map(Number);
      const entry = row['nivel de emergencia'];
      const emergencyLevel = Object.values(EmergencyLevel).find(
        (v) => v.toLowerCase() === entry.toLowerCase(),
      );

      if (!emergencyLevel) {
        throw new NotAcceptableException(
          `Nivel de emergencia no válido: ${entry}`,
        );
      }

      const temperatura = Number(row['temperatura']);
      const frecuenciaCardiaca = Number(row['frecuencia cardiaca']);
      const frecuenciaRespiratoria = Number(row['frecuencia respiratoria']);

      urgencyService.registerUrgency(
        row['cuil'],
        enfermera,
        row['informe'],
        emergencyLevel,
        temperatura,
        frecuenciaCardiaca,
        frecuenciaRespiratoria,
        tensionArterial,
      );
    } catch (err: any) {
      lastError = err.message;
    }
  });
});

Then('La lista de espera esta ordenada por cuil de la siguiente manera:',(dataTable)=> {
    const data = dataTable.hashes();
    let index = 0;
    data.forEach((r) => {
      const row = data[index];
      const cuil = row['cuil'];
      const cuilPendientes = urgencyService
        .obtenerIngresosPendientes()
        .map((i) => i.paciente.cuil);
      assert.strictEqual(cuilPendientes[index], cuil);
      index++;
    });
  },
);
Then(
  'el sistema muestra un error indicando que falta el campo {string}',
  (campo) => {
    assert.ok(lastError, 'No se capturó ningún error'); //tecnicamente no se usaria creo nunca
    console.log(' Error capturado:', lastError);
    const msg = typeof lastError === 'string' ? lastError : (lastError as any).message;
    assert.ok(String(msg).toLowerCase().includes(campo.toLowerCase()));
  },
);
Then('el ingreso no se registra', () => {
  const pendientes = urgencyService.obtenerIngresosPendientes();
  assert.strictEqual(pendientes.length, 0);
});

