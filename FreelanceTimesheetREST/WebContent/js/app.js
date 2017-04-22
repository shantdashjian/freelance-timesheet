$(document).ready(function() {
    loadData();
})

var loadData = function() {
    $.ajax({
        type: 'GET',
        url: 'api/workitems',
        dataType: 'json'
    }).done(function(workItems, status) {
        listWorkItemsAndShowCreateWorkItemButton(workItems);
    }).fail(function(xhr, status, error) {
        $('#content').append('<p>An Error has Occured</p>');
    });
}

var listWorkItemsAndShowCreateWorkItemButton = function(workItems) {
    $('#content').empty();
    var $table = $('<table id="table" class="table table-bordered table-striped bordered">');

    var $thead = $('<thead>');
    $thead.append('<tr><th>Work Item Period</th><th>Date</th><th class="fit">Action</th><th class="fit">Action</th><th class="fit">Action</th></tr>');
    $table.append($thead);
    var $tbody = $('<tbody>');
    workItems.forEach(function(workItem, index, array) {
        $tbody.append('<tr><td >' + workItem.period  
        		+ '</td><td>'+ date(workItem.year, workItem.month, workItem.day) + '<td workItemId="' 
        		+ workItem.id + '"></td><td workItemId="' + workItem.id 
        		+ '"></td><td workItemId="' + workItem.id + '"></td></tr>');
    })
    $table.append($tbody);
    $('#content').append('<div id="mainContainer" class="container">');
    $('#mainContainer').append($table);

    $($table).wrap('<div class="col-md-6 col-md-offset-3 bordered" id="mainColumn"></div>');
    $('#mainColumn').wrap('<div class="row"></div>');
    $('#mainColumn').prepend("<h1 class=' backgrounded bordered'>Timesheet History</h1>");

    var $viewButtonCells = $('tr td:nth-child(3)');
    $viewButtonCells.each(function() {

        var $viewButton = $('<button  type="button" name="viewButton" class="btn btn-success">View</button>');
        $viewButton.attr('id', $(this).attr("workItemId"));
        $(this).append($viewButton);
        $viewButton.click(function() {
            showWorkItem($(this).attr('id'));
        });        
    });
    
    var $editButtonCells = $('tr td:nth-child(4)');
    $editButtonCells.each(function() {

        var $editButton = $('<button  type="button" name="editButton" class="btn btn-warning">Edit</button>');
        $editButton.attr('id', $(this).attr("workItemId"));
        $(this).append($editButton);
        $editButton.click(function() {
            editWorkItem($(this).attr('id'));
        });        
    });
    
    var $deleteButtonCells = $('tr td:nth-child(5)');
    $deleteButtonCells.each(function() {

        var $deleteButton = $('<button  type="button" name="deleteButton" class="btn btn-danger">Delete</button>');
        $deleteButton.attr('id', $(this).attr("workItemId"));
        $(this).append($deleteButton);
        $deleteButton.click(function() {
            deleteWorkItem($(this).attr('id'));
        });        
    });
    
    // Create workItem button
    var $createWorkItemButton = $('<button  type="button" id="showCreateWorkItemButton" class="btn btn-primary">Add Work Item</button>');
    $('#mainColumn').append($createWorkItemButton);
    $createWorkItemButton.click(function() {
        showCreateWorkItemForm();
    });   

}

var showWorkItem = function(id) {
    cleanUpAndAddMainColumn();
    $.ajax({
        type: 'GET',
        url: 'api/workitems/' + id,
        dataType: 'json'
    }).done(function(workItem, status) {
        showWorkItemDetails(workItem);
    }).fail(function(xhr, status, error) {
        $('#content').append('<p>An Error has Occured</p>');
    });

}

var editWorkItem = function(id) {
    cleanUpAndAddMainColumn();
    $.ajax({
        type: 'GET',
        url: 'api/workitems/' + id,
        dataType: 'json'
    }).done(function(workItem, status) {
        showWorkItemDetailsToEdit(WorkItem);
    }).fail(function(xhr, status, error) {
        $('#content').append('<p>An Error has Occured</p>');
    });

}

var deleteWorkItem = function(id) {
	var deleteWorkItem = confirm("Are you sure you want to delete this work item?");
	if (deleteWorkItem) {
		
		cleanUpAndAddMainColumn();
		// DELETE workitems/{id}
		$.ajax({
			type: 'DELETE',
			url: 'api/workitems/' + id,
		}).done(function(workItem, status) {
			loadData();
		}).fail(function(xhr, status, error) {
			$('#content').append('<p>An Error has Occured</p>');
			addReturnButton();
		});
	}

}

var cleanUpAndAddMainColumn = function() {
    $('#content').empty();
    $('#content').append('<div id="mainContainer" class="container">');
    $('#mainContainer').empty();
    $('#mainContainer').append('<div id="mainRow" class="row"></div>')

    $('#mainRow').append('<div class="col-md-6 col-md-offset-3 bordered" id="mainColumn"></div>');
}

