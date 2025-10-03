export class Patient {
    cuil: string;
    name: string;
    lastname: string;
    insurance: string;

    constructor(cuil: string, name: string, lastname: string, insurance: string) {
        this.cuil = cuil;
        this.name = name;
        this.lastname = lastname;
        this.insurance = insurance;
    }
};