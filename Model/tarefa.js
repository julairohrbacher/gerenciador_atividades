function Tarefa(){
	var id;
  	var nome;
  	var telefone;
  	var descricao;
  	var endereco;
  	var data;
  	var hora;
	var situacao;
  	
    this.getId=function(){
 		return this.id;
 	};
    this.setId=function(novoId){
 		this.id = novoId;
 	};        
    this.getNome=function(){
 		return this.nome;
 	};
    this.setNome=function(novoNome){
 		this.nome = novoNome;
 	};
 	this.getTelefone=function(){
 		return this.telefone;
 	};
    this.setTelefone=function(novoTelefone){
 		this.telefone = novoTelefone;
 	};
 	this.getDescricao=function(){
 		return this.descricao;
 	};
    this.setDescricao=function(novoDescricao){
 		this.descricao = novoDescricao;
 	};
 	this.getEndereco=function(){
 		return this.endereco;
 	};
    this.setEndereco=function(novoEndereco){
 		this.endereco = novoEndereco;
 	};
 	this.getHora=function(){
 		return this.hora;
 	};
    this.setHora=function(novoHora){
 		this.hora = novoHora;
 	}; 	
 	this.getData=function(){
 		return this.data;
 	};
    this.setData=function(novoData){
 		this.data = novoData;
 	}; 	 	
	
	this.getSituacao=function() {
		return this.situacao;
 	};
	
	this.setSituacao=function(novoSituacao) {
		this.situacao = novoSituacao;
 	};
	
	this.save=function(){
		var id = document.itemForm.id.value;
		if(id==''){
			this.insert();
		}else{
			this.update();
		}		
	}

	this.insert=function(){
		var nome = this.getNome();
		var telefone = this.getTelefone();
		var descricao = this.getDescricao();
		var endereco = this.getEndereco();
		var mode2 = this.getData();
		var mode6 = this.getHora();
		var situacao = this.getSituacao();

		if (nome == "" || telefone == "" || descricao == "" || endereco == "" || mode2 == "" || mode6 == "" || situacao == "") {
			updateStatus("ALERTA! Todos são campos obrigatórios!");
		}
		else {
			var query = "insert into management (nome, telefone, descricao, endereco, mode2, mode6, situacao) VALUES (?, ?, ?, ?, ?, ?, ?);";
			try {
				localDB.transaction(function(transaction){
					transaction.executeSql(query, [nome, telefone, descricao, endereco, mode2, mode6, situacao], function(transaction, results){
						if (!results.rowsAffected) {
							updateStatus("ERROR! ");
						}
						else {
							updateForm("", "", "", "", "", "", "", "");
							updateStatus("Inserção realizada na linha: " + results.insertId);
							queryAndUpdateOverview();
							$.mobile.changePage("#listar", { transition: "slideup",reverse :"true"} );
						}
					}, errorHandler);
				});
			} 
			catch (e) {
				updateStatus("ERROR! INSERT não realizado " + e + ".");
			}
		}
	} 	
	this.update=function(){
		var id = this.getId();
		var nome = this.getNome();
		var telefone = this.getTelefone();
		var descricao = this.getDescricao();
		var endereco = this.getEndereco();
		var mode2 = this.getData();
		var mode6 = this.getHora();
		var situacao = this.getSituacao();
		if (nome == "" || telefone == "" || descricao == "" || endereco == "" || mode2 == "" || mode6 == "" || situacao == "") {
			updateStatus("Todos são campos obrigatórios!");
		}
		else {
			var query = "update management set nome=?, telefone=?, descricao=?, endereco=?, mode2=?, mode6=?, situacao=? where id=?;";
			try {
				localDB.transaction(function(transaction){
					transaction.executeSql(query, [nome, telefone, descricao, endereco, mode2, mode6, situacao, id], function(transaction, results){
						if (!results.rowsAffected) {
							updateStatus("ERROR! Update não realizado.");
						}
						else {
							updateForm("", "", "", "", "", "", "", "");
							updateStatus("Update realizado:" + results.rowsAffected);
							queryAndUpdateOverview();
							$.mobile.changePage("#listar", { transition: "slideup",reverse :"true"} );
						}
					}, errorHandler);
				});
			} 
			catch (e) {
				updateStatus("ERROR! UPDATE não realizado " + e + ".");
			}
		}
	}
	this.del=function(){
		var id = this.getId()
		var query = "delete from management where id=?;";
		try {
			localDB.transaction(function(transaction){			
				transaction.executeSql(query, [id], function(transaction, results){
					if (!results.rowsAffected) {
						updateStatus("ERROR! Não foi possível excluir!");
					}
					else {
						updateForm("", "", "", "", "", "", "", "");
						updateStatus("Linhas deletadas:" + results.rowsAffected);
						queryAndUpdateOverview();
						$.mobile.changePage("#listar", { transition: "slideup",reverse :"true"} );
					}
				}, errorHandler);
			});
		} 
		catch (e) {
			updateStatus("ERROR! Não foi possível excluir " + e + ".");
		}    
	}		
}
