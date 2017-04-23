$(document).ready(function() {
	run();
})

var run = function(){
	assignEventListenersToNavbar();
	makeNavbarButtonActive("#newButton");
	showCreateWorkItemForm();
}

var assignEventListenersToNavbar = function(){
	$('#newButton').on('click', function(event){
		event.preventDefault();
		makeNavbarButtonActive('#newButton');
		showCreateWorkItemForm();
	});
	$('#historyButton').on('click', function(event){
		event.preventDefault();
		makeNavbarButtonActive('#historyButton');
		loadData();
	});
	$('#reportButton').on('click', function(event){
		event.preventDefault();
		makeNavbarButtonActive('#reportButton');
		showReport();
	});
}

var makeNavbarButtonActive = function(buttonToMakeActive){
	var $allNavbarButtons = $('.nav').children();
	$allNavbarButtons.each(function(){
		$(this).removeClass('active');
	});
	$(buttonToMakeActive).addClass('active');
}

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
	makeNavbarButtonActive("#historyButton");
    $('#content').empty();
    var $table = $('<table id="historyTable" class="table table-bordered table-striped bordered">');

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

        var $viewButton = $('<button  type="button" name="viewButton" class="btn btn-default">View</button>');
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
    var $createWorkItemButton = $('<button  type="button" id="showCreateWorkItemButton" class="btn btn-success">Add Work Item</button>');
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
        showWorkItemDetailsToEdit(workItem);
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
	var $details = $('<div name="details" id="details" class="form-horizontal">');
	$details.append('<div class="form-group"><label for="period" class="label label-info control-label">Period</label>'+
			'<span id="period" name="period">'+workItem.period+'</span><span> hours</span></div>');
	$details.append('<div class="form-group"><label class="label label-info control-label">Rate</label>'+
			'<span id="rate" name="rate">' + dollarAmount(workItem.rate) + '</span><span>/hr</span></div>');
	$details.append('<div class="form-group"><label class="label label-info control-label">Date</label>'+
			'<span id="date" name="date">'+date(workItem.year,workItem.month, workItem.day) +'</span></div>');
	
    $('#mainColumn').append('<h1  class="backgrounded bordered">' 
    		+ workItem.notes + '</h1>');
    $('#mainColumn').append($details);
    addReturnButton();
}

var showWorkItemDetailsToEdit = function(workItem) {
	var $form = $('<form name="editWorkItemForm" id="editWorkItemForm">');
	$form.append('<label for="period">Period: </label><input id="period" type="number" name="period" min="1"  value="'+workItem.period+'" required><label>Hours</label><br>');
	$form.append('<label for="rate">Rate: $</label><input id="rate" type="number" name="rate" min="1.00"  step="0.01" value="'+twoDecimalAmount(workItem.rate)+'" required><label>/hr</label><br>');
	$form.append('<label>Date: </label>');
	$form.append('<input id="month" type="number" name="month" min="1"  max = "12" value="'+workItem.month+'" required>');
	$form.append('<input id="day" type="number" name="day" min="1"  max="31" value="'+workItem.day+'" required>');
	$form.append('<input id="year" type="number" name="year" min="1"  value="'+workItem.year+'" required><br>');
	$form.append('<div><label class="vertical-top" for="notes">Notes: </label><textarea id="notes" name="notes" cols="30" rows="3">'+workItem.notes+'</textarea></div>');

	// edit button
	var $editButton = $('<input id="edit" type="submit" name="editWorkItemButton" class="btn btn-warning" value="Submit">');
	$form.append($editButton);
//	$createButton.click(function(event) {
	$form.submit(function(event) {
		event.preventDefault();
		if ($(editWorkItemForm.period).val()) {
			
			var mappedWorkItem = {
					period: $(editWorkItemForm.period).val(),
					rate: $(editWorkItemForm.rate).val(),
					month: $(editWorkItemForm.month).val(),
					day: $(editWorkItemForm.day).val(),
					year: $(editWorkItemForm.year).val(),
					notes: $(editWorkItemForm.notes).val()
			};
			// PUT workitems/{id}
			$.ajax({
				type: "PUT",
		        url: 'api/workitems/'+workItem.id,
				dataType: "json",
				contentType: 'application/json', //setting the request headers content-type
				data: JSON.stringify(mappedWorkItem) //the data being added to the request body
			}).done(function(workItem, status) {
			    cleanUpAndAddMainColumn();
				confirmWorkItemEditted(workItem);
			}).fail(function(xhr, status, error) {
			    cleanUpAndAddMainColumn();
				$('#mainColumn').append('<p>An Error has Occured</p>');
				addReturnButton();
			});
		} else {
			$form.prepend('<p>Please enter work item period!</p>');

		}
	});	
	
	$('#mainColumn').append("<h1 class='backgrounded bordered'>Edit Work Item!</h1>");
	$('#mainColumn').append($form);
//	
	
}

var showCreateWorkItemForm = function(){
	makeNavbarButtonActive("#newButton");
	cleanUpAndAddMainColumn();
	$('#showCreateWorkItemButton').remove();
//	$('#mainContainer').append('<div id="formRow" class="row"></div>');
//	$('#formRow').append('<div class="col-md-6 col-md-offset-3 bordered form" id="formColumn"></div>');
	$('#mainColumn').load('html/create-work-item-form.html', function(){		
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
    $('#mainColumn').append('<button id="showWorkItems" type="button" name="button" class="btn btn-success">History</button>');
    $('#showWorkItems').click(loadData);
}

var showReport = function() {
	makeNavbarButtonActive("#reportButton");
	$.ajax({
        type: 'GET',
        url: 'api/workitems',
        dataType: 'json'
    }).done(function(workItems, status) {
        showTotalPay(workItems);
    }).fail(function(xhr, status, error) {
        $('#content').append('<p>An Error has Occured</p>');
    });
	
}

var showTotalPay = function(workItems){
	$('#content').empty();
    var $table = $('<table id="table" class="table table-bordered table-striped bordered">');

    var $thead = $('<thead>');
    $thead.append('<tr><th class="fit">Period (Hours)</th><th class="fit">Rate per Hour</th><th class="fit">Date</th><th class="fit">Notes</th><th class="fit">Total</th></tr>');
    $table.append($thead);
    var $tbody = $('<tbody>');
    var total = 0;
    workItems.forEach(function(workItem, index, array) {
    	var itemTotal = workItem.period * workItem.rate;
    	total += itemTotal;
        $tbody.append('<tr><td >' + workItem.period + '</td>'
        				+'<td >' + dollarAmount(workItem.rate) + '</td>'
        				+'<td>'+ date(workItem.year, workItem.month, workItem.day) + '</td>'
        				+'<td >' + workItem.notes + '</td>'
        				+'<td >' + dollarAmount(itemTotal) + '</td>'
        				+'</tr>');
    });
    
    $table.append($tbody);
    var $tfoot = $('<tfoot><tr><td colspan="4" class="align-right">Total</td><td>'+dollarAmount(total) + '</td></tr><tfoot>');
    $table.append($tfoot);
    
    $('#content').append('<div id="mainContainer" class="container">');
    $('#mainContainer').append($table);

    $($table).wrap('<div class="col-md-6 col-md-offset-3 bordered" id="mainColumn"></div>');
    $('#mainColumn').wrap('<div class="row"></div>');
    $('#mainColumn').prepend("<h1 class=' backgrounded bordered'>Report</h1>");
	
	addReturnButton();
}
