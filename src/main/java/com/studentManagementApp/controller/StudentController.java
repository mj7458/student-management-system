package com.studentManagementApp.controller;

import com.studentManagementApp.entity.Student;
import com.studentManagementApp.service.StudentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:4200/")
@Slf4j
@RestController
@RequestMapping("/students")
public class StudentController {
    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @GetMapping
    public List<Student> getAllStudents() {
        List<Student> list=service.getAllStudents();
        log.info(list.toString());
        return list;
    }

    @GetMapping("/{name}")
    public Student getStudentByName(@PathVariable String name) {
        return service.getStudentByName(name);
    }


    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return service.addStudent(student);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        service.deleteStudent(id);
    }

    @DeleteMapping("/delete")
    public void deleteStudents(@RequestBody List<Long> ids) {
        service.deleteStudents(ids);
    }
}
