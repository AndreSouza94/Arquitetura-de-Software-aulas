var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
console.log("=== Exemplo Herança e Polimorfismo ===");
// 1. Classe base
var Veiculo = /** @class */ (function () {
    function Veiculo(marca) {
        this.marca = marca;
    }
    // 2. Método genérico (vai ser sobrescrito)
    Veiculo.prototype.mover = function () {
        console.log("".concat(this.marca, ": O ve\u00EDculo est\u00E1 se movendo..."));
    };
    return Veiculo;
}());
// Subclasse Carro
var Carro = /** @class */ (function (_super) {
    __extends(Carro, _super);
    function Carro(marca) {
        return _super.call(this, marca) || this;
    }
    // Sobrescrevendo mover()
    Carro.prototype.mover = function () {
        console.log("".concat(this.marca, ": O carro est\u00E1 rodando pelas ruas"));
    };
    return Carro;
}(Veiculo));
// Subclasse Moto
var Moto = /** @class */ (function (_super) {
    __extends(Moto, _super);
    function Moto(marca) {
        return _super.call(this, marca) || this;
    }
    // Sobrescrevendo mover()
    Moto.prototype.mover = function () {
        console.log("".concat(this.marca, ": A moto est\u00E1 acelerando na estrada"));
    };
    return Moto;
}(Veiculo));
// 3. Lista de veículos (polimorfismo)
var veiculos = [
    new Carro("Fiat"),
    new Moto("Honda"),
    new Carro("Chevrolet"),
    new Moto("Yamaha")
];
// Percorrendo e chamando mover()
veiculos.forEach(function (v) { return v.mover(); });
