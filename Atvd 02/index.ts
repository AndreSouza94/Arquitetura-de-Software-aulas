import * as crypto from 'crypto';
import * as readline from 'readline';

// 1. Interfaces para Estrutura de Dados
interface DadosPessoa {
    cpf: string;
    email: string;
    celular: string;
    idade?: number; // Opcional para a versão clínica
    gravidade?: 'urgente' | 'não-urgente'; // Opcional para a versão simples
}

interface Atendimento extends DadosPessoa {
    id: string;
    timestamp: Date;
    sala?: string; // Novo: sala de atendimento
}

// 2. Enum para o tipo de sistema
enum TipoSistema {
    Simples,
    ClinicaMedica
}

// 3. Classe Base Abstrata para o Sistema de Filas
abstract class SistemaDeFilaBase {
    protected historicoAtendimentos: Atendimento[] = [];

    protected adicionarAoHistorico(atendimento: Atendimento): void {
        this.historicoAtendimentos.unshift(atendimento); // Adiciona no início para exibir os mais recentes primeiro
        if (this.historicoAtendimentos.length > 50) { // Limita o histórico
            this.historicoAtendimentos.pop();
        }
    }

    public listarHistorico(): void {
        console.log("\n--- Histórico de Atendimentos ---");
        if (this.historicoAtendimentos.length === 0) {
            console.log("Nenhum atendimento realizado ainda.");
        } else {
            this.historicoAtendimentos.forEach(item => {
                const infoExtra = this instanceof SistemaDeFilaClinica ? `Sala: ${item.sala}` : `Idade: ${item.idade}`;
                console.log(`ID: ${item.id} | CPF: ${item.cpf} | ${infoExtra} | Atendido em: ${item.timestamp.toLocaleString()}`);
            });
        }
        console.log("----------------------------------\n");
    }

    abstract enqueue(dados: DadosPessoa): string;
    abstract dequeue(): Atendimento | undefined;
    abstract listar(): void;
}

// 4. Classe da Versão Simples (Prioridade por Idade)
class SistemaDeFilaSimples extends SistemaDeFilaBase {
    private filaPrioritaria: Atendimento[] = [];
    private filaNormal: Atendimento[] = [];
    private contadorPrioridade = 0;

    public enqueue(dados: DadosPessoa): string {
        const id = crypto.createHash('sha256').update(dados.cpf + dados.email + dados.celular).digest('hex');
        const novoAtendimento: Atendimento = { ...dados, id, timestamp: new Date() };

        if (novoAtendimento.idade && novoAtendimento.idade >= 60) {
            this.filaPrioritaria.push(novoAtendimento);
            console.log(`✅ Adicionado à Fila PRIORITÁRIA. ID: ${id}`);
        } else {
            this.filaNormal.push(novoAtendimento);
            console.log(`✅ Adicionado à Fila NORMAL. ID: ${id}`);
        }
        return id;
    }

    public dequeue(): Atendimento | undefined {
        let itemRemovido: Atendimento | undefined;
        const proporcaoPrioridade = 2; // 2 para 1

        if (this.filaPrioritaria.length > 0 && this.contadorPrioridade < proporcaoPrioridade) {
            this.contadorPrioridade++;
            itemRemovido = this.filaPrioritaria.shift();
            console.log(`➡️ Atendido (Prioritário). ID: ${itemRemovido?.id}`);
        } else if (this.filaNormal.length > 0) {
            this.contadorPrioridade = 0;
            itemRemovido = this.filaNormal.shift();
            console.log(`➡️ Atendido (Normal). ID: ${itemRemovido?.id}`);
        } else if (this.filaPrioritaria.length > 0) {
            this.contadorPrioridade++;
            itemRemovido = this.filaPrioritaria.shift();
            console.log(`➡️ Atendido (Prioritário). ID: ${itemRemovido?.id}`);
        } else {
            console.log("❌ Nenhuma fila tem itens para atendimento.");
            return undefined;
        }

        if (itemRemovido) {
            this.adicionarAoHistorico(itemRemovido);
        }
        return itemRemovido;
    }

    public listar(): void {
        console.log("\n--- Itens na Fila PRIORITÁRIA (Simples) ---");
        this.filaPrioritaria.forEach(item => console.log(`ID: ${item.id} | CPF: ${item.cpf} | Idade: ${item.idade}`));
        console.log("\n--- Itens na Fila NORMAL (Simples) ---");
        this.filaNormal.forEach(item => console.log(`ID: ${item.id} | CPF: ${item.cpf} | Idade: ${item.idade}`));
        console.log("-------------------------------------------\n");
    }
}

// 5. Classe da Versão Clínica Médica (Prioridade por Gravidade)
class SistemaDeFilaClinica extends SistemaDeFilaBase {
    private filaUrgente: Atendimento[] = [];
    private filaNaoUrgente: Atendimento[] = [];
    private contadorUrgente = 0;
    private salasDeAtendimento = ['Sala 1', 'Sala 2', 'Sala 3'];

    public enqueue(dados: DadosPessoa): string {
        const id = crypto.createHash('sha256').update(dados.cpf + dados.email + dados.celular).digest('hex');
        const novoAtendimento: Atendimento = { ...dados, id, timestamp: new Date() };

        if (novoAtendimento.gravidade === 'urgente') {
            this.filaUrgente.push(novoAtendimento);
            console.log(`✅ Adicionado à Fila URGENTE. ID: ${id}`);
        } else {
            this.filaNaoUrgente.push(novoAtendimento);
            console.log(`✅ Adicionado à Fila NÃO-URGENTE. ID: ${id}`);
        }
        return id;
    }

