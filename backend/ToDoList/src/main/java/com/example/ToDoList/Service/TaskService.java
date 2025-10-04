package com.example.ToDoList.Service;

import com.example.ToDoList.Model.Task;
import com.example.ToDoList.Model.TaskStats;
import com.example.ToDoList.Repository.TaskRepo;
import com.example.ToDoList.Repository.TaskStatsRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepo taskRepo;
    private final TaskStatsRepo taskStatsRepo;

    public TaskService(TaskRepo taskRepo, TaskStatsRepo taskStatsRepo) {
        this.taskRepo = taskRepo;
        this.taskStatsRepo = taskStatsRepo;
    }

    public List<Task> getRecentTasks() {
        return taskRepo.findTop5ByCompletedFalseOrderByIdDesc();
    }

    public TaskStats getTaskStats() {

        List<TaskStats> statsList = taskStatsRepo.findAll();
        if (statsList.isEmpty()) {
            TaskStats newStats = new TaskStats();
            return taskStatsRepo.save(newStats);
        }
        return statsList.get(0);
    }

    public Task addTask(Task task) {
        Task saved = taskRepo.save(task);

        TaskStats stats = getTaskStats();
        stats.incrementTotal();
        taskStatsRepo.save(stats);

        return saved;
    }

    public void completedTask(int id) {
        Task task = taskRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
        task.setCompleted(true);
        taskRepo.save(task);

        TaskStats stats = getTaskStats();
        stats.incrementCompleted();
        taskStatsRepo.save(stats);
    }

    public void deleteTask(int id) {
        if (!taskRepo.existsById(id)) {
            throw new RuntimeException("Task not found with id: " + id);
        }
        taskRepo.deleteById(id);

        TaskStats stats = getTaskStats();
        stats.incrementNotCompleted();
        taskStatsRepo.save(stats);
    }

    public TaskStats resetStats() {
        TaskStats stats = getTaskStats();
        stats.reset();
        return taskStatsRepo.save(stats);
    }
}