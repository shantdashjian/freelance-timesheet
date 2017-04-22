package entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="work_item")
public class WorkItem {

	// fields
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private int period;
	
	private double rate;
	
	private int day;
	
	private int month;
	
	private int year;
	
	private String notes;

	// gets and sets

	public int getPeriod() {
		return period;
	}

	public void setPeriod(int period) {
		this.period = period;
	}

	public double getRate() {
		return rate;
	}

	public void setRate(double rate) {
		this.rate = rate;
	}

	public int getDay() {
		return day;
	}

	public void setDay(int day) {
		this.day = day;
	}

	public int getMonth() {
		return month;
	}

	public void setMonth(int month) {
		this.month = month;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public int getId() {
		return id;
	}

	// toString
	@Override
	public String toString() {
		return "WorkItem [id=" + id + ", period=" + period + ", rate=" + rate + ", day=" + day + ", month=" + month
				+ ", year=" + year + ", notes=" + notes + "]";
	}
	
	
	
}
