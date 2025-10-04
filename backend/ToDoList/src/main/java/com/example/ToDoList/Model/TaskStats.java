package com.example.ToDoList.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class TaskStats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private long totalTasks;
    private long completedTasks;
    private long notCompletedTasks;

    public TaskStats() {
        this.totalTasks = 0;
        this.completedTasks = 0;
        this.notCompletedTasks = 0;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public long getTotalTasks() {
        return totalTasks;
    }

    public void setTotalTasks(long totalTasks) {
        this.totalTasks = totalTasks;
    }

    public long getCompletedTasks() {
        return completedTasks;
    }

    public void setCompletedTasks(long completedTasks) {
        this.completedTasks = completedTasks;
    }

    public long getNotCompletedTasks() {
        return notCompletedTasks;
    }

    public void setNotCompletedTasks(long notCompletedTasks) {
        this.notCompletedTasks = notCompletedTasks;
    }

    public void incrementTotal() {
        this.totalTasks++;
    }

    public void incrementCompleted() {
        this.completedTasks++;
    }

    public void incrementNotCompleted() {
        this.notCompletedTasks++;
    }

    public void reset() {
        this.totalTasks = 0;
        this.completedTasks = 0;
        this.notCompletedTasks = 0;
    }
}