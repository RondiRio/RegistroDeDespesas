// meu codigo
class Despesa{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano =  ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
        
    }
    validarDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
            
        }
        return true
    }
}
// minha classe
class Bd{

    constructor(){
        let id = localStorage.getItem('id')

            if(id === null){
                localStorage.setItem('id', 0)
            }

    }
    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId)+ 1
        
    }
    gravar(d){
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))


        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros(){
        // array despesas
        let despesas = Array()

        let id = localStorage.getItem('id')
        
        // recupera todas as despesas cadastradas em LocalStorage
        
        for( let i = 1; i <= id; i++){
            // recupera a despesa 
            let despesa = JSON.parse(localStorage.getItem(i))

            // verifica se existe a possibilidade de haver indices removidos ou pulados
            if(despesa === null){
                continue
            }
            despesa.id = i
            // console.log(despesa) 
            despesas.push(despesa)
            
        }
        return despesas
    }
    pesquisar(despesa){
        
        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosRegistros()
        // console.log(despesasFiltradas)
        // console.log(despesa)
        // filtra o ano
        if(despesa.ano != '')
        {
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
            console.log(despesasFiltradas)
        }
        // filtra o mes
        if(despesa.mes != '')
        {
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
            console.log(despesasFiltradas)
        }
        // filtra o dia
        if(despesa.dia != '')
        {
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
            console.log(despesasFiltradas)
        }
        // filtra o tipo
        if(despesa.tipo != '')
        {
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
            console.log(despesasFiltradas)
        }
        // filtra a descricao
        if(despesa.descricao != '')
        {
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
            console.log(despesasFiltradas)
        }
        // filtra o valor
        if(despesa.valor != '')
        {
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
            console.log(despesasFiltradas)   
        }
        return despesasFiltradas
    }
    remover(id){
        localStorage.removeItem(id)
    }
    soma(id){
        localStorage.somarItem(id)
        
    }
}



let bd = new Bd()
function cadastrarDespesas()
{
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia  = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')
    console.log(valor)
    
    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
        
    )
    
    if(despesa.validarDados()){
        bd.gravar(despesa)

        document.getElementById('modal_titulo').innerHtml = 'Registro inserido com sucesso'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_conteudo').innerHTML = 'Despesa cadastrada com sucesso'
        document.getElementById("modal_btn").innerHTML = 'Voltar'
        document.getElementById("modal_btn").className = 'btn btn-success'
        
        $("#modalRegistraDespesa").modal('show')

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
    }else{
        document.getElementById('modal_titulo').innerHtml = 'Erro na inclusão do registro'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente'
        document.getElementById("modal_btn").innerHTML = 'Voltar e corrigir'
        document.getElementById("modal_btn").className = 'btn btn-danger'
        
        
        $("#modalRegistraDespesa").modal('show')
    }
    
}

function carregaListaDespesas(despesas = Array(), filtro = false)
{
    if(despesas.length == 0 && filtro == false){
        despesas = bd.recuperarTodosRegistros()
    }
    

     // selecionando o elemento tbody da tabela
     let listaDespesas = document.getElementById('listaDespesas')
     listaDespesas.innerHTML = ''
     /*
         <tr>
                 <td>
                   15/03/2018
                 </td>
                 <td>Alimentação</td>
                 <td>compras do mes</td>
                 <td>444.75</td>
          </tr>
     */
     //    percorrer o array despesas, listando cada despesa de forma dinamica
     despesas.forEach(function(d){
         // console.log(d)
         // criando a linha (tr)
         let linha = listaDespesas.insertRow()
         //inserindo valores. criando colunas (td)
         
         linha.insertCell(0).innerHTML = ` ${ d.dia}/${d.mes}/${d.ano}` 
         
         switch(parseInt(d.tipo))
         {
             case 1: d.tipo= 'Alimentação'
                 break;
             case 2: d.tipo= 'Educação'
                 break;
             case 3: d.tipo= 'Lazer'
                 break;
             case 4: d.tipo= 'Saúde'
                 break;
             case 5: d.tipo= 'Transporte'
                 break;
             case 6: d.tipo= 'Casa'
                 break;
             
         }
         linha.insertCell(1).innerHTML = d.tipo
         linha.insertCell(2).innerHTML = d.descricao
         linha.insertCell(3).innerHTML = d.valor
    //   criando botão de exclusão
      let btn = document.createElement('button')
      btn.className = 'btn btn-danger'
      btn.innerHTML = '<i class="fas fa-times"></i>'
      btn.id ='id_despesa' + d.id
      btn.onclick = function()
      {

        alert("Os dados serão excluidos")
        
        let id = this.id.replace('id_despesa', '')
        bd.remover(id)
        window.location.reload()
      }
      linha.insertCell(4).append(btn)
    
    }
      
        )
    
    

}
function pesquisarDespesa(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor= document.getElementById('valor').value
    let soma = document.getElementById('valor').value
    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
    let despesas = bd.pesquisar(despesa)
    
    carregaListaDespesas(despesas, true)
}
// soma = this.valor 
// console.log(soma)