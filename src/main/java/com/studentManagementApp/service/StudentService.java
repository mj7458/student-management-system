package com.studentManagementApp.service;

import com.studentManagementApp.entity.Student;
import com.studentManagementApp.repo.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    public Student getStudentByName(String name){
        return repository.findByName(name);
    }
    public Student addStudent(Student student) {
//        if(repository.findByName(student.getName()) != null){
            return repository.save(student);
//        }
//        return repository.findByName(student.getName());
    }

    public void deleteStudent(Long id) {
        repository.deleteById(id);
    }

    public void deleteStudents(List<Long> ids) {
        for(long id :ids){
            repository.deleteById(id);
        }
    }
}
