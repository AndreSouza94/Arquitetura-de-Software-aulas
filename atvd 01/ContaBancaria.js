console.log("=== Exemplo Classe ContaBancaria ===");
// 1. Criar uma classe ContaBancaria com atributos e métodos
var ContaBancaria = /** @class */ (function () {
    function ContaBancaria(titular, saldoInicial, tipo) {
        this.titular = titular;
        this.saldo = saldoInicial;
        this.tipo = tipo;
    }
    // Método público para depositar
    ContaBancaria.prototype.depositar = function (valor) {
        if (valor > 0) {
            this.saldo += valor;
            console.log("Dep\u00F3sito de R$".concat(valor, " realizado com sucesso!"));
        }
        else {
            console.log("Valor inválido para depósito.");
        }
    };
    // Método público para sacar
    ContaBancaria.prototype.sacar = function (valor) {
        if (valor > 0 && valor <= this.saldo) {
            this.saldo -= valor;
            console.log("Saque de R$".concat(valor, " realizado com sucesso!"));
        }
        else {
            console.log("Saldo insuficiente ou valor inválido.");
        }
    };
    // 3. Getters e Setters
    ContaBancaria.prototype.getSaldo = function () {
        return this.saldo;
    };
    ContaBancaria.prototype.setSaldo = function (novoSaldo) {
        if (novoSaldo >= 0) {
            this.saldo = novoSaldo;
        }
        else {
            console.log("Saldo não pode ser negativo.");
        }
    };
    return ContaBancaria;
}());
// ===== Testando a classe =====
var conta1 = new ContaBancaria("André", 1000, "Corrente");
console.log("Titular:", conta1.titular);
console.log("Saldo inicial:", conta1.getSaldo());
conta1.depositar(500);
console.log("Saldo após depósito:", conta1.getSaldo());
conta1.sacar(300);
console.log("Saldo após saque:", conta1.getSaldo());
conta1.setSaldo(2000);
console.log("Saldo atualizado pelo setter:", conta1.getSaldo());
