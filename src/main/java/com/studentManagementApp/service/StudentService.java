package com.studentManagementApp.service;

import com.studentManagementApp.entity.Student;
import com.studentManagementApp.mapper.StudentMapper;
import com.studentManagementApp.repo.StudentRepository;
import org.openapitools.model.StudentDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    private final StudentRepository repository;

    @Autowired
    private StudentMapper studentMapper;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public List<StudentDto> getAllStudents() {
        List<StudentDto> students = repository.findAll().stream().map(studentMapper::toDto).toList();
        return students;
    }

    public Student getStudentByName(String name) {
        return repository.findByName(name);
    }

    public StudentDto addStudent(Student student) {
//        if(repository.findByName(student.getName()) != null){
        return studentMapper.toDto(repository.save(student));
//        }
//        return repository.findByName(student.getName());
    }

    public void deleteStudent(Long id) {
        repository.deleteById(id);
    }

    public void deleteStudents(List<Long> ids) {
        for (long id : ids) {
            repository.deleteById(id);
        }
    }
}
