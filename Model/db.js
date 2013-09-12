
function onSelect(htmlLIElement){
	var id = htmlLIElement.getAttribute("id");
	
	query = "SELECT * FROM management where id=?;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [id], function(transaction, results){
            
                var row = results.rows.item(0);
                
                updateForm(row['id'], row['nome'], row['telefone'], row['descricao'], row['endereco'], row['mode2'], row['mode6'], row['situacao']);
				$.mobile.changePage("#contato", { transition: "slideup"} );
                
            }, function(transaction, error){
                updateStatus("ERROR! " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    } 
    catch (e) {
        updateStatus("ERROR! SELECT não realizado " + e + ".");
    }
   
}

function queryAndUpdateOverview(){

	//Remove as linhas existentes para inserção das novas
    var dataRows = document.getElementById("itemData").getElementsByClassName("data");
	
    while (dataRows.length > 0) {
        row = dataRows[0];
        document.getElementById("itemData").removeChild(row);
    };
    
	//Realiza a leitura no banco e cria novas linhas na tabela.
    var query = "SELECT * FROM management ORDER BY mode2 ASC;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [], function(transaction, results){
                for (var i = 0; i < results.rows.length; i++) {
                
                    var row = results.rows.item(i);
					var a = document.createElement("a");
					a.setAttribute('href','#')
                    var li = document.createElement("li");
					li.setAttribute("id", row['id']);
                    li.setAttribute("class", "data");
                    li.setAttribute("onclick", "onSelect(this)");
                    
                    var liText = document.createTextNode(row['nome'] + ': ' + row['mode2']);
					a.appendChild(liText);
                    li.appendChild(a);
                    
                    document.getElementById("itemData").appendChild(li);
					$('#itemData').listview('refresh');
                }
            }, function(transaction, error){
                updateStatus("ERROR! " + error.code + "<br>Mensagem: " + error.message);
            });
        });
    } 
    catch (e) {
        updateStatus("ERROR! SELECT não realizado " + e + ".");
    }
}

errorHandler = function(transaction, error){
    updateStatus("ERROR! " + error.message);
    return true;
}

nullDataHandler = function(transaction, results){
}

// Funções de update

function updateForm(id, nome, telefone, descricao, endereco, mode2, mode6){
    document.itemForm.id.value = id;
    document.itemForm.nome.value = nome;
    document.itemForm.telefone.value = telefone;
    document.itemForm.descricao.value = descricao;
    document.itemForm.endereco.value = endereco;
    document.itemForm.mode2.value = mode2;
    document.itemForm.mode6.value = mode6;
	document.itemForm.situacao.value = situacao;
}

function updateStatus(status){
    $('.status').html(status);
}
