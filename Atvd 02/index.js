"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var readline = require("readline");
// 2. Função para criar o identificador único (hash)
function criarIdentificador(dados) {
    var dadosParaHash = "".concat(dados.cpf, ":").concat(dados.email, ":").concat(dados.celular);
    // Usamos SHA-256 para criar um hash seguro e consistente
    return crypto.createHash('sha256').update(dadosParaHash).digest('hex');
}
// 4. Classe da Fila
var Fila = /** @class */ (function () {
    function Fila() {
        this.items = [];
    }
    // Adiciona um novo item à fila
    Fila.prototype.enqueue = function (dados) {
        var id = criarIdentificador(dados);
        var novoItem = {
            id: id,
            dados: dados,
            timestamp: new Date()
        };
        this.items.push(novoItem);
        console.log("\u2705 Adicionado \u00E0 fila. ID: ".concat(id));
        return id;
    };
    // Remove e retorna o primeiro item da fila (FIFO)
    Fila.prototype.dequeue = function () {
        var itemRemovido = this.items.shift();
        if (itemRemovido) {
            console.log("\u27A1\uFE0F Removido da fila. ID: ".concat(itemRemovido.id));
        }
        else {
            console.log("❌ A fila está vazia.");
        }
        return itemRemovido;
    };
    // Retorna o tamanho atual da fila
    Fila.prototype.tamanho = function () {
        return this.items.length;
    };
    // Exibe todos os itens na fila
    Fila.prototype.listar = function () {
        console.log("\n--- Itens na Fila ---");
        if (this.tamanho() === 0) {
            console.log("A fila está vazia.");
        }
        else {
            this.items.forEach(function (item) {
                console.log("ID: ".concat(item.id, " | CPF: ").concat(item.dados.cpf, " | Email: ").concat(item.dados.email));
            });
        }
        console.log("---------------------\n");
    };
    return Fila;
}());
// 5. Interface Console para interação do usuário
var fila = new Fila();
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function menu() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            console.log("\n--- Sistema de Fila ---");
            console.log("1. Adicionar à fila");
            console.log("2. Processar (remover) da fila");
            console.log("3. Listar todos os itens da fila");
            console.log("4. Sair");
            rl.question('Escolha uma opção: ', function (opcao) { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = opcao.trim();
                            switch (_a) {
                                case '1': return [3 /*break*/, 1];
                                case '2': return [3 /*break*/, 3];
                                case '3': return [3 /*break*/, 4];
                                case '4': return [3 /*break*/, 5];
                            }
                            return [3 /*break*/, 6];
                        case 1: return [4 /*yield*/, adicionarItem()];
                        case 2:
                            _b.sent();
                            return [3 /*break*/, 7];
                        case 3:
                            fila.dequeue();
                            return [3 /*break*/, 7];
                        case 4:
                            fila.listar();
                            return [3 /*break*/, 7];
                        case 5:
                            rl.close();
                            return [2 /*return*/];
                        case 6:
                            console.log("Opção inválida. Tente novamente.");
                            return [3 /*break*/, 7];
                        case 7:
                            menu();
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
function adicionarItem() {
    return __awaiter(this, void 0, void 0, function () {
        var pergunta, cpf, email, celular, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pergunta = function (q) { return new Promise(function (resolve) { return rl.question(q, resolve); }); };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, pergunta('Digite o CPF: ')];
                case 2:
                    cpf = _a.sent();
                    return [4 /*yield*/, pergunta('Digite o Email: ')];
                case 3:
                    email = _a.sent();
                    return [4 /*yield*/, pergunta('Digite o Celular: ')];
                case 4:
                    celular = _a.sent();
                    fila.enqueue({ cpf: cpf, email: email, celular: celular });
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _a.sent();
                    console.error('Erro ao adicionar item: ', e_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
// Inicia o console
menu();
