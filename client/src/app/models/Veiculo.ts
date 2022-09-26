export class Veiculo implements VeiculoI{

    constructor(data: any) {
        this.mount(data)
        return this
    }
    id!: number;
    placa!: string;
    chassi!: string;
    renavam!: string;
    modelo!: string;
    marca!: string;
    ano!: number;

    mount(data: any) {
        this.id = (data['id'] || 0);
        this.placa = (data['placa'] || 'XXX-0000');
        this.chassi = (data['chassi'] || "1234567890ABCDEF");
        this.renavam = (data['renavam'] || '');
        this.modelo = (data['modelo'] || '');
        this.marca = (data['marca'] || "");
        this.ano = (data['ano'] || '')  
    }
}
export interface VeiculoI{
    id: number;
    placa: string;
    chassi: string;
    renavam: string;
    modelo: string;
    marca: string;
    ano: number;
}