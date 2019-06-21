import { Negociacao, NegociacaoParcial, Negociacoes, Igualavel } from '../models/index';
import { NegociacoesView, MensagemView } from '../views/index';
import { logarTempoDeExecucao, domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoService } from '../services/index';
import { firebase } from '../../Firebase';


export class NegociacaoController {
//class Controller
    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;

    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoes-view');
    private _mensagemView = new MensagemView('#mensagem-view');
    private _negociacaoService = new NegociacaoService();
    private _db = firebase.firestore();


    constructor() {
        // this._inputData = $('#data');
        // this._inputQuantidade = $('#quantidade');
        // this._inputValor = $("#valor");
        this._negociacoesView.update(this._negociacoes);
    }

   // @logarTempoDeExecucao() //decorators
    @throttle()
    adiciona() {
        let data = new Date(this._inputData.val().replace(/-/g, ','));

        if(!this._ehDiaUtil(data)) {
          this._mensagemView.update('Somente negociações em dias úties por favor!')
          return;
        }

        const negociacao = new Negociacao(
            data,
            Number(this._inputQuantidade.val()),
            Number(this._inputValor.val()),
        );
        this._negociacoes.adiciona(negociacao);

        this._db.collection("negociacoes").add({
          data,
          quantidade: Number(this._inputQuantidade.val()),
          Number(this._inputValor.val())
        })
        .then(function(docRef) => {
          console.log('Document written with id: ', docRef)
        }).catch((err) => console.log(err));

        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação adicionada com sucesso!');
    }

    // @throttle()
    // importaDados() {
    //     function isOk(res: Response) {
    //          if(res.ok) {
    //            return res;
    //          }
    //          else
    //            throw new Error(res.statusText);
    //     }
    //
    //     this._negociacaoService
    //         .obterNegociacoes(isOk)
    //         .then(negociacoesParaImportar => {
    //
    //             const negociacoesJaImportadas = this._negociacoes.paraArray();
    //             console.log(this._negociacoes)
    //             negociacoesParaImportar.filter(negociacao =>
    //                 !negociacoesJaImportadas.some(jaImportada =>
    //                     negociacao.isEquals(jaImportada)))
    //             .forEach(negociacao => {
    //               this._negociacoes.adiciona(negociacao);
    //               this._negociacoesView.update(this._negociacoes);
    //             });
    //         }).catch(err => console.log(err));
    // }

    @throttle()
    async importaDados() {
        try {
            function isOk(res: Response) {
                 if(res.ok) {
                   return res;
                 }
                 else
                   throw new Error(res.statusText);
            }

            const negociacoesParaImportar = await this._negociacaoService
                .obterNegociacoes(isOk);

            const negociacoesJaImportadas = this._negociacoes.paraArray();

            negociacoesParaImportar.filter(negociacao =>
                !negociacoesJaImportadas.some(jaImportada =>
                    negociacao.isEquals(jaImportada)))
            .forEach(negociacao => {
              this._negociacoes.adiciona(negociacao);
              this._negociacoesView.update(this._negociacoes);
            });
        } catch(err) {
            this._mensagemView.update(err.message);
        }
    }

    private _ehDiaUtil (data: Date) {
       return data.getDay() != diasDaSemana.Domingo && data.getDay() != diasDaSemana.Sabado;
    }
}
enum diasDaSemana {
  Domingo,
  Segunda,
  Terca,
  Quarta,
  Quinta,
  Sexta,
  Sabado
}
