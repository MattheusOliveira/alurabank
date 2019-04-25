import { NegociacaoController } from './controllers/NegociacaoController';

let negociacaoController = new NegociacaoController();

$('form').submit(negociacaoController.adiciona.bind(negociacaoController));
$('#botao-importa').click(negociacaoController.importaDados.bind(negociacaoController));
