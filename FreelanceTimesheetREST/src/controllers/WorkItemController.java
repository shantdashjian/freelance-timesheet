package controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import data.WorkItemDAO;
import entities.WorkItem;

@RestController
public class WorkItemController {

	@Autowired
	private WorkItemDAO workItemDAO;

	// GET ping
	@RequestMapping(path = "ping", method = RequestMethod.GET)
	public String ping() {
		return "pong";
	}

	// GET workitems
	@RequestMapping(path = "workitems", method = RequestMethod.GET)
	public List<WorkItem> index() {
		return workItemDAO.index();
	}

	// GET workitems/{id}
	@RequestMapping(path = "workitems/{id}", method = RequestMethod.GET)
	public WorkItem index(@PathVariable int id) {
		return workItemDAO.show(id);
	}

	// POST workitems
	@RequestMapping(path = "workitems", method = RequestMethod.POST)
	public WorkItem create(@RequestBody String jsonWorkItem, HttpServletResponse response) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			WorkItem mappedWorkItem = mapper.readValue(jsonWorkItem, WorkItem.class);
			response.setStatus(201);
			return workItemDAO.create(mappedWorkItem);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	// PUT workitems/{id}
	@RequestMapping(path = "workitems/{id}", method = RequestMethod.PUT)
	public WorkItem update(@PathVariable int id, @RequestBody String jsonWorkItem, HttpServletResponse response) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			WorkItem mappedWorkItem = mapper.readValue(jsonWorkItem, WorkItem.class);
			response.setStatus(202);
			return workItemDAO.update(id, mappedWorkItem);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	};
	
	// DELETE workitems/{id}
	@RequestMapping(path="workitems/{id}", method=RequestMethod.DELETE)
	public boolean destroy(@PathVariable int id, HttpServletResponse response){
		response.setStatus(202);
		return workItemDAO.destroy(id);
	}
}
