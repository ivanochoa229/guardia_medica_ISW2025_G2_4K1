import { Before, Given, Then, When } from '@cucumber/cucumber';
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

    Before(function () {
       mockDb = new DataBaseInMemory();
       listaDeEspera = [];
       urgencyService = new UrgencyService(mockDb, listaDeEspera);
       console.log('=== NUEVO ESCENARIO ===');
    });

    Given('que la siguiente enfermera está registrada:', function (dataTable) {
        const data = dataTable.hashes();
        const row = data[0];
        enfermera = new Enfermera(
            row['Nombre'],
            row['Apellido']
        );
    });

    Given('estan registrados los siguientes pacientes:', function (dataTable) {
           const data = dataTable.hashes();
           data.forEach(row => {
              const patient = new Patient(row['cuil'], row['nombre'], row['apellido'], row['obra social']);
              mockDb.savePatient(patient);
           });
    });

    When('ingresa a urgencias el siguiente paciente:', function (dataTable) {
           const data = dataTable.hashes();
           let index = 0;
           data.forEach(r => {
              const row = data[index];
              const tensionArterial = row['tension arterial'].split('/').map(Number);
              const entry = row['nivel de emergencia'];
              const emergencyLevel = Object.values(EmergencyLevel).find(
                     v => v.toLowerCase() === entry.toLowerCase()
              );

              if (!emergencyLevel) {
                     throw new NotAcceptableException(`Nivel de emergencia no válido: ${entry}`);
       }
              urgencyService.registerUrgency(
                                          row['cuil'],
                                          enfermera,
                                          row['informe'],
                                          emergencyLevel,
                                          row['temperatura'],
                                          row['frecuencia cardiaca'],
                                          row['frecuencia respiratoria'],
                                          tensionArterial
                                   );
              index++;
              });
    });

    Then('La lista de espera esta ordenada por cuil de la siguiente manera:', function (dataTable) {  
           const data = dataTable.hashes();
           let index = 0;
           data.forEach( r => {
              const row = data[index];
              const cuil =  row['cuil'];
              const cuilPendientes = urgencyService
                                   .obtenerIngresosPendientes()
                                   .map(i => i.paciente.cuil);
              assert.strictEqual(cuilPendientes[index], cuil);
              index++;
           })
    });