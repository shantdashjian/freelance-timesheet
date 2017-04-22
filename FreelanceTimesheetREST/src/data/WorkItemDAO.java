package data;

import java.util.List;

import entities.WorkItem;

public interface WorkItemDAO {
	public List<WorkItem> index();

	public WorkItem show(int id);

	public WorkItem create(WorkItem workItem);

	public WorkItem update(int id, WorkItem workItem);

	public boolean destroy(int id);

}