var showWorkItemDetails = function(workItem) {
    $('#mainColumn').append('<h1  class="backgrounded bordered">' 
    		+ capitalizeFirstLetter(workItem.name) + '</h1>');
   
	// GET workitems/{workItemId}/questions
    $.ajax({
        type: 'GET',
        url: 'api/workitems/'+WorkItem.id+'/questions',
        dataType: 'json'
    }).done(function(questions, status) {
    	var $questionsRow = $('<div class="questions-row row">');

        var $questionsRowColumn = $('<div class="col-md-12">');
        
        $questionsRowColumn.append('<h4>Questions:</h4>');
        var $questionsList = $('<ol id="questions-list">');
        questions.forEach(function(question, index) {
        	$questionsList.append('<li>' + question.questionText + '</li>');
        })
        $questionsRowColumn.append($questionsList);
        $questionsRow.append($questionsRowColumn);
        $('#mainColumn').append($questionsRow);
        addReturnButton();
        
    }).fail(function(xhr, status, error) {
        $('#mainColumn').append('<p>No questions were retrieved!</p>');
        addReturnButton();
    });

}

var showWorkItemDetailsToEdit = function(workItem) {
	
	
	// PUT workitems/{id}
	var $form = $('<form name="editWorkItemForm" id="editWorkItemForm">');
	$form.append('<label for="name">WorkItem Name: </label>');
	$form.append('<input id="name" type="text" name="name"  size="12" value="'+WorkItem.name+'" required><br>');
	
	// edit button
	var $editButton = $('<input id="edit" type="submit" name="editWorkItemButton" class="btn btn-warning" value="Submit">');
	$form.append($editButton);
//	$createButton.click(function(event) {
	$form.submit(function(event) {
		event.preventDefault();
		if ($(editWorkItemForm.name).val()) {
			
			var WorkItem = {
					name: $(editWorkItemForm.name).val()
			};
			$.ajax({
				type: "PUT",
		        url: 'api/workitems/'+WorkItem.id,
				dataType: "json",
				contentType: 'application/json', //setting the request headers content-type
				data: JSON.stringify(WorkItem) //the data being added to the request body
			}).done(function(WorkItem, status) {
			    cleanUpAndAddMainColumn();
				confirmWorkItemEditted(WorkItem);
			}).fail(function(xhr, status, error) {
			    cleanUpAndAddMainColumn();
				$('#mainColumn').append('<p>An Error has Occured</p>');
				addReturnButton();
			});
		} else {
			$form.prepend('<p>Please enter WorkItem name!</p>');

		}
	});
	
	
	$('#mainColumn').append("<h1 class='backgrounded bordered'>Edit WorkItem!</h1>");
	$('#mainColumn').append($form);
	
	
}

var showCreateWorkItemForm = function(){
	$('#showCreateWorkItemButton').remove();
	$('#mainContainer').append('<div id="formRow" class="row"></div>');
	$('#formRow').append('<div class="col-md-6 col-md-offset-3 bordered form" id="formColumn"></div>');
	$('#formColumn').load('html/create-work-item-form.html', function(){		
		var $form = $('#createWorkItemForm');
		$form.submit(function(event) {
			event.preventDefault();
			if ($(createWorkItemForm.period).val()) {
				
				var workItem = {
						period: $(createWorkItemForm.period).val(),
						rate: $(createWorkItemForm.rate).val(),
						month: $(createWorkItemForm.month).val(),
						day: $(createWorkItemForm.day).val(),
						year: $(createWorkItemForm.year).val(),
						notes: $(createWorkItemForm.notes).val()
				};
				$.ajax({
					type: "POST",
					url: 'api/workitems',
					dataType: "json",
					contentType: 'application/json', //setting the request headers content-type
					data: JSON.stringify(workItem) //the data being added to the request body
				}).done(function(workItem, status) {
					confirmWorkItemAdded(workItem);
				}).fail(function(xhr, status, error) {
					$('#content').append('<p>An Error has Occured</p>');
				});
			} else {
				$form.prepend('<p>Please enter work item period!</p>');
				
			}
		});
		
	});
}

var confirmWorkItemAdded = function(WorkItem) {
    loadData();
    // cleanUpAndAddMainColumn();
    // listworkitemsAndShowCreateWorkItemButton();
    // $('#mainColumn').append('<h2>New WorkItem Added!</h2>');
    // showWorkItemDetails(WorkItem);
}

var confirmWorkItemEditted = function(WorkItem) {
    loadData();
    // cleanUpAndAddMainColumn();
    // listworkitemsAndShowCreateWorkItemButton();
    // $('#mainColumn').append('<h2>New WorkItem Added!</h2>');
    // showWorkItemDetails(WorkItem);
}

var confirmWorkItemDeleted = function() {
    loadData();
    // cleanUpAndAddMainColumn();
    // $('#mainColumn').append('<h2>WorkItem Deleted!</h2>');
    // addReturnButton();
}

var addReturnButton = function() {
    $('#mainColumn').append('<button id="showWorkItems" type="button" name="button" class="btn btn-primary">History</button>');
    $('#showWorkItems').click(loadData);
}
