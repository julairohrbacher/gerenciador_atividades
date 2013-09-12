function onSave(id,nome,telefone,descricao,endereco,data,hora,situacao){
	var tarefa = new Tarefa();
	tarefa.setId(id);
	tarefa.setNome(nome);
	tarefa.setTelefone(telefone);
	tarefa.setDescricao(descricao);
	tarefa.setEndereco(endereco);
	tarefa.setData(data);
	tarefa.setHora(hora);
	tarefa.setSituacao(situacao);
	tarefa.save();
}
function onDelete(id){
	var tarefa = new Tarefa();
	tarefa.setId(id);
	tarefa.del();
}
