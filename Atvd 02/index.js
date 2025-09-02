"use strict";
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
// 2. Enum para o tipo de sistema
var TipoSistema;
(function (TipoSistema) {
    TipoSistema[TipoSistema["Simples"] = 0] = "Simples";
    TipoSistema[TipoSistema["ClinicaMedica"] = 1] = "ClinicaMedica";
})(TipoSistema || (TipoSistema = {}));
// 3. Classe Base Abstrata para o Sistema de Filas
var SistemaDeFilaBase = /** @class */ (function () {
    function SistemaDeFilaBase() {
        this.historicoAtendimentos = [];
    }
    SistemaDeFilaBase.prototype.adicionarAoHistorico = function (atendimento) {
        this.historicoAtendimentos.unshift(atendimento); // Adiciona no início para exibir os mais recentes primeiro
        if (this.historicoAtendimentos.length > 50) { // Limita o histórico
            this.historicoAtendimentos.pop();
        }
    };
    SistemaDeFilaBase.prototype.listarHistorico = function () {
        var _this = this;
        console.log("\n--- Histórico de Atendimentos ---");
        if (this.historicoAtendimentos.length === 0) {
            console.log("Nenhum atendimento realizado ainda.");
        }
        else {
            this.historicoAtendimentos.forEach(function (item) {
                var infoExtra = _this instanceof SistemaDeFilaClinica ? "Sala: ".concat(item.sala) : "Idade: ".concat(item.idade);
                console.log("ID: ".concat(item.id, " | CPF: ").concat(item.cpf, " | ").concat(infoExtra, " | Atendido em: ").concat(item.timestamp.toLocaleString()));
            });
        }
        console.log("----------------------------------\n");
    };
    return SistemaDeFilaBase;
}());
// 4. Classe da Versão Simples (Prioridade por Idade)
var SistemaDeFilaSimples = /** @class */ (function (_super) {
    __extends(SistemaDeFilaSimples, _super);
    function SistemaDeFilaSimples() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filaPrioritaria = [];
        _this.filaNormal = [];
        _this.contadorPrioridade = 0;
        return _this;
    }
    SistemaDeFilaSimples.prototype.enqueue = function (dados) {
        var id = crypto.createHash('sha256').update(dados.cpf + dados.email + dados.celular).digest('hex');
        var novoAtendimento = __assign(__assign({}, dados), { id: id, timestamp: new Date() });
        if (novoAtendimento.idade && novoAtendimento.idade >= 60) {
            this.filaPrioritaria.push(novoAtendimento);
            console.log("\u2705 Adicionado \u00E0 Fila PRIORIT\u00C1RIA. ID: ".concat(id));
        }
        else {
            this.filaNormal.push(novoAtendimento);
            console.log("\u2705 Adicionado \u00E0 Fila NORMAL. ID: ".concat(id));
        }
        return id;
    };
    SistemaDeFilaSimples.prototype.dequeue = function () {
        var itemRemovido;
        var proporcaoPrioridade = 2; // 2 para 1
        if (this.filaPrioritaria.length > 0 && this.contadorPrioridade < proporcaoPrioridade) {
            this.contadorPrioridade++;
            itemRemovido = this.filaPrioritaria.shift();
            console.log("\u27A1\uFE0F Atendido (Priorit\u00E1rio). ID: ".concat(itemRemovido === null || itemRemovido === void 0 ? void 0 : itemRemovido.id));
        }
        else if (this.filaNormal.length > 0) {
            this.contadorPrioridade = 0;
            itemRemovido = this.filaNormal.shift();
            console.log("\u27A1\uFE0F Atendido (Normal). ID: ".concat(itemRemovido === null || itemRemovido === void 0 ? void 0 : itemRemovido.id));
        }
        else if (this.filaPrioritaria.length > 0) {
            this.contadorPrioridade++;
            itemRemovido = this.filaPrioritaria.shift();
            console.log("\u27A1\uFE0F Atendido (Priorit\u00E1rio). ID: ".concat(itemRemovido === null || itemRemovido === void 0 ? void 0 : itemRemovido.id));
        }
        else {
            console.log("❌ Nenhuma fila tem itens para atendimento.");
            return undefined;
        }
        if (itemRemovido) {
            this.adicionarAoHistorico(itemRemovido);
        }
        return itemRemovido;
    };
    SistemaDeFilaSimples.prototype.listar = function () {
        console.log("\n--- Itens na Fila PRIORITÁRIA (Simples) ---");
        this.filaPrioritaria.forEach(function (item) { return console.log("ID: ".concat(item.id, " | CPF: ").concat(item.cpf, " | Idade: ").concat(item.idade)); });
        console.log("\n--- Itens na Fila NORMAL (Simples) ---");
        this.filaNormal.forEach(function (item) { return console.log("ID: ".concat(item.id, " | CPF: ").concat(item.cpf, " | Idade: ").concat(item.idade)); });
        console.log("-------------------------------------------\n");
    };
    return SistemaDeFilaSimples;
}(SistemaDeFilaBase));
// 5. Classe da Versão Clínica Médica (Prioridade por Gravidade)
var SistemaDeFilaClinica = /** @class */ (function (_super) {
    __extends(SistemaDeFilaClinica, _super);
    function SistemaDeFilaClinica() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filaUrgente = [];
        _this.filaNaoUrgente = [];
        _this.contadorUrgente = 0;
        _this.salasDeAtendimento = ['Sala 1', 'Sala 2', 'Sala 3'];
        return _this;
    }
    SistemaDeFilaClinica.prototype.enqueue = function (dados) {
        var id = crypto.createHash('sha256').update(dados.cpf + dados.email + dados.celular).digest('hex');
        var novoAtendimento = __assign(__assign({}, dados), { id: id, timestamp: new Date() });
        if (novoAtendimento.gravidade === 'urgente') {
            this.filaUrgente.push(novoAtendimento);
            console.log("\u2705 Adicionado \u00E0 Fila URGENTE. ID: ".concat(id));
        }
        else {
            this.filaNaoUrgente.push(novoAtendimento);
            console.log("\u2705 Adicionado \u00E0 Fila N\u00C3O-URGENTE. ID: ".concat(id));
        }
        return id;
    };
    SistemaDeFilaClinica.prototype.dequeue = function () {
        var itemRemovido;
        var proporcaoPrioridade = 5; // 5 para 1
        var salaAtendimento = this.salasDeAtendimento[Math.floor(Math.random() * this.salasDeAtendimento.length)];
        if (this.filaUrgente.length > 0 && this.contadorUrgente < proporcaoPrioridade) {
            this.contadorUrgente++;
            itemRemovido = this.filaUrgente.shift();
            if (itemRemovido) {
                itemRemovido.sala = salaAtendimento;
            }
            console.log("\u27A1\uFE0F Atendimento URGENTE chamado para a ".concat(salaAtendimento, ". ID: ").concat(itemRemovido === null || itemRemovido === void 0 ? void 0 : itemRemovido.id));
        }
        else if (this.filaNaoUrgente.length > 0) {
            this.contadorUrgente = 0;
            itemRemovido = this.filaNaoUrgente.shift();
            if (itemRemovido) {
                itemRemovido.sala = salaAtendimento;
            }
            console.log("\u27A1\uFE0F Atendimento N\u00C3O-URGENTE chamado para a ".concat(salaAtendimento, ". ID: ").concat(itemRemovido === null || itemRemovido === void 0 ? void 0 : itemRemovido.id));
        }
        else if (this.filaUrgente.length > 0) {
            this.contadorUrgente++;
            itemRemovido = this.filaUrgente.shift();
            if (itemRemovido) {
                itemRemovido.sala = salaAtendimento;
            }
            console.log("\u27A1\uFE0F Atendimento URGENTE chamado para a ".concat(salaAtendimento, ". ID: ").concat(itemRemovido === null || itemRemovido === void 0 ? void 0 : itemRemovido.id));
        }
        else {
            console.log("❌ Nenhuma fila tem itens para atendimento.");
            return undefined;
        }
        if (itemRemovido) {
            this.adicionarAoHistorico(itemRemovido);
        }
        return itemRemovido;
    };
    SistemaDeFilaClinica.prototype.listar = function () {
        console.log("\n--- Itens na Fila URGENTE (Clínica) ---");
        this.filaUrgente.forEach(function (item) { return console.log("ID: ".concat(item.id, " | CPF: ").concat(item.cpf, " | Gravidade: ").concat(item.gravidade)); });
        console.log("\n--- Itens na Fila NÃO-URGENTE (Clínica) ---");
        this.filaNaoUrgente.forEach(function (item) { return console.log("ID: ".concat(item.id, " | CPF: ").concat(item.cpf, " | Gravidade: ").concat(item.gravidade)); });
        console.log("------------------------------------------\n");
    };
    return SistemaDeFilaClinica;
}(SistemaDeFilaBase));
// 6. Configuração e Menu Principal
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var sistema;
var tipoSistema;
function escolherSistema() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    console.log("\n--- Escolha o Sistema ---");
                    console.log("1. Sistema Simples (Prioridade por Idade)");
                    console.log("2. Sistema Clínica Médica (Prioridade por Gravidade)");
                    rl.question('Escolha uma opção: ', function (opcao) {
                        if (opcao.trim() === '1') {
                            sistema = new SistemaDeFilaSimples();
                            tipoSistema = TipoSistema.Simples;
                            console.log("✅ Sistema Simples selecionado.");
                            resolve();
                        }
                        else if (opcao.trim() === '2') {
                            sistema = new SistemaDeFilaClinica();
                            tipoSistema = TipoSistema.ClinicaMedica;
                            console.log("✅ Sistema Clínica Médica selecionado.");
                            resolve();
                        }
                        else {
                            console.log("Opção inválida. Por favor, escolha 1 ou 2.");
                            escolherSistema().then(resolve);
                        }
                    });
                })];
        });
    });
}
function menu() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            console.log("\n--- Menu Principal ---");
            console.log("1. Adicionar à fila");
            console.log("2. Processar (remover) da fila");
            console.log("3. Listar todos os itens nas filas");
            console.log("4. Listar histórico de atendimentos");
            console.log("5. Sair");
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
                                case '5': return [3 /*break*/, 6];
                            }
                            return [3 /*break*/, 7];
                        case 1: return [4 /*yield*/, adicionarItem()];
                        case 2:
                            _b.sent();
                            return [3 /*break*/, 8];
                        case 3:
                            sistema.dequeue();
                            return [3 /*break*/, 8];
                        case 4:
                            sistema.listar();
                            return [3 /*break*/, 8];
                        case 5:
                            sistema.listarHistorico();
                            return [3 /*break*/, 8];
                        case 6:
                            rl.close();
                            return [2 /*return*/];
                        case 7:
                            console.log("Opção inválida. Tente novamente.");
                            return [3 /*break*/, 8];
                        case 8:
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
        var pergunta, cpf, email, celular, idadeStr, idade, gravidadeStr, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pergunta = function (q) { return new Promise(function (resolve) { return rl.question(q, resolve); }); };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 9, , 10]);
                    return [4 /*yield*/, pergunta('Digite o CPF: ')];
                case 2:
                    cpf = _a.sent();
                    return [4 /*yield*/, pergunta('Digite o Email: ')];
                case 3:
                    email = _a.sent();
                    return [4 /*yield*/, pergunta('Digite o Celular: ')];
                case 4:
                    celular = _a.sent();
                    if (!(tipoSistema === TipoSistema.Simples)) return [3 /*break*/, 6];
                    return [4 /*yield*/, pergunta('Digite a Idade: ')];
                case 5:
                    idadeStr = _a.sent();
                    idade = parseInt(idadeStr, 10);
                    if (isNaN(idade)) {
                        console.log("Idade inválida. Por favor, digite um número.");
                        return [2 /*return*/];
                    }
                    sistema.enqueue({ cpf: cpf, email: email, celular: celular, idade: idade });
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, pergunta('Gravidade (urgente/não-urgente): ').then(function (s) { return s.toLowerCase(); })];
                case 7:
                    gravidadeStr = _a.sent();
                    if (gravidadeStr !== 'urgente' && gravidadeStr !== 'não-urgente') {
                        console.log("Gravidade inválida. Digite 'urgente' ou 'não-urgente'.");
                        return [2 /*return*/];
                    }
                    sistema.enqueue({ cpf: cpf, email: email, celular: celular, gravidade: gravidadeStr });
                    _a.label = 8;
                case 8: return [3 /*break*/, 10];
                case 9:
                    e_1 = _a.sent();
                    console.error('Erro ao adicionar item: ', e_1);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
// Inicia o sistema
escolherSistema().then(menu);
