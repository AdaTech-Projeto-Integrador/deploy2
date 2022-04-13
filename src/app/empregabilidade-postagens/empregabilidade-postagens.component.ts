import { AuthService } from 'src/app/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-empregabilidade-postagens',
  templateUrl: './empregabilidade-postagens.component.html',
  styleUrls: ['./empregabilidade-postagens.component.css']
})
export class EmpregabilidadePostagensComponent implements OnInit {

  postagem: Postagem = new Postagem
  listaPostagens: Postagem[]

  tema: Tema = new Tema
  listaTemas: Tema[]
  descricao: string
  idTema: number

  id = this.postagem.id
  reverse = true

  tituloPostagem: string
  textoPostagem: string

  usuario: Usuario = new Usuario()
  idUsuario = environment.id
  nome = environment.nome
  foto = environment.foto
  tipo = environment.tipo

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private alertas: AlertasService,
    public authService: AuthService
  ) { }

  ngOnInit() {

    if (environment.token == '') {
      this.alertas.showAlertInfo('Sua sessão expirou, faça o login novamente')
      this.router.navigate(['/login'])
    }

    this.getAllPostagens()
    this.getEmpregabilidade()

  }

  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp.reverse()
    })
  }

  getEmpregabilidade() {
    this.descricao = "Vagas"
    this.temaService.getByDescricaoTema(this.descricao).subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

}