    public dequeue(): Atendimento | undefined {
        let itemRemovido: Atendimento | undefined;
        const proporcaoPrioridade = 5; // 5 para 1
        const salaAtendimento = this.salasDeAtendimento[Math.floor(Math.random() * this.salasDeAtendimento.length)];

        if (this.filaUrgente.length > 0 && this.contadorUrgente < proporcaoPrioridade) {
            this.contadorUrgente++;
            itemRemovido = this.filaUrgente.shift();
            if (itemRemovido) {
                itemRemovido.sala = salaAtendimento;
            }
            console.log(`➡️ Atendimento URGENTE chamado para a ${salaAtendimento}. ID: ${itemRemovido?.id}`);
        } else if (this.filaNaoUrgente.length > 0) {
            this.contadorUrgente = 0;
            itemRemovido = this.filaNaoUrgente.shift();
            if (itemRemovido) {
                itemRemovido.sala = salaAtendimento;
            }
            console.log(`➡️ Atendimento NÃO-URGENTE chamado para a ${salaAtendimento}. ID: ${itemRemovido?.id}`);
        } else if (this.filaUrgente.length > 0) {
            this.contadorUrgente++;
            itemRemovido = this.filaUrgente.shift();
            if (itemRemovido) {
                itemRemovido.sala = salaAtendimento;
            }
            console.log(`➡️ Atendimento URGENTE chamado para a ${salaAtendimento}. ID: ${itemRemovido?.id}`);
        } else {
            console.log("❌ Nenhuma fila tem itens para atendimento.");
            return undefined;
        }

        if (itemRemovido) {
            this.adicionarAoHistorico(itemRemovido);
        }
        return itemRemovido;
    }

    public listar(): void {
        console.log("\n--- Itens na Fila URGENTE (Clínica) ---");
        this.filaUrgente.forEach(item => console.log(`ID: ${item.id} | CPF: ${item.cpf} | Gravidade: ${item.gravidade}`));
        console.log("\n--- Itens na Fila NÃO-URGENTE (Clínica) ---");
        this.filaNaoUrgente.forEach(item => console.log(`ID: ${item.id} | CPF: ${item.cpf} | Gravidade: ${item.gravidade}`));
        console.log("------------------------------------------\n");
    }
}

// 6. Configuração e Menu Principal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let sistema: SistemaDeFilaBase;
let tipoSistema: TipoSistema;

async function escolherSistema() {
    return new Promise<void>(resolve => {
        console.log("\n--- Escolha o Sistema ---");
        console.log("1. Sistema Simples (Prioridade por Idade)");
        console.log("2. Sistema Clínica Médica (Prioridade por Gravidade)");

        rl.question('Escolha uma opção: ', (opcao) => {
            if (opcao.trim() === '1') {
                sistema = new SistemaDeFilaSimples();
                tipoSistema = TipoSistema.Simples;
                console.log("✅ Sistema Simples selecionado.");
                resolve();
            } else if (opcao.trim() === '2') {
                sistema = new SistemaDeFilaClinica();
                tipoSistema = TipoSistema.ClinicaMedica;
                console.log("✅ Sistema Clínica Médica selecionado.");
                resolve();
            } else {
                console.log("Opção inválida. Por favor, escolha 1 ou 2.");
                escolherSistema().then(resolve);
            }
        });
    });
}

async function menu() {
    console.log("\n--- Menu Principal ---");
    console.log("1. Adicionar à fila");
    console.log("2. Processar (remover) da fila");
    console.log("3. Listar todos os itens nas filas");
    console.log("4. Listar histórico de atendimentos");
    console.log("5. Sair");

    rl.question('Escolha uma opção: ', async (opcao) => {
        switch (opcao.trim()) {
            case '1':
                await adicionarItem();
                break;
            case '2':
                sistema.dequeue();
                break;
            case '3':
                sistema.listar();
                break;
            case '4':
                sistema.listarHistorico();
                break;
            case '5':
                rl.close();
                return;
            default:
                console.log("Opção inválida. Tente novamente.");
                break;
        }
        menu();
    });
}

async function adicionarItem() {
    const pergunta = (q: string): Promise<string> => new Promise((resolve) => rl.question(q, resolve));

    try {
        const cpf = await pergunta('Digite o CPF: ');
        const email = await pergunta('Digite o Email: ');
        const celular = await pergunta('Digite o Celular: ');

        if (tipoSistema === TipoSistema.Simples) {
            const idadeStr = await pergunta('Digite a Idade: ');
            const idade = parseInt(idadeStr, 10);
            if (isNaN(idade)) {
                console.log("Idade inválida. Por favor, digite um número.");
                return;
            }
            sistema.enqueue({ cpf, email, celular, idade });
        } else { // Clínica Médica
            const gravidadeStr = await pergunta('Gravidade (urgente/não-urgente): ').then(s => s.toLowerCase());
            if (gravidadeStr !== 'urgente' && gravidadeStr !== 'não-urgente') {
                console.log("Gravidade inválida. Digite 'urgente' ou 'não-urgente'.");
                return;
            }
            sistema.enqueue({ cpf, email, celular, gravidade: gravidadeStr as 'urgente' | 'não-urgente' });
        }
    } catch (e) {
        console.error('Erro ao adicionar item: ', e);
    }
}

// Inicia o sistema
escolherSistema().then(menu);