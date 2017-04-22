package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import entities.WorkItem;

@Transactional
public class WorkItemDAOImpl implements WorkItemDAO {

	@PersistenceContext
	private EntityManager em;
	
	@Override
	public List<WorkItem> index() {
		String query = "SELECT workItem from WorkItem workItem";
		return em.createQuery(query, WorkItem.class).getResultList();

	}

	@Override
	public WorkItem show(int id) {
		return em.find(WorkItem.class, id);
	}

	@Override
	public WorkItem create(WorkItem workItem) {
		em.persist(workItem);
		em.flush();
		return workItem;
	}

	@Override
	public WorkItem update(int id, WorkItem workItem) {
		WorkItem mappedWorkItem = em.find(WorkItem.class, id);
		mappedWorkItem.setPeriod(workItem.getPeriod());
		mappedWorkItem.setRate(workItem.getRate());
		mappedWorkItem.setDay(workItem.getDay());
		mappedWorkItem.setMonth(workItem.getMonth());
		mappedWorkItem.setYear(workItem.getYear());
		mappedWorkItem.setNotes(workItem.getNotes());
		
		return mappedWorkItem;
	}

	@Override
	public boolean destroy(int id) {
		boolean flag = false;
		try {			
			em.remove(em.find(WorkItem.class, id));
			flag = true;
		} catch (Exception e) {
			System.out.println(e);
		}
		return flag;
	}

}
