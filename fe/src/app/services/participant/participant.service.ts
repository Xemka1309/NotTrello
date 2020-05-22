import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Participant} from '../../models/participant';

@Injectable({
  providedIn: 'root'
})

export class ParticipantService {
  private baseUrl = '/api/partic';
  private getParticByIdUrl = `${this.baseUrl}/get`;
  private getParticsByUserIdUrl = `${this.baseUrl}/get`;
  private createParticUrl = `${this.baseUrl}/add`;
  private updateParticUrl = `${this.baseUrl}/edit`;
  private deleteParticUrl = `${this.baseUrl}/delete`;

  constructor(private http: HttpClient) {
  }

  public createPartic(partic: Participant): Observable<any> {
    if (partic) {
      return this.http.post<Participant>(this.createParticUrl, partic, {
        observe: 'response'
      });
    }
  }

  public updatePartic(partic: Participant): Observable<any> {
    if (!partic) {
      return;
    }
    return this.http.put<Participant>(this.updateParticUrl, partic,{
      observe: 'response'
    })
  }

  public deletePartic(particId): Observable<any> {
    if (!particId) {
      return;
    }
    const params = new HttpParams({
      fromObject: { id: particId }
    });
    return this.http.delete(this.deleteParticUrl, {params, observe:'response'});
  }

  public getParticById(id: string): Observable<Participant> {
    const params = new HttpParams({
      fromObject: {id}
    });

    return this.http.get<Participant>(this.getParticByIdUrl, {params});
  }

  public getParticsByUserId(id: string): Observable<Participant[]> {
    const params = new HttpParams({
      fromObject: {id}
    });

    return this.http.get<Participant[]>(this.getParticByIdUrl, {params});
  }
}
