import { Negociacao } from '../models/Negociacao';
import { Igualavel } from '../models/Igualavel';

export class Negociacoes implements Igualavel <Negociacoes>{

    private _negociacoes: Array<Negociacao> = [];

    adiciona(negociacao: Negociacao):void {
        this._negociacoes.push(negociacao);
    }

    paraArray(): Negociacao[] {
        return ([] as Negociacao[]).concat(this._negociacoes);
        //tratando [] como um array de Negociação, pois [] pode concatenar null ou undefined
    }

    isEquals(negociacoes: Negociacoes):boolean {
        return JSON.stringify(this._negociacoes) === JSON.stringify(negociacoes);
    }
}
