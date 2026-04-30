import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Estado {
  nome: string;
  sigla: string;
}

export interface Cidade {
  id?: number;
  nome: string;
  microrregiao?: any;
}

export interface Noticia {
  id?: string;
  titulo: string;
  resumo?: string;
  conteudo?: string;
  data?: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class IbgeService {
  private apiGatewayUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(`${this.apiGatewayUrl}/localidades/estados`);
  }

  getCidadesPorEstado(uf: string): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(`${this.apiGatewayUrl}/localidades/estados/${uf}/municipios`);
  }

  // Busca notícias pelo NOME do estado (ex: "Rio Grande do Norte")
  getNoticiasPorEstado(uf: string): Observable<any> {
    const nomeEstado = this.getNomeEstado(uf);
    return this.http.get<any>(
      `${this.apiGatewayUrl}/noticias?q=${encodeURIComponent(nomeEstado)}&qtd=30`
    );
  }

  getNoticiasPorEstadoECidade(uf: string, cidade: string): Observable<any> {
    const nomeEstado = this.getNomeEstado(uf);
    const termo = `${cidade} ${nomeEstado}`;
    return this.http.get<any>(
      `${this.apiGatewayUrl}/noticias?q=${encodeURIComponent(termo)}&qtd=30`
    );
  }

  getTodasAsNoticias(qtd: number = 50): Observable<any> {
    return this.http.get<any>(
      `${this.apiGatewayUrl}/noticias?q=Brasil&qtd=${qtd}`
    );
  }

// Mapeia sigla → nome completo
  private getNomeEstado(uf: string): string {
    const estados: { [key: string]: string } = {
      AC: 'Acre',
      AL: 'Alagoas',
      AP: 'Amapá',
      AM: 'Amazonas',
      BA: 'Bahia',
      CE: 'Ceará',
      DF: 'Distrito Federal',
      ES: 'Espírito Santo',
      GO: 'Goiás',
      MA: 'Maranhão',
      MT: 'Mato Grosso',
      MS: 'Mato Grosso do Sul',
      MG: 'Minas Gerais',
      PA: 'Pará',
      PB: 'Paraíba',
      PR: 'Paraná',
      PE: 'Pernambuco',
      PI: 'Piauí',
      RJ: 'Rio de Janeiro',
      RN: 'Rio Grande do Norte',
      RS: 'Rio Grande do Sul',
      RO: 'Rondônia',
      RR: 'Roraima',
      SC: 'Santa Catarina',
      SP: 'São Paulo',
      SE: 'Sergipe',
      TO: 'Tocantins'
    };
    return estados[uf.toUpperCase()] ?? uf;
  }
}
