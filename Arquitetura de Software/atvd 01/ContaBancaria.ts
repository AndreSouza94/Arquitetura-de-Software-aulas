console.log("=== Exemplo Classe ContaBancaria ===");

// 1. Criar uma classe ContaBancaria com atributos e métodos
class ContaBancaria {
  // 2. Modificadores de acesso
  private saldo: number;   // só pode ser acessado dentro da classe
  public titular: string;  // pode ser acessado de fora
  protected tipo: string;  // acessível dentro da classe e subclasses

  constructor(titular: string, saldoInicial: number, tipo: string) {
    this.titular = titular;
    this.saldo = saldoInicial;
    this.tipo = tipo;
  }

  // Método público para depositar
  public depositar(valor: number): void {
    if (valor > 0) {
      this.saldo += valor;
      console.log(`Depósito de R$${valor} realizado com sucesso!`);
    } else {
      console.log("Valor inválido para depósito.");
    }
  }

  // Método público para sacar
  public sacar(valor: number): void {
    if (valor > 0 && valor <= this.saldo) {
      this.saldo -= valor;
      console.log(`Saque de R$${valor} realizado com sucesso!`);
    } else {
      console.log("Saldo insuficiente ou valor inválido.");
    }
  }

  // 3. Getters e Setters
  public getSaldo(): number {
    return this.saldo;
  }

  public setSaldo(novoSaldo: number): void {
    if (novoSaldo >= 0) {
      this.saldo = novoSaldo;
    } else {
      console.log("Saldo não pode ser negativo.");
    }
  }
}

// ===== Testando a classe =====
let conta1 = new ContaBancaria("André", 1000, "Corrente");

console.log("Titular:", conta1.titular);
console.log("Saldo inicial:", conta1.getSaldo());

conta1.depositar(500);
console.log("Saldo após depósito:", conta1.getSaldo());

conta1.sacar(300);
console.log("Saldo após saque:", conta1.getSaldo());

conta1.setSaldo(2000);
console.log("Saldo atualizado pelo setter:", conta1.getSaldo());
