package com.example.ToDoList.Service;

import com.example.ToDoList.Model.Task;
import com.example.ToDoList.Model.TaskStats;
import com.example.ToDoList.Repository.TaskRepo;
import com.example.ToDoList.Repository.TaskStatsRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class TaskServiceTest {

    @Mock
    private TaskRepo taskRepo;

    @Mock
    private TaskStatsRepo taskStatsRepo;

    @InjectMocks
    private TaskService taskService;

    private Task task;
    private TaskStats stats;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        task = new Task(1, "Learn SQL", "Practice joins");
        stats = new TaskStats();
    }

    @Test
    void testAddTask() {
        when(taskRepo.save(any(Task.class))).thenReturn(task);
        when(taskStatsRepo.findAll()).thenReturn(java.util.Collections.singletonList(stats));
        when(taskStatsRepo.save(any(TaskStats.class))).thenReturn(stats);

        Task saved = taskService.addTask(task);

        assertEquals("Learn SQL", saved.getName());
        assertEquals(1, stats.getTotalTasks());
    }

    @Test
    void testCompleteTask() {
        when(taskRepo.findById(1)).thenReturn(Optional.of(task));
        when(taskStatsRepo.findAll()).thenReturn(java.util.Collections.singletonList(stats));

        taskService.completedTask(1);

        assertTrue(task.isCompleted());
        assertEquals(1, stats.getCompletedTasks());
    }
}
