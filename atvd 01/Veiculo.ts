console.log("=== Exemplo Herança e Polimorfismo ===");

// 1. Classe base
class Veiculo {
  protected marca: string;

  constructor(marca: string) {
    this.marca = marca;
  }

  // 2. Método genérico (vai ser sobrescrito)
  public mover(): void {
    console.log(`${this.marca}: O veículo está se movendo...`);
  }
}

// Subclasse Carro
class Carro extends Veiculo {
  constructor(marca: string) {
    super(marca);
  }

  // Sobrescrevendo mover()
  public mover(): void {
    console.log(`${this.marca}: O carro está rodando pelas ruas`);
  }
}

// Subclasse Moto
class Moto extends Veiculo {
  constructor(marca: string) {
    super(marca);
  }

  // Sobrescrevendo mover()
  public mover(): void {
    console.log(`${this.marca}: A moto está acelerando na estrada`);
  }
}

// 3. Lista de veículos (polimorfismo)
let veiculos: Veiculo[] = [
  new Carro("Fiat"),
  new Moto("Honda"),
  new Carro("Chevrolet"),
  new Moto("Yamaha")
];

// Percorrendo e chamando mover()
veiculos.forEach(v => v.mover());
