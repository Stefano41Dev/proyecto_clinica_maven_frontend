import {ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {MensajeChatDto} from '../../../models/chat/mensaje-chat-dto';
import {Subscription} from 'rxjs';
import {ChatService} from '../../../core/services/chat';
import {DatePipe, NgClass} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.html',
  styleUrl: './chat-box.css',
  imports: [
    NgClass,
    FormsModule
  ]
})
export class ChatBox implements OnInit, OnDestroy {

  @Input() miNombre!: string;

  mensajes: MensajeChatDto[] = [];
  nuevoMensajeTexto: string = '';
  chatAbierto: boolean = false;
  private chatSubscription!: Subscription;

  constructor(private chatService: ChatService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.chatService.conectar();

    this.chatSubscription = this.chatService.mensajes$.subscribe(mensaje => {
      this.mensajes.push(mensaje);
      this.hacerScrollHaciaAbajo();
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.chatSubscription) this.chatSubscription.unsubscribe();
    this.chatService.desconectar();
  }

  toggleChat(): void {
    this.chatAbierto = !this.chatAbierto;
    if (this.chatAbierto) this.hacerScrollHaciaAbajo();
  }

  enviar(): void {
    if (!this.nuevoMensajeTexto.trim()) return;

    const mensaje: MensajeChatDto = {
      remitente: this.miNombre,
      contenido: this.nuevoMensajeTexto,
      fechaEnvio: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    this.chatService.enviarMensaje(mensaje);

    this.nuevoMensajeTexto = '';
  }

  private hacerScrollHaciaAbajo(): void {
    setTimeout(() => {
      const chatBody = document.getElementById('chat-body-scroll');
      if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
    }, 100);
  }

}
