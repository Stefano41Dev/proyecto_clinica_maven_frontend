import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environment/environment';
import {Observable, Subject} from 'rxjs';
import {MensajeChatDto} from '../../models/chat/mensaje-chat-dto';

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  private wsUrl = `ws://localhost:8080/ClinicaProyect/chat`;
  private socket!: WebSocket;
  private mensajesSubject = new Subject<MensajeChatDto>();

  public mensajes$ = this.mensajesSubject.asObservable();

  conectar(): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      return;
    }

    this.socket = new WebSocket(this.wsUrl);

    this.socket.onopen = () => console.log('Conectado al Chat Global');

    this.socket.onmessage = (event) => {
      const mensaje: MensajeChatDto = JSON.parse(event.data);
      this.mensajesSubject.next(mensaje);
    };

    this.socket.onerror = (error) => console.error('Error WS:', error);
  }

  enviarMensaje(mensaje: MensajeChatDto): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(mensaje));
    }
  }

  desconectar(): void {
    if (this.socket) {
      this.socket.close();
    }
  }

}
