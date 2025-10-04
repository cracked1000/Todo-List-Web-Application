package com.example.ToDoList.Repository;

import com.example.ToDoList.Model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepo extends JpaRepository<Task, Integer> {
    List<Task> findTop5ByCompletedFalseOrderByIdDesc();

    long countByCompletedTrue();

    long countByCompletedFalse();
}
