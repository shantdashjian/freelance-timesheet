package test;

import static org.hamcrest.CoreMatchers.allOf;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasProperty;
import static org.junit.Assert.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;


import entities.WorkItem;

public class WorkItemTest {

	private EntityManagerFactory entityManagerFactory = null;
	private EntityManager entityManager = null;
	private WorkItem workItem = null;

	@Before
	public void setUp() throws Exception {
		entityManagerFactory = Persistence.createEntityManagerFactory("FreelanceTimesheet");
		entityManager = entityManagerFactory.createEntityManager();
	}

	@After
	public void tearDown() throws Exception {
		entityManager.close();
		entityManagerFactory.close();
	}
	@SuppressWarnings("unchecked")
	@Test
	public void test_workItem_mappings() {
		workItem = entityManager.find(WorkItem.class, 1);    

	    assertThat(workItem,
	        allOf(
	        	hasProperty("id", is(1)),	           
	        	hasProperty("period", is(4)),	           
	        	hasProperty("rate", is(60)),	           
	        	hasProperty("day", is(21)),	           
				hasProperty("month", is(4)),
				hasProperty("year", is(2017)),           
				hasProperty("notes", is("IBM"))          
	        )
	      );
	}
}
