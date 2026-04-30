import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IbgeService, Estado, Noticia, Cidade } from '../services/ibge.service';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 flex justify-center">
      <div class="w-full max-w-7xl">

        <div class="text-center mb-12">
          <h1 class="text-5xl font-bold text-gray-800 mb-3">📰 Notícias IBGE</h1>
          <p class="text-gray-600 text-lg">Explore notícias dos estados brasileiros.</p>
        </div>

        <div class="bg-white rounded-2xl shadow-lg p-8 mb-8 w-full">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="w-full">
              <label class="block text-lg font-semibold mb-3 text-gray-700">🗺️ Estado:</label>
              <select
                [(ngModel)]="estadoSelecionado"
                (change)="onEstadoChange()"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="">Escolha um estado...</option>
                <option *ngFor="let estado of estados" [value]="estado.sigla">
                  {{ estado.nome }}
                </option>
              </select>
            </div>

            <div class="w-full">
              <label class="block text-lg font-semibold mb-3 text-gray-700">🏙️ Cidade (opcional):</label>
              <select
                [(ngModel)]="cidadeSelecionada"
                (change)="onCidadeChange()"
                [disabled]="!estadoSelecionado || cidades.length === 0"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition"
              >
                <option value="">Todas as cidades</option>
                <option *ngFor="let cidade of cidades" [value]="cidade.nome">
                  {{ cidade.nome }}
                </option>
              </select>
              <p *ngIf="!estadoSelecionado" class="text-sm text-gray-500 mt-2">👆 Selecione um estado primeiro</p>
              <p *ngIf="carregandoCidades" class="text-sm text-blue-500 mt-2 animate-pulse">⏳ Carregando cidades...</p>
            </div>
          </div>
        </div>

        <div *ngIf="estadoSelecionado" class="bg-linear-to-r from-blue-100 to-indigo-100 border-2 border-blue-300 rounded-xl p-4 mb-8 text-center">
          <p class="text-blue-800 font-semibold">
            <span *ngIf="!cidadeSelecionada">📍 Mostrando notícias de <strong>{{ estadoSelecionado }}</strong></span>
            <span *ngIf="cidadeSelecionada">📍 Mostrando notícias de <strong>{{ cidadeSelecionada }}, {{ estadoSelecionado }}</strong></span>
          </p>
        </div>

        <div *ngIf="!estadoSelecionado && noticiasExibidas.length > 0" class="bg-linear-to-r from-green-100 to-emerald-100 border-2 border-green-300 rounded-xl p-4 mb-8 text-center">
          <p class="text-green-800 font-semibold">🌍 Mostrando <strong>todas as notícias disponíveis</strong></p>
        </div>

        <div *ngIf="carregando" class="flex justify-center items-center py-16">
          <div class="flex flex-col items-center">
            <div class="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-blue-500"></div>
            <p class="mt-4 text-gray-600 font-semibold">Carregando notícias...</p>
          </div>
        </div>

        <div *ngIf="!carregando && noticiasExibidas.length > 0" class="w-full space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div *ngFor="let noticia of noticiasExibidas"
              class="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border-l-4 border-blue-500 flex flex-col relative">
              <div class="absolute top-4 right-4 z-10">
                <span *ngIf="estadoSelecionado && cidadeSelecionada" class="inline-block bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full">
                  📍 {{ cidadeSelecionada }}, {{ estadoSelecionado }}
                </span>
                <span *ngIf="estadoSelecionado && !cidadeSelecionada" class="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
                  🗺️ {{ estadoSelecionado }}
                </span>
                <span *ngIf="!estadoSelecionado" class="inline-block bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                  🌍 Brasil
                </span>
              </div>
              <div class="p-6 flex flex-col grow">
                <h3 class="text-lg font-bold text-gray-800 mb-3 line-clamp-3 hover:text-blue-600 transition pr-32">
                  {{ noticia.titulo }}
                </h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-4 grow">
                  {{ noticia.resumo || noticia.conteudo || 'Sem resumo disponível' }}
                </p>
                <div class="flex items-center justify-between pt-4 border-t border-gray-200 mt-auto">
                  <span class="text-xs text-gray-500 font-semibold">IBGE</span>
                  <a *ngIf="noticia['link']" [href]="noticia['link']" target="_blank"
                    class="text-blue-600 hover:text-blue-800 text-sm font-semibold">Ler mais →</a>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col items-center justify-center gap-6 py-8">
            <div class="text-center">
              <p class="text-gray-600 font-semibold mb-4">
                Mostrando <strong class="text-blue-600">{{ (paginaAtual * itemsPorPagina) + 1 }}</strong>
                a <strong class="text-blue-600">{{ Math.min((paginaAtual + 1) * itemsPorPagina, noticias.length) }}</strong>
                de <strong class="text-blue-600">{{ noticias.length }}</strong> notícias
              </p>
              <p class="text-lg font-bold text-gray-800">
                Página <span class="text-blue-600">{{ paginaAtual + 1 }}</span> de <span class="text-blue-600">{{ totalPaginas }}</span>
              </p>
            </div>
            <div class="flex gap-4 justify-center">
              <button (click)="paginaAnterior()" [disabled]="paginaAtual === 0"
                class="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition">
                ← Anterior
              </button>
              <button (click)="proximaPagina()" [disabled]="paginaAtual >= totalPaginas - 1"
                class="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition">
                Próxima →
              </button>
            </div>
          </div>
        </div>

        <div *ngIf="!carregando && noticiasExibidas.length === 0" class="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-8 text-center">
          <p class="text-yellow-800 text-lg font-semibold">
            <span *ngIf="estadoSelecionado">⚠️ Nenhuma notícia disponível para o filtro selecionado</span>
            <span *ngIf="!estadoSelecionado">⚠️ Nenhuma notícia disponível. Tente novamente mais tarde.</span>
          </p>
        </div>

      </div>
    </div>
  `,
  styles: []
})
export class NoticiasComponent implements OnInit {
  estados: Estado[] = [];
  cidades: Cidade[] = [];
  estadoSelecionado: string = '';
  cidadeSelecionada: string = '';
  noticias: Noticia[] = [];
  noticiasExibidas: Noticia[] = [];
  carregando = false;
  carregandoCidades = false;
  paginaAtual = 0;
  itemsPorPagina = 9;
  totalPaginas = 0;
  Math = Math;

  constructor(private ibgeService: IbgeService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.carregarEstados();
    this.carregarTodasAsNoticias();
  }

  carregarEstados(): void {
    this.ibgeService.getEstados().subscribe({
      next: (dados) => {
        this.estados = dados.sort((a, b) => a.nome.localeCompare(b.nome));
      },
      error: () => console.error('Erro ao carregar estados')
    });
  }

  private carregarTodasAsNoticias(): void {
    this.carregando = true;
    this.ibgeService.getTodasAsNoticias(50).subscribe({
      next: (response: any) => {
        this.noticias = this.extrairNoticias(response);
        this.paginaAtual = 0;
        this.atualizarPaginacao();
        this.carregando = false; // ← sempre para o loading
      },
      error: () => {
        this.noticias = [];
        this.noticiasExibidas = [];
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

  private extrairNoticias(response: any): Noticia[] {
    if (!response) return [];
    if (Array.isArray(response)) return response;
    if (response.items && Array.isArray(response.items)) return response.items;
    return [];
  }

  onEstadoChange(): void {
    this.cidadeSelecionada = '';
    this.cidades = [];
    this.noticias = [];
    this.noticiasExibidas = [];
    this.paginaAtual = 0;

    if (!this.estadoSelecionado || this.estadoSelecionado === '') {
      this.carregarTodasAsNoticias();
      return;
    }

    this.carregandoCidades = true;
    this.ibgeService.getCidadesPorEstado(this.estadoSelecionado).subscribe({
      next: (dados) => {
        this.cidades = dados.sort((a, b) => a.nome.localeCompare(b.nome));
        this.carregandoCidades = false;
        this.carregarNoticias();
      },
      error: () => {
        this.carregandoCidades = false;
        this.cidades = [];
        this.carregarNoticias();
      }
    });
  }

  onCidadeChange(): void {
    this.paginaAtual = 0;
    this.carregarNoticias();
  }

  private carregarNoticias(): void {
    if (!this.estadoSelecionado) {
      this.noticias = [];
      this.noticiasExibidas = [];
      this.carregando = false;
      return;
    }

    this.carregando = true;

    const observable = this.cidadeSelecionada
      ? this.ibgeService.getNoticiasPorEstadoECidade(this.estadoSelecionado, this.cidadeSelecionada)
      : this.ibgeService.getNoticiasPorEstado(this.estadoSelecionado);

    observable.subscribe({
      next: (response: any) => {
        this.noticias = this.extrairNoticias(response);
        this.paginaAtual = 0;
        this.atualizarPaginacao();
        this.carregando = false;
      },
      error: () => {
        this.noticias = [];
        this.noticiasExibidas = [];
        this.carregando = false;
      }
    });
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 0) {
      this.paginaAtual--;
      this.atualizarPaginacao();
    }
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas - 1) {
      this.paginaAtual++;
      this.atualizarPaginacao();
    }
  }

  private atualizarPaginacao(): void {
    if (!Array.isArray(this.noticias)) {
      this.noticias = [];
    }
    this.totalPaginas = Math.ceil(this.noticias.length / this.itemsPorPagina);
    const inicio = this.paginaAtual * this.itemsPorPagina;
    const fim = inicio + this.itemsPorPagina;
    this.noticiasExibidas = this.noticias.slice(inicio, fim);
  }
}
