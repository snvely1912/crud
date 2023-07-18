$(document).ready(function(){
    document.getElementById('Modifier').style.display='none';
    document.getElementById('reset').style.display='none';
    document.getElementById('voir_moyenne').disabled=true;
    $("#prenom").keyup(function(){
        $("#prenom").siblings('span.error').css('display', 'none');
    })
    $("#nom").keyup(function(){
        $("#nom").siblings('span.error').css('display', 'none');
    })
    $("#email").keyup(function(){
        $("#email").siblings('span.error').css('display', 'none');
    })
    $("#Enregistrer").click(function(){
        var isAllValid = true;
        var nom = $("#nom").val();
        var prenom = $("#prenom").val();
        var email = $("#email").val();
        if(nom.length < 2){
            isAllValid = false;
            $("#nom").siblings('span.error').css('display', 'block');
        }else{
            $("#nom").siblings('span.error').css('display', 'none');
        }
        if(prenom.length < 2){
            isAllValid = false;
            $("#prenom").siblings('span.error').css('display', 'block');
        }else{
            $("#prenom").siblings('span.error').css('display', 'none');
        }
        if(email.trim()==''){
            isAllValid = false;
            $("#email").siblings('span.error').css('display', 'block');
        }else{
            $("#email").siblings('span.error').css('display', 'none');
        }
        if(isAllValid){
            var tbody = $("#tbodyListEtudiant");
            var table=document.getElementById('tbodyListEtudiant');
            if(table.length==0){
                document.getElementById('voir_moyenne').disabled=true;
            }else{
                document.getElementById('voir_moyenne').disabled=false;
            }
            const colonne = document.querySelectorAll('#tbodyListEtudiant tr td:first-child');
            let plusGrandNombre = 0;
            var table = document.getElementById('tbodyListEtudiant');
            var taille_tab = table.rows.length;
            if (taille_tab == 0) {
                plusGrandNombre = 0;
            } else {
                plusGrandNombre = parseInt(colonne[0].textContent);
            }
            for (let i = 1; i < colonne.length; i++) {
                const nombre = parseInt(colonne[i].textContent);
                if (nombre > plusGrandNombre) {
                    plusGrandNombre = nombre;
                }
            }
            var ID = plusGrandNombre + 1;
            var list = "<tr>"
                            +"<td hidden>"
                                +ID+
                            "</td>"
                            +"<td>"
                                +nom+
                            "</td>"
                            +"<td>"
                                +prenom+
                            "</td>"
                            +"<td>"
                                +email+
                            "</td>"
                            +"<td style='text-align:right'>"
                                + "<button type='button' class='btn btn-sm btn-success' onclick='ModifierEtudiant(this)'>Modifier</button>&nbsp;"
                                + "<button type='button' class='btn btn-sm btn-danger' onclick='SupprimerEtudiant()'>Supprimer</button>&nbsp;"
                                + "<button type='button' class='btn btn-sm btn-dark' data-toggle='modal' data-target='#AjoutNoteEtudiantModal' onclick='AjoutNoteEtudiantModal(this)'>Ajouter Note</button>&nbsp;"
                                + "<button type='button' class='btn btn-sm btn-dark' data-toggle='modal' data-target='#VoirNoteEtudiantModal' onclick='VoirNoteEtudiantModal(this)'>Voir Note</button>"
                            +"</td>"
                        "</tr>";
                        tbody.append(list);

                        $("#prenom").val('');
                        $("#nom").val('');
                        $("#email").val('');
        }  
    })
    $("#voir_moyenne").click(function(){
        $("#listEtudiantMoyenne tbody").empty();
        var listEtudiant = document.getElementById('listEtudiant');
        var note=0;
        var appreciation="Insuffisant";
        var tbody=$("#tbodyMoyenne");
        for(var i = 1;i < listEtudiant.rows.length;i++){
            var row = listEtudiant.rows[i];
            var list="<tr>"
                + "<td>" + row.cells[1].innerHTML + "</td>"
                + "<td>" + row.cells[2].innerHTML + "</td>"
                + "<td>" + note + "</td>"
                + "<td>" + appreciation + "</tr>";
                tbody.append(list);
        }
    })
    //CONFIRMATION MODIFIER ETUDIANT
    $("#Modifier").click(function(){
        var index,table = document.getElementById('listEtudiant');
        var prenom=$("#prenom").val();
        var nom=$("#nom").val();
        var email=$("#email").val();
        var ID = $("#cellsID").val();
        for(var i = 0;i < table.rows.length;i++){
            var row = listEtudiant.rows[i];
            if(row.cells[0].innerHTML == ID){
                row.cells[1].innerHTML = nom;
                row.cells[2].innerHTML = prenom;
                row.cells[3].innerHTML = email;
            }
        }
    })
    //ANNULER
    $("#reset").click(function(){
        document.getElementById('Modifier').style.display='none';
        document.getElementById('reset').style.display='none';
        document.getElementById('Enregistrer').style.display='block';
        $("#prenom").val('');
        $("#nom").val('');
        $("#email").val('');
        $("#cellsID").val('');
    })
})

// TRAITEMENT SUPPRESSSION
var SupprimerEtudiant = function(){
    var index,table = document.getElementById('listEtudiant');
    for(var i = 0;i < table.rows.length;i++){
        table.rows[i].cells[4].onclick=function(){
            index = this.parentElement.rowIndex;
            table.deleteRow(index);
        }
    }
}
//MODIFIER ETUDIANT
var ModifierEtudiant = function(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById("nom").value = selectedRow.cells[1].innerHTML;
    document.getElementById("prenom").value = selectedRow.cells[2].innerHTML;
    document.getElementById("email").value = selectedRow.cells[3].innerHTML;
    document.getElementById("cellsID").value = selectedRow.cells[0].innerHTML;
    document.getElementById('Modifier').style.display='block';
    document.getElementById('reset').style.display='block';
    document.getElementById('Enregistrer').style.display='none';
}
//VOIR NOTE
var VoirNoteEtudiantModal = function(td){
    selectedRow = td.parentElement.parentElement;
    var prenom = selectedRow.cells[2].innerHTML;
    var nom = selectedRow.cells[1].innerHTML;
    $("#nomCompletEtudiant").html('<font>'+prenom+' '+nom+'</font>') ;
}
//AJOUTER NOTE
var AjoutNoteEtudiantModal = function(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById("cellsID").value = selectedRow.cells[0].innerHTML;
}
var validerAjoutNote = function(){
    var matiere = $("#listMatiere option:selected").text();
    var note = $("#noteEt").val();
    var tbody = $("#tbodylistNoteEt");
    var appreciation="";
    var ID = $("#cellsID").val();
    var index,table = document.getElementById('listEtudiant');
        for(var i = 0;i < table.rows.length;i++){
            var row = listEtudiant.rows[i];
            if(row.cells[0].innerHTML == ID){
                if(note<10){
                    appreciation="Insuffisant";
                }
                if(note > 10 && note < 15){
                    appreciation="Assez Bien";
                }
                if(note > 15){
                    appreciation="Bien";
                }
                var list="<tr><td>"
                        +matiere+
                    "</td><td>"
                        +note+
                    "</td><td>"
                        +appreciation+
                    "</td></tr>";
                tbody.append(list);
            }
        }
    
}

