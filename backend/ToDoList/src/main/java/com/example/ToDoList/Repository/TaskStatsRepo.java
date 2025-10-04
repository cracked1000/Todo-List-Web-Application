package com.example.ToDoList.Repository;

import com.example.ToDoList.Model.TaskStats;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskStatsRepo extends JpaRepository<TaskStats, Integer> {
